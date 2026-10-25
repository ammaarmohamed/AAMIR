/**
 * AAMIR DIGITAL — CARD CONFIGURATION ENGINE
 * 
 * Update your profile, contacts, and links in 60 seconds
 * without touching any application source code.
 */
window.CARD_CONFIG = {
  // Identity & Persona
  fullName: "Aamir Mohamed Hussein",
  title: "Senior Social Media Manager & Digital Strategist",
  organization: "Aamir Digital",
  tagline: "Social Architecture & Viral Systems",
  location: "Nairobi, Kenya · Available Worldwide",
  bio: "Scaling high-growth consumer & personal brands through culture-first social storytelling, viral short-form systems, and community conversion.",
  avatarUrl: "", // Optional custom photo URL; sleek logo/avatar will render
  avatarInitials: "AMH",
  logoUrl: "/assets/aistudio/logo.webp",
  verified: true,
  statusText: "Open for New Brand Partnerships & Advisory",

  // Contact Endpoints
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

  // Direct Social Networks Grid
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
      id: "facebook",
      name: "Facebook",
      handle: "aamirdigital229",
      url: "https://facebook.com/aamirdigital229",
      featured: true
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "aamirdigital229",
      url: "https://linkedin.com/in/aamirdigital229",
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

  // VCard Configuration
  vCard: {
    fileName: "Aamir_Mohamed_Hussein.vcf",
    notes: "Senior Social Media Manager & Digital Strategist at Aamir Digital. Contact for social media marketing, content strategy, and viral audience growth."
  },

  // Default theme: 'amber' | 'heritage' | 'sapphire' | 'monochrome'
  defaultTheme: "amber"
};
