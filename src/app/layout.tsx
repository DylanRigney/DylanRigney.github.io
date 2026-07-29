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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dylan Rigney | Project Portfolio",
  description: "Dylan is a full-stack developer with a passion for learning",
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
            <ActiveSectionContextProvider>
              <Header />
              <div className="relative z-10 w-full">
                {children}
              </div>
              <Footer />
              <Toaster position="top-right" />
            </ActiveSectionContextProvider>
          </ThemeContextProvider>
        </WebGLProvider>
      </body>
    </html>
  );
}
