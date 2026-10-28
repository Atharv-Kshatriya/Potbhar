import { useState, useEffect } from 'react'
import { listBatches, assessImage, assessRisk, getBatch } from '../services/api'
import { StatusBadge, Spinner } from '../components/ui/Components'
import AppLayout from '../components/layout/AppLayout'
import { Link } from 'react-router-dom'

export default function FreshGuardScanner() {
  const [batches, setBatches] = useState([])
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)
  const [assessing, setAssessing] = useState('')

  useEffect(() => {
    listBatches().then((r) =>
      setBatches(
        r.data.filter((b) =>
          ['DRAFT', 'SUBMITTED', 'PENDING_INFORMATION', 'ASSESSMENT_REQUIRED'].includes(b.status)
        )
      )
    )
  }, [])

  const selectBatch = (b) => {
    setSelected(b.id)
    setDetail(null)
    getBatch(b.id).then((r) => setDetail(r.data))
  }

  const runVision = async () => {
    setAssessing('vision')
    try {
      const r = await assessImage(selected)
      setDetail((p) => ({ ...p, _visionResult: r.data }))
    } finally {
      setAssessing('')
    }
  }

  const runRisk = async () => {
    setAssessing('risk')
    try {
      const r = await assessRisk(selected)
      setDetail((p) => ({ ...p, _riskResult: r.data }))
    } finally {
      setAssessing('')
    }
  }

  const visionResult =
    detail?._visionResult ||
    detail?.model_assessments?.find((a) => a.model_name === 'FreshGuard-Vision')?.output
  const riskResult =
    detail?._riskResult ||
    detail?.model_assessments?.find((a) => a.model_name === 'FreshGuard-Risk')?.output

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#006B62] flex items-center gap-3">
            <span>🔬</span> FreshGuard AI™ Safety Scanner
          </h1>
          <p className="text-[#637473] text-sm mt-1">
            Run multi-modal computer vision and FSSAI thermal danger-zone risk screening.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Batch List */}
          <div className="lg:col-span-2">
            <div className="card p-5">
              <h3 className="font-bold text-[#1C2424] text-base mb-4 pb-2 border-b border-[#EDE5D8]">
                Batches Awaiting Assessment
              </h3>
              {batches.length === 0 ? (
                <div className="text-center py-10 text-[#637473]">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#EDE5D8] flex items-center justify-center text-2xl mx-auto mb-2">
                    🍲
                  </div>
                  <p className="text-xs font-semibold text-[#1C2424]">No batches pending review</p>
                  <Link to="/batches/new" className="text-[#006B62] text-xs font-bold hover:underline block mt-2">
                    Report a new batch →
                  </Link>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {batches.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => selectBatch(b)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                        selected === b.id
                          ? 'border-[#006B62] bg-[#E6F4F1] shadow-sm'
                          : 'border-[#EDE5D8] bg-[#FAF7F2] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-sm text-[#1C2424]">{b.food_category}</div>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="text-xs text-[#637473]">
                        {b.quantity_kg} kg • {new Date(b.created_at).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Assessment Panel */}
          <div className="lg:col-span-3">
            {!selected ? (
              <div className="card h-full flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#E6F4F1] text-[#006B62] flex items-center justify-center text-3xl mb-4 shadow-sm">
                  🔬
                </div>
                <h3 className="text-xl font-bold text-[#1C2424] mb-1">FreshGuard AI Console</h3>
                <p className="text-xs text-[#637473] max-w-sm">
                  Select a food batch from the left list to run vision screening and thermal threshold analytics.
                </p>
              </div>
            ) : !detail ? (
              <div className="card flex items-center justify-center py-20">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="space-y-5">
                {/* Batch Info Header */}
                <div className="card p-6">
                  <div className="flex items-start justify-between mb-4 pb-3 border-b border-[#EDE5D8]">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#006B62]">{detail.food_category}</h2>
                      <p className="text-xs text-[#637473] mt-0.5">
                        {detail.quantity_kg} kg • <StatusBadge status={detail.status} />
                      </p>
                    </div>
                    <Link
                      to={`/batches/${detail.id}`}
                      className="text-xs font-bold text-[#006B62] hover:underline"
                    >
                      Full Details →
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#EDE5D8]">
                      <div className="text-[#637473]">Storage Temp</div>
                      <div className="text-[#1C2424] font-bold mt-1">
                        {detail.storage_temp?.replace(/_/g, ' ')}
                      </div>
                    </div>
                    <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#EDE5D8]">
                      <div className="text-[#637473]">Packaging</div>
                      <div className="text-[#1C2424] font-bold mt-1">
                        {detail.packaging_intact ? '✅ Intact' : '⚠️ Compromised'}
                      </div>
                    </div>
                    <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#EDE5D8]">
                      <div className="text-[#637473]">Documentation</div>
                      <div className="text-[#006B62] font-bold mt-1">
                        {Math.round((detail.handling_completeness || 0) * 100)}% Complete
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vision Model Card */}
                <div className="card border border-[#B0DCD7]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EDE5D8]">
                    <div>
                      <div className="font-bold text-[#006B62] flex items-center gap-2 text-sm">
                        <span>👁️</span> FreshGuard Vision
                        <span className="text-[10px] bg-[#E6F4F1] text-[#006B62] font-bold px-2 py-0.5 rounded-full border border-[#B0DCD7]">
                          Image Analysis
                        </span>
                      </div>
                      <p className="text-xs text-[#637473]">Quality classification from food photograph</p>
                    </div>
                    <button
                      onClick={runVision}
                      disabled={assessing === 'vision' || !detail.image_path}
                      className="btn-primary-teal text-xs py-1.5 px-4 shadow-sm"
                    >
                      {assessing === 'vision' ? <Spinner size="sm" /> : '▶ Run Vision'}
                    </button>
                  </div>

                  {!detail.image_path && (
                    <div className="text-xs text-[#D97706] bg-[#FEF3E2] p-2.5 rounded-xl border border-[#FDE68A] mb-3">
                      ⚠️ Upload a photo in batch details first to enable vision AI analysis
                    </div>
                  )}

                  {visionResult ? (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                            visionResult.predicted_class?.includes('DETERIORATION')
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {visionResult.predicted_class?.replace(/_/g, ' ')}
                        </div>
                        <div className="text-xs font-semibold text-[#637473]">
                          {Math.round((visionResult.confidence || 0) * 100)}% Confidence
                        </div>
                      </div>

                      {/* Class probabilities */}
                      <div className="space-y-2">
                        {visionResult.class_probabilities &&
                          Object.entries(visionResult.class_probabilities).map(([cls, prob]) => (
                            <div key={cls}>
                              <div className="flex justify-between text-xs text-[#475454] mb-1">
                                <span>{cls.replace(/_/g, ' ')}</span>
                                <span className="font-bold">{Math.round(prob * 100)}%</span>
                              </div>
                              <div className="h-1.5 bg-[#FAF7F2] border border-[#EDE5D8] rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    cls === visionResult.predicted_class ? 'bg-[#006B62]' : 'bg-[#CBD5E1]'
                                  }`}
                                  style={{ width: `${prob * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mt-3 text-xs text-[#637473] italic">
                        {visionResult.assessment_note}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-[#9BA8A7] text-center py-4">
                      Click &quot;Run Vision&quot; to perform simulated computer vision analysis
                    </div>
                  )}
                </div>

                {/* Risk Model Card */}
                <div className="card border border-[#FDE68A]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EDE5D8]">
                    <div>
                      <div className="font-bold text-[#D97706] flex items-center gap-2 text-sm">
                        <span>📊</span> FreshGuard Risk Model
                        <span className="text-[10px] bg-[#FEF3E2] text-[#D97706] font-bold px-2 py-0.5 rounded-full border border-[#FDE68A]">
                          FSSAI Rules Engine
                        </span>
                      </div>
                      <p className="text-xs text-[#637473]">Thermal danger-zone time & storage method checks</p>
                    </div>
                    <button
                      onClick={runRisk}
                      disabled={assessing === 'risk'}
                      className="btn-accent-amber text-xs py-1.5 px-4 shadow-sm"
                    >
                      {assessing === 'risk' ? <Spinner size="sm" /> : '▶ Run Rules'}
                    </button>
                  </div>

                  {riskResult ? (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <StatusBadge status={riskResult.risk_category} />
                        <span className="text-xs text-[#637473]">
                          Evaluator: {riskResult.assessment_method}
                        </span>
                      </div>

                      {riskResult.risk_flags?.length > 0 && (
                        <div className="space-y-2 mb-3">
                          <div className="text-xs text-rose-700 font-bold">⚠️ Flagged Risk Parameters:</div>
                          {riskResult.risk_flags.map((f, i) => (
                            <div
                              key={i}
                              className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-800"
                            >
                              <span className="font-bold">{f.flag}</span>: {f.detail}
                            </div>
                          ))}
                        </div>
                      )}

                      {riskResult.contributing_factors?.length > 0 && (
                        <div className="space-y-1 mt-3">
                          <div className="text-xs text-emerald-800 font-bold">✅ Positive Safety Controls:</div>
                          {riskResult.contributing_factors.map((f, i) => (
                            <div key={i} className="text-xs text-emerald-700">
                              • {f.replace(/_/g, ' ')}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-[#9BA8A7] text-center py-4">
                      Click &quot;Run Rules&quot; to test storage time and temperature parameters
                    </div>
                  )}
                </div>

                {/* Safety Limitation Notice */}
                <div className="bg-[#FEF3E2] border border-[#FDE68A] rounded-2xl p-4 text-xs text-[#92400E] leading-relaxed">
                  <strong>⚠️ Critical Safety Notice:</strong> AI vision and rules models serve as decision-support tools. Certified food safety assessors must inspect and approve all edible batches before dispatch.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
