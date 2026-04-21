// ============================================================
// Exception Detail Side Panel
// ============================================================

import { useExceptionStore } from '../../store/exceptionStore';
import {
  SeverityBadge, AreaBadge, WarehouseBadge, AgingLabel, DataSourceBadge, CategoryLabel,
} from './Badges';
import { X, AlertTriangle, Lightbulb, Zap, Tag, Info, ExternalLink } from 'lucide-react';
import { MCP_ENVIRONMENT, MCP_COMPANY } from '../../data/d365LiveData';
import type { WarehouseException } from '../../types/exceptions';

// ── D365 deep-link builder ───────────────────────────────────────────────────
// Opens the relevant D365FO form for the exception.
// URL format: https://{host}?cmp={company}&mi={FormName}
// The mi= value is the AOT form/menu-item name in D365FO.
// Navigates to the form list view — use the Reference IDs to locate the record.
function getD365Links(ex: WarehouseException): Array<{ label: string; url: string; hint: string }> {
  // Base URL already has trailing slash from MCP_ENVIRONMENT
  const base = `${MCP_ENVIRONMENT}?cmp=${MCP_COMPANY}&mi=`;
  const links: Array<{ label: string; url: string; hint: string }> = [];

  if (ex.sourceWorkId && !ex.sourceWorkId.includes(',')) {
    links.push({ label: 'Work Order', url: `${base}WHSWorkTable`, hint: ex.sourceWorkId });
  }
  if (ex.shipmentId) {
    links.push({ label: 'Shipment', url: `${base}WHSShipmentTable`, hint: ex.shipmentId });
  }
  if (ex.category === 'delayed_shipment') {
    links.push({ label: 'Load', url: `${base}WHSLoadTable`, hint: 'Filter by load ID' });
  }
  if (ex.category === 'stockout' || ex.category === 'low_stock' || ex.category === 'replenishment_delay') {
    links.push({ label: 'On-Hand Inventory', url: `${base}InventOnhandItem`, hint: ex.itemNumber ?? 'Filter by item' });
  }
  if (ex.category === 'quality_hold') {
    links.push({ label: 'Quality Orders', url: `${base}InventQualityOrderTable`, hint: 'Filter by order' });
  }
  if (ex.category === 'blocked_work' && ex.sourceOrderNumber) {
    links.push({ label: 'Production Order', url: `${base}ProdTable`, hint: ex.sourceOrderNumber });
  }
  if (ex.category === 'device_error') {
    links.push({ label: 'Work Exceptions', url: `${base}WHSWorkException`, hint: 'Review recent scan failures' });
  }

  return links;
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-slate-400">
        <span className="text-slate-500">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <span className="text-slate-500 shrink-0 w-28">{label}</span>
      <span className="text-slate-300 font-mono break-all">{value}</span>
    </div>
  );
}

export function ExceptionDetailPanel() {
  const { selectedExceptionId, exceptions, selectException } = useExceptionStore();
  const ex = exceptions.find((e) => e.id === selectedExceptionId);

  if (!ex) return null;

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/60 backdrop-blur-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className={`flex items-start justify-between gap-3 p-4 border-b border-slate-700/60
        ${ex.severity === 'critical' ? 'bg-red-950/30' : ''}
        ${ex.severity === 'high'     ? 'bg-orange-950/20' : ''}
      `}>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <SeverityBadge severity={ex.severity} />
            <WarehouseBadge id={ex.warehouseId} />
            <AreaBadge area={ex.processArea} />
            <DataSourceBadge source={ex.dataSource} />
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug">{ex.title}</h3>
          <p className="text-xs text-slate-400 mt-1">
            <AgingLabel hours={ex.agingHours} /> aging · <CategoryLabel category={ex.category} />
          </p>
        </div>
        <button
          type="button"
          onClick={() => selectException(null)}
          className="shrink-0 text-slate-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <Section icon={<Info size={14} />} title="Description">
          {ex.description}
        </Section>

        <Section icon={<AlertTriangle size={14} />} title="Likely Impact">
          {ex.impact}
        </Section>

        <Section icon={<Lightbulb size={14} />} title="Likely Cause">
          {ex.likelyCause}
        </Section>

        <Section icon={<Zap size={14} />} title="Suggested Action">
          <span className="text-sky-300">{ex.suggestedAction}</span>
        </Section>

        {/* D365 References */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Tag size={14} className="text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-wider">D365 References</span>
          </div>
          <div className="rounded-lg bg-slate-900/60 border border-slate-700/50 p-3 space-y-1.5">
            {ex.sourceWorkId && <MetaRow label="Work ID" value={ex.sourceWorkId} />}
            {ex.sourceOrderNumber && <MetaRow label="Order" value={ex.sourceOrderNumber} />}
            {ex.shipmentId && <MetaRow label="Shipment" value={ex.shipmentId} />}
            {ex.itemNumber && (
              <MetaRow
                label="Item"
                value={`${ex.itemNumber}${ex.itemName ? ` — ${ex.itemName}` : ''}`}
              />
            )}
            <MetaRow label="Warehouse" value={`WH${ex.warehouseId}`} />
            <MetaRow label="Status" value={ex.status} />
            <MetaRow
              label="Exception ID"
              value={<span className="text-slate-400">{ex.id}</span>}
            />
          </div>
        </div>

        {/* Open in D365 */}
        {(() => {
          const links = getD365Links(ex);
          if (links.length === 0) return null;
          return (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <ExternalLink size={14} className="text-slate-500" />
                <span className="text-xs font-semibold uppercase tracking-wider">Open in D365</span>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-slate-700/50 p-3 space-y-2">
                <p className="text-[10px] text-slate-600 leading-relaxed">
                  Opens the D365 form list view. Use the reference IDs above to filter to the specific record.
                </p>
                <div className="flex flex-wrap gap-2">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-indigo-700/50 bg-indigo-900/30 px-3 py-1.5 text-xs text-indigo-300 hover:bg-indigo-800/50 hover:text-indigo-200 transition-all"
                      title={`Hint: ${link.hint}`}
                    >
                      <ExternalLink size={11} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Data source note */}
        <div className="rounded-lg border p-3 space-y-1
          border-slate-700/50 bg-slate-900/40">
          <div className="flex items-center gap-2 mb-1">
            <DataSourceBadge source={ex.dataSource} />
            <span className="text-xs text-slate-500 font-medium">Data source note</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{ex.dataNote}</p>
        </div>

        {/* Tags */}
        {ex.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {ex.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-700/60 text-slate-400 px-2 py-0.5 text-xs border border-slate-600/40"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
