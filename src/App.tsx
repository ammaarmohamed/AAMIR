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
  PhoneIcon,
  ShareIcon,
  TikTokIcon,
  UserPlusIcon,
  VerifiedIcon,
  WhatsAppIcon,
} from './icons';

interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
}

interface CardConfig {
  fullName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  organization: string;
  location: string;
  bio: string;
  logoUrl: string;
  fallbackLogoUrl: string;
  verified: boolean;
  contacts: {
    phoneDisplay: string;
    phoneRaw: string;
    email: string;
    website: string;
    whatsAppUrl: string;
  };
  socials: SocialLink[];
}

declare global {
  interface Window {
    CARD_CONFIG?: Partial<CardConfig>;
  }
}

const DEFAULT_CONFIG: CardConfig = {
  fullName: 'Aamir Mohamed Hussein',
  firstName: 'Aamir',
  middleName: 'Mohamed',
  lastName: 'Hussein',
  title: 'Social Media Manager',
  organization: 'Aamir Digital',
  location: 'Nairobi, Kenya',
  bio: 'Helping brands grow through high-retention short-form content, viral strategy, and digital campaigns.',
  logoUrl: '/assets/aistudio/logo.webp',
  fallbackLogoUrl: '/assets/aistudio/image_6bd22d23.png',
  verified: true,
  contacts: {
    phoneDisplay: '0711 494 938',
    phoneRaw: '+254711494938',
    email: 'aamirdigital229@gmail.com',
    website: 'https://aamirdigital.netlify.app/',
    whatsAppUrl:
      'https://wa.me/254711494938?text=Hi%20Aamir%2C%20I%20found%20your%20digital%20card%20and%20would%20like%20to%20connect.',
  },
  socials: [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@aamirdigital229',
      url: 'https://instagram.com/aamirdigital229',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@aamirdigital229',
      url: 'https://tiktok.com/@aamirdigital229',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'aamirdigital229',
      url: 'https://facebook.com/aamirdigital229',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'aamirdigital229',
      url: 'https://linkedin.com/in/aamirdigital229',
    },
    {
      id: 'website',
      name: 'Portfolio Website',
      handle: 'aamirdigital.netlify.app',
      url: 'https://aamirdigital.netlify.app/',
    },
  ],
};

function loadConfig(): CardConfig {
  const custom = typeof window !== 'undefined' ? window.CARD_CONFIG : undefined;
  if (!custom) return DEFAULT_CONFIG;
  return {
    ...DEFAULT_CONFIG,
    ...custom,
    contacts: {
      ...DEFAULT_CONFIG.contacts,
      ...(custom.contacts || {}),
    },
    socials:
      Array.isArray(custom.socials) && custom.socials.length > 0
        ? custom.socials
        : DEFAULT_CONFIG.socials,
  };
}

function buildVCardDataUri(cfg: CardConfig): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${cfg.lastName};${cfg.firstName};${cfg.middleName};;`,
    `FN:${cfg.fullName}`,
    `TEL;TYPE=CELL:${cfg.contacts.phoneRaw}`,
    `EMAIL;TYPE=INTERNET:${cfg.contacts.email}`,
    'END:VCARD',
  ];
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`;
}

function getSocialIcon(id: string) {
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
  const [config] = useState<CardConfig>(() => loadConfig());
  const [logoSrc, setLogoSrc] = useState(config.logoUrl);
  const [logoFailed, setLogoFailed] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [contactAdded, setContactAdded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number | null>(null);

  const vCardDataUri = buildVCardDataUri(config);
  const isIOS =
    typeof navigator !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2400);
  };

  const handleSaveContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setContactAdded(true);
    window.setTimeout(() => setContactAdded(false), 2500);

    if (isIOS) {
      // Let native <a href="data:text/vcard..."> open iOS Contacts sheet directly
      showToast('Opening Contacts…');
      return;
    }

    // On Android / Desktop, open the vCard intent cleanly without navigating away
    e.preventDefault();
    const link = document.createElement('a');
    link.href = vCardDataUri;
    link.setAttribute('download', `${config.fullName.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Opening contact card…');
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `${config.fullName} — ${config.organization}`,
      text: `${config.fullName} · ${config.title} at ${config.organization}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User dismissed or share unavailable
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Card link copied');
    } catch {
      showToast('Share ready');
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.contacts.email);
      setCopiedEmail(true);
      showToast('Email copied');
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      showToast(config.contacts.email);
    }
  };

  const mailSubject = encodeURIComponent(`Inquiry — ${config.organization}`);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    config.contacts.email
  )}&su=${mailSubject}`;
  const mailtoUrl = `mailto:${config.contacts.email}?subject=${mailSubject}`;

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 flex justify-center sm:py-10 sm:px-4 relative overflow-x-hidden">
      {/* Subtle ambient radial glow behind avatar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[420px] h-[340px]"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(245, 158, 11, 0.14) 0%, rgba(245, 158, 11, 0) 70%)',
        }}
      />

      {/* Mobile-First Card Container (max-width 430px) */}
      <main className="relative z-10 w-full max-w-[430px] sm:rounded-3xl sm:border sm:border-white/10 bg-[#111114]/90 px-5 pt-7 pb-8 flex flex-col">
        {/* Profile Header */}
        <header className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            {/* Rim-lit Circular Avatar */}
            <div className="w-28 h-28 rounded-full p-[2px] bg-gradient-to-br from-amber-400 via-amber-500/40 to-white/15 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-3">
                {!logoFailed ? (
                  <img
                    src={logoSrc}
                    alt={config.organization}
                    width={112}
                    height={112}
                    loading="eager"
                    decoding="async"
                    onError={() => {
                      if (logoSrc !== config.fallbackLogoUrl) {
                        setLogoSrc(config.fallbackLogoUrl);
                      } else {
                        setLogoFailed(true);
                      }
                    }}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold tracking-tight text-zinc-900">AD</span>
                )}
              </div>
            </div>

            {/* Verified Checkmark Badge */}
            {config.verified && (
              <span
                title="Verified"
                className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full bg-amber-400 text-zinc-950 border-2 border-[#111114] flex items-center justify-center shadow"
              >
                <VerifiedIcon className="w-4 h-4" />
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white leading-tight mb-1.5">
            {config.fullName}
          </h1>

          {/* Clean unboxed metadata */}
          <p className="text-sm text-zinc-300 font-medium mb-1">
            <span>{config.title}</span>
            <span className="mx-1.5 text-zinc-500" aria-hidden="true">·</span>
            <span className="text-amber-400">{config.organization}</span>
          </p>

          <p className="text-xs text-zinc-400 mb-3">{config.location}</p>

          <p className="text-sm text-zinc-300/90 leading-relaxed max-w-[34ch]">
            {config.bio}
          </p>
        </header>

        {/* Thumb-Zone Quick Action Dock */}
        <section aria-label="Quick actions" className="grid grid-cols-3 gap-2.5 mb-3.5">
          <a
            href={config.contacts.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[60px] rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1.5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <WhatsAppIcon className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-medium text-zinc-200">WhatsApp</span>
          </a>

          <a
            href={`tel:${config.contacts.phoneRaw}`}
            className="min-h-[60px] rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1.5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <PhoneIcon className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-medium text-zinc-200">Call</span>
          </a>

          <button
            type="button"
            onClick={() => setEmailModalOpen(true)}
            className="min-h-[60px] rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1.5 py-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <MailIcon className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-medium text-zinc-200">Email</span>
          </button>
        </section>

        {/* Primary CTA: Save Contact + Share */}
        <section aria-label="Save and share" className="flex gap-2.5 mb-7">
          <a
            href={vCardDataUri}
            onClick={handleSaveContact}
            className="flex-1 min-h-[52px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-amber-500/15 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            {contactAdded ? (
              <>
                <CheckIcon className="w-5 h-5" />
                <span>Opening Contacts…</span>
              </>
            ) : (
              <>
                <UserPlusIcon className="w-5 h-5" />
                <span>Save Contact</span>
              </>
            )}
          </a>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Share card"
            className="w-[52px] min-h-[52px] rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.09] text-zinc-100 flex items-center justify-center active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ShareIcon className="w-5 h-5 text-amber-400" />
          </button>
        </section>

        {/* Social & Web Channels */}
        <section aria-label="Social links" className="flex flex-col gap-2.5 mb-7">
          <h2 className="text-xs font-semibold text-zinc-400 px-1 mb-0.5">
            Connect Online
          </h2>

          {config.socials.map((item) => {
            const Icon = getSocialIcon(item.id);
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[58px] rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 px-3.5 py-2.5 flex items-center justify-between gap-3 active:scale-[0.98] transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">
                      {item.handle}
                    </div>
                  </div>
                </div>
                <ArrowUpRightIcon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors shrink-0" />
              </a>
            );
          })}
        </section>

        {/* Minimal Footer */}
        <footer className="mt-auto pt-4 border-t border-white/10 text-center text-xs text-zinc-500">
          {config.organization} · {config.contacts.phoneDisplay}
        </footer>
      </main>

      {/* Email Picker Modal */}
      {emailModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title"
          className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4"
          onClick={() => setEmailModalOpen(false)}
        >
          <div
            className="w-full max-w-[390px] rounded-2xl bg-[#16161a] border border-white/15 p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 id="email-modal-title" className="text-base font-bold text-white">
                  Email {config.firstName}
                </h3>
                <p className="text-xs text-zinc-400">{config.contacts.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setEmailModalOpen(false)}
                aria-label="Close email dialog"
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-zinc-300 cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setEmailModalOpen(false)}
                className="min-h-[48px] rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm px-4 flex items-center justify-between active:scale-[0.98] transition-all no-underline"
              >
                <span>Open in Gmail</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>

              <a
                href={mailtoUrl}
                onClick={() => setEmailModalOpen(false)}
                className="min-h-[48px] rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-zinc-100 font-medium text-sm px-4 flex items-center justify-between active:scale-[0.98] transition-all no-underline"
              >
                <span>Open Default Mail App</span>
                <ArrowUpRightIcon className="w-4 h-4 text-zinc-400" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="min-h-[48px] rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-200 font-medium text-sm px-4 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
                {copiedEmail ? (
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                ) : (
                  <CopyIcon className="w-4 h-4 text-zinc-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-zinc-900 border border-white/15 text-xs font-medium text-white shadow-xl flex items-center gap-2 whitespace-nowrap"
        >
          <CheckIcon className="w-4 h-4 text-amber-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
