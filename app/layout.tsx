import type { Metadata } from "next";
import ClientWrapper from "@/components/ui/client-wrapper";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const ahsing = localFont({
  src: "../public/fonts/typogama-ahsing.otf",
  variable: "--font-ahsing",
  display: "swap",
});

const seasons = localFont({
  src: "../public/fonts/SeasonMix-TRIAL-Regular.otf",
  variable: "--font-seasons",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison des Muses | Beauté et bien-être",
  description:
    "Ongles, Head Spa et instants de bien-être à Saint-Martin-sur-Nohain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={` ${ahsing.variable} ${seasons.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[url('/images/background-mds.webp')] bg-cover bg-center bg-fixed bg-no-repeat">
        <div className="fixed inset-x-0 top-0 z-[100] p-4">
          <Navbar />
        </div>
        <div aria-hidden="true" className="h-[76px] shrink-0 xl:h-[104px]" />
        <ClientWrapper>{children}</ClientWrapper>
        <Analytics />
      </body>
    </html>
  );
}
