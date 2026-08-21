import Link from "next/link";
import { linkClass } from "@/components/ui";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <div className="flex gap-5">
          <Link
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </Link>
          <Link
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </Link>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
