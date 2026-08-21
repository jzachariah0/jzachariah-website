"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactWave } from "@/components/ContactWave";
import {
  linkClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

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

function fadeUp(delay: number, reduceMotion: boolean | null) {
  if (reduceMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: EASE, delay },
  };
}

export function ContactView() {
  const reduceMotion = useReducedMotion();

  return (
    <main>
      {/* Full-bleed hero */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-white">
        <ContactWave />
        <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36">
          <motion.p
            className="text-[13px] font-medium tracking-[0.14em] text-zinc-400 uppercase"
            {...fadeUp(0, reduceMotion)}
          >
            {profile.location}
          </motion.p>
          <motion.h1
            className="mt-4 max-w-xl text-5xl font-semibold tracking-tight text-[#0A2540] sm:text-6xl lg:text-7xl lg:leading-[1.02]"
            {...fadeUp(0.08, reduceMotion)}
          >
            Contact
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md text-lg leading-relaxed text-[#425466] sm:text-xl"
            {...fadeUp(0.16, reduceMotion)}
          >
            Available for remote and hybrid cybersecurity roles — pick a time
            or reach out directly.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            {...fadeUp(0.24, reduceMotion)}
          >
            <a href="#book" className={primaryButtonClass}>
              Book a call
            </a>
            <a
              href={`mailto:${profile.email}`}
              className={secondaryButtonClass}
            >
              Email me
            </a>
          </motion.div>
        </div>
      </section>

      {/* Booking band */}
      <section
        id="book"
        className="scroll-mt-24 border-b border-zinc-100 bg-white"
      >
        <div className="mx-auto grid max-w-5xl gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:items-start">
          <motion.div {...fadeUp(0.1, reduceMotion)}>
            <p className="text-[13px] font-medium tracking-[0.14em] text-zinc-400 uppercase">
              Reach out
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#0A2540] sm:text-3xl">
              Let’s talk.
            </h2>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#425466]">
              30 minutes on Calendly, or email anytime.
            </p>

            <dl className="mt-10 space-y-6">
              {details.map((item, i) => (
                <motion.div
                  key={item.label}
                  {...fadeUp(0.18 + i * 0.06, reduceMotion)}
                >
                  <dt className="text-[13px] font-medium tracking-[0.12em] text-zinc-400 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[15px]">
                    {"external" in item && item.external ? (
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <a href={item.href} className={linkClass}>
                        {item.value}
                      </a>
                    )}
                  </dd>
                </motion.div>
              ))}
              <motion.div {...fadeUp(0.36, reduceMotion)}>
                <dt className="text-[13px] font-medium tracking-[0.12em] text-zinc-400 uppercase">
                  Location
                </dt>
                <dd className="mt-1.5 text-[15px] text-zinc-900">
                  {profile.location}
                </dd>
              </motion.div>
            </dl>
          </motion.div>

          <motion.div {...fadeUp(0.28, reduceMotion)}>
            <div className="border-t border-zinc-200 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <p className="text-[13px] font-medium tracking-[0.12em] text-zinc-400 uppercase">
                Book a call
              </p>
              <p className="mt-1 text-sm text-zinc-500">30 minutes · Calendly</p>
              <div className="mt-6">
                <CalendlyEmbed url={profile.links.calendly} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
