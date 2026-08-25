"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

const TYPE_MS = 56;
const LINE_PAUSE_MS = 220;
const DONE_PAUSE_MS = 180;

export function HeroName({
  onDone,
  play = true,
}: {
  onDone?: () => void;
  play?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [line, setLine] = useState<"first" | "last" | "done">("first");

  useEffect(() => {
    if (!play) return;

    if (reduceMotion) {
      onDoneRef.current?.();
      return;
    }

    let timeout: number;

    if (line === "first") {
      if (first.length < firstName.length) {
        timeout = window.setTimeout(() => {
          setFirst(firstName.slice(0, first.length + 1));
        }, TYPE_MS);
      } else {
        timeout = window.setTimeout(() => setLine("last"), LINE_PAUSE_MS);
      }
    } else if (line === "last") {
      if (last.length < lastName.length) {
        timeout = window.setTimeout(() => {
          setLast(lastName.slice(0, last.length + 1));
        }, TYPE_MS);
      } else {
        timeout = window.setTimeout(() => {
          setLine("done");
          onDoneRef.current?.();
        }, DONE_PAUSE_MS);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [play, first, last, line, firstName, lastName, reduceMotion]);

  if (reduceMotion && play) {
    return (
      <h1 className="text-left text-[clamp(3rem,8vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#f7f8f8]">
        {firstName}
        <br />
        {lastName}
      </h1>
    );
  }

  const caretOnFirst = line === "first";
  const caretOnLast = line === "last";

  return (
    <h1 className="min-h-[1.84em] text-left text-[clamp(3rem,8vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#f7f8f8]">
      <span className="sr-only">{profile.name}</span>
      <span aria-hidden>
        {first}
        {play && caretOnFirst && <Caret />}
        <br />
        {last}
        {play && caretOnLast && <Caret />}
      </span>
    </h1>
  );
}

function Caret() {
  return (
    <span
      className="ml-[0.04em] inline-block h-[0.78em] w-[0.055em] translate-y-[0.06em] bg-current align-baseline animate-pulse"
      aria-hidden
    />
  );
}
