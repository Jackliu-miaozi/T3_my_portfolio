import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/app/_components/ui/sonner";

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
    <html lang="en" className={`${geist.variable} `}>
      <body
        className="bg-background text-foreground relative container mx-auto min-h-screen w-full justify-center font-sans"
        suppressHydrationWarning={true}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
