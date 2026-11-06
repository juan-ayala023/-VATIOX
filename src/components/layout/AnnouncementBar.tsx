import { Marquee } from '@/components/motion/Marquee';
import { copy, t } from '@/content/copy';
import { getMainProduct } from '@/lib/catalog';

export function AnnouncementBar() {
  const p = getMainProduct();
  const items = copy.announcement.map((s) => t(s, { total: p.lotSize ?? p.stock }));
  return (
    <div className="h-8 bg-vx-red text-vx-bone">
      <Marquee duration={28} className="h-full" label="Anuncios">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-4 font-mono text-[11px] leading-8 tracking-[0.12em]">
            {item}
            <span className="ml-8" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
