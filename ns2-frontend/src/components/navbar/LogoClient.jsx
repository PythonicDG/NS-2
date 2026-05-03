"use client";

import Link from "next/link";
import { useState } from "react";

export default function LogoClient({ logoUrl }) {
  // Track image loading errors
  const [imageError, setImageError] = useState(false);

  if (!logoUrl || imageError) {
    // Render fallback element if logo fails to load
    return (
      <Link href="/" className="flex items-center">
        <div className="h-14 w-40 bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 rounded-md">
          Company Logo
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center transition-opacity hover:opacity-90" title="Home">
      <img
        src={logoUrl}
        alt="NS-2 Infotech Logo"
        className="h-14 w-auto drop-shadow-sm"
        onError={() => {
          console.error("Failed to load logo:", logoUrl);
          setImageError(true);
        }}
      />
    </Link>
  );
}
