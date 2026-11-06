'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { copy } from '@/content/copy';
import { EASE, useHydrated } from '@/lib/hooks';
import { lockScroll } from '@/lib/lenis';
import { computeTotals, useCart } from '@/lib/store/cart';
import { useUI } from '@/lib/store/ui';
import { cn } from '@/lib/format';

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuOpen = useUI((s) => s.menuOpen);
  const setMenuOpen = useUI((s) => s.setMenuOpen);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const items = useCart((s) => s.items);
  const hydrated = useHydrated();
  const count = hydrated ? computeTotals(items, null).units : 0;

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    if (menuOpen) return;
    setHidden((h) => (y > 160 && y > prev + 2 ? true : y < prev - 2 ? false : h));
  });

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <AnnouncementBar />
        <div
          className={cn(
            'transition-[background-color,backdrop-filter,border-color] duration-300',
            solid || menuOpen
              ? 'border-b border-vx-silver/10 bg-vx-carbon/80 backdrop-blur-md'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
            <Link href="/" aria-label="VATIOX, ir al inicio" className="-ml-1 flex h-11 items-center px-1" onClick={() => setMenuOpen(false)}>
              <Logo className="w-[104px] md:w-[120px]" />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
              {copy.nav.links.slice(0, 5).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative font-display text-lg font-bold uppercase italic tracking-wide text-vx-silver transition-colors hover:text-vx-bone after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-vx-red after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`${copy.nav.cart}${count ? `, ${count} unidades` : ''}`}
                className="relative flex h-11 w-11 items-center justify-center text-vx-bone transition-colors hover:text-vx-red"
              >
                <ShoppingBag className="h-6 w-6" strokeWidth={1.7} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                      className="absolute right-0.5 top-1 flex h-5 min-w-5 items-center justify-center bg-vx-red px-1 font-mono text-[11px] leading-none text-vx-bone"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="flex h-11 w-11 items-center justify-center text-vx-bone lg:hidden"
              >
                {menuOpen ? <X className="h-7 w-7" strokeWidth={1.7} /> : <Menu className="h-7 w-7" strokeWidth={1.7} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-40 flex flex-col bg-carbon-900 tech-grid px-6 pb-10 pt-32 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-1 flex-col gap-1" aria-label="Menú móvil">
              {copy.nav.links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-1 headline text-[13vw] leading-[1] text-vx-bone sm:text-7xl"
                  >
                    <span className="font-mono text-xs not-italic tracking-normal text-vx-red">{String(i + 1).padStart(2, '0')}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">{l.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              className="font-mono text-xs tracking-[0.15em] text-vx-silver/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              CADA VATIO CUENTA · HECHO EN COLOMBIA
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
