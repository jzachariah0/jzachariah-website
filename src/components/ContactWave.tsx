"use client";

import { motion, useReducedMotion } from "framer-motion";

/** One wave period (1440×320) — duplicated for a seamless horizontal loop. */
const WAVE_A =
  "M0,192 C240,256 360,96 720,160 C1080,224 1200,96 1440,160 L1440,320 L0,320 Z";
const WAVE_B =
  "M0,224 C180,180 420,280 720,220 C1020,160 1260,200 1440,180 L1440,320 L0,320 Z";

/**
 * Stripe-like geometric wave — accent blue only, no glow/mesh.
 * Frozen when prefers-reduced-motion.
 */
export function ContactWave() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] min-h-[180px] overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-y-0 left-0 flex h-full w-[200%]"
        initial={false}
        animate={reduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 18,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        {[0, 1].map((tile) => (
          <svg
            key={tile}
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="h-full w-1/2"
          >
            <path d={WAVE_A} fill="var(--accent)" fillOpacity="0.14" />
            <path d={WAVE_B} fill="var(--accent)" fillOpacity="0.1" />
          </svg>
        ))}
      </motion.div>
    </div>
  );
}
