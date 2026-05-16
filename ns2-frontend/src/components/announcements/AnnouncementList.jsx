"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAnnouncements, fetchAnnouncementCategories } from "@/lib/api";
import AnnouncementCard from "./AnnouncementCard";
import { Search, Filter, RefreshCcw } from "lucide-react";

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        const [annData, catData] = await Promise.all([
          fetchAnnouncements(),
          fetchAnnouncementCategories(),
        ]);
        setAnnouncements(annData);
        setCategories(catData);
      } catch (err) {
        setError("Failed to load announcements. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    async function filterAnnouncements() {
      setIsLoading(true);
      try {
        const data = await fetchAnnouncements(selectedCategory);
        setAnnouncements(data);
      } catch (err) {
        setError("Failed to filter announcements.");
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedCategory !== null) {
        filterAnnouncements();
    }
  }, [selectedCategory]);

  const filteredAnnouncements = announcements.filter((ann) =>
    ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.short_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 md:py-24 bg-white min-h-[600px]">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Filters Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Notice Board</h2>
            <p className="text-gray-500">Stay updated with our latest news and events</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar w-full sm:w-auto">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.slug
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-blue-600 mb-4"
            >
              <RefreshCcw size={40} />
            </motion.div>
            <p className="text-gray-500 animate-pulse">Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Try Reloading
            </button>
          </div>
        ) : filteredAnnouncements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAnnouncements.map((ann) => (
                <AnnouncementCard key={ann.id} announcement={ann} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <Filter size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
