'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SpeedLines } from '@/components/motion/SpeedLines';
import { Button } from '@/components/ui/Button';
import { copy } from '@/content/copy';
import { useBuy } from '@/lib/useBuy';

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const clip = useTransform(scrollYProgress, (p) => `inset(0 ${100 - Math.min(1, Math.max(0, p)) * 100}% 0 0)`);
  const { buy, mode } = useBuy();
  const lines = copy.finalCta.title.split(' ');
  const text = (
    <>
      {lines[0]} {lines[1]}
      <br />
      {lines.slice(2).join(' ')}
    </>
  );

  return (
    <section ref={ref} aria-labelledby="final-title" className="relative flex min-h-svh items-center justify-center overflow-hidden bg-vx-carbon py-24">
      <SpeedLines count={16} />
      <div className="relative px-4 text-center">
        <h2 id="final-title" className="relative" aria-label={copy.finalCta.title}>
          <span className="headline block text-stroke text-[19vw] lg:text-[15vw]" aria-hidden="true">
            {text}
          </span>
          {/* Relleno rojo que avanza con el scroll */}
          <motion.span
            aria-hidden="true"
            className="headline absolute inset-0 block text-[19vw] text-vx-red lg:text-[15vw]"
            style={{ clipPath: clip }}
          >
            {text}
          </motion.span>
        </h2>
        <div className="mt-10 flex justify-center">
          <Button size="lg" onClick={() => buy()} className="min-w-64">
            {mode === 'waitlist' ? copy.waitlist.cta : copy.finalCta.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
