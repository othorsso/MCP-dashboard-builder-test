import * as vscode from 'vscode';
import { handleWarehouseRequest } from './agent';

export function activate(context: vscode.ExtensionContext): void {
  const participant = vscode.chat.createChatParticipant(
    'warehouse.agent',
    handleWarehouseRequest
  );

  participant.iconPath = new vscode.ThemeIcon('server-process');

  participant.followupProvider = {
    provideFollowups(
      _result: vscode.ChatResult,
      _context: vscode.ChatContext,
      _token: vscode.CancellationToken
    ): vscode.ChatFollowup[] {
      return [
        { prompt: 'Create another warehouse', label: '+ Create another warehouse' },
        { prompt: 'List all warehouses in USMF', label: 'List USMF warehouses' },
      ];
    },
  };

  context.subscriptions.push(participant);
}

export function deactivate(): void {}
