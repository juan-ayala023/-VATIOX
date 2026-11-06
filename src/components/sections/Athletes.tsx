'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { copy } from '@/content/copy';
import { EASE } from '@/lib/hooks';

const isDev = process.env.NODE_ENV === 'development';

export function Athletes() {
  const scroller = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="atletas-title" className="overflow-hidden border-t border-vx-silver/10 py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 md:px-8">
        <SectionHeading eyebrow={copy.athletes.eyebrow} title={copy.athletes.title} id="atletas-title" />
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => scrollBy(-1)} aria-label={copy.athletes.prev} className="flex h-12 w-12 items-center justify-center border border-vx-silver/25 transition-colors hover:border-vx-red hover:bg-vx-red">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label={copy.athletes.next} className="flex h-12 w-12 items-center justify-center border border-vx-silver/25 transition-colors hover:border-vx-red hover:bg-vx-red">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Carrusel: arrastre táctil nativo en móvil (scroll-snap), flechas en desktop */}
      <ul
        ref={scroller}
        data-lenis-prevent-wheel
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:scroll-px-8 md:px-8 xl:px-[calc((100vw-80rem)/2+2rem)] xl:scroll-px-[calc((100vw-80rem)/2+2rem)]"
        aria-label="Carrusel de atletas"
      >
        {copy.athletes.items.map((a, i) => (
          <motion.li
            key={i}
            className="w-[78vw] shrink-0 snap-start sm:w-[340px]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 3) * 0.08 }}
          >
            <article className="h-full border border-vx-silver/10 bg-carbon-800/60">
              <div className="grain-local relative aspect-[4/5] bg-gradient-to-br from-carbon-700 to-carbon-900">
                <svg viewBox="0 0 200 250" className="absolute inset-x-0 bottom-0 mx-auto w-2/3 text-black/50" aria-hidden="true">
                  <path fill="currentColor" d="M100 40c17 0 30 14 30 31s-13 33-30 33-30-16-30-33 13-31 30-31Zm-62 210c4-52 27-86 62-86s58 34 62 86H38Z" />
                </svg>
                {isDev && (
                  <span className="absolute left-3 top-3 bg-vx-red px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-vx-bone">{copy.athletes.exampleTag}</span>
                )}
                <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.12em] text-vx-silver/70">ATL-{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] tracking-[0.12em] text-vx-red">{a.discipline.toUpperCase()}</p>
                <h3 className="mt-1 font-display text-3xl font-extrabold uppercase italic">{a.name}</h3>
                <p className="mt-3 text-sm italic text-vx-silver">“{a.quote}”</p>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
