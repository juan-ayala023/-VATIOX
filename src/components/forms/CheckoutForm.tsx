'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { DiscountInput } from '@/components/cart/DiscountInput';
import { JarRender } from '@/components/product/JarRender';
import { Button, ButtonLink } from '@/components/ui/Button';
import { copy } from '@/content/copy';
import { notificationsAdapter, paymentAdapter, type Order, type PaymentMethod } from '@/lib/adapters';
import { mockDb } from '@/lib/adapters/mockDb';
import { formatCOP, cn } from '@/lib/format';
import { useHydrated } from '@/lib/hooks';
import { computeTotals, useCart } from '@/lib/store/cart';

// [VALIDAR VATIOX] lista completa de departamentos según cobertura de la transportadora
const DEPARTMENTS = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare',
  'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
  'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander',
  'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada',
];

type Fields = {
  name: string;
  idNumber: string;
  email: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  neighborhood: string;
  notes: string;
};
type Errors = Partial<Record<keyof Fields | 'terms', string>>;

const EMPTY: Fields = { name: '', idNumber: '', email: '', phone: '', department: '', city: '', address: '', neighborhood: '', notes: '' };

function Field({ id, label, error, children, className }: { id: string; label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm text-vx-silver">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-vx-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const discountCode = useCart((s) => s.discountCode);
  const clear = useCart((s) => s.clear);
  const totals = computeTotals(items, discountCode);
  const [f, setF] = useState<Fields>(EMPTY);
  const [method, setMethod] = useState<PaymentMethod>('pse');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const c = copy.checkout;

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((prev) => ({ ...prev, [k]: e.target.value }));
  const aria = (k: keyof Errors) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `co-${k}-err` : undefined });

  const validate = (): Errors => {
    const e: Errors = {};
    (['name', 'department', 'city', 'address', 'neighborhood'] as const).forEach((k) => {
      if (!f[k].trim()) e[k] = c.required;
    });
    if (!/^\d{6,10}$/.test(f.idNumber.replace(/\D/g, '')) || /[^\d.\s]/.test(f.idNumber)) e.idNumber = c.invalidId;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = c.invalidEmail;
    if (!/^3\d{9}$/.test(f.phone.replace(/\D/g, ''))) e.phone = c.invalidPhone;
    if (!terms) e.terms = c.mustAccept;
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    const now = new Date().toISOString();
    const order: Order = {
      id: mockDb.nextOrderId(),
      createdAt: now,
      customer: {
        name: f.name.trim(),
        idNumber: f.idNumber.replace(/\D/g, ''),
        email: f.email.trim(),
        phone: f.phone.replace(/\D/g, ''),
        department: f.department,
        city: f.city.trim(),
        address: f.address.trim(),
        neighborhood: f.neighborhood.trim(),
        notes: f.notes.trim() || undefined,
      },
      lines: totals.lines.map((l) => ({
        productId: l.product.id,
        offerId: l.offerId,
        label: `${l.product.name} · ${l.offer.label}`,
        qty: l.qty,
        units: l.units,
        unitPriceCOP: l.offer.priceCOP,
        lineTotalCOP: l.lineTotal,
      })),
      subtotalCOP: totals.subtotal,
      discountCOP: totals.discount,
      shippingCOP: totals.shipping,
      totalCOP: totals.total,
      paymentMethod: method,
      ambassadorCode: discountCode,
      acceptedTermsAt: now,
    };
    const res = await paymentAdapter.createCheckout(order);
    if (res.ok) {
      void notificationsAdapter.sendOrderConfirmation(order);
      clear();
      router.push(res.redirectUrl);
    } else {
      setSubmitting(false);
    }
  };

  if (!hydrated) {
    return <div className="min-h-[60vh]" aria-busy="true" />;
  }

  if (totals.lines.length === 0 && !submitting) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
        <JarRender variant="silhouette" className="w-24 opacity-60" alt="" />
        <p className="text-vx-silver">{c.emptyCart}</p>
        <ButtonLink href="/#comprar">{c.back}</ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <div className="space-y-10">
        <fieldset>
          <legend className="headline mb-4 text-3xl">{c.contact}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="co-name" label={c.fields.name} error={errors.name} className="sm:col-span-2">
              <input id="co-name" className="vx-input" autoComplete="name" value={f.name} onChange={set('name')} {...aria('name')} />
            </Field>
            <Field id="co-idNumber" label={c.fields.idNumber} error={errors.idNumber}>
              <input id="co-idNumber" className="vx-input font-mono" inputMode="numeric" value={f.idNumber} onChange={set('idNumber')} {...aria('idNumber')} />
            </Field>
            <Field id="co-phone" label={c.fields.phone} error={errors.phone}>
              <div className="flex">
                <span className="flex min-h-12 items-center border border-r-0 border-vx-silver/20 bg-carbon-900 px-3 font-mono text-sm text-vx-silver">+57</span>
                <input id="co-phone" className="vx-input font-mono" inputMode="numeric" autoComplete="tel-national" placeholder="300 000 0000" value={f.phone} onChange={set('phone')} {...aria('phone')} />
              </div>
            </Field>
            <Field id="co-email" label={c.fields.email} error={errors.email} className="sm:col-span-2">
              <input id="co-email" type="email" className="vx-input" autoComplete="email" value={f.email} onChange={set('email')} {...aria('email')} />
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <legend className="headline mb-4 text-3xl">{c.shipping}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="co-department" label={c.fields.department} error={errors.department}>
              <select id="co-department" className="vx-input" autoComplete="address-level1" value={f.department} onChange={set('department')} {...aria('department')}>
                <option value="">Selecciona…</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field id="co-city" label={c.fields.city} error={errors.city}>
              <input id="co-city" className="vx-input" autoComplete="address-level2" value={f.city} onChange={set('city')} {...aria('city')} />
            </Field>
            <Field id="co-address" label={c.fields.address} error={errors.address} className="sm:col-span-2">
              <input id="co-address" className="vx-input" autoComplete="street-address" placeholder="Calle 00 # 00 - 00, apto" value={f.address} onChange={set('address')} {...aria('address')} />
            </Field>
            <Field id="co-neighborhood" label={c.fields.neighborhood} error={errors.neighborhood} className="sm:col-span-2">
              <input id="co-neighborhood" className="vx-input" value={f.neighborhood} onChange={set('neighborhood')} {...aria('neighborhood')} />
            </Field>
            <Field id="co-notes" label={c.fields.notes} className="sm:col-span-2">
              <textarea id="co-notes" rows={2} className="vx-input resize-none" value={f.notes} onChange={set('notes')} />
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <legend className="headline mb-4 text-3xl">{c.payment}</legend>
          <div role="radiogroup" className="grid grid-cols-2 gap-3">
            {c.methods.map((m) => (
              <label
                key={m.id}
                className={cn(
                  'flex min-h-16 cursor-pointer flex-col justify-center border-2 px-4 py-3 transition-colors clip-diag-sm',
                  method === m.id ? 'border-vx-red bg-vx-red/10' : 'border-vx-silver/15 hover:border-vx-silver/40',
                )}
              >
                <input type="radio" name="method" value={m.id} className="sr-only" checked={method === m.id} onChange={() => setMethod(m.id as PaymentMethod)} />
                <span className="font-display text-xl font-extrabold uppercase italic">{m.label}</span>
                <span className="text-xs text-vx-silver">{m.note}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Resumen */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-vx-silver/15 bg-carbon-800/70 p-5">
          <h2 className="headline text-3xl">{c.summary}</h2>
          <ul className="mt-4 space-y-3">
            {totals.lines.map((l) => (
              <li key={l.offerId} className="flex items-center gap-3">
                <JarRender className="w-10 shrink-0" alt="" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-vx-bone">{l.product.name}</p>
                  <p className="font-mono text-[11px] text-vx-silver">
                    {l.offer.label.toUpperCase()} × {l.qty}
                  </p>
                </div>
                <span className="font-mono text-sm">{formatCOP(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <DiscountInput />
          </div>
          <dl className="mt-5 space-y-1.5 border-t border-vx-silver/10 pt-4 text-sm">
            <div className="flex justify-between text-vx-silver">
              <dt>{copy.cart.subtotal}</dt>
              <dd className="font-mono">{formatCOP(totals.subtotal)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-vx-red">
                <dt>{copy.cart.discount}</dt>
                <dd className="font-mono">−{formatCOP(totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between text-vx-silver">
              <dt>{copy.cart.shipping}</dt>
              <dd className="font-mono text-vx-bone">{copy.cart.shippingFree.toUpperCase()}</dd>
            </div>
            <div className="flex items-baseline justify-between pt-2">
              <dt className="font-display text-xl font-extrabold uppercase italic">{copy.cart.total}</dt>
              <dd className="font-display text-4xl font-black italic">{formatCOP(totals.total)}</dd>
            </div>
          </dl>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-vx-silver">
            <input id="co-terms" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--vx-red)]" checked={terms} onChange={(e) => setTerms(e.target.checked)} {...aria('terms')} />
            <span>
              Acepto los{' '}
              <Link href="/terminos" target="_blank" className="text-vx-bone underline underline-offset-2 hover:text-vx-red">
                {c.termsLink}
              </Link>{' '}
              y la{' '}
              <Link href="/privacidad" target="_blank" className="text-vx-bone underline underline-offset-2 hover:text-vx-red">
                {c.privacyLink}
              </Link>
              .
            </span>
          </label>
          {errors.terms && (
            <p id="co-terms-err" className="mt-1 text-xs text-vx-red">
              {errors.terms}
            </p>
          )}

          <Button type="submit" size="lg" full className="mt-5" disabled={submitting}>
            <Lock className="h-5 w-5" />
            {submitting ? c.processing : `${c.submit} ${formatCOP(totals.total)}`}
          </Button>
          <p className="mt-2 text-center font-mono text-[10px] tracking-wider text-vx-silver/70">{c.mockNotice.toUpperCase()}</p>
        </div>
      </aside>
    </form>
  );
}
