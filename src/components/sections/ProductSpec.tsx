'use client';

import { motion } from 'motion/react';
import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { SpeedLines } from '@/components/motion/SpeedLines';
import { JarRender } from '@/components/product/JarRender';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { copy } from '@/content/copy';
import { getMainProduct } from '@/lib/catalog';
import { EASE } from '@/lib/hooks';

export function ProductSpec() {
  const p = getMainProduct();
  const s = copy.product.specs;
  const rows = [
    { k: s.serving, v: `${p.servingGrams} g` },
    { k: s.content, v: `${p.netWeightGrams} g` },
    { k: s.servings, v: String(p.servingsPerUnit) },
    { k: s.flavor, v: p.flavor ?? copy.product.flavorPending, pending: !p.flavor }, // [VALIDAR VATIOX]
    { k: s.invima, v: p.invimaRegistry ?? copy.product.invimaPending, pending: !p.invimaRegistry }, // [VALIDAR VATIOX]
    { k: s.origin, v: p.madeIn },
  ];
  const mg = parseInt(p.keyMetric.value, 10);

  return (
    <section id="producto" aria-labelledby="producto-title" className="relative overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={copy.product.eyebrow} title={copy.product.title} id="producto-title" />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Contador grande */}
          <div className="relative">
            <SpeedLines count={10} className="opacity-60" />
            <div className="relative flex items-end gap-2 leading-none">
              <Counter to={mg} className="headline text-[42vw] tabular-nums text-vx-bone sm:text-[220px] lg:text-[260px]" />
              <span className="headline pb-[3vw] text-[12vw] text-vx-red sm:pb-6 sm:text-7xl lg:text-8xl">MG</span>
            </div>
            <Reveal delay={0.2}>
              <p className="mt-2 font-display text-2xl font-bold uppercase italic text-vx-silver md:text-3xl">{copy.product.counterCaption}</p>
            </Reveal>
            <div className="absolute -right-4 top-0 hidden w-36 rotate-6 opacity-90 sm:block lg:-right-8 lg:w-44">
              <JarRender alt="" />
            </div>
          </div>

          {/* Spec sheet */}
          <Reveal>
            <div className="border border-vx-silver/15 bg-carbon-800/60">
              <div className="flex items-center justify-between border-b border-vx-silver/15 px-4 py-3 font-mono text-[11px] tracking-[0.15em]">
                <span className="text-vx-bone">{copy.product.specTitle}</span>
                <span className="text-vx-silver">VX-01 / REV. A</span>
              </div>
              <dl>
                {rows.map((r, i) => (
                  <motion.div
                    key={r.k}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-vx-silver/10 px-4 py-3.5 last:border-b-0"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                  >
                    <dt className="text-sm text-vx-silver">{r.k}</dt>
                    <dd className={r.pending ? 'font-mono text-sm text-vx-silver/70' : 'font-mono text-sm text-vx-bone'}>
                      {r.pending ? `[${r.v.toUpperCase()}]` : r.v.toUpperCase()}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Cómo se toma — [VALIDAR VATIOX] */}
        <div className="mt-20 md:mt-28">
          <h3 className="headline text-5xl md:text-6xl">{copy.product.howTitle}</h3>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.product.howSteps.map((step, i) => (
              <motion.li
                key={step.title}
                className="relative list-none overflow-hidden border border-vx-silver/10 bg-carbon-800/50 p-6 clip-diag"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              >
                <span className="font-mono text-5xl text-vx-red">{String(i + 1).padStart(2, '0')}</span>
                {/* [VALIDAR VATIOX] */}
                <p className="mt-4 font-display text-3xl font-extrabold uppercase italic">{step.title}</p>
                <p className="mt-2 text-sm text-vx-silver">{step.text}</p>
              </motion.li>
            ))}
          </ol>
          <p className="mt-4 font-mono text-[11px] tracking-wider text-vx-silver/60">{copy.product.howNote}</p>
        </div>
      </div>
    </section>
  );
}
