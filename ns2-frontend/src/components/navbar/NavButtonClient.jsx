"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * NavButtonClient Component
 * 
 * A client-side wrapper for CTA buttons in the navbar that handles
 * smooth scrolling to top when already on the destination page.
 */
export default function NavButtonClient({
  href,
  children,
  className = "",
  onClick,
}) {
  const pathname = usePathname();
  
  const normalizedHref = 
    href && !href.startsWith("http") && !href.startsWith("/") && !href.startsWith("#")
      ? `/${href}`
      : href;

  const isActive = pathname === normalizedHref;

  const handleClick = (e) => {
    if (isActive) {
      if (normalizedHref && normalizedHref.startsWith("/") && !normalizedHref.includes("#")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    if (onClick) onClick(e);
  };

  return (
    <Link
      href={normalizedHref || "#"}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
