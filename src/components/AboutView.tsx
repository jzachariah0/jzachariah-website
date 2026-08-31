"use client";

import Image from "next/image";
import {
  HScrollTrack,
  SceneCard,
  SceneIntro,
} from "@/components/HScrollTrack";
import { WritingMedia } from "@/components/MyStory";
import { accentAt, profile } from "@/data/profile";

const artworkPositions = [
  "14% 50%",
  "34% 50%",
  "52% 50%",
  "68% 50%",
  "84% 50%",
  "98% 50%",
];

export function AboutView() {
  const origin = profile.story.sections.find((section) => section.image);
  const totalCards = profile.story.sections.length + 2;

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border bg-background"
    >
      <HScrollTrack>
        <SceneIntro
          label={`About · ${profile.location}`}
          title="About"
          kicker={profile.story.mission}
        />

        {origin?.image ? (
          <figure className="w-[min(20rem,72vw)] shrink-0 origin-top-right rotate-[1.6deg]">
            <div className="relative bg-white px-[0.65rem] pt-[0.65rem] pb-[3.4rem] shadow-[0_1px_1px_rgba(26,26,24,0.06),0_14px_36px_-10px_rgba(26,26,24,0.28)]">
              <Image
                src={origin.image}
                alt={origin.imageAlt ?? ""}
                width={720}
                height={720}
                className="aspect-square h-auto w-full object-cover object-[center_40%]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex h-[3.4rem] flex-col items-center justify-center px-3 text-center font-hand text-[1.35rem] leading-none tracking-[-0.02em] text-[#1e4aa8] -rotate-[1.2deg]">
                <span>where it started</span>
                <span className="mt-1 text-[1.15rem]">06/28/2009, nj</span>
              </figcaption>
            </div>
          </figure>
        ) : null}

        {profile.story.sections.map((section, i) => (
          <SceneCard
            key={section.id}
            index={i}
            total={totalCards}
            color={accentAt(i)}
            artwork
            artworkPosition={artworkPositions[i % artworkPositions.length]}
            showIndex={false}
            className="w-[min(86vw,32rem)]"
          >
            <h3 className="max-w-md font-display text-[3.25rem] leading-[0.88] font-normal tracking-[-0.045em] text-foreground sm:text-[3.75rem]">
              {section.title}
            </h3>
            <div className="mt-8 max-w-sm space-y-4 text-[14px] leading-6 text-muted">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </SceneCard>
        ))}

        <SceneCard
          index={profile.story.sections.length}
          total={totalCards}
          color={accentAt(profile.story.sections.length)}
          eyebrow="Education"
          artwork
          artworkPosition={
            artworkPositions[
              profile.story.sections.length % artworkPositions.length
            ]
          }
          showIndex={false}
          className="w-[min(84vw,32rem)]"
        >
          <h3 className="max-w-[25rem] font-display text-[2.5rem] leading-[0.9] font-normal tracking-[-0.035em] text-foreground sm:text-[2.75rem]">
            {profile.education.degree}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            {profile.education.school} · {profile.education.graduation}
          </p>
          <ul className="mt-6 max-w-sm list-disc space-y-2 pl-4 text-[14px] leading-6 text-muted marker:text-foreground/30">
            {profile.education.details.map((item) => (
              <li key={item} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[13px] font-medium tracking-[0.16em] text-muted uppercase">
            Certification
          </p>
          <p className="mt-2 text-[15px] text-foreground">
            ISC² Certified in Cybersecurity
          </p>
        </SceneCard>

        <SceneCard
          index={profile.story.sections.length + 1}
          total={totalCards}
          color={accentAt(profile.story.sections.length + 1)}
          eyebrow="Writing"
          artwork
          artworkPosition={
            artworkPositions[
              (profile.story.sections.length + 1) % artworkPositions.length
            ]
          }
          showIndex={false}
          className="w-[min(86vw,34rem)] overflow-y-auto"
        >
          <WritingMedia />
        </SceneCard>
      </HScrollTrack>
    </section>
  );
}
