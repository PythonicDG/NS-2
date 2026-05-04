import PlacedStudentsSlider from "./PlacedStudentsSlider";
import { GraduationCap } from "lucide-react";

/**
 * PlacedStudents Server Component
 *
 * Displays the "Our Placed Students" section on the homepage.
 * Shows a heading, subheading, and auto-scrolling placement cards.
 *
 * @param {Object} props
 * @param {Object} props.data - Section data from the homepage API
 */
export default function PlacedStudents({ data }) {
  if (!data) return null;

  return (
    <section
      id="placed-students"
      className="placed-section"
    >
      {/* Background decorative elements */}
      <div className="placed-section__bg-pattern" />
      <div className="placed-section__bg-glow placed-section__bg-glow--1" />
      <div className="placed-section__bg-glow placed-section__bg-glow--2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="placed-section__header">
          <div className="placed-section__icon-badge">
            <GraduationCap className="w-5 h-5" />
            <span>Our Placed Students</span>
          </div>

          <h2 className="placed-section__title">
            {data.heading || "Our Placed Students"}
          </h2>

          {data.subheading && (
            <p className="placed-section__subtitle">
              {data.subheading}
            </p>
          )}

          <div className="placed-section__divider" />
        </div>

        {/* Placement Cards Slider */}
        <PlacedStudentsSlider items={data.content_items || []} />
      </div>
    </section>
  );
}
