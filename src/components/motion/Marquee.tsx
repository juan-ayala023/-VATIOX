import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/format';

type MarqueeProps = {
  children: ReactNode;
  /** Segundos por vuelta */
  duration?: number;
  className?: string;
  trackClassName?: string;
  label?: string;
};

/**
 * Marquee infinito 100% CSS (transform). Se detiene con prefers-reduced-motion.
 * El contenido se duplica para el loop; la copia es aria-hidden.
 */
export function Marquee({ children, duration = 30, className, trackClassName, label }: MarqueeProps) {
  return (
    <div className={cn('overflow-hidden', className)} role={label ? 'region' : undefined} aria-label={label}>
      <div
        className={cn('animate-marquee flex w-max', trackClassName)}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
