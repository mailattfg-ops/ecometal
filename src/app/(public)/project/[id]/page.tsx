import React from "react";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { Ruler, MapPin, Calendar, Bed, ArrowLeft, FileText, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch project details directly from Postgres
  let project: any = null;
  let otherProjects: any[] = [];
  try {
    const [rows, otherRows] = await Promise.all([
      query("SELECT * FROM public.projects WHERE id = $1", [id]),
      query("SELECT * FROM public.projects WHERE id <> $1 ORDER BY id ASC LIMIT 3", [id])
    ]);
    if (rows && rows.length > 0) {
      project = rows[0];
    }
    otherProjects = otherRows || [];
  } catch (err) {
    console.error("Failed to query project details:", err);
  }

  if (!project) {
    notFound();
  }

  // Parse multi-value strings
  const galleryImages = project.additional_images
    ? project.additional_images.split(',').map((img: string) => img.trim()).filter(Boolean)
    : [];

  const benefits = project.key_benefits
    ? project.key_benefits.split('\n').map((b: string) => b.trim()).filter(Boolean)
    : [];

  const narrativeParagraphs = project.project_narrative
    ? project.project_narrative.split('\n').map((p: string) => p.trim()).filter(Boolean)
    : [];

  // Determine dynamic spec values
  let specificationsToRender: { label: string, value: string }[] = [];
  
  if (project.specifications && Array.isArray(project.specifications) && project.specifications.length > 0) {
    specificationsToRender = project.specifications;
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans">

      {/* ── SECTION 1: Case Study Body (Light Theme) ── */}
      <div className="pt-28 pb-20 relative overflow-hidden text-gray-800">
        {/* Subtle background graphic line mesh */}
        <div className="absolute inset-0 bg-[url('/systems-bg.png')] bg-cover bg-center opacity-[0.015] pointer-events-none select-none" />

        <div className="max-w-[1000px] w-full mx-auto px-6 relative z-10 space-y-10">

          {/* Back Link */}
          {/* <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#001B51] hover:text-brand-gold transition group !no-underline"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[#001B51] group-hover:text-brand-gold" />
            Back to projects
          </Link> */}

          {/* Case Study Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-[700px]">
              <span className="block text-xs font-mono tracking-wider text-gray-500">
                {project.read_time || "5 min read"} | Case Study
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[#001B51] leading-tight">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-lg sm:text-xl text-gray-600 font-sans font-normal leading-relaxed">
                  {project.tagline}
                </p>
              )}
            </div>

            {/* Download PDF button if URL exists */}
            {project.download_pdf_url && (
              <a
                href={project.download_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-brand-gold/60 bg-white text-xs font-semibold text-gray-700 hover:text-brand-gold shadow-sm transition whitespace-nowrap self-start md:self-end"
              >
                Download as PDF
                <FileText size={14} className="text-gray-400" />
              </a>
            )}
          </div>

          {/* Photo Gallery Grid */}
          <div className="space-y-4">
            {/* Main Cover Image */}
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-gray-200 shadow-xl relative bg-white">
              <img
                src={project.image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"}
                alt={project.title}
                className="w-full h-full object-cover grayscale brightness-95 opacity-90 hover:grayscale-0 hover:opacity-100 hover:brightness-100 transition-all duration-500 cursor-pointer"
              />
            </div>

            {/* Secondary Gallery Grid */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.map((imgUrl: string, index: number) => (
                  <div key={index} className="aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 relative bg-white shadow-sm">
                    <img
                      src={imgUrl}
                      alt={`${project.title} gallery thumbnail ${index + 1}`}
                      className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2-Column Content Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">

            {/* Left Column: Sidebar Project Details */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-[#001B51]">Project Details</h3>
                <div className="border-t border-gray-200 divide-y divide-gray-150 text-sm font-sans">

                  <div className="py-4 space-y-1">
                    <span className="block text-xs text-gray-400 font-mono uppercase tracking-wider">Project</span>
                    <span className="block font-semibold text-gray-800">{project.client_name || project.title}</span>
                  </div>

                  <div className="py-4 space-y-1">
                    <span className="block text-xs text-gray-400 font-mono uppercase tracking-wider">Location</span>
                    <span className="block font-semibold text-gray-800">{project.location}</span>
                  </div>

                  <div className="py-4 space-y-1">
                    <span className="block text-xs text-gray-400 font-mono uppercase tracking-wider">Client</span>
                    <span className="block font-semibold text-gray-700">
                      {project.client_link ? (
                        <a href={project.client_link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold text-[#001B51] underline transition-colors">
                          {project.client_name || "Enquire"}
                        </a>
                      ) : (
                        project.client_name || "N/A"
                      )}
                    </span>
                  </div>

                  <div className="py-4 space-y-1">
                    <span className="block text-xs text-gray-400 font-mono uppercase tracking-wider">Built Area</span>
                    <span className="block font-semibold text-gray-800">{project.area}</span>
                  </div>

                  <div className="py-4 space-y-1">
                    <span className="block text-xs text-gray-400 font-mono uppercase tracking-wider">Timeline</span>
                    <span className="block font-semibold text-gray-800">{project.completion_time}</span>
                  </div>

                  <div className="py-4 space-y-1">
                    <span className="block text-xs text-gray-400 font-mono uppercase tracking-wider">Layout Type</span>
                    <span className="block font-semibold text-gray-800">{project.bedrooms}</span>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: Narrative Case Study */}
            <div className="lg:col-span-8 space-y-8">

              {/* Introductory Description */}
              <div className="text-gray-800 text-lg sm:text-xl font-medium leading-[1.65] font-sans">
                <p>{project.description}</p>
              </div>

              <hr className="border-gray-200" />

              {/* Key Benefits Bullets */}
              {benefits.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold font-display text-brand-gold">Key Highlights</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed font-sans text-base">
                    {benefits.map((benefit: string, index: number) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlight Testimonial Box */}
              {project.quote_text && (
                <div className="py-6 border-l-4 border-brand-gold bg-brand-gold/5 pl-6 my-8 rounded-r-2xl space-y-4 shadow-sm">
                  <p className="text-xl sm:text-2xl italic leading-relaxed text-[#001B51] font-medium">
                    &quot;{project.quote_text}&quot;
                  </p>
                  {project.quote_author && (
                    <div>
                      <div className="text-brand-gold font-semibold text-base">{project.quote_author}</div>
                      {project.quote_role && <div className="text-gray-400 text-xs font-mono mt-0.5">{project.quote_role}</div>}
                    </div>
                  )}
                </div>
              )}

              {/* Narrative Paragraphs */}
              {narrativeParagraphs.length > 0 && (
                <div className="space-y-6 text-gray-600 leading-relaxed font-sans font-normal text-base">
                  {narrativeParagraphs.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Material & Technical Specifications */}
              {specificationsToRender.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold font-display text-[#001B51]">System Material Specifications</h3>
                  <div className="overflow-hidden border border-gray-200 bg-white rounded-2xl">
                    <table className="w-full border-collapse text-left text-xs font-mono">
                      <tbody className="divide-y divide-gray-150">
                        {specificationsToRender.map((spec, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="p-3 text-brand-gold uppercase tracking-wider font-semibold w-[200px]">{spec.label}</td>
                            <td className="p-3 text-gray-700 whitespace-pre-line">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Source Citations */}
              <div className="pt-6 border-t border-gray-200 space-y-2.5">
                <h5 className="text-xs font-mono uppercase tracking-wider text-gray-400">Sources & Citations</h5>
                <p className="text-xs text-gray-400 leading-relaxed font-sans italic">
                  Case study content is derived from live project build specifications, engineering structural reviews, and developer coordination statements.
                </p>
              </div>

              {/* Build Similar CTA Card */}
              <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center space-y-5 shadow-lg border-l-[4px] border-l-brand-gold relative overflow-hidden mt-12">
                <h4 className="text-lg sm:text-xl font-bold text-[#001B51] leading-tight">
                  Plan a similar structure with Ecometal Matrix?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed max-w-[650px] mx-auto font-sans font-normal">
                  Connect directly with our South India engineering base. We provide automated calculations, structural optimizations, and fast-track LGS manufacturing schedules.
                </p>
                <a
                  href={`https://wa.me/919080802406?text=Hi!%20I%27m%20interested%20in%20building%20a%20project%20similar%20to%20${encodeURIComponent(project.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a] text-sm font-bold transition hover:opacity-90 active:scale-98 cursor-pointer select-none"
                >
                  Discuss Specifications on WhatsApp →
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: More Case Studies (Dark Navy Theme) ── */}
      {otherProjects.length > 0 && (
        <div className="bg-[#001B51] text-white py-20 border-t border-white/10 w-full relative overflow-hidden">
          {/* Subtle background graphic overlay for dark section */}
          <div className="absolute inset-0 bg-[url('/systems-bg.png')] bg-cover bg-center opacity-[0.03] pointer-events-none select-none" />

          <div className="max-w-[1000px] mx-auto px-6 relative z-10 space-y-12 text-left">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
                More case studies
              </h3>
              <p className="text-sm sm:text-base text-white/60 font-sans max-w-[700px] leading-relaxed">
                Keen to read on? Check out a few of our other case studies that show why more and more people are choosing Ecometal Matrix for their builds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherProjects.map((otherProj: any) => (
                <Link
                  key={otherProj.id}
                  href={`/project/${otherProj.id}`}
                  className="group flex flex-col gap-4 !no-underline text-left"
                >
                  {/* Card Image */}
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 relative bg-white/5 shadow-md">
                    <img
                      src={otherProj.image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"}
                      alt={otherProj.title}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300"
                    />
                  </div>
                  {/* Card Body */}
                  <div className="space-y-2">
                    <span className="block text-xs font-mono text-white/40 uppercase tracking-wider">
                      {otherProj.read_time || "3 min read"}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition leading-snug">
                      {otherProj.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/50 line-clamp-2 leading-relaxed font-sans font-normal">
                      {otherProj.tagline || otherProj.description}
                    </p>
                    <span className="inline-block text-xs font-semibold text-brand-gold underline underline-offset-4 group-hover:text-white transition mt-2">
                      Read article
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
