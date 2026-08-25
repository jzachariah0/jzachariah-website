"use client";

import { type ReactNode, useCallback, useState } from "react";
import { HomeHero } from "@/components/HomeHero";
import { IntroOverlay } from "@/components/IntroOverlay";
import { Navigation } from "@/components/Navigation";

export function HomeChrome({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);

  return (
    <div className="bg-black">
      <IntroOverlay onDone={onIntroDone} />
      <Navigation overlay />
      <HomeHero ready={ready} />
      {children}
    </div>
  );
}
