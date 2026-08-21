import type { Metadata } from "next";
import Link from "next/link";
import {
  SectionLabel,
  pageMainClass,
  primaryButtonClass,
  secondaryButtonClass,
  sectionClass,
} from "@/components/ui";
import { FadeIn, FadeInImmediate } from "@/components/FadeIn";
import { Headshot } from "@/components/Headshot";
import { StoryChapters, WritingMedia } from "@/components/MyStory";
import { PageShell } from "@/components/PageShell";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PageShell>
      <main className={pageMainClass}>
        {/* Hero */}
        <FadeInImmediate>
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-12 lg:gap-14">
            <Headshot
              size="xl"
              priority
              className="shrink-0 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            />
            <div className="min-w-0 max-w-xl sm:pt-1">
              <p className="text-[13px] font-medium tracking-[0.14em] text-zinc-400 uppercase">
                About
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0A2540] sm:text-5xl sm:leading-[1.08]">
                {profile.name}
              </h1>
              <p className="mt-3 text-sm text-zinc-400">{profile.location}</p>
              <p className="mt-6 text-lg leading-relaxed text-[#425466] sm:text-xl sm:leading-relaxed">
                {profile.story.mission}
              </p>
            </div>
          </div>
        </FadeInImmediate>

        {/* Bio */}
        <FadeIn className="mt-14 max-w-2xl space-y-4 border-t border-zinc-200 pt-10 text-[15px] leading-relaxed text-[#425466] sm:mt-16 sm:pt-12 sm:text-base">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </FadeIn>

        {/* Story */}
        <section className={sectionClass}>
          <FadeIn>
            <SectionLabel>My story</SectionLabel>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
              Select a chapter.
            </p>
          </FadeIn>
          <FadeIn>
            <StoryChapters />
          </FadeIn>
        </section>

        {/* Credentials — one band */}
        <section className={sectionClass}>
          <FadeIn>
            <SectionLabel>Credentials</SectionLabel>
            <div className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              <div>
                <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                  Education
                </p>
                <p className="mt-4 text-base font-semibold tracking-tight text-[#0A2540]">
                  {profile.education.degree}
                </p>
                <p className="mt-1 text-sm text-[#425466]">
                  {profile.education.school}
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Expected {profile.education.graduation}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-500">
                  {profile.education.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                  Certification
                </p>
                <ul className="mt-4 space-y-4">
                  {profile.certifications.map((cert) => (
                    <li key={cert.name}>
                      <p className="text-base font-semibold tracking-tight text-[#0A2540]">
                        {cert.name.replace(/\s*\(CC\)\s*$/, "")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                  Recognition
                </p>
                <ul className="mt-4 space-y-5">
                  {profile.achievements.map((item) => (
                    <li key={item.title}>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-sm font-semibold tracking-tight text-[#0A2540]">
                          {item.title}
                        </p>
                        <p className="shrink-0 font-mono text-[11px] text-zinc-400 tabular-nums">
                          {item.year}
                        </p>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Writing */}
        <section className={sectionClass}>
          <FadeIn>
            <SectionLabel>Writing & media</SectionLabel>
            <WritingMedia />
          </FadeIn>
        </section>

        {/* CTA */}
        <FadeIn className={sectionClass}>
          <p className="text-[13px] font-medium tracking-[0.14em] text-zinc-400 uppercase">
            Get in touch
          </p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl sm:leading-[1.15]">
            Open to cybersecurity roles and collaborations.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#425466]">
            Book a 30-minute call or send an email.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButtonClass}
            >
              Book a call
            </a>
            <Link href="/contact" className={secondaryButtonClass}>
              Contact details
            </Link>
          </div>
        </FadeIn>
      </main>
    </PageShell>
  );
}
