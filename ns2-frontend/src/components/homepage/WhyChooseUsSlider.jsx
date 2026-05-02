"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * WhyChooseUsSlider Component
 *
 * Auto-playing image slider
 */

export default function WhyChooseUsSlider({ contentItems = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Prepare image URLs
  const images = useMemo(() => {
    return contentItems
      .filter((item) => item.icon)
      .map((item) => {
        const icon = item.icon;

        if (icon.startsWith("http")) return icon;

        return `${API_BASE_URL}${
          icon.startsWith("/") ? "" : "/"
        }${icon}`;
      });
  }, [contentItems]);

  // Auto Slide
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  // No images
  if (!images.length) return null;

  return (
    <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-3xl shadow-2xl bg-white">
      {/* Slider Image */}
      <Image
        src={images[currentImage]}
        alt={`Slide ${currentImage + 1}`}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-all duration-1000 ease-in-out"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentImage === index
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}