/**
 * Helper de analítica. Envía a Meta Pixel y GA4 solo si están cargados (ver components/Analytics.tsx).
 */
export type TrackEvent =
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Lead'
  | 'Contact';

type TrackData = {
  value?: number;
  currency?: 'COP';
  content_ids?: string[];
  content_name?: string;
  num_items?: number;
  order_id?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_EVENT_MAP: Record<TrackEvent, string> = {
  ViewContent: 'view_item',
  AddToCart: 'add_to_cart',
  InitiateCheckout: 'begin_checkout',
  Purchase: 'purchase',
  Lead: 'generate_lead',
  Contact: 'contact',
};

export function track(event: TrackEvent, data: TrackData = {}): void {
  if (typeof window === 'undefined') return;
  const payload = { currency: 'COP' as const, ...data };
  try {
    if (event === 'Contact') window.fbq?.('track', 'Contact', payload);
    else window.fbq?.('track', event, payload);
    window.gtag?.('event', GA_EVENT_MAP[event], {
      ...payload,
      transaction_id: data.order_id,
      items: data.content_ids?.map((id) => ({ item_id: id })),
    });
  } catch {
    /* la analítica nunca debe romper la compra */
  }
  if (process.env.NODE_ENV === 'development') {
    console.info(`[track] ${event}`, payload);
  }
}
