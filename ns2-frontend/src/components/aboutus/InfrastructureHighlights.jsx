"use client";

import { useId, useState } from "react";
import {
  Cpu,
  CircuitBoard,
  Monitor,
  Wrench,
  Network,
  Gauge,
} from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./InfrastructureHighlights.module.css";

const technicalIcons = [
  { match: /plc|controller|programm/i, icon: Cpu },
  { match: /component|panel|wir|electrical|relay/i, icon: CircuitBoard },
  { match: /hmi|scada|software|monitor/i, icon: Monitor },
  { match: /network|communication/i, icon: Network },
  { match: /motor|drive|sensor/i, icon: Gauge },
];
const fallbackIcons = [Cpu, CircuitBoard, Monitor, Wrench, Network, Gauge];

/** Lab showcase for the Django About Us INFRASTRUCTURE section. */
export default function InfrastructureHighlights({ data }) {
  const sectionId = useId();
  const [failedImages, setFailedImages] = useState([]);
  if (!data) return null;

  const items = Array.isArray(data.content_items)
    ? data.content_items.filter((item) => item.is_active)
    : [];
  // Prefer the section photo, then an active facility photo. Failed uploads
  // advance to the next candidate and ultimately collapse the image column.
  const images = [
    { url: normalizeImageUrl(data.primary_image), alt: data.heading },
    ...items.map((item) => ({
      url: normalizeImageUrl(item.image),
      alt: item.label || item.title,
    })),
  ];
  const image = images.find(({ url }) => url && !failedImages.includes(url));

  return (
    <section
      className={styles.section}
      aria-labelledby={data.heading ? `${sectionId}-heading` : undefined}
      aria-label={data.heading ? undefined : "Learning environment"}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          {data.super_heading && (
            <p className={styles.eyebrow}>{data.super_heading}</p>
          )}
          {data.heading && (
            <h2 id={`${sectionId}-heading`} className={styles.heading}>
              {data.heading}
            </h2>
          )}
          {data.subheading && (
            <p className={styles.subtitle}>{data.subheading}</p>
          )}
        </header>

        {(image || items.length > 0) && (
          <div
            className={`${styles.showcase} ${
              image && items.length > 0 ? styles.split : ""
            }`}
          >
            {image && (
              <figure className={styles.visual}>
                <div className={styles.imageFrame}>
                  <img
                    key={image.url}
                    src={image.url}
                    alt={image.alt || "Practical automation training lab"}
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                    onError={() =>
                      setFailedImages((previous) => [...previous, image.url])
                    }
                  />
                  <span className={styles.imageLabel}>Practical lab</span>
                </div>
              </figure>
            )}

            {items.length > 0 && (
              <ol className={styles.list}>
                {items.map((item, index) => {
                  const Icon =
                    technicalIcons.find(({ match }) =>
                      match.test(`${item.label || ""} ${item.title || ""}`)
                    )?.icon || fallbackIcons[index % fallbackIcons.length];
                  return (
                    <li key={item.id ?? index} className={styles.item}>
                      <span className={styles.number} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        className={styles.icon}
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <div className={styles.copy}>
                        {(item.label || item.title) && (
                          <h3 className={styles.title}>
                            {item.label || item.title}
                          </h3>
                        )}
                        {item.label && item.title && (
                          <p className={styles.itemSubtitle}>{item.title}</p>
                        )}
                        {item.description && (
                          <p className={styles.description}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
