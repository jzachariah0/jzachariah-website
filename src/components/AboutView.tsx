"use client";

import Image from "next/image";
import {
  HScrollTrack,
  SceneCard,
  SceneIntro,
} from "@/components/HScrollTrack";
import { WritingMedia } from "@/components/MyStory";
import { accentAt, profile } from "@/data/profile";

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
            className="w-[min(84vw,30rem)]"
          >
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {section.title}
            </h3>
            <div className="mt-6 max-w-md space-y-4 text-[15px] leading-7 text-muted">
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
          className="w-[min(84vw,32rem)]"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">
            {profile.education.degree}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {profile.education.school} · {profile.education.graduation}
          </p>
          <ul className="mt-6 space-y-2 text-[15px] leading-7 text-muted">
            {profile.education.details.map((item) => (
              <li key={item}>{item}</li>
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
          className="w-[min(86vw,34rem)] overflow-y-auto"
        >
          <WritingMedia />
        </SceneCard>
      </HScrollTrack>
    </section>
  );
}
