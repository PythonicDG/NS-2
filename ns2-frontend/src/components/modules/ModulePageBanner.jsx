"use client";

import { useState, useEffect } from "react";
import { normalizeImageUrl } from "@/lib/api";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./ModulePageBanner.module.css";

export default function ModulePageBanner({ data, moduleTitle, moduleSlug, courseHighlights = [], brochure, syllabus }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isAutomation = /plc.*scada/i.test(`${moduleSlug || ""} ${moduleTitle || ""}`);
  const bgImage = normalizeImageUrl(data?.background_image);
  const downloadUrl = normalizeImageUrl(brochure || syllabus);

  const heroImages = (data?.content_items || [])
    .filter((item) => item.icon)
    .map((item) => normalizeImageUrl(item.icon));

  const finalImages = isAutomation && bgImage
    ? [bgImage]
    : heroImages.length > 0 ? heroImages : (bgImage ? [bgImage] : []);

  useEffect(() => {
    if (finalImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % finalImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [finalImages.length]);

  if (!data) return null;

  const metadata = [...new Set(courseHighlights
    .filter((item) => item.is_active !== false)
    .map((item) => item.title?.trim())
    .filter((title) => title && title.length <= 32))].slice(0, 3);
  const fallbackHighlights = ["Practical training", "Multi-brand learning", "Hands-on labs"];
  for (const highlight of fallbackHighlights) {
    if (metadata.length >= 3) break;
    if (!metadata.includes(highlight)) metadata.push(highlight);
  }

  function exploreProgram(event) {
    const nextSection = event.currentTarget.closest(".module-animate")?.nextElementSibling;
    if (!nextSection) return;
    nextSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }

  return (
    <section
      id="module-page-banner"
      className={`relative w-full min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden ${isAutomation ? styles.hero : ""}`}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {finalImages.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {isAutomation ? (
                <div
                  className={styles.background}
                  style={{ backgroundImage: `url(${JSON.stringify(finalImages[currentImageIndex % finalImages.length])})` }}
                />
              ) : <Image
                src={finalImages[currentImageIndex]}
                alt={data.heading || moduleTitle || "Module Hero"}
                fill
                priority
                className="object-cover"
              />}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B3A6E] to-[#0E4C92]" />
        )}
        <div className={isAutomation ? styles.overlay : "absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"} />
      </div>

      {/* Decorative elements */}
      {isAutomation ? (
        <>
          <div className={styles.program} aria-hidden="true">PROGRAM <span>/</span> 01</div>
          <div className={styles.technical} aria-hidden="true">
            <svg viewBox="0 0 480 360" fill="none">
              <path d="M80 300V240L160 160H300L360 100V40M180 340V280L240 220H380L440 160M280 60V100L220 160M300 160V220" />
              <circle cx="80" cy="300" r="5" /><circle cx="360" cy="40" r="5" />
              <circle cx="180" cy="340" r="5" /><circle cx="440" cy="160" r="5" />
              <rect x="270" y="48" width="20" height="12" />
            </svg>
          </div>
        </>
      ) : <>
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#C2481F]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
      </>}

      {/* Content */}
      <div className={isAutomation ? `relative z-10 container mx-auto px-6 lg:px-16 ${styles.content}` : "relative z-10 container mx-auto px-6 lg:px-16 py-12 md:py-16 -translate-y-8 md:-translate-y-20"}>
        {/* Breadcrumb */}
        <nav className={`flex items-center gap-2 text-sm text-white/70 mb-6 ${isAutomation ? styles.breadcrumb : ""}`}>
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/modules" className="hover:text-white transition-colors">
            Programs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">
            {data.heading || moduleTitle || "Module"}
          </span>
        </nav>

        {isAutomation && (
          <div className={styles.category}>{data.super_heading || "Industrial automation"}</div>
        )}

        {/* Title */}
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-3xl ${isAutomation ? styles.title : ""}`}>
          {data.heading || moduleTitle}
          {data.highlighted_heading && (
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#C2481F] mt-1">
              {data.highlighted_heading}
            </span>
          )}
        </h1>

        {data.subheading && (
          <p className={`mt-4 text-lg text-white/80 max-w-2xl leading-relaxed ${isAutomation ? styles.description : ""}`}>
            {data.subheading}
          </p>
        )}

        {isAutomation && (
          <ul className={styles.metadata} aria-label="Course highlights">
            {metadata.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        )}

        {/* CTA Buttons */}
        {(data.primary_button_text || data.secondary_button_text) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {data.primary_button_text && (
              <a
                href={data.primary_button_url || "#"}
                className="px-8 py-3.5 bg-[#C2481F] text-white font-semibold rounded-lg shadow-lg hover:bg-[#A63D1A] hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                {data.primary_button_text}
              </a>
            )}
            {data.secondary_button_text && (
              <a
                href={downloadUrl || "#"}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {data.secondary_button_text}
              </a>
            )}
          </div>
        )}
      </div>
      {isAutomation && (
        <div className={styles.footer}>
          <div className={styles.technologies} aria-label="Technologies covered">PLC <span>•</span> HMI <span>•</span> SCADA <span>•</span> VFD <span>•</span> DRIVES</div>
          <button type="button" className={styles.explore} onClick={exploreProgram}>Explore Program <span aria-hidden="true">↓</span></button>
        </div>
      )}
    </section>
  );
}
