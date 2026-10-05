import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import {
  BrandMark,
  sectionContainerClass,
  sectionPaddingClass,
  textButtonClass,
} from "@/components/ui";
import { profile } from "@/data/profile";

export function FeaturedIn() {
  const { featured } = profile;

  return (
    <section id="featured" className="scroll-mt-24 border-t border-border">
      <div className={`${sectionContainerClass} ${sectionPaddingClass}`}>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <FadeIn>
            <div className="flex items-center gap-3">
              <BrandMark src={featured.logo} size={40} active />
              <div>
                <p className="text-[15px] font-medium text-foreground">
                  {featured.source}
                </p>
                <p className="text-[13px] text-muted">{featured.credit}</p>
              </div>
            </div>
            <h2 className="mt-6 font-display text-[2.5rem] leading-[0.9] font-normal tracking-[-0.035em] text-foreground sm:text-[3.25rem]">
              {featured.heading}
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-7 text-muted">
              {featured.body}
            </p>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${textButtonClass} mt-6`}
            >
              View the post on LinkedIn
              <span aria-hidden>→</span>
            </a>
          </FadeIn>

          <FadeIn delay={0.08} className="mx-auto w-full max-w-[22.5rem] lg:ml-auto lg:mr-0">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface shadow-[0_24px_70px_-40px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-[4/5] w-full bg-[#16351f]">
                <Image
                  src={featured.poster}
                  alt="Joshua Zachariah featured in PayPal’s LinkedIn intern wrap-up"
                  fill
                  sizes="22rem"
                  className="object-cover object-[center_78%]"
                />
                <iframe
                  src={featured.embedSrc}
                  title="PayPal LinkedIn post featuring Joshua Zachariah"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
