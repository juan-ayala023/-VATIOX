import Image from 'next/image';
import { useId } from 'react';
import { cn } from '@/lib/format';

type JarRenderProps = {
  /** Cuando exista /public/product/frasco.png, pasar src y se usará la foto real. */
  src?: string;
  className?: string;
  variant?: 'default' | 'silhouette';
  /** Texto de la etiqueta en la variante silueta (p. ej. "CEREZA") */
  name?: string;
  alt?: string;
  priority?: boolean;
};

const DISPLAY = { fontFamily: 'var(--font-barlow)', fontStyle: 'italic' as const, fontWeight: 900 };
const MONO = { fontFamily: 'var(--font-jetbrains)', fontWeight: 500 };

export function JarRender({
  src,
  className,
  variant = 'default',
  name,
  alt = 'Frasco de VATIOX Polvo de remolacha, 600 g',
  priority = false,
}: JarRenderProps) {
  const uid = useId().replace(/:/g, '');
  const id = (k: string) => `${k}-${uid}`;

  if (src) {
    return (
      <div className={cn('relative aspect-[240/340]', className)}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 70vw, 420px" className="object-contain" priority={priority} />
      </div>
    );
  }

  const silhouette = variant === 'silhouette';

  return (
    <svg viewBox="0 0 240 340" className={cn('block h-auto', className ?? 'w-full')} role="img" aria-label={alt}>
      <defs>
        <linearGradient id={id('body')} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={silhouette ? '#0d0c0e' : '#08070a'} />
          <stop offset="0.22" stopColor={silhouette ? '#151417' : '#1e1d21'} />
          <stop offset="0.6" stopColor={silhouette ? '#111013' : '#141316'} />
          <stop offset="1" stopColor="#060507" />
        </linearGradient>
        <linearGradient id={id('lid')} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#060507" />
          <stop offset="0.3" stopColor={silhouette ? '#141316' : '#1c1b1f'} />
          <stop offset="1" stopColor="#050406" />
        </linearGradient>
        <linearGradient id={id('shine')} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.25" stopColor="#ffffff" stopOpacity={silhouette ? 0.04 : 0.16} />
          <stop offset="0.75" stopColor="#ffffff" stopOpacity={silhouette ? 0.02 : 0.08} />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={id('shadow')} x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <clipPath id={id('bodyClip')}>
          <rect x="34" y="62" width="172" height="258" rx="18" />
        </clipPath>
        <pattern id={id('ridges')} width="5" height="46" patternUnits="userSpaceOnUse">
          <rect width="1.2" height="46" fill="#ffffff" fillOpacity="0.06" />
        </pattern>
      </defs>

      {/* Sombra */}
      <ellipse cx="120" cy="326" rx="86" ry="9" fill="#000" opacity="0.75" filter={`url(#${id('shadow')})`} />

      {/* Tapa */}
      <rect x="48" y="10" width="144" height="46" rx="5" fill={`url(#${id('lid')})`} />
      <rect x="48" y="10" width="144" height="46" rx="5" fill={`url(#${id('ridges')})`} />
      <rect x="48" y="10" width="144" height="3" rx="1.5" fill="#ffffff" fillOpacity="0.08" />
      <rect x="56" y="54" width="128" height="10" fill="#050406" />

      {/* Cuerpo */}
      <rect x="34" y="62" width="172" height="258" rx="18" fill={`url(#${id('body')})`} />

      <g clipPath={`url(#${id('bodyClip')})`}>
        {/* Etiqueta */}
        <rect x="34" y="104" width="172" height="182" fill={silhouette ? '#121114' : '#0c0b0d'} />
        <rect x="34" y="104" width="172" height="1" fill="#c7cbd1" fillOpacity="0.14" />
        <rect x="34" y="285" width="172" height="1" fill="#c7cbd1" fillOpacity="0.14" />

        {silhouette ? (
          <>
            <polygon points="34,246 206,206 206,226 34,266" fill="#1d1c20" />
            <text x="120" y="176" textAnchor="middle" fill="#c7cbd1" fillOpacity="0.28" style={{ ...DISPLAY, fontSize: 30 }}>
              VATIOX
            </text>
            {name && (
              <text x="120" y="200" textAnchor="middle" fill="#c7cbd1" fillOpacity="0.22" style={{ ...MONO, fontSize: 10, letterSpacing: 2 }}>
                {name}
              </text>
            )}
          </>
        ) : (
          <>
            <text x="48" y="124" fill="#c7cbd1" fillOpacity="0.7" style={{ ...MONO, fontSize: 7, letterSpacing: 1.2 }}>
              REF. VX-01
            </text>
            <text x="192" y="124" textAnchor="end" fill="#c7cbd1" fillOpacity="0.7" style={{ ...MONO, fontSize: 7, letterSpacing: 1.2 }}>
              LOTE 001
            </text>

            {/* Logo en etiqueta */}
            <text x="55" y="172" fill="#f3f1ee" textLength="96" lengthAdjust="spacingAndGlyphs" style={{ ...DISPLAY, fontSize: 40 }}>
              VATIO
            </text>
            <text x="150" y="178" fill="#e30613" textLength="38" lengthAdjust="spacingAndGlyphs" style={{ ...DISPLAY, fontSize: 56 }}>
              X
            </text>

            <text x="120" y="198" textAnchor="middle" fill="#f3f1ee" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontStyle: 'italic', fontSize: 12.5, letterSpacing: 1.6 }}>
              POLVO DE REMOLACHA
            </text>

            {/* Banda roja diagonal */}
            <polygon points="34,252 206,212 206,238 34,278" fill="#e30613" />
            <text
              x="120"
              y="249"
              textAnchor="middle"
              fill="#f3f1ee"
              transform="rotate(-13.1 120 245)"
              textLength="150"
              lengthAdjust="spacingAndGlyphs"
              style={{ ...MONO, fontSize: 8, letterSpacing: 0.4 }}
            >
              600 MG NITRATOS / PORCIÓN
            </text>

            <text x="120" y="306" textAnchor="middle" fill="#c7cbd1" style={{ ...MONO, fontSize: 11, letterSpacing: 2 }}>
              600 G
            </text>
          </>
        )}

        {/* Brillo lateral */}
        <rect x="50" y="62" width="13" height="258" fill={`url(#${id('shine')})`} />
        <rect x="190" y="62" width="4" height="258" fill={`url(#${id('shine')})`} opacity="0.6" />
      </g>
    </svg>
  );
}
