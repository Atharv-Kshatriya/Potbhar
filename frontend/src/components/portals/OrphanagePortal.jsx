import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Users, 
  Thermometer, 
  Camera,
  Heart,
  Recycle,
  Send
} from 'lucide-react';

export default function OrphanagePortal({ lang, user, onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('claims'); // 'claims' | 'feed' | 'needs'
  const [inspectingOffer, setInspectingOffer] = useState(null);

  // Inspection checklist state
  const [smellCheck, setSmellCheck] = useState(true);
  const [packagingCheck, setPackagingCheck] = useState(true);
  const [appearanceCheck, setAppearanceCheck] = useState(true);
  const [tempLogged, setTempLogged] = useState('64');
  const [rejectionReason, setRejectionReason] = useState('Food turned slightly sour during transit heat');

  // Arrived / Active food claims ready for on-site physical check
  const [myClaims, setMyClaims] = useState([
    {
      id: 'CLM-770',
      food: 'Dal Makhani & Jeera Rice with Phulkas',
      donor: 'Royal Orchid Banquets',
      quantityKg: 35,
      servings: 100,
      status: 'arrived_inspect_needed',
      volunteer: 'Vikram Shinde (Volunteer Rider)',
      eta: 'Arrived at Gate',
      handoffOtp: '4821',
      storage: 'Hot-held container'
    },
    {
      id: 'CLM-771',
      food: 'Fresh Steamed Idli & Sambar',
      donor: 'Udupi Heritage Kitchen',
      quantityKg: 18,
      servings: 50,
      status: 'dispatched',
      volunteer: 'Self-Delivery by Donor',
      eta: '12 mins away',
      handoffOtp: '3391',
      storage: 'Insulated hot box'
    }
  ]);

  // Live incoming nearby surplus food offers
  const [nearbyOffers, setNearbyOffers] = useState([
    {
      id: 'OFF-104',
      food: 'Mixed Vegetable Pulao & Curd Raita',
      donor: 'Kothrud Tech Park Banquets',
      address: 'Kothrud, Pune (3.2 km away)',
      distanceKm: 3.2,
      quantityKg: 28,
      servings: 80,
      timeLeftMinutes: 110,
      storage: 'Hot-held',
      status: 'available',
      allergens: 'Dairy (Curd)',
      tier: 'human'
    }
  ]);

  // Handled history with notifications sent to donors
  const [inspectionHistory, setInspectionHistory] = useState([]);

  const handleClaimOffer = (offer) => {
    setNearbyOffers(nearbyOffers.filter(o => o.id !== offer.id));
    setMyClaims([
      {
        id: `CLM-${Math.floor(100 + Math.random() * 900)}`,
        food: offer.food,
        donor: offer.donor,
        quantityKg: offer.quantityKg,
        servings: offer.servings,
        status: 'arrived_inspect_needed',
        volunteer: 'Direct Community Rider',
        eta: 'Arrived at gate',
        handoffOtp: '9182',
        storage: offer.storage
      },
      ...myClaims
    ]);
    setActiveTab('claims');
  };

  const handleCompleteInspection = (isEatable) => {
    if (isEatable) {
      alert(`Food Accepted as Eatable! Donor (${inspectingOffer.donor}) notified: "Your wholesome donation was verified safe and served to 100 children. Thank you!"`);
      setInspectionHistory([
        {
          id: inspectingOffer.id,
          food: inspectingOffer.food,
          donor: inspectingOffer.donor,
          result: 'accepted',
          summary: 'Accepted as safe & nutritious. Dinner served to children.',
          donorNotified: true,
          date: 'Just now'
        },
        ...inspectionHistory
      ]);
    } else {
      alert(`Food Marked Not Eatable. Zero-Waste Gate Triggered: Batch immediately rerouted to Pune Bio-Compost Facility! Donor (${inspectingOffer.donor}) notified respectfully.`);
      setInspectionHistory([
        {
          id: inspectingOffer.id,
          food: inspectingOffer.food,
          donor: inspectingOffer.donor,
          result: 'denied_diverted_to_compost',
          summary: `Denied (${rejectionReason}). Rerouted directly to Pune Bio-Compost for organic manure.`,
          donorNotified: true,
          date: 'Just now'
        },
        ...inspectionHistory
      ]);
    }

    setMyClaims(myClaims.filter(c => c.id !== inspectingOffer.id));
    setInspectingOffer(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#4B2E1E] pb-24" data-portal="orphanage">
      
      {/* Top Bar with Marigold Accent #F6C343 */}
      <div className="bg-white border-b-2 border-[#F6C343] px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={onBackToLanding} className="p-1.5 rounded-lg hover:bg-[#FFF6E8] text-[#735747]">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#FEF6D9] border border-[#F6C343]/60 flex items-center justify-center text-lg">
              👶
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg sm:text-xl text-[#1F5C3A]">
                  {lang === 'mr' ? 'अनाथाश्रम पोर्टल' : 'Orphanage Intake & Inspection'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF6D9] text-[#B85F00] border border-[#F6C343]">
                  Priority 1 Child Care
                </span>
              </div>
              <p className="text-xs text-[#735747]">
                {user?.orgName || 'Shivajinagar Children Home (45 Residents)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('claims')}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === 'claims' ? 'bg-[#F6C343] text-[#4B2E1E] shadow-xs' : 'bg-[#FFFBF5] border border-[#E8DAC2]'
              }`}
            >
              Arrivals & Physical Check ({myClaims.length})
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === 'feed' ? 'bg-[#F6C343] text-[#4B2E1E] shadow-xs' : 'bg-[#FFFBF5] border border-[#E8DAC2]'
              }`}
            >
              Available Nearby Offers
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        
        {/* Child Protection Banner */}
        <div className="bg-[#FEF6D9] border border-[#F6C343] rounded-2xl p-4 flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#B85F00] shrink-0 mt-0.5" />
          <div className="text-xs text-[#4B2E1E] leading-relaxed">
            <span className="font-bold text-[#B85F00] block text-sm">
              Mandatory On-Site Freshness Verification Gate:
            </span>
            As the recipient institution, your physical on-site check is the ultimate safeguard. If food is eatable and safe, accept it and the donor is sent a warm notification. If it turned sour or unsafe in transit, deny it: the platform immediately diverts the batch to bio-compost and updates the donor.
          </div>
        </div>

        {/* TAB 1: ARRIVALS & PHYSICAL INSPECTION */}
        {activeTab === 'claims' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
                Food Arriving at Your Gate (Physical Check Required)
              </h2>
            </div>

            <div className="space-y-4">
              {myClaims.map((claim) => (
                <div key={claim.id} className="bg-white rounded-3xl p-6 border border-[#E8DAC2] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-100">{claim.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF0DE] text-[#B85F00]">
                        {claim.status === 'arrived_inspect_needed' ? 'Arrived at Gate • Check Needed' : 'In Transit'}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#1F5C3A]">{claim.food}</h3>
                    <div className="text-xs text-[#735747] font-semibold flex flex-wrap items-center gap-3">
                      <span>🏢 Donor: {claim.donor}</span>
                      <span>⚖️ {claim.quantityKg} kg ({claim.servings} servings)</span>
                      <span>🚴 Carrier: {claim.volunteer}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setInspectingOffer(claim)}
                      className="px-6 py-3 bg-[#1F5C3A] text-white text-xs font-bold rounded-pill shadow-xs hover:bg-[#16452B] btn-pill flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#F6C343]" />
                      <span>Conduct Physical Check (Accept / Deny)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Inspection History & Notifications Log */}
            {inspectionHistory.length > 0 && (
              <div className="pt-6 border-t border-[#F0E6D8] space-y-3">
                <h3 className="font-display font-bold text-lg text-[#1F5C3A]">
                  Recent Inspection Decisions & Donor Notifications
                </h3>
                {inspectionHistory.map((hist, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-[#E8DAC2] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#1F5C3A] block">{hist.food} ({hist.donor})</span>
                      <span className="text-[#735747]">{hist.summary}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-pill text-[11px] font-bold ${
                      hist.result === 'accepted' ? 'bg-[#E6F4EA] text-[#1F5C3A]' : 'bg-[#F6EFEA] text-[#8A5A3B]'
                    }`}>
                      {hist.result === 'accepted' ? '✓ Accepted & Donor Thanked' : '🌱 Diverted to Compost & Donor Notified'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE FEED OF NEARBY DONATIONS */}
        {activeTab === 'feed' && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
              Available Food Surplus Nearby
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyOffers.map(offer => (
                <div key={offer.id} className="bg-white p-6 rounded-3xl border border-[#E8DAC2] shadow-soft flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#735747] block mb-1">{offer.id}</span>
                    <h3 className="font-display font-bold text-lg text-[#1F5C3A]">{offer.food}</h3>
                    <p className="text-xs text-[#735747] font-semibold mt-1">🏢 {offer.donor} • 📍 {offer.address}</p>
                    <div className="mt-3 p-3 bg-[#FFFBF5] rounded-xl border border-[#E8DAC2] text-xs space-y-1">
                      <div>⚖️ {offer.quantityKg} kg ({offer.servings} meals)</div>
                      <div>⏱️ {offer.timeLeftMinutes} mins safe window</div>
                      <div className="text-[#D64545] font-bold">⚠️ Allergen: {offer.allergens}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleClaimOffer(offer)}
                    className="mt-4 w-full py-2.5 bg-[#1F5C3A] text-white text-xs font-bold rounded-pill hover:bg-[#16452B]"
                  >
                    Accept Claim for Children
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Physical Freshness Check Gate Modal (Accept vs Deny) */}
      {inspectingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-soft-lg border border-[#E8DAC2] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-display font-bold text-lg text-[#1F5C3A]">
                Recipient On-Site Physical Inspection
              </h3>
              <button onClick={() => setInspectingOffer(null)} className="text-xs font-bold">✕</button>
            </div>

            <div className="text-xs text-[#735747]">
              Evaluating batch: <strong className="text-[#1F5C3A]">{inspectingOffer.food}</strong> from <strong>{inspectingOffer.donor}</strong>
            </div>

            <div className="space-y-3 text-xs font-semibold text-[#4B2E1E]">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFFBF5] border border-[#E8DAC2]">
                <span>1. Aroma check: Smell is fresh and wholesome?</span>
                <input
                  type="checkbox"
                  checked={smellCheck}
                  onChange={(e) => setSmellCheck(e.target.checked)}
                  className="w-4 h-4 accent-[#1F5C3A]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFFBF5] border border-[#E8DAC2]">
                <span>2. Packaging: Containers clean and hygienic?</span>
                <input
                  type="checkbox"
                  checked={packagingCheck}
                  onChange={(e) => setPackagingCheck(e.target.checked)}
                  className="w-4 h-4 accent-[#1F5C3A]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFFBF5] border border-[#E8DAC2]">
                <span>3. Appearance: Texture and color normal?</span>
                <input
                  type="checkbox"
                  checked={appearanceCheck}
                  onChange={(e) => setAppearanceCheck(e.target.checked)}
                  className="w-4 h-4 accent-[#1F5C3A]"
                />
              </label>

              <div className="p-3 rounded-xl bg-[#FFFBF5] border border-[#E8DAC2] flex justify-between items-center">
                <span>4. Logged Arrival Temperature (°C):</span>
                <input
                  type="number"
                  value={tempLogged}
                  onChange={(e) => setTempLogged(e.target.value)}
                  className="w-16 bg-white border border-[#E8DAC2] rounded px-2 py-1 text-center font-mono font-bold"
                />
              </div>
            </div>

            {/* If checks fail, show reroute reason */}
            {(!smellCheck || !packagingCheck || !appearanceCheck) && (
              <div className="p-3 bg-[#FCEBEB] border border-[#D64545]/40 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-[#D64545] block">Inspection Failed - Reroute to Compost</span>
                <input
                  type="text"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Reason (e.g. food turned sour, packet leaked)"
                  className="w-full bg-white border border-[#D64545]/40 rounded px-2.5 py-1.5 text-xs text-[#4B2E1E]"
                />
                <span className="text-[10px] text-[#735747] block mt-1">
                  The system will automatically reroute this batch to the nearest Bio-Compost unit and notify the donor respectfully.
                </span>
              </div>
            )}

            {/* Decision Buttons: Accept vs Deny */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => handleCompleteInspection(false)}
                className="flex-1 py-3 bg-[#FCEBEB] text-[#D64545] font-bold text-xs rounded-pill hover:bg-[#fad4d4] flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Deny (Go to Compost & Notify Donor)</span>
              </button>

              <button
                type="button"
                disabled={!smellCheck || !packagingCheck || !appearanceCheck}
                onClick={() => handleCompleteInspection(true)}
                className={`flex-1 py-3 font-bold text-xs rounded-pill flex items-center justify-center gap-1.5 ${
                  smellCheck && packagingCheck && appearanceCheck
                    ? 'bg-[#1F5C3A] text-white hover:bg-[#16452B]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#F6C343]" />
                <span>Accept as Eatable (Notify Donor)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
