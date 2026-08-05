import { MapPin, Mail, Phone, Instagram, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavigateHome?: () => void;
}

export default function Footer({ onNavigateHome }: FooterProps) {
  const scrollTo = (id: string) => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <footer className="bg-[#0D0D0D] text-[#E5E5E5] pt-16 pb-8 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left mb-12"
        >
          
          {/* Column 1: Logo & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
              <div className="w-9 h-9 flex items-center justify-center border border-gold-500 bg-gold-500/5 rounded">
                <span className="font-serif text-gold-500 text-base font-bold">NJ</span>
              </div>
              <div>
                <h2 className="font-serif text-md font-light tracking-widest text-white">NJ INTERIOR</h2>
                <p className="text-[9px] uppercase tracking-widest text-gold-500 font-semibold font-mono">Bespoke Woodcraft</p>
              </div>
            </div>
            
            <p className="text-[#888888] text-xs font-light max-w-sm leading-relaxed">
              NJ Interior designs and executes premier residential woodwork across Pudukkottai, specialized in space-optimized sliding wardrobe configurations, television entertainment backdrops, and modular kitchen solutions.
            </p>

            <div className="flex items-center gap-2 text-[10px] text-gold-500 font-mono font-medium">
              <Sparkles size={11} fill="currentColor" />
              <span>FACTORY DIRECT PRICING & 10-YEAR WARRANTY</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold font-mono">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#888888]">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-gold-500 transition-colors cursor-pointer">
                  Back to Top
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('portfolio')} className="hover:text-gold-500 transition-colors cursor-pointer">
                  Signature Projects (30)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('consultation')} className="hover:text-gold-500 transition-colors cursor-pointer">
                  Get Free Design Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold font-mono">Pudukkottai Office</h4>
            <ul className="space-y-3 text-xs text-[#888888]">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-gold-500 shrink-0 mt-0.5" />
                <span className="font-light leading-relaxed">
                  NJ Interior,Kalif Nagar 4th Street,Near SFS School, Pudukkottai, Tamil Nadu - 622001
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold-500 shrink-0" />
                <a href="tel:+918681828226" className="hover:text-gold-500 font-mono font-light transition-colors">
                  +91 86818 28226
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold-500 shrink-0" />
                <a href="mailto:njinterior.in@outlook.com" className="hover:text-gold-500 font-mono font-light transition-colors">
                  njinterior.in@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram size={14} className="text-gold-500 shrink-0" />
                <a 
                  href="https://www.instagram.com/njinterior.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold-500 font-mono font-light transition-colors flex items-center gap-1"
                >
                  <span>@njinterior.in</span>
                </a>
              </li>
            </ul>
          </div>

        </motion.div>

        {/* Footer Accent divider */}
        <div className="pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555555]">
          <p>© {new Date().getFullYear()} NJ Interior Pudukkottai. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => scrollTo('portfolio')} className="hover:text-gold-500 transition-colors font-light cursor-pointer">
              30 Projects Showcase
            </button>
            <button onClick={() => scrollTo('consultation')} className="hover:text-gold-500 transition-colors font-light cursor-pointer">
              Book Site Visit
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
