import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
// import { HydrateClient } from "@/trpc/server";
// import { BackgroundAnimation } from "../_components/background-animation";
import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export const metadata: Metadata = {
  title: "Jack's 主页",
  description: "Jack's 主页",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body
        className="bg-background text-foreground relative container mx-auto min-h-screen justify-center p-1 font-sans"
        suppressHydrationWarning={true}
      >
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}
