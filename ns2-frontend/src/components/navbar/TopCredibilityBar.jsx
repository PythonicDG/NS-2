import { normalizeImageUrl } from "@/lib/api";

export default function TopCredibilityBar({ stats, socialLinks }) {
  // Filter out "top companies" related stats as requested
  const filteredStats = stats?.filter(stat => 
    !stat.label?.toLowerCase().includes("placed") && 
    !stat.sub_label?.toLowerCase().includes("top companies")
  ) || [];

  return (
    <div className="w-full bg-[#111111] text-white/90 py-1.5 border-b border-white/5">
      <div className="container mx-auto px-4 flex justify-between items-center gap-4 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
        {/* Left: Statistics */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          {filteredStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-[#C2481F] text-xs sm:text-sm">{stat.icon}</span>
              <span>
                {stat.label} <b className="text-white">{stat.value}</b> {stat.sub_label}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Social Links */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center gap-3 sm:gap-4 border-l border-white/10 pl-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-70 transition-all duration-300 transform hover:scale-110"
                aria-label={social.platform || `social-${idx}`}
              >
                {social.icon ? (
                  <img
                    src={normalizeImageUrl(social.icon)}
                    alt={social.platform || "Social icon"}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                  />
                ) : (
                  <span className="text-[10px]">{social.platform}</span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
