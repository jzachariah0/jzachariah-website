import type { Metadata } from "next";
import {
  SectionLabel,
  pageMainClass,
  pageTitleClass,
  sectionClass,
} from "@/components/ui";
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
          <ul className="mt-8 divide-y divide-zinc-200 border-t border-zinc-200">
            {profile.community.map((item) => (
              <li
                key={item.name}
                className="grid gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
              >
                <div>
                  <p className="font-medium text-zinc-900">{item.name}</p>
                  <p className="mt-0.5 text-sm text-zinc-500">{item.role}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
                    {item.detail}
                  </p>
                </div>
                {item.period && (
                  <p className="shrink-0 text-sm text-zinc-400 sm:text-right">
                    {item.period}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </PageShell>
  );
}
