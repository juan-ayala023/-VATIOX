'use client';

import { useEffect, useState } from 'react';
import { copy } from '@/content/copy';
import { LAUNCH_DATE } from '@/lib/config';
import { cn } from '@/lib/format';

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ className }: { className?: string }) {
  const target = new Date(LAUNCH_DATE).getTime();
  const [left, setLeft] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setLeft(diff(target));
    const id = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = (['d', 'h', 'm', 's'] as const).map((k) => ({ k, label: copy.waitlist.units[k], v: left ? left[k] : null }));

  return (
    <div className={cn('', className)}>
      <p className="font-mono text-[11px] tracking-[0.15em] text-vx-silver">{copy.waitlist.countdownLabel}</p>
      <div className="mt-2 flex gap-2" role="timer" aria-live="off">
        {units.map((u) => (
          <div key={u.k} className="min-w-[64px] border border-vx-silver/15 bg-carbon-900/70 px-2 py-2 text-center">
            <span className="block font-mono text-2xl font-medium tabular-nums text-vx-bone">{u.v === null ? '--' : String(u.v).padStart(2, '0')}</span>
            <span className="block font-mono text-[9px] tracking-[0.15em] text-vx-silver/70">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
