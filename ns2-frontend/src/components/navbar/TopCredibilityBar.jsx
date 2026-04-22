import { Facebook, Instagram, Twitter, Youtube, MessageCircle, Send } from "lucide-react";

export default function TopCredibilityBar({ stats, socialLinks }) {
  // Filter out "top companies" related stats as requested
  const filteredStats = stats?.filter(stat => 
    !stat.label?.toLowerCase().includes("placed") && 
    !stat.sub_label?.toLowerCase().includes("top companies")
  ) || [];

  const getSocialIcon = (platform) => {
    const p = platform?.toLowerCase() || "";
    if (p.includes("facebook")) return <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    if (p.includes("instagram")) return <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    if (p.includes("twitter") || p.includes("x")) return <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    if (p.includes("youtube")) return <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" />;
    if (p.includes("whatsapp")) return <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    if (p.includes("linkedin")) return <div className="p-0.5 border border-current rounded-sm flex items-center justify-center text-[8px] font-bold">in</div>;
    if (p.includes("telegram")) return <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    
    return <span className="text-[10px] lowercase">{platform}</span>;
  };

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
          <div className="flex items-center gap-4 sm:gap-6 border-l border-white/10 pl-6">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C2481F] text-white/70 transition-all duration-300 transform hover:scale-110 flex items-center"
                aria-label={social.platform || `social-${idx}`}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
