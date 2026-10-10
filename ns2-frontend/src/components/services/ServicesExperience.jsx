"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Plus,
  Factory,
  Wrench,
  Users,
  Target,
  ShieldCheck,
  Phone,
  MessageCircle,
  MapPin,
  X,
} from "lucide-react";
import styles from "./ServicesExperience.module.css";

const icons = {
  factory: Factory,
  wrench: Wrench,
  users: Users,
  target: Target,
  shield: ShieldCheck,
};
const number = (index) => String(index + 1).padStart(2, "0");

export default function ServicesExperience({ data }) {
  const [selected, setSelected] = useState(0);
  const [inquiryService, setInquiryService] = useState(
    data.services[0]?.title || "General partnership"
  );
  const dialog = useRef(null);
  const reduceMotion = useReducedMotion();
  const { hero, partners, services, pillars, contact } = data;
  const service = services[selected];
  const whatsapp = `https://wa.me/${contact.whatsapp_phone}`;
  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reduceMotion ? 0 : 0.5 },
  };

  function openInquiry() {
    setInquiryService(service?.title || "General partnership");
    dialog.current?.showModal();
  }
  function prepareInquiry(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const message = `Hello ${contact.contact_name}, I would like to discuss ${fields.get("service")} with the MIA alliance.\nName: ${fields.get("name")}\nCompany: ${fields.get("company") || "Not specified"}\nContact: ${fields.get("phone")}\nRequirement: ${fields.get("requirement")}`;
    // A visible handoff means no inquiry is reported as saved or delivered.
    window.location.assign(`${whatsapp}?text=${encodeURIComponent(message)}`);
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="services-heading">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.heroTop}>
            <span>SERVICES / INDUSTRIAL ALLIANCE</span>
            <span>
              <i /> CONNECTED EXPERTISE
            </span>
          </div>
          <div className={styles.heroLayout}>
            <motion.div {...reveal} className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <span />
                {hero.eyebrow}
              </div>
              <h1 id="services-heading">{hero.heading}</h1>
              <p>{hero.subheading}</p>
              <div className={styles.actions}>
                <button className={styles.primary} onClick={openInquiry}>
                  Discuss your requirement <ArrowUpRight size={19} />
                </button>
                <a href="#capabilities" className={styles.textLink}>
                  Explore our capabilities <ArrowRight size={18} />
                </a>
              </div>
              <div className={styles.heroTags}>
                {hero.partner_tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
            {hero.image ? (
              <motion.figure {...reveal} className={styles.heroPhotography}>
                <img
                  src={hero.image}
                  alt={
                    hero.image_alt ||
                    "Industrial automation equipment and practical training"
                  }
                  width={720}
                  height={960}
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    objectPosition: hero.image_position || "center center",
                  }}
                />
                <div className={styles.photoIndex} aria-hidden="true">
                  <span>MIA / INDUSTRIAL EXPERTISE</span>
                  <span>01 — 04</span>
                </div>
                <figcaption className={styles.heroPhotoCaption}>
                  <div className={styles.photoAlliance}>
                    {partners.map((partner, index) => (
                      <span key={partner.code}>
                        {index > 0 && <small>×</small>}
                        {partner.code}
                      </span>
                    ))}
                  </div>
                  {hero.image_caption && <p>{hero.image_caption}</p>}
                </figcaption>
              </motion.figure>
            ) : (
              <motion.div {...reveal} className={styles.blueprint}>
                <div className={styles.drawingHeader}>
                  <span>ALLIANCE / SYSTEM OVERVIEW</span>
                  <span>REV. 01</span>
                </div>
                <div className={styles.orbit} aria-hidden="true">
                  <div className={styles.orbitInner} />
                  <span className={styles.orbitCross}>+</span>
                </div>
                <div
                  className={styles.allianceMark}
                  aria-label={partners.map((p) => p.code).join(" plus ")}
                >
                  {partners.map((partner, index) => (
                    <span
                      key={partner.code}
                      className={
                        partner.code === "MIA" ? styles.centralBrand : ""
                      }
                    >
                      {index > 0 && <small>+</small>}
                      {partner.code}
                    </span>
                  ))}
                </div>
                <div className={styles.drawingLabel}>
                  ONE ALLIANCE.
                  <br />
                  <strong>FROM SKILL TO SYSTEM.</strong>
                </div>
                <div className={styles.floatingTag}>PLC / SCADA</div>
                <div className={styles.floatingTagBottom}>PEOPLE + PROCESS</div>
                <div className={styles.drawingFooter}>
                  <span>ENGINEER → ENABLE → EMPLOY</span>
                  <span>↗</span>
                </div>
              </motion.div>
            )}
          </div>
          <div className={styles.partnerStrip}>
            {partners.map((partner, index) => (
              <motion.article
                {...reveal}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
                className={styles.partner}
                key={partner.code}
              >
                <div className={styles.partnerBrand}>
                  {partner.logo ? (
                    <img src={partner.logo} alt={`${partner.code} logo`} />
                  ) : (
                    <strong>{partner.code}</strong>
                  )}
                  <span>{partner.tagline}</span>
                </div>
                <h2>{partner.name}</h2>
                <p>{partner.credentials}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section
          className={`${styles.capabilities} ${styles.shell}`}
          id="capabilities"
          aria-labelledby="capability-heading"
        >
          <motion.div {...reveal} className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>01 / OUR CAPABILITIES</span>
              <h2 id="capability-heading">
                The right expertise.
                <br />
                <em>At every stage.</em>
              </h2>
            </div>
            <p>
              Develop your people. Improve your systems. Build your next team.
              Choose the pathway that fits your requirement.
            </p>
          </motion.div>
          <div className={styles.showcase}>
            <div
              role="tablist"
              aria-label="Service pathways"
              className={styles.serviceTabs}
            >
              {services.map((item, index) => (
                <button
                  key={item.slug}
                  role="tab"
                  id={`service-tab-${index}`}
                  aria-controls="service-panel"
                  aria-selected={selected === index}
                  tabIndex={selected === index ? 0 : -1}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => {
                    const changes = {
                      ArrowDown: 1,
                      ArrowRight: 1,
                      ArrowUp: -1,
                      ArrowLeft: -1,
                    };
                    let next;
                    if (event.key in changes)
                      next =
                        (index + changes[event.key] + services.length) %
                        services.length;
                    if (event.key === "Home") next = 0;
                    if (event.key === "End") next = services.length - 1;
                    if (next !== undefined) {
                      event.preventDefault();
                      setSelected(next);
                      document.getElementById(`service-tab-${next}`)?.focus();
                    }
                  }}
                  className={selected === index ? styles.activeTab : ""}
                >
                  <span className={styles.tabNumber}>{number(index)}</span>
                  <span>
                    <small>{item.audience}</small>
                    <strong>{item.short_title}</strong>
                  </span>
                  <ArrowUpRight size={19} />
                </button>
              ))}
              <div className={styles.selectorNote}>
                <span /> FOUR PATHWAYS. ONE PARTNERSHIP.
              </div>
            </div>
            <div
              role="tabpanel"
              id="service-panel"
              aria-labelledby={`service-tab-${selected}`}
              tabIndex={0}
              className={styles.panel}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                >
                  {service.image && (
                    <figure className={styles.servicePhotography}>
                      <img
                        src={service.image}
                        alt={service.image_alt || service.title}
                        width={900}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        style={{
                          objectPosition:
                            service.image_position || "center center",
                        }}
                      />
                      {service.image_caption && (
                        <figcaption>{service.image_caption}</figcaption>
                      )}
                    </figure>
                  )}
                  <div className={styles.panelTop}>
                    <span>{service.audience}</span>
                    <span>CAPABILITY / {number(selected)}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>
                  <div className={styles.specs}>
                    {service.specs.map((spec) => (
                      <span key={spec}>{spec}</span>
                    ))}
                  </div>
                  <div className={styles.outcome}>
                    <Check size={18} />
                    <span>{service.outcome}</span>
                  </div>
                  <details
                    className={styles.deliverables}
                    key={service.slug}
                    open
                  >
                    <summary>
                      Inside this engagement <Plus size={17} />
                    </summary>
                    <ul>
                      {service.deliverables.map((item) => (
                        <li key={item}>
                          <ArrowRight size={14} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                  <button className={styles.panelCta} onClick={openInquiry}>
                    Let’s discuss {service.title.toLowerCase()}{" "}
                    <ArrowUpRight size={19} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {pillars.length > 0 && (
        <section
          className={styles.valueSection}
          aria-labelledby="value-heading"
        >
          <div className={styles.shell}>
            <motion.div {...reveal} className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>02 / WHY PARTNER WITH US</span>
                <h2 id="value-heading">
                  Built for the realities
                  <br />
                  of <em>your industry.</em>
                </h2>
              </div>
              <p>
                Practical expertise. Clearly scoped work. People you can speak
                to. A partnership built around what comes next.
              </p>
            </motion.div>
            <div className={styles.valueGrid}>
              {pillars.map((pillar, index) => {
                const Icon = icons[pillar.icon] || ShieldCheck;
                return (
                  <motion.article
                    {...reveal}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      delay: reduceMotion ? 0 : index * 0.06,
                    }}
                    key={pillar.title}
                    className={styles.pillar}
                  >
                    <div className={styles.pillarTop}>
                      <Icon size={25} />
                      <span>{number(index)}</span>
                    </div>
                    <div className={styles.metric}>
                      {pillar.metric}
                      <span>{pillar.metric_label}</span>
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                    <div className={styles.commitment}>
                      <Check size={14} />
                      <span>{pillar.commitment}</span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <p className={styles.scopeNote}>
              Delivery milestones are agreed for each engagement. Hiring and
              placement outcomes depend on role requirements, candidate
              suitability and employer selection.
            </p>
          </div>
        </section>
      )}

      <section
        className={`${styles.contactSection} ${styles.shell}`}
        id="corporate-inquiry"
        aria-labelledby="contact-heading"
      >
        <motion.div {...reveal} className={styles.contactCopy}>
          <span className={styles.kicker}>03 / START A CONVERSATION</span>
          <h2 id="contact-heading">{contact.inquiry_heading}</h2>
          <p>
            A team to upskill, a system to troubleshoot or a role to fill? Tell
            us what you’re working on.
          </p>
          <button className={styles.primary} onClick={openInquiry}>
            Start a quick inquiry <ArrowUpRight size={19} />
          </button>
          <span className={styles.contactNote}>
            A few details. A more useful first conversation.
          </span>
        </motion.div>
        <motion.div {...reveal} className={styles.contactCard}>
          <div className={styles.contactCardTop}>
            <span>YOUR DIRECT POINT OF CONTACT</span>
            <ArrowUpRight size={20} />
          </div>
          <div className={styles.contactIdentity}>
            <span className={styles.avatar}>
              {contact.contact_name
                .split(" ")
                .filter(Boolean)
                .map((name) => name[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <h3>{contact.contact_name}</h3>
              <p>{contact.contact_role}</p>
            </div>
          </div>
          <a className={styles.phone} href={`tel:+91${contact.primary_phone}`}>
            <Phone size={20} />
            {contact.primary_phone}
            <ArrowUpRight size={18} />
          </a>
          <a
            className={styles.phone}
            href={`tel:+91${contact.secondary_phone}`}
          >
            <Phone size={20} />
            {contact.secondary_phone}
            <ArrowUpRight size={18} />
          </a>
          <a
            className={styles.whatsapp}
            href={`${whatsapp}?text=${encodeURIComponent("Hello, I would like to discuss an industrial services requirement with MIA.")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} /> Connect on WhatsApp{" "}
            <ArrowUpRight size={18} />
          </a>
          <div className={styles.location}>
            <MapPin size={17} />
            {contact.location}
          </div>
        </motion.div>
      </section>
      <div className={styles.bottomLine}>
        <div className={styles.shell}>
          <span>MIA × AES × ADS</span>
          <span>CAPABILITY THAT MOVES INDUSTRY FORWARD.</span>
        </div>
      </div>

      <dialog
        ref={dialog}
        className={styles.dialog}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
        aria-labelledby="inquiry-title"
      >
        <div className={styles.dialogInner}>
          <button
            className={styles.close}
            aria-label="Close inquiry"
            onClick={() => dialog.current.close()}
          >
            <X size={23} />
          </button>
          <span className={styles.kicker}>LET’S GET TO WORK</span>
          <h2 id="inquiry-title">
            Your requirement.
            <br />
            Our next conversation.
          </h2>
          <p>
            Prepare a message for {contact.contact_name}. You’ll review and send
            it in WhatsApp.
          </p>
          <form onSubmit={prepareInquiry}>
            <div className={styles.formRow}>
              <label>
                Your name
                <input
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  required
                  pattern={"\\+?[0-9 ]{7,20}"}
                  maxLength={20}
                  autoComplete="tel"
                />
              </label>
            </div>
            <label>
              Company / organisation <span>(optional)</span>
              <input
                name="company"
                maxLength={160}
                autoComplete="organization"
              />
            </label>
            <label>
              I’m interested in
              <select
                name="service"
                value={inquiryService}
                onChange={(event) => setInquiryService(event.target.value)}
              >
                {services.map((item) => (
                  <option key={item.slug}>{item.title}</option>
                ))}
                <option>General partnership</option>
              </select>
            </label>
            <label>
              What do you need?
              <textarea
                name="requirement"
                required
                minLength={10}
                maxLength={1500}
                rows={3}
                placeholder="Tell us about your team, project or hiring requirement…"
              />
            </label>
            <button className={styles.primary} type="submit">
              <MessageCircle size={18} /> Continue to WhatsApp{" "}
              <ArrowUpRight size={18} />
            </button>
            <small className={styles.formNote}>
              These details are included in your WhatsApp message. This form
              does not store them on our website.
            </small>
          </form>
        </div>
      </dialog>
    </div>
  );
}
