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
          <div>
            <Navbar />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
