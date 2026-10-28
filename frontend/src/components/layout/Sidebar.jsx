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
  ADMIN: [
    { to: '/dashboard', icon: '🏠', label: 'Admin Dashboard' },
    { to: '/admin', icon: '⚙️', label: 'Platform Governance' },
    { to: '/assessment-queue', icon: '🔬', label: 'Assessments' },
    { to: '/analytics', icon: '📊', label: 'ESG & City Impact' },
  ],
  PROCESSOR: [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { to: '/waste', icon: '♻️', label: 'Waste Batches' },
    { to: '/analytics', icon: '📊', label: 'Biogas Yield' },
  ],
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const links = NAV[user?.role] || NAV.DONOR

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
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
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

      {/* User Info & Sign Out Footer */}
      <div className="p-4 border-t border-[#EDE5D8] bg-[#FAF7F2]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-[#E6F4F1] border border-[#B0DCD7] text-[#006B62] rounded-full flex items-center justify-center text-sm font-extrabold shadow-sm">
            {user?.full_name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#1C2424] truncate">{user?.full_name}</div>
            <span className="inline-block px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#FEF3E2] text-[#D97706] mt-0.5">
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
