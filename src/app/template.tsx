'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';

// No animar en la primera carga: el primer CTA debe verse sin demora.
let firstLoad = true;

/** Transición entre páginas: cortina diagonal roja breve (300 ms). */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [isNavigation] = useState(() => !firstLoad);

  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <>
      {isNavigation && !reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-[-20%] z-[90] bg-vx-red"
          style={{ clipPath: 'polygon(18% 0, 100% 0, 82% 100%, 0 100%)' }}
          initial={{ x: '0%' }}
          animate={{ x: '140%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      {children}
    </>
  );
}
