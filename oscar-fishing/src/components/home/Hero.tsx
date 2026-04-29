import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Fish } from "lucide-react";
import { trips } from "@/data/trips";
import { resolveMediaUrl } from "@/lib/mediaUrl";

function getHeroImages(count: number) {
  const images: { src: string; alt: string; tripDate: string }[] = [];
  for (const trip of trips) {
    for (const m of trip.media) {
      if (m.type === "image" && m.src) {
        images.push({ src: m.src, alt: m.alt ?? trip.title, tripDate: trip.date });
        if (images.length >= count) return images;
      }
    }
  }
  return images;
}

export default function Hero() {
  const heroImages = getHeroImages(7);

  return (
    <section className="relative overflow-hidden" style={{ background: "#0b1d10" }}>
      {/* Layered background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #0b1d10 0%, #142a18 18%, #1b3d28 38%, #14304a 65%, #0c2035 100%)",
        }}
      />

      {/* Subtle warm light ray — upper right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 75% 20%, rgba(80,160,90,0.13) 0%, transparent 65%)",
        }}
      />

      {/* Forest silhouette — back layer */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,220 L0,160 L8,145 L16,155 L24,138 L32,150 L40,135 L48,148 L56,132 L64,145 L72,130 L80,142 L88,126 L96,140 L104,128 L112,142 L120,124 L128,138 L136,128 L144,140 L152,122 L160,136 L168,125 L176,140 L184,128 L192,142 L200,122 L208,136 L216,126 L224,140 L232,122 L240,136 L248,128 L256,142 L264,122 L272,136 L280,126 L288,140 L296,124 L304,138 L312,128 L320,142 L328,122 L336,136 L344,126 L352,140 L360,122 L368,136 L376,128 L384,142 L392,124 L400,138 L408,128 L416,140 L424,122 L432,136 L440,128 L448,140 L456,122 L464,136 L472,128 L480,140 L488,124 L496,138 L504,128 L512,140 L520,122 L528,136 L536,126 L544,140 L552,122 L560,136 L568,128 L576,142 L584,122 L592,136 L600,126 L608,140 L616,122 L624,136 L632,128 L640,140 L648,122 L656,136 L664,126 L672,140 L680,124 L688,138 L696,128 L704,140 L712,122 L720,136 L728,126 L736,140 L744,122 L752,136 L760,128 L768,142 L776,124 L784,138 L792,128 L800,140 L808,122 L816,136 L824,126 L832,140 L840,122 L848,136 L856,128 L864,140 L872,124 L880,138 L888,128 L896,140 L904,122 L912,136 L920,126 L928,140 L936,122 L944,136 L952,128 L960,142 L968,124 L976,138 L984,128 L992,140 L1000,122 L1008,136 L1016,126 L1024,140 L1032,122 L1040,136 L1048,128 L1056,142 L1064,124 L1072,138 L1080,128 L1088,140 L1096,122 L1104,136 L1112,126 L1120,140 L1128,122 L1136,136 L1144,128 L1152,142 L1160,124 L1168,138 L1176,128 L1184,140 L1192,122 L1200,136 L1208,126 L1216,140 L1224,122 L1232,136 L1240,128 L1248,142 L1256,124 L1264,138 L1272,128 L1280,140 L1288,122 L1296,136 L1304,126 L1312,140 L1320,122 L1328,136 L1336,128 L1344,140 L1352,124 L1360,138 L1368,128 L1376,140 L1384,122 L1392,136 L1400,126 L1408,140 L1416,122 L1424,136 L1432,128 L1440,140 L1440,220 Z"
          fill="#1c3d22"
          opacity="0.45"
        />
        {/* Mid layer */}
        <path
          d="M0,220 L0,168 L15,132 L25,158 L42,112 L56,142 L72,118 L88,145 L102,108 L118,138 L132,118 L148,142 L162,105 L178,132 L192,118 L208,140 L222,108 L238,132 L252,118 L268,142 L282,108 L298,130 L312,118 L328,140 L342,108 L358,132 L372,118 L388,142 L402,108 L418,130 L432,118 L448,140 L462,108 L478,132 L492,118 L508,142 L522,108 L538,130 L552,118 L568,140 L582,108 L598,132 L612,118 L628,142 L642,108 L658,130 L672,118 L688,140 L702,108 L718,132 L732,118 L748,142 L762,108 L778,130 L792,118 L808,140 L822,108 L838,132 L852,118 L868,142 L882,108 L898,130 L912,118 L928,140 L942,108 L958,132 L972,118 L988,142 L1002,108 L1018,130 L1032,118 L1048,140 L1062,108 L1078,132 L1092,118 L1108,142 L1122,108 L1138,130 L1152,118 L1168,140 L1182,108 L1198,132 L1212,118 L1228,142 L1242,108 L1258,130 L1272,118 L1288,140 L1302,108 L1318,132 L1332,118 L1348,142 L1362,108 L1378,130 L1392,118 L1408,140 L1422,108 L1440,128 L1440,220 Z"
          fill="#122818"
          opacity="0.65"
        />
        {/* Front layer — tallest trees */}
        <path
          d="M0,220 L0,175 L22,112 L36,158 L55,90 L70,138 L88,102 L104,140 L122,85 L138,128 L156,96 L172,132 L190,88 L206,128 L224,100 L240,135 L258,90 L274,130 L292,84 L308,122 L326,96 L342,132 L360,86 L376,126 L394,98 L410,135 L428,88 L444,128 L462,82 L478,120 L496,96 L512,132 L530,86 L546,126 L564,98 L580,135 L598,88 L614,128 L632,82 L648,120 L666,96 L682,132 L700,86 L716,126 L734,98 L750,135 L768,88 L784,128 L802,82 L818,120 L836,96 L852,132 L870,86 L886,126 L904,98 L920,135 L938,88 L954,128 L972,82 L988,120 L1006,96 L1022,132 L1040,86 L1056,126 L1074,98 L1090,135 L1108,88 L1124,128 L1142,82 L1158,120 L1176,96 L1192,132 L1210,86 L1226,126 L1244,98 L1260,135 L1278,88 L1294,128 L1312,82 L1328,120 L1346,96 L1362,132 L1380,86 L1396,126 L1414,98 L1440,118 L1440,220 Z"
          fill="#0c1c10"
          opacity="0.88"
        />
      </svg>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-14 sm:pt-20 pb-4">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5 text-emerald-400/60 text-xs font-semibold tracking-widest uppercase">
            <Fish size={12} />
            <span>En blogg om natur och fiske — ibland fångas det fisk</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Oscar gillar{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #6ee7a0, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              natur
            </span>{" "}
            och{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #93c5fd, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              fiske
            </span>
          </h1>

          {/* Short tagline */}
          <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-7 max-w-md">
            Ett litet arkiv av turer, bilder och fångster från svenska sjöar och skogar.
            Ibland fiskar jag. Ibland får jag nöja mig med frisk luft och obefogat självförtroende.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/arkiv"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--forest-700)] font-semibold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg text-sm"
            >
              Bläddra i arkivet
              <ChevronRight size={14} />
            </Link>
            <Link
              href="/karta"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-medium rounded-xl border border-white/15 hover:bg-white/18 transition-colors text-sm"
            >
              Visa på karta
            </Link>
          </div>
        </div>

        {/* Recent photo strip */}
        {heroImages.length > 0 && (
          <div className="flex gap-2.5 pb-14 mt-8 overflow-x-auto hero-strip-scroll -mx-4 px-4 sm:mx-0 sm:px-0">
            {heroImages.map((img, i) => (
              <Link
                key={i}
                href={`/tur/${img.tripDate}`}
                className="group flex-shrink-0 w-28 sm:w-36 h-20 sm:h-24 rounded-xl overflow-hidden relative ring-1 ring-white/10 hover:ring-emerald-400/50 hover:-translate-y-1.5 transition-all duration-300 shadow-lg"
                aria-label={img.alt}
              >
                <Image
                  src={resolveMediaUrl(img.src)}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="140px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none" />
    </section>
  );
}
