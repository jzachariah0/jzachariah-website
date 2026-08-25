import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé for ${profile.name}, ${profile.title}.`,
};

function byStartDesc<T extends { start: string }>(a: T, b: T) {
  return a.start < b.start ? 1 : a.start > b.start ? -1 : 0;
}

export default function ResumePage() {
  const roles = [...profile.experience].sort(byStartDesc);
  const featured = profile.projects.filter((project) => project.featured);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14 print:max-w-none print:px-0 print:py-0">
        <p className="print:hidden mb-10 text-[13px]">
          <a href="/#top" className="text-muted transition-colors hover:text-foreground">
            ← Back
          </a>
        </p>

        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-[15px] text-muted">{profile.title}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
            <a href={`mailto:${profile.email}`} className="hover:text-foreground">
              {profile.email}
            </a>
            <span>{profile.location}</span>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-[12px] font-medium tracking-[0.16em] text-muted uppercase">
            Experience
          </h2>
          <div className="mt-4 space-y-6">
            {roles.map((role) => (
              <article key={role.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[15px] font-medium tracking-[-0.02em]">
                    {role.role}
                    <span className="font-normal text-muted"> · {role.company}</span>
                  </h3>
                  <p className="text-[13px] text-muted">{role.period}</p>
                </div>
                <ul className="mt-2 space-y-1 text-[14px] leading-6 text-muted">
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-medium tracking-[0.16em] text-muted uppercase">
            Selected work
          </h2>
          <div className="mt-4 space-y-4">
            {featured.map((project) => (
              <article key={project.slug}>
                <h3 className="text-[15px] font-medium tracking-[-0.02em]">
                  {project.name}
                  <span className="font-normal text-muted"> · {project.role}</span>
                </h3>
                <p className="mt-1 text-[14px] leading-6 text-muted">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-medium tracking-[0.16em] text-muted uppercase">
            Education
          </h2>
          <div className="mt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[15px] font-medium tracking-[-0.02em]">
                {profile.education.degree}
                <span className="font-normal text-muted">
                  {" "}
                  · {profile.education.school}
                </span>
              </h3>
              <p className="text-[13px] text-muted">
                {profile.education.graduation}
              </p>
            </div>
            <p className="mt-1 text-[14px] leading-6 text-muted">
              {profile.education.details.join(" · ")}
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-medium tracking-[0.16em] text-muted uppercase">
            Certifications
          </h2>
          <ul className="mt-4 space-y-1 text-[14px] leading-6 text-muted">
            {profile.certifications.map((cert) => (
              <li key={cert.name}>{cert.name}</li>
            ))}
            {profile.achievements.map((item) => (
              <li key={item.title}>
                {item.title}
                {item.year ? ` (${item.year})` : ""} — {item.detail}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
