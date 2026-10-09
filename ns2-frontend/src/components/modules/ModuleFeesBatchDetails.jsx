"use client";

import { normalizeImageUrl } from "@/lib/api";
import {
  ArrowUpRight,
  IndianRupee,
  Calendar,
  Clock,
  Users,
  Info,
} from "lucide-react";
import styles from "./ModuleFeesBatchDetails.module.css";

function getDetailIcon(label = "") {
  const text = label.toLowerCase();
  if (text.includes("fee") || text.includes("price")) return IndianRupee;
  if (text.includes("batch") || text.includes("date")) return Calendar;
  if (text.includes("duration") || text.includes("time")) return Clock;
  if (text.includes("seat")) return Users;
  return Info;
}

export default function ModuleFeesBatchDetails({ data }) {
  if (!data) return null;
  const items = (data.content_items || []).filter((item) => item.is_active);

  return (
    <section id="module-fees-batch" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.intro}>
          {data.super_heading && (
            <p className={styles.eyebrow}>{data.super_heading}</p>
          )}
          {(data.heading || data.highlighted_heading) && (
            <h2 className={styles.heading}>
              {data.heading}
              {data.highlighted_heading && (
                <span> {data.highlighted_heading}</span>
              )}
            </h2>
          )}
          {data.subheading && (
            <p className={styles.subheading}>{data.subheading}</p>
          )}
        </header>
        {(items.length > 0 || data.primary_button_text) && (
          <div className={styles.details}>
            {items.length > 0 && (
              <dl className={styles.list} aria-label="Fees and batch details">
                {items.map((item, idx) => {
                  const iconUrl = normalizeImageUrl(item.icon);
                  const Icon = getDetailIcon(item.label || "");
                  return (
                    <div className={styles.row} key={item.id || idx}>
                      <dt className={styles.label}>
                        <span className={styles.icon} aria-hidden="true">
                          {iconUrl ? (
                            <img src={iconUrl} alt="" />
                          ) : (
                            <Icon size={19} strokeWidth={1.6} />
                          )}
                        </span>
                        {item.label || "Course detail"}
                      </dt>
                      <dd className={styles.value}>
                        {item.title && (
                          <span className={styles.title}>{item.title}</span>
                        )}
                        {item.description && (
                          <p className={styles.description}>
                            {item.description}
                          </p>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
            {data.primary_button_text && (
              <div className={styles.footer}>
                <a
                  href={data.primary_button_url || "#"}
                  className={styles.button}
                >
                  {data.primary_button_text}
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
