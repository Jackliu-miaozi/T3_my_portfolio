import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { HeroSection } from "@/app/_components/hero-section";


export default async function Home() {
  return (
    <HydrateClient>
      <div className="bg-background/90 text-foreground relative min-h-screen overflow-hidden">
       
        <Header />
        <main className="flex-1">
          <HeroSection />
        </main>

        <Footer />
      </div>
    </HydrateClient>
  );
}
