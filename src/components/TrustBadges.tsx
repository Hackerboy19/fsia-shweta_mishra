import { Award, ShieldCheck, Sparkles } from 'lucide-react';
import { trustBadges } from '../data';

const iconMap: Record<string, any> = {
  Award: Award,
  ShieldAlert: ShieldCheck, // Changed representation to a protective ShieldCheck for pharmacy
  Sparkles: Sparkles,
};

export default function TrustBadges() {
  return (
    <section id="trust-badges" className="py-10 bg-[#F2F4F0]/30 border-y border-sage-500/10 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {trustBadges.map((badge, idx) => {
            const Icon = iconMap[badge.iconName] || Award;
            return (
              <div
                id={`trust-badge-${badge.id}`}
                key={badge.id}
                className="group flex items-start gap-4 p-5 bg-white/40 backdrop-blur-xs rounded-2xl border border-white hover:border-sage-200 hover:bg-white/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${badge.color} border shrink-0 transition-transform group-hover:scale-105`}>
                  <Icon size={20} className="stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs md:text-sm font-semibold text-slate-800 tracking-tight font-sans">
                    {badge.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-normal font-sans font-light">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
