import type { Metadata } from 'next';
import { LegalDoc } from '@/components/legal/LegalDoc';
import { LEGAL_UPDATED, shippingSections } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Envíos, cambios, devoluciones y retracto',
  description: 'Política de envíos, cambios, devoluciones y derecho de retracto de VATIOX (Ley 1480 de 2011).',
  alternates: { canonical: '/envios-y-devoluciones' },
};

export default function EnviosPage() {
  return <LegalDoc eyebrow="LEGAL · VX-L03" title="Envíos, cambios, devoluciones y retracto" updated={LEGAL_UPDATED} sections={shippingSections} />;
}
