"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, Globe } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube, FaXTwitter } from "react-icons/fa6";
import styles from "./Footer.module.css";

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  x: FaXTwitter,
};

function linkUrl(url) {
  if (!url) return "#";
  // Older API normalization may prepend a slash to contact URI schemes.
  const value = url.replace(/^\/(?=(?:tel|mailto):)/i, "");
  return /^(?:https?:|tel:|mailto:|\/|#)/i.test(value) ? value : `/${value}`;
}

function contactIcon(item) {
  const url = linkUrl(item.url);
  if (url.startsWith("tel:")) return Phone;
  if (url.startsWith("mailto:")) return Mail;
  return MapPin;
}

function Heading({ children }) {
  return <h3 className={styles.heading}>{children}</h3>;
}

export default function FooterClient({ data }) {
  if (!data) return null;

  const { sections = [], company = {}, social_links = [] } = data;
  const sortedSections = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));
  const contactSection = sortedSections.find((section) => /get in touch|contact/i.test(section.title));
  const navigationSections = sortedSections.filter((section) => section !== contactSection);
  const contactItems = contactSection?.items?.length ? contactSection.items : [
    company.phone && { text: company.phone, url: `tel:${company.phone.replace(/[^+\d]/g, "")}` },
    company.email && { text: company.email, url: `mailto:${company.email}` },
    (company.address || company.company_address) && { text: company.address || company.company_address, url: "/contact" },
  ].filter(Boolean);
  // Only show legal links when the CMS supplies published destinations.
  const legalLinks = sortedSections.flatMap((section) => section.items || [])
    .filter((item) => /^(privacy policy|terms(?: and conditions| of (?:use|service))?)$/i.test(item.text?.trim()) && item.url && item.url !== "#");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid} style={{ "--footer-columns": navigationSections.length }}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="Modern Institute of Automation home">
              <Image
                src="/footer-logo.png"
                alt="Modern Institute of Automation — Automate your future."
                width={120}
                height={129}
                className={styles.logo}
              />
            </Link>
            <p className={styles.description}>
              Hands-on automation training for industry-ready careers.
            </p>
          </div>

          <div className={styles.contact}>
            <Heading>{contactSection?.title || "Get in Touch"}</Heading>
            <ul className={styles.list}>
              {[...contactItems].sort((a, b) => (a.order || 0) - (b.order || 0)).map((item, index) => {
                const Icon = contactIcon(item);
                return (
                  <li key={`${item.text}-${index}`}>
                    <a href={linkUrl(item.url)} className={styles.contactLink}>
                      <Icon size={16} aria-hidden="true" className={styles.contactIcon} />
                      <span>{item.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            {social_links.length > 0 && (
              <div className={styles.socials} aria-label="Social media">
                {social_links.filter((social) => social.link || social.url).map((social, index) => {
                  const Icon = socialIcons[social.platform?.toLowerCase().trim()] || Globe;
                  return (
                    <a
                      key={`${social.platform}-${index}`}
                      href={linkUrl(social.link || social.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={`${social.platform || "Social media"} (opens in a new tab)`}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {navigationSections.map((section, index) => (
            <nav key={`${section.title}-${index}`} className={styles.navigation} aria-label={`Footer ${section.title}`}>
              <Heading>{section.title}</Heading>
              <ul className={styles.list}>
                {[...(section.items || [])].sort((a, b) => (a.order || 0) - (b.order || 0)).map((item, itemIndex) => (
                  <li key={`${item.text}-${itemIndex}`}>
                    <Link href={linkUrl(item.url)} className={styles.navLink}>
                      <span>{item.text}</span>
                      <ArrowUpRight size={13} aria-hidden="true" className={styles.arrow} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Modern Institute of Automation <span aria-hidden="true">•</span> All Rights Reserved.</p>
          {legalLinks.length > 0 && (
            <nav className={styles.legal} aria-label="Legal">
              {legalLinks.map((item, index) => <Link key={`${item.text}-${index}`} href={linkUrl(item.url)}>{item.text}</Link>)}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}

