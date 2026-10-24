import React, { useState } from 'react';
import { BadgeCheck, Sparkles, MapPin } from 'lucide-react';
import { CardConfig } from '../types';

interface ProfileHeaderProps {
  config: CardConfig;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ config }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center text-center pt-2 pb-6 px-4">
      {/* Avatar Container with Rim Lighting & Soft Glow */}
      <div className="relative mb-5 group">
        {/* Soft atmospheric radial glow spot behind avatar */}
        <div 
          className="absolute -inset-3 rounded-full opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90 pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)' }}
        />

        {/* Outer Rim Light Ring */}
        <div 
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2.5px] shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, var(--theme-accent) 50%, rgba(255,255,255,0.1) 100%)',
            boxShadow: '0 0 25px -5px var(--theme-glow)'
          }}
        >
          {/* Inner Avatar Surface */}
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center border-2 border-black/40">
            {config.avatarUrl && !imgError ? (
              <img
                src={config.avatarUrl}
                alt={config.fullName}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : config.logoUrl ? (
              // Official Brand Logo in Circular Emblem
              <div className="w-full h-full bg-white flex items-center justify-center p-3 relative shadow-inner">
                <img
                  src={config.logoUrl}
                  alt={config.organization}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              // High-end Monogram & Crest Fallback Container
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-stone-950 via-stone-900 to-stone-850 relative">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(var(--theme-accent) 1px, transparent 1px)',
                    backgroundSize: '8px 8px'
                  }}
                />
                <span 
                  className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 30%, var(--theme-accent) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  {config.avatarInitials}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400/80 font-mono mt-0.5">
                  DIGITAL
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Verified Badge */}
        {config.verified && (
          <div 
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-stone-950 z-10 transition-transform duration-200 hover:scale-110"
            style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, var(--theme-accent) 100%)',
              color: '#09090b'
            }}
            title="Verified Digital Strategist"
          >
            <BadgeCheck className="w-5 h-5 fill-current stroke-[1.5]" />
          </div>
        )}
      </div>

      {/* Institutional Crest Tag with Company Logo */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 border border-white/10 bg-white/[0.04] backdrop-blur-md">
        {config.logoUrl ? (
          <div className="bg-white px-1.5 py-0.5 rounded flex items-center justify-center">
            <img 
              src={config.logoUrl} 
              alt={config.organization} 
              className="h-3.5 w-auto object-contain" 
            />
          </div>
        ) : (
          <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
        )}
        <span className="text-xs font-semibold tracking-wide uppercase text-slate-200">
          {config.organization}
        </span>
      </div>

      {/* Full Name */}
      <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5" style={{ textWrap: 'balance' }}>
        {config.fullName}
      </h1>

      {/* Professional Title */}
      <p className="text-sm font-medium text-slate-300 max-w-xs mb-2">
        {config.title}
      </p>

      {/* Location & Status */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 flex-wrap justify-center">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{config.location}</span>
        </span>
      </div>

      {/* Short Bio */}
      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-sm px-1">
        {config.bio}
      </p>
    </div>
  );
};
