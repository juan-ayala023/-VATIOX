'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { findDiscount, getOffer, type Offer, type Product } from '@/lib/catalog';
import { safeStorage } from './storage';

export type CartItem = { offerId: string; qty: number };

export type CartLine = CartItem & {
  product: Product;
  offer: Offer;
  units: number;
  lineTotal: number;
};

export type AddResult = { ok: true } | { ok: false; reason: 'stock' | 'unknown'; left: number };

type CartState = {
  items: CartItem[];
  discountCode: string | null;
  add: (offerId: string, qty?: number) => AddResult;
  setQty: (offerId: string, qty: number) => AddResult;
  remove: (offerId: string) => void;
  swapOffer: (fromId: string, toId: string) => AddResult;
  applyCode: (code: string) => boolean;
  clearCode: () => void;
  clear: () => void;
};

/** Unidades físicas (frascos) de un producto en el carrito. Un combo de 2 cuenta como 2. */
export function unitsForProduct(items: CartItem[], productId: string): number {
  return items.reduce((sum, it) => {
    const found = getOffer(it.offerId);
    return found && found.product.id === productId ? sum + found.offer.units * it.qty : sum;
  }, 0);
}

/** Valida el carrito propuesto contra el stock. `left` = unidades que aún se pueden agregar. */
function checkStock(current: CartItem[], next: CartItem[], product: Product): AddResult {
  if (unitsForProduct(next, product.id) > product.stock) {
    return { ok: false, reason: 'stock', left: Math.max(0, product.stock - unitsForProduct(current, product.id)) };
  }
  return { ok: true };
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discountCode: null,

      add: (offerId, qty = 1) => {
        const found = getOffer(offerId);
        if (!found) return { ok: false, reason: 'unknown', left: 0 };
        const { product } = found;
        const items = get().items;
        const existing = items.find((i) => i.offerId === offerId);
        const next = existing
          ? items.map((i) => (i.offerId === offerId ? { ...i, qty: i.qty + qty } : i))
          : [...items, { offerId, qty }];
        const res = checkStock(items, next, product);
        if (!res.ok) return res;
        set({ items: next });
        return { ok: true };
      },

      setQty: (offerId, qty) => {
        if (qty <= 0) {
          get().remove(offerId);
          return { ok: true };
        }
        const found = getOffer(offerId);
        if (!found) return { ok: false, reason: 'unknown', left: 0 };
        const items = get().items;
        const next = items.map((i) => (i.offerId === offerId ? { ...i, qty } : i));
        const res = checkStock(items, next, found.product);
        if (!res.ok) return res;
        set({ items: next });
        return { ok: true };
      },

      remove: (offerId) => set({ items: get().items.filter((i) => i.offerId !== offerId) }),

      swapOffer: (fromId, toId) => {
        const items = get().items;
        const from = items.find((i) => i.offerId === fromId);
        const found = getOffer(toId);
        if (!from || !found) return { ok: false, reason: 'unknown', left: 0 };
        const without = items.filter((i) => i.offerId !== fromId);
        const existing = without.find((i) => i.offerId === toId);
        const next = existing
          ? without.map((i) => (i.offerId === toId ? { ...i, qty: i.qty + from.qty } : i))
          : [...without, { offerId: toId, qty: from.qty }];
        const res = checkStock(items, next, found.product);
        if (!res.ok) return res;
        set({ items: next });
        return { ok: true };
      },

      applyCode: (code) => {
        const d = findDiscount(code);
        if (!d) return false;
        set({ discountCode: d.code });
        return true;
      },

      clearCode: () => set({ discountCode: null }),

      clear: () => set({ items: [], discountCode: null }),
    }),
    {
      name: 'vatiox-cart',
      storage: safeStorage,
      version: 1,
      skipHydration: true,
    },
  ),
);

export type CartTotals = {
  lines: CartLine[];
  units: number;
  count: number;
  subtotal: number;
  discount: number;
  discountPercent: number;
  shipping: number;
  total: number;
};

export function computeTotals(items: CartItem[], discountCode: string | null): CartTotals {
  const lines: CartLine[] = [];
  for (const it of items) {
    const found = getOffer(it.offerId);
    if (!found) continue;
    lines.push({
      ...it,
      product: found.product,
      offer: found.offer,
      units: found.offer.units * it.qty,
      lineTotal: found.offer.priceCOP * it.qty,
    });
  }
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const d = discountCode ? findDiscount(discountCode) : undefined;
  const discountPercent = d?.percent ?? 0;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const shipping = 0; // envío gratis en todas las ofertas actuales
  return {
    lines,
    units: lines.reduce((s, l) => s + l.units, 0),
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal,
    discount,
    discountPercent,
    shipping,
    total: subtotal - discount + shipping,
  };
}
