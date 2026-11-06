'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { EASE } from '@/lib/hooks';

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  amount?: number;
};

export function Reveal({ children, delay = 0, y = 28, x = 0, duration = 0.7, amount = 0.3, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
