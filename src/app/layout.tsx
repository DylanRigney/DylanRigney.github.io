import Header from "@/components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ActiveSectionContextProvider from "../context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import { Toaster } from "react-hot-toast";
import ThemeContextProvider from "../context/theme-context";
import { WebGLProvider } from "@/context/WebGLContext";
import { LiquidGlassCanvas } from "@/components/ui/LiquidGlassCanvas";
import { ChatLayoutProvider } from "@/context/ChatLayoutContext";

import KanagawaBg from "./components/backgrounds/KanagawaBg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dylanrigney.vercel.app"),
  title: "Dylan Rigney | Software Developer & Builder",
  description: "Portfolio of Dylan Rigney. Building full-stack software, robust backend services, and modern web applications with Python and TypeScript.",
  keywords: ["Software Developer", "Python", "FastAPI", "Next.js", "React", "TypeScript", "SQLAlchemy", "LangGraph"],
  authors: [{ name: "Dylan Rigney" }],
  openGraph: {
    title: "Dylan Rigney | Software Developer & Builder",
    description: "Building full-stack software, robust backend services, and modern web applications with Python and TypeScript.",
    siteName: "Dylan Rigney Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} text-gray-900 relative pt-28 sm:pt-36 selection:bg-cyan-500/30 min-h-screen`}
      >
        <KanagawaBg />
        <WebGLProvider>
          <ThemeContextProvider>
            <ChatLayoutProvider>
              <ActiveSectionContextProvider>
                <Header />
                <div className="relative z-10 w-full">
                  {children}
                </div>
                <Footer />
                <Toaster position="top-right" />
              </ActiveSectionContextProvider>
            </ChatLayoutProvider>
          </ThemeContextProvider>
        </WebGLProvider>
      </body>
    </html>
  );
}
