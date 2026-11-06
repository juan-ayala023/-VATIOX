import type { Metadata } from 'next';
import { LegalDoc } from '@/components/legal/LegalDoc';
import { LEGAL_UPDATED, termsSections } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Términos y condiciones de compra en la tienda en línea de VATIOX.',
  alternates: { canonical: '/terminos' },
};

export default function TerminosPage() {
  return <LegalDoc eyebrow="LEGAL · VX-L01" title="Términos y condiciones" updated={LEGAL_UPDATED} sections={termsSections} />;
}
