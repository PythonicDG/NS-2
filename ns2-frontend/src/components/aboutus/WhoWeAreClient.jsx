"use client";

import { Cpu, Network, Wrench } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./WhoWeAre.module.css";

const highlightIcons = [Wrench, Network, Cpu];
const defaultHighlights = [
  { id: "practical", label: "Practical learning" },
  { id: "structured", label: "Structured training" },
  { id: "industry", label: "Industry-focused skills" },
];

export default function WhoWeAreClient({ data }) {
  if (!data) return null;

  // Keep every supplied content item and its original order.
  const highlights = data.content_items?.length
    ? data.content_items
    : defaultHighlights;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={`${styles.layout} ${!data.primary_image ? styles.withoutImage : ""}`}
        >
          <header className={styles.header}>
            <p className={styles.eyebrow}>
              <span>About MIA</span>
              <span className={styles.eyebrowDivider} aria-hidden="true">
                /
              </span>
              <span>{data.super_heading || "Who we are"}</span>
            </p>
            {data.heading && <h2 className={styles.heading}>{data.heading}</h2>}
          </header>

          {data.primary_image && (
            <div className={styles.visual}>
              <span className={styles.gridMarks} aria-hidden="true" />
              <div className={styles.imageFrame}>
                {/* Native img preserves the API's existing media URL behavior. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={normalizeImageUrl(data.primary_image)}
                  alt={data.heading || "Professional training and development"}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className={styles.crosshair} aria-hidden="true" />
              <span className={styles.sectionNumber} aria-hidden="true">
                01
              </span>
            </div>
          )}

          <div className={styles.content}>
            {data.subheading && (
              <p className={styles.intro}>{data.subheading}</p>
            )}
            {data.overview_text && (
              <p className={styles.description}>{data.overview_text}</p>
            )}
            <ul className={styles.highlights}>
              {highlights.map((item, index) => {
                const Icon = highlightIcons[index % highlightIcons.length];
                const detail = item.description || item.text;
                return (
                  <li key={item.id ?? index} className={styles.highlight}>
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    <div className={styles.highlightContent}>
                      <p className={styles.highlightTitle}>
                        {item.label && <span>{item.label}</span>}
                        {item.label &&
                          item.title &&
                          item.label !== item.title && (
                            <span
                              className={styles.titleDivider}
                              aria-hidden="true"
                            >
                              /
                            </span>
                          )}
                        {item.title && item.title !== item.label && (
                          <span>{item.title}</span>
                        )}
                      </p>
                      {detail && (
                        <p className={styles.highlightText}>{detail}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
