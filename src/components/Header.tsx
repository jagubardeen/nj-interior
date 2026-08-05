import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigateHome?: () => void;
}

export default function Header({ onNavigateHome }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#1A1A1A] text-[#E5E5E5] py-3 shadow-lg'
          : 'bg-transparent text-[#E5E5E5] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with clean typography */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
            id="header-logo"
          >
            <div className={`w-10 h-10 flex items-center justify-center border-2 rounded transition-all duration-300 ${
              scrolled ? 'border-gold-500 bg-gold-500/10' : 'border-[#1A1A1A] bg-[#111111]/30 group-hover:bg-[#111111] group-hover:border-gold-500'
            }`}>
              <span className={`font-serif text-lg font-bold tracking-tight transition-colors ${
                scrolled ? 'text-gold-500' : 'text-white group-hover:text-gold-500'
              }`}>NJ</span>
            </div>
            <div>
              <h1 className="font-serif text-lg font-light tracking-[0.2em] text-white">
                NJ INTERIOR
              </h1>
              <p className="text-[9px] uppercase tracking-[0.3em] text-gold-500 font-medium">Bespoke Woodcraft</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => scrollToSection('hero')}
              className={`hover:text-gold-500 transition-colors cursor-pointer ${scrolled ? 'text-[#E5E5E5]' : 'text-[#E5E5E5]/80'}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className={`hover:text-gold-500 transition-colors cursor-pointer ${scrolled ? 'text-[#E5E5E5]' : 'text-[#E5E5E5]/80'}`}
            >
              Signature Projects (30)
            </button>
            <button
              onClick={() => scrollToSection('consultation')}
              className={`hover:text-gold-500 transition-colors cursor-pointer ${scrolled ? 'text-[#E5E5E5]' : 'text-[#E5E5E5]/80'}`}
            >
              Inquire
            </button>
          </nav>

          {/* Quick Contact & Book Call */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+918681828226"
              className="flex items-center gap-2 text-xs font-mono px-3 py-2 border border-[#1A1A1A] rounded-full transition-colors text-[#E5E5E5]/80 hover:bg-[#111111] hover:text-white"
            >
              <PhoneCall size={12} className="text-gold-500" />
              <span>+91 86818 28226</span>
            </a>
            <button
              onClick={() => scrollToSection('consultation')}
              className="bg-gold-500 hover:bg-gold-600 text-[#0A0A0A] px-4 py-2 text-xs font-semibold rounded shadow-md hover:shadow-gold-500/10 hover:translate-y-[-1px] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles size={13} />
              Book Free Consult
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => scrollToSection('consultation')}
              className="bg-gold-500 text-[#0A0A0A] p-2 text-xs font-semibold rounded shadow-sm cursor-pointer"
              title="Book Consultation"
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded transition-colors ${
                scrolled ? 'hover:bg-[#111111] text-white' : 'hover:bg-[#111111] text-[#E5E5E5]'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0D0D0D] text-[#E5E5E5] border-t border-[#1A1A1A] overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col text-left">
              <button
                onClick={() => scrollToSection('hero')}
                className="py-2.5 px-4 rounded text-stone-300 hover:bg-[#111111] hover:text-white text-left text-sm font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="py-2.5 px-4 rounded text-stone-300 hover:bg-[#111111] hover:text-white text-left text-sm font-medium"
              >
                Signature Projects (30)
              </button>
              <button
                onClick={() => scrollToSection('consultation')}
                className="py-2.5 px-4 rounded text-stone-300 hover:bg-[#111111] hover:text-white text-left text-sm font-medium"
              >
                Book Consultation
              </button>
              
              <div className="pt-4 border-t border-[#1A1A1A] flex flex-col gap-3 px-4">
                <a
                  href="tel:+918681828226"
                  className="flex items-center gap-2 text-xs font-mono text-stone-400"
                >
                  <PhoneCall size={14} className="text-gold-500" />
                  <span>+91 98765 43210</span>
                </a>
                <button
                  onClick={() => scrollToSection('consultation')}
                  className="w-full bg-gold-500 text-[#0A0A0A] py-2.5 text-center text-xs font-semibold rounded shadow-md"
                >
                  Schedule Initial Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
