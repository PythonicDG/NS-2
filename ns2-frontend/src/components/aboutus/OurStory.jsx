"use client";

import { BookOpen, CircuitBoard, Gauge, Wrench } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./OurStory.module.css";

const stepIcons = [BookOpen, Wrench, CircuitBoard, Gauge];

/** The OUR_STORY journey retains the API's active items and their ordering. */
export default function OurStory({ data }) {
  if (!data) return null;

  const milestones = data.content_items?.filter((item) => item.is_active) || [];
  const images = milestones.flatMap((item, index) => {
    const src = normalizeImageUrl(item.image);
    return src
      ? [
          {
            src,
            alt: item.title || item.label || "Milestone",
            key: item.id || index,
          },
        ]
      : [];
  });

  return (
    <section
      className={styles.section}
      id="our-story"
      aria-label={data.heading || "Our approach"}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          {data.super_heading && (
            <p className={styles.eyebrow}>{data.super_heading}</p>
          )}
          {data.heading && <h2 className={styles.heading}>{data.heading}</h2>}
          {data.subheading && <p className={styles.intro}>{data.subheading}</p>}
        </header>

        {milestones.length > 0 && (
          <ol
            className={styles.journey}
            style={{ "--columns": Math.min(milestones.length, 4) }}
          >
            {milestones.map((item, index) => {
              const Icon = stepIcons[index % stepIcons.length];
              const row = Math.floor(index / 2);
              const reverse = row % 2 === 1;
              const rowEnd = index % 2 === 1 && index < milestones.length - 1;

              return (
                <li
                  key={item.id || index}
                  className={`${styles.step} ${reverse ? styles.reverse : ""} ${rowEnd ? styles.rowEnd : ""} ${index % 4 === 3 ? styles.desktopRowEnd : ""}`}
                  style={{
                    "--tablet-row": row + 1,
                    "--tablet-column": reverse
                      ? 2 - (index % 2)
                      : (index % 2) + 1,
                  }}
                  tabIndex={0}
                >
                  <div className={styles.stepMeta}>
                    <span className={styles.number}>
                      {item.label || String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className={styles.icon}
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={styles.node} aria-hidden="true" />
                  <span className={styles.direction} aria-hidden="true" />
                  <div className={styles.stepContent}>
                    {item.title && (
                      <h3 className={styles.stepTitle}>{item.title}</h3>
                    )}
                    {item.description && (
                      <p className={styles.description}>{item.description}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {images.length > 0 && (
          <div className={styles.imageStrip}>
            {images.map((image) => (
              <img
                key={image.key}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={styles.image}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
