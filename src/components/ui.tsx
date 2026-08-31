import Image from "next/image";
import { type ReactNode } from "react";

export const pageMainClass = "px-6 py-16 sm:py-24";

export const subsectionClass =
  "mt-14 border-t border-border/60 pt-10 sm:mt-16 sm:pt-12";

export const sectionContainerClass = "mx-auto w-full max-w-5xl px-6";

export const sectionPaddingClass = "py-20 sm:py-24";

export const fieldLabelClass =
  "text-[11px] font-medium tracking-[0.12em] text-muted uppercase";

export const pageTitleClass =
  "text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl sm:leading-[1.1]";

export const linkClass =
  "text-muted transition-colors hover:text-foreground";

export const primaryButtonClass =
  "inline-flex h-12 min-w-[10.5rem] items-center justify-center rounded-full bg-foreground px-6 text-[15px] font-medium tracking-[-0.01em] text-background transition-colors duration-200 hover:bg-accent-hover";

export const heroButtonClass =
  "inline-flex h-10 items-center justify-center rounded-[6px] bg-[#f7f8f8] px-5 text-[14px] font-medium tracking-[-0.01em] text-black shadow-[0_1px_2px_rgba(0,0,0,0.28)] transition-[background-color,transform] duration-150 ease-out hover:bg-white hover:-translate-y-px active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5e6ad2] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export const heroTextLinkClass =
  "inline-flex items-center gap-2 text-[17px] font-medium tracking-[-0.02em] text-[#f7f8f8]/70 transition-colors hover:text-[#f7f8f8]";

export const sceneSheetClass =
  "relative bg-background rounded-t-[2rem] shadow-[0_-32px_80px_-20px_rgba(8,9,10,0.55)] sm:rounded-t-[2.5rem]";

export const secondaryButtonClass =
  "inline-flex h-12 min-w-[10.5rem] items-center justify-center rounded-full bg-surface px-6 text-[15px] font-medium tracking-[-0.01em] text-foreground transition-colors duration-200 hover:bg-surface-hover";

export const textButtonClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground";

export function SectionLabel({
  children,
  as: Tag = "p",
}: {
  children: ReactNode;
  as?: "h2" | "p";
}) {
  return (
    <Tag className="text-[13px] font-medium tracking-[0.16em] text-muted uppercase">
      {children}
    </Tag>
  );
}

export function BrandMark({
  src,
  size = 40,
  active = false,
}: {
  src?: string;
  size?: number;
  active?: boolean;
}) {
  const sizeClass =
    size <= 32 ? "h-8 w-8" : size <= 36 ? "h-9 w-9" : "h-10 w-10";
  const pad = size <= 32 ? "p-1" : "p-1.5";

  if (!src) {
    return (
      <div
        className={`shrink-0 rounded-md border border-border bg-surface ${sizeClass} ${pad}`}
        aria-hidden
      />
    );
  }

  const frame = `flex h-full w-full items-center justify-center rounded-md border bg-background ${pad} ${
    active ? "border-foreground/25" : "border-border"
  }`;

  const mark = src.endsWith(".svg") ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className="h-full w-full object-contain" />
  ) : (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className="h-full w-full object-contain"
    />
  );

  return (
    <div className={`shrink-0 ${sizeClass}`} aria-hidden>
      <div className={frame}>{mark}</div>
    </div>
  );
}
