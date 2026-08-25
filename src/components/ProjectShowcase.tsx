"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { linkClass } from "@/components/ui";
import { TechList } from "@/components/TechList";
import type { Project } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    project.url && {
      href: project.url,
      label: project.url.replace(/^https?:\/\//, ""),
    },
    project.appStoreUrl && {
      href: project.appStoreUrl,
      label: "App Store",
    },
  ].filter(Boolean) as { href: string; label: string }[];

  if (links.length === 0) return null;

  return (
    <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {link.label}
        </a>
      ))}
    </p>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const active =
    projects.find((p) => p.slug === activeSlug) ?? projects[0];
  const activeIndex = Math.max(
    0,
    projects.findIndex((p) => p.slug === activeSlug),
  );

  if (!active) return null;

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <div role="tablist" aria-label="Projects" aria-orientation="vertical">
        {projects.map((project, index) => {
          const on = project.slug === activeSlug;
          return (
            <div
              key={project.slug}
              className="relative border-b border-border"
            >
              {on && (
                <motion.span
                  layoutId={reduceMotion ? undefined : "project-active-bar"}
                  className="absolute inset-y-3 left-0 w-0.5 bg-accent"
                  transition={{ duration: 0.35, ease: EASE }}
                  aria-hidden
                />
              )}
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActiveSlug(project.slug)}
                className="flex w-full items-baseline gap-4 py-5 pl-4 text-left outline-none transition-colors focus-visible:bg-surface"
              >
                <span
                  className={`shrink-0 font-mono text-[11px] tracking-wide tabular-nums ${
                    on ? "text-accent" : "text-muted/50"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[15px] tracking-tight transition-colors ${
                      on
                        ? "font-semibold text-foreground"
                        : "font-medium text-muted hover:text-muted"
                    }`}
                  >
                    {project.name}
                  </span>
                  <span
                    className={`mt-0.5 block text-sm transition-colors ${
                      on ? "text-muted" : "text-muted"
                    }`}
                  >
                    {project.role}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="relative min-h-[220px] lg:pt-1">
        <p className="font-mono text-[11px] tracking-wide text-muted tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 text-muted/50">/</span>
          {String(projects.length).padStart(2, "0")}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            role="tabpanel"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {active.name}
              </h3>
              {active.period && (
                <p className="shrink-0 text-sm text-muted">{active.period}</p>
              )}
            </div>
            <p className="mt-2 text-sm text-muted">{active.role}</p>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
              {active.description}
            </p>
            <ProjectLinks project={active} />
            <div className="mt-5">
              <TechList items={active.tech} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
