"use client";

import { useModal } from "@/context/ModalContext";

/**
 * EnrollButton Component
 * 
 * A client component button that triggers the global enrollment modal.
 * Designed to look like a premium CTA button.
 * 
 * @param {Object} props
 * @param {string} props.text - Button text
 * @param {string} props.className - Custom styling classes
 * @returns {JSX.Element}
 */
export default function EnrollButton({ text, className }) {
  const { openEnrollModal } = useModal();

  return (
    <button
      onClick={openEnrollModal}
      className={className || "bg-gradient-to-r from-[#C2481F] to-[#d85c34] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"}
    >
      {text}
    </button>
  );
}
