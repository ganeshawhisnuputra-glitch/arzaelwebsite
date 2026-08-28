export const socialLinks = {
  tiktok: {
    id: "tiktok",
    platform: "TikTok",
    handle: "@arzaelworld",
    url: "https://www.tiktok.com/@arzaelworld",
    ariaLabel: "Open ARZAEL on TikTok in a new tab",
    microcopy: "WASTE SOME TIME.",
    cta: "KEEP SCROLLING →",
  },
  instagram: {
    id: "instagram",
    platform: "Instagram",
    handle: "@arzaelworld",
    url: "https://www.instagram.com/arzaelworld/",
    ariaLabel: "Open ARZAEL on Instagram in a new tab",
    microcopy: "COMPARE NOTES.",
    cta: "CHECK AGAIN →",
  },
  spotify: {
    id: "spotify",
    platform: "Spotify",
    handle: "ARZAEL",
    url: "https://open.spotify.com/artist/5Z1BQaKqJf7FhvaEWC2vOR",
    ariaLabel: "Listen to ARZAEL on Spotify in a new tab",
    microcopy: "REPLAY THE PROBLEM.",
    cta: "PLAY IT AGAIN →",
  },
} as const;

export type SocialPlatformKey = keyof typeof socialLinks;
