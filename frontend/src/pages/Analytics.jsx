import { useState, useEffect } from 'react'
import {
  getAnalyticsSummary,
  getAdminAnalytics,
  listOrgs,
  verifyOrg,
} from '../services/api'
import { StatCard, Spinner, StatusBadge, DemoNotice } from '../components/ui/Components'
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import AppLayout from '../components/layout/AppLayout'
import { useAuth } from '../context/AuthContext'

const COLORS = ['#006B62', '#D97706', '#16A34A', '#7C3AED', '#0284C7']

export default function Analytics() {
  const { user } = useAuth()
  const [summary, setSummary] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [orgs, setOrgs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getAnalyticsSummary(),
      user?.role === 'ADMIN' ? getAdminAnalytics() : Promise.resolve({ data: null }),
      user?.role === 'ADMIN' ? listOrgs() : Promise.resolve({ data: [] }),
    ])
      .then(([s, a, o]) => {
        setSummary(s.data)
        setAdmin(a.data)
        setOrgs(o.data)
      })
      .finally(() => setLoading(false))
  }, [user])

  const verifyOrgHandler = async (id) => {
    try {
      await verifyOrg(id)
      const r = await listOrgs()
      setOrgs(r.data)
    } catch {}
  }

  if (loading)
    return (
      <AppLayout>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    )

  const food = summary?.food_recovery || {}
  const wm = summary?.waste_management || {}
  const orgStats = summary?.organizations || {}

  const statusData = Object.entries(food.batches_by_status || {}).map(([name, value]) => ({
    name: name.replace(/_/g, ' '),
    value,
  }))

  const trendData = [
    { month: 'Aug', delivered: 12, waste: 8 },
    { month: 'Sep', delivered: 28, waste: 15 },
    { month: 'Oct', delivered: 45, waste: 22 },
    { month: 'Nov', delivered: 38, waste: 18 },
    {
      month: 'Dec',
      delivered: food.total_delivered_kg || 60,
      waste: wm.total_waste_diverted_kg || 30,
    },
  ]

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-6xl mx-auto">
        <DemoNotice />

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#006B62] flex items-center gap-3">
            <span>📊</span> Impact & ESG Analytics
          </h1>
          <p className="text-[#637473] text-sm mt-1">
            Audited meal recovery metrics, landfill diversion, and chain-of-custody tracking.
          </p>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon="🍲"
            label="Surplus Reported"
            value={`${food.total_reported_kg || 0} kg`}
            sub="From donor kitchens"
            color="brand"
          />
          <StatCard
            icon="✅"
            label="Confirmed Delivered"
            value={`${food.total_delivered_kg || 0} kg`}
            sub="Shelter confirmed only"
            color="green"
          />
          <StatCard
            icon="❤️"
            label="Meals Estimated"
            value={(food.estimated_meals_served || 0).toLocaleString()}
            sub="ESTIMATE: ~250g/meal"
            color="amber"
          />
          <StatCard
            icon="♻️"
            label="Waste Diverted"
            value={`${wm.total_waste_diverted_kg || 0} kg`}
            sub="Processor confirmed"
            color="blue"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Recovery Trend Chart */}
          <div className="card p-6">
            <h3 className="font-bold text-[#1C2424] text-base mb-4 pb-2 border-b border-[#EDE5D8]">
              Monthly Food Recovery vs. Waste Diversion (kg)
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorDel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006B62" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#006B62" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5D8" />
                <XAxis dataKey="month" tick={{ fill: '#637473', fontSize: 12 }} />
                <YAxis tick={{ fill: '#637473', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #EDE5D8',
                    borderRadius: 16,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="delivered"
                  stroke="#006B62"
                  strokeWidth={2}
                  fill="url(#colorDel)"
                  name="Delivered (kg)"
                />
                <Area
                  type="monotone"
                  dataKey="waste"
                  stroke="#16A34A"
                  strokeWidth={2}
                  fill="url(#colorWaste)"
                  name="Waste Diverted (kg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution Pie */}
          <div className="card p-6">
            <h3 className="font-bold text-[#1C2424] text-base mb-4 pb-2 border-b border-[#EDE5D8]">
              Surplus Batches by Operational Status
            </h3>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#FFFFFF',
                      border: '1px solid #EDE5D8',
                      borderRadius: 16,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-52 flex items-center justify-center text-xs text-[#9BA8A7]">
                No batch status data yet
              </div>
            )}
          </div>
        </div>

        {/* Metric Definitions Table */}
        <div className="card mb-8 p-6">
          <h3 className="font-bold text-[#1C2424] text-base mb-4 pb-2 border-b border-[#EDE5D8]">
            📋 Metric Verification & FSSAI Audit Protocol
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EDE5D8]">
                  <th className="text-left text-[#637473] pb-3 font-bold">Metric Indicator</th>
                  <th className="text-left text-[#637473] pb-3 font-bold">Verification Method</th>
                  <th className="text-right text-[#637473] pb-3 font-bold">Data Integrity</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Surplus Reported (kg)', 'Total quantity_kg from donor kitchen submissions', 'MEASURED'],
                  ['Confirmed Delivered (kg)', 'Recipient-confirmed delivery weight with digital QR signoff', 'MEASURED'],
                  ['Meals Estimated', 'Delivered kg × 4 (250g wholesome portion size)', 'ESTIMATE'],
                  ['Waste Diverted (kg)', 'Processor-confirmed received scale tickets', 'MEASURED'],
                  ['CO₂ Methane Avoided', 'Delivered kg × FAO emission factor (category-specific)', 'MODELED ESTIMATE'],
                ].map(([m, d, t]) => (
                  <tr key={m} className="table-row">
                    <td className="py-3 pr-4 font-bold text-[#1C2424]">{m}</td>
                    <td className="py-3 pr-4 text-[#637473] text-xs max-w-sm">{d}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`badge text-[10px] ${
                          t === 'MEASURED'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {t}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin: Organization Management */}
        {user?.role === 'ADMIN' && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#EDE5D8]">
              <div>
                <h3 className="font-bold text-[#006B62] text-lg">Partner Organization Governance</h3>
                <p className="text-xs text-[#637473]">Verify food donors, shelters, and processors</p>
              </div>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="text-[#637473]">
                  Total: <strong className="text-[#1C2424]">{orgStats.total || orgs.length}</strong>
                </span>
                <span className="text-[#006B62]">
                  Verified: <strong>{orgStats.verified || orgs.filter((o) => o.verification_status === 'VERIFIED').length}</strong>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#EDE5D8]">
                    <th className="text-left text-[#637473] pb-3 font-bold">Organization Name</th>
                    <th className="text-left text-[#637473] pb-3 font-bold">Role Type</th>
                    <th className="text-left text-[#637473] pb-3 font-bold">Verification</th>
                    <th className="text-right text-[#637473] pb-3 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orgs.map((o) => (
                    <tr key={o.id} className="table-row">
                      <td className="py-3 pr-4">
                        <div className="font-bold text-[#1C2424]">{o.name}</div>
                        <div className="text-xs text-[#637473] truncate max-w-[200px]">
                          {o.address || 'Location registered'}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-xs font-semibold text-[#475454]">
                        {o.organization_type}
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={o.verification_status} />
                      </td>
                      <td className="py-3 text-right">
                        {o.verification_status === 'PENDING' && (
                          <button
                            onClick={() => verifyOrgHandler(o.id)}
                            className="btn-primary-teal text-xs py-1.5 px-4 shadow-sm"
                          >
                            Verify Org
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Audit Logs */}
            {admin?.recent_audit_logs?.length > 0 && (
              <div className="mt-8 pt-5 border-t border-[#EDE5D8]">
                <h4 className="font-bold text-[#1C2424] text-sm mb-3">Recent Security & Regulatory Audit Logs</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {admin.recent_audit_logs.map((log, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-4 py-2.5 text-xs"
                    >
                      <span className="text-[#006B62] font-bold">{log.action}</span>
                      <span className="text-[#637473]">•</span>
                      <span className="text-[#475454]">{log.entity_type}</span>
                      <span className="text-[#9BA8A7] ml-auto">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
