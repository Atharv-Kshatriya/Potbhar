import React, { useState } from 'react';
import { CONTENT_KIT } from '../lib/contentKit';
import { 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles, 
  ChevronRight,
  Layers
} from 'lucide-react';

export default function PortalsShowcase({ lang, onSelectPortal }) {
  const [activeTab, setActiveTab] = useState('donor');
  const portals = CONTENT_KIT.portals.items;
  const currentPortal = portals.find(p => p.id === activeTab) || portals[0];

  return (
    <section id="portals-showcase" className="py-20 bg-gradient-to-b from-[#FFF6E8] to-[#FFF0DE]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[#EBF5FC] border border-[#4FA3E0]/30 text-xs font-bold text-[#3582BC] mb-3.5 shadow-xs">
            <Layers className="w-4 h-4 text-[#4FA3E0]" />
            <span>{lang === 'mr' ? 'विशिष्ट गरजेनुसार स्वतंत्र कार्यक्षेत्र' : 'Purpose-Built Workspaces'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1F5C3A] leading-tight">
            {CONTENT_KIT.portals.title[lang]}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#735747]">
            {CONTENT_KIT.portals.subtitle[lang]}
          </p>
        </div>

        {/* Portals Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {portals.map((portal) => {
            const isSelected = activeTab === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => setActiveTab(portal.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-pill text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                  isSelected
                    ? 'text-white shadow-soft scale-105'
                    : 'bg-white text-[#4B2E1E] border border-[#E8DAC2] hover:border-[#F28C28]'
                }`}
                style={{
                  backgroundColor: isSelected ? portal.accent : undefined
                }}
              >
                <span>{portal.title[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Portal Showcase Card */}
        <div 
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft-lg border-2 transition-all duration-300"
          style={{ borderColor: currentPortal.accent }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Role Details & Actions */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex flex-wrap items-center gap-3">
                <span 
                  className="px-3 py-1 rounded-pill text-xs font-bold"
                  style={{ backgroundColor: currentPortal.accentBg, color: currentPortal.accent }}
                >
                  {currentPortal.badge[lang]}
                </span>
                <span className="text-xs font-semibold text-[#735747]">
                  {currentPortal.roleName[lang]}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1F5C3A]">
                {currentPortal.title[lang]}
              </h3>

              <p className="text-sm sm:text-base text-[#4B2E1E] leading-relaxed">
                {currentPortal.desc[lang]}
              </p>

              {/* Action Features */}
              <div>
                <h4 className="text-xs font-bold text-[#735747] uppercase tracking-wider mb-3">
                  {lang === 'mr' ? 'मुख्य कार्यप्रवाह व वैशिष्ट्ये:' : 'Key Dedicated Capabilities:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPortal.actions.map((act, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFBF5] border border-[#E8DAC2]/80 text-xs font-semibold text-[#4B2E1E]">
                      <CheckCircle className="w-4 h-4 text-[#4E9A59] shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch Portal Button */}
              <div className="pt-3">
                <button
                  onClick={() => onSelectPortal(currentPortal.id)}
                  className="px-6 py-3 rounded-pill text-sm font-bold text-white shadow-sm flex items-center gap-2 btn-pill"
                  style={{ backgroundColor: currentPortal.accent }}
                >
                  <span>{lang === 'mr' ? `${currentPortal.title.mr} उघडा` : `Launch ${currentPortal.title.en}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Column: Mini Interactive UI Preview */}
            <div className="lg:col-span-5 bg-[#FFFBF5] rounded-2xl p-5 border border-[#E8DAC2] shadow-inner space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DAC2]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentPortal.accent }} />
                  <span className="text-xs font-bold text-[#4B2E1E] font-mono">
                    /app/{currentPortal.id}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#1F5C3A] border border-[#E8DAC2]">
                  Live Preview
                </span>
              </div>

              {/* Mock Dashboard Snippet */}
              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#E8DAC2] shadow-xs">
                  <div className="flex justify-between items-center text-xs font-bold text-[#4B2E1E] mb-1">
                    <span>{lang === 'mr' ? 'सक्रिय कार्य / नोंदी' : 'Active Items Queue'}</span>
                    <span className="text-xs font-mono text-[#F28C28]">4 Active</span>
                  </div>
                  <div className="w-full bg-[#E8DAC2] h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '75%', backgroundColor: currentPortal.accent }}></div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8DAC2] shadow-xs flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#4B2E1E]">
                    <span className="font-bold block text-sm">340 kg</span>
                    <span className="text-[11px] text-[#735747]">{lang === 'mr' ? 'या महिन्यातील सुरक्षित अन्न' : 'Recovered This Month'}</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: currentPortal.accentBg, color: currentPortal.accent }}>
                    ✓
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8DAC2] shadow-xs">
                  <div className="text-xs font-bold text-[#1F5C3A] flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#4E9A59]" />
                    <span>{lang === 'mr' ? 'सत्यापित डिजिटल साखळी' : 'Verified Chain of Custody'}</span>
                  </div>
                  <p className="text-[11px] text-[#735747]">
                    {lang === 'mr' ? 'प्रत्येक पाऊल QR/OTP आणि वेळेच्या नोंदीने संरक्षित आहे.' : 'Every action recorded with timestamp & receiver digital signature.'}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

