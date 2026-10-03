"use client";

import { BookOpenCheck, ClipboardCheck, FileText, ShieldCheck } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./Accreditations.module.css";

const standardIcons = [BookOpenCheck, ClipboardCheck, FileText, ShieldCheck];

function getStandardIcon(item, index) {
  const text = `${item.label || ""} ${item.title || ""}`.toLowerCase();
  if (/safety|safe|responsible/.test(text)) return ShieldCheck;
  if (/documentation|drawing|reporting/.test(text)) return FileText;
  if (/assessment|review|revision/.test(text)) return ClipboardCheck;
  if (/curriculum|application|exercise/.test(text)) return BookOpenCheck;
  return standardIcons[index % standardIcons.length];
}

/** Training standards, using the unchanged ACCREDITATIONS API fields. */
export default function Accreditations({ data }) {
  if (!data) return null;

  const items = data.content_items?.filter((item) => item.is_active) || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          {data.super_heading && (
            <p className={styles.eyebrow}>{data.super_heading}</p>
          )}
          {data.heading && <h2 className={styles.heading}>{data.heading}</h2>}
          {data.subheading && (
            <p className={styles.subtitle}>{data.subheading}</p>
          )}
        </div>

        {items.length > 0 && (
          <ol className={styles.standards}>
            {items.map((item, index) => {
              const logoUrl = normalizeImageUrl(item.image);
              const Icon = getStandardIcon(item, index);

              return (
                <li key={item.id || index} className={styles.standard}>
                  <div className={styles.marker}>
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={item.label || "Training standard"}
                        className={styles.logo}
                      />
                    ) : (
                      <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                    )}
                    <span className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={styles.content}>
                    {item.label && <h3 className={styles.title}>{item.label}</h3>}
                    {item.title && <p className={styles.category}>{item.title}</p>}
                    {item.description && (
                      <p className={styles.description}>{item.description}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {data.overview_text && (
          <p className={styles.disclaimer}>{data.overview_text}</p>
        )}
      </div>
    </section>
  );
}
