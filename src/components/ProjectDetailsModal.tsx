import { X, MapPin, Calendar, Compass, Layers, ShieldCheck, Tag, Send, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectName: string, category: string) => void;
}

export default function ProjectDetailsModal({ project, onClose, onInquire }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-5xl bg-[#0D0D0D] rounded-xl overflow-hidden shadow-2xl border border-[#1A1A1A] flex flex-col md:flex-row text-left"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-[#E5E5E5] hover:bg-gold-500 hover:text-[#0A0A0A] border border-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Left Panel: Big Image Showcase */}
          <div className="w-full md:w-1/2 relative bg-black aspect-video md:aspect-auto md:min-h-[500px]">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-center opacity-85"
              referrerPolicy="no-referrer"
            />
            {/* Tag Overlay */}
            <div className="absolute top-4 left-4 bg-gold-500 text-[#0A0A0A] px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
              <Tag size={10} fill="currentColor" />
              <span>{project.category}</span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Quick Metadata overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white hidden md:block">
              <p className="font-serif text-2xl font-light">{project.name}</p>
              <p className="text-xs text-gold-500 mt-1 font-mono tracking-wider">{project.location}</p>
            </div>
          </div>

          {/* Right Panel: Spec Sheet & Details */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none">
            
            <div className="space-y-6">
              {/* Header Title */}
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold font-mono">Completed Masterpiece</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1 leading-tight">{project.name}</h3>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-[#888888] font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-gold-500/80" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-gold-500/80" />
                    Built in {project.completionYear}
                  </span>
                  <span className="flex items-center gap-1 bg-[#111111] border border-[#1A1A1A] text-gold-500 px-2 py-0.5 rounded text-[10px]">
                    {project.budgetTier} Tier
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-wider text-[#888888] font-semibold font-mono">Overview</h4>
                <p className="text-[#888888] text-sm font-light leading-relaxed">{project.description}</p>
              </div>

              {/* Highlight Work Banner */}
              <div className="bg-[#111111] border-l-4 border-gold-500 p-4 rounded-r-lg space-y-1">
                <h4 className="text-[10px] uppercase tracking-wider text-gold-500 font-bold font-mono flex items-center gap-1">
                  <Sparkles size={11} fill="currentColor" />
                  <span>Highlighted Woodwork</span>
                </h4>
                <p className="text-[#E5E5E5] text-xs font-medium leading-relaxed">
                  {project.highlightWork}
                </p>
              </div>

              {/* Specs & Joinery Details */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-[#888888] font-semibold font-mono">Engineering Details</h4>
                <ul className="grid gap-2 text-xs text-[#888888]">
                  {project.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                      <span className="font-light leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials & Sizing Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#1A1A1A]">
                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-wider text-[#888888] font-semibold font-mono flex items-center gap-1">
                    <Layers size={12} />
                    <span>Materials</span>
                  </h4>
                  <p className="text-[#E5E5E5] text-xs font-medium leading-relaxed">
                    {project.materials.join(', ')}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-wider text-[#888888] font-semibold font-mono flex items-center gap-1">
                    <Compass size={12} />
                    <span>Dimensions</span>
                  </h4>
                  <p className="text-[#E5E5E5] text-xs font-medium leading-relaxed">
                    {project.dimensions}
                  </p>
                </div>
              </div>
            </div>

            {/* Inquire CTA Drawer */}
            <div className="pt-8 mt-6 border-t border-[#1A1A1A]">
              <button
                onClick={() => onInquire(project.name, project.category)}
                className="w-full bg-gold-500 hover:bg-gold-600 text-[#0A0A0A] font-bold py-3 px-4 rounded text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Send size={13} className="text-[#0A0A0A]" />
                <span>Inquire About This Design</span>
              </button>
              <p className="text-[10px] text-[#555555] text-center mt-2.5 font-light">
                Our design consultants will provide a pricing estimate with custom sizing for your floor plan.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
