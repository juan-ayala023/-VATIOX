import { Check } from 'lucide-react';
import { JarRender } from '@/components/product/JarRender';
import { copy, t } from '@/content/copy';
import { pricePerServing, savingsCOP, type Offer, type Product } from '@/lib/catalog';
import { cn, formatCOP } from '@/lib/format';

type Props = {
  product: Product;
  offer: Offer;
  selected: boolean;
  featured?: boolean;
  onSelect: () => void;
  name: string;
};

export function OfferCard({ product, offer, selected, featured, onSelect, name }: Props) {
  const perServing = pricePerServing(product, offer);
  const savings = savingsCOP(offer);

  return (
    <label
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden border-2 bg-carbon-800/70 p-5 transition-colors duration-300 clip-diag md:p-6',
        selected ? 'border-vx-red' : featured ? 'border-vx-red/50 hover:border-vx-red' : 'border-vx-silver/15 hover:border-vx-silver/40',
      )}
    >
      <input type="radio" name={name} className="sr-only" checked={selected} onChange={onSelect} />
      {featured && (
        <span className="absolute right-0 top-0 bg-vx-red px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-vx-bone">
          {copy.offer.mostChosen}
          {offer.badge ? ` · ${offer.badge}` : ''}
        </span>
      )}

      <div className="flex items-start gap-4 pt-5">
        <div className="flex w-20 shrink-0 items-end justify-center md:w-24">
          {offer.units > 1 ? (
            <div className="relative h-24 w-full md:h-28">
              <JarRender className="absolute bottom-0 left-0 w-[62%] -rotate-6" alt="" />
              <JarRender className="absolute bottom-0 right-0 w-[62%] rotate-6" alt="" />
            </div>
          ) : (
            <JarRender className="w-[62%]" alt="" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-3xl font-black uppercase italic leading-none md:text-4xl">{offer.label}</p>
          <p className="mt-1 font-mono text-[11px] tracking-wider text-vx-silver">
            {offer.units * product.servingsPerUnit} PORCIONES · {offer.units * product.netWeightGrams} G
          </p>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
            <span className="font-display text-4xl font-black italic leading-none md:text-5xl">{formatCOP(offer.priceCOP)}</span>
            {offer.compareAtCOP && <s className="font-mono text-sm text-vx-silver/70">{formatCOP(offer.compareAtCOP)}</s>}
          </div>
          <p className="mt-2 font-mono text-xs text-vx-bone">
            <span className={featured ? 'text-vx-red' : ''}>{t(copy.offer.perServing, { price: formatCOP(perServing) })}</span>
          </p>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-vx-silver/10 pt-3 pr-9 text-xs text-vx-silver">
        {offer.freeShipping && <li>✓ {copy.offer.freeShipping}</li>}
        <li>✓ {copy.offer.ivaIncluded}</li>
        {savings > 0 && <li className="text-vx-bone">✓ Ahorras {formatCOP(savings)}</li>}
      </ul>

      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center border-2 transition-colors',
          selected ? 'border-vx-red bg-vx-red' : 'border-vx-silver/40',
        )}
      >
        {selected && <Check className="h-4 w-4" strokeWidth={3} />}
      </span>
    </label>
  );
}
