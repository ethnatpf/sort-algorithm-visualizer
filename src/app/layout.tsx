import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sorting algorithm visualizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${InterFont.variable}  h-full antialiased`}>
      <body className="min-h-full bg-[#14161C]">
        <header className="h-20 border-b border-[#FFFFFF]/15"></header>
        {children}
      </body>
    </html>
  );
}
