import { AlertTriangle } from 'lucide-react';
import { copy } from '@/content/copy';

export type LegalSection = { id: string; title: string; paragraphs: string[]; items?: string[] };

type Props = {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
};

/** Layout de documento legal: índice lateral + secciones. Contenido BORRADOR. */
export function LegalDoc({ eyebrow, title, updated, sections }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="flex items-center gap-3 border border-vx-red/50 bg-vx-red/10 px-4 py-3 font-mono text-xs tracking-[0.12em] text-vx-bone" role="note">
        <AlertTriangle className="h-4 w-4 shrink-0 text-vx-red" />
        {copy.legal.draftBanner}
      </div>
      <p className="mt-10 font-mono text-[11px] tracking-[0.18em] text-vx-silver">{eyebrow}</p>
      <h1 className="headline mt-2 text-[12vw] sm:text-6xl lg:text-7xl">{title}</h1>
      <p className="mt-3 font-mono text-[11px] tracking-wider text-vx-silver/70">
        {copy.legal.updated.toUpperCase()}: {updated}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
        <nav aria-label={copy.legal.index} className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[11px] tracking-[0.15em] text-vx-silver">{copy.legal.index.toUpperCase()}</p>
          <ol className="mt-3 space-y-1 border-l border-vx-silver/15">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px flex min-h-10 items-center gap-3 border-l-2 border-transparent pl-4 text-sm text-vx-silver hover:border-vx-red hover:text-vx-bone">
                  <span className="font-mono text-[11px] text-vx-red">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-[68ch] space-y-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="flex items-baseline gap-3 font-display text-3xl font-extrabold uppercase italic">
                <span className="font-mono text-sm not-italic text-vx-red">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-vx-silver">
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.items && (
                  <ul className="list-disc space-y-1.5 pl-5 marker:text-vx-red">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
