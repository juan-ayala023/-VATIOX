'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Gift, X } from 'lucide-react';
import { useEffect } from 'react';
import { Countdown } from '@/components/forms/Countdown';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { copy } from '@/content/copy';
import { EASE } from '@/lib/hooks';
import { lockScroll } from '@/lib/lenis';
import { useUI } from '@/lib/store/ui';

export function WaitlistModal() {
  const open = useUI((s) => s.waitlistOpen);
  const setOpen = useUI((s) => s.setWaitlistOpen);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[85] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-labelledby="wl-title">
          <motion.button type="button" aria-label={copy.waitlist.close} className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            data-lenis-prevent
            className="relative max-h-[92svh] w-full overflow-y-auto border-t-2 border-vx-red bg-carbon-800 p-5 md:max-w-lg md:border-2 md:border-vx-silver/10 md:border-t-vx-red md:p-8"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <button type="button" onClick={() => setOpen(false)} aria-label={copy.waitlist.close} className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center text-vx-silver hover:text-vx-bone">
              <X className="h-6 w-6" />
            </button>
            <p className="font-mono text-[11px] tracking-[0.15em] text-vx-red">PRIMER LOTE · VX-01</p>
            <h2 id="wl-title" className="headline mt-1 text-5xl">
              {copy.waitlist.title}
            </h2>
            <p className="mt-3 flex gap-2 text-sm text-vx-silver">
              <Gift className="h-5 w-5 shrink-0 text-vx-red" />
              {copy.waitlist.intro}
            </p>
            <Countdown className="my-5" />
            <WaitlistForm idPrefix="wl-modal" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
