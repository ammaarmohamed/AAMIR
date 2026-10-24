import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 animate-bounce-subtle">
      <div 
        className="py-2.5 px-4 rounded-full bg-stone-900/95 text-white border border-white/20 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-medium"
        style={{
          boxShadow: '0 10px 30px -5px rgba(0,0,0,0.8), 0 0 15px -2px var(--theme-glow)'
        }}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="truncate max-w-[280px]">{message}</span>
      </div>
    </div>
  );
};
