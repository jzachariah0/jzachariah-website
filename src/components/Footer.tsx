"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const sections = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#connect", label: "Connect" },
] as const;

const elsewhere = [
  { label: "LinkedIn", href: profile.links.linkedin, external: true },
  { label: "GitHub", href: profile.links.github, external: true },
  { label: "YouTube", href: profile.story.youtube.url, external: true },
  { label: "Experience", href: "#experience", external: false },
] as const;

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: string;
}) {
  const className =
    "font-mono text-[11px] tracking-[0.08em] text-foreground uppercase transition-colors hover:text-muted";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
        <span aria-hidden> →</span>
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
      <span aria-hidden> →</span>
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const [hash, setHash] = useState("#top");

  useEffect(() => {
    const ids = sections.map((section) => section.href.slice(1));

    const syncFromScroll = () => {
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

    syncFromScroll();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("hashchange", syncFromScroll);
    return () => {
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("hashchange", syncFromScroll);
    };
  }, []);

  const index = Math.max(
    0,
    sections.findIndex((section) => section.href === hash),
  );
  const prev = sections[(index - 1 + sections.length) % sections.length];
  const next = sections[(index + 1) % sections.length];

  return (
    <footer className="relative z-40 bg-background">
      <div
        className="h-3 w-full border-y border-border"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='12' viewBox='0 0 56 12'%3E%3Ccircle cx='6' cy='6' r='1.4' fill='%23c4b59a'/%3E%3Cpath d='M20 6h-3M18.5 4.5v3' stroke='%23c4b59a' stroke-width='1.2' stroke-linecap='round'/%3E%3Cpath d='M32 4.2 34 6l-2 1.8-2-1.8Z' fill='%23c4b59a'/%3E%3Ccircle cx='46' cy='6' r='1.4' fill='%23c4b59a'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
        <p className="font-serif text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.82] tracking-[-0.04em] text-foreground lowercase italic">
          joshua zachariah
          <span
            className="relative ml-[0.12em] inline-block h-[0.18em] w-[0.18em] translate-y-[-0.08em] rounded-full align-baseline"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, #6f8f76 0%, #16351f 58%, #0c2214 100%)",
              boxShadow: "0 6px 14px -6px rgba(22, 53, 31, 0.55)",
            }}
            aria-hidden
          />
          <span className="sr-only">.</span>
        </p>

        <div className="mt-10 grid gap-10 border-t border-border pt-8 sm:mt-12 sm:grid-cols-3 sm:gap-8 sm:pt-10">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              Colophon
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-[11px] leading-5 tracking-[0.04em] text-foreground uppercase">
              <li>{profile.domain}</li>
              <li>Satoshi</li>
              <li>Next.js · Framer Motion</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              Elsewhere
            </p>
            <ul className="mt-3 space-y-1.5">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href} external={item.external}>
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:text-right">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              Say hi
            </p>
            <div className="mt-3 flex flex-col gap-1.5 sm:items-end">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-[11px] tracking-[0.04em] text-foreground lowercase transition-colors hover:text-muted"
              >
                {profile.email}
              </a>
              <FooterLink href={profile.links.calendly} external>
                Book a call
              </FooterLink>
            </div>

            <div className="mt-8 flex items-center gap-3 sm:justify-end">
              <a
                href={prev.href}
                aria-label={`Previous: ${prev.label}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm text-foreground transition-colors hover:bg-surface"
              >
                ←
              </a>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-[9px] tracking-[0.12em] text-background"
                aria-hidden
              >
                JZ
              </span>
              <a
                href={next.href}
                aria-label={`Next: ${next.label}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm text-foreground transition-colors hover:bg-surface"
              >
                →
              </a>
            </div>

            <p className="mt-6 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
              © {year} {profile.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
