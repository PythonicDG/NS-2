"use client";

import { useId, useRef, useState } from "react";
import { Eye, Target, ShieldCheck } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./VisionSection.module.css";

const icons = [Eye, Target, ShieldCheck];

export default function VisionSectionClient({ data }) {
  const sectionId = useId();
  const tabRefs = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = Array.isArray(data?.content_items) ? data.content_items : [];
  const activeIndex = selectedIndex < items.length ? selectedIndex : 0;

  if (!items.length) return null;

  function selectTab(index, focus = false) {
    setSelectedIndex(index);
    if (focus) tabRefs.current[index]?.focus({ preventScroll: true });
    tabRefs.current[index]?.scrollIntoView({
      behavior: "instant",
      block: "nearest",
      inline: "nearest",
    });
  }

  function handleKeyDown(event, index) {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % items.length;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + items.length) % items.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectTab(nextIndex, true);
    }
  }

  return (
    <section
      className={styles.section}
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>OUR PURPOSE</p>
          <h2 id={`${sectionId}-heading`} className={styles.heading}>
            Vision, Mission &amp; Values
          </h2>
          {data.heading && <p className={styles.subtitle}>{data.heading}</p>}
        </header>

        <div className={styles.tabScroller}>
          <div className={styles.tabs} role="tablist" aria-label="Our purpose">
            {items.map((item, index) => (
              <button
                key={item.id ?? index}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${sectionId}-tab-${index}`}
                aria-controls={`${sectionId}-panel-${index}`}
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                className={styles.tab}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className={styles.tabNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
                <span className={styles.tabDot} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {/* Stacked grid cells reserve the tallest panel's natural height.
            Images stay mounted so loading and uploaded sizes cannot shift tabs. */}
        <div className={styles.panels}>
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const Icon = icons[index % icons.length];
            return (
              <div
                key={item.id ?? index}
                id={`${sectionId}-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`${sectionId}-tab-${index}`}
                aria-hidden={!isActive}
                inert={!isActive}
                tabIndex={isActive ? 0 : -1}
                className={styles.panel}
                data-active={isActive}
              >
                <div className={styles.content}>
                  <span className={styles.backgroundNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.copy}>
                    <Icon
                      className={styles.icon}
                      size={26}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className={styles.title}>{item.label}</h3>
                    {item.description && (
                      <p className={styles.description}>{item.description}</p>
                    )}
                  </div>
                </div>
                <div className={styles.visual}>
                  <div className={styles.imageFrame}>
                    {item.image && (
                      <img
                        src={normalizeImageUrl(item.image)}
                        alt={item.label || "Our purpose"}
                        className={styles.image}
                        width="880"
                        height="560"
                      />
                    )}
                  </div>
                  <div className={styles.imageCaption} aria-hidden="true">
                    <span>
                      {String(index + 1).padStart(2, "0")} / {item.label}
                    </span>
                    <span className={styles.captionLine} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
