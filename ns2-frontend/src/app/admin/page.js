"use client";

import React, { useState, useEffect } from "react";
import { 
  Building, 
  Home, 
  Users, 
  GraduationCap, 
  Megaphone, 
  Inbox, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Upload, 
  Save, 
  HelpCircle, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  Eye, 
  ListFilter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically fetch absolute URL for the Django backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function AdminDashboardPage() {
  // Authentication Gate States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [activeTab, setActiveTab] = useState("company");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Core Data States
  const [companyProfile, setCompanyProfile] = useState(null);
  const [statistics, setStatistics] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [homepageSections, setHomepageSections] = useState([]);
  const [aboutSections, setAboutSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Course Page Sections Management States
  const [selectedCourseForSections, setSelectedCourseForSections] = useState(null);
  const [courseSections, setCourseSections] = useState([]);
  const [loadingCourseSections, setLoadingCourseSections] = useState(false);

  // Active Selections / Detail Modals / Edit Drawers
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [editCourse, setEditCourse] = useState(null);
  const [editCard, setEditCard] = useState(null); // Used for slides, placements, testimonials, FAQs
  const [editSection, setEditSection] = useState(null); // Direct Section settings (headings, background, primary)

  // Session Password Verification
  useEffect(() => {
    const auth = sessionStorage.getItem("mia_admin_authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "mia@admin2026") {
      sessionStorage.setItem("mia_admin_authenticated", "true");
      setIsAuthenticated(true);
      setPasswordError(false);
      showNotification("success", "Authenticated successfully!");
    } else {
      setPasswordError(true);
      showNotification("error", "Invalid administrator PIN.");
    }
  };

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Company details, Stats, and Social links from dynamic CRUD endpoint
      const companyRes = await runCrud("core.CompanyProfile", "list");
      setCompanyProfile(companyRes[0] || null);

      const statsRes = await runCrud("core.SiteStatistic", "list");
      setStatistics(statsRes);

      const socialRes = await runCrud("core.SocialLink", "list");
      setSocialLinks(socialRes);

      // 2. Fetch Homepage Sections
      const homeRes = await runCrud("homepage.PageSection", "list");
      setHomepageSections(homeRes);

      // 3. Fetch About Us Sections
      const aboutRes = await runCrud("aboutus.PageSection", "list");
      setAboutSections(aboutRes);

      // 4. Fetch Courses (Modules)
      const courseRes = await runCrud("modules.Module", "list");
      setCourses(courseRes);

      // 5. Fetch Announcements & Categories
      const announceRes = await runCrud("announcements.Announcement", "list");
      setAnnouncements(announceRes);

      const catRes = await runCrud("announcements.AnnouncementCategory", "list");
      setCategories(catRes);

      // 6. Fetch Form Inquiries
      const inboxRes = await runCrud("core.ContactMessage", "list");
      setInquiries(inboxRes);

    } catch (err) {
      console.error("Error loading CMS data:", err);
      showNotification("error", "Failed to fetch dashboard data. Please ensure Django is running.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch course specific sections
  const fetchCourseSections = async (courseId) => {
    setLoadingCourseSections(true);
    try {
      const res = await runCrud("modules.PageSection", "list", { filter_module: courseId });
      setCourseSections(res);
    } catch (err) {
      console.error("Error loading course sections:", err);
      showNotification("error", "Failed to fetch course page sections.");
    } finally {
      setLoadingCourseSections(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Generic Dynamic REST CRUD Helper
  const runCrud = async (model, action, payload = {}) => {
    const formData = new FormData();
    formData.append("model", model);
    formData.append("action", action);

    // Append simple object payload items
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const res = await fetch(`${API_BASE_URL}/api/admin-crud/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "API Failure");
    }

    return await res.json();
  };

  // Helper notification dispatcher
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. UPDATE COMPANY PROFILE SUBMIT
  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData(e.target);
      const payload = {};
      data.forEach((val, key) => {
        payload[key] = val;
      });

      if (companyProfile?.id) {
        payload.id = companyProfile.id;
        const res = await runCrud("core.CompanyProfile", "update", payload);
        setCompanyProfile(res);
      } else {
        const res = await runCrud("core.CompanyProfile", "create", payload);
        setCompanyProfile(res);
      }
      showNotification("success", "Company profile details updated successfully!");
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to update profile settings.");
    } finally {
      setSaving(false);
    }
  };

  // 2. CARD CRUD OPERATIONS (slides, placements, testimonials, FAQs)
  const handleSaveCard = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = e.target;
      const data = new FormData(form);
      const payload = {};
      
      data.forEach((val, key) => {
        if (key === "image" || key === "icon" || key === "brochures") {
          if (val.size > 0) payload[key] = val; // Include files only if new file uploaded
        } else {
          payload[key] = val;
        }
      });

      // Add parent section association
      payload.section = editCard.sectionId;

      let res;
      if (editCard.id) {
        payload.id = editCard.id;
        res = await runCrud(editCard.model, "update", payload);
        showNotification("success", "Card item updated successfully!");
      } else {
        res = await runCrud(editCard.model, "create", payload);
        showNotification("success", "New card item added successfully!");
      }

      // Refresh list
      fetchData();
      if (selectedCourseForSections) {
        fetchCourseSections(selectedCourseForSections.id);
      }
      setEditCard(null);
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to save card data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCard = async (model, id) => {
    if (!confirm("Are you sure you want to delete this content item?")) return;
    try {
      await runCrud(model, "delete", { id });
      showNotification("success", "Item deleted.");
      fetchData();
      if (selectedCourseForSections) {
        fetchCourseSections(selectedCourseForSections.id);
      }
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to delete item.");
    }
  };

  // 3. COURSE CRUD
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = e.target;
      const data = new FormData(form);
      const payload = {};
      
      data.forEach((val, key) => {
        if (key === "thumbnail" || key === "brochure" || key === "syllabus") {
          if (val.size > 0) payload[key] = val;
        } else {
          payload[key] = val;
        }
      });

      if (editCourse.id) {
        payload.id = editCourse.id;
        await runCrud("modules.Module", "update", payload);
        showNotification("success", "Course module updated successfully!");
      } else {
        await runCrud("modules.Module", "create", payload);
        showNotification("success", "New Course module added successfully!");
      }

      fetchData();
      setEditCourse(null);
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to save course module.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm("Delete this course and all its modules content?")) return;
    try {
      await runCrud("modules.Module", "delete", { id });
      showNotification("success", "Course deleted successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to delete course.");
    }
  };

  // 4. SECTION-LEVEL HEADINGS & MEDIA CONFIGURATION
  const handleSaveSection = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = e.target;
      const data = new FormData(form);
      const payload = {};
      
      data.forEach((val, key) => {
        if (key === "background_image" || key === "primary_image" || key === "brochure" || key === "syllabus") {
          if (val.size > 0) payload[key] = val;
        } else {
          payload[key] = val;
        }
      });

      payload.id = editSection.data.id;

      await runCrud(editSection.model, "update", payload);
      showNotification("success", "Section settings updated successfully!");
      
      // Refresh list
      fetchData();
      if (selectedCourseForSections) {
        fetchCourseSections(selectedCourseForSections.id);
      }
      setEditSection(null);
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to save section settings.");
    } finally {
      setSaving(false);
    }
  };

  // Normalize media paths to point cleanly back to Django local dev media server
  const getMediaUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  // Tab List Definitions
  const tabs = [
    { id: "company", label: "Company Profile", icon: Building },
    { id: "homepage", label: "Homepage Sections", icon: Home },
    { id: "about", label: "About Page", icon: Users },
    { id: "courses", label: "Courses & Programs", icon: GraduationCap },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "inbound", label: "Inbox Messages", icon: Inbox },
  ];

  // RENDER SECURITY PASSWORD ACCESS GATE
  if (!isAuthenticated) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-950 relative overflow-hidden px-4">
        {/* Glow rings */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative z-10 space-y-6 text-center"
        >
          <div className="mx-auto h-16 w-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-orange-600/30">
            MIA
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-wide">Administrator Identity Gate</h2>
            <p className="text-xs text-slate-400 font-medium">Please authenticate to access MIA website visual content management.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-2 text-left relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block pl-1">Administrator PIN</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-950/80 border text-center text-lg tracking-widest text-white rounded-xl py-3.5 focus:outline-none transition ${
                  passwordError 
                    ? "border-rose-500/50 focus:border-rose-500 shadow-lg shadow-rose-950/20" 
                    : "border-slate-850 focus:border-orange-500 shadow-inner"
                }`}
              />
              {passwordError && (
                <p className="text-[10px] text-rose-400 font-bold text-center mt-1 animate-pulse">
                  Invalid Administrator PIN. Access Denied.
                </p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-3.5 rounded-xl cursor-pointer shadow-lg shadow-orange-600/20 transition-all duration-300 transform active:scale-95"
            >
              Verify Credentials
            </button>
          </form>

          <p className="text-[9px] text-slate-500 pt-2">
            Default pin is: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-orange-400/80 font-mono">mia@admin2026</code>
          </p>
        </motion.div>
      </div>
    );
  }

  // RENDER SECURE CORE DASHBOARD WORKSPACE
  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-950 relative">
      
      {/* Dynamic Notifications Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
              notification.type === "success" 
                ? "bg-emerald-950/95 border-emerald-500/30 text-emerald-300"
                : "bg-rose-950/95 border-rose-500/30 text-rose-300"
            }`}
          >
            {notification.type === "success" ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <AlertCircle className="h-5 w-5 text-rose-400" />}
            <span className="text-sm font-semibold">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Sidebar Tabs */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-6 select-none shrink-0 h-full overflow-y-auto">
        <div className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Workspace Navigation</div>
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedCourseForSections(null); // Reset course section focus
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left ${
                  isActive 
                    ? "bg-orange-650 text-white shadow-lg shadow-orange-600/20" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Icon className="h-5 w-5 animate-pulse" />
                <span>{tab.label}</span>
                {tab.id === "inbound" && inquiries.length > 0 && (
                  <span className="ml-auto bg-orange-650 text-white px-2 py-0.5 rounded-full text-[10px] font-bold border border-orange-500 shadow-md">
                    {inquiries.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-slate-800 pt-6">
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-350">A</div>
            <div>
              <p className="text-xs font-bold text-white">System Admin</p>
              <p className="text-[10px] text-slate-500">Local CMS Session</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Primary Workspace Panels */}
      <section className="flex-1 p-8 overflow-y-auto max-w-6xl mx-auto w-full">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 border-4 border-t-orange-500 border-r-slate-800 border-b-slate-800 border-l-slate-800 rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400 animate-pulse font-medium">Initializing modern MIA workspace...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 1. COMPANY PROFILE TAB */}
            {activeTab === "company" && (
              <div className="space-y-8">
                <div className="border-b border-slate-800 pb-5">
                  <h2 className="text-2xl font-bold text-white">Company Profile & Branding</h2>
                  <p className="text-slate-400 text-sm mt-1">Configure your institute logos, metadata cover images, contact channels, and physical address.</p>
                </div>

                <form onSubmit={handleUpdateCompany} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Institute Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      defaultValue={companyProfile?.name || ""} 
                      required 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Institute Tagline</label>
                    <input 
                      type="text" 
                      name="tagline" 
                      defaultValue={companyProfile?.tagline || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Marketing Description</label>
                    <textarea 
                      name="description" 
                      rows="4" 
                      defaultValue={companyProfile?.description || ""} 
                      required 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Primary Contact Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      defaultValue={companyProfile?.email || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Primary Contact Phone</label>
                    <input 
                      type="text" 
                      name="phone" 
                      defaultValue={companyProfile?.phone || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Office Physical Address</label>
                    <textarea 
                      name="address" 
                      rows="2" 
                      defaultValue={companyProfile?.address || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Google Maps Embed URL</label>
                    <input 
                      type="text" 
                      name="google_maps_url" 
                      defaultValue={companyProfile?.google_maps_url || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Copyright Text</label>
                    <input 
                      type="text" 
                      name="copyright_text" 
                      defaultValue={companyProfile?.copyright_text || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Credits Text</label>
                    <input 
                      type="text" 
                      name="credits_text" 
                      defaultValue={companyProfile?.credits_text || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition" 
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end pt-4">
                    <button 
                      type="submit" 
                      disabled={saving}
                      className="bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-600/20 cursor-pointer disabled:opacity-50 transition"
                    >
                      <Save className="h-4 w-4" />
                      {saving ? "Saving changes..." : "Save Institute Profile"}
                    </button>
                  </div>
                </form>


              </div>
            )}

            {/* 2. HOMEPAGE TAB */}
            {activeTab === "homepage" && (
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-slate-800 pb-5">
                  <h2 className="text-2xl font-bold text-white">Homepage Layout Customization</h2>
                  <p className="text-slate-400 text-sm mt-1">Expose and edit only the core marketing slides, placement successes, testimonials, and FAQs.</p>
                        {(() => {
                  const sortedHomepageSections = [...homepageSections].sort((a, b) => {
                    const normA = (a.section_type || "").toUpperCase().replace(/\s/g, "_");
                    const normB = (b.section_type || "").toUpperCase().replace(/\s/g, "_");
                    
                    const getOrderIndex = (normType) => {
                      if (normType.includes("HERO")) return 0;
                      if (normType.includes("OVERVIEW")) return 1;
                      if (normType.includes("WHY_CHOOSE_US") || normType.includes("WHYCHOOSEUS")) return 2;
                      if (normType.includes("SERVICES") || normType.includes("OUR_SERVICES")) return 3;
                      if (normType.includes("ACHIEVEMENTS") || normType.includes("KEY_ACHIEVEMENTS")) return 4;
                      if (normType.includes("PLACED") || normType.includes("OUR_PLACED_STUDENTS")) return 5;
                      if (normType.includes("TESTIMONIAL") || normType.includes("TESTIMONIALS")) return 6;
                      if (normType.includes("CTA") || normType.includes("CALL_TO_ACTION")) return 7;
                      if (normType.includes("FAQ") || normType.includes("QUESTION")) return 8;
                      if (normType.includes("CONTACT")) return 9;
                      return 999;
                    };
                    
                    return getOrderIndex(normA) - getOrderIndex(normB);
                  });

                  return sortedHomepageSections.map((section) => {
                    const normType = (section.section_type || "").toUpperCase().replace(/\s/g, "_");

                    // 1. HERO SLIDER CUSTOM VIEW
                    if (normType.includes("HERO")) {
                      return (
                        <div key={section.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-orange-500" />
                                Hero Banner Carousel
                              </h3>
                              <p className="text-xs text-slate-400 mt-0.5">Landscape slideshow slides. Add or remove high-quality cover images.</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditSection({ model: "homepage.PageSection", data: section })}
                                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-orange-550 text-xs font-bold px-3 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer transition"
                              >
                                <Edit2 className="h-3.5 w-3.5 animate-pulse" /> Section Settings
                              </button>
                              <button 
                                onClick={() => setEditCard({ model: "homepage.SectionContent", sectionId: section.id, fields: ["title", "description", "label", "icon"], labels: { icon: "Slide Image (WEBP)" } })}
                                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer shadow-lg shadow-orange-600/20"
                              >
                                <Plus className="h-4 w-4" /> Add Slide Image
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.content_items?.map((slide) => (
                              <div key={slide.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-slate-700 transition">
                                <div className="relative aspect-[16/9] w-full bg-slate-900 flex items-center justify-center">
                                  {slide.icon ? (
                                    <img src={getMediaUrl(slide.icon)} alt={slide.title} className="object-cover h-full w-full" />
                                  ) : (
                                    <span className="text-xs text-slate-650">No Image Uploaded</span>
                                  )}
                                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                    <button 
                                      onClick={() => setEditCard({ id: slide.id, model: "homepage.SectionContent", sectionId: section.id, data: slide, fields: ["title", "description", "label", "icon"], labels: { icon: "Slide Image (WEBP)" } })}
                                      className="p-2 bg-slate-900/90 text-white hover:text-orange-500 rounded-lg backdrop-blur cursor-pointer shadow border border-slate-800"
                                    >
                                      <Edit2 className="h-3.5 w-3.5" />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteCard("homepage.SectionContent", slide.id)}
                                      className="p-2 bg-slate-900/90 text-white hover:text-rose-500 rounded-lg backdrop-blur cursor-pointer shadow border border-slate-800"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                                <div className="p-4 space-y-1">
                                  <h4 className="font-bold text-white text-sm">{slide.title || "No Title"}</h4>
                                  <p className="text-xs text-slate-400 line-clamp-2">{slide.description || "No description provided."}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // 2. PLACED STUDENTS CUSTOM VIEW
                    if (normType.includes("PLACED") || normType.includes("OUR_PLACED_STUDENTS")) {
                      return (
                        <div key={section.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                              <h3 className="text-lg font-bold text-white">Student Placements Cards</h3>
                              <p className="text-xs text-slate-400 mt-0.5">Manage placed student profiles, photo cards, college, and testimonials.</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditSection({ model: "homepage.PageSection", data: section })}
                                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-orange-550 text-xs font-bold px-3 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer transition"
                              >
                                <Edit2 className="h-3.5 w-3.5" /> Section Settings
                              </button>
                              <button 
                                onClick={() => setEditCard({ 
                                  model: "homepage.SectionContent", 
                                  sectionId: section.id, 
                                  fields: ["title", "description", "label", "text", "icon"],
                                  labels: { icon: "Student Photo (1:1 Ratio)", title: "Student Name", label: "College Name", text: "Placed Company Name", description: "Student Testimonial" }
                                })}
                                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer shadow-lg shadow-orange-600/20"
                              >
                                <Plus className="h-4 w-4" /> Add Placed Student
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {section.content_items?.map((item) => (
                              <div key={item.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col items-center text-center relative group hover:border-slate-700 transition">
                                <div className="h-16 w-16 rounded-full overflow-hidden border border-slate-800 bg-slate-900 mb-3 flex items-center justify-center">
                                  {item.icon ? (
                                    <img src={getMediaUrl(item.icon)} alt={item.title} className="h-full w-full object-cover" />
                                  ) : (
                                    <Users className="h-6 w-6 text-slate-650" />
                                  )}
                                </div>
                                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                <p className="text-[10px] text-orange-500 font-semibold uppercase tracking-wide mt-0.5">{item.text}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">{item.label}</p>
                                <p className="text-xs text-slate-400 italic mt-3 bg-slate-900/60 p-3 rounded-lg border border-slate-905 line-clamp-3">"{item.description}"</p>

                                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
                                  <button 
                                    onClick={() => setEditCard({ 
                                      id: item.id,
                                      model: "homepage.SectionContent", 
                                      sectionId: section.id, 
                                      data: item,
                                      fields: ["title", "description", "label", "text", "icon"],
                                      labels: { icon: "Student Photo (1:1 Ratio)", title: "Student Name", label: "College Name", text: "Placed Company Name", description: "Student Testimonial" }
                                    })}
                                    className="p-1.5 bg-slate-900 hover:text-orange-500 border border-slate-800 text-slate-400 rounded-lg cursor-pointer shadow"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteCard("homepage.SectionContent", item.id)}
                                    className="p-1.5 bg-slate-900 hover:text-rose-500 border border-slate-800 text-slate-400 rounded-lg cursor-pointer shadow"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // 3. TESTIMONIALS SLIDER CUSTOM VIEW
                    if (normType.includes("TESTIMONIAL") || normType.includes("TESTIMONIALS")) {
                      return (
                        <div key={section.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                Testimonials Slider Management
                              </h3>
                              <p className="text-xs text-slate-400 mt-0.5">Configure testimonials and customer feedback cards shown in the page slider.</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditSection({ model: "homepage.PageSection", data: section })}
                                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-orange-550 text-xs font-bold px-3 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer transition"
                              >
                                <Edit2 className="h-3.5 w-3.5" /> Section Settings
                              </button>
                              <button 
                                onClick={() => setEditCard({ 
                                  model: "homepage.SectionContent", 
                                  sectionId: section.id, 
                                  fields: ["title", "description", "label", "icon"],
                                  labels: { icon: "Student Photo (1:1 Ratio)", title: "Student Name", label: "College / Job Designation", description: "Feedback/Testimonial Text" }
                                })}
                                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer shadow-lg shadow-orange-600/20"
                              >
                                <Plus className="h-4 w-4" /> Add Testimonial
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.content_items?.map((item) => (
                              <div key={item.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col relative group hover:border-slate-700 transition">
                                <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 rounded-full overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0">
                                    {item.icon ? (
                                      <img src={getMediaUrl(item.icon)} alt={item.title} className="h-full w-full object-cover" />
                                    ) : (
                                      <Users className="h-6 w-6 text-slate-600" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                    <p className="text-[10px] text-orange-500 font-semibold tracking-wide mt-0.5">{item.label || "Alumni"}</p>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-400 italic mt-3 bg-slate-900/60 p-3 rounded-lg border border-slate-905 line-clamp-3">"{item.description}"</p>

                                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
                                  <button 
                                    onClick={() => setEditCard({ 
                                      id: item.id,
                                      model: "homepage.SectionContent", 
                                      sectionId: section.id, 
                                      data: item,
                                      fields: ["title", "description", "label", "icon"],
                                      labels: { icon: "Student Photo (1:1 Ratio)", title: "Student Name", label: "College / Job Designation", description: "Feedback/Testimonial Text" }
                                    })}
                                    className="p-1.5 bg-slate-900 hover:text-orange-500 border border-slate-800 text-slate-400 rounded-lg cursor-pointer shadow"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteCard("homepage.SectionContent", item.id)}
                                    className="p-1.5 bg-slate-900 hover:text-rose-500 border border-slate-800 text-slate-400 rounded-lg cursor-pointer shadow"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // 4. FAQ CUSTOM VIEW
                    if (normType.includes("FAQ") || normType.includes("QUESTION")) {
                      return (
                        <div key={section.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div>
                              <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
                              <p className="text-xs text-slate-400 mt-0.5">Manage common questions and answers displayed in the FAQ accordion.</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditSection({ model: "homepage.PageSection", data: section })}
                                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-orange-550 text-xs font-bold px-3 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer transition"
                              >
                                <Edit2 className="h-3.5 w-3.5" /> Section Settings
                              </button>
                              <button 
                                onClick={() => setEditCard({ 
                                  model: "homepage.SectionContent", 
                                  sectionId: section.id, 
                                  fields: ["question", "answer"],
                                })}
                                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer shadow-lg shadow-orange-600/20"
                              >
                                <Plus className="h-4 w-4" /> Add FAQ Item
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {section.content_items?.map((item) => (
                              <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-start gap-4 hover:border-slate-700 transition">
                                <HelpCircle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0 animate-pulse" />
                                <div className="flex-1">
                                  <h4 className="font-bold text-white text-sm">{item.question}</h4>
                                  <p className="text-xs text-slate-400 mt-1">{item.answer}</p>
                                </div>
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => setEditCard({ 
                                      id: item.id,
                                      model: "homepage.SectionContent", 
                                      sectionId: section.id, 
                                      data: item,
                                      fields: ["question", "answer"],
                                    })}
                                    className="text-slate-400 hover:text-orange-500 p-1 cursor-pointer"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteCard("homepage.SectionContent", item.id)}
                                    className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // 5. GENERIC HOMEPAGE SECTIONS VIEW (Overview, Why Choose Us, Services, Achievements, CTA, etc.)
                    return (
                      <div key={section.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                          <div>
                            <span className="text-[10px] font-bold bg-orange-950 text-orange-500 border border-orange-855 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {section.section_type}
                            </span>
                            <h3 className="text-lg font-bold text-white mt-1">{section.heading || "Untitled Section"}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">{section.subheading || "No custom subheading registered."}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditSection({ model: "homepage.PageSection", data: section })}
                              className="bg-slate-950 hover:bg-slate-800 border border-slate-850 text-orange-550 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition"
                            >
                              <Edit2 className="h-3.5 w-3.5" /> Section Settings
                            </button>
                            <button 
                              onClick={() => setEditCard({ 
                                model: "homepage.SectionContent", 
                                sectionId: section.id, 
                                fields: ["title", "description", "label", "text", "icon", "image"],
                                labels: { icon: "Icon (optional)", image: "Upload Photo/Illustration", label: "Custom Label", text: "Text Detail" }
                              })}
                              className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-orange-500 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition"
                            >
                              <Plus className="h-3.5 w-3.5" /> Add Sub-Item
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.content_items?.map((item) => (
                            <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-slate-700 transition">
                              {(item.image || item.icon) && (
                                <img src={getMediaUrl(item.image || item.icon)} alt={item.title} className="h-12 w-12 object-cover rounded-lg border border-slate-855" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-sm truncate">{item.title || "Detail Item"}</p>
                                <p className="text-[10px] text-slate-500 truncate">{item.description || "No description details."}</p>
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => setEditCard({ 
                                    id: item.id,
                                    model: "homepage.SectionContent", 
                                    sectionId: section.id, 
                                    data: item,
                                    fields: ["title", "description", "label", "text", "icon", "image"],
                                    labels: { icon: "Icon (optional)", image: "Upload Photo/Illustration", label: "Custom Label", text: "Text Detail" }
                                  })}
                                  className="text-slate-400 hover:text-orange-500 p-1 cursor-pointer"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteCard("homepage.SectionContent", item.id)}
                                  className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>          </div>
            )}

            {/* 3. ABOUT US TAB */}
            {activeTab === "about" && (
              <div className="space-y-8">
                <div className="border-b border-slate-800 pb-5">
                  <h2 className="text-2xl font-bold text-white">About Us Page CMS</h2>
                  <p className="text-slate-400 text-sm mt-1">Configure company profiles, accreditations, gallery photos, and directorship messages.</p>
                </div>

                {aboutSections.map((section) => (
                  <div key={section.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-bold bg-orange-950 text-orange-500 border border-orange-855 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {section.section_type}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1">{section.heading || "Untitled Section"}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{section.subheading || "No custom subheading registered."}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditSection({ model: "aboutus.PageSection", data: section })}
                          className="bg-slate-950 hover:bg-slate-800 border border-slate-850 text-orange-550 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition"
                        >
                          <Edit2 className="h-3.5 w-3.5" /> Section Settings
                        </button>
                        <button 
                          onClick={() => setEditCard({ 
                            model: "aboutus.SectionContent", 
                            sectionId: section.id, 
                            fields: ["title", "description", "person_name", "person_role", "image"],
                            labels: { image: "Upload Photo/Illustration", person_name: "Name (if person)", person_role: "Role (if person)" }
                          })}
                          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-orange-500 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Sub-Item
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.content_items?.map((item) => (
                        <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-slate-700 transition">
                          {item.image && (
                            <img src={getMediaUrl(item.image)} alt={item.title} className="h-12 w-12 object-cover rounded-lg border border-slate-850" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-white text-sm truncate">{item.title || item.person_name || "Detail Item"}</p>
                            <p className="text-[10px] text-slate-500 truncate">{item.description || item.person_role || "No description details."}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditCard({ 
                                id: item.id,
                                model: "aboutus.SectionContent", 
                                sectionId: section.id, 
                                data: item,
                                fields: ["title", "description", "person_name", "person_role", "image"],
                                labels: { image: "Upload Photo/Illustration", person_name: "Name (if person)", person_role: "Role (if person)" }
                              })}
                              className="text-slate-400 hover:text-orange-500 p-1 cursor-pointer"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteCard("aboutus.SectionContent", item.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. COURSES & PROGRAMS TAB */}
            {activeTab === "courses" && (
              <div className="space-y-8">
                {selectedCourseForSections ? (
                  /* DEEP COURSE SECTION EDITING PANEL */
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setSelectedCourseForSections(null)}
                          className="px-4 py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-300 rounded-xl cursor-pointer transition"
                        >
                          &larr; Back to Courses
                        </button>
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <GraduationCap className="h-6 w-6 text-orange-500" />
                            {selectedCourseForSections.title} Customizer
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">Add & edit curriculum sections, syllabus brochures, durations, and fee details.</p>
                        </div>
                      </div>
                    </div>

                    {loadingCourseSections ? (
                      <div className="h-64 flex flex-col items-center justify-center gap-3">
                        <div className="h-8 w-8 border-4 border-t-orange-500 border-r-slate-800 border-b-slate-800 border-l-slate-800 rounded-full animate-spin"></div>
                        <p className="text-xs text-slate-400">Loading course layouts...</p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {courseSections.map((section) => (
                          <div key={section.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                              <div>
                                <span className="text-[10px] font-bold bg-orange-950 text-orange-400 border border-orange-850 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  {section.section_type}
                                </span>
                                <h3 className="text-lg font-bold text-white mt-1">{section.heading || "Untitled Page Section"}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{section.subheading || "No custom subheading details registered."}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setEditSection({ model: "modules.PageSection", data: section })}
                                  className="bg-slate-950 hover:bg-slate-855 border border-slate-800 text-orange-555 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition"
                                >
                                  <Edit2 className="h-3.5 w-3.5 animate-pulse" /> Edit Settings
                                </button>
                                <button 
                                  onClick={() => {
                                    // Set fields dynamically based on section type
                                    let fields = ["title", "description", "label", "icon"];
                                    let labels = {};
                                    
                                    if (section.section_type === "FAQ") {
                                      fields = ["question", "answer"];
                                    } else if (section.section_type === "FEES_BATCH_DETAILS") {
                                      fields = ["label", "title", "description"];
                                      labels = { label: "Icon Name (duration, batch, seats, fee)", title: "Card Large Text", description: "Subheading details" };
                                    } else if (section.section_type === "PAST_RESULTS") {
                                      fields = ["label", "title"];
                                      labels = { label: "Metric Stat (e.g. 95% / 250+)", title: "Metric Label (e.g. Placement Rate)" };
                                    } else if (section.section_type === "ELIGIBILITY_CRITERIA") {
                                      fields = ["title", "description"];
                                      labels = { title: "Target Group", description: "Requirement details" };
                                    } else if (section.section_type === "COURSE_OVERVIEW") {
                                      fields = ["title", "description"];
                                      labels = { title: "Topic Heading", description: "Syllabus details" };
                                    } else if (section.section_type === "PAGE_BANNER") {
                                      fields = ["title", "description", "icon"];
                                      labels = { icon: "Banner Image (16:9 WEBP)", title: "Slide Banner Title", description: "Short caption text" };
                                    }

                                    setEditCard({ 
                                      model: "modules.SectionContent", 
                                      sectionId: section.id, 
                                      fields,
                                      labels
                                    });
                                  }}
                                  className="bg-orange-605 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg transition"
                                >
                                  <Plus className="h-4 w-4" /> Add Item
                                </button>
                              </div>
                            </div>

                            {/* Section Items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {section.content_items?.map((item) => (
                                <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-slate-700 transition group relative">
                                  {item.icon && (
                                    <img src={getMediaUrl(item.icon)} alt={item.title} className="h-12 w-12 object-cover rounded-lg border border-slate-800" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white text-sm truncate">{item.title || item.question || item.label || "Card Item"}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{item.description || item.answer || "No details provided."}</p>
                                  </div>
                                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition duration-200">
                                    <button 
                                      onClick={() => {
                                        let fields = ["title", "description", "label", "icon"];
                                        let labels = {};
                                        
                                        if (section.section_type === "FAQ") {
                                          fields = ["question", "answer"];
                                        } else if (section.section_type === "FEES_BATCH_DETAILS") {
                                          fields = ["label", "title", "description"];
                                          labels = { label: "Icon Name (duration, batch, seats, fee)", title: "Card Large Text", description: "Subheading details" };
                                        } else if (section.section_type === "PAST_RESULTS") {
                                          fields = ["label", "title"];
                                          labels = { label: "Metric Stat (e.g. 95% / 250+)", title: "Metric Label (e.g. Placement Rate)" };
                                        } else if (section.section_type === "ELIGIBILITY_CRITERIA") {
                                          fields = ["title", "description"];
                                          labels = { title: "Target Group", description: "Requirement details" };
                                        } else if (section.section_type === "COURSE_OVERVIEW") {
                                          fields = ["title", "description"];
                                          labels = { title: "Topic Heading", description: "Syllabus details" };
                                        } else if (section.section_type === "PAGE_BANNER") {
                                          fields = ["title", "description", "icon"];
                                          labels = { icon: "Banner Image (16:9 WEBP)", title: "Slide Banner Title", description: "Short caption text" };
                                        }

                                        setEditCard({ 
                                          id: item.id,
                                          model: "modules.SectionContent", 
                                          sectionId: section.id, 
                                          data: item,
                                          fields,
                                          labels
                                        });
                                      }}
                                      className="p-1 text-slate-400 hover:text-orange-500 cursor-pointer"
                                    >
                                      <Edit2 className="h-3.5 w-3.5" />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteCard("modules.SectionContent", item.id)}
                                      className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                              {(!section.content_items || section.content_items.length === 0) && (
                                <div className="md:col-span-2 py-6 text-center text-xs text-slate-600 font-medium">No items added to this page section.</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* BASE MODULES LIST GRID */
                  <>
                    <div className="border-b border-slate-800 pb-5 flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">Course Modules & Curriculums</h2>
                        <p className="text-slate-400 text-sm mt-1">Add, edit, or remove main courses (PLC & SCADA, Robotics, EPLAN) and customize their syllabus brochures.</p>
                      </div>
                      <button 
                        onClick={() => setEditCourse({ title: "", tagline: "", order: 0, is_active: true })}
                        className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-600/20"
                      >
                        <Plus className="h-4 w-4" /> Add Course Module
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                      {courses.map((course) => (
                        <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 transition shadow-lg">
                          <div className="aspect-[16/9] w-full bg-slate-950 relative overflow-hidden">
                            {course.thumbnail ? (
                              <img src={getMediaUrl(course.thumbnail)} alt={course.title} className="object-cover h-full w-full group-hover:scale-105 transition duration-500" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-slate-950 text-slate-700 text-xs uppercase font-bold">No Thumbnail</div>
                            )}
                            <div className="absolute top-3 right-3 flex gap-2">
                              <button 
                                onClick={() => setEditCourse(course)}
                                className="p-2 bg-slate-950/90 text-slate-350 hover:text-orange-500 border border-slate-850 rounded-lg cursor-pointer backdrop-blur shadow transition"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCourse(course.id)}
                                className="p-2 bg-slate-950/90 text-slate-355 hover:text-rose-500 border border-slate-850 rounded-lg cursor-pointer backdrop-blur shadow transition"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                              <h3 className="font-bold text-white text-base leading-snug">{course.title}</h3>
                              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{course.tagline || "No description details listed."}</p>
                            </div>
                            
                            <div className="border-t border-slate-800/80 mt-4 pt-4">
                              <div className="flex gap-4 text-xs font-bold text-slate-400 mb-4">
                                {course.brochure && (
                                  <span className="flex items-center gap-1 text-orange-500/95"><FileText className="h-3.5 w-3.5" /> Brochure PDF</span>
                                )}
                                {course.syllabus && (
                                  <span className="flex items-center gap-1 text-orange-500/95"><FileText className="h-3.5 w-3.5" /> Syllabus PDF</span>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedCourseForSections(course);
                                  fetchCourseSections(course.id);
                                }}
                                className="w-full bg-slate-950 hover:bg-orange-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-800 hover:border-orange-550 flex items-center justify-center gap-1.5 transition duration-300 cursor-pointer"
                              >
                                <ListFilter className="h-3.5 w-3.5" /> Manage Page Layout
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 5. ANNOUNCEMENTS TAB */}
            {activeTab === "announcements" && (
              <div className="space-y-8">
                <div className="border-b border-slate-800 pb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Announcements Page Customizer</h2>
                    <p className="text-slate-400 text-sm mt-1">Manage, add, and delete student announcements, alerts, categories, and documents.</p>
                  </div>
                  <button 
                    onClick={() => setEditCard({ 
                      model: "announcements.Announcement", 
                      sectionId: null, 
                      fields: ["title", "short_description", "full_description", "publish_date", "is_active", "category"],
                      labels: { short_description: "Short Snippet (Card Summary)", full_description: "Full Announcement (Long Text)", category: "Announcement Category ID (ForeignKey)" }
                    })}
                    className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-600/20"
                  >
                    <Plus className="h-4 w-4" /> Add Announcement
                  </button>
                </div>

                <div className="space-y-4">
                  {announcements.map((item) => (
                    <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold bg-orange-950 border border-orange-850 px-2 py-0.5 rounded text-orange-400 uppercase tracking-wide">
                            Category: {item.category || "General"}
                          </span>
                          <span className="text-[10px] text-slate-500">{new Date(item.publish_date).toLocaleDateString()}</span>
                        </div>
                        <h3 className="font-bold text-white text-base leading-snug">{item.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.short_description}</p>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-auto border-t border-slate-800/50 md:border-none pt-3 md:pt-0">
                        <button 
                          onClick={() => setEditCard({ 
                            id: item.id,
                            model: "announcements.Announcement", 
                            sectionId: null, 
                            data: item,
                            fields: ["title", "short_description", "full_description", "publish_date", "is_active", "category"],
                            labels: { short_description: "Short Snippet (Card Summary)", full_description: "Full Announcement (Long Text)", category: "Announcement Category ID (ForeignKey)" }
                          })}
                          className="p-2 bg-slate-950 border border-slate-850 text-slate-400 hover:text-orange-500 rounded-xl cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCard("announcements.Announcement", item.id)}
                          className="p-2 bg-slate-950 border border-slate-855 text-slate-400 hover:text-rose-500 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. INBOX MESSAGES TAB */}
            {activeTab === "inbound" && (
              <div className="space-y-8">
                <div className="border-b border-slate-800 pb-5">
                  <h2 className="text-2xl font-bold text-white">Inbound Customer Inquiries ({inquiries.length})</h2>
                  <p className="text-slate-400 text-sm mt-1">Read-Only customer logs submitted via frontend contact forms (contact page, modal registration form).</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Inquiry Cards List */}
                  <div className="lg:col-span-1 space-y-4 max-h-[500px] overflow-y-auto pr-2 select-none">
                    {inquiries.length === 0 ? (
                      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-slate-500 text-xs font-semibold">No inquiries in mailbox.</div>
                    ) : (
                      inquiries.map((msg) => (
                        <div 
                          key={msg.id} 
                          onClick={() => setSelectedInquiry(msg)}
                          className={`p-4 rounded-xl border cursor-pointer transition flex flex-col gap-2 ${
                            selectedInquiry?.id === msg.id 
                              ? "bg-orange-600 border-orange-550 text-white shadow-lg" 
                              : "bg-slate-900 border-slate-800 text-slate-350 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide bg-slate-950/80 text-orange-400">
                              {msg.subject}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {new Date(msg.submitted_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="font-bold text-sm truncate">{msg.full_name}</p>
                          <p className="text-xs opacity-80 truncate">{msg.email_address}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Mail Reader Panel */}
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl min-h-[400px] flex flex-col">
                    {selectedInquiry ? (
                      <div className="space-y-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-6">
                          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                            <div>
                              <h3 className="text-base font-bold text-white">{selectedInquiry.full_name}</h3>
                              <p className="text-xs text-slate-400 mt-0.5">{selectedInquiry.email_address}</p>
                              {selectedInquiry.phone_number && (
                                <p className="text-xs text-slate-400">{selectedInquiry.phone_number}</p>
                              )}
                            </div>
                            <span className="text-[10px] font-bold bg-orange-950 text-orange-400 border border-orange-850 px-3 py-1 rounded-full uppercase tracking-wider">
                              Topic: {selectedInquiry.subject}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-slate-500">Inquiry Message</label>
                            <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                              {selectedInquiry.message}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-slate-800/80 pt-4 text-right">
                          <p className="text-[10px] text-slate-500">Submitted on {new Date(selectedInquiry.submitted_at).toLocaleString()}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-2">
                        <Inbox className="h-10 w-10 text-slate-700" />
                        <p className="text-xs font-semibold">Select an inquiry to view client message content.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* MODAL 1: CARD EDIT DRAWER */}
      <AnimatePresence>
        {editCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-white text-base">
                  {editCard.id ? "Edit Content Card" : "Add Content Card"}
                </h3>
                <button onClick={() => setEditCard(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="h-5.5 w-5.5" /></button>
              </div>

              <form onSubmit={handleSaveCard} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {editCard.fields.map((field) => {
                  const labelName = editCard.labels?.[field] || field.replace(/_/g, ' ');
                  
                  // Image/Icon file uploads
                  if (field === "image" || field === "icon" || field === "brochures") {
                    return (
                      <div key={field} className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 block">{labelName}</label>
                        <input 
                          type="file" 
                          name={field}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-400" 
                        />
                      </div>
                    );
                  }

                  // Large descriptive paragraphs
                  if (field === "description" || field === "answer" || field === "full_description" || field === "short_description") {
                    return (
                      <div key={field} className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 block">{labelName}</label>
                        <textarea 
                          name={field}
                          rows="4"
                          defaultValue={editCard.data?.[field] || ""}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                        />
                      </div>
                    );
                  }

                  // Defaults to standard inputs
                  return (
                    <div key={field} className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 block">{labelName}</label>
                      <input 
                        type="text" 
                        name={field}
                        defaultValue={editCard.data?.[field] || ""}
                        className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                      />
                    </div>
                  );
                })}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setEditCard(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-orange-655 hover:bg-orange-500 text-xs font-bold text-white shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Card Content"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: COURSE MAIN DATA DRAWER */}
      <AnimatePresence>
        {editCourse && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-white text-base">
                  {editCourse.id ? "Edit Course Registry" : "Add Course Module"}
                </h3>
                <button onClick={() => setEditCourse(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="h-5.5 w-5.5" /></button>
              </div>

              <form onSubmit={handleSaveCourse} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 block">Course Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    required
                    defaultValue={editCourse.title} 
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 block">Course Tagline</label>
                  <textarea 
                    name="tagline" 
                    rows="3"
                    defaultValue={editCourse.tagline} 
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 block">Course Thumbnail</label>
                  <input 
                    type="file" 
                    name="thumbnail" 
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-400" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 block">Syllabus PDF brochure</label>
                  <input 
                    type="file" 
                    name="syllabus" 
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-400" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 block">Course Info Brochure PDF</label>
                  <input 
                    type="file" 
                    name="brochure" 
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-400" 
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setEditCourse(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Course Registry"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 3: DIRECT SECTION SETTINGS EDITOR */}
      <AnimatePresence>
        {editSection && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Section Settings & Headings</h3>
                  <p className="text-[10px] text-orange-500 uppercase font-bold mt-0.5">Section Type: {editSection.data.section_type}</p>
                </div>
                <button onClick={() => setEditSection(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="h-5.5 w-5.5" /></button>
              </div>

              <form onSubmit={handleSaveSection} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 block">Super Heading Prefix</label>
                  <input 
                    type="text" 
                    name="super_heading" 
                    defaultValue={editSection.data.super_heading || ""} 
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 block">Main Heading Title</label>
                  <input 
                    type="text" 
                    name="heading" 
                    defaultValue={editSection.data.heading || ""} 
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                  />
                </div>

                {editSection.data.highlighted_heading !== undefined && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 block">Highlighted Title Segment</label>
                    <input 
                      type="text" 
                      name="highlighted_heading" 
                      defaultValue={editSection.data.highlighted_heading || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 block">Subheading / Description Paragraph</label>
                  <textarea 
                    name="subheading" 
                    rows="3"
                    defaultValue={editSection.data.subheading || ""} 
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                  />
                </div>

                {editSection.data.overview_text !== undefined && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 block">Overview Secondary Text</label>
                    <input 
                      type="text" 
                      name="overview_text" 
                      defaultValue={editSection.data.overview_text || ""} 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" 
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 block">Background Image Cover</label>
                    <input 
                      type="file" 
                      name="background_image" 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-400" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 block">Primary Feature Image</label>
                    <input 
                      type="file" 
                      name="primary_image" 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-400" 
                    />
                  </div>
                </div>

                {editSection.data.brochure !== undefined && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 block">Section Brochure PDF</label>
                      <input 
                        type="file" 
                        name="brochure" 
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-400" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 block">Section Syllabus PDF</label>
                      <input 
                        type="file" 
                        name="syllabus" 
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-400" 
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setEditSection(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Section Settings"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
