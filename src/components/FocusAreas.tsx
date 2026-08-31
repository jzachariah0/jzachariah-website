"use client";

import { HScrollTrack, SceneCard, SceneIntro } from "@/components/HScrollTrack";
import type { FocusArea } from "@/data/profile";
import { profile } from "@/data/profile";

interface FocusAreasProps {
  areas?: FocusArea[];
}

const artworkPositions = [
  "16% 50%",
  "36% 50%",
  "54% 50%",
  "72% 50%",
  "88% 50%",
  "100% 50%",
];

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
            artwork
            artworkPosition={artworkPositions[i % artworkPositions.length]}
            showIndex={false}
            className="focus-card-readable w-[min(86vw,32rem)]"
          >
            <h3 className="max-w-md font-display text-[3.25rem] leading-[0.88] font-normal tracking-[-0.045em] text-foreground sm:text-[3.75rem]">
              {area.label}
            </h3>
            <dl className="mt-9 max-w-sm space-y-6">
              <div>
                <dt className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
                  Working on
                </dt>
                <dd className="mt-2 text-[16px] leading-6 text-foreground/85">
                  {area.summary}
                </dd>
              </div>
              <div className="border-t border-border/80 pt-5">
                <dt className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
                  Impact
                </dt>
                <dd className="mt-2 text-[15px] leading-6 text-foreground/75">
                  {area.detail}
                </dd>
              </div>
            </dl>
          </SceneCard>
        ))}
      </HScrollTrack>
    </section>
  );
}
