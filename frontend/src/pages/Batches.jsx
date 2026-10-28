import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  createBatch,
  getFoodCategories,
  uploadBatchImage,
  assessImage,
  assessRisk,
  submitBatch,
  getBatch,
} from '../services/api'
import { StatusBadge, Spinner, Alert } from '../components/ui/Components'
import AppLayout from '../components/layout/AppLayout'

// ─── Create New Batch ─────────────────────────────────────────────────────────
export function BatchCreate() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    food_category: '',
    description: '',
    quantity_kg: '',
    preparation_time: '',
    storage_temp: 'ROOM_TEMP',
    storage_method: 'SEALED',
    packaging_intact: true,
    handling_completeness: 0.8,
    transport_duration_hours: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getFoodCategories().then((r) => setCategories(r.data))
  }, [])

  const handle = async (e) => {
    e.preventDefault()
    if (!form.food_category) {
      setError('Please select a food category')
      return
    }
    if (!form.quantity_kg || +form.quantity_kg <= 0) {
      setError('Quantity must be > 0')
      return
    }
    setLoading(true)
    setError('')
    try {
      const r = await createBatch({ ...form, quantity_kg: +form.quantity_kg })
      navigate(`/batches/${r.data.id}`)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create batch')
    } finally {
      setLoading(false)
    }
  }

  const STORAGE_TEMPS = ['ROOM_TEMP', 'CHILLED', 'REFRIGERATED', 'FROZEN']
  const STORAGE_METHODS = ['SEALED', 'OPEN', 'VACUUM_PACKED', 'INSULATED_BOX']

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006B62] hover:underline"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-[#006B62] mt-2">
            Report Surplus Food
          </h1>
          <p className="text-[#637473] text-sm mt-1">
            Complete food safety details enable FreshGuard AI risk verification and rapid shelter matching.
          </p>
        </div>

        <form onSubmit={handle} className="card p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="label">Food Category *</label>
              <select
                className="select"
                value={form.food_category}
                onChange={(e) => setForm((p) => ({ ...p, food_category: e.target.value }))}
                required
              >
                <option value="">Select category…</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Quantity (kg) *</label>
              <input
                className="input"
                type="number"
                min="0.1"
                step="0.1"
                value={form.quantity_kg}
                onChange={(e) => setForm((p) => ({ ...p, quantity_kg: e.target.value }))}
                placeholder="e.g. 45.5"
                required
              />
            </div>

            <div>
              <label className="label">Preparation Date &amp; Time</label>
              <input
                className="input"
                type="datetime-local"
                value={form.preparation_time}
                onChange={(e) => setForm((p) => ({ ...p, preparation_time: e.target.value }))}
              />
            </div>

            <div>
              <label className="label">Storage Temperature</label>
              <select
                className="select"
                value={form.storage_temp}
                onChange={(e) => setForm((p) => ({ ...p, storage_temp: e.target.value }))}
              >
                {STORAGE_TEMPS.map((t) => (
                  <option key={t} value={t}>
                    {t.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Storage Method</label>
              <select
                className="select"
                value={form.storage_method}
                onChange={(e) => setForm((p) => ({ ...p, storage_method: e.target.value }))}
              >
                {STORAGE_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Description & Preparation Notes</label>
            <textarea
              className="input resize-none h-24"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="e.g. Leftover Shahi Paneer and Jeera Rice from banquet hall for 150 guests, prepared fresh at 8:00 PM…"
            />
          </div>

          {/* Handling score slider */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE5D8]">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-[#1C2424]">
                Handling Documentation Completeness:
              </label>
              <span className="text-xs font-extrabold text-[#006B62] px-2.5 py-0.5 rounded-full bg-[#E6F4F1]">
                {Math.round(form.handling_completeness * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={form.handling_completeness}
              onChange={(e) => setForm((p) => ({ ...p, handling_completeness: +e.target.value }))}
              className="w-full h-2 bg-[#EDE5D8] rounded-lg appearance-none cursor-pointer accent-[#006B62]"
            />
            <div className="flex justify-between text-[11px] text-[#9BA8A7] mt-1 font-medium">
              <span>Basic Verbal</span>
              <span>Kitchen Log</span>
              <span>Full FSSAI HACCP Audit</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#EDE5D8]">
            <input
              type="checkbox"
              id="pkg"
              checked={form.packaging_intact}
              onChange={(e) => setForm((p) => ({ ...p, packaging_intact: e.target.checked }))}
              className="w-4 h-4 rounded text-[#006B62] accent-[#006B62]"
            />
            <label htmlFor="pkg" className="text-xs font-semibold text-[#1C2424] cursor-pointer">
              Food packaging is intact, sealed, and undamaged
            </label>
          </div>

          {error && <Alert type="error" message={error} />}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary-teal w-full py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2"
          >
            {loading ? <Spinner size="sm" /> : '🍲'} Log Surplus Batch →
          </button>
        </form>
      </div>
    </AppLayout>
  )
}

// ─── Batch Detail ─────────────────────────────────────────────────────────────
export function BatchDetail() {
  const { id } = useParams()
  const [batch, setBatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [assessing, setAssessing] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef()

  const refresh = () =>
    getBatch(id)
      .then((r) => setBatch(r.data))
      .finally(() => setLoading(false))

  useEffect(() => {
    refresh()
  }, [id])

  const handleImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setMsg('')
    try {
      await uploadBatchImage(id, file)
      setMsg('Food image successfully uploaded!')
      await refresh()
    } catch {
      setMsg('Upload failed. Please check file format.')
    } finally {
      setUploading(false)
    }
  }

  const runVision = async () => {
    setAssessing('vision')
    setMsg('')
    try {
      await assessImage(id)
      setMsg('FreshGuard Vision AI assessment complete')
      await refresh()
    } catch {
      setMsg('Assessment failed')
    } finally {
      setAssessing('')
    }
  }

  const runRisk = async () => {
    setAssessing('risk')
    setMsg('')
    try {
      await assessRisk(id)
      setMsg('FSSAI Danger-Zone risk analysis complete')
      await refresh()
    } catch {
      setMsg('Assessment failed')
    } finally {
      setAssessing('')
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setMsg('')
    try {
      const r = await submitBatch(id)
      setMsg(`Submitted for Assessor Review — Status: ${r.data.status}`)
      await refresh()
    } catch (err) {
      setMsg(err.response?.data?.detail || 'Submit failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return (
      <AppLayout>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    )

  if (!batch)
    return (
      <AppLayout>
        <div className="text-center py-20 text-[#637473]">Batch not found</div>
      </AppLayout>
    )

  const visionResult = batch.model_assessments?.find((a) => a.model_name === 'FreshGuard-Vision')
  const riskResult = batch.model_assessments?.find((a) => a.model_name === 'FreshGuard-Risk')
  const humanAssessment = batch.food_assessments?.[0]

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006B62] hover:underline"
          >
            ← Back to Dashboard
          </Link>
          <StatusBadge status={batch.status} />
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-[#006B62]">{batch.food_category}</h1>
          <p className="text-[#637473] text-sm mt-1">{batch.description || 'Surplus meal batch'}</p>
        </div>

        {msg && (
          <div className="mb-6">
            <Alert type="info" message={msg} />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {/* Batch Info */}
          <div className="card">
            <h3 className="font-bold text-[#1C2424] text-base mb-4 pb-2 border-b border-[#EDE5D8]">
              Batch Specifications
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              {[
                ['Quantity', `${batch.quantity_kg} kg`],
                ['Storage Temp', batch.storage_temp?.replace(/_/g, ' ')],
                ['Storage Method', batch.storage_method?.replace(/_/g, ' ')],
                ['Packaging', batch.packaging_intact ? '✅ Intact & Sealed' : '⚠️ Compromised'],
                ['Handling Docs', `${Math.round((batch.handling_completeness || 0) * 100)}%`],
                ['Preparation Time', batch.preparation_time ? new Date(batch.preparation_time).toLocaleString() : 'Not provided'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-1 border-b border-[#FAF7F2]">
                  <span className="text-[#637473]">{k}</span>
                  <span className="text-[#1C2424] font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image + Upload */}
          <div className="card">
            <h3 className="font-bold text-[#1C2424] text-base mb-4 pb-2 border-b border-[#EDE5D8]">
              Food Photo Verification
            </h3>
            {batch.image_path ? (
              <div className="bg-[#FAF7F2] border border-[#EDE5D8] rounded-2xl h-40 flex flex-col items-center justify-center text-[#006B62]">
                <span className="text-4xl">📸</span>
                <span className="mt-2 text-xs font-bold">Food Photo Uploaded ✓</span>
                <span className="text-[11px] text-[#637473]">Ready for FreshGuard Vision screening</span>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-[#EDE5D8] bg-[#FAF7F2] rounded-2xl h-40 flex flex-col items-center justify-center text-[#637473] gap-1 hover:border-[#006B62] transition-colors cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                <span className="text-3xl">📷</span>
                <span className="text-xs font-bold text-[#1C2424]">Upload Food Photograph</span>
                <span className="text-[10px] text-[#9BA8A7]">JPEG, PNG, WebP — max 10MB</span>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImage}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="btn-secondary w-full mt-3 text-xs flex items-center justify-center gap-2"
            >
              {uploading ? <Spinner size="sm" /> : '📷'} {batch.image_path ? 'Replace Image' : 'Select Photo'}
            </button>
          </div>
        </div>

        {/* FreshGuard AI Panel */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#EDE5D8]">
            <span className="text-2xl">🔬</span>
            <div>
              <h3 className="font-bold text-[#006B62] text-base">FreshGuard AI™ Safety Assessment</h3>
              <p className="text-xs text-[#637473]">
                Multi-modal AI vision & FSSAI thermal rule verification.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Vision Result */}
            <div
              className={`rounded-2xl p-4 border ${
                visionResult
                  ? 'border-[#B0DCD7] bg-[#E6F4F1]'
                  : 'border-[#EDE5D8] bg-[#FAF7F2]'
              }`}
            >
              <div className="text-[11px] font-bold text-[#006B62] mb-1.5 uppercase tracking-wider">
                FreshGuard Vision (Image Analysis)
              </div>
              {visionResult ? (
                <>
                  <div className="font-extrabold text-[#1C2424] text-sm">
                    {visionResult.output.predicted_class?.replace(/_/g, ' ')}
                  </div>
                  <div className="text-xs text-[#475454] mt-0.5">
                    Confidence: {Math.round((visionResult.output.confidence || 0) * 100)}%
                  </div>
                  <div className="mt-2 h-1.5 bg-[#B0DCD7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#006B62] rounded-full"
                      style={{ width: `${(visionResult.output.confidence || 0) * 100}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-[#475454] mt-2 italic">
                    {visionResult.output.assessment_note?.slice(0, 80)}…
                  </div>
                </>
              ) : (
                <div className="text-xs text-[#9BA8A7]">Pending photo analysis</div>
              )}
            </div>

            {/* Risk Result */}
            <div
              className={`rounded-2xl p-4 border ${
                riskResult
                  ? 'border-[#FDE68A] bg-[#FEF3E2]'
                  : 'border-[#EDE5D8] bg-[#FAF7F2]'
              }`}
            >
              <div className="text-[11px] font-bold text-[#D97706] mb-1.5 uppercase tracking-wider">
                FreshGuard Risk (Rules-Based)
              </div>
              {riskResult ? (
                <>
                  <StatusBadge status={riskResult.output.risk_category} />
                  <div className="text-xs text-[#475454] mt-2">
                    {riskResult.output.risk_flags?.length > 0
                      ? `⚠️ ${riskResult.output.risk_flags.length} risk flag(s) identified`
                      : '✅ Within safe thermal thresholds'}
                  </div>
                  {riskResult.output.risk_flags?.map((f, i) => (
                    <div key={i} className="text-[11px] text-rose-700 mt-1">
                      • {f.flag}
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-xs text-[#9BA8A7]">Pending rule evaluation</div>
              )}
            </div>
          </div>

          {/* AI Safety Notice */}
          <div className="bg-[#FEF3E2] border border-[#FDE68A] rounded-2xl p-3.5 text-xs text-[#92400E] mb-5">
            ⚠️ <strong>FSSAI Compliance Note:</strong> AI predictions provide preliminary risk screening. Final approval is conducted by an authorized human food safety assessor.
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={runVision}
              disabled={assessing === 'vision' || !batch.image_path}
              className="btn-secondary text-xs flex items-center gap-2"
            >
              {assessing === 'vision' ? <Spinner size="sm" /> : '👁️'} Run Vision AI
            </button>
            <button
              onClick={runRisk}
              disabled={assessing === 'risk'}
              className="btn-secondary text-xs flex items-center gap-2"
            >
              {assessing === 'risk' ? <Spinner size="sm" /> : '📊'} Run Risk Rules
            </button>
          </div>
        </div>

        {/* Human Assessor Decision */}
        {humanAssessment && (
          <div
            className={`card mb-6 border ${
              humanAssessment.decision === 'APPROVED' ? 'border-[#B0DCD7] bg-[#F0F9F8]' : 'border-rose-200 bg-rose-50'
            }`}
          >
            <h3 className="font-bold text-[#1C2424] text-base mb-2">Certified Assessor Verification</h3>
            <div className="flex items-center gap-3 mb-2">
              <StatusBadge status={humanAssessment.decision} />
              <span className="text-xs text-[#637473]">
                {new Date(humanAssessment.assessed_at).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#475454] leading-relaxed">{humanAssessment.reason}</p>
          </div>
        )}

        {/* Action Button */}
        {['DRAFT', 'PENDING_INFORMATION'].includes(batch.status) && (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary-teal w-full py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2"
          >
            {submitting ? <Spinner size="sm" /> : '📤'} Submit Batch for Assessor Review →
          </button>
        )}
      </div>
    </AppLayout>
  )
}
