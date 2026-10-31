import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity, RefreshCw } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');
const STATUS_LABELS = {
  AVAILABLE: 'Available for a recipient',
  CLAIMED: 'Claimed · awaiting pickup',
  PICKED_UP: 'Picked up by rider',
  DELIVERED: 'Delivered · inspection needed',
  ACCEPTED: 'Accepted by recipient',
  COMPOST_NEEDED: 'Rerouted to compost',
  COMPOST_RECEIVED: 'Received by compost unit',
  COMPOSTED: 'Composted',
  CANCELLED: 'Cancelled',
};

const portalDestinations = {
  orphanage: ['orphanage', 'recipient', 'food_bank', 'other'],
  shelter: ['shelter', 'adult_shelter', 'recipient', 'other'],
  gaushala: ['gaushala'],
};

export default function LiveWorkflowBoard({ portal, user }) {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');
  const [lastSync, setLastSync] = useState(null);
  const token = window.sessionStorage.getItem('potbhar.accessToken');

  const load = useCallback(async (quiet = false) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE}/live-workflows/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(response.status === 401 ? 'Your session expired. Sign in again to sync portals.' : 'Live portal sync is unavailable.');
      setRecords(await response.json());
      setLastSync(new Date());
      setError('');
    } catch (syncError) {
      if (!quiet) setError(syncError.message || 'Could not connect to the live workflow service.');
    }
  }, [token]);

  useEffect(() => {
    if (!token) return undefined;
    load();
    const timer = window.setInterval(() => load(true), 3000);
    return () => window.clearInterval(timer);
  }, [load, token]);

  const visibleRecords = useMemo(() => {
    if (portal === 'rider') return records.filter((row) => ['CLAIMED', 'PICKED_UP', 'DELIVERED'].includes(row.status));
    if (portal === 'compost') return records.filter((row) => ['COMPOST_NEEDED', 'COMPOST_RECEIVED', 'COMPOSTED'].includes(row.status));
    if (portalDestinations[portal]) {
      return records.filter((row) => {
        const destination = row.data?.destinationType;
        return ['AVAILABLE', 'CLAIMED', 'PICKED_UP', 'DELIVERED', 'ACCEPTED', 'COMPOST_NEEDED', 'COMPOST_RECEIVED', 'COMPOSTED'].includes(row.status)
          && (!destination || portalDestinations[portal].includes(destination));
      });
    }
    return records;
  }, [portal, records]);

  const changeStatus = async (row, status, updates = {}) => {
    setBusyId(row.id);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/live-workflows/${row.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, updates }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.detail || 'Could not update this food offer.');
      setRecords((current) => current.map((item) => item.id === row.id ? payload : item));
    } catch (updateError) {
      setError(updateError.message || 'Could not update this food offer.');
    } finally {
      setBusyId('');
    }
  };

  const actionsFor = (row) => {
    if (portal === 'donor' && row.status === 'CLAIMED' && row.data?.deliveryMethod === 'self') return [['DELIVERED', 'Confirm self-delivery']];
    if (portalDestinations[portal] && row.status === 'AVAILABLE') return [['CLAIMED', 'Claim offer']];
    if (portal === 'rider' && row.status === 'CLAIMED') return [['PICKED_UP', 'Confirm pickup']];
    if (portal === 'rider' && row.status === 'PICKED_UP') return [['DELIVERED', 'Confirm delivery']];
    if (portalDestinations[portal] && row.status === 'DELIVERED') return [
      ['ACCEPTED', 'Accept safe food'],
      ['COMPOST_NEEDED', 'Reroute to compost'],
    ];
    if (portal === 'compost' && row.status === 'COMPOST_NEEDED') return [['COMPOST_RECEIVED', 'Confirm receipt']];
    if (portal === 'compost' && row.status === 'COMPOST_RECEIVED') return [['COMPOSTED', 'Mark composted']];
    return [];
  };

  const title = portal === 'donor' ? 'Your live food offers'
    : portal === 'rider' ? 'Live rider assignments'
      : portal === 'compost' ? 'Live compost handoffs'
        : portal === 'admin' ? 'Platform live workflow'
          : 'Live food offers';

  if (!token) {
    return (
      <section className="mx-auto mb-6 max-w-7xl px-4 sm:px-8 pt-5">
        <div className="rounded-2xl border border-[#e8dac2] bg-white/90 p-4 text-sm text-[#735747]">
          Live cross-portal updates are available after signing in through the connected API.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto mb-6 max-w-7xl px-4 sm:px-8 pt-5" aria-live="polite">
      <div className="overflow-hidden rounded-3xl border border-[#dce8df] bg-white/95 shadow-[0_12px_35px_rgba(37,60,45,.07)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf1ed] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf7ef] text-[#1d7b4a]"><Activity className="h-5 w-5" /></span>
            <div><h2 className="text-base font-extrabold text-[#253c2d]">{title}</h2><p className="text-xs text-[#718077]">Updates shared across portals · refreshes every 3 seconds</p></div>
          </div>
          <button type="button" onClick={() => load()} className="inline-flex items-center gap-2 rounded-xl border border-[#dce8df] px-3 py-2 text-xs font-bold text-[#1d5b3b] hover:bg-[#f5faf6]"><RefreshCw className="h-3.5 w-3.5" /> Refresh{lastSync ? ` · ${lastSync.toLocaleTimeString()}` : ''}</button>
        </div>
        {error && <p role="alert" className="mx-5 mt-4 rounded-xl bg-[#fff4f2] px-4 py-3 text-xs text-[#a83d31] sm:mx-6">{error}</p>}
        {visibleRecords.length === 0 ? (
          <p className="px-5 py-6 text-sm text-[#718077] sm:px-6">No live workflow items for this workspace yet.</p>
        ) : (
          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
            {visibleRecords.map((row) => (
              <article key={row.id} className="rounded-2xl border border-[#e9eee9] bg-[#fcfdfb] p-4">
                <div className="flex items-start justify-between gap-3"><h3 className="font-bold text-[#253c2d]">{row.data?.food || 'Food donation'}</h3><span className="shrink-0 rounded-full bg-[#edf6ef] px-2.5 py-1 text-[10px] font-bold text-[#1d5b3b]">{row.status.replaceAll('_', ' ')}</span></div>
                <p className="mt-1 text-xs text-[#718077]">{row.donor} · {row.data?.quantityKg ?? '—'} kg · {row.data?.servings ?? '—'} meals</p>
                <p className="mt-2 text-xs font-semibold text-[#a86627]">{STATUS_LABELS[row.status] || row.status}</p>
                {row.data?.destinationName && <p className="mt-1 text-xs text-[#718077]">Destination: {row.data.destinationName}</p>}
                {actionsFor(row).length > 0 && <div className="mt-4 flex flex-wrap gap-2">{actionsFor(row).map(([nextStatus, label]) => <button key={nextStatus} type="button" disabled={busyId === row.id} onClick={() => changeStatus(row, nextStatus, { updatedBy: user?.fullName || 'Portal user' })} className={`rounded-xl px-3 py-2 text-xs font-bold text-white disabled:opacity-50 ${nextStatus === 'COMPOST_NEEDED' ? 'bg-[#8a5a3b] hover:bg-[#70462c]' : 'bg-[#1d5b3b] hover:bg-[#174b30]'}`}>{busyId === row.id ? 'Updating…' : label}</button>)}</div>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
