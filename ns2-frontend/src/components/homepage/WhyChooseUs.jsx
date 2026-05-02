import WhyChooseUsSlider from "./WhyChooseUsSlider";
import { CheckCircle, ShieldCheck, TrendingUp } from "lucide-react";

const iconMap = [CheckCircle, TrendingUp, ShieldCheck];

const WhyChooseUs = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">

        {/* 🔥 FIXED GRID RATIO */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">

          {/* ================= LEFT (MORE SPACE) ================= */}
          <div className="lg:col-span-3 w-full">

            <h2 className="text-sm uppercase tracking-widest text-[#C2481F] mb-3">
              {data.super_heading}
            </h2>

            <h3 className="text-4xl lg:text-5xl font-bold text-[#C2481F] leading-tight mb-4">
              {data.heading}
            </h3>

            <p className="text-gray-500 text-lg mb-8 max-w-xl">
              {data.subheading}
            </p>

            {/* 🔥 NOW WILL FIT PERFECT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {data.content_items?.map((item, idx) => {
                const IconComponent = iconMap[idx % iconMap.length];

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between h-[230px]"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-gray-100">
                          <IconComponent
                            className="w-6 h-6"
                            style={{ color: "#C2481F" }}
                          />
                        </div>

                        <h4 className="font-semibold text-lg text-gray-800">
                          {item.title}
                        </h4>
                      </div>

                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* ================= RIGHT (LESS SPACE) ================= */}
          <div className="lg:col-span-2 flex justify-center">

            <div className="w-full max-w-[420px] h-[420px] rounded-xl overflow-hidden shadow-lg">
              <WhyChooseUsSlider contentItems={data.content_items} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;