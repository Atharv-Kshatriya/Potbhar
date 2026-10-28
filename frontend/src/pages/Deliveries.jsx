import { useState, useEffect } from 'react'
import { listDeliveries, recordPickup, confirmDelivery } from '../services/api'
import { StatusBadge, Spinner, Alert, Modal } from '../components/ui/Components'
import AppLayout from '../components/layout/AppLayout'

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState('')
  const [modalDelivery, setModalDelivery] = useState(null)
  const [deliveredKg, setDeliveredKg] = useState('')
  const [notes, setNotes] = useState('')
  const [msg, setMsg] = useState('')

  const load = () => {
    listDeliveries()
      .then((res) => {
        setDeliveries(res.data)
      })
      .catch((err) => {
        console.error('Failed to load deliveries:', err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handlePickup = async (id) => {
    setActing(id)
    try {
      await recordPickup(id)
      setMsg('Food pickup recorded successfully! Status updated to IN TRANSIT.')
      load()
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to record pickup')
    } finally {
      setActing('')
    }
  }

  const handleConfirmDelivery = async () => {
    if (!modalDelivery) return
    setActing(modalDelivery.id)
    try {
      const kg = parseFloat(deliveredKg) || modalDelivery.quantity_kg
      await confirmDelivery(modalDelivery.id, {
        delivered_quantity_kg: kg,
        notes: notes || 'Doorstep delivery completed with temperature & hygiene verification.'
      })
      setMsg(`Delivery completed! Handover verified for ${modalDelivery.recipient_name}.`)
      setModalDelivery(null)
      setDeliveredKg('')
      setNotes('')
      load()
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to confirm delivery')
    } finally {
      setActing('')
    }
  }

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#006B62] flex items-center gap-3">
              <span>🚚</span> Surplus Food Delivery Dispatch
            </h1>
            <p className="text-[#637473] text-sm mt-1">
              Active rapid transit fleet: Pick up surplus from donors and safely deliver to verified shelters.
            </p>
          </div>
          <button
            onClick={load}
            className="btn-secondary-outline text-xs py-2 px-4 shadow-sm self-start sm:self-auto flex items-center gap-2"
          >
            <span>🔄</span> Refresh Route Radar
          </button>
        </div>

        {msg && (
          <div className="mb-6">
            <Alert type="success" message={msg} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : deliveries.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[#E6F4F1] text-[#006B62] flex items-center justify-center text-3xl mx-auto mb-3">
              🛵
            </div>
            <h3 className="text-xl font-bold text-[#1C2424] mb-1">No Active Dispatches</h3>
            <p className="text-xs text-[#637473]">
              All assigned surplus food deliveries have been safely completed or none are currently scheduled.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {deliveries.map((del) => {
              const isScheduled = del.status === 'SCHEDULED'
              const isInTransit = del.status === 'IN_TRANSIT'
              const isDelivered = del.status === 'DELIVERED'

              return (
                <div
                  key={del.id}
                  className={`card border transition-all ${
                    isInTransit
                      ? 'border-[#F58220] ring-1 ring-[#F58220]/20 bg-[#FFFDF9]'
                      : 'border-[#EDE5D8]'
                  }`}
                >
                  {/* Top Bar with Status and Category */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[#EDE5D8]">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍲</span>
                      <div>
                        <h3 className="text-lg font-bold text-[#1C2424]">
                          {del.food_category || 'Wholesome Surplus Food'}
                        </h3>
                        <p className="text-xs text-[#637473]">
                          Batch ID: <span className="font-mono text-xs">{del.match_id ? del.match_id.substring(0, 8) : 'DISPATCH'}...</span> • {del.quantity_kg || 0} kg wholesome food
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={del.status} />
                      <span className="text-xs font-bold text-[#006B62] bg-[#E6F4F1] px-2.5 py-1 rounded-full border border-[#B0DCD7]">
                        ~{del.distance_km} km transit
                      </span>
                    </div>
                  </div>

                  {/* Route Visualizer Stepper */}
                  <div className="mb-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE5D8]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#9BA8A7] mb-3">
                      Live Delivery Progress
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center relative">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            isScheduled || isInTransit || isDelivered
                              ? 'bg-[#006B62] text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          ✓
                        </div>
                        <span className="text-xs font-bold mt-1 text-[#1C2424]">Pickup Assigned</span>
                        <span className="text-[10px] text-[#637473]">From Donor</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            isInTransit || isDelivered
                              ? 'bg-[#F58220] text-white animate-pulse'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          🛵
                        </div>
                        <span className="text-xs font-bold mt-1 text-[#1C2424]">In Transit</span>
                        <span className="text-[10px] text-[#637473]">Insulated Crate</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            isDelivered
                              ? 'bg-[#257A4B] text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          🏁
                        </div>
                        <span className="text-xs font-bold mt-1 text-[#1C2424]">Delivered</span>
                        <span className="text-[10px] text-[#637473]">Shelter Handshake</span>
                      </div>
                    </div>
                  </div>

                  {/* Address Grid: Pickup vs Drop */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {/* Pickup (Donor) */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#EDE5D8]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-extrabold text-[#D97706] flex items-center gap-1.5">
                          <span>📍</span> PICKUP ORIGIN (Donor)
                        </span>
                        <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded">
                          Kitchen
                        </span>
                      </div>
                      <div className="font-bold text-sm text-[#1C2424]">{del.donor_name || 'Verified Food Donor'}</div>
                      <p className="text-xs text-[#637473] mt-0.5 leading-relaxed">{del.donor_address || 'Location registered with Potbhar logistics'}</p>
                    </div>

                    {/* Drop (Recipient) */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#EDE5D8]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-extrabold text-[#006B62] flex items-center gap-1.5">
                          <span>🎯</span> DROP DESTINATION (Shelter)
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Beneficiary
                        </span>
                      </div>
                      <div className="font-bold text-sm text-[#1C2424]">{del.recipient_name || 'Verified Recipient Shelter'}</div>
                      <p className="text-xs text-[#637473] mt-0.5 leading-relaxed">{del.recipient_address || 'Location registered with Potbhar logistics'}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#EDE5D8]">
                    {isScheduled && (
                      <button
                        onClick={() => handlePickup(del.id)}
                        disabled={acting === del.id}
                        className="btn-primary-teal text-xs py-2.5 px-6 shadow-sm flex items-center gap-2"
                      >
                        {acting === del.id ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            <span>📦</span>
                            <span>Confirm Food Pickup & Start Transit</span>
                          </>
                        )}
                      </button>
                    )}

                    {isInTransit && (
                      <button
                        onClick={() => {
                          setModalDelivery(del)
                          setDeliveredKg(del.quantity_kg.toString())
                        }}
                        className="btn-primary-amber text-xs py-2.5 px-6 shadow-sm flex items-center gap-2"
                      >
                        <span>✅</span>
                        <span>Confirm Doorstep Delivery Handover</span>
                      </button>
                    )}

                    {isDelivered && (
                      <div className="text-xs font-bold text-[#257A4B] flex items-center gap-1.5 bg-[#E8F5EE] px-4 py-2 rounded-xl border border-[#257A4B]/20">
                        <span>✓</span> Successfully Handed Over ({del.quantity_kg} kg verified)
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Modal: Confirm Delivery */}
        <Modal
          isOpen={!!modalDelivery}
          onClose={() => setModalDelivery(null)}
          title="Confirm Doorstep Delivery Handover"
        >
          {modalDelivery && (
            <div className="space-y-4">
              <p className="text-xs text-[#637473]">
                You are recording delivery completion at{' '}
                <strong className="text-[#1C2424]">{modalDelivery.recipient_name}</strong> for{' '}
                <strong className="text-[#1C2424]">{modalDelivery.food_category}</strong>.
              </p>

              <div>
                <label className="text-xs font-bold text-[#1C2424] block mb-1">
                  Actual Delivered Quantity (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={deliveredKg}
                  onChange={(e) => setDeliveredKg(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-3 py-2 text-sm text-[#1C2424] focus:outline-none focus:border-[#006B62]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1C2424] block mb-1">
                  Handover Notes / Recipient Feedback
                </label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Delivered hot in Cambro crate, accepted by Sister Mary."
                  className="w-full bg-[#FAF7F2] border border-[#EDE5D8] rounded-xl px-3 py-2 text-sm text-[#1C2424] focus:outline-none focus:border-[#006B62]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalDelivery(null)}
                  className="btn-secondary-outline text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelivery}
                  disabled={acting === modalDelivery.id}
                  className="btn-primary-teal text-xs py-2 px-5 flex items-center gap-2"
                >
                  {acting === modalDelivery.id ? <Spinner size="sm" /> : 'Confirm & Complete'}
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppLayout>
  )
}
