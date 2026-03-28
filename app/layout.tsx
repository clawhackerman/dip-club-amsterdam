import type { Metadata } from "next";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  weight: "800",
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  style: ["normal", "italic"],
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dip Club Amsterdam — Seek Discomfort. Find Yourself.",
  description:
    "Amsterdam's urban wellness community. Ice baths, breathwork, and outdoor adventures. Join 200+ brave souls who chose discomfort over comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
