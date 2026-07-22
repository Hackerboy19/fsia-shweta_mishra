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
  ThumbsUp,
  Check
} from 'lucide-react';

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

    return () => {
      observer.disconnect();
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

export default function ShwetaProfilePage() {
  const [activeTab, setActiveTab] = useState<'bio' | 'expertise' | 'awards' | 'reviews'>('bio');

  const whatsappMessage = encodeURIComponent(
    'Hello Shweta Mishra! I visited your official FSIA directory profile (Best Wellness Coach in Raipur) and would like to schedule a consultation.'
  );

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-gray-800 font-sans antialiased selection:bg-amber-100 selection:text-amber-900 pb-16">
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
                'image': 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800',
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
                ]
              },
              {
                '@type': 'HealthAndBeautyBusiness',
                '@id': 'https://fsia.in/directory/wellness-coaches/raipur/shweta-mishra#business',
                'name': 'Shweta Mishra Wellness - Best Wellness Coach in Raipur',
                'image': 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800',
                'priceRange': '₹₹',
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
                'aggregateRating': {
                  '@type': 'AggregateRating',
                  'ratingValue': REVIEW_DATA.ratingValue.toFixed(1),
                  'reviewCount': REVIEW_DATA.reviewCount.toString(),
                  'bestRating': REVIEW_DATA.bestRating.toString(),
                  'worstRating': REVIEW_DATA.worstRating.toString()
                }
              }
            ]
          })
        }}
      />

      {/* Directory Platform Sub-Header Banner */}
      <div className="bg-slate-900 text-slate-300 py-2.5 px-4 text-xs border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded tracking-wider uppercase font-mono">
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
              <a href="https://fsia.in" className="hover:text-amber-600 transition-colors">
                Home
              </a>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <a href="#directory" className="hover:text-amber-600 transition-colors">
                Wellness Coaches
              </a>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <a href="#raipur" className="hover:text-amber-600 transition-colors">
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
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8 relative overflow-hidden">
            {/* Background Accent Gradient */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-100/40 via-emerald-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              
              {/* Profile Image Column */}
              <div className="shrink-0 w-full sm:w-auto flex flex-col items-center sm:items-start">
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800"
                    srcSet="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=320 320w, https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=480 480w, https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=640 640w, https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800 800w, https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=1200 1200w"
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                    alt="Shweta Mishra - Best Wellness Coach in Raipur"
                    decoding="async"
                    fetchPriority="high"
                    className="w-48 h-60 sm:w-56 sm:h-68 md:w-64 md:h-80 object-cover rounded-2xl border-4 border-white shadow-lg shadow-gray-200"
                  />
                  <div className="absolute -bottom-3 -right-2 bg-slate-900 text-amber-400 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md">
                    <Award size={12} className="text-amber-400" />
                    <span>FSIA 2026</span>
                  </div>
                </div>

                {/* Quick Info under photo */}
                <div className="mt-5 w-full space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                    <MapPin size={14} className="text-emerald-700 shrink-0" />
                    <span>VIP Road Clinic, Raipur (C.G.)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                    <Clock size={14} className="text-emerald-700 shrink-0" />
                    <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Profile Header Details Column */}
              <div className="flex-1 space-y-5">
                
                {/* Main Heading H1 */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-200/60">
                      FSIA Super Woman 2026
                    </span>
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200/60">
                      Verified Health Mentor
                    </span>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
                    Shweta Mishra - Best Wellness Coach in Raipur
                  </h1>
                  
                  <p className="text-base sm:text-lg text-emerald-800 font-medium font-sans mt-1.5 flex items-center gap-2">
                    <Microscope size={18} className="text-emerald-600" />
                    <span>Registered Pharmacist &amp; Holistic Lifestyle Expert</span>
                  </p>
                </div>

                {/* Trust Badges Row */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold">
                    <Award size={14} className="text-amber-600 fill-amber-400" />
                    <span>Super Woman 2026 Awardee</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold">
                    <ShieldCheck size={14} className="text-slate-600" />
                    <span>FSIA Directory Verified</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/90 text-amber-950 border border-amber-200/90 rounded-xl text-xs font-semibold shadow-xs">
                    <GoldStarRating rating={REVIEW_DATA.ratingValue} size={13} />
                    <span>{REVIEW_DATA.ratingValue.toFixed(1)} Rating ({REVIEW_DATA.reviewCount} Verified Reviews)</span>
                  </div>
                </div>

                {/* Key Qualifications Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50/80 rounded-2xl border border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-wider">Education</span>
                    <strong className="text-gray-800 font-semibold block mt-0.5">M.Sc. Math &amp; B.Pharm</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-wider">Transformation</span>
                    <strong className="text-gray-800 font-semibold block mt-0.5">Personal 18kg Fat Loss</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase tracking-wider">Methodology</span>
                    <strong className="text-gray-800 font-semibold block mt-0.5">100% Starvation-Free</strong>
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-light">
                  Combining the rigorous scientific safety of pharmacological medicine with custom biological nutrition, circadian habit restoration, and empathetic guidance. Helping women and families across Raipur achieve vibrant, medicine-free health.
                </p>

                {/* Hero CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    id="btn-hero-primary-consult"
                    href="#consultation"
                    className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-md shadow-emerald-900/10 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Calendar size={16} />
                    <span>Book Consultation</span>
                  </a>

                  <a
                    id="btn-hero-whatsapp"
                    href={`https://wa.me/919425212345?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    id="btn-hero-phone"
                    href="tel:+919425212345"
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall size={14} />
                    <span>Call Direct</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
          </FadeInOnScroll>

          {/* STICKY LOCAL PROFILE NAVIGATION */}
          <nav aria-label="Profile navigation" className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-y border-gray-200/80 shadow-xs rounded-xl p-1 sm:px-2 sm:py-1.5 my-6">
            <div className="grid grid-cols-4 gap-1 sm:flex sm:items-center sm:justify-start sm:gap-2">
              <button
                id="tab-btn-bio"
                onClick={() => setActiveTab('bio')}
                className={`px-1 py-2 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center ${
                  activeTab === 'bio'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Bio <span className="hidden xs:inline">&amp; Story</span></span>
              </button>

              <button
                id="tab-btn-expertise"
                onClick={() => setActiveTab('expertise')}
                className={`px-1 py-2 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center ${
                  activeTab === 'expertise'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Expertise</span>
              </button>

              <button
                id="tab-btn-awards"
                onClick={() => setActiveTab('awards')}
                className={`px-1 py-2 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center ${
                  activeTab === 'awards'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Awards</span>
              </button>

              <button
                id="tab-btn-reviews"
                onClick={() => setActiveTab('reviews')}
                className={`px-1 py-2 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center ${
                  activeTab === 'reviews'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Reviews <span className="hidden sm:inline">(148)</span></span>
              </button>
            </div>
          </nav>

          {/* SECTION 1: BIO & STORY */}
          <FadeInOnScroll>
            <section
              id="bio"
              aria-labelledby="heading-bio"
              className={`bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-6 ${
                activeTab !== 'bio' ? 'hidden md:block' : 'block'
              }`}
            >
              <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Profile Biography
                  </span>
                  <h2 id="heading-bio" className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-2">
                    About Shweta Mishra — Clinical Wellness Coach
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-light">
                  <p>
                    As the <strong className="font-semibold text-gray-900">Best Wellness Coach in Raipur</strong>, Shweta Mishra has established a pioneering standard in clinical lifestyle transformation. Her approach bridges the exact analytical rigor of clinical pharmacology with empathetic, starvation-free biological wellness.
                  </p>
                  <p>
                    Holding a dual academic foundation with an <strong className="font-semibold text-gray-900">M.Sc. in Mathematics</strong> and a <strong className="font-semibold text-gray-900">Bachelor of Pharmacy (B.Pharm)</strong>, Shweta evaluates human health as an integrated, measurable physiological system. As a registered pharmacist, she understands the deep molecular interactions of medications, ensuring that every diet and lifestyle change is 100% clinically safe.
                  </p>

                  <div className="my-4 p-5 bg-amber-50/60 rounded-2xl border border-amber-200/60 space-y-2">
                    <h3 className="text-sm font-serif font-bold text-amber-950 flex items-center gap-2">
                      <Heart size={16} className="text-amber-600" />
                      <span>The 18kg Personal Transformation Story</span>
                    </h3>
                    <p className="text-xs text-amber-900/90 leading-relaxed italic">
                      "Before coaching hundreds of families in Raipur, I walked this journey myself. Experiencing post-partum weight shifts and metabolic stagnation, I shed 18kg permanently without chemical fat-burners, crash starvation, or exhausting hours in the gym. This personal journey proved that when you heal the cell and balance circadian rhythm, the body naturally releases excess weight."
                    </p>
                  </div>

                  <p>
                    Whether working with busy working professionals, mothers battling PCOD/PCOS, or individuals looking for a top <strong className="font-semibold text-gray-900">nutrition coach in Raipur</strong>, Shweta crafts customized bio-rhythm protocols tailored to Central India's unique dietary traditions and lifestyle rhythms.
                  </p>
                </div>

                {/* Bio Highlights Card */}
                <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    At A Glance
                  </h3>

                  <ul className="space-y-3 text-xs">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-800 block">Pharmacology Verified</strong>
                        <span className="text-gray-500">Zero risky supplement or drug interactions.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-800 block">100% No Starvation</strong>
                        <span className="text-gray-500">Delicious local diets balanced for blood sugar stability.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-800 block">Circadian Bio-Rhythms</strong>
                        <span className="text-gray-500">Sleep, stress, and hormone alignment.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-800 block">Astrological Alignment</strong>
                        <span className="text-gray-500">Optional cosmic bio-rhythm integration.</span>
                      </div>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <a
                      href="#consultation"
                      className="block text-center w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
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
              className={`bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-6 ${
                activeTab !== 'expertise' ? 'hidden md:block' : 'block'
              }`}
            >
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Core Offerings
                </span>
                <h2 id="heading-expertise" className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-2">
                  Services &amp; Specializations
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Structured clinical frameworks designed for sustainable, medicine-free health in Raipur.
                </p>
              </div>

              {/* Semantic List Structure for SEO */}
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <li className="p-6 bg-slate-50/70 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Activity size={20} />
                    </div>
                    <h3 className="font-serif font-bold text-base text-gray-900">
                      Holistic Weight Management
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      A personalized, non-starvation fat loss blueprint based on Shweta's 18kg personal victory. Focuses on metabolic speed, cellular nutrition, and blood glucose stability.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <span>100% Food-First Reversal</span>
                  </div>
                </li>

                <li className="p-6 bg-slate-50/70 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Microscope size={20} />
                    </div>
                    <h3 className="font-serif font-bold text-base text-gray-900">
                      Preventive Healthcare &amp; PCOD Reversal
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      Addressing the root causes of PCOD, PCOS, Thyroid sluggishness, and Type-2 pre-diabetes. Dual pharmacist oversight ensures total physiological safety.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <span>Hormone &amp; Insulin Balance</span>
                  </div>
                </li>

                <li className="p-6 bg-slate-50/70 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <Sparkles size={20} />
                    </div>
                    <h3 className="font-serif font-bold text-base text-gray-900">
                      Lifestyle &amp; Bio-Rhythm Mentorship
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      Optimizing sleep cycles, stress management, and daily bio-rhythms. Integrates certified astrological insights with modern circadian science for total well-being.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <span>Circadian &amp; Stress Bio-Hack</span>
                  </div>
                </li>
              </ul>
            </section>
          </FadeInOnScroll>

          {/* SECTION 3: AWARDS & RECOGNITION */}
          <FadeInOnScroll>
            <section
              id="awards"
              aria-labelledby="heading-awards"
              className={`bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-6 ${
                activeTab !== 'awards' ? 'hidden md:block' : 'block'
              }`}
            >
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Official Directory Milestones
                </span>
                <h2 id="heading-awards" className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-2">
                  FSIA Awards &amp; Recognized Achievements
                </h2>
              </div>

              <div className="space-y-4">
                {/* Award Item 1 */}
                <div className="p-5 bg-gradient-to-r from-amber-50/60 via-white to-white rounded-2xl border border-amber-200/70 flex items-start gap-4">
                  <div className="p-3 bg-amber-500 text-slate-950 rounded-xl font-bold shrink-0">
                    <Award size={24} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded uppercase">
                        2026 National Award
                      </span>
                      <span className="text-xs text-gray-400">FSIA India Directory</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-gray-900">
                      FSIA Super Woman 2026 Awardee
                    </h3>
                    <p className="text-xs text-gray-600 font-light">
                      Awarded by Forever Star India Awards in recognition of exceptional clinical contribution to preventive healthcare and women empowerment in Raipur, Chhattisgarh.
                    </p>
                  </div>
                </div>

                {/* Award Item 2 */}
                <div className="p-5 bg-slate-50/80 rounded-2xl border border-gray-100 flex items-start gap-4">
                  <div className="p-3 bg-emerald-800 text-white rounded-xl font-bold shrink-0">
                    <GraduationCap size={24} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded uppercase">
                        Academic Rigor
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-gray-900">
                      Dual Master Academic Credentials
                    </h3>
                    <p className="text-xs text-gray-600 font-light">
                      M.Sc. in Mathematics &amp; Bachelor of Pharmacy (B.Pharm) — Certified Registered Pharmacist under State Pharmacy Council.
                    </p>
                  </div>
                </div>

                {/* Award Item 3 */}
                <div className="p-5 bg-slate-50/80 rounded-2xl border border-gray-100 flex items-start gap-4">
                  <div className="p-3 bg-slate-800 text-amber-400 rounded-xl font-bold shrink-0">
                    <UserCheck size={24} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded uppercase">
                        500+ Lives Restored
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-gray-900">
                      Raipur Healthcare Excellence Benchmark
                    </h3>
                    <p className="text-xs text-gray-600 font-light">
                      Helped over 500+ clients across Central India reverse stubborn metabolic fat, balance thyroid markers, and reclaim medicine-free life vitality.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* SECTION 4: REVIEWS & RATING */}
          <FadeInOnScroll>
            <section
              id="reviews"
              aria-labelledby="heading-reviews"
              className={`bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-8 ${
                activeTab !== 'reviews' ? 'hidden md:block' : 'block'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  FSIA Verified Ratings
                </span>
                <h2 id="heading-reviews" className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-2">
                  Client Reviews &amp; Trust Score
                </h2>
              </div>

              {/* DYNAMIC VISUAL STAR RATING COMPONENT CARD */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                  {/* Score Showcase Column */}
                  <div className="md:col-span-5 text-center md:text-left space-y-3 md:border-r md:border-slate-800 md:pr-6">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <span className="text-4xl sm:text-5xl font-serif font-bold text-amber-400 tracking-tight">
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
                      <p className="text-[11px] text-slate-400 mt-2 font-light">
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
                        <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                          <div
                            className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Review Card 1 */}
                <div className="p-5 bg-slate-50/70 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm font-bold text-gray-900 block">Priya Sharma</strong>
                      <span className="text-[10px] text-gray-400 font-mono">Raipur &bull; Verified Client</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-light leading-relaxed italic">
                    "Shweta Ma'am is truly the best wellness coach in Raipur! I reduced 12kg in 3 months without starving or feeling weak. Her pharmacy background gave me immense confidence."
                  </p>
                  <div className="text-[10px] text-emerald-800 font-semibold">
                    Program: 12-Week Metabolic Reset
                  </div>
                </div>

                {/* Review Card 2 */}
                <div className="p-5 bg-slate-50/70 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm font-bold text-gray-900 block">Anjali Verma</strong>
                      <span className="text-[10px] text-gray-400 font-mono">Bhilai &bull; Verified Client</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-light leading-relaxed italic">
                    "I was struggling with severe PCOD and fatigue. Shweta’s food-first approach restored my regular cycles within 60 days. Highly recommend her to all women in Chhattisgarh!"
                  </p>
                  <div className="text-[10px] text-emerald-800 font-semibold">
                    Program: PCOD &amp; Hormone Balance
                  </div>
                </div>

                {/* Review Card 3 */}
                <div className="p-5 bg-slate-50/70 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm font-bold text-gray-900 block">Rajesh Agarwal</strong>
                      <span className="text-[10px] text-gray-400 font-mono">Raipur &bull; Verified Client</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-light leading-relaxed italic">
                    "As a busy businessman, I had high triglycerides and heavy abdominal fat. Shweta adjusted my meals around my travel schedule. Lost 9kg and felt energetic again."
                  </p>
                  <div className="text-[10px] text-emerald-800 font-semibold">
                    Program: Executive Wellness
                  </div>
                </div>

                {/* Review Card 4 */}
                <div className="p-5 bg-slate-50/70 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm font-bold text-gray-900 block">Kavita Sahu</strong>
                      <span className="text-[10px] text-gray-400 font-mono">Durg &bull; Verified Client</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-light leading-relaxed italic">
                    "Her empathy and weekly follow-ups kept me motivated. She explains the scientific reason behind every food choice. Truly deserving of the FSIA Super Woman Award!"
                  </p>
                  <div className="text-[10px] text-emerald-800 font-semibold">
                    Program: Lifestyle Transformation
                  </div>
                </div>
              </div>
            </section>
          </FadeInOnScroll>

          {/* SECTION 5: CONSULTATION BOOKING & DIRECT CONNECT */}
          <FadeInOnScroll>
            <section
              id="consultation"
              aria-labelledby="heading-consultation"
              className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full inline-block">
                    FSIA Direct Contact
                  </span>
                  <h2 id="heading-consultation" className="text-2xl sm:text-3xl font-serif font-bold mt-3 text-white">
                    Book a Diagnostic Consultation
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mt-2 max-w-xl mx-auto">
                    Connect directly with Shweta Mishra in Raipur. Review your biological profile, discuss current symptoms, and map out a safe lifestyle starting point.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <a
                    href="tel:+919425212345"
                    className="flex flex-col items-center justify-center text-center p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/10 text-xs group"
                  >
                    <PhoneCall size={20} className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-400 text-[10px] block font-mono uppercase">Direct Phone</span>
                    <strong className="text-white font-mono mt-0.5">+91 94252 12345</strong>
                  </a>

                  <a
                    href="https://wa.me/919425212345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-center p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/10 text-xs group"
                  >
                    <MessageSquare size={20} className="text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-400 text-[10px] block font-mono uppercase">WhatsApp Instant</span>
                    <strong className="text-white font-mono mt-0.5">+91 94252 12345</strong>
                  </a>

                  <div className="flex flex-col items-center justify-center text-center p-4 bg-white/5 rounded-xl border border-white/10 text-xs">
                    <MapPin size={20} className="text-amber-400 mb-2" />
                    <span className="text-slate-400 text-[10px] block font-mono uppercase">VIP Road Clinic</span>
                    <strong className="text-white font-sans mt-0.5">Raipur, Chhattisgarh</strong>
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
