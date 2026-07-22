import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, HeartPulse, Activity, Users, ArrowRight, X, Check, CheckCircle } from 'lucide-react';
import { services } from '../data';
import { ServiceItem } from '../types';

const iconMap: Record<string, any> = {
  Scale: Scale,
  HeartPulse: HeartPulse,
  Activity: Activity,
  Users: Users,
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 bg-[#F2F4F0]/30 border-y border-sage-500/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sage-700 bg-[#E8E6DE] px-3.5 py-1.5 rounded-full">
            Signature Frameworks
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-serif text-sage-900 font-semibold tracking-tight mt-6 leading-tight">
            Structured Programs Designed <br />For Sustainable Healing
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-base font-sans font-light text-balance">
            Every clinical consult begins with deep diagnostic discovery, aligning your lifestyle routines, biochemistry, and bio-rhythms.
          </p>
        </div>

        {/* Services 2x2/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || Scale;
            return (
              <div
                id={`service-card-${service.id}`}
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative bg-white/60 backdrop-blur-xs rounded-3xl p-8 border border-white hover:border-sage-300 hover:bg-white shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Floating Top Accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-sage-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-5">
                  <div className="w-12 h-12 bg-sage-50 text-sage-700 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-sage-600 group-hover:text-white">
                    <Icon size={22} className="stroke-[1.75]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-semibold text-sage-900 group-hover:text-sage-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans font-light leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-6 text-xs md:text-sm font-semibold text-sage-600 group-hover:text-sage-700">
                  <span>Explore Curriculum & Benefits</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Modal Details Overlay */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-sage-900/40 backdrop-blur-xs"
              />

              {/* Modal Content Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative bg-cream-main rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 border border-white flex flex-col"
              >
                {/* Header visual banner */}
                <div className="p-8 bg-[#F2F4F0] border-b border-sage-500/10 sticky top-0 bg-white/95 backdrop-blur-md z-20 flex justify-between items-start">
                  <div className="space-y-1.5 pr-6">
                    <span className="text-[9px] font-bold text-sage-700 tracking-wider uppercase font-mono bg-[#E8E6DE] px-3 py-1 rounded-full inline-block">
                      Program Syllabus & Outcomes
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-sage-900">
                      {selectedService.title}
                    </h3>
                  </div>
                  <button
                    id="close-service-modal"
                    onClick={() => setSelectedService(null)}
                    className="p-1.5 rounded-xl hover:bg-sage-100 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-8 space-y-6 flex-1">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Program Concept
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans font-light leading-relaxed">
                      {selectedService.longDesc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Core Pillars Included
                    </h4>
                    <div className="space-y-2.5">
                      {selectedService.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                          <span className="text-xs md:text-sm text-slate-700 leading-relaxed font-sans">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust highlight block */}
                  <div className="bg-white/55 rounded-2xl p-4 border border-white flex items-center gap-3 shadow-xs">
                    <div className="p-2 bg-white text-gold-400 rounded-xl border border-slate-100 shrink-0">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-[11px] text-slate-500 font-sans">
                      All prescriptions and medication regimens are respected and evaluated alongside nutritional modifications. Safe, holistic healthcare.
                    </span>
                  </div>
                </div>

                {/* Footer action button */}
                <div className="p-6 bg-[#F2F4F0]/60 border-t border-sage-500/10 sticky bottom-0 z-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    *Coaching consult duration: 12-week minimum structure
                  </span>
                  <a
                    id="service-modal-cta"
                    href="#contact"
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white text-xs md:text-sm font-bold tracking-wider uppercase rounded-full text-center shadow-md transition-all duration-300"
                  >
                    {selectedService.ctaText}
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
