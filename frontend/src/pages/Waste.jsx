import { useState, useEffect } from 'react'
import {
  createWaste,
  listWaste,
  listOrgs,
  assignProcessor,
  confirmWasteReceipt,
  confirmWasteProcessing,
  getWasteCategories,
} from '../services/api'
import { StatusBadge, Spinner, Modal, Alert, DemoNotice } from '../components/ui/Components'
import AppLayout from '../components/layout/AppLayout'
import { useAuth } from '../context/AuthContext'

export default function WasteManagement() {
  const { user } = useAuth()
  const [batches, setBatches] = useState([])
  const [processors, setProcessors] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    waste_category: '',
    quantity_kg: '',
    contamination_status: 'UNKNOWN',
    contamination_details: '',
  })
  const [msg, setMsg] = useState('')
  const [acting, setActing] = useState('')

  const load = () => {
    Promise.all([listWaste(), listOrgs(), getWasteCategories()])
      .then(([w, o, c]) => {
        setBatches(w.data)
        setProcessors(
          o.data.filter((x) => x.organization_type === 'PROCESSOR' && x.verification_status === 'VERIFIED')
        )
        setCategories(c.data)
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    load()
  }, [])

  const submitWaste = async () => {
    setMsg('')
    try {
      await createWaste({ ...form, quantity_kg: +form.quantity_kg })
      setShowForm(false)
      setMsg('Organic waste batch logged successfully!')
      load()
    } catch (err) {
      setMsg(err.response?.data?.detail || 'Failed to report waste')
    }
  }

  const assignProc = async (wasteId, procId) => {
    setActing(wasteId)
    try {
      await assignProcessor(wasteId, procId)
      load()
    } finally {
      setActing('')
    }
  }

  const confirmReceipt = async (id) => {
    const kg = prompt('Enter received weight at processing facility (kg):')
    if (!kg) return
    setActing(id)
    try {
      await confirmWasteReceipt(id, { received_quantity_kg: +kg })
      load()
    } finally {
      setActing('')
    }
  }

  const confirmProcessing = async (id) => {
    const kg = prompt('Enter confirmed processed yield quantity (kg):')
    if (!kg) return
    setActing(id)
    try {
      await confirmWasteProcessing(id, {
        received_quantity_kg: +kg,
        processing_method: 'COMPOSTING',
      })
      load()
    } finally {
      setActing('')
    }
  }

  const totalReported = batches.reduce((s, b) => s + (b.quantity_kg || 0), 0)
  const totalDiverted = batches
    .filter((b) => ['RECEIVED', 'PROCESSED'].includes(b.status))
    .reduce((s, b) => s + (b.received_quantity_kg || 0), 0)

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-5xl mx-auto">
        <DemoNotice />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#006B62] flex items-center gap-3">
              <span>♻️</span> Organic Waste & Biogas Pipeline
            </h1>
            <p className="text-[#637473] text-sm mt-1">
              Diverting non-edible organic food to certified composting and bio-methanation facilities.
            </p>
          </div>
          {['DONOR', 'ADMIN'].includes(user?.role) && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary-teal text-xs py-2.5 px-6 shadow-sm self-start sm:self-auto"
            >
              + Report Waste Batch
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card p-5">
            <div className="text-xl mb-1">📊</div>
            <div className="text-2xl font-black text-[#1C2424]">{totalReported.toFixed(1)} kg</div>
            <div className="text-xs font-bold text-[#637473] mt-0.5">Total Waste Logged</div>
          </div>

          <div className="card p-5">
            <div className="text-xl mb-1">♻️</div>
            <div className="text-2xl font-black text-[#16A34A]">{totalDiverted.toFixed(1)} kg</div>
            <div className="text-xs font-bold text-[#637473] mt-0.5">Diverted from Landfills</div>
          </div>

          <div className="card p-5">
            <div className="text-xl mb-1">⏳</div>
            <div className="text-2xl font-black text-[#D97706]">
              {batches.filter((b) => b.status === 'REPORTED').length}
            </div>
            <div className="text-xs font-bold text-[#637473] mt-0.5">Awaiting Processor Assignment</div>
          </div>
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
        ) : batches.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EDE5D8] flex items-center justify-center text-3xl mx-auto mb-3">
              🌱
            </div>
            <h3 className="text-xl font-bold text-[#1C2424] mb-1">No waste batches recorded</h3>
            <p className="text-xs text-[#637473] max-w-sm mx-auto mb-4">
              Report food scraps and inedible organics to route them directly to bio-fertilizer and clean energy.
            </p>
            {['DONOR', 'ADMIN'].includes(user?.role) && (
              <button onClick={() => setShowForm(true)} className="btn-primary-teal text-xs py-2 px-6">
                Log Organic Waste →
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((b) => (
              <div
                key={b.id}
                className="card border border-[#EDE5D8] hover:border-[#006B62] transition-all p-6"
              >
                <div className="flex items-start justify-between mb-3 pb-2 border-b border-[#EDE5D8]">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-[#1C2424] text-base">{b.waste_category}</h3>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="text-xs text-[#637473]">
                      {b.quantity_kg} kg • Contamination: <span className="font-semibold text-[#1C2424]">{b.contamination_status}</span>
                    </div>
                  </div>
                  {b.received_quantity_kg && (
                    <div className="text-right">
                      <div className="text-[11px] text-[#637473]">Confirmed Received</div>
                      <div className="font-extrabold text-[#16A34A] text-sm">
                        {b.received_quantity_kg} kg
                      </div>
                    </div>
                  )}
                </div>

                {/* Processing outcome */}
                {b.processing_outcome && (
                  <div className="bg-[#E6F4F1] border border-[#B0DCD7] rounded-2xl p-3.5 mb-3 text-xs">
                    <div className="text-[#006B62] font-bold mb-1">✅ Valorization Completed</div>
                    <div className="text-[#475454]">Method: {b.processing_outcome.method}</div>
                    {b.processing_outcome.compost_output_kg && (
                      <div className="text-[#475454]">
                        Compost Yield: <strong>{b.processing_outcome.compost_output_kg} kg</strong>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Controls */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-2">
                  {b.status === 'REPORTED' && !b.processor_id && user?.role !== 'PROCESSOR' && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#637473]">Assign Facility:</span>
                      {processors.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => assignProc(b.id, p.id)}
                          disabled={acting === b.id}
                          className="text-xs bg-[#FAF7F2] hover:bg-[#E6F4F1] text-[#006B62] font-semibold border border-[#EDE5D8] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                        >
                          {acting === b.id ? <Spinner size="sm" /> : null} {p.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {b.status === 'SCHEDULED' && user?.role === 'PROCESSOR' && (
                    <button
                      onClick={() => confirmReceipt(b.id)}
                      disabled={acting === b.id}
                      className="btn-primary-teal text-xs py-2 px-5 shadow-sm"
                    >
                      {acting === b.id ? <Spinner size="sm" /> : '✅'} Confirm Batch Receipt
                    </button>
                  )}

                  {b.status === 'RECEIVED' && user?.role === 'PROCESSOR' && (
                    <button
                      onClick={() => confirmProcessing(b.id)}
                      disabled={acting === b.id}
                      className="btn-accent-amber text-xs py-2 px-5 shadow-sm"
                    >
                      {acting === b.id ? <Spinner size="sm" /> : '♻️'} Record Processing Yield
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Waste Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)} title="Log Organic Waste Batch">
        <div className="space-y-4">
          <div>
            <label className="label">Waste Category</label>
            <select
              className="select"
              value={form.waste_category}
              onChange={(e) => setForm((p) => ({ ...p, waste_category: e.target.value }))}
            >
              <option value="">Select category…</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Quantity (kg)</label>
              <input
                className="input"
                type="number"
                min="0.1"
                step="0.1"
                value={form.quantity_kg}
                onChange={(e) => setForm((p) => ({ ...p, quantity_kg: e.target.value }))}
                placeholder="e.g. 80"
              />
            </div>
            <div>
              <label className="label">Contamination Status</label>
              <select
                className="select"
                value={form.contamination_status}
                onChange={(e) => setForm((p) => ({ ...p, contamination_status: e.target.value }))}
              >
                {['CLEAN', 'CONTAMINATED', 'UNKNOWN'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Contamination Details (optional)</label>
            <input
              className="input"
              value={form.contamination_details}
              onChange={(e) => setForm((p) => ({ ...p, contamination_details: e.target.value }))}
              placeholder="e.g. Mixed vegetable peelings only, no plastic"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-xs py-2.5">
              Cancel
            </button>
            <button onClick={submitWaste} className="btn-primary-teal flex-1 text-xs py-2.5 shadow-md">
              Submit Waste Batch →
            </button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}
