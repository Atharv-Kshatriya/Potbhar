import React, { useEffect, useRef, useState } from 'react';
import { CONTENT_KIT, MARATHI_BRAND_LINE } from '../lib/contentKit';
import { 
  Globe2, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  UserCheck
} from 'lucide-react';

export default function Navbar({ lang, setLang, setActivePortal, openAuthModal, openHowItWorks, goHome, onSectionNavigate, isHowItWorksPage = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(isHowItWorksPage ? 'how-it-works' : 'home');
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const desktopNavRef = useRef(null);

  useEffect(() => {
    if (isHowItWorksPage) {
      setActiveSection('how-it-works');
      return undefined;
    }

    const sectionIds = ['home', 'how-it-works', 'freshguard-quality', 'impact', 'about-us', 'faq'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.15, 0.35, 0.6] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHowItWorksPage]);

  useEffect(() => {
    const nav = desktopNavRef.current;
    const activeItem = nav?.querySelector(`[data-nav-section="${activeSection}"]`);
    if (!nav || !activeItem) {
      setIndicator((current) => ({ ...current, width: 0 }));
      return undefined;
    }

    const update = () => setIndicator({ left: activeItem.offsetLeft, width: activeItem.offsetWidth });
    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(nav);
    return () => resizeObserver.disconnect();
  }, [activeSection, lang, isHowItWorksPage]);
  const sectionClick = (event, id) => {
    if (!onSectionNavigate) return;
    event.preventDefault();
    onSectionNavigate(id);
    setMobileMenuOpen(false);
  };



  return (
    <header className="sticky top-0 z-50 bg-[#FFF6E8]/90 backdrop-blur-md border-b border-[#E8DAC2]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Lockup */}
          <div 
            onClick={() => { setActivePortal(null); goHome?.(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-2xl bg-white p-1.5 shadow-sm border border-[#F28C28]/20 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <img 
                src="/brand/logo.png" 
                alt="PotBhar logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/newARCH/logo.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-[#1F5C3A] leading-tight">
                Pot<span className="text-[#F28C28]">Bhar</span>
              </span>
              <span className={`text-[10px] font-semibold tracking-wider text-[#B85F00] ${lang === 'mr' ? 'font-marathi-calligraphy normal-case text-sm' : 'uppercase font-sans'}`}>
                {lang === 'mr' ? MARATHI_BRAND_LINE : "Today's Surplus / Tonight's Meal"}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav ref={desktopNavRef} className="relative hidden lg:flex items-center gap-7 pb-2">
            <a data-nav-section="home" href="#home" onClick={(event) => sectionClick(event, 'home')} className={`text-sm font-semibold transition-colors ${activeSection === 'home' ? 'text-[#1F5C3A]' : 'text-[#4B2E1E] hover:text-[#1F5C3A]'}`}>
              {lang === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}
            </a>
            <button data-nav-section="how-it-works" type="button" onClick={openHowItWorks} className={`text-sm font-semibold transition-colors ${activeSection === 'how-it-works' ? 'text-[#1F5C3A]' : 'text-[#4B2E1E] hover:text-[#1F5C3A]'}`}>
              {CONTENT_KIT.nav.howItWorks[lang]}
            </button>
            <a data-nav-section="freshguard-quality" href="#freshguard-quality" onClick={(event) => sectionClick(event, 'freshguard-quality')} className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${activeSection === 'freshguard-quality' ? 'text-[#1F5C3A]' : 'text-[#4B2E1E] hover:text-[#1F5C3A]'}`}>
              <ShieldCheck className="w-4 h-4 text-[#1F5C3A]" />
              {CONTENT_KIT.nav.qualityCheck[lang]}
            </a>
            <a data-nav-section="impact" href="#impact" onClick={(event) => sectionClick(event, 'impact')} className={`text-sm font-semibold transition-colors ${activeSection === 'impact' ? 'text-[#1F5C3A]' : 'text-[#4B2E1E] hover:text-[#1F5C3A]'}`}>
              {CONTENT_KIT.nav.impact[lang]}
            </a>
            <a data-nav-section="about-us" href="#about-us" onClick={(event) => sectionClick(event, 'about-us')} className={`text-sm font-semibold transition-colors ${activeSection === 'about-us' ? 'text-[#1F5C3A]' : 'text-[#4B2E1E] hover:text-[#1F5C3A]'}`}>
              {CONTENT_KIT.nav.about[lang]}
            </a>
            <a data-nav-section="faq" href="#faq" onClick={(event) => sectionClick(event, 'faq')} className={`text-sm font-semibold transition-colors ${activeSection === 'faq' ? 'text-[#1F5C3A]' : 'text-[#4B2E1E] hover:text-[#1F5C3A]'}`}>
              {CONTENT_KIT.nav.faq[lang]}
            </a>
            <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-[3px] rounded-full bg-[#F28C28] transition-[transform,width] duration-300 ease-out" style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }} />
          </nav>

          {/* Language, sign-in, and donation actions */}
          <div className="hidden md:flex items-center gap-3.5">
            
            {/* Language Switcher EN / मराठी */}
            <div className="flex items-center bg-white/80 border border-[#E8DAC2] rounded-pill p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-pill transition-all ${
                  lang === 'en' 
                    ? 'bg-[#1F5C3A] text-white shadow-xs' 
                    : 'text-[#4B2E1E] hover:text-[#1F5C3A]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('mr')}
                className={`px-2.5 py-1 text-xs font-bold rounded-pill transition-all ${
                  lang === 'mr' 
                    ? 'bg-[#1F5C3A] text-white shadow-xs' 
                    : 'text-[#4B2E1E] hover:text-[#1F5C3A]'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Auth / Sign In Button */}
            <button
              onClick={() => openAuthModal()}
              className="px-4 py-2 text-xs font-bold text-[#1F5C3A] hover:bg-white/70 rounded-pill transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              {CONTENT_KIT.nav.signin[lang]}
            </button>

            {/* Donate Surplus Food (Primary Forest Green Pill) */}
            <button
              onClick={() => setActivePortal('donor')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#1F5C3A] hover:bg-[#16452B] btn-pill shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F6C343]" />
              <span>{CONTENT_KIT.nav.donateFood[lang]}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
              className="px-2.5 py-1 text-xs font-bold bg-white border border-[#E8DAC2] rounded-pill text-[#1F5C3A]"
            >
              {lang === 'en' ? 'मराठी' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#4B2E1E] hover:bg-white/80 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF6E8] border-b border-[#E8DAC2] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#E8DAC2]">
            <a href="#home" onClick={(event) => sectionClick(event, 'home')} className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]">
              {lang === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}
            </a>
            <button type="button"
              onClick={() => { setMobileMenuOpen(false); openHowItWorks?.(); }}
              className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]"
            >
              {CONTENT_KIT.nav.howItWorks[lang]}
            </button>
            <a 
              href="#freshguard-quality" 
              onClick={(event) => sectionClick(event, 'freshguard-quality')}
              className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]"
            >
              {CONTENT_KIT.nav.qualityCheck[lang]}
            </a>
            <a href="#impact" onClick={(event) => sectionClick(event, 'impact')} className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]">
              {CONTENT_KIT.nav.impact[lang]}
            </a>
            <a href="#about-us" onClick={(event) => sectionClick(event, 'about-us')} className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]">
              {CONTENT_KIT.nav.about[lang]}
            </a>
            <a href="#faq" onClick={(event) => sectionClick(event, 'faq')} className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]">
              {CONTENT_KIT.nav.faq[lang]}
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); setActivePortal('donor'); }}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#1F5C3A] rounded-pill shadow-xs text-center"
            >
              {CONTENT_KIT.nav.donateFood[lang]}
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
              className="w-full py-2 text-xs font-bold text-[#4B2E1E] bg-white border border-[#E8DAC2] rounded-pill text-center"
            >
              {CONTENT_KIT.nav.signin[lang]}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
