"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, LogOut, Loader2, ArrowLeft, Image as ImageIcon, Check, X, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string | number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  area: string;
  location: string;
  completion_time: string;
  bedrooms: string;
  client_name?: string;
  client_link?: string;
  tagline?: string;
  read_time?: string;
  download_pdf_url?: string;
  quote_text?: string;
  quote_author?: string;
  quote_role?: string;
  key_benefits?: string;
  project_narrative?: string;
  additional_images?: string;
}

interface Operator {
  id: string | number;
  name: string;
  role: string;
  badge: string;
  image_url: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  
  const [activeTab, setActiveTab] = useState<"projects" | "operators" | "hero">("projects");
  const [heroSettings, setHeroSettings] = useState({ hero_bg_type: "image" as "image" | "video", hero_bg_url: "", saving: false, uploadingHero: false });
  const [projects, setProjects] = useState<Project[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [hideTeamImages, setHideTeamImages] = useState<boolean>(false);

  const toggleHideTeamImages = async () => {
    const newValue = !hideTeamImages;
    setHideTeamImages(newValue);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hide_team_images: newValue })
      });
    } catch (err) {
      console.error("Failed to save visibility setting:", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "image_url" | "additional_images" | "operator_image") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(field);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      if (field === "image_url") {
        setProjectForm((prev) => ({ ...prev, image_url: data.url }));
      } else if (field === "additional_images") {
        setProjectForm((prev) => {
          const current = prev.additional_images ? prev.additional_images.trim() : "";
          const updated = current ? `${current}, ${data.url}` : data.url;
          return { ...prev, additional_images: updated };
        });
      } else if (field === "operator_image") {
        setOperatorForm((prev) => ({ ...prev, image_url: data.url }));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingField(null);
    }
  };
  
  // Modals / Forms
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingType, setEditingType] = useState<"project" | "operator" | null>(null);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  
  // Project Form Fields
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    description: "",
    image_url: "",
    area: "",
    location: "",
    completion_time: "",
    bedrooms: "",
    client_name: "",
    client_link: "",
    tagline: "",
    read_time: "3 min read",
    download_pdf_url: "",
    quote_text: "",
    quote_author: "",
    quote_role: "",
    key_benefits: "",
    project_narrative: "",
    additional_images: "",
  });
  
  // Operator Form Fields
  const [operatorForm, setOperatorForm] = useState({
    name: "",
    role: "",
    badge: "",
    image_url: "",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ecometaladmin") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
      fetchData();
    } else {
      setLoginError("Incorrect passcode. Try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, opRes, settingsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/operators"),
        fetch("/api/settings")
      ]);
      const projData = await projRes.json();
      const opData = await opRes.json();
      const settingsData = await settingsRes.json();
      
      setProjects(Array.isArray(projData) ? projData : []);
      setOperators(Array.isArray(opData) ? opData : []);
      setHideTeamImages(!!settingsData.hide_team_images);
      setHeroSettings(prev => ({
        ...prev,
        hero_bg_type: settingsData.hero_bg_type || "image",
        hero_bg_url: settingsData.hero_bg_url || "",
      }));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveHeroSettings = async (overrides?: Partial<typeof heroSettings>) => {
    const merged = { ...heroSettings, ...overrides };
    setHeroSettings(prev => ({ ...prev, saving: true }));
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero_bg_type: merged.hero_bg_type, hero_bg_url: merged.hero_bg_url }),
      });
    } catch (err) {
      console.error("Failed to save hero settings:", err);
    } finally {
      setHeroSettings(prev => ({ ...prev, saving: false }));
    }
  };

  const handleHeroBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroSettings(prev => ({ ...prev, uploadingHero: true }));
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const newType: "image" | "video" = file.type.startsWith("video") ? "video" : "image";
      setHeroSettings(prev => ({ ...prev, hero_bg_url: data.url, hero_bg_type: newType }));
      await saveHeroSettings({ hero_bg_url: data.url, hero_bg_type: newType });
    } catch (err) {
      alert("Hero media upload failed.");
    } finally {
      setHeroSettings(prev => ({ ...prev, uploadingHero: false }));
    }
  };

  // Open modal for Adding
  const handleOpenAdd = () => {
    setEditingId(null);
    if (activeTab === "projects") {
      setEditingType("project");
      setProjectForm({
        title: "",
        category: "",
        description: "",
        image_url: "",
        area: "",
        location: "",
        completion_time: "",
        bedrooms: "",
        client_name: "",
        client_link: "",
        tagline: "",
        read_time: "3 min read",
        download_pdf_url: "",
        quote_text: "",
        quote_author: "",
        quote_role: "",
        key_benefits: "",
        project_narrative: "",
        additional_images: "",
      });
    } else {
      setEditingType("operator");
      setOperatorForm({
        name: "",
        role: "",
        badge: "",
        image_url: "",
      });
    }
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEdit = (item: any) => {
    setEditingId(item.id);
    if (activeTab === "projects") {
      setEditingType("project");
      setProjectForm({
        title: item.title || "",
        category: item.category || "",
        description: item.description || "",
        image_url: item.image_url || "",
        area: item.area || "",
        location: item.location || "",
        completion_time: item.completion_time || "",
        bedrooms: item.bedrooms || "",
        client_name: item.client_name || "",
        client_link: item.client_link || "",
        tagline: item.tagline || "",
        read_time: item.read_time || "3 min read",
        download_pdf_url: item.download_pdf_url || "",
        quote_text: item.quote_text || "",
        quote_author: item.quote_author || "",
        quote_role: item.quote_role || "",
        key_benefits: item.key_benefits || "",
        project_narrative: item.project_narrative || "",
        additional_images: item.additional_images || "",
      });
    } else {
      setEditingType("operator");
      setOperatorForm({
        name: item.name,
        role: item.role,
        badge: item.badge,
        image_url: item.image_url,
      });
    }
    setIsModalOpen(true);
  };

  // CRUD Actions
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    
    try {
      if (editingType === "project") {
        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { id: editingId, ...projectForm } : projectForm;
        
        const res = await fetch("/api/projects", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        
        if (!res.ok) throw new Error("Failed to save project");
      } else if (editingType === "operator") {
        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { id: editingId, ...operatorForm } : operatorForm;
        
        const res = await fetch("/api/operators", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        
        if (!res.ok) throw new Error("Failed to save operator");
      }
      
      setIsModalOpen(false);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Error occurred while saving data.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string | number, type: "projects" | "operators") => {
    if (!confirm(`Are you sure you want to delete this ${type === "projects" ? "project" : "team member"}?`)) {
      return;
    }
    
    try {
      setLoading(true);
      const res = await fetch(`/api/${type}?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete action failed.");
    } finally {
      setLoading(false);
    }
  };

  // Render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#001B51] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Gear silhouette background graphics */}
        <div className="absolute inset-0 bg-[url('/systems-bg.png')] bg-cover bg-center opacity-10 pointer-events-none select-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050811]/90 z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[420px] bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mb-6">
            <ShieldAlert className="w-8 h-8 text-brand-gold" />
          </div>
          
          <h2 className="text-2xl font-bold font-display text-white text-center mb-2">
            Admin Portal
          </h2>
          <p className="text-sm text-white/60 text-center mb-8">
            Access to Ecometal Matrix data operations requires authentication.
          </p>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">
                Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 text-center leading-tight">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-6 rounded-xl bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a] font-bold text-sm hover:opacity-90 active:scale-98 transition select-none flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In →
            </button>
          </form>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white mt-6 transition"
          >
            <ArrowLeft size={12} />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard
  return (
    <div className="min-h-screen bg-[#050811] text-white flex flex-col font-sans">
      {/* Header bar */}
      <header className="border-b border-white/10 bg-[#001B51]/50 px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/80 hover:text-white transition">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-lg font-bold font-display text-white leading-none">
              Ecometal Matrix
            </h1>
            <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider">
              Control Panel
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition cursor-pointer select-none"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 flex flex-col gap-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition select-none cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("operators")}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition select-none cursor-pointer ${
                  activeTab === "operators"
                    ? "bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Team / Operators ({operators.length})
              </button>
              <button
                onClick={() => setActiveTab("hero")}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition select-none cursor-pointer ${
                  activeTab === "hero"
                    ? "bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Hero Banner
              </button>
            </div>

            {/* Global Settings Toggle for Operators */}
            {activeTab === "operators" && (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-1.5 text-xs text-white">
                <span className="font-semibold text-white/70">Hide Photos:</span>
                <button
                  type="button"
                  onClick={toggleHideTeamImages}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    hideTeamImages ? "bg-brand-gold" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      hideTeamImages ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          {activeTab !== "hero" && (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-white text-xs font-bold transition cursor-pointer select-none self-start sm:self-auto shadow-md shadow-brand-gold/10 hover:scale-[1.02]"
            >
              <Plus size={16} />
              Add {activeTab === "projects" ? "Project" : "Operator"}
            </button>
          )}
        </div>

        {/* Loading Indicator Overlay */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3 text-white/50">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
            <p className="text-sm font-mono uppercase tracking-wider">Querying Database...</p>
          </div>
        ) : (
          <div className="w-full">
            {/* ── PROJECTS LIST VIEW ── */}
            {activeTab === "projects" && (
              <div className="overflow-x-auto border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
                <table className="w-full border-collapse text-left text-sm text-white/80">
                  <thead className="bg-[#001B51]/40 border-b border-white/10 text-white font-semibold">
                    <tr>
                      <th className="p-4 w-[80px]">Image</th>
                      <th className="p-4">Title</th>
                      <th className="p-4 w-[140px]">Category</th>
                      <th className="p-4 w-[120px]">Area</th>
                      <th className="p-4 w-[160px]">Location</th>
                      <th className="p-4 w-[130px]">Completion</th>
                      <th className="p-4 w-[110px]">Bedrooms</th>
                      <th className="p-4 w-[110px] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-12 text-center text-white/40 font-mono">
                          No projects found in Supabase database.
                        </td>
                      </tr>
                    ) : (
                      projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 relative bg-white/5">
                              <img
                                src={proj.image_url || "/project-1.jpg"}
                                alt={proj.title}
                                className="w-full h-full object-cover grayscale opacity-80"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300";
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-4 font-bold text-white max-w-[200px] truncate">
                            {proj.title}
                          </td>
                          <td className="p-4 text-xs font-mono">{proj.category}</td>
                          <td className="p-4 font-mono text-xs">{proj.area}</td>
                          <td className="p-4">{proj.location}</td>
                          <td className="p-4 font-semibold text-brand-gold text-xs">{proj.completion_time}</td>
                          <td className="p-4 text-xs">{proj.bedrooms}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEdit(proj)}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 text-white/70 hover:text-brand-gold transition cursor-pointer"
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(proj.id, "projects")}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-white/70 hover:text-red-400 transition cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── HERO BANNER SETTINGS ── */}
            {activeTab === "hero" && (
              <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md p-8 space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Hero Banner Settings</h2>
                  <p className="text-sm text-white/50">Set a custom background image or video for the homepage hero. Changes apply instantly on the public site.</p>
                </div>

                {/* Type Selector */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider">Background Type</label>
                  <div className="flex gap-3">
                    {(["image", "video"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setHeroSettings(prev => ({ ...prev, hero_bg_type: type }));
                          saveHeroSettings({ hero_bg_type: type });
                        }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          heroSettings.hero_bg_type === type
                            ? "bg-brand-gold text-black border-brand-gold"
                            : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        {type === "image" ? "🖼 Image" : "🎬 Video"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider">Background URL</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={heroSettings.hero_bg_url}
                      onChange={e => setHeroSettings(prev => ({ ...prev, hero_bg_url: e.target.value }))}
                      placeholder={heroSettings.hero_bg_type === "video" ? "https://example.com/video.mp4" : "/hero-bg.jpg"}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 transition"
                    />
                    <button
                      onClick={() => saveHeroSettings()}
                      disabled={heroSettings.saving}
                      className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-black text-xs font-bold transition cursor-pointer disabled:opacity-60"
                    >
                      {heroSettings.saving ? "Saving…" : "Save URL"}
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider">Or Upload Media File</label>
                  <label className="flex items-center gap-3 cursor-pointer w-fit">
                    <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition ${
                      heroSettings.uploadingHero ? "opacity-60 cursor-wait" : "cursor-pointer"
                    }`}>
                      <ImageIcon size={14} />
                      {heroSettings.uploadingHero ? "Uploading…" : "Upload Image / Video"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      disabled={heroSettings.uploadingHero}
                      onChange={handleHeroBgUpload}
                    />
                  </label>
                  <p className="text-xs text-white/30">Supported: JPG, PNG, WebP, MP4, WebM. File is saved to /public/uploads and the URL is set automatically.</p>
                </div>

                {/* Live Preview — matches actual hero exactly */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Live Preview <span className="normal-case text-white/30 font-normal ml-1">(as seen on homepage)</span>
                  </label>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-brand-navy">

                    {/* 1 — Background media */}
                    {heroSettings.hero_bg_url ? (
                      heroSettings.hero_bg_type === "video" ? (
                        <video
                          key={heroSettings.hero_bg_url}
                          src={heroSettings.hero_bg_url}
                          autoPlay loop muted playsInline
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url('${heroSettings.hero_bg_url}')` }}
                        />
                      )
                    ) : (
                      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero-bg.jpg')" }} />
                    )}

                    {/* 2 — Radial blur vignette */}
                    <div
                      className="absolute inset-0 z-[1] pointer-events-none backdrop-blur-[6px]"
                      style={{
                        maskImage: "radial-gradient(circle at 50% 45%, transparent 30%, black 75%)",
                        WebkitMaskImage: "radial-gradient(circle at 50% 45%, transparent 30%, black 75%)",
                      }}
                    />

                    {/* 3 — Dark gradient top → bottom */}
                    <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.15)_40%,rgba(0,0,0,0.72)_70%,rgba(0,0,0,0.88)_100%)]" />

                    {/* 4 — Hero content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-[3] p-5">
                      <div className="grid grid-cols-12 gap-3 items-end">
                        {/* Headline */}
                        <div className="col-span-6">
                          <h3 className="text-[clamp(14px,2vw,26px)] font-bold leading-tight bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] bg-clip-text text-transparent">
                            Build better.<br />Build faster.<br />Build lighter.
                          </h3>
                        </div>
                        {/* Body + buttons */}
                        <div className="col-span-5 col-start-8 flex flex-col gap-2">
                          <p className="text-[9px] sm:text-[11px] text-white/70 leading-relaxed hidden sm:block">
                            One factory. One model. One integrated system — for every building type.
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1 rounded-[6px] bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a] text-[9px] font-semibold whitespace-nowrap">
                              Get In Touch
                            </span>
                            <span className="px-3 py-1 rounded-[6px] border border-white/20 bg-white/10 text-white text-[9px] font-medium whitespace-nowrap">
                              Chat on WhatsApp
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Corner badge */}
                    <div className="absolute top-3 right-3 z-[4] bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-[9px] text-white/50 font-mono uppercase tracking-wider">
                        {heroSettings.hero_bg_type === "video" ? "🎬 Video" : "🖼 Image"}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/25 font-mono truncate">{heroSettings.hero_bg_url || "/hero-bg.jpg (default)"}</p>
                </div>
              </div>
            )}

            {/* ── OPERATORS LIST VIEW ── */}
            {activeTab === "operators" && (
              <div className="overflow-x-auto border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
                <table className="w-full border-collapse text-left text-sm text-white/80">
                  <thead className="bg-[#001B51]/40 border-b border-white/10 text-white font-semibold">
                    <tr>
                      <th className="p-4 w-[80px]">Image</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Badge / Specialty</th>
                      <th className="p-4 w-[110px] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {operators.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-white/40 font-mono">
                          No team members found in Supabase database.
                        </td>
                      </tr>
                    ) : (
                      operators.map((op) => (
                        <tr key={op.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 relative bg-white/5">
                              <img
                                src={op.image_url}
                                alt={op.name}
                                className="w-full h-full object-cover grayscale opacity-80"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150";
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-4 font-bold text-white">
                            {op.name}
                          </td>
                          <td className="p-4 text-xs font-semibold">{op.role}</td>
                          <td className="p-4">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/20 text-xs font-medium font-sans">
                              {op.badge}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEdit(op)}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 text-white/70 hover:text-brand-gold transition cursor-pointer"
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(op.id, "operators")}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-white/70 hover:text-red-400 transition cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── ADD/EDIT MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm animate-fade-in pointer-events-auto">
          <div className="bg-[#050811] border border-white/10 rounded-3xl p-8 max-w-[600px] w-full max-h-[90vh] overflow-y-auto relative shadow-2xl space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider">
                {editingId ? "Edit Entry" : "New Entry"}
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                {editingType === "project" ? "Project Details" : "Operator Details"}
              </h3>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Project Form Fields */}
              {editingType === "project" && (
                <div className="space-y-6">
                  {/* Subsection 1: Basic Specifications */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-brand-gold border-b border-white/10 pb-1.5">
                      1. Basic Specifications
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Project Title</label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          placeholder="e.g. Modern Villa Project"
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Category</label>
                        <input
                          type="text"
                          required
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          placeholder="e.g. Residential, Commercial Warehouse"
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Built Area</label>
                        <input
                          type="text"
                          required
                          value={projectForm.area}
                          onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                          placeholder="e.g. 3,500 sq.ft"
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Location</label>
                        <input
                          type="text"
                          required
                          value={projectForm.location}
                          onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                          placeholder="e.g. Chennai, TN"
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Timeline</label>
                        <input
                          type="text"
                          required
                          value={projectForm.completion_time}
                          onChange={(e) => setProjectForm({ ...projectForm, completion_time: e.target.value })}
                          placeholder="e.g. 6 Months"
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Layout / Project Type</label>
                        <input
                          type="text"
                          required
                          value={projectForm.bedrooms}
                          onChange={(e) => setProjectForm({ ...projectForm, bedrooms: e.target.value })}
                          placeholder="e.g. 4 Bedrooms, Warehouse"
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-sans text-white/70">
                          <span>Cover Image URL</span>
                          <span className="text-[10px] text-white/40">or upload a local file</span>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            required
                            value={projectForm.image_url}
                            onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="flex-1 h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                          />
                          <label className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer select-none text-xs font-semibold gap-1.5 shrink-0 transition">
                            {uploadingField === "image_url" ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold" />
                            ) : (
                              <Plus size={14} />
                            )}
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "image_url")}
                              disabled={uploadingField !== null}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Brief Description / Intro Text</label>
                        <textarea
                          required
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="Enter brief project summary..."
                          rows={3}
                          className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition resize-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subsection 2: Client & Metadata Details */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-brand-gold border-b border-white/10 pb-1.5">
                      2. Client & Metadata Details
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Client Name</label>
                        <input
                          type="text"
                          value={projectForm.client_name}
                          onChange={(e) => setProjectForm({ ...projectForm, client_name: e.target.value })}
                          placeholder="e.g. Hungry Jack's"
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Client Website Link</label>
                        <input
                          type="url"
                          value={projectForm.client_link}
                          onChange={(e) => setProjectForm({ ...projectForm, client_link: e.target.value })}
                          placeholder="https://..."
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Read Duration</label>
                        <input
                          type="text"
                          value={projectForm.read_time}
                          onChange={(e) => setProjectForm({ ...projectForm, read_time: e.target.value })}
                          placeholder="e.g. 5 min read"
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Case Study PDF Download URL</label>
                        <input
                          type="url"
                          value={projectForm.download_pdf_url}
                          onChange={(e) => setProjectForm({ ...projectForm, download_pdf_url: e.target.value })}
                          placeholder="https://..."
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Case Study Sub-tagline</label>
                        <input
                          type="text"
                          value={projectForm.tagline}
                          onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                          placeholder="e.g. Lightweight construction approach delivers for fast-food outlet."
                          className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subsection 3: Case Study Content */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-brand-gold border-b border-white/10 pb-1.5">
                      3. Case Study Content & Gallery
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Highlight Quote / Testimonial</label>
                        <textarea
                          value={projectForm.quote_text}
                          onChange={(e) => setProjectForm({ ...projectForm, quote_text: e.target.value })}
                          placeholder="e.g. LGS framing expedited our construction timeline and reduced weight overheads..."
                          rows={2}
                          className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition resize-none text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-sans text-white/70">Quote Author Name</label>
                          <input
                            type="text"
                            value={projectForm.quote_author}
                            onChange={(e) => setProjectForm({ ...projectForm, quote_author: e.target.value })}
                            placeholder="e.g. Rayad Maty"
                            className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-sans text-white/70">Quote Author Designation / Role</label>
                          <input
                            type="text"
                            value={projectForm.quote_role}
                            onChange={(e) => setProjectForm({ ...projectForm, quote_role: e.target.value })}
                            placeholder="e.g. Project Manager, Hurst Concepts"
                            className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Key Benefits Summary (One bullet per line)</label>
                        <textarea
                          value={projectForm.key_benefits}
                          onChange={(e) => setProjectForm({ ...projectForm, key_benefits: e.target.value })}
                          placeholder="Streamlined Construction&#10;Design Efficiency&#10;Versatility and Strength"
                          rows={3}
                          className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition resize-none text-sm font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans text-white/70">Full Project Narrative / Story Text (Supports multiple paragraphs)</label>
                        <textarea
                          value={projectForm.project_narrative}
                          onChange={(e) => setProjectForm({ ...projectForm, project_narrative: e.target.value })}
                          placeholder="Detail developer purchase, engineering re-work, and assembly schedules..."
                          rows={6}
                          className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition resize-none text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-sans text-white/70">
                          <span>Additional Gallery Images (Comma-separated URLs)</span>
                          <span className="text-[10px] text-white/40">or upload a local file</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <textarea
                            value={projectForm.additional_images}
                            onChange={(e) => setProjectForm({ ...projectForm, additional_images: e.target.value })}
                            placeholder="https://image1.jpg, https://image2.jpg, ..."
                            rows={2}
                            className="flex-1 p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition resize-none text-sm font-mono"
                          />
                          <label className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer select-none text-xs font-semibold gap-1.5 shrink-0 transition mt-0.5">
                            {uploadingField === "additional_images" ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold" />
                            ) : (
                              <Plus size={14} />
                            )}
                            Add File
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "additional_images")}
                              disabled={uploadingField !== null}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Operator Form Fields */}
              {editingType === "operator" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Full Name</label>
                    <input
                      type="text"
                      required
                      value={operatorForm.name}
                      onChange={(e) => setOperatorForm({ ...operatorForm, name: e.target.value })}
                      placeholder="e.g. James Kennedy"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Role</label>
                    <input
                      type="text"
                      required
                      value={operatorForm.role}
                      onChange={(e) => setOperatorForm({ ...operatorForm, role: e.target.value })}
                      placeholder="e.g. Project Manager"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Badge / Specialty</label>
                    <input
                      type="text"
                      required
                      value={operatorForm.badge}
                      onChange={(e) => setOperatorForm({ ...operatorForm, badge: e.target.value })}
                      placeholder="e.g. Systems Planner, Lead"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-sans text-white/70">
                      <span>Avatar Image URL</span>
                      <span className="text-[10px] text-white/40">or upload a local file</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        required
                        value={operatorForm.image_url}
                        onChange={(e) => setOperatorForm({ ...operatorForm, image_url: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition text-sm"
                      />
                      <label className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer select-none text-xs font-semibold gap-1.5 shrink-0 transition">
                        {uploadingField === "operator_image" ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold" />
                        ) : (
                          <Plus size={14} />
                        )}
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "operator_image")}
                          disabled={uploadingField !== null}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm transition select-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a] font-bold text-sm hover:opacity-90 active:scale-98 transition select-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Details
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
