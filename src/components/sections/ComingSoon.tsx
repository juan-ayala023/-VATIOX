import { Reveal } from '@/components/motion/Reveal';
import { JarRender } from '@/components/product/JarRender';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { copy } from '@/content/copy';
import { comingSoonProducts } from '@/lib/catalog';

export function ComingSoon() {
  const items = comingSoonProducts();
  return (
    <section aria-labelledby="proximamente-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={copy.comingSoon.eyebrow} title={copy.comingSoon.title} id="proximamente-title" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className="h-full">
              <article className="relative flex h-full flex-col items-center overflow-hidden border border-vx-silver/10 bg-carbon-900 px-4 pb-6 pt-10 md:pt-14">
                <JarRender variant="silhouette" name={p.name.replace('VATIOX ', '').toUpperCase()} alt={`${p.name}, próximamente`} className="w-24 opacity-80 md:w-40" />
                <h3 className="mt-5 text-center font-display text-2xl font-black uppercase italic text-vx-silver md:text-4xl">{p.name}</h3>
                <span className="mt-2 border border-vx-red/50 px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-vx-red">{copy.comingSoon.tag}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
