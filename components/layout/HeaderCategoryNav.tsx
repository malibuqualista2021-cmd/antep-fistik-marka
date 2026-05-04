"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { navItemIsActive } from "@/lib/header-nav-active";
import { headerCategoryStrip } from "@/lib/store-navigation";

function CategoryNavDesktopFallback() {
  return (
    <nav
      className="flex min-h-[48px] flex-wrap items-center justify-center gap-x-2 gap-y-2 py-2 md:gap-x-3 lg:gap-x-4"
      aria-label="Kategoriler"
    >
      {headerCategoryStrip.map((item) => (
        <Link key={`fb-${item.href}-${item.label}`} href={item.href} className="nav-category-link px-2 py-2">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function CategoryNavDesktopInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav
      className="flex min-h-[48px] flex-wrap items-center justify-center gap-x-2 gap-y-2 py-2 md:gap-x-3 lg:gap-x-4"
      aria-label="Kategoriler"
    >
      {headerCategoryStrip.map((item) => {
        const active = navItemIsActive(item.href, pathname, searchParams);
        const wholesale = item.href === "/toptan-satis";
        return (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`nav-category-link px-2 py-2 md:px-2.5 ${active ? "nav-category-link--active" : ""} ${wholesale ? "nav-category-link--wholesale" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function CategoryNavDesktop() {
  return (
    <Suspense fallback={<CategoryNavDesktopFallback />}>
      <CategoryNavDesktopInner />
    </Suspense>
  );
}

function MobileCategoryChipsFallback() {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
      {headerCategoryStrip.map((item) => (
        <Link
          key={`mfb-${item.href}`}
          href={item.href}
          className="nav-category-chip shrink-0 whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function MobileCategoryChipsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      role="navigation"
      aria-label="Kategoriler"
    >
      {headerCategoryStrip.map((item) => {
        const active = navItemIsActive(item.href, pathname, searchParams);
        const wholesale = item.href === "/toptan-satis";
        return (
          <Link
            key={`m-${item.href}-${item.label}`}
            href={item.href}
            className={`nav-category-chip shrink-0 whitespace-nowrap ${active ? "nav-category-chip--active" : ""} ${wholesale ? "nav-category-chip--wholesale" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function MobileCategoryChips() {
  return (
    <Suspense fallback={<MobileCategoryChipsFallback />}>
      <MobileCategoryChipsInner />
    </Suspense>
  );
}
