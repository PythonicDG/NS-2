"use client";

import { useEffect, useRef } from "react";

export default function HeroFloatingImages({
  primaryImage,
  secondaryImage,
  overlayTitle,
  overlayDescription,
}) {
  const containerRef = useRef(null);
  const bigCardRef = useRef(null);
  const smallCardRef = useRef(null);
  const rAF = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const big = bigCardRef.current;
    const small = smallCardRef.current;
    if (!container || !big || !small) return;

    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;

    function onMove(e) {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / rect.width;
      mouseY = (e.clientY - cy) / rect.height;
    }

    function animate() {
      lastX += (mouseX - lastX) * 0.08;
      lastY += (mouseY - lastY) * 0.08;

      const bgX = lastX * 18;
      const bgY = lastY * 18;
      const smX = lastX * 36;
      const smY = lastY * 36;

      big.style.transform = `translate3d(${bgX}px, ${bgY}px, 0) rotate(${lastX * 2}deg)`;
      small.style.transform = `translate3d(${smX}px, ${smY}px, 0) rotate(${lastX * 4}deg)`;

      rAF.current = requestAnimationFrame(animate);
    }

    container.addEventListener("mousemove", onMove);
    rAF.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", onMove);
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl h-[20rem] sm:h-[26rem] md:h-[32rem] flex items-center justify-center"
    >
      {/* Big card (Hero Image 1) */}
      <div
        ref={bigCardRef}
        className="absolute w-[18rem] sm:w-[24rem] md:w-[30rem] h-[12rem] sm:h-[16rem] md:h-[20rem] rounded-[8px] bg-white shadow-2xl border border-gray-100 flex items-center justify-center"
      >
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={overlayTitle ?? "Hero image 1"}
            className="w-full h-full object-cover rounded-[8px]"
          />
        ) : (
          <div className="text-lg sm:text-xl font-semibold text-sky-600">
            Hero Image 1
          </div>
        )}
      </div>

      {/* Small card (Hero Image 2) */}
      <div
        ref={smallCardRef}
        className="absolute right-4 sm:right-6 md:right-10 bottom-6 sm:bottom-8 md:bottom-10 w-36 sm:w-44 md:w-56 h-24 sm:h-28 md:h-32 rounded-[8px] shadow-lg flex items-center justify-center overflow-hidden border border-slate-800 bg-slate-900/95"
      >
        {secondaryImage ? (
          <img
            src={secondaryImage}
            alt="Hero image 2"
            className="w-full h-full object-cover rounded-[8px]"
          />
        ) : (
          <div className="text-xs sm:text-sm text-center text-white p-2">
            <div className="font-semibold">
              {overlayTitle ?? "Hero Image 2"}
            </div>
            <div className="text-[0.7rem] sm:text-xs text-slate-300">
              {overlayDescription ?? "Overlay"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
