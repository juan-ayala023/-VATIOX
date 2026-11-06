import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/format';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg' | 'sm';

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  full?: boolean;
};

const base =
  'group relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden font-display font-extrabold italic uppercase tracking-wide transition-transform duration-150 ease-vx active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-vx-red text-vx-bone clip-diag-sm',
  outline: 'text-vx-bone shadow-[inset_0_0_0_1.5px_var(--vx-silver)] hover:shadow-[inset_0_0_0_1.5px_var(--vx-red)]',
  ghost: 'text-vx-bone',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-4 text-base',
  md: 'min-h-12 px-6 text-lg',
  lg: 'min-h-14 px-8 text-xl md:text-2xl',
};

/** Franja que barre de izquierda a derecha al hover. */
function Sweep({ variant }: { variant: Variant }) {
  if (variant === 'primary') {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 -translate-x-full skew-x-[-20deg] bg-vx-bone/25 transition-transform duration-700 ease-vx group-hover:translate-x-[450%]"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-vx-red transition-transform duration-500 ease-vx group-hover:scale-x-100"
    />
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  full,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], full && 'w-full', className)} {...rest}>
      <Sweep variant={variant} />
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  full,
  href,
  external,
  onClick,
  ...rest
}: Common & { href: string; external?: boolean; onClick?: () => void; 'aria-label'?: string }) {
  const cls = cn(base, variants[variant], sizes[size], full && 'w-full', className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick} {...rest}>
        <Sweep variant={variant} />
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick} {...rest}>
      <Sweep variant={variant} />
      {children}
    </Link>
  );
}
