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
  
  const [activeTab, setActiveTab] = useState<"projects" | "operators">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  
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
      const [projRes, opRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/operators")
      ]);
      const projData = await projRes.json();
      const opData = await opRes.json();
      
      setProjects(Array.isArray(projData) ? projData : []);
      setOperators(Array.isArray(opData) ? opData : []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
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
        title: item.title,
        category: item.category,
        description: item.description,
        image_url: item.image_url,
        area: item.area,
        location: item.location,
        completion_time: item.completion_time,
        bedrooms: item.bedrooms,
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
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 shrink-0 self-start">
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
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-white text-xs font-bold transition cursor-pointer select-none self-start sm:self-auto shadow-md shadow-brand-gold/10 hover:scale-[1.02]"
          >
            <Plus size={16} />
            Add {activeTab === "projects" ? "Project" : "Operator"}
          </button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Title</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. Modern Villa Project"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Category</label>
                    <input
                      type="text"
                      required
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      placeholder="e.g. Residential, Office"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Built Area</label>
                    <input
                      type="text"
                      required
                      value={projectForm.area}
                      onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                      placeholder="e.g. 3,500 sq.ft"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Location</label>
                    <input
                      type="text"
                      required
                      value={projectForm.location}
                      onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                      placeholder="e.g. Chennai, TN"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Timeline</label>
                    <input
                      type="text"
                      required
                      value={projectForm.completion_time}
                      onChange={(e) => setProjectForm({ ...projectForm, completion_time: e.target.value })}
                      placeholder="e.g. 6 Months"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Layout / Details</label>
                    <input
                      type="text"
                      required
                      value={projectForm.bedrooms}
                      onChange={(e) => setProjectForm({ ...projectForm, bedrooms: e.target.value })}
                      placeholder="e.g. 4 Bedrooms, Warehouse"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Image URL</label>
                    <input
                      type="url"
                      required
                      value={projectForm.image_url}
                      onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Description</label>
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
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-gold">Avatar Image URL</label>
                    <input
                      type="url"
                      required
                      value={operatorForm.image_url}
                      onChange={(e) => setOperatorForm({ ...operatorForm, image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-brand-gold/50 focus:outline-none transition"
                    />
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
