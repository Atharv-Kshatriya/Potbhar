import React, { useState } from 'react';
import LiveWorkflowBoard from '../LiveWorkflowBoard';
import { 
  assessFoodFreshness, 
  FOOD_CATEGORIES, 
  STORAGE_TYPES 
} from '../../lib/freshguard';
import { 
  PlusCircle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  FileText, 
  Download, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles,
  AlertCircle,
  Truck,
  Building2,
  Calendar,
  Navigation,
  Info,
  Check,
  XCircle,
  Phone
} from 'lucide-react';

const donorTypeLabels = {
  individual: 'Individual / Household',
  restaurant: 'Restaurant',
  hotel: 'Hotel / Banquet Hall',
  caterer: 'Caterer',
  mess: 'Mess / Canteen',
  corporate_kitchen: 'Office / Corporate Kitchen',
  event_venue: 'Event Venue',
  other: 'Community Donor',
};

export default function DonorPortal({ lang, user, onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'new' | 'certificate'
  const [showQrModal, setShowQrModal] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedProgressListing, setSelectedProgressListing] = useState(null);

  // Stepper state for new listing
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('cooked_veg');
  const [title, setTitle] = useState('Dal Tadka & Steamed Jeera Rice');
  const [quantityKg, setQuantityKg] = useState('18');
  const [servings, setServings] = useState('50');
  const [storage, setStorage] = useState('ambient');
  const [hoursAgo, setHoursAgo] = useState(1.5);
  const [smell, setSmell] = useState('normal');
  const [moldOrSlime, setMoldOrSlime] = useState(false);
  const [packaging, setPackaging] = useState('sealed');
  const [plateLeftover, setPlateLeftover] = useState(false);
  
  // Location
  const [pickupAddress, setPickupAddress] = useState('Bhandarkar Road, Shivajinagar, Pune');
  const [gpsCoordinates, setGpsCoordinates] = useState('18.5204° N, 73.8567° E');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Delivery Choice
  const [deliveryMethod, setDeliveryMethod] = useState('rider'); // 'self' | 'rider'
  const [chosenDestination, setChosenDestination] = useState('orphanage'); // 'orphanage' | 'gaushala' | 'compost'
  const [donorDeclaration, setDonorDeclaration] = useState(false);

  // Minimum food limit constant (e.g. 5 kg)
  const MIN_FOOD_LIMIT_KG = 5;
  const isBelowMinLimit = parseFloat(quantityKg || 0) < MIN_FOOD_LIMIT_KG;

  // Active listings list with full progress tracker
  const [listings, setListings] = useState([
    {
      id: 'PB-PUN-1092',
      food: 'Dal Makhani, Jeera Rice & Phulkas',
      quantityKg: 35,
      servings: 100,
      destinationType: 'orphanage',
      destinationName: 'Shivajinagar Children Home',
      destinationAddress: 'Survey No. 42, Shivajinagar, Pune (2.8 km away)',
      deliveryMethod: 'rider',
      riderName: 'Vikram Shinde',
      riderPhone: '+91 98221 44550',
      status: 'in_transit', // 'submitted' | 'in_transit' | 'arrived' | 'accepted' | 'denied_diverted'
      progressStep: 2, // 1: submitted, 2: in transit, 3: arrived & check, 4: completed
      recipientInspection: 'pending',
      donorNotification: 'Volunteer rider is en route to pick up your donation.',
      timeLeft: '35 mins window',
      handoffOtp: '4821',
      postedAt: '25 mins ago'
    },
    {
      id: 'PB-PUN-1088',
      food: 'Mixed Vegetable Pulao & Raita',
      quantityKg: 20,
      servings: 57,
      destinationType: 'shelter',
      destinationName: 'Anand Elder Care Shelter',
      destinationAddress: 'Kothrud, Pune',
      deliveryMethod: 'self',
      riderName: 'Self Delivery (Donor)',
      riderPhone: user?.phone || '+91 98230 12345',
      status: 'accepted',
      progressStep: 4,
      recipientInspection: 'accepted',
      donorNotification: 'Thank you! Shelter caretaker inspected the food and confirmed it safe and delicious. 57 elders served dinner!',
      timeLeft: '0 mins',
      handoffOtp: '9120',
      postedAt: '2 hrs ago'
    }
  ]);

  // Compute FreshGuard evaluation
  const assessment = assessFoodFreshness({
    category,
    storage,
    preparedHoursAgo: hoursAgo,
    smell,
    moldOrSlime,
    packaging,
    plateLeftover
  });

  // Recommended priority
  const suggestedPriority = assessment.tier === 'human' 
    ? 'orphanage' 
    : assessment.tier === 'animal' 
      ? 'gaushala' 
      : 'compost';

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setPickupAddress('Bhandarkar Road, Near Goodluck Cafe, Deccan, Pune');
      setGpsCoordinates('18.5196° N, 73.8412° E');
      setIsDetectingLocation(false);
    }, 800);
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    
    // Auto-selected recommended name
    let destName = 'Shivajinagar Children Home (Orphanage)';
    if (chosenDestination === 'gaushala') destName = 'Alandi Sri Krishna Gaushala (Cattle)';
    if (chosenDestination === 'compost') destName = 'Pune Bio-Compost Facility (Earth Renewal)';

    const newListing = {
      id: `PB-PUN-${Math.floor(1000 + Math.random() * 9000)}`,
      food: title,
      quantityKg: parseFloat(quantityKg),
      servings: parseInt(servings),
      destinationType: chosenDestination,
      destinationName: destName,
      destinationAddress: '2.5 km away from your location',
      deliveryMethod: isBelowMinLimit ? 'self' : deliveryMethod,
      riderName: deliveryMethod === 'rider' && !isBelowMinLimit ? 'Rohan Kulkarni (Assigned Rider)' : 'Self Delivery (Donor)',
      riderPhone: '+91 98223 99881',
      status: 'submitted',
      progressStep: 1,
      recipientInspection: 'pending',
      donorNotification: deliveryMethod === 'rider' && !isBelowMinLimit 
        ? 'Rider assigned! Navigating to your pickup location with live GPS tracker.' 
        : 'Self-delivery selected. Please drop off within the safe window.',
      timeLeft: `${assessment.timeLeftMinutes} mins window`,
      handoffOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      postedAt: 'Just now'
    };

    setListings([newListing, ...listings]);
    const accessToken = window.sessionStorage.getItem('potbhar.accessToken');
    if (accessToken) {
      fetch(`${(import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')}/live-workflows/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { food: title, quantityKg: parseFloat(quantityKg), servings: parseInt(servings, 10), destinationType: chosenDestination, destinationName: destName, deliveryMethod: isBelowMinLimit ? 'self' : deliveryMethod, timeLeft: `${assessment.timeLeftMinutes} mins window` } }),
      }).catch((error) => console.error('Unable to publish the food offer to other portals:', error));
    }
    setActiveTab('listings');
    setStep(1);
  };

  // Simulation: Test Recipient Accept / Deny trigger right here to see live updates!
  const handleSimulateRecipientAction = (listingId, action) => {
    setListings(listings.map(item => {
      if (item.id === listingId) {
        if (action === 'accept') {
          return {
            ...item,
            status: 'accepted',
            progressStep: 4,
            recipientInspection: 'accepted',
            donorNotification: `Warm update: ${item.destinationName} inspected your food on-site and confirmed it safe and delicious! Over ${item.servings} people served. Thank you!`
          };
        } else {
          return {
            ...item,
            status: 'denied_diverted',
            progressStep: 4,
            recipientInspection: 'denied',
            destinationName: 'Pune Bio-Compost Facility (Rerouted)',
            donorNotification: `Notice: Upon on-site arrival, the food was found not eatable for humans due to ambient heat. As per PotBhar zero-waste protocol, it has been immediately rerouted to Bio-Compost for organic manure so nothing is wasted!`
          };
        }
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#4B2E1E] pb-24" data-portal="donor" data-demo-mode={user?.demoMode ? 'true' : undefined}>
      
      {/* Portal Top Header */}
      <div className="bg-white border-b border-[#F28C28]/30 px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="p-1.5 rounded-lg hover:bg-[#FFF6E8] text-[#735747]"
              title="Back to Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#FFF0DE] border border-[#F28C28]/40 flex items-center justify-center text-lg">
              🍲
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg sm:text-xl text-[#1F5C3A]">
                  {lang === 'mr' ? 'दाता पोर्टल' : 'Donor Workspace'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF0DE] text-[#B85F00] border border-[#F28C28]/30">
                  {donorTypeLabels[user?.accountType] || 'Community Donor'}
                </span>
              </div>
              <p className="text-xs text-[#735747]">
                {user?.orgName || 'Community Food Donor (Household / Restaurant / Caterer)'}
              </p>
            </div>
          </div>

          {/* Action Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === 'listings'
                  ? 'bg-[#F28C28] text-white shadow-xs'
                  : 'bg-[#FFFBF5] text-[#4B2E1E] border border-[#E8DAC2]'
              }`}
            >
              {lang === 'mr' ? 'सक्रिय नोंदी व प्रगती' : 'Active Progress'}
            </button>
            <button
              onClick={() => { setActiveTab('new'); setStep(1); }}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'new'
                  ? 'bg-[#1F5C3A] text-white shadow-xs'
                  : 'bg-[#FFFBF5] text-[#1F5C3A] border border-[#1F5C3A]/30'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{lang === 'mr' ? 'अन्न नोंद करा' : 'Donate Surplus'}</span>
            </button>
            <button
              onClick={() => setShowCertModal(true)}
              className="px-3.5 py-1.5 rounded-pill text-xs font-bold bg-[#E6F4EA] text-[#1F5C3A] border border-[#4E9A59]/30 hover:bg-[#d6eedb] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'mr' ? 'CSR प्रमाणपत्र' : 'Impact Cert'}</span>
            </button>
          </div>
        </div>
      </div>

      <LiveWorkflowBoard portal="donor" user={user} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* TAB 1: ACTIVE DONATION PROGRESS TRACKER */}
        {activeTab === 'listings' && (
          <div className="space-y-8">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
                <span className="text-xs text-[#735747] font-semibold block">{lang === 'mr' ? 'एकूण वाचवलेले अन्न' : 'Surplus Donated'}</span>
                <span className="text-2xl font-display font-bold text-[#F28C28] mt-1 block">55 kg</span>
                <span className="text-[11px] text-[#4E9A59] font-bold">157 wholesome meals</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
                <span className="text-xs text-[#735747] font-semibold block">{lang === 'mr' ? 'सक्रिय वहन' : 'Active In-Transit'}</span>
                <span className="text-2xl font-display font-bold text-[#1F5C3A] mt-1 block">1 Batch</span>
                <span className="text-[11px] text-[#735747]">Live map tracking</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
                <span className="text-xs text-[#735747] font-semibold block">{lang === 'mr' ? 'संस्था पोहोच' : 'Recipients Reached'}</span>
                <span className="text-2xl font-display font-bold text-[#4FA3E0] mt-1 block">2 Shelters</span>
                <span className="text-[11px] text-[#735747]">Verified child & elder homes</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
                <span className="text-xs text-[#735747] font-semibold block">{lang === 'mr' ? 'कचऱ्यात शून्य' : 'Landfill Waste'}</span>
                <span className="text-2xl font-display font-bold text-[#4E9A59] mt-1 block">0% Dumped</span>
                <span className="text-[11px] text-[#4E9A59] font-bold">Zero Waste Guaranteed</span>
              </div>
            </div>

            {/* Live Progress Card for Every Active Donation */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
                  {lang === 'mr' ? 'अन्नाची थेट प्रगती व स्थिती (Live Tracking)' : 'Live Food Progress & Recipient Inspection Tracker'}
                </h2>
                <button
                  onClick={() => { setActiveTab('new'); setStep(1); }}
                  className="px-4 py-2 bg-[#F28C28] text-white text-xs font-bold rounded-pill shadow-xs hover:bg-[#D97314] flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'नवीन अन्न नोंदवा' : 'New Donation'}</span>
                </button>
              </div>

              <div className="space-y-6">
                {listings.map((lst) => (
                  <div key={lst.id} className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DAC2] shadow-soft space-y-5">
                    
                    {/* Top Row: ID, Destination, Time */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F0E6D8]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-gray-100 text-[#735747]">
                          {lst.id}
                        </span>
                        <span className={`px-3 py-1 rounded-pill text-xs font-bold ${
                          lst.destinationType === 'orphanage' 
                            ? 'bg-[#FEF6D9] text-[#B85F00]' 
                            : lst.destinationType === 'gaushala'
                              ? 'bg-[#EAF5EC] text-[#4E9A59]'
                              : 'bg-[#F6EFEA] text-[#8A5A3B]'
                        }`}>
                          {lst.destinationType === 'orphanage' ? '👶 Orphanage / Shelter' : lst.destinationType === 'gaushala' ? '🐄 Gaushala' : '🌱 Bio-Compost'}
                        </span>
                        <span className="text-xs text-[#A38979]">
                          â€¢ {lst.postedAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowQrModal(lst)}
                          className="px-3.5 py-1.5 bg-[#FFF0DE] border border-[#F28C28] text-[#B85F00] rounded-xl text-xs font-bold hover:bg-[#F28C28] hover:text-white transition-all flex items-center gap-1.5"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Handoff OTP: {lst.handoffOtp}</span>
                        </button>
                      </div>
                    </div>

                    {/* Food Summary */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-xl text-[#1F5C3A]">
                          {lst.food}
                        </h3>
                        <p className="text-xs text-[#735747] font-semibold mt-1">
                          ⚖️ {lst.quantityKg} kg ({lst.servings} meals) • 🏢 Destination: <span className="text-[#1F5C3A] font-bold">{lst.destinationName}</span>
                        </p>
                        <p className="text-xs text-[#A38979] mt-0.5">
                          📍 {lst.destinationAddress} • Mode: <span className="font-bold text-[#F28C28]">{lst.deliveryMethod === 'rider' ? `Volunteer Rider (${lst.riderName})` : 'Self Delivery by Donor'}</span>
                        </p>
                      </div>

                      {lst.status !== 'accepted' && lst.status !== 'denied_diverted' && (
                        <div className="bg-[#EBF5FC] p-3 rounded-2xl border border-[#4FA3E0]/30 text-xs">
                          <span className="font-bold text-[#3582BC] block">🚴 Rider Contact:</span>
                          <span>{lst.riderName} ({lst.riderPhone})</span>
                        </div>
                      )}
                    </div>

                    {/* 4-Step Progress Bar (Â§6) */}
                    <div className="p-4 bg-[#FFFBF5] rounded-2xl border border-[#E8DAC2] space-y-3">
                      <div className="flex justify-between items-center text-xs font-bold text-[#735747]">
                        <span>Live Food Flow Progress:</span>
                        <span className="text-[#F28C28]">
                          {lst.progressStep === 1 && '1. Details Submitted & Confirmed'}
                          {lst.progressStep === 2 && '2. In Transit to Destination'}
                          {lst.progressStep === 3 && '3. Arrived at Destination'}
                          {lst.progressStep === 4 && (lst.status === 'accepted' ? '4. Accepted & Wholesome' : '4. Denied - Rerouted to Compost')}
                        </span>
                      </div>

                      {/* Visual Steps */}
                      <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                        <div className={`p-2 rounded-xl border ${lst.progressStep >= 1 ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A] font-bold' : 'bg-white text-gray-400'}`}>
                          ✓ 1. Submitted
                        </div>
                        <div className={`p-2 rounded-xl border ${lst.progressStep >= 2 ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A] font-bold' : 'bg-white text-gray-400'}`}>
                          {lst.progressStep >= 2 ? '✓' : '2.'} In Transit
                        </div>
                        <div className={`p-2 rounded-xl border ${lst.progressStep >= 3 ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A] font-bold' : 'bg-white text-gray-400'}`}>
                          {lst.progressStep >= 3 ? '✓' : '3.'} Arrived & Check
                        </div>
                        <div className={`p-2 rounded-xl border ${
                          lst.progressStep === 4 
                            ? lst.status === 'accepted'
                              ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A] font-bold'
                              : 'bg-[#FCEBEB] border-[#D64545] text-[#D64545] font-bold'
                            : 'bg-white text-gray-400'
                        }`}>
                          {lst.progressStep === 4 ? (lst.status === 'accepted' ? '✓ Accepted' : '⚠️ Diverted to Compost') : '4. Result'}
                        </div>
                      </div>
                    </div>

                    {/* Instant Notification to Donor */}
                    <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
                      lst.status === 'accepted' 
                        ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A]' 
                        : lst.status === 'denied_diverted'
                          ? 'bg-[#F6EFEA] border-[#8A5A3B] text-[#8A5A3B]'
                          : 'bg-[#FFF0DE] border-[#F28C28]/40 text-[#4B2E1E]'
                    }`}>
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-sm mb-0.5">
                          {lst.status === 'accepted' ? '🎉 Meal Accepted Notification' : lst.status === 'denied_diverted' ? '🌱 Zero-Waste Reroute Notification' : '📦 Status Update'}
                        </span>
                        {lst.donorNotification}
                      </div>
                    </div>

                    {/* Interactive Simulation Controls for Demo */}
                    {lst.status !== 'accepted' && lst.status !== 'denied_diverted' && (
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#F0E6D8]">
                        <span className="text-[#A38979] italic font-semibold">
                          [Simulation Mode: Test Recipient Gate Response]
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSimulateRecipientAction(lst.id, 'accept')}
                            className="px-3.5 py-1.5 bg-[#1F5C3A] text-white font-bold rounded-pill shadow-xs hover:bg-[#16452B]"
                          >
                            Simulate Recipient "Accept"
                          </button>
                          <button
                            onClick={() => handleSimulateRecipientAction(lst.id, 'deny')}
                            className="px-3.5 py-1.5 bg-[#8A5A3B] text-white font-bold rounded-pill shadow-xs hover:bg-[#6e462d]"
                          >
                            Simulate Recipient "Deny - Go to Compost"
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STEPPER WITH LOCATION, LIMIT CHECK, PRIORITY SUGGESTION & SELF-DELIVER / RIDER */}
        {activeTab === 'new' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DAC2] shadow-soft-lg">
            
            {/* Stepper Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-[#735747] mb-2">
                <span>Step {step} of 4</span>
                <span className="text-[#F28C28]">
                  {step === 1 && '1. Food Details & Quantity'}
                  {step === 2 && '2. Condition & Safe Window'}
                  {step === 3 && '3. Location & Delivery Mode'}
                  {step === 4 && '4. Priority Recommendation & Confirm'}
                </span>
              </div>
              <div className="w-full bg-[#E8DAC2] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#F28C28] h-full transition-all duration-300" 
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Food Details & Minimum Limit Check */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="font-display font-bold text-xl text-[#1F5C3A]">
                  What food surplus are you sharing?
                </h3>
                
                <div>
                  <label className="block text-xs font-bold text-[#735747] uppercase mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3.5 py-2.5 text-xs text-[#4B2E1E] font-semibold"
                  >
                    {FOOD_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{lang === 'mr' ? c.labelMr : c.labelEn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#735747] uppercase mb-1.5">
                    Food Name & Description
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g. Dal Tadka, Jeera Rice, Fresh Chapatis"
                    className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3.5 py-2.5 text-xs text-[#4B2E1E] font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#735747] uppercase mb-1.5">
                      Quantity (Kg)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={quantityKg}
                      onChange={(e) => {
                        setQuantityKg(e.target.value);
                        setServings(Math.round(parseFloat(e.target.value || 0) / 0.35).toString());
                      }}
                      className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3.5 py-2.5 text-xs text-[#4B2E1E] font-semibold font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#735747] uppercase mb-1.5">
                      Estimated Servings
                    </label>
                    <input
                      type="number"
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                      className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3.5 py-2.5 text-xs text-[#4B2E1E] font-semibold font-mono"
                    />
                  </div>
                </div>

                {/* Minimum Food Limit Rule Check */}
                {isBelowMinLimit ? (
                  <div className="p-4 bg-[#FEF6D9] border border-[#F6C343] rounded-2xl text-xs text-[#4B2E1E] space-y-1">
                    <span className="font-bold text-[#B85F00] block text-sm flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-[#B85F00]" />
                      Small Batch Notice (&lt; {MIN_FOOD_LIMIT_KG} kg)
                    </span>
                    <p className="leading-relaxed">
                      Volunteer riders are optimized for bulk transfers (â‰¥ 5 kg). For smaller household portions, we recommend <strong>Self-Delivery</strong> to a nearby recommended shelter or community fridge, or pooling with neighbours!
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-[#EAF5EC] border border-[#4E9A59]/40 rounded-xl text-xs text-[#1F5C3A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4E9A59]" />
                    <span>Eligible for Volunteer Rider dispatch or Self-Delivery!</span>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-[#F28C28] text-white text-xs font-bold rounded-pill hover:bg-[#D97314] flex items-center gap-1.5"
                  >
                    <span>Next: Food Condition</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Storage & Condition */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="font-display font-bold text-xl text-[#1F5C3A]">
                  Condition & Temperature Checks
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#735747] uppercase mb-1.5">
                    Storage Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {STORAGE_TYPES.map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setStorage(st.id)}
                        className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                          storage === st.id ? 'bg-[#1F5C3A] text-white border-[#1F5C3A]' : 'bg-[#FFFBF5] text-[#735747] border-[#E8DAC2]'
                        }`}
                      >
                        {st.id === 'ambient' ? '🌡️ Room Temp' : st.id === 'hot_held' ? '🔥 Hot ≥60°C' : '❄️ Chilled'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#735747] uppercase mb-1.5">
                    Hours Elapsed Since Cooking
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    value={hoursAgo}
                    onChange={(e) => setHoursAgo(parseFloat(e.target.value))}
                    className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3.5 py-2.5 text-xs text-[#4B2E1E] font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSmell(smell === 'normal' ? 'off' : 'normal')}
                    className={`p-2.5 text-xs font-bold rounded-xl border text-left flex justify-between ${
                      smell === 'off' ? 'bg-[#FCEBEB] border-[#D64545] text-[#D64545]' : 'bg-[#FFFBF5] border-[#E8DAC2]'
                    }`}
                  >
                    <span>Smell Fresh?</span>
                    <span>{smell === 'normal' ? '✓ Fresh' : '⚠️ Sour'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlateLeftover(!plateLeftover)}
                    className={`p-2.5 text-xs font-bold rounded-xl border text-left flex justify-between ${
                      plateLeftover ? 'bg-[#FCEBEB] border-[#D64545] text-[#D64545]' : 'bg-[#FFFBF5] border-[#E8DAC2]'
                    }`}
                  >
                    <span>Plate Leftover?</span>
                    <span>{plateLeftover ? '❌ Yes' : '✓ Unserved'}</span>
                  </button>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 text-xs font-bold text-[#735747]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-[#F28C28] text-white text-xs font-bold rounded-pill hover:bg-[#D97314] flex items-center gap-1.5"
                  >
                    <span>Next: Location & Delivery</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Location from Donor & Delivery Method (Self-Deliver vs Rider) */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="font-display font-bold text-xl text-[#1F5C3A]">
                  Pickup Location & Delivery Preference
                </h3>

                {/* Donor Location Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-[#735747] uppercase">
                      Donor Location / Address
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                      className="text-xs font-bold text-[#1F5C3A] hover:underline flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#F28C28]" />
                      <span>{isDetectingLocation ? 'Detecting GPS...' : '📍 Detect My Current Location'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter street, area, city"
                    className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3.5 py-2.5 text-xs text-[#4B2E1E] font-semibold"
                  />
                  <div className="text-[10px] text-[#A38979] font-mono">
                    GPS Coordinates: {gpsCoordinates}
                  </div>
                </div>

                {/* Delivery Method Choice: Self-Deliver vs Volunteer Rider */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#735747] uppercase mb-2">
                    How will the food reach the recipient?
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Option A: Deliver by Self */}
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('self')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        deliveryMethod === 'self'
                          ? 'bg-[#E6F4EA] border-2 border-[#1F5C3A] shadow-xs'
                          : 'bg-[#FFFBF5] border-[#E8DAC2] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">🚶</span>
                        <span className="font-bold text-xs text-[#1F5C3A]">Deliver by Self</span>
                      </div>
                      <p className="text-[11px] text-[#735747] leading-relaxed">
                        I will directly drop off the food at the recommended shelter. We will provide direct directions and contact.
                      </p>
                    </button>

                    {/* Option B: Volunteer Rider */}
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('rider')}
                      disabled={isBelowMinLimit}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isBelowMinLimit
                          ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200'
                          : deliveryMethod === 'rider'
                            ? 'bg-[#FFF0DE] border-2 border-[#F28C28] shadow-xs'
                            : 'bg-[#FFFBF5] border-[#E8DAC2] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">🚴</span>
                        <span className="font-bold text-xs text-[#B85F00]">Request Volunteer Rider</span>
                      </div>
                      <p className="text-[11px] text-[#735747] leading-relaxed">
                        {isBelowMinLimit 
                          ? 'Reserved for batches â‰¥ 5 kg. Please choose Self-Delivery.' 
                          : 'Dispatches a community rider with optimized live GPS tracking on the map.'}
                      </p>
                    </button>

                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 text-xs font-bold text-[#735747]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 bg-[#F28C28] text-white text-xs font-bold rounded-pill hover:bg-[#D97314] flex items-center gap-1.5"
                  >
                    <span>Next: Priority Matching</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: System Priority Suggestion -> Donor Decides -> Binding Declaration */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-[#F0E6D8]">
                  <h3 className="font-display font-bold text-xl text-[#1F5C3A]">
                    System Priority Recommendation
                  </h3>
                  <p className="text-xs text-[#735747] mt-0.5">
                    Evaluated based on your food type, cooking time, and storage parameters.
                  </p>
                </div>

                {/* Priority Suggestion Badge */}
                <div className="p-4 bg-[#FFFBF5] rounded-2xl border border-[#E8DAC2] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#735747]">System Recommended Priority:</span>
                    <span className="px-3 py-1 rounded-pill text-xs font-bold bg-[#E6F4EA] text-[#1F5C3A]">
                      â­ Top Choice
                    </span>
                  </div>

                  <div className="space-y-2">
                    
                    {/* Choice 1: Orphanages & Shelters */}
                    <button
                      type="button"
                      onClick={() => setChosenDestination('orphanage')}
                      disabled={assessment.tier !== 'human'}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                        assessment.tier !== 'human'
                          ? 'opacity-40 cursor-not-allowed bg-gray-50'
                          : chosenDestination === 'orphanage'
                            ? 'bg-[#E6F4EA] border-2 border-[#1F5C3A] shadow-xs'
                            : 'bg-white border-[#E8DAC2]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl">👶</span>
                        <div>
                          <span className="font-bold text-xs text-[#1F5C3A] block">
                            Priority 1: Orphanages & Shelters (Human Consumption)
                          </span>
                          <span className="text-[11px] text-[#735747]">
                            Passes safe window ({assessment.safeWindowHours}h max). Best for wholesome meals.
                          </span>
                        </div>
                      </div>
                      {chosenDestination === 'orphanage' && (
                        <CheckCircle2 className="w-5 h-5 text-[#1F5C3A] shrink-0" />
                      )}
                    </button>

                    {/* Choice 2: Gaushalas */}
                    <button
                      type="button"
                      onClick={() => setChosenDestination('gaushala')}
                      disabled={assessment.tier === 'compost'}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                        assessment.tier === 'compost'
                          ? 'opacity-40 cursor-not-allowed bg-gray-50'
                          : chosenDestination === 'gaushala'
                            ? 'bg-[#FEF6D9] border-2 border-[#F6C343] shadow-xs'
                            : 'bg-white border-[#E8DAC2]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl">🐄</span>
                        <div>
                          <span className="font-bold text-xs text-[#B85F00] block">
                            Priority 2: Gaushalas (Animal Feed)
                          </span>
                          <span className="text-[11px] text-[#735747]">
                            Plain grains, unspiced rotis, raw vegetables & fruit trimmings.
                          </span>
                        </div>
                      </div>
                      {chosenDestination === 'gaushala' && (
                        <CheckCircle2 className="w-5 h-5 text-[#B85F00] shrink-0" />
                      )}
                    </button>

                    {/* Choice 3: Bio-Compost */}
                    <button
                      type="button"
                      onClick={() => setChosenDestination('compost')}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                        chosenDestination === 'compost'
                          ? 'bg-[#F6EFEA] border-2 border-[#8A5A3B] shadow-xs'
                          : 'bg-white border-[#E8DAC2]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl">🌱</span>
                        <div>
                          <span className="font-bold text-xs text-[#8A5A3B] block">
                            Priority 3: Bio-Compost Facility (Soil Return)
                          </span>
                          <span className="text-[11px] text-[#735747]">
                            Spoiled, expired, or plate scraps converted to rich organic farmer manure.
                          </span>
                        </div>
                      </div>
                      {chosenDestination === 'compost' && (
                        <CheckCircle2 className="w-5 h-5 text-[#8A5A3B] shrink-0" />
                      )}
                    </button>

                  </div>
                </div>

                {/* Recipient Check & Reroute Policy Notice */}
                <div className="p-3 bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl text-xs text-[#735747] space-y-1">
                  <span className="font-bold text-[#1F5C3A] block">
                    ✓ Mandatory Recipient Quality Gate:
                  </span>
                  <p>
                    When your food arrives at the destination, the recipient conducts an on-site physical check. If eatable, you will receive a grateful confirmation! If not eatable due to transit heat, it will be automatically rerouted to compost so zero waste occurs, and you will be respectfully notified.
                  </p>
                </div>

                {/* Donor Binding Declaration */}
                <div className="p-3.5 bg-[#FFF0DE] border border-[#F28C28]/40 rounded-xl">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={donorDeclaration}
                      onChange={(e) => setDonorDeclaration(e.target.checked)}
                      className="mt-0.5 accent-[#F28C28] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-[#4B2E1E] font-semibold leading-relaxed">
                      I declare that this food was prepared hygienically, unserved on plates, and accurately described.
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 text-xs font-bold text-[#735747]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!donorDeclaration}
                    onClick={handleCreateListing}
                    className={`px-7 py-3 rounded-pill text-xs font-bold text-white shadow-sm flex items-center gap-2 ${
                      donorDeclaration ? 'bg-[#1F5C3A] hover:bg-[#16452B] btn-pill' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-[#F6C343]" />
                    <span>Confirm Donation & Track</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* QR & OTP Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-soft-lg border border-[#E8DAC2]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-[#735747] font-mono">{showQrModal.id}</span>
              <button onClick={() => setShowQrModal(null)} className="text-xs font-bold text-[#735747]">✕</button>
            </div>
            <h3 className="font-display font-bold text-lg text-[#1F5C3A] mb-1">
              Handoff Verification Code
            </h3>
            <p className="text-xs text-[#735747] mb-5">
              Show this to your rider or recipient upon arrival
            </p>

            <div className="w-44 h-44 mx-auto bg-[#FFFBF5] border-2 border-[#1F5C3A] rounded-2xl flex flex-col items-center justify-center p-4 shadow-inner mb-4">
              <QrCode className="w-28 h-28 text-[#1F5C3A]" />
              <span className="text-[10px] font-mono text-[#735747] mt-1">POTBHAR-SECURE-HANDOFF</span>
            </div>

            <div className="bg-[#FFF0DE] p-3 rounded-xl border border-[#F28C28]/40 mb-5">
              <span className="text-[11px] font-bold text-[#B85F00] uppercase block">4-Digit Handoff OTP</span>
              <span className="font-mono text-3xl font-bold text-[#1F5C3A] tracking-widest">{showQrModal.handoffOtp}</span>
            </div>

            <button
              onClick={() => setShowQrModal(null)}
              className="w-full py-2.5 bg-[#1F5C3A] text-white text-xs font-bold rounded-pill"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* CSR Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg border border-[#E8DAC2]">
            <div className="flex justify-between items-center pb-3 border-b border-[#E8DAC2] mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1F5C3A]" />
                <h3 className="font-display font-bold text-lg text-[#1F5C3A]">
                  Community Impact Certificate
                </h3>
              </div>
              <button onClick={() => setShowCertModal(false)} className="text-xs font-bold text-[#735747]">✕</button>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFBF5] border-2 border-[#1F5C3A] space-y-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-white p-1 border border-[#F28C28]/20 flex items-center justify-center">
                <img src="/brand/logo.png" alt="PotBhar" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#B85F00] uppercase tracking-wider block">Official Recognition</span>
                <h4 className="font-display text-xl font-bold text-[#1F5C3A]">Surplus Food Rescue Certificate</h4>
                <p className="text-xs text-[#735747] mt-1">Awarded to {user?.orgName || 'Community Food Donor'}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E8DAC2] text-xs">
                <div>
                  <span className="text-[10px] text-[#735747] block">Surplus Saved</span>
                  <span className="font-bold text-[#1F5C3A] text-sm">55 kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#735747] block">Meals Provided</span>
                  <span className="font-bold text-[#F28C28] text-sm">157 Meals</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#735747] block">CO₂e Prevented</span>
                  <span className="font-bold text-[#4E9A59] text-sm">137 kg</span>
                </div>
              </div>

              <p className="text-[11px] text-[#735747] italic">
                "For championing zero food waste and nourishing local child and elder shelters."
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => { window.print(); setShowCertModal(false); }}
                className="px-5 py-2.5 bg-[#1F5C3A] text-white text-xs font-bold rounded-pill hover:bg-[#16452B] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
