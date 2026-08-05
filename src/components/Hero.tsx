import { Sparkles, ArrowRight, ShieldCheck, Cpu, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 bg-[#0A0A0A] text-[#E5E5E5] overflow-hidden"
    >
      {/* Absolute Background Image with elegant dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
          alt="NJ Interior Premium Masterpiece"
          className="w-full h-full object-cover object-center opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
      </div>

      {/* Decorative vertical lines for editorial luxury vibe */}
      <div className="absolute inset-y-0 left-10 w-px bg-[#1A1A1A] hidden lg:block" />
      <div className="absolute inset-y-0 right-10 w-px bg-[#1A1A1A] hidden lg:block" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Branding */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 px-3 py-1 rounded text-gold-500 text-xs font-semibold tracking-wider uppercase"
            >
              <Sparkles size={13} className="animate-pulse" />
              <span>Pudukkottai’s Finest Woodcraft Artisans</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white"
              >
                Crafting Spaces, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500 font-serif italic">
                  Perfecting Lifestyles
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#CCCCCC] text-base sm:text-lg max-w-2xl font-light leading-relaxed"
              >
                Bespoke interior execution by <strong>NJ Interior</strong>. We bring master woodwork to life — from premium floor-to-ceiling wardrobes with flawless sliding gear to backlit custom marble TV units, all backed by a 10-year warranty.
              </motion.p>
            </div>

            {/* Main Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => handleScrollTo('portfolio')}
                className="bg-gold-500 hover:bg-gold-600 text-[#0A0A0A] font-bold px-7 py-4 text-sm rounded shadow-lg hover:shadow-gold-500/20 transition-all duration-200 hover:translate-y-[-1px] flex items-center gap-2 cursor-pointer"
              >
                <span>View Our Projects </span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => handleScrollTo('consultation')}
                className="bg-[#111111] border border-[#1A1A1A] hover:border-gold-500 hover:bg-[#151515] text-white font-semibold px-7 py-4 text-sm rounded transition-all duration-200 cursor-pointer"
              >
                Get Free Woodwork Quote
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1A1A1A] max-w-lg"
            >
              <div className="text-left">
                <p className="font-serif text-3xl font-light text-gold-500">100+</p>
                <p className="text-[10px] text-[#888888] uppercase tracking-widest mt-1 font-medium">Bespoke Projects</p>
              </div>
              <div className="text-left">
                <p className="font-serif text-3xl font-light text-gold-500">100%</p>
                <p className="text-[10px] text-[#888888] uppercase tracking-widest mt-1 font-medium">Waterproof Plywood</p>
              </div>
              <div className="text-left">
                <p className="font-serif text-3xl font-light text-gold-500">10Y</p>
                <p className="text-[10px] text-[#888888] uppercase tracking-widest mt-1 font-medium">Direct Warranty</p>
              </div>
            </motion.div>

          </div>

          {/* Graphic Side Card with custom floating highlights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative rounded-lg overflow-hidden border border-[#1A1A1A] aspect-[4/5] bg-[#0D0D0D] group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
                alt="NJ Interior sliding wardrobe close up"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/20" />
              
              {/* Highlight badge on the photo */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0D0D0D]/95 backdrop-blur-md border border-[#1A1A1A] p-5 rounded-lg text-left shadow-lg">
                <div className="flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest font-bold mb-2">
                  <Star size={12} fill="currentColor" />
                  <span>Featured Woodwork</span>
                </div>
                <h3 className="font-serif text-base font-bold text-white">The Obsidian Sliding Closet</h3>
                <p className="text-xs text-[#888888] mt-1 font-light leading-relaxed">
                  Glass profiles, soft-close sliding dampers, and integrated sensor hangers.
                </p>
              </div>
            </div>

            {/* Overlapping small decorative cards */}
            <div className="absolute -top-6 -left-6 bg-[#0D0D0D]/95 backdrop-blur-sm border border-[#1A1A1A] p-4 rounded shadow-xl text-left hidden xl:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">BWP Marine Grade</p>
                <p className="text-[10px] text-[#888888]">Termite-proof & Boiling-water proof</p>
              </div>
            </div>

            <div className="absolute bottom-24 -right-6 bg-[#0D0D0D]/95 backdrop-blur-sm border border-[#1A1A1A] p-4 rounded shadow-xl text-left hidden xl:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                <Cpu size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Precision German Hardware</p>
                <p className="text-[10px] text-[#888888]">Hettich & Blum Soft-close Slides</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
