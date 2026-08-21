"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AboutHorizon } from "@/components/AboutHorizon";
import { Headshot } from "@/components/Headshot";
import { StoryChapters, WritingMedia } from "@/components/MyStory";
import {
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORIES = [
  {
    id: "story",
    label: "Story",
    blurb: "How I got into security.",
  },
  {
    id: "credentials",
    label: "Credentials",
    blurb: "Education, certification, recognition.",
  },
  {
    id: "media",
    label: "Writing",
    blurb: "Books and YouTube.",
  },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

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

function CredentialsPanel() {
  return (
    <div className="divide-y divide-zinc-200 border-t border-zinc-200">
      <div className="grid gap-4 py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-10">
        <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
          Education
        </p>
        <div>
          <p className="text-lg font-semibold tracking-tight text-[#0A2540]">
            {profile.education.degree}
          </p>
          <p className="mt-1 text-sm text-[#425466]">
            {profile.education.school} · Expected{" "}
            {profile.education.graduation}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
            {profile.education.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-10">
        <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
          Certification
        </p>
        <div>
          <p className="text-lg font-semibold tracking-tight text-[#0A2540]">
            ISC²
          </p>
          <p className="mt-1 text-sm text-[#425466]">
            Certified in Cybersecurity
          </p>
        </div>
      </div>

      <div className="grid gap-4 py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-10">
        <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
          Recognition
        </p>
        <ul className="space-y-5">
          {profile.achievements.map((item) => (
            <li key={item.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-semibold tracking-tight text-[#0A2540]">
                  {item.title}
                </p>
                <p className="font-mono text-[11px] text-zinc-400 tabular-nums">
                  {item.year}
                </p>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AboutView() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<CategoryId>("story");
  const activeMeta = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];

  return (
    <main>
      {/* Lean hero */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-white">
        <AboutHorizon />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-12 lg:gap-14">
            <motion.div {...fadeUp(0, reduceMotion)}>
              <Headshot
                size="xl"
                priority
                className="shrink-0 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
              />
            </motion.div>
            <div className="min-w-0 max-w-xl sm:pt-1">
              <motion.p
                className="text-[13px] font-medium tracking-[0.14em] text-zinc-400 uppercase"
                {...fadeUp(0.05, reduceMotion)}
              >
                About · {profile.location}
              </motion.p>
              <motion.h1
                className="mt-3 text-4xl font-semibold tracking-tight text-[#0A2540] sm:text-5xl sm:leading-[1.08] lg:text-6xl"
                {...fadeUp(0.1, reduceMotion)}
              >
                {profile.name}
              </motion.h1>
              <motion.p
                className="mt-5 text-lg leading-relaxed text-[#0A2540] sm:text-xl"
                {...fadeUp(0.18, reduceMotion)}
              >
                {profile.story.mission}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* One category at a time */}
      <section className="border-b border-zinc-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
          <div
            role="tablist"
            aria-label="About sections"
            className="flex flex-wrap gap-x-1 gap-y-2 border-b border-zinc-200"
          >
            {CATEGORIES.map((cat) => {
              const on = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(cat.id)}
                  className={`relative px-4 py-3 text-sm tracking-tight transition-colors outline-none focus-visible:bg-zinc-50 ${
                    on
                      ? "font-semibold text-[#0A2540]"
                      : "font-medium text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {cat.label}
                  {on && (
                    <motion.span
                      layoutId={reduceMotion ? undefined : "about-tab-underline"}
                      className="absolute inset-x-4 bottom-0 h-0.5 bg-accent"
                      transition={{ duration: 0.3, ease: EASE }}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-zinc-500">{activeMeta.blurb}</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-8"
            >
              {active === "story" && <StoryChapters />}
              {active === "credentials" && <CredentialsPanel />}
              {active === "media" && <WritingMedia />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="text-[13px] font-medium tracking-[0.14em] text-zinc-400 uppercase">
            Next
          </p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl sm:leading-[1.15]">
            Open to cybersecurity roles and collaborations.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButtonClass}
            >
              Book a call
            </a>
            <Link href="/connect" className={secondaryButtonClass}>
              Connect
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
