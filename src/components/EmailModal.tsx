import React, { useState } from 'react';
import { X, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { CardConfig } from '../types';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CardConfig;
  onToast: (msg: string) => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, config, onToast }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const email = config.contacts.email;
  const defaultSubject = encodeURIComponent(`Social Media Growth Inquiry — ${config.organization}`);
  const defaultBody = encodeURIComponent(`Hi ${config.fullName},\n\nI came across your digital business card and would like to connect regarding social media marketing and digital growth strategy.\n\nBest regards,`);

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${defaultSubject}&body=${defaultBody}`;
  const mailtoUrl = `mailto:${email}?subject=${defaultSubject}&body=${defaultBody}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      onToast("Email address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-sm rounded-3xl p-6 glass-card border border-white/15 shadow-2xl flex flex-col text-left animate-scale-up"
        style={{
          background: 'rgba(15, 15, 18, 0.94)'
        }}
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Email Modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Mail className="w-5 h-5" style={{ color: 'var(--theme-accent)' }} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Send an Email
            </h3>
            <p className="text-xs text-slate-400">
              Direct communication with {config.fullName}
            </p>
          </div>
        </div>

        {/* Email Address Highlight Card */}
        <div className="my-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-0.5">
              Verified Direct Inbox
            </span>
            <span className="text-sm font-semibold text-white truncate block">
              {email}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="tactile-btn px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-2.5 mt-1">
          {/* Option 1: 1-Tap Gmail Web */}
          <a
            href={gmailWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="tactile-btn p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                M
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-amber-100 transition-colors">
                  Open in Gmail Web
                </div>
                <div className="text-[11px] text-slate-400">
                  Pre-filled subject and inquiry draft
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </a>

          {/* Option 2: Default System Mail Client */}
          <a
            href={mailtoUrl}
            onClick={onClose}
            className="tactile-btn p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                @
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-amber-100 transition-colors">
                  Open Default Mail App
                </div>
                <div className="text-[11px] text-slate-400">
                  Apple Mail, Outlook, or system handler
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};
