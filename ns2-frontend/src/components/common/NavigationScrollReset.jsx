"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * NavigationScrollReset Component
 * 
 * Ensures that whenever the route changes, the window is scrolled
 * to the absolute top (0, 0) immediately. This prevents the issue
 * where new pages appear partially scrolled down.
 */
export default function NavigationScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable the browser's automatic scroll restoration to prevent it
    // from fighting with our manual reset.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollReset = () => {
      // Force scroll to absolute top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" // Use instant for the primary reset to avoid visible jumping
      });
      
      // Also ensure the body and html elements are at the top
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate reset
    scrollReset();

    // Secondary reset after a tiny delay to catch any late layout shifts 
    // or hydration-related scroll changes.
    const timer = setTimeout(scrollReset, 50);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
