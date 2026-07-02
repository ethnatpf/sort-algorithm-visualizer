import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    <html
      lang="en"
      className={`${InterFont.variable} ${JetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#14161C]">
        <header className="px-8 h-20 border-b border-[#FFFFFF]/15">
          <div className="flex items-center h-full font-jetbrains-mono">
            <span className="text-[#F4F5F7] font-semibold text-lg">sort</span>
            <span className="text-teal-light-accent font-semibold text-lg">
              ()
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
