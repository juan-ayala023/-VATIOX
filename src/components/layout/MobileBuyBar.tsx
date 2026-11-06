'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { JarRender } from '@/components/product/JarRender';
import { Button } from '@/components/ui/Button';
import { copy } from '@/content/copy';
import { getMainProduct } from '@/lib/catalog';
import { formatCOP } from '@/lib/format';
import { EASE } from '@/lib/hooks';
import { useUI } from '@/lib/store/ui';
import { useBuy } from '@/lib/useBuy';

/**
 * Barra de compra sticky en móvil: aparece cuando el hero sale del viewport
 * y se oculta cuando la sección de oferta (#comprar) o el CTA final están visibles.
 */
export function MobileBuyBar() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [offerVisible, setOfferVisible] = useState(false);
  const setBuyBarVisible = useUI((s) => s.setBuyBarVisible);
  const cartOpen = useUI((s) => s.cartOpen);
  const { buy, mode } = useBuy();
  const offer = getMainProduct().offers[0];

  useEffect(() => {
    const hero = document.getElementById('hero');
    const offerEl = document.getElementById('comprar');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) setHeroVisible(e.isIntersecting);
          if (e.target === offerEl) setOfferVisible(e.isIntersecting);
        }
      },
      { threshold: 0 },
    );
    if (hero) io.observe(hero);
    if (offerEl) io.observe(offerEl);
    return () => io.disconnect();
  }, []);

  const visible = !heroVisible && !offerVisible && !cartOpen;

  useEffect(() => {
    // Solo afecta al botón de WhatsApp en móvil (la barra es md:hidden).
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    setBuyBarVisible(visible && isMobile);
  }, [visible, setBuyBarVisible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-vx-silver/15 bg-carbon-900/95 backdrop-blur-md md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="flex h-[76px] items-center gap-3 px-4">
            <JarRender className="w-9 shrink-0" alt="" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-extrabold italic leading-none text-vx-bone">{formatCOP(offer.priceCOP)}</p>
              <p className="mt-1 font-mono text-[11px] tracking-wider text-vx-silver">{copy.buyBar.note.toUpperCase()}</p>
            </div>
            <Button size="md" onClick={() => buy()} className="shrink-0">
              {mode === 'waitlist' ? 'LISTA DE ESPERA' : copy.buyBar.cta}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
