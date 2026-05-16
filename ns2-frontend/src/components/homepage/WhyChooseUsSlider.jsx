"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { normalizeImageUrl } from "@/lib/api";

/**
 * WhyChooseUsSlider Component
 *
 * An auto-playing image slider that displays icons from content items.
 * Utilizes Next.js Image component for optimization.
 */
export default function WhyChooseUsSlider({ contentItems = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Prepare image URLs using the centralized normalization utility
  const images = useMemo(() => {
    return contentItems
      .filter((item) => item.icon)
      .map((item) => normalizeImageUrl(item.icon));
  }, [contentItems]);

  // Auto Slide
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images]);

  // No images
  if (!images.length) return null;

  return (
    <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-3xl shadow-2xl bg-white">
      {/* Slider Images with Crossfade */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === currentImage}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${currentImage === index
                ? "bg-white scale-125"
                : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}