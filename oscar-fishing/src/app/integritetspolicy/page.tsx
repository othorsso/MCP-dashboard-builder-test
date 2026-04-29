import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy – Oscar gillar natur och fiske",
  description:
    "Information om hur personuppgifter och kakor hanteras på den här sidan.",
};

export default function IntegritetspolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-[var(--forest-500)] font-medium mb-2">
        Juridik &amp; integritet
      </p>
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
        Integritetspolicy
      </h1>
      <p className="text-sm text-stone-400 mb-10">
        Senast uppdaterad: april 2026
      </p>

      <div className="space-y-8 text-[var(--foreground)]/80 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            Om den här sidan
          </h2>
          <p>
            Den här sidan är en personlig hobby-blogg driven av Oscar. Syftet är
            att dokumentera fisketurer och naturupplevelser — inte att samla in
            personuppgifter.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            Vilken information samlas in?
          </h2>
          <p className="mb-3">
            Sidan samlar i normala fall <strong>inte aktivt in personuppgifter</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Webbserverns loggar:</strong> När du besöker sidan lagrar Vercel
              (vår hostingleverantör) teknisk information som IP-adress,
              webbläsartyp och besökt sida i upp till 30 dagar. Det gäller alla
              webbplatser på internet.
            </li>
            <li>
              <strong>Kommentarer:</strong> Om du lämnar en kommentar på en tur
              sparas ditt namn och kommentar i en databas (Supabase). Kommentarer
              granskas manuellt innan de publiceras.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            Kakor (cookies)
          </h2>
          <p className="mb-3">
            Sidan använder i nuläget <strong>inga spårningskakor</strong> eller
            analysverktyg som Google Analytics.
          </p>
          <p>
            I framtiden kan sidan komma att använda Google AdSense för att visa
            annonser. Om det aktiveras kommer Google att använda kakor för att
            anpassa annonser baserat på dina tidigare besök på andra webbplatser.
            Du kan när som helst hantera inställningar för Googles annonskakor
            via{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--forest-500)] underline underline-offset-2"
            >
              Googles annonsinställningar
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-stone-500">
            <em>OBS: Google AdSense är i nuläget inte aktivt på den här sidan.</em>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            Tredjepartstjänster
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Vercel</strong> — webbhotell. Hanterar tekniska loggar.{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--forest-500)] underline underline-offset-2"
              >
                Vercels integritetspolicy
              </a>
            </li>
            <li>
              <strong>Supabase</strong> — databas för kommentarer. Hanterar
              kommentarsdata.{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--forest-500)] underline underline-offset-2"
              >
                Supabases integritetspolicy
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            Dina rättigheter
          </h2>
          <p>
            Enligt GDPR har du rätt att begära ut, rätta eller radera uppgifter
            om dig själv. Har du lämnat en kommentar och vill att den tas bort
            är du välkommen att{" "}
            <Link href="/kontakt" className="text-[var(--forest-500)] underline underline-offset-2">
              kontakta mig
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
            Kontakt
          </h2>
          <p>
            Frågor om integritetspolicyn? Se{" "}
            <Link href="/kontakt" className="text-[var(--forest-500)] underline underline-offset-2">
              kontaktsidan
            </Link>
            .
          </p>
        </section>

      </div>
    </div>
  );
}
