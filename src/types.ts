export interface MetricItem {
  value: string;
  label: string;
}

export interface VentureItem {
  id: string;
  title: string;
  role: string;
  description: string;
  url: string;
  badge?: string;
  highlightMetric?: string;
}

export interface SocialItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  featured?: boolean;
}

export interface CardContacts {
  phoneFormatted: string;
  phoneRaw: string;
  email: string;
  website: string;
  whatsAppUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  tiktokHandle: string;
  tiktokUrl: string;
}

export type ThemeType = "amber" | "heritage" | "sapphire" | "monochrome";

export interface CardConfig {
  fullName: string;
  title: string;
  organization: string;
  tagline: string;
  location: string;
  bio: string;
  avatarUrl?: string;
  avatarInitials: string;
  logoUrl?: string;
  verified: boolean;
  statusText?: string;
  contacts: CardContacts;
  metrics?: MetricItem[];
  ventures?: VentureItem[];
  socials: SocialItem[];
  vCard: {
    fileName: string;
    notes: string;
  };
  defaultTheme: ThemeType;
}

declare global {
  interface Window {
    CARD_CONFIG?: Partial<CardConfig>;
  }
}
