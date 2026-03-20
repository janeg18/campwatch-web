'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const parks = [
  {
    name: 'Yosemite', emoji: '🏔', state: 'CA',
    campgrounds: [
      { id: '232447', name: 'Upper Pines' },
      { id: '232450', name: 'Lower Pines' },
      { id: '232449', name: 'North Pines' },
      { id: '232448', name: 'Camp 4' },
    ]
  },
  {
    name: 'Zion', emoji: '🌄', state: 'UT',
    campgrounds: [
      { id: '232054', name: 'Watchman Campground' },
      { id: '232055', name: 'South Campground' },
    ]
  },
  {
    name: 'Grand Canyon', emoji: '🪨', state: 'AZ',
    campgrounds: [
      { id: '232489', name: 'Mather Campground' },
    ]
  },
  {
    name: 'Grand Teton', emoji: '⛰', state: 'WY',
    campgrounds: [
      { id: '232493', name: 'Colter Bay Campground' },
      { id: '232494', name: 'Signal Mountain Campground' },
    ]
  },
  {
    name: 'Glacier', emoji: '🧊', state: 'MT',
    campgrounds: [
      { id: '232493', name: 'Apgar Campground' },
    ]
  },
  {
    name: 'Big Bend', emoji: '🌵', state: 'TX',
    campgrounds: [
      { id: '232492', name: 'Chisos Basin Campground' },
    ]
  },
]

type WatchModal = {
  campgroundId: string
  campgroundName: string
  park: string
  state: string
}

export default function Home() {
  const router = useRouter()
  const [expandedPark, setExpandedPark] = useState<string | null>(null)
  const [watchModal, setWatchModal] = useState<WatchModal | null>(null)
  const [stateQuery, setStateQuery] = useState('')
  const [stateResults, setStateResults] = useState<any[]>([])
  const [stateSearching, setStateSearching] = useState(false)

  // Watch modal form state
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nights, setNights] = useState(2)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyPhone, setNotifyPhone] = useState('')

  const today = new Date().toISOString().split('T')[0]

  async function searchByState() {
    if (stateQuery.trim().length < 2) return
    setStateSearching(true)
    setStateResults([])
    try {
      const params = new URLSearchParams({ query: stateQuery.trim().toUpperCase(), type: 'state' })
      const res = await fetch('/api/campgrounds?' + params)
      const data = await res.json()
      setStateResults((data.results || []).slice(0, 10))
    } catch {
      // ignore
    }
    setStateSearching(false)
  }

  function openWatchModal(campground: { id: string, name: string }, park: { name: string, state: string }) {
    setWatchModal({
      campgroundId: campground.id,
      campgroundName: campground.name,
      park: park.name,
      state: park.state,
    })
    setStartDate('')
    setEndDate('')
    setNights(2)
    setNotifyEmail('')
    setNotifyPhone('')
  }

  function handleWatchSubmit() {
    if (!watchModal || !startDate || !endDate) return
    const params = new URLSearchParams({
      campground_id: watchModal.campgroundId,
      campground_name: watchModal.campgroundName,
      park: watchModal.park,
      state: watchModal.state,
      start_date: startDate,
      end_date: endDate,
      nights: String(nights),
      notify_email: notifyEmail,
      notify_phone: notifyPhone,
    })
    router.push('/auth?mode=signup&' + params.toString())
  }

  return (
    <div className="min-h-screen">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏕</span>
          <span className="font-display font-semibold text-lg text-[#1a3028]">CampWatch</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth" className="text-sm font-medium text-[#3d2b1f]/70 hover:text-[#1a3028] transition-colors">
            Sign in
          </Link>
          <Link href="/auth?mode=signup" className="btn-primary">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-3xl mx-4 md:mx-8 mt-4 mb-16"
        style={{ background: 'var(--forest)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #7fb98a 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #4a7c59 0%, transparent 40%)`
          }}
        />
        <div className="relative z-10 px-8 md:px-16 py-20 md:py-28 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7fb98a] animate-pulse" />
            Scanning 4,000+ campgrounds every minute
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Stop refreshing.<br />
            <span style={{ color: '#7fb98a' }}>Start camping.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            CampWatch monitors Recreation.gov and texts you the moment a campsite opens up —
            so you can book before anyone else.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Link href="/auth?mode=signup"
              className="inline-flex items-center justify-center gap-2 bg-[#7fb98a] text-[#1a3028] font-bold px-8 py-4 rounded-xl hover:bg-[#8fcb9b] transition-all text-base">
              Start watching →
            </Link>
            <Link href="/auth"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-base">
              Sign in
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-4">$2.99 per watch · one-time payment · no subscription</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="font-display text-3xl font-semibold text-center text-[#1a3028] mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', icon: '🔍', title: 'Pick a campground', desc: 'Choose any campground and set your ideal dates and how many nights you need.' },
            { step: '02', icon: '⚡', title: 'We watch 24/7', desc: 'Our scanner checks Recreation.gov every minute for cancellations and new openings.' },
            { step: '03', icon: '📱', title: 'Get instant alerts', desc: 'The moment a site opens up, we text and email you so you can book immediately.' },
          ].map(item => (
            <div key={item.step} className="card p-6">
              <div className="text-3xl mb-4">{item.icon}</div>
              <div className="text-xs font-bold text-[#4a7c59] mb-2 tracking-widest">{item.step}</div>
              <h3 className="font-display text-lg font-semibold text-[#1a3028] mb-2">{item.title}</h3>
              <p className="text-sm text-[#3d2b1f]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-[#f0faf3] border border-[#4a7c59]/20 rounded-2xl px-6 py-4">
            <span className="text-2xl">💳</span>
            <div className="text-left">
              <div className="font-semibold text-[#1a3028] text-sm">$2.99 per watch, one-time</div>
              <div className="text-xs text-[#3d2b1f]/60">No subscription. Pay once per campground watch, keep it as long as you need.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Parks we monitor */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <h2 className="font-display text-3xl font-semibold text-center text-[#1a3028] mb-2">
          Parks we monitor
        </h2>
        <p className="text-center text-[#3d2b1f]/60 mb-2 text-sm">Any campground on Recreation.gov — 4,000+ sites across the US</p>
        <p className="text-center text-[#3d2b1f]/40 mb-10 text-xs">A few popular ones — click to explore campgrounds</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {parks.map(park => (
            <div key={park.name}>
              <button
                onClick={() => setExpandedPark(expandedPark === park.name ? null : park.name)}
                className={'card p-5 flex items-center gap-4 w-full text-left transition-all hover:shadow-md ' + (expandedPark === park.name ? 'border-[#4a7c59] bg-[#f0faf3]' : '')}
              >
                <span className="text-3xl">{park.emoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-[#1a3028] text-sm">{park.name}</div>
                  <div className="text-xs text-[#3d2b1f]/50">{park.campgrounds.length} campground{park.campgrounds.length > 1 ? 's' : ''}</div>
                </div>
                <span className="text-[#3d2b1f]/30 text-xs">{expandedPark === park.name ? '▲' : '▼'}</span>
              </button>
              {expandedPark === park.name && (
                <div className="mt-1 border border-[#ede5d5] rounded-xl overflow-hidden bg-white shadow-sm">
                  {park.campgrounds.map(cg => (
                    <div key={cg.id} className="flex items-center justify-between px-4 py-3 border-b border-[#ede5d5] last:border-0">
                      <span className="text-sm text-[#1a3028]">{cg.name}</span>
                      <button
                        onClick={() => openWatchModal(cg, park)}
                        className="text-xs font-semibold bg-[#4a7c59] text-white px-3 py-1.5 rounded-lg hover:bg-[#3d6b4a] transition-colors">
                        Watch
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Search by state */}
      <section className="max-w-2xl mx-auto px-6 mb-20">
        <div className="card p-8">
          <h2 className="font-display text-2xl font-semibold text-[#1a3028] mb-2">
            Find campgrounds near you
          </h2>
          <p className="text-sm text-[#3d2b1f]/60 mb-6">Enter a state code to discover top campgrounds</p>
          <div className="flex gap-2 mb-4">
            <input
              className="input flex-1"
              placeholder="e.g. CA, UT, WY..."
              value={stateQuery}
              onChange={e => setStateQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchByState()}
            />
            <button
              onClick={searchByState}
              disabled={stateSearching}
              className="btn-primary px-6">
              {stateSearching
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                : 'Search'}
            </button>
          </div>
          {stateResults.length > 0 && (
            <div className="border border-[#ede5d5] rounded-xl overflow-hidden">
              {stateResults.map((cg, i) => (
                <div key={cg.FacilityID} className="flex items-center justify-between px-4 py-3 border-b border-[#ede5d5] last:border-0 hover:bg-[#f5f0e8] transition-colors">
                  <div>
                    <div className="font-medium text-sm text-[#1a3028]">{cg.FacilityName}</div>
                    <div className="text-xs text-[#3d2b1f]/50">{cg.ParentRecAreaName}</div>
                  </div>
                  <button
                    onClick={() => openWatchModal(
                      { id: cg.FacilityID, name: cg.FacilityName },
                      { name: cg.ParentRecAreaName || '', state: cg.AddressStateCode || stateQuery.toUpperCase() }
                    )}
                    className="text-xs font-semibold bg-[#4a7c59] text-white px-3 py-1.5 rounded-lg hover:bg-[#3d6b4a] transition-colors ml-4 flex-shrink-0">
                    Watch
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 mb-20 text-center">
        <div className="card p-10" style={{ background: 'var(--sky)' }}>
          <h2 className="font-display text-3xl font-semibold text-[#1a3028] mb-4">
            Ready to snag that site?
          </h2>
          <p className="text-[#3d2b1f]/70 mb-2 text-sm leading-relaxed">
            Sign up free, then add a watch for any campground — $2.99 per watch, one-time.
          </p>
          <p className="text-[#3d2b1f]/40 mb-8 text-xs">No subscription. No hidden fees. Just alerts.</p>
          <Link href="/auth?mode=signup" className="btn-primary text-base px-10 py-4">
            Create free account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ede5d5] py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-[#3d2b1f]/50">
          <div className="flex items-center gap-2">
            <span>🏕</span>
            <span className="font-display">CampWatch</span>
          </div>
          <div>Built with ♥ for campers</div>
        </div>
      </footer>

      {/* Watch Modal */}
      {watchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-[#f5f0e8] rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#1a3028]">{watchModal.campgroundName}</h2>
                <p className="text-xs text-[#3d2b1f]/50">{watchModal.park} · {watchModal.state}</p>
              </div>
              <button onClick={() => setWatchModal(null)} className="text-[#3d2b1f]/30 hover:text-[#3d2b1f] text-xl">×</button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Check-in</label>
                  <input className="input" type="date" min={today}
                    value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label className="label">Check-out</label>
                  <input className="input" type="date" min={startDate || today}
                    value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label">Minimum nights</label>
                <select className="input" value={nights} onChange={e => setNights(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7].map(n => (
                    <option key={n} value={n}>{n} night{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
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

            <div className="flex gap-3 mt-6">
              <button onClick={() => setWatchModal(null)}
                className="flex-1 py-3 rounded-xl border border-[#ede5d5] text-sm font-medium text-[#3d2b1f]/70 hover:border-[#3d2b1f]/30 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleWatchSubmit}
                disabled={!startDate || !endDate || (!notifyEmail && !notifyPhone)}
                className="flex-1 py-3 rounded-xl bg-[#1a3028] text-white text-sm font-bold hover:bg-[#2a4038] transition-colors disabled:opacity-50">
                Continue →
              </button>
            </div>
            <p className="text-center text-xs text-[#3d2b1f]/40 mt-3">$2.99 one-time · sign up to complete</p>
          </div>
        </div>
      )}

    </div>
  )
}
