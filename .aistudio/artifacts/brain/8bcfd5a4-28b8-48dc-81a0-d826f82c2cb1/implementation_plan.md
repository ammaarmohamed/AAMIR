# Digital Business Card & Bio-Link Hub — Aamir Mohamad Hussein (Aamir Digital)

A sleek, tactile, mobile-first digital business card and bio-link hub custom-tailored for **Aamir Mohamad Hussein** — Social Media Manager & Digital Growth Strategist at **Aamir Digital**. Features decoupled `card.config.js` configuration, RFC-compliant `.vcf` contact exporter, dynamic SVG QR code generator, quick-action contact dock, brand campaign highlights, and a 4-theme luxury palette switcher.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The plan has been revised with your exact personal profile details, contact information, handles, and portfolio website:

- **Full Name**: Aamir Mohamad Hussein
- **Brand / Company**: Aamir Digital (`https://aamirdigital.netlify.app/`)
- **Title / Role**: Senior Social Media Manager & Digital Strategist
- **Phone / WhatsApp**: `+254 711 494 938` / `0711494938`
- **Email**: `ammaarmohamed93@gmail.com`
- **Instagram**: `@aamirdigital229` (`https://instagram.com/aamirdigital229`)
- **TikTok**: `@aamirdigital229` (`https://tiktok.com/@aamirdigital229`)
- **Portfolio Website**: `https://aamirdigital.netlify.app/`
- **Default Aesthetic**: *Warm Amber Editorial* (midnight charcoal with warm gold accents) with instant switching between *Heritage Executive* (emerald slate), *Cyber Sapphire* (deep obsidian & azure), and *Stealth Monochrome* (carbon & titanium).
- **Data Decoupling**: All profile info, handles, phone, email, metrics, and ventures are cleanly maintained in `public/card.config.js` (`window.CARD_CONFIG`) for effortless updates.

---

### 1. Overview & Core Concept

- **What It Does**: Provides an ultra-responsive, tactile mobile bio-card and networking interface designed for in-person client meetups, conferences, WhatsApp sharing, and bio links on Instagram & TikTok.
- **Target Audience / Persona**: Brands, creators, business owners, and collaborators seeking social media management, organic audience growth, viral content strategy, and paid digital campaigns.
- **Key Value**:
  - **Instant Contact Save**: Visitors can tap "Save Contact" to export an RFC-compliant `.vcf` file directly into Apple Contacts or Google Contacts with phone, email, website, and title already filled in.
  - **Direct Outreach**: Immediate WhatsApp chat launch, phone call dialer, and an email modal offering 1-click Gmail launch or clipboard copy.
  - **Portfolio Integration**: Seamless showcase of Aamir Digital's portfolio, flagship case studies, and social channels.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Header & Profile Impression**: Centered smartphone canvas (max-width 430px) framed with an ambient dark glow. Features Aamir's circular avatar with rim lighting, a verified badge, institutional tag (`Aamir Digital`), title, and key impact metrics:
   - `15M+ Aggregate Reach`
   - `3.8x Avg Engagement Rate`
   - `25+ Client Campaigns`
2. **Thumb-Zone Action Dock**: Positioned right below the header for effortless one-handed thumb navigation:
   - **WhatsApp**: Direct chat to `+254 711 494 938` with greeting message.
   - **Phone**: Calls `+254711494938`.
   - **Email Picker**: Interactive modal with 1-click Gmail web launch, default mailto trigger, and copy-to-clipboard.
   - **QR Code**: Full-screen modal rendering a vector SVG QR code encoding the live profile URL with instant download/copy.
3. **Primary CTA ("Save Contact")**: High-contrast tactile button (`active:scale-[0.98]`) generating an RFC 3.0 vCard (`.vcf`) containing Aamir's complete contact card.
4. **Services & Portfolio Showcase**: Vertical stack of cards highlighting:
   - **Aamir Digital Agency**: Official portfolio & case studies (`https://aamirdigital.netlify.app/`).
   - **Social Strategy & Brand Growth**: End-to-end account management, content calendars, and viral hooks.
   - **Paid Ads & Performance Scaling**: Meta & TikTok ads scaling client conversions.
   - **Content Creation & Short-Form Video**: Reels, TikTok, and YouTube Shorts production.
5. **Direct Social Channels**: Clean grid connecting visitors directly to:
   - **Instagram**: `@aamirdigital229`
   - **TikTok**: `@aamirdigital229`
   - **Portfolio**: `https://aamirdigital.netlify.app/`
   - **LinkedIn & X**: Direct professional networking channels.
6. **Built-in Utilities & Theme Switcher**:
   - Palette switcher offering 4 curated luxury themes (Warm Amber Editorial, Heritage Executive, Cyber Sapphire, Stealth Monochrome).
   - Native Web Share API trigger with custom copy-link toast.

---

### 3. Key Product Decisions & Trade-Offs

- **Decoupled `public/card.config.js` (`window.CARD_CONFIG`)**:
  - *Chosen Approach*: Store all of Aamir's data in `public/card.config.js` with TypeScript typings and automatic fallback defaults in React.
  - *Why*: Allows modifying any contact detail, phone number, bio, or links in under 60 seconds without running compilation or touching code.
- **Full vCard RFC 3.0 Compliance**:
  - *Chosen Approach*: Client-side generated VCF Blob including `FN`, `N`, `ORG`, `TITLE`, `TEL;TYPE=CELL`, `EMAIL;TYPE=INTERNET`, `URL`, `NOTE`, and `X-SOCIALPROFILE`.
  - *Why*: Ensures seamless 1-tap addition on iOS Contacts and Android Contacts.
- **Client-Side Pure SVG QR Code**:
  - *Chosen Approach*: Self-contained pure mathematical QR code generation rendered as crisp scalable vector graphics.
  - *Why*: 100% offline reliability, zero third-party tracking or fragile external API endpoints.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    public/card.config.js                    │
│   (Aamir Mohamad Hussein, @aamirdigital229, +254711494938)  │
└──────────────────────────────┬──────────────────────────────┘
                               │ loads into
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     React Application                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    App Container                      │  │
│  │  - Desktop Smartphone Bezel / Responsive Wrapper      │  │
│  │  - Theme Token Controller (Amber, Emerald, Azure, ...)│  │
│  └───────────┬───────────────────────────────┬───────────┘  │
│              │                               │              │
│              ▼                               ▼              │
│   ┌─────────────────────┐       ┌────────────────────────┐  │
│   │    ProfileHeader    │       │     ActionDock (4)     │  │
│   │ - Avatar + Rim Glow │       │ - WhatsApp             │  │
│   │ - Verified Check    │       │ - Call (0711494938)    │  │
│   │ - Bio & Metrics     │       │ - EmailModal Trigger   │  │
│   └──────────┬──────────┘       │ - QRModal Trigger      │  │
│              │                  └────────────┬───────────┘  │
│              ▼                               │              │
│   ┌─────────────────────┐       ┌────────────────────────┐  │
│   │  Primary CTA Bar    │       │   Interactive Modals   │  │
│   │  "Save Contact"     │       │ - QR Code Modal        │  │
│   │  (vCard Generator)  │       │ - Email Launcher Sheet │  │
│   └──────────┬──────────┘       │ - Theme Switcher Bar   │  │
│              │                  │ - Toast Notification   │  │
│              ▼                  └────────────────────────┘  │
│   ┌─────────────────────┐                                   │
│   │  Ventures & Links   │                                   │
│   │ - Aamir Digital     │                                   │
│   │ - Services & Proof  │                                   │
│   │ - IG & TikTok Grid  │                                   │
│   └─────────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

#### State & Handler Implementations
- `activeTheme`: Theme state switching between `'amber' | 'heritage' | 'sapphire' | 'monochrome'`.
- `isQrOpen` & `isEmailOpen`: Modal sheet visibility toggles.
- `toast`: Notification bar for copy and share confirmation.
- `exportVCard()`: Generates and triggers instant download of `Aamir_Mohamad_Hussein.vcf`.
- `handleShare()`: Invokes `navigator.share` or fallback clipboard URL copy.
