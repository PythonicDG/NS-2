"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./PlacedStudentsSlider.module.css";

export default function PlacedStudentsSlider({ items = [] }) {
  const validItems = useMemo(
    () => items.filter((item) => item?.is_active !== false && item?.title),
    [items]
  );
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const moveRef = useRef(() => {});
  const toggleRef = useRef(() => {});
  const pausedRef = useRef(false);
  const viewportId = useId();

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    if (!root || !viewport || !validItems.length) return;
    const count = validItems.length;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let step = 0;
    let looping = false;
    let hovered = false;
    let focused = false;
    let dragging = false;
    let touching = false;
    let paused = pausedRef.current;
    let startX = 0;
    let startScroll = 0;
    let autoplay;
    let settle;
    let frame;
    const stop = () => window.clearTimeout(autoplay);
    const schedule = () => {
      stop();
      if (
        !looping ||
        hovered ||
        focused ||
        dragging ||
        touching ||
        paused ||
        motion.matches ||
        document.hidden
      )
        return;
      autoplay = window.setTimeout(() => move(1), 3500);
    };
    // Rebase between identical sets after scrolling settles: no visible reverse scroll.
    const normalize = () => {
      if (!looping || dragging) return;
      const span = count * step;
      if (viewport.scrollLeft < span || viewport.scrollLeft >= span * 2) {
        const position = (((viewport.scrollLeft - span) % span) + span) % span;
        viewport.scrollTo({ left: span + position, behavior: "instant" });
      }
    };
    const move = (direction) => {
      if (!looping || dragging) return;
      stop();
      normalize();
      viewport.scrollTo({
        left: (Math.round(viewport.scrollLeft / step) + direction) * step,
        behavior: motion.matches ? "instant" : "smooth",
      });
      schedule();
    };
    moveRef.current = move;
    toggleRef.current = (button) => {
      paused = !paused;
      pausedRef.current = paused;
      button.setAttribute(
        "aria-label",
        paused ? "Play student carousel" : "Pause student carousel"
      );
      button.setAttribute("aria-pressed", String(paused));
      root.dataset.paused = String(paused);
      schedule();
    };
    const measure = () => {
      stop();
      const card = viewport.querySelector('[data-original="true"]');
      if (!card) return;
      const gap =
        parseFloat(getComputedStyle(viewport.firstElementChild).columnGap) || 0;
      const index = step ? Math.round(viewport.scrollLeft / step) % count : 0;
      step = card.getBoundingClientRect().width + gap;
      looping = count * step - gap > viewport.clientWidth + 1;
      root.dataset.loop = String(looping);
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        viewport.scrollTo({
          left: looping ? (count + index) * step : 0,
          behavior: "instant",
        });
        schedule();
      });
    };
    const onScroll = () => {
      stop();
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        normalize();
        schedule();
      }, 180);
    };
    const enter = (event) => {
      if (event.pointerType === "mouse") {
        hovered = true;
        stop();
      }
    };
    const leave = () => {
      hovered = false;
      schedule();
    };
    const focus = (event) => {
      focused = event.target.matches(":focus-visible");
      if (focused) stop();
    };
    const blur = (event) => {
      if (!root.contains(event.relatedTarget)) {
        focused = false;
        schedule();
      }
    };
    const down = (event) => {
      if (!looping || (event.pointerType === "mouse" && event.button !== 0))
        return;
      dragging = true;
      stop();
      window.clearTimeout(settle);
      viewport.scrollTo({ left: viewport.scrollLeft, behavior: "instant" });
      if (event.pointerType !== "mouse") return;
      startX = event.clientX;
      startScroll = viewport.scrollLeft;
      viewport.setPointerCapture(event.pointerId);
      viewport.dataset.dragging = "true";
    };
    const drag = (event) => {
      if (dragging && event.pointerType === "mouse")
        viewport.scrollLeft = startScroll + startX - event.clientX;
    };
    const up = (event) => {
      if (!dragging) return;
      dragging = false;
      delete viewport.dataset.dragging;
      if (viewport.hasPointerCapture(event.pointerId))
        viewport.releasePointerCapture(event.pointerId);
      if (event.pointerType === "mouse")
        viewport.scrollTo({
          left: Math.round(viewport.scrollLeft / step) * step,
          behavior: motion.matches ? "instant" : "smooth",
        });
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        normalize();
        schedule();
      }, 180);
    };
    const key = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    };
    const visibility = () => schedule();
    const touchStart = () => {
      touching = true;
      stop();
    };
    const touchEnd = () => {
      touching = false;
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    const listeners = [
      [root, "pointerenter", enter],
      [root, "pointerleave", leave],
      [root, "focusin", focus],
      [root, "focusout", blur],
      [viewport, "scroll", onScroll],
      [viewport, "pointerdown", down],
      [viewport, "pointermove", drag],
      [viewport, "pointerup", up],
      [viewport, "pointercancel", up],
      [viewport, "lostpointercapture", up],
      [viewport, "touchstart", touchStart],
      [viewport, "touchend", touchEnd],
      [viewport, "touchcancel", touchEnd],
      [viewport, "keydown", key],
      [document, "visibilitychange", visibility],
      [motion, "change", visibility],
    ];
    listeners.forEach(([target, name, handler]) =>
      target.addEventListener(name, handler, {
        passive: name === "scroll" || name.startsWith("touch"),
      })
    );
    measure();
    return () => {
      stop();
      window.clearTimeout(settle);
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      listeners.forEach(([target, name, handler]) =>
        target.removeEventListener(name, handler)
      );
      moveRef.current = () => {};
      toggleRef.current = () => {};
    };
  }, [validItems]);

  if (!validItems.length) return null;

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Placed students"
      data-loop="false"
      data-paused="false"
    >
      <div
        id={viewportId}
        ref={viewportRef}
        className={styles.viewport}
        tabIndex={0}
        aria-label="Student cards. Swipe, drag, or use left and right arrow keys to browse."
      >
        <ul className={styles.track}>
          {[0, 1, 2].map((copy) =>
            validItems.map((item, index) => (
              <li
                key={`${copy}-${item.id ?? index}`}
                className={styles.card}
                data-original={copy === 1 ? "true" : undefined}
                data-clone={copy !== 1 ? "true" : undefined}
                aria-hidden={copy !== 1 ? true : undefined}
              >
                <div className={styles.image}>
                  {item.icon ? (
                    <Image
                      src={normalizeImageUrl(item.icon)}
                      alt={`Placement announcement for ${item.title}`}
                      fill
                      sizes="(max-width: 639px) 82vw, (max-width: 767px) 45vw, (max-width: 1023px) 30vw, 25vw"
                      className={styles.photo}
                      draggable={false}
                    />
                  ) : (
                    <div className={styles.fallback} aria-hidden="true">
                      {item.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.caption}>
                  <h3 title={item.title}>{item.title}</h3>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => moveRef.current(-1)}
          aria-controls={viewportId}
          aria-label="Previous student"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={(event) => toggleRef.current(event.currentTarget)}
          aria-controls={viewportId}
          aria-label="Pause student carousel"
          aria-pressed="false"
        >
          <Pause className={styles.pauseIcon} size={15} />
          <Play className={styles.playIcon} size={15} />
        </button>
        <button
          type="button"
          onClick={() => moveRef.current(1)}
          aria-controls={viewportId}
          aria-label="Next student"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
