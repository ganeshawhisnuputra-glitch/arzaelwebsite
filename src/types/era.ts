export interface Era {
  slug: string;
  title: string;
  subtitle: string;
  years: string;
  statement: string;
  description: string;
  isCurrent: boolean;
  artworkPlaceholderId: string;
  themeColor: {
    primary: string;
    accent: string;
  };
  trackIds: string[];
}
