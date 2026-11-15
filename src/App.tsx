import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PaletteIcon,
  PhoneIcon,
  QrCodeIcon,
  ShareIcon,
  TikTokIcon,
  UserPlusIcon,
  VerifiedIcon,
  WhatsAppIcon,
} from './icons';

type ThemeId = 'emerald' | 'sapphire' | 'amber' | 'carbon';

interface FeaturedLink {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  useLogo?: boolean;
}

interface CardConfig {
  fullName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  initials: string;
  title: string;
  company: string;
  secondaryAffiliation?: string;
  organizationName: string;
  organizationAcronym?: string;
  hookStatement: string;
  focusChips: string[];
  photoWebp: string;
  photoJpg: string;
  emblemUrl: string;
  verified: boolean;
  defaultTheme: ThemeId;
  contacts: {
    whatsapp: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    website: string;
  };
  featuredLinks: FeaturedLink[];
  vCardNote: string;
}

declare global {
  interface Window {
    CARD_CONFIG?: Partial<CardConfig>;
    DEFAULT_CARD_CONFIG?: CardConfig;
  }
}

const FALLBACK_CONFIG: CardConfig = {
  fullName: 'Aamir Mohamed Hussein',
  firstName: 'Aamir',
  middleName: 'Mohamed',
  lastName: 'Hussein',
  initials: 'AMH',
  title: 'Social Media Manager',
  company: 'Aamir Digital',
  secondaryAffiliation: 'Founder, Aamir Digital Studio (AD)',
  organizationName: 'Aamir Digital',
  organizationAcronym: 'AD',
  hookStatement:
    'Scaling brands through high-retention short-form video, viral strategy, and measurable digital campaigns.',
  focusChips: ['Short-Form Video', 'Brand Growth', 'Paid Social'],
  photoWebp: '/assets/aistudio/logo.webp',
  photoJpg: '/assets/aistudio/image_6bd22d23.png',
  emblemUrl: '/assets/aistudio/logo.webp',
  verified: true,
  defaultTheme: 'emerald',
  contacts: {
    whatsapp: '+254711494938',
    phone: '+254711494938',
    phoneDisplay: '+254 711 494 938',
    email: 'aamirdigital229@gmail.com',
    website: 'https://aamirdigital.netlify.app/',
  },
  featuredLinks: [
    {
      id: 'website',
      title: 'Aamir Digital Portfolio',
      subtitle: 'aamirdigital.netlify.app',
      url: 'https://aamirdigital.netlify.app/',
      useLogo: true,
    },
    {
      id: 'instagram',
      title: 'Instagram',
      subtitle: '@aamirdigital229',
      url: 'https://instagram.com/aamirdigital229',
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      subtitle: '@aamirdigital229',
      url: 'https://tiktok.com/@aamirdigital229',
    },
    {
      id: 'facebook',
      title: 'Facebook',
      subtitle: 'aamirdigital229',
      url: 'https://facebook.com/aamirdigital229',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      subtitle: 'aamirdigital229',
      url: 'https://linkedin.com/in/aamirdigital229',
    },
  ],
  vCardNote:
    'Social Media Manager at Aamir Digital. High-retention short-form content, viral strategy, and digital campaigns.',
};

const THEME_SWATCHES: {
  id: ThemeId;
  name: string;
  subtitle: string;
  bg: string;
  primary: string;
  secondary: string;
}[] = [
  {
    id: 'emerald',
    name: 'Heritage Emerald',
    subtitle: 'Deep Forest & Gold',
    bg: '#06130e',
    primary: '#10b981',
    secondary: '#f59e0b',
  },
  {
    id: 'sapphire',
    name: 'Cyber Sapphire',
    subtitle: 'Obsidian & Azure',
    bg: '#070d17',
    primary: '#38bdf8',
    secondary: '#818cf8',
  },
  {
    id: 'amber',
    name: 'Warm Amber',
    subtitle: 'Espresso & Ochre',
    bg: '#110e0c',
    primary: '#f59e0b',
    secondary: '#fbbf24',
  },
  {
    id: 'carbon',
    name: 'Stealth Carbon',
    subtitle: 'Monochrome Matte',
    bg: '#09090b',
    primary: '#ffffff',
    secondary: '#a1a1aa',
  },
];

function resolveConfig(): CardConfig {
  if (typeof window === 'undefined') return FALLBACK_CONFIG;
  const base = window.DEFAULT_CARD_CONFIG || FALLBACK_CONFIG;
  const custom = window.CARD_CONFIG;
  if (!custom) return base;
  return {
    ...base,
    ...custom,
    contacts: {
      ...base.contacts,
      ...(custom.contacts || {}),
    },
    focusChips:
      Array.isArray(custom.focusChips) && custom.focusChips.length > 0
        ? custom.focusChips
        : base.focusChips,
    featuredLinks:
      Array.isArray(custom.featuredLinks) && custom.featuredLinks.length > 0
        ? custom.featuredLinks
        : base.featuredLinks,
  };
}

function buildVCardString(cfg: CardConfig): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${cfg.lastName};${cfg.firstName};${cfg.middleName};;`,
    `FN:${cfg.fullName}`,
    `ORG:${cfg.company}`,
    `TITLE:${cfg.title}`,
    `TEL;TYPE=CELL,VOICE:${cfg.contacts.phone}`,
    `EMAIL;TYPE=INTERNET,PREF:${cfg.contacts.email}`,
    `URL:${cfg.contacts.website}`,
    ...cfg.featuredLinks
      .filter((l) => l.id !== 'website')
      .map((l) => `X-SOCIALPROFILE;type=${l.id}:${l.url}`),
    `NOTE:${cfg.vCardNote.replace(/\r?\n/g, '\\n')}`,
    'END:VCARD',
  ];
  return lines.join('\r\n');
}

function getLinkIcon(id: string) {
  switch (id) {
    case 'instagram':
      return InstagramIcon;
    case 'tiktok':
      return TikTokIcon;
    case 'facebook':
      return FacebookIcon;
    case 'linkedin':
      return LinkedInIcon;
    default:
      return GlobeIcon;
  }
}

export default function App() {
  const [config] = useState<CardConfig>(() => resolveConfig());
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nfc_card_theme') as ThemeId | null;
      if (saved && ['emerald', 'sapphire', 'amber', 'carbon'].includes(saved)) {
        return saved;
      }
    }
    return config.defaultTheme || 'emerald';
  });

  const [photoFailed, setPhotoFailed] = useState(false);
  const [emblemFailed, setEmblemFailed] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrSvg, setQrSvg] = useState('');
  const [emailOpen, setEmailOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [contactSaved, setContactSaved] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number | null>(null);

  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : config.contacts.website;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nfc_card_theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  // Lazy-load QRCode only when the QR modal opens
  useEffect(() => {
    if (!qrOpen) return;
    let active = true;
    import('qrcode')
      .then((mod) => {
        const QRCode = mod.default || mod;
        return QRCode.toString(currentUrl, {
          type: 'svg',
          width: 180,
          margin: 1,
          color: { dark: '#09090b', light: '#ffffff' },
        });
      })
      .then((svg) => {
        if (active) setQrSvg(svg);
      })
      .catch(() => {
        if (active) setQrSvg('');
      });
    return () => {
      active = false;
    };
  }, [qrOpen, currentUrl]);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2200);
  };

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${label} copied`);
    } catch {
      showToast(value);
    }
  };

  // Direct Native Contact Importer (Web Share File -> iOS data URI -> Blob fallback)
  const handleSaveContact = async () => {
    const vcfContent = buildVCardString(config);
    const fileName = `${config.fullName.replace(/\s+/g, '_')}.vcf`;

    setContactSaved(true);
    window.setTimeout(() => setContactSaved(false), 2400);

    try {
      const vcfFile = new File([vcfContent], fileName, { type: 'text/vcard' });
      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [vcfFile] })
      ) {
        await navigator.share({
          files: [vcfFile],
          title: config.fullName,
        });
        showToast('Contact ready to save');
        return;
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
    }

    const isIOS =
      typeof navigator !== 'undefined' &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

    if (isIOS) {
      const dataUri = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcfContent)}`;
      window.location.href = dataUri;
      showToast('Opening Contacts…');
      return;
    }

    const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    showToast('Contact card saved (.vcf)');
  };

  const handleShareCard = async () => {
    const shareData = {
      title: `${config.fullName} | ${config.company}`,
      text: `${config.fullName} — ${config.title} at ${config.company}`,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    await copyText(currentUrl, 'Card link');
  };

  const whatsappDigits = config.contacts.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    `Hi ${config.firstName}, I just tapped your digital business card and would love to connect.`
  )}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    config.contacts.email
  )}&su=${encodeURIComponent(`Connecting with ${config.company}`)}`;

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-x-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Background Glow Layer 1: Fullscreen Radial Gradient */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, var(--glow-color) 0%, transparent 68%)',
        }}
      />

      {/* Background Glow Layer 2: Centered Top Ambient Spotlight */}
      <div
        aria-hidden="true"
        className="fixed -top-40 left-1/2 -translate-x-1/2 w-96 h-96 blur-3xl rounded-full pointer-events-none opacity-60"
        style={{ background: 'var(--glow-color)' }}
      />

      {/* Main Centered Smartphone Container */}
      <main className="w-full max-w-[430px] mx-auto px-5 py-6 sm:py-10 flex-1 flex flex-col justify-center items-center z-10">
        {/* 1. Top Action Bar */}
        <div className="w-full flex items-center justify-between mb-5 gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--accent-emerald)' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: 'var(--accent-emerald)' }}
              />
            </span>
            <span>NFC Tap Verified</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setThemeOpen(true)}
              aria-label="Switch theme"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] active:scale-95 transition-all cursor-pointer"
            >
              <span style={{ color: 'var(--accent-gold)' }}>
                <PaletteIcon className="w-3.5 h-3.5" />
              </span>
              <span>Theme</span>
            </button>

            <button
              type="button"
              onClick={handleShareCard}
              aria-label="Share card"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] active:scale-95 transition-all cursor-pointer"
            >
              <ShareIcon className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* 2. Profile Hero */}
        <section className="flex flex-col items-center text-center w-full mb-6">
          <div className="relative mb-4">
            {/* Animated Pulsing Aura Ring */}
            <div
              aria-hidden="true"
              className="nfc-pulse absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'var(--avatar-ring)' }}
            />

            {/* Vertical Gradient Rim Avatar */}
            <div
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 shadow-2xl"
              style={{ background: 'var(--avatar-ring)' }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-2.5">
                {!photoFailed ? (
                  <picture className="w-full h-full flex items-center justify-center">
                    <source srcSet={config.photoWebp} type="image/webp" />
                    <img
                      src={config.photoJpg}
                      alt={config.fullName}
                      loading="eager"
                      decoding="async"
                      onError={() => setPhotoFailed(true)}
                      className="w-full h-full object-contain object-[center_14%]"
                    />
                  </picture>
                ) : (
                  <span className="text-2xl font-extrabold tracking-tight text-zinc-900">
                    {config.initials}
                  </span>
                )}
              </div>
            </div>

            {/* Verified Checkmark Badge */}
            {config.verified && (
              <span
                title="Verified Profile"
                className="w-7 h-7 rounded-full absolute bottom-1 right-1 flex items-center justify-center border-2 shadow-md"
                style={{
                  backgroundColor: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                  borderColor: 'var(--bg-base)',
                }}
              >
                <VerifiedIcon className="w-4 h-4" />
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-2 text-[var(--text-primary)]">
            {config.fullName}
          </h1>

          {/* Dual Role Tagline */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium max-w-sm sm:max-w-md leading-relaxed mb-3">
            <span>
              {config.title} at {config.company}
            </span>
            {config.secondaryAffiliation && (
              <>
                <span className="mx-2 opacity-40" aria-hidden="true">
                  |
                </span>
                <span>{config.secondaryAffiliation}</span>
              </>
            )}
          </p>

          {/* Organization Crest Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] mb-3.5">
            {!emblemFailed ? (
              <div className="w-4 h-4 rounded-sm bg-white overflow-hidden flex items-center justify-center p-0.5 shrink-0">
                <img
                  src={config.emblemUrl}
                  alt={config.organizationName}
                  width={16}
                  height={16}
                  onError={() => setEmblemFailed(true)}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <span
                className="w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-bold shrink-0"
                style={{
                  backgroundColor: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                }}
              >
                {config.organizationAcronym || 'AD'}
              </span>
            )}
            <span className="text-[11px] font-semibold text-[var(--accent-emerald)]">
              {config.organizationName}
            </span>
          </div>

          {/* Hook Statement */}
          <p className="text-xs sm:text-sm text-[var(--text-sub)] max-w-sm leading-relaxed px-2">
            {config.hookStatement}
          </p>

          {/* Focus Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium">
            {config.focusChips.slice(0, 3).map((chip, idx) => (
              <React.Fragment key={chip}>
                {idx > 0 && (
                  <span className="opacity-40" aria-hidden="true">
                    ·
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                  {chip}
                </span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 3. Quick-Action Thumb Dock */}
        <section aria-label="Quick actions" className="w-full grid grid-cols-4 gap-2.5 mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] active:scale-95 group flex flex-col items-center justify-center gap-2 transition-all"
          >
            <span
              className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ color: 'var(--accent-emerald)' }}
            >
              <WhatsAppIcon className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">
              WhatsApp
            </span>
          </a>

          <a
            href={`tel:${config.contacts.phone}`}
            className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] active:scale-95 group flex flex-col items-center justify-center gap-2 transition-all"
          >
            <span
              className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ color: 'var(--accent-emerald)' }}
            >
              <PhoneIcon className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">
              Call
            </span>
          </a>

          <button
            type="button"
            onClick={() => setEmailOpen(true)}
            className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] active:scale-95 group flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span
              className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ color: 'var(--accent-emerald)' }}
            >
              <MailIcon className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">
              Email
            </span>
          </button>

          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] active:scale-95 group flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span
              className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ color: 'var(--accent-gold)' }}
            >
              <QrCodeIcon className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">
              QR Code
            </span>
          </button>
        </section>

        {/* 4. Primary CTA */}
        <div className="w-full mb-6">
          <button
            type="button"
            onClick={handleSaveContact}
            className="w-full h-14 rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
            }}
          >
            {contactSaved ? (
              <>
                <CheckIcon className="w-5 h-5" />
                <span>Contact Ready to Import</span>
              </>
            ) : (
              <>
                <UserPlusIcon className="w-5 h-5" />
                <span>Save Contact to Phone</span>
              </>
            )}
          </button>
        </div>

        {/* 5. Portfolio & Social Profiles Section */}
        <section aria-label="Portfolio and Social Profiles" className="w-full">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-sub)] pl-1 mb-2.5">
            Portfolio &amp; Social Profiles
          </h2>

          <div className="space-y-3 mb-6">
            {config.featuredLinks.map((item) => {
              const Icon = getLinkIcon(item.id);
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-card w-full p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shrink-0 p-1 flex items-center justify-center overflow-hidden">
                      {item.useLogo && !emblemFailed ? (
                        <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-1">
                          <img
                            src={config.emblemUrl}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <span style={{ color: 'var(--accent-emerald)' }}>
                          <Icon className="w-5 h-5" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[var(--text-primary)] truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--text-sub)] truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className="text-[var(--text-sub)] group-hover:text-[var(--text-primary)] transition-colors shrink-0">
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* 6. Quick-Copy Strip */}
        <div className="w-full pt-5 border-t border-[var(--border-subtle)] flex items-center justify-around text-xs text-[var(--text-sub)]">
          <button
            type="button"
            onClick={() => copyText(config.contacts.email, 'Email')}
            className="hover:text-[var(--text-primary)] active:scale-95 transition-all py-1 px-2 cursor-pointer"
          >
            Copy Email
          </button>
          <span className="opacity-30" aria-hidden="true">
            ·
          </span>
          <button
            type="button"
            onClick={() => copyText(config.contacts.phone, 'Phone')}
            className="hover:text-[var(--text-primary)] active:scale-95 transition-all py-1 px-2 cursor-pointer"
          >
            Copy Phone
          </button>
          <span className="opacity-30" aria-hidden="true">
            ·
          </span>
          <button
            type="button"
            onClick={() => copyText(currentUrl, 'Link')}
            className="hover:text-[var(--text-primary)] active:scale-95 transition-all py-1 px-2 cursor-pointer"
          >
            Copy Link
          </button>
        </div>
      </main>

      {/* 7. Footer */}
      <footer className="w-full text-center py-6 text-xs text-zinc-600 font-medium z-10">
        {config.fullName} © {year} · Tap to Connect
      </footer>

      {/* Modal 1: QR Modal */}
      {qrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="rounded-3xl p-6 max-w-[340px] w-full border border-[var(--border-subtle)] shadow-2xl text-center flex flex-col items-center"
            style={{ backgroundColor: 'var(--bg-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-4">
              <h3 id="qr-modal-title" className="text-base font-bold text-[var(--text-primary)]">
                Scan Digital Card
              </h3>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                aria-label="Close QR modal"
                className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white p-3.5 rounded-2xl mb-4 flex items-center justify-center">
              {qrSvg ? (
                <div
                  className="w-[180px] h-[180px] [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
              ) : (
                <div className="w-[180px] h-[180px] flex items-center justify-center text-xs text-zinc-500">
                  Generating QR…
                </div>
              )}
            </div>

            <p className="text-xs text-[var(--text-sub)] mb-4">
              Point any smartphone camera to open {config.firstName}&apos;s card instantly.
            </p>

            <button
              type="button"
              onClick={() => copyText(currentUrl, 'Card link')}
              className="w-full h-11 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
              style={{
                backgroundColor: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-text)',
              }}
            >
              <CopyIcon className="w-4 h-4" />
              <span>Copy Card Link</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Email Modal */}
      {emailOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEmailOpen(false)}
        >
          <div
            className="rounded-3xl p-6 max-w-[340px] w-full border border-[var(--border-subtle)] shadow-2xl"
            style={{ backgroundColor: 'var(--bg-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 id="email-modal-title" className="text-base font-bold text-[var(--text-primary)]">
                Direct Email
              </h3>
              <button
                type="button"
                onClick={() => setEmailOpen(false)}
                aria-label="Close email modal"
                className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-3.5 mb-4 text-center">
              <span className="font-mono text-xs sm:text-sm text-[var(--text-primary)] select-all break-all">
                {config.contacts.email}
              </span>
            </div>

            <div className="space-y-2.5">
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setEmailOpen(false)}
                className="w-full h-12 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
                style={{
                  backgroundColor: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                }}
              >
                <span>Compose in Gmail Web</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  copyText(config.contacts.email, 'Email');
                  setEmailOpen(false);
                }}
                className="w-full h-11 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
              >
                <CopyIcon className="w-4 h-4" />
                <span>Copy Email Address</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Theme Picker Modal */}
      {themeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setThemeOpen(false)}
        >
          <div
            className="rounded-3xl p-6 max-w-[340px] w-full border border-[var(--border-subtle)] shadow-2xl"
            style={{ backgroundColor: 'var(--bg-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 id="theme-modal-title" className="text-base font-bold text-[var(--text-primary)]">
                Select Palette
              </h3>
              <button
                type="button"
                onClick={() => setThemeOpen(false)}
                aria-label="Close theme picker"
                className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {THEME_SWATCHES.map((swatch) => {
                const active = theme === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => {
                      setTheme(swatch.id);
                      setThemeOpen(false);
                      showToast(`${swatch.name} theme active`);
                    }}
                    className="p-3 rounded-2xl bg-[var(--bg-card)] border text-left transition-all active:scale-95 cursor-pointer flex flex-col gap-2"
                    style={{
                      borderColor: active ? swatch.primary : 'var(--border-subtle)',
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: swatch.bg }}
                        />
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: swatch.primary }}
                        />
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: swatch.secondary }}
                        />
                      </div>
                      {active && (
                        <span
                          className="text-xs leading-none"
                          style={{ color: swatch.primary }}
                          aria-label="Active theme"
                        >
                          ●
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">
                        {swatch.name}
                      </div>
                      <div className="text-[10px] text-[var(--text-sub)]">
                        {swatch.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="toast-slide-up fixed bottom-6 left-1/2 z-50 bg-zinc-100 text-zinc-900 px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl whitespace-nowrap flex items-center gap-1.5"
        >
          <CheckIcon className="w-3.5 h-3.5" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
