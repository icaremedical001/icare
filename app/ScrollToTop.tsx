"use client";

import { useEffect, useState } from "react";

/* Floating "back to top" control, shown once the page is scrolled down. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 360);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const toTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`floating-contact-button floating-to-top${visible ? " is-visible" : ""}`}
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5m-7 7 7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
