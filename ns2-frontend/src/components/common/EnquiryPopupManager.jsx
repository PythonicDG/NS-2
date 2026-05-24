"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";

/**
 * EnquiryPopupManager Component
 * 
 * Automatically triggers the "Enquire Now" modal under specific user behaviors:
 * 1. Initial Visit: Opens after a 2-second delay.
 * 2. Page Navigation: Opens after a 1.5-second delay when path changes.
 * 3. Exit Intent: Opens when the mouse leaves the top boundary of the viewport (cursor moving towards tabs/closing).
 * 
 * Features:
 * - Checks localStorage to see if the user has already filled the contact form ("hasEnquired"). If true, never triggers.
 * - Prevents multiple parallel triggers.
 * - Cleans up all timers and event listeners on navigation and unmount.
 * - Excludes admin routes (/admin) to avoid disrupting administrators.
 */
export default function EnquiryPopupManager() {
  const pathname = usePathname();
  const { isEnrollModalOpen, openEnrollModal } = useModal();
  
  // Keep track of timers and trigger states across renders
  const initialVisitTimerRef = useRef(null);
  const navigationTimerRef = useRef(null);
  const hasShownOrDismissedRef = useRef(false);
  const currentPathRef = useRef(pathname);

  // Reset the shown/dismissed flag whenever the pathname changes
  useEffect(() => {
    if (currentPathRef.current !== pathname) {
      currentPathRef.current = pathname;
      hasShownOrDismissedRef.current = false;
    }
  }, [pathname]);

  // Mark as shown/dismissed as soon as the modal is opened
  useEffect(() => {
    if (isEnrollModalOpen) {
      hasShownOrDismissedRef.current = true;
    }
  }, [isEnrollModalOpen]);

  useEffect(() => {
    // Helper to check if the user has already enquired (form submitted)
    const checkHasEnquired = () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("hasEnquired") === "true";
      }
      return false;
    };

    // Helper to check if the route is an admin page
    const isAdminRoute = (path) => {
      return path && path.startsWith("/admin");
    };

    // Main function to trigger the popup
    const triggerPopup = (title = "Enquire Now") => {
      if (checkHasEnquired() || isAdminRoute(pathname) || hasShownOrDismissedRef.current || isEnrollModalOpen) {
        return;
      }
      hasShownOrDismissedRef.current = true;
      openEnrollModal(title);
    };

    // Clear any existing navigation/visit timers to avoid multiple schedules
    const clearTimers = () => {
      if (initialVisitTimerRef.current) {
        clearTimeout(initialVisitTimerRef.current);
      }
      if (navigationTimerRef.current) {
        clearTimeout(navigationTimerRef.current);
      }
    };

    // --- 1. Initial Visit Trigger ---
    // If it has not been shown/dismissed on this page, schedule popup after 2 seconds
    if (!hasShownOrDismissedRef.current) {
      initialVisitTimerRef.current = setTimeout(() => {
        triggerPopup("Enquire Now");
      }, 2000);
    }

    // --- 2. Exit Intent Trigger ---
    // Detect mouse leaving viewport at the top area (suggests switching tabs or closing)
    const handleMouseLeave = (e) => {
      // clientY < 20 indicates mouse is moving up into the browser tab/chrome area
      if (e.clientY < 20 && !hasShownOrDismissedRef.current) {
        triggerPopup("Enquire Now");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup timers and event listeners on route change or unmount
    return () => {
      clearTimers();
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pathname, isEnrollModalOpen, openEnrollModal]);

  return null;
}
