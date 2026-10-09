"use client";

import { useEffect, useRef, useState } from "react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./ModuleKeyHighlights.module.css";

function HighlightTitle({ title }) {
  const words = title.match(/^(\S+(?:\s+\S+)?)([\s\S]*)$/);
  return words ? (
    <>
      <strong>{words[1]}</strong>
      {words[2]}
    </>
  ) : (
    title
  );
}

export default function ModuleKeyHighlights({ data }) {
  const pathwayRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    previous: false,
    next: false,
  });
  const items = (data?.content_items || []).filter((item) => item.is_active);

  useEffect(() => {
    const pathway = pathwayRef.current;
    if (!pathway) return;
    const update = () =>
      setScrollState({
        previous: pathway.scrollLeft > 2,
        next:
          pathway.scrollLeft + pathway.clientWidth < pathway.scrollWidth - 2,
      });
    const observer = new ResizeObserver(update);
    observer.observe(pathway);
    pathway.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      pathway.removeEventListener("scroll", update);
    };
  }, [data, items.length]);

  function movePathway(direction) {
    const pathway = pathwayRef.current;
    if (!pathway) return;
    const itemWidth =
      pathway.firstElementChild?.getBoundingClientRect().width ||
      pathway.clientWidth;
    pathway.scrollBy({
      left: direction * itemWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  if (!data) return null;

  return (
    <section id="module-key-highlights" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            {data.super_heading && (
              <p className={styles.eyebrow}>{data.super_heading}</p>
            )}
            {data.heading && (
              <h2 className={styles.heading}>
                {data.heading}
                {data.highlighted_heading && (
                  <span> {data.highlighted_heading}</span>
                )}
              </h2>
            )}
          </div>
          {data.subheading && (
            <p className={styles.subtitle}>{data.subheading}</p>
          )}
        </header>

        {items.length > 0 && (
          <div className={styles.ribbon}>
            <div className={styles.measurement} aria-hidden="true">
              <span>CAPABILITY PATH</span>
              <svg viewBox="0 0 600 12" preserveAspectRatio="none" fill="none">
                <path d="M1 6H599M1 0V12M60 3V9M120 3V9M180 3V9M240 3V9M300 0V12M360 3V9M420 3V9M480 3V9M540 3V9M599 0V12" />
              </svg>
              <span>{String(items.length).padStart(2, "0")} POINTS</span>
            </div>
            <ol
              id="module-highlights-pathway"
              ref={pathwayRef}
              className={styles.pathway}
              aria-label="Program capability pathway"
              tabIndex={0}
            >
              {items.map((item, idx) => {
                const iconUrl = normalizeImageUrl(item.icon);
                const number = String(idx + 1).padStart(2, "0");
                const showLabel =
                  item.label &&
                  item.label.trim() !== number &&
                  item.label.trim() !== String(idx + 1);
                return (
                  <li key={item.id || idx} className={styles.item}>
                    <div className={styles.index}>
                      <span className={styles.number}>{number}</span>
                      {showLabel && (
                        <span className={styles.itemLabel}>{item.label}</span>
                      )}
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={item.title || ""}
                          className={styles.image}
                        />
                      )}
                    </div>
                    <div className={styles.connection} aria-hidden="true">
                      <span />
                    </div>
                    <div className={styles.itemContent}>
                      {item.title && (
                        <h3>
                          <HighlightTitle title={item.title} />
                        </h3>
                      )}
                      {item.description && <p>{item.description}</p>}
                      {item.tags && (
                        <ul className={styles.tags} aria-label="Topics">
                          {item.tags.split(",").map((tag, i) => (
                            <li key={i}>{tag.trim()}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className={styles.ribbonFooter}>
              <span className={styles.range} aria-hidden="true">
                01 <span>→</span> {String(items.length).padStart(2, "0")}
              </span>
              {(scrollState.previous || scrollState.next) && (
                <div className={styles.navigation}>
                  <span>EXPLORE HIGHLIGHTS</span>
                  <button
                    type="button"
                    onClick={() => movePathway(-1)}
                    disabled={!scrollState.previous}
                    aria-label="Previous highlight"
                    aria-controls="module-highlights-pathway"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => movePathway(1)}
                    disabled={!scrollState.next}
                    aria-label="Next highlight"
                    aria-controls="module-highlights-pathway"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
