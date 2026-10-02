import Image from "next/image";
import { CheckCircle2, Cpu, GraduationCap, Wrench } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";
import styles from "./WhyChooseUs.module.css";

const icons = [Wrench, Cpu, GraduationCap, CheckCircle2];

export default function WhyChooseUs({ data }) {
  if (!data) return null;
  const items = (data.content_items || []).filter(
    (item) => item.is_active !== false
  );
  const image = normalizeImageUrl(data.primary_image || data.background_image);

  return (
    <section aria-labelledby="why-mia-title" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.introduction}>
          <p className={styles.label}>
            <span aria-hidden="true" />
            {data.super_heading || "Why choose us"}
          </p>
          <h2 id="why-mia-title" className={styles.heading}>
            {data.heading}
          </h2>
          {data.subheading && (
            <p className={styles.description}>{data.subheading}</p>
          )}
          {image && (
            <div className={styles.imageFrame}>
              <div className={styles.image}>
                <Image
                  src={image}
                  alt="Hands-on automation training at Modern Institute of Automation"
                  fill
                  sizes="(max-width: 1023px) 100vw, (max-width: 1280px) 38vw, 460px"
                  className="object-cover"
                />
              </div>
              <span className={styles.imageCorner} aria-hidden="true" />
            </div>
          )}
        </div>
        <div className={styles.benefitArea}>
          <div className={styles.technicalGrid} aria-hidden="true" />
          <div className={styles.benefits}>
            {items.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <article
                  key={item.id || `${item.title}-${index}`}
                  className={`${styles.benefit} ${index === 0 ? styles.featured : ""}`}
                >
                  <div className={styles.benefitTop}>
                    <span className={styles.number}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className={styles.icon}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className={styles.benefitTitle}>{item.title}</h3>
                  <p className={styles.benefitDescription}>
                    {item.description}
                  </p>
                  <span className={styles.underline} aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
