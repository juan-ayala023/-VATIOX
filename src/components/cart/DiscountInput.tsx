'use client';

import { Tag, X } from 'lucide-react';
import { useState } from 'react';
import { copy, t } from '@/content/copy';
import { findDiscount } from '@/lib/catalog';
import { useCart } from '@/lib/store/cart';

export function DiscountInput() {
  const code = useCart((s) => s.discountCode);
  const applyCode = useCart((s) => s.applyCode);
  const clearCode = useCart((s) => s.clearCode);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  if (code) {
    const d = findDiscount(code);
    return (
      <div className="flex items-center justify-between gap-2 border border-vx-red/40 bg-vx-red/10 px-3 py-2 text-sm">
        <span className="flex items-center gap-2 text-vx-bone">
          <Tag className="h-4 w-4 text-vx-red" />
          {t(copy.cart.discountApplied, { code, percent: d?.percent ?? 0 })}
        </span>
        <button type="button" onClick={clearCode} aria-label={copy.cart.discountRemove} className="flex h-11 w-11 items-center justify-center text-vx-silver hover:text-vx-bone">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const ok = applyCode(value);
        setError(!ok);
        if (ok) setValue('');
      }}
    >
      <label htmlFor="discount" className="mb-1.5 block font-mono text-[11px] tracking-[0.12em] text-vx-silver">
        {copy.cart.discountLabel.toUpperCase()}
      </label>
      <div className="flex">
        <input
          id="discount"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.toUpperCase());
            setError(false);
          }}
          placeholder={copy.cart.discountPlaceholder}
          className="vx-input font-mono uppercase"
          autoComplete="off"
          aria-invalid={error}
          aria-describedby={error ? 'discount-error' : undefined}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="min-h-12 shrink-0 border border-l-0 border-vx-silver/20 px-4 font-display text-base font-extrabold italic text-vx-bone transition-colors hover:bg-vx-red disabled:opacity-40"
        >
          {copy.cart.discountApply}
        </button>
      </div>
      {error && (
        <p id="discount-error" role="alert" className="mt-1.5 text-xs text-vx-red">
          {copy.cart.discountInvalid}
        </p>
      )}
    </form>
  );
}
