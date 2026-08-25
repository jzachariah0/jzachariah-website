"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLayoutEffect, useRef, type ReactNode } from "react";

export function HScrollTrack({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const travel = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform([scrollYProgress, travel], (latest) => {
    const progress = latest[0] as number;
    const distance = latest[1] as number;
    return -progress * distance;
  });

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mq = window.matchMedia("(min-width: 1024px)");

    const measure = () => {
      if (reduceMotion || !mq.matches) {
        pin.style.height = "";
        travel.set(0);
        return;
      }
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      travel.set(distance);
      pin.style.height = `${window.innerHeight + distance}px`;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, [reduceMotion, travel]);

  return (
    <div ref={pinRef} className="relative">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:items-center lg:overflow-hidden">
        <motion.div
          ref={trackRef}
          style={reduceMotion ? undefined : { x }}
          className="flex items-center gap-16 overflow-x-auto px-[6vw] py-20 pr-[20vw] [scrollbar-width:none] [-ms-overflow-style:none] lg:h-full lg:overflow-visible lg:py-0 [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function SceneCard({
  index,
  total,
  color,
  eyebrow,
  className = "",
  children,
}: {
  index: number;
  total: number;
  color: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article
      className={`relative flex h-auto min-h-[26rem] shrink-0 flex-col gap-6 border-l border-border/80 pl-8 sm:pl-10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-6 h-56 w-56 rounded-full opacity-[0.16] blur-3xl"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 select-none text-[6.5rem] leading-none font-semibold tracking-[-0.06em] text-foreground/[0.06] sm:text-[8rem]"
      >
        {num}
      </span>
      <div className="relative flex items-center gap-3">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden
        />
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted tabular-nums">
          {num}
          <span className="mx-1.5 text-muted/40">/</span>
          {String(total).padStart(2, "0")}
        </p>
        {eyebrow ? (
          <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
      </div>
      <div className="relative">{children}</div>
    </article>
  );
}

export function SceneIntro({
  label,
  title,
  kicker,
}: {
  label: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="flex h-[min(70vh,38rem)] w-[min(86vw,28rem)] shrink-0 flex-col justify-end">
      <p className="text-[13px] font-medium tracking-[0.16em] text-muted uppercase">
        {label}
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {kicker ? (
        <p className="mt-5 max-w-sm text-[17px] leading-8 text-muted">{kicker}</p>
      ) : null}
    </div>
  );
}
