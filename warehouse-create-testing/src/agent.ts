import * as vscode from 'vscode';

const SYSTEM_PROMPT = `You are the Warehouse Agent for Microsoft Dynamics 365 Finance & Operations (D365FO).
You help users create, inspect, and manage warehouse master records using OData data tools connected via MCP.

## Available tools
You have access to these D365FO MCP tools — use them in this order of preference:
1. mcp_my-mcp-server_data_find_entity_type  — discover entity schemas and exact field names
2. mcp_my-mcp-server_data_find_entities     — query existing records (verify sites, check duplicates)
3. mcp_my-mcp-server_data_create_entities   — create new records
4. mcp_my-mcp-server_data_update_entities   — update existing records
5. mcp_my-mcp-server_data_get_entity_metadata — get OData metadata for an entity

## OData rules (CRITICAL)
- Always use PLURAL entity names: "Warehouses", "InventSites", "InventWarehouses"
- For V2+ entities put plural BEFORE the version suffix: e.g. "SalesOrderHeadersV2"
- Always include $filter with dataAreaId to scope queries to the correct company
- Use single quotes around string filter values: e.g. $filter=dataAreaId eq 'USMF'

## Warehouse creation workflow
Required fields to create a warehouse:
| Field          | Description                          | Example     |
|----------------|--------------------------------------|-------------|
| WarehouseId    | Short unique code (max 10 chars)     | "WH99"      |
| WarehouseName  | Descriptive name                     | "Test WH 99"|
| SiteId         | Site the warehouse belongs to        | "1"         |
| dataAreaId     | Company legal entity code            | "USMF"      |

Optional fields:
| Field             | Description                  | Default   |
|-------------------|------------------------------|-----------|
| WarehouseType     | Type of warehouse            | "Default" |
| IsDefaultReceivingWarehouse | Default for receiving | false |
| IsDefaultShippingWarehouse  | Default for shipping  | false |

### Step-by-step creation process:
1. **Gather fields** — ask conversationally if any required field is missing
2. **Discover schema** — call data_find_entity_type to find the Warehouses entity and confirm field names
3. **Verify site exists** — query InventSites filtered by SiteId and dataAreaId; abort if not found
4. **Check for duplicate** — query Warehouses filtered by WarehouseId and dataAreaId; warn if already exists
5. **Create** — call data_create_entities with entity path "Warehouses"
6. **Confirm** — show a summary table of what was created

## Listing warehouses
Query the Warehouses entity filtered by dataAreaId. Present results in a markdown table.

## Error handling
- If a site does not exist, tell the user and list available sites
- If a warehouse ID already exists, ask whether to update or choose a different ID
- If the MCP tool returns an error, explain it in plain language and suggest next steps

Be concise, precise, and always confirm before writing to D365FO.`;

const MAX_TOOL_ITERATIONS = 10;

export async function handleWarehouseRequest(
  request: vscode.ChatRequest,
  context: vscode.ChatContext,
  stream: vscode.ChatResponseStream,
  token: vscode.CancellationToken
): Promise<vscode.ChatResult> {
  // Filter to D365FO MCP tools only
  const d365Tools = vscode.lm.tools.filter((t) =>
    t.name.startsWith('mcp_my-mcp-server')
  );

  if (d365Tools.length === 0) {
    stream.markdown(
      '> **No D365FO MCP tools found.**\n>\n> Make sure the MCP server is connected in VS Code ' +
        '(check the MCP extension settings and that the server is running).'
    );
    return {};
  }

  // Use the model the user has selected in the chat panel
  const model = request.model;

  // Build message history from prior turns
  const messages: vscode.LanguageModelChatMessage[] = [
    vscode.LanguageModelChatMessage.User(SYSTEM_PROMPT),
  ];

  for (const turn of context.history) {
    if (turn instanceof vscode.ChatRequestTurn) {
      messages.push(vscode.LanguageModelChatMessage.User(turn.prompt));
    } else if (turn instanceof vscode.ChatResponseTurn) {
      const textParts = turn.response
        .filter(
          (p): p is vscode.ChatResponseMarkdownPart =>
            p instanceof vscode.ChatResponseMarkdownPart
        )
        .map((p) => new vscode.LanguageModelTextPart(p.value.value));
      if (textParts.length > 0) {
        messages.push(vscode.LanguageModelChatMessage.Assistant(textParts));
      }
    }
  }

  // Add the current user message
  messages.push(vscode.LanguageModelChatMessage.User(request.prompt));

  // ── Agentic loop ────────────────────────────────────────────────────────────
  for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration++) {
    if (token.isCancellationRequested) {
      break;
    }

    let response: vscode.LanguageModelChatResponse;
    try {
      response = await model.sendRequest(
        messages,
        { tools: d365Tools },
        token
      );
    } catch (err) {
      stream.markdown(
        `\n> **Error contacting language model:** ${err instanceof Error ? err.message : String(err)}`
      );
      break;
    }

    const toolCalls: vscode.LanguageModelToolCallPart[] = [];
    const assistantParts: (
      | vscode.LanguageModelTextPart
      | vscode.LanguageModelToolCallPart
    )[] = [];

    // Stream text and collect tool calls
    for await (const part of response.stream) {
      if (part instanceof vscode.LanguageModelTextPart) {
        stream.markdown(part.value);
        assistantParts.push(part);
      } else if (part instanceof vscode.LanguageModelToolCallPart) {
        toolCalls.push(part);
        assistantParts.push(part);
      }
    }

    // No tool calls → LM is done
    if (toolCalls.length === 0) {
      break;
    }

    // Append assistant turn (including pending tool calls)
    messages.push(vscode.LanguageModelChatMessage.Assistant(assistantParts));

    // Execute each tool call and collect results
    const toolResultParts: vscode.LanguageModelToolResultPart[] = [];

    for (const call of toolCalls) {
      stream.progress(`Calling ${call.name}…`);

      try {
        const result = await vscode.lm.invokeTool(
          call.name,
          {
            input: call.input as Record<string, unknown>,
            toolInvocationToken: request.toolInvocationToken,
          },
          token
        );
        toolResultParts.push(
          new vscode.LanguageModelToolResultPart(call.callId, result.content)
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : String(err);
        toolResultParts.push(
          new vscode.LanguageModelToolResultPart(call.callId, [
            new vscode.LanguageModelTextPart(
              `Tool invocation failed: ${errorMessage}`
            ),
          ])
        );
      }
    }

    // Feed tool results back into the conversation
    messages.push(vscode.LanguageModelChatMessage.User(toolResultParts));
  }

  return {};
}
