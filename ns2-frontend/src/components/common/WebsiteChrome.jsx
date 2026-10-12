"use client";

import { usePathname } from "next/navigation";
import { ModalProvider } from "@/context/ModalContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import EnrollModal from "@/components/common/EnrollModal";
import EnquiryPopupManager from "@/components/common/EnquiryPopupManager";

export default function WebsiteChrome({ children, navbar, footer, phone }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return children;
  return <ModalProvider>
    <GoogleAnalytics />
    <div className="sticky top-0 z-[100]">{navbar}</div>
    <main className="flex-grow">{children}</main>
    <WhatsAppButton phone={phone} />
    {footer}
    <EnrollModal />
    <EnquiryPopupManager />
  </ModalProvider>;
}
