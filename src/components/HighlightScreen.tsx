"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { WorkWindow } from "@/components/WorkWindow";
import {
  SectionLabel,
  sectionContainerClass,
  sectionPaddingClass,
} from "@/components/ui";
import { profile } from "@/data/profile";

function useHighlightCycle() {
  const items = profile.proof;
  const [paused, setPaused] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.label ?? "");
  const active = items.find((item) => item.label === activeId) ?? items[0];
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.label === activeId),
  );

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const index = items.findIndex((item) => item.label === current);
        return items[(index + 1) % items.length].label;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, items]);

  const select = (label: string) => {
    setPaused(true);
    setActiveId(label);
  };

  return { items, setPaused, active, activeIndex, select };
}

export function HighlightStage() {
  const reduceMotion = useReducedMotion();
  const { items, setPaused, active, activeIndex, select } =
    useHighlightCycle();

  if (!active) return null;

  return (
    <section id="work" className={`scroll-mt-24 ${sectionPaddingClass}`}>
      <div className={`flex flex-col ${sectionContainerClass}`}>
        <FadeIn className="mb-6 sm:mb-8">
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            Work that shipped.
          </h2>
        </FadeIn>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <WorkWindow
            items={items}
            active={active}
            activeIndex={activeIndex}
            reduceMotion={reduceMotion}
            onSelect={select}
          >
            <Image
              src="/highlights-abstract.jpg"
              alt=""
              fill
              priority
              quality={75}
              sizes="100vw"
              className="object-cover object-center"
            />
          </WorkWindow>
        </div>
      </div>
    </section>
  );
}
