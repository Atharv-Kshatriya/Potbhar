import { useState, useEffect } from 'react'
import { listMatches, acceptMatch, declineMatch, createRequirement, listRequirements } from '../services/api'
import { StatusBadge, Spinner, Modal, Alert } from '../components/ui/Components'
import AppLayout from '../components/layout/AppLayout'

export default function FoodOffers() {
  const [matches, setMatches] = useState([])
  const [reqs, setReqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState('')
  const [showReqForm, setShowReqForm] = useState(false)
  const [req, setReq] = useState({ food_category: '', quantity_needed_kg: '', capacity_kg: '' })
  const [msg, setMsg] = useState('')

  const load = () => {
    Promise.all([listMatches(), listRequirements()])
      .then(([m, r]) => {
        setMatches(m.data)
        setReqs(r.data)
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    load()
  }, [])

  const accept = async (id) => {
    setActing(id)
    try {
      await acceptMatch(id)
      load()
    } finally {
      setActing('')
    }
  }
  const decline = async (id) => {
    setActing(id)
    try {
      await declineMatch(id)
      load()
    } finally {
      setActing('')
    }
  }

  const submitReq = async () => {
    try {
      await createRequirement({
        ...req,
        quantity_needed_kg: +req.quantity_needed_kg,
        capacity_kg: +req.capacity_kg,
      })
      setMsg('Food requirement posted successfully!')
      setShowReqForm(false)
      load()
    } catch {
      setMsg('Failed to save requirement')
    }
  }

  const FOOD_CATS = [
    'Biryani',
    'Curry',
    'Dal',
    'Cooked Rice',
    'Roti',
    'Bread',
    'Cooked Vegetables',
    'Meat Dishes',
    'Fruits',
    'Snacks/Sweets',
    'Other',
  ]

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#006B62] flex items-center gap-3">
              <span>🍱</span> Food Offers for Shelter
            </h1>
            <p className="text-[#637473] text-sm mt-1">
              Surplus meals matched to your organization based on proximity and capacity.
            </p>
          </div>
          <button
            onClick={() => setShowReqForm(true)}
            className="btn-primary-teal text-xs py-2.5 px-6 shadow-sm self-start sm:self-auto"
          >
            + Declare Shelter Requirement
          </button>
        </div>

        {msg && (
          <div className="mb-6">
            <Alert type="success" message={msg} />
          </div>
        )}

        {/* Active Requirements */}
        {reqs.length > 0 && (
          <div className="card mb-6 p-5">
            <h3 className="font-bold text-[#1C2424] text-sm mb-3">Your Active Shelter Requirements</h3>
            <div className="flex flex-wrap gap-2.5">
              {reqs
                .filter((r) => r.recipient_id)
                .map((r) => (
                  <div
                    key={r.id}
                    className="bg-[#E6F4F1] border border-[#B0DCD7] rounded-2xl px-4 py-2 text-xs"
                  >
                    <span className="text-[#006B62] font-bold">{r.food_category}</span>
                    <span className="text-[#475454] ml-2">
                      {r.quantity_needed_kg} kg needed • {r.capacity_kg} kg max cap
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : matches.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EDE5D8] flex items-center justify-center text-3xl mx-auto mb-3">
              🔍
            </div>
            <h3 className="text-xl font-bold text-[#1C2424] mb-1">No pending offers right now</h3>
            <p className="text-[#637473] text-xs max-w-sm mx-auto mb-4">
              Declare your daily food capacity to automatically match with banquet and catering surplus.
            </p>
            <button onClick={() => setShowReqForm(true)} className="btn-primary-teal text-xs py-2 px-6">
              Declare Requirement →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((m) => (
              <div
                key={m.id}
                className="card border border-[#EDE5D8] hover:border-[#006B62] transition-all p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#1C2424]">{m.batch_food}</h3>
                      <StatusBadge status={m.status} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs mb-4 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5D8]">
                      <div>
                        <span className="text-[#637473]">Offered Quantity</span>
                        <div className="text-[#1C2424] font-extrabold text-sm mt-0.5">
                          {m.offered_quantity_kg} kg
                        </div>
                      </div>
                      <div>
                        <span className="text-[#637473]">Distance</span>
                        <div className="text-[#006B62] font-extrabold text-sm mt-0.5">
                          {m.estimated_distance_km} km
                        </div>
                      </div>
                      <div>
                        <span className="text-[#637473]">Proximity Match</span>
                        <div className="text-[#D97706] font-extrabold text-sm mt-0.5">
                          {Math.round((m.match_score || 0) * 100)}%
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-[#9BA8A7]">
                      Dispatched offer: {new Date(m.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                {m.status === 'OFFERED' && (
                  <div className="flex gap-3 mt-4 pt-4 border-t border-[#EDE5D8]">
                    <button
                      onClick={() => accept(m.id)}
                      disabled={acting === m.id}
                      className="btn-primary-teal text-xs flex-1 py-2.5 shadow-sm"
                    >
                      {acting === m.id ? <Spinner size="sm" /> : '✅'} Accept Food Offer
                    </button>
                    <button
                      onClick={() => decline(m.id)}
                      disabled={acting === m.id}
                      className="btn-secondary text-xs flex-1 py-2.5 text-rose-700 hover:bg-rose-50"
                    >
                      ❌ Decline Offer
                    </button>
                  </div>
                )}

                {m.status === 'ACCEPTED' && (
                  <div className="mt-4 pt-3 border-t border-[#EDE5D8] flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <span>✅</span> Accepted — Hyperlocal delivery dispatch is underway.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Requirement Form Modal */}
      <Modal open={showReqForm} onClose={() => setShowReqForm(false)} title="Declare Food Requirement">
        <div className="space-y-4">
          <div>
            <label className="label">Food Category Needed</label>
            <select
              className="select"
              value={req.food_category}
              onChange={(e) => setReq((p) => ({ ...p, food_category: e.target.value }))}
            >
              <option value="">Select category…</option>
              {FOOD_CATS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Quantity Needed (kg)</label>
              <input
                className="input"
                type="number"
                min="1"
                value={req.quantity_needed_kg}
                onChange={(e) => setReq((p) => ({ ...p, quantity_needed_kg: e.target.value }))}
                placeholder="e.g. 50"
              />
            </div>
            <div>
              <label className="label">Max Storage Capacity (kg)</label>
              <input
                className="input"
                type="number"
                min="1"
                value={req.capacity_kg}
                onChange={(e) => setReq((p) => ({ ...p, capacity_kg: e.target.value }))}
                placeholder="e.g. 100"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowReqForm(false)} className="btn-secondary flex-1 text-xs py-2.5">
              Cancel
            </button>
            <button onClick={submitReq} className="btn-primary-teal flex-1 text-xs py-2.5 shadow-md">
              Save Requirement →
            </button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}
