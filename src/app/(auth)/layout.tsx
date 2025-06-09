import "@/styles/globals.css";


import { Toaster } from "@/app/_components/ui/sonner";



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
