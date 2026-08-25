"use client";

import Link from "next/link";
import { primaryButtonClass } from "@/components/ui";
import { profile } from "@/data/profile";

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const details = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    value: profile.email,
  },
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    value: displayUrl(profile.links.linkedin),
    external: true,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    value: displayUrl(profile.links.github),
    external: true,
  },
] as const;

export function ContactView() {
  return (
    <section
      id="connect"
      className="scroll-mt-24 bg-black text-[#f7f8f8]"
    >
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center px-6 py-24">
        <p className="text-[13px] font-medium tracking-[0.16em] text-[#8a8f98] uppercase">
          {profile.location}
        </p>
        <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
          Get in touch
        </h2>
        <p className="mt-6 max-w-md text-lg leading-8 text-[#8a8f98]">
          Available for remote and hybrid cybersecurity roles. Pick a time
          or reach out directly.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={profile.links.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryButtonClass}
          >
            Book a call
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-12 min-w-[10.5rem] items-center justify-center rounded-full border border-white/15 px-6 text-[15px] font-medium tracking-[-0.01em] text-[#f7f8f8] transition-colors duration-200 hover:bg-white/10"
          >
            Email me
          </a>
          <a
            href={profile.links.resume}
            className="inline-flex h-12 min-w-[10.5rem] items-center justify-center rounded-full border border-white/15 px-6 text-[15px] font-medium tracking-[-0.01em] text-[#f7f8f8] transition-colors duration-200 hover:bg-white/10"
          >
            Résumé
          </a>
        </div>

        <dl className="mt-14 space-y-6">
          {details.map((item) => (
            <div key={item.label}>
              <dt className="text-[11px] font-medium tracking-[0.12em] text-[#8a8f98] uppercase">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-[15px]">
                {"external" in item && item.external ? (
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c4c8ce] transition-colors hover:text-[#f7f8f8]"
                  >
                    {item.value}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-[#c4c8ce] transition-colors hover:text-[#f7f8f8]"
                  >
                    {item.value}
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
