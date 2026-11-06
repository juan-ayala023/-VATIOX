'use client';

import { ArrowRight, Lock, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Countdown } from '@/components/forms/Countdown';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { Reveal } from '@/components/motion/Reveal';
import { OfferCard } from '@/components/product/OfferCard';
import { StockBar } from '@/components/product/StockBar';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { copy, t } from '@/content/copy';
import { getMainProduct } from '@/lib/catalog';
import { WHATSAPP_WHOLESALE_MESSAGE, whatsappUrl } from '@/lib/config';
import { formatCOP } from '@/lib/format';
import { track } from '@/lib/analytics';
import { useBuy } from '@/lib/useBuy';

export function Offer() {
  const product = getMainProduct();
  const featuredOffer = product.offers.find((o) => o.badge) ?? product.offers[0];
  const [selectedId, setSelectedId] = useState(featuredOffer.id);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { buy, mode } = useBuy();
  const selected = product.offers.find((o) => o.id === selectedId) ?? product.offers[0];
  const maxQty = Math.max(1, Math.floor(product.stock / selected.units));

  const onAdd = () => {
    const res = buy(selected.id, qty);
    if (!res.ok && res.reason === 'stock') setError(t(copy.offer.stockError, { left: res.left }));
    else setError(null);
  };

  return (
    <section id="comprar" aria-labelledby="comprar-title" className="relative border-y border-vx-silver/10 bg-carbon-900 py-20 tech-grid md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[90vw] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse at top, rgb(227 6 19 / 0.14), transparent 65%)' }}
      />
      <div className="relative mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading eyebrow={copy.offer.eyebrow} title={mode === 'waitlist' ? copy.waitlist.title : copy.offer.title} id="comprar-title" align="center" />

        {mode === 'waitlist' ? (
          <Reveal className="mx-auto mt-10 max-w-xl border border-vx-silver/15 bg-carbon-800/80 p-5 md:p-8">
            <p className="text-vx-silver">{copy.waitlist.intro}</p>
            <Countdown className="my-6" />
            <WaitlistForm idPrefix="wl-offer" />
          </Reveal>
        ) : (
          <>
            <div role="radiogroup" aria-label="Ofertas" className="mt-10 grid gap-4 md:grid-cols-2">
              {product.offers.map((o, i) => (
                <Reveal key={o.id} delay={i * 0.1}>
                  <OfferCard
                    name="offer"
                    product={product}
                    offer={o}
                    featured={o.id === featuredOffer.id}
                    selected={o.id === selectedId}
                    onSelect={() => {
                      setSelectedId(o.id);
                      setQty(1);
                      setError(null);
                    }}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15} className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex items-center justify-between border border-vx-silver/20 bg-carbon-800 sm:justify-start">
                <span className="px-4 font-mono text-[11px] tracking-[0.12em] text-vx-silver sm:sr-only">{copy.offer.quantity.toUpperCase()}</span>
                <div className="flex items-center">
                  <button type="button" onClick={() => { setQty((q) => Math.max(1, q - 1)); setError(null); }} aria-label={copy.offer.decrease} className="flex h-14 w-12 items-center justify-center hover:text-vx-red">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-mono text-lg" aria-live="polite" aria-label={`${copy.offer.quantity}: ${qty}`}>
                    {qty}
                  </span>
                  <button type="button" onClick={() => { setQty((q) => Math.min(maxQty, q + 1)); setError(null); }} aria-label={copy.offer.increase} className="flex h-14 w-12 items-center justify-center hover:text-vx-red">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <Button size="lg" full onClick={onAdd} className="sm:flex-1">
                {copy.offer.addToCart} — {formatCOP(selected.priceCOP * qty)}
              </Button>
            </Reveal>
            {error && (
              <p role="alert" className="mx-auto mt-3 max-w-xl text-center text-sm text-vx-red">
                {error}
              </p>
            )}
          </>
        )}

        <div className="mx-auto mt-10 max-w-xl">
          <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Medios de pago">
            {copy.offer.payments.map((p) => (
              <li key={p} className="border border-vx-silver/20 px-3 py-1.5 font-mono text-[11px] tracking-wider text-vx-bone">
                {p.toUpperCase()}
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-col items-center gap-1 text-sm text-vx-silver sm:flex-row sm:justify-center sm:gap-6">
            {copy.offer.perks.map((perk) => (
              <li key={perk}>✓ {perk}</li>
            ))}
          </ul>

          <StockBar className="mt-8" />
          <p className="mt-2 text-center font-mono text-[11px] tracking-wider text-vx-silver">{copy.stock.limited.toUpperCase()}</p>

          <div aria-disabled="true" className="mt-8 flex items-center justify-center gap-2 border border-dashed border-vx-silver/25 px-4 py-4 font-display text-lg font-bold uppercase italic text-vx-silver/60">
            <Lock className="h-4 w-4" />
            {copy.offer.subscription}
          </div>

          <p className="mt-6 text-center">
            <a
              href={whatsappUrl(WHATSAPP_WHOLESALE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('Contact', { channel: 'whatsapp', placement: 'wholesale' })}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm text-vx-silver underline-offset-4 hover:text-vx-bone hover:underline"
            >
              {copy.offer.wholesale}
              <ArrowRight className="h-4 w-4" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
