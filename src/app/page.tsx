import { AboutView } from "@/components/AboutView";
import { ContactView } from "@/components/ContactView";
import { ExperienceView } from "@/components/ExperienceView";
import { FocusAreas } from "@/components/FocusAreas";
import { Footer } from "@/components/Footer";
import { HighlightStage } from "@/components/HighlightScreen";
import { HomeChrome } from "@/components/HomeChrome";
import { Proof } from "@/components/Proof";
import { sceneSheetClass } from "@/components/ui";

export default function HomePage() {
  return (
    <HomeChrome>
      <main className={`z-10 ${sceneSheetClass}`}>
        <HighlightStage />
        <Proof />
        <FocusAreas />
        <ExperienceView />
        <AboutView />
        <ContactView />
        <Footer />
      </main>
    </HomeChrome>
  );
}
