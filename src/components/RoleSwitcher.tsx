"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ROLES = [
  "Cybersecurity Engineer/Consultant",
  "Technical Product Manager",
  "Security Consultant",
  "Author & Public Speaker",
  "Community Builder",
  "AI/Robotics Researcher",
] as const;

const TYPE_MS = 22;
const DELETE_MS = 14;
const HOLD_MS = 1600;
const GAP_MS = 160;

export function RoleSwitcher({
  className = "text-xl tracking-[-0.02em] text-foreground sm:text-2xl",
  play = true,
}: {
  className?: string;
  play?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  useEffect(() => {
    if (reduceMotion || !play) return;

    const full = ROLES[index];
    let timeout: number;

    if (phase === "typing") {
      if (text.length < full.length) {
        timeout = window.setTimeout(() => {
          setText(full.slice(0, text.length + 1));
        }, TYPE_MS);
      } else {
        timeout = window.setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timeout = window.setTimeout(() => setPhase("deleting"), HOLD_MS);
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
  }, [text, phase, index, reduceMotion, play]);

  if (reduceMotion) {
    return <p className={className}>Cybersecurity Engineer/Consultant</p>;
  }

  if (!play) {
    return <p className={`min-h-[1.35em] ${className}`} aria-hidden />;
  }

  return (
    <p
      className={`min-h-[1.35em] ${className}`}
      aria-live="polite"
      aria-label={ROLES[index]}
    >
      <span>{text}</span>
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-current align-baseline animate-pulse"
        aria-hidden
      />
    </p>
  );
}
