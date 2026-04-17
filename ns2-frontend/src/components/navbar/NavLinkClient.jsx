"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
