import Link from 'next/link';
import { InstagramIcon, WhatsAppIcon } from '@/components/brand/Icons';
import { Logo } from '@/components/brand/Logo';
import { copy } from '@/content/copy';
import { INSTAGRAM_URL, whatsappUrl } from '@/lib/config';

export function Footer() {
  return (
    <footer className="relative border-t border-vx-silver/10 bg-carbon-900 tech-grid pb-28 pt-16 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Logo className="w-36" />
          <p className="mt-4 max-w-xs text-sm text-vx-silver">{copy.footer.tagline}</p>
          <div className="mt-6 flex gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de VATIOX"
              className="flex h-11 w-11 items-center justify-center border border-vx-silver/20 text-vx-bone transition-colors hover:border-vx-red hover:text-vx-red"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de VATIOX"
              className="flex h-11 w-11 items-center justify-center border border-vx-silver/20 text-vx-bone transition-colors hover:border-vx-red hover:text-vx-red"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Enlaces">
          <p className="font-mono text-[11px] tracking-[0.15em] text-vx-silver/60">NAVEGACIÓN</p>
          <ul className="mt-4 space-y-1">
            {copy.footer.links.map((l) => (
              <li key={l.label}>
                {l.href === 'whatsapp' ? (
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-display text-xl font-bold uppercase italic text-vx-bone hover:text-vx-red">
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className="inline-flex min-h-11 items-center font-display text-xl font-bold uppercase italic text-vx-bone hover:text-vx-red">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <p className="font-mono text-[11px] tracking-[0.15em] text-vx-silver/60">LEGAL</p>
          <ul className="mt-4 space-y-1">
            {copy.footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-sm text-vx-silver hover:text-vx-bone">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-vx-silver/10 px-4 pt-6 font-mono text-[11px] tracking-wider text-vx-silver/60 md:flex-row md:justify-between md:px-8">
        <p>{copy.footer.copyright}</p>
        <p>REF. VX-01 · CADA VATIO CUENTA</p>
      </div>
    </footer>
  );
}
