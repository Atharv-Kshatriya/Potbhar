import React from 'react';
import { ArrowLeft, Leaf, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function GaushalaPortal({ lang, user, onBackToLanding }) {
  const animalFeedOffers = [
    {
      id: 'ANM-301',
      title: 'Surplus Plain Rotis & Boiled Dal (No Onion/Garlic/Chili)',
      donor: 'Maharashtrian Wedding Hall, Pune',
      quantityKg: 50,
      safetyCheck: '100% Cattle Safe',
      distanceKm: 4.5,
      postedAgo: '45m ago'
    },
    {
      id: 'ANM-302',
      title: 'Fresh Vegetable Trimmings, Cabbage & Watermelon Rinds',
      donor: 'Market Yard Wholesale Vegetable Vendor',
      quantityKg: 120,
      safetyCheck: 'Raw Produce / Clean Greens',
      distanceKm: 6.2,
      postedAgo: '1h ago'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#4B2E1E] pb-24" data-portal="gaushala">
      <div className="bg-white border-b-2 border-[#4E9A59] px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBackToLanding} className="p-1.5 rounded-lg hover:bg-[#FFF6E8] text-[#735747]">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#EAF5EC] border border-[#4E9A59]/40 flex items-center justify-center text-lg">
              🐄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg sm:text-xl text-[#1F5C3A]">
                  {lang === 'mr' ? 'गोशाळा पोर्टल' : 'Gaushala Workspace'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF5EC] text-[#4E9A59]">
                  Tier 2 Animal Feed
                </span>
              </div>
              <p className="text-xs text-[#735747]">
                {user?.orgName || 'Alandi Sri Krishna Gaushala (140 Desi Cows)'}
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold bg-[#EAF5EC] px-3 py-1.5 rounded-pill text-[#4E9A59]">
            ✓ {lang === 'mr' ? 'कांदा, लसूण व मांसाहार आपोआप गाळला जातो' : 'Strict Cattle-Safe Diet Filter Active'}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        
        {/* Gaushala Feed Rules Banner (§6.2) */}
        <div className="bg-[#EAF5EC] border border-[#4E9A59]/40 rounded-2xl p-4 flex items-center gap-3">
          <Leaf className="w-5 h-5 text-[#4E9A59] shrink-0" />
          <p className="text-xs text-[#1F5C3A] leading-relaxed">
            {lang === 'mr' 
              ? 'गोशाळेसाठी फक्त साधे धान्य, न खारवलेल्या पोळ्या, ताजी फळे व पालेभाज्याच पाठवल्या जातात. तेलकट, तिखट, कांदा-लसूण किंवा बुरशीयुक्त अन्न थेट खताकडे वळवले जाते.'
              : 'Tier 2 Animal Safety: Only plain rotis, unspiced grains, and clean fruit/vegetable peelings are routed here. All spicy, oily, or spoiled items are diverted to Compost.'}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
            {lang === 'mr' ? 'जनावरांसाठी उपलब्ध सुरक्षित चारा व अन्न' : 'Incoming Animal-Safe Feed Listings'}
          </h2>

          <div className="space-y-3">
            {animalFeedOffers.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-6 border border-[#E8DAC2] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-gray-100 rounded">{item.id}</span>
                    <span className="text-xs font-bold text-[#4E9A59] bg-[#EAF5EC] px-2 py-0.5 rounded-pill">
                      ✓ {item.safetyCheck}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1F5C3A]">{item.title}</h3>
                  <p className="text-xs text-[#735747] font-semibold mt-1">
                    🏢 {item.donor} • ⚖️ {item.quantityKg} kg • 📍 {item.distanceKm} km away • {item.postedAgo}
                  </p>
                </div>

                <button
                  onClick={() => alert(lang === 'mr' ? 'गोशाळा चारा पिकअप मंजूर केला!' : 'Animal feed delivery accepted!')}
                  className="px-5 py-2.5 bg-[#4E9A59] text-white text-xs font-bold rounded-pill hover:bg-[#3d7a46] btn-pill shadow-xs"
                >
                  {lang === 'mr' ? 'गोशाळेसाठी स्वीकारा' : 'Accept for Gaushala'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

