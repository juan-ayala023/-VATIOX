'use client';

import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { copy, t } from '@/content/copy';
import { getMainProduct, pricePerServing } from '@/lib/catalog';
import { formatCOP } from '@/lib/format';
import { EASE } from '@/lib/hooks';

export function WhyVatiox() {
  const p = getMainProduct();
  const perServing = formatCOP(pricePerServing(p, p.offers[0]));

  return (
    <section aria-labelledby="why-title" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={copy.why.eyebrow} title={copy.why.title} id="why-title" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.why.cards.map((card, i) => (
            <motion.article
              key={card.n}
              className="group relative overflow-hidden border border-vx-silver/10 bg-carbon-800/60 p-6 md:p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
            >
              <span className="font-mono text-6xl text-vx-bone/90 md:text-7xl">{card.n}</span>
              {/* Línea roja que se dibuja de izquierda a derecha */}
              <motion.span
                aria-hidden="true"
                className="mt-6 block h-[3px] w-full origin-left bg-vx-red"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.12 }}
              />
              <h3 className="mt-6 font-display text-3xl font-black uppercase italic md:text-4xl">{card.title}</h3>
              <p className="mt-2 text-vx-silver">{t(card.text, { perServing })}</p>
              <span aria-hidden="true" className="absolute -bottom-6 -right-2 font-display text-[140px] font-black italic leading-none text-vx-silver/[0.04]">
                X
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
