import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé for ${profile.name}, ${profile.title}.`,
};

const resumePath = "/Joshua_Zachariah_Resume.pdf";

export default function ResumePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#252525] text-white">
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#191919] px-4 sm:px-6">
        <Link
          href="/#top"
          className="text-sm text-white/65 transition-colors hover:text-white"
        >
          ← Back
        </Link>
        <p className="truncate text-sm font-medium">{profile.name} · Résumé</p>
        <div className="flex items-center gap-4 text-sm">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/65 transition-colors hover:text-white"
          >
            Open
          </a>
          <a
            href={resumePath}
            download="Joshua_Zachariah_Resume.pdf"
            className="text-white/65 transition-colors hover:text-white"
          >
            Download
          </a>
        </div>
      </header>
      <object
        data={`${resumePath}#view=FitH`}
        type="application/pdf"
        aria-label={`${profile.name} résumé`}
        className="min-h-0 flex-1 w-full"
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <p>Your browser cannot display this PDF inline.</p>
          <a href={resumePath} className="underline">
            Open the résumé
          </a>
        </div>
      </object>
    </div>
  );
}
