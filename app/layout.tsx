import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./layouts/Navbar/Navbar";

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
    <html lang="en">
      <body className={`${fontBarlow.variable} bg-white antialiased`}>
        <div>
          <div className="fixed top-0 right-0 left-0 z-50">
            <Navbar />
          </div>
          <div className="bg-[#0F0F0F] text-[#EAEAEA] h-auto pb-10 w-full pt-20">{children}</div>
        </div>
      </body>
    </html>
  );
}
