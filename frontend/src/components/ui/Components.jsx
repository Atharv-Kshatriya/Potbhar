// Shared UI components — StatusBadge, StatCard, EmptyState, Spinner, Modal, DemoNotice, Alert

export function StatusBadge({ status }) {
  const map = {
    DRAFT: 'bg-slate-100 text-slate-700 border border-slate-200',
    SUBMITTED: 'bg-sky-50 text-sky-700 border border-sky-200',
    PENDING_INFORMATION: 'bg-amber-50 text-amber-700 border border-amber-200',
    ASSESSMENT_REQUIRED: 'bg-purple-50 text-purple-700 border border-purple-200',
    UNDER_ASSESSMENT: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    APPROVED: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    REJECTED: 'bg-rose-50 text-rose-700 border border-rose-200',
    MATCHING: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    MATCHED: 'bg-teal-50 text-teal-800 border border-teal-200',
    PICKUP_SCHEDULED: 'bg-amber-50 text-amber-800 border border-amber-200',
    IN_TRANSIT: 'bg-blue-50 text-blue-800 border border-blue-200',
    DELIVERED: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    CANCELLED: 'bg-slate-100 text-slate-500 border border-slate-200',
    EXPIRED: 'bg-gray-100 text-gray-500 border border-gray-200',
    // Org verification
    PENDING: 'bg-amber-50 text-amber-700 border border-amber-200',
    VERIFIED: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    SUSPENDED: 'bg-rose-50 text-rose-700 border border-rose-200',
    // Match
    OFFERED: 'bg-sky-50 text-sky-700 border border-sky-200',
    ACCEPTED: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    DECLINED: 'bg-rose-50 text-rose-700 border border-rose-200',
    COMPLETED: 'bg-teal-50 text-teal-700 border border-teal-200',
    // Waste
    REPORTED: 'bg-amber-50 text-amber-700 border border-amber-200',
    SCHEDULED: 'bg-sky-50 text-sky-700 border border-sky-200',
    COLLECTED: 'bg-teal-50 text-teal-700 border border-teal-200',
    RECEIVED: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    PROCESSED: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    // Risk
    STANDARD: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    ELEVATED: 'bg-rose-50 text-rose-700 border border-rose-200',
  }
  const cls = map[status] || 'bg-slate-100 text-slate-700 border border-slate-200'
  return <span className={`badge ${cls}`}>{status?.replace(/_/g, ' ')}</span>
}

export function StatCard({ icon, label, value, sub, color = 'brand' }) {
  const iconBgs = {
    brand: 'bg-[#E6F4F1] text-[#006B62]',
    green: 'bg-[#F0FDF4] text-[#16A34A]',
    blue: 'bg-[#EBF4FF] text-[#0284C7]',
    purple: 'bg-[#F0ECF9] text-[#7C3AED]',
    amber: 'bg-[#FEF3E2] text-[#D97706]',
  }
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl ${iconBgs[color] || iconBgs.brand}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-black text-[#1C2424]">{value}</div>
        <div className="text-xs font-bold text-[#475454] mt-0.5">{label}</div>
        {sub && <div className="text-[11px] text-[#9BA8A7] mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

export function Spinner({ size = 'md' }) {
  const s = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }[size]
  return (
    <div className={`${s} border-2 border-[#006B62] border-t-transparent rounded-full animate-spin`} />
  )
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-3xl border border-[#EDE5D8]">
      <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EDE5D8] flex items-center justify-center text-3xl mb-3">
        {icon}
      </div>
      <h3 className="text-base font-bold text-[#1C2424] mb-1">{title}</h3>
      <p className="text-[#637473] text-xs max-w-sm mb-5 leading-relaxed">{description}</p>
      {action}
    </div>
  )
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl border border-[#EDE5D8] p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-zoom-in text-[#1C2424]">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#EDE5D8]">
          <h2 className="text-xl font-bold text-[#006B62]">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EDE5D8] flex items-center justify-center text-slate-500 font-bold transition-colors"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Alert({ type = 'info', message }) {
  const map = {
    info: 'bg-sky-50 border-sky-200 text-sky-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-rose-50 border-rose-200 text-rose-800',
  }
  return (
    <div className={`border rounded-2xl p-3.5 text-xs font-medium ${map[type]}`}>{message}</div>
  )
}

export function DemoNotice() {
  return (
    <div className="bg-[#FEF3E2] border border-[#FDE68A] text-[#92400E] rounded-2xl px-4 py-2.5 text-xs font-medium flex items-center justify-between mb-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span>⚠️</span>
        <span><strong>Demonstration Environment</strong> — Live simulated audit trail & hyperlocal matching</span>
      </div>
      <span className="hidden sm:inline text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FDE68A]/60 text-[#78350F]">
        FSSAI Compliant
      </span>
    </div>
  )
}
