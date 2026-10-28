import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV = {
  DONOR: [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { to: '/batches/new', icon: '➕', label: 'Report Surplus Food' },
    { to: '/scanner', icon: '🔬', label: 'FreshGuard Scanner' },
    { to: '/waste', icon: '♻️', label: 'Organic Waste' },
    { to: '/analytics', icon: '📊', label: 'Impact Analytics' },
  ],
  RECIPIENT: [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { to: '/food-offers', icon: '🍱', label: 'Food Offers' },
    { to: '/requirements', icon: '📋', label: 'My Requirements' },
    { to: '/analytics', icon: '📊', label: 'Impact Analytics' },
  ],
  ASSESSOR: [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { to: '/assessment-queue', icon: '🔬', label: 'Assessment Queue' },
    { to: '/analytics', icon: '📊', label: 'Safety Analytics' },
  ],
  LOGISTICS: [
    { to: '/dashboard', icon: '🏠', label: 'Rider Dashboard' },
    { to: '/deliveries', icon: '🚚', label: 'Delivery Dispatches' },
    { to: '/analytics', icon: '📊', label: 'Fleet Impact' },
  ],
  ADMIN: [
    { to: '/dashboard', icon: '🏠', label: 'Admin Dashboard' },
    { to: '/deliveries', icon: '🚚', label: 'Delivery Radar' },
    { to: '/assessment-queue', icon: '🔬', label: 'Assessments' },
    { to: '/admin', icon: '⚙️', label: 'Platform Governance' },
    { to: '/analytics', icon: '📊', label: 'ESG & City Impact' },
  ],
  PROCESSOR: [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { to: '/waste', icon: '♻️', label: 'Waste Batches' },
    { to: '/analytics', icon: '📊', label: 'Biogas Yield' },
  ],
}

export default function Sidebar() {
  const { user, logout, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const links = NAV[user?.role] || NAV.DONOR

  const DEMO_PERSONAS = [
    { role: 'DONOR', email: 'donor@potbhar.demo', label: '🍲 Donor', path: '/batches/new' },
    { role: 'ASSESSOR', email: 'assessor@potbhar.demo', label: '🔬 Checker', path: '/assessment-queue' },
    { role: 'RECIPIENT', email: 'recipient@potbhar.demo', label: '🍱 Recipient', path: '/food-offers' },
    { role: 'LOGISTICS', email: 'delivery@potbhar.demo', label: '🚚 Rider', path: '/deliveries' },
  ]

  const switchPersona = async (p) => {
    try {
      await login(p.email, 'demo123')
      navigate(p.path)
    } catch (e) {
      console.error('Failed to switch persona:', e)
    }
  }

  return (
    <aside className="w-64 min-h-screen bg-white flex flex-col border-r border-[#EDE5D8] fixed left-0 top-0 bottom-0 z-40 shadow-sm">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-3 px-6 py-5 border-b border-[#EDE5D8] group">
        <div className="w-10 h-10 rounded-full bg-[#006B62] flex items-center justify-center text-white text-xl shadow-md group-hover:scale-105 transition-transform">
          🍛
        </div>
        <div>
          <div className="font-extrabold text-lg text-[#006B62] leading-none tracking-tight">POTBHAR</div>
          <div className="text-[10px] font-semibold text-[#D97706] mt-1">Har Pet Bhare • पोटभर</div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#9BA8A7]">
          Navigation
        </div>
        {links.map(({ to, icon, label }) => {
          const active = location.pathname === to || location.pathname.startsWith(to + '/')
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                active
                  ? 'bg-[#E6F4F1] text-[#006B62] border border-[#B0DCD7] shadow-sm'
                  : 'text-[#475454] hover:text-[#006B62] hover:bg-[#FAF7F2]'
              }`}
            >
              <span className="text-base">{icon}</span>
              <span className="truncate">{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#006B62]" />}
            </Link>
          )
        })}
      </nav>

      {/* Quick Role Switcher for live testing */}
      <div className="p-3 border-t border-[#EDE5D8] bg-[#FFFBF5]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] mb-2 px-1 flex items-center justify-between">
          <span>⚡ Quick Switch Persona</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {DEMO_PERSONAS.map((p) => {
            const isCurrent = user?.role === p.role
            return (
              <button
                key={p.role}
                onClick={() => switchPersona(p)}
                className={`text-[11px] font-bold py-1.5 px-2 rounded-xl text-left truncate transition-all ${
                  isCurrent
                    ? 'bg-[#006B62] text-white shadow-sm ring-1 ring-[#006B62]'
                    : 'bg-white border border-[#EDE5D8] text-[#1C2424] hover:border-[#D97706] hover:bg-[#FFFDF9]'
                }`}
                title={`Switch to ${p.label}`}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* User Info & Sign Out Footer */}
      <div className="p-3.5 border-t border-[#EDE5D8] bg-[#FAF7F2]">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 bg-[#E6F4F1] border border-[#B0DCD7] text-[#006B62] rounded-full flex items-center justify-center text-xs font-extrabold shadow-sm">
            {user?.full_name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#1C2424] truncate">{user?.full_name}</div>
            <span className="inline-block px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FEF3E2] text-[#D97706]">
              {user?.role}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="w-full text-xs font-semibold text-[#637473] hover:text-rose-600 transition-colors text-left px-1 flex items-center justify-between"
        >
          <span>Sign out</span>
          <span>→</span>
        </button>
      </div>
    </aside>
  )
}
