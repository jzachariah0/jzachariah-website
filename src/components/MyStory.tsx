"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { linkClass } from "@/components/ui";
import { profile } from "@/data/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

export function StoryChapters() {
  const { story } = profile;
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(story.sections[0]?.id ?? "");
  const active =
    story.sections.find((s) => s.id === activeId) ?? story.sections[0];
  const activeIndex = Math.max(
    0,
    story.sections.findIndex((s) => s.id === activeId),
  );

  if (!active) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-x-16 lg:gap-y-0">
      <div role="tablist" aria-label="Story chapters" aria-orientation="vertical">
        {story.sections.map((section, index) => {
          const on = section.id === activeId;
          return (
            <div
              key={section.id}
              className="relative border-b border-border"
            >
              {on && (
                <motion.span
                  layoutId={reduceMotion ? undefined : "story-active-bar"}
                  className="absolute inset-y-3 left-0 w-0.5 bg-accent"
                  transition={{ duration: 0.35, ease: EASE }}
                  aria-hidden
                />
              )}
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActiveId(section.id)}
                className="flex w-full items-baseline gap-4 py-4 pl-4 text-left outline-none transition-colors focus-visible:bg-surface"
              >
                <span
                  className={`shrink-0 font-mono text-[11px] tracking-wide tabular-nums ${
                    on ? "text-accent" : "text-muted/50"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[15px] tracking-tight transition-colors ${
                    on
                      ? "font-semibold text-foreground"
                      : "font-medium text-muted hover:text-muted"
                  }`}
                >
                  {section.title}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="min-h-[240px]">
        <p className="font-mono text-[11px] tracking-wide text-muted tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 text-muted/50">/</span>
          {String(story.sections.length).padStart(2, "0")}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-5"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {active.title}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {active.image && (
        <div className="col-span-full mt-8 ml-[calc(50%-50vw)] w-screen overflow-hidden py-5 lg:mt-10">
          <figure className="ml-auto w-[min(22rem,78vw)] origin-top-right translate-x-10 rotate-[1.6deg] sm:w-[24rem] sm:translate-x-12 lg:w-[28rem] lg:translate-x-[3.15rem]">
            <div className="relative bg-white px-[0.65rem] pt-[0.65rem] pb-[3.4rem] shadow-[0_1px_1px_rgba(26,26,24,0.06),0_14px_36px_-10px_rgba(26,26,24,0.28)]">
              <Image
                src={active.image}
                alt={active.imageAlt ?? ""}
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
        </div>
      )}

      <div className="lg:col-start-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
              {active.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex gap-1.5" aria-hidden>
              {story.sections.map((section) => (
                <span
                  key={section.id}
                  className={`h-0.5 flex-1 transition-colors duration-300 ${
                    section.id === activeId ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function WritingMedia() {
  const { story } = profile;

  return (
    <ul className="divide-y divide-border border-t border-border">
      {story.books.map((book) => (
        <li
          key={book.title}
          className="grid gap-4 py-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-6"
        >
          {book.cover ? (
            <Image
              src={book.cover}
              alt=""
              width={64}
              height={96}
              className="h-24 w-16 border border-border object-cover"
            />
          ) : (
            <div
              className="flex h-24 w-16 items-end border border-border bg-surface p-1.5"
              aria-hidden
            >
              <span className="line-clamp-4 text-[9px] font-medium leading-tight text-muted">
                {book.title}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium tracking-tight text-foreground">
              {book.title}
            </p>
            <p className="mt-1 text-sm text-muted">{book.note}</p>
            <Link
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-block text-sm ${linkClass}`}
            >
              Amazon →
            </Link>
          </div>
        </li>
      ))}
      <li className="grid gap-4 py-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-6">
        <Image
          src={story.youtube.logo}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 border border-border object-cover"
        />
        <div className="min-w-0">
          <p className="font-medium tracking-tight text-foreground">
            {story.youtube.name}
          </p>
          <p className="mt-1 text-sm text-muted">
            {story.youtube.subscribers} subscribers · {story.youtube.views} views
          </p>
          <Link
            href={story.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 inline-block text-sm ${linkClass}`}
          >
            YouTube →
          </Link>
        </div>
      </li>
    </ul>
  );
}
