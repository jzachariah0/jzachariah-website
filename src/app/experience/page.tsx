import type { Metadata } from "next";
import {
  SectionLabel,
  pageMainClass,
  pageTitleClass,
  sectionClass,
} from "@/components/ui";
import { CommunityShowcase } from "@/components/CommunityShowcase";
import { ExperienceExplorer } from "@/components/ExperienceExplorer";
import { FadeIn } from "@/components/FadeIn";
import { PageShell } from "@/components/PageShell";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { getExperiences, profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  const experiences = getExperiences();
  const projects = [...profile.projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );

  return (
    <PageShell>
      <main className={pageMainClass}>
        <FadeIn className="max-w-xl">
          <h1 className={pageTitleClass}>Experience</h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-500">
            Product security, IAM, and security engineering.
          </p>
        </FadeIn>

        <section className="mt-14 sm:mt-16">
          <ExperienceExplorer items={experiences} />
        </section>

        <section className={sectionClass}>
          <SectionLabel>Projects</SectionLabel>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
            Select a project to read the brief.
          </p>
          <ProjectShowcase projects={projects} />
        </section>

        <section className={sectionClass}>
          <SectionLabel>Community</SectionLabel>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
            Education, healthcare access, and curriculum at scale.
          </p>
          <CommunityShowcase items={profile.community} />
        </section>
      </main>
    </PageShell>
  );
}
