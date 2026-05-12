"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";
import { useModal } from "@/context/ModalContext";
import { useEffect } from "react";

export default function EnrollModal() {
  const { isEnrollModalOpen, closeEnrollModal } = useModal();

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeEnrollModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeEnrollModal]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isEnrollModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEnrollModalOpen]);

  return (
    <AnimatePresence>
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnrollModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-32 sm:h-40 bg-gradient-to-br from-[#C2481F] to-[#8E3416] p-6 sm:p-8 flex flex-col justify-end">
              <button
                onClick={closeEnrollModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Enroll Now</h2>
              <p className="text-orange-100 text-sm sm:text-base">Take the first step towards your career goals.</p>
            </div>

            {/* Form Container */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(100vh-16rem)]">
              <ContactForm 
                initialSubject="enrollment" 
                onSuccess={closeEnrollModal} 
              />
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our terms and will be contacted by our admissions team.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
