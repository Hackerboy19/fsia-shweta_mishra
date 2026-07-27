import React, { useState } from 'react';
import { Award, Star, Sparkles, Heart, Briefcase, Palette, Users, GraduationCap, Rocket, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';

const CATEGORIES = [
  { Icon: Heart, name: 'Health & Wellness', tone: 'bg-emerald-100 text-emerald-800' },
  { Icon: Briefcase, name: 'Business & Entrepreneur', tone: 'bg-sky-100 text-sky-700' },
  { Icon: Palette, name: 'Arts & Culture', tone: 'bg-rose-100 text-rose-700' },
  { Icon: Users, name: 'Social Impact', tone: 'bg-amber-100 text-amber-700' },
  { Icon: GraduationCap, name: 'Education', tone: 'bg-violet-100 text-violet-700' },
  { Icon: Rocket, name: 'Youth Icon', tone: 'bg-teal-100 text-teal-700' },
];

export default function NominationPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="grain min-h-screen text-gray-800 font-sans antialiased pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="#/nominate" className="flex items-center gap-2.5">
            <img src="/fsia-logo.gif" alt="FSIA" width={40} height={40} className="w-10 h-10 object-contain shrink-0" />
            <span className="leading-none">
              <span className="block font-serif font-bold text-lg text-gray-900 tracking-wide">FSIA</span>
              <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.14em] text-emerald-700/70 mt-0.5">Forever Star India Awards</span>
            </span>
          </a>
          <a href="#/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-800">
            <ArrowLeft size={14} /> Back to Profile
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full">
            <Sparkles size={12} /> Nominations Open · 2026
          </span>
          <h1 className="mt-5 font-serif font-bold text-3xl sm:text-5xl tracking-tight leading-[1.05]">
            Nominate a <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">Change-Maker</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto">
            Forever Star India Awards celebrates individuals creating real impact across India. Nominate yourself or someone inspiring for the 2026 honours.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#nominate-form" className="btn-sheen inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm rounded-full shadow-[0_10px_28px_-8px_rgba(16,185,129,0.6)] transition-all">
              Submit a Nomination <ChevronRight size={16} />
            </a>
            <a href="https://fsia.in/quickapply" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-white">
              Quick Apply →
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Award size={14} className="text-amber-400" /> National Recognition</span>
            <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-400 fill-amber-400" /> Verified Directory Profile</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Categories */}
        <section className="py-12">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 tracking-tight">Award Categories</h2>
          <span className="block mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {CATEGORIES.map(({ Icon, name, tone }) => (
              <div key={name} className="card-hover p-5 bg-white rounded-2xl border border-gray-100 shadow-soft flex flex-col items-center text-center gap-2.5">
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tone}`}><Icon size={22} /></span>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section id="nominate-form" className="pb-16">
          <div className="bg-white rounded-3xl border border-gray-200/70 shadow-card p-6 sm:p-8 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 tracking-tight">Nomination Form</h2>
            <span className="block mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />

            {sent ? (
              <div className="mt-8 text-center py-10">
                <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
                <h3 className="mt-4 font-serif font-bold text-xl text-gray-900">Nomination Received!</h3>
                <p className="mt-2 text-sm text-gray-500">Thank you. The FSIA team will review and get in touch.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-emerald-700">Submit another →</button>
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nominee Full Name" required><input required className={inp} placeholder="e.g. Shweta Mishra" /></Field>
                  <Field label="Category" required>
                    <select required className={inp} defaultValue="">
                      <option value="" disabled>Select a category</option>
                      {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your Name" required><input required className={inp} placeholder="Your name" /></Field>
                  <Field label="Phone / WhatsApp" required><input required type="tel" className={inp} placeholder="+91 …" /></Field>
                </div>
                <Field label="Email"><input type="email" className={inp} placeholder="you@example.com" /></Field>
                <Field label="City"><input className={inp} placeholder="City, State" /></Field>
                <Field label="Why do they deserve this award?" required>
                  <textarea required rows={4} className={inp} placeholder="Share their achievements and impact…" />
                </Field>
                <button type="submit" className="btn-sheen glow-pulse w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-b from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-[0_10px_28px_-8px_rgba(6,78,59,0.5)] transition-all">
                  <Award size={17} /> Submit Nomination
                </button>
                <p className="text-[11px] text-gray-400 text-center">By submitting you agree to be contacted by the FSIA team regarding this nomination.</p>
              </form>
            )}
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        Forever Star India Awards · fsia.in · Nominations 2026
      </footer>
    </div>
  );
}

const inp = 'w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-slate-50/60 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:bg-white transition-colors';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
        {label}{required && <span className="text-rose-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
