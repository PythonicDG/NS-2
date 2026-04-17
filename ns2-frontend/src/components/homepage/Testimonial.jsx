import TestimonialSlider from "./TestimonialSlider";

export default function Testimonial({ data }) {
  if (!data) return null;

  return (
    <section className="relative w-full bg-gradient-to-br from-white to-gray-50 mt-0 sm:mt-0 lg:mt-0 py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        {data.super_heading && (
          <h2 className="text-blue-600 font-semibold text-sm sm:text-base mb-2">
            {data.super_heading}
          </h2>
        )}
        <h3
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug"
          style={{ color: "#C2481F" }}
        >
          {data.heading}
        </h3>
        {data.subheading && (
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            {data.subheading}
          </p>
        )}

        <TestimonialSlider items={data.content_items || []} />
      </div>
    </section>
  );
}
