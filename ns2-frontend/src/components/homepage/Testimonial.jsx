import TestimonialSlider from "./TestimonialSlider";

export default function Testimonial({ data }) {
  if (!data) return null;

  // Section to display student testimonials and success stories
  return (
    <section className="relative w-full bg-white py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="mb-12 md:mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
            {data.heading || "What Our Students Say"}
          </h3>
          {data.subheading && (
            <p className="text-neutral-500 text-base md:text-lg max-w-3xl leading-relaxed">
              {data.subheading}
            </p>
          )}
        </div>

        <TestimonialSlider items={data.content_items || []} />
      </div>
    </section>
  );
}
