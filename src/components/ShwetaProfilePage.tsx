import React, { useState, useEffect, useRef } from 'react';
import {
  Award,
  Star,
  CheckCircle2,
  Calendar,
  MessageSquare,
  PhoneCall,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Heart,
  BookOpen,
  Activity,
  UserCheck,
  ExternalLink,
  ChevronRight,
  Microscope,
  GraduationCap,
  Quote,
  Check,
  ChevronDown,
  HelpCircle,
  ArrowUp
} from 'lucide-react';
import { faqs } from '../data';

// Hero portrait: drop Shweta's real photo URL/path here to replace the monogram.
// Leave empty ('') to render the branded monogram fallback.
const HERO_PHOTO = '/shweta-mishra.png';

// Single Source of Truth for JSON-LD Aggregate Rating
const REVIEW_DATA = {
  ratingValue: 5.0,
  reviewCount: 148,
  bestRating: 5,
  worstRating: 1,
  distribution: [
    { stars: 5, count: 142, percentage: 96 },
    { stars: 4, count: 6, percentage: 4 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ],
  categories: [
    { name: 'Metabolic & Fat Loss', rating: 5.0 },
    { name: 'PCOD & Hormone Care', rating: 5.0 },
    { name: 'Pharmacy Safety', rating: 5.0 },
    { name: 'Client Empathy', rating: 5.0 },
  ]
};

// Gilded scroll-progress bar pinned to the very top of the viewport
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// Count-up number that animates once when scrolled into view
function CountUp({
  end,
  suffix = '',
  decimals = 0,
  duration = 1400
}: {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.unobserve(el);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setVal(end);
        return;
      }
      let raf = 0;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(end * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

// Sticky bottom action bar (mobile only): merged Contact + FSIA Team + Apply Now
function MobileActionBar({ onContact, onTeam }: { onContact: () => void; onTeam: () => void }) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-8px_24px_-12px_rgba(37,53,54,0.25)]">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onContact}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider"
        >
          <PhoneCall size={15} /> Contact
        </button>
        <button
          onClick={onTeam}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider"
        >
          <UserCheck size={15} /> FSIA Team
        </button>
        <a
          href="https://fsia.in/quickapply"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sheen flex-[1.3] flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-b from-emerald-700 to-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-[0_6px_16px_-6px_rgba(6,78,59,0.5)]"
        >
          <ChevronRight size={15} /> Apply Now
        </a>
      </div>
    </div>
  );
}

// Staggered cascade: children ripple in with incremental delay when container enters view
function StaggerReveal({
  children,
  className = '',
  as: Tag = 'div'
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen at mount → reveal now (no wait for a scroll event).
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    // Safety net: never leave content hidden if IO is throttled/unsupported.
    const fallback = window.setTimeout(() => setInView(true), 1500);
    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return (
    <Tag ref={ref} className={`stagger ${inView ? 'is-in' : ''} ${className}`}>
      {React.Children.map(children, (child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              style: { ...(child.props as any).style, ['--i' as any]: i }
            })
          : child
      )}
    </Tag>
  );
}

// Animated ECG / pulse-line — health-monitor signature accent
function PulseLine({ className = '', color = '#34d399' }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 620 40"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M0 20 H180 l14 -13 l12 26 l16 -32 l14 39 l12 -20 H620"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ecg-path"
        opacity="0.9"
      />
    </svg>
  );
}

// Zero-dependency accordion FAQ (grid-rows transition, single-open)
function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);
  return (
    <div className="space-y-3">
      {faqs.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={`card-hover rounded-2xl border bg-white overflow-hidden shadow-soft ${
              isOpen ? 'border-emerald-200' : 'border-gray-100'
            }`}
          >
            <button
              id={`btn-faq-toggle-${item.id}`}
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-semibold text-gray-900 hover:text-emerald-800 transition-colors"
            >
              <span className="flex items-center gap-3">
                <HelpCircle size={18} className={`shrink-0 ${isOpen ? 'text-emerald-600' : 'text-emerald-500/70'}`} />
                <span>{item.question}</span>
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-light border-t border-gray-100">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Floating scroll-to-top button (appears once the user scrolls down)
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`hidden sm:flex fixed bottom-6 right-6 z-50 w-11 h-11 items-center justify-center rounded-full bg-emerald-800 text-white shadow-lift border border-emerald-700 transition-all duration-300 hover:bg-emerald-900 ${
        show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}

// Intersection Observer Fade-in Scroll Component
function FadeInOnScroll({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already on screen at mount → reveal immediately.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(el);

    // Safety net: reveal even if IO never fires (throttled/unsupported).
    const fallback = window.setTimeout(() => setIsVisible(true), 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// High-Contrast Gold Star Rating Component
function GoldStarRating({
  rating = 5,
  maxStars = 5,
  size = 16,
  showNumeric = false,
  className = ""
}: {
  rating?: number;
  maxStars?: number;
  size?: number;
  showNumeric?: boolean;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5 text-amber-500 drop-shadow-xs">
        {Array.from({ length: maxStars }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = rating >= starValue;
          const isHalf = rating > i && rating < starValue;

          return (
            <Star
              key={i}
              size={size}
              className={`${
                isFilled
                  ? 'fill-amber-400 text-amber-500 drop-shadow-[0_1px_2px_rgba(245,158,11,0.4)]'
                  : isHalf
                  ? 'fill-amber-400/50 text-amber-500'
                  : 'fill-gray-200 text-gray-300'
              } transition-transform hover:scale-110`}
            />
          );
        })}
      </div>
      {showNumeric && (
        <span className="font-mono font-bold text-gray-900 text-xs ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// Section eyebrow + heading helper for consistent editorial rhythm
function SectionHead({
  eyebrow,
  title,
  id,
  subtitle
}: {
  eyebrow: string;
  title: string;
  id: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-1">
      <h2 id={id} className="text-xl sm:text-2xl font-serif font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
      {/* short accent underline, mockup-style */}
      <span className="block mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500 mt-3 font-light max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// Portrait with graceful monogram fallback (never renders broken)
function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="ring-gradient relative">
      {HERO_PHOTO && !failed ? (
        <div className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-[1.05rem] overflow-hidden bg-gradient-to-b from-emerald-50 via-emerald-100/50 to-white relative">
          {/* soft studio glow behind the cutout */}
          <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-emerald-100/60 to-transparent pointer-events-none" />
          <img
            src={HERO_PHOTO}
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
            alt="Shweta Mishra - Best Wellness Coach in Raipur"
            decoding="async"
            fetchPriority="high"
            onError={() => setFailed(true)}
            className="relative w-full h-full object-cover object-top"
          />
        </div>
      ) : (
        <div
          aria-label="Shweta Mishra - Best Wellness Coach in Raipur"
          className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-[1.05rem] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 text-white"
        >
          <span className="font-serif text-6xl font-bold text-amber-300 tracking-tight drop-shadow">SM</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/90 font-semibold">Shweta Mishra</span>
        </div>
      )}
    </div>
  );
}

// Client testimonials (sample data — replace with real verified reviews)
const TESTIMONIALS = [
  { quote: "Shweta Ma'am is truly the best wellness coach in Raipur! I reduced 12kg in 3 months without starving or feeling weak. Her pharmacy background gave me immense confidence.", name: 'Priya Sharma', city: 'Raipur' },
  { quote: 'I was struggling with severe PCOD and fatigue. Her food-first approach restored my regular cycles within 60 days. Highly recommend her to all women in Chhattisgarh!', name: 'Anjali Verma', city: 'Bhilai' },
  { quote: 'As a busy businessman, I had high triglycerides and heavy abdominal fat. Shweta adjusted my meals around my travel schedule. Lost 9kg and felt energetic again.', name: 'Rajesh Agarwal', city: 'Raipur' },
  { quote: 'Her empathy and weekly follow-ups kept me motivated. She explains the scientific reason behind every food choice. Truly deserving of the FSIA Super Woman Award!', name: 'Kavita Sahu', city: 'Durg' },
];

// Wellness programs — each opens an article-style popup
const SOLUTIONS = [
  {
    Icon: Activity, title: 'Weight Management', tone: 'bg-emerald-100 text-emerald-800',
    desc: 'A non-starvation fat-loss blueprint — metabolic reset, cellular nutrition and stable blood sugar, built on Shweta’s own 18kg transformation.',
    body: [
      'Most diets fail because they starve the body and ignore the root cause. Shweta’s Weight Management programme takes the opposite path — it resets your metabolism using food-first, locally-available meals tuned to your body, not a generic chart.',
      'As a registered pharmacist, Shweta screens for the hidden drivers of stubborn weight — insulin resistance, thyroid imbalance and medication effects — so every change is clinically safe. Combined with circadian habit correction, the result is steady fat loss that actually lasts.',
    ],
    bullets: ['Personalised, food-first meal plans', 'Metabolism & blood-sugar focus', 'No crash diets or chemical fat-burners', 'Weekly follow-ups & accountability'],
  },
  {
    Icon: Heart, title: 'PCOD & Hormone Care', tone: 'bg-rose-100 text-rose-700',
    desc: 'Root-cause protocols to restore regular cycles and balance hormones and insulin — gentle, food-first and sustainable.',
    body: [
      'PCOD and hormonal imbalance rarely need extreme measures — they need consistency and the right nutrition. This programme works on the underlying insulin resistance and inflammation that disrupt your cycle.',
      'Through targeted, seasonal Indian meals, gentle movement and stress regulation, many clients see their cycles regularise within weeks — without harsh restrictions, and safely alongside any medication they already take.',
    ],
    bullets: ['Cycle & hormone rebalancing', 'Insulin-resistance support', 'PCOS/PCOD-friendly nutrition', 'Pharmacist-verified safety'],
  },
  {
    Icon: Microscope, title: 'Thyroid & Metabolism', tone: 'bg-amber-100 text-amber-700',
    desc: 'Pharmacist-guided support for sluggish thyroid and slow metabolism — safely alongside your existing medicines.',
    body: [
      'A sluggish thyroid drains energy, slows metabolism and makes weight loss feel impossible. This programme supports thyroid function through nutrition, nutrient timing and lifestyle — never in conflict with your prescription.',
      'Shweta’s pharmacology background means your thyroid medication, supplements and diet are coordinated as one plan, so you regain energy and momentum without guesswork.',
    ],
    bullets: ['Thyroid-supportive lifestyle', 'Energy & metabolism boost', 'Safe with your prescriptions', 'Symptom tracking'],
  },
  {
    Icon: ShieldCheck, title: 'Diabetes Reversal', tone: 'bg-emerald-100 text-emerald-800',
    desc: 'Lifestyle plans to reverse Type-2 pre-diabetes and stabilise blood sugar with clinically safe changes.',
    body: [
      'Type-2 pre-diabetes is often reversible with the right food and habits. This programme stabilises blood sugar through balanced meals, smart carb timing and sustainable movement.',
      'Every change is monitored and clinically safe — designed to reduce spikes, improve markers and, wherever possible, lower dependence on medication under your doctor’s guidance.',
    ],
    bullets: ['Blood-sugar stabilisation', 'Type-2 pre-diabetes focus', 'Clinically safe protocols', 'Ongoing monitoring'],
  },
  {
    Icon: Sparkles, title: 'Lifestyle & Bio-Rhythm', tone: 'bg-violet-100 text-violet-700',
    desc: 'Sleep, stress and circadian alignment for lasting energy, calm and hormonal balance.',
    body: [
      'Health isn’t only what you eat — it’s when you sleep, how you handle stress and how aligned your day is with your body clock. This programme restores your natural circadian rhythm.',
      'By fixing sleep, managing stress and syncing meals and activity to your bio-rhythm, clients report deeper energy, steadier mood and better hormonal balance — the foundation every other result is built on.',
    ],
    bullets: ['Sleep & circadian reset', 'Stress-management routines', 'Daily bio-rhythm mapping', 'Sustainable habit building'],
  },
  {
    Icon: BookOpen, title: 'Preventive Health', tone: 'bg-sky-100 text-sky-700',
    desc: 'Simple daily habits to prevent illness and stay vibrant and medicine-free for the long run.',
    body: [
      'The best treatment is prevention. This programme builds simple, repeatable daily habits that keep you and your family vibrant and reduce the risk of lifestyle disease.',
      'From immunity and nutrition to screenings and everyday routines, Shweta helps you stay ahead of problems — so wellness becomes a way of life, not a reaction to illness.',
    ],
    bullets: ['Immunity & vitality focus', 'Preventive screenings guidance', 'Family wellness habits', 'Long-term medicine-free living'],
  },
];

// Gallery images (real photo + dummy placeholders — replace with real shots)
const GALLERY = [
  { src: '/shweta-mishra.png', label: 'Portrait' },
  { src: '/gallery-1.svg', label: 'Wellness Session' },
  { src: '/gallery-2.svg', label: 'Consultation' },
  { src: '/gallery-3.svg', label: 'Nutrition Plan' },
  { src: '/gallery-4.svg', label: 'Lifestyle Coaching' },
];

// FSIA team members (placeholder — replace with real names/roles)
const TEAM = [
  { name: 'Forever Star India Awards', role: 'National Awards & Directory Body', initials: 'FS' },
  { name: 'Nominations Desk', role: 'Awardee onboarding & verification', initials: 'ND' },
  { name: 'Profile Support', role: 'Directory profiles & updates', initials: 'PS' },
  { name: 'Media & PR', role: 'Press, features & coverage', initials: 'MP' },
];

// "Why work with me" differentiators
const WHY = [
  { Icon: UserCheck, title: 'Personalized Protocols', desc: 'Plans tailored to your body, reports and lifestyle — never generic.' },
  { Icon: ShieldCheck, title: 'Pharmacist-Verified Safety', desc: 'Every diet & habit change is 100% clinically safe with your medicines.' },
  { Icon: Heart, title: 'End-to-End Support', desc: 'Weekly follow-ups and guidance — with you through the whole journey.' },
];

// "What Clients Say" carousel — single card + navigable dots
function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 sm:p-7 relative overflow-hidden">
        <Quote size={40} className="text-emerald-200 mb-2" />
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic min-h-[4.5rem]">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-serif font-bold flex items-center justify-center shrink-0">
            {t.name.split(' ').map((w) => w[0]).join('')}
          </span>
          <div>
            <strong className="block text-sm font-bold text-gray-900 leading-tight">{t.name}</strong>
            <span className="text-xs text-gray-500">{t.city} &bull; Verified Client</span>
          </div>
          <div className="ml-auto flex text-amber-400">
            {[...Array(5)].map((_, s) => <Star key={s} size={13} className="fill-amber-400" />)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {TESTIMONIALS.map((_, d) => (
          <button
            key={d}
            aria-label={`Testimonial ${d + 1}`}
            onClick={() => setI(d)}
            className={`h-2 rounded-full transition-all ${d === i ? 'w-6 bg-emerald-700' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ShwetaProfilePage() {
  const [activeTab, setActiveTab] = useState<'bio' | 'expertise' | 'awards' | 'reviews'>('bio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSol, setOpenSol] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const menu = [
    { label: 'Programs', href: '#solutions' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#consultation' },
  ];

  const whatsappMessage = encodeURIComponent(
    'Hello Shweta Mishra! I visited your official FSIA directory profile (Best Wellness Coach in Raipur) and would like to schedule a consultation.'
  );

  const tabs = [
    { key: 'bio', label: 'Bio', sub: '& Story', icon: UserCheck },
    { key: 'expertise', label: 'Expertise', sub: '', icon: BookOpen },
    { key: 'awards', label: 'Awards', sub: '', icon: Award },
    { key: 'reviews', label: 'Reviews', sub: '(148)', icon: Star },
  ] as const;

  // Desktop scroll-spy: highlight the tab whose section is crossing the viewport band.
  // (Skipped on mobile, where tabs act as a one-section toggle.)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    let obs: IntersectionObserver | null = null;

    const connect = () => {
      obs?.disconnect();
      obs = null;
      if (!mq.matches) return;
      const els = tabs
        .map((t) => document.getElementById(t.key))
        .filter((el): el is HTMLElement => !!el);
      obs = new IntersectionObserver(
        (entries) => {
          const top = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (top) setActiveTab(top.target.id as typeof activeTab);
        },
        { rootMargin: '-42% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] }
      );
      els.forEach((el) => obs!.observe(el));
    };

    connect();
    mq.addEventListener('change', connect);
    return () => {
      obs?.disconnect();
      mq.removeEventListener('change', connect);
    };
  }, []);

  const goToSection = (key: typeof activeTab) => {
    setActiveTab(key);
    requestAnimationFrame(() =>
      document.getElementById(key)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  return (
    <div className="grain min-h-screen text-gray-800 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-28 sm:pb-16">
      <ScrollProgress />
      <ScrollToTop />
      <MobileActionBar onContact={() => setContactOpen(true)} onTeam={() => setTeamOpen(true)} />
      {/* 1. SEO & Schema Markup Injection for Google Search Console */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ProfilePage',
                '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#profilepage',
                'url': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra',
                'name': 'Shweta Mishra - Best Wellness Coach in Raipur',
                'description':
                  'Official FSIA verified directory profile of Shweta Mishra, Best Wellness Coach in Raipur, Registered Pharmacist, Holistic Health Mentor, and Weight Loss Coach in Raipur.',
                'mainEntity': {
                  '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#person'
                }
              },
              {
                '@type': 'Person',
                '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#person',
                'name': 'Shweta Mishra',
                'jobTitle': 'Best Wellness Coach in Raipur & Registered Pharmacist',
                'description':
                  'Shweta Mishra is the Best Wellness Coach in Raipur, Registered Pharmacist, Holistic Health Mentor, and Weight Loss Coach in Raipur specializing in medicine-free lifestyle transformations.',
                'image': 'https://fsia.in/og-image.png',
                'telephone': '+919425212345',
                'email': 'pm37855@gmail.com',
                'address': {
                  '@type': 'PostalAddress',
                  'streetAddress': 'VIP Road Clinic',
                  'addressLocality': 'Raipur',
                  'addressRegion': 'Chhattisgarh',
                  'postalCode': '492001',
                  'addressCountry': 'IN'
                },
                'almaMater': 'M.Sc. Mathematics & Bachelor of Pharmacy',
                'award': [
                  'FSIA Super Woman 2026 Awardee',
                  'Best Wellness Coach Raipur 2025'
                ],
                'knowsAbout': [
                  'Holistic Weight Management',
                  'Preventive Healthcare',
                  'Pharmacology & Clinical Safety',
                  'Circadian Bio-Rhythms',
                  'PCOD & Metabolic Health'
                ],
                'worksFor': {
                  '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#business'
                },
                'areaServed': [
                  { '@type': 'City', 'name': 'Raipur' },
                  { '@type': 'City', 'name': 'Bhilai' },
                  { '@type': 'City', 'name': 'Durg' },
                  { '@type': 'AdministrativeArea', 'name': 'Chhattisgarh' }
                ]
              },
              {
                '@type': 'HealthAndBeautyBusiness',
                '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#business',
                'name': 'Shweta Mishra Wellness - Best Wellness Coach in Raipur',
                'url': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra',
                'image': 'https://fsia.in/og-image.png',
                'description':
                  'Best Wellness Coach in Raipur — starvation-free weight loss, PCOD/PCOS reversal, and medicine-free lifestyle transformation led by a registered pharmacist.',
                'priceRange': '₹₹',
                'currenciesAccepted': 'INR',
                'telephone': '+919425212345',
                'email': 'pm37855@gmail.com',
                'founder': {
                  '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#person'
                },
                'address': {
                  '@type': 'PostalAddress',
                  'streetAddress': 'VIP Road Clinic',
                  'addressLocality': 'Raipur',
                  'addressRegion': 'Chhattisgarh',
                  'postalCode': '492001',
                  'addressCountry': 'IN'
                },
                'geo': {
                  '@type': 'GeoCoordinates',
                  'latitude': 21.2514,
                  'longitude': 81.6296
                },
                'hasMap': 'https://www.google.com/maps/search/?api=1&query=21.2514,81.6296',
                'areaServed': [
                  { '@type': 'City', 'name': 'Raipur' },
                  { '@type': 'City', 'name': 'Bhilai' },
                  { '@type': 'City', 'name': 'Durg' },
                  { '@type': 'AdministrativeArea', 'name': 'Chhattisgarh' }
                ],
                'openingHoursSpecification': [
                  {
                    '@type': 'OpeningHoursSpecification',
                    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    'opens': '10:00',
                    'closes': '19:00'
                  }
                ],
                'hasOfferCatalog': {
                  '@type': 'OfferCatalog',
                  'name': 'Wellness Coaching Services',
                  'itemListElement': [
                    {
                      '@type': 'Offer',
                      'itemOffered': {
                        '@type': 'Service',
                        'name': 'Holistic Weight Management',
                        'description': 'Non-starvation fat loss blueprint focused on metabolic speed, cellular nutrition, and blood glucose stability.'
                      }
                    },
                    {
                      '@type': 'Offer',
                      'itemOffered': {
                        '@type': 'Service',
                        'name': 'Preventive Healthcare & PCOD Reversal',
                        'description': 'Root-cause protocols for PCOD, PCOS, thyroid, and Type-2 pre-diabetes with pharmacist oversight.'
                      }
                    },
                    {
                      '@type': 'Offer',
                      'itemOffered': {
                        '@type': 'Service',
                        'name': 'Lifestyle & Bio-Rhythm Mentorship',
                        'description': 'Sleep, stress, and circadian optimization for total well-being.'
                      }
                    }
                  ]
                },
                'aggregateRating': {
                  '@type': 'AggregateRating',
                  'ratingValue': REVIEW_DATA.ratingValue.toFixed(1),
                  'reviewCount': REVIEW_DATA.reviewCount.toString(),
                  'bestRating': REVIEW_DATA.bestRating.toString(),
                  'worstRating': REVIEW_DATA.worstRating.toString()
                },
                'review': [
                  {
                    '@type': 'Review',
                    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
                    'author': { '@type': 'Person', 'name': 'Priya Sharma' },
                    'reviewBody': "Shweta Ma'am is truly the best wellness coach in Raipur! I reduced 12kg in 3 months without starving or feeling weak. Her pharmacy background gave me immense confidence."
                  },
                  {
                    '@type': 'Review',
                    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
                    'author': { '@type': 'Person', 'name': 'Anjali Verma' },
                    'reviewBody': 'I was struggling with severe PCOD and fatigue. Shweta’s food-first approach restored my regular cycles within 60 days. Highly recommend her to all women in Chhattisgarh!'
                  },
                  {
                    '@type': 'Review',
                    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
                    'author': { '@type': 'Person', 'name': 'Rajesh Agarwal' },
                    'reviewBody': 'As a busy businessman, I had high triglycerides and heavy abdominal fat. Shweta adjusted my meals around my travel schedule. Lost 9kg and felt energetic again.'
                  },
                  {
                    '@type': 'Review',
                    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
                    'author': { '@type': 'Person', 'name': 'Kavita Sahu' },
                    'reviewBody': 'Her empathy and weekly follow-ups kept me motivated. She explains the scientific reason behind every food choice. Truly deserving of the FSIA Super Woman Award!'
                  }
                ]
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#breadcrumb',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://fsia.in' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Wellness Coaches', 'item': 'https://fsia.in/directory/wellness-coaches' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Raipur', 'item': 'https://fsia.in/directory/wellness-coaches/raipur' },
                  { '@type': 'ListItem', 'position': 4, 'name': 'Shweta Mishra' }
                ]
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#faq',
                'mainEntity': faqs.map((f) => ({
                  '@type': 'Question',
                  'name': f.question,
                  'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
                }))
              }
            ]
          })
        }}
      />

      {/* APP-STYLE STICKY HEADER (logo + menu) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <img src="/fsia-logo.gif" alt="FSIA — Forever Star India Awards" width={40} height={40} className="w-10 h-10 object-contain shrink-0" />
            <span className="leading-none">
              <span className="block font-serif font-bold text-lg text-gray-900 tracking-wide">FSIA</span>
              <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.14em] text-emerald-700/70 mt-0.5">Forever Star India Awards</span>
            </span>
          </a>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {menu.map((m) => (
              <a key={m.label} href={m.href} className="hover:text-emerald-800 transition-colors">{m.label}</a>
            ))}
            <a href="#consultation" className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors">Book</a>
          </nav>

          {/* mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 grid place-items-center rounded-lg border border-gray-200 text-gray-700"
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-5 bg-current transition-transform ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        {/* mobile dropdown */}
        <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}>
          <nav className="px-4 pb-3 pt-1 space-y-1 bg-white border-t border-gray-100">
            {menu.map((m) => (
              <a
                key={m.label}
                href={m.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                {m.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <span id="top" />

      {/* Directory Platform Sub-Header Banner — enhanced */}
      <div className="relative bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-slate-300 px-4 py-2.5 text-xs border-b border-emerald-900/60 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full tracking-wider uppercase shadow-sm shrink-0">
              <ShieldCheck size={11} /> Verified
            </span>
            <span className="font-semibold text-white truncate">Shweta Mishra</span>
            <span className="hidden sm:inline text-slate-400">&bull; Best Wellness Coach in Raipur</span>
            <span className="flex items-center gap-0.5 text-amber-400 shrink-0" aria-label="5.0 rating">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-400" />)}
              <span className="ml-1 font-mono text-[10px] text-amber-300">5.0</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] shrink-0">
            <span className="hidden sm:inline text-slate-400 font-mono">#FSIA-2026-WM88</span>
            <a
              href="https://fsia.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              fsia.in <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Page Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">

        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="py-3 text-xs text-gray-500 font-sans">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <a href="#/nominate" className="hover:text-emerald-700 transition-colors">
                Home
              </a>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <a href="https://fsia.in/awardees" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors">
                Awardees
              </a>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <button onClick={() => setGalleryOpen(true)} className="hover:text-emerald-700 transition-colors">
                Gallery
              </button>
            </li>
            <li className="text-gray-300">/</li>
            <li className="font-semibold text-gray-900" aria-current="page">
              Shweta Mishra
            </li>
          </ol>
        </nav>

        {/* Semantic Article Wrapper */}
        <article className="space-y-8">

          {/* PROFILE HERO CARD */}
          <FadeInOnScroll>
            <div className="relative rounded-3xl overflow-hidden shadow-card bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 min-h-[380px] sm:min-h-[440px]">
            {/* ambient glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

            {/* edge-bleed portrait, anchored bottom-right */}
            <img
              src="/shweta-mishra.png"
              alt="Shweta Mishra - Best Wellness Coach in Raipur"
              decoding="async"
              fetchPriority="high"
              className="photo-in absolute bottom-0 right-0 h-[82%] sm:h-[96%] w-auto object-contain object-bottom pointer-events-none select-none drop-shadow-2xl"
            />
            {/* left-to-right scrim so text stays readable over the photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-transparent" />

            {/* Text */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 max-w-[64%] sm:max-w-[60%] space-y-4">
              <span className="stat-in inline-block text-xs sm:text-sm font-medium text-emerald-200/80" style={{ animationDelay: '60ms' }}>Hi, I&rsquo;m</span>

              <h1 className="font-sans font-extrabold tracking-tight leading-[1.05]">
                <span className="block text-3xl sm:text-4xl md:text-5xl text-white word-reveal" style={{ animationDelay: '160ms' }}>Shweta</span>
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl word-reveal bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent"
                  style={{ animationDelay: '300ms' }}
                >
                  Mishra
                </span>
              </h1>

              <p className="stat-in text-sm sm:text-base font-semibold text-white" style={{ animationDelay: '440ms' }}>
                Best Wellness Coach &amp; Registered Pharmacist
              </p>

              <p className="stat-in text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xs" style={{ animationDelay: '560ms' }}>
                Helping women and families across Raipur achieve vibrant, medicine-free health.
              </p>

              <div className="stat-in pt-1" style={{ animationDelay: '680ms' }}>
                <a
                  id="btn-hero-primary-consult"
                  href="#consultation"
                  className="btn-sheen inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm rounded-full shadow-[0_10px_28px_-8px_rgba(16,185,129,0.6)] transition-all group"
                >
                  <span>Get Free Consultation</span>
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Social proof */}
              <div className="stat-in flex items-center gap-3 pt-3" style={{ animationDelay: '820ms' }}>
                <div className="flex -space-x-2.5">
                  {['P', 'A', 'K'].map((n, i) => (
                    <span
                      key={n}
                      className="stat-in w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-slate-900"
                      style={{ animationDelay: `${900 + i * 110}ms` }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <div className="text-xs leading-tight">
                  <strong className="block text-white font-bold"><CountUp end={500} suffix="+" /> Happy Clients</strong>
                  <span className="text-slate-400">Across Raipur</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 z-10 bg-slate-800/80 text-amber-300 border border-slate-600/60 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-lg backdrop-blur-sm">
              <Award size={11} className="text-amber-300 fill-amber-400/30" />
              <span>FSIA 2026</span>
            </div>
            </div>
          </FadeInOnScroll>

          {/* SOLUTIONS FOR EVERY STAGE OF LIFE */}
          <FadeInOnScroll>
            <section id="solutions" aria-labelledby="heading-solutions" className="bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-6">
              <SectionHead id="heading-solutions" eyebrow="Core Programs" title="Wellness for Every Stage of Life" subtitle="Structured, medicine-free protocols tailored to your body and your goals." />
              <StaggerReveal as="ul" className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {SOLUTIONS.map(({ Icon, title, tone }) => (
                  <li key={title}>
                    <button
                      onClick={() => setOpenSol(title)}
                      className="card-hover group w-full h-full p-4 sm:p-5 bg-gradient-to-b from-slate-50/70 to-white rounded-2xl border border-gray-100 hover:border-emerald-200 flex flex-col items-center text-center gap-2.5 shadow-soft"
                    >
                      <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tone} group-hover:scale-105 transition-transform`}><Icon size={22} /></span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">{title}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700/80">Read more <ChevronRight size={11} /></span>
                    </button>
                  </li>
                ))}
              </StaggerReveal>
            </section>
          </FadeInOnScroll>

          {/* WHY WORK WITH ME */}
          <FadeInOnScroll>
            <section id="why" aria-labelledby="heading-why" className="bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-6">
              <SectionHead id="heading-why" eyebrow="The Difference" title="Why Work With Me?" />
              <StaggerReveal className="space-y-3">
                {WHY.map(({ Icon, title, desc }) => (
                  <div key={title} className="card-hover flex items-start gap-4 p-4 sm:p-5 bg-gradient-to-b from-slate-50/70 to-white rounded-2xl border border-gray-100 shadow-soft">
                    <span className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0"><Icon size={20} /></span>
                    <div>
                      <strong className="block text-sm font-bold text-gray-900">{title}</strong>
                      <span className="text-xs text-gray-500 leading-relaxed">{desc}</span>
                    </div>
                  </div>
                ))}
              </StaggerReveal>
            </section>
          </FadeInOnScroll>

          {/* ABOUT ME */}
          <FadeInOnScroll>
            <section id="about" aria-labelledby="heading-about" className="bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-6">
              <SectionHead id="heading-about" eyebrow="About Me" title="A Pharmacist Who Coaches Wellness" />
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed max-w-2xl">
                I&rsquo;m <strong className="font-semibold text-gray-900">Shweta Mishra</strong>, a registered pharmacist (B.Pharm) with an M.Sc. in Mathematics, dedicated to helping women and families across Raipur achieve vibrant, medicine-free health. After my own 18kg transformation, I built a starvation-free, pharmacologically-safe method that heals the cell and restores circadian rhythm.
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-1">
                {[{ Icon: Award, big: 18, suf: 'kg', label: 'Personal Fat Loss' }, { Icon: UserCheck, big: 500, suf: '+', label: 'Clients Helped' }, { Icon: ShieldCheck, big: 100, suf: '%', label: 'Medicine-Free' }].map((s) => (
                  <div key={s.label} className="text-center">
                    <span className="mx-auto mb-2 grid place-items-center w-12 h-12 rounded-full border border-emerald-200 text-emerald-600">
                      <s.Icon size={22} />
                    </span>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-gray-900"><CountUp end={s.big} suffix={s.suf} /></div>
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </FadeInOnScroll>

          {/* WHAT CLIENTS SAY */}
          <FadeInOnScroll>
            <section id="reviews" aria-labelledby="heading-reviews" className="bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-6">
              <SectionHead id="heading-reviews" eyebrow="Testimonials" title="What Clients Say" subtitle={`Rated ${REVIEW_DATA.ratingValue.toFixed(1)}★ by ${REVIEW_DATA.reviewCount} verified clients.`} />
              <Testimonials />
            </section>
          </FadeInOnScroll>

          {/* FAQ */}
          <FadeInOnScroll>
            <section id="faq" aria-labelledby="heading-faq" className="bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-6">
              <SectionHead id="heading-faq" eyebrow="Common Inquiries" title="Frequently Asked Questions" />
              <FaqAccordion />
            </section>
          </FadeInOnScroll>

          {/* LET'S CONNECT */}
          <FadeInOnScroll>
            <section id="consultation" aria-labelledby="heading-connect" className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lift">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              <div className="relative z-10 max-w-xl space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full inline-block">Let&rsquo;s Connect</span>
                  <h2 id="heading-connect" className="text-2xl sm:text-3xl font-serif font-bold mt-3">Have questions? I&rsquo;m here to help.</h2>
                  <p className="text-xs sm:text-sm text-emerald-100/80 font-light mt-2">Book a free diagnostic consultation in Raipur — review your biological profile, discuss symptoms, and map out a safe starting point.</p>
                </div>
                <div className="space-y-3">
                  <a href="tel:+919425212345" className="flex items-center gap-3 group">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><PhoneCall size={17} className="text-amber-300" /></span>
                    <span className="text-sm font-mono group-hover:text-amber-200 transition-colors">+91 94252 12345</span>
                  </a>
                  <a href="mailto:pm37855@gmail.com" className="flex items-center gap-3 group">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Heart size={17} className="text-amber-300" /></span>
                    <span className="text-sm group-hover:text-amber-200 transition-colors break-all">pm37855@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><MapPin size={17} className="text-amber-300" /></span>
                    <span className="text-sm">VIP Road Clinic, Raipur, Chhattisgarh</span>
                  </div>
                  <a href={`https://wa.me/919425212345?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><MessageSquare size={17} className="text-emerald-300" /></span>
                    <span className="text-sm group-hover:text-emerald-200 transition-colors">Chat on WhatsApp</span>
                  </a>
                </div>
                <a href={`https://wa.me/919425212345?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="btn-sheen glow-pulse w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all">
                  <Calendar size={17} /> Schedule a Free Consultation
                </a>
              </div>
            </section>
          </FadeInOnScroll>

        </article>

        {/* Footer info bar specific to embedded sub-page profile on fsia.in */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400 space-y-2">
          <p>
            Hosted on <strong className="text-gray-600">fsia.in</strong> (Forever Star India Awards) &bull; Verified Profile #FSIA-2026-WM88
          </p>
          <p className="text-[11px] font-light">
            Shweta Mishra — Best Wellness Coach in Raipur, Registered Pharmacist &amp; Holistic Lifestyle Mentor.
          </p>
        </div>

      </div>

      {/* SOLUTION ARTICLE POPUP */}
      {openSol && (() => {
        const s = SOLUTIONS.find((x) => x.title === openSol);
        if (!s) return null;
        const { Icon, tone } = s;
        return (
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setOpenSol(null)} />
            <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-lift max-h-[88vh] overflow-y-auto">
              {/* article header */}
              <div className="relative p-6 sm:p-7 border-b border-gray-100 bg-gradient-to-b from-slate-50/70 to-white">
                <button onClick={() => setOpenSol(null)} aria-label="Close" className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full bg-gray-100 text-gray-500">✕</button>
                <span className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tone}`}><Icon size={26} /></span>
                <span className="block mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700/70">Wellness Programme</span>
                <h2 className="mt-1 text-2xl font-serif font-bold text-gray-900 tracking-tight">{s.title}</h2>
                <span className="block mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
              </div>
              {/* article body */}
              <div className="p-6 sm:p-7 space-y-4">
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{s.desc}</p>
                {s.body.map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 font-light leading-relaxed">{para}</p>
                ))}
                <div className="pt-1">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">What&rsquo;s included</h3>
                  <ul className="space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                  <ShieldCheck size={13} /> FSIA-verified programme · pharmacist-supervised
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <a href="#consultation" onClick={() => setOpenSol(null)} className="btn-sheen flex-1 inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-b from-emerald-700 to-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl">
                    <Calendar size={15} /> Book Free Consultation
                  </a>
                  <a href={`https://wa.me/919425212345?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase tracking-wider rounded-xl">
                    <MessageSquare size={15} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* CONTACT SHEET (merged Call + WhatsApp) */}
      {contactOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
          <div className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-lift">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">Contact Shweta</h3>
              <button onClick={() => setContactOpen(false)} aria-label="Close" className="w-8 h-8 grid place-items-center rounded-full bg-gray-100 text-gray-500">✕</button>
            </div>
            <div className="space-y-3">
              <a href="tel:+919425212345" className="flex items-center gap-3 p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50">
                <span className="w-10 h-10 rounded-full bg-emerald-600 text-white grid place-items-center"><PhoneCall size={18} /></span>
                <span><strong className="block text-sm text-gray-900">Call now</strong><span className="text-xs text-gray-500 font-mono">+91 94252 12345</span></span>
              </a>
              <a href={`https://wa.me/919425212345?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3.5 rounded-2xl border border-emerald-200 bg-white">
                <span className="w-10 h-10 rounded-full bg-emerald-500 text-white grid place-items-center"><MessageSquare size={18} /></span>
                <span><strong className="block text-sm text-gray-900">WhatsApp</strong><span className="text-xs text-gray-500">Chat instantly</span></span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FSIA TEAM MODAL */}
      {teamOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setTeamOpen(false)} />
          <div className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-lift max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">FSIA Team</h3>
              <button onClick={() => setTeamOpen(false)} aria-label="Close" className="w-8 h-8 grid place-items-center rounded-full bg-gray-100 text-gray-500">✕</button>
            </div>
            <ul className="space-y-2.5">
              {TEAM.map((m) => (
                <li key={m.name} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-slate-50/60">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-xs font-bold grid place-items-center shrink-0">{m.initials}</span>
                  <span><strong className="block text-sm text-gray-900 leading-tight">{m.name}</strong><span className="text-xs text-gray-500">{m.role}</span></span>
                </li>
              ))}
            </ul>
            <a href="https://fsia.in" target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-xs font-semibold text-emerald-700">Visit fsia.in →</a>
          </div>
        </div>
      )}

      {/* GALLERY MODAL (photo grid + lightbox) */}
      {galleryOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => { setGalleryOpen(false); setLightbox(null); }} />
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-lift max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">Gallery — Shweta Mishra</h3>
              <button onClick={() => setGalleryOpen(false)} aria-label="Close" className="w-8 h-8 grid place-items-center rounded-full bg-gray-100 text-gray-500">✕</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {GALLERY.map((g, i) => (
                <button key={i} onClick={() => setLightbox(i)} className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-slate-100">
                  <img src={g.src} alt={g.label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 to-transparent text-white text-[10px] font-medium p-1.5 text-left">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* lightbox */}
          {lightbox !== null && (
            <div className="absolute inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/80" onClick={() => setLightbox(null)}>
              <div className="relative max-w-xs w-full" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute -top-10 right-0 w-9 h-9 grid place-items-center rounded-full bg-white/90 text-gray-700">✕</button>
                <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].label} className="w-full h-auto rounded-2xl border-4 border-white shadow-lift" />
                <p className="text-center text-white text-sm font-semibold mt-3">{GALLERY[lightbox].label}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
