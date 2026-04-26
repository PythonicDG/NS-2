import KeyAchievementsClient from "./KeyAchievements.client";

/**
 * KeyAchievementsServer Component
 * 
 * A server component that renders the layout for key achievements,
 * using a client component for interactive elements.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.data - Achievement data from API
 */
export default function KeyAchievementsServer({ data }) {
  if (!data) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-[#F8F9FA] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 -ml-40 -mb-40" />

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="text-center mb-6">
          {data.super_heading && (
            <p className="text-[#C2481F] font-bold tracking-widest uppercase mb-2 text-sm">
              {data.super_heading}
            </p>
          )}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading text-gray-900 tracking-tighter uppercase mb-8">
            {data.heading || "Our Placed Engineers"}
          </h2>
          <div className="w-full max-w-5xl mx-auto h-[1px] border-b border-dashed border-blue-300 opacity-60" />
        </div>

        <KeyAchievementsClient items={data.content_items} />
      </div>
    </section>
  );
}
