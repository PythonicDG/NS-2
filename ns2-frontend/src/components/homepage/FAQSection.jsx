import FAQAccordion from "./FAQAccordion";

export default function FAQSection({ data }) {
  if (!data || !data?.content_items?.length) return null;

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          style={{ color: "#C2481F" }}
        >
          {data.heading}
        </h2>
        {data.subheading && (
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            {data.subheading}
          </p>
        )}
      </div>

      <div className="mt-10 max-w-3xl mx-auto space-y-4">
        <FAQAccordion items={data.content_items} />
      </div>
    </section>
  );
}
