import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Finalizar compra',
  description: 'Finaliza tu compra de VATIOX Polvo de remolacha. Envío gratis a todo Colombia.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/checkout' },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 md:px-8 md:pt-40">
      <p className="font-mono text-[11px] tracking-[0.18em] text-vx-silver">CHECKOUT · VX-01</p>
      <h1 className="headline mt-2 text-[14vw] sm:text-7xl">{copy.checkout.title}</h1>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
