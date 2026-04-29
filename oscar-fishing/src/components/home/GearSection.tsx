/**
 * Affiliate / gear placeholder section.
 * Replace cards with real affiliate links when ready.
 * Remove <GearSection /> from page.tsx to hide it entirely.
 */
export default function GearSection() {
  const items = [
    {
      title: "Utrustning jag svär vid",
      description:
        "Spön, rullar och flugor som faktiskt följt med ut. Inte bara legat i bilen.",
      cta: "Kommer snart",
      icon: "🎣",
      color: "#2e7d32",
      bg: "#f1f8f2",
      border: "#c8e6c9",
    },
    {
      title: "Prylar som funkar (för mig)",
      description:
        "Wobblers, jigg och drag jag testat i svenska sjöar. Ibland med resultat.",
      cta: "Kommer snart",
      icon: "🪝",
      color: "#1565c0",
      bg: "#f0f4ff",
      border: "#c5cae9",
    },
    {
      title: "Bra sidor att bokmärka",
      description:
        "Fiskekartor, väderrapporter och annat man kollar på kvällen dagen innan.",
      cta: "Kommer snart",
      icon: "🔗",
      color: "#6a1b9a",
      bg: "#f9f0ff",
      border: "#e1bee7",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16" aria-label="Utrustning och tips">
      <div className="flex items-center gap-2 mb-1">
        <p className="text-xs uppercase tracking-widest text-[var(--forest-500)] font-semibold">
          Rekommenderade prylar
        </p>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
          Annonsplats
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">
        Gear, prylar &amp; tips
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">
        Det som faktiskt hamnar i väskan. Och ibland till och med används.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl p-5 flex flex-col gap-3 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            style={{
              background: item.bg,
              borderColor: item.border,
              borderTopWidth: "3px",
              borderTopColor: item.color,
            }}
          >
            <span className="text-2xl" aria-hidden="true">{item.icon}</span>
            <div>
              <h3 className="font-semibold text-stone-800 text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
            <span
              className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full w-fit mt-auto"
              style={{
                background: `${item.color}12`,
                color: item.color,
                border: `1px solid ${item.color}30`,
              }}
            >
              {item.cta}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
