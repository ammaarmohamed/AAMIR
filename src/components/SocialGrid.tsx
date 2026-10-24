import React from 'react';
import { Instagram, Globe, ArrowUpRight } from 'lucide-react';
import { SocialItem } from '../types';

interface SocialGridProps {
  socials: SocialItem[];
}

// Custom TikTok SVG Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.69a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75c1.45.98 3.19 1.55 5.06 1.58V6.88c-.05 0-1.05-.05-1.15-.19z" />
  </svg>
);

const getSocialIcon = (id: string) => {
  switch (id) {
    case 'instagram':
      return Instagram;
    case 'tiktok':
      return TikTokIcon;
    case 'website':
      return Globe;
    default:
      return Globe;
  }
};

export const SocialGrid: React.FC<SocialGridProps> = ({ socials }) => {
  return (
    <div className="w-full px-4 mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="font-display font-semibold text-sm tracking-wide text-slate-300 uppercase">
          Socials & Channels
        </h2>
        <span className="text-[11px] text-slate-400">
          Direct Connect
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {socials.map((soc) => {
          const Icon = getSocialIcon(soc.id);

          return (
            <a
              key={soc.id}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-3.5 flex items-center justify-between group tactile-btn hover:border-amber-500/30"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--theme-accent)' }} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white group-hover:text-amber-100 transition-colors truncate">
                    {soc.name}
                  </div>
                  <div className="text-xs text-slate-400 truncate font-mono">
                    {soc.handle}
                  </div>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
