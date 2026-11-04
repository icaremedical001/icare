import type { ReactNode } from "react";
import { homeContent } from "@/content/home";

const mapsEmbed =
  "https://maps.google.com/maps?q=22.06369972229004%2C88.03694915771484&z=17&hl=en&output=embed";
const mapsHref = "https://maps.google.com/maps?q=22.06369972229004%2C88.03694915771484&z=17&hl=en";

const socialIcons: Record<string, ReactNode> = {
  Facebook: (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="M13.4 2.6h-2C9.3 2.6 8.1 4 8.1 6.1v2H6v3h2.1v6.9h3.1v-6.9h2.3l.5-3h-2.8V6.4c0-.9.4-1.3 1.2-1.3h1.7z"
        fill="currentColor"
      />
    </svg>
  ),
  Instagram: (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3.1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.1" cy="5.9" r="1" fill="currentColor" />
    </svg>
  ),
  YouTube: (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <rect x="2.4" y="4.8" width="15.2" height="10.4" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.4 7.6v4.8l4.3-2.4z" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.1 9v5M6.1 6.2v.1M10.1 14v-2.9c0-1.2.9-2.1 2-2.1s2 .9 2 2.1V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Admission", href: "/#admission" },
  { label: "Departments", href: "/#departments" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function SiteFooter() {
  const { utility, footer } = homeContent;
  const phoneHref = `tel:${utility.phone.replaceAll(" ", "")}`;
  const hospitalHref = `tel:${utility.hospitalPhone.replaceAll(" ", "")}`;

  return (
    <footer className="site-footer">
      <div className="footer-main content-width">
        <div className="footer-brand">
          <a className="footer-brand-logo" href="/" aria-label="ICARE home page">
            <img src="/images/icare-logo.png" alt="ICARE Institute of Medical Sciences and Research" />
          </a>
          <p>{footer.about}</p>
          <div className="social-links" aria-label="Social media">
            {footer.socials.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.name} (opens in a new tab)`}>
                {socialIcons[social.name]}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          {quickLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>{footer.address}</p>
          <a href={phoneHref}>
            <span aria-hidden="true">☎</span> {utility.phone}
          </a>
          <a href={hospitalHref}>
            <span aria-hidden="true">☎</span> {utility.hospitalPhone}
          </a>
          <a href={`mailto:${utility.email}`}>
            <span aria-hidden="true">✉</span> {utility.email}
          </a>
        </div>

        <div className="footer-map">
          <h3>{footer.locationHeading}</h3>
          <iframe
            title={footer.locationHeading}
            src={mapsEmbed}
            loading="lazy"
          />
          <a className="map-link" href={mapsHref} target="_blank" rel="noreferrer">
            Open in Maps
          </a>
        </div>
      </div>

      <div className="content-width">
        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <span>
            {footer.policies.map((policy, index) => (
              <span key={policy}>
                {index > 0 && <i aria-hidden="true" />}
                {policy}
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
