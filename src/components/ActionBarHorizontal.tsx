import { useState } from 'react';
import { Phone, MessageSquare, Bot, CalendarCheck, FileText, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ActionBarHorizontalProps {
  onOpenChat: () => void;
  onOpenEnquiry: () => void;
}

export default function ActionBarHorizontal({ onOpenChat, onOpenEnquiry }: ActionBarHorizontalProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const phoneNumber = '+918681828226';
  const whatsappUrl = `https://wa.me/918681828226?text=${encodeURIComponent('Hi NJ Interior Pudukkottai, I would like to inquire about custom wardrobes, TV units, and modular kitchen designs for my home.')}`;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 bottom-5 sm:bottom-6 z-[999] max-w-[calc(100vw-1.5rem)] w-max pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-row items-center gap-1.5 sm:gap-2 p-2 bg-[#0A0A0A]/95 backdrop-blur-md border border-gold-500/50 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.95)] max-w-full overflow-x-auto no-scrollbar ring-1 ring-white/10"
      >
        {/* Phone Call Button */}
        <a
          href={`tel:${phoneNumber}`}
          onMouseEnter={() => setHoveredButton('call')}
          onMouseLeave={() => setHoveredButton(null)}
          className="relative group p-2 sm:p-2.5 bg-[#181818] hover:bg-gold-500 text-white hover:text-black rounded-full border border-[#2A2A2A] transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
          title="Direct Call NJ Interior"
        >
          <Phone size={15} className="sm:w-4 sm:h-4" />
          {hoveredButton === 'call' && (
            <motion.span 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: -28 }}
              className="absolute whitespace-nowrap bg-black text-gold-500 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-gold-500/30 pointer-events-none hidden sm:block"
            >
              Call Us (+91 86818 28226)
            </motion.span>
          )}
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredButton('whatsapp')}
          onMouseLeave={() => setHoveredButton(null)}
          className="relative group p-2 sm:p-2.5 bg-[#181818] hover:bg-emerald-500 text-white hover:text-black rounded-full border border-[#2A2A2A] transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
          title="Chat on WhatsApp"
        >
          <MessageSquare size={15} className="sm:w-4 sm:h-4" />
          {hoveredButton === 'whatsapp' && (
            <motion.span 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: -28 }}
              className="absolute whitespace-nowrap bg-black text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/30 pointer-events-none hidden sm:block"
            >
              WhatsApp
            </motion.span>
          )}
        </a>

        {/* AI Chatbot Button */}
        <button
          onClick={onOpenChat}
          onMouseEnter={() => setHoveredButton('ai')}
          onMouseLeave={() => setHoveredButton(null)}
          className="relative group p-2 sm:p-2.5 bg-gradient-to-r from-gold-500/20 to-gold-600/20 hover:from-gold-500 hover:to-gold-600 text-gold-400 hover:text-black rounded-full border border-gold-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
          title="Open NJ AI ASSITANT"
        >
          <Bot size={15} className="sm:w-4 sm:h-4" />
          <span className="w-2 h-2 rounded-full bg-gold-400 absolute top-1 right-1 animate-ping"></span>
          {hoveredButton === 'ai' && (
            <motion.span 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: -28 }}
              className="absolute whitespace-nowrap bg-black text-gold-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-gold-500/30 pointer-events-none hidden sm:block"
            >
              AI Design Chatbot
            </motion.span>
          )}
        </button>

        {/* Quick Enquire Popup Trigger */}
        <button
          onClick={onOpenEnquiry}
          onMouseEnter={() => setHoveredButton('enquire')}
          onMouseLeave={() => setHoveredButton(null)}
          className="relative group px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gold-500 hover:bg-gold-400 text-black font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1 sm:gap-1.5 shrink-0 shadow-md shadow-gold-500/20"
        >
          <Sparkles size={13} className="sm:w-3.5 sm:h-3.5" />
          <span>Enquire</span>
          {hoveredButton === 'enquire' && (
            <motion.span 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: -28 }}
              className="absolute whitespace-nowrap bg-black text-gold-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-gold-500/30 pointer-events-none hidden sm:block"
            >
              Google Sheet Quote
            </motion.span>
          )}
        </button>

        {/* Book Free Site Measurement */}
        <button
          onClick={onOpenEnquiry}
          onMouseEnter={() => setHoveredButton('measure')}
          onMouseLeave={() => setHoveredButton(null)}
          className="relative group p-2 sm:p-2.5 bg-[#181818] hover:bg-gold-500 text-white hover:text-black rounded-full border border-[#2A2A2A] transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
          title="Book Free Measurement in Pudukkottai"
        >
          <CalendarCheck size={15} className="sm:w-4 sm:h-4" />
          {hoveredButton === 'measure' && (
            <motion.span 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: -28 }}
              className="absolute whitespace-nowrap bg-black text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-[#333] pointer-events-none hidden sm:block"
            >
              Free Site Measurement
            </motion.span>
          )}
        </button>
      </motion.div>
    </div>
  );
}
