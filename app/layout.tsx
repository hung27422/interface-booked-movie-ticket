import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./layouts/Navbar/Navbar";
import { Providers } from "./providers/Providers";
const fontBarlow = localFont({
  src: "./assets/fonts/Barlow-Medium.ttf",
  variable: "--font-barlow",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Book Movie Tickets",
  description: "Book Movie Tickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body className={`${fontBarlow.variable} antialiased h-full bg-[#0F0F0F]`}>
        <Providers>
          <div>
            <div className="fixed top-0 right-0 left-0 overflow-hidden z-50">
              <Navbar />
            </div>
            <div className=" text-[#EAEAEA] h-full pb-10 pt-20 w-[100%] px-5 md:px-20">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
