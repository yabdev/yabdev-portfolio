"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PagePreloader from "@/components/ui/PagePreloader";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemoRoute = pathname?.startsWith("/demo");
  const [showPreloader, setShowPreloader] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setShowPreloader(true);
      setPrevPath(pathname);
      const timer = setTimeout(() => setShowPreloader(false), 900);
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath]);

  // If the user is on a demo template page, render it full screen without the main portfolio layout
  if (isDemoRoute) {
    return (
      <main className="flex-grow w-full bg-zinc-950 text-white min-h-screen">
        {showPreloader && <PagePreloader />}
        {children}
      </main>
    );
  }

  // Standard portfolio layout
  return (
    <>
      {showPreloader && <PagePreloader />}
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
