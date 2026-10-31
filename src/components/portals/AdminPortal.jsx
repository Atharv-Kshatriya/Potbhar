import React, { useState } from 'react';
import LiveWorkflowBoard from '../LiveWorkflowBoard';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Settings, 
  Activity, 
  FileText, 
  Users,
  Search,
  Lock
} from 'lucide-react';

export default function AdminPortal({ lang, user, onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('verifications'); // 'verifications' | 'rules' | 'audit'
  const [notice, setNotice] = useState('');
  const [ruleVersion, setRuleVersion] = useState(1.1);

  // Verification queue for pending receivers
  const [pendingOrgs, setPendingOrgs] = useState([
    {
      id: 'ORG-9901',
      name: 'Bal Anand Seva Sanstha',
      type: 'Orphanage',
      city: 'Pune',
      regNo: 'MH-PUN-TRUST-4482',
      fssaiNo: '21523098000124',
      docAttached: 'Trust_Certificate.pdf',
      status: 'pending'
    },
    {
      id: 'ORG-9902',
      name: 'Pashu Seva Dham Gaushala',
      type: 'Gaushala',
      city: 'Pimpri-Chinchwad',
      regNo: 'PCMC-VET-9921',
      fssaiNo: 'Exempt',
      docAttached: 'Gaushala_Affidavit.pdf',
      status: 'pending'
    }
  ]);

  // Editable FreshGuard Config (§8.4)
  const [config, setConfig] = useState({
    cookedVegAmbient: 4,
    cookedVegHot: 4,
    cookedVegChilled: 24,
    cookedNonVegAmbient: 2,
    dairyAmbient: 2,
    tier1MaxScore: 34,
    tier2MaxScore: 64,
  });

  // Audit Log
  const [auditLogs, setAuditLogs] = useState([
    { id: 'AUD-8801', actor: 'Admin (System)', action: 'RULE_UPDATED', details: 'Ambient dairy threshold updated to 2 hrs', time: '10 mins ago' },
    { id: 'AUD-8802', actor: 'Admin (Pooja)', action: 'ORG_VERIFIED', details: 'Shivajinagar Children Home status set to VERIFIED', time: '1 hr ago' },
    { id: 'AUD-8803', actor: 'System Worker', action: 'LISTING_EXPIRED', details: 'LST-8902 safe window expired; routed to Compost', time: '2 hrs ago' }
  ]);

  const handleOrgDecision = (id, approved) => {
    const organization = pendingOrgs.find((org) => org.id === id);
    setPendingOrgs((organizations) => organizations.filter((org) => org.id !== id));
    setAuditLogs((logs) => [{
      id: `AUD-${Date.now()}`,
      actor: user?.fullName || 'Admin',
      action: approved ? 'ORG_VERIFIED' : 'ORG_REJECTED',
      details: `${organization?.name || id} ${approved ? 'approved' : 'rejected'}`,
      time: 'Just now',
    }, ...logs]);
    setNotice(`${organization?.name || 'Organization'} ${approved ? 'approved and verified' : 'rejected'}.`);
  };

  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#4B2E1E] pb-24" data-portal="admin" data-demo-mode={user?.demoMode ? 'true' : undefined}>
      <div className="bg-white border-b-2 border-[#4B5BD7] px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBackToLanding} className="p-1.5 rounded-lg hover:bg-[#FFF6E8] text-[#735747]">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#EDEFFC] border border-[#4B5BD7]/40 flex items-center justify-center text-lg">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg sm:text-xl text-[#1F5C3A]">
                  {lang === 'mr' ? 'प्रशासन व ऑपरेशन्स केंद्र' : 'PotBhar Admin Command'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDEFFC] text-[#4B5BD7]">
                  Operations & Safety
                </span>
              </div>
              <p className="text-xs text-[#735747]">
                Operations & Quality Assurance Team (Invite-Only Access)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('verifications')}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === 'verifications' ? 'bg-[#4B5BD7] text-white shadow-xs' : 'bg-[#FFFBF5] border border-[#E8DAC2]'
              }`}
            >
              {lang === 'mr' ? 'पडताळणी रांग' : 'Verification Queue'} ({pendingOrgs.length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === 'rules' ? 'bg-[#4B5BD7] text-white shadow-xs' : 'bg-[#FFFBF5] border border-[#E8DAC2]'
              }`}
            >
              {lang === 'mr' ? 'सुरक्षा नियम कॉन्फिग' : 'Safety Rules Config'}
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all ${
                activeTab === 'audit' ? 'bg-[#4B5BD7] text-white shadow-xs' : 'bg-[#FFFBF5] border border-[#E8DAC2]'
              }`}
            >
              {lang === 'mr' ? 'ऑडिट लॉग' : 'Audit Trail'}
            </button>
          </div>
        </div>
      </div>

      {notice && (
        <div role="status" className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-[#d8cfee] bg-[#f5f2fc] px-4 py-3 text-sm text-[#4f428b] shadow-sm">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} className="rounded-lg px-2 py-1 text-xs font-bold hover:bg-white">Dismiss</button>
        </div>
      )}

      <LiveWorkflowBoard portal="admin" user={user} />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        
        {/* TAB 1: RECEIVER VERIFICATION QUEUE */}
        {activeTab === 'verifications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
                {lang === 'mr' ? 'प्रलंबित संस्था पडताळणी अर्ज' : 'Pending Receiver Verification Applications'}
              </h2>
              <span className="text-xs font-bold text-[#735747]">
                Mandatory before receiving Tier 1 food claims
              </span>
            </div>

            {pendingOrgs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DAC2] text-[#735747]">
                <CheckCircle className="w-12 h-12 text-[#4E9A59] mx-auto mb-3" />
                <h3 className="font-bold text-base text-[#1F5C3A]">Queue is Clear!</h3>
                <p className="text-xs mt-1">All registered institutions have been reviewed and verified.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingOrgs.map(org => (
                  <div key={org.id} className="bg-white rounded-3xl p-6 border border-[#E8DAC2] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-gray-100 rounded">{org.id}</span>
                        <span className="text-xs font-bold text-[#4B5BD7] bg-[#EDEFFC] px-2 py-0.5 rounded-pill">{org.type}</span>
                        <span className="text-xs text-[#735747]">📍 {org.city}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#1F5C3A]">{org.name}</h3>
                      <div className="text-xs text-[#735747] font-semibold flex items-center gap-3 mt-1">
                        <span>Reg No: {org.regNo}</span>
                        <span>FSSAI: {org.fssaiNo}</span>
                        <span className="text-[#3582BC] underline cursor-pointer">📄 {org.docAttached}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOrgDecision(org.id, false)}
                        className="px-4 py-2 bg-[#FCEBEB] text-[#D64545] font-bold text-xs rounded-pill hover:bg-[#fad4d4]"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleOrgDecision(org.id, true)}
                        className="px-5 py-2 bg-[#1F5C3A] text-white font-bold text-xs rounded-pill hover:bg-[#16452B] btn-pill shadow-xs"
                      >
                        Approve & Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RULES CONFIG EDITOR (§8.4) */}
        {activeTab === 'rules' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DAC2] shadow-soft max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-[#F0E6D8]">
              <div>
                <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
                  FreshGuard Safety Threshold Configuration
                </h2>
                <p className="text-xs text-[#735747]">
                  All changes create an immutable version entry in the audit ledger.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#EDEFFC] text-[#4B5BD7] rounded-pill">
                Config v1.1
              </span>
            </div>

            <div className="space-y-4 text-xs font-semibold text-[#4B2E1E]">
              <div>
                <label className="block mb-1 text-[11px] font-bold text-[#735747] uppercase">
                  Cooked Veg Max Safe Window (Ambient Hours)
                </label>
                <input
                  type="number"
                  value={config.cookedVegAmbient}
                  onChange={(e) => setConfig({ ...config, cookedVegAmbient: parseInt(e.target.value) })}
                  className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px] font-bold text-[#735747] uppercase">
                  Cooked Non-Veg Max Safe Window (Ambient Hours)
                </label>
                <input
                  type="number"
                  value={config.cookedNonVegAmbient}
                  onChange={(e) => setConfig({ ...config, cookedNonVegAmbient: parseInt(e.target.value) })}
                  className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px] font-bold text-[#735747] uppercase">
                  Tier 1 Cutoff Score (Human Consumption Max)
                </label>
                <input
                  type="number"
                  value={config.tier1MaxScore}
                  onChange={(e) => setConfig({ ...config, tier1MaxScore: parseInt(e.target.value) })}
                  className="w-full bg-[#FFFBF5] border border-[#E8DAC2] rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <button
                onClick={() => {
                  const nextVersion = Math.round((ruleVersion + 0.1) * 10) / 10;
                  setRuleVersion(nextVersion);
                  setAuditLogs((logs) => [{ id: `AUD-${Date.now()}`, actor: user?.fullName || 'Admin', action: 'RULE_UPDATED', details: `FreshGuard thresholds saved as version ${nextVersion.toFixed(1)}`, time: 'Just now' }, ...logs]);
                  setNotice(`FreshGuard rules saved as version ${nextVersion.toFixed(1)}.`);
                }}
                className="w-full py-2.5 bg-[#4B5BD7] text-white font-bold text-xs rounded-pill hover:bg-[#3b49ab] btn-pill shadow-xs"
              >
                Save Rule Version {ruleVersion.toFixed(1)}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: IMMUTABLE AUDIT LOG (§9.1) */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DAC2] shadow-soft space-y-4">
            <h2 className="font-display font-bold text-xl text-[#1F5C3A]">
              Immutable System Audit Trail
            </h2>
            <div className="space-y-2">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3 bg-[#FFFBF5] rounded-xl border border-[#E8DAC2] flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#735747] font-bold">{log.id}</span>
                    <span className="font-bold text-[#4B5BD7] bg-[#EDEFFC] px-2 py-0.5 rounded">{log.action}</span>
                    <span className="text-[#4B2E1E]">{log.details}</span>
                  </div>
                  <span className="text-[11px] text-[#A38979]">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

