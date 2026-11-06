'use client';

import { WhatsAppIcon } from '@/components/brand/Icons';
import { copy } from '@/content/copy';
import { track } from '@/lib/analytics';
import { whatsappUrl } from '@/lib/config';
import { useUI } from '@/lib/store/ui';
import { cn } from '@/lib/format';

export function WhatsAppButton() {
  const buyBarVisible = useUI((s) => s.buyBarVisible);
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.whatsapp.label}
      onClick={() => track('Contact', { channel: 'whatsapp', placement: 'floating' })}
      className={cn(
        'fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-vx-bone text-vx-carbon shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-[bottom,transform] duration-500 ease-vx hover:scale-105 active:scale-95 md:bottom-6 md:right-6',
        buyBarVisible ? 'bottom-[92px]' : 'bottom-4',
      )}
    >
      <span aria-hidden="true" className="animate-wa-pulse absolute inset-0 rounded-full bg-vx-bone" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
