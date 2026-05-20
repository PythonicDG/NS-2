"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useModal } from "@/context/ModalContext";

/**
 * NavLinkClient Component
 * 
 * A client-side wrapper for Next.js Link that handles active state styling.
 * 
 * @param {Object} props
 * @param {string} props.href - The link destination
 * @param {React.ReactNode} props.children - Link content
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @returns {JSX.Element}
 */
export default function NavLinkClient({
  href,
  children,
  className = "",
  onClick,
}) {
  const pathname = usePathname();
  const { openEnrollModal } = useModal();
  
  // Ensure the link is absolute for internal routes to prevent broken relative navigation
  const normalizedHref = 
    href && !href.startsWith("http") && !href.startsWith("/") && !href.startsWith("#")
      ? `/${href}`
      : href;

  const isActive = pathname === normalizedHref;

  const baseClasses = isActive
    ? "text-[#C2481F] font-semibold"
    : "text-[#6C757D] hover:text-[#C2481F]";

  const handleClick = (e) => {
    const hrefStr = (normalizedHref || "").toLowerCase();
    const isModalTrigger = 
      hrefStr.endsWith("#contact") || 
      hrefStr.endsWith("#enquire") || 
      hrefStr.endsWith("#enquiry");

    if (isModalTrigger) {
      e.preventDefault();
      // Pass the text content of children as a title if it's a string, otherwise fallback
      const title = typeof children === "string" ? children : "Enquiry Form";
      openEnrollModal(title);
    } else if (isActive) {
      // If the link is for the current page, scroll to top smoothly
      // For standard internal links that match the current path
      if (normalizedHref && normalizedHref.startsWith("/") && !normalizedHref.includes("#")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    
    // Execute original onClick if provided (e.g., closing mobile menu)
    if (onClick) onClick(e);
  };

  return (
    <Link
      href={normalizedHref || "#"}
      onClick={handleClick}
      className={`${baseClasses} ${className} transition-colors duration-200`}
    >
      {children}
    </Link>
  );
}
