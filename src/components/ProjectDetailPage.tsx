import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, MapPin, Calendar, Layers, Maximize2, Tag, 
  Sparkles, Phone, ShieldCheck, Award, X, ChevronLeft, ChevronRight, Send, CheckCircle2 
} from 'lucide-react';
import { Project } from '../types';
import { submitInquiryToGoogleSheet } from '../services/googleSheetService';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onInquire: (projectName: string, category: string) => void;
}

export default function ProjectDetailPage({ project, onBack, onInquire }: ProjectDetailPageProps) {
  // Extended gallery array
  const gallery = project.galleryImages && project.galleryImages.length > 0 
    ? [project.image, ...project.galleryImages]
    : [
        project.image,
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
      ];

  const [activeImage, setActiveImage] = useState<string>(project.image);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Form submission state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: `Interested in custom layout similar to "${project.name}" in ${project.location}. Please contact me.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Particular single SEO logic for each project
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 1. Dynamic Unique SEO Title
    const seoTitle = project.seoTitle || `${project.name} Pudukkottai | NJ Interior Custom ${project.category}`;
    document.title = seoTitle;

    // 2. Dynamic Unique SEO Description
    const seoDesc = project.seoDescription || `View ${project.name} completed by NJ Interior in ${project.location}. Custom ${project.category} crafted with premium materials and 10-year warranty.`;
    
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoDesc);

    // 3. Dynamic Keywords
    const keywords = project.seoKeywords?.join(', ') || `${project.category} Pudukkottai, ${project.name}, NJ Interior ${project.location}, Custom Woodwork Pudukkottai`;
    let metaKw = document.querySelector("meta[name='keywords']");
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.setAttribute('name', 'keywords');
      document.head.appendChild(metaKw);
    }
    metaKw.setAttribute('content', keywords);

    // 4. OpenGraph SEO
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property='${property}']`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOgTag('og:title', seoTitle);
    updateOgTag('og:description', seoDesc);
    updateOgTag('og:image', project.image);

    // 5. JSON-LD Structured Data Schema for Google Search Indexing
    const schemaScript = document.createElement('script');
    schemaScript.id = 'project-jsonld-schema';
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': project.name,
      'category': project.category,
      'image': [project.image, ...gallery],
      'description': project.description,
      'brand': {
        '@type': 'Brand',
        'name': 'NJ Interior Pudukkottai'
      },
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'INR',
        'price': project.budgetTier === 'Classic' ? '45000' : project.budgetTier === 'Premium' ? '120000' : '250000',
        'itemCondition': 'https://schema.org/NewCondition'
      },
      'locationCreated': {
        '@type': 'Place',
        'name': project.location
      }
    });

    const oldSchema = document.getElementById('project-jsonld-schema');
    if (oldSchema) oldSchema.remove();
    document.head.appendChild(schemaScript);

    // Update window hash for direct SEO linking
    const slug = project.slug || project.id;
    window.location.hash = `project-${slug}`;

    return () => {
      document.title = 'NJ Interior Pudukkottai | Premium Woodwork & Custom Interior Designers';
      const s = document.getElementById('project-jsonld-schema');
      if (s) s.remove();
    };
  }, [project]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    await submitInquiryToGoogleSheet({
      name: formData.name,
      phone: formData.phone,
      category: project.category,
      projectName: project.name,
      message: formData.notes
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < gallery.length - 1 ? prev + 1 : 0));
  };

  const prevLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : gallery.length - 1));
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-20">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#1C1C1C] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 bg-gold-500/10 hover:bg-gold-500 border border-gold-500/30 text-gold-400 hover:text-black px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer group shadow-sm"
              title="Return to 30 Projects Showcase"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="whitespace-nowrap">Back to All 30 Projects</span>
            </button>

            <button onClick={onBack} className="hidden md:flex items-center gap-2 text-left cursor-pointer">
              <span className="font-serif text-sm text-white font-light tracking-wide">
                NJ <span className="text-gold-500 font-semibold">INTERIOR</span>
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#666666] hidden sm:inline">SEO ID:</span>
            <span className="text-[10px] font-mono bg-gold-500/10 text-gold-400 border border-gold-500/30 px-2.5 py-1 rounded uppercase tracking-wider font-semibold">
              {project.category} • {project.location.split(',')[0]}
            </span>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header Titles & SEO Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-gold-500 font-semibold">
                NJ Interior Pudukkottai • Particular Case SEO Profile
              </span>
              <span className="text-xs font-mono text-[#555555]">|</span>
              <span className="text-xs font-mono text-[#888888]">{project.budgetTier} Tier</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
              {project.name}
            </h1>

            <p className="text-xs font-mono text-[#999999] flex items-center gap-3 pt-1">
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gold-500" /> {project.location}</span>
              <span className="text-[#333333]">|</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gold-500" /> Completed {project.completionYear}</span>
            </p>
          </motion.div>

          {/* Extended Photo Gallery & Small Details Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Extended Photo Showcase (7 cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 space-y-4"
            >
              {/* Main Expanded View */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#1F1F1F] bg-[#111] group shadow-2xl">
                <img 
                  src={activeImage} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-[#222] px-3 py-1.5 rounded-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white">Verified Pudukkottai Site Photo</span>
                </div>

                <button 
                  onClick={() => {
                    const idx = gallery.indexOf(activeImage);
                    setLightboxIndex(idx >= 0 ? idx : 0);
                  }}
                  className="absolute bottom-4 right-4 bg-black/80 hover:bg-gold-500 hover:text-black transition-all p-3 rounded-full border border-[#222] cursor-pointer shadow-lg"
                  title="Expand High-Res Photo"
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Extended Site Photo Thumbnails */}
              <div>
                <p className="text-[11px] font-mono tracking-wider uppercase text-[#888888] mb-2 flex items-center gap-1.5">
                  <Sparkles size={11} className="text-gold-500" />
                  <span>Extended Site Photos (Click to Preview)</span>
                </p>

                <div className="grid grid-cols-4 gap-3">
                  {gallery.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative aspect-square rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                        activeImage === imgUrl 
                          ? 'border-gold-500 ring-2 ring-gold-500/30 scale-[0.98]' 
                          : 'border-[#222] hover:border-[#555] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${project.name} site image ${index + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Small Clean Details Card (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-xl p-6 space-y-5 shadow-xl">
                <h3 className="text-xs uppercase font-mono tracking-widest text-gold-500 font-bold border-b border-[#1F1F1F] pb-3 flex items-center gap-2">
                  <Layers size={14} />
                  <span>Project Overview & Small Details</span>
                </h3>

                {/* Description */}
                <p className="text-xs text-[#D1D1D1] font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Small Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-[#181818]">
                  <div>
                    <span className="text-[#666666] font-mono block text-[10px]">CATEGORY</span>
                    <span className="font-semibold text-white tracking-wide">{project.category}</span>
                  </div>

                  <div>
                    <span className="text-[#666666] font-mono block text-[10px]">LOCATION</span>
                    <span className="font-semibold text-white tracking-wide">{project.location}</span>
                  </div>

                  <div>
                    <span className="text-[#666666] font-mono block text-[10px]">DIMENSIONS</span>
                    <span className="font-semibold text-white tracking-wide">{project.dimensions}</span>
                  </div>

                  <div>
                    <span className="text-[#666666] font-mono block text-[10px]">BUDGET CLASS</span>
                    <span className="font-semibold text-gold-500 flex items-center gap-1">
                      <Award size={12} />
                      {project.budgetTier}
                    </span>
                  </div>
                </div>

                {/* Primary Materials */}
                <div className="pt-2 border-t border-[#181818] space-y-2">
                  <span className="text-[#666666] block text-[10px] font-mono uppercase tracking-wider">PRIMARY MATERIALS USED</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.materials.map((mat, i) => (
                      <span key={i} className="bg-[#181818] text-[#E0E0E0] text-[10px] font-mono border border-[#282828] px-2.5 py-1 rounded-md">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 10 Year Warranty Banner */}
                <div className="bg-gold-500/5 border border-gold-500/20 rounded-lg p-3.5 flex items-center gap-3">
                  <ShieldCheck size={24} className="text-gold-500 shrink-0" />
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-white font-bold">10-Year Craft Warranty</h4>
                    <p className="text-[10px] text-[#888888] font-light">Termite-proof HDHMR/Marine Ply carcass with certified hardware.</p>
                  </div>
                </div>
              </div>

              {/* Quick Google Sheet Inquiry Form */}
              <div className="bg-[#0F0F0F] border border-gold-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
                  <Send size={13} className="text-gold-500" />
                  <span>Direct Inquiry</span>
                </h3>

                {!isSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#181818] border border-[#282828] focus:border-gold-500 text-xs rounded-lg p-3 text-white placeholder-[#555] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        required
                        placeholder="WhatsApp / Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#181818] border border-[#282828] focus:border-gold-500 text-xs rounded-lg p-3 text-white placeholder-[#555] focus:outline-none"
                      />
                    </div>
                    <div>
                      <textarea 
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-[#181818] border border-[#282828] focus:border-gold-500 text-xs rounded-lg p-3 text-white focus:outline-none resize-none font-sans"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold-500 hover:bg-gold-400 text-black font-mono text-xs font-bold uppercase tracking-widest py-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                    >
                      {isSubmitting ? 'Saving ...' : 'Submit Inquiry to NJ INTERIOR'}
                    </button>
                  </form>
                ) : (
                  <div className="py-4 text-center space-y-2">
                    <CheckCircle2 size={24} className="text-emerald-400 mx-auto" />
                    <p className="text-xs text-white font-medium">Inquiry Saved to NJ INTERIOR!</p>
                    <p className="text-[10px] text-[#888888]">NJ will contact you on WhatsApp with site layout details.</p>
                  </div>
                )}
              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-[#888888] hover:text-white transition-colors cursor-pointer p-2 bg-[#111] rounded-full border border-[#222]"
            >
              <X size={20} />
            </button>

            <div className="relative max-w-5xl w-full aspect-[4/3] flex items-center justify-center">
              <button 
                onClick={prevLightboxImage}
                className="absolute left-4 z-10 p-3 bg-black/85 hover:bg-gold-500 hover:text-black text-white transition-all rounded-full border border-[#222] cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              <img 
                src={gallery[lightboxIndex]} 
                alt={`${project.name} site photo large`}
                className="max-h-[80vh] max-w-full object-contain rounded-lg border border-[#1A1A1A] select-none"
                referrerPolicy="no-referrer"
              />

              <button 
                onClick={nextLightboxImage}
                className="absolute right-4 z-10 p-3 bg-black/85 hover:bg-gold-500 hover:text-black text-white transition-all rounded-full border border-[#222] cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="mt-4 text-xs font-mono text-[#888888] bg-[#111] border border-[#222] px-3 py-1.5 rounded">
              PHOTO {lightboxIndex + 1} OF {gallery.length} — {project.name} ({project.location})
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
