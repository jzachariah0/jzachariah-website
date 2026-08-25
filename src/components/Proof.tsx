"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/FadeIn";
import {
  SectionLabel,
  sectionContainerClass,
  sectionPaddingClass,
} from "@/components/ui";
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
      className="text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-5xl"
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
    <div ref={bandRef} className="border-y border-border">
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
            className={`py-10 sm:py-14 lg:px-8 ${
              i % 2 === 1 ? "pl-6 sm:pl-8" : "pr-6 sm:pr-8"
            } ${i >= 2 ? "border-t border-border lg:border-t-0" : ""} ${
              i > 0 ? "lg:border-l lg:border-border" : ""
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
                className="mt-3 max-w-[16rem] text-base leading-snug text-muted sm:text-lg"
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

export function Proof() {
  return (
    <section className="border-t border-border">
      <div className={`${sectionContainerClass} ${sectionPaddingClass}`}>
        <FadeIn>
          <SectionLabel>By the numbers</SectionLabel>
        </FadeIn>
        <div className="mt-8">
          <StatsBand />
        </div>
      </div>
    </section>
  );
}
