import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="mx-auto min-h-[calc(100vh-8rem)] max-w-5xl">
        {children}
      </div>
      <Footer />
    </div>
  );
}
