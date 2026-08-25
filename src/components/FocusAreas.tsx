"use client";

import { HScrollTrack, SceneCard, SceneIntro } from "@/components/HScrollTrack";
import type { FocusArea } from "@/data/profile";
import { profile } from "@/data/profile";

interface FocusAreasProps {
  areas?: FocusArea[];
}

export function FocusAreas({ areas = profile.focusAreas }: FocusAreasProps) {
  return (
    <section id="focus" className="border-t border-border bg-background">
      <HScrollTrack>
        <SceneIntro
          label="Focus"
          title="What I work on"
          kicker="Product security, identity, and the systems around them."
        />
        {areas.map((area, i) => (
          <SceneCard
            key={area.id}
            index={i}
            total={areas.length}
            color={area.color}
            className="w-[min(84vw,30rem)]"
          >
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              {area.label}
            </h3>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">
              {area.summary}
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
              {area.detail}
            </p>
          </SceneCard>
        ))}
      </HScrollTrack>
    </section>
  );
}
