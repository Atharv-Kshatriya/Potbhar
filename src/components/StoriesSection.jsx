import React, { useState } from 'react';
import { CONTENT_KIT } from '../lib/contentKit';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Heart
} from 'lucide-react';

export default function StoriesSection({ lang }) {
  const [selectedStory, setSelectedStory] = useState(0);
  const stories = CONTENT_KIT.stories;
  const current = stories[selectedStory];

  return (
    <section id="stories" className="py-20 bg-[#FFF6E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[#FFF0DE] border border-[#F28C28]/30 text-xs font-bold text-[#B85F00] mb-3.5 shadow-xs">
            <Heart className="w-4 h-4 text-[#F28C28]" />
            <span>{lang === 'mr' ? 'खऱ्या परिस्थितीतील बदल' : 'Real-World Transformations'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1F5C3A] leading-tight">
            {lang === 'mr' ? 'आधी आणि PotBhar सोबत' : 'Before → With PotBhar'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#735747]">
            {lang === 'mr' 
              ? 'केवळ तंत्रज्ञान नव्हे, तर अन्न वाचवून सन्मानाने योग्य व्यक्तीपर्यंत पोहोचवणारी जिवंत चळवळ.'
              : 'Illustrative composite stories of how immediate connectivity transforms despair into hope across Maharashtra.'}
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(idx)}
              className={`px-4 sm:px-5 py-2.5 rounded-pill text-xs sm:text-sm font-bold transition-all shadow-xs ${
                selectedStory === idx
                  ? 'bg-[#1F5C3A] text-white shadow-soft'
                  : 'bg-white text-[#4B2E1E] border border-[#E8DAC2] hover:border-[#F28C28]'
              }`}
            >
              {story.role[lang]}
            </button>
          ))}
        </div>

        {/* Story Card & Illustration */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-[#E8DAC2] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Community Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E8DAC2] shadow-sm bg-[#FFFBF5]">
            <img
              src="/images/community-serving.png"
              alt="Community Meal Serving"
              className="w-full h-72 sm:h-80 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/newARCH/community-serving.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-bold text-[#F6C343] uppercase tracking-wider">
                {current.role[lang]}
              </span>
              <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                {current.name}
              </h4>
              <p className="text-xs text-white/80 mt-1 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F6C343]" />
                {current.metric[lang]}
              </p>
            </div>
          </div>

          {/* Right: Before vs With PotBhar Comparison */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Before Card */}
            <div className="bg-[#FFF8F8] border border-[#F5C2C2] rounded-2xl p-5 transition-all">
              <div className="flex items-center gap-2 text-[#D64545] font-bold text-xs uppercase tracking-wider mb-2">
                <XCircle className="w-4 h-4" />
                <span>{lang === 'mr' ? 'आधी (पूर्वीची अडचण)' : 'Before (The Pain Point)'}</span>
              </div>
              <p className="text-sm sm:text-base text-[#4B2E1E] leading-relaxed">
                {current.before[lang]}
              </p>
            </div>

            {/* With PotBhar Card */}
            <div className="bg-[#EAF5EC] border border-[#A7D7AF] rounded-2xl p-5 shadow-xs transition-all">
              <div className="flex items-center gap-2 text-[#1F5C3A] font-bold text-xs uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#4E9A59]" />
                <span>{lang === 'mr' ? 'PotBhar सोबत (आजचे वास्तव)' : 'With PotBhar (The Solution)'}</span>
              </div>
              <p className="text-sm sm:text-base text-[#1F5C3A] font-semibold leading-relaxed">
                {current.withPotbhar[lang]}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

