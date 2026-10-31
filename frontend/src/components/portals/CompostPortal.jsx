import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Leaf, 
  Recycle, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  Truck,
  Download
} from 'lucide-react';

export default function CompostPortal({ lang, user, onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' | 'batches' | 'distribution'

  // Incoming diverted food batches (rejected from human shelters, expired, or market scraps)
  const [divertedBatches, setDivertedBatches] = useState([
    {
      id: 'CMP-701',
      source: 'Shivajinagar Children Home (Rerouted from Shelter Intake)',
      reason: 'Food turned slightly sour during hot afternoon transit',
      originalFood: 'Dal Makhani & Jeera Rice (Untouched unserved batch)',
      weightKg: 35,
      packagingFree: true,
      timeArrived: '18 mins ago',
      carrier: 'Vikram Shinde (Rider TSK-409)',
      pitAssigned: 'Pit #4 (Aerobic Microbe Inoculation)',
      status: 'received'
    },
    {
      id: 'CMP-702',
      source: 'Market Yard Wholesale Vegetable Wing',
      reason: 'Over-ripe bruised bananas and wilted spinach',
      originalFood: 'Raw Produce Surplus',
      weightKg: 120,
      packagingFree: true,
      timeArrived: '2 hrs ago',
      carrier: 'Direct Vendor Vehicle',
      pitAssigned: 'Pit #2 (Dry Leaves + Green Scraps Layering)',
      status: 'processing'
    }
  ]);

  const [fertilizerBags, setFertilizerBags] = useState(48);

  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#4B2E1E] pb-24" data-portal="compost">
      
      {/* Top Header with Earth Brown Accent #8A5A3B */}
      <div className="bg-white border-b-2 border-[#8A5A3B] px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={onBackToLanding} className="p-1.5 rounded-lg hover:bg-[#FFF6E8] text-[#735747]">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#F6EFEA] border border-[#8A5A3B]/40 flex items-center justify-center text-lg">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg sm:text-xl text-[#1F5C3A]">
                  {lang === 'mr' ? 'सेंद्रिय खत प्रकल्प पोर्टल' : 'Bio-Compost & Earth Renewal'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F6EFEA] text-[#8A5A3B]">
                  Tier 3 Priority
                </span>
              </div>
              <p className="text-xs text-[#735747]">
                {user?.orgName || 'Pune Green Bio-Compost Facility (Near Agriculture College)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('incoming')}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === 'incoming' ? 'bg-[#8A5A3B] text-white shadow-xs' : 'bg-[#FFFBF5] border border-[#E8DAC2]'
              }`}
            >
              Diverted Food Batches ({divertedBatches.length})
            </button>
            <button
              onClick={() => setActiveTab('batches')}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === 'batches' ? 'bg-[#8A5A3B] text-white shadow-xs' : 'bg-[#FFFBF5] border border-[#E8DAC2]'
              }`}
            >
              Compost Pits & Carbon
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        
        {/* Zero Waste Safety Net Banner */}
        <div className="bg-[#F6EFEA] border border-[#8A5A3B]/40 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
          <Recycle className="w-5 h-5 text-[#8A5A3B] shrink-0 mt-0.5" />
          <div className="text-xs text-[#4B2E1E] leading-relaxed">
            <span className="font-bold text-[#8A5A3B] block text-sm">
              The Ultimate Community Zero-Waste Safeguard:
            </span>
            Whenever food is rejected by orphanages or gaushalas as not eatable, it is immediately diverted to your facility. This prevents dangerous rotting in open landfills, completely mitigates methane emissions, and returns vital nutrients to Maharashtra's soil.
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
            <span className="text-xs text-[#735747] font-semibold block">Total Organic Diverted</span>
            <span className="text-2xl font-display font-bold text-[#8A5A3B] mt-1 block">1,420 kg</span>
            <span className="text-[11px] text-[#4E9A59] font-bold">100% Zero-Landfill</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
            <span className="text-xs text-[#735747] font-semibold block">Organic Compost Yield</span>
            <span className="text-2xl font-display font-bold text-[#1F5C3A] mt-1 block">460 kg</span>
            <span className="text-[11px] text-[#735747]">Ready for local farms</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
            <span className="text-xs text-[#735747] font-semibold block">Methane Mitigated</span>
            <span className="text-2xl font-display font-bold text-[#B85F00] mt-1 block">3.55 Tonnes</span>
            <span className="text-[11px] text-[#4E9A59] font-bold">CO₂e Climate Credit</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
            <span className="text-xs text-[#735747] font-semibold block">Farmer Partners</span>
            <span className="text-2xl font-display font-bold text-[#3582BC] mt-1 block">14 Farmers</span>
            <span className="text-[11px] text-[#735747]">Natural soil enrichment</span>
          </div>
        </div>

        {/* TAB 1: DIVERTED FOOD BATCHES LOG */}
        {activeTab === 'incoming' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
                Incoming Diverted Surplus Batches
              </h2>
              <span className="text-xs font-bold text-[#8A5A3B] bg-[#F6EFEA] px-3 py-1 rounded-pill">
                Packaging-Free Verification Gate
              </span>
            </div>

            <div className="space-y-3">
              {divertedBatches.map((batch) => (
                <div key={batch.id} className="bg-white rounded-3xl p-6 border border-[#E8DAC2] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-100">{batch.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F6EFEA] text-[#8A5A3B]">
                        {batch.status === 'received' ? 'Received & Unloaded' : 'Compost Processing'}
                      </span>
                      <span className="text-xs text-[#A38979]">• {batch.timeArrived}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#1F5C3A]">{batch.originalFood}</h3>
                    <p className="text-xs text-[#735747] font-semibold">
                      📍 Rerouted from: <strong className="text-[#B85F00]">{batch.source}</strong>
                    </p>
                    <p className="text-xs text-[#D64545] font-semibold">
                      Reason: {batch.reason}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#735747] pt-1">
                      <span>⚖️ {batch.weightKg} kg Net Organic</span>
                      <span>🚴 Carrier: {batch.carrier}</span>
                      <span>🏷️ {batch.pitAssigned}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Batch ${batch.id} logged! Aerobic microbes added. Estimated ~${Math.round(batch.weightKg * 0.33)} kg compost ready in 21 days.`)}
                      className="px-5 py-2.5 bg-[#8A5A3B] text-white text-xs font-bold rounded-pill hover:bg-[#6e462d] btn-pill shadow-xs"
                    >
                      Confirm Pit Allocation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COMPOST PITS & SOIL YIELD */}
        {activeTab === 'batches' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DAC2] shadow-soft space-y-6">
            <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
              Active Aerobic Compost Pits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#FFFBF5] border border-[#E8DAC2] space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Pit #1 (Mature)</span>
                  <span className="text-[#4E9A59]">Day 24 of 28</span>
                </div>
                <div className="w-full bg-[#E8DAC2] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4E9A59]" style={{ width: '85%' }}></div>
                </div>
                <p className="text-[11px] text-[#735747]">Yield: ~180 kg black gold fertilizer</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFBF5] border border-[#E8DAC2] space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Pit #2 (Active Layering)</span>
                  <span className="text-[#F28C28]">Day 12 of 28</span>
                </div>
                <div className="w-full bg-[#E8DAC2] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F28C28]" style={{ width: '45%' }}></div>
                </div>
                <p className="text-[11px] text-[#735747]">Yield: ~140 kg in progress</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFBF5] border border-[#E8DAC2] space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Pit #4 (Fresh Inflow)</span>
                  <span className="text-[#8A5A3B]">Day 1 of 28</span>
                </div>
                <div className="w-full bg-[#E8DAC2] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8A5A3B]" style={{ width: '10%' }}></div>
                </div>
                <p className="text-[11px] text-[#735747]">Yield: ~35 kg uneatable food inoculated</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

