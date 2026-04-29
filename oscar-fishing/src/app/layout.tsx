import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oscar gillar natur och fiske",
  description:
    "En personlig fiske- och naturdagbok. Bilder, turer och minnen från svenska sjöar och skogar.",
  openGraph: {
    title: "Oscar gillar natur och fiske",
    description:
      "En personlig fiske- och naturdagbok. Bilder, turer och minnen från svenska sjöar och skogar.",
    locale: "sv_SE",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Oscar gillar natur och fiske" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar gillar natur och fiske",
    description: "En personlig fiske- och naturdagbok.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
