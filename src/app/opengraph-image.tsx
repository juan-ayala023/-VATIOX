import { ImageResponse } from 'next/og';
import { copy } from '@/content/copy';

export const alt = copy.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Imagen Open Graph generada (sin fuentes externas). Reemplazar por una foto real cuando exista. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0F0E10',
          color: '#F3F1EE',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 4, color: '#C7CBD1' }}>REF. VX-01 · LOTE 001</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 150, fontWeight: 900, fontStyle: 'italic', lineHeight: 0.9, letterSpacing: -4 }}>
            VATIO<span style={{ color: '#E30613', fontSize: 190 }}>X</span>
          </div>
          <div style={{ display: 'flex', fontSize: 44, marginTop: 24 }}>600 mg de nitratos por porción.</div>
          <div style={{ display: 'flex', fontSize: 44, color: '#C7CBD1' }}>Comprobado en cada lote.</div>
        </div>
        <div style={{ display: 'flex', height: 12, background: '#E30613', width: 420 }} />
      </div>
    ),
    size,
  );
}
