import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowRight, Bike, Building2, HeartHandshake, Leaf, LockKeyhole, Recycle, ShieldCheck, X } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

const accountTypes = [
  { id: 'donor', role: 'DONOR', title: 'Donor', copy: 'Share surplus food and follow every handoff.', icon: Building2, color: '#e87924', tint: '#fff2e7' },
  { id: 'rider', role: 'LOGISTICS', title: 'Rider', copy: 'Manage pickups, routes, and delivery updates.', icon: Bike, color: '#287bb5', tint: '#eaf5fd' },
  { id: 'recipient', role: 'RECIPIENT', title: 'Recipient', copy: 'Request food and confirm safe arrivals.', icon: HeartHandshake, color: '#23865a', tint: '#eaf7ef' },
  { id: 'compost', role: 'PROCESSOR', title: 'PotBhar Compost Unit', copy: 'Receive and process food that cannot be served.', icon: Recycle, color: '#8a5a3b', tint: '#f5eee9' },
  { id: 'admin', role: 'ADMIN', title: 'Admin', copy: 'Review organizations and oversee operations.', icon: ShieldCheck, color: '#6951b5', tint: '#f1edfc' },
];

const demoAccounts = {
  donor: 'donor@potbhar.demo',
  rider: 'rider@potbhar.demo',
  recipient: 'recipient@potbhar.demo',
  compost: 'processor@potbhar.demo',
  admin: 'admin@potbhar.demo',
};

const recipientPortals = {
  orphanage: 'orphanage',
  adult_shelter: 'shelter',
  gaushala: 'gaushala',
  food_bank: 'orphanage',
  other: 'orphanage',
};

const donorTypes = [
  ['individual', 'Individual / Household'],
  ['restaurant', 'Restaurant'],
  ['hotel', 'Hotel / Banquet Hall'],
  ['caterer', 'Caterer'],
  ['mess', 'Mess / Canteen'],
  ['corporate_kitchen', 'Office / Corporate Kitchen'],
  ['event_venue', 'Event Venue'],
  ['other', 'Other Donor'],
];

const recipientTypes = [
  ['orphanage', 'Orphanage / Child Care Home'],
  ['adult_shelter', 'Adult / Elder Shelter'],
  ['gaushala', 'Gaushala / Animal Shelter'],
  ['food_bank', 'Food Bank / Community Kitchen'],
  ['other', 'Other Registered Recipient'],
];

export default function AuthModal({ isOpen, onClose, onLoginSuccess, lang }) {
  const [selected, setSelected] = useState('donor');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [fullName, setFullName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [donorType, setDonorType] = useState('individual');
  const [recipientType, setRecipientType] = useState('orphanage');
  const [registrationId, setRegistrationId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signInFormRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const chooseAccount = (account) => {
    setSelected(account.id);
    setEmail('');
    setPassword('');
    setOrganizationName('');
    setRegistrationId('');
    if (account.id === 'admin') setIsCreatingAccount(false);
    setError('');
  };

  const isDemoLogin = () => !isCreatingAccount
    && email.trim().toLowerCase() === demoAccounts[selected]
    && password === 'demo123';

  const openLocalDemo = () => {
    const demoNames = { donor: 'Community Food Donor', rider: 'Vikram Shinde', recipient: 'Registered Recipient', compost: 'PotBhar Compost Unit', admin: 'PotBhar Administrator' };
    window.sessionStorage.removeItem('potbhar.accessToken');
    onLoginSuccess({
      id: `demo-${selected}`,
      fullName: demoNames[selected],
      email: demoAccounts[selected],
      role: selected === 'rider' ? 'volunteer' : selected === 'recipient' ? (recipientPortals[recipientType] || 'orphanage') : selected,
      orgName: organizationName || demoNames[selected],
      accountType: selected === 'donor' ? donorType : undefined,
      verified: false,
      demoMode: true,
    });
    onClose();
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      if (isCreatingAccount && selected === 'admin') {
        throw new Error('Admin access is invite-only. Sign in with an administrator account.');
      }

      const response = isCreatingAccount
        ? await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: fullName.trim(),
            email: email.trim(),
            password,
            role: accountTypes.find((item) => item.id === selected).role,
            organization_name: organizationName.trim(),
            subtype: selected === 'donor' ? donorType : selected === 'recipient' ? recipientType : selected === 'compost' ? 'compost_unit' : '',
            registration_id: registrationId.trim(),
          }),
        })
        : await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username: email.trim(), password }),
        });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (isDemoLogin()) {
          openLocalDemo();
          return;
        }
        throw new Error(payload.detail || (isCreatingAccount ? 'Unable to create your account.' : 'Unable to sign in. Check your details and try again.'));
      }

      const account = accountTypes.find((item) => item.id === selected);
      if (payload.user?.role !== account.role) {
        throw new Error(`This account is registered as ${payload.user?.role || 'another role'}. Choose the matching sign-in section.`);
      }

      let accountDetails = payload.user;
      try {
        const profileResponse = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${payload.access_token}` },
        });
        if (profileResponse.ok) accountDetails = await profileResponse.json();
      } catch {
        // Authentication succeeded; keep the login response if profile lookup is unavailable.
      }

      window.sessionStorage.setItem('potbhar.accessToken', payload.access_token);
      const portalType = accountDetails.organization?.metadata?.portal_type;
      onLoginSuccess({
        id: accountDetails.id,
        fullName: accountDetails.full_name,
        phone: accountDetails.phone,
        email: accountDetails.email,
        role: account.id === 'rider' ? 'volunteer' : account.id === 'recipient' ? (recipientPortals[recipientType] || recipientPortals[portalType] || 'orphanage') : account.id,
        accountType: portalType,
        orgName: accountDetails.organization?.name || accountDetails.full_name,
        verified: accountDetails.organization?.verification_status === 'VERIFIED',
      });
      onClose();
    } catch (signInError) {
      if (isDemoLogin()) {
        openLocalDemo();
        return;
      }
      if (signInError instanceof TypeError) {
        setError(`Cannot reach the PotBhar API at ${API_BASE}. For local development, start it from the backend folder with: python -m uvicorn app.main:app --port 8000`);
      } else {
        setError(signInError.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeAccount = accountTypes.find((account) => account.id === selected);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#20170f]/65 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-title"
        className="relative my-auto grid w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_100px_rgba(31,26,23,.28)] md:grid-cols-[.9fr_1.1fr]"
      >
        <aside className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden bg-[#173e2a] p-9 text-white md:flex">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f28c28]/20 blur-2xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#9bc66f]/20 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-11 w-11 rounded-2xl bg-white p-1.5 object-contain" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            <div><div className="text-lg font-extrabold tracking-tight">PotBhar</div><div className="text-xs text-white/60">Food, shared with care</div></div>
          </div>
          <div className="relative py-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#f7cb76]"><span className="h-2 w-2 rounded-full bg-[#f7cb76]" /> A better route for surplus</div>
            <h2 className="max-w-sm text-4xl font-extrabold leading-[1.08] tracking-tight text-[#f28c28]">Good food finds the people who need it.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">Sign in to coordinate safe donations, reliable pickups, and verified deliveries across your community.</p>
          </div>
          <div className="relative flex items-center justify-between border-t border-white/15 pt-5 text-xs text-white/55"><span>Role-based workspaces</span><span>Secure account access</span></div>
        </aside>

        <div className="relative p-5 sm:p-8 md:p-10">
          <button type="button" onClick={onClose} aria-label="Close sign in" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#78695f] transition hover:bg-[#f5f1ec] sm:right-6 sm:top-6"><X className="h-4 w-4" /></button>
          <div className="mb-7 pr-10">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#cb6e20]">Welcome back</p>
            <h1 id="signin-title" className="text-2xl font-extrabold tracking-tight text-[#253c2d] sm:text-3xl">Sign in to PotBhar</h1>
            <p className="mt-2 text-sm text-[#78695f]">Choose your workspace to continue.</p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="Choose account type">
            {accountTypes.map((account) => {
              const Icon = account.icon;
              const isActive = selected === account.id;
              return (
                <button
                  key={account.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => chooseAccount(account)}
                  className={`group flex min-h-[88px] min-w-0 flex-col items-start justify-between rounded-2xl border p-3 text-left transition duration-200 hover:-translate-y-0.5 ${isActive ? 'border-[#1d5b3b] bg-[#1d5b3b] text-white shadow-[0_8px_20px_rgba(31,26,23,.12)]' : 'border-[#eee7df] bg-white text-[#302720] hover:border-[#d9cfc4]'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className={`text-xs font-bold leading-4 sm:text-sm ${isActive ? 'text-white' : 'text-[#302720]'}`}>{account.title}</span>
                </button>
              );
            })}
          </div>

          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#dce8df] bg-[#f5faf6] p-3.5">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white" style={{ color: activeAccount.color }}><activeAccount.icon className="h-4 w-4" /></div>
            <div><div className="text-sm font-bold text-[#302720]">{activeAccount.title} workspace</div><p className="mt-0.5 text-xs leading-5 text-[#78695f]">{activeAccount.copy}</p></div>
          </div>

          {!isCreatingAccount && (
            <button type="button" onClick={() => {
              flushSync(() => {
                setEmail(demoAccounts[selected]);
                setPassword('demo123');
                setError('');
              });
              signInFormRef.current?.requestSubmit();
            }} className="mb-4 w-full rounded-xl border border-[#dce8df] bg-[#f5faf6] px-4 py-2.5 text-left text-xs font-semibold text-[#1d5b3b] transition hover:bg-[#edf6ef]">
              Open {activeAccount.title} demo workspace
            </button>
          )}

          {selected === 'donor' && (
            <label className="mb-4 block">
              <span className="mb-1.5 block text-xs font-bold text-[#4e443d]">What best describes this donor?</span>
              <select value={donorType} onChange={(event) => setDonorType(event.target.value)} className="w-full rounded-xl border border-[#e8e0d7] bg-[#fffdfa] px-4 py-3 text-sm text-[#302720] outline-none focus:border-[#dd842c]">
                {donorTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
          )}

          {selected === 'recipient' && (
            <label className="mb-4 block">
              <span className="mb-1.5 block text-xs font-bold text-[#4e443d]">Open recipient workspace</span>
              <select value={recipientType} onChange={(event) => setRecipientType(event.target.value)} className="w-full rounded-xl border border-[#e8e0d7] bg-[#fffdfa] px-4 py-3 text-sm text-[#302720] outline-none focus:border-[#dd842c]">
                {recipientTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
          )}

          <form ref={signInFormRef} onSubmit={handleSignIn} className="space-y-4">
            {isCreatingAccount && (
              <>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-[#4e443d]">Your name</span>
                  <input type="text" autoComplete="name" required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full name" className="w-full rounded-xl border border-[#e8e0d7] bg-[#fffdfa] px-4 py-3 text-sm text-[#302720] outline-none transition placeholder:text-[#b1a69b] focus:border-[#dd842c] focus:ring-4 focus:ring-[#dd842c]/10" />
                </label>
                {selected !== 'rider' && (
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-[#4e443d]">Organization name</span>
                    <input type="text" autoComplete="organization" required value={organizationName} onChange={(event) => setOrganizationName(event.target.value)} placeholder="Organization or business" className="w-full rounded-xl border border-[#e8e0d7] bg-[#fffdfa] px-4 py-3 text-sm text-[#302720] outline-none transition placeholder:text-[#b1a69b] focus:border-[#dd842c] focus:ring-4 focus:ring-[#dd842c]/10" />
                  </label>
                )}
                {selected === 'recipient' && (
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-[#4e443d]">Institution registration ID</span>
                      <input type="text" required minLength={4} maxLength={40} pattern="[A-Za-z0-9][A-Za-z0-9/-]{3,39}" value={registrationId} onChange={(event) => setRegistrationId(event.target.value)} placeholder="Trust / society / institution ID" className="w-full rounded-xl border border-[#e8e0d7] bg-[#fffdfa] px-4 py-3 text-sm text-[#302720] outline-none transition placeholder:text-[#b1a69b] focus:border-[#dd842c] focus:ring-4 focus:ring-[#dd842c]/10" />
                      <span className="mt-1 block text-[10px] leading-4 text-[#8c7e72]">Required for recipient registration. Letters, numbers, hyphens, and slashes only.</span>
                    </label>
                )}
              </>
            )}
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-[#4e443d]">Email address</span>
              <input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@organization.org" className="w-full rounded-xl border border-[#e8e0d7] bg-[#fffdfa] px-4 py-3 text-sm text-[#302720] outline-none transition placeholder:text-[#b1a69b] focus:border-[#dd842c] focus:ring-4 focus:ring-[#dd842c]/10" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-[#4e443d]">Password</span>
              <div className="relative"><LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8d80]" /><input type="password" autoComplete="current-password" required minLength={1} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-[#e8e0d7] bg-[#fffdfa] py-3 pl-10 pr-4 text-sm text-[#302720] outline-none transition placeholder:text-[#b1a69b] focus:border-[#dd842c] focus:ring-4 focus:ring-[#dd842c]/10" /></div>
            </label>
            {error && <p role="alert" className="rounded-xl border border-[#f2c7c1] bg-[#fff4f2] px-3.5 py-3 text-xs leading-5 text-[#a83d31]">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d5b3b] px-4 py-3.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(29,91,59,.2)] transition hover:bg-[#174b30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d5b3b] disabled:cursor-wait disabled:opacity-60">
              <span>{isSubmitting ? (isCreatingAccount ? 'Creating account…' : 'Signing you in…') : (isCreatingAccount ? 'Create account' : `Continue as ${activeAccount.title}`)}</span><ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#f0ebe5] pt-4 text-[11px] text-[#8c7e72]"><span className="inline-flex items-center gap-1.5"><LockKeyhole className="h-3.5 w-3.5" /> Protected sign in</span><span>Your account details stay private</span></div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-[#8c7e72]">{isCreatingAccount ? 'Already have an account?' : 'New to PotBhar?'}</span>
            {selected === 'admin' ? (
              <span className="font-semibold text-[#6951b5]">Admin accounts are invite-only</span>
            ) : (
              <button type="button" onClick={() => { setIsCreatingAccount(!isCreatingAccount); setEmail(''); setPassword(''); setError(''); }} className="font-bold text-[#1d5b3b] hover:underline">
                {isCreatingAccount ? 'Sign in instead' : 'Create an account'}
              </button>
            )}
          </div>
          <p className="mt-2 text-[10px] leading-4 text-[#a3978d]">Donor accounts are created directly. Recipient registration requires an institution ID.</p>
        </div>
      </section>
    </div>
  );
}
