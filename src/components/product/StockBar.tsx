'use client';

import { motion } from 'motion/react';
import { copy, t } from '@/content/copy';
import { getMainProduct } from '@/lib/catalog';
import { EASE } from '@/lib/hooks';
import { cn } from '@/lib/format';

/** Indicador de stock real: lee de catalog.ts */
export function StockBar({ className, compact = false }: { className?: string; compact?: boolean }) {
  const p = getMainProduct();
  const total = p.lotSize ?? p.stock;
  const left = p.stock;
  const pct = total > 0 ? (left / total) * 100 : 0;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.12em]">
        <span className="text-vx-silver">
          {copy.stock.label} · <span className="text-vx-bone">{left > 0 ? t(copy.stock.template, { left, total }) : copy.stock.soldOut}</span>
        </span>
        {!compact && <span className="text-vx-red">{Math.round(pct)}%</span>}
      </div>
      <div
        className="relative mt-2 h-1.5 overflow-hidden bg-carbon-700"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={left}
        aria-label={`Unidades disponibles del primer lote: ${left} de ${total}`}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left bg-vx-red"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: pct / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        />
        {/* marcas técnicas cada 10% */}
        <div className="pointer-events-none absolute inset-0 flex justify-between px-px" aria-hidden="true">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="h-full w-px bg-vx-carbon/70" />
          ))}
        </div>
      </div>
    </div>
  );
}
