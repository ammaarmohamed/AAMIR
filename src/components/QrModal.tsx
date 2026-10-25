import React, { useEffect, useState } from 'react';
import { X, Copy, Download, Check } from 'lucide-react';
import { CardConfig } from '../types';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CardConfig;
  onToast: (msg: string) => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, config, onToast }) => {
  const [qrSvg, setQrSvg] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Determine current active URL (fallback to portfolio site if in dev or localhost)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : config.contacts.website;

  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      import('qrcode').then((QRCodeModule) => {
        const QRCode = QRCodeModule.default || QRCodeModule;
        return QRCode.toString(currentUrl, {
          type: 'svg',
          margin: 1.5,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
      }).then((svgString) => {
        if (isMounted) setQrSvg(svgString);
      }).catch((err) => {
        console.error("QR generation error", err);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      onToast("Profile link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadQr = async () => {
    try {
      const QRCodeModule = await import('qrcode');
      const QRCode = QRCodeModule.default || QRCodeModule;
      const dataUrl = await QRCode.toDataURL(currentUrl, {
        width: 600,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${config.fullName.replace(/\s+/g, '_')}_QR.png`;
      a.click();
      onToast("QR code downloaded as high-res PNG");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-sm rounded-3xl p-6 glass-card border border-white/15 shadow-2xl flex flex-col items-center text-center animate-scale-up"
        style={{
          background: 'rgba(15, 15, 18, 0.92)'
        }}
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close QR Modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        {config.logoUrl && (
          <div className="bg-white px-3 py-1 rounded-xl shadow-md mb-3 flex items-center justify-center">
            <img src={config.logoUrl} alt={config.organization} className="h-5 w-auto object-contain" />
          </div>
        )}
        <h3 className="font-display font-bold text-xl text-white mb-1">
          {config.fullName}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Scan with your smartphone camera to connect instantly
        </p>

        {/* High-Contrast QR Code Surface */}
        <div className="p-3 bg-white rounded-2xl shadow-xl mb-5 flex items-center justify-center max-w-[230px] w-full aspect-square overflow-hidden border-2 border-stone-200">
          {qrSvg ? (
            <div 
              className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          ) : (
            <div className="text-stone-400 text-xs animate-pulse">Generating QR...</div>
          )}
        </div>

        {/* Quick URL Display */}
        <div className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono truncate mb-4">
          {currentUrl}
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="tactile-btn py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadQr}
            className="tactile-btn py-2.5 px-3 rounded-xl font-medium text-xs text-stone-950 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            style={{
              background: 'var(--theme-accent-gradient)'
            }}
          >
            <Download className="w-4 h-4" />
            <span>Save Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};
