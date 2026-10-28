import { useState, useEffect } from 'react'
import { listBatches, approveBatch, runMatching } from '../services/api'
import { StatusBadge, Spinner, Modal } from '../components/ui/Components'
import AppLayout from '../components/layout/AppLayout'
import { Link } from 'react-router-dom'

export default function AssessmentQueue() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // { batch, decision }
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')

  const load = () => {
    listBatches()
      .then((r) =>
        setBatches(
          r.data.filter((b) =>
            ['ASSESSMENT_REQUIRED', 'UNDER_ASSESSMENT'].includes(b.status)
          )
        )
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    load()
  }, [])

  const submitDecision = async () => {
    if (!reason.trim()) {
      setMsg('Please provide a mandatory decision rationale')
      return
    }
    setSubmitting(true)
    setMsg('')
    try {
      await approveBatch(modal.batch.id, { decision: modal.decision, reason })
      if (modal.decision === 'APPROVED') {
        try {
          await runMatching(modal.batch.id)
        } catch {}
      }
      setModal(null)
      setReason('')
      load()
    } catch (err) {
      setMsg(err.response?.data?.detail || 'Decision failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-[#006B62] flex items-center gap-3">
            <span>🔬</span> Food Safety Assessment Queue
          </h1>
          <p className="text-[#637473] text-sm mt-1">
            Review FreshGuard AI flags, temperature logs, and certify surplus food for community redistribution.
          </p>
        </div>

        <div className="bg-[#FEF3E2] border border-[#FDE68A] rounded-2xl p-4 text-xs sm:text-sm text-[#92400E] mb-6 shadow-sm">
          <strong>Certified Assessor Responsibility:</strong> Your recorded decision authorizes or blocks edible redistribution under FSSAI donation guidelines. Disapproved batches are immediately routed to certified organic waste composting.
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : batches.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[#E6F4F1] text-[#006B62] flex items-center justify-center text-3xl mx-auto mb-3">
              ✅
            </div>
            <h3 className="text-xl font-bold text-[#1C2424] mb-1">Queue is Clear!</h3>
            <p className="text-xs text-[#637473]">No surplus food batches awaiting assessment at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="card border border-[#EDE5D8] hover:border-[#006B62] transition-all">
                <div className="flex items-start justify-between mb-4 pb-3 border-b border-[#EDE5D8]">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-[#1C2424]">{batch.food_category}</h3>
                      <StatusBadge status={batch.status} />
                    </div>
                    <p className="text-xs text-[#637473]">
                      {batch.quantity_kg} kg • Donor: {batch.donor?.name || 'Verified Donor'} •{' '}
                      {new Date(batch.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/batches/${batch.id}`}
                    className="text-xs font-bold text-[#006B62] hover:underline"
                  >
                    Full Details →
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 text-xs">
                  <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#EDE5D8]">
                    <div className="text-[#637473]">Storage Temp</div>
                    <div className="font-bold text-[#1C2424] mt-0.5">
                      {batch.storage_temp?.replace(/_/g, ' ')}
                    </div>
                  </div>
                  <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#EDE5D8]">
                    <div className="text-[#637473]">Packaging</div>
                    <div className="font-bold text-[#1C2424] mt-0.5">
                      {batch.packaging_intact ? '✅ Intact' : '⚠️ Compromised'}
                    </div>
                  </div>
                  <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#EDE5D8]">
                    <div className="text-[#637473]">Handling Logs</div>
                    <div className="font-bold text-[#006B62] mt-0.5">
                      {Math.round((batch.handling_completeness || 0) * 100)}% Complete
                    </div>
                  </div>
                  <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#EDE5D8]">
                    <div className="text-[#637473]">Preparation Time</div>
                    <div className="font-bold text-[#1C2424] mt-0.5 truncate">
                      {batch.preparation_time
                        ? new Date(batch.preparation_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : 'Not logged'}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setModal({ batch, decision: 'APPROVED' })
                      setReason('')
                    }}
                    className="btn-primary-teal text-xs py-2 px-5 shadow-sm"
                  >
                    ✅ Approve for Redistribution
                  </button>
                  <button
                    onClick={() => {
                      setModal({ batch, decision: 'REJECTED' })
                      setReason('')
                    }}
                    className="btn-secondary text-xs py-2 px-5 text-rose-700 hover:bg-rose-50 hover:border-rose-200"
                  >
                    ❌ Divert to Organic Waste
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decision Modal */}
      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.decision === 'APPROVED' ? 'Certify Batch for Redistribution' : 'Divert Batch to Organic Waste'}
      >
        {modal && (
          <div className="space-y-4">
            <div className="bg-[#FAF7F2] border border-[#EDE5D8] rounded-2xl p-4">
              <div className="font-bold text-sm text-[#1C2424]">{modal.batch.food_category}</div>
              <div className="text-xs text-[#637473] mt-0.5">{modal.batch.quantity_kg} kg verified surplus</div>
            </div>

            {modal.decision === 'REJECTED' && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-800">
                ⚠️ <strong>Organic Waste Protocol:</strong> This batch will be disqualified from human consumption and automatically routed to an authorized composting or biogas digester facility.
              </div>
            )}

            <div>
              <label className="label">
                {modal.decision === 'APPROVED'
                  ? 'Official Approval Rationale (FSSAI audit record)'
                  : 'Mandatory Rejection Reason'}
              </label>
              <textarea
                className="input resize-none h-28"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={
                  modal.decision === 'APPROVED'
                    ? 'e.g. Visual inspection clean. Storage temperature < 5°C maintained. Packaging undamaged and safe for consumption…'
                    : 'e.g. Room temperature exposure exceeded 2-hour threshold. Visible steam loss and elevated microbial risk…'
                }
              />
            </div>

            {msg && <div className="text-rose-700 text-xs bg-rose-50 p-2.5 rounded-xl border border-rose-200">{msg}</div>}

            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)} className="btn-secondary flex-1 text-xs py-2.5">
                Cancel
              </button>
              <button
                onClick={submitDecision}
                disabled={submitting}
                className={`flex-1 text-xs py-2.5 font-bold shadow-md ${
                  modal.decision === 'APPROVED' ? 'btn-primary-teal' : 'btn-danger'
                }`}
              >
                {submitting ? <Spinner size="sm" /> : null}
                Confirm {modal.decision} →
              </button>
            </div>
          </div>
        )}
      </Modal>
    </AppLayout>
  )
}
