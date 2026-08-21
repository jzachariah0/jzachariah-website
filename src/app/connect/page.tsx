import type { Metadata } from "next";
import { ContactView } from "@/components/ContactView";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Connect",
};

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <ContactView />
      <Footer />
    </div>
  );
}
