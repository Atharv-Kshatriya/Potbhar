import React, { useState } from 'react';
import { CONTENT_KIT } from '../lib/contentKit';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export default function FaqSection({ lang }) {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = CONTENT_KIT.faqs;

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-[#FFF6E8] to-[#FFF0DE]/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[#FFF0DE] border border-[#F28C28]/30 text-xs font-bold text-[#B85F00] mb-3.5 shadow-xs">
            <HelpCircle className="w-4 h-4 text-[#F28C28]" />
            <span>{lang === 'mr' ? 'शंकांचे समाधान' : 'Got Questions?'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1F5C3A] leading-tight">
            {lang === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न' : 'Frequently Asked Questions'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#735747]">
            {lang === 'mr' 
              ? 'सुरक्षा, कायदेशीर जबाबदारी आणि PotBhar च्या कामकाजासंबंधी महत्त्वाची माहिती.'
              : 'Everything you need to know about food safety, legal responsibilities, and how PotBhar operates.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-[#F28C28]/50 shadow-soft' : 'border-[#E8DAC2] hover:border-[#F28C28]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#1F5C3A]">
                    {faq.q[lang]}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#FFF0DE] text-[#B85F00] transform rotate-180' : 'bg-[#FFFBF5] text-[#735747]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#4B2E1E] leading-relaxed border-t border-[#F0E6D8]/60">
                    <p>{faq.a[lang]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

