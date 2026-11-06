/**
 * Configuración global de lanzamiento.
 * Cambiar LAUNCH_MODE a 'waitlist' convierte todos los CTA de compra en lista de espera.
 */
export type LaunchMode = 'waitlist' | 'live';

export const LAUNCH_MODE: LaunchMode = 'live';
export const WHATSAPP_NUMBER = '57XXXXXXXXXX'; // placeholder
export const LAUNCH_DATE = '2026-12-01T00:00:00-05:00'; // placeholder

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vatiox.co';
export const BRAND_NAME = 'VATIOX';
export const INSTAGRAM_URL = 'https://instagram.com/vatiox'; // placeholder

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola VATIOX, quiero información sobre el polvo de remolacha.';
export const WHATSAPP_WHOLESALE_MESSAGE =
  'Hola VATIOX, tengo una tienda / equipo y quiero información de compras al por mayor.';

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
