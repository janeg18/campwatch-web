'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

type Campground = {
  FacilityID: string
  FacilityName: string
  ParentRecAreaName: string
  AddressStateCode: string
  FacilityLatitude: number
  FacilityLongitude: number
}

type WatchData = {
  campground_id: string
  campground_name: string
  park: string
  state: string
  start_date: string
  end_date: string
  nights: number
  notify_email: string | null
  notify_phone: string | null
}

export default function AddWatch() {
  const router = useRouter()
  const supabase = createClient()

  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<'name' | 'state' | 'city'>('name')
  const [results, setResults] = useState<Campground[]>([])
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState<Campground | null>(null)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nights, setNights] = useState(2)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyPhone, setNotifyPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Confirmation modal state
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingWatchData, setPendingWatchData] = useState<WatchData | null>(null)
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)

  const today = new Date().toISOString().split('T')[0]

  async function search() {
    if (query.trim().length < 2) return
    setSearching(true)
    setResults([])
    try {
      const params = new URLSearchParams({ query, type: searchType })
      const res = await fetch('/api/campgrounds?' + params)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setError('Search failed, please try again')
    }
    setSearching(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!selected) { setError('Please select a campground'); return }
    if (!startDate || !endDate) { setError('Please select dates'); return }
    if (endDate <= startDate) { setError('Check-out must be after check-in'); return }
    if (!notifyEmail && !notifyPhone) { setError('Add at least one notification method'); return }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    const watchData: WatchData = {
      campground_id: selected.FacilityID,
      campground_name: selected.FacilityName,
      park: selected.ParentRecAreaName || '',
      state: selected.AddressStateCode || '',
      start_date: startDate,
      end_date: endDate,
      nights,
      notify_email: notifyEmail || null,
      notify_phone: notifyPhone || null,
    }

    setPendingWatchData(watchData)
    setPendingUserId(user.id)
    setShowConfirm(true)
  }

  async function handleConfirmPayment() {
    if (!pendingWatchData || !pendingUserId) return
    setLoading(true)
    setShowConfirm(false)

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ watchData: pendingWatchData, userId: pendingUserId }),
    })

    const data = await res.json()
    if (data.error) { setError(data.error); setLoading(false); return }
    window.location.href = data.url
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-[#f5f0e8]/80 backdrop-blur border-b border-[#ede5d5]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-[#3d2b1f]/60 hover:text-[#1a3028] transition-colors">
            Back
          </Link>
          <span className="font-display font-semibold text-[#1a3028]">Add Watch</span>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-[#1a3028] mb-2">Add a watch</h1>
          <p className="text-sm text-[#3d2b1f]/60">Search any campground across the US.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="label">Find a campground</label>
            <div className="flex gap-4 mb-3">
              {(['name', 'state', 'city'] as const).map(t => (
                <label key={t} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="searchType"
                    value={t}
                    checked={searchType === t}
                    onChange={() => { setSearchType(t); setResults([]); setSelected(null) }}
                    className="accent-[#4a7c59]"
                  />
                  <span className="text-sm text-[#3d2b1f]/70 capitalize">
                    {t === 'name' ? 'Park name' : t === 'state' ? 'State (e.g. CA)' : 'City'}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                className="input flex-1"
                placeholder={
                  searchType === 'name' ? 'e.g. Yosemite, Yellowstone...' :
                  searchType === 'state' ? 'e.g. CA, UT, WY...' :
                  'e.g. Moab, Gatlinburg...'
                }
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), search())}
              />
              <button
                type="button"
                onClick={search}
                disabled={searching}
                className="btn-primary px-4"
              >
                {searching ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                ) : '🔍'}
              </button>
            </div>

            {results.length > 0 && !selected && (
              <div className="mt-2 border border-[#ede5d5] rounded-xl overflow-hidden bg-white shadow-sm max-h-64 overflow-y-auto">
                {results.map(cg => (
                  <button
                    key={cg.FacilityID}
                    type="button"
                    onClick={() => { setSelected(cg); setResults([]) }}
                    className="w-full text-left px-4 py-3 hover:bg-[#f5f0e8] transition-colors border-b border-[#ede5d5] last:border-0"
                  >
                    <div className="font-medium text-sm text-[#1a3028]">{cg.FacilityName}</div>
                    <div className="text-xs text-[#3d2b1f]/50 mt-0.5">
                      {cg.ParentRecAreaName} · {cg.AddressStateCode}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {results.length === 0 && query && !searching && (
              <p className="text-xs text-[#3d2b1f]/40 mt-2">No results — try a different search</p>
            )}

            {selected && (
              <div className="mt-2 bg-[#f0faf3] border border-[#4a7c59]/30 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-[#1a3028]">{selected.FacilityName}</div>
                  <div className="text-xs text-[#3d2b1f]/50">{selected.ParentRecAreaName} · {selected.AddressStateCode}</div>
                </div>
                <button type="button" onClick={() => setSelected(null)}
                  className="text-xs text-[#3d2b1f]/40 hover:text-red-400 ml-4">
                  Change
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Check-in</label>
              <input className="input" type="date" min={today}
                value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div>
              <label className="label">Check-out</label>
              <input className="input" type="date" min={startDate || today}
                value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="label">Minimum consecutive nights</label>
            <select className="input" value={nights} onChange={e => setNights(Number(e.target.value))}>
              {[1,2,3,4,5,6,7].map(n => (
                <option key={n} value={n}>{n} night{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="card p-5 space-y-4">
            <div className="font-semibold text-sm text-[#1a3028]">🔔 Notifications</div>
            <div>
              <label className="label">SMS (recommended)</label>
              <input className="input" type="tel" placeholder="+1 555 000 0000"
                value={notifyPhone} onChange={e => setNotifyPhone(e.target.value)} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@email.com"
                value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading || !selected}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50">
            {loading
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : '🏕 Start watching'}
          </button>

          <p className="text-center text-xs text-[#3d2b1f]/40">
            $2.99 one-time payment · you will be prompted to pay before the watch is created
          </p>
        </form>
      </main>

      {/* Confirmation Modal */}
      {showConfirm && pendingWatchData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-[#f5f0e8] rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="text-2xl mb-3">💳</div>
            <h2 className="font-display text-xl font-semibold text-[#1a3028] mb-1">
              One-time payment of $2.99
            </h2>
            <p className="text-sm text-[#3d2b1f]/60 mb-5">
              This is a one-time monitoring fee — not a campsite booking. After payment, CampWatch will scan Recreation.gov every 5 minutes and alert you the moment a site opens up.
            </p>

            <div className="bg-white rounded-xl p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#3d2b1f]/60">Campground</span>
                <span className="font-medium text-[#1a3028] text-right max-w-[60%]">{pendingWatchData.campground_name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#3d2b1f]/60">Dates</span>
                <span className="font-medium text-[#1a3028]">{pendingWatchData.start_date} → {pendingWatchData.end_date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#3d2b1f]/60">Min nights</span>
                <span className="font-medium text-[#1a3028]">{pendingWatchData.nights}+</span>
              </div>
              {pendingWatchData.notify_phone && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#3d2b1f]/60">SMS alerts</span>
                  <span className="font-medium text-[#1a3028]">{pendingWatchData.notify_phone}</span>
                </div>
              )}
              {pendingWatchData.notify_email && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#3d2b1f]/60">Email alerts</span>
                  <span className="font-medium text-[#1a3028]">{pendingWatchData.notify_email}</span>
                </div>
              )}
              <div className="border-t border-[#ede5d5] pt-2 flex justify-between text-sm font-bold">
                <span className="text-[#1a3028]">Total</span>
                <span className="text-[#1a3028]">$2.99</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-[#ede5d5] text-sm font-medium text-[#3d2b1f]/70 hover:border-[#3d2b1f]/30 transition-colors">
                Go back
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 py-3 rounded-xl bg-[#1a3028] text-white text-sm font-bold hover:bg-[#2a4038] transition-colors">
                Pay $2.99 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
