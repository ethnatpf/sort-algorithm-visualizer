import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import SmallScreenBlocked from "@/components/layout/small-screen-blocked";

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
        <div className="hidden lg:block">
          <header className="px-8 h-20 border-b border-[#FFFFFF]/15 flex justify-between">
            <div className="flex items-center h-full font-jetbrains-mono">
              <span className="text-[#F4F5F7] font-semibold text-lg">sort</span>
              <span className="text-teal-light-accent font-semibold text-lg">
                ()
              </span>
            </div>

            <a
              href="https://github.com/ethnatpf/sort-algorithm-visualizer"
              rel="noopener noreferrer"
              target="_blank"
              className="cursor-pointer flex items-center gap-x-1 text-[13px] text-secondary-text hover:text-[#e5e7eb] transition-colors"
            >
              <svg
                data-dc-tpl="13"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                data-om-id="6eb41e94:18"
              >
                <path
                  data-dc-tpl="14"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  data-om-id="6eb41e94:19"
                ></path>
              </svg>
              GitHub
            </a>
          </header>
          <div className="flex h-[calc(100vh-5rem)]">
            <SidebarProvider>{children}</SidebarProvider>
          </div>
        </div>
        <SmallScreenBlocked className="lg:hidden" />
      </body>
    </html>
  );
}
