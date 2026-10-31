import React, { useState, useEffect } from 'react';
import LiveWorkflowBoard from '../LiveWorkflowBoard';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  Award, 
  QrCode, 
  Truck,
  PhoneCall,
  Sparkles,
  Compass,
  AlertTriangle,
  RotateCw,
  ExternalLink
} from 'lucide-react';

export default function VolunteerPortal({ lang, user, onBackToLanding }) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // 1: En route to donor, 2: Picked up, 3: En route to recipient, 4: Recipient checked
  const [riderProgressPercent, setRiderProgressPercent] = useState(35);
  const [gpsSimulating, setGpsSimulating] = useState(true);
  const [notice, setNotice] = useState('');
  const [completedTrips, setCompletedTrips] = useState(0);

  const activeTask = {
    id: 'TSK-409',
    food: 'Dal Makhani & Jeera Rice (35 kg / 100 meals)',
    donorName: 'Royal Orchid Banquets',
    donorAddress: 'FC Road, Near Goodluck Cafe, Deccan, Pune',
    donorCoords: { x: 140, y: 160 },
    donorPhone: '+91 98220 11223',
    donorOtp: '4821',

    recipientName: 'Shivajinagar Children Home (Orphanage)',
    recipientAddress: 'Survey 42, Near Simla Office, Shivajinagar, Pune',
    recipientCoords: { x: 420, y: 110 },
    recipientPhone: '+91 98220 99881',
    recipientOtp: '7412',

    compostName: 'Pune Bio-Compost Facility',
    compostAddress: 'Near Agriculture College, Pune',
    compostCoords: { x: 380, y: 240 },

    totalDistance: '2.8 km',
    remainingDistance: '1.2 km',
    speedKmh: 28,
    etaMinutes: 6,
    turnByTurn: 'In 350 meters, take slight right onto Jangli Maharaj Road toward Shivajinagar'
  };

  // Simulate smooth rider movement on the map
  useEffect(() => {
    if (!gpsSimulating) return;
    const interval = setInterval(() => {
      setRiderProgressPercent((prev) => (prev >= 90 ? 25 : prev + 3));
    }, 1800);
    return () => clearInterval(interval);
  }, [gpsSimulating]);

  // Interpolated rider position on SVG map
  const startX = currentStep <= 2 ? 80 : activeTask.donorCoords.x;
  const startY = currentStep <= 2 ? 180 : activeTask.donorCoords.y;
  const targetX = currentStep <= 2 ? activeTask.donorCoords.x : activeTask.recipientCoords.x;
  const targetY = currentStep <= 2 ? activeTask.donorCoords.y : activeTask.recipientCoords.y;

  const currentRiderX = startX + (targetX - startX) * (riderProgressPercent / 100);
  const currentRiderY = startY + (targetY - startY) * (riderProgressPercent / 100);

  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#4B2E1E] pb-24" data-portal="volunteer" data-demo-mode={user?.demoMode ? 'true' : undefined}>
      
      {/* Top Bar with Sky Blue Accent */}
      <div className="bg-white border-b-2 border-[#4FA3E0] px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBackToLanding} className="p-1.5 rounded-lg hover:bg-[#FFF6E8] text-[#735747]">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#EBF5FC] border border-[#4FA3E0]/40 flex items-center justify-center text-lg">
              🚴
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg sm:text-xl text-[#1F5C3A]">
                  {lang === 'mr' ? 'रायडर व स्वयंसेवक पोर्टल' : 'Rider Logistics & Live Map'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF5FC] text-[#3582BC]">
                  Live GPS Active
                </span>
              </div>
              <p className="text-xs text-[#735747]">
                {user?.fullName || 'Vikram Shinde (Volunteer Rider ID: PB-RDR-881)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all flex items-center gap-2 ${
                isAvailable ? 'bg-[#E6F4EA] text-[#1F5C3A] border border-[#4E9A59]' : 'bg-gray-100 text-gray-500'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-[#4E9A59] animate-pulse' : 'bg-gray-400'}`}></span>
              <span>{isAvailable ? 'On Duty (Active)' : 'Off Duty'}</span>
            </button>
          </div>
        </div>
      </div>

      <LiveWorkflowBoard portal="rider" user={user} />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        
        {/* Turn-by-Turn GPS Banner */}
        <div className="bg-[#1F5C3A] text-white rounded-2xl p-4 sm:p-5 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F6C343]">
              <Navigation className="w-5 h-5 transform rotate-45" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F6C343] font-bold block">
                Optimized Live Route Guidance
              </span>
              <p className="text-sm font-bold leading-snug">
                {activeTask.turnByTurn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs font-mono font-bold">
            <div className="px-3 py-1.5 rounded-xl bg-white/10">
              <span className="text-white/60 block text-[10px]">Distance</span>
              <span>{activeTask.remainingDistance}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10">
              <span className="text-white/60 block text-[10px]">Est. ETA</span>
              <span className="text-[#F6C343]">{activeTask.etaMinutes} mins</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10">
              <span className="text-white/60 block text-[10px]">Speed</span>
              <span>{activeTask.speedKmh} km/h</span>
            </div>
          </div>
        </div>

        {/* 2-Column: Live Optimized Map & Step Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Live Map Integration */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DAC2] shadow-soft space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#4FA3E0]" />
                <h3 className="font-display font-bold text-base text-[#1F5C3A]">
                  Real-Time City Map & Rider Position
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#4E9A59] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#4E9A59] animate-ping"></span>
                  GPS Locked
                </span>
                <button
                  onClick={() => setGpsSimulating(!gpsSimulating)}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
                  title="Toggle Simulation"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SVG Visual Map Canvas with Roads, Pins, and Moving Rider */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#F4EDE4] border border-[#E8DAC2] overflow-hidden shadow-inner">
              
              <svg className="w-full h-full" viewBox="0 0 500 300">
                {/* Background City Blocks */}
                <rect x="20" y="20" width="120" height="90" rx="8" fill="#EAE0D3" opacity="0.6" />
                <rect x="180" y="30" width="160" height="70" rx="8" fill="#EAE0D3" opacity="0.6" />
                <rect x="360" y="20" width="120" height="70" rx="8" fill="#EAE0D3" opacity="0.6" />
                <rect x="40" y="150" width="150" height="120" rx="8" fill="#EAE0D3" opacity="0.6" />
                <rect x="230" y="140" width="120" height="130" rx="8" fill="#EAE0D3" opacity="0.6" />
                <rect x="370" y="150" width="110" height="110" rx="8" fill="#EAE0D3" opacity="0.6" />

                {/* River Mutha / Green Belt */}
                <path d="M 0,270 Q 200,240 500,280" stroke="#BCE3EA" strokeWidth="24" fill="none" opacity="0.8" />
                
                {/* City Roads Network */}
                <path d="M 0,130 L 500,130" stroke="#FFFFFF" strokeWidth="14" fill="none" />
                <path d="M 0,130 L 500,130" stroke="#DDD3C4" strokeWidth="12" fill="none" strokeDasharray="6,4" />

                <path d="M 160,0 L 160,300" stroke="#FFFFFF" strokeWidth="12" fill="none" />
                <path d="M 350,0 L 350,300" stroke="#FFFFFF" strokeWidth="12" fill="none" />

                {/* Active Optimized Delivery Route Line */}
                <path 
                  d={`M ${activeTask.donorCoords.x},${activeTask.donorCoords.y} Q 280,140 ${activeTask.recipientCoords.x},${activeTask.recipientCoords.y}`}
                  stroke="#4FA3E0" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  strokeDasharray="8,5"
                  fill="none"
                />

                {/* Donor Pin (FC Road) */}
                <g transform={`translate(${activeTask.donorCoords.x}, ${activeTask.donorCoords.y})`}>
                  <circle r="14" fill="#F28C28" opacity="0.25" />
                  <circle r="8" fill="#F28C28" />
                  <text x="12" y="4" fontSize="10" fontWeight="bold" fill="#B85F00">1. Pickup (Donor)</text>
                </g>

                {/* Recipient Pin (Orphanage) */}
                <g transform={`translate(${activeTask.recipientCoords.x}, ${activeTask.recipientCoords.y})`}>
                  <circle r="14" fill="#1F5C3A" opacity="0.25" />
                  <circle r="8" fill="#1F5C3A" />
                  <text x="12" y="4" fontSize="10" fontWeight="bold" fill="#1F5C3A">2. Drop (Orphanage)</text>
                </g>

                {/* Bio-Compost Alternative Pin */}
                <g transform={`translate(${activeTask.compostCoords.x}, ${activeTask.compostCoords.y})`}>
                  <circle r="6" fill="#8A5A3B" />
                  <text x="10" y="3" fontSize="9" fill="#8A5A3B">Compost Pit</text>
                </g>

                {/* Moving Rider GPS Marker */}
                <g transform={`translate(${currentRiderX}, ${currentRiderY})`}>
                  <circle r="18" fill="#4FA3E0" opacity="0.3" className="animate-ping" />
                  <circle r="12" fill="#3582BC" />
                  <circle r="6" fill="#FFFFFF" />
                  <text x="-16" y="-16" fontSize="10" fontWeight="bold" fill="#1F5C3A">🚴 You (Rider)</text>
                </g>
              </svg>

              {/* Map Floating Controls */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E8DAC2] text-[11px] font-semibold text-[#4B2E1E] shadow-xs">
                <span>📍 FC Road → Shivajinagar Corridor</span>
              </div>

              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E8DAC2] text-[11px] font-semibold text-[#3582BC] shadow-xs flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" />
                <span>Live Route Optimization</span>
              </div>
            </div>

            {/* Donor & Recipient Addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 bg-[#FFFBF5] rounded-xl border border-[#E8DAC2]">
                <span className="text-[10px] font-bold text-[#F28C28] uppercase block">Pickup Location:</span>
                <span className="font-bold text-[#1F5C3A] block">{activeTask.donorName}</span>
                <span className="text-[11px] text-[#735747]">{activeTask.donorAddress}</span>
              </div>
              <div className="p-3 bg-[#FFFBF5] rounded-xl border border-[#E8DAC2]">
                <span className="text-[10px] font-bold text-[#1F5C3A] uppercase block">Destination Recipient:</span>
                <span className="font-bold text-[#1F5C3A] block">{activeTask.recipientName}</span>
                <span className="text-[11px] text-[#735747]">{activeTask.recipientAddress}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Step by Step Workflow & Physical Check Gate */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DAC2] shadow-soft space-y-5">
            
            <div className="pb-3 border-b border-[#F0E6D8]">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#EBF5FC] text-[#3582BC]">
                {activeTask.id}
              </span>
              <h3 className="font-display font-bold text-lg text-[#1F5C3A] mt-1.5">
                {activeTask.food}
              </h3>
              <p className="text-xs text-[#735747] mt-0.5">
                Total weight: 35 kg • Time window remaining: 45 min
              </p>
            </div>

            {/* 4 Step Gates for Rider */}
            <div className="space-y-2.5">
              
              <div className={`p-3.5 rounded-2xl border transition-all ${
                currentStep >= 1 ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A]' : 'bg-[#FFFBF5] border-[#E8DAC2]'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>1. Reached Donor Location</span>
                  <span>{currentStep >= 1 ? '✓ Arrived' : 'Pending'}</span>
                </div>
                <div className="text-[11px] text-[#735747] flex justify-between">
                  <span>Donor OTP: <strong className="font-mono text-[#1F5C3A]">{activeTask.donorOtp}</strong></span>
                  <a href={`tel:${activeTask.donorPhone}`} className="text-[#3582BC] underline flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> Call Donor
                  </a>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border transition-all ${
                currentStep >= 2 ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A]' : 'bg-[#FFFBF5] border-[#E8DAC2]'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>2. Picked Up & Handoff Verified</span>
                  <span>{currentStep >= 2 ? '✓ Loaded' : 'Pending'}</span>
                </div>
                <p className="text-[11px] text-[#735747]">
                  Verify food temperature & containers are sealed.
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl border transition-all ${
                currentStep >= 3 ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A]' : 'bg-[#FFFBF5] border-[#E8DAC2]'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>3. In Transit (Live GPS Tracking)</span>
                  <span>{currentStep >= 3 ? '✓ Dispatched' : 'Pending'}</span>
                </div>
                <p className="text-[11px] text-[#735747]">
                  Donor and Shelter are watching live movement on map.
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl border transition-all ${
                currentStep >= 4 ? 'bg-[#E6F4EA] border-[#4E9A59] text-[#1F5C3A]' : 'bg-[#FFFBF5] border-[#E8DAC2]'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>4. Recipient Freshness Gate</span>
                  <span>{currentStep >= 4 ? '✓ Evaluated' : 'Gate'}</span>
                </div>
                <p className="text-[11px] text-[#735747]">
                  Recipient inspects on-site. If eatable → Accepted & donor notified. If not eatable → Rerouted to Compost.
                </p>
              </div>

            </div>

            {/* Advance Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  if (currentStep < 4) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    setCompletedTrips((trips) => trips + 1);
                    setNotice('Delivery completed. 1.5 volunteer hours added to your trip history.');
                    setCurrentStep(1);
                  }
                }}
                className="w-full py-3 bg-[#1F5C3A] text-white text-xs font-bold rounded-pill hover:bg-[#16452B] btn-pill shadow-xs flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#F6C343]" />
                <span>
                  {currentStep === 1 && 'Confirm "Arrived at Donor"'}
                  {currentStep === 2 && 'Confirm "Food Picked Up & Start Navigation"'}
                  {currentStep === 3 && 'Confirm "Arrived at Shelter for Inspection"'}
                  {currentStep === 4 && 'Complete Trip & Log Hours'}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-[#cfe4d5] bg-white px-4 py-3 text-sm text-[#1f5c3a] shadow-xl">
          <span>{notice} {completedTrips > 0 && <b>Completed trips: {completedTrips}</b>}</span>
          <button type="button" onClick={() => setNotice('')} className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold hover:bg-[#f2f6f2]">Dismiss</button>
        </div>
      )}
    </div>
  );
}
