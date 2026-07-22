import { Trophy, Microscope, Sparkles, Scale, GraduationCap } from 'lucide-react';
import { timelineEvents } from '../data';

const iconMap: Record<string, any> = {
  award: Trophy,
  milestone: Sparkles,
  speaking: GraduationCap, // Registered pharmacist board
};

export default function AwardsTimeline() {
  return (
    <section id="timeline" className="py-24 bg-cream-main relative">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-sage-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-lg mx-auto mb-20">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sage-700 bg-[#E8E6DE] px-3.5 py-1.5 rounded-full">
            Journey of Trust
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-sage-900 font-semibold tracking-tight mt-6">
            Awards, Certifications & Milestones
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base font-sans font-light">
            A chronological legacy of scientific exploration, personal breakthrough, and regional recognition.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-sage-500/10 ml-4 md:ml-32 pl-8 md:pl-12 space-y-12">
          
          {timelineEvents.map((event, idx) => {
            const IconComponent = iconMap[event.category] || Sparkles;
            
            return (
              <div
                id={`timeline-item-${event.id}`}
                key={event.id}
                className="relative group"
              >
                {/* Year Label - Absolutely positioned left on desktop */}
                <div className="hidden md:block absolute -left-44 top-1.5 w-24 text-right">
                  <span className="text-xl font-serif font-bold text-sage-700 block tracking-tight">
                    {event.year}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mt-1 font-mono">
                    {event.category === 'award' ? 'Award' : event.category === 'speaking' ? 'Academic' : 'Milestone'}
                  </span>
                </div>

                {/* Timeline Pin/Dot */}
                <div className="absolute -left-[45px] md:-left-[61px] top-1.5 w-8 h-8 rounded-full bg-white border border-sage-200 shadow-sm flex items-center justify-center text-sage-600 group-hover:text-white group-hover:bg-sage-600 group-hover:border-sage-600 transition-colors z-10">
                  <IconComponent size={14} className="stroke-[2]" />
                </div>

                {/* Mobile Year Badge */}
                <div className="md:hidden inline-block mb-2 bg-[#E8E6DE] text-sage-800 text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full">
                  {event.year} &bull; {event.category.toUpperCase()}
                </div>

                {/* Content Box */}
                <div className="space-y-2 bg-white/40 hover:bg-white p-6 md:p-8 rounded-2xl border border-white hover:border-sage-200/50 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-sage-900 tracking-tight">
                    {event.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-gold-500 uppercase tracking-wider font-sans">
                    {event.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans font-light text-balance">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Short motivational block */}
        <div className="mt-20 p-8 rounded-3xl bg-sage-900 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <p className="font-serif text-lg md:text-xl font-light text-sage-100 leading-relaxed">
            "Your health is an unfolding journey. Join me in establishing a legacy of safe, medicine-free well-being."
          </p>
          <div className="mt-4 flex items-center justify-center gap-2.5 text-[10px] text-gold-300 font-mono tracking-wider uppercase font-bold">
            <span>Clinical Foundation</span>
            <span>&bull;</span>
            <span>Personal Empathy</span>
            <span>&bull;</span>
            <span>Proven Success</span>
          </div>
        </div>

      </div>
    </section>
  );
}
