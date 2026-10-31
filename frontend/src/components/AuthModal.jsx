import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  UserCheck 
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, lang }) {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'role'
  const [phone, setPhone] = useState('9823012345');
  const [otp, setOtp] = useState(['4', '8', '2', '1', '9', '0']);
  const [selectedRole, setSelectedRole] = useState('donor');
  const [orgName, setOrgName] = useState('Saffron Spice Restaurant');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setStep('role');
  };

  const handleCompleteAuth = () => {
    onLoginSuccess({
      phone,
      role: selectedRole,
      orgName: orgName || 'Registered User',
      verified: true
    });
    onClose();
  };

  const roles = [
    { id: 'donor', nameEn: 'Donate Surplus Food', nameMr: 'उरलेले अन्न दान करा', icon: '🍲', color: '#F28C28' },
    { id: 'orphanage', nameEn: 'Child Care / Orphanage', nameMr: 'अनाथाश्रम / बाल सुधार', icon: '👶', color: '#F6C343' },
    { id: 'shelter', nameEn: 'Homeless / Elder Shelter', nameMr: 'निवारा केंद्र / वृद्धाश्रम', icon: '🏠', color: '#2BA6A0' },
    { id: 'gaushala', nameEn: 'Cattle Gaushala', nameMr: 'गोशाळा / प्राणी निवारा', icon: '🐄', color: '#4E9A59' },
    { id: 'compost', nameEn: 'Compost Processor', nameMr: 'सेंद्रिय खत प्रकल्प', icon: '🌱', color: '#8A5A3B' },
    { id: 'volunteer', nameEn: 'Volunteer Helper', nameMr: 'स्वयंसेवक मदतनीस', icon: '🚴', color: '#4FA3E0' },
    { id: 'admin', nameEn: 'Operations Admin', nameMr: 'प्रशासन व्यवस्थापक', icon: '🛡️', color: '#4B5BD7' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#FFF6E8] rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-[#E8DAC2] overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white text-[#735747] flex items-center justify-center hover:bg-[#FCEBEB] hover:text-[#D64545] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step 1: Phone Input */}
        {step === 'phone' && (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#F28C28]/30 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <img 
                  src="/brand/logo.png" 
                  alt="PotBhar" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => { e.target.src = '/newARCH/logo.png'; }}
                />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#1F5C3A]">
                {lang === 'mr' ? 'PotBhar मध्ये साइन इन करा' : 'Sign In to PotBhar'}
              </h3>
              <p className="text-xs text-[#735747] mt-1">
                {lang === 'mr' ? 'मोबाईल नंबरवर सुरक्षित OTP मिळवा' : 'One-time password sent to your mobile'}
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#735747] uppercase tracking-wider mb-1.5">
                  {lang === 'mr' ? 'मोबाईल नंबर' : 'Mobile Number'}
                </label>
                <div className="flex items-center bg-white border border-[#E8DAC2] rounded-xl px-3.5 py-2.5 focus-within:border-[#F28C28]">
                  <span className="text-sm font-bold text-[#735747] pr-2 border-r border-[#E8DAC2]">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98230 12345"
                    className="w-full pl-3 text-sm font-semibold text-[#4B2E1E] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1F5C3A] text-white font-bold text-sm rounded-pill hover:bg-[#16452B] btn-pill shadow-xs flex items-center justify-center gap-2"
              >
                <span>{lang === 'mr' ? 'OTP पाठवा' : 'Send Verification OTP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 text-center">
              <span className="text-[11px] text-[#A38979]">
                🔒 {lang === 'mr' ? 'सुरक्षित व TRAI/DLT अधिकृत संदेश' : 'Secure DLT-verified OTP transmission'}
              </span>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <div>
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-[#1F5C3A] flex items-center justify-center mx-auto mb-2 font-bold">
                ✓
              </div>
              <h3 className="font-display font-bold text-2xl text-[#1F5C3A]">
                {lang === 'mr' ? 'OTP प्रविष्ट करा' : 'Verify 6-Digit OTP'}
              </h3>
              <p className="text-xs text-[#735747] mt-1">
                {lang === 'mr' ? `+91 ${phone} वर पाठवलेला कोड टाका` : `Sent to +91 ${phone}`}
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-11 h-12 text-center text-lg font-bold font-mono bg-white border border-[#E8DAC2] rounded-xl focus:border-[#F28C28] text-[#1F5C3A] focus:outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1F5C3A] text-white font-bold text-sm rounded-pill hover:bg-[#16452B] btn-pill shadow-xs flex items-center justify-center gap-2"
              >
                <span>{lang === 'mr' ? 'पडताळणी करा व पुढे जा' : 'Verify & Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-xs text-[#B85F00] font-bold hover:underline"
              >
                {lang === 'mr' ? 'नंबर बदला' : 'Change Phone Number'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Role / Portal */}
        {step === 'role' && (
          <div>
            <div className="text-center mb-5">
              <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
                {lang === 'mr' ? 'तुमची भूमिका निवडा' : 'Step 2: Choose Your Role'}
              </span>
              <h3 className="font-display font-bold text-xl text-[#1F5C3A] mt-1">
                {lang === 'mr' ? 'मी PotBhar चा वापर करणार आहे...' : 'I want to use PotBhar to...'}
              </h3>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected 
                        ? 'bg-white border-2 shadow-xs' 
                        : 'bg-white/70 border-[#E8DAC2] hover:bg-white'
                    }`}
                    style={{ borderColor: isSelected ? r.color : undefined }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{r.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-[#4B2E1E]">
                          {lang === 'mr' ? r.nameMr : r.nameEn}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#1F5C3A]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-bold text-[#735747] uppercase tracking-wider mb-1">
                {lang === 'mr' ? 'संस्थेचे / दात्याचे नाव' : 'Organization / Donor Entity Name'}
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="E.g. Pune Central Kitchen / Hope Orphanage"
                className="w-full bg-white border border-[#E8DAC2] rounded-xl px-3 py-2 text-xs font-semibold text-[#4B2E1E] focus:outline-none focus:border-[#F28C28]"
              />
            </div>

            <button
              onClick={handleCompleteAuth}
              className="w-full mt-4 py-3 bg-[#1F5C3A] text-white font-bold text-sm rounded-pill hover:bg-[#16452B] btn-pill shadow-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#F6C343]" />
              <span>{lang === 'mr' ? 'पोर्टलमध्ये प्रवेश करा' : 'Enter Dedicated Workspace'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

