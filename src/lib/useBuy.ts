'use client';

import { getMainProduct, getOffer } from '@/lib/catalog';
import { track } from '@/lib/analytics';
import { useCart, type AddResult } from '@/lib/store/cart';
import { useLaunchMode, useUI } from '@/lib/store/ui';

/**
 * Acción única de compra para todos los CTA.
 * - live: agrega la oferta al carrito y abre el drawer.
 * - waitlist: abre el formulario de lista de espera.
 */
export function useBuy() {
  const mode = useLaunchMode();
  const add = useCart((s) => s.add);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const setWaitlistOpen = useUI((s) => s.setWaitlistOpen);

  const buy = (offerId: string = getMainProduct().offers[0].id, qty = 1): AddResult => {
    if (mode === 'waitlist') {
      setWaitlistOpen(true);
      return { ok: true };
    }
    const res = add(offerId, qty);
    if (res.ok) {
      const found = getOffer(offerId);
      if (found) {
        track('AddToCart', {
          value: found.offer.priceCOP * qty,
          content_ids: [offerId],
          content_name: `${found.product.name} · ${found.offer.label}`,
          num_items: found.offer.units * qty,
        });
      }
    }
    setCartOpen(true);
    return res;
  };

  return { mode, buy };
}
