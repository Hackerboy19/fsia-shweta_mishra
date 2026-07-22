import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Leaf, Menu, X, PhoneCall, Sparkles } from 'lucide-react';

import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import About from './components/About';
import Services from './components/Services';
import InteractiveBMI from './components/InteractiveBMI';
import AwardsTimeline from './components/AwardsTimeline';
import FAQ from './components/FAQ';
import ContactFooter from './components/ContactFooter';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#services' },
    { name: 'Vitality Tool', href: '#wellness-calculator' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'FAQs', href: '#faq' },
  ];

  return (
    <div className="min-h-screen bg-cream-main text-charcoal-main font-sans selection:bg-sage-200 selection:text-sage-900 scroll-smooth">
      
      {/* Top Banner Accent */}
      <div className="bg-sage-900 text-white py-2 px-6 text-center text-[10px] md:text-xs font-medium tracking-wider uppercase relative z-50 flex items-center justify-center gap-2">
        <Sparkles size={11} className="text-gold-300 animate-pulse" />
        <span>Celebrating Shweta Mishra: National Super Woman 2026 Awardee</span>
        <Sparkles size={11} className="text-gold-300 animate-pulse" />
      </div>

      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5 mt-0'
            : 'bg-transparent py-5 mt-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-sage-600 text-white flex items-center justify-center shadow-md shadow-sage-600/10 transition-transform group-hover:scale-102">
              <Leaf size={18} className="stroke-[2.2]" />
            </div>
            <div>
              <span className="font-serif text-base md:text-lg font-bold text-slate-900 tracking-tight block">
                Shweta Mishra
              </span>
              <span className="text-[9px] font-bold text-sage-600 uppercase tracking-widest block -mt-1 font-mono">
                Holistic Wellness
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '')}`}
                key={link.name}
                href={link.href}
                className="hover:text-sage-700 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-sage-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:block">
            <a
              id="header-cta-booking"
              href="#contact"
              className="px-5 py-2.5 bg-sage-900 hover:bg-sage-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all duration-300 flex items-center gap-1.5"
            >
              <PhoneCall size={12} />
              <span>Book Slot</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-6 space-y-4"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '')}`}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-700 hover:text-sage-700 py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <a
                  id="mobile-nav-cta"
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-sage-900 text-white font-semibold text-center rounded-xl block text-xs"
                >
                  Book Callback Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Sections */}
      <main>
        <Hero />
        <TrustBadges />
        <About />
        <Services />
        <InteractiveBMI />
        <AwardsTimeline />
        <FAQ />
      </main>

      <ContactFooter />
    </div>
  );
}
