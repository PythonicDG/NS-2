import HeroFloatingImages from "./HeroFloatingImages";

export default function HeroSection({ data }) {
  if (!data) return null;

  const heading = data?.heading;
  const highlighted = data?.highlighted_heading;
  const subheading = data?.subheading;
  const primaryBtn = data?.primary_button_text;
  const secondaryBtn = data?.secondary_button_text;

  const contentItems = (data?.content_items ?? []).filter(
    (item) => item.is_active
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-0 md:pt-0 pb-16 md:pb-20 min-h-screen">
      {/* Decorative background circles */}
      <div className="absolute -left-32 -top-20 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-[#C2481F]/30 to-transparent opacity-30 blur-3xl" />
      <div className="absolute -right-32 -bottom-28 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#C2481F]/20 to-transparent opacity-30 blur-2xl" />

      {/* Waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="absolute bottom-0 w-full h-[85vh]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#waveGradient1)"
            d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,213.3C672,235,768,245,864,229.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L0,320Z"
          />
          <defs>
            <linearGradient
              id="waveGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#C2481F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C2481F" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="absolute bottom-0 w-full h-[85vh]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#waveGradient2)"
            d="M0,288L60,277.3C120,267,240,245,360,213.3C480,181,600,139,720,133.3C840,128,960,160,1080,181.3C1200,203,1320,213,1380,218.7L1440,224L1440,320L0,320Z"
          />
          <defs>
            <linearGradient
              id="waveGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#C2481F" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C2481F" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center md:text-left">
            {contentItems.length > 0 && (
              <div className="mb-4 flex justify-center md:justify-start gap-3 flex-wrap">
                {contentItems.map((item, i) => (
                  <div
                    key={item.id || i}
                    className="w-9 h-9 rounded-[8px] flex items-center justify-center shadow bg-blue-50"
                  >
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={item.label || `icon-${i}`}
                        className="w-5 h-5 object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {heading && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                {heading}{" "}
                {highlighted && (
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C2481F] to-[#0056b3]">
                    {highlighted}
                  </span>
                )}
              </h1>
            )}

            {subheading && (
              <p className="mt-5 text-gray-600 max-w-xl mx-auto md:mx-0">
                {subheading}
              </p>
            )}

            {(primaryBtn || secondaryBtn) && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                {primaryBtn && (
                  <a
                    href={data?.primary_button_url ?? "#"}
                    className="px-6 py-3 rounded-[8px] bg-[#C2481F] text-white font-semibold shadow-lg hover:shadow-xl hover:bg-[#0056b3] transition"
                  >
                    {primaryBtn}
                  </a>
                )}
                {secondaryBtn && (
                  <a
                    href={data?.secondary_button_url ?? "#"}
                    className="px-5 py-3 rounded-[8px] bg-blue-50 text-[#C2481F] font-medium hover:bg-blue-100 shadow-sm border border-blue-200"
                  >
                    {secondaryBtn}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Floating Images Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <HeroFloatingImages
              primaryImage={data?.primary_image}
              secondaryImage={data?.background_image}
              overlayTitle={data?.overlay_title}
              overlayDescription={data?.overlay_description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
