import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ==========================================
// IMAGE WITH FALLBACK HELPER
// ==========================================
function ImageWithFallback({ src, fallbackSrc, alt, className, style, overlayIcon, overlayLabel }) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setCurrentSrc(src)
    setHasError(false)
    setLoaded(false)
  }, [src])

  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(true)
    } else {
      setHasError(true)
    }
  }

  if (hasError && !fallbackSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-surface-container text-on-surface-variant p-4 text-center ${className}`} style={style}>
        {overlayIcon && <span className="material-symbols-outlined text-4xl mb-2 text-primary">{overlayIcon}</span>}
        <span className="text-xs font-semibold">{overlayLabel || alt}</span>
      </div>
    )
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-90'} transition-opacity duration-700`}
      style={style}
      onLoad={() => setLoaded(true)}
      onError={handleError}
      loading="lazy"
    />
  )
}

// ==========================================
// CONSTANTS & INITIAL DATA
// ==========================================
const REALITIES = [
  {
    badgeTitle: 'The Daily Reality · Hunger in Our Cities',
    badgeDotClass: 'bg-error',
    badgeProvClass: 'data-badge-verified',
    badgeProvText: 'VERIFIED DATA',
    heading: 'Tonight, somewhere, a plate is empty.',
    headingColor: 'text-white',
    body: 'In community settlements across our cities, mothers turn out the lights early so hunger hurts a little less in the dark. Silence settles on bare floorboards.',
    cursorColor: 'text-error',
    bgPlateOpacity: 1,
    bgBanquetOpacity: 0
  },
  {
    badgeTitle: 'Midnight Excess · Banquet Food in the Bin',
    badgeDotClass: 'bg-tertiary-container',
    badgeProvClass: 'data-badge-estimate',
    badgeProvText: 'FOOD WASTE',
    heading: '...and somewhere else, a tray is going in the bin.',
    headingColor: 'text-[#ffdcc3]',
    body: 'At 23:45 outside grand banquet halls, four-tier copper chafing dishes brimming with paneer handi, biryani, and gulab jamun are quietly tipped into 60-liter black plastic garbage bags. Cooked with pride three hours ago. Destined for toxic landfills before dawn.',
    cursorColor: 'text-[#FF9F1C]',
    bgPlateOpacity: 0,
    bgBanquetOpacity: 1
  }
]

const WARMTH_STAGES = [
  { min: 0.0, max: 0.15, label: 'Cold Hunger', color: '#1B2430' },
  { min: 0.16, max: 0.35, label: 'Midnight Excess', color: '#6B4E2E' },
  { min: 0.36, max: 0.55, label: 'Paradox Gap', color: '#824500' },
  { min: 0.56, max: 0.75, label: 'The Pot Awakes', color: '#F2A900' },
  { min: 0.76, max: 0.90, label: 'System Trust', color: '#E28500' },
  { min: 0.91, max: 1.0, label: 'Golden Nourishment', color: '#FF9F1C' }
]

const INITIAL_DISPATCH_EVENTS = [
  {
    van: 'Van #04 (Indiranagar)',
    desc: '→ 65kg hot surplus collected from Hotel Grand Sapphire',
    status: '68.2°C PASS',
    statusClass: 'text-secondary-fixed',
    time: '1 min ago',
    dot: '🟢'
  },
  {
    van: 'Van #11 (Dharavi Hub)',
    desc: '→ 180 portions delivered & verified at Sneha Sadan Shelter',
    status: 'INTAKE VERIFIED',
    statusClass: 'text-green-400',
    time: '4 mins ago',
    dot: '🟢'
  },
  {
    van: 'Van #07 (BKC Mumbai)',
    desc: '→ En route to Convention Center 800-guest wedding banquet',
    status: 'ETA 5 MINS',
    statusClass: 'text-amber-300',
    time: 'Live GPS',
    dot: '🟡'
  }
]

const CYCLER_EVENTS = [
  {
    van: 'Van #02 (Bandra West)',
    desc: '→ 80kg biryani & dessert rescued from Grand Sea Palace Banquet',
    status: '66.5°C PASS',
    statusClass: 'text-secondary-fixed',
    time: 'Just Now',
    dot: '🟢'
  },
  {
    van: 'Van #09 (Whitefield Hub)',
    desc: '→ 220 portions delivered to St. Joseph Night Care Shelter',
    status: 'INTAKE VERIFIED',
    statusClass: 'text-green-400',
    time: '2 mins ago',
    dot: '🟢'
  },
  {
    van: 'Van #14 (Salt Lake City)',
    desc: '→ FSSAI Thermal & visual screening approved at ITC Sonar Kitchen',
    status: '71.0°C SEALED',
    statusClass: 'text-secondary-fixed',
    time: '3 mins ago',
    dot: '🟢'
  },
  {
    van: 'Van #05 (Connaught Place)',
    desc: '→ Dispatched for late-night corporate banquet surplus (120kg)',
    status: 'IN TRANSIT',
    statusClass: 'text-amber-300',
    time: 'Live GPS',
    dot: '🟡'
  }
]

// ==========================================
// ATMOSPHERIC STEAM PARTICLES
// ==========================================
function AtmosphericSteam() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      <svg className="steam-plume" fill="none" viewBox="0 0 160 260" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 240 C55 190, 85 150, 65 110 C48 78, 80 40, 68 15 C60 2, 90 0, 95 0 C82 35, 108 70, 90 110 C75 145, 105 185, 88 240 Z" fill="url(#steam-grad-a)" />
        <path d="M85 240 C100 180, 65 140, 85 95 C100 65, 75 30, 85 5 C95 18, 115 50, 98 90 C85 130, 115 170, 98 240 Z" fill="url(#steam-grad-b)" opacity="0.6" />
        <defs>
          <linearGradient id="steam-grad-a" x1="0%" x2="0%" y1="100%" y2="0%">
            <stop offset="0%" stopColor="#fff8eb" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#ffe9c7" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="steam-grad-b" x1="0%" x2="0%" y1="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#fed7aa" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="steam-particle steam-wisp-1" />
      <div className="steam-particle steam-wisp-2" />
      <div className="steam-particle steam-wisp-3" />
      <div className="steam-particle steam-wisp-4" />
      <div className="steam-particle steam-wisp-5" />
    </div>
  )
}

// ==========================================
// MAIN LANDING COMPONENT
// ==========================================
export default function Landing() {
  const { user, login, logout } = useAuth() || {}

  // Narrative Warmth Track
  const [warmth, setWarmth] = useState(0.0)
  const [currentStage, setCurrentStage] = useState(WARMTH_STAGES[0])

  // Realities Typewriter State
  const [realityIdx, setRealityIdx] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [typedHeading, setTypedHeading] = useState('')
  const [typedBody, setTypedBody] = useState('')
  const [headingCursorVisible, setHeadingCursorVisible] = useState(true)
  const [bodyCursorVisible, setBodyCursorVisible] = useState(false)

  // Beat 2 Overflow State
  const overflowHeading = '...and somewhere else, a tray is going in the bin.'
  const overflowBody = 'At 23:45 outside grand banquet halls, four-tier copper chafing dishes brimming with paneer handi, biryani, and gulab jamun are quietly tipped into 60-liter black plastic garbage bags. Cooked with pride three hours ago. Destined for toxic landfills before dawn.'

  // Live Crisis Accumulator
  const [sessionSeconds, setSessionSeconds] = useState(0)
  const [liveKg, setLiveKg] = useState(0)
  const [liveMeals, setLiveMeals] = useState(0)
  const [liveInr, setLiveInr] = useState(0)
  const [liveCo2, setLiveCo2] = useState(0)

  // Live Dispatch Radar Feed
  const [dispatchFeed, setDispatchFeed] = useState(INITIAL_DISPATCH_EVENTS)
  const [activeTransits, setActiveTransits] = useState(18)

  // Interactive Impact Calculator Form
  const [calcDonors, setCalcDonors] = useState(45)
  const [calcKg, setCalcKg] = useState(85)
  const [calcCompliance, setCalcCompliance] = useState(0.75)

  // Modals & Navigation Dropdowns
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState('login')
  const [roleWorkspaceOpen, setRoleWorkspaceOpen] = useState(false)
  const [workspaceRole, setWorkspaceRole] = useState('donor')

  // Auth Modal form state
  const [authEmail, setAuthEmail] = useState('chef@grandsapphire.com')
  const [authPassword, setAuthPassword] = useState('demo1234')

  // Role Workspace: Donor Batch Form State
  const [donorFoodCategory, setDonorFoodCategory] = useState('Cooked Rice / Biryani / Pulav')
  const [donorWeight, setDonorWeight] = useState(65)
  const [donorTemp, setDonorTemp] = useState(64.5)
  const [donorTime, setDonorTime] = useState('23:15')
  const [donorBatches, setDonorBatches] = useState([
    {
      id: '#MH-4019',
      status: 'DISPATCHED',
      details: '120 kg Basmati Pulav + Dal Makhani',
      temp: '64.2°C',
      note: 'En route to Asha Sadan (12 min away)',
      badgeType: 'verified'
    },
    {
      id: '#MH-4012',
      status: 'DELIVERED',
      details: '85 kg Paneer Gravy + 200 Rotis',
      temp: '62.0°C',
      note: '100% Satiety Logged (210 beneficiaries)',
      badgeType: 'verified'
    }
  ])

  // Role Workspace: Recipient Incoming Matches
  const [recipientMatches, setRecipientMatches] = useState([
    {
      id: 'MH-4022',
      score: '92%',
      title: '65 kg Hot Dal & Jeera Rice',
      donor: 'From Grand Sapphire Banquet Hall (3.2 km distance). Core temperature certified at 64.8°C.',
      portions: '~160 Nourishing Servings',
      eta: '18 mins',
      holding: '105 mins remaining',
      status: 'PENDING'
    },
    {
      id: 'MH-4024',
      score: '84%',
      title: '40 kg Mixed Vegetable Pulav',
      donor: 'From Taj Santacruz Executive Dining. Sealed hot cambros, inspected by Assessor Anand.',
      portions: '~100 Servings',
      eta: '24 mins',
      holding: '120 mins remaining',
      status: 'PENDING'
    },
    {
      id: 'MH-4029',
      score: 'COLD CHAIN ONLY',
      title: '35 kg Dairy Desserts & Yogurt',
      donor: 'Requires continuous <4°C chilling. Filter flagged: shelter has no active refrigeration.',
      compatibility: 'Cold Storage Missing',
      rerouted: 'To Navjeevan Seva',
      status: 'REROUTED'
    }
  ])

  // Role Workspace: Admin / Ops Queue
  const [adminQueue, setAdminQueue] = useState([
    {
      id: '#MH-4031',
      kitchen: 'Grand Sapphire Banquets',
      typeWeight: 'Paneer & Pulao (90 kg)',
      temp: '63.4°C',
      tempPass: true,
      quality: 'FRESH & CLEAN',
      decision: 'PENDING'
    },
    {
      id: '#MH-4032',
      kitchen: 'Mayfair Ballroom Worli',
      typeWeight: 'Mixed Gravy (45 kg)',
      temp: '54.2°C (Below 60°C)',
      tempPass: false,
      quality: 'THERMAL BREACH',
      decision: 'PENDING'
    }
  ])

  // Toast notifications
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  // ----------------------------------------------------
  // NARRATIVE WARMTH SCROLL OBSERVER
  // ----------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const scrollPos = window.scrollY
      const progress = Math.min(Math.max(scrollPos / (docHeight * 0.85), 0), 1)
      setWarmth(progress)
      document.documentElement.style.setProperty('--warmth', progress)

      const stage = WARMTH_STAGES.find(s => progress >= s.min && progress <= s.max) || WARMTH_STAGES[WARMTH_STAGES.length - 1]
      setCurrentStage(stage)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ----------------------------------------------------
  // TYPEWRITER EFFECT FOR HERO REALITIES
  // ----------------------------------------------------
  useEffect(() => {
    let timeouts = []
    const r = REALITIES[realityIdx]

    setTypedHeading('')
    setTypedBody('')
    setHeadingCursorVisible(true)
    setBodyCursorVisible(false)

    let hIdx = 0
    function typeHeading() {
      if (hIdx < r.heading.length) {
        hIdx++
        setTypedHeading(r.heading.slice(0, hIdx))
        const ch = r.heading.charAt(hIdx - 1)
        let delay = 34
        if (ch === ',' || ch === '.') delay += 70
        const t = setTimeout(typeHeading, delay)
        timeouts.push(t)
      } else {
        const t1 = setTimeout(() => {
          setHeadingCursorVisible(false)
          setBodyCursorVisible(true)
          let bIdx = 0
          function typeBody() {
            if (bIdx < r.body.length) {
              bIdx++
              setTypedBody(r.body.slice(0, bIdx))
              const ch = r.body.charAt(bIdx - 1)
              let delay = 14
              if (ch === '.' || ch === ',') delay += 60
              const t2 = setTimeout(typeBody, delay)
              timeouts.push(t2)
            } else {
              if (isAutoplay) {
                const t3 = setTimeout(() => {
                  setRealityIdx(prev => (prev + 1) % REALITIES.length)
                }, 5200)
                timeouts.push(t3)
              }
            }
          }
          typeBody()
        }, 260)
        timeouts.push(t1)
      }
    }

    typeHeading()

    return () => {
      timeouts.forEach(t => clearTimeout(t))
    }
  }, [realityIdx, isAutoplay])

  // ----------------------------------------------------
  // CRISIS IMPACT ACCUMULATOR TICKER
  // ----------------------------------------------------
  useEffect(() => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsedSec = (Date.now() - startTime) / 1000
      setSessionSeconds(Math.floor(elapsedSec))
      // 68M tonnes/yr in India = ~2,156.4 kg/sec
      const kg = Math.floor(elapsedSec * 2156.4)
      setLiveKg(kg)
      setLiveMeals(Math.floor(kg / 0.4))
      // ₹89,000 Cr/yr = ~₹28,220/sec
      setLiveInr(Math.floor(elapsedSec * 28220))
      // 1.9 kg CO2e per kg food waste in open landfill
      setLiveCo2(Math.floor(kg * 1.9))
    }, 250)

    return () => clearInterval(timer)
  }, [])

  // ----------------------------------------------------
  // LIVE RADAR CYCLER
  // ----------------------------------------------------
  useEffect(() => {
    let cyclerIdx = 0
    const interval = setInterval(() => {
      const ev = CYCLER_EVENTS[cyclerIdx % CYCLER_EVENTS.length]
      cyclerIdx++
      setActiveTransits(17 + Math.floor(Math.random() * 6))
      setDispatchFeed(prev => [ev, ...prev.slice(0, 2)])
    }, 5500)

    return () => clearInterval(interval)
  }, [])

  // ----------------------------------------------------
  // FORMATTING HELPERS
  // ----------------------------------------------------
  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Calculator Outputs
  const calcWeeklyHumanKg = Math.round(calcDonors * calcKg * calcCompliance)
  const calcWeeklyMeals = Math.round(calcWeeklyHumanKg / 0.4)
  const calcDivertedKg = Math.round(calcDonors * calcKg * (1 - calcCompliance))
  const calcAnimalKg = Math.round(calcDivertedKg * 0.6)
  const calcCompostKg = Math.round(calcDivertedKg * 0.4)
  const calcCo2Prevented = Math.round((calcWeeklyHumanKg + calcDivertedKg) * 1.9)

  // ----------------------------------------------------
  // USER ACTIONS & DEMO ROLES
  // ----------------------------------------------------
  const loginAsDemo = async (role) => {
    setDemoDropdownOpen(false)
    let email = 'donor@potbhar.demo'
    let displayName = 'Grand Sapphire Banquets'
    if (role === 'recipient') {
      email = 'recipient@potbhar.demo'
      displayName = 'Asha Kiran Shelter'
    } else if (role === 'admin') {
      email = 'assessor@potbhar.demo'
      displayName = 'FSSAI Central Ops'
    }

    try {
      if (login) {
        await login(email, 'demo123')
      }
    } catch {
      localStorage.setItem('potbhar_user', JSON.stringify({
        email,
        full_name: displayName,
        role: role.toUpperCase()
      }))
    }
    showToast(`Logged in as ${displayName} (${role.toUpperCase()})`, 'success')
  }

  const handleLogout = () => {
    if (logout) logout()
    showToast('Signed out of session', 'info')
  }

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    try {
      if (login) {
        await login(authEmail, authPassword)
        showToast('Signed in successfully!', 'success')
      }
    } catch {
      showToast('Demo sign-in accepted (offline mode)', 'success')
    }
    setAuthModalOpen(false)
  }

  const openWorkspace = (role = 'donor') => {
    setWorkspaceRole(role)
    setRoleWorkspaceOpen(true)
  }

  const handleBatchSubmit = (e) => {
    e.preventDefault()
    const newBatch = {
      id: `#MH-${Math.floor(4030 + Math.random() * 70)}`,
      status: 'DISPATCHED',
      details: `${donorWeight} kg ${donorFoodCategory}`,
      temp: `${donorTemp}°C`,
      note: 'Insulated van dispatched (ETA 18 mins)',
      badgeType: 'live'
    }
    setDonorBatches([newBatch, ...donorBatches])
    showToast(`Batch ${newBatch.id} logged! Insulated van dispatched.`, 'success')
  }

  const handleAcceptBatch = (id) => {
    setRecipientMatches(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'ACCEPTED' } : item)
    )
    showToast(`Batch #${id} accepted! Receiving station alert sent.`, 'success')
  }

  const handleDeclineBatch = (id) => {
    setRecipientMatches(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'DECLINED' } : item)
    )
    showToast(`Batch #${id} declined. Rerouted to alternate shelter.`, 'info')
  }

  const handleAdminApprove = (id) => {
    setAdminQueue(prev =>
      prev.map(item => item.id === id ? { ...item, decision: 'APPROVED_FOR_HUMANS' } : item)
    )
    showToast(`Batch ${id} Approved for immediate Human Meal dispatch!`, 'success')
  }

  const handleAdminDivert = (id) => {
    setAdminQueue(prev =>
      prev.map(item => item.id === id ? { ...item, decision: 'DIVERTED_TO_ANIMALS_KHAAD' } : item)
    )
    showToast(`Batch ${id} safely routed to Gaushalas & Organic Khaad.`, 'info')
  }

  const r = REALITIES[realityIdx]

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary relative">
      {/* Ambient dynamic background warmth glow overlay */}
      <div aria-hidden="true" className="ambient-warmth-glow" />

      {/* ================================================================ */}
      {/* TOP NAVIGATION BAR — Dark Theme matching Hero                   */}
      {/* ================================================================ */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: 'rgba(11,17,28,0.92)',
          backdropFilter: 'blur(28px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 1px 0 rgba(0,229,197,0.07), 0 8px 48px rgba(0,0,0,0.5)',
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center h-[64px]" style={{ gap: 0 }}>

          {/* ── Brand Anchor ── */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0, marginRight: '20px' }}
          >
            <div
              style={{
                width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                background: 'linear-gradient(135deg, #00e5c5 0%, #007a6e 100%)',
                boxShadow: '0 0 18px rgba(0,229,197,0.4), 0 2px 8px rgba(0,0,0,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(0,229,197,0.65), 0 4px 12px rgba(0,0,0,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,229,197,0.4), 0 2px 8px rgba(0,0,0,0.4)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#0a1612', fontVariationSettings: "'FILL' 1", lineHeight: 1 }}>soup_kitchen</span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontSize: '14.5px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.025em', lineHeight: 1 }}>POTBHAR</div>
              <div style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(0,229,197,0.55)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '4px', lineHeight: 1 }}>Surplus Recovery</div>
            </div>
          </Link>

          {/* ── Separator ── */}
          <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.08)', flexShrink: 0, marginRight: '16px' }} />

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden md:flex items-center" style={{ gap: '2px', flex: 1, minWidth: 0 }}>
            {[
              { label: 'The Crisis',       href: '#impact' },
              { label: 'How It Works',     href: '#how-it-works' },
              { label: 'Food Quality',     href: '#freshguard' },
              { label: 'Two Pathways',     href: '#pathways', active: true },
              { label: 'Impact Simulator', href: '#calculator' },
            ].map(({ label, href, active }) => (
              <a
                key={href}
                href={href}
                data-active={active ? 'true' : undefined}
                style={{
                  position: 'relative', display: 'inline-flex', alignItems: 'center',
                  padding: '5px 11px', borderRadius: '8px',
                  fontSize: '12.5px', fontWeight: active ? 700 : 400,
                  color: active ? '#00e5c5' : 'rgba(255,255,255,0.52)',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  background: active ? 'rgba(0,229,197,0.09)' : 'transparent',
                  border: active ? '1px solid rgba(0,229,197,0.22)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!e.currentTarget.dataset.active) {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  }
                }}
                onMouseLeave={e => {
                  if (!e.currentTarget.dataset.active) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.52)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {label}
                {active && (
                  <span style={{
                    position: 'absolute', bottom: '-1px', left: '11px', right: '11px',
                    height: '2px', borderRadius: '2px',
                    background: 'linear-gradient(90deg, #00e5c5, #00b49a)',
                    boxShadow: '0 0 10px rgba(0,229,197,0.65)',
                  }} />
                )}
              </a>
            ))}
          </nav>

          {/* ── Right Action Cluster ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: 'auto' }}>


            {/* Demo Roles Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                title="Quick Demo User Switcher"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '6px 11px', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '12px', fontWeight: 600,
                  color: 'rgba(255,255,255,0.75)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.11)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,197,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,229,197,0.25)'; e.currentTarget.style.color = '#00e5c5'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.11)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#00c49a', fontVariationSettings: "'FILL' 1", lineHeight: 1 }}>verified_user</span>
                <span className="hidden sm:inline">Demo Roles</span>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', lineHeight: 1, transform: demoDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>expand_more</span>
              </button>

              {demoDropdownOpen && (
                <div
                  style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                    width: '280px', padding: '6px',
                    background: 'rgba(13,22,38,0.98)', backdropFilter: 'blur(24px)',
                    borderRadius: '14px', border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 24px 72px rgba(0,0,0,0.7)',
                    animation: 'dropdownFadeIn 0.18s ease-out', zIndex: 999,
                  }}
                >
                  <div style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', padding: '5px 10px 8px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '4px' }}>
                    Select Persona to Test
                  </div>
                  {[
                    { role: 'donor',     icon: 'soup_kitchen',  name: 'Grand Sapphire Banquets', sub: 'Food Donor · Exec Chef Vikram',       color: '#00c49a' },
                    { role: 'recipient', icon: 'home_work',     name: 'Asha Kiran Shelter',      sub: 'Verified Recipient Hub · Sister Mary', color: '#a78bfa' },
                    { role: 'admin',     icon: 'shield_person', name: 'FSSAI Central Ops',       sub: 'Platform Dispatcher & Compliance',     color: '#f59e0b' },
                  ].map(({ role, icon, name, sub, color }) => (
                    <button
                      key={role}
                      onClick={() => loginAsDemo(role)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '8px 10px', borderRadius: '9px', textAlign: 'left',
                        cursor: 'pointer', background: 'transparent', border: 'none', transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${color}18`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: `${color}20` }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '17px', color, fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{name}</div>
                        <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.38)', marginTop: '1px' }}>{sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth / User Cluster */}
            {user ? (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '4px 10px 4px 4px', borderRadius: '24px',
                background: 'rgba(0,180,154,0.1)', border: '1px solid rgba(0,229,197,0.2)',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #00e5c5, #006B62)',
                  boxShadow: '0 0 12px rgba(0,229,197,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 900, color: '#0d1a18',
                }}>
                  {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ lineHeight: 1.25 }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#fff', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.full_name || user.email}
                  </div>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: '#00c49a', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    {user.role}
                  </div>
                </div>
                <button
                  onClick={handleLogout} title="Sign Out"
                  style={{ padding: '4px', borderRadius: '50%', cursor: 'pointer', background: 'transparent', border: 'none', lineHeight: 0, color: 'rgba(255,255,255,0.3)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ff6b6b'; e.currentTarget.style.background = 'rgba(255,107,107,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
                </button>
              </div>
            ) : (
              <>
                {/* Sign In */}
                <button
                  className="hidden sm:inline-flex"
                  onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true); }}
                  style={{
                    alignItems: 'center', gap: '5px', padding: '6px 13px', borderRadius: '8px',
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    color: 'rgba(255,255,255,0.72)', background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.14)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = ''; }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', lineHeight: 1 }}>login</span>
                  Sign In
                </button>
                {/* Register */}
                <button
                  className="hidden sm:inline-flex"
                  onClick={() => { setAuthModalTab('register'); setAuthModalOpen(true); }}
                  style={{
                    alignItems: 'center', gap: '5px', padding: '6px 13px', borderRadius: '8px',
                    fontSize: '12px', fontWeight: 700, cursor: 'pointer', color: '#fff',
                    background: 'linear-gradient(135deg, #e05a1a 0%, #c04010 100%)',
                    border: '1px solid rgba(255,130,60,0.3)',
                    boxShadow: '0 4px 16px rgba(224,90,26,0.4)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(224,90,26,0.55)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(224,90,26,0.4)'; }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', fontVariationSettings: "'FILL' 1", lineHeight: 1 }}>person_add</span>
                  Register
                </button>
              </>
            )}

            {/* ── Live Portal CTA ── */}
            <button
              className="hidden sm:inline-flex"
              onClick={() => openWorkspace('donor')}
              style={{
                alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: '8px',
                fontSize: '12px', fontWeight: 800, cursor: 'pointer', color: '#0a1612',
                background: 'linear-gradient(135deg, #00e5c5 0%, #009a84 100%)',
                border: '1px solid rgba(0,229,197,0.35)',
                boxShadow: '0 4px 20px rgba(0,229,197,0.35)', transition: 'all 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,229,197,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,229,197,0.35)'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px', fontVariationSettings: "'FILL' 1", lineHeight: 1 }}>bolt</span>
              Live Portal
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ================================================================ */}
        {/* BEAT 1: EMPTY PLATE (Cold Slate, Profound Dignity)               */}
        {/* ================================================================ */}
        <section
          className="relative min-h-[90vh] flex items-center justify-center bg-inverse-surface text-inverse-on-surface overflow-hidden"
          data-warmth="0"
          id="hero"
        >
          {/* Background Crossfade Images with Local + Remote Fallbacks */}
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="/image_0.jpg"
              fallbackSrc="https://lh3.googleusercontent.com/aida/AEtjO1UIMDy0VCHBTwAc9JcGKgk3bH0S9IDqxdtWneT45qNAU-CCK5oPkS6ZKsHvsM84Ez522dAcHZd7zbYidjA2kyTL8RNjTwaDJXxrV4k0t9qIgq-luPQvDDgxeblaTKxn_R-BJKvQGDpCrjPUOd2h6EhQ7UfvJ99B7TRwQ7a6aOU-PjE0uur_UzmPaEPbEDnv1a4nNMZW_qeKnrcEAMupLCdevT64hgI4JF7Q-D-0erW83UeDpKAqkmC17fA0"
              alt="Empty stainless steel thali plate under stark dramatic light"
              className="w-full h-full object-cover object-center filter brightness-50 contrast-125 transition-opacity duration-1000"
              style={{ opacity: r.bgPlateOpacity }}
            />
            <ImageWithFallback
              src="/image_1.jpg"
              fallbackSrc="https://lh3.googleusercontent.com/aida/AEtjO1X-ugvJ7gRvdJeN0OoiieCvoz7qG357p3vF53aRz7Q3rrAI9dWwcojqAXnkcN-WNJDd9k_Yuv7d3OeSm19wn9w4ypLAEehW975G98zT9AI_4IaOMX5_85dMfbBH4pVPoVBe_5FkpFC0vU9ZL3tIKwk6DxcCL9jk6lv9C7vVN3d51xxmoFSvheS6uLgs3iOUbgFRbO6I0yCjwXOccH8Ewnd7rvb1xXBEZ5HZp21uSNGbywKD9eiv-VXXPXol"
              alt="Lavish evening banquet buffet table with untouched curries"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-40 sepia-[0.35] transition-opacity duration-1000"
              style={{ opacity: r.bgBanquetOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/80 to-transparent" />
            <div className="absolute inset-0 bg-[#0c121e]/40 mix-blend-multiply" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto px-margin py-space-xl text-center flex flex-col items-center">
            
            {/* Interactive Reality Switcher Tabs */}
            <div className="flex items-center gap-2 mb-6 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-2xl">
              <button
                onClick={() => { setRealityIdx(0); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                  realityIdx === 0
                    ? 'bg-white/20 text-white shadow-sm ring-1 ring-white/30'
                    : 'text-surface-dim hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-error" />
                <span>Reality 1: The Empty Plate</span>
              </button>
              <button
                onClick={() => { setRealityIdx(1); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                  realityIdx === 1
                    ? 'bg-white/20 text-white shadow-sm ring-1 ring-white/30'
                    : 'text-surface-dim hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-tertiary-container" />
                <span>Reality 2: The Discarded Bin</span>
              </button>
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="p-1.5 rounded-full text-surface-dim hover:text-white hover:bg-white/10 transition-all flex items-center justify-center ml-1 cursor-pointer"
                title={isAutoplay ? 'Pause autoplay' : 'Resume autoplay'}
              >
                <span className="material-symbols-outlined text-sm">
                  {isAutoplay ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            {/* Ground Reality Badge */}
            <div className="inline-flex items-center gap-2 bg-inverse-surface/90 border border-outline/30 px-3 py-1.5 rounded-full mb-6 backdrop-blur-md transition-all duration-300">
              <span className={`w-2 h-2 rounded-full ${r.badgeDotClass} animate-ping`} />
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-inverse-primary">
                {r.badgeTitle}
              </span>
              <span className={`data-badge ${r.badgeProvClass}`}>
                {r.badgeProvText}
              </span>
            </div>

            {/* Typewriter Headline Container */}
            <div className="min-h-[96px] sm:min-h-[84px] md:min-h-[76px] flex items-center justify-center mb-4">
              <h1 className={`font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-extrabold max-w-3xl tracking-tight leading-tight inline whitespace-pre-wrap ${r.headingColor}`}>
                {typedHeading}
              </h1>
              {headingCursorVisible && (
                <span className={`typewriter-cursor ${r.cursorColor}`} />
              )}
            </div>

            {/* Typewriter Body Container */}
            <div className="min-h-[110px] sm:min-h-[85px] md:min-h-[72px] flex items-start justify-center max-w-2xl mx-auto mb-10">
              <p className="font-body-xl text-body-xl text-surface-dim leading-relaxed font-light inline whitespace-pre-wrap">
                {typedBody}
              </p>
              {bodyCursorVisible && (
                <span className={`typewriter-cursor ${r.cursorColor}`} />
              )}
            </div>

            {/* Context Micro Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl bg-surface-container-lowest/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-left">
              <div>
                <span className="block font-label-sm text-label-sm text-surface-dim uppercase">Daily Deficit</span>
                <span className="font-headline-md text-headline-md text-white font-bold">190.7M</span>
                <span className="block text-[11px] text-surface-dim/80">undernourished people in India</span>
              </div>
              <div>
                <span className="block font-label-sm text-label-sm text-surface-dim uppercase">Unmet Need</span>
                <span className="font-headline-md text-headline-md text-white font-bold">38.4%</span>
                <span className="block text-[11px] text-surface-dim/80">children under 5 stunted (NFHS-5)</span>
              </div>
              <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4">
                <span className="block font-label-sm text-label-sm text-surface-dim uppercase">Emergency Status</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="material-symbols-outlined text-error text-lg animate-pulse">crisis_alert</span>
                  <span className="font-label-lg text-label-lg text-white font-bold">Active Deficit</span>
                </div>
                <span className="block text-[11px] text-surface-dim/80">every evening at 21:00 IST</span>
              </div>
            </div>

            {/* LIVE CRISIS ACCUMULATOR */}
            <div className="w-full max-w-3xl mt-6 bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error" />
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider text-red-400 uppercase">
                    NATIONAL CRISIS ACCUMULATOR · LIVE TELEMETRY
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-surface-dim">
                  <span>Duration on screen:</span>
                  <span className="text-white font-bold bg-white/10 px-2.5 py-0.5 rounded border border-white/10">
                    {formatTimer(sessionSeconds)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] font-mono text-surface-dim uppercase tracking-wider flex items-center justify-between">
                    <span>Food Dumped</span>
                    <span className="material-symbols-outlined text-[13px] text-error">delete_forever</span>
                  </div>
                  <div className="font-mono text-lg sm:text-xl md:text-2xl font-black text-white mt-1">
                    {liveKg.toLocaleString()} <span className="text-xs text-red-400 font-normal">kg</span>
                  </div>
                  <div className="text-[9px] font-mono text-surface-dim/70 mt-1">+2,156 kg / sec nationwide</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] font-mono text-surface-dim uppercase tracking-wider flex items-center justify-between">
                    <span>Meals Wasted</span>
                    <span className="material-symbols-outlined text-[13px] text-tertiary-fixed">group_off</span>
                  </div>
                  <div className="font-mono text-lg sm:text-xl md:text-2xl font-black text-[#ffdcc3] mt-1">
                    {liveMeals.toLocaleString()}
                  </div>
                  <div className="text-[9px] font-mono text-surface-dim/70 mt-1">400g safe portion each</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] font-mono text-surface-dim uppercase tracking-wider flex items-center justify-between">
                    <span>Economic Loss</span>
                    <span className="material-symbols-outlined text-[13px] text-amber-400">payments</span>
                  </div>
                  <div className="font-mono text-lg sm:text-xl md:text-2xl font-black text-amber-300 mt-1">
                    ₹{liveInr.toLocaleString()}
                  </div>
                  <div className="text-[9px] font-mono text-surface-dim/70 mt-1">₹28,220 lost every second</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] font-mono text-surface-dim uppercase tracking-wider flex items-center justify-between">
                    <span>CO₂e Methane</span>
                    <span className="material-symbols-outlined text-[13px] text-error">cloud</span>
                  </div>
                  <div className="font-mono text-lg sm:text-xl md:text-2xl font-black text-error mt-1">
                    {liveCo2.toLocaleString()} <span className="text-xs text-error/70 font-normal">kg</span>
                  </div>
                  <div className="text-[9px] font-mono text-surface-dim/70 mt-1">Untreated landfill rot</div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-surface-dim">
                <div className="flex items-center gap-1.5 text-error">
                  <span className="material-symbols-outlined text-xs">crisis_alert</span>
                  <span className="font-medium">Every passing second on this screen = hundreds of freshly cooked meals discarded.</span>
                </div>
                <span className="text-[10px] text-surface-dim/60 font-mono hidden md:inline">
                  Source: UNEP & FSSAI National Audits
                </span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <a className="mt-14 inline-flex flex-col items-center gap-2 text-surface-dim hover:text-white transition-colors group" href="#overflow">
              <span className="font-label-sm text-label-sm uppercase tracking-widest">Witness The Contrast</span>
              <span className="material-symbols-outlined text-2xl group-hover:translate-y-1 transition-transform">arrow_downward</span>
            </a>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 2: THE OVERFLOW (Guilt & Excess)                           */}
        {/* ================================================================ */}
        <section
          className="relative min-h-[85vh] flex items-center justify-center bg-[#1c1815] text-white overflow-hidden py-space-xl"
          data-warmth="0.25"
          id="overflow"
        >
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="/image_1.jpg"
              fallbackSrc="https://lh3.googleusercontent.com/aida/AEtjO1X-ugvJ7gRvdJeN0OoiieCvoz7qG357p3vF53aRz7Q3rrAI9dWwcojqAXnkcN-WNJDd9k_Yuv7d3OeSm19wn9w4ypLAEehW975G98zT9AI_4IaOMX5_85dMfbBH4pVPoVBe_5FkpFC0vU9ZL3tIKwk6DxcCL9jk6lv9C7vVN3d51xxmoFSvheS6uLgs3iOUbgFRbO6I0yCjwXOccH8Ewnd7rvb1xXBEZ5HZp21uSNGbywKD9eiv-VXXPXol"
              alt="Banquet hall buffet trays being tipped into black disposal bins"
              className="w-full h-full object-cover object-center filter brightness-40 sepia-[0.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-inverse-surface via-[#1c1815]/80 to-[#120e0c]" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto px-margin text-center">
            <div className="inline-flex items-center gap-2 bg-[#2b1f1a] border border-outline-variant/40 px-3 py-1.5 rounded-full mb-6">
              <span className="material-symbols-outlined text-tertiary-fixed text-sm">delete_forever</span>
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-tertiary-fixed">
                The Midnight Banquet Discard
              </span>
              <span className="data-badge data-badge-estimate">URBAN AUDIT</span>
            </div>

            <div className="min-h-[80px] sm:min-h-[72px] md:min-h-[64px] flex items-center justify-center mb-4">
              <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold text-[#ffdcc3] max-w-4xl mx-auto tracking-tight inline whitespace-pre-wrap">
                {overflowHeading}
              </h2>
            </div>

            <div className="min-h-[110px] sm:min-h-[85px] md:min-h-[72px] flex items-start justify-center max-w-2xl mx-auto mb-10">
              <p className="font-body-xl text-body-xl text-surface-dim leading-relaxed inline whitespace-pre-wrap">
                {overflowBody}
              </p>
            </div>

            {/* Banquet Tally Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
              <div className="bg-surface-container-lowest/10 backdrop-blur-md border border-outline-variant/20 p-6 rounded-xl hover:border-tertiary-fixed/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-tertiary-fixed uppercase">Typical Big-Fat Wedding</span>
                  <span className="data-badge data-badge-verified">FSSAI AUDIT</span>
                </div>
                <div className="font-headline-lg text-headline-lg font-bold text-white mb-1">15% – 22%</div>
                <p className="font-body-md text-body-md text-surface-dim">
                  Of prepared banquet volume remains unserved and directly discarded at closing.
                </p>
              </div>

              <div className="bg-surface-container-lowest/10 backdrop-blur-md border border-outline-variant/20 p-6 rounded-xl hover:border-tertiary-fixed/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-tertiary-fixed uppercase">Single Event Loss</span>
                  <span className="data-badge data-badge-estimate">ESTIMATE</span>
                </div>
                <div className="font-headline-lg text-headline-lg font-bold text-white mb-1">120 – 180 kg</div>
                <p className="font-body-md text-body-md text-surface-dim">
                  High-protein, safe edible food lost forever in an 800-guest gathering.
                </p>
              </div>

              <div className="bg-surface-container-lowest/10 backdrop-blur-md border border-outline-variant/20 p-6 rounded-xl hover:border-tertiary-fixed/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-tertiary-fixed uppercase">Methane Released</span>
                  <span className="data-badge data-badge-verified">GHG IMPACT</span>
                </div>
                <div className="font-headline-lg text-headline-lg font-bold text-white mb-1">380 kg CO₂e</div>
                <p className="font-body-md text-body-md text-surface-dim">
                  Emitted in decomposition per untreated batch tipped at Ghazipur / Deonar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 3: THE GAP (Tension & Dual Realities)                      */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-surface-container-low border-b border-outline-variant"
          data-warmth="0.45"
          id="impact"
        >
          <div className="w-full max-w-7xl mx-auto px-margin">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full mb-3">
                <span className="material-symbols-outlined text-primary text-sm">balance</span>
                <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                  The Paradox of Abundance
                </span>
                <span className="data-badge data-badge-verified">UNEP FWIR 2024</span>
              </div>
              <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold text-on-background tracking-tight">
                1.05 billion tonnes wasted.<br />
                <span className="text-primary">783 million hungry.</span>
              </h2>
              <p className="font-body-xl text-body-xl text-on-surface-variant mt-4">
                The tragedy of hunger in India is not a supply failure. It is a distribution, trust, and real-time food safety logistics failure.
              </p>
            </div>

            {/* Side-by-Side Dual Reality Images with Laser Scan Line */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-outline-variant bg-surface-container-lowest mb-12 relative group">
              <div className="grid grid-cols-1 md:grid-cols-2 relative h-[420px] md:h-[460px]">
                {/* Left Half: Banquet Surplus */}
                <div className="relative h-full overflow-hidden">
                  <ImageWithFallback
                    src="/image_1.jpg"
                    fallbackSrc="/image_1.jpg"
                    alt="Opulent evening wedding dinner banquet surplus"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Top Context Tag */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/50 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] font-mono text-amber-200 font-semibold uppercase tracking-wider">
                      Banquet Hall · Midnight Surplus
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-white z-10">
                    <div className="bg-black/75 backdrop-blur-md p-4 rounded-xl border border-tertiary-fixed/40">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-tertiary-fixed-dim uppercase tracking-wider font-mono flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping" />
                          Urban Waste Axis (23:45 IST)
                        </span>
                        <span className="text-[10px] font-mono bg-tertiary-fixed/20 text-tertiary-fixed px-2 py-0.5 rounded font-bold">
                          UNSERVED SURPLUS
                        </span>
                      </div>
                      <div className="font-headline-md text-headline-md font-bold mt-1 text-[#ffdcc3]">
                        78,000,000 Tonnes / Year
                      </div>
                      <p className="font-body-md text-body-md text-surface-dim mt-1">
                        Total household and catering surplus discarded annually across Indian urban centers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Half: Community Deficit */}
                <div className="relative h-full overflow-hidden border-t md:border-t-0 md:border-l border-white/20">
                  <ImageWithFallback
                    src="/image_3.jpg"
                    fallbackSrc="/image_3.jpg"
                    alt="Families awaiting nourishment in night shelter"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Top Context Tag */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-400/50 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    <span className="text-[11px] font-mono text-sky-200 font-semibold uppercase tracking-wider">
                      Community Shelter · Midnight Need
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-white z-10">
                    <div className="bg-black/75 backdrop-blur-md p-4 rounded-xl border border-secondary-fixed/40">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-secondary-fixed uppercase tracking-wider font-mono flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                          Community Deficit Axis (23:45 IST)
                        </span>
                        <span className="text-[10px] font-mono bg-secondary-fixed/20 text-secondary-fixed px-2 py-0.5 rounded font-bold">
                          ACTIVE DEFICIT
                        </span>
                      </div>
                      <div className="font-headline-md text-headline-md font-bold mt-1 text-white">
                        21.4% Undernourishment Gap
                      </div>
                      <p className="font-body-md text-body-md text-surface-dim mt-1">
                        Distance between minimum caloric need and actual consumption in vulnerable informal settlements.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated Laser Scanning Line */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_20px_#f59e0b] laser-scan-line pointer-events-none z-20">
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold tracking-widest whitespace-nowrap shadow-lg">
                    PARADOX RADAR · ACTIVE SCAN
                  </div>
                </div>

                {/* Center Split Line Indicator */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/40 hidden md:block z-20 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white border border-white/40 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    THE 1.4 KM DIVIDE
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Badged Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:border-primary transition-all shadow-sm">
                <span className="data-badge data-badge-verified">UNEP REPORT</span>
                <div className="font-headline-xl text-headline-xl font-bold text-primary mt-3">132 kg</div>
                <span className="font-label-md text-label-md text-on-surface block mt-1">
                  Food waste per capita per year in households globally
                </span>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:border-tertiary transition-all shadow-sm">
                <span className="data-badge data-badge-live">CLIMATE LOSS</span>
                <div className="font-headline-xl text-headline-xl font-bold text-tertiary-container mt-3">8 - 10%</div>
                <span className="font-label-md text-label-md text-on-surface block mt-1">
                  Of global greenhouse gas emissions originate directly from food waste
                </span>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:border-secondary transition-all shadow-sm">
                <span className="data-badge data-badge-verified">FSSAI STAT</span>
                <div className="font-headline-xl text-headline-xl font-bold text-secondary mt-3">₹89,000 Cr</div>
                <span className="font-label-md text-label-md text-on-surface block mt-1">
                  Economic value of agricultural and prepared food lost annually in India
                </span>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:border-outline transition-all shadow-sm">
                <span className="data-badge data-badge-estimate">RECOVERY RATIO</span>
                <div className="font-headline-xl text-headline-xl font-bold text-on-surface mt-3">&lt; 3.2%</div>
                <span className="font-label-md text-label-md text-on-surface block mt-1">
                  Current organized safe recovery of surplus food nationwide
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 4: THE POT (Hope & Connection)                             */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-[#fffbf2] relative overflow-hidden border-b border-outline-variant"
          data-warmth="0.7"
          id="pot-section"
        >
          <div className="absolute -right-32 top-10 w-96 h-96 rounded-full bg-[#f2a900]/20 blur-3xl warm-glow pointer-events-none" />
          
          <div className="w-full max-w-7xl mx-auto px-margin relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 bg-[#fee8bf] px-3 py-1 rounded-full mb-4">
                  <span className="material-symbols-outlined text-primary text-base">local_fire_department</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                    The Sacred Symbol
                  </span>
                  <span className="data-badge data-badge-verified">DIGNITY CODE</span>
                </div>
                <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold text-[#832600] tracking-tight leading-tight mb-6">
                  POTBHAR connects the two — safely.
                </h2>
                <p className="font-body-xl text-body-xl text-on-surface-variant mb-6 leading-relaxed">
                  <em>Potbhar</em> is a Marathi and Hindi expression of total satiety — a belly filled with genuine warmth, dignity, and care. We are not a dumping pipeline for stale leftovers; we are an institutional safety bridge.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-base">check</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Zero Compromise on Human Dignity</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Recipient shelters receive the exact same nutritional standards and temperature integrity as paying dining halls.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-base">security</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">FSSAI Food Safety & Standards Compliance</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Cold chain logging, pH validation, sensory assessment checkpoints, and end-to-end QR batch tracking.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-label-lg px-6 py-3 rounded-lg shadow-sm hover:opacity-95 active:scale-[0.98] transition-all"
                    href="#how-it-works"
                  >
                    <span>Explore the 5-Step Relay</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                  <a
                    className="inline-flex items-center gap-2 bg-white text-on-surface border border-outline-variant font-label-lg px-6 py-3 rounded-lg hover:bg-surface-container transition-colors"
                    href="#calculator"
                  >
                    <span>Scenario Calculator</span>
                  </a>
                </div>
              </div>

              {/* Illustrated Route Drawing Visual */}
              <div className="lg:col-span-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant shadow-lg relative">
                  <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                      <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                        Live Recovery Corridor #MH-4019
                      </span>
                    </div>
                    <span className="data-badge data-badge-live">TRANSIT ACTIVE</span>
                  </div>

                  {/* Journey Diagram */}
                  <div className="space-y-6 relative before:absolute before:left-6 before:top-6 before:bottom-6 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-tertiary before:to-secondary">
                    {/* Node 1 */}
                    <div className="relative flex items-center gap-4 pl-12">
                      <div className="absolute left-4 w-5 h-5 rounded-full bg-primary ring-4 ring-primary-fixed flex items-center justify-center text-white">
                        <span className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div className="bg-surface-container-low p-4 rounded-xl w-full border border-outline-variant">
                        <span className="font-label-sm text-label-sm text-primary font-bold">22:45 · Donor Manifest Generated</span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          Grand Sapphire Banquet Hall, Andheri East
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          120 kg prepared meal surplus (Basmati pulav, dal makhani, paneer). Hot holding maintained at 64°C.
                        </p>
                      </div>
                    </div>

                    {/* Node 2 */}
                    <div className="relative flex items-center gap-4 pl-12">
                      <div className="absolute left-4 w-5 h-5 rounded-full bg-tertiary ring-4 ring-tertiary-fixed flex items-center justify-center text-white">
                        <span className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div className="bg-[#fff9ef] p-4 rounded-xl w-full border border-tertiary-fixed">
                        <span className="font-label-sm text-label-sm text-tertiary font-bold">23:05 · Food Quality & Safety Check</span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          Inspected on Site by Field Officer Rajesh M.
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          Visual micro-inspection verified. Core temp recorded at 62.8°C. Batch approved for immediate humanitarian dispatch.
                        </p>
                      </div>
                    </div>

                    {/* Node 3 */}
                    <div className="relative flex items-center gap-4 pl-12">
                      <div className="absolute left-4 w-5 h-5 rounded-full bg-secondary ring-4 ring-secondary-fixed flex items-center justify-center text-white">
                        <span className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div className="bg-[#f0fdf4] p-4 rounded-xl w-full border border-secondary-fixed">
                        <span className="font-label-sm text-label-sm text-secondary font-bold">23:50 · Delivered & Shared</span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          Asha Sadan Community Shelter, Kurla
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          300 warm, nourishing meal portions distributed with QR receipt verified. Zero landfill diversion accomplished.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Corridor summary stats */}
                  <div className="mt-6 pt-4 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
                    <span>Total Elapsed: <strong>1 hr 05 min</strong></span>
                    <span>Thermal Integrity: <strong>Compliant (&gt;60°C)</strong></span>
                    <span>Distance: <strong>6.8 km</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 5: HOW IT WORKS (The 5 Clean Steps)                        */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-background border-b border-outline-variant"
          data-warmth="0.85"
          id="how-it-works"
        >
          <div className="w-full max-w-7xl mx-auto px-margin">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="data-badge data-badge-verified mb-3">SYSTEM ARCHITECTURE</span>
              <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold text-on-background tracking-tight">
                How It Works
              </h2>
              <p className="font-body-xl text-body-xl text-on-surface-variant mt-3">
                A fail-safe 5-step operational chain moving surplus from commercial kitchens to community plates in under 90 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {/* Step 1 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between hover:border-primary transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-lg mb-4">
                    01
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Log Extra Food</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Wedding host, hotel chef, or caterer logs surplus food volume, cooking time, and dishes in 60 seconds on their mobile phone.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/50">
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold">
                    <span className="material-symbols-outlined text-sm">edit_note</span> 60-Sec Quick Log
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between hover:border-primary transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-lg mb-4">
                    02
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Freshness Scan</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    We check food type, time elapsed since cooking, and storage temperature to dispatch the nearest insulated van immediately.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/50">
                  <span className="inline-flex items-center gap-1 text-xs text-tertiary font-semibold">
                    <span className="material-symbols-outlined text-sm">local_shipping</span> Van Dispatched
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between hover:border-primary transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-lg mb-4">
                    03
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Safety Approval</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    A trained food safety inspector personally tests aroma, checks core temperature (&gt;60°C hot zone), and verifies hygiene.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/50">
                  <span className="inline-flex items-center gap-1 text-xs text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-sm">verified_user</span> Human Inspector Sign-off
                  </span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between hover:border-primary transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-lg mb-4">
                    04
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Smart 3-Way Sorting</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Good fresh food goes to human shelters; medium surplus goes to animal gaushalas; spoiled scraps go to organic khaad (compost).
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/50">
                  <span className="inline-flex items-center gap-1 text-xs text-secondary font-semibold">
                    <span className="material-symbols-outlined text-sm">alt_route</span> 3-Way Zero Waste
                  </span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between hover:border-primary transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg mb-4">
                    05
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Hot Delivery & Dignity</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Insulated delivery within 90 minutes. Shelter confirms safe receipt, and diners receive hot, nutritious, dignified meals.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/50">
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold">
                    <span className="material-symbols-outlined text-sm">volunteer_activism</span> Served with Dignity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 6: FRESHGUARD AI & HUMAN APPROVAL                           */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-surface-container-low border-b border-outline-variant"
          data-warmth="0.85"
          id="freshguard"
        >
          <div className="w-full max-w-7xl mx-auto px-margin">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-3">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                  Food Safety Protocol
                </span>
                <span className="data-badge data-badge-verified">100% SAFE PROMISE</span>
              </div>
              <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold text-on-background tracking-tight">
                FreshGuard AI: AI shows evidence.<br />
                <span className="text-primary">Humans approve food.</span>
              </h2>
              <p className="font-body-xl text-body-xl text-on-surface-variant mt-3">
                Standardized inspection protocol preventing unsafe food from entering the human recovery chain. Our algorithm calculates risk scores; verified human assessors conduct physical temperature and sensory evaluations before every dispatch.
              </p>
            </div>

            {/* Amber Alert Banner */}
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 md:p-6 rounded-r-xl mb-10 flex items-start gap-4">
              <span className="material-symbols-outlined text-amber-600 text-2xl shrink-0 mt-0.5">verified_user</span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  FSSAI Food Safety Protocol 100% Human Sign-off Rule
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  A digital algorithm cannot smell rancidity or evaluate subtle texture changes. POTBHAR mandates on-site sensor validation and trained assessor confirmation for 100% of human-bound surplus.
                </p>
              </div>
            </div>

            {/* The Three Distinct Operational Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: Visual Freshness */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-secondary-fixed shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">
                    Step 1: Sensory Test
                  </span>
                  <span className="data-badge data-badge-verified">PRE-DISPATCH</span>
                </div>
                <div className="w-full h-36 bg-surface-container rounded-lg mb-4 overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent" />
                  <div className="text-center p-4">
                    <span className="material-symbols-outlined text-secondary text-4xl mb-1">visibility</span>
                    <span className="block font-label-md text-label-md text-on-surface font-semibold">Visual & Aroma Check</span>
                    <span className="text-[11px] text-on-surface-variant">Steam, natural sheen & fresh aroma verified</span>
                  </div>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Color & Smell Verification</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  Our field team examines the food's appearance, texture, and smell. We ensure it was kept properly covered in clean, food-grade vessels and was never left open to flies or dust.
                </p>
                <div className="text-xs text-secondary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Clean appearance & aroma verified
                </div>
              </div>

              {/* Step 2: Temperature & Safe Timing */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-label-sm font-bold text-tertiary uppercase tracking-wider">
                    Step 2: Temperature
                  </span>
                  <span className="data-badge data-badge-estimate">IN TRANSIT</span>
                </div>
                <div className="w-full h-36 bg-surface-container rounded-lg mb-4 overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/10 to-transparent" />
                  <div className="text-center p-4">
                    <span className="material-symbols-outlined text-tertiary text-4xl mb-1">device_thermostat</span>
                    <span className="block font-label-md text-label-md text-on-surface font-semibold">Digital Probe Reading</span>
                    <span className="text-[11px] text-on-surface-variant">Hot meals kept &gt; 60°C · Cold items &lt; 4°C</span>
                  </div>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Core Thermal Probe</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  Bacteria grow when food sits warm between 5°C and 60°C. We measure the core temperature with digital probes to confirm it is hot (&gt;60°C), and ensure pickup happens within 3 hours of cooking.
                </p>
                <div className="text-xs text-tertiary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">timer</span>
                  Safe dispatch window: Under 90 minutes
                </div>
              </div>

              {/* Step 3: Inspector Sign-off */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border-2 border-primary-container shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">
                    Step 3: Seal & Dispatch
                  </span>
                  <span className="data-badge data-badge-live">RELEASE GATE</span>
                </div>
                <div className="w-full h-36 bg-primary-fixed/20 rounded-lg mb-4 overflow-hidden relative flex items-center justify-center">
                  <div className="text-center p-4">
                    <span className="material-symbols-outlined text-primary text-4xl mb-1">assignment_turned_in</span>
                    <span className="block font-label-md text-label-md text-on-primary-fixed-variant font-bold">
                      Cryptographic Batch Seal
                    </span>
                    <span className="text-[11px] text-on-surface-variant">Dual OTP verification between kitchen and van</span>
                  </div>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Inspector Sign-off</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  Our trained food safety coordinator personally signs off on each batch. If a batch fails any hygiene test, it is never served to humans — it gets routed to animals or compost instead.
                </p>
                <div className="text-xs text-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">lock</span>
                  Sealed with tamper-proof food safety tag
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 7: TWO PATHWAYS: 100% DIVERSION (with Steam Particles)      */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-surface-container-lowest border-b border-outline-variant"
          data-warmth="1.0"
          id="pathways"
        >
          <div className="w-full max-w-7xl mx-auto px-margin">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="data-badge data-badge-verified mb-3">100% DIVERSION</span>
              <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold text-on-background tracking-tight">
                Two Pathways: 100% Diversion
              </h2>
              <p className="font-body-xl text-body-xl text-on-surface-variant mt-3">
                Every gram of surplus food is routed to human nourishment when safe, or transformed into green energy and bio-organic compost when compromised. No landfill.
              </p>
            </div>

            {/* Shared Relief Vignette Banner with Atmospheric Steam Particles */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-outline-variant mb-12 relative max-h-[380px]">
              <ImageWithFallback
                src="/images/hero-community.jpg"
                fallbackSrc="/images/hero-community.jpg"
                alt="Volunteers serving hot, nourishing meals with dignity at community kitchen hub"
                className="w-full h-full object-cover object-center max-h-[380px]"
              />

              {/* Delicate, realistic rising atmospheric steam particle layer */}
              <AtmosphericSteam />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 md:p-8 z-10 pointer-events-none">
                <div className="text-white max-w-xl pointer-events-auto">
                  <span className="data-badge data-badge-verified mb-2">SHARED NOURISHMENT</span>
                  <h3 className="font-headline-md text-headline-md font-bold text-white">Full Plates, Complete Dignity</h3>
                  <p className="font-body-md text-body-md text-surface-dim mt-1">
                    Connecting fresh surplus to shared tables in under 90 minutes with strict quality checks.
                  </p>
                </div>
              </div>
            </div>

            {/* The Two Main Pathway Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pathway 1: Human Food Rescue */}
              <div className="bg-gradient-to-br from-[#fffbf8] to-[#fff3ed] p-8 rounded-2xl border-2 border-primary-container/60 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-2xl">soup_kitchen</span>
                    </div>
                    <span className="data-badge data-badge-verified">SAFE FOR HUMANS</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-background mb-2">
                    Human Food Rescue
                  </h3>
                  <div className="text-xs font-semibold text-primary mb-3">Freshly cooked, piping hot & dignified meals</div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Unserved banquet dishes, wedding buffets, hotel surplus, and catered trays. As long as food is fresh, hot, and hygienic, it is sealed in insulated containers and delivered to night shelters and hungry families within 90 minutes.
                  </p>
                  <div className="space-y-2.5 bg-white p-4 rounded-xl border border-outline-variant text-xs mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Where it goes:</span>
                      <span className="text-on-surface-variant">Night shelters, orphanages, elder homes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Food Type:</span>
                      <span className="text-on-surface-variant">Biryani, curries, paneer, rotis, rice</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Delivery Window:</span>
                      <span className="text-primary font-bold">Under 90 mins (Hot &gt;60°C)</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant/60 flex items-center justify-between text-xs text-primary font-bold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">favorite</span> Full Dignity For Every Diner
                  </span>
                  <span>Tier 1 Active</span>
                </div>
              </div>

              {/* Pathway 2: Circular Organic Processing */}
              <div className="bg-gradient-to-br from-[#f6fcf8] to-[#eaf7ee] p-8 rounded-2xl border-2 border-green-300 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-2xl">compost</span>
                    </div>
                    <span className="data-badge data-badge-verified">SOIL & ANIMALS</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-background mb-2">
                    Circular Organic Processing
                  </h3>
                  <div className="text-xs font-semibold text-secondary mb-3">Animal feed & organic manure generation</div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Food that has cooled below safety thresholds or is overhandled is routed to registered cow shelters (Gaushalas) and animal rescues. Kitchen preparation offcuts and expired food are channeled into aerobic composting and Bio-methanation units.
                  </p>
                  <div className="space-y-2.5 bg-white p-4 rounded-xl border border-outline-variant text-xs mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Tier 2 Destination:</span>
                      <span className="text-on-surface-variant">Gaushalas, animal shelters (rotis, rice, greens)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Tier 3 Destination:</span>
                      <span className="text-on-surface-variant">Bio-CNG plants & rich organic manure (Khaad)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Landfill Dump:</span>
                      <span className="text-green-700 font-bold">0% Dumped (Zero Methane Gas)</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant/60 flex items-center justify-between text-xs text-secondary font-bold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">eco</span> 100% Circular Recovery
                  </span>
                  <span>Tiers 2 & 3 Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 8: CASE STUDIES & WORKED MATCHING EXAMPLE                  */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-surface-container-low border-b border-outline-variant"
          data-warmth="1.0"
          id="case-studies"
        >
          <div className="w-full max-w-7xl mx-auto px-margin">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="data-badge data-badge-demo">Fictional persona · Demonstration content</span>
                  <span className="data-badge data-badge-verified">PLAYBOOK §8</span>
                </div>
                <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold text-on-background tracking-tight">
                  Operational Case Studies
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
                  Real-world simulated operational manifests illustrating the fail-closed routing logic, diversion math, and prevention feedback loops.
                </p>
              </div>
            </div>

            {/* 4 Clear Case Study Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Case 1 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm font-bold text-primary">CASE 01</span>
                    <span className="data-badge data-badge-demo">DEMO</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Sharma Royal Caterers</h3>
                  <p className="text-xs text-on-surface-variant mb-4">Mega wedding banquet event with complex multi-dish surplus manifest.</p>
                  <div className="space-y-2 bg-surface-container-low p-3.5 rounded-lg text-xs font-mono mb-4">
                    <div className="flex justify-between">
                      <span>Reported:</span>
                      <span className="font-bold">148 kg</span>
                    </div>
                    <div className="flex justify-between text-secondary font-bold">
                      <span>Approved:</span>
                      <span>114 kg (77.0%)</span>
                    </div>
                    <div className="flex justify-between text-primary font-bold">
                      <span>Delivered:</span>
                      <span>108 kg (73.0%)</span>
                    </div>
                    <div className="flex justify-between text-outline">
                      <span>Biogas Divert:</span>
                      <span>24 kg</span>
                    </div>
                    <div className="flex justify-between text-error">
                      <span>Held/Rejected:</span>
                      <span>10 kg</span>
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-[13px] text-on-surface-variant border-t border-outline-variant/60 pt-3">
                  10 kg held back due to gravy separation indicating thermal breakdown. 24 kg kitchen offcuts diverted to local bio-methanizer.
                </p>
              </div>

              {/* Case 2 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm font-bold text-secondary">CASE 02</span>
                    <span className="data-badge data-badge-demo">DEMO</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Kaveri Hostel Mess</h3>
                  <p className="text-xs text-on-surface-variant mb-4">High-volume institutional student dining facility organic scrap diversion.</p>
                  <div className="space-y-2 bg-[#f0fdf4] p-3.5 rounded-lg text-xs font-mono mb-4 border border-secondary-fixed">
                    <div className="flex justify-between">
                      <span>Reported:</span>
                      <span className="font-bold">468 kg</span>
                    </div>
                    <div className="flex justify-between text-secondary font-bold">
                      <span>Received:</span>
                      <span>441 kg (94.2%)</span>
                    </div>
                    <div className="flex justify-between text-on-surface font-bold">
                      <span>Processed:</span>
                      <span>420 kg</span>
                    </div>
                    <div className="flex justify-between text-outline">
                      <span>Moisture Loss:</span>
                      <span>21 kg</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span>Finished Compost:</span>
                      <span>84 kg rich humus</span>
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-[13px] text-on-surface-variant border-t border-outline-variant/60 pt-3">
                  Vegetable peelings and leftover rice processed via university on-site rotary drum composter, enriching community gardens.
                </p>
              </div>

              {/* Case 3 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm font-bold text-tertiary">CASE 03</span>
                    <span className="data-badge data-badge-demo">DEMO</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Asha Kiran Shelter</h3>
                  <p className="text-xs text-on-surface-variant mb-4">Strict logistical constraint: no cold refrigeration units available on-site.</p>
                  <div className="space-y-2 bg-[#fffaf0] p-3.5 rounded-lg text-xs font-mono mb-4 border border-tertiary-fixed">
                    <div className="flex justify-between">
                      <span>Capacity Need:</span>
                      <span className="font-bold">320 kg</span>
                    </div>
                    <div className="flex justify-between text-primary font-bold">
                      <span>Matched & Recvd:</span>
                      <span>312 kg</span>
                    </div>
                    <div className="flex justify-between text-secondary font-bold">
                      <span>Delivered Meals:</span>
                      <span>780 wholesome meals</span>
                    </div>
                    <div className="flex justify-between text-outline">
                      <span>Transit Time:</span>
                      <span>28 mins</span>
                    </div>
                    <div className="flex justify-between text-tertiary">
                      <span>Thermal At Entry:</span>
                      <span>61.2°C (Compliant)</span>
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-[13px] text-on-surface-variant border-t border-outline-variant/60 pt-3">
                  Matched only with immediate hot-holding dispatches. Served hot to residents within 45 minutes of kitchen collection.
                </p>
              </div>

              {/* Case 4 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface">CASE 04</span>
                    <span className="data-badge data-badge-demo">DEMO</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">Marina Banquets</h3>
                  <p className="text-xs text-on-surface-variant mb-4">Closed-loop upstream menu optimization through FreshGuard predictive logs.</p>
                  <div className="space-y-2 bg-surface-container-low p-3.5 rounded-lg text-xs font-mono mb-4">
                    <div className="flex justify-between">
                      <span>Baseline Waste:</span>
                      <span className="font-bold">210 kg/weekend</span>
                    </div>
                    <div className="flex justify-between text-secondary font-bold">
                      <span>Sunday Rice Cut:</span>
                      <span>-26.0% reduction</span>
                    </div>
                    <div className="flex justify-between text-on-surface font-bold">
                      <span>Cost Saved:</span>
                      <span>₹42,800 / month</span>
                    </div>
                    <div className="flex justify-between text-outline">
                      <span>Client Satisfaction:</span>
                      <span>99.2%</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span>Status:</span>
                      <span>Prevention Certified</span>
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-[13px] text-on-surface-variant border-t border-outline-variant/60 pt-3">
                  By revealing pattern over-preparation in carbohydrate courses, kitchen adjusted staging portions to cut recurring surplus at source.
                </p>
              </div>
            </div>

            {/* Matching Worked Example Container */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-outline-variant">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-primary text-sm">calculate</span>
                    <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                      Algorithmic Matching Engine
                    </span>
                    <span className="data-badge data-badge-verified">WORKED EXAMPLE</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Multi-Factor Recipient Allocation Formula
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-xl font-mono text-xs text-on-surface">
                  <span>Score = (D × 0.30) + (C × 0.25) + (N × 0.25) + (W × 0.20)</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                When a verified surplus batch of 120 kg hot stew is ready in Ghatkopar, our spatial solver balances transit distance (D), storage capacity (C), acute hunger urgency (N), and food life window (W). Unverified organizations are systematically blocked by the smart contract.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-container font-label-md text-label-md text-on-surface uppercase border-b border-outline-variant">
                    <tr>
                      <th className="py-3 px-4">Candidate Recipient</th>
                      <th className="py-3 px-4">Distance (0.30)</th>
                      <th className="py-3 px-4">Capacity (0.25)</th>
                      <th className="py-3 px-4">Need (0.25)</th>
                      <th className="py-3 px-4">Window (0.20)</th>
                      <th className="py-3 px-4">Computed Score</th>
                      <th className="py-3 px-4">Dispatch Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/60 font-mono text-xs">
                    <tr className="bg-secondary-fixed/20 font-bold">
                      <td className="py-4 px-4 font-sans flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                        Asha Kiran Shelter (Verified)
                      </td>
                      <td className="py-4 px-4 text-on-surface">3.2 km (0.95)</td>
                      <td className="py-4 px-4 text-on-surface">Immediate (0.90)</td>
                      <td className="py-4 px-4 text-on-surface">Severe (0.95)</td>
                      <td className="py-4 px-4 text-on-surface">Hot ready (0.85)</td>
                      <td className="py-4 px-4 text-secondary text-sm">0.920 / 1.00</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 bg-secondary text-white px-2.5 py-1 rounded-full text-[11px] font-sans font-bold">
                          <span className="material-symbols-outlined text-xs">done_all</span> AWARDED BATCH
                        </span>
                      </td>
                    </tr>
                    <tr className="text-on-surface-variant">
                      <td className="py-4 px-4 font-sans">Navjeevan Seva (Verified)</td>
                      <td className="py-4 px-4">7.8 km (0.68)</td>
                      <td className="py-4 px-4">Cold-box (0.80)</td>
                      <td className="py-4 px-4">Moderate (0.75)</td>
                      <td className="py-4 px-4">Acceptable (0.70)</td>
                      <td className="py-4 px-4 font-semibold">0.732 / 1.00</td>
                      <td className="py-4 px-4">
                        <span className="text-outline text-xs font-sans">Queue Position #2</span>
                      </td>
                    </tr>
                    <tr className="bg-error-container/20 text-on-error-container">
                      <td className="py-4 px-4 font-sans flex items-center gap-2 text-error font-semibold">
                        <span className="material-symbols-outlined text-sm">block</span>
                        Unregistered Slum Kitchen B
                      </td>
                      <td className="py-4 px-4">1.1 km (0.99)</td>
                      <td className="py-4 px-4">Unverified (0.00)</td>
                      <td className="py-4 px-4">Critical (1.00)</td>
                      <td className="py-4 px-4">No inspection</td>
                      <td className="py-4 px-4 text-error font-bold">DISQUALIFIED</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 bg-error text-white px-2.5 py-1 rounded-full text-[11px] font-sans font-bold">
                          EXCLUDED (NO FSSAI)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 9: VOICES (Community & Field Perspectives)                 */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-background border-b border-outline-variant"
          data-warmth="1.0"
          id="voices"
        >
          <div className="w-full max-w-7xl mx-auto px-margin">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="data-badge data-badge-demo">Fictional persona · Demonstration content</span>
                <span className="data-badge data-badge-verified">PLAYBOOK §8</span>
              </div>
              <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold text-on-background tracking-tight">
                Voices from the Relay
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-2">
                <em>Demonstration personas representing stakeholders across our pilot ecosystem. These will be replaced with real participant video vignettes upon completion of the pilot verification period.</em>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Voice 1 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-lg">
                      VK
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Vikram Kulkarni</h4>
                      <span className="text-xs text-outline block">Head Chef, Sagarika Grand Banquets</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-4 leading-relaxed">
                    "For sixteen years as an executive chef, watching 40 kilograms of pristine Mughlai gravies being poured into black garbage bins after a midnight reception felt like a moral betrayal. With POTBHAR, it takes 3 minutes on my mobile to log the pots, and within 35 minutes an insulated van arrives with verified temperature logs."
                  </p>
                </div>
                <div className="pt-4 border-t border-outline-variant flex items-center justify-between text-xs text-primary font-semibold">
                  <span>Donor Partner</span>
                  <span>1,240 kg Rescued</span>
                </div>
              </div>

              {/* Voice 2 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-lg">
                      SM
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Sister Mary Teresa</h4>
                      <span className="text-xs text-outline block">Director, Shanti Bhavan Shelter</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-4 leading-relaxed">
                    "Our elders and street children are not beggars waiting for crumbs. POTBHAR honors their dignity. The food comes steaming hot, with an FSSAI temperature inspection sheet attached. We know exactly what kitchen cooked it, when it was prepared, and that it is pure and healthy."
                  </p>
                </div>
                <div className="pt-4 border-t border-outline-variant flex items-center justify-between text-xs text-secondary font-semibold">
                  <span>Shelter Network</span>
                  <span>3,100 Meals Served</span>
                </div>
              </div>

              {/* Voice 3 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold text-lg">
                      AP
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Anand Parikh</h4>
                      <span className="text-xs text-outline block">Certified Field Safety Officer</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-4 leading-relaxed">
                    "Digital thermometers flag temperature drops instantly, but we inspectors are the physical guardians. If the needle probe reads 57°C instead of 60°C, the food is never served to humans — it gets diverted to Gaushalas or organic khaad instead. No compromises. Human health is sacred."
                  </p>
                </div>
                <div className="pt-4 border-t border-outline-variant flex items-center justify-between text-xs text-tertiary font-semibold">
                  <span>Field Operations</span>
                  <span>184 Inspections Verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 10: IMPACT DASHBOARD & SCENARIO CALCULATOR                 */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-surface-container-low border-b border-outline-variant"
          data-warmth="1.0"
          id="calculator"
        >
          <div className="w-full max-w-7xl mx-auto px-margin">
            {/* Demonstration Banner */}
            <div className="bg-surface-container-highest border border-outline-variant/80 p-4 rounded-xl text-center mb-12 flex items-center justify-center gap-3">
              <span className="data-badge data-badge-demo">SIMULATION</span>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                Interactive Zero-Waste Allocation Simulator
              </span>
              <span className="text-xs text-outline hidden sm:inline">
                Calculates distribution across Humans, Animals & Organic Khaad
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Scenario Calculator Form */}
              <div className="lg:col-span-6 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-md">
                <div className="inline-flex items-center gap-2 bg-[#fee8bf] px-3 py-1 rounded-full mb-4">
                  <span className="material-symbols-outlined text-primary text-sm">tune</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                    3-Way Zero-Waste Model
                  </span>
                  <span className="data-badge data-badge-verified">CITY SCALE</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg font-bold text-on-background mb-2">
                  City Impact Simulator
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Estimate how much food your city or kitchen cluster can rescue for hungry people, animal gaushalas, and organic fertilizer.
                </p>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="input-donors">
                      Number of Active Food Donors (Hotels, Banquets, Caterers)
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-white border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                        id="input-donors"
                        max="1000"
                        min="1"
                        type="number"
                        value={calcDonors}
                        onChange={(e) => setCalcDonors(parseFloat(e.target.value) || 0)}
                      />
                      <span className="absolute right-3 top-3 text-xs text-outline">Hotels/Caterers</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="input-kg">
                      Average Surplus Generated per Donor / Week in kg
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-white border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                        id="input-kg"
                        max="2000"
                        min="5"
                        type="number"
                        value={calcKg}
                        onChange={(e) => setCalcKg(parseFloat(e.target.value) || 0)}
                      />
                      <span className="absolute right-3 top-3 text-xs text-outline">kg / week</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1.5" htmlFor="input-compliance">
                      Human Quality Approval Rate (c)
                    </label>
                    <div className="relative">
                      <input
                        className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
                        id="input-compliance"
                        max="0.95"
                        min="0.5"
                        step="0.01"
                        type="range"
                        value={calcCompliance}
                        onChange={(e) => setCalcCompliance(parseFloat(e.target.value))}
                      />
                      <div className="flex justify-between text-xs text-outline mt-1 font-mono">
                        <span>50% (Strict hot-only)</span>
                        <span className="font-bold text-primary">
                          {Math.round(calcCompliance * 100)}% (Human Safe: Rest to Animals & Khaad)
                        </span>
                        <span>95% (High efficiency)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant">
                    <button
                      className="w-full bg-primary-container text-on-primary font-label-lg py-3 rounded-lg font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                      type="button"
                      onClick={() => showToast('Simulator recalculated with latest metrics!', 'success')}
                    >
                      <span className="material-symbols-outlined text-sm">bolt</span>
                      Calculate 3-Way Zero-Waste Impact
                    </button>
                  </div>
                </form>
              </div>

              {/* Dynamic Results Dashboard */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-md h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-6">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase block">Allocation Breakdown</span>
                        <span className="font-mono text-xs text-primary font-bold">100% Utilized · 0% Landfill Waste</span>
                      </div>
                      <span className="data-badge data-badge-verified">ZERO WASTE</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/60">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-1">
                          🍲 Tier 1: Human Food Rescued
                        </span>
                        <div className="font-headline-xl text-headline-xl font-bold text-primary">
                          {calcWeeklyHumanKg.toLocaleString()} kg
                        </div>
                        <span className="text-xs text-outline block mt-1">High-protein fresh meals</span>
                      </div>

                      <div className="bg-secondary-fixed/30 p-5 rounded-xl border border-secondary-fixed">
                        <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase block mb-1">
                          Plates Nourished
                        </span>
                        <div className="font-headline-xl text-headline-xl font-bold text-secondary">
                          {calcWeeklyMeals.toLocaleString()}
                        </div>
                        <span className="text-xs text-on-secondary-fixed-variant block mt-1">
                          Dignified 400g warm portions
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3.5 bg-amber-500/10 rounded-lg border border-amber-500/30 text-sm">
                        <span className="text-on-surface font-semibold flex items-center gap-2">
                          <span className="material-symbols-outlined text-amber-700 text-base">pets</span>
                          🐄 Tier 2: Animal Feed (Gaushalas & Shelters)
                        </span>
                        <span className="font-mono font-bold text-amber-800">
                          {calcAnimalKg.toLocaleString()} kg / wk
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-green-500/10 rounded-lg border border-green-500/30 text-sm">
                        <span className="text-on-surface font-semibold flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-700 text-base">compost</span>
                          🌱 Tier 3: Organic Khaad (Manure & Biogas)
                        </span>
                        <span className="font-mono font-bold text-green-700">
                          {calcCompostKg.toLocaleString()} kg / wk
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-lg border border-outline-variant text-sm">
                        <span className="text-on-surface font-semibold flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-base">eco</span>
                          Methane Prevented from Landfills
                        </span>
                        <span className="font-mono font-bold text-on-surface">
                          {calcCo2Prevented.toLocaleString()} kg CO₂e / wk
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-outline-variant text-xs text-outline flex items-center justify-between">
                    <span>Rule: Good → Humans · Medium → Animals · Bad → Khaad</span>
                    <span>100% Landfill Diversion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* BEAT 11: CALL TO ACTION (Urgent Dual Action + Radar)            */}
        {/* ================================================================ */}
        <section
          className="py-space-xl bg-[#263143] text-white relative overflow-hidden"
          data-warmth="1.0"
          id="report-action"
        >
          <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

          <div className="w-full max-w-7xl mx-auto px-margin relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-6 border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping" />
              <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-bold">
                24/7 Rapid Response Network
              </span>
            </div>

            <h2 className="font-headline-xl md:font-display-lg text-headline-xl md:text-display-lg font-bold tracking-tight max-w-3xl mx-auto mb-4">
              No edible meal belongs in the trash.<br />
              <span className="text-primary-fixed">Take action right now.</span>
            </h2>

            <p className="font-body-xl text-body-xl text-surface-dim max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Whether you are an executive banquet chef closing a 1,000-person wedding tonight or an accredited community shelter needing fresh meals, our dispatch grid is live.
            </p>

            {/* LIVE DISPATCH RADAR & OPERATIONS FEED */}
            <div className="max-w-4xl mx-auto mb-12 bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-6 text-left shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    <span className="absolute w-full h-full rounded-full bg-secondary/30 sonar-ring" />
                    <span className="absolute w-full h-full rounded-full bg-secondary/30 sonar-ring-delay-1" />
                    <span className="w-3 h-3 rounded-full bg-secondary-fixed shadow-[0_0_10px_#95f8a7]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-secondary-fixed flex items-center gap-1.5">
                      <span>Active Hyperlocal Dispatch Radar</span>
                      <span className="text-[10px] bg-secondary/20 text-secondary-fixed px-1.5 py-0.2 rounded font-sans">
                        GRID ACTIVE
                      </span>
                    </div>
                    <div className="text-[11px] text-surface-dim font-mono">
                      14 Insulated EV Vans on Patrol · 3 Metro Clusters Connected
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-surface-dim bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>{activeTransits} Transits Live</span>
                </div>
              </div>

              {/* Dynamic Live Rescue Transaction Feed */}
              <div className="space-y-2.5 font-mono text-xs">
                {dispatchFeed.map((ev, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-secondary-fixed/30 transition-all animate-fade-in"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${ev.statusClass} text-base`}>{ev.dot}</span>
                      <div>
                        <span className="font-bold text-white">{ev.van}</span>
                        <span className="text-surface-dim ml-1">{ev.desc}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[11px] ${ev.statusClass} font-bold`}>{ev.status}</span>
                      <span className="block text-[10px] text-surface-dim/70">{ev.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual Prominent Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left mb-12">
              {/* Action 1: Donors */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-primary-fixed transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="material-symbols-outlined text-primary-fixed text-4xl">restaurant</span>
                    <span className="data-badge data-badge-live text-white bg-primary">FOOD DONORS</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md font-bold text-white mb-2">Report Surplus Food</h3>
                  <p className="font-body-md text-body-md text-surface-dim mb-6">
                    Have unserved banquet trays, hotel buffet surplus, or institutional kitchen leftovers? Log your pickup in 90 seconds. We dispatch insulated vans immediately.
                  </p>
                </div>
                <button
                  className="w-full bg-primary-container text-on-primary font-label-lg py-3.5 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  onClick={() => openWorkspace('donor')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  Initiate Rapid Surplus Pickup
                </button>
              </div>

              {/* Action 2: Recipients */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-secondary-fixed transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="material-symbols-outlined text-secondary-fixed text-4xl">home_work</span>
                    <span className="data-badge data-badge-verified">RECIPIENT HUBS</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md font-bold text-white mb-2">Find Food Donations</h3>
                  <p className="font-body-md text-body-md text-surface-dim mb-6">
                    Are you an accredited shelter, soup kitchen, or elder care home? Register your cold-chain capacity and meal needs to join our automated allocation grid.
                  </p>
                </div>
                <button
                  className="w-full bg-secondary text-white font-label-lg py-3.5 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  onClick={() => openWorkspace('recipient')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">how_to_reg</span>
                  Register Recipient Center
                </button>
              </div>
            </div>

            {/* 24/7 Hotline */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-fixed text-3xl animate-bounce">call</span>
                <div className="text-left">
                  <span className="font-label-sm text-label-sm text-surface-dim uppercase block">
                    Emergency Hunger & Surplus Dispatch
                  </span>
                  <a
                    href="tel:18007682427"
                    className="font-headline-md text-headline-md font-bold text-white tracking-wider hover:text-primary-fixed transition-colors"
                  >
                    1800-POT-BHAR (1800-768-2427)
                  </a>
                </div>
              </div>
              <span className="text-xs text-surface-dim border-t sm:border-t-0 sm:border-l border-white/20 pt-2 sm:pt-0 sm:pl-4">
                Toll-Free 24 Hours · Hindi, Marathi, Tamil, Bengali & English
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================ */}
      {/* WEB FOOTER                                                       */}
      {/* ================================================================ */}
      <footer className="bg-surface-container-low border-t border-outline-variant w-full mt-auto" data-warmth="1.0">
        <div className="w-full max-w-7xl mx-auto px-margin py-space-xl flex flex-col md:flex-row justify-between items-center gap-gutter">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded bg-primary-container flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-base">soup_kitchen</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                POTBHAR
              </span>
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              © 2025 POTBHAR Foundation. Har Pet Bhare, Har Nivala Sambhale. Certified FSSAI Surplus Recovery Protocol Compliant. Hunger Emergency Hotline: 1800-POT-BHAR
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <a className="text-on-surface-variant font-label-sm hover:text-primary underline transition-colors duration-150" href="#impact">
              Impact Reports
            </a>
            <a className="text-on-surface-variant font-label-sm hover:text-primary underline transition-colors duration-150" href="#freshguard">
              Food Safety & Quality Check
            </a>
            <a className="text-on-surface-variant font-label-sm hover:text-primary underline transition-colors duration-150" href="#pathways">
              Two Pathways
            </a>
            <a className="text-on-surface-variant font-label-sm hover:text-primary underline transition-colors duration-150" href="#case-studies">
              Donor Integrity Code
            </a>
            <a className="text-on-surface-variant font-label-sm hover:text-primary underline transition-colors duration-150" href="#report-action">
              Volunteer Onboarding
            </a>
            <Link className="text-on-surface-variant font-label-sm hover:text-primary underline transition-colors duration-150" to="/dashboard">
              Member Dashboard
            </Link>
          </div>
        </div>
      </footer>


      {/* ================================================================ */}
      {/* FLOATING ROLE SWITCHER WIDGET                                    */}
      {/* ================================================================ */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full shadow-2xl border border-white/20 backdrop-blur-md text-xs">
        <span className="material-symbols-outlined text-primary-fixed text-base">swap_horiz</span>
        <span className="font-semibold text-white hidden sm:inline">Switch View:</span>
        <div className="flex items-center gap-1.5">
          <button
            className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-primary-container text-white transition-colors text-[11px] font-bold cursor-pointer"
            onClick={() => { loginAsDemo('donor'); openWorkspace('donor'); }}
          >
            Donor
          </button>
          <button
            className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-secondary text-white transition-colors text-[11px] font-bold cursor-pointer"
            onClick={() => { loginAsDemo('recipient'); openWorkspace('recipient'); }}
          >
            Recipient
          </button>
          <button
            className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-tertiary-container text-white transition-colors text-[11px] font-bold cursor-pointer"
            onClick={() => { loginAsDemo('admin'); openWorkspace('admin'); }}
          >
            Dispatcher/Ops
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* MODAL 1: AUTHENTICATION (Sign In / Register / Demo 1-Click)       */}
      {/* ================================================================ */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl shadow-2xl border border-outline-variant overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant bg-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm">
                  <span className="material-symbols-outlined text-base">soup_kitchen</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">POTBHAR Access</h3>
                  <span className="text-[11px] text-on-surface-variant">Institutional Surplus Recovery Network</span>
                </div>
              </div>
              <button
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                onClick={() => setAuthModalOpen(false)}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="flex border-b border-outline-variant bg-surface-container">
              <button
                className={`flex-1 py-3 text-xs font-bold transition-all cursor-pointer ${
                  authModalTab === 'login'
                    ? 'border-b-2 border-primary text-primary bg-surface-container-lowest'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => setAuthModalTab('login')}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-3 text-xs font-semibold transition-all cursor-pointer ${
                  authModalTab === 'register'
                    ? 'border-b-2 border-primary text-primary bg-surface-container-lowest'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => setAuthModalTab('register')}
              >
                Register Organization
              </button>
              <button
                className={`flex-1 py-3 text-xs font-semibold transition-all cursor-pointer ${
                  authModalTab === 'demo'
                    ? 'border-b-2 border-primary text-primary bg-surface-container-lowest'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => setAuthModalTab('demo')}
              >
                1-Click Test
              </button>
            </div>

            <div className="p-6">
              {authModalTab === 'login' && (
                <form className="space-y-4" onSubmit={handleAuthSubmit}>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Official Work Email or FSSAI License ID
                    </label>
                    <input
                      className="w-full text-xs p-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="e.g. chef@grandsapphire.com or FSSAI-2119"
                      required
                      type="text"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">
                      Access Password / Security PIN
                    </label>
                    <input
                      className="w-full text-xs p-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="••••••••"
                      required
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-on-surface-variant">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input defaultChecked className="accent-primary rounded" type="checkbox" /> Remember Session
                    </label>
                    <button
                      type="button"
                      className="text-primary hover:underline cursor-pointer"
                      onClick={() => showToast('Demo credentials reset key sent.', 'info')}
                    >
                      Forgot Key?
                    </button>
                  </div>
                  <button
                    className="w-full py-3 rounded-lg bg-primary-container text-on-primary font-bold text-xs shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-sm">login</span> Secure Sign In
                  </button>
                </form>
              )}

              {authModalTab === 'register' && (
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    showToast('Registration application submitted for FSSAI verification!', 'success')
                    setAuthModalOpen(false)
                  }}
                >
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Organization Type</label>
                    <select className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface focus:border-primary">
                      <option>Commercial Food Donor (Banquet / Hotel / Caterer)</option>
                      <option>Verified Recipient Hub (Shelter / Community Kitchen)</option>
                      <option>Certified Food Safety Assessor (FSSAI Accredited)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Entity Legal Name</label>
                    <input
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface"
                      placeholder="e.g. Bombay Central Kitchens"
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">FSSAI License / NGO Darpan Number</label>
                    <input
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface"
                      placeholder="14-digit registration number"
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Authorized Admin Email</label>
                    <input
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface"
                      placeholder="dispatch@organization.org"
                      required
                      type="email"
                    />
                  </div>
                  <button
                    className="w-full py-3 rounded-lg bg-secondary text-white font-bold text-xs shadow-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-sm">how_to_reg</span> Complete Onboarding Verification
                  </button>
                </form>
              )}

              {authModalTab === 'demo' && (
                <div className="space-y-3">
                  <p className="text-xs text-on-surface-variant mb-2">
                    Test the end-to-end platform instantaneously with pre-configured active pilot personas:
                  </p>
                  <button
                    className="w-full p-3 rounded-xl border border-primary-container/40 bg-surface-container-low hover:bg-primary-fixed/20 transition-colors flex items-center justify-between text-left cursor-pointer"
                    onClick={() => { loginAsDemo('donor'); setAuthModalOpen(false); }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                        FD
                      </div>
                      <div>
                        <div className="text-xs font-bold text-on-surface">Food Donor Persona</div>
                        <div className="text-[11px] text-on-surface-variant">Grand Sapphire Banquet Hall · Chef Vikram</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary text-base">arrow_forward</span>
                  </button>

                  <button
                    className="w-full p-3 rounded-xl border border-secondary-fixed bg-surface-container-low hover:bg-secondary-fixed/20 transition-colors flex items-center justify-between text-left cursor-pointer"
                    onClick={() => { loginAsDemo('recipient'); setAuthModalOpen(false); }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary text-white flex items-center justify-center font-bold text-xs">
                        RH
                      </div>
                      <div>
                        <div className="text-xs font-bold text-on-surface">Recipient Hub Persona</div>
                        <div className="text-[11px] text-on-surface-variant">Asha Kiran Community Shelter · Sister Mary</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-base">arrow_forward</span>
                  </button>

                  <button
                    className="w-full p-3 rounded-xl border border-tertiary-fixed bg-surface-container-low hover:bg-tertiary-fixed/20 transition-colors flex items-center justify-between text-left cursor-pointer"
                    onClick={() => { loginAsDemo('admin'); setAuthModalOpen(false); }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-tertiary text-white flex items-center justify-center font-bold text-xs">
                        AD
                      </div>
                      <div>
                        <div className="text-xs font-bold text-on-surface">Central Ops & Compliance</div>
                        <div className="text-[11px] text-on-surface-variant">FSSAI Central Assessor · Anand Parikh</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-tertiary text-base">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL 2: ROLE-DEDICATED INTERACTIVE WORKSPACE                     */}
      {/* ================================================================ */}
      {roleWorkspaceOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          <div className="bg-surface-container-lowest max-w-5xl w-full rounded-2xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Workspace Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">dashboard</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Operations & Dispatch Control
                    </h2>
                    <span className="data-badge data-badge-verified">ACTIVE RUNTIME</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Live management corridor under FSSAI Safe Food Recovery Mandate §8.4
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-lg bg-surface-container p-1 border border-outline-variant text-xs">
                  <button
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      workspaceRole === 'donor' ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    onClick={() => setWorkspaceRole('donor')}
                  >
                    Donor Portal
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      workspaceRole === 'recipient' ? 'bg-secondary text-white font-bold' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    onClick={() => setWorkspaceRole('recipient')}
                  >
                    Recipient Hub
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      workspaceRole === 'admin' ? 'bg-tertiary-container text-white font-bold' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    onClick={() => setWorkspaceRole('admin')}
                  >
                    Ops & Compliance
                  </button>
                </div>
                <button
                  className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                  onClick={() => setRoleWorkspaceOpen(false)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Workspace Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-surface-container-low/40">
              
              {/* VIEW 1: DONOR PORTAL INTAKE SIMULATOR */}
              {workspaceRole === 'donor' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Batch Log Form */}
                    <div className="md:col-span-7 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">add_task</span> Log Surplus Batch
                        </h3>
                        <span className="data-badge data-badge-live">STEP 1 LOGGING</span>
                      </div>

                      <form className="space-y-4" onSubmit={handleBatchSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1">Food Category</label>
                            <select
                              className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface"
                              value={donorFoodCategory}
                              onChange={(e) => setDonorFoodCategory(e.target.value)}
                            >
                              <option value="Cooked Rice / Biryani / Pulav">Cooked Rice & Biryani</option>
                              <option value="Lentil Curry / Dal Makhani">Lentil Curry / Dal Makhani</option>
                              <option value="Paneer Butter Gravy">Paneer Gravy & Vegetable Korma</option>
                              <option value="Chapatis / Naan Breads">Chapatis / Tandoori Breads</option>
                              <option value="Sweets / Gulab Jamun">Traditional Sweets</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1">Surplus Weight (kg)</label>
                            <input
                              className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface"
                              max="1000"
                              min="5"
                              required
                              type="number"
                              value={donorWeight}
                              onChange={(e) => setDonorWeight(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1">Current Holding Temp (°C)</label>
                            <input
                              className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface"
                              required
                              step="0.1"
                              type="number"
                              value={donorTemp}
                              onChange={(e) => setDonorTemp(parseFloat(e.target.value) || 0)}
                            />
                            <span className="text-[10px] text-secondary font-medium">✓ Hot Compliant (&gt;60°C)</span>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-on-surface mb-1">Kitchen Completion Time</label>
                            <input
                              className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface"
                              type="time"
                              value={donorTime}
                              onChange={(e) => setDonorTime(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-on-surface mb-1">Packaging & Cambro Spec</label>
                          <select className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-white text-on-surface">
                            <option>Food-Grade Stainless Steel Insulated Cambros (Pre-sealed)</option>
                            <option>Deep Gastro Pan Containers with Airtight Lids</option>
                            <option>Disposable Heavy-Duty Foil Containers (Sealed)</option>
                          </select>
                        </div>

                        <div className="p-4 rounded-xl border border-dashed border-outline-variant bg-surface-container-low text-center">
                          <span className="material-symbols-outlined text-primary text-3xl mb-1">photo_camera</span>
                          <div className="text-xs font-bold text-on-surface">Food Photo & Quality Preview</div>
                          <div className="text-[11px] text-on-surface-variant">Checking container freshness & steam levels</div>
                        </div>

                        <button
                          className="w-full py-3 rounded-lg bg-primary-container text-on-primary font-bold text-xs shadow-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          type="submit"
                        >
                          <span className="material-symbols-outlined text-sm">bolt</span> Submit Surplus & Request Pickup Van
                        </button>
                      </form>
                    </div>

                    {/* Donor Active Batches List */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-outline">Active Donor Dispatches</h4>
                          <span className="data-badge data-badge-live">TODAY</span>
                        </div>
                        <div className="space-y-3">
                          {donorBatches.map((b) => (
                            <div key={b.id} className="p-3 rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-on-surface">{b.id}</span>
                                <span className={`data-badge data-badge-${b.badgeType || 'verified'}`}>{b.status}</span>
                              </div>
                              <div className="text-on-surface-variant text-[11px]">{b.details}</div>
                              <div className="mt-2 pt-2 border-t border-outline-variant/50 flex justify-between text-[11px] text-outline">
                                <span>Temp: {b.temp}</span>
                                <span className="text-secondary font-bold">{b.note}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-primary-fixed/20 border border-primary-fixed text-xs text-on-primary-fixed-variant">
                        <span className="font-bold block mb-1">★ Donor Tax & ESG Credit Active</span>
                        All logged meals automatically receive verified digital certificates under Corporate Social Responsibility Schedule VII norms.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: RECIPIENT PORTAL MATCH ACCEPTANCE FEED */}
              {workspaceRole === 'recipient' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary text-white flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined">soup_kitchen</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-on-surface">Asha Kiran Community Shelter — Receiving Station</div>
                        <div className="text-xs text-on-surface-variant">Capacity: 350 diners tonight · Holding Refrigerator: None (Immediate Hot Service Only)</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="data-badge data-badge-live">WAITING INCOMING BATCHES</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recipientMatches.map((m) => (
                      <div
                        key={m.id}
                        className={`bg-surface-container-lowest p-5 rounded-2xl border shadow-sm flex flex-col justify-between ${
                          m.status === 'ACCEPTED' ? 'border-secondary bg-green-50/30' : 'border-outline-variant'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono font-bold text-xs text-primary">BATCH #{m.id}</span>
                            <span className="data-badge data-badge-verified">MATCH: {m.score}</span>
                          </div>
                          <h4 className="font-headline-sm text-sm font-bold text-on-surface mb-1">{m.title}</h4>
                          <p className="text-xs text-on-surface-variant mb-3">{m.donor}</p>
                          <div className="space-y-1.5 p-3 rounded-lg bg-surface-container-low text-xs font-mono mb-4">
                            {m.portions && (
                              <div className="flex justify-between">
                                <span>Portions:</span><span className="font-bold">{m.portions}</span>
                              </div>
                            )}
                            {m.eta && (
                              <div className="flex justify-between text-secondary">
                                <span>Transit ETA:</span><span className="font-bold">{m.eta}</span>
                              </div>
                            )}
                            {m.holding && (
                              <div className="flex justify-between text-outline">
                                <span>Holding Limit:</span><span>{m.holding}</span>
                              </div>
                            )}
                            {m.compatibility && (
                              <div className="flex justify-between text-error">
                                <span>Compatibility:</span><span className="font-bold">{m.compatibility}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {m.status === 'ACCEPTED' ? (
                          <div className="py-2 rounded-lg bg-secondary/15 text-secondary text-xs font-bold text-center flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span> DISPATCH ACCEPTED
                          </div>
                        ) : m.status === 'DECLINED' ? (
                          <div className="py-2 rounded-lg bg-red-100 text-error text-xs font-bold text-center">
                            DECLINED
                          </div>
                        ) : m.status === 'REROUTED' ? (
                          <button className="w-full py-2.5 rounded-lg bg-surface-container text-outline text-xs font-semibold cursor-not-allowed" disabled>
                            Auto-Rerouted to Cold Hub
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              className="flex-1 py-2.5 rounded-lg bg-secondary text-white text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-1 cursor-pointer"
                              onClick={() => handleAcceptBatch(m.id)}
                            >
                              <span className="material-symbols-outlined text-sm">check_circle</span> Accept Dispatch
                            </button>
                            <button
                              className="px-3 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant hover:text-error text-xs font-semibold transition-colors cursor-pointer"
                              onClick={() => handleDeclineBatch(m.id)}
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW 3: OPS DISPATCH & AUDIT TRAIL (Admin View) */}
              {workspaceRole === 'admin' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
                      <span className="text-[11px] font-bold text-outline uppercase">Active Vans in Transit</span>
                      <div className="text-2xl font-bold text-primary mt-1">14 Vehicles</div>
                      <span className="text-[10px] text-secondary font-semibold">All telemetry &gt;60°C hot holding</span>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
                      <span className="text-[11px] font-bold text-outline uppercase">Today's Rescued Volume</span>
                      <div className="text-2xl font-bold text-secondary mt-1">1,842 kg</div>
                      <span className="text-[10px] text-on-surface-variant">4,605 dignified hot meals</span>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
                      <span className="text-[11px] font-bold text-outline uppercase">Biogas Composting Divert</span>
                      <div className="text-2xl font-bold text-tertiary mt-1">310 kg</div>
                      <span className="text-[10px] text-outline">100% diverted from Ghazipur</span>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
                      <span className="text-[11px] font-bold text-outline uppercase">FSSAI Audit Compliance</span>
                      <div className="text-2xl font-bold text-on-surface mt-1">99.8%</div>
                      <span className="text-[10px] text-secondary font-semibold">Zero biological safety incidents</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-4">
                      <div>
                        <h3 className="font-headline-sm text-sm font-bold text-on-surface">Live Dispatch & Safety Triage Queue</h3>
                        <span className="text-xs text-on-surface-variant">Assessor decision gatekeeping & dual-cryptographic release</span>
                      </div>
                      <button
                        className="px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-container text-on-surface flex items-center gap-1.5 cursor-pointer"
                        onClick={() => showToast('Refreshed real-time telemetry from Mumbai corridor sensors.', 'info')}
                      >
                        <span className="material-symbols-outlined text-sm">refresh</span> Refresh Feed
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-surface-container uppercase text-outline text-[11px]">
                          <tr>
                            <th className="py-3 px-3">Batch ID</th>
                            <th className="py-3 px-3">Donor Kitchen</th>
                            <th className="py-3 px-3">Food Type & Weight</th>
                            <th className="py-3 px-3">Temp Probe</th>
                            <th className="py-3 px-3">Quality Check</th>
                            <th className="py-3 px-3">Inspector Decision</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/50">
                          {adminQueue.map((item) => (
                            <tr key={item.id}>
                              <td className="py-3 px-3 font-bold text-primary">{item.id}</td>
                              <td className="py-3 px-3 font-sans">{item.kitchen}</td>
                              <td className="py-3 px-3">{item.typeWeight}</td>
                              <td className={`py-3 px-3 font-bold ${item.tempPass ? 'text-secondary' : 'text-error'}`}>
                                {item.temp}
                              </td>
                              <td className="py-3 px-3">
                                <span className={`data-badge ${item.tempPass ? 'data-badge-verified' : 'data-badge-live'}`}>
                                  {item.quality}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                {item.decision === 'APPROVED_FOR_HUMANS' ? (
                                  <span className="px-2 py-1 rounded bg-secondary text-white font-sans font-bold">
                                    ✓ Approved For Humans
                                  </span>
                                ) : item.decision === 'DIVERTED_TO_ANIMALS_KHAAD' ? (
                                  <span className="px-2 py-1 rounded bg-amber-600 text-white font-sans font-bold">
                                    🐄 Diverted To Gaushalas / Khaad
                                  </span>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    {item.tempPass ? (
                                      <button
                                        className="px-2.5 py-1 rounded bg-secondary text-white font-sans font-bold hover:brightness-110 cursor-pointer"
                                        onClick={() => handleAdminApprove(item.id)}
                                      >
                                        Approve for Humans
                                      </button>
                                    ) : (
                                      <button
                                        className="px-2.5 py-1 rounded bg-surface-container text-outline font-sans opacity-50 cursor-not-allowed"
                                        disabled
                                      >
                                        Locked
                                      </button>
                                    )}
                                    <button
                                      className="px-2.5 py-1 rounded bg-amber-600 text-white font-sans font-bold hover:brightness-110 cursor-pointer"
                                      onClick={() => handleAdminDivert(item.id)}
                                    >
                                      Route to Gaushalas / Khaad
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TOAST NOTIFICATION CONTAINER                                     */}
      {/* ================================================================ */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-right duration-200 ${
              toast.type === 'success'
                ? 'bg-secondary text-white border-secondary'
                : toast.type === 'error'
                ? 'bg-error text-white border-error'
                : 'bg-surface-container-lowest text-on-surface border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
