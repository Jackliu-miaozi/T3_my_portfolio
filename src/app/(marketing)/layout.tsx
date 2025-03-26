import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
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

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-serif-sc",
});


export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${notoSansSC.variable} ${notoSerifSC.variable}`}
    >
      
      <body
        className="bg-background text-foreground relative container mx-auto min-h-screen w-full justify-center p-1 font-sans"
        suppressHydrationWarning={true}
      >
          <Header />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Footer />
      </body>
    </html>
  );
}
