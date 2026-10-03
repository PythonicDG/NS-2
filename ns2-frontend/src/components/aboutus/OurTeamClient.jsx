"use client";

import { useId, useRef, useState, useEffect } from "react";
import { normalizeImageUrl } from "@/lib/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaLinkedin, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import styles from "./OurTeam.module.css";

function MentorPortrait({ image, name }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const url = normalizeImageUrl(image);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return (
    <div className={styles.portrait}>
      {url && failedUrl !== url ? (
        // Uploaded portraits use the existing API URL normalization.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={name}
          loading="lazy"
          draggable={false}
          onError={() => setFailedUrl(url)}
        />
      ) : (
        <div
          className={styles.placeholder}
          role="img"
          aria-label={`${name} — photo unavailable`}
        >
          <span>{initials}</span>
        </div>
      )}
    </div>
  );
}

export default function OurTeamClient({ data }) {
  const trackRef = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const trackId = useId();
  const headingId = useId();
  const [navigation, setNavigation] = useState({
    previous: false,
    next: false,
  });
  const items = data?.content_items || [];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () =>
      setNavigation({
        previous: track.scrollLeft > 2,
        next: track.scrollLeft < track.scrollWidth - track.clientWidth - 2,
      });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, [items.length]);

  if (!items.length) return null;

  const scrollTo = (left) =>
    trackRef.current.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  const stepSize = () =>
    trackRef.current.children[0].getBoundingClientRect().width +
    parseFloat(getComputedStyle(trackRef.current).columnGap);
  const move = (direction) =>
    scrollTo(trackRef.current.scrollLeft + direction * stepSize());
  const endDrag = (event) => {
    if (!drag.current) return;
    const moved = drag.current.moved;
    drag.current = null;
    trackRef.current.classList.remove(styles.dragging);
    if (trackRef.current.hasPointerCapture(event.pointerId))
      trackRef.current.releasePointerCapture(event.pointerId);
    if (moved)
      scrollTo(
        Math.round(trackRef.current.scrollLeft / stepSize()) * stepSize()
      );
  };

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.container}>
        <header className={styles.header}>
          {data.super_heading && (
            <p className={styles.eyebrow}>{data.super_heading}</p>
          )}
          <h2 id={headingId} className={styles.heading}>
            {data.heading || "Our mentors"}
          </h2>
          {data.subheading && (
            <p className={styles.subheading}>{data.subheading}</p>
          )}
          {data.overview_text && (
            <p className={styles.intro}>{data.overview_text}</p>
          )}
        </header>
        <div
          className={styles.track}
          ref={trackRef}
          id={trackId}
          role="region"
          aria-label="Mentor profiles"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
            if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              scrollTo(
                event.key === "Home" ? 0 : event.currentTarget.scrollWidth
              );
            }
          }}
          onPointerDown={(event) => {
            suppressClick.current = false;
            // Native touch scrolling preserves both swipe and vertical page gestures.
            if (
              event.pointerType !== "mouse" ||
              event.button !== 0 ||
              event.target.closest("a, button")
            )
              return;
            drag.current = {
              x: event.clientX,
              left: event.currentTarget.scrollLeft,
              moved: false,
            };
          }}
          onPointerMove={(event) => {
            if (!drag.current) return;
            const distance = event.clientX - drag.current.x;
            if (Math.abs(distance) > 5) {
              drag.current.moved = true;
              suppressClick.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              event.currentTarget.classList.add(styles.dragging);
            }
            if (drag.current.moved)
              event.currentTarget.scrollLeft = drag.current.left - distance;
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={(event) => {
            if (drag.current && !drag.current.moved) endDrag(event);
          }}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          {items.map((item, index) => {
            const name =
              item.label || item.person_name || item.title || "Mentor";
            // The About API has no tags field, so existing specialization supplies expertise tags.
            const tags = (item.tags || item.title || item.person_role || "")
              .split(/[,|&]/)
              .map((tag) => tag.trim())
              .filter(Boolean);
            return (
              <article className={styles.profile} key={item.id ?? index}>
                <MentorPortrait image={item.image} name={name} />
                <div className={styles.details}>
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.specialization}>
                    {item.title || item.person_role}
                  </p>
                  <div className={styles.description}>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <div className={styles.tags} aria-label="Expertise">
                    {tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
                  <div className={styles.socials}>
                    {item.linkedin_url && (
                      <a
                        href={item.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} on LinkedIn`}
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {item.twitter_url && (
                      <a
                        href={`mailto:${item.twitter_url}`}
                        aria-label={`Email ${name}`}
                      >
                        <MdEmail />
                      </a>
                    )}
                    {item.facebook_url && (
                      <a
                        href={item.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} website`}
                      >
                        <FaGlobe />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div
          className={styles.navigation}
          hidden={!navigation.previous && !navigation.next}
        >
          <span className={styles.hint}>
            Meet the team <span aria-hidden="true">/</span>{" "}
            <span className={styles.swipeHint}>Swipe to explore</span>
            <span className={styles.dragHint}>Drag to explore</span>
          </span>
          <div className={styles.arrows}>
            <button
              type="button"
              aria-label="Previous mentor"
              aria-controls={trackId}
              disabled={!navigation.previous}
              onClick={() => move(-1)}
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              aria-label="Next mentor"
              aria-controls={trackId}
              disabled={!navigation.next}
              onClick={() => move(1)}
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
