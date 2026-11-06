/**
 * Catálogo centralizado. Todo precio, stock, lote y código vive aquí.
 * Pensado para crecer: más productos (Cereza, Colágeno) y venta al por mayor.
 */

export type Offer = {
  id: string;
  label: string;
  units: number;
  priceCOP: number;
  compareAtCOP?: number;
  freeShipping: boolean;
  badge?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  status: 'active' | 'coming_soon';
  servingGrams: number;
  servingsPerUnit: number;
  netWeightGrams: number;
  keyMetric: { label: string; value: string };
  flavor: string | null; // null = por definir
  flavorOptions?: string[]; // opciones en discusión
  invimaRegistry: string | null; // null = pendiente
  madeIn: string;
  offers: Offer[];
  stock: number; // inventario disponible (mock)
  lotSize?: number; // unidades totales del lote actual
  images: string[];
};

export type Lot = {
  code: string;
  date: string; // ISO
  nitratesMgPerServing: number;
  labName: string;
  pdfUrl: string;
};

export type DiscountCode = {
  code: string;
  percent: number;
  ambassador: string; // para atribución de ventas
};

export const products: Product[] = [
  {
    id: 'vx-remolacha',
    slug: 'polvo-de-remolacha',
    name: 'VATIOX Polvo de remolacha',
    tagline: '600 mg de nitratos por porción. Comprobado en cada lote.',
    status: 'active',
    servingGrams: 20,
    servingsPerUnit: 30,
    netWeightGrams: 600,
    keyMetric: { label: 'Nitratos por porción', value: '600 mg' },
    flavor: null,
    flavorOptions: ['Frutos rojos', 'Sandía limón', 'Limón'],
    invimaRegistry: null,
    madeIn: 'Colombia',
    offers: [
      {
        id: 'vx-remolacha-1',
        label: '1 frasco',
        units: 1,
        priceCOP: 189900,
        freeShipping: true,
      },
      {
        id: 'vx-remolacha-2',
        label: 'Combo 2 frascos',
        units: 2,
        priceCOP: 349900,
        compareAtCOP: 379800,
        freeShipping: true,
        badge: 'AHORRAS $29.900',
      },
    ],
    stock: 116,
    lotSize: 116,
    images: [], // '/product/frasco.png' cuando exista la foto real
  },
  {
    id: 'vx-cereza',
    slug: 'cereza',
    name: 'VATIOX Cereza',
    tagline: 'Próximamente.',
    status: 'coming_soon',
    servingGrams: 0,
    servingsPerUnit: 0,
    netWeightGrams: 0,
    keyMetric: { label: 'Por anunciar', value: '—' },
    flavor: null,
    invimaRegistry: null,
    madeIn: 'Colombia',
    offers: [],
    stock: 0,
    images: [],
  },
  {
    id: 'vx-colageno',
    slug: 'colageno',
    name: 'VATIOX Colágeno',
    tagline: 'Próximamente.',
    status: 'coming_soon',
    servingGrams: 0,
    servingsPerUnit: 0,
    netWeightGrams: 0,
    keyMetric: { label: 'Por anunciar', value: '—' },
    flavor: null,
    invimaRegistry: null,
    madeIn: 'Colombia',
    offers: [],
    stock: 0,
    images: [],
  },
];

export const lots: Lot[] = [
  {
    code: '001',
    date: '2026-10-15',
    nitratesMgPerServing: 600, // [VALIDAR VATIOX] valor real del certificado
    labName: 'Laboratorio externo (por confirmar)',
    pdfUrl: '#', // placeholder: /public/lotes/lote-001.pdf
  },
];

export const discountCodes: DiscountCode[] = [
  { code: 'JAIDER10', percent: 10, ambassador: 'Jaider Muñoz' },
  { code: 'ALEJO10', percent: 10, ambassador: 'Alejandro Ospina' },
];

/* ───────────────────────── Helpers ───────────────────────── */

export const MAIN_PRODUCT_ID = 'vx-remolacha';

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getMainProduct(): Product {
  const p = getProduct(MAIN_PRODUCT_ID);
  if (!p) throw new Error('Producto principal no encontrado en catalog.ts');
  return p;
}

export function getOffer(offerId: string): { product: Product; offer: Offer } | undefined {
  for (const product of products) {
    const offer = product.offers.find((o) => o.id === offerId);
    if (offer) return { product, offer };
  }
  return undefined;
}

export function activeProducts(): Product[] {
  return products.filter((p) => p.status === 'active');
}

export function comingSoonProducts(): Product[] {
  return products.filter((p) => p.status === 'coming_soon');
}

/** Precio por porción, redondeado a la centena. */
export function pricePerServing(product: Product, offer: Offer): number {
  const servings = offer.units * product.servingsPerUnit;
  if (servings <= 0) return 0;
  return Math.round(offer.priceCOP / servings / 100) * 100;
}

export function savingsCOP(offer: Offer): number {
  return offer.compareAtCOP ? offer.compareAtCOP - offer.priceCOP : 0;
}

export function findLot(code: string): Lot | undefined {
  const normalized = code.trim().replace(/^lote\s*/i, '').padStart(3, '0');
  return lots.find((l) => l.code === normalized);
}

export function findDiscount(code: string): DiscountCode | undefined {
  const normalized = code.trim().toUpperCase();
  return discountCodes.find((d) => d.code === normalized);
}
