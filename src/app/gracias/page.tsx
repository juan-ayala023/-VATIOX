import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SpeedLines } from '@/components/motion/SpeedLines';
import { ThankYou } from './ThankYou';

export const metadata: Metadata = {
  title: 'Pedido confirmado',
  description: 'Tu pedido de VATIOX fue confirmado.',
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 pb-20 pt-32">
      <SpeedLines />
      <div className="relative">
        <Suspense fallback={<div className="h-96" />}>
          <ThankYou />
        </Suspense>
      </div>
    </section>
  );
}
