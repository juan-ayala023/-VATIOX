import { cn } from '@/lib/format';

type SpeedLinesProps = {
  className?: string;
  count?: number;
  /** Proporción de líneas rojas (0–1) */
  redRatio?: number;
};

// Pseudoaleatorio determinístico: mismo resultado en servidor y cliente.
const rand = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};

/** Líneas de velocidad diagonales en loop lento (solo transform). */
export function SpeedLines({ className, count = 22, redRatio = 0.12 }: SpeedLinesProps) {
  const lines = Array.from({ length: count }, (_, i) => ({
    top: rand(i) * 100,
    left: rand(i + 50) * 50,
    width: 8 + rand(i + 100) * 22,
    opacity: 0.08 + rand(i + 150) * 0.22,
    red: rand(i + 200) < redRatio,
    thick: rand(i + 250) > 0.8,
  }));

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div className="absolute inset-[-30%] -rotate-[18deg]">
        <div className="animate-speed absolute inset-y-0 left-0 w-[200%]">
          {[0, 50].map((offset) =>
            lines.map((l, i) => (
              <span
                key={`${offset}-${i}`}
                className={cn('speed-line absolute block', l.red ? 'bg-vx-red' : 'bg-vx-silver', l.thick ? 'h-[2px]' : 'h-px')}
                style={{
                  top: `${(l.top).toFixed(1)}%`,
                  left: `${(offset + l.left).toFixed(1)}%`,
                  width: `${l.width.toFixed(1)}%`,
                  opacity: Math.round((l.red ? l.opacity + 0.25 : l.opacity) * 1000) / 1000,
                }}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}
