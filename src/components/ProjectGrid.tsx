import { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/projects';
import { Search, SlidersHorizontal, Image as ImageIcon, Grid3X3, Eye, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES: (ProjectCategory | 'All')[] = [
  'All',
  'Commercial',
  'Wardrobe',
  'TV Unit',
  'Modular Kitchen',
  'Full Home Interior'
];

export default function ProjectGrid({ onSelectProject }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Filters projects based on selected category and text search
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.highlightWork.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="py-24 bg-[#0A0A0A] text-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="text-left space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold font-mono">Our Signature Projects</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white">
              The Woodwork Showcase
            </h2>
            <p className="text-[#888888] text-sm font-light max-w-xl">
              Explore fully executed interior layouts highlighting wardrobes, custom TV panel structures, and modular storage units built in Pudukkottai.
            </p>
          </div>
          
          {/* Dynamic Counter Accent */}
          <div className="flex items-center gap-3 bg-[#0D0D0D] border border-[#1A1A1A] px-4 py-2.5 rounded-lg shrink-0">
            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-[#E5E5E5]">
              Showing {filteredProjects.length} of 100+ Masterpieces
            </span>
          </div>
        </motion.div>

        {/* Filters and Search Bar Container */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 mb-10"
        >
          
          {/* Filter Bar Grid */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* Category selection */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 border rounded text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gold-500 border-gold-500 text-[#0A0A0A] font-bold shadow-sm shadow-gold-500/10'
                      : 'bg-[#0D0D0D] border-[#1A1A1A] text-[#888888] hover:bg-[#111111] hover:text-white'
                  }`}
                >
                  {category === 'All' ? 'All Creations (30)' : category}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full lg:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#555555]">
                <Search size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wardrobes, TV units, materials..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#0D0D0D] border border-[#1A1A1A] text-white placeholder-[#555555] text-xs rounded-md focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

        </motion.div>

        {/* Project Photo Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#1A1A1A] bg-[#0D0D0D]/40 rounded-xl space-y-4">
            <ImageIcon size={36} className="mx-auto text-[#333333]" />
            <h3 className="font-serif text-lg font-light text-white">No matching creations</h3>
            <p className="text-[#888888] text-xs max-w-sm mx-auto">
              We couldn't find any projects matching your search term. Try searching for "sliding", "glossy", "teak", or change the filter tab.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-gold-500 hover:text-gold-600 font-semibold text-xs font-mono cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layoutId={`project-card-${project.id}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => setHoveredCardId(project.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group bg-[#0D0D0D] rounded-xl overflow-hidden border border-[#1A1A1A] hover:border-gold-500/50 shadow-sm hover:shadow-xl hover:shadow-gold-500/5 flex flex-col justify-between cursor-pointer transition-all duration-300"
                  id={`project-card-${project.id}`}
                >
                  {/* Photo container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow inside photo overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

                    {/* Category badge at top left */}
                    <div className="absolute top-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-md border border-[#1A1A1A] text-white px-2.5 py-1 rounded text-[9px] font-semibold uppercase tracking-wider">
                      {project.category}
                    </div>

                    {/* Location badge top right */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-[#222] text-[#AAA] px-2 py-0.5 rounded text-[9px] font-mono">
                      {project.location.split(',')[0]}
                    </div>

                    {/* Custom Woodwork Highlight Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 bg-gold-500 text-[#0A0A0A] px-3 py-2 rounded shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-left">
                      <p className="text-[9px] font-bold uppercase tracking-wider font-mono">HIGHLIGHTED WORK</p>
                      <p className="text-[11px] font-semibold truncate leading-normal mt-0.5">
                        {project.highlightWork}
                      </p>
                    </div>

                    {/* Desktop Hover Eye icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-gold-500 text-black flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all shadow-lg">
                        <Eye size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Body textual block - Clean & Direct without separate details bar */}
                  <div className="p-5 text-left flex-grow flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-[#555555] font-bold uppercase tracking-widest">
                          Project #{index + 1}
                        </span>
                        <span className="text-[10px] text-gold-500/80 font-mono font-medium">
                          {project.budgetTier} Tier
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-light text-white group-hover:text-gold-500 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-[#888888] text-xs font-light line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Materials tags */}
                    <div className="pt-2 flex flex-wrap gap-1">
                      {project.materials.slice(0, 3).map((mat, i) => (
                        <span key={i} className="text-[9px] font-mono bg-[#141414] text-[#888888] px-2 py-0.5 rounded border border-[#222]">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
