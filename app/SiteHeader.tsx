"use client";

import { useEffect, useState } from "react";
import { homeContent } from "@/content/home";

type SiteHeaderProps = { current?: "home" | "contact"; update?: string; homeHref?: string };

export default function SiteHeader({ current, update = homeContent.update, homeHref = "/" }: SiteHeaderProps) {
  const { utility, navigation } = homeContent;
  const [menuOpen, setMenuOpen] = useState(false);
  const navHref = (item: string) => {
    if (item === "Home") return homeHref;
    if (item === "About") return `${homeHref}#about`;
    if (item === "Admission") return `${homeHref}#admission`;
    if (item === "Departments") return `${homeHref}#departments`;
    return "#";
  };

  // Close the menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Collapse back to the bar when the viewport grows past the mobile layout.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="site-header">
      <div className="utility-header content-width">
        <a className="brand-lockup" href={homeHref} aria-label="ICARE home page"><img src="/images/icare-logo.png" alt="ICARE Institute of Medical Sciences and Research" /></a>
        <div className="utility-contacts" aria-label="Contact information">
          <a href={`tel:${utility.phone.replaceAll(" ", "")}`}><span aria-hidden="true">☎</span>{utility.phone}</a>

        </div>
      </div>

      <nav className={`navigation${menuOpen ? " nav-open" : ""}`} aria-label="Main navigation">
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-box" aria-hidden="true">
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </span>
          Menu
        </button>

        <div className="nav-menu" id="site-nav-menu">
          <div className="nav-links">
            {navigation.map((item) => (
              <a
                className={current === "home" && item === "Home" ? "active" : ""}
                href={navHref(item)}
                key={item}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
          <a className="contact-link" href="/contact-us" aria-current={current === "contact" ? "page" : undefined} onClick={() => setMenuOpen(false)}>
            Contact Us <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
