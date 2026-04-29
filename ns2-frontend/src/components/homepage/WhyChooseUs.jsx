import WhyChooseUsSlider from "./WhyChooseUsSlider";
import { CheckCircle, ShieldCheck, TrendingUp } from "lucide-react";

const iconMap = [CheckCircle, TrendingUp, ShieldCheck];

/**
 * WhyChooseUs Component
 * 
 * Renders a section highlighting key benefits and features of the institute.
 * Includes a text area with animated headings and a slider for showcasing items.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.data - Content data for headings and items
 * @returns {JSX.Element|null} The rendered WhyChooseUs section
 */
const WhyChooseUs = ({ data }) => {
  if (!data) return null;

  return (
    <section
      className="relative w-full py-16 sm:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #F8F9FA, #E9ECEF)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)', backgroundSize: '4px 4px' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch relative z-10">
        <div className="space-y-8 text-center lg:text-left flex flex-col justify-center animate-fade-in-up">
          {data.super_heading && (
            <h2
              className="font-semibold text-xs sm:text-sm uppercase tracking-widest relative inline-block after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:transition-all after:duration-500 hover:after:w-full transition-all duration-300 hover:tracking-widest"
              style={{ color: "#C2481F" }}
            >
              {data.super_heading}
            </h2>
          )}

          <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: "#C2481F", textShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
          >
            {data.heading.split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-500 hover:-translate-y-1"
              >
                {word}&nbsp;
              </span>
            ))}
          </h3>

          {data.subheading && (
            <p
              className="text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed italic"
              style={{ color: "#6C757D" }}
            >
              {data.subheading}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {data.content_items?.map((item, idx) => {
              const IconComponent = iconMap[idx % iconMap.length];
              return (
                <div
                  key={idx}
                  className="rounded-lg shadow-md p-6 hover:shadow-xl hover:border-[#C2481F]/20 border border-transparent transition-all transform hover:-translate-y-2 hover:scale-[1.02] duration-300 flex flex-col gap-4 group animate-fade-in-up"
                  style={{
                    backgroundColor: "#F8F9FA",
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                      style={{
                        background: "linear-gradient(135deg, #E0F0FF, #F8F9FA)",
                      }}
                    >
                      <IconComponent
                        className="w-6 h-6 flex-shrink-0"
                        style={{ color: "#C2481F" }}
                        title={item.title}
                      />
                    </div>
                    <h4
                      className="font-semibold text-lg transition-colors duration-300"
                      style={{ color: "#343A40" }}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p
                    className="text-sm sm:text-base"
                    style={{ color: "#6C757D" }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-full flex items-center justify-center animate-fade-in">
          <WhyChooseUsSlider contentItems={data.content_items} />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
