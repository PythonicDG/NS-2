"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * WhyChooseUsSlider Component
 * 
 * An auto-playing slider for the 'Why Choose Us' section images.
 * 
 * @param {Object} props
 * @param {Array} props.contentItems - List of items with icons to display
 * @returns {JSX.Element}
 */
export default function WhyChooseUsSlider({ contentItems }) {
  const [currentImage, setCurrentImage] = useState(0);

  const images = useMemo(() => {
    if (!contentItems) return [];
    return contentItems
      .filter((item) => item.icon)
      .map((item) => {
        const icon = item.icon;
        if (icon.startsWith("http")) return icon;
        return `${API_BASE_URL}${icon.startsWith("/") ? "" : "/"}${icon}`;
      });
  }, [contentItems]);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const imageUrl = images[currentImage] || null;

  if (!images.length) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={imageUrl}
        alt="Icon Slide"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain transition-opacity duration-1000 ease-in-out"
      />
    </div>
  );
}
