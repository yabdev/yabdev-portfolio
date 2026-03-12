import QueryProvider from "@/components/providers/QueryProvider";
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

// Elegant, non-gimmicky fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "YabbyDev | Enterprise Solutions Architect",
  description: "Senior Enterprise System Builder specializing in Java Spring Boot architectures and high-performance modern frontends. Clean code, strict security, total observability.",
  keywords: ["enterprise architect", "spring boot", "java", "portfolio", "yabbydev"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased bg-background min-h-screen flex flex-col`}>
        <QueryProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}