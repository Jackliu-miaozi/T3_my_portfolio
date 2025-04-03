import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/app/_components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/server/auth";

export const metadata: Metadata = {
  title: "Jack's 主页",
  description: "Jack's 主页",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={`${geist.variable} `}>
      <body className="mx-auto" suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>
        <Toaster richColors theme="system" />
      </body>
    </html>
  );
}
