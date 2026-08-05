import { useState, useRef, useEffect, FormEvent } from 'react';
import { Bot, X, Send, Sparkles, User, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitInquiryToGoogleSheet } from '../services/googleSheetService';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  quickReplies?: string[];
  hasInquiryTrigger?: boolean;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: () => void;
}

export default function AIChatbot({ isOpen, onClose, onOpenEnquiry }: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am Ramesh & NJ Interior Pudukkottai AI Design Assistant. How can I assist with your home woodwork today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        'Wardrobe Price per Sq.Ft',
        'Modular Kitchen Materials',
        'TV Unit Custom Options',
        'Book Free Site Measurement'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Quick Lead capture inside Chat
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI logic response simulation tailored specifically for NJ Interior Pudukkottai
    setTimeout(() => {
      let aiText = '';
      let quickReplies: string[] | undefined = undefined;
      let hasInquiryTrigger = false;

      const lower = userText.toLowerCase();

      if (lower.includes('wardrobe') || lower.includes('price') || lower.includes('sq.ft') || lower.includes('cost')) {
        aiText = 'In Pudukkottai, our custom wardrobe pricing starts at ₹950/sq.ft for Classic HDHMR with laminates, ₹1,400/sq.ft for High-Gloss Acrylic, and ₹1,900+/sq.ft for Bronze Tinted Glass Sliders with LED profile lighting and Hettich fittings. All wardrobes include a 10-year warranty!';
        quickReplies = ['Book Free Site Measurement', 'Explore 30 Finished Projects', 'Request Quote on Google Sheet'];
      } else if (lower.includes('kitchen') || lower.includes('modular')) {
        aiText = 'Our modular kitchens in Pudukkottai are built using 100% BWP (Boiling Water Proof) Gurjan Marine Plywood carcass to resist moisture, combined with anti-fingerprint acrylic or lacquered glass shutters, Blum tandemboxes, and quartz countertops.';
        quickReplies = ['View Kitchen Gallery', 'Get Kitchen Estimate', 'Schedule Site Inspection'];
      } else if (lower.includes('tv unit') || lower.includes('living')) {
        aiText = 'We construct floating TV units with marble laminate backdrops, solid teak/oak fluted louver panels, concealed cable management, and dimmable COB ambient lights starting from ₹35,000 to ₹1,20,000 depending on dimensions.';
        quickReplies = ['TV Unit Cost Calculator', 'Book Free Measurement'];
      } else if (lower.includes('measurement') || lower.includes('book') || lower.includes('schedule') || lower.includes('contact')) {
        aiText = 'We offer 100% FREE site measurements across Pudukkottai (Rajagopalapuram, Machuvadi, Marthandapuram, Nizam Colony, Kamarajapuram & surrounding areas). You can submit your phone number below to save your request into our Google Sheet!';
        hasInquiryTrigger = true;
      } else {
        aiText = 'At NJ Interior Pudukkottai, Ramesh and our team specialize in 100% custom wardrobes, TV backdrops, modular kitchens, and full-home joinery. Would you like a instant budget estimate or a free site measurement?';
        quickReplies = ['Wardrobe Cost', 'Modular Kitchens', 'Book Measurement in Pudukkottai'];
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies,
        hasInquiryTrigger
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleQuickLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    await submitInquiryToGoogleSheet({
      name: leadName,
      phone: leadPhone,
      category: 'General',
      message: 'Lead collected via NJ Interior AI Chatbot Assistant'
    });

    setLeadSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-4 bottom-20 md:left-6 md:right-auto md:w-[380px] z-50 bg-[#0F0F0F] border border-gold-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col h-[520px]"
        >
          {/* Header */}
          <div className="bg-[#141414] border-b border-[#222] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center text-gold-500">
                <Bot size={18} />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-[#0F0F0F]"></span>
              </div>
              <div>
                <h3 className="text-xs font-serif font-semibold text-white tracking-wide">NJ Interior AI Assistant</h3>
                <p className="text-[10px] font-mono text-gold-500 flex items-center gap-1">
                  <Sparkles size={10} />
                  <span>Pudukkottai Woodcraft Guide</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-[#888888] hover:text-white transition-colors p-1.5 rounded-full hover:bg-[#222] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gold-500 text-black font-medium rounded-br-none'
                      : 'bg-[#181818] border border-[#262626] text-[#E5E5E5] rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] font-mono text-[#555555] mt-1 px-1">{msg.time}</span>

                {/* Quick Replies */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (reply === 'Request Quote on Google Sheet' || reply === 'Book Free Site Measurement') {
                            onOpenEnquiry();
                          } else {
                            handleSend(reply);
                          }
                        }}
                        className="text-[10px] font-mono bg-[#1C1C1C] hover:bg-gold-500/20 text-gold-400 border border-gold-500/20 hover:border-gold-500/50 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* In-chat quick lead form */}
                {msg.hasInquiryTrigger && (
                  <div className="w-full mt-3 bg-[#141414] border border-gold-500/20 rounded-xl p-3 space-y-2">
                    {!leadSubmitted ? (
                      <form onSubmit={handleQuickLeadSubmit} className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-gold-500 block">
                          Instant Booking
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={leadName}
                          onChange={e => setLeadName(e.target.value)}
                          className="w-full bg-[#1C1C1C] border border-[#2E2E2E] text-white text-[11px] rounded px-2.5 py-1.5 focus:border-gold-500 focus:outline-none"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="WhatsApp Phone Number"
                          value={leadPhone}
                          onChange={e => setLeadPhone(e.target.value)}
                          className="w-full bg-[#1C1C1C] border border-[#2E2E2E] text-white text-[11px] rounded px-2.5 py-1.5 focus:border-gold-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="w-full bg-gold-500 hover:bg-gold-400 text-black font-mono text-[10px] font-bold uppercase tracking-wider py-1.5 rounded transition-all cursor-pointer"
                        >
                          Save My Spot into NJ
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-400 text-[11px] py-1">
                        <CheckCircle2 size={14} />
                        <span>Booked into Google Sheet! Ramesh will call you.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-[#777777] text-[10px] font-mono">
                <Bot size={12} className="animate-spin text-gold-500" />
                <span>NJ Interior AI is analyzing materials...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="bg-[#141414] border-t border-[#222] p-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about wardrobes, kitchens, costs..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend(inputValue)}
              className="flex-1 bg-[#1A1A1A] border border-[#2C2C2C] focus:border-gold-500 text-xs text-white rounded-full px-3.5 py-2 focus:outline-none placeholder-[#555555]"
            />
            <button
              onClick={() => handleSend(inputValue)}
              className="p-2 bg-gold-500 hover:bg-gold-400 text-black rounded-full transition-all cursor-pointer"
            >
              <Send size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
