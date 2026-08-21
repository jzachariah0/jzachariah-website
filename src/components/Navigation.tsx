"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { linkClass } from "@/components/ui";
import { navLinks, profile } from "@/data/profile";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-zinc-200 bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-baseline justify-between px-6 py-5">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-zinc-900 transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>

        <ul className="flex items-center gap-6">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors ${
                    active
                      ? "font-medium text-accent"
                      : linkClass
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
