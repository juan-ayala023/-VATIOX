'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { copy } from '@/content/copy';
import { shippingAdapter, type Tracking } from '@/lib/adapters';
import { whatsappUrl } from '@/lib/config';
import { formatDate, cn } from '@/lib/format';
import { EASE } from '@/lib/hooks';

export function TrackingLookup() {
  const params = useSearchParams();
  const initial = params.get('order') ?? '';
  const [query, setQuery] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Tracking | null | undefined>(undefined);
  const c = copy.tracking;

  const lookup = useCallback(async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setResult(await shippingAdapter.getTracking(id));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (initial) void lookup(initial);
  }, [initial, lookup]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void lookup(query);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="max-w-lg">
        <label htmlFor="track-input" className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-vx-silver">
          {c.label.toUpperCase()}
        </label>
        <div className="flex gap-2">
          <input id="track-input" value={query} onChange={(e) => setQuery(e.target.value.toUpperCase())} placeholder={c.placeholder} className="vx-input font-mono uppercase" autoComplete="off" />
          <Button type="submit" disabled={loading}>
            {loading ? '…' : c.button}
          </Button>
        </div>
      </form>

      <div aria-live="polite" className="mt-10">
        <AnimatePresence mode="wait">
          {result === null && (
            <motion.p key="ko" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg border border-vx-red/40 bg-vx-red/10 p-4 text-sm">
              {c.notFound}{' '}
              <a href={whatsappUrl(`Hola VATIOX, quiero rastrear mi pedido ${query}.`)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                WhatsApp →
              </a>
            </motion.p>
          )}
          {result && (
            <motion.div key={result.orderId} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="max-w-2xl">
              <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-vx-silver/15 pb-4 font-mono text-[11px] tracking-[0.12em]">
                <span className="text-vx-silver">
                  PEDIDO <span className="text-vx-bone">{result.orderId}</span>
                </span>
                <span className="text-vx-silver">
                  {c.carrier.toUpperCase()} <span className="text-vx-bone">{result.carrier.toUpperCase()}</span>
                </span>
                <span className="text-vx-silver">
                  {c.guide.toUpperCase()} <span className="text-vx-bone">{result.guide ?? '—'}</span>
                </span>
              </div>
              <ol className="relative mt-8">
                {result.steps.map((s, i) => {
                  const current = s.done && !result.steps[i + 1]?.done;
                  return (
                    <motion.li
                      key={s.label}
                      className="relative flex gap-5 pb-10 last:pb-0"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
                    >
                      {i < result.steps.length - 1 && (
                        <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 bg-carbon-700">
                          <motion.span
                            className="block h-full w-full origin-top bg-vx-red"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: result.steps[i + 1]?.done ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.12 }}
                          />
                        </span>
                      )}
                      <span
                        className={cn(
                          'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center font-mono text-xs',
                          s.done ? 'bg-vx-red text-vx-bone' : 'border border-vx-silver/30 text-vx-silver',
                          current && 'ring-4 ring-vx-red/30',
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className={cn('font-display text-2xl font-extrabold uppercase italic', !s.done && 'text-vx-silver/60')}>{s.label}</p>
                        <p className="font-mono text-[11px] tracking-wider text-vx-silver">{s.date ? formatDate(s.date).toUpperCase() : 'PENDIENTE'}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
