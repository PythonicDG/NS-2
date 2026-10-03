"use client";

import { normalizeImageUrl } from "@/lib/api";
import styles from "./ModuleCourseOverview.module.css";

/** Course overview; editorial content and resources are supplied by Django. */
export default function ModuleCourseOverview({ data, brochure, syllabus }) {
  if (!data) return null;

  const primaryImage = normalizeImageUrl(data.primary_image);
  const brochureUrl = normalizeImageUrl(brochure);
  const syllabusUrl = normalizeImageUrl(syllabus);
  const imageAlt = data.heading || data.super_heading || "Course Overview";
  const stages = (data.content_items || []).filter((item) => item.is_active);
  const hasDetails =
    data.overlay_title || data.overlay_description || stages.length > 0;

  return (
    <section id="module-course-overview" className={styles.overview}>
      <div
        className={`${styles.layout} ${!primaryImage ? styles.withoutImage : ""}`}
      >
        <div className={styles.label}>
          <span>{data.super_heading || "Course Overview"}</span>
          <span className={styles.annotation} aria-hidden="true">
            01 / PROGRAM
          </span>
        </div>
        <div className={styles.intro}>
          {data.heading && (
            <h2 className={styles.heading}>
              {data.heading}
              {data.highlighted_heading && (
                <span className={styles.highlight}>
                  {" "}
                  {data.highlighted_heading}
                </span>
              )}
            </h2>
          )}
          {data.subheading && (
            <p className={styles.description}>{data.subheading}</p>
          )}
        </div>
        {primaryImage && (
          <figure className={styles.visual}>
            <div className={styles.imageFrame}>
              <img src={primaryImage} alt={imageAlt} className={styles.image} />
            </div>
            <div className={styles.imageLabel} aria-hidden="true">
              <span>COURSE OVERVIEW</span>
              <span>01</span>
            </div>
          </figure>
        )}
        {stages.length > 0 && (
          <div className={styles.process}>
            <div className={styles.processLabel}>
              <span>LEARNING SEQUENCE</span>
              <span aria-hidden="true">START → APPLY</span>
            </div>
            <ol className={styles.stages} aria-label="Learning progression">
              {stages.map((item, idx) => (
                <li key={item.id || idx} className={styles.stage}>
                  <div className={styles.marker} aria-hidden="true">
                    <span className={styles.number}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.node} />
                  </div>
                  <div className={styles.stageText}>
                    {item.title && <h3>{item.title}</h3>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className={styles.footer}>
          {hasDetails && (
            <dl className={styles.details} aria-label="Course information">
              {data.overlay_title && (
                <div>
                  <dt>TRAINING FOCUS</dt>
                  <dd>{data.overlay_title}</dd>
                </div>
              )}
              {data.overlay_description && (
                <div>
                  <dt>APPROACH</dt>
                  <dd>{data.overlay_description}</dd>
                </div>
              )}
              {stages.length > 0 && (
                <div className={styles.stageCount}>
                  <dt>PROGRESSION</dt>
                  <dd>{String(stages.length).padStart(2, "0")} stages</dd>
                </div>
              )}
            </dl>
          )}
          {(syllabusUrl || brochureUrl) && (
            <div className={styles.cta}>
              <a
                href={syllabusUrl || brochureUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-4 bg-[#C2481F] text-white font-bold rounded-xl shadow-lg shadow-[#C2481F]/20 hover:bg-[#A63D1A] transition-all duration-300"
              >
                {syllabusUrl ? "View Full Syllabus" : "Download Brochure"}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
