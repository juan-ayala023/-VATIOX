'use client';

import { copy } from '@/content/copy';
import { LAUNCH_MODE } from '@/lib/config';
import { useLaunchMode, useLaunchStore, useUI } from '@/lib/store/ui';
import { cn } from '@/lib/format';

/** Toggle visible solo en desarrollo para alternar live / waitlist durante la presentación. */
export function DevModeToggle() {
  const mode = useLaunchMode();
  const setOverride = useLaunchStore((s) => s.setDevOverride);
  const buyBarVisible = useUI((s) => s.buyBarVisible);
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className={cn("fixed left-2 z-[70] flex items-center gap-1 border border-vx-silver/20 bg-carbon-900/90 p-1 font-mono text-[10px] tracking-wider text-vx-silver backdrop-blur md:left-4", buyBarVisible ? "bottom-[92px]" : "bottom-2 md:bottom-4")}>
      <span className="px-1.5">{copy.dev.toggleLabel}</span>
      {(['live', 'waitlist'] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => setOverride(m === LAUNCH_MODE ? null : m)}
          aria-pressed={mode === m}
          className={cn('min-h-8 px-2.5 transition-colors', mode === m ? 'bg-vx-red text-vx-bone' : 'hover:text-vx-bone')}
        >
          {m === 'live' ? copy.dev.live : copy.dev.waitlist}
        </button>
      ))}
    </div>
  );
}
