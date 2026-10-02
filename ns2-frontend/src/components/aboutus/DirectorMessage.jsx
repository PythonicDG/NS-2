import { normalizeImageUrl } from "@/lib/api";
import styles from "./DirectorMessage.module.css";

/** Editorial letter using the existing DIRECTOR_MESSAGE API payload. */
export default function DirectorMessage({ data }) {
  if (!data) return null;

  const message = data.content_items?.find((item) => item.is_active);
  const directorImage = normalizeImageUrl(data.primary_image);
  // Original records stored name/role in subheading/overview_text.
  // Institute records carry leadership metadata on the content item instead.
  const hasLeadershipMetadata = Boolean(
    message?.person_name ||
    message?.person_role ||
    message?.label ||
    message?.title
  );
  const name = hasLeadershipMetadata
    ? message.person_name || message.label
    : data.subheading;
  const designation = hasLeadershipMetadata
    ? message.person_role || message.title
    : data.overview_text;
  const quote = hasLeadershipMetadata
    ? data.subheading || message.description
    : message?.description;
  const supportingText = hasLeadershipMetadata
    ? [data.overview_text, message?.description, message?.text]
    : [message?.text];
  const supportingParagraphs = [
    ...new Set(supportingText.filter((text) => text && text !== quote)),
  ];

  return (
    <section className={styles.section} aria-label="Message from the institute">
      <div className={styles.container}>
        <span className={styles.sideLabel} aria-hidden="true">
          MESSAGE / 02
        </span>
        <div
          className={`${styles.layout} ${!directorImage ? styles.withoutImage : ""}`}
        >
          <header className={styles.header}>
            <p className={styles.eyebrow}>
              {data.super_heading || "A MESSAGE FROM THE INSTITUTE"}
            </p>
            {data.heading && <h2 className={styles.heading}>{data.heading}</h2>}
          </header>

          {directorImage && (
            <figure className={styles.portrait}>
              <div className={styles.imageFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={directorImage}
                  alt={name || "Institute leadership"}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.captionRule} aria-hidden="true" />
                {name && <span>{name}</span>}
              </figcaption>
            </figure>
          )}

          <div className={styles.letter}>
            {quote && (
              <>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                <blockquote className={styles.quote}>{quote}</blockquote>
              </>
            )}
            {supportingParagraphs.map((text) => (
              <p key={text} className={styles.supporting}>
                {text}
              </p>
            ))}
            {(name || designation) && (
              <div className={styles.signature}>
                {name && <p className={styles.name}>{name}</p>}
                {designation && (
                  <p className={styles.designation}>{designation}</p>
                )}
              </div>
            )}
            {data.primary_button_text && (
              <a href={data.primary_button_url || "#"} className={styles.cta}>
                <span>{data.primary_button_text}</span>
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
