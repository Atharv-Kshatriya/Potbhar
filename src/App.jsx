import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FreshGuardSection from './components/FreshGuardSection';
import QuotesCarousel from './components/QuotesCarousel';
import StoriesSection from './components/StoriesSection';
const ImpactCharts = lazy(() => import('./components/ImpactCharts'));
import FaqSection from './components/FaqSection';
import AuthModal from './components/AuthModal';

// Dedicated Portals (Compost & Gaushala are completely separate)
import DonorPortal from './components/portals/DonorPortal';
import OrphanagePortal from './components/portals/OrphanagePortal';
import ShelterPortal from './components/portals/ShelterPortal';
import GaushalaPortal from './components/portals/GaushalaPortal';
import CompostPortal from './components/portals/CompostPortal';
import VolunteerPortal from './components/portals/VolunteerPortal';
import AdminPortal from './components/portals/AdminPortal';

import { CONTENT_KIT, MARATHI_BRAND_LINE } from './lib/contentKit';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Heart, 
  Users, 
  Leaf, 
  CheckCircle2, 
  Play, 
  Award,
  Layers,
  ChevronRight,
  Navigation,
  Recycle
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'mr'
  const [activePortal, setActivePortal] = useState(null); // null (landing) or 'donor' | 'orphanage' | 'shelter' | 'gaushala' | 'compost' | 'volunteer' | 'admin'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setActivePortal(userData.role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePortalBack = () => {
    window.sessionStorage.removeItem('potbhar.accessToken');
    setCurrentUser(null);
    setActivePortal(null);
  };

  // Dedicated Portals Routing
  if (activePortal === 'donor') {
    return <DonorPortal lang={lang} user={currentUser} onBackToLanding={handlePortalBack} />;
  }
  if (activePortal === 'orphanage') {
    return <OrphanagePortal lang={lang} user={currentUser} onBackToLanding={handlePortalBack} />;
  }
  if (activePortal === 'shelter') {
    return <ShelterPortal lang={lang} user={currentUser} onBackToLanding={handlePortalBack} />;
  }
  if (activePortal === 'gaushala') {
    return <GaushalaPortal lang={lang} user={currentUser} onBackToLanding={handlePortalBack} />;
  }
  if (activePortal === 'compost') {
    return <CompostPortal lang={lang} user={currentUser} onBackToLanding={handlePortalBack} />;
  }
  if (activePortal === 'volunteer') {
    return <VolunteerPortal lang={lang} user={currentUser} onBackToLanding={handlePortalBack} />;
  }
  if (activePortal === 'admin') {
    return <AdminPortal lang={lang} user={currentUser} onBackToLanding={handlePortalBack} />;
  }

  // Public Landing Page
  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#4B2E1E] selection:bg-[#F28C28]/20 selection:text-[#B85F00] font-sans">
      
      {/* 1. Header (Sticky, blurred cream) */}
      <Navbar
        lang={lang}
        setLang={setLang}
        setActivePortal={setActivePortal}
        openAuthModal={() => setAuthModalOpen(true)}
      />

      {/* 2. Hero Section - With prominent hero-illustration.png */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* Eyebrow Secondary Tagline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-[#FFF0DE] border border-[#F28C28]/30 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-pulse"></span>
                <span className="text-sm font-semibold text-[#B85F00] font-marathi-calligraphy">
                  {MARATHI_BRAND_LINE}
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#1F5C3A] leading-[1.14] tracking-tight">
                {lang === 'mr' ? (
                  <>
                    आजचं उरलेलं अन्न,<br />
                    <span className="text-[#F28C28]">आज रात्रीचं जेवण.</span>
                  </>
                ) : (
                  <>
                    Today's Surplus,<br />
                    <span className="text-[#F28C28]">Tonight's Meal.</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#735747] leading-relaxed max-w-xl">
                {CONTENT_KIT.hero.sub[lang]}
              </p>

              {/* CTAs Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                
                {/* Donate Surplus Food (Primary Forest Green Pill) */}
                <button
                  onClick={() => setActivePortal('donor')}
                  className="px-6 py-3.5 bg-[#1F5C3A] hover:bg-[#16452B] text-white font-bold text-sm rounded-pill btn-pill shadow-soft flex items-center gap-2.5"
                >
                  <Sparkles className="w-4 h-4 text-[#F6C343]" />
                  <span>{CONTENT_KIT.hero.ctaDonate[lang]}</span>
                </button>

                {/* Find Food / Recipient Intake (High Contrast Gold Button) */}
                <button
                  onClick={() => setActivePortal('orphanage')}
                  className="px-6 py-3.5 bg-[#F6C343] hover:bg-[#E0A922] text-[#4B2E1E] font-bold text-sm rounded-pill btn-pill shadow-soft border border-[#E0A922] flex items-center gap-2"
                >
                  <span>{CONTENT_KIT.hero.ctaFind[lang]}</span>
                </button>

                <a
                  href="#how-it-works"
                  className="px-4 py-3 text-xs font-bold text-[#1F5C3A] hover:text-[#B85F00] flex items-center gap-2 transition-colors"
                >
                  <span>{CONTENT_KIT.hero.ctaHow[lang]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Right Hero Artwork: hero-illustration.png */}
            <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
              <img
                src="/images/hero-illustration.png"
                alt="PotBhar Community Surplus Redistribution"
                className="relative block w-full max-w-[40rem] sm:max-w-[46rem] lg:w-[calc(100%+3rem)] lg:max-w-none lg:-mr-12 h-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/newARCH/hero-illustration.png';
                }}
              />
            </div>
          </div>
          {/* 3-Stat Strip Floating Across Bottom */}
          <div className="mt-14 max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-7 border border-[#E8DAC2] shadow-soft-lg grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#F0E6D8]">
            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#F28C28]">
                🍲 {CONTENT_KIT.statsStrip.recovered.value}
              </div>
              <div className="text-xs font-bold text-[#735747] uppercase tracking-wider mt-1">
                {CONTENT_KIT.statsStrip.recovered.label[lang]}
              </div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#1F5C3A]">
                🍽 {CONTENT_KIT.statsStrip.meals.value}
              </div>
              <div className="text-xs font-bold text-[#735747] uppercase tracking-wider mt-1">
                {CONTENT_KIT.statsStrip.meals.label[lang]}
              </div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#4E9A59]">
                🌱 {CONTENT_KIT.statsStrip.composted.value}
              </div>
              <div className="text-xs font-bold text-[#735747] uppercase tracking-wider mt-1">
                {CONTENT_KIT.statsStrip.composted.label[lang]}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. The Problem Section */}
      <section className="py-20 bg-gradient-to-b from-[#FFF6E8] to-[#FFF0DE]/40 border-t border-[#E8DAC2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1F5C3A] leading-snug">
              "{CONTENT_KIT.theProblem.title[lang]}"
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#735747]">
              {CONTENT_KIT.theProblem.subtitle[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTENT_KIT.theProblem.cards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DAC2] shadow-soft flex flex-col justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-[#D9622B] block mb-2">
                    {lang === 'mr' ? card.figureMr : card.figure}
                  </span>
                  <p className="text-sm font-bold text-[#4B2E1E] leading-relaxed">
                    {card.label[lang]}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F0E6D8] text-[11px] font-semibold text-[#A38979]">
                  Source: {card.source}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. How It Works - Illustrated with Real Artwork (NO AI label) */}
      <section id="how-it-works" className="py-20 bg-[#FFF6E8] border-t border-[#E8DAC2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[#FFF0DE] border border-[#F28C28]/30 text-xs font-bold text-[#B85F00] mb-3.5 shadow-xs">
              <span>{lang === 'mr' ? 'अन्न पुनर्वापर कार्यप्रवाह' : 'Food Recovery Workflow'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1F5C3A] leading-tight">
              {CONTENT_KIT.howItWorks.title[lang]}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#735747]">
              {CONTENT_KIT.howItWorks.subtitle[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTENT_KIT.howItWorks.steps.map((st, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DAC2] shadow-soft flex flex-col justify-between hover:border-[#F28C28] transition-all">
                <div>
                  {/* Step Thumbnail Artwork */}
                  <div className="w-full h-36 rounded-2xl overflow-hidden bg-[#FFFBF5] border border-[#E8DAC2] mb-4 p-1">
                    <img 
                      src={st.image} 
                      alt={st.title[lang]} 
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/brand/logo.png';
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-lg bg-[#FFF0DE] text-[#B85F00] font-mono font-bold text-xs flex items-center justify-center">
                      {st.num}
                    </span>
                    <h3 className="font-display font-bold text-base text-[#1F5C3A]">
                      {st.title[lang]}
                    </h3>
                  </div>

                  <p className="text-xs text-[#735747] leading-relaxed">
                    {st.desc[lang]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0E6D8] text-[11px] font-bold text-[#F28C28] flex items-center justify-between">
                  <span>Step {i + 1} of 4</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Food Quality Assessment & Priority Rules (No live radar scan) */}
      <FreshGuardSection lang={lang} />

      {/* 6. Stories Section */}
      <StoriesSection lang={lang} />

      {/* 7. Quotes Carousel */}
      <QuotesCarousel lang={lang} />

      {/* 8. Impact Visualizations */}
      <Suspense fallback={<div className="mx-auto my-12 h-64 max-w-7xl animate-pulse rounded-3xl bg-white/70" aria-label="Loading impact charts" />}>
        <ImpactCharts lang={lang} />
      </Suspense>

      {/* 9. About Us Section */}
      <section id="about-us" className="py-20 bg-white border-t border-[#E8DAC2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider block">
              {CONTENT_KIT.aboutUs.title[lang]}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1F5C3A]">
              {CONTENT_KIT.aboutUs.headline[lang]}
            </h2>
            <p className="mt-6 text-sm sm:text-base text-[#4B2E1E] leading-relaxed max-w-3xl mx-auto font-sans">
              {CONTENT_KIT.aboutUs.missionText[lang]}
            </p>
          </div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTENT_KIT.aboutUs.values.map((val, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FFFBF5] border border-[#E8DAC2] space-y-2">
                <h4 className="font-display font-bold text-sm text-[#1F5C3A]">
                  {val.title[lang]}
                </h4>
                <p className="text-xs text-[#735747] leading-relaxed">
                  {val.desc[lang]}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ Accordion */}
      <FaqSection lang={lang} />

      {/* 11. Final CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#1F5C3A] to-[#144528] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <span className="text-base sm:text-lg font-marathi-calligraphy text-[#F6C343] block">
            {MARATHI_BRAND_LINE}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
            {CONTENT_KIT.ctaBand.headline[lang]}
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            {CONTENT_KIT.ctaBand.sub[lang]}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActivePortal('donor')}
              className="px-7 py-3.5 bg-[#F28C28] hover:bg-[#D97314] text-white font-bold text-sm rounded-pill btn-pill shadow-soft"
            >
              {CONTENT_KIT.ctaBand.btnDonate[lang]}
            </button>
            <button
              onClick={() => setActivePortal('orphanage')}
              className="px-7 py-3.5 bg-white text-[#1F5C3A] hover:bg-[#FFF6E8] font-bold text-sm rounded-pill btn-pill shadow-soft"
            >
              {CONTENT_KIT.ctaBand.btnJoin[lang]}
            </button>
          </div>

        </div>
      </section>

      {/* 12. Footer */}
      <Footer lang={lang} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        lang={lang}
      />

    </div>
  );
}
