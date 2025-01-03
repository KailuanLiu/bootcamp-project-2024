import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google"; // Import Inter from Google Fonts
import "./globals.css";

import Navbar from "../components/Navbar";

const geistSans = localFont({
  src: "./fonts/cour.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
	        <Navbar/>
        {children}
        </body>
    </html>
  );
}
