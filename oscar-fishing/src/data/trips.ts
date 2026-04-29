import { Trip } from "@/types/trips";

/**
 * ─── TRIP DATA ────────────────────────────────────────────────────────────────
 *
 * HOW TO ADD A NEW TRIP:
 * 1. Add your media files to /public/media/YYYY/MM/DD/  (lowercase filenames)
 *    - Images: .jpg / .jpeg / .webp / .png  (convert HEIC → JPG first)
 *    - Videos: .mp4 with H.264 codec  (convert MOV → MP4 for browser support)
 * 2. Add a new Trip object below (keep sorted newest first)
 * 3. Run `npm run dev` to preview locally
 * 4. Deploy with `npx vercel --prod`
 *
 * See README for full media guidance and path conventions.
 */
export const trips: Trip[] = [
  // ── 2025-09-07 ────────────────────────────────────────────────────────────
  {
    date: "2025-09-07",
    title: "Sen sommarlördag vid vattnet",
    summary:
      "Sen sommar, klar luft och helt stilla vatten. En perfekt dag att vara ute. Uppdatera gärna med din berättelse från den här turen!",
    tags: ["Fiske", "Höst", "Natur"],
    media: [
      {
        type: "image",
        src: "/media/2025/09/07/img_7493.jpg",
        alt: "Bild från fisketur september 2025",
      },
    ],
  },

  // ── 2025-08-02 ────────────────────────────────────────────────────────────
  {
    date: "2025-08-02",
    title: "Tidigt i augusti – varmt och lugnt",
    summary:
      "Varma augustidagar vid sjön. Vattenspegeln glittrade och det var nästan vindstilla. Uppdatera gärna med din berättelse från den här turen!",
    tags: ["Fiske", "Sommar", "Sjö"],
    media: [
      {
        type: "image",
        src: "/media/2025/08/02/img_6820.jpg",
        alt: "Bild från fisketur augusti 2025",
      },
      {
        type: "image",
        src: "/media/2025/08/02/img_6822.jpg",
        alt: "Bild från fisketur augusti 2025",
      },
    ],
  },

  // ── 2025-07-31 ────────────────────────────────────────────────────────────
  {
    date: "2025-07-31",
    title: "Sista juli – lång kväll vid vattnet",
    summary:
      "Sena julisolar och lång kväll vid vattnet. En av sommarens absolut bästa turer med bilder och film. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Sjö", "Video"],
    media: [
      {
        type: "image",
        src: "/media/2025/07/31/img_5732.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/31/img_5733.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/31/img_5735.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/31/img_6787.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        // MOV filer spelas inte i alla webbläsare – konvertera till MP4 för bästa stöd
        type: "video",
        src: "/media/2025/07/31/img_6813.mov",
        title: "Video från turen",
        caption: "Klipp från kvällsturen.",
        poster: "/media/2025/07/31/img_5732.jpg",
      },
    ],
  },

  // ── 2025-07-06 ────────────────────────────────────────────────────────────
  {
    date: "2025-07-06",
    title: "Sommarfiske – dag 3",
    summary:
      "Tredje och sista dagen av sommarturer. Morgondimma, fiskelycka och kvällssol. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Sjö"],
    media: [
      {
        type: "image",
        src: "/media/2025/07/06/img_5317.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/06/img_5319.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/06/img_5425.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/06/img_5428.jpg",
        alt: "Bild från fisketur juli 2025",
      },
    ],
  },

  // ── 2025-07-05 ────────────────────────────────────────────────────────────
  {
    date: "2025-07-05",
    title: "Sommarfiske – dag 2",
    summary:
      "Andra dagen i rad. Solklart väder, lugnt vatten och massor av bilder. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Sjö"],
    media: [
      {
        type: "image",
        src: "/media/2025/07/05/img_5302.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/05/img_5303.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/05/img_5304.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/05/img_5357.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/05/img_5358.jpg",
        alt: "Bild från fisketur juli 2025",
      },
    ],
  },

  // ── 2025-07-04 ────────────────────────────────────────────────────────────
  {
    date: "2025-07-04",
    title: "Sommarfiske – dag 1",
    summary:
      "Sommarfisket drog igång på allvar. Varm julidag med spöet i hand och blicken mot horisonten. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Sjö"],
    media: [
      {
        type: "image",
        src: "/media/2025/07/04/img_4637.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/04/img_4638.jpg",
        alt: "Bild från fisketur juli 2025",
      },
      {
        type: "image",
        src: "/media/2025/07/04/img_5292.jpg",
        alt: "Bild från fisketur juli 2025",
      },
    ],
  },

  // ── 2025-04-20 ────────────────────────────────────────────────────────────
  {
    date: "2025-04-20",
    title: "Vårens första fisketur",
    summary:
      "Is och snö äntligen borta, vattnet klart och fullt av möjligheter. Vårens första rejäla fisketur. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Vår", "Sjö"],
    media: [
      {
        type: "image",
        src: "/media/2025/04/20/img_4240.jpg",
        alt: "Bild från vårfisketur april 2025",
      },
      {
        type: "image",
        src: "/media/2025/04/20/img_4241.jpg",
        alt: "Bild från vårfisketur april 2025",
      },
      {
        type: "image",
        src: "/media/2025/04/20/img_4242.jpg",
        alt: "Bild från vårfisketur april 2025",
      },
      {
        type: "image",
        src: "/media/2025/04/20/img_4259.jpg",
        alt: "Bild från vårfisketur april 2025",
      },
      {
        type: "image",
        src: "/media/2025/04/20/img_9050.jpg",
        alt: "Bild från vårfisketur april 2025",
      },
    ],
  },

  // ── 2024-10-19 ────────────────────────────────────────────────────────────
  {
    date: "2024-10-19",
    title: "Höstfiske i oktober",
    summary:
      "Höstfärger och kvällsljus. Oktober är en av de vackraste månaderna att vara ute i naturen. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Höst", "Sjö"],
    media: [
      {
        type: "image",
        src: "/media/2024/10/19/img_2469.jpg",
        alt: "Bild från höstfisketur oktober 2024",
      },
      {
        type: "image",
        src: "/media/2024/10/19/img_2533.jpg",
        alt: "Bild från höstfisketur oktober 2024",
      },
      {
        type: "image",
        src: "/media/2024/10/19/img_2538.jpg",
        alt: "Bild från höstfisketur oktober 2024",
      },
      {
        type: "image",
        src: "/media/2024/10/19/img_2703.jpg",
        alt: "Bild från höstfisketur oktober 2024",
      },
    ],
  },

  // ── 2023-08-01 ────────────────────────────────────────────────────────────
  {
    date: "2023-08-01",
    title: "Sommarveckan – sista dagen",
    summary:
      "Sista dagen av en lång sommarvecka. Avslutade med en kvällstur och fick med sig några klipp. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Video"],
    media: [
      {
        type: "image",
        src: "/media/2023/08/01/71258112947__791e6e49-343b-441f-9648-7b4ead007d08.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "video",
        src: "/media/2023/08/01/1d4a9774-b2f7-42a7-9f5c-932b95b65953.mp4",
        title: "Video från avslutningsdagen",
        poster: "/media/2023/08/01/71258112947__791e6e49-343b-441f-9648-7b4ead007d08.jpg",
      },
      {
        type: "video",
        src: "/media/2023/08/01/3f0b8c22-bfb6-48c8-9b38-1c5d3ae57452.mp4",
        title: "Kort klipp från kvällsturen",
        poster: "/media/2023/08/01/71258112947__791e6e49-343b-441f-9648-7b4ead007d08.jpg",
      },
    ],
  },

  // ── 2023-07-31 ────────────────────────────────────────────────────────────
  {
    date: "2023-07-31",
    title: "Sommarveckan – dag 4",
    summary:
      "Varm julidag. Cikadorna sjunger och flugorna surrar. Dags att meta! Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Sjö"],
    media: [
      {
        type: "image",
        src: "/media/2023/07/31/img_3121.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/31/img_3124.jpg",
        alt: "Bild från sommarveckan 2023",
      },
    ],
  },

  // ── 2023-07-30 ────────────────────────────────────────────────────────────
  {
    date: "2023-07-30",
    title: "Sommarveckan – dag 3",
    summary:
      "Tredje dagen av en fantastisk sommarvecka. Bästa fiskelyckan hittills. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Sjö", "Natur"],
    media: [
      {
        type: "image",
        src: "/media/2023/07/30/img_3080.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/30/img_3097.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/30/img_3099.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/30/pxl_20230730_200106098.mp.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/30/pxl_20230730_200109324.mp.jpg",
        alt: "Bild från sommarveckan 2023",
      },
    ],
  },

  // ── 2023-07-28 ────────────────────────────────────────────────────────────
  {
    date: "2023-07-28",
    title: "Sommarveckan – dag 1",
    summary:
      "Sommarveckan inleddes med full kraft. Tog med kameran och spöt och fick med sig massor av bilder. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Sjö", "Natur"],
    media: [
      {
        type: "image",
        src: "/media/2023/07/28/img_3025.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/28/img_3026.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/28/img_3047.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/28/img_3048.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/28/img_3050.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/28/img_3053.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/28/img_3056.jpg",
        alt: "Bild från sommarveckan 2023",
      },
      {
        type: "image",
        src: "/media/2023/07/28/img_3057.jpg",
        alt: "Bild från sommarveckan 2023",
      },
    ],
  },

  // ── 2023-06-02 ────────────────────────────────────────────────────────────
  {
    date: "2023-06-02",
    title: "Försommarens första stora tur",
    summary:
      "Ljusa kvällar, insekter som dansar och fisken som simmar nära ytan. Försommarens första stora tur med både bilder och video. Uppdatera gärna med din berättelse!",
    tags: ["Fiske", "Sommar", "Sjö", "Video"],
    media: [
      {
        type: "image",
        src: "/media/2023/06/02/img_2455.jpg",
        alt: "Bild från försommarturen 2023",
      },
      {
        type: "image",
        src: "/media/2023/06/02/img_2457.jpg",
        alt: "Bild från försommarturen 2023",
      },
      {
        type: "image",
        src: "/media/2023/06/02/img_2458.jpg",
        alt: "Bild från försommarturen 2023",
      },
      {
        type: "image",
        src: "/media/2023/06/02/img_2467.jpg",
        alt: "Bild från försommarturen 2023",
      },
      {
        type: "video",
        src: "/media/2023/06/02/img_2455.mp4",
        title: "Video från försommarturen",
        poster: "/media/2023/06/02/img_2455.jpg",
      },
      {
        type: "video",
        src: "/media/2023/06/02/img_2456-cinematic.mp4",
        title: "Cinematic klipp",
        poster: "/media/2023/06/02/img_2457.jpg",
      },
      {
        type: "video",
        src: "/media/2023/06/02/img_2457.mp4",
        title: "Kort klipp",
        poster: "/media/2023/06/02/img_2457.jpg",
      },
    ],
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** All unique years represented in the trips array */
export function getYears(): number[] {
  const years = new Set(trips.map((t) => parseInt(t.date.slice(0, 4))));
  return Array.from(years).sort((a, b) => b - a);
}

/** Trips for a given year */
export function getTripsByYear(year: number): Trip[] {
  return trips.filter((t) => t.date.startsWith(String(year)));
}

/** Trips for a given year+month (month is 1-indexed) */
export function getTripsByMonth(year: number, month: number): Trip[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  return trips.filter((t) => t.date.startsWith(prefix));
}

/** Single trip by date */
export function getTripByDate(date: string): Trip | undefined {
  return trips.find((t) => t.date === date);
}

/** All unique tags */
export function getAllTags(): string[] {
  const tagSet = new Set(trips.flatMap((t) => t.tags));
  return Array.from(tagSet).sort();
}

/** Total media count (images + videos) */
export function getTotalMedia(): number {
  return trips.reduce((sum, t) => sum + t.media.length, 0);
}

/** Total image count */
export function getTotalImages(): number {
  return trips.reduce(
    (sum, t) => sum + t.media.filter((m) => m.type === "image").length,
    0
  );
}

/** Total video count */
export function getTotalVideos(): number {
  return trips.reduce(
    (sum, t) => sum + t.media.filter((m) => m.type === "video").length,
    0
  );
}

/** Most common tags (top N) */
export function getTopTags(n = 5): { tag: string; count: number }[] {
  const counts: Record<string, number> = {};
  trips.flatMap((t) => t.tags).forEach((tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/** @deprecated Use getTotalMedia */
export const getTotalPhotos = getTotalMedia;



