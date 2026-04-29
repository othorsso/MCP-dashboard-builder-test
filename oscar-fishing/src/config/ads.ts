/**
 * ─── Google AdSense Configuration ─────────────────────────────────────────────
 *
 * HOW TO ACTIVATE ADS:
 * 1. Create a Google AdSense account at https://adsense.google.com
 * 2. Get approved (Google reviews your site, may take days/weeks)
 * 3. Copy your Publisher ID — it looks like: ca-pub-1234567890123456
 * 4. Set it as an environment variable in Vercel:
 *      NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-1234567890123456
 * 5. Create ad units in your AdSense dashboard to get slot IDs
 * 6. Set slot IDs as env vars or update the values below
 *
 * ENVIRONMENT VARIABLES (add to .env.local and to Vercel project settings):
 *   NEXT_PUBLIC_ADSENSE_PUBLISHER_ID   — Your ca-pub-XXXX publisher ID
 *   NEXT_PUBLIC_AD_SLOT_BANNER         — Ad slot ID for the banner between sections
 *   NEXT_PUBLIC_AD_SLOT_SIDEBAR        — Ad slot ID for the sidebar (future use)
 *
 * The site works perfectly without these. AdPlaceholder shows a placeholder until
 * real ads are configured.
 */

export const adsConfig = {
  /** Set to true once you have an approved AdSense account and publisher ID */
  adsEnabled: false,

  /**
   * Your Google AdSense Publisher ID.
   * Format: ca-pub-XXXXXXXXXXXXXXXX
   * Set via env var: NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
   * DO NOT hard-code your real publisher ID here.
   */
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "",

  /**
   * Ad slot IDs — create these in your AdSense dashboard under "Ad units"
   * Set via env vars, or replace the empty strings with your actual slot IDs.
   */
  slots: {
    /** Banner placed between homepage sections */
    banner: process.env.NEXT_PUBLIC_AD_SLOT_BANNER ?? "",
    /** Sidebar ad (future layout) */
    sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "",
  },
} as const;
