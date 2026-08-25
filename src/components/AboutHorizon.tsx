"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * About atmosphere: fine horizon + stroked accent paths with quiet depth.
 * Deliberately not the filled ContactWave.
 */
export function AboutHorizon() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[42%] min-h-[140px] overflow-hidden"
      aria-hidden
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 100%",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(11,95,255,0.08) 27px, rgba(11,95,255,0.08) 28px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
        }}
      />

      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "50% 100%",
          transform: reduceMotion ? undefined : "rotateX(14deg)",
        }}
      >
        <motion.path
          d="M-40,120 C200,40 420,180 720,100 C1020,20 1240,150 1480,90"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.25"
          strokeOpacity="0.35"
          initial={false}
          animate={
            reduceMotion
              ? { pathLength: 1, opacity: 0.35 }
              : {
                  pathLength: [0.85, 1, 0.85],
                  opacity: [0.22, 0.4, 0.22],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 8, ease: "easeInOut", repeat: Infinity }
          }
          style={{
            pathLength: 1,
            transform: reduceMotion ? undefined : "translateZ(22px)",
          }}
        />
        <motion.path
          d="M-40,150 C260,90 480,170 760,130 C1040,90 1280,160 1480,120"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.18"
          initial={false}
          animate={
            reduceMotion ? { x: 0 } : { x: [0, -24, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 14, ease: "easeInOut", repeat: Infinity }
          }
          style={{
            transform: reduceMotion ? undefined : "translateZ(8px)",
          }}
        />
      </svg>
    </div>
  );
}
