import type Lenis from 'lenis';

let instance: Lenis | null = null;

export const lenisRef = {
  get: () => instance,
  set: (l: Lenis | null) => {
    instance = l;
  },
};

/** Detiene / reanuda el scroll suave cuando se abre un overlay (menú, carrito, modal). */
export function lockScroll(locked: boolean): void {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
