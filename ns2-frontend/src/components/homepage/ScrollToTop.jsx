"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`p-3 rounded-full shadow-lg transition-all duration-300
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          text-white hover:opacity-90 active:scale-95`}
        style={{ backgroundColor: "#C2481F" }}
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}
