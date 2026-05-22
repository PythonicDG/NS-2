"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import EnrollModal from "@/components/common/EnrollModal";

export default function LayoutSwitcher({ children, phone }) {
  const pathname = usePathname();
  
  // Cleanly identify if we are on any administrator path
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <main className="flex-grow bg-slate-950 flex flex-col min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-[100]">
        <Navbar />
      </div>
      <main className="flex-grow">{children}</main>
      <WhatsAppButton phone={phone} />
      <Footer />
      <EnrollModal />
    </>
  );
}
