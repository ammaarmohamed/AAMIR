import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { CardConfig } from '../types';

interface ActionDockProps {
  config: CardConfig;
  onOpenEmail: () => void;
}

export const ActionDock: React.FC<ActionDockProps> = ({ config, onOpenEmail }) => {
  const actions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      href: config.contacts.whatsAppUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      ariaLabel: 'Message on WhatsApp'
    },
    {
      id: 'phone',
      label: 'Call',
      icon: Phone,
      href: `tel:${config.contacts.phoneRaw}`,
      ariaLabel: `Call ${config.contacts.phoneFormatted}`
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      onClick: onOpenEmail,
      ariaLabel: 'Open Email Options'
    }
  ];

  return (
    <div className="w-full px-4 mb-4">
      <div className="grid grid-cols-3 gap-2.5 p-2 rounded-2xl glass-card">
        {actions.map((act) => {
          const Icon = act.icon;
          const content = (
            <>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <Icon 
                  className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                  style={{ color: 'var(--theme-accent)' }}
                />
              </div>
              <span className="text-[11px] font-medium text-slate-300 group-hover:text-white transition-colors">
                {act.label}
              </span>
            </>
          );

          if (act.href) {
            return (
              <a
                key={act.id}
                href={act.href}
                target={act.target}
                rel={act.rel}
                aria-label={act.ariaLabel}
                className="group tactile-btn min-h-[50px] flex flex-col items-center justify-center gap-1.5 p-1.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04]"
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              aria-label={act.ariaLabel}
              className="group tactile-btn min-h-[50px] flex flex-col items-center justify-center gap-1.5 p-1.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04] cursor-pointer"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
};
