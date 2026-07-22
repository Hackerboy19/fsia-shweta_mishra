import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Sparkles, Droplet, Clock, ChevronRight } from 'lucide-react';

type GoalType = 'weight' | 'pcos' | 'energy' | 'stress';

export default function InteractiveBMI() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [goal, setGoal] = useState<GoalType>('weight');
  const [calculated, setCalculated] = useState<boolean>(false);

  const heightInMeters = height / 100;
  const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));

  let bmiCategory = '';
  let bmiColor = '';
  let bmiSuggestion = '';

  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-700 bg-amber-50/50 border-amber-200/50';
    bmiSuggestion = 'Your body might need structured macronutrient enrichment. Focus on bio-available proteins and wholesome, complex fats rather than simple starches.';
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = 'Healthy Weight';
    bmiColor = 'text-emerald-700 bg-emerald-50/50 border-emerald-200/50';
    bmiSuggestion = 'Outstanding cellular balance! Our programs will help you maintain this vitality, fine-tune hormone responses, and optimize your micronutrient ratios.';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-700 bg-amber-50/50 border-amber-200/50';
    bmiSuggestion = 'Your system may be dealing with subtle insulin spikes or metabolic sluggishness. A personalized, inflammation-reducing menu can trigger comfortable, natural release.';
  } else {
    bmiCategory = 'Obesity';
    bmiColor = 'text-rose-700 bg-rose-50/50 border-rose-200/50';
    bmiSuggestion = 'This status suggests elevated physiological stress. Under Shweta’s dual pharmacist-nutritionist oversight, we can comfortably lower insulin, balance cortisol, and restore safe metabolic flexibility.';
  }

  // Recommended daily values (estimations)
  const waterIntake = (weight * 0.035).toFixed(1); // 35ml per kg
  const sleepTarget = goal === 'stress' ? '8.5 hours' : '7.5 - 8 hours';

  const goalInsights: Record<GoalType, { title: string; text: string; action: string }> = {
    weight: {
      title: 'Metabolic Revitalize Insight',
      text: 'To release fat permanently, we prioritize thyroid support and blood glucose stability. No crash diets—just delicious, wholesome plates tailored to Indian home kitchens.',
      action: 'Shweta’s personal 18kg loss protocol applies directly to this profile.',
    },
    pcos: {
      title: 'Hormonal Harmony Insight',
      text: 'PCOS and Thyroid conditions require a clinical understanding of hormone-receptor sensitivity. We bridge medical knowledge with specific circadian seed-cycling and insulin-sensitizing herbs.',
      action: 'Registered Pharmacist guidance ensures complete food-drug safety.',
    },
    energy: {
      title: 'Circadian Vitality Insight',
      text: 'Fatigue is a cellular energy (ATP) bottleneck. We synchronize your meals with your natural bio-rhythms, optimizing mitochondrial function for sustained focus.',
      action: 'Uses customized circadian schedules for natural daily rejuvenation.',
    },
    stress: {
      title: 'Nervous System Calibration',
      text: 'High stress (cortisol) halts digestion and causes abdominal fat storage. We integrate gentle elemental grounding habits and targeted stress-resilience breathing.',
      action: 'Combines cosmic bio-rhythms with traditional somatic nervous system support.',
    },
  };

  return (
    <section id="wellness-calculator" className="py-20 bg-cream-main border-y border-sage-500/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sage-700 bg-[#E8E6DE] px-3.5 py-1.5 rounded-full">
            Engagement Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-sage-900 mt-6 font-semibold tracking-tight">
            Analyse Your Metabolic Vitality
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto mt-3 font-sans text-sm md:text-base font-light">
            Get an instant scientific lifestyle projection based on your physiological markers and primary goals.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-xs rounded-3xl shadow-xl shadow-sage-900/5 border border-white overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Controls Form */}
          <div className="p-8 md:p-10 md:col-span-7 border-r border-sage-100 flex flex-col justify-between bg-white/40">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-sage-50 text-sage-700 rounded-xl">
                  <Calculator size={18} />
                </div>
                <h3 className="font-serif text-base font-semibold text-sage-900">Vitality Inputs</h3>
              </div>

              {/* Weight Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Weight</label>
                  <span className="text-xs font-bold text-sage-700 bg-[#E8E6DE]/60 px-2.5 py-1 rounded-full font-mono">
                    {weight} kg
                  </span>
                </div>
                <input
                  id="calc-weight-slider"
                  type="range"
                  min="40"
                  max="140"
                  value={weight}
                  onChange={(e) => {
                    setWeight(parseInt(e.target.value));
                    setCalculated(true);
                  }}
                  className="w-full accent-sage-600 bg-[#E8E6DE] h-1.5 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Height Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Height</label>
                  <span className="text-xs font-bold text-sage-700 bg-[#E8E6DE]/60 px-2.5 py-1 rounded-full font-mono">
                    {height} cm
                  </span>
                </div>
                <input
                  id="calc-height-slider"
                  type="range"
                  min="130"
                  max="210"
                  value={height}
                  onChange={(e) => {
                    setHeight(parseInt(e.target.value));
                    setCalculated(true);
                  }}
                  className="w-full accent-sage-600 bg-[#E8E6DE] h-1.5 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Goal Selector */}
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Your Primary Wellness Goal
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['weight', 'pcos', 'energy', 'stress'] as GoalType[]).map((g) => {
                    const label = g === 'weight' ? 'Weight Loss' : g === 'pcos' ? 'PCOS / Thyroid' : g === 'energy' ? 'Daily Energy' : 'Stress Release';
                    const active = goal === g;
                    return (
                      <button
                        id={`btn-goal-${g}`}
                        key={g}
                        type="button"
                        onClick={() => {
                          setGoal(g);
                          setCalculated(true);
                        }}
                        className={`py-2.5 px-3 text-xs text-center rounded-full transition-all duration-300 border ${
                          active
                            ? 'bg-sage-600 text-white border-sage-600 font-semibold shadow-md shadow-sage-900/10'
                            : 'bg-[#F2F4F0] text-slate-700 border-transparent hover:bg-slate-100'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-sage-100 flex items-center justify-between text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              <span>*Standard metric BMI scale</span>
              <span className="flex items-center gap-1">
                <Sparkles size={11} className="text-gold-400" /> Shweta Wellness
              </span>
            </div>
          </div>

          {/* Dynamic Projection Output */}
          <div className="bg-sage-900 text-white p-8 md:p-10 md:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-medium tracking-tight border-b border-white/10 pb-4 mb-6 text-sage-100">
                Coaching Projection
              </h3>

              {/* BMI Circle */}
              <div className="flex items-center gap-5 mb-6">
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 shadow-inner shrink-0">
                  <span className="text-lg font-mono font-bold text-gold-400">{bmi}</span>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-sage-300 uppercase tracking-widest">Calculated BMI</div>
                  <div className={`mt-1 text-[10px] px-2.5 py-0.5 rounded-full inline-block font-semibold border ${bmiColor}`}>
                    {bmiCategory}
                  </div>
                </div>
              </div>

              {/* BMI Suggestion text */}
              <p className="text-xs text-sage-200 leading-relaxed font-sans mb-6 italic font-light">
                "{bmiSuggestion}"
              </p>

              {/* Health recommendations */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-center gap-3 text-xs bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <Droplet size={14} className="text-teal-300 shrink-0" />
                  <div>
                    <span className="text-sage-300">Target Hydration: </span>
                    <strong className="text-white font-medium">{waterIntake} Litres / day</strong>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <Clock size={14} className="text-gold-300 shrink-0" />
                  <div>
                    <span className="text-sage-300">Sleep Buffer: </span>
                    <strong className="text-white font-medium">{sleepTarget}</strong>
                  </div>
                </div>
              </div>

              {/* Customized Goal Insights */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-1.5 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Sparkles size={12} />
                  <span>{goalInsights[goal].title}</span>
                </div>
                <p className="text-[11px] text-sage-200 leading-relaxed font-light">
                  {goalInsights[goal].text}
                </p>
                <p className="text-[10px] text-gold-400 font-medium mt-2">
                  → {goalInsights[goal].action}
                </p>
              </div>
            </div>

            {/* CTA action hook */}
            <div className="mt-8">
              <a
                id="calc-cta-anchor"
                href="#contact"
                className="group flex items-center justify-between w-full bg-gold-400 hover:bg-gold-500 text-slate-900 text-xs md:text-sm font-bold tracking-wider uppercase py-3.5 px-5 rounded-full transition-all duration-300 shadow-lg shadow-gold-900/15"
              >
                <span>Discuss With Shweta</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
