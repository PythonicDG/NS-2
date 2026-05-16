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
    // Disable the browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollReset = () => {
      // If there's a hash in the URL, don't scroll to top, 
      // let the browser handle the anchor link.
      if (window.location.hash) {
        // Find the element with the hash ID
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      // Force scroll to absolute top if no hash is present
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
      
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate reset
    scrollReset();

    // Secondary reset to catch late renders or anchor elements
    const timer = setTimeout(scrollReset, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
