import Image from "next/image";

interface HeadshotProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  priority?: boolean;
  className?: string;
}

const sizes = {
  sm: { dim: 80, className: "h-20 w-20" },
  md: { dim: 112, className: "h-28 w-28" },
  lg: { dim: 160, className: "h-40 w-40" },
  xl: { dim: 220, className: "h-[200px] w-[200px] sm:h-[220px] sm:w-[220px]" },
  hero: {
    dim: 320,
    className:
      "h-[260px] w-[260px] sm:h-[300px] sm:w-[300px] lg:h-[320px] lg:w-[320px]",
  },
};

export function Headshot({
  size = "md",
  priority = false,
  className = "",
}: HeadshotProps) {
  const { dim, className: sizeClass } = sizes[size];

  return (
    <Image
      src="/jz-headshot.jpg"
      alt="Joshua Zachariah"
      width={dim}
      height={dim}
      priority={priority}
      className={`${sizeClass} rounded-2xl border border-border object-cover object-top ${className}`}
    />
  );
}
