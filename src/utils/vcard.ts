import { CardConfig } from '../types';

export function generateVCardString(config: CardConfig): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Hussein;Aamir;Mohamed;;",
    `FN:${config.fullName}`,
    `ORG:${config.organization}`,
    `TITLE:${config.title}`,
    `TEL;TYPE=CELL,VOICE,PREF:${config.contacts.phoneRaw}`,
    `EMAIL;TYPE=INTERNET,PREF:${config.contacts.email}`,
    `URL:${config.contacts.website}`,
    "END:VCARD"
  ];

  return lines.join("\r\n");
}

export function getVCardDataUri(config: CardConfig): string {
  const vcardText = generateVCardString(config);
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardText)}`;
}

export function triggerDirectContactImport(config: CardConfig): void {
  const vcardText = generateVCardString(config);
  const dataUri = getVCardDataUri(config);

  try {
    const isIOS = typeof navigator !== 'undefined' && (
      /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );

    if (isIOS) {
      window.location.href = dataUri;
      return;
    }

    // Android / Chromium / Desktop: Use text/vcard Blob navigated directly to trigger OS contact prompt
    const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    
    // Direct navigation without forced download attribute delegates to the OS contact app
    window.location.href = blobUrl;

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 5000);
  } catch (err) {
    window.location.href = dataUri;
  }
}
