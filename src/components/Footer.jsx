import React from 'react';
import { CONTENT_KIT, MARATHI_BRAND_LINE } from '../lib/contentKit';
import { ShieldCheck, MapPin, Mail } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="bg-[#16452B] text-white pt-16 pb-12 border-t border-[#1F5C3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md">
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
              <div>
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  Pot<span className="text-[#F6C343]">Bhar</span>
                </span>
                <span className={`block text-xs font-semibold text-[#F6C343]/90 ${lang === 'mr' ? 'font-marathi-calligraphy text-base' : ''}`}>
                  {lang === 'mr' ? MARATHI_BRAND_LINE : "Today's Surplus, Tonight's Meal"}
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              {CONTENT_KIT.footer?.desc?.[lang] || 'PotBhar surplus food recovery platform.'}
            </p>

            <div className="pt-2 text-xs text-white/70 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F6C343]" />
                <span>Pune & Mumbai Metropolitan Operations, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F6C343]" />
                <span>support@potbhar.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#F6C343] uppercase tracking-wider mb-4">
              {lang === 'mr' ? 'महत्त्वाचे दुवे' : 'Platform'}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><a href="#about-us" className="hover:text-white transition-colors">{CONTENT_KIT.nav?.about?.[lang] || 'About Us'}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{CONTENT_KIT.nav?.howItWorks?.[lang] || 'How it works'}</a></li>
              <li><a href="#freshguard-quality" className="hover:text-white transition-colors">{CONTENT_KIT.nav?.qualityCheck?.[lang] || 'Food Quality'}</a></li>
              <li><a href="#stories" className="hover:text-white transition-colors">{CONTENT_KIT.nav?.story?.[lang] || 'Stories'}</a></li>
              <li><a href="#impact" className="hover:text-white transition-colors">{CONTENT_KIT.nav?.impact?.[lang] || 'Impact'}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{CONTENT_KIT.nav?.faq?.[lang] || 'FAQ'}</a></li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-xs font-bold text-[#F6C343] uppercase tracking-wider mb-4">
              {lang === 'mr' ? 'सुरक्षा व नियम' : 'Compliance'}
            </h4>
            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F6C343]">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'mr' ? 'FSSAI मार्गदर्शक तत्त्वे' : 'Safety Guidance'}</span>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed">
                {CONTENT_KIT.footer?.guidance?.[lang] || 'Designed around surplus food recovery and safety.'}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            {lang === 'mr' ? `${MARATHI_BRAND_LINE} - PotBhar 2026` : 'Copyright 2026 PotBhar. All rights reserved.'}
          </div>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Food Safety Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
