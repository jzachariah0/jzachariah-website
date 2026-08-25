"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FadeInImmediate } from "@/components/FadeIn";
import { HeroName } from "@/components/HeroName";
import { HeroStage } from "@/components/HeroStage";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { heroButtonClass, heroTextLinkClass } from "@/components/ui";
import { profile } from "@/data/profile";
import { useCallback, useState } from "react";

export function HomeHero({ ready = true }: { ready?: boolean }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 520], [1, 0.92]);
  const opacity = useTransform(scrollY, [0, 420], [1, 0.28]);
  const y = useTransform(scrollY, [0, 520], [0, -28]);
  const [nameDone, setNameDone] = useState(false);
  const onNameDone = useCallback(() => setNameDone(true), []);

  return (
    <section
      id="top"
      className="sticky top-0 z-0 flex h-dvh items-center overflow-hidden bg-black"
    >
      <motion.div
        className="mx-auto w-full max-w-6xl px-6 pt-16"
        style={reduceMotion ? undefined : { scale, opacity, y }}
      >
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.18fr)] lg:gap-10">
          <div>
            <HeroName play={ready} onDone={onNameDone} />

            {ready ? (
              <>
                <FadeInImmediate delay={0.12}>
                  <div className="mt-6 sm:mt-7">
                    <RoleSwitcher
                      play={nameDone}
                      className="text-left text-lg tracking-[-0.02em] text-[#f7f8f8] sm:text-xl lg:text-2xl"
                    />
                  </div>
                </FadeInImmediate>

                <FadeInImmediate delay={0.22}>
                  <p className="mt-4 max-w-xl text-left text-[15px] leading-7 text-[#8a8f98] sm:text-base sm:leading-8">
                    {profile.seeking}
                  </p>
                </FadeInImmediate>

                <FadeInImmediate delay={0.34}>
                  <div className="mt-10 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
                    <a href="#connect" className={heroButtonClass}>
                      Get in touch
                    </a>
                    <a href="#work" className={heroTextLinkClass}>
                      Selected work
                      <span aria-hidden>→</span>
                    </a>
                    <a href="/resume" className={heroTextLinkClass}>
                      Résumé
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </FadeInImmediate>
              </>
            ) : null}
          </div>

          <FadeInImmediate delay={0.18} className="hidden md:block">
            <HeroStage />
          </FadeInImmediate>
        </div>
      </motion.div>
    </section>
  );
}
