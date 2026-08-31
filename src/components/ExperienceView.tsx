"use client";

import { HScrollTrack, SceneCard, SceneIntro } from "@/components/HScrollTrack";
import { TechList } from "@/components/TechList";
import { BrandMark } from "@/components/ui";
import {
  accentAt,
  experienceCategoryColors,
  getExperiences,
  profile,
} from "@/data/profile";

const artworkPositions = [
  "12% 50%",
  "30% 50%",
  "48% 50%",
  "64% 50%",
  "80% 50%",
  "96% 50%",
];

export function ExperienceView() {
  const experiences = getExperiences();
  const projects = [...profile.projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-border bg-surface"
    >
      <HScrollTrack>
        <SceneIntro
          label="Experience"
          title="Roles and projects"
          kicker="Product security, IAM, and security engineering."
        />
        {experiences.map((job, i) => (
          <SceneCard
            key={job.id}
            index={i}
            total={experiences.length}
            color={experienceCategoryColors[job.category]}
            artwork
            artworkPosition={artworkPositions[i % artworkPositions.length]}
            showIndex={false}
            className="w-[min(86vw,32rem)]"
          >
            <div className="mb-5 flex items-start justify-between gap-5">
              <h3 className="max-w-[22rem] font-display text-[2.5rem] leading-[0.9] font-normal tracking-[-0.035em] text-foreground sm:text-[2.75rem]">
                {job.role}
              </h3>
              {job.logo ? <BrandMark src={job.logo} size={40} /> : null}
            </div>
            <p className="max-w-sm text-[15px] leading-6 font-medium text-foreground/85">
              {job.company}
              {job.location ? ` · ${job.location}` : ""}
            </p>
            <p className="mt-1 text-[13px] text-muted">{job.period}</p>
            <ul className="mt-6 max-w-sm list-disc space-y-2.5 pl-4 marker:text-foreground/30">
              {job.highlights.map((item) => (
                <li
                  key={item.slice(0, 48)}
                  className="pl-1 text-[14px] leading-6 text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
            {job.tech.length > 0 ? (
              <div className="mt-6">
                <TechList items={job.tech} />
              </div>
            ) : null}
          </SceneCard>
        ))}
        {profile.community.map((item, i) => (
          <SceneCard
            key={item.name}
            index={i}
            total={profile.community.length}
            color={accentAt(i)}
            eyebrow="Community"
            artwork
            artworkPosition={
              artworkPositions[(i + experiences.length) % artworkPositions.length]
            }
            showIndex={false}
            className="w-[min(86vw,32rem)]"
          >
            <div className="mb-5 flex items-start justify-between gap-5">
              <h3 className="max-w-[22rem] font-display text-[2.5rem] leading-[0.9] font-normal tracking-[-0.035em] text-foreground sm:text-[2.75rem]">
                {item.name}
              </h3>
              {item.logo ? <BrandMark src={item.logo} size={40} /> : null}
            </div>
            <p className="max-w-sm text-[15px] leading-6 font-medium text-foreground/85">
              {item.role}
            </p>
            <p className="mt-5 max-w-sm text-[14px] leading-6 text-foreground/80">
              {item.detail}
            </p>
          </SceneCard>
        ))}
        {projects.map((project, i) => (
          <SceneCard
            key={project.slug}
            index={i}
            total={projects.length}
            color={accentAt(i + 1)}
            eyebrow="Project"
            artwork
            artworkPosition={
              artworkPositions[
                (i + experiences.length + profile.community.length) %
                  artworkPositions.length
              ]
            }
            showIndex={false}
            className="w-[min(86vw,32rem)]"
          >
            <div className="mb-5 flex items-start justify-between gap-5">
              <h3 className="max-w-[22rem] font-display text-[2.5rem] leading-[0.9] font-normal tracking-[-0.035em] text-foreground sm:text-[2.75rem]">
                {project.name}
              </h3>
              {project.logo ? <BrandMark src={project.logo} size={40} /> : null}
            </div>
            <p className="max-w-sm text-[15px] leading-6 font-medium text-foreground/85">
              {project.role}
            </p>
            <p className="mt-5 max-w-sm text-[14px] leading-6 text-foreground/80">
              {project.description}
            </p>
            {project.tech.length > 0 ? (
              <div className="mt-6">
                <TechList items={project.tech} />
              </div>
            ) : null}
          </SceneCard>
        ))}
      </HScrollTrack>
    </section>
  );
}
