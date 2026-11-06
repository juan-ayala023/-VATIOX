import { cn } from '@/lib/format';

/**
 * Logo provisional en SVG. Cuando llegue el vector oficial:
 * 1) Guardarlo en /public/brand/logo.svg
 * 2) Cambiar OFFICIAL_LOGO a '/brand/logo.svg'
 */
const OFFICIAL_LOGO: string | null = null;

type LogoProps = {
  className?: string;
  /** Solo la X (isotipo) */
  mark?: boolean;
  title?: string;
};

export function Logo({ className, mark = false, title = 'VATIOX' }: LogoProps) {
  if (OFFICIAL_LOGO && !mark) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={OFFICIAL_LOGO} alt={title} className={cn('h-auto', className)} />;
  }

  if (mark) {
    return (
      <svg viewBox="0 0 60 70" className={className} role="img" aria-label={title}>
        <text
          x="30"
          y="62"
          textAnchor="middle"
          fill="var(--vx-red)"
          style={{ fontFamily: 'var(--font-barlow)', fontStyle: 'italic', fontWeight: 900, fontSize: 82 }}
        >
          X
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 52" className={cn('h-auto', className)} role="img" aria-label={title}>
      <title>{title}</title>
      <text
        x="0"
        y="42"
        fill="var(--vx-bone)"
        textLength="112"
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: 'var(--font-barlow)', fontStyle: 'italic', fontWeight: 900, fontSize: 46, letterSpacing: '-0.5px' }}
      >
        VATIO
      </text>
      {/* La X sobresale en altura respecto a las otras letras */}
      <text
        x="113"
        y="48"
        fill="var(--vx-red)"
        textLength="44"
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: 'var(--font-barlow)', fontStyle: 'italic', fontWeight: 900, fontSize: 64 }}
      >
        X
      </text>
    </svg>
  );
}
