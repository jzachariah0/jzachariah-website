"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function IntroOverlay({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [fastExit, setFastExit] = useState(false);
  const closed = useRef(false);
  const notified = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const notify = useCallback(() => {
    if (notified.current) return;
    notified.current = true;
    onDoneRef.current();
  }, []);

  const dismiss = useCallback((immediate = false) => {
    if (closed.current) return;
    closed.current = true;
    if (immediate) {
      setFastExit(true);
      setVisible(false);
      notify();
      return;
    }
    setVisible(false);
  }, [notify]);

  useEffect(() => {
    if (window.location.hash) {
      dismiss(true);
      return;
    }

    const hold = reduceMotion ? 480 : 1680;
    const timer = window.setTimeout(() => dismiss(), hold);
    return () => window.clearTimeout(timer);
  }, [dismiss, reduceMotion]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss]);

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.overflow = "";
      return;
    }
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [visible]);

  const mark = "text-[clamp(4.5rem,14vw,8rem)] font-medium leading-none tracking-[-0.07em]";

  return (
    <AnimatePresence onExitComplete={notify}>
      {visible ? (
        <motion.div
          key="intro"
          role="presentation"
          onClick={() => dismiss()}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: fastExit ? 0 : reduceMotion ? 0.28 : 0.8,
            ease: EASE,
          }}
          className="fixed inset-0 z-[200] flex cursor-default select-none items-center justify-center bg-black"
        >
          <p className="sr-only">Joshua Zachariah</p>
          <div
            aria-hidden
            className="flex -translate-y-[0.05em] items-center font-sans text-[#f7f8f8]"
          >
            <motion.span
              initial={{ opacity: 0, x: reduceMotion ? 0 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.72,
                delay: reduceMotion ? 0 : 0.36,
                ease: EASE,
              }}
              className={mark}
            >
              j
            </motion.span>
            <motion.span
              initial={{ scaleY: 0, opacity: 0 }}
              animate={
                reduceMotion
                  ? { scaleY: 0, opacity: 0 }
                  : {
                      scaleY: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    }
              }
              transition={{
                duration: 1.28,
                delay: 0.1,
                times: [0, 0.2, 0.7, 1],
                ease: EASE,
              }}
              className="mx-[0.18em] inline-block h-[0.42em] w-px origin-center bg-[#f7f8f8]/50"
            />
            <motion.span
              initial={{ opacity: 0, x: reduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.72,
                delay: reduceMotion ? 0 : 0.36,
                ease: EASE,
              }}
              className={mark}
            >
              z
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
