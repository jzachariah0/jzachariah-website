"use client";

import createGlobe from "cobe";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const IDLE_SPIN = 0.1;

export function HeroStage() {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const phi = { current: 0.4 };
    const theta = { current: 0.28 };
    const vel = { x: 0, y: 0 };
    const drag = { active: false, lastX: 0, lastY: 0 };
    let lastTs = 0;
    let raf = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: 2,
      height: 2,
      phi: phi.current,
      theta: theta.current,
      dark: 1,
      diffuse: 1.7,
      mapSamples: 24000,
      mapBrightness: 10,
      mapBaseBrightness: 0.07,
      baseColor: [0.93, 0.93, 0.91],
      markerColor: [0.93, 0.93, 0.91],
      glowColor: [0.14, 0.14, 0.15],
      markers: [],
      scale: 1.04,
    });

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      globe.update({
        width: Math.max(1, rect.width),
        height: Math.max(1, rect.height),
      });
    };

    const onMove = (event: PointerEvent) => {
      if (!drag.active) return;
      const dx = event.clientX - drag.lastX;
      const dy = event.clientY - drag.lastY;
      phi.current += dx * 0.005;
      theta.current = Math.max(-0.6, Math.min(0.7, theta.current + dy * 0.003));
      vel.y = dx * 0.014;
      vel.x = dy * 0.008;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
    };

    const onDown = (event: PointerEvent) => {
      drag.active = true;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      wrap.setPointerCapture(event.pointerId);
      vel.x *= 0.2;
      vel.y *= 0.2;
    };

    const onUp = (event: PointerEvent) => {
      drag.active = false;
      if (wrap.hasPointerCapture(event.pointerId)) {
        wrap.releasePointerCapture(event.pointerId);
      }
    };

    const draw = (ts: number) => {
      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0;
      lastTs = ts;

      if (!reduceMotion && !drag.active) {
        const damp = Math.pow(0.06, dt);
        vel.x *= damp;
        vel.y *= damp;
        theta.current = Math.max(
          -0.6,
          Math.min(0.7, theta.current + vel.x * dt),
        );
        phi.current += (vel.y + IDLE_SPIN) * dt;
      }

      globe.update({
        phi: phi.current,
        theta: theta.current,
      });
      wrap.style.cursor = drag.active ? "grabbing" : "grab";

      if (!reduceMotion) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    resize();
    if (reduceMotion) {
      globe.update({ phi: phi.current, theta: theta.current });
    } else {
      raf = window.requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      globe.destroy();
      const parent = canvas.parentElement;
      if (parent && parent !== wrap) {
        wrap.appendChild(canvas);
        parent.remove();
      }
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[min(78vh,46rem)] w-full touch-none select-none"
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
