"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";


export default function AnnouncementHero() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] flex items-center overflow-hidden bg-[#0B3A6E]">
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3A6E] to-[#0E4C92] opacity-90" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500 rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-blue-200 mb-6 bg-white/5 w-fit px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={14} />
              Home
            </Link>
            <ChevronRight size={14} className="text-blue-400" />
            <span className="text-white font-medium">Announcements</span>
          </motion.nav>


          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Announcements</span> & Updates
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-100 text-lg md:text-xl opacity-90 max-w-xl leading-relaxed"
          >
            Stay informed about the latest developments, upcoming batches, events, and important notices from Modern Institute of Automation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
