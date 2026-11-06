import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/format';

type Props = {
  eyebrow: string;
  title: string;
  id?: string;
  className?: string;
  titleClassName?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, id, className, titleClassName, align = 'left' }: Props) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <Reveal y={10}>
        <p className={cn('flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-vx-silver', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-vx-red" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <div id={id}>
        <SplitText text={title} className={cn('headline mt-3 text-[13vw] text-vx-bone sm:text-6xl lg:text-7xl', titleClassName)} stagger={0.012} />
      </div>
    </div>
  );
}
