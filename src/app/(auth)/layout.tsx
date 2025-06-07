import "@/styles/globals.css";

import { type Metadata } from "next";

import { Toaster } from "@/app/_components/ui/sonner";


export const metadata: Metadata = {
  title: "Jack's 主页",
  description: "Jack's 主页",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};



export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html >

      {children}

      <Toaster richColors theme="system" />

    </html>
  );
}
