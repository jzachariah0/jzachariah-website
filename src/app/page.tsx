import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { FocusAreas } from "@/components/FocusAreas";
import { Footer } from "@/components/Footer";
import { Headshot } from "@/components/Headshot";
import { Navigation } from "@/components/Navigation";
import { Proof } from "@/components/Proof";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import {
  primaryButtonClass,
  secondaryButtonClass,
  textButtonClass,
} from "@/components/ui";
import { profile } from "@/data/profile";

export default function HomePage() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        <section className="border-b border-zinc-100 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:py-28">
            <FadeIn>
              <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-start sm:gap-12 lg:gap-14">
                <Headshot
                  size="hero"
                  priority
                  className="shrink-0 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                />

                <div className="min-w-0 max-w-xl sm:pt-2 lg:pt-3">
                  <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl lg:leading-[1.02]">
                    {firstName}
                    <br />
                    {lastName}
                  </h1>

                  <div className="mt-5 sm:mt-6">
                    <RoleSwitcher />
                  </div>

                  <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-500 sm:text-lg">
                    {profile.headline}
                  </p>

                  <div className="mt-10 flex flex-col items-start gap-4">
                    <div className="flex flex-wrap gap-3">
                      <Link href="/connect" className={primaryButtonClass}>
                        Connect
                      </Link>
                      <Link
                        href="/experience"
                        className={secondaryButtonClass}
                      >
                        Experience
                      </Link>
                    </div>
                    <Link
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={textButtonClass}
                    >
                      LinkedIn
                      <span aria-hidden>↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <Proof />
        <FocusAreas />
      </main>

      <Footer />
    </div>
  );
}
