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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dylanrigney.github.io"),
  title: "Dylan Rigney | Agentic AI & Software Engineer",
  description: "Portfolio of Dylan Rigney. Building agentic AI systems, autonomous workflows, and scalable web applications.",
  keywords: ["AI Engineer", "Software Engineer", "Next.js", "React", "TypeScript", "LangGraph", "Python"],
  authors: [{ name: "Dylan Rigney" }],
  openGraph: {
    title: "Dylan Rigney | Agentic AI & Software Engineer",
    description: "Building agentic AI systems, autonomous workflows, and scalable web applications.",
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
        className={`${inter.className} bg-[#050608] text-gray-50 relative pt-28 sm:pt-36 selection:bg-cyan-500/30`}
      >
        <WebGLProvider>
          <LiquidGlassCanvas />
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
