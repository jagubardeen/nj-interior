import { useState } from 'react';
import { Layers, HelpCircle, ShieldCheck, Sparkles, Sliders, Layout, Zap, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'tvunit'>('wardrobe');

  return (
    <section id="highlights" className="py-24 bg-[#0A0A0A] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <p className="text-xs uppercase tracking-widest text-gold-500 font-semibold font-mono">Bespoke Specifications</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white">
            Uncompromising Standards in Every Joinery
          </h2>
          <p className="text-[#888888] text-sm font-light leading-relaxed">
            NJ Interior specializes in structural strength and visually spectacular finishes. Discover our standard features built into our custom-made wardrobes and floating entertainment zones.
          </p>

          {/* Interactive Toggle Switch */}
          <div className="flex justify-center pt-4">
            <div className="bg-[#0D0D0D] p-1.5 rounded-full flex gap-1 border border-[#1A1A1A]">
              <button
                onClick={() => setActiveTab('wardrobe')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === 'wardrobe'
                    ? 'bg-gold-500 text-[#0A0A0A] shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                Wardrobes & Closets
              </button>
              <button
                onClick={() => setActiveTab('tvunit')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === 'tvunit'
                    ? 'bg-gold-500 text-[#0A0A0A] shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                Bespoke TV Units
              </button>
            </div>
          </div>
        </motion.div>
 
        {/* Feature content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {activeTab === 'wardrobe' ? (
            <motion.div
              key="wardrobe-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              {/* Technical features breakdown */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center gap-2 text-xs text-gold-500 uppercase tracking-widest font-semibold">
                  <Sliders size={14} />
                  <span>Wardrobe Engineering Specs</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  Sliding Wardrobes That Glide Like Silk
                </h3>
                <p className="text-[#CCCCCC] text-sm leading-relaxed font-light">
                  Our wardrobes are constructed using high-density waterproof plywood (HDHMR) to prevent warping over decades. Standard wardrobes lose alignment, but NJ Wardrobes utilize heavy-duty metal profile frameworks and synchronized bottom-rolling tracks.
                </p>
 
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  {/* Item 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-1 rounded-full bg-gold-500/10 text-gold-500">
                        <Zap size={14} />
                      </div>
                      <span>Automatic LED Lighting</span>
                    </div>
                    <p className="text-[#888888] text-xs font-light leading-relaxed">
                      Warm white magnetic motion-sensor LED strips light up automatically when doors slide open.
                    </p>
                  </div>
                  {/* Item 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-1 rounded-full bg-gold-500/10 text-gold-500">
                        <Layers size={14} />
                      </div>
                      <span>German Soft-Closers</span>
                    </div>
                    <p className="text-[#888888] text-xs font-light leading-relaxed">
                      Equipped with Hettich TopLine sliding gear which guarantees zero slamming and silent closing.
                    </p>
                  </div>
                  {/* Item 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-1 rounded-full bg-gold-500/10 text-gold-500">
                        <Layout size={14} />
                      </div>
                      <span>Custom Organizer Islands</span>
                    </div>
                    <p className="text-[#888888] text-xs font-light leading-relaxed">
                      Velvet-lined drawers with custom compartments for jewelry, watches, tie pins, and accessories.
                    </p>
                  </div>
                  {/* Item 4 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-1 rounded-full bg-gold-500/10 text-gold-500">
                        <ShieldCheck size={14} />
                      </div>
                      <span>Termite Proof Core</span>
                    </div>
                    <p className="text-[#888888] text-xs font-light leading-relaxed">
                      Constructed strictly from IS-710 Boiling Water Proof marine plywood to prevent any moisture damage.
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Graphic Mockup Card */}
              <div className="lg:col-span-6">
                <div className="relative rounded-xl overflow-hidden border border-[#1A1A1A] aspect-video lg:aspect-[4/3] shadow-lg group bg-[#0D0D0D]">
                  <img
                    src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80"
                    alt="Master Wardrobe Setup by NJ Interior"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Small floating specs pointer */}
                  <div className="absolute top-1/4 left-1/3 bg-[#0D0D0D]/95 backdrop-blur-md text-white border border-[#1A1A1A] p-2.5 rounded shadow-lg text-xs flex flex-col text-left">
                    <span className="text-[10px] text-gold-500 font-mono tracking-widest font-semibold uppercase">SPECIFICATION</span>
                    <span className="font-semibold mt-0.5">Bronze Profile Framed Glass</span>
                  </div>
 
                  <div className="absolute bottom-6 right-6 bg-[#0D0D0D]/95 backdrop-blur-md text-white border border-[#1A1A1A] p-2.5 rounded shadow-lg text-xs flex flex-col text-left">
                    <span className="text-[10px] text-gold-500 font-mono tracking-widest font-semibold uppercase">HIGHLIGHT</span>
                    <span className="font-semibold mt-0.5">Integrated Sensor lighting</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tvunit-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              {/* Graphic Mockup Card */}
              <div className="lg:col-span-6 order-last lg:order-first">
                <div className="relative rounded-xl overflow-hidden border border-[#1A1A1A] aspect-video lg:aspect-[4/3] shadow-lg group bg-[#0D0D0D]">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                    alt="Premium TV Unit Woodwork"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20" />
 
                  {/* Spec callout */}
                  <div className="absolute top-1/3 right-1/4 bg-[#0D0D0D]/95 backdrop-blur-md text-white border border-[#1A1A1A] p-2.5 rounded shadow-lg text-xs flex flex-col text-left">
                    <span className="text-[10px] text-gold-500 font-mono tracking-widest font-semibold uppercase">INTEGRATION</span>
                    <span className="font-semibold mt-0.5">Fluted Wooden Louver Slats</span>
                  </div>
 
                  <div className="absolute bottom-6 left-6 bg-[#0D0D0D]/95 backdrop-blur-md text-white border border-[#1A1A1A] p-2.5 rounded shadow-lg text-xs flex flex-col text-left">
                    <span className="text-[10px] text-gold-500 font-mono tracking-widest font-semibold uppercase">DESIGN</span>
                    <span className="font-semibold mt-0.5">Hidden Cable Management</span>
                  </div>
                </div>
              </div>
 
              {/* Technical features breakdown */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center gap-2 text-xs text-gold-500 uppercase tracking-widest font-semibold">
                  <Layout size={14} />
                  <span>Media Console Engineering</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  Suspended TV Consoles & Feature Walls
                </h3>
                <p className="text-[#CCCCCC] text-sm leading-relaxed font-light">
                  A perfect entertainment unit needs structure to hold massive television screens, while completely hiding cables and consoles. NJ TV units are wall-engineered with multi-layered backings, soundbar decks, and soft-opening flip drawers.
                </p>
 
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  {/* Item 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-1 rounded-full bg-gold-500/10 text-gold-500">
                        <EyeOff size={14} />
                      </div>
                      <span>Zero-Cable Sightlines</span>
                    </div>
                    <p className="text-[#888888] text-xs font-light leading-relaxed">
                      Custom-routed internal pvc ducts route all HDMI and power cables inside the back panel for absolute clean lines.
                    </p>
                  </div>
                  {/* Item 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-1 rounded-full bg-gold-500/10 text-gold-500">
                        <Sparkles size={14} />
                      </div>
                      <span>Stone & Fluted Textures</span>
                    </div>
                    <p className="text-[#888888] text-xs font-light leading-relaxed">
                      Staggered wood slats combined with high-gloss sintered stone laminates and golden metal inlay dividers.
                    </p>
                  </div>
                  {/* Item 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-1 rounded-full bg-gold-500/10 text-gold-500">
                        <Sliders size={14} />
                      </div>
                      <span>Floating Cantilevers</span>
                    </div>
                    <p className="text-[#888888] text-xs font-light leading-relaxed">
                      Consoles are mounted on ultra-high capacity hidden brackets, allowing heavy sound systems to rest safely.
                    </p>
                  </div>
                  {/* Item 4 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                      <div className="p-1 rounded-full bg-gold-500/10 text-gold-500">
                        <Layers size={14} />
                      </div>
                      <span>Acoustic-Friendly Wood</span>
                    </div>
                    <p className="text-[#888888] text-xs font-light leading-relaxed">
                      Selected timber materials with optimal density to enhance acoustic resonance for rear-firing TV speakers.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
 
      </div>
    </section>
  );
}
