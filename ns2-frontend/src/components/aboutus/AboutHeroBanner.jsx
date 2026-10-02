"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  Cpu,
  Settings2,
  Wrench,
} from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./AboutHeroBanner.module.css";

const highlights = [
  { label: "Hands-On Training", detail: "Learn by doing", Icon: Wrench },
  { label: "Industry-Focused", detail: "Built for the real world", Icon: Cpu },
  {
    label: "Practical Learning",
    detail: "From concepts to application",
    Icon: Settings2,
  },
];

/** Page copy and background image sources remain managed by Django. */
export default function AboutHeroBanner({ data }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const bgImage =
    normalizeImageUrl(data?.background_image) ||
    normalizeImageUrl(data?.primary_image);
  const heroImages = (data?.content_items || [])
    .filter((item) => item.image)
    .map((item) => normalizeImageUrl(item.image));
  const finalImages =
    heroImages.length > 0 ? heroImages : bgImage ? [bgImage] : [];

  useEffect(() => {
    if (finalImages.length <= 1 || reduceMotion) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % finalImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [finalImages.length, reduceMotion]);

  if (!data) return null;

  return (
    <section className={styles.hero} aria-labelledby="about-hero-title">
      {finalImages.length > 0 && (
        <div className={styles.background} aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div
              key={finalImages[currentImageIndex % finalImages.length]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 1.5 }}
              className={styles.imageLayer}
            >
              <Image
                src={finalImages[currentImageIndex % finalImages.length]}
                alt=""
                fill
                priority
                sizes="100vw"
                quality={75}
                className={styles.image}
              />
            </motion.div>
          </AnimatePresence>
          <div className={styles.overlay} />
        </div>
      )}
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <ChevronRight size={13} aria-hidden="true" />
              <span aria-current="page">About Us</span>
            </li>
          </ol>
        </nav>
        <div className={styles.layout}>
          <div className={styles.content}>
            {data.super_heading && (
              <p className={styles.eyebrow}>{data.super_heading}</p>
            )}
            <h1 id="about-hero-title" className={styles.heading}>
              {data.heading || "About Us"}
            </h1>
            {data.subheading && (
              <p className={styles.description}>{data.subheading}</p>
            )}
            {data.primary_button_text && (
              <div className={styles.actions}>
                <Link
                  href={data.primary_button_url || "#contact"}
                  className={styles.cta}
                >
                  <span>{data.primary_button_text}</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
          <div className={styles.visual}>
            <div className={styles.schematic} aria-hidden="true">
              <div className={styles.grid} />
              <div className={styles.frame} />
              <div className={styles.diamond} />
              <svg
                className={styles.circuits}
                viewBox="0 0 460 420"
                fill="none"
              >
                <g stroke="currentColor" strokeWidth="1">
                  <path d="M18 92H112L160 140H258V205H420M42 310H128V254L185 197H260M240 28V80H336L388 132V326H442M182 390V336H284L330 290V230" />
                  <path
                    d="M18 102H108L150 144M250 28V70H340L398 128V240"
                    opacity=".4"
                  />
                  <circle cx="18" cy="92" r="4" />
                  <circle cx="420" cy="205" r="4" />
                  <circle cx="42" cy="310" r="4" />
                  <circle cx="240" cy="28" r="4" />
                  <circle cx="182" cy="390" r="4" />
                  <circle cx="442" cy="326" r="4" />
                  <rect x="220" y="170" width="66" height="66" rx="3" />
                  <rect x="234" y="184" width="38" height="38" rx="1" />
                  <path d="M232 158V170M244 158V170M256 158V170M268 158V170M232 236V248M244 236V248M256 236V248M268 236V248M208 182H220M208 194H220M208 206H220M208 218H220M286 182H298M286 194H298M286 206H298M286 218H298" />
                </g>
              </svg>
              <span className={styles.coordinate}>
                01 / AUTOMATION &amp; LEARNING
              </span>
            </div>
            <ul
              className={styles.highlights}
              aria-label="Our approach to training"
            >
              {highlights.map(({ label, detail, Icon }, index) => (
                <li className={styles.highlight} key={label}>
                  <span className={styles.icon}>
                    <Icon size={21} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <div>
                    <p className={styles.highlightTitle}>{label}</p>
                    <p className={styles.highlightDetail}>{detail}</p>
                  </div>
                  <span className={styles.number} aria-hidden="true">
                    0{index + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.editorial} aria-hidden="true">
          <span>01</span>
          <i />
          <span>ABOUT MIA</span>
        </div>
      </div>
    </section>
  );
}
