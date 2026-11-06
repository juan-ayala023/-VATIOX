'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DiscountInput } from '@/components/cart/DiscountInput';
import { JarRender } from '@/components/product/JarRender';
import { Button } from '@/components/ui/Button';
import { copy, t } from '@/content/copy';
import { getMainProduct, savingsCOP } from '@/lib/catalog';
import { formatCOP } from '@/lib/format';
import { EASE, useMediaQuery } from '@/lib/hooks';
import { lockScroll, scrollToId } from '@/lib/lenis';
import { track } from '@/lib/analytics';
import { computeTotals, useCart } from '@/lib/store/cart';
import { useUI } from '@/lib/store/ui';

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const setOpen = useUI((s) => s.setCartOpen);
  const items = useCart((s) => s.items);
  const discountCode = useCart((s) => s.discountCode);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const swapOffer = useCart((s) => s.swapOffer);
  const [stockMsg, setStockMsg] = useState<string | null>(null);
  const desktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  const totals = computeTotals(items, discountCode);
  const product = getMainProduct();
  const single = product.offers.find((o) => o.units === 1);
  const combo = product.offers.find((o) => o.units === 2);
  const singleLine = single ? totals.lines.find((l) => l.offerId === single.id) : undefined;

  useEffect(() => {
    lockScroll(open);
    if (!open) {
      setStockMsg(null);
      return;
    }
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const handleQty = (offerId: string, qty: number) => {
    const res = setQty(offerId, qty);
    setStockMsg(res.ok ? null : copy.cart.stockError);
  };

  const goCheckout = () => {
    track('InitiateCheckout', {
      value: totals.total,
      num_items: totals.units,
      content_ids: totals.lines.map((l) => l.offerId),
    });
    setOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <motion.button
            type="button"
            aria-label={copy.cart.close}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            data-lenis-prevent
            className="absolute flex flex-col bg-carbon-800 outline-none max-md:inset-x-0 max-md:bottom-0 max-md:max-h-[88svh] max-md:border-t-2 max-md:border-vx-red md:inset-y-0 md:right-0 md:w-[440px] md:border-l md:border-vx-silver/10"
            initial={desktop ? { x: '100%' } : { y: '100%' }}
            animate={desktop ? { x: 0 } : { y: 0 }}
            exit={desktop ? { x: '100%' } : { y: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-vx-silver/10 px-5 py-3">
              <h2 id="cart-title" className="headline text-3xl">
                {copy.cart.title}
              </h2>
              <button type="button" onClick={() => setOpen(false)} aria-label={copy.cart.close} className="-mr-2 flex h-11 w-11 items-center justify-center text-vx-silver hover:text-vx-bone">
                <X className="h-6 w-6" />
              </button>
            </div>

            {totals.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-14 text-center">
                <JarRender variant="silhouette" className="w-20 opacity-60" alt="" />
                <p className="text-vx-silver">{copy.cart.empty}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollToId('comprar'), 50);
                  }}
                >
                  {copy.cart.emptyCta}
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
                  <ul className="space-y-3">
                    {totals.lines.map((line) => (
                      <li key={line.offerId} className="flex gap-4 border border-vx-silver/10 bg-carbon-900/60 p-3">
                        <div className="relative flex w-16 shrink-0 items-end justify-center">
                          <JarRender className="w-14" alt="" />
                          {line.offer.units > 1 && (
                            <span className="absolute right-0 top-0 bg-vx-red px-1 font-mono text-[10px] text-vx-bone">x{line.offer.units}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-lg font-extrabold uppercase italic leading-tight">{line.product.name}</p>
                          <p className="font-mono text-[11px] tracking-wider text-vx-silver">{line.offer.label.toUpperCase()} · {formatCOP(line.offer.priceCOP)}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border border-vx-silver/20">
                              <button type="button" aria-label={copy.offer.decrease} onClick={() => handleQty(line.offerId, line.qty - 1)} className="flex h-11 w-11 items-center justify-center hover:text-vx-red">
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center font-mono text-sm" aria-live="polite">
                                {line.qty}
                              </span>
                              <button type="button" aria-label={copy.offer.increase} onClick={() => handleQty(line.offerId, line.qty + 1)} className="flex h-11 w-11 items-center justify-center hover:text-vx-red">
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button type="button" onClick={() => remove(line.offerId)} aria-label={`${copy.cart.remove} ${line.offer.label}`} className="flex h-11 w-11 items-center justify-center text-vx-silver hover:text-vx-red">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {stockMsg && (
                    <p role="alert" className="mt-3 text-sm text-vx-red">
                      {stockMsg}
                    </p>
                  )}

                  {singleLine && combo && single && (
                    <div className="mt-4 flex items-center justify-between gap-3 border border-dashed border-vx-red/50 px-3 py-2.5">
                      <p className="text-sm text-vx-bone">{t(copy.cart.upsell, { savings: formatCOP(savingsCOP(combo)) })}</p>
                      <button
                        type="button"
                        onClick={() => {
                          // Cada frasco suelto se cambia por un combo solo si hay stock suficiente.
                          const res = swapOffer(single.id, combo.id);
                          setStockMsg(res.ok ? null : copy.cart.stockError);
                        }}
                        className="min-h-11 shrink-0 bg-vx-red px-3 font-display text-base font-extrabold italic text-vx-bone clip-diag-sm"
                      >
                        {copy.cart.upsellCta}
                      </button>
                    </div>
                  )}

                  <div className="mt-5">
                    <DiscountInput />
                  </div>
                </div>

                <div className="border-t border-vx-silver/10 bg-carbon-900 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-vx-silver">
                      <dt>{copy.cart.subtotal}</dt>
                      <dd className="font-mono">{formatCOP(totals.subtotal)}</dd>
                    </div>
                    {totals.discount > 0 && (
                      <div className="flex justify-between text-vx-red">
                        <dt>
                          {copy.cart.discount} ({discountCode})
                        </dt>
                        <dd className="font-mono">−{formatCOP(totals.discount)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between text-vx-silver">
                      <dt>{copy.cart.shipping}</dt>
                      <dd className="font-mono text-vx-bone">{copy.cart.shippingFree.toUpperCase()}</dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-vx-silver/10 pt-2">
                      <dt className="font-display text-xl font-extrabold uppercase italic">{copy.cart.total}</dt>
                      <dd className="font-display text-3xl font-black italic">{formatCOP(totals.total)}</dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-right font-mono text-[10px] tracking-wider text-vx-silver/70">IVA INCLUIDO</p>
                  <Button full size="lg" className="mt-3" onClick={goCheckout}>
                    {copy.cart.checkout} — {formatCOP(totals.total)}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
