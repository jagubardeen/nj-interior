import { useState, useEffect, FormEvent } from 'react';
import { Send, PhoneCall, Calendar, CheckCircle2, ShieldAlert, Sparkles, Sliders } from 'lucide-react';
import { ProjectCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { submitInquiryToGoogleSheet } from '../services/googleSheetService';

interface ConsultationFormProps {
  prefilledProjectName?: string;
  prefilledCategory?: ProjectCategory | 'General';
  onClearPrefill?: () => void;
}

export default function ConsultationForm({
  prefilledProjectName,
  prefilledCategory = 'General',
  onClearPrefill
}: ConsultationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ProjectCategory | 'General'>('General');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync prefilled values from the modal inquiry click
  useEffect(() => {
    if (prefilledCategory) {
      setCategory(prefilledCategory);
    }
    if (prefilledProjectName) {
      setMessage(`Hello, I am interested in getting a customization quote for the "${prefilledProjectName}" design for my home.`);
    }
  }, [prefilledProjectName, prefilledCategory]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);

    await submitInquiryToGoogleSheet({
      name,
      phone,
      email,
      category,
      projectName: prefilledProjectName || 'General Inquiry',
      message
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    if (onClearPrefill) onClearPrefill();
  };


  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCategory('General');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="consultation" className="py-24 bg-[#0A0A0A] text-[#E5E5E5] relative overflow-hidden border-b border-[#1A1A1A]">
      
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-16 items-center"
        >
          
          {/* Left Block: Design Consultation Steps */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold font-mono">Work with us</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white">
                Our 4-Step Seamless Woodwork Journey
              </h2>
              <p className="text-[#888888] text-sm font-light leading-relaxed">
                NJ Interior removes the stress of home construction. From raw measurement drafts to high-fidelity factory woodwork, here is how we design your space.
              </p>
            </div>

            {/* Timelines list */}
            <div className="space-y-6 pt-2">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#E5E5E5]">Floor Plan Review & Sizing</h4>
                  <p className="text-xs text-[#888888] mt-1 font-light leading-relaxed">
                    Submit your blueprints or let our engineer take site measurements to fit wardrobes and TV units seamlessly.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#E5E5E5]">3D Texture & Material Choice</h4>
                  <p className="text-xs text-[#888888] mt-1 font-light leading-relaxed">
                    Select laminates, high-gloss acrylic panels, custom glass profiles, or veneers at our experience layout.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#E5E5E5]">Factory-Precision Joinery</h4>
                  <p className="text-xs text-[#888888] mt-1 font-light leading-relaxed">
                    We process and cut panels in our dust-free facility using heavy-duty German machinery for bubble-free edge banding.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  04
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#E5E5E5]">10-Day Clean Assembly</h4>
                  <p className="text-xs text-[#888888] mt-1 font-light leading-relaxed">
                    Our master carpenters assemble and clean up, leaving you with spotless wardrobes and beautiful TV decks.
                  </p>
                </div>
              </div>
            </div>

            {/* Quality badge footer */}
            <div className="p-4 border border-[#1A1A1A] rounded bg-[#0D0D0D]/90 flex items-center gap-3.5 max-w-sm">
              <Calendar className="text-gold-500 shrink-0" size={20} />
              <div className="text-xs">
                <p className="font-bold text-[#E5E5E5]">10-Year Direct Woodwork Warranty</p>
                <p className="text-[#888888] font-light mt-0.5">Coverage for bubbling, alignment drift, and hinge fatigue.</p>
              </div>
            </div>
          </div>

          {/* Right Block: Inquiry Form Card */}
          <div className="lg:col-span-7 bg-[#0D0D0D] border border-[#1A1A1A] p-8 sm:p-10 rounded-xl shadow-2xl relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form-active"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-light text-white">Request a Free Design Quote</h3>
                    <p className="text-[#888888] text-xs font-light">
                      Let us know what you are looking for. Our woodwork design specialists will review your requirements.
                    </p>
                  </div>

                  {/* Prefill indicator alert */}
                  {prefilledProjectName && (
                    <div className="bg-gold-500/10 border border-gold-500/30 p-3 rounded text-xs text-gold-500 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Inquiring about <strong>{prefilledProjectName}</strong></span>
                      </div>
                      <button
                        type="button"
                        onClick={onClearPrefill}
                        className="text-[10px] uppercase tracking-wider underline hover:text-gold-300 cursor-pointer"
                      >
                        Clear Refill
                      </button>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="text-xs uppercase tracking-wider text-[#888888] font-medium">Your Name *</label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="NJ"
                        className="w-full bg-[#0A0A0A] border border-[#1A1A1A] focus:border-gold-500 rounded p-3 text-xs text-stone-100 placeholder-[#555555] focus:outline-none"
                      />
                    </div>

                    {/* Phone input */}
                    <div className="space-y-2">
                      <label htmlFor="form-phone" className="text-xs uppercase tracking-wider text-[#888888] font-medium">Contact Number *</label>
                      <input
                        type="tel"
                        id="form-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-[#0A0A0A] border border-[#1A1A1A] focus:border-gold-500 rounded p-3 text-xs text-stone-100 placeholder-[#555555] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="text-xs uppercase tracking-wider text-[#888888] font-medium">Email Address *</label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="njinterior.in@outlook.com"
                        className="w-full bg-[#0A0A0A] border border-[#1A1A1A] focus:border-gold-500 rounded p-3 text-xs text-stone-100 placeholder-[#555555] focus:outline-none"
                      />
                    </div>

                    {/* Preferred Category dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="form-category" className="text-xs uppercase tracking-wider text-[#888888] font-medium">Work Needed</label>
                      <select
                        id="form-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full bg-[#0A0A0A] border border-[#1A1A1A] focus:border-gold-500 rounded p-3 text-xs text-stone-100 focus:outline-none"
                      >
                        <option value="General">General Inquiries</option>
                        <option value="Wardrobe">Wardrobes & Closets</option>
                        <option value="TV Unit">Bespoke TV Wall Units</option>
                        <option value="Modular Kitchen">Modular Kitchen Joinery</option>
                        <option value="Bespoke Bedroom">Bespoke Bedroom Woodcraft</option>
                        <option value="Full Home Interior">Full Home Joinery Package</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="text-xs uppercase tracking-wider text-[#888888] font-medium">Design Brief / Floor Plan Details</label>
                    <textarea
                      id="form-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify your dimensions, bedroom counts, or wardrobe laminate styles (e.g., Wardrobe sliding mechanisms, floating wooden TV decks)..."
                      className="w-full bg-[#0A0A0A] border border-[#1A1A1A] focus:border-gold-500 rounded p-3 text-xs text-stone-100 placeholder-[#555555] focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-[#0A0A0A] font-bold py-3.5 px-6 rounded text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-gold-500/10"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                        <span>Processing Brief...</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Schedule Design Briefing</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-[#555555] text-center font-light leading-relaxed">
                    * NJ Interior guarantees full privacy. Your contact details will only be used to schedule a free 3D blueprint consultation.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-gold-500/10 border-2 border-gold-500 text-gold-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-light text-white">Inquiry Received Successfully!</h3>
                    <p className="text-[#CCCCCC] text-sm font-light max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{name}</strong>. Our senior woodcraft designer at NJ Interior will contact you on <strong>{phone}</strong> within 12 hours via WhatsApp or phone call.
                    </p>
                  </div>

                  <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-4 rounded-lg max-w-sm mx-auto text-left text-xs space-y-1.5">
                    <p className="font-semibold text-gold-500">What happens next?</p>
                    <p className="text-[#888888] font-light leading-normal">
                      1. We will text you to confirm your layout requirements. <br />
                      2. We will generate a customized 3D design brief. <br />
                      3. You will receive a breakdown of exact material expenses (Plywood, hinges, laminates).
                    </p>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="text-xs text-gold-500 hover:text-gold-400 font-semibold font-mono tracking-wide underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
