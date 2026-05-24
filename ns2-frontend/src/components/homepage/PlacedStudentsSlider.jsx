"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Award, ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Normalizes an image URL to ensure it has the correct API base path.
 */
function normalizeUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Individual placement card component.
 * Renders a premium card with student photo, name, company, and testimonial.
 */
function PlacementCard({ item, index }) {
  const studentName = item?.title || "Student";
  const photoUrl = normalizeUrl(item?.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white"
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={studentName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 300px, 340px"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C2481F] to-orange-500 text-white font-bold text-3xl">
          <span>{studentName.charAt(0)}</span>
        </div>
      )}
    </motion.div>
  );
}

/**
 * PlacedStudentsSlider Component
 *
 * Infinite carousel using Framer Motion.
 */
export default function PlacedStudentsSlider({ items = [] }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  // Filter out items that have no title (student name)
  const validItems = items.filter((item) => item?.title);

  // For a seamless loop, we need at least enough items to fill the viewport twice
  // We'll duplicate them to ensure continuity
  const duplicatedItems = [...validItems, ...validItems, ...validItems];

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 3);
    }
  }, [validItems]);

  if (validItems.length === 0) return null;

  return (
    <div className="placed-slider">
      {/* Scrollable Cards Container */}
      <div className="placed-slider__viewport">
        <motion.div
          ref={containerRef}
          className="placed-slider__track"
          animate={{
            x: [0, -containerWidth],
          }}
          transition={{
            duration: validItems.length * 6, // Speed adjustment: 6s per card
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <div key={`placed-${idx}`} className="placed-slider__slide">
              <PlacementCard item={item} index={idx % validItems.length} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Masks for fade effect */}
      <div className="placed-slider__mask placed-slider__mask--left" />
      <div className="placed-slider__mask placed-slider__mask--right" />
    </div>
  );
}
