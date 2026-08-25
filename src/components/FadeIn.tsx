"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode, useEffect } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInImmediate({
  children,
  className,
  delay = 0,
}: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      variants={reveal}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HomeSnap() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("home-snap");
    return () => root.classList.remove("home-snap");
  }, []);

  return null;
}
