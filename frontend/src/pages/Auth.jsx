import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/ui/Components'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const loginAsPersona = async (role) => {
    const creds = {
      DONOR: { email: 'donor@potbhar.demo', password: 'demo123' },
      ASSESSOR: { email: 'assessor@potbhar.demo', password: 'demo123' },
      RECIPIENT: { email: 'recipient@potbhar.demo', password: 'demo123' },
      LOGISTICS: { email: 'delivery@potbhar.demo', password: 'demo123' },
      PROCESSOR: { email: 'processor@potbhar.demo', password: 'demo123' },
      ADMIN: { email: 'admin@potbhar.demo', password: 'demo123' },
    }
    const c = creds[role]
    if (!c) return
    setForm(c)
    setLoading(true)
    setError('')
    try {
      await login(c.email, c.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (role) => {
    const creds = {
      DONOR: { email: 'donor@potbhar.demo', password: 'demo123' },
      ASSESSOR: { email: 'assessor@potbhar.demo', password: 'demo123' },
      RECIPIENT: { email: 'recipient@potbhar.demo', password: 'demo123' },
      LOGISTICS: { email: 'delivery@potbhar.demo', password: 'demo123' },
      PROCESSOR: { email: 'processor@potbhar.demo', password: 'demo123' },
      ADMIN: { email: 'admin@potbhar.demo', password: 'demo123' },
    }
    setForm(creds[role])
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up">
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-3 mb-6 justify-center group">
          <div className="w-12 h-12 bg-white rounded-2xl border border-[#EDE5D8] flex items-center justify-center p-1 shadow-md group-hover:scale-105 transition-transform">
            <img src="/assets/img/potbhar-logo.png" alt="POTBHAR logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#1F1A17] tracking-tight">POTBHAR</div>
            <div className="text-xs font-semibold text-[#F58220]">Surplus to Smiles • पोटभर</div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#EDE5D8] p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#1F1A17] mb-1">Separate Persona Login</h2>
          <p className="text-[#594D46] text-sm mb-6">Select your individual persona for a neat, tailored interface</p>

          {/* Dedicated Persona Login Grid */}
          <div className="mb-6 p-4 rounded-2xl bg-[#FFF4EA] border border-[#F58220]/25">
            <p className="text-xs font-black text-[#D66C12] uppercase tracking-wider mb-3">
              ⚡ 1-Click Instant Persona Sign-In:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { r: 'DONOR', label: '🍲 Food Donor', desc: 'Banquet & Hotel Caterer' },
                { r: 'ASSESSOR', label: '🔬 Quality Checker', desc: 'FreshGuard Food Safety' },
                { r: 'RECIPIENT', label: '🏠 Shelter / NGO', desc: 'Orphanage & Care Home' },
                { r: 'LOGISTICS', label: '🛵 Delivery Rider', desc: 'Transit Fleet Hero' },
                { r: 'PROCESSOR', label: '🐄 Gaushala / Compost', desc: 'Zero-Landfill Circular' },
                { r: 'ADMIN', label: '⚙️ Operations Admin', desc: 'System Oversight' },
              ].map(({ r, label, desc }) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => loginAsPersona(r)}
                  disabled={loading}
                  className="text-left p-2.5 rounded-xl bg-white hover:bg-[#F58220] hover:text-white text-[#1F1A17] border border-[#EDE5D8] transition-all group shadow-2xs hover:shadow-sm"
                >
                  <div className="text-xs font-extrabold">{label}</div>
                  <div className="text-[10px] text-[#594D46] group-hover:text-white/90">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handle} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#1C2424] block mb-1.5">Email Address</label>
              <input
                className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-4 py-2.5 text-sm text-[#1C2424] placeholder-slate-400 focus:outline-none focus:border-[#006B62] focus:ring-1 focus:ring-[#006B62] transition-all"
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1C2424] block mb-1.5">Password</label>
              <input
                className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-4 py-2.5 text-sm text-[#1C2424] placeholder-slate-400 focus:outline-none focus:border-[#006B62] focus:ring-1 focus:ring-[#006B62] transition-all"
                type="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-700 text-xs bg-red-50 border border-red-200 rounded-xl p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary-teal w-full py-3 text-sm font-bold flex items-center justify-center gap-2 mt-2 shadow-md"
            >
              {loading ? <Spinner size="sm" /> : null}
              Sign In to POTBHAR →
            </button>
          </form>

          <p className="text-center text-xs text-[#637473] mt-6">
            New organization?{' '}
            <Link to="/register" className="font-bold text-[#006B62] hover:underline">
              Create an account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const initialRole = params.get('role') || 'DONOR'

  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    role: initialRole,
    phone: '',
    org_name: '',
  })
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
    setLoading(true)
    setError('')
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up">
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-3 mb-6 justify-center group">
          <div className="w-12 h-12 bg-[#006B62] rounded-full flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">
            🍛
          </div>
          <div>
            <div className="text-2xl font-black text-[#006B62] tracking-tight">POTBHAR</div>
            <div className="text-xs font-semibold text-[#D97706]">Every Nivala Matters • पोटभर</div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#EDE5D8] p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#1C2424] mb-1">Join the Food Rescue Network</h2>
          <p className="text-[#637473] text-sm mb-6">
            Step {step} of 2 — {step === 1 ? 'Select your organization role' : 'Account details'}
          </p>

          <form onSubmit={handle} className="space-y-4">
            {step === 1 ? (
              <div className="grid grid-cols-1 gap-3">
                {[
                  { role: 'DONOR', icon: '🍲', title: 'Food Donor', desc: 'Hotels, caterers, banquets reporting surplus food', color: '#006B62' },
                  { role: 'RECIPIENT', icon: '🤝', title: 'Recipient NGO / Shelter', desc: 'Verified food banks, night shelters & orphanages', color: '#D97706' },
                  { role: 'ASSESSOR', icon: '🔬', title: 'Food Safety Assessor', desc: 'Certified safety specialist conducting quality audits', color: '#7C3AED' },
                  { role: 'PROCESSOR', icon: '♻️', title: 'Waste & Biogas Processor', desc: 'Composting and bio-methanation processing facility', color: '#0284C7' },
                ].map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, role: r.role }))}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
                      form.role === r.role
                        ? 'border-[#006B62] bg-[#E6F4F1] shadow-sm'
                        : 'border-[#EDE5D8] bg-[#FAF7F2] hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-[#1C2424]">{r.title}</div>
                      <div className="text-xs text-[#637473] mt-0.5">{r.desc}</div>
                    </div>
                    {form.role === r.role && (
                      <div className="w-6 h-6 rounded-full bg-[#006B62] text-white flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div>
                  <label className="text-xs font-bold text-[#1C2424] block mb-1">Full Name</label>
                  <input
                    className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-4 py-2.5 text-sm text-[#1C2424] placeholder-slate-400 focus:outline-none focus:border-[#006B62] focus:ring-1 focus:ring-[#006B62] transition-all"
                    value={form.full_name}
                    onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
                    placeholder="E.g. Priya Deshmukh"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1C2424] block mb-1">Organization / Enterprise Name</label>
                  <input
                    className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-4 py-2.5 text-sm text-[#1C2424] placeholder-slate-400 focus:outline-none focus:border-[#006B62] focus:ring-1 focus:ring-[#006B62] transition-all"
                    value={form.org_name}
                    onChange={(e) => setForm((p) => ({ ...p, org_name: e.target.value }))}
                    placeholder="E.g. Green Feast Caterers"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1C2424] block mb-1">Email Address</label>
                  <input
                    className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-4 py-2.5 text-sm text-[#1C2424] placeholder-slate-400 focus:outline-none focus:border-[#006B62] focus:ring-1 focus:ring-[#006B62] transition-all"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="contact@enterprise.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1C2424] block mb-1">Password</label>
                  <input
                    className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-4 py-2.5 text-sm text-[#1C2424] placeholder-slate-400 focus:outline-none focus:border-[#006B62] focus:ring-1 focus:ring-[#006B62] transition-all"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    placeholder="Min 8 characters"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1C2424] block mb-1">Contact Phone</label>
                  <input
                    className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-4 py-2.5 text-sm text-[#1C2424] placeholder-slate-400 focus:outline-none focus:border-[#006B62] focus:ring-1 focus:ring-[#006B62] transition-all"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 98200 XXXXX"
                  />
                </div>
              </>
            )}

            {error && (
              <div className="text-red-700 text-xs bg-red-50 border border-red-200 rounded-xl p-3">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline-teal flex-1 py-2.5 text-xs font-semibold"
                >
                  ← Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary-teal flex-1 py-3 text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                {loading ? <Spinner size="sm" /> : null}
                {step === 1 ? 'Continue to Details →' : 'Complete Registration →'}
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-[#637473] mt-6">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-[#006B62] hover:underline">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
