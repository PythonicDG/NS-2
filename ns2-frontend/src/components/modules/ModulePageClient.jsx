"use client";

import { useEffect } from "react";
import ModulePageBanner from "./ModulePageBanner";
import ModuleCourseOverview from "./ModuleCourseOverview";
import ModuleKeyHighlights from "./ModuleKeyHighlights";
import ModuleSubjectsCovered from "./ModuleSubjectsCovered";
import ModuleEligibilityCriteria from "./ModuleEligibilityCriteria";
import ModuleFeesBatchDetails from "./ModuleFeesBatchDetails";
import ModuleFaculty from "./ModuleFaculty";
import ModulePastResults from "./ModulePastResults";
import ModuleTestimonials from "./ModuleTestimonials";
import ModuleCTA from "./ModuleCTA";
import FAQSection from "@/components/homepage/FAQSection";

/**
 * Section type to component mapping (mirrors ServicesPageClient pattern).
 */
const SECTION_COMPONENTS = {
  PAGE_BANNER: ModulePageBanner,
  COURSE_OVERVIEW: ModuleCourseOverview,
  KEY_HIGHLIGHTS: ModuleKeyHighlights,
  SUBJECTS_COVERED: ModuleSubjectsCovered,
  ELIGIBILITY_CRITERIA: ModuleEligibilityCriteria,
  FEES_BATCH_DETAILS: ModuleFeesBatchDetails,
  FACULTY: ModuleFaculty,
  PAST_RESULTS: ModulePastResults,
  TESTIMONIALS: ModuleTestimonials,
  CTA: ModuleCTA,
  FAQ: FAQSection,
};

export default function ModulePageClient({ moduleData }) {
  if (!moduleData) return null;

  const { title, tagline, sections = [] } = moduleData;

  // Scroll-based fade-in animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("module-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".module-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="bg-white" id="module-detail-page">
      {sections
        .filter((section) => section.is_active)
        .map((section) => {
          const Component = SECTION_COMPONENTS[section.section_type];
          if (!Component) return null;

          // FAQ uses 'data' prop; all others use 'data' too
          return (
            <div key={section.id || section.order} className="module-animate module-fade-up">
              <Component data={section} moduleTitle={title} moduleTagline={tagline} />
            </div>
          );
        })}

      <style jsx global>{`
        .module-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .module-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .module-stagger-1 { transition-delay: 0.1s; }
        .module-stagger-2 { transition-delay: 0.2s; }
        .module-stagger-3 { transition-delay: 0.3s; }
        .module-stagger-4 { transition-delay: 0.4s; }
        .module-stagger-5 { transition-delay: 0.5s; }
        .module-stagger-6 { transition-delay: 0.6s; }
      `}</style>
    </main>
  );
}
