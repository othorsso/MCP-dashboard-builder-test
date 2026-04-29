import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om Oscar – natur och fiske",
  description: "Lite om Oscar, hobbyn och passionen för natur och fiske i Sverige.",
};

export default function OmPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-[var(--forest-500)] font-medium mb-2">
        Om mig
      </p>
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8">
        Hej, jag heter Oscar 👋
      </h1>

      <div className="prose prose-stone dark:prose-invert space-y-5">
        <p className="text-[var(--foreground)]/80 leading-relaxed text-lg">
          Jag är en friluftsmänniska med ett stort intresse för fiske, vandring
          och att vara ute i naturen. Det här är min personliga plats att samla
          bilder och minnen från turer – stora som små.
        </p>

        <p className="text-[var(--foreground)]/80 leading-relaxed">
          Jag bor i Västra Götaland och har förmånen att ha fantastiska sjöar,
          åar och skogar runt knuten. Gädda, abborre och öring är favoriterna,
          men lika gärna tar jag en lugn vandring och njuter av tystnaden.
        </p>

        <p className="text-[var(--foreground)]/80 leading-relaxed">
          Den här sidan är ingen professionell naturblogg — det är en enkel
          dagbok med bilder. Välkommen att kika runt i arkivet!
        </p>
      </div>

      {/* Placeholder gear section */}
      <div className="mt-12 border-t border-stone-200 dark:border-stone-800 pt-8">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
          Utrustning jag gillar
        </h2>
        <div className="border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl p-6 text-center text-stone-400 text-sm">
          🎣 Länksektion med rekommenderad utrustning och affiliatelänkar — kommer snart.
        </div>
      </div>
    </div>
  );
}
