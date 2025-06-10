import "@/styles/globals.css";


import { Toaster } from "@/app/_components/ui/sonner";



export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html >
      <meta property="og:image" content="<generated>" />
      <meta property="og:image:type" content="<generated>" />
      <meta property="og:image:width" content="<generated>" />
      <meta property="og:image:height" content="<generated>" />
      {children}

      <Toaster richColors theme="system" />

    </html>
  );
}
