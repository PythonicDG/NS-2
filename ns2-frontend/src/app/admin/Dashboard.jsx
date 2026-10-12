"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Bell, BookOpen, Check, ChevronRight, FileText, Globe, Home, Image as ImageIcon, Inbox, LayoutDashboard, LogOut, Menu, Plus, Save, Search, Settings, ShieldCheck, Trash2, Users, Wrench, X } from "lucide-react";
import styles from "./Dashboard.module.css";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/api";

const icons = { home: Home, about: Users, modules: BookOpen, services: Wrench, announcements: Bell, contact: FileText, site: Settings, inbox: Inbox };
const descriptions = {
  home: "Update your first impression: banners, partners, testimonials and frequently asked questions.",
  about: "Tell your story. Manage the team, director’s message, gallery and page sections.",
  modules: "Manage courses, fees, brochures, syllabus downloads and the content of each course page.",
  services: "Keep your capabilities, partners, photos and business contact details up to date.",
  announcements: "Publish news, batch updates and notices. Active notices appear on the announcements page from their publish date.",
  contact: "Update the contact information displayed on your website.",
  site: "Manage your logo, company details, navigation, footer and social links.",
  inbox: "Read enquiries submitted through the website. Messages are kept read-only.",
};
const childrenFor = {
  "homepage.pagesection": ["homepage.sectioncontent", "section", "Manage items in this section"],
  "aboutus.pagesection": ["aboutus.sectioncontent", "section", "Manage items in this section"],
  "modules.module": ["modules.pagesection", "module", "Manage this course’s sections"],
  "modules.pagesection": ["modules.sectioncontent", "section", "Manage items in this section"],
  "core.menu": ["core.submenu", "menu", "Manage dropdown links"],
  "core.footersection": ["core.footeritem", "section", "Manage footer links"],
  "announcements.announcementcategory": ["announcements.announcement", "category", "Manage category announcements"],
};

function dateLabel(value) {
  return value ? new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";
}

function defaults(fields, values = {}) {
  return Object.fromEntries(fields.map((field) => [field.name,
    ["image", "file"].includes(field.type) ? normalizeImageUrl(values[field.name]) || ""
      : field.type === "list" ? (values[field.name] ?? field.default ?? []).join("\n")
      : values[field.name] ?? field.default ?? (field.type === "boolean" ? false : "")]));
}

function fieldGroup(field) {
  if (["image", "file"].includes(field.type) || /image_(alt|caption|position)$/.test(field.name)) return "Images & downloads";
  if (field.type === "relation" || ["order", "is_active", "section_type", "slug", "publish_date"].includes(field.name)) return "Publishing & placement";
  if (/button|url|link|phone|email|address|contact|location|working_hours/.test(field.name)) return "Links & contact details";
  return "Text & content";
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const [groups, setGroups] = useState([]);
  const [groupKey, setGroupKey] = useState("");
  const [resourceKey, setResourceKey] = useState("");
  const [collection, setCollection] = useState(null);
  const [editor, setEditor] = useState(null);
  const [values, setValues] = useState({});
  const [uploads, setUploads] = useState({});
  const [previews, setPreviews] = useState({});
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const csrf = useRef("");
  const previewsRef = useRef({});
  const editorRequest = useRef(0);
  const group = groups.find((item) => item.key === groupKey);
  const resource = group?.resources.find((item) => item.key === resourceKey);
  const parentField = editor?.fields.find((field) => field.name === "section" && field.type === "relation");
  const sectionContext = values.section_type || parentField?.options.find((option) => String(option.value) === String(values.section))?.sectionType || "";
  const visibleFields = editor?.fields.filter((field) => !field.visibleFor || field.visibleFor.includes(sectionContext))
    .map((field) => ({ ...field, label: field.labelsFor?.[sectionContext] || field.label })) || [];
  const sectionOption = editor?.fields.find((field) => field.name === "section_type")?.options.find((option) => option.value === sectionContext);
  const childCollection = sectionOption?.supportsItems === false ? null : childrenFor[resourceKey];
  const editorGroups = editor?.fields.some((field) => field.name === "section_type" || field.name === "section")
    ? ["Publishing & placement", "Text & content", "Images & downloads", "Links & contact details"]
    : ["Text & content", "Images & downloads", "Links & contact details", "Publishing & placement"];

  const api = useCallback(async (path, options = {}) => {
    const response = await fetch(`/api/dashboard/${path.replace(/\/(?=\?|$)/, "")}`, {
      ...options,
      cache: "no-store",
      headers: { ...(options.method && options.method !== "GET" ? { "X-CSRFToken": csrf.current } : {}), ...options.headers },
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) { setUser(null); setEditor(null); setDirty(false); }
      const failure = new Error(data.detail || "The request failed. Please try again.");
      failure.fields = data.errors || {};
      throw failure;
    }
    return data;
  }, []);

  const loadCatalog = useCallback(async () => {
    const data = await api("catalog/");
    setGroups(data.groups);
  }, [api]);

  useEffect(() => {
    let active = true;
    api("session/").then(async (data) => {
      if (!active) return;
      csrf.current = data.csrfToken;
      setUser(data.user);
      if (data.user) await loadCatalog();
    }).catch((failure) => { if (active) setError(failure.message); })
      .finally(() => { if (active) setBooting(false); });
    return () => { active = false; };
  }, [api, loadCatalog]);

  useEffect(() => {
    if (!user || !resourceKey) return;
    const controller = new AbortController();
    const query = new URLSearchParams({ page: String(page), search, ...filters });
    // Loading state belongs to this network subscription and resets on each query.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setCollection(null);
    api(`content/${resourceKey}/?${query}`, { signal: controller.signal })
      .then(setCollection).catch((failure) => { if (failure.name !== "AbortError") setError(failure.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [user, resourceKey, api, page, search, filters, refresh]);

  useEffect(() => {
    const warn = (event) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => () => { Object.values(previewsRef.current).forEach(URL.revokeObjectURL); }, []);

  function clearEditor() {
    editorRequest.current += 1;
    Object.values(previewsRef.current).forEach(URL.revokeObjectURL);
    previewsRef.current = {};
    setPreviews({}); setUploads({}); setErrors({}); setEditor(null); setDirty(false); setDeleteInfo(null);
  }

  function canLeave() {
    return !dirty || window.confirm("You have unsaved changes. Discard them?");
  }

  function selectGroup(key, nextResource = "", nextFilters = {}) {
    if (saving || !canLeave()) return;
    clearEditor(); setGroupKey(key); setResourceKey(nextResource);
    setFilters(key === "contact" && nextResource === "homepage.pagesection" && !Object.keys(nextFilters).length ? { section_type: "CONTACT_US" } : nextFilters);
    setSearch(""); setSearchInput(""); setPage(1); setError(""); setSuccess(""); setMobileNav(false);
  }

  async function signIn(event) {
    event.preventDefault(); setSaving(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      // Refresh CSRF before login so a previously expired page can still sign in.
      csrf.current = (await api("session/")).csrfToken;
      const data = await api("session/", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.get("username"), password: form.get("password") }) });
      csrf.current = data.csrfToken; setUser(data.user); await loadCatalog();
    } catch (failure) { setError(failure.message); }
    finally { setSaving(false); }
  }

  async function signOut() {
    if (saving || !canLeave()) return;
    try {
      await api("session/", { method: "DELETE" });
      clearEditor(); setUser(null); setGroups([]); setGroupKey(""); setResourceKey(""); setError(""); setSuccess("");
    } catch (failure) { setError(failure.message); }
  }

  async function openEditor(item = null) {
    if (saving || !canLeave()) return;
    clearEditor(); setError(""); setSuccess("");
    if (!item) {
      setEditor({ id: null, fields: collection.fields, permissions: collection.permissions });
      setValues({ ...defaults(collection.fields), ...Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, value === "none" ? "" : value])) });
      return;
    }
    setLoading(true);
    const requestId = editorRequest.current;
    try {
      const data = await api(`content/${resourceKey}/${item.id}/`);
      if (requestId !== editorRequest.current) return;
      setEditor({ id: item.id, fields: data.fields, permissions: data.permissions, original: data.record });
      setValues(defaults(data.fields, data.record.values));
    } catch (failure) { if (requestId === editorRequest.current) setError(failure.message); }
    finally { if (requestId === editorRequest.current) setLoading(false); }
  }

  function setValue(name, value) {
    setValues((current) => ({ ...current, [name]: value })); setDirty(true);
    setErrors((current) => ({ ...current, [name]: undefined })); setSuccess("");
  }

  function chooseFile(field, file) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError("Choose a file smaller than 10 MB."); return; }
    if (previewsRef.current[field.name]) URL.revokeObjectURL(previewsRef.current[field.name]);
    const preview = field.type === "image" ? URL.createObjectURL(file) : "";
    previewsRef.current[field.name] = preview;
    setPreviews({ ...previewsRef.current });
    setUploads((current) => ({ ...current, [field.name]: file }));
    setValue(`${field.name}-clear`, false); setError("");
  }

  async function save(event) {
    event.preventDefault(); setSaving(true); setError(""); setErrors({}); setSuccess("");
    const body = new FormData();
    for (const field of visibleFields) {
      if (["image", "file"].includes(field.type)) {
        if (uploads[field.name]) body.append(field.name, uploads[field.name]);
        else if (values[`${field.name}-clear`]) body.append(`${field.name}-clear`, "true");
      } else {
        const value = field.type === "list" ? JSON.stringify(String(values[field.name] || "").split("\n").map((line) => line.trim()).filter(Boolean)) : values[field.name];
        body.append(field.name, value ?? "");
      }
    }
    try {
      const data = await api(`content/${resourceKey}/${editor.id ? `${editor.id}/` : ""}`, { method: "POST", body });
      const fields = editor.fields;
      clearEditor();
      setEditor({ id: data.record.id, fields, permissions: editor.permissions, original: data.record });
      setValues(defaults(fields, data.record.values));
      setSuccess(resourceKey === "announcements.announcement"
        ? (data.record.values.is_active ? "Announcement saved. It appears on the website from its publish date." : "Draft saved. Turn on “Visible on website” when you’re ready to publish.")
        : "Changes saved. Open the website to review them.");
      setRefresh((current) => current + 1); await loadCatalog();
    } catch (failure) { setError(failure.message); setErrors(failure.fields); }
    finally { setSaving(false); }
  }

  async function prepareDelete() {
    setSaving(true); setError("");
    try { setDeleteInfo(await api(`content/${resourceKey}/${editor.id}/`, { method: "DELETE" })); }
    catch (failure) { setError(failure.message); }
    finally { setSaving(false); }
  }

  async function deleteRecord() {
    setSaving(true); setError("");
    try {
      await api(`content/${resourceKey}/${editor.id}/?confirm=yes`, { method: "DELETE" });
      clearEditor(); setSuccess("Content deleted."); setRefresh((current) => current + 1); await loadCatalog();
    } catch (failure) { setError(failure.message); }
    finally { setSaving(false); }
  }

  const writable = editor && (editor.id ? editor.permissions.change : editor.permissions.add);

  function renderField(field) {
    const id = `field-${field.name}`;
    const value = values[field.name] ?? "";
    const messages = errors[field.name];
    const common = { id, name: field.name, disabled: !writable || saving, "aria-invalid": !!messages,
      "aria-describedby": `${id}-help`, required: field.required && field.type !== "boolean" && field.name !== "slug" };
    let input;
    if (field.type === "boolean") {
      input = <label className={styles.toggle}><input {...common} type="checkbox" checked={!!value} onChange={(event) => setValue(field.name, event.target.checked)} /><span>{field.name === "is_active" ? "Show this content to visitors" : field.label}</span></label>;
    } else if (["image", "file"].includes(field.type)) {
      const url = values[`${field.name}-clear`] ? "" : previews[field.name] || value;
      input = <div className={styles.upload}>
        {url && field.type === "image" && <img src={url} alt={`${field.label} preview`} className={styles.imagePreview} />}
        {value && <a href={value} target="_blank" rel="noopener noreferrer">View current {field.type === "image" ? "image" : "file"} <ArrowUpRight size={14} /></a>}
        {uploads[field.name] && <p>{uploads[field.name].name}</p>}
        {writable && <><input {...common} type="file" required={field.required && !value}
          accept={field.type === "image" ? ".jpg,.jpeg,.png,.webp,.gif" : ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.gif"}
          onChange={(event) => chooseFile(field, event.target.files[0])} />
          {value && !field.required && <label className={styles.toggle}><input type="checkbox" disabled={saving} checked={!!values[`${field.name}-clear`]} onChange={(event) => {
            setValue(`${field.name}-clear`, event.target.checked);
            setUploads((current) => ({ ...current, [field.name]: null }));
          }} />Remove current file</label>}</>}
        <small>JPG, PNG, WebP or GIF for images. PDF or Word for downloads. Maximum 10 MB.</small>
      </div>;
    } else if (["select", "relation"].includes(field.type)) {
      input = <select {...common} value={value} onChange={(event) => setValue(field.name, event.target.value)}>
        <option value="">{field.required ? "Choose an option" : field.name === "module" ? "Main courses listing page" : "None"}</option>
        {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>;
    } else if (["textarea", "list"].includes(field.type)) {
      input = <textarea {...common} rows={field.type === "list" ? 4 : 5} maxLength={field.maxLength || undefined} value={value} onChange={(event) => setValue(field.name, event.target.value)} />;
    } else {
      input = <input {...common} type={field.type} min={field.type === "number" ? 0 : undefined} maxLength={field.maxLength || undefined} value={value} onChange={(event) => setValue(field.name, event.target.value)} />;
    }
    return <div key={field.name} className={`${styles.field} ${["textarea", "list", "image", "file"].includes(field.type) ? styles.wide : ""}`}>
      {field.type !== "boolean" && <label htmlFor={id}>{field.label}{field.required && field.name !== "slug" && <span className={styles.required}> *</span>}</label>}
      {input}
      <small id={`${id}-help`}>{field.type === "list" ? "Enter one item per line." : field.name === "slug" ? "Page address. Leave blank to generate it. Changing an existing address changes its website URL." : field.name === "order" ? "Smaller numbers appear first." : field.help}</small>
      {messages?.map((message, index) => <p className={styles.fieldError} key={index}>{message.message}</p>)}
    </div>;
  }

  if (booting) return <main className={styles.loginPage}><p role="status">Loading your dashboard…</p></main>;
  if (!user) return <main className={styles.loginPage}>
    <div className={styles.loginIntro}><span className={styles.brandMark}>M</span><p className={styles.eyebrow}>MODERN INSTITUTE OF AUTOMATION</p><h1>Your website.<br />In your hands.</h1><p>Update pages, share announcements and keep your content fresh — all from one place.</p><Link href="/">View the website <ArrowUpRight size={18} /></Link></div>
    <div className={styles.loginCard}><ShieldCheck size={32} /><h2>Welcome back</h2><p>Sign in with your existing Django staff username and password.</p>
      {error && <div className={styles.error} role="alert">{error}</div>}
      <form onSubmit={signIn}><label htmlFor="username">Username</label><input id="username" name="username" autoComplete="username" required disabled={saving} />
        <label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required disabled={saving} />
        <button className={styles.primary} disabled={saving}>{saving ? "Signing in…" : "Sign in to dashboard"}<ChevronRight size={18} /></button>
      </form><small>Your account’s existing permissions determine what you can edit.</small>
    </div>
  </main>;

  return <div className={styles.dashboard}>
    <aside className={`${styles.sidebar} ${mobileNav ? styles.navOpen : ""}`}>
      <div className={styles.brand}><span className={styles.brandMark}>M</span><div><strong>MIA</strong><small>Website dashboard</small></div><button className={styles.closeNav} aria-label="Close menu" onClick={() => setMobileNav(false)}><X size={20} /></button></div>
      <button className={`${styles.navItem} ${!groupKey ? styles.navActive : ""}`} onClick={() => selectGroup("")}><LayoutDashboard size={19} />Overview</button>
      <p className={styles.navLabel}>MANAGE WEBSITE</p>
      <nav aria-label="Website pages">{groups.map((item) => { const Icon = icons[item.key] || FileText; return <button key={item.key} className={`${styles.navItem} ${groupKey === item.key ? styles.navActive : ""}`} onClick={() => selectGroup(item.key)}><Icon size={19} />{item.title}{item.key === "inbox" && <span className={styles.navCount}>{item.resources[0].count}</span>}</button>; })}</nav>
      <div className={styles.sidebarBottom}><a href="/" target="_blank" rel="noopener noreferrer"><Globe size={18} />View website<ArrowUpRight size={16} /></a><div className={styles.account}><span>{user.name.slice(0, 1).toUpperCase()}</span><div><strong>{user.name}</strong><small>Staff account</small></div><button onClick={signOut} aria-label="Sign out" title="Sign out"><LogOut size={18} /></button></div></div>
    </aside>
    <div className={styles.workspace}>
      <header className={styles.topbar}><button className={styles.openNav} aria-label="Open menu" onClick={() => setMobileNav(true)}><Menu size={22} /></button><span>Website management <ChevronRight size={14} />{group?.title || "Overview"}</span><span className={styles.secure}><ShieldCheck size={15} />Staff access</span></header>
      <main className={styles.main}>
        {error && <div className={styles.error} role="alert">{error}<button onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
        {success && <div className={styles.success} role="status"><Check size={18} />{success}<button onClick={() => setSuccess("")} aria-label="Dismiss message"><X size={16} /></button></div>}
        {!groupKey ? <>
          <div className={styles.pageHeading}><div><p className={styles.eyebrow}>YOUR CONTENT, AT A GLANCE</p><h1>Hello, {user.name}.</h1><p>Choose a page to update its text, images and content.</p></div><a className={styles.secondary} href="/" target="_blank" rel="noopener noreferrer">Open website<ArrowUpRight size={17} /></a></div>
          <div className={styles.stats}><div><span>Website areas</span><strong>{groups.length}</strong></div><div><span>Content records</span><strong>{groups.reduce((sum, item) => sum + item.resources.reduce((count, entry) => count + entry.count, 0), 0)}</strong></div><div><span>Announcements</span><strong>{groups.find((item) => item.key === "announcements")?.resources.find((item) => item.key === "announcements.announcement")?.count ?? "—"}</strong></div></div>
          <div className={styles.sectionHeading}><h2>What would you like to update?</h2><span>Choose a website area</span></div>
          <div className={styles.pageCards}>{groups.map((item) => { const Icon = icons[item.key] || FileText; return <button className={styles.pageCard} key={item.key} onClick={() => selectGroup(item.key)}><span className={styles.cardIcon}><Icon size={23} /></span><h3>{item.title}</h3><p>{descriptions[item.key]}</p><span className={styles.cardFooter}>{item.resources.length} content collections<ChevronRight size={18} /></span></button>; })}</div>
          {!groups.length && <div className={styles.empty}>Your account has no content viewing permissions. Ask your Django administrator to assign the relevant permissions.</div>}
          <div className={styles.tip}><ImageIcon size={23} /><div><strong>A simple editing workflow</strong><p>Choose a page, open a record, make your changes, then save. Use “Visible on website” to hide or publish content. Review your changes with “View page”.</p></div></div>
        </> : <>
          <div className={styles.pageHeading}><div><p className={styles.eyebrow}>MANAGE YOUR WEBSITE</p><h1>{group?.title}</h1><p>{descriptions[groupKey]}</p></div><a href={group?.url || "/"} target="_blank" rel="noopener noreferrer" className={styles.secondary}>View page<ArrowUpRight size={17} /></a></div>
          <div className={styles.tabs} role="tablist" aria-label="Content collections">{group?.resources.map((item) => <button role="tab" aria-selected={resourceKey === item.key} key={item.key} className={resourceKey === item.key ? styles.tabActive : ""} onClick={() => selectGroup(groupKey, item.key)}>{item.title}<span>{item.count}</span></button>)}</div>
          {!resourceKey && <div className={styles.collectionCards}>{group?.resources.map((item) => <button key={item.key} onClick={() => selectGroup(groupKey, item.key)}><FileText size={21} /><div><h3>{item.title}</h3><p>{item.count} records · {item.permissions.change ? "Available to edit" : "View only"}</p></div><ChevronRight size={19} /></button>)}</div>}
          {resourceKey && !editor && <div className={styles.panel}>
            <div className={styles.listToolbar}><div><h2>{resource?.title}</h2><p>{collection?.count ?? "…"} records{Object.keys(filters).length ? " in this selection" : ""}</p></div>{collection?.permissions.add && <button disabled={loading} className={styles.primary} onClick={() => openEditor()}><Plus size={17} />{resourceKey === "announcements.announcement" ? "New announcement" : "Add content"}</button>}</div>
            <div className={styles.searchRow}><form onSubmit={(event) => { event.preventDefault(); setSearch(searchInput); setPage(1); }}><Search size={18} /><input aria-label="Search content" placeholder="Search content…" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} /><button type="submit">Search</button></form>
              {collection?.fields.filter((field) => field.type === "relation" || field.name === "section_type").map((field) => <select key={field.name} aria-label={`Filter by ${field.label}`} value={filters[field.name] || ""} onChange={(event) => { setFilters((current) => { const next = { ...current }; if (event.target.value) next[field.name] = event.target.value; else delete next[field.name]; return next; }); setPage(1); }}><option value="">All {field.label.toLowerCase()}s</option>{field.name === "module" && <option value="none">Main courses listing page</option>}{field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>)}
            </div>
            {loading ? <div className={styles.empty} role="status">Loading content…</div> : collection?.records.length ? <div className={styles.recordList}>{collection.records.map((item) => {
              const active = item.values.is_active;
              const future = item.values.publish_date && item.values.publish_date > new Date().toLocaleDateString("en-CA");
              const imageField = collection.fields.find((field) => field.type === "image" && item.values[field.name]);
              return <button key={item.id} className={styles.record} onClick={() => openEditor(item)}>
                {imageField ? <img src={normalizeImageUrl(item.values[imageField.name])} alt="" /> : <span className={styles.recordIcon}>{groupKey === "inbox" ? <Inbox size={20} /> : <FileText size={20} />}</span>}
                <div><strong>{item.values.heading || item.values.title || item.values.person_name || item.label}</strong><small>{item.values.section_type?.replaceAll("_", " ") || item.values.email_address || item.values.short_description?.slice(0, 110) || `Record #${item.id}`}{item.values.publish_date && ` · ${dateLabel(item.values.publish_date)}`}</small></div>
                {active !== undefined && <span className={`${styles.badge} ${active ? styles.live : ""}`}>{active ? (future ? "Scheduled" : "Visible") : "Hidden / draft"}</span>}<ChevronRight size={18} />
              </button>;
            })}</div> : <div className={styles.empty}><FileText size={30} /><h3>No content found</h3><p>{search || Object.keys(filters).length ? "Try another search or parent selection." : "Add your first record to get started."}</p></div>}
            {collection && collection.count > 30 && <div className={styles.pagination}><button disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {Math.ceil(collection.count / 30)}</span><button disabled={page * 30 >= collection.count || loading} onClick={() => setPage(page + 1)}>Next</button></div>}
          </div>}
          {editor && <form onSubmit={save} className={styles.editor}>
            <div className={styles.editorToolbar}><button type="button" className={styles.secondary} disabled={saving} onClick={() => { if (canLeave()) clearEditor(); }}><ArrowLeft size={16} />Back to list</button><span>{dirty ? "Unsaved changes" : editor.id ? "Saved content" : "New content"}</span>{writable && <button className={styles.primary} disabled={saving}><Save size={17} />{saving ? "Saving…" : "Save changes"}</button>}</div>
            <div className={styles.editorTitle}><h2>{editor.id ? values.heading || values.title || editor.original?.label : `New ${resource?.title.toLowerCase()}`}</h2><p>{writable ? "Make your changes below. Saving updates the website’s content." : "You have viewing access to this record."}</p></div>
            {errors.__all__?.map((message, index) => <div key={index} className={styles.error}>{message.message}</div>)}
            {editorGroups.map((title) => {
              const fields = visibleFields.filter((field) => fieldGroup(field) === title);
              return fields.length ? <fieldset className={styles.fieldset} key={title}><legend>{title}</legend><div className={styles.fieldGrid}>{fields.map(renderField)}</div></fieldset> : null;
            })}
            {groupKey === "inbox" && <div className={styles.tip}>Submitted {dateLabel(editor.original?.values.submitted_at)}{values.email_address && <a href={`mailto:${values.email_address}`}>Reply by email <ArrowUpRight size={16} /></a>}</div>}
            {editor.id && childCollection && group.resources.some((item) => item.key === childCollection[0]) && <div className={styles.tip}><FileText size={22} /><div><strong>Content inside this record</strong><p>Manage the cards, images or sections that belong here.</p><button type="button" className={styles.secondary} disabled={saving} onClick={() => { const [key, relation] = childCollection; selectGroup(groupKey, key, { [relation]: String(editor.id) }); }}>{childCollection[2]}<ChevronRight size={17} /></button></div></div>}
            <div className={styles.editorFooter}><p>{dirty ? "Remember to save before leaving this page." : "All changes saved."}</p>{editor.id && editor.permissions.delete && <button className={styles.danger} type="button" onClick={prepareDelete} disabled={saving}><Trash2 size={16} />Delete content</button>}{writable && <button className={styles.primary} disabled={saving}><Save size={17} />{saving ? "Saving…" : "Save changes"}</button>}</div>
          </form>}
        </>}
      </main>
    </div>
    {deleteInfo && <div className={styles.modalBackdrop}><div className={styles.modal} role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><Trash2 size={28} /><h2 id="delete-title">Delete this content?</h2><p>“{deleteInfo.label}” will be permanently deleted.</p>{deleteInfo.relatedCount > 0 && <p className={styles.error}>This also deletes {deleteInfo.relatedCount} related records, including content inside it.</p>}<p>This cannot be undone. You can hide content using “Visible on website” instead.</p><div><button autoFocus className={styles.secondary} disabled={saving} onClick={() => setDeleteInfo(null)}>Keep content</button><button className={styles.danger} disabled={saving} onClick={deleteRecord}>{saving ? "Deleting…" : "Delete permanently"}</button></div></div></div>}
  </div>;
}
