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
            className="w-[min(86vw,32rem)]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {job.role}
              </h3>
              {job.logo ? <BrandMark src={job.logo} size={40} /> : null}
            </div>
            <p className="text-[15px] font-medium text-foreground/85">
              {job.company}
              {job.location ? ` · ${job.location}` : ""}
            </p>
            <p className="mt-1 text-[13px] text-muted">{job.period}</p>
            <ul className="mt-6 space-y-3">
              {job.highlights.map((item) => (
                <li
                  key={item.slice(0, 48)}
                  className="text-[15px] leading-7 text-foreground/80"
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
            className="w-[min(86vw,28rem)]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {item.name}
              </h3>
              {item.logo ? <BrandMark src={item.logo} size={40} /> : null}
            </div>
            <p className="text-[15px] font-medium text-foreground/85">
              {item.role}
            </p>
            <p className="mt-4 text-[15px] leading-7 text-foreground/80">
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
            className="w-[min(86vw,30rem)]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {project.name}
              </h3>
              {project.logo ? <BrandMark src={project.logo} size={40} /> : null}
            </div>
            <p className="text-[15px] font-medium text-foreground/85">
              {project.role}
            </p>
            <p className="mt-4 text-[15px] leading-7 text-foreground/80">
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
