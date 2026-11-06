import type { Metadata } from 'next';
import { LegalDoc } from '@/components/legal/LegalDoc';
import { LEGAL_UPDATED, privacySections } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Tratamiento de datos personales',
  description: 'Política de tratamiento de datos personales de VATIOX (Ley 1581 de 2012).',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
  return <LegalDoc eyebrow="LEGAL · VX-L02" title="Tratamiento de datos personales" updated={LEGAL_UPDATED} sections={privacySections} />;
}
