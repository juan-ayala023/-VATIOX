import type { Metadata } from 'next';
import { Suspense } from 'react';
import { copy } from '@/content/copy';
import { TrackingLookup } from './TrackingLookup';

export const metadata: Metadata = {
  title: 'Rastrear pedido',
  description: 'Consulta el estado de tu pedido de VATIOX con tu número de pedido.',
  alternates: { canonical: '/rastreo' },
};

export default function RastreoPage() {
  return (
    <div className="mx-auto min-h-[80svh] max-w-5xl px-4 pb-24 pt-32 tech-grid md:px-8 md:pt-40">
      <p className="font-mono text-[11px] tracking-[0.18em] text-vx-silver">{copy.tracking.eyebrow}</p>
      <h1 className="headline mt-2 text-[14vw] sm:text-7xl">{copy.tracking.title}</h1>
      <div className="mt-10">
        <Suspense fallback={null}>
          <TrackingLookup />
        </Suspense>
      </div>
    </div>
  );
}
