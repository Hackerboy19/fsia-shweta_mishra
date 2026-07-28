import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, Mail, Clock, Calendar, CheckCircle2, MessageSquare, ArrowUp, Sparkles, ChevronRight } from 'lucide-react';

interface Submission {
  name: string;
  email: string;
  phone: string;
  goal: string;
  timeSlot: string;
  message: string;
  timestamp: string;
}

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'Weight Correction',
    timeSlot: 'Morning (9 AM - 12 PM)',
    message: '',
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      const stored = localStorage.getItem('shweta_submissions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<Submission | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }

    const newSub: Submission = {
      ...formData,
      timestamp: new Date().toLocaleDateString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('shweta_submissions', JSON.stringify(updated));
    setLastSubmission(newSub);
    setShowReceipt(true);

    // Reset Form
    setFormData({
      name: '',
      email: '',
      phone: '',
      goal: 'Weight Correction',
      timeSlot: 'Morning (9 AM - 12 PM)',
      message: '',
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Shweta! I would love to book a personalized holistic wellness discovery call with you. Please let me know your availability.`
  );
  
  // Real link formulation using standard international format for demo/coaching
  const whatsappLink = `https://wa.me/919983286999?text=${whatsappMessage}`;
  const emailLink = `mailto:starindiaaward@gmail.com?subject=Wellness%20Discovery%20Call%20Request&body=Hello%20Shweta,%0D%0A%0D%0AI%20would%20love%20to%20book%20a%20clinical%20wellness%20coaching%20session%20with%20you.%0D%0A%0D%0AKind%20regards.`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-sage-900 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative starry blobs */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-[radial-gradient(circle_at_bottom,rgba(125,139,115,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Copy & Direct Connect */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
                Transformation Call
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-serif font-semibold tracking-tight leading-tight">
                Ready to Take Control <br />Of Your Health?
              </h2>
              <p className="text-sage-200 font-sans font-light leading-relaxed text-sm md:text-base">
                Book a complimentary 15-minute diagnostic discovery call with Shweta Mishra. Understand your biological profile, review current wellness challenges, and design an actionable starting plan.
              </p>
            </div>

            {/* Quick trust metrics */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-[10px] font-bold uppercase text-sage-400 tracking-wider">Direct Channels</h4>
              <div className="space-y-3">
                <a
                  id="link-whatsapp-direct"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-xs md:text-sm text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <div className="p-2.5 bg-white/5 group-hover:bg-emerald-500/15 text-slate-300 group-hover:text-emerald-400 rounded-xl transition-all border border-white/5">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-slate-500 font-bold tracking-wider">Immediate Chat</p>
                    <p className="font-medium font-mono">+91 99832 86999 (WhatsApp)</p>
                  </div>
                </a>

                <a
                  id="link-email-direct"
                  href={emailLink}
                  className="flex items-center gap-3.5 text-xs md:text-sm text-slate-300 hover:text-gold-400 transition-colors group"
                >
                  <div className="p-2.5 bg-white/5 group-hover:bg-gold-500/15 text-slate-300 group-hover:text-gold-400 rounded-xl transition-all border border-white/5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-slate-500 font-bold tracking-wider">Official Email</p>
                    <p className="font-medium font-mono font-light">starindiaaward@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Credentials recall */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-gold-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                <Sparkles size={12} />
                <span>Raipur Clinic Hours</span>
              </div>
              <p className="text-xs text-sage-200/90 leading-relaxed font-light">
                Physical consults available by prior reservation at VIP Road Clinic, Raipur. Digital telehealth available globally.
              </p>
            </div>
          </div>

          {/* Right Column - Submission Form / Receipt */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {!showReceipt ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="border-b border-white/10 pb-4 mb-2">
                      <h3 className="font-serif text-lg font-medium text-slate-200">
                        Request a Callback Slot
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Fill in your clinical parameters; Shweta will review before dialing.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name *</label>
                        <input
                          id="form-input-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Sahu"
                          className="w-full bg-white/5 border border-white/10 focus:border-sage-400 focus:bg-white/10 text-white rounded-xl py-3 px-4 text-xs md:text-sm focus:outline-none transition-all placeholder:text-slate-600"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number *</label>
                        <input
                          id="form-input-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-white/5 border border-white/10 focus:border-sage-400 focus:bg-white/10 text-white rounded-xl py-3 px-4 text-xs md:text-sm focus:outline-none transition-all placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                        <input
                          id="form-input-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. help@example.com"
                          className="w-full bg-white/5 border border-white/10 focus:border-sage-400 focus:bg-white/10 text-white rounded-xl py-3 px-4 text-xs md:text-sm focus:outline-none transition-all placeholder:text-slate-600"
                        />
                      </div>

                      {/* Goal Selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Health Goal</label>
                        <select
                          id="form-input-goal"
                          value={formData.goal}
                          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 focus:border-sage-400 focus:bg-white/10 text-white rounded-xl py-3 px-4 text-xs md:text-sm focus:outline-none transition-all"
                        >
                          <option className="bg-slate-900 text-white" value="Weight Correction">Weight Correction</option>
                          <option className="bg-slate-900 text-white" value="PCOS / Thyroid Healing">PCOS / Thyroid Healing</option>
                          <option className="bg-slate-900 text-white" value="Diabetes / Cardiovascular">Diabetes / Cardiovascular</option>
                          <option className="bg-slate-900 text-white" value="Stress & Circus rhythms">Circadian bio-rhythm tune</option>
                          <option className="bg-slate-900 text-white" value="Corporate Team Program">Corporate Program</option>
                        </select>
                      </div>
                    </div>

                    {/* Best Callback time */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                        <Clock size={12} className="text-gold-300" />
                        <span>Preferred Call Time Slot</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {['Morning (9 AM - 12 PM)', 'Afternoon (1 PM - 4 PM)', 'Evening (5 PM - 8 PM)'].map((slot) => {
                          const isSel = formData.timeSlot === slot;
                          return (
                            <button
                              id={`btn-timeslot-${slot.replace(/\s+/g, '')}`}
                              key={slot}
                              type="button"
                              onClick={() => setFormData({ ...formData, timeSlot: slot })}
                              className={`py-2 px-3 text-[10px] md:text-xs font-semibold rounded-full text-center border transition-all ${
                                isSel
                                  ? 'bg-sage-600 text-white border-sage-600'
                                  : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                              }`}
                            >
                              {slot.split(' (')[0]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Note / Message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Any specific health symptoms?</label>
                      <textarea
                        id="form-input-message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Mention any thyroid issues, metabolic history, or specific requirements..."
                        className="w-full bg-white/5 border border-white/10 focus:border-sage-400 focus:bg-white/10 text-white rounded-xl py-3 px-4 text-xs md:text-sm focus:outline-none transition-all placeholder:text-slate-600 resize-none"
                      />
                    </div>

                    <button
                      id="btn-submit-contact"
                      type="submit"
                      className="group w-full py-4 bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm shadow-xl shadow-gold-950/20"
                    >
                      <span>Secure Callback Slot</span>
                      <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-receipt"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle2 size={32} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-slate-100">
                        Consultation Reserved!
                      </h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                        Your metabolic request has been securely logged. Shweta Mishra will review your parameters before initiating your diagnostic callback.
                      </p>
                    </div>

                    {/* Styled Receipt */}
                    {lastSubmission && (
                      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto relative overflow-hidden font-sans">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 rounded-bl-full pointer-events-none" />
                        
                        <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                          <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider font-mono">
                            Vitality Callback Ticket
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {lastSubmission.timestamp}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase">Client</span>
                            <span className="text-slate-200 font-medium">{lastSubmission.name}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase">Goal Target</span>
                            <span className="text-slate-200 font-medium">{lastSubmission.goal}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase">Contact</span>
                            <span className="text-slate-200 font-medium font-mono">{lastSubmission.phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase">Call Slot</span>
                            <span className="text-slate-200 font-medium">{lastSubmission.timeSlot.split(' (')[0]}</span>
                          </div>
                        </div>

                        {lastSubmission.message && (
                          <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed italic">
                            "Note: {lastSubmission.message}"
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-center gap-4">
                      <button
                        id="btn-submit-another"
                        onClick={() => setShowReceipt(false)}
                        className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-full border border-white/10 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                      <a
                        id="receipt-whatsapp-link"
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full transition-all"
                      >
                        Ping on WhatsApp
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Footer Base */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-serif text-lg font-bold text-slate-200">Shweta Mishra</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Registered Pharmacist &bull; Certified Astrologer &bull; Super Woman 2026 Awardee. Empowering Central India since 2020.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              id="btn-back-to-top"
              onClick={scrollToTop}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-400 hover:text-white transition-all flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
            >
              <span>Back To Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] text-slate-600 font-mono">
          &copy; {new Date().getFullYear()} Shweta Mishra Holistic Wellness. Raipur, Chhattisgarh. All rights reserved.
        </div>

      </div>

      {/* Persistent Floating Quick Action Ring for WhatsApp & Email on bottom right of viewport */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          id="floating-whatsapp"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 hover:scale-105 transition-all"
          title="Chat on WhatsApp"
        >
          <MessageSquare size={20} className="stroke-[2.5]" />
        </a>
        <a
          id="floating-email"
          href={emailLink}
          className="w-12 h-12 rounded-full bg-gold-400 text-slate-950 flex items-center justify-center shadow-lg shadow-gold-500/25 hover:bg-gold-500 hover:scale-105 transition-all"
          title="Send Email"
        >
          <Mail size={20} className="stroke-[2.5]" />
        </a>
      </div>
    </footer>
  );
}
