'use client';

import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '@/lib/hooks';
import { cn } from '@/lib/format';

type SplitTextProps = {
  text: string;
  className?: string;
  /** 'mount' anima al cargar (hero); 'inView' al entrar en viewport */
  trigger?: 'mount' | 'inView';
  delay?: number;
  stagger?: number;
  /** Desenfoque → nítido */
  blur?: boolean;
  as?: 'h1' | 'h2' | 'p' | 'span';
  /** Fuerza salto de línea entre palabras indicadas por "|" en el texto */
  wordClassName?: string;
};

export function SplitText({
  text,
  className,
  trigger = 'inView',
  delay = 0,
  stagger = 0.028,
  blur = true,
  as = 'h2',
  wordClassName,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const lines = text.split('|');
  const label = lines.join(' ').replace(/\s+/g, ' ').trim();
  let i = 0;

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, y: '0.35em', filter: blur ? 'blur(10px)' : 'blur(0px)' };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, y: '0em', filter: 'blur(0px)' };

  const animateProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'shown' }
      : { initial: 'hidden', whileInView: 'shown', viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className} aria-label={label} {...animateProps}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line
            .trim()
            .split(' ')
            .map((word, wi, arr) => (
              <span key={wi} className={cn('inline-block whitespace-nowrap', wordClassName)}>
                {word.split('').map((ch) => {
                  const idx = i++;
                  return (
                    <motion.span
                      key={idx}
                      className="inline-block will-change-transform"
                      variants={{
                        hidden,
                        shown: {
                          ...shown,
                          transition: { duration: reduce ? 0.3 : 0.55, ease: EASE, delay: delay + idx * (reduce ? 0 : stagger) },
                        },
                      }}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
                {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
              </span>
            ))}
        </span>
      ))}
    </Tag>
  );
}
