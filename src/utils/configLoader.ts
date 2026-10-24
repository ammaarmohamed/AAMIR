import { CardConfig } from '../types';

export const DEFAULT_CONFIG: CardConfig = {
  fullName: "Aamir Mohamed Hussein",
  title: "Senior Social Media Manager & Digital Strategist",
  organization: "Aamir Digital",
  tagline: "Social Architecture & Viral Systems",
  location: "Nairobi, Kenya · Available Worldwide",
  bio: "Scaling high-growth consumer & personal brands through culture-first social storytelling, viral short-form systems, and community conversion.",
  avatarUrl: "",
  avatarInitials: "AMH",
  logoUrl: "/assets/aistudio/image_6bd22d23.png",
  verified: true,
  statusText: "Open for New Brand Partnerships & Advisory",
  contacts: {
    phoneFormatted: "+254 711 494 938",
    phoneRaw: "+254711494938",
    email: "aamirdigital229@gmail.com",
    website: "https://aamirdigital.netlify.app/",
    whatsAppUrl: "https://wa.me/254711494938?text=Hi%20Aamir%2C%20I%20found%20your%20digital%20card%20and%20would%20love%20to%20discuss%20social%20media%20growth.",
    instagramHandle: "aamirdigital229",
    instagramUrl: "https://instagram.com/aamirdigital229",
    tiktokHandle: "aamirdigital229",
    tiktokUrl: "https://tiktok.com/@aamirdigital229",
  },
  metrics: [
    { value: "15M+", label: "Aggregate Reach" },
    { value: "3.8x", label: "Engagement Lift" },
    { value: "25+", label: "Brand Campaigns" },
    { value: "99.4%", label: "Client Retention" }
  ],
  ventures: [
    {
      id: "aamir-digital",
      title: "Aamir Digital Collective",
      role: "Founder & Creative Director",
      description: "Full-service social media management, creative direction, and viral marketing studio.",
      url: "https://aamirdigital.netlify.app/",
      badge: "Flagship Portfolio",
      highlightMetric: "Explore Work"
    },
    {
      id: "viral-shortform",
      title: "Viral Short-Form Systems",
      role: "Content Strategy Lead",
      description: "Organic TikTok, Instagram Reels, and YouTube Shorts frameworks tailored for founders and brands.",
      url: "https://tiktok.com/@aamirdigital229",
      badge: "Organic Growth",
      highlightMetric: "Watch Case Studies"
    },
    {
      id: "paid-acquisition",
      title: "Meta & TikTok Paid Scaling",
      role: "Performance Campaign Architect",
      description: "High-ROAS paid social funnel design, creative testing matrices, and conversion copy.",
      url: "https://aamirdigital.netlify.app/",
      badge: "Performance Ads",
      highlightMetric: "Inquire"
    },
    {
      id: "brand-partnerships",
      title: "Creator & Influencer Partnerships",
      role: "Talent & Co-Marketing Strategist",
      description: "End-to-end influencer activation, briefing, contract negotiation, and ROI tracking.",
      url: "https://instagram.com/aamirdigital229",
      badge: "Collaborations",
      highlightMetric: "Connect"
    }
  ],
  socials: [
    {
      id: "instagram",
      name: "Instagram",
      handle: "@aamirdigital229",
      url: "https://instagram.com/aamirdigital229",
      featured: true
    },
    {
      id: "tiktok",
      name: "TikTok",
      handle: "@aamirdigital229",
      url: "https://tiktok.com/@aamirdigital229",
      featured: true
    },
    {
      id: "website",
      name: "Portfolio Website",
      handle: "aamirdigital.netlify.app",
      url: "https://aamirdigital.netlify.app/",
      featured: true
    }
  ],
  vCard: {
    fileName: "Aamir_Mohamed_Hussein.vcf",
    notes: "Senior Social Media Manager & Digital Strategist at Aamir Digital. Contact for social media marketing, content strategy, and viral audience growth."
  },
  defaultTheme: "amber"
};

export function getCardConfig(): CardConfig {
  if (typeof window !== 'undefined' && window.CARD_CONFIG) {
    const raw = window.CARD_CONFIG;
    return {
      ...DEFAULT_CONFIG,
      ...raw,
      contacts: {
        ...DEFAULT_CONFIG.contacts,
        ...(raw.contacts || {})
      },
      metrics: raw.metrics && raw.metrics.length > 0 ? raw.metrics : DEFAULT_CONFIG.metrics,
      ventures: raw.ventures && raw.ventures.length > 0 ? raw.ventures : DEFAULT_CONFIG.ventures,
      socials: raw.socials && raw.socials.length > 0 ? raw.socials : DEFAULT_CONFIG.socials,
      vCard: {
        ...DEFAULT_CONFIG.vCard,
        ...(raw.vCard || {})
      }
    };
  }
  return DEFAULT_CONFIG;
}
