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
  Check
} from 'lucide-react';

// Hero portrait: drop Shweta's real photo URL/path here to replace the monogram.
// Leave empty ('') to render the branded monogram fallback.
const HERO_PHOTO = '';

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

// Sticky bottom call-to-action bar (mobile only) — keeps contact one tap away
function MobileActionBar({ whatsappMessage }: { whatsappMessage: string }) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-8px_24px_-12px_rgba(37,53,54,0.25)]">
      <div className="flex items-center gap-2.5">
        <a
          href="tel:+919425212345"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider"
        >
          <PhoneCall size={15} /> Call
        </a>
        <a
          href={`https://wa.me/919425212345?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider"
        >
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" aria-hidden="true" />
          <MessageSquare size={15} /> WhatsApp
        </a>
        <a
          href="#consultation"
          className="btn-sheen flex-[1.4] flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-b from-emerald-700 to-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-[0_6px_16px_-6px_rgba(6,78,59,0.5)]"
        >
          <Calendar size={15} /> Book
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
    <div className="pb-5 border-b border-gray-100">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        {eyebrow}
      </span>
      <h2 id={id} className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-2.5 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-light max-w-2xl leading-relaxed">{subtitle}</p>
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
        <img
          src={HERO_PHOTO}
          sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
          alt="Shweta Mishra - Best Wellness Coach in Raipur"
          decoding="async"
          fetchPriority="high"
          onError={() => setFailed(true)}
          className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 object-cover rounded-[1.05rem]"
        />
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

export default function ShwetaProfilePage() {
  const [activeTab, setActiveTab] = useState<'bio' | 'expertise' | 'awards' | 'reviews'>('bio');

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
      <MobileActionBar whatsappMessage={whatsappMessage} />
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
              }
            ]
          })
        }}
      />

      {/* Directory Platform Sub-Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-slate-300 py-2.5 px-4 text-xs border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded tracking-wider uppercase font-mono shadow-sm">
              FSIA Verified
            </span>
            <span className="font-medium text-slate-200">
              Forever Star India Awards &bull; National Official Directory
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-400 flex items-center gap-1 font-semibold">
              <ShieldCheck size={13} /> Verified Profile #FSIA-2026-WM88
            </span>
            <a
              href="https://fsia.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
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
              <a href="https://fsia.in" className="hover:text-emerald-700 transition-colors">
                Home
              </a>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <a href="https://fsia.in/directory/wellness-coaches" className="hover:text-emerald-700 transition-colors">
                Wellness Coaches
              </a>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <a href="https://fsia.in/directory/wellness-coaches/raipur" className="hover:text-emerald-700 transition-colors">
                Raipur
              </a>
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
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 relative overflow-hidden">
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 via-emerald-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-gradient-to-tr from-emerald-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
            {/* Top gilded hairline */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">

              {/* Profile Image Column */}
              <div className="shrink-0 w-full sm:w-auto flex flex-col items-center sm:items-start">
                <div className="relative animate-floaty">
                  <Portrait />
                  <div className="absolute -bottom-3 -right-2 bg-slate-900 text-amber-400 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
                    <Award size={12} className="text-amber-400 fill-amber-400/30" />
                    <span>FSIA 2026</span>
                  </div>
                </div>

                {/* Quick Info under photo */}
                <div className="mt-7 w-full space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/70">
                    <MapPin size={14} className="text-emerald-700 shrink-0" />
                    <span>VIP Road Clinic, Raipur (C.G.)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/70">
                    <Clock size={14} className="text-emerald-700 shrink-0" />
                    <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Profile Header Details Column */}
              <div className="flex-1 space-y-5">

                {/* Main Heading H1 */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-200/70 flex items-center gap-1">
                      <Sparkles size={11} className="text-amber-500" /> FSIA Super Woman 2026
                    </span>
                    <span className="bg-emerald-50 text-emerald-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-200/60">
                      Verified Health Mentor
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-[2.6rem] font-serif font-bold text-gray-900 tracking-tight leading-[1.08] text-balance">
                    {[
                      { w: 'Shweta', c: 'text-gray-900' },
                      { w: 'Mishra', c: 'text-gray-900' },
                      { w: '—', c: 'text-emerald-800' },
                      { w: 'Best', c: 'text-emerald-800' },
                      { w: 'Wellness', c: 'text-emerald-800' },
                      { w: 'Coach', c: 'text-emerald-800' },
                      { w: 'in', c: 'text-emerald-800' },
                      { w: 'Raipur', c: 'text-emerald-800' },
                    ].map((p, i) => (
                      <span
                        key={i}
                        className={`word-reveal ${p.c}`}
                        style={{ animationDelay: `${150 + i * 75}ms` }}
                      >
                        {p.w}&nbsp;
                      </span>
                    ))}
                  </h1>

                  <p className="text-base sm:text-lg text-emerald-800 font-medium font-sans mt-2 flex items-center gap-2">
                    <Microscope size={18} className="text-emerald-600" />
                    <span>Registered Pharmacist &amp; Holistic Lifestyle Expert</span>
                  </p>
                </div>

                {/* Trust Badges Row */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold shadow-soft">
                    <Award size={14} className="text-amber-600 fill-amber-400" />
                    <span>Super Woman 2026 Awardee</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold shadow-soft">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>FSIA Directory Verified</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/90 text-amber-950 border border-amber-200/90 rounded-xl text-xs font-semibold shadow-soft">
                    <GoldStarRating rating={REVIEW_DATA.ratingValue} size={13} />
                    <span>{REVIEW_DATA.ratingValue.toFixed(1)} Rating ({REVIEW_DATA.reviewCount} Verified Reviews)</span>
                  </div>
                </div>

                {/* Key Qualifications Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-100 rounded-2xl border border-gray-100 overflow-hidden text-xs">
                  <div className="p-4 bg-gradient-to-b from-gray-50/80 to-white">
                    <span className="text-emerald-700/70 block text-[10px] font-bold uppercase tracking-wider">Education</span>
                    <strong className="text-gray-900 font-semibold block mt-1">M.Sc. Math &amp; B.Pharm</strong>
                  </div>
                  <div className="p-4 bg-gradient-to-b from-gray-50/80 to-white">
                    <span className="text-emerald-700/70 block text-[10px] font-bold uppercase tracking-wider">Transformation</span>
                    <strong className="text-gray-900 font-semibold block mt-1">Personal 18kg Fat Loss</strong>
                  </div>
                  <div className="p-4 bg-gradient-to-b from-gray-50/80 to-white col-span-2 sm:col-span-1">
                    <span className="text-emerald-700/70 block text-[10px] font-bold uppercase tracking-wider">Methodology</span>
                    <strong className="text-gray-900 font-semibold block mt-1">100% Starvation-Free</strong>
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-light text-pretty">
                  Combining the rigorous scientific safety of pharmacological medicine with custom biological nutrition, circadian habit restoration, and empathetic guidance. Helping women and families across Raipur achieve vibrant, medicine-free health.
                </p>

                {/* Hero CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    id="btn-hero-primary-consult"
                    href="#consultation"
                    className="btn-sheen glow-pulse px-6 py-3.5 bg-gradient-to-b from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl hover:shadow-[0_12px_28px_-6px_rgba(6,78,59,0.55)] transition-all flex items-center justify-center gap-2 group"
                  >
                    <Calendar size={16} />
                    <span>Book Consultation</span>
                    <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    id="btn-hero-whatsapp"
                    href={`https://wa.me/919425212345?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sheen px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span className="live-dot w-2 h-2 rounded-full bg-emerald-300 shrink-0" aria-hidden="true" />
                    <MessageSquare size={16} />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    id="btn-hero-phone"
                    href="tel:+919425212345"
                    className="px-4 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-center gap-1.5 shadow-soft"
                  >
                    <PhoneCall size={14} className="text-emerald-700" />
                    <span>Call Direct</span>
                  </a>
                </div>

              </div>

            </div>

            {/* SOCIAL-PROOF STAT STRIP */}
            <div className="relative z-10 mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
              {[
                { end: 500, suffix: '+', dec: 0, label: 'Clients Transformed', sub: 'Across Central India' },
                { end: 18, suffix: 'kg', dec: 0, label: 'Personal Fat Loss', sub: 'Medicine-free journey' },
                { end: 5.0, suffix: '★', dec: 1, label: 'Verified Rating', sub: '148 FSIA reviews' },
                { end: 100, suffix: '%', dec: 0, label: 'Starvation-Free', sub: 'Food-first protocols' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="stat-in p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/60 text-center sm:text-left"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800 tracking-tight">
                    <CountUp end={s.end} suffix={s.suffix} decimals={s.dec} />
                  </div>
                  <div className="text-[11px] font-bold text-gray-800 mt-1 uppercase tracking-wide">{s.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-light">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
          </FadeInOnScroll>

          {/* STICKY LOCAL PROFILE NAVIGATION */}
          <nav aria-label="Profile navigation" className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border border-gray-200/70 shadow-soft rounded-2xl p-1.5 my-6">
            <div className="grid grid-cols-4 gap-1 sm:flex sm:items-center sm:justify-start sm:gap-1.5">
              {tabs.map(({ key, label, sub, icon: Icon }) => {
                const active = activeTab === key;
                return (
                  <button
                    key={key}
                    id={`tab-btn-${key}`}
                    onClick={() => goToSection(key)}
                    aria-pressed={active}
                    className={`px-1 py-2.5 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center ${
                      active
                        ? 'bg-gradient-to-b from-emerald-700 to-emerald-800 text-white shadow-[0_6px_16px_-6px_rgba(6,78,59,0.5)]'
                        : 'text-gray-600 hover:text-emerald-800 hover:bg-emerald-50/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${active ? 'text-amber-300' : ''}`} />
                    <span className="truncate">
                      {label}{sub && <span className="hidden sm:inline"> {sub}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* SECTION 1: BIO & STORY */}
          <FadeInOnScroll>
            <section
              id="bio"
              aria-labelledby="heading-bio"
              className={`bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-6 ${
                activeTab !== 'bio' ? 'hidden md:block' : 'block'
              }`}
            >
              <SectionHead
                id="heading-bio"
                eyebrow="Profile Biography"
                title="About Shweta Mishra — Clinical Wellness Coach"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-light">
                  <p>
                    As the <strong className="font-semibold text-gray-900">Best Wellness Coach in Raipur</strong>, Shweta Mishra has established a pioneering standard in clinical lifestyle transformation. Her approach bridges the exact analytical rigor of clinical pharmacology with empathetic, starvation-free biological wellness.
                  </p>
                  <p>
                    Holding a dual academic foundation with an <strong className="font-semibold text-gray-900">M.Sc. in Mathematics</strong> and a <strong className="font-semibold text-gray-900">Bachelor of Pharmacy (B.Pharm)</strong>, Shweta evaluates human health as an integrated, measurable physiological system. As a registered pharmacist, she understands the deep molecular interactions of medications, ensuring that every diet and lifestyle change is 100% clinically safe.
                  </p>

                  <div className="my-4 p-5 sm:p-6 bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-white rounded-2xl border border-amber-200/60 relative overflow-hidden">
                    <Quote size={64} className="absolute -top-2 -right-1 text-amber-200/50" />
                    <h3 className="text-sm font-serif font-bold text-amber-950 flex items-center gap-2 relative">
                      <Heart size={16} className="animate-heartbeat text-amber-600 fill-amber-300" />
                      <span>The 18kg Personal Transformation Story</span>
                    </h3>
                    <p className="text-xs text-amber-900/90 leading-relaxed italic mt-2 relative">
                      "Before coaching hundreds of families in Raipur, I walked this journey myself. Experiencing post-partum weight shifts and metabolic stagnation, I shed 18kg permanently without chemical fat-burners, crash starvation, or exhausting hours in the gym. This personal journey proved that when you heal the cell and balance circadian rhythm, the body naturally releases excess weight."
                    </p>
                  </div>

                  <p>
                    Whether working with busy working professionals, mothers battling PCOD/PCOS, or individuals looking for a top <strong className="font-semibold text-gray-900">nutrition coach in Raipur</strong>, Shweta crafts customized bio-rhythm protocols tailored to Central India's unique dietary traditions and lifestyle rhythms.
                  </p>
                </div>

                {/* Bio Highlights Card */}
                <div className="lg:col-span-4 bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 border border-gray-100 space-y-4 shadow-soft">
                  <h3 className="text-xs font-bold text-emerald-800/70 uppercase tracking-[0.15em] font-mono flex items-center gap-2">
                    <span className="w-4 h-px bg-emerald-300" /> At A Glance
                  </h3>

                  <ul className="space-y-3.5 text-xs">
                    {[
                      { t: 'Pharmacology Verified', d: 'Zero risky supplement or drug interactions.' },
                      { t: '100% No Starvation', d: 'Delicious local diets balanced for blood sugar stability.' },
                      { t: 'Circadian Bio-Rhythms', d: 'Sleep, stress, and hormone alignment.' },
                      { t: 'Astrological Alignment', d: 'Optional cosmic bio-rhythm integration.' },
                    ].map((item) => (
                      <li key={item.t} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900 block">{item.t}</strong>
                          <span className="text-gray-500">{item.d}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <a
                      href="#consultation"
                      className="btn-sheen block text-center w-full py-3 bg-gradient-to-b from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-[0_6px_16px_-6px_rgba(6,78,59,0.45)]"
                    >
                      Schedule Direct Consult
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* SECTION 2: EXPERTISE & OFFERINGS */}
          <FadeInOnScroll>
            <section
              id="expertise"
              aria-labelledby="heading-expertise"
              className={`bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-6 ${
                activeTab !== 'expertise' ? 'hidden md:block' : 'block'
              }`}
            >
              <SectionHead
                id="heading-expertise"
                eyebrow="Core Offerings"
                title="Services & Specializations"
                subtitle="Structured clinical frameworks designed for sustainable, medicine-free health in Raipur."
              />

              {/* Semantic List Structure for SEO */}
              <StaggerReveal as="ul" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    Icon: Activity,
                    title: 'Holistic Weight Management',
                    body: "A personalized, non-starvation fat loss blueprint based on Shweta's 18kg personal victory. Focuses on metabolic speed, cellular nutrition, and blood glucose stability.",
                    tag: '100% Food-First Reversal'
                  },
                  {
                    Icon: Microscope,
                    title: 'Preventive Healthcare & PCOD Reversal',
                    body: 'Addressing the root causes of PCOD, PCOS, Thyroid sluggishness, and Type-2 pre-diabetes. Dual pharmacist oversight ensures total physiological safety.',
                    tag: 'Hormone & Insulin Balance'
                  },
                  {
                    Icon: Sparkles,
                    title: 'Lifestyle & Bio-Rhythm Mentorship',
                    body: 'Optimizing sleep cycles, stress management, and daily bio-rhythms. Integrates certified astrological insights with modern circadian science for total well-being.',
                    tag: 'Circadian & Stress Bio-Hack'
                  },
                ].map(({ Icon, title, body, tag }) => (
                  <li key={title} className="card-hover group p-6 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 space-y-3 flex flex-col justify-between shadow-soft">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(6,78,59,0.5)] group-hover:scale-105 transition-transform">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-serif font-bold text-base text-gray-900">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed font-light">
                        {body}
                      </p>
                    </div>
                    <div className="pt-3 mt-1 border-t border-gray-100 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                      <Check size={13} className="text-emerald-600" />
                      <span>{tag}</span>
                    </div>
                  </li>
                ))}
              </StaggerReveal>
            </section>
          </FadeInOnScroll>

          {/* SECTION 3: AWARDS & RECOGNITION */}
          <FadeInOnScroll>
            <section
              id="awards"
              aria-labelledby="heading-awards"
              className={`bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-6 ${
                activeTab !== 'awards' ? 'hidden md:block' : 'block'
              }`}
            >
              <SectionHead
                id="heading-awards"
                eyebrow="Official Directory Milestones"
                title="FSIA Awards & Recognized Achievements"
              />

              <StaggerReveal className="space-y-4">
                {/* Award Item 1 */}
                <div className="card-hover p-5 sm:p-6 bg-gradient-to-r from-amber-50 via-amber-50/40 to-white rounded-2xl border border-amber-200/70 flex items-start gap-4 relative overflow-hidden shadow-soft">
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600" />
                  <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 rounded-xl font-bold shrink-0 shadow-md">
                    <Award size={24} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded uppercase">
                        2026 National Award
                      </span>
                      <span className="text-xs text-gray-400">FSIA India Directory</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-gray-900">
                      FSIA Super Woman 2026 Awardee
                    </h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      Awarded by Forever Star India Awards in recognition of exceptional clinical contribution to preventive healthcare and women empowerment in Raipur, Chhattisgarh.
                    </p>
                  </div>
                </div>

                {/* Award Item 2 */}
                <div className="card-hover p-5 sm:p-6 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-gray-100 flex items-start gap-4 shadow-soft">
                  <div className="p-3 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white rounded-xl font-bold shrink-0 shadow-md">
                    <GraduationCap size={24} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded uppercase">
                        Academic Rigor
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-gray-900">
                      Dual Master Academic Credentials
                    </h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      M.Sc. in Mathematics &amp; Bachelor of Pharmacy (B.Pharm) — Certified Registered Pharmacist under State Pharmacy Council.
                    </p>
                  </div>
                </div>

                {/* Award Item 3 */}
                <div className="card-hover p-5 sm:p-6 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-gray-100 flex items-start gap-4 shadow-soft">
                  <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-950 text-amber-400 rounded-xl font-bold shrink-0 shadow-md">
                    <UserCheck size={24} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded uppercase">
                        500+ Lives Restored
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-gray-900">
                      Raipur Healthcare Excellence Benchmark
                    </h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      Helped over 500+ clients across Central India reverse stubborn metabolic fat, balance thyroid markers, and reclaim medicine-free life vitality.
                    </p>
                  </div>
                </div>
              </StaggerReveal>
            </section>
          </FadeInOnScroll>

          {/* SECTION 4: REVIEWS & RATING */}
          <FadeInOnScroll>
            <section
              id="reviews"
              aria-labelledby="heading-reviews"
              className={`bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 space-y-8 ${
                activeTab !== 'reviews' ? 'hidden md:block' : 'block'
              }`}
            >
              <SectionHead
                id="heading-reviews"
                eyebrow="FSIA Verified Ratings"
                title="Client Reviews & Trust Score"
              />

              {/* DYNAMIC VISUAL STAR RATING COMPONENT CARD */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-lift border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                  {/* Score Showcase Column */}
                  <div className="md:col-span-5 text-center md:text-left space-y-3 md:border-r md:border-slate-700/60 md:pr-6">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <span className="text-5xl sm:text-6xl font-serif font-bold text-gilded tracking-tight leading-none">
                        {REVIEW_DATA.ratingValue.toFixed(1)}
                      </span>
                      <div className="text-left">
                        <GoldStarRating rating={REVIEW_DATA.ratingValue} size={20} />
                        <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                          Out of {REVIEW_DATA.bestRating}.0 Stars
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                        <ShieldCheck size={13} className="text-amber-400" />
                        <span>{REVIEW_DATA.reviewCount} Verified FSIA Ratings</span>
                      </span>
                      <p className="text-[11px] text-slate-400 mt-2 font-light leading-relaxed">
                        100% authenticated feedback from verified clients across Raipur and Chhattisgarh.
                      </p>
                    </div>
                  </div>

                  {/* Rating Distribution Bar Chart */}
                  <div className="md:col-span-7 space-y-2">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Rating Breakdown</span>
                      <span className="text-amber-400 font-mono text-[11px]">96% 5-Star Satisfaction</span>
                    </h3>

                    {REVIEW_DATA.distribution.map((item) => (
                      <div key={item.stars} className="flex items-center gap-3 text-xs">
                        <span className="w-12 text-[11px] font-mono text-slate-400 flex items-center gap-1 shrink-0">
                          {item.stars} <Star size={11} className="fill-amber-400 text-amber-400" />
                        </span>
                        <div className="flex-1 bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-slate-700/70">
                          <div
                            className="animate-bar bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 h-full rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-[11px] font-mono text-slate-300 shrink-0">
                          {item.count > 0 ? `${item.count}` : '0'}
                        </span>
                      </div>
                    ))}

                    {/* Category Pill Ratings */}
                    <div className="pt-3 flex flex-wrap gap-2">
                      {REVIEW_DATA.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                        >
                          <Check size={11} className="text-emerald-400" />
                          <span>{cat.name}:</span>
                          <strong className="text-amber-400 font-mono">{cat.rating.toFixed(1)} ★</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Priya Sharma', loc: 'Raipur', quote: "Shweta Ma'am is truly the best wellness coach in Raipur! I reduced 12kg in 3 months without starving or feeling weak. Her pharmacy background gave me immense confidence.", prog: '12-Week Metabolic Reset'
                  },
                  {
                    name: 'Anjali Verma', loc: 'Bhilai', quote: "I was struggling with severe PCOD and fatigue. Shweta’s food-first approach restored my regular cycles within 60 days. Highly recommend her to all women in Chhattisgarh!", prog: 'PCOD & Hormone Balance'
                  },
                  {
                    name: 'Rajesh Agarwal', loc: 'Raipur', quote: "As a busy businessman, I had high triglycerides and heavy abdominal fat. Shweta adjusted my meals around my travel schedule. Lost 9kg and felt energetic again.", prog: 'Executive Wellness'
                  },
                  {
                    name: 'Kavita Sahu', loc: 'Durg', quote: "Her empathy and weekly follow-ups kept me motivated. She explains the scientific reason behind every food choice. Truly deserving of the FSIA Super Woman Award!", prog: 'Lifestyle Transformation'
                  },
                ].map((r) => (
                  <div key={r.name} className="card-hover p-5 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-gray-100 space-y-3 shadow-soft">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-serif font-bold text-sm shrink-0 shadow-sm">
                          {r.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <strong className="text-sm font-bold text-gray-900 block leading-tight">{r.name}</strong>
                          <span className="text-[10px] text-gray-400 font-mono">{r.loc} &bull; Verified Client</span>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 font-light leading-relaxed italic">
                      "{r.quote}"
                    </p>
                    <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1.5 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Program: {r.prog}
                    </div>
                  </div>
                ))}
              </StaggerReveal>
            </section>
          </FadeInOnScroll>

          {/* SECTION 5: CONSULTATION BOOKING & DIRECT CONNECT */}
          <FadeInOnScroll>
            <section
              id="consultation"
              aria-labelledby="heading-consultation"
              className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lift border border-slate-800"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/12 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-16 w-80 h-80 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

              <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full inline-block">
                    FSIA Direct Contact
                  </span>
                  <h2 id="heading-consultation" className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mt-3 text-white tracking-tight text-balance">
                    Book a Diagnostic Consultation
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mt-3 max-w-xl mx-auto">
                    Connect directly with Shweta Mishra in Raipur. Review your biological profile, discuss current symptoms, and map out a safe lifestyle starting point.
                  </p>
                  <PulseLine className="w-full max-w-md mx-auto h-8 mt-5 opacity-80" color="#34d399" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <a
                    href="tel:+919425212345"
                    className="card-hover flex flex-col items-center justify-center text-center p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-xs group"
                  >
                    <PhoneCall size={22} className="text-amber-400 mb-2.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-400 text-[10px] block font-mono uppercase tracking-wider">Direct Phone</span>
                    <strong className="text-white font-mono mt-1">+91 94252 12345</strong>
                  </a>

                  <a
                    href="https://wa.me/919425212345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover flex flex-col items-center justify-center text-center p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-xs group"
                  >
                    <MessageSquare size={22} className="text-emerald-400 mb-2.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-400 text-[10px] block font-mono uppercase tracking-wider">WhatsApp Instant</span>
                    <strong className="text-white font-mono mt-1">+91 94252 12345</strong>
                  </a>

                  <div className="flex flex-col items-center justify-center text-center p-5 bg-white/5 rounded-2xl border border-white/10 text-xs">
                    <MapPin size={22} className="text-amber-400 mb-2.5" />
                    <span className="text-slate-400 text-[10px] block font-mono uppercase tracking-wider">VIP Road Clinic</span>
                    <strong className="text-white font-sans mt-1">Raipur, Chhattisgarh</strong>
                  </div>
                </div>
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
    </div>
  );
}
