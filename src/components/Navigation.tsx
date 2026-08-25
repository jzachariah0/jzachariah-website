"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/profile";

export function Navigation({ overlay = false }: { overlay?: boolean }) {
  const [onHero, setOnHero] = useState(true);
  const [hash, setHash] = useState("#top");

  useEffect(() => {
    const onScroll = () => setOnHero(window.scrollY < window.innerHeight * 0.55);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));

    const syncFromScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) {
        setHash("#top");
        return;
      }

      let current = "#top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.32) {
          current = `#${id}`;
        }
      }
      setHash(current);
    };

    const onHashChange = () => {
      setHash(window.location.hash || "#top");
    };

    syncFromScroll();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const light = overlay && onHero;

  return (
    <header
      className={`z-50 border-b transition-[background-color,border-color,color] duration-300 ${
        overlay ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        light
          ? "border-transparent bg-transparent"
          : overlay
            ? "border-border bg-background/85 backdrop-blur-md"
            : "border-transparent bg-background"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#top"
          className={`text-[13px] font-medium tracking-[0.18em] uppercase transition-colors ${
            light ? "text-[#f7f8f8]" : "text-foreground"
          }`}
        >
          {profile.name}
        </a>

        <ul className="flex items-center gap-7">
          {navLinks.map((link) => {
            const active = hash === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-[13px] tracking-[0.02em] transition-colors ${
                    light
                      ? active
                        ? "font-medium text-[#f7f8f8]"
                        : "text-[#8a8f98] hover:text-[#f7f8f8]"
                      : active
                        ? "font-medium text-foreground"
                        : "text-muted hover:text-foreground"
                  }`}
                  aria-current={active ? "location" : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
