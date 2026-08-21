"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { BrandMark } from "@/components/ui";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

type CommunityItem = (typeof profile.community)[number];

export function CommunityShowcase({ items }: { items: CommunityItem[] }) {
  const reduceMotion = useReducedMotion();
  const [activeName, setActiveName] = useState(items[0]?.name ?? "");
  const active = items.find((item) => item.name === activeName) ?? items[0];
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.name === activeName),
  );

  if (!active) return null;

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <div role="tablist" aria-label="Community" aria-orientation="vertical">
        {items.map((item, index) => {
          const on = item.name === activeName;
          return (
            <div
              key={item.name}
              className="relative border-b border-zinc-200/90"
            >
              {on && (
                <motion.span
                  layoutId={reduceMotion ? undefined : "community-active-bar"}
                  className="absolute inset-y-3 left-0 w-0.5 bg-accent"
                  transition={{ duration: 0.35, ease: EASE }}
                  aria-hidden
                />
              )}
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActiveName(item.name)}
                className="flex w-full items-center gap-3 py-5 pl-4 text-left outline-none transition-colors focus-visible:bg-zinc-50"
              >
                <span
                  className={`shrink-0 font-mono text-[11px] tracking-wide tabular-nums ${
                    on ? "text-accent" : "text-zinc-300"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <BrandMark src={item.logo} size={32} active={on} />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[15px] tracking-tight transition-colors ${
                      on
                        ? "font-semibold text-[#0A2540]"
                        : "font-medium text-zinc-400 hover:text-zinc-600"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`mt-0.5 block text-sm transition-colors ${
                      on ? "text-[#425466]" : "text-zinc-400"
                    }`}
                  >
                    {item.role}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="relative min-h-[220px] lg:pt-1">
        <p className="font-mono text-[11px] tracking-wide text-zinc-400 tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 text-zinc-300">/</span>
          {String(items.length).padStart(2, "0")}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            role="tabpanel"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-5"
          >
            {"metric" in active && active.metric && (
              <p className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                {active.metric}
              </p>
            )}
            {"metricLabel" in active && active.metricLabel && (
              <p className="mt-1 text-sm text-zinc-500">{active.metricLabel}</p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <BrandMark src={active.logo} size={40} active />
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-[#0A2540] sm:text-2xl">
                  {active.name}
                </h3>
                <p className="mt-0.5 text-sm text-[#425466]">{active.role}</p>
              </div>
            </div>

            {active.period && (
              <p className="mt-3 text-sm text-zinc-400">{active.period}</p>
            )}

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#425466] sm:text-base">
              {active.detail}
            </p>

            <div className="mt-8 flex gap-1.5" aria-hidden>
              {items.map((item) => (
                <span
                  key={item.name}
                  className={`h-0.5 flex-1 transition-colors duration-300 ${
                    item.name === activeName ? "bg-accent" : "bg-zinc-200"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
