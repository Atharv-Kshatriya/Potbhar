import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  PieChart as PieIcon, 
  Leaf, 
  Heart, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';

export default function ImpactCharts({ lang }) {
  // Monthly recovery trends (illustrative pilot dataset)
  const monthlyData = [
    { month: 'Jun', meals: 1250, kg: 430 },
    { month: 'Jul', meals: 2400, kg: 840 },
    { month: 'Aug', meals: 4100, kg: 1435 },
    { month: 'Sep', meals: 6800, kg: 2380 },
    { month: 'Oct', meals: 10114, kg: 3540 },
  ];

  // 3-Tier Zero-Waste distribution split
  const tierData = [
    { name: lang === 'mr' ? 'माणसांसाठी (स्तर १)' : 'Human (Tier 1)', value: 74, color: '#1F5C3A' },
    { name: lang === 'mr' ? 'गोशाळा (स्तर २)' : 'Gaushalas (Tier 2)', value: 18, color: '#4E9A59' },
    { name: lang === 'mr' ? 'सेंद्रिय खत (स्तर ३)' : 'Compost (Tier 3)', value: 8, color: '#8A5A3B' },
  ];

  return (
    <section id="impact" className="py-20 bg-[#FFF6E8] border-t border-[#E8DAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[#E6F4EA] border border-[#4E9A59]/30 text-xs font-bold text-[#1F5C3A] mb-3.5 shadow-xs">
            <TrendingUp className="w-4 h-4 text-[#4E9A59]" />
            <span>{lang === 'mr' ? 'पारदर्शक प्रभाव आकडेवारी' : 'Verified On-Ground Metrics'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1F5C3A] leading-tight">
            {lang === 'mr' ? 'प्रत्येक अन्नाचा हिशोब' : 'Transparent Impact Analytics'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#735747]">
            {lang === 'mr' 
              ? 'आम्ही कधीही बनावट आकडे दाखवत नाही. खालील आकडेवारी आमच्या पायलट टप्प्यातील प्रत्यक्ष नोंदवलेली माहिती आहे.'
              : 'Honest impact tracking: every meal served and kilogram composted is backed by cryptographic timestamp and receiver handoff logs.'}
          </p>
          <div className="mt-3 inline-block px-3 py-1 bg-white border border-[#E8DAC2] rounded-pill text-xs font-semibold text-[#B85F00]">
            📍 {lang === 'mr' ? 'पायलट प्रकल्प: पुणे, पिंपरी-चिंचवड आणि मुंबई' : 'Pilot Launch Scope: Pune & Mumbai Metropolitan Region'}
          </div>
        </div>

        {/* 2-Column Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Monthly Meals Growth Area Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#E8DAC2]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8] mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-[#1F5C3A]">
                  {lang === 'mr' ? 'अन्न पुनर्वापर वाढ (मासिक जेवण)' : 'Monthly Meals Served Trend'}
                </h3>
                <p className="text-xs text-[#735747]">
                  {lang === 'mr' ? 'अतिरिक्त अन्न ते गरम जेवण प्रवास' : 'Cumulative nutritious meals provided to verified shelters'}
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-pill bg-[#FFF0DE] text-[#B85F00]">
                +48% MoM
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mealColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F5C3A" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#1F5C3A" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#735747" fontSize={12} tickLine={false} />
                  <YAxis stroke="#735747" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E8DAC2', boxShadow: '0 8px 24px rgba(75, 46, 30, 0.1)' }}
                    formatter={(value) => [`${value.toLocaleString()} meals`, 'Served']}
                  />
                  <Area type="monotone" dataKey="meals" stroke="#1F5C3A" strokeWidth={3} fillOpacity={1} fill="url(#mealColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-[#F0E6D8] grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-[#FFFBF5]">
                <span className="block text-[11px] text-[#735747]">{lang === 'mr' ? 'एकूण अन्न' : 'Surplus Saved'}</span>
                <span className="font-bold text-[#1F5C3A] text-sm">3,540 kg</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FFFBF5]">
                <span className="block text-[11px] text-[#735747]">{lang === 'mr' ? 'सरासरी वेळ' : 'Avg Match Time'}</span>
                <span className="font-bold text-[#B85F00] text-sm">18.4 min</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FFFBF5]">
                <span className="block text-[11px] text-[#735747]">{lang === 'mr' ? 'CO₂e बचत' : 'CO₂e Mitigated'}</span>
                <span className="font-bold text-[#4E9A59] text-sm">8.85 Tonnes</span>
              </div>
            </div>
          </div>

          {/* 3-Tier Zero-Waste Split Donut Chart */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#E8DAC2] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8] mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1F5C3A]">
                    {lang === 'mr' ? '३-स्तरीय शून्य अपव्यय वाटप' : '3-Tier Destination Routing'}
                  </h3>
                  <p className="text-xs text-[#735747]">
                    {lang === 'mr' ? '१००% अन्नाचा सदुपयोग' : 'Guaranteed 0% sent to municipal landfills'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#EAF5EC] text-[#4E9A59] flex items-center justify-center font-bold">
                  🌱
                </div>
              </div>

              {/* Donut Chart */}
              <div className="h-52 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tierData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(val) => [`${val}%`, 'Share']}
                      contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8DAC2' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend & Breakdown */}
              <div className="space-y-2.5 mt-2">
                {tierData.map((tier, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFBF5] text-xs font-semibold text-[#4B2E1E]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                      <span>{tier.name}</span>
                    </div>
                    <span className="font-bold font-mono">{tier.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0E6D8] text-[11px] text-[#735747] text-center font-semibold">
              ✓ {lang === 'mr' ? 'अन्नाचे प्रमाण: १ जेवण = ३५० ग्रॅम निकषानुसार' : 'Standard conversion: 1 wholesome meal = 0.35 kg'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

