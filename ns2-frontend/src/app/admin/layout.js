import "./../../app/globals.css";

export const metadata = {
  title: "MIA Client Admin - Modern Institute of Automation",
  description: "Exclusive administrative portal for MIA website content management",
};

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased overflow-hidden">
      {/* Top Glassmorphic Navigation Bar */}
      <header className="shrink-0 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-orange-600/30">
            M
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-white tracking-wide">
              MIA <span className="text-orange-500 font-semibold">Dashboard</span>
            </h1>
            <p className="text-xs text-slate-400">Modern Institute of Automation</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            CMS Online
          </span>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 w-full bg-slate-950 overflow-hidden">
        {children}
      </main>

      {/* Footer copyright */}
      <footer className="shrink-0 border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Modern Institute of Automation. All Content Management Rights Reserved.
      </footer>
    </div>
  );
}
