"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FocusArea } from "@/data/profile";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FocusAreasProps {
  areas?: FocusArea[];
}

export function FocusAreas({ areas = profile.focusAreas }: FocusAreasProps) {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(areas[0]?.id ?? "");
  const activeIndex = Math.max(
    0,
    areas.findIndex((a) => a.id === activeId),
  );
  const active = areas[activeIndex] ?? areas[0];

  const select = useCallback(
    (id: string) => setActiveId(id),
    [],
  );

  const move = useCallback(
    (delta: number) => {
      if (!areas.length) return;
      const next = (activeIndex + delta + areas.length) % areas.length;
      setActiveId(areas[next].id);
    },
    [activeIndex, areas],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const root = listRef.current;
      if (!root) return;
      if (!root.contains(document.activeElement) && document.activeElement !== root) {
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveId(areas[0]?.id ?? "");
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveId(areas[areas.length - 1]?.id ?? "");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [areas, move]);

  // Keep the active tab button focused when moving with keys
  useEffect(() => {
    const btn = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-focus-id="${activeId}"]`,
    );
    if (btn && listRef.current?.contains(document.activeElement)) {
      btn.focus({ preventScroll: true });
    }
  }, [activeId]);

  const progress = areas.length ? (activeIndex + 1) / areas.length : 0;

  return (
    <section className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="text-[13px] font-medium tracking-[0.14em] text-zinc-400 uppercase">
            What I work on
          </p>
          <p className="hidden font-mono text-[11px] tracking-wide text-zinc-400 sm:block">
            Hover or use ↑ ↓
          </p>
        </div>

        {/* Progress track */}
        <div
          className="relative mt-8 h-px w-full bg-zinc-100 sm:mt-10"
          aria-hidden
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: EASE }
            }
          />
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 xl:gap-28">
          {/* Index */}
          <div
            ref={listRef}
            role="tablist"
            aria-label="Focus areas"
            aria-orientation="vertical"
            tabIndex={0}
            className="outline-none"
          >
            {areas.map((area, i) => {
              const on = area.id === activeId;
              const panelId = `${baseId}-panel-${area.id}`;
              const tabId = `${baseId}-tab-${area.id}`;
              return (
                <div key={area.id} className="relative border-b border-zinc-100">
                  {on && (
                    <motion.span
                      layoutId={reduceMotion ? undefined : "focus-active-bar"}
                      className="absolute inset-y-2 left-0 w-0.5 bg-accent"
                      transition={{ duration: 0.35, ease: EASE }}
                      aria-hidden
                    />
                  )}
                  <button
                    type="button"
                    role="tab"
                    id={tabId}
                    data-focus-id={area.id}
                    aria-selected={on}
                    aria-controls={panelId}
                    tabIndex={on ? 0 : -1}
                    onMouseEnter={() => select(area.id)}
                    onFocus={() => select(area.id)}
                    onClick={() => select(area.id)}
                    className="group flex w-full items-baseline gap-5 py-4 pl-4 text-left transition-colors duration-200 outline-none focus-visible:bg-zinc-50 sm:gap-6 sm:py-5"
                  >
                    <span
                      className={`w-6 shrink-0 font-mono text-[11px] tabular-nums tracking-wide transition-colors duration-200 ${
                        on
                          ? "text-accent"
                          : "text-zinc-300 group-hover:text-zinc-500"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xl tracking-tight transition-[color,transform] duration-200 sm:text-2xl ${
                        on
                          ? "font-semibold text-zinc-900"
                          : "font-normal text-zinc-400 group-hover:translate-x-0.5 group-hover:text-zinc-700"
                      }`}
                    >
                      {area.label}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Dot scrubber — clear affordance */}
            <div className="mt-8 flex items-center gap-2" aria-hidden>
              {areas.map((area) => {
                const on = area.id === activeId;
                return (
                  <button
                    key={`dot-${area.id}`}
                    type="button"
                    tabIndex={-1}
                    aria-label={area.label}
                    onClick={() => select(area.id)}
                    onMouseEnter={() => select(area.id)}
                    className="relative flex h-6 w-6 items-center justify-center"
                  >
                    <span
                      className={`block rounded-[1px] transition-all duration-300 ${
                        on
                          ? "h-1.5 w-6 bg-accent"
                          : "h-1.5 w-1.5 bg-zinc-300 hover:bg-accent/50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail */}
          <div className="relative min-h-[240px] lg:min-h-[300px] lg:pt-1">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  role="tabpanel"
                  id={`${baseId}-panel-${active.id}`}
                  aria-labelledby={`${baseId}-tab-${active.id}`}
                  initial={
                    reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
                  }
                  transition={{ duration: 0.32, ease: EASE }}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      key={`n-${active.id}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-mono text-[11px] tracking-wide text-accent tabular-nums"
                    >
                      {String(activeIndex + 1).padStart(2, "0")}
                      <span className="mx-2 text-zinc-300">/</span>
                      {String(areas.length).padStart(2, "0")}
                    </motion.span>
                  </div>

                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                    {active.label}
                  </h3>

                  <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-600 sm:text-xl">
                    {active.summary}
                  </p>

                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
                    {active.detail}
                  </p>

                  <Link
                    href="/experience"
                    className="group mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    See experience
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
