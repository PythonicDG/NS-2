"use client";

import { useId } from "react";
import {
  Cpu,
  Monitor,
  Gauge,
  Network,
  CircuitBoard,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./ExpertiseSection.module.css";

const technicalIcons = [
  { match: /plc|programm|logic|control/i, icon: Cpu },
  { match: /hmi|scada|visual|monitor/i, icon: Monitor },
  { match: /drive|motion|motor|servo/i, icon: Gauge },
  { match: /network|communication|iot/i, icon: Network },
  { match: /electrical|panel|eplan|circuit|design/i, icon: CircuitBoard },
];
const fallbackIcons = [Cpu, Monitor, Gauge, Network, CircuitBoard, Wrench];

export default function ExpertiseSection({ data }) {
  const sectionId = useId();
  if (!data) return null;

  const items = Array.isArray(data.content_items)
    ? data.content_items.filter((item) => item.is_active)
    : [];

  return (
    <section
      className={styles.section}
      aria-labelledby={data.heading ? `${sectionId}-heading` : undefined}
      aria-label={data.heading ? undefined : "Our expertise"}
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

        {items.length > 0 && (
          <ol className={styles.matrix}>
            {items.map((item, index) => {
              const imageUrl = normalizeImageUrl(item.image);
              const Icon =
                technicalIcons.find(({ match }) =>
                  match.test(item.label || item.title || "")
                )?.icon || fallbackIcons[index % fallbackIcons.length];
              return (
                <li key={item.id ?? index} className={styles.item}>
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.icon} aria-hidden="true">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt=""
                        width="28"
                        height="28"
                        className={styles.uploadedIcon}
                      />
                    ) : (
                      <Icon size={26} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className={styles.copy}>
                    {item.label && (
                      <h3 className={styles.title}>{item.label}</h3>
                    )}
                    {(item.description || item.title) && (
                      <p className={styles.description}>
                        {item.description || item.title}
                      </p>
                    )}
                  </div>
                  {item.primary_button_text && (
                    <a
                      href={item.primary_button_url || "#"}
                      className={styles.link}
                    >
                      {item.primary_button_text}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        )}

        {data.overview_text && (
          <p className={styles.overview}>{data.overview_text}</p>
        )}
      </div>
    </section>
  );
}
