import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Download, Tag, ArrowRight } from "lucide-react";
import { normalizeImageUrl } from "@/lib/api";

export default function AnnouncementCard({ announcement }) {
  const {
    title,
    slug,
    publish_date,
    short_description,
    category_name,
    attachment,
  } = announcement;


  const formattedDate = new Date(publish_date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fileUrl = attachment ? normalizeImageUrl(attachment) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="p-6 flex-grow">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            <Tag size={12} />
            {category_name}
          </span>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <Calendar size={14} />
            {formattedDate}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
          {short_description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
        {fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-bold transition-colors"
          >
            <Download size={16} />
            Download PDF
          </a>
        ) : (
          <div className="w-1" />
        )}
        
        <Link 
          href={`/announcements/${slug}`}
          className="flex items-center gap-1.5 text-gray-400 group-hover:text-blue-600 text-sm font-semibold transition-all"
        >
          Details
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>
    </motion.div>
  );
}
