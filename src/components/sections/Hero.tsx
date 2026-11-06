'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useEffect } from 'react';
import { Countdown } from '@/components/forms/Countdown';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { SpeedLines } from '@/components/motion/SpeedLines';
import { SplitText } from '@/components/motion/SplitText';
import { JarRender } from '@/components/product/JarRender';
import { StockBar } from '@/components/product/StockBar';
import { Button, ButtonLink } from '@/components/ui/Button';
import { copy } from '@/content/copy';
import { track } from '@/lib/analytics';
import { getMainProduct } from '@/lib/catalog';
import { formatCOP, cn } from '@/lib/format';
import { EASE, useMediaQuery } from '@/lib/hooks';
import { useBuy } from '@/lib/useBuy';

const CHIP_POS = [
  { cls: 'left-0 top-[12%]', side: 'left' },
  { cls: 'right-0 top-[30%]', side: 'right' },
  { cls: 'left-0 bottom-[30%]', side: 'left' },
  { cls: 'right-0 bottom-[10%]', side: 'right' },
] as const;

export function Hero() {
  const product = getMainProduct();
  const offer = product.offers[0];
  const { buy, mode } = useBuy();
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  const parallax = finePointer && !reduce;

  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  useEffect(() => {
    track('ViewContent', {
      value: offer.priceCOP,
      content_ids: [product.id],
      content_name: product.name,
    });
  }, [offer.priceCOP, product.id, product.name]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-vx-carbon tech-grid pt-[104px] lg:min-h-svh lg:pt-[112px]"
      onPointerMove={(e) => {
        if (!parallax) return;
        const r = e.currentTarget.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        ry.set(nx * 8); // máx 8°
        rx.set(-ny * 8);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <SpeedLines />
      {/* Brillo rojo radial detrás del frasco */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-[120vw] w-[120vw] max-lg:left-1/2 max-lg:top-[36%] max-lg:-translate-x-1/2 lg:right-[-10%] lg:top-[-5%] lg:h-[60vw] lg:w-[60vw]"
        style={{ background: 'radial-gradient(circle, rgb(227 6 19 / 0.32) 0%, rgb(227 6 19 / 0.08) 35%, transparent 65%)' }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-x-10 px-4 pb-10 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_1fr] lg:pb-16">
        {/* Titular */}
        <div className="pt-4 lg:col-start-1 lg:row-start-1 lg:self-end lg:pt-16">
          <motion.p
            className="font-mono text-[11px] tracking-[0.18em] text-vx-silver"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="mr-2 inline-block h-2 w-2 bg-vx-red align-middle" />
            {copy.hero.eyebrow}
          </motion.p>
          <SplitText
            as="h1"
            trigger="mount"
            text="CADA VATIO|CUENTA."
            className="headline mt-3 text-[18vw] text-vx-bone sm:text-[15vw] lg:text-[8.6vw] xl:text-[128px]"
            stagger={0.03}
          />
          <motion.p
            className="mt-4 max-w-md text-base text-vx-silver md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          >
            {/* [VALIDAR VATIOX] */}
            {copy.hero.subtitle}
          </motion.p>
        </div>

        {/* Frasco */}
        <div className="relative mx-auto mt-2 h-[340px] w-full max-w-[400px] [perspective:1000px] sm:h-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-[640px] lg:max-w-[560px] lg:self-center">
          {/* La X entra con un golpe */}
          <motion.span
            aria-hidden="true"
            className="headline pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-[52%] select-none text-[300px] leading-none text-vx-red sm:text-[380px] lg:text-[600px]"
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 520, damping: 14, mass: 0.9, delay: 0.4 }}
          >
            X
          </motion.span>

          <motion.div
            className="absolute inset-x-0 top-[6%] mx-auto w-[52%] lg:top-[8%] lg:w-[54%]"
            style={parallax ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' } : undefined}
            initial={{ y: 140, rotate: -10, opacity: 0 }}
            animate={{ y: 0, rotate: -4, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0, 6, 0] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 1.1 }}
            >
              <JarRender priority className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
            </motion.div>
          </motion.div>

          {/* Chips técnicos con línea conectora */}
          {copy.hero.chips.map((chip, i) => {
            const pos = CHIP_POS[i];
            return (
              <motion.div
                key={chip}
                className={cn('absolute flex items-center', pos.cls, pos.side === 'right' && 'flex-row-reverse')}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.8 + i * 0.12 }}
              >
                <span className="border border-vx-silver/25 bg-carbon-900/80 px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-vx-bone backdrop-blur-sm sm:text-[11px] lg:px-3 lg:py-1.5 lg:text-xs">
                  {chip}
                </span>
                <motion.span
                  aria-hidden="true"
                  className={cn('h-px w-6 bg-vx-red sm:w-10 lg:w-16', pos.side === 'left' ? 'origin-left' : 'origin-right')}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.95 + i * 0.12 }}
                />
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-vx-red" />
              </motion.div>
            );
          })}
        </div>

        {/* CTAs */}
        <motion.div
          className="mt-2 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex flex-col">
              <MagneticButton strength={0.18}>
                <Button size="lg" full onClick={() => buy()} className="sm:w-auto">
                  {mode === 'waitlist' ? copy.waitlist.cta : `${copy.hero.ctaBuy} — ${formatCOP(offer.priceCOP)}`}
                </Button>
              </MagneticButton>
              <span className="mt-1.5 text-center font-mono text-[11px] tracking-wider text-vx-silver sm:text-left">
                {mode === 'waitlist' ? 'LOS PRIMEROS COMPRADORES RECIBEN UN REGALO' : copy.hero.ctaBuyNote}
              </span>
            </div>
            <ButtonLink href="/#producto" variant="outline" size="lg" full className="sm:w-auto">
              {copy.hero.ctaSecondary}
              <ArrowDown className="h-5 w-5" strokeWidth={2.2} />
            </ButtonLink>
          </div>

          {mode === 'waitlist' && <Countdown className="mt-6" />}

          <StockBar className="mt-7 max-w-md" />
        </motion.div>
      </div>
    </section>
  );
}
