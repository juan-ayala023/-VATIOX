'use client';

import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';
import { useEffect, type ReactNode } from 'react';
import { lenisRef } from '@/lib/lenis';
import { useCart } from '@/lib/store/cart';
import { useLaunchStore } from '@/lib/store/ui';

export function Providers({ children }: { children: ReactNode }) {
  // Rehidratar stores persistidos después del primer render (evita mismatches SSR).
  useEffect(() => {
    void useCart.persist.rehydrate();
    void useLaunchStore.persist.rehydrate();
  }, []);

  // Lenis: scroll suave, desactivado con prefers-reduced-motion.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: { offset: -70 } });
    lenisRef.set(lenis);
    return () => {
      lenis.destroy();
      lenisRef.set(null);
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
