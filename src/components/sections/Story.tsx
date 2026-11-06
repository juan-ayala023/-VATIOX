'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { copy } from '@/content/copy';
import { EASE, useMediaQuery } from '@/lib/hooks';
import { cn } from '@/lib/format';

type Founder = (typeof copy.story.founders)[number];

function FounderCard({ founder, className }: { founder: Founder; className?: string }) {
  return (
    <article className={cn('relative', className)}>
      <div className="grain-local relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#3a393d] via-[#1f1e22] to-[#0c0b0d]">
        {/* Número de dorsal grande detrás */}
        <span aria-hidden="true" className="headline absolute -right-2 top-2 text-[46vw] leading-none text-stroke opacity-40 sm:text-[220px] lg:text-[260px]">
          {founder.bib}
        </span>
        {/* Silueta placeholder */}
        <svg viewBox="0 0 200 250" className="absolute inset-x-0 bottom-0 mx-auto w-[78%] text-black/55" aria-hidden="true">
          <path fill="currentColor" d="M100 30c19 0 33 15 33 34s-14 36-33 36-33-17-33-36 14-34 33-34Zm-70 220c4-58 30-96 70-96s66 38 70 96H30Z" />
        </svg>
        <span className="absolute left-3 top-3 border border-vx-silver/30 bg-black/40 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-vx-silver">
          {copy.story.photoPending.toUpperCase()}
        </span>
        <span className="absolute bottom-3 left-3 bg-vx-red px-2 py-1 font-mono text-[11px] tracking-wider text-vx-bone">DORSAL {founder.bib}</span>
      </div>
      <h3 className="headline mt-4 text-4xl md:text-5xl">{founder.name}</h3>
      <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-vx-silver">{founder.role.toUpperCase()}</p>
    </article>
  );
}

/** Móvil: reveal por máscara diagonal (panel que se retira con transform). */
function MaskReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="relative overflow-hidden">
      {children}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-20%] bg-vx-carbon"
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
        initial={{ x: '0%' }}
        whileInView={{ x: '110%' }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
    </div>
  );
}

function StoryMobile() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading eyebrow={copy.story.eyebrow} title={copy.story.title} id="historia-title" titleClassName="text-[12vw] sm:text-6xl" />
      <Reveal>
        {/* [VALIDAR VATIOX] */}
        <p className="mt-6 max-w-2xl text-lg text-vx-silver">{copy.story.body}</p>
      </Reveal>
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {copy.story.founders.map((f, i) => (
          <MaskReveal key={f.name} delay={i * 0.1}>
            <FounderCard founder={f} />
          </MaskReveal>
        ))}
      </div>
    </div>
  );
}

/** Desktop: scroll horizontal pinneado. */
function StoryDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-16 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-24">
          <div className="w-[min(46vw,620px)] shrink-0">
            <SectionHeading eyebrow={copy.story.eyebrow} title={copy.story.title} id="historia-title" titleClassName="text-7xl xl:text-8xl" />
            {/* [VALIDAR VATIOX] */}
            <p className="mt-8 max-w-xl text-lg text-vx-silver">{copy.story.body}</p>
          </div>
          {copy.story.founders.map((f) => (
            <FounderCard key={f.name} founder={f} className="w-[min(30vw,400px)] shrink-0" />
          ))}
          <div className="headline w-[40vw] shrink-0 text-[9vw] text-stroke">CADA VATIO CUENTA.</div>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 h-px w-48 -translate-x-1/2 bg-vx-silver/20">
          <motion.div className="h-full origin-left bg-vx-red" style={{ scaleX: progress }} />
        </div>
      </div>
    </div>
  );
}

export function Story() {
  const desktop = useMediaQuery('(min-width: 1024px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  return (
    <section id="historia" aria-labelledby="historia-title" className="relative bg-vx-carbon">
      {desktop && !reduceMotion ? <StoryDesktop /> : <StoryMobile />}
    </section>
  );
}
