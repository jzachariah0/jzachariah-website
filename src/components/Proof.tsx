"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { BrandMark, linkClass } from "@/components/ui";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

type ProofStat = (typeof profile.proofStats)[number];

function formatStat(stat: ProofStat, value: number) {
  const decimals = stat.decimals ?? 0;
  let body: string;
  if (decimals > 0) {
    body = value.toFixed(decimals);
  } else if (stat.numeric >= 1000) {
    body = Math.round(value).toLocaleString("en-US");
  } else {
    body = String(Math.round(value));
  }
  return `${stat.prefix ?? ""}${body}${stat.suffix ?? ""}`;
}

function AnimatedStatValue({
  stat,
  active,
}: {
  stat: ProofStat;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 22,
    mass: 0.8,
  });
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      if (ref.current) ref.current.textContent = stat.value;
      return;
    }

    const controls = animate(motionVal, stat.numeric, {
      duration: 1.35,
      ease: EASE,
    });

    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = formatStat(stat, v);
    });

    return () => {
      controls.stop();
      unsub();
    };
  }, [active, reduceMotion, motionVal, spring, stat]);

  return (
    <p
      ref={ref}
      className="text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl"
    >
      {formatStat(stat, 0)}
    </p>
  );
}

function StatsBand() {
  const reduceMotion = useReducedMotion();
  const bandRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bandRef, { once: true, margin: "-80px" });

  return (
    <div ref={bandRef} className="mt-12 border-y border-zinc-200/90 sm:mt-14">
      <dl className="grid grid-cols-2 lg:grid-cols-4">
        {profile.proofStats.map((stat, i) => (
          <motion.div
            key={stat.value}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={
              inView || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: reduceMotion ? 0 : 0.08 + i * 0.1,
            }}
            className={`py-8 sm:py-10 lg:px-8 ${
              i % 2 === 1 ? "pl-6 sm:pl-8" : "pr-6 sm:pr-8"
            } ${i >= 2 ? "border-t border-zinc-200/90 lg:border-t-0" : ""} ${
              i > 0 ? "lg:border-l lg:border-zinc-200/90" : ""
            } ${i === 0 ? "lg:pl-0" : ""} ${
              i === profile.proofStats.length - 1 ? "lg:pr-0" : ""
            }`}
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <AnimatedStatValue stat={stat} active={inView} />
              <motion.p
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={
                  inView || reduceMotion ? { opacity: 1 } : { opacity: 0 }
                }
                transition={{
                  duration: 0.4,
                  delay: reduceMotion ? 0 : 0.35 + i * 0.1,
                }}
                className="mt-2 max-w-[14rem] text-sm leading-snug text-[#425466]"
              >
                {stat.label}
              </motion.p>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}

function ProofExplorer() {
  const reduceMotion = useReducedMotion();
  const items = profile.proof;
  const [activeId, setActiveId] = useState(items[0]?.label ?? "");
  const [paused, setPaused] = useState(false);
  const active =
    items.find((item) => item.label === activeId) ?? items[0];
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.label === activeId),
  );

  useEffect(() => {
    if (reduceMotion || paused || items.length < 2) return;
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const i = items.findIndex((item) => item.label === current);
        const next = (i + 1) % items.length;
        return items[next].label;
      });
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, items]);

  if (!active) return null;

  return (
    <div
      className="mt-12 sm:mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
          Highlights
        </p>
        <p className="font-mono text-[11px] tracking-wide text-zinc-400 tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 text-zinc-300">/</span>
          {String(items.length).padStart(2, "0")}
        </p>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        {/* Index */}
        <div role="tablist" aria-label="Highlights" aria-orientation="vertical">
          {items.map((item) => {
            const on = item.label === activeId;
            return (
              <div key={item.label} className="relative border-b border-zinc-200/80">
                {on && (
                  <motion.span
                    layoutId={reduceMotion ? undefined : "proof-active-bar"}
                    className="absolute inset-y-2 left-0 w-0.5 bg-accent"
                    transition={{ duration: 0.35, ease: EASE }}
                    aria-hidden
                  />
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActiveId(item.label)}
                  className="flex w-full items-center gap-3 py-4 pl-4 text-left transition-colors outline-none focus-visible:bg-zinc-50"
                >
                  <BrandMark src={item.logo} size={32} active={on} />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[15px] tracking-tight transition-colors ${
                        on
                          ? "font-semibold text-[#0A2540]"
                          : "font-medium text-zinc-400 hover:text-zinc-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>
                  {item.metric && (
                    <span
                      className={`shrink-0 font-mono text-[11px] tracking-wide transition-colors ${
                        on ? "text-accent" : "text-zinc-300"
                      }`}
                    >
                      {item.metric}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Detail - animated */}
        <div className="relative min-h-[200px] lg:min-h-[240px] lg:pt-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label}
              role="tabpanel"
              initial={
                reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              {active.metric && (
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
                  className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl"
                >
                  {active.metric}
                </motion.p>
              )}

              <div className="mt-5 flex items-center gap-3">
                <BrandMark src={active.logo} size={40} active />
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#0A2540] sm:text-2xl">
                    {active.label}
                  </h3>
                  {active.role && (
                    <p className="mt-0.5 text-sm text-[#425466]">{active.role}</p>
                  )}
                </div>
              </div>

              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#425466] sm:text-base">
                {active.detail}
              </p>

              <Link
                href="/experience"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                Full experience
                <span aria-hidden>→</span>
              </Link>

              {/* Progress ticks */}
              <div className="mt-8 flex gap-1.5" aria-hidden>
                {items.map((item) => (
                  <span
                    key={item.label}
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      item.label === activeId ? "bg-accent" : "bg-zinc-200"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Proof() {
  return (
    <section className="border-t border-zinc-200/80 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium tracking-[0.14em] text-zinc-400 uppercase">
                Selected work
              </p>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl sm:leading-[1.15]">
                Outcomes that hold up under scrutiny.
              </h2>
            </div>
            <Link href="/experience" className={`${linkClass} text-sm`}>
              Full experience →
            </Link>
          </div>
        </FadeIn>

        <StatsBand />
        <ProofExplorer />
      </div>
    </section>
  );
}
