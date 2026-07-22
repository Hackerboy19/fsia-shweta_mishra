import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:py-32 bg-gradient-to-b from-sage-50 via-cream-main to-cream-main overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(125,139,115,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sage-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-sage-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left column - Content */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-50 text-sage-700 border border-sage-100/50 text-xs font-semibold tracking-wider uppercase"
          >
            <Sparkles size={13} className="text-gold-400 fill-gold-400" />
            <span>Raipur's Leading Wellness Authority</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-serif text-sage-900 font-semibold tracking-tight leading-[1.1] text-balance"
            >
              Transform Your Health. <br />
              <span className="text-sage-600 relative inline-block">
                Empower Your Life.
                <svg className="absolute left-0 -bottom-2 w-full h-2 text-gold-400/80" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed max-w-2xl text-balance"
            >
              Meet <strong className="font-semibold text-slate-800">Shweta Mishra</strong> — Raipur's premier clinical wellness coach. Combining the scientific rigor of pharmacology with personalized nutrition, habit bio-rhythms, and empathetic guidance to build your vibrant, medicine-free life.
            </motion.p>
          </div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <a
              id="hero-cta-primary"
              href="#contact"
              className="px-8 py-4 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-lg shadow-sage-900/10 transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 group border border-sage-700"
            >
              <span>Start Your Transformation</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              id="hero-cta-secondary"
              href="#services"
              className="px-8 py-4 bg-transparent hover:bg-sage-50 text-sage-700 font-semibold text-xs md:text-sm tracking-wider uppercase rounded-full border border-sage-600 transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
            >
              Explore My Programs
            </a>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-6 sm:pt-8 grid grid-cols-3 gap-6 border-t border-sage-100"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">18kg</div>
              <div className="text-xs text-slate-500 font-sans mt-1 uppercase tracking-widest">Sustainable Loss</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">100%</div>
              <div className="text-xs text-slate-500 font-sans mt-1 uppercase tracking-widest">Clinical Safety</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">500+</div>
              <div className="text-xs text-slate-500 font-sans mt-1 uppercase tracking-widest">Lives Restored</div>
            </div>
          </motion.div>
        </div>

        {/* Right column - Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative mt-8 lg:mt-0"
        >
          {/* Accent border decorations */}
          <div className="absolute -inset-4 rounded-t-[210px] rounded-b-[50px] border border-sage-300/30 scale-95 pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-sage-200/20 rounded-3xl blur-md pointer-events-none z-0" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-sage-200/20 rounded-full blur-xl pointer-events-none z-0" />

          {/* Main Portrait Frame - Arch Design */}
          <div className="relative rounded-t-[200px] rounded-b-[40px] overflow-hidden aspect-[3/4] border-8 border-white bg-sage-100 shadow-2xl shadow-sage-900/10 z-10 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600&h=800"
              alt="Shweta Mishra Wellness Coach"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-sage-900/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Real Floating Card inside frame */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl flex items-center gap-3.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Currently Accepting</p>
                <p className="text-xs font-semibold text-slate-800">New Holistic Transformations</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
