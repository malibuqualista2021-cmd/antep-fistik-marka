import Link from "next/link";
import type { MegaColumn } from "@/lib/store-navigation";

/** Mega / akordeon içi: sütun başlığı + link listesi */
export function NavColumnList({
  columns,
  linkClassName,
  onNavigate,
}: {
  columns: MegaColumn[];
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const cls =
    linkClassName ??
    "block rounded-md py-1.5 pl-2 pr-1 font-sans text-[13px] font-medium leading-snug text-foreground/90 hover:bg-[var(--paper)] hover:text-primary";

  return (
    <>
      {columns.map((col) => (
        <div key={col.title} className="mt-3 first:mt-2">
          <p className="px-1 font-sans text-[10px] font-bold uppercase tracking-wide text-[var(--walnut)]">{col.title}</p>
          <ul className="mt-1 space-y-0.5">
            {col.links.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className={cls} title={link.hint ?? undefined} onClick={onNavigate}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
