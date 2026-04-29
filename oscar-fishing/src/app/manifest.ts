import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oscar gillar natur och fiske",
    short_name: "Oscars fiske",
    description: "En personlig natur- och fiskeblogg.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f7f4",
    theme_color: "#3a6b3e",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
