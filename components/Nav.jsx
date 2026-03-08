"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={pathname === item.href ? "active" : ""}
        >
          [{item.label.toLowerCase()}]
        </Link>
      ))}
    </nav>
  );
}
