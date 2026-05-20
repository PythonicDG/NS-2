"use client";

import Link from "next/link";
import { useState } from "react";

export default function LogoClient({ logoUrl }) {
  // Track image loading errors
  const [imageError, setImageError] = useState(false);

  const handleLogoClick = (e) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!logoUrl || imageError) {
    // Render fallback element if logo fails to load
    return (
      <Link 
        href="/" 
        className="flex items-center animate-logo-zoom" 
        onClick={handleLogoClick}
      >
        <div className="h-12 sm:h-14 md:h-16 w-32 sm:w-40 md:w-44 bg-gray-300 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600 rounded-md transition-all duration-300">
          Company Logo
        </div>
      </Link>
    );
  }

  return (
    <Link 
      href="/" 
      className="flex items-center transition-opacity hover:opacity-90 animate-logo-zoom" 
      title="Home"
      onClick={handleLogoClick}
    >
      <img
        src={logoUrl}
        alt="Modern Institute of Automation (MIA) Logo"
        className="h-12 sm:h-14 md:h-16 w-auto object-contain max-w-full drop-shadow-sm transition-all duration-300"
        onError={() => {
          console.error("Failed to load logo:", logoUrl);
          setImageError(true);
        }}
      />
    </Link>
  );
}
