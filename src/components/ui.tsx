import Image from "next/image";
import { type ReactNode } from "react";

export const pageMainClass = "px-6 py-16 sm:py-24";

export const sectionClass =
  "mt-20 border-t border-zinc-200 pt-14 sm:mt-24 sm:pt-16";

export const pageTitleClass =
  "text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl";

export const linkClass =
  "text-zinc-500 transition-colors hover:text-accent";

/** Stripe/Vercel primary — solid, equal height to secondary */
export const primaryButtonClass =
  "inline-flex h-12 min-w-[10.5rem] items-center justify-center bg-accent px-6 text-[15px] font-medium tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-accent-hover active:bg-accent-hover/90";

/** Matching outline twin — same size as primary */
export const secondaryButtonClass =
  "inline-flex h-12 min-w-[10.5rem] items-center justify-center border border-zinc-300 bg-white px-6 text-[15px] font-medium tracking-[-0.01em] text-zinc-900 transition-colors duration-200 hover:border-zinc-400 hover:bg-zinc-50";

/** Quiet text action — never mixed into the button row */
export const textButtonClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-accent";


export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
      {children}
    </h2>
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
  const box =
    size <= 32 ? "h-8 w-8 p-1" : size <= 36 ? "h-9 w-9 p-1.5" : "h-10 w-10 p-1.5";

  if (!src) {
    return (
      <div
        className={`shrink-0 border border-zinc-200 bg-zinc-50 ${box}`}
        aria-hidden
      />
    );
  }

  const frame = `flex shrink-0 items-center justify-center border bg-white ${box} ${
    active ? "border-accent" : "border-zinc-200"
  }`;

  if (src.endsWith(".svg")) {
    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <div className={frame}>
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
