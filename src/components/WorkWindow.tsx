"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { BrandMark } from "@/components/ui";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;
const springSoft = { stiffness: 180, damping: 24, mass: 0.8 };

function MacPointer() {
  return (
    <svg
      width="15"
      height="20"
      viewBox="0 0 15 20"
      fill="none"
      aria-hidden
      className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
    >
      <path
        d="M1.15 1.05 1.35 16.35 5.2 12.85 8.15 19.2 10.7 18.05 7.6 11.5 13.7 11.35 1.15 1.05Z"
        fill="#111"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WorkWindow({
  items,
  active,
  activeIndex,
  reduceMotion,
  onSelect,
  children,
}: {
  items: typeof profile.proof;
  active: (typeof profile.proof)[number];
  activeIndex: number;
  reduceMotion: boolean | null;
  onSelect: (label: string) => void;
  children: ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    pointerId: number;
    ox: number;
    oy: number;
  } | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useMotionValue(6);
  const ry = useMotionValue(-7);
  const sx = useSpring(x, springSoft);
  const sy = useSpring(y, springSoft);
  const srx = useSpring(rx, springSoft);
  const sry = useSpring(ry, springSoft);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const moveCursor = (event: { clientX: number; clientY: number }) => {
    setCursor({ x: event.clientX, y: event.clientY });
  };

  const onStageMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    moveCursor(event);
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return;
    const nx = (event.clientX - stage.left) / stage.width - 0.5;
    const ny = (event.clientY - stage.top) / stage.height - 0.5;
    if (!reduceMotion && !drag.current) {
      rx.set(6 - ny * 9);
      ry.set(-7 + nx * 11);
    }

    if (drag.current && event.pointerId === drag.current.pointerId) {
      const nextX = event.clientX - drag.current.ox;
      const nextY = event.clientY - drag.current.oy;
      const maxX = stage.width * 0.28;
      const maxY = stage.height * 0.22;
      x.set(Math.max(-maxX, Math.min(maxX, nextX)));
      y.set(Math.max(-maxY, Math.min(maxY, nextY)));
    }
  };

  const onTitleDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    drag.current = {
      pointerId: event.pointerId,
      ox: event.clientX - x.get(),
      oy: event.clientY - y.get(),
    };
    stageRef.current?.setPointerCapture(event.pointerId);
  };

  const endDrag = (event: ReactPointerEvent) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
  };

  return (
    <div
      ref={stageRef}
      className={`relative min-h-[58vh] overflow-hidden rounded-3xl bg-[#16351f] sm:min-h-[64vh] ${
        reduceMotion ? "" : "cursor-none [&_*]:cursor-none"
      }`}
      style={reduceMotion ? undefined : { cursor: "none" }}
      onPointerEnter={moveCursor}
      onPointerMove={onStageMove}
      onPointerLeave={() => {
        setCursor(null);
        if (!reduceMotion && !drag.current) {
          rx.set(6);
          ry.set(-7);
        }
      }}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {children}
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center sm:p-8 lg:p-12">
        <motion.div
          className="w-full max-w-md will-change-transform sm:max-w-lg lg:max-w-xl"
          style={
            reduceMotion
              ? undefined
              : {
                  x: sx,
                  y: sy,
                  rotateX: srx,
                  rotateY: sry,
                  transformPerspective: 1400,
                  transformOrigin: "50% 70%",
                }
          }
        >
          <div
            ref={windowRef}
            className="relative overflow-hidden rounded-[12px] border border-border/70 bg-background shadow-[0_40px_80px_-24px_rgba(8,24,12,0.55),0_0_0_1px_rgba(255,255,255,0.18)]"
          >
            <div
              className="relative flex h-12 items-center border-b border-border/70 bg-surface px-4"
              onPointerDown={onTitleDown}
            >
              <div className="flex gap-[7px]" aria-hidden>
                <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)]" />
              </div>
              <p className="pointer-events-none absolute inset-x-20 truncate text-center text-[13px] font-medium tracking-[-0.01em] text-foreground/55">
                {active.label}
              </p>
              <p className="ml-auto text-[11px] text-muted tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")}/
                {String(items.length).padStart(2, "0")}
              </p>
            </div>

            <div className="px-7 py-6 sm:px-9 sm:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {active.metric && (
                    <p className="text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-5xl">
                      {active.metric}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-3.5">
                    <BrandMark src={active.logo} size={40} active />
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                        {active.label}
                      </h3>
                      {active.role && (
                        <p className="mt-0.5 text-[15px] text-muted">
                          {active.role}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-5 text-[16px] leading-7 text-foreground/80 sm:text-[17px] sm:leading-8">
                    {active.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              role="tablist"
              aria-label="Highlights"
              className="flex gap-2.5 border-t border-border/70 bg-surface px-5 py-3.5"
            >
              {items.map((item) => {
                const on = item.label === active.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-label={item.label}
                    onClick={() => onSelect(item.label)}
                    className={`rounded-md transition-transform duration-150 ${
                      on
                        ? "scale-110 ring-1 ring-foreground/20"
                        : "opacity-70 hover:scale-105 hover:opacity-100"
                    }`}
                  >
                    <BrandMark src={item.logo} size={32} active={on} />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {cursor &&
        !reduceMotion &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[80]"
            style={{ left: cursor.x, top: cursor.y }}
          >
            <MacPointer />
          </div>,
          document.body,
        )}
    </div>
  );
}
