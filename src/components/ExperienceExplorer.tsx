"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useState } from "react";
import { BrandMark } from "@/components/ui";
import { TechList } from "@/components/TechList";
import { type Experience } from "@/data/profile";

export function ExperienceExplorer({ items }: { items: Experience[] }) {
  const labelId = useId();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const active = items.find((job) => job.id === activeId) ?? items[0];
  const activeIndex = items.findIndex((job) => job.id === active?.id);

  const selectByOffset = useCallback(
    (delta: number) => {
      if (!items.length) return;
      const next = (activeIndex + delta + items.length) % items.length;
      setActiveId(items[next].id);
    },
    [activeIndex, items],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        selectByOffset(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectByOffset(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectByOffset]);

  if (!active) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-labelledby={labelId}
        className="flex gap-3 overflow-x-auto border-b border-border pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <span id={labelId} className="sr-only">
          Experience
        </span>
        {items.map((job) => {
          const selected = job.id === active.id;
          return (
            <button
              key={job.id}
              type="button"
              role="tab"
              title={job.company}
              aria-label={`${job.role} at ${job.company}`}
              aria-selected={selected}
              aria-controls={`experience-panel-${job.id}`}
              id={`experience-tab-${job.id}`}
              onClick={() => setActiveId(job.id)}
              className={`group relative shrink-0 pb-3 transition-opacity ${
                selected ? "opacity-100" : "opacity-35 hover:opacity-70"
              }`}
            >
              <BrandMark src={job.logo} active={selected} />
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px ${
                  selected ? "bg-accent" : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 min-h-[14rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            id={`experience-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`experience-tab-${active.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
              <div className="min-w-0 max-w-2xl">
                <p className="text-2xl font-medium tracking-tight text-foreground">
                  {active.role}
                </p>
                <p className="mt-2 text-muted">
                  {active.company}
                  {active.location ? `, ${active.location}` : ""}
                </p>

                <ul className="mt-8 space-y-3 border-l border-border pl-5">
                  {active.highlights.map((item) => (
                    <li
                      key={item.slice(0, 48)}
                      className="text-sm leading-relaxed text-muted sm:text-[15px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {active.tech.length > 0 && (
                  <div className="mt-6">
                    <TechList items={active.tech} />
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-4">
                <p className="text-sm text-muted">{active.period}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => selectByOffset(-1)}
                    aria-label="Previous"
                    className="flex h-8 w-8 items-center justify-center border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => selectByOffset(1)}
                    aria-label="Next"
                    className="flex h-8 w-8 items-center justify-center border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
