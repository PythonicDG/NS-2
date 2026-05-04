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
  const company = item?.text || "Company";
  const testimonial = item?.description || "";
  const photoUrl = normalizeUrl(item?.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="placed-card group"
    >
      {/* Top decorative bar */}
      <div className="placed-card__accent" />

      {/* Hexagonal decorative elements */}
      <div className="placed-card__hex placed-card__hex--1" />
      <div className="placed-card__hex placed-card__hex--2" />

      {/* Congratulations text */}
      <p className="placed-card__congrats">Congratulations</p>

      {/* Student Photo */}
      <div className="placed-card__photo-wrapper">
        <div className="placed-card__photo-ring">
          <div className="placed-card__photo">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={studentName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100px, 120px"
              />
            ) : (
              <div className="placed-card__photo-placeholder">
                <span>{studentName.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="placed-card__info">
        <h4 className="placed-card__name">{studentName}</h4>

        {company && (
          <div className="placed-card__company">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Placed at</span>
            <strong>{company}</strong>
          </div>
        )}

        {testimonial && (
          <p className="placed-card__testimonial">
            &ldquo;{testimonial}&rdquo;
          </p>
        )}
      </div>

      {/* Bottom badge */}
      <div className="placed-card__badge">
        <Award className="w-3.5 h-3.5" />
        <span>Successfully Placed</span>
      </div>
    </motion.div>
  );
}

/**
 * PlacedStudentsSlider Component
 *
 * Jitter-free, high-performance infinite carousel using Framer Motion.
 * Uses CSS transforms for sub-pixel smoothness.
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
            duration: validItems.length * 5, // Speed adjustment: 5s per card
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
          style={{ cursor: "grab" }}
          drag="x"
          dragConstraints={{ left: -containerWidth, right: 0 }}
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
