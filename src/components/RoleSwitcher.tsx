"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ROLES = [
  "Cybersecurity Engineer",
  "Technical Product Manager",
  "Security Consultant",
  "Author & Public Speaker",
  "Community Builder",
  "AI/Robotics Researcher",
] as const;

const TYPE_MS = 22;
const DELETE_MS = 14;
const HOLD_MS = 700;
const GAP_MS = 120;

export function RoleSwitcher() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  useEffect(() => {
    if (reduceMotion) return;

    const full = ROLES[index];
    let timeout: number;

    if (phase === "typing") {
      if (text.length < full.length) {
        timeout = window.setTimeout(() => {
          setText(full.slice(0, text.length + 1));
        }, TYPE_MS);
      } else {
        timeout = window.setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      timeout = window.setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = window.setTimeout(() => {
          setText(text.slice(0, -1));
        }, DELETE_MS);
      } else {
        timeout = window.setTimeout(() => {
          setIndex((i) => (i + 1) % ROLES.length);
          setPhase("typing");
        }, GAP_MS);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [text, phase, index, reduceMotion]);

  if (reduceMotion) {
    return (
      <p className="text-xl tracking-tight text-zinc-800 sm:text-2xl">
        Cybersecurity Engineer
      </p>
    );
  }

  return (
    <p
      className="min-h-[1.35em] text-xl tracking-tight text-zinc-800 sm:text-2xl"
      aria-live="polite"
      aria-label={ROLES[index]}
    >
      <span>{text}</span>
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent align-baseline animate-pulse"
        aria-hidden
      />
    </p>
  );
}
