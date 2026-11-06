'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useId, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { copy } from '@/content/copy';
import { EASE } from '@/lib/hooks';
import { whatsappUrl } from '@/lib/config';

type Item = { q: string; a: string; link?: { label: string; href: string } };

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-vx-silver/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={copy.faq.eyebrow} title={copy.faq.title} id="faq-title" titleClassName="text-[12vw] sm:text-6xl" />
          <p className="mt-6 text-sm text-vx-silver">
            ¿Otra pregunta?{' '}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-vx-bone underline underline-offset-2 hover:text-vx-red">
              Escríbenos por WhatsApp
            </a>
          </p>
        </div>
        {/* [VALIDAR VATIOX] respuestas */}
        <ul className="border-t border-vx-silver/15">
          {(copy.faq.items as readonly Item[]).map((item, i) => {
            const isOpen = open === i;
            const btnId = `${uid}-q-${i}`;
            const panelId = `${uid}-a-${i}`;
            return (
              <li key={item.q} className="border-b border-vx-silver/15">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="font-display text-xl font-bold uppercase italic md:text-2xl">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={isOpen ? 'flex h-9 w-9 shrink-0 items-center justify-center bg-vx-red' : 'flex h-9 w-9 shrink-0 items-center justify-center border border-vx-silver/30'}
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-5 pr-12 text-vx-silver">
                        {item.a}{' '}
                        {item.link && (
                          <Link href={item.link.href} className="text-vx-bone underline underline-offset-2 hover:text-vx-red">
                            {item.link.label} →
                          </Link>
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
