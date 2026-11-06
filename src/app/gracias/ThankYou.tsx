'use client';

import { motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { copy } from '@/content/copy';
import { mockDb } from '@/lib/adapters/mockDb';
import { track } from '@/lib/analytics';
import { EASE } from '@/lib/hooks';

export function ThankYou() {
  const params = useSearchParams();
  const orderId = params.get('order') ?? 'VX-0001';
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    const order = mockDb.getOrder(orderId);
    track('Purchase', {
      order_id: orderId,
      value: order?.totalCOP ?? 0,
      num_items: order?.lines.reduce((s, l) => s + l.units, 0),
      ambassador_code: order?.ambassadorCode ?? undefined,
    });
  }, [orderId]);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Animación de confirmación */}
      <motion.div
        className="relative flex h-28 w-28 items-center justify-center bg-vx-red clip-diag"
        initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 16 }}
      >
        <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden="true">
          <motion.path
            d="M10 25 L20 35 L38 14"
            fill="none"
            stroke="var(--vx-bone)"
            strokeWidth="5"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          />
        </svg>
      </motion.div>

      <motion.p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-vx-red" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {copy.thanks.eyebrow}
      </motion.p>
      <motion.h1 className="headline mt-2 text-[22vw] sm:text-9xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}>
        {copy.thanks.title}
      </motion.h1>

      <motion.div className="mt-6 border border-vx-silver/15 bg-carbon-800 px-6 py-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}>
        <p className="font-mono text-[11px] tracking-[0.12em] text-vx-silver">{copy.thanks.orderLabel.toUpperCase()}</p>
        <p className="mt-1 font-mono text-3xl text-vx-bone">{orderId}</p>
      </motion.div>

      <motion.p className="mt-6 max-w-md text-vx-silver" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
        {copy.thanks.body}
      </motion.p>

      <motion.div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
        <ButtonLink href={`/rastreo?order=${encodeURIComponent(orderId)}`} full>
          {copy.thanks.track}
        </ButtonLink>
        <ButtonLink href="/" variant="outline" full>
          {copy.thanks.back}
        </ButtonLink>
      </motion.div>
    </div>
  );
}
