import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/server/auth";
import { ThemeScript } from "../_components/theme-script";
import { TRPCReactProvider } from "@/trpc/react";
import { HeaderMobile } from "@/components/header-mobile";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} mx-auto`} suppressHydrationWarning>
        <ThemeScript />
        <TRPCReactProvider>
          <SessionProvider session={session}>
          <HeaderMobile />
            {children}
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
