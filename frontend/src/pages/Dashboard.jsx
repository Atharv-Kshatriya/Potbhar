import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { listBatches, listMatches, listWaste, getAnalyticsSummary } from '../services/api'
import { StatusBadge, StatCard, DemoNotice, Spinner } from '../components/ui/Components'
import AppLayout from '../components/layout/AppLayout'

export default function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState({ batches: [], matches: [], waste: [], summary: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      listBatches().catch(() => ({ data: [] })),
      listMatches().catch(() => ({ data: [] })),
      listWaste().catch(() => ({ data: [] })),
      getAnalyticsSummary().catch(() => ({ data: null })),
    ])
      .then(([b, m, w, s]) => {
        setData({ batches: b.data, matches: m.data, waste: w.data, summary: s.data })
      })
      .finally(() => setLoading(false))
  }, [])

  const { batches, matches, waste, summary } = data
  const food = summary?.food_recovery || {}
  const wm = summary?.waste_management || {}

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <DemoNotice />

        {/* Dashboard Title & Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#006B62] mb-1">
              Welcome, <span className="text-[#D97706]">{user?.full_name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-[#637473] text-sm">
              {user?.role === 'DONOR' && 'Your food donations are nourishing local communities and preventing landfill waste.'}
              {user?.role === 'RECIPIENT' && 'Check incoming hot meals and produce offers for your shelter.'}
              {user?.role === 'ASSESSOR' && 'Review food batches awaiting FreshGuard AI and safety verification.'}
              {user?.role === 'ADMIN' && 'Citywide chain-of-custody overview, partner NGOs, and ESG metrics.'}
              {user?.role === 'PROCESSOR' && 'Track non-edible organic food batches routed to composting and biogas.'}
            </p>
          </div>

          {user?.role === 'DONOR' && (
            <Link to="/batches/new" className="btn-primary-teal text-sm py-2.5 px-6 shadow-sm self-start sm:self-auto">
              + Report Surplus Food
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            {/* Key Metrics / StatCards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon="🍲"
                label="Total Reported"
                value={`${food.total_reported_kg || 0} kg`}
                sub="Logged by donors"
                color="brand"
              />
              <StatCard
                icon="✅"
                label="Delivered"
                value={`${food.total_delivered_kg || 0} kg`}
                sub="Shelter confirmed"
                color="green"
              />
              <StatCard
                icon="❤️"
                label="Meals Estimated"
                value={(food.estimated_meals_served || 0).toLocaleString()}
                sub="~250g wholesome portion"
                color="amber"
              />
              <StatCard
                icon="♻️"
                label="Waste Diverted"
                value={`${wm.total_waste_diverted_kg || 0} kg`}
                sub="To biogas & compost"
                color="blue"
              />
            </div>

            {/* Role-specific Quick Actions */}
            {user?.role === 'DONOR' && (
              <div className="grid md:grid-cols-3 gap-5 mb-8">
                <Link
                  to="/batches/new"
                  className="card p-6 border border-[#EDE5D8] hover:border-[#006B62] group cursor-pointer transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#006B62] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    ➕
                  </div>
                  <h3 className="font-bold text-[#1C2424] text-base group-hover:text-[#006B62] transition-colors mb-1">
                    Report Surplus Food
                  </h3>
                  <p className="text-xs text-[#637473]">
                    Log warm banquet leftovers, cooked meals, or harvest produce in 60s.
                  </p>
                </Link>

                <Link
                  to="/scanner"
                  className="card p-6 border border-[#EDE5D8] hover:border-purple-500 group cursor-pointer transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F0ECF9] text-[#7C3AED] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    🔬
                  </div>
                  <h3 className="font-bold text-[#1C2424] text-base group-hover:text-purple-700 transition-colors mb-1">
                    FreshGuard Scanner
                  </h3>
                  <p className="text-xs text-[#637473]">
                    Run computer vision quality screening and FSSAI temperature checks.
                  </p>
                </Link>

                <Link
                  to="/waste"
                  className="card p-6 border border-[#EDE5D8] hover:border-emerald-600 group cursor-pointer transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    ♻️
                  </div>
                  <h3 className="font-bold text-[#1C2424] text-base group-hover:text-emerald-700 transition-colors mb-1">
                    Report Organic Waste
                  </h3>
                  <p className="text-xs text-[#637473]">
                    Route kitchen scraps and expired batches to certified composting units.
                  </p>
                </Link>
              </div>
            )}

            {user?.role === 'ASSESSOR' && (
              <div className="mb-8">
                <Link
                  to="/assessment-queue"
                  className="card p-6 border border-[#B0DCD7] bg-[#F0F9F8] hover:-translate-y-1 transition-all flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl border border-[#EDE5D8] flex items-center justify-center text-2xl shadow-sm">
                    🔍
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#006B62] text-lg">Safety Assessment Queue</h3>
                    <p className="text-[#637473] text-xs mt-0.5">
                      {batches.filter((b) => b.status === 'ASSESSMENT_REQUIRED').length} batch(es) awaiting your review
                    </p>
                  </div>
                  <div className="text-sm font-bold text-[#006B62] group-hover:translate-x-1 transition-transform">
                    Open Queue →
                  </div>
                </Link>
              </div>
            )}

            {user?.role === 'RECIPIENT' && (
              <div className="mb-8">
                <Link
                  to="/food-offers"
                  className="card p-6 border border-[#B0DCD7] bg-[#F0F9F8] hover:-translate-y-1 transition-all flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl border border-[#EDE5D8] flex items-center justify-center text-2xl shadow-sm">
                    🍱
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#006B62] text-lg">Incoming Food Offers</h3>
                    <p className="text-[#637473] text-xs mt-0.5">
                      Review nutritious surplus food batches matched for your shelter residents.
                    </p>
                  </div>
                  <div className="text-sm font-bold text-[#006B62] group-hover:translate-x-1 transition-transform">
                    View Offers →
                  </div>
                </Link>
              </div>
            )}

            {user?.role === 'LOGISTICS' && (
              <div className="mb-8">
                <Link
                  to="/deliveries"
                  className="card p-6 border border-[#F58220]/30 bg-[#FFF9F3] hover:-translate-y-1 transition-all flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl border border-[#EDE5D8] flex items-center justify-center text-2xl shadow-sm">
                    🚚
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#D66C12] text-lg">Active Delivery Radar</h3>
                    <p className="text-[#637473] text-xs mt-0.5">
                      View assigned donor pickups, route navigation, and record doorstep handovers.
                    </p>
                  </div>
                  <div className="text-sm font-bold text-[#D66C12] group-hover:translate-x-1 transition-transform">
                    Open Radar →
                  </div>
                </Link>
              </div>
            )}

            {/* Recent Batches Table Card */}
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#EDE5D8]">
                <div>
                  <h2 className="font-bold text-[#1C2424] text-lg">Recent Surplus Food Batches</h2>
                  <p className="text-xs text-[#637473]">Status and tracking of registered food</p>
                </div>
                {user?.role === 'DONOR' && (
                  <Link to="/batches/new" className="text-xs font-bold text-[#006B62] hover:underline">
                    View All Batches →
                  </Link>
                )}
              </div>

              {batches.length === 0 ? (
                <div className="text-center py-12 text-[#637473]">
                  <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#EDE5D8] flex items-center justify-center text-3xl mx-auto mb-3">
                    🍲
                  </div>
                  <p className="font-bold text-[#1C2424] text-sm">No food batches logged yet</p>
                  <p className="text-xs text-[#637473] mt-0.5 max-w-sm mx-auto">
                    Report surplus meals from your banquet or cafeteria to begin redistribution.
                  </p>
                  {user?.role === 'DONOR' && (
                    <Link to="/batches/new" className="btn-primary-teal text-xs py-2 px-5 mt-4">
                      Report First Batch →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EDE5D8]">
                        <th className="text-left text-xs text-[#637473] pb-3 font-bold">Food Description</th>
                        <th className="text-left text-xs text-[#637473] pb-3 font-bold">Quantity</th>
                        <th className="text-left text-xs text-[#637473] pb-3 font-bold">Status</th>
                        <th className="text-left text-xs text-[#637473] pb-3 font-bold">Logged Date</th>
                        <th className="text-right text-xs text-[#637473] pb-3 font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.slice(0, 8).map((b) => (
                        <tr key={b.id} className="table-row">
                          <td className="py-3.5 pr-4">
                            <div className="font-bold text-sm text-[#1C2424]">{b.food_category}</div>
                            <div className="text-xs text-[#637473] truncate max-w-[220px]">
                              {b.description || 'Surplus batch'}
                            </div>
                          </td>
                          <td className="py-3.5 pr-4 text-sm font-semibold text-[#1C2424]">
                            {b.quantity_kg} kg
                          </td>
                          <td className="py-3.5 pr-4">
                            <StatusBadge status={b.status} />
                          </td>
                          <td className="py-3.5 pr-4 text-xs text-[#637473]">
                            {new Date(b.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 text-right">
                            <Link
                              to={`/batches/${b.id}`}
                              className="text-xs font-bold text-[#006B62] hover:text-[#D97706] transition-colors"
                            >
                              Inspect Details →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Matches & Offers Activity */}
            {matches.length > 0 && (
              <div className="card">
                <div className="mb-4 pb-3 border-b border-[#EDE5D8]">
                  <h2 className="font-bold text-[#1C2424] text-lg">
                    {user?.role === 'RECIPIENT' ? 'Available Food Offers for You' : 'Recent Match Dispatches'}
                  </h2>
                  <p className="text-xs text-[#637473]">Hyperlocal proximity pairing</p>
                </div>
                <div className="space-y-3">
                  {matches.slice(0, 5).map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between bg-[#FAF7F2] border border-[#EDE5D8] rounded-2xl px-5 py-3.5"
                    >
                      <div>
                        <div className="text-sm font-bold text-[#1C2424]">
                          {m.batch_food} — <span className="text-[#006B62]">{m.offered_quantity_kg} kg</span>
                        </div>
                        <div className="text-xs text-[#637473] mt-0.5">
                          {m.recipient_name} • 📍 {m.estimated_distance_km} km away
                        </div>
                      </div>
                      <StatusBadge status={m.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}
