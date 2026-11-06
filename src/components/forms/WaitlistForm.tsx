'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { copy } from '@/content/copy';
import { waitlistAdapter } from '@/lib/adapters';
import { track } from '@/lib/analytics';

type Errors = Partial<Record<'name' | 'phone' | 'city' | 'discipline' | 'consent', string>>;

export function WaitlistForm({ idPrefix = 'wl' }: { idPrefix?: string }) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', discipline: '', consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const f = copy.waitlist.fields;
  const id = (k: string) => `${idPrefix}-${k}`;

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = copy.checkout.required;
    if (!/^3\d{9}$/.test(form.phone.replace(/\D/g, ''))) e.phone = copy.checkout.invalidPhone;
    if (!form.city.trim()) e.city = copy.checkout.required;
    if (!form.discipline) e.discipline = copy.checkout.required;
    if (!form.consent) e.consent = copy.checkout.mustAccept;
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');
    const res = await waitlistAdapter.joinWaitlist({
      name: form.name.trim(),
      phone: `+57${form.phone.replace(/\D/g, '')}`,
      city: form.city.trim(),
      discipline: form.discipline,
      consent: form.consent,
      createdAt: new Date().toISOString(),
    });
    if (res.ok) {
      track('Lead', { discipline: form.discipline });
      setStatus('done');
    } else setStatus('idle');
  };

  if (status === 'done') {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 border border-vx-red/40 bg-vx-red/10 p-4" role="status">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-vx-red">
          <Check className="h-5 w-5" />
        </span>
        <p className="text-vx-bone">{copy.waitlist.success}</p>
      </motion.div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="mt-1 text-xs text-vx-red">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3">
      <div>
        <label htmlFor={id('name')} className="mb-1 block text-sm text-vx-silver">{f.name}</label>
        <input id={id('name')} className="vx-input" autoComplete="given-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? id('name-err') : undefined} />
        {err('name')}
      </div>
      <div>
        <label htmlFor={id('phone')} className="mb-1 block text-sm text-vx-silver">{f.phone}</label>
        <div className="flex">
          <span className="flex min-h-12 items-center border border-r-0 border-vx-silver/20 bg-carbon-900 px-3 font-mono text-sm text-vx-silver">+57</span>
          <input id={id('phone')} className="vx-input font-mono" inputMode="numeric" autoComplete="tel-national" placeholder="300 000 0000" maxLength={12} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? id('phone-err') : undefined} />
        </div>
        {err('phone')}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={id('city')} className="mb-1 block text-sm text-vx-silver">{f.city}</label>
          <input id={id('city')} className="vx-input" autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} aria-invalid={!!errors.city} aria-describedby={errors.city ? id('city-err') : undefined} />
          {err('city')}
        </div>
        <div>
          <label htmlFor={id('discipline')} className="mb-1 block text-sm text-vx-silver">{f.discipline}</label>
          <select id={id('discipline')} className="vx-input" value={form.discipline} onChange={(e) => setForm({ ...form, discipline: e.target.value })} aria-invalid={!!errors.discipline} aria-describedby={errors.discipline ? id('discipline-err') : undefined}>
            <option value="">Selecciona…</option>
            {copy.waitlist.disciplines.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {err('discipline')}
        </div>
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 py-1 text-sm text-vx-silver">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--vx-red)]" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? id('consent-err') : undefined} />
          <span>
            {copy.waitlist.consent.split('{policy}')[0]}
            <Link href="/privacidad" className="text-vx-bone underline underline-offset-2 hover:text-vx-red" target="_blank">
              {copy.waitlist.consentLink}
            </Link>
            {copy.waitlist.consent.split('{policy}')[1]}
          </span>
        </label>
        {err('consent')}
      </div>
      <Button type="submit" size="lg" full disabled={status === 'sending'}>
        {status === 'sending' ? copy.waitlist.submitting : copy.waitlist.submit}
      </Button>
    </form>
  );
}
