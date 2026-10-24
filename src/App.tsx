import { useState, useEffect } from 'react';
import { Share2, Sparkles } from 'lucide-react';
import { getCardConfig } from './utils/configLoader';
import { CardConfig, ThemeType } from './types';
import { ProfileHeader } from './components/ProfileHeader';
import { ActionDock } from './components/ActionDock';
import { PrimaryCTA } from './components/PrimaryCTA';
import { SocialGrid } from './components/SocialGrid';
import { QrModal } from './components/QrModal';
import { EmailModal } from './components/EmailModal';
import { Toast } from './components/Toast';

export default function App() {
  const [config, setConfig] = useState<CardConfig>(() => getCardConfig());
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aamir_card_theme') as ThemeType;
      if (saved && ['amber', 'heritage', 'sapphire', 'monochrome'].includes(saved)) {
        return saved;
      }
    }
    return config.defaultTheme || 'amber';
  });

  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });

  // Apply theme data attribute to document body & root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('aamir_card_theme', theme);
  }, [theme]);

  // Listen to potential runtime updates to window.CARD_CONFIG
  useEffect(() => {
    const handleConfigReload = () => {
      setConfig(getCardConfig());
    };
    window.addEventListener('load', handleConfigReload);
    return () => window.removeEventListener('load', handleConfigReload);
  }, []);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2800);
  };

  // Web Share API with clipboard fallback
  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : config.contacts.website;
    const shareData = {
      title: `${config.fullName} | ${config.organization}`,
      text: `${config.fullName} — ${config.title}. Connect via digital business card:`,
      url: currentUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share dismissed
      }
    } else {
      // Fallback copy to clipboard
      try {
        await navigator.clipboard.writeText(currentUrl);
        showToast("Card URL copied to clipboard");
      } catch (e) {
        showToast("Share URL: " + currentUrl);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start md:items-center py-0 md:py-8 px-0 sm:px-4 bg-[#050507] relative overflow-x-hidden">
      {/* Background Ambient Radial Glow */}
      <div 
        aria-hidden="true"
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{
          background: 'radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)'
        }}
      />

      {/* Mobile-First Device Bounds Canvas (max-width 430px smartphone proportions) */}
      <main className="w-full max-w-[430px] min-h-screen md:min-h-[880px] md:rounded-[40px] bg-[var(--theme-bg)] border-0 md:border border-white/10 md:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] flex flex-col relative z-10 transition-colors duration-300 overflow-hidden">
        
        {/* Smartphone Speaker & Camera Notch (Desktop framing accent) */}
        <div className="hidden md:flex justify-center pt-3 pb-1 select-none pointer-events-none">
          <div className="w-20 h-4 bg-black/60 rounded-full border border-white/5 flex items-center justify-center gap-1.5 px-2">
            <div className="w-2 h-2 rounded-full bg-stone-900 border border-white/10" />
            <div className="w-8 h-1 rounded-full bg-stone-800" />
          </div>
        </div>

        {/* Top Micro Navigation Bar */}
        <header className="w-full flex items-center justify-between px-5 pt-3 pb-1 select-none">
          <div className="flex items-center gap-2">
            {config.logoUrl && (
              <div className="h-5 px-1.5 py-0.5 rounded bg-white flex items-center justify-center shadow-xs">
                <img src={config.logoUrl} alt={config.organization} className="h-3.5 w-auto object-contain" />
              </div>
            )}
            <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Verified Card</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share Business Card"
              className="tactile-btn p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/5"
              title="Share Card"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Card Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-8 pt-1">
          {/* Profile Header (Avatar, Rim Lighting, Crest, Name, Bio) */}
          <ProfileHeader config={config} />

          {/* Thumb-Zone 4-Icon Action Dock (WhatsApp, Phone, Email, QR) */}
          <ActionDock 
            config={config} 
            onOpenEmail={() => setIsEmailOpen(true)}
            onOpenQr={() => setIsQrOpen(true)}
          />

          {/* Primary CTA Button ("Save Contact" RFC vCard Exporter) */}
          <PrimaryCTA 
            config={config} 
            onShare={handleShare}
            onToast={showToast}
          />

          {/* Direct Social Channels Grid */}
          <SocialGrid socials={config.socials} />

          {/* Subtle Institutional Footer */}
          <footer className="w-full text-center px-4 pt-3 pb-6 border-t border-white/5 flex flex-col items-center">
            {config.logoUrl && (
              <div className="bg-white px-2.5 py-1 rounded-xl shadow-md mb-2.5 flex items-center justify-center hover:scale-105 transition-transform">
                <img src={config.logoUrl} alt={config.organization} className="h-5 w-auto object-contain" />
              </div>
            )}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Sparkles className="w-3 h-3" style={{ color: 'var(--theme-accent)' }} />
              <span className="font-medium text-slate-300">{config.organization}</span>
              <span>·</span>
              <span>Digital Business Card</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Tap "Save Contact" to import contact directly into phone address book.
            </p>
          </footer>
        </div>
      </main>

      {/* Dynamic QR Code Modal */}
      <QrModal 
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        config={config}
        onToast={showToast}
      />

      {/* Direct Email Launcher Modal */}
      <EmailModal 
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        config={config}
        onToast={showToast}
      />

      {/* Micro Action Feedback Toast */}
      <Toast 
        message={toast.message}
        isVisible={toast.visible}
      />
    </div>
  );
}
