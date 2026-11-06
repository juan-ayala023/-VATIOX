'use client';

import { AnimatePresence, motion } from 'motion/react';
import { FileText, Search } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Button, ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { copy } from '@/content/copy';
import { findLot, getMainProduct, lots, type Lot } from '@/lib/catalog';
import { whatsappUrl } from '@/lib/config';
import { formatDate } from '@/lib/format';
import { EASE } from '@/lib/hooks';

function Certificate({ lot }: { lot: Lot }) {
  const c = copy.lot.certRows;
  const rows = [
    { k: c.product, v: getMainProduct().name },
    { k: c.lot, v: lot.code },
    { k: c.date, v: formatDate(lot.date) },
    { k: c.lab, v: lot.labName },
  ];
  return (
    <div className="relative bg-vx-bone p-5 text-vx-carbon shadow-[0_40px_80px_rgba(0,0,0,0.55)] md:p-7">
      <div className="flex items-start justify-between border-b-2 border-vx-carbon pb-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.15em] text-vx-carbon/60">DOC. VX-QA-{lot.code}</p>
          <p className="font-display text-2xl font-black uppercase italic leading-none md:text-3xl">{copy.lot.certTitle}</p>
        </div>
        <span className="font-display text-3xl font-black italic leading-none">
          VATIO<span className="text-vx-red">X</span>
        </span>
      </div>
      <dl className="mt-3 divide-y divide-vx-carbon/15 text-sm">
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-[110px_1fr] gap-3 py-2">
            <dt className="font-mono text-[11px] uppercase text-vx-carbon/60">{r.k}</dt>
            <dd className="font-medium">{r.v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex items-end justify-between gap-4 bg-vx-carbon p-4 text-vx-bone">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] text-vx-silver">{c.nitrates.toUpperCase()}</p>
          <p className="headline mt-1 text-6xl text-vx-bone">
            {lot.nitratesMgPerServing}
            <span className="ml-1 text-3xl text-vx-red">MG</span>
          </p>
        </div>
        <div className="mb-1 h-12 w-24 bg-[repeating-linear-gradient(90deg,var(--vx-bone)_0_2px,transparent_2px_4px,var(--vx-bone)_4px_5px,transparent_5px_8px)] opacity-70" aria-hidden="true" />
      </div>
      {/* Sello */}
      <div className="absolute -bottom-8 -right-3 flex h-24 w-24 -rotate-12 bg-vx-bone/80 items-center justify-center rounded-full border-[3px] border-vx-red text-center font-mono text-[11px] font-medium leading-tight tracking-wider text-vx-red md:-right-6">
        <span>
          {copy.lot.certStamp}
          <br />
          VERIFICADO
        </span>
      </div>
      <p className="mt-3 font-mono text-[9px] tracking-wide text-vx-carbon/50">{copy.lot.certDisclaimer}</p>
    </div>
  );
}

export function LotCheck() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Lot | null | undefined>(undefined);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setResult(findLot(query) ?? null);
  };

  return (
    <section id="lote" aria-labelledby="lote-title" className="relative overflow-hidden border-y border-vx-silver/10 bg-carbon-900 py-20 tech-grid md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading eyebrow={copy.lot.eyebrow} title={copy.lot.title} id="lote-title" titleClassName="text-[11vw] sm:text-6xl lg:text-[64px]" />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-vx-silver">{copy.lot.intro}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={onSubmit} className="mt-8 max-w-lg">
              <label htmlFor="lot-input" className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-vx-silver">
                {copy.lot.searchLabel.toUpperCase()}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-vx-silver/60">LOTE</span>
                  <input
                    id="lot-input"
                    inputMode="numeric"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setResult(undefined);
                    }}
                    placeholder={copy.lot.searchPlaceholder}
                    className="vx-input pl-16 font-mono"
                    autoComplete="off"
                  />
                </div>
                <Button type="submit" size="md" aria-label={copy.lot.searchButton}>
                  <Search className="h-5 w-5 sm:hidden" />
                  <span className="max-sm:sr-only">{copy.lot.searchButton}</span>
                </Button>
              </div>
            </form>
          </Reveal>

          <div aria-live="polite" className="mt-4 max-w-lg">
            <AnimatePresence mode="wait">
              {result && (
                <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="flex flex-col gap-3 border border-vx-silver/15 bg-carbon-800 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.12em] text-vx-red">{copy.lot.found.toUpperCase()} · {result.code}</p>
                    <p className="mt-1 text-sm text-vx-bone">
                      {result.nitratesMgPerServing} mg de nitratos por porción · {formatDate(result.date)}
                    </p>
                  </div>
                  <ButtonLink href={result.pdfUrl} variant="outline" size="sm" external>
                    <FileText className="h-4 w-4" />
                    {copy.lot.viewPdf}
                  </ButtonLink>
                </motion.div>
              )}
              {result === null && (
                <motion.p key="ko" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border border-vx-red/40 bg-vx-red/10 p-4 text-sm text-vx-bone">
                  {copy.lot.notFound}{' '}
                  <a href={whatsappUrl(`Hola VATIOX, no encuentro el lote ${query} de mi frasco.`)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-vx-red">
                    WhatsApp →
                  </a>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md -rotate-3 lg:max-w-none"
          initial={{ opacity: 0, y: 60, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Certificate lot={lots[0]} />
        </motion.div>
      </div>
    </section>
  );
}
