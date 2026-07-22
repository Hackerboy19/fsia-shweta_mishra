import { ServiceItem, TimelineEvent, TrustBadge, Testimonial, FAQItem } from './types';

export const trustBadges: TrustBadge[] = [
  {
    id: 'superwoman',
    title: 'Super Woman 2026 Awardee',
    subtitle: 'Outstanding Community Wellness Leadership',
    iconName: 'Award',
    color: 'from-amber-100 to-yellow-50 text-amber-700 border-amber-200',
  },
  {
    id: 'pharmacist',
    title: 'Registered Pharmacist',
    subtitle: 'Clinical Foundation & Drug-Nutrient Safety',
    iconName: 'ShieldAlert',
    color: 'from-emerald-100 to-teal-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'astrologer',
    title: 'Certified Astrologer',
    subtitle: 'Bio-Rhythms & Elemental Constitutional Balancing',
    iconName: 'Sparkles',
    color: 'from-indigo-100 to-purple-50 text-indigo-700 border-indigo-200',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'weight-mgmt',
    title: 'Holistic Weight Management',
    shortDesc: 'Sustainable, joyful weight correction rooted in clinical nutrition—no starvation or crash diets.',
    iconName: 'Scale',
    longDesc: 'Our flagship program is designed around your bio-individual metabolism. Moving away from rigid calorie restriction, we address the root causes of weight gain, including hormonal shifts, emotional habits, and metabolic sluggishness. Inspired by Shweta’s personal 18kg fat loss journey.',
    benefits: [
      'Customized meal blueprints matching your culinary culture',
      'Metabolic conditioning exercises for long-term fat loss',
      'Hormone-balancing lifestyle routines (Cortisol/Insulin support)',
      '1-on-1 private weekly coaching & accountability check-ins'
    ],
    ctaText: 'Reclaim Your Health'
  },
  {
    id: 'prev-healthcare',
    title: 'Preventive & Therapeutic Healthcare',
    shortDesc: 'Manage and reverse chronic conditions like PCOS, Thyroid, and Diabetes under clinical oversight.',
    iconName: 'HeartPulse',
    longDesc: 'Leverage Shweta’s dual training as a Registered Pharmacist and Nutritionist. We build custom lifestyle interventions that coordinate safely with your current medical therapies, focusing on reducing systemic inflammation, restoring gut health, and resolving root metabolic imbalances.',
    benefits: [
      'Comprehensive pharmaceutical-nutrition safety review',
      'Diabetes management and insulin-sensitivity enhancement plans',
      'Hormonal harmony guides for PCOS, PCOD, and Thyroid disorders',
      'Evidence-based herbal and natural supplementation protocols'
    ],
    ctaText: 'Start Healing Naturally'
  },
  {
    id: 'lifestyle-transform',
    title: 'Lifestyle & Bio-Rhythm Coaching',
    shortDesc: 'Align your sleep, circadian clocks, and cosmic bio-rhythms to build boundless daily energy.',
    iconName: 'Activity',
    longDesc: 'True vitality requires an integrated routine. This program infuses clinical circadian science with traditional elemental analysis (Ayur-Astrology) to restructure your daily rhythm. Learn to match your energy output with natural rest periods to eradicate fatigue and brain fog.',
    benefits: [
      'Circadian alignment protocol for deep, restorative sleep',
      'Personalized stress-resilience and mindful breathing loops',
      'Innate constitution (elements) lifestyle mapping',
      'Boundless daytime mental clarity and performance design'
    ],
    ctaText: 'Tune Your Bio-Rhythms'
  },
  {
    id: 'corporate-wellness',
    title: 'Corporate Wellness & Keynotes',
    shortDesc: 'Interactive workshops and systemic wellness programs to boost team health and prevent burnout.',
    iconName: 'Users',
    longDesc: 'A healthy enterprise starts with vibrant teams. Shweta Mishra conducts highly engaging wellness seminars, corporate keynotes, and structural habit audits for progressive companies seeking to minimize sick leave, optimize cognitive focus, and foster physical well-being at work.',
    benefits: [
      'Tailored interactive health masterclasses (virtual or physical)',
      'Office ergonomics & active mini-desk movement guidelines',
      'Executive burnout recovery and focus enhancement systems',
      'Corporate mental-wellness challenges & engagement tracking'
    ],
    ctaText: 'Empower Your Team'
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'time-1',
    year: '2026',
    title: 'Super Woman 2026 Awardee',
    subtitle: 'National Community Recognition',
    description: 'Recognized for pioneering holistic health frameworks that bridge clinical science with compassionate counseling across Central India.',
    category: 'award',
  },
  {
    id: 'time-2',
    year: '2024',
    title: 'Astro-Wellness Integration',
    subtitle: 'Pioneered Elemental Constitutions',
    description: 'Began combining clinical circadian science with customized traditional bio-rhythms to unlock ultra-personalized lifestyle habits.',
    category: 'milestone',
  },
  {
    id: 'time-3',
    year: '2022',
    title: '18kg Weight Loss Journey',
    subtitle: 'The Empathetic Pivot',
    description: 'Overcame severe personal metabolic challenges, losing 18kg sustainably. This personal success formed the foundation for her empathetic, shame-free coaching model.',
    category: 'milestone',
  },
  {
    id: 'time-4',
    year: '2020',
    title: 'Registered Pharmacist Board',
    subtitle: 'Clinical & Chemistry Foundations',
    description: 'Acquired professional pharmacist licensure. This deep clinical background ensures all health and metabolic coaching remains robustly evidence-based.',
    category: 'speaking',
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Anjali Sharma',
    role: 'IT Professional',
    location: 'Raipur',
    quote: 'Losing 16kg was only a byproduct. What Shweta truly gave me was relief from chronic thyroid fatigue and bloating. Her pharmacist background made me feel incredibly safe!',
    metrics: '16kg Lost & Stabilized Thyroid'
  },
  {
    id: 'test-2',
    name: 'Dr. Vivek Sahu',
    role: 'Consultant Cardiologist',
    location: 'Bhilai',
    quote: 'As a medical professional, I appreciate science-backed strategies. Shweta’s program for my metabolic profile was clinical, methodical, and tailored beautifully around my stressful hospital hours.',
    metrics: 'Reversed Pre-Diabetes & Optimized Lipids'
  },
  {
    id: 'test-3',
    name: 'Ritu Sen',
    role: 'Business Owner',
    location: 'Raipur',
    quote: 'Her empathy is unmatched. After trying countless restrictive diets that ruined my relationship with food, Shweta taught me to eat with joy while reversing my severe PCOS symptoms.',
    metrics: 'Overcame PCOS & Regularized Cycles'
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How is holistic coaching different from a standard dietician plan?',
    answer: 'Traditional diets focus narrowly on calorie count (calories-in vs calories-out). Shweta Mishra’s holistic model integrates your clinical history (pharmacist background), hormone markers (PCOS, thyroid), lifestyle stress rhythms, and even astro-circadian elements to create a bio-individual lifestyle. We heal from the inside out.',
  },
  {
    id: 'faq-2',
    question: 'How does your Registered Pharmacist background help me?',
    answer: 'It means you have a coach who understands medicine, pathophysiology, and biochemistry. Shweta can analyze your medical reports, identify potential drug-nutrient depletions, ensure any natural food therapy coordinates safely with your physician’s prescriptions, and design protocols that respect your actual clinical conditions.',
  },
  {
    id: 'faq-3',
    question: 'What is Astrologer-Guided Wellness or Bio-Rhythm mapping?',
    answer: 'It is a constitutional mapping system. Traditional sciences understand that people are governed by different elemental combinations (such as fire, water, wind). By mapping these alongside modern circadian bio-rhythms, we discover the optimal times of day for your digestion, high-intensity focus, and sleep, tailored exclusively to your constitution.',
  },
  {
    id: 'faq-4',
    question: 'Do we have to buy expensive supplements or rare ingredients?',
    answer: 'Absolutely not. Shweta’s philosophy is deeply rooted in local, seasonal, and accessible whole foods found right in your local kitchen. Any recommended nutritional changes or supplements are standard, safe, and highly affordable options backed by rigorous science.',
  },
];
