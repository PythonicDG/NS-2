import { fetchAnnouncementBySlug, normalizeImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import { Calendar, Download, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import AnnouncementHero from "@/components/announcements/AnnouncementHero";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const announcement = await fetchAnnouncementBySlug(slug);
  if (!announcement) return { title: "Not Found" };

  return {
    title: `MIA | ${announcement.title}`,
    description: announcement.short_description,
  };
}

export default async function AnnouncementDetailPage({ params }) {
  const { slug } = await params;
  const announcement = await fetchAnnouncementBySlug(slug);

  if (!announcement) {
    notFound();
  }

  const formattedDate = new Date(announcement.publish_date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fileUrl = announcement.attachment ? normalizeImageUrl(announcement.attachment) : null;

  return (
    <main className="min-h-screen bg-white">
      <AnnouncementHero />
      
      <div className="container mx-auto px-6 lg:px-16 py-12 md:py-20">
        <Link 
          href="/announcements" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-10 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Announcements
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest">
                <Tag size={14} />
                {announcement.category_name}
              </span>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <Calendar size={18} />
                {formattedDate}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
              {announcement.title}
            </h1>

            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
              >
                <Download size={20} />
                Download Attached File
              </a>
            )}
          </div>

          <hr className="border-gray-100 mb-10" />

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl font-medium text-gray-900 mb-8 italic border-l-4 border-orange-500 pl-6 py-2 bg-orange-50/30">
              {announcement.short_description}
            </p>
            
            {announcement.full_description ? (
              <div dangerouslySetInnerHTML={{ __html: announcement.full_description.replace(/\n/g, '<br />') }} />
            ) : (
              <p>No further details available for this announcement.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
