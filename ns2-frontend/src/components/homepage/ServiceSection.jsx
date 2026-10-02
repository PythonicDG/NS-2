"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./ServiceSection.module.css";

export const ServicesSection = ({ data = {} }) => {
  const items = (data.content_items || []).filter(
    (item) => item.is_active !== false
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef([]);
  const explorerId = useId();
  const activeIndex = selectedIndex < items.length ? selectedIndex : 0;
  const activeImageUrl = normalizeImageUrl(items[activeIndex]?.icon);

  const handleKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % items.length;
    else if (event.key === "ArrowUp")
      nextIndex = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = items.length - 1;
    else return;

    event.preventDefault();
    setSelectedIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      aria-labelledby={`${explorerId}-title`}
      className={`${styles.section} py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {data.super_heading && (
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C2481F]">
              {data.super_heading}
            </p>
          )}
          <h2
            id={`${explorerId}-title`}
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl"
          >
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="mt-5 text-lg leading-8 text-gray-600">
              {data.subheading}
            </p>
          )}
        </div>
        {items.length > 0 && (
          <div className={`${styles.explorer} mt-12`}>
            <div
              className={styles.programList}
              role="tablist"
              aria-label={data.heading || "Automation training programs"}
              aria-orientation="vertical"
            >
              {items.map((item, index) => (
                <button
                  key={item.id || index}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`${explorerId}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-controls={`${explorerId}-panel-${index}`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => setSelectedIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={styles.programTab}
                >
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.tabContent}>
                    {item.label && (
                      <span className={styles.tabCategory}>{item.label}</span>
                    )}
                    <span className={styles.tabTitle}>{item.title}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className={styles.tabArrow}
                  />
                </button>
              ))}
            </div>
            <div className={styles.featured}>
              {items.map((item, index) => {
                const href =
                  item.question ||
                  (item.text?.startsWith("/") ? item.text : "/modules");
                return (
                  <article
                    key={item.id || index}
                    id={`${explorerId}-panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`${explorerId}-tab-${index}`}
                    hidden={index !== activeIndex}
                    tabIndex={0}
                    className={`${styles.panel} ${!item.icon ? styles.panelWithoutImage : ""}`}
                  >
                    <div className={styles.panelContent}>
                      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#C2481F]">
                        {item.label}
                      </p>
                      <h3 className="mt-3 text-balance text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
                        {item.title}
                      </h3>
                      <p className="mt-5 break-words text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                        {item.description}
                      </p>
                      <Link href={href} className={styles.cta}>
                        View program{" "}
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </div>
                    {index === activeIndex && activeImageUrl && (
                      <div className={styles.imageStage}>
                        <Image
                          key={`${item.id || index}-${activeImageUrl}`}
                          src={activeImageUrl}
                          alt={item.title || item.label || ""}
                          fill
                          sizes="(max-width: 639px) calc(100vw - 74px), (max-width: 1023px) 42vw, (max-width: 1280px) 26vw, 320px"
                          className={styles.programImage}
                        />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
