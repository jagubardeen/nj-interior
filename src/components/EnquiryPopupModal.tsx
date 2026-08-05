import { useState, useEffect, FormEvent } from 'react';
import { X, Sparkles, ShieldCheck, CheckCircle2, FileSpreadsheet, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitInquiryToGoogleSheet } from '../services/googleSheetService';

interface EnquiryPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProjectName?: string;
}

export default function EnquiryPopupModal({ isOpen, onClose, prefilledProjectName }: EnquiryPopupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Wardrobe',
    message: prefilledProjectName 
      ? `Interested in ${prefilledProjectName}. Please send budget estimate and 3D layout to WhatsApp.`
      : 'I need a custom woodwork design & site measurement estimate in Pudukkottai.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledProjectName) {
      setFormData(prev => ({
        ...prev,
        message: `Interested in ${prefilledProjectName}. Please send budget estimate and 3D layout to WhatsApp.`
      }));
    }
  }, [prefilledProjectName]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    await submitInquiryToGoogleSheet({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      category: formData.category,
      projectName: prefilledProjectName || 'General Project',
      message: formData.message
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Mark as dismissed so auto-scroll popup won't annoy user again
    sessionStorage.setItem('nj_enquiry_popup_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-[#0F0F0F] border border-gold-500/30 rounded-2xl p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={() => {
                sessionStorage.setItem('nj_enquiry_popup_dismissed', 'true');
                onClose();
              }}
              className="absolute top-4 right-4 text-[#888888] hover:text-white transition-colors p-2 rounded-full hover:bg-[#1A1A1A] cursor-pointer"
            >
              <X size={18} />
            </button>

            {!isSubmitted ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <FileSpreadsheet size={12} />
                    <span>Instant Quote</span>
                  </span>
                  <h2 className="text-2xl font-serif text-white tracking-wide">
                    Request Free 3D Blueprint & Price Estimate
                  </h2>
                  <p className="text-xs text-[#888888] font-light max-w-sm mx-auto">
                    Directly synced with NJ Interior Pudukkottai.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NJ"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#161616] border border-[#282828] focus:border-gold-500 text-xs text-white rounded-lg p-3 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 86818 28226"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#161616] border border-[#282828] focus:border-gold-500 text-xs text-white rounded-lg p-3 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Work Category</label>
                      <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#161616] border border-[#282828] focus:border-gold-500 text-xs text-white rounded-lg p-3 focus:outline-none transition-colors"
                      >
                        <option value="Wardrobe">Custom Wardrobe</option>
                        <option value="TV Unit">TV Unit Backdrop</option>
                        <option value="Modular Kitchen">Modular Kitchen</option>
                        <option value="Full Home Interior">Full Home Interior</option>
                        <option value="Bespoke Bedroom">Bespoke Bedroom</option>
                        <option value="False Ceiling">False Ceiling</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Requirement / Notes</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#161616] border border-[#282828] focus:border-gold-500 text-xs text-white rounded-lg p-3 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold-500 hover:bg-gold-400 active:scale-[0.99] text-black font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">submitting...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit to Nj interior</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-[#666666] font-mono pt-1">
                    <span className="flex items-center gap-1"><ShieldCheck size={12} /> 100% Privacy Protected</span>
                    <span className="flex items-center gap-1"><Sparkles size={12} /> Free Site Measurement</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif text-white">Submitted to NJ</h3>
                  <p className="text-xs text-[#999999] font-light max-w-sm mx-auto leading-relaxed">
                    Thank you {formData.name}. Your request has been logged into NJ Interior Pudukkottai. NJ will contact you within 2 hours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setIsSubmitted(false);
                  }}
                  className="bg-[#1C1C1C] hover:bg-[#282828] text-white text-xs font-mono uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
