import React, { useState } from 'react';
import { CONTENT_KIT } from '../lib/contentKit';
import { 
  Globe2, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  UserCheck
} from 'lucide-react';

export default function Navbar({ lang, setLang, activePortal, setActivePortal, openAuthModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  // Dedicated separate portals for each stakeholder
  const portalsList = [
    { id: 'donor', nameEn: 'Donor Portal', nameMr: 'दाता पोर्टल', accent: '#F28C28', icon: '🍲' },
    { id: 'orphanage', nameEn: 'Orphanage Portal', nameMr: 'अनाथाश्रम पोर्टल', accent: '#F6C343', icon: '👶' },
    { id: 'shelter', nameEn: 'Shelter Portal', nameMr: 'निवारा केंद्र पोर्टल', accent: '#2BA6A0', icon: '🏠' },
    { id: 'gaushala', nameEn: 'Gaushala Portal (Animal Feed)', nameMr: 'गोशाळा पोर्टल (चारा)', accent: '#4E9A59', icon: '🐄' },
    { id: 'compost', nameEn: 'Bio-Compost Portal (Soil Return)', nameMr: 'खत केंद्र पोर्टल (सेंद्रिय खत)', accent: '#8A5A3B', icon: '🌱' },
    { id: 'volunteer', nameEn: 'Rider Logistics & Live Map', nameMr: 'रायडर व वाहतूक पोर्टल', accent: '#4FA3E0', icon: '🚴' },
    { id: 'admin', nameEn: 'Admin Command', nameMr: 'प्रशासन पोर्टल', accent: '#4B5BD7', icon: '🛡️' },
  ];

  const handlePortalSelect = (portalId) => {
    setActivePortal(portalId);
    setPortalDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF6E8]/90 backdrop-blur-md border-b border-[#E8DAC2]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Lockup */}
          <div 
            onClick={() => { setActivePortal(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
              <span className="text-[10px] font-semibold tracking-wider text-[#B85F00] uppercase font-sans">
                {lang === 'mr' ? 'हर पेट भरे • हर निवाला संभाले' : 'Today’s Surplus • Tonight’s Meal'}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#about-us" className="text-sm font-semibold text-[#4B2E1E] hover:text-[#1F5C3A] transition-colors">
              {CONTENT_KIT.nav.about[lang]}
            </a>
            <a href="#how-it-works" className="text-sm font-semibold text-[#4B2E1E] hover:text-[#1F5C3A] transition-colors">
              {CONTENT_KIT.nav.howItWorks[lang]}
            </a>
            <a href="#freshguard-quality" className="text-sm font-semibold text-[#4B2E1E] hover:text-[#1F5C3A] transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1F5C3A]" />
              {CONTENT_KIT.nav.qualityCheck[lang]}
            </a>
            <a href="#portals-showcase" className="text-sm font-semibold text-[#4B2E1E] hover:text-[#1F5C3A] transition-colors">
              {CONTENT_KIT.nav.portals[lang]}
            </a>
            <a href="#impact" className="text-sm font-semibold text-[#4B2E1E] hover:text-[#1F5C3A] transition-colors">
              {CONTENT_KIT.nav.impact[lang]}
            </a>
            <a href="#faq" className="text-sm font-semibold text-[#4B2E1E] hover:text-[#1F5C3A] transition-colors">
              {CONTENT_KIT.nav.faq[lang]}
            </a>
          </nav>

          {/* Action Tools: Language Switcher, Dedicated Portal Dropdown & Donate Button */}
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

            {/* Portal Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#4B2E1E] bg-white border border-[#E8DAC2] rounded-pill hover:border-[#F28C28] transition-all shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#F28C28]"></span>
                <span>{activePortal ? portalsList.find(p => p.id === activePortal)?.[lang === 'mr' ? 'nameMr' : 'nameEn'] : (lang === 'mr' ? 'पोर्टल निवडा' : 'Portals Workspace')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#735747]" />
              </button>

              {portalDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-soft-lg border border-[#E8DAC2] py-2 z-50">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-[#735747] uppercase tracking-wider border-b border-gray-100 mb-1">
                    {lang === 'mr' ? 'स्वतंत्र कार्यक्षेत्र पोर्टल्स' : 'Dedicated Workspaces'}
                  </div>
                  <button
                    onClick={() => handlePortalSelect(null)}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#1F5C3A] hover:bg-[#FFF6E8] flex items-center justify-between"
                  >
                    <span>🏠 {lang === 'mr' ? 'मुख्य लँडिंग पृष्ठ' : 'Public Landing Page'}</span>
                    {!activePortal && <span className="text-[10px] text-[#1F5C3A] font-bold">Active</span>}
                  </button>
                  {portalsList.map((portal) => (
                    <button
                      key={portal.id}
                      onClick={() => handlePortalSelect(portal.id)}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-[#FFF6E8] flex items-center justify-between transition-colors ${
                        activePortal === portal.id ? 'bg-[#FFF0DE] text-[#B85F00] font-bold' : 'text-[#4B2E1E]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{portal.icon}</span>
                        <span>{lang === 'mr' ? portal.nameMr : portal.nameEn}</span>
                      </span>
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: portal.accent }}
                      />
                    </button>
                  ))}
                </div>
              )}
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
              onClick={() => handlePortalSelect('donor')}
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
            <a 
              href="#about-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]"
            >
              {CONTENT_KIT.nav.about[lang]}
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]"
            >
              {CONTENT_KIT.nav.howItWorks[lang]}
            </a>
            <a 
              href="#freshguard-quality" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]"
            >
              {CONTENT_KIT.nav.qualityCheck[lang]}
            </a>
            <a 
              href="#portals-showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold py-2 px-3 rounded-lg bg-white/70 text-[#4B2E1E]"
            >
              {CONTENT_KIT.nav.portals[lang]}
            </a>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-[#735747] uppercase tracking-wider px-1">
              {lang === 'mr' ? 'स्वतंत्र पोर्टल्स' : 'Dedicated Portals'}
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {portalsList.map((portal) => (
                <button
                  key={portal.id}
                  onClick={() => handlePortalSelect(portal.id)}
                  className="text-left px-3 py-2 text-xs font-bold rounded-xl bg-white border border-[#E8DAC2] flex items-center gap-1.5"
                >
                  <span>{portal.icon}</span>
                  <span className="truncate">{lang === 'mr' ? portal.nameMr : portal.nameEn}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); handlePortalSelect('donor'); }}
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
