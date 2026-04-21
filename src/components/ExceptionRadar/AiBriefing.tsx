// ============================================================
// AI Operations Briefing Panel
// ============================================================
// Uses deterministic logic derived from real D365 exception data.
// Structured so a real LLM call can replace generateBriefing() later.
// ============================================================

import { useExceptionStore } from '../../store/exceptionStore';
import type { WarehouseException } from '../../types/exceptions';
import { Cpu, Flame, BarChart3, ClipboardList } from 'lucide-react';
import { MCP_SNAPSHOT_DATE } from '../../data/d365LiveData';

// ── Deterministic briefing generation ────────────────────────────────────────

interface Briefing {
  summary: string;
  topRisks: Array<{ rank: number; text: string; severity: 'critical' | 'high' | 'medium' }>;
  patterns: string[];
  attentionOrder: Array<{ warehouse: string; action: string }>;
  timestamp: string;
}

function generateBriefing(exceptions: WarehouseException[]): Briefing {
  const critical = exceptions.filter((e) => e.severity === 'critical');
  const high = exceptions.filter((e) => e.severity === 'high');
  const wh24 = exceptions.filter((e) => e.warehouseId === '24');
  const wh51 = exceptions.filter((e) => e.warehouseId === '51');
  const blocked = exceptions.filter((e) => e.category === 'blocked_work');
  const stockouts = exceptions.filter((e) => e.category === 'stockout');
  const staleWork = exceptions.filter((e) => e.category === 'stale_work');
  const realCount = exceptions.filter((e) => e.dataSource === 'real').length;

  // Executive summary
  const wh51CriticalDesc =
    blocked.some((e) => e.warehouseId === '51')
      ? 'Warehouse 51 has a CRITICAL production stoppage: blocked putaway work is preventing finished goods from being stored. '
      : '';
  const wh24StockDesc =
    stockouts.some((e) => e.warehouseId === '24')
      ? `Warehouse 24 is reporting ${stockouts.length} active stockout(s) blocking pick fulfilment. `
      : '';
  const staleDesc =
    staleWork.length > 0
      ? `${staleWork.length} work orders across both sites have never been started — outbound shipments may miss their carrier windows.`
      : '';

  const summary = `${wh51CriticalDesc}${wh24StockDesc}${staleDesc}`.trim() ||
    'All exceptions are within normal operational tolerance. Monitor and resolve in priority order.';

  // Top risks
  const topRisks: Briefing['topRisks'] = [];
  const ex001 = exceptions.find((e) => e.id === 'EX-001');
  if (ex001) topRisks.push({ rank: 1, text: `WH51 blocked ProdPut (USMF-002118, P002087) — production order cannot close. Finished goods accumulating at output location.`, severity: 'critical' });
  const ex002 = exceptions.find((e) => e.id === 'EX-002');
  if (ex002) topRisks.push({ rank: topRisks.length + 1, text: `WH24 HDMI 12' Cables (A0002) — 0 available, 10 reserved. Any sales pick wave will fail or short-pick.`, severity: 'critical' });
  const ex003 = exceptions.find((e) => e.id === 'EX-003');
  if (ex003) topRisks.push({ rank: topRisks.length + 1, text: `WH24 Surface Pro 128 GB — 1 unit available vs 9 reserved. Next wave will short-pick on 8 of 9 orders.`, severity: 'high' });
  const ex004 = exceptions.find((e) => e.id === 'EX-004');
  if (ex004 && topRisks.length < 5) topRisks.push({ rank: topRisks.length + 1, text: `WH24 sales pick USMF-000002 (Wave 2) was never started — shipment USMF-000002 may have missed SLA.`, severity: 'high' });
  const ex005 = exceptions.find((e) => e.id === 'EX-005');
  if (ex005 && topRisks.length < 5) topRisks.push({ rank: topRisks.length + 1, text: `WH24 load USMF-000482 cannot be manifested — pick USMF-000717 is open; carrier window at risk today.`, severity: 'high' });

  // Patterns
  const patterns: string[] = [];
  if (staleWork.filter((e) => e.warehouseId === '24').length >= 2) {
    patterns.push(
      `WH24 has ${staleWork.filter((e) => e.warehouseId === '24').length} unstarted work orders across both inbound and outbound. This pattern suggests a staffing or prioritisation gap — workers may be focused on production picks while inbound and outbound queues build up.`
    );
  }
  if (stockouts.length >= 2) {
    patterns.push(
      `${stockouts.length} items in WH24 have zero available quantity but active reservations. Over-reservation against insufficient stock suggests the reservation model is not coupled to real-time replenishment triggers.`
    );
  }
  if (wh51.some((e) => e.category === 'quality_hold')) {
    patterns.push(
      `WH51 has a quality hold open (USMF-000268) alongside the blocked production putaway (EX-001). Both are compressing the available stock of production inputs — if the QC hold covers components for P000611, a production starvation cascade is possible.`
    );
  }
  if (patterns.length < 3) {
    patterns.push(
      `${realCount} of ${exceptions.length} exceptions are backed by live D365FO data. The remaining are derived or simulated based on operational patterns — flag for real integration when extending this prototype.`
    );
  }

  // Attention order
  const attentionOrder: Briefing['attentionOrder'] = [
    { warehouse: 'WH51', action: 'Unblock USMF-002118 (production putaway). Navigate to Work management > find work > Actions > Unblock.' },
    { warehouse: 'WH24', action: 'Assign picker to USMF-000717 and USMF-000002 immediately. Confirm load USMF-000482 ship window with transport.' },
    { warehouse: 'WH24', action: 'Emergency replenishment for A0002 (HDMI 12\') and 1000 (Surface Pro). Alert sales team to order slippage risk.' },
    { warehouse: 'WH24', action: 'Clear putaway backlog: assign workers to USMF-000092/093/117/118 (6 open purchase putaway work orders).' },
    { warehouse: 'WH51', action: 'Expedite QC close for USMF-000268 (PO 00000526). Assign worker to ProdPick USMF-000344 for P000611.' },
  ];

  return {
    summary,
    topRisks,
    patterns,
    attentionOrder,
    timestamp: MCP_SNAPSHOT_DATE.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
    }) + ' UTC',
  };
}

// ── Severity text colours for risks ──────────────────────────────────────────
const RISK_TEXT: Record<'critical' | 'high' | 'medium', string> = {
  critical: 'text-red-300',
  high:     'text-orange-300',
  medium:   'text-yellow-300',
};

// ── Component ─────────────────────────────────────────────────────────────────
export function AiBriefing() {
  const { exceptions } = useExceptionStore();
  const briefing = generateBriefing(exceptions);

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/60 bg-slate-900/40">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
          <Cpu size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-200">AI Operations Briefing</p>
          <p className="text-xs text-slate-500">Deterministic · Based on real D365 data · {briefing.timestamp}</p>
        </div>
        <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5">
          Live
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Summary */}
        <div className="rounded-lg bg-slate-900/50 border border-slate-700/40 p-3">
          <p className="text-sm text-slate-300 leading-relaxed">{briefing.summary}</p>
        </div>

        {/* Top Risks */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Top Risks</span>
          </div>
          <ol className="space-y-2">
            {briefing.topRisks.map((risk) => (
              <li key={risk.rank} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 shrink-0 h-2 w-2 rounded-full"
                  style={{ background: risk.severity === 'critical' ? '#f87171' : risk.severity === 'high' ? '#fb923c' : '#fbbf24' }}
                />
                <p className={`text-xs leading-relaxed ${RISK_TEXT[risk.severity]}`}>{risk.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Patterns */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BarChart3 size={14} className="text-sky-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Patterns Detected</span>
          </div>
          <ul className="space-y-2">
            {briefing.patterns.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-sky-400 opacity-70" />
                <p className="text-xs text-slate-400 leading-relaxed">{p}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Attention order */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ClipboardList size={14} className="text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Recommended Attention Order
            </span>
          </div>
          <ol className="space-y-2">
            {briefing.attentionOrder.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-slate-400 text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-semibold rounded px-1.5 py-0.5 mr-1.5
                    ${item.warehouse === 'WH51'
                      ? 'bg-fuchsia-500/20 text-fuchsia-300'
                      : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {item.warehouse}
                  </span>
                  <span className="text-xs text-slate-400">{item.action}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* LLM extension note */}
        <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3 text-xs text-violet-400/70 leading-relaxed">
          <span className="font-semibold text-violet-400">Extend this →</span> Replace{' '}
          <code className="font-mono bg-slate-800/60 px-1 py-0.5 rounded text-violet-300">
            generateBriefing()
          </code>{' '}
          in <code className="font-mono bg-slate-800/60 px-1 py-0.5 rounded text-violet-300">
            AiBriefing.tsx
          </code>{' '}
          with a real LLM call (Azure OpenAI, Copilot, or Ollama) — pass{' '}
          <code className="font-mono bg-slate-800/60 px-1 py-0.5 rounded text-violet-300">
            exceptions
          </code>{' '}
          as JSON context.
        </div>
      </div>
    </div>
  );
}
