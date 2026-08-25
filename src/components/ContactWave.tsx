"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Stripe-like layered wave in shallow 3D — accent blue only.
 * Each band is 200% wide (two tiles) so -50% translate never exposes a gap.
 */
const LAYERS = [
  {
    d: "M0,200 C180,140 320,260 520,200 C720,140 900,240 1100,190 C1280,150 1380,210 1440,180 L1440,320 L0,320 Z",
    opacity: 0.06,
    duration: 28,
    z: 0,
  },
  {
    d: "M0,210 C200,170 380,270 600,210 C820,150 1000,250 1200,200 C1320,170 1400,220 1440,200 L1440,320 L0,320 Z",
    opacity: 0.09,
    duration: 20,
    z: 0,
  },
  {
    d: "M0,230 C160,200 300,280 500,230 C700,180 880,270 1080,220 C1260,180 1360,250 1440,220 L1440,320 L0,320 Z",
    opacity: 0.12,
    duration: 14,
    z: 0,
  },
] as const;

function WaveBand({
  d,
  opacity,
  duration,
  z,
  reduceMotion,
}: {
  d: string;
  opacity: number;
  duration: number;
  z: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-full"
      style={{
        width: "200%",
        transform: `translateZ(${z}px)`,
      }}
      initial={false}
      animate={reduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }
      }
    >
      <svg
        viewBox="0 0 2880 320"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <path d={d} fill="#c4b59a" fillOpacity={opacity} />
        <path
          d={d}
          transform="translate(1440 0)"
          fill="#c4b59a"
          fillOpacity={opacity}
        />
      </svg>
    </motion.div>
  );
}

export function ContactWave({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[58%] min-h-[200px] overflow-hidden ${className}`}
      aria-hidden
      style={{
        perspective: "1600px",
        perspectiveOrigin: "50% 100%",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 32%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 32%, black 100%)",
      }}
    >
      <div
        className="absolute inset-0"
      >
        {LAYERS.map((layer) => (
          <WaveBand
            key={layer.duration}
            d={layer.d}
            opacity={layer.opacity}
            duration={layer.duration}
            z={reduceMotion ? 0 : layer.z}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}
