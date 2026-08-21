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
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
      <div role="tablist" aria-label="Story chapters" aria-orientation="vertical">
        {story.sections.map((section, index) => {
          const on = section.id === activeId;
          return (
            <div
              key={section.id}
              className="relative border-b border-zinc-200/90"
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
                className="flex w-full items-baseline gap-4 py-4 pl-4 text-left outline-none transition-colors focus-visible:bg-zinc-50"
              >
                <span
                  className={`shrink-0 font-mono text-[11px] tracking-wide tabular-nums ${
                    on ? "text-accent" : "text-zinc-300"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[15px] tracking-tight transition-colors ${
                    on
                      ? "font-semibold text-[#0A2540]"
                      : "font-medium text-zinc-400 hover:text-zinc-600"
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
        <p className="font-mono text-[11px] tracking-wide text-zinc-400 tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 text-zinc-300">/</span>
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
            <h3 className="text-2xl font-semibold tracking-tight text-[#0A2540] sm:text-3xl">
              {active.title}
            </h3>

            {active.image && (
              <div className="mt-6 overflow-hidden border border-zinc-200 bg-zinc-50">
                <Image
                  src={active.image}
                  alt={active.imageAlt ?? ""}
                  width={800}
                  height={500}
                  className="aspect-[16/10] h-auto w-full object-cover"
                />
              </div>
            )}

            <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-[#425466] sm:text-base">
              {active.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
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
    <ul className="mt-10 divide-y divide-zinc-200 border-t border-zinc-200">
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
              className="h-24 w-16 border border-zinc-200 object-cover"
            />
          ) : (
            <div
              className="flex h-24 w-16 items-end border border-zinc-200 bg-zinc-50 p-1.5"
              aria-hidden
            >
              <span className="line-clamp-4 text-[9px] font-medium leading-tight text-zinc-400">
                {book.title}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium tracking-tight text-[#0A2540]">
              {book.title}
            </p>
            <p className="mt-1 text-sm text-zinc-500">{book.note}</p>
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
          className="h-16 w-16 border border-zinc-200 object-cover"
        />
        <div className="min-w-0">
          <p className="font-medium tracking-tight text-[#0A2540]">
            {story.youtube.name}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
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
