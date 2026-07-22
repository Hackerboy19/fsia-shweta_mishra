import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-cream-main border-t border-sage-500/10">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sage-700 bg-[#E8E6DE] px-3.5 py-1.5 rounded-full">
            Common Inquiries
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-sage-900 font-semibold tracking-tight mt-6">
            Demystifying Holistic Care
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base font-sans font-light">
            Clear, transparent answers regarding programs, integration options, and biological philosophy.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                id={`faq-item-${item.id}`}
                key={item.id}
                className="bg-white/60 backdrop-blur-xs rounded-2xl border border-white shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  id={`btn-faq-toggle-${item.id}`}
                  onClick={() => toggle(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base md:text-lg font-medium text-slate-800 hover:text-sage-700 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-sage-500 shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-sage-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-500 leading-relaxed font-sans font-light border-t border-sage-500/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
