import React, { useState, useMemo } from 'react';
import { 
  assessFoodFreshness, 
  FOOD_CATEGORIES, 
  STORAGE_TYPES 
} from '../lib/freshguard';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Thermometer, 
  Activity, 
  Sparkles,
  Info,
  ChevronRight,
  Flame,
  Layers,
  Leaf
} from 'lucide-react';

export default function FreshGuardSection({ lang }) {
  // Simulator State
  const [category, setCategory] = useState('cooked_veg');
  const [storage, setStorage] = useState('ambient');
  const [preparedHoursAgo, setPreparedHoursAgo] = useState(1.5);
  const [smell, setSmell] = useState('normal');
  const [moldOrSlime, setMoldOrSlime] = useState(false);
  const [textureChanged, setTextureChanged] = useState(false);
  const [packaging, setPackaging] = useState('sealed');
  const [plateLeftover, setPlateLeftover] = useState(false);
  const [containsNonVeg, setContainsNonVeg] = useState(false);
  const [containsOnionGarlic, setContainsOnionGarlic] = useState(false);

  // Run assessment
  const assessment = useMemo(() => {
    return assessFoodFreshness({
      category,
      storage,
      preparedHoursAgo,
      smell,
      moldOrSlime,
      textureChanged,
      packaging,
      plateLeftover,
      containsNonVeg,
      containsOnionGarlic,
    });
  }, [category, storage, preparedHoursAgo, smell, moldOrSlime, textureChanged, packaging, plateLeftover, containsNonVeg, containsOnionGarlic]);

  // Needle rotation: 0 (safe) -> -65deg, 50 (moderate) -> 0deg, 100 (high) -> +65deg
  const needleRotation = -65 + (assessment.riskScore / 100) * 130;

  return (
    <section id="freshguard-quality" className="py-20 bg-[#FFF6E8] relative overflow-hidden border-t border-[#E8DAC2]">
      
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#F28C28_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[#E6F4EA] border border-[#4E9A59]/30 text-xs font-bold text-[#1F5C3A] mb-3.5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#4E9A59]" />
            <span>{lang === 'mr' ? 'अन्न गुणवत्ता व प्राधान्य निकष' : 'Food Freshness & Priority Parameters'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1F5C3A] leading-tight">
            {lang === 'mr' ? 'अन्न गुणवत्ता तपासणी' : 'Quality Assessment & Priority Rules'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#735747] font-sans">
            {lang === 'mr' 
              ? 'अन्नाचा प्रकार, शिजवल्यापासून झालेला वेळ आणि साठवणूक पद्धतीनुसार प्रणाली सर्वोत्तम पर्याय सुचवते: आधी अनाथाश्रम/निवारा, नंतर गोशाळा किंवा सेंद्रिय खत.'
              : 'Clear, rule-based food safety: evaluates cooking time, storage temperature, and hygiene indicators to prioritize safe routing to human shelters, gaushalas, or bio-compost.'}
          </p>
        </div>

        {/* 2-Column Showcase: Parameter Inputs & Priority Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Input Controls */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-[#E8DAC2]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0DE] text-[#B85F00] flex items-center justify-center font-bold">
                  ⚖️
                </div>
                <h3 className="font-display font-bold text-lg text-[#1F5C3A]">
                  {lang === 'mr' ? 'तपासणी सिम्युलेटर' : 'Parameter Assessment Test'}
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-pill bg-[#E6F4EA] text-[#1F5C3A]">
                Safe-Time Rules
              </span>
            </div>

            <div className="space-y-4 text-xs font-semibold text-[#4B2E1E]">
              
              {/* Category */}
              <div>
                <label className="block mb-1.5 text-[11px] font-bold text-[#735747] uppercase tracking-wider">
                  {lang === 'mr' ? 'अन्नाचा प्रकार' : 'Food Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3 py-2.5 text-xs text-[#4B2E1E] focus:outline-none focus:border-[#F28C28]"
                >
                  {FOOD_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {lang === 'mr' ? cat.labelMr : cat.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Storage */}
              <div>
                <label className="block mb-1.5 text-[11px] font-bold text-[#735747] uppercase tracking-wider">
                  {lang === 'mr' ? 'साठवणुकीची पद्धत' : 'Storage Temperature'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {STORAGE_TYPES.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStorage(st.id)}
                      className={`px-2 py-2 text-[11px] font-bold rounded-xl border text-center transition-all ${
                        storage === st.id 
                          ? 'bg-[#1F5C3A] text-white border-[#1F5C3A] shadow-xs' 
                          : 'bg-[#FFFBF5] text-[#735747] border-[#E8DAC2] hover:border-[#F28C28]'
                      }`}
                    >
                      {st.id === 'ambient' ? '🌡️ Room' : st.id === 'hot_held' ? '🔥 Hot ≥60°' : '❄️ Chilled'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Elapsed Hours Slider */}
              <div className="bg-[#FFFBF5] p-3 rounded-2xl border border-[#E8DAC2]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-bold text-[#735747] uppercase tracking-wider">
                    {lang === 'mr' ? 'शिजवल्यापासून झालेला वेळ' : 'Time Elapsed Since Cooking'}
                  </span>
                  <span className="text-xs font-bold text-[#B85F00] bg-[#FFF0DE] px-2 py-0.5 rounded-md">
                    {preparedHoursAgo} {lang === 'mr' ? 'तास' : 'hrs'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={preparedHoursAgo}
                  onChange={(e) => setPreparedHoursAgo(parseFloat(e.target.value))}
                  className="w-full accent-[#F28C28] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A38979] mt-1 font-mono">
                  <span>30 min</span>
                  <span>4 hrs (Human limit)</span>
                  <span>12 hrs</span>
                </div>
              </div>

              {/* Hygiene Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSmell(smell === 'normal' ? 'off' : 'normal')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    smell === 'off' ? 'bg-[#FCEBEB] border-[#D64545] text-[#D64545]' : 'bg-[#FFFBF5] border-[#E8DAC2] text-[#4B2E1E]'
                  }`}
                >
                  <span className="text-xs font-bold">{lang === 'mr' ? 'वास आंबट आहे?' : 'Sour / Off Smell'}</span>
                  <span className="text-xs">{smell === 'off' ? '⚠️ Yes' : '✓ Fresh'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMoldOrSlime(!moldOrSlime)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    moldOrSlime ? 'bg-[#FCEBEB] border-[#D64545] text-[#D64545]' : 'bg-[#FFFBF5] border-[#E8DAC2] text-[#4B2E1E]'
                  }`}
                >
                  <span className="text-xs font-bold">{lang === 'mr' ? 'बुरशी/चिकटपणा' : 'Mold or Slime'}</span>
                  <span className="text-xs">{moldOrSlime ? '❌ Present' : '✓ None'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackaging(packaging === 'sealed' ? 'bulging' : 'sealed')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    packaging === 'bulging' ? 'bg-[#FCEBEB] border-[#D64545] text-[#D64545]' : 'bg-[#FFFBF5] border-[#E8DAC2] text-[#4B2E1E]'
                  }`}
                >
                  <span className="text-xs font-bold">{lang === 'mr' ? 'फुगलेले पॅकेट' : 'Bulging Packet'}</span>
                  <span className="text-xs">{packaging === 'bulging' ? '⚠️ Bulging' : '✓ Normal'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlateLeftover(!plateLeftover)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    plateLeftover ? 'bg-[#FCEBEB] border-[#D64545] text-[#D64545]' : 'bg-[#FFFBF5] border-[#E8DAC2] text-[#4B2E1E]'
                  }`}
                >
                  <span className="text-xs font-bold">{lang === 'mr' ? 'ताटातील उरलेले' : 'Plate Leftover'}</span>
                  <span className="text-xs">{plateLeftover ? '❌ Yes' : '✓ Unserved'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Priority Routing Output & Recipient Guard */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean Priority Display Card (No Radar Animation) */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1F5C3A] to-[#123E25] text-white p-6 sm:p-8 shadow-soft-lg border border-[#4E9A59]/30">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F6C343]/20 border border-[#F6C343]/40 flex items-center justify-center text-[#F6C343]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                      SafeGuard AI
                    </h4>
                    <p className="text-xs text-white/70">
                      {lang === 'mr' ? 'निकष तपासून ठरवलेला योग्य मार्ग' : 'Dynamic priority routing based on condition'}
                    </p>
                  </div>
                </div>

                {/* Priority Badge */}
                <div 
                  className="px-3.5 py-1.5 rounded-pill text-xs font-bold shadow-xs flex items-center gap-1.5"
                  style={{ 
                    backgroundColor: assessment.tier === 'human' ? '#E6F4EA' : assessment.tier === 'animal' ? '#FEF6D9' : '#FCEBEB',
                    color: assessment.tier === 'human' ? '#1F5C3A' : assessment.tier === 'animal' ? '#B85F00' : '#D64545'
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: assessment.color }} />
                  <span>{lang === 'mr' ? assessment.tierLabelMr : assessment.tierLabelEn}</span>
                </div>
              </div>

              {/* Gauge & Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6 items-center">
                
                {/* Visual Risk Gauge Meter (clean, static needle) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10">
                  <div className="relative w-40 h-20 overflow-hidden">
                    <div className="w-40 h-40 rounded-full border-[12px] border-[#3A7743] border-b-transparent border-l-[#4E9A59] border-t-[#F6C343] border-r-[#D64545] transform -rotate-45"></div>
                    <div 
                      className="absolute bottom-0 left-1/2 w-1.5 h-16 bg-white rounded-full gauge-needle shadow-md"
                      style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-[#F28C28] -mt-1 -ml-1 border-2 border-white shadow-xs"></div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold font-mono text-[#F6C343]">
                      {assessment.riskScore}
                    </span>
                    <span className="text-xs text-white/60 ml-1">/ 100 Index</span>
                    <div className="text-xs font-bold mt-0.5 text-white/90">
                      {lang === 'mr' ? assessment.riskLevelMr : assessment.riskLevelEn}
                    </div>
                  </div>
                </div>

                {/* Safe Time Remaining & Recommended Destination */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-5 h-5 text-[#F6C343]" />
                      <div>
                        <div className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">
                          {lang === 'mr' ? 'उरलेला सुरक्षित वेळ' : 'Safe Consumption Window'}
                        </div>
                        <div className="text-sm font-bold text-white font-mono">
                          {assessment.timeLeftMinutes > 0 
                            ? `${Math.floor(assessment.timeLeftMinutes / 60)}h ${assessment.timeLeftMinutes % 60}m remaining`
                            : (lang === 'mr' ? 'वेळ संपली (Expired)' : 'Window Expired')}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-black/20 text-[#F6C343] font-bold">
                      Max {assessment.safeWindowHours}h
                    </span>
                  </div>

                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                    <div className="text-[11px] text-white/70 uppercase tracking-wider font-semibold mb-1">
                      {lang === 'mr' ? 'शिफारस केलेले गंतव्य ठिकाण:' : 'Top Priority Route:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {assessment.tier === 'human' && (
                        <span className="px-3 py-1 rounded-lg bg-[#E6F4EA] text-[#1F5C3A] text-xs font-bold flex items-center gap-1.5">
                          👶 {lang === 'mr' ? 'प्राधान्य १: अनाथाश्रम व निवारा केंद्र' : 'Priority 1: Orphanages & Shelters'}
                        </span>
                      )}
                      {assessment.tier === 'animal' && (
                        <span className="px-3 py-1 rounded-lg bg-[#FEF6D9] text-[#B85F00] text-xs font-bold flex items-center gap-1.5">
                          🐄 {lang === 'mr' ? 'प्राधान्य २: गोशाळा चारा' : 'Priority 2: Gaushala Cattle Feed'}
                        </span>
                      )}
                      {assessment.tier === 'compost' && (
                        <span className="px-3 py-1 rounded-lg bg-[#F6EFEA] text-[#8A5A3B] text-xs font-bold flex items-center gap-1.5">
                          🌱 {lang === 'mr' ? 'प्राधान्य ३: सेंद्रिय खत निर्मिती' : 'Priority 3: Bio-Compost Soil Return'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Assessment Reasons */}
              <div className="bg-black/20 rounded-2xl p-4 border border-white/10">
                <div className="text-xs font-bold text-[#F6C343] flex items-center gap-1.5 mb-2">
                  <Info className="w-3.5 h-3.5" />
                  <span>{lang === 'mr' ? 'मूल्यांकनाची कारणे:' : 'Evaluation Rationale:'}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/90">
                  {(lang === 'mr' ? assessment.reasonsMr : assessment.reasonsEn).map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F6C343] mt-0.5">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Recipient Check Guarantee Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#E8DAC2] flex flex-col sm:flex-row items-center gap-5 shadow-sm">
              <div className="w-28 h-28 shrink-0 rounded-2xl bg-[#FFF6E8] p-2 flex items-center justify-center overflow-hidden border border-[#F28C28]/20">
                <img 
                  src="/images/freshguard-stall.png" 
                  alt="On-Site Quality Check" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/newARCH/freshguard-stall.png';
                  }}
                />
              </div>
              <div>
                <h5 className="font-display font-bold text-base text-[#1F5C3A]">
                  {lang === 'mr' ? 'स्वीकारणाऱ्या संस्थेची प्रत्यक्ष तपासणी' : 'Mandatory Recipient Freshness Gate'}
                </h5>
                <p className="text-xs text-[#735747] mt-1 leading-relaxed">
                  {lang === 'mr' 
                    ? 'अन्न पोहोचल्यावर संस्था प्रत्यक्ष वास, स्वरूप व तापमान तपासते. अन्न खाण्यायोग्य असल्यास स्वीकारून दात्याला आभार कळवले जातात; योग्य नसल्यास तात्काळ खताकडे वळवले जाते व दात्याला तसे कळवले जाते.'
                    : 'The recipient on-site inspection is the final safeguard. If eatable, it is accepted and the donor is thanked. If not eatable, it is immediately redirected to compost and the donor is notified.'}
                </p>
                <div className="flex items-center gap-4 mt-2 text-[11px] font-bold text-[#1F5C3A]">
                  <span className="flex items-center gap-1">✓ {lang === 'mr' ? 'वास व स्वरूप तपासणी' : 'Sensory Check'}</span>
                  <span className="flex items-center gap-1">✓ {lang === 'mr' ? 'नाकारल्यास खताकडे वळवणे' : 'Reroute to Compost if Denied'}</span>
                  <span className="flex items-center gap-1">✓ {lang === 'mr' ? 'दात्याला थेट सूचना' : 'Donor Instant Notification'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
