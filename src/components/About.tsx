import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Microscope, Heart, CheckCircle2, ChevronRight } from 'lucide-react';

type TabType = 'science' | 'story';

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>('science');

  return (
    <section id="about" className="py-24 bg-cream-main relative overflow-hidden">
      {/* Subtle details */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-sage-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Visual Representation */}
          <div className="lg:col-span-5 space-y-6 relative">
            <div className="relative rounded-t-[180px] rounded-b-[30px] overflow-hidden aspect-[4/5] border-8 border-white shadow-xl z-10 bg-sage-100">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
                alt="Nourishing whole foods"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Award Banner */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-wider font-mono">
                  100% Starvation-Free
                </span>
              </div>
            </div>

            {/* Quick Quote Highlight */}
            <div className="bg-white/50 backdrop-blur-xs rounded-2xl p-6 border border-white relative shadow-xs">
              <p className="text-xs md:text-sm text-sage-800 italic leading-relaxed font-sans">
                "Our cells do not understand calorie counting; they understand nutrient density, molecular safety, and circadian rhythms. Heal the cell, and the body will heal itself."
              </p>
              <p className="text-xs font-semibold text-slate-700 mt-3 font-mono">
                — Shweta Mishra, Registered Pharmacist
              </p>
            </div>
          </div>

          {/* Right Column - Text & Interactive Selector */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sage-700 bg-[#E8E6DE] px-3.5 py-1.5 rounded-full">
                My Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-sage-900 font-semibold tracking-tight leading-tight">
                Science-Backed Wellness, <br className="hidden sm:inline" />
                <span className="text-sage-600 italic font-normal font-serif">Rooted in Empathy.</span>
              </h2>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex p-1 bg-[#E8E6DE]/50 rounded-full max-w-sm border border-sage-500/5">
              <button
                id="tab-science"
                onClick={() => setActiveTab('science')}
                className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'science'
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Microscope size={13} />
                <span>Clinical Science</span>
              </button>
              <button
                id="tab-story"
                onClick={() => setActiveTab('story')}
                className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'story'
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Heart size={13} />
                <span>My Transformation</span>
              </button>
            </div>

            {/* Tab Contents with animation */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                {activeTab === 'science' ? (
                  <motion.div
                    key="science-content"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <p className="text-slate-600 font-light leading-relaxed font-sans text-sm md:text-base text-balance">
                      With a formal education and licensure as a <strong className="font-semibold text-slate-800">Registered Pharmacist</strong>, my approach is built on evidence-based biochemistry, not temporary fitness trends. I look at your blood markers, hormonal profiles, and sleep logs to understand the metabolic bottlenecks behind fatigue, stubborn weight, and inflammation.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                        <span>Drug-Nutrient safety compatibility checkups</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                        <span>Reversing PCOS, pre-diabetes, thyroid issues</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                        <span>Systemic inflammation reduction blueprints</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                        <span>Clinically proven supplement coordination</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="story-content"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <p className="text-slate-600 font-light leading-relaxed font-sans text-sm md:text-base text-balance">
                      My clinical knowledge is supercharged by genuine empathy. Having gone through postpartum struggles, sluggish metabolism, and intense frustration, I embarked on a journey that led to a <strong className="font-semibold text-slate-800">sustainable 18kg fat loss transformation</strong>. I know exactly what it feels like to dread scales, struggle with cravings, and feel overwhelmed by confusing diet rules.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                        <span>Shame-free, supportive coaching ecosystem</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                        <span>Real Indian home foods, no premium organic fads</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                        <span>Mindset remodeling for stress-eating cycles</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-sage-600 shrink-0 mt-0.5" />
                        <span>Building a happy, permanent lifestyle</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sub CTA row */}
            <div className="pt-4 border-t border-sage-100 flex flex-col sm:flex-row gap-6 sm:items-center">
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                No chemical fat-burners, no starvation. 100% biological healing.
              </p>
              <a
                id="about-cta-anchor"
                href="#services"
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-sage-700 hover:text-sage-800 group"
              >
                <span>Read more about my services</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
