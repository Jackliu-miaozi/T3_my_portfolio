import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import { HeroSection } from "@/app/_components/hero-section";
// import { BackgroundAnimation } from "../_components/background-animation";

export default async function Home() {
  return (
    <HydrateClient>
      {/* <BackgroundAnimation /> */}
      <div className="bg-background">
        <HeroSection />
      </div>
    </HydrateClient>
  );
}
