import { CreditCard, FlaskConical, MapPin, Truck } from 'lucide-react';
import { Marquee } from '@/components/motion/Marquee';
import { copy } from '@/content/copy';

const ICONS = [FlaskConical, Truck, CreditCard, MapPin];

export function TrustMarquee() {
  const items = copy.trust.map((label, i) => ({ label, Icon: ICONS[i] }));
  return (
    <section aria-label="Garantías" className="relative z-10 -skew-y-2 border-y border-vx-silver/10 bg-carbon-800 py-4">
      <Marquee duration={36} className="skew-y-2">
        {[...items, ...items].map(({ label, Icon }, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap px-6 md:px-10">
            <Icon className="h-5 w-5 text-vx-red" strokeWidth={1.8} aria-hidden="true" />
            <span className="font-display text-xl font-bold uppercase italic text-vx-bone md:text-2xl">{label}</span>
            <span aria-hidden="true" className="ml-6 h-1.5 w-1.5 rotate-45 bg-vx-silver/40 md:ml-10" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
