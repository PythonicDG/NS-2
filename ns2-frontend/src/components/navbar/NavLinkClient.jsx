"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const isActive = pathname === href;

  const baseClasses = isActive
    ? "text-[#C2481F] font-semibold"
    : "text-[#6C757D] hover:text-[#C2481F]";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${className} transition-colors duration-200`}
    >
      {children}
    </Link>
  );
}
