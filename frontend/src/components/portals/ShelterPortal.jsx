import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, ShieldCheck, CheckCircle2, Building, Users } from 'lucide-react';

export default function ShelterPortal({ lang, user, onBackToLanding }) {
  const [capacityKg, setCapacityKg] = useState('120');

  const incomingBulk = [
    {
      id: 'BLK-501',
      item: 'Khichdi & Mixed Dal with Chapati (Large Bulk Container)',
      donor: 'JW Marriott Banquets Pune',
      quantityKg: 65,
      servings: 185,
      distanceKm: 4.1,
      status: 'dispatched',
      eta: '25 min'
    },
    {
      id: 'BLK-502',
      item: 'Steamed Rice & Veg Sambar',
      donor: 'Kothrud Tech Park Food Court',
      quantityKg: 40,
      servings: 114,
      distanceKm: 2.8,
      status: 'available',
      eta: 'Ready for pickup'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#4B2E1E] pb-24" data-portal="shelter">
      <div className="bg-white border-b-2 border-[#2BA6A0] px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBackToLanding} className="p-1.5 rounded-lg hover:bg-[#FFF6E8] text-[#735747]">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#E6F6F5] border border-[#2BA6A0]/40 flex items-center justify-center text-lg">
              🏠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg sm:text-xl text-[#1F5C3A]">
                  {lang === 'mr' ? 'निवारा केंद्र पोर्टल' : 'Shelter Workspace'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F6F5] text-[#2BA6A0]">
                  Teal `#2BA6A0`
                </span>
              </div>
              <p className="text-xs text-[#735747]">
                {user?.orgName || 'Anand Seva Old-Age & Destitute Home, Pune'}
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold bg-[#E6F6F5] px-3 py-1.5 rounded-pill text-[#2BA6A0]">
            {lang === 'mr' ? 'दैनिक क्षमता:' : 'Daily Capacity:'} {capacityKg} kg
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
            <span className="text-xs text-[#735747] font-semibold block">{lang === 'mr' ? 'आजचे स्वीकारलेले अन्न' : 'Received Today'}</span>
            <span className="text-2xl font-display font-bold text-[#2BA6A0] mt-1 block">85 kg</span>
            <span className="text-[11px] text-[#4E9A59] font-bold">242 meals served</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
            <span className="text-xs text-[#735747] font-semibold block">{lang === 'mr' ? 'एकूण लाभार्थी' : 'Resident Count'}</span>
            <span className="text-2xl font-display font-bold text-[#1F5C3A] mt-1 block">78 Elders</span>
            <span className="text-[11px] text-[#735747]">Wholesome dinner secured</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8DAC2] shadow-xs">
            <span className="text-xs text-[#735747] font-semibold block">{lang === 'mr' ? 'अन्न बचत खर्च' : 'Meal Budget Relieved'}</span>
            <span className="text-2xl font-display font-bold text-[#B85F00] mt-1 block">₹6,800</span>
            <span className="text-[11px] text-[#735747]">Redirected to healthcare</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
            {lang === 'mr' ? 'मोठ्या प्रमाणातील अन्न आवक (Bulk Intakes)' : 'Bulk Wholesome Intakes'}
          </h2>

          <div className="space-y-3">
            {incomingBulk.map(b => (
              <div key={b.id} className="bg-white rounded-3xl p-6 border border-[#E8DAC2] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-gray-100 rounded">{b.id}</span>
                    <span className="text-xs font-bold text-[#2BA6A0] bg-[#E6F6F5] px-2 py-0.5 rounded-pill">
                      {b.status === 'dispatched' ? 'En Route' : 'Ready'}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1F5C3A]">{b.item}</h3>
                  <p className="text-xs text-[#735747] font-semibold">🏢 {b.donor} • ⚖️ {b.quantityKg} kg ({b.servings} meals) • 📍 {b.distanceKm} km</p>
                </div>

                <button
                  onClick={() => alert(lang === 'mr' ? 'दावा निश्चित करण्यात आला. स्वयंसेवकाला तात्काळ पिकअप सूचना दिली आहे.' : 'Bulk claim locked! Volunteer dispatcher en route.')}
                  className="px-5 py-2.5 bg-[#2BA6A0] text-white text-xs font-bold rounded-pill hover:bg-[#238a85] btn-pill shadow-xs"
                >
                  {lang === 'mr' ? 'मोठा भार स्वीकारा (Accept Bulk)' : 'Accept Bulk Batch'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

