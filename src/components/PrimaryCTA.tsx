import React, { useState } from 'react';
import { UserPlus, Check, Share2 } from 'lucide-react';
import { CardConfig } from '../types';
import { getVCardDataUri, triggerDirectContactImport } from '../utils/vcard';

interface PrimaryCTAProps {
  config: CardConfig;
  onShare: () => void;
  onToast: (msg: string) => void;
}

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({ config, onShare, onToast }) => {
  const [saved, setSaved] = useState(false);
  const dataUri = getVCardDataUri(config);

  const handleClick = (e: React.MouseEvent) => {
    // If not supported natively via direct anchor href, trigger programmatic import
    triggerDirectContactImport(config);
    setSaved(true);
    onToast("Opening contact importer...");
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="w-full px-4 mb-5">
      <div className="flex gap-2">
        {/* Direct Contact Import Anchor Button */}
        <a
          href={dataUri}
          onClick={handleClick}
          role="button"
          aria-label="Add Aamir Mohamed Hussein to phone contacts"
          className="flex-1 tactile-btn relative overflow-hidden h-13 rounded-2xl flex items-center justify-center gap-2.5 font-display font-semibold text-sm sm:text-base tracking-wide text-stone-950 shadow-lg cursor-pointer group no-underline select-none"
          style={{
            background: 'var(--theme-accent-gradient)',
            boxShadow: '0 8px 24px -4px var(--theme-glow)'
          }}
        >
          {/* Subtle sheen highlight */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {saved ? (
            <>
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Contact Added!</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 stroke-[2.2]" />
              <span>Save Contact</span>
            </>
          )}
        </a>

        {/* Quick Share Trigger Button */}
        <button
          type="button"
          onClick={onShare}
          aria-label="Share digital business card"
          title="Share Card"
          className="tactile-btn w-13 h-13 rounded-2xl glass-card flex items-center justify-center text-slate-200 hover:text-white cursor-pointer group"
        >
          <Share2 className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" style={{ color: 'var(--theme-accent)' }} />
        </button>
      </div>
    </div>
  );
};
