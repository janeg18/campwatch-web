'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const parks = [
  {
    name: 'Yosemite', state: 'CA', tag: 'California',
    bg: '#1A3D38',
    accent: '#9DBFA0',
    campgrounds: [
      { id: '232447', name: 'Upper Pines' },
      { id: '232450', name: 'Lower Pines' },
      { id: '232449', name: 'North Pines' },
      { id: '232448', name: 'Camp 4' },
    ]
  },
  {
    name: 'Zion', state: 'UT', tag: 'Utah',
    bg: '#8A3B22',
    accent: '#E0A982',
    campgrounds: [
      { id: '232054', name: 'Watchman Campground' },
      { id: '232055', name: 'South Campground' },
    ]
  },
  {
    name: 'Grand Canyon', state: 'AZ', tag: 'Arizona',
    bg: '#AB7D46',
    accent: '#F0D8A8',
    campgrounds: [
      { id: '232489', name: 'Mather Campground' },
    ]
  },
  {
    name: 'Grand Teton', state: 'WY', tag: 'Wyoming',
    bg: '#2C544E',
    accent: '#9FC8BE',
    campgrounds: [
      { id: '232493', name: 'Colter Bay Campground' },
      { id: '232494', name: 'Signal Mountain Campground' },
    ]
  },
  {
    name: 'Glacier', state: 'MT', tag: 'Montana',
    bg: '#3A4A52',
    accent: '#A8C4CE',
    campgrounds: [
      { id: '232493', name: 'Apgar Campground' },
    ]
  },
  {
    name: 'Big Bend', state: 'TX', tag: 'Texas',
    bg: '#6B4A2A',
    accent: '#D9B888',
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
  const [supabase] = useState(() => createClient())
  const [user, setUser] = useState<any>(null)
  const [authLoaded, setAuthLoaded] = useState(false)

  const [expandedPark, setExpandedPark] = useState<string | null>(null)
  const [watchModal, setWatchModal] = useState<WatchModal | null>(null)
  const [stateQuery, setStateQuery] = useState('')
  const [stateResults, setStateResults] = useState<any[]>([])
  const [stateSearching, setStateSearching] = useState(false)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nights, setNights] = useState(2)
  const [notifyEmail, setNotifyEmail] = useState('')

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setAuthLoaded(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setAuthLoaded(true)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  async function searchByState() {
    if (stateQuery.trim().length < 2) return
    setStateSearching(true)
    setStateResults([])
    try {
      const params = new URLSearchParams({ query: stateQuery.trim().toUpperCase(), type: 'state' })
      const res = await fetch('/api/campgrounds?' + params)
      const data = await res.json()
      setStateResults((data.results || []).slice(0, 10))
    } catch {}
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
  }

  function handleWatchSubmit() {
    if (!watchModal || !startDate || !endDate) return
    if (user) {
      router.push('/dashboard/add')
      return
    }
    const params = new URLSearchParams({
      campground_id: watchModal.campgroundId,
      campground_name: watchModal.campgroundName,
      park: watchModal.park,
      state: watchModal.state,
      start_date: startDate,
      end_date: endDate,
      nights: String(nights),
      notify_email: notifyEmail,
    })
    router.push('/auth?mode=signup&' + params.toString())
  }

  return (
    <div className="relative min-h-screen">

      {/* Topographic background — full page, sits behind everything on cream */}
      <div className="topo-bg fixed inset-0 -z-10" aria-hidden="true" />

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏕</span>
          <span className="font-display font-semibold text-lg text-[#1A3D38]">CampWatch</span>
        </div>
        <div className="flex items-center gap-3">
          {!authLoaded ? (
            <div className="w-7 h-7 rounded-full bg-[#1A3D38]/10 animate-pulse" />
          ) : user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-[#1A3D38] hover:opacity-80 transition-opacity">
                <span className="w-7 h-7 rounded-full bg-[#1A3D38] text-white flex items-center justify-center text-xs font-semibold uppercase">
                  {user.email?.[0] ?? '?'}
                </span>
                <span className="hidden sm:inline max-w-[180px] truncate">{user.email}</span>
              </Link>
              <button onClick={handleSignOut} className="text-sm font-medium text-[#26302C]/45 hover:text-[#1A3D38] transition-colors">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" className="text-sm font-medium text-[#26302C]/55 hover:text-[#1A3D38] transition-colors">
                Sign in
              </Link>
              <Link href="/auth?mode=signup" className="btn-primary">
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero — light cream, airy */}
      <section className="relative max-w-6xl mx-auto px-6 pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#AB7D46]/12 text-[#8A6233] text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#AB7D46] animate-pulse"/>
            Scanning 4,000+ campgrounds every minute
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[#1A3D38] leading-[1.08] mb-6">
            Stop refreshing.<br/>
            <span style={{ color: '#8A6233' }}>Start camping.</span>
          </h1>
          <p className="text-[#6F7A72] text-lg max-w-md mb-10 leading-relaxed">
            CampWatch monitors Recreation.gov and messages you the moment a campsite opens up — so you can book before anyone else.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={user ? '/dashboard/add' : '/auth?mode=signup'} className="inline-flex items-center justify-center gap-2 bg-[#AB7D46] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#9A6E3A] transition-all text-sm">
              Start watching →
            </Link>
            <Link href={user ? '/dashboard' : '/auth'} className="inline-flex items-center justify-center gap-2 bg-white/70 text-[#1A3D38] font-medium px-8 py-3.5 rounded-xl hover:bg-white transition-all text-sm border border-[#1A3D38]/15">
              {user ? 'Go to dashboard' : 'Sign in'}
            </Link>
          </div>
          <p className="text-[#6F7A72]/70 text-xs mt-5">$2.99 per watch · one-time · no subscription</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-[#8A6233] uppercase mb-3">How it works</p>
          <h2 className="font-display text-3xl font-bold text-[#1A3D38]">Three steps to your campsite</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              num: '01',
              icon: '🔍',
              title: 'Pick a campground',
              desc: 'Search any campground on Recreation.gov and set your ideal dates and minimum nights.',
            },
            {
              num: '02',
              icon: '⚡',
              title: 'We watch 24/7',
              desc: 'Our scanner checks every minute for cancellations and new openings — day and night.',
            },
            {
              num: '03',
              icon: '📱',
              title: 'Get instant alerts',
              desc: 'The moment a site opens up, we email you so you can book before anyone else.',
            },
          ].map(item => (
            <div key={item.num} className="bg-white rounded-2xl p-6 border border-[#E6DFC9]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold text-[#8A6233] tracking-widest">{item.num}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-[#1A3D38] mb-2">{item.title}</h3>
              <p className="text-sm text-[#26302C]/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-[#F1EDDD] border border-[#AB7D46]/20 rounded-2xl px-5 py-3.5">
            <span className="text-lg">💳</span>
            <div>
              <span className="font-semibold text-[#1A3D38] text-sm">$2.99 per watch, one-time</span>
              <span className="text-[#26302C]/50 text-xs ml-2">· no subscription</span>
            </div>
          </div>
        </div>
      </section>

      {/* Parks we monitor */}
      <section className="max-w-6xl mx-auto px-6 mb-6">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-[#8A6233] uppercase mb-3">Coverage</p>
          <h2 className="font-display text-3xl font-bold text-[#1A3D38] mb-2">
            4,000+ campgrounds across the US
          </h2>
          <p className="text-[#26302C]/50 text-sm">Any site on Recreation.gov · click a park to explore</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {parks.map(park => (
            <div key={park.name}>
              <button
                onClick={() => setExpandedPark(expandedPark === park.name ? null : park.name)}
                className={'relative overflow-hidden w-full text-left transition-all duration-200 rounded-2xl ' +
                  (expandedPark === park.name ? 'ring-2 ring-[#AB7D46]' : 'hover:opacity-90')}
                style={{
                  background: park.bg,
                  minHeight: '160px',
                }}
              >
                <div className="absolute inset-0 opacity-30" style={{
                  background: `radial-gradient(ellipse at 80% 20%, ${park.accent}40 0%, transparent 60%)`
                }}/>

                <div className="relative z-10 p-5 flex flex-col justify-between h-full" style={{ minHeight: '160px' }}>
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{
                      background: 'rgba(255,255,255,0.12)',
                      color: park.accent,
                    }}>
                      {park.tag}
                    </span>
                    <span className="text-white/40 text-xs">
                      {expandedPark === park.name ? '▲' : '▼'}
                    </span>
                  </div>

                  <div>
                    <div className="font-display font-bold text-2xl text-white mb-1">
                      {park.name}
                    </div>
                    <div className="text-xs font-medium" style={{ color: park.accent }}>
                      {park.campgrounds.length} campground{park.campgrounds.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </button>

              {expandedPark === park.name && (
                <div className="mt-1.5 rounded-2xl overflow-hidden bg-white border border-[#E6DFC9] shadow-sm">
                  {park.campgrounds.map(cg => (
                    <div key={cg.id} className="flex items-center justify-between px-4 py-3 border-b border-[#EFEAD9] last:border-0 hover:bg-[#FBF9EF] transition-colors">
                      <span className="text-sm text-[#1A3D38]">{cg.name}</span>
                      <button
                        onClick={() => openWatchModal(cg, park)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg ml-3 flex-shrink-0 transition-all hover:opacity-80"
                        style={{ background: park.bg, color: 'white' }}>
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

      {/* Search by state — deep green block */}
      <section className="mb-20 mx-4 md:mx-8 rounded-3xl overflow-hidden" style={{ background: '#1A3D38' }}>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-[#C9A86E] uppercase mb-3">Search</p>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Find your campground</h2>
          <p className="text-white/50 text-sm mb-8">Enter a state code to discover campgrounds near you</p>
          <div className="flex gap-2 max-w-sm mx-auto mb-6">
            <input
              className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#AB7D46] transition-all text-white placeholder-white/30"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              placeholder="e.g. CA, UT, WY..."
              value={stateQuery}
              onChange={e => setStateQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchByState()}
            />
            <button
              onClick={searchByState}
              disabled={stateSearching}
              className="bg-[#AB7D46] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#9A6E3A] transition-colors text-sm flex-shrink-0">
              {stateSearching
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block"/>
                : 'Search'}
            </button>
          </div>
          {stateResults.length > 0 && (
            <div className="rounded-2xl overflow-hidden text-left" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {stateResults.map((cg) => (
                <div key={cg.FacilityID} className="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <div>
                    <div className="font-medium text-sm text-white">{cg.FacilityName}</div>
                    <div className="text-xs text-white/40 mt-0.5">{cg.ParentRecAreaName}</div>
                  </div>
                  <button
                    onClick={() => openWatchModal(
                      { id: cg.FacilityID, name: cg.FacilityName },
                      { name: cg.ParentRecAreaName || '', state: cg.AddressStateCode || stateQuery.toUpperCase() }
                    )}
                    className="text-xs font-semibold bg-[#AB7D46] text-white px-3 py-1.5 rounded-lg ml-4 flex-shrink-0 hover:bg-[#9A6E3A] transition-colors">
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
        <div className="bg-[#F1EDDD] rounded-3xl p-10 border border-[#AB7D46]/15">
          <h2 className="font-display text-3xl font-bold text-[#1A3D38] mb-3">Ready to snag that site?</h2>
          <p className="text-[#26302C]/60 mb-1 text-sm">
            {user ? 'Add a watch for any campground and we\u2019ll take it from here.' : 'Sign up free, then add a watch for any campground.'}
          </p>
          <p className="text-[#26302C]/40 mb-8 text-xs">$2.99 per watch · one-time · no subscription · no hidden fees</p>
          <Link href={user ? '/dashboard/add' : '/auth?mode=signup'} className="btn-primary text-sm px-8 py-3.5">
            {user ? 'Add a watch →' : 'Get started →'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E6DFC9] py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-[#26302C]/40">
          <div className="flex items-center gap-2">
            <span>🏕</span>
            <span className="font-display font-medium text-[#1A3D38]">CampWatch</span>
          </div>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-[#1A3D38] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#1A3D38] transition-colors">Privacy</Link>
            <Link href="/refunds" className="hover:text-[#1A3D38] transition-colors">Refunds</Link>
          </div>
        </div>
      </footer>

      {/* Watch Modal */}
      {watchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#1A3D38]">{watchModal.campgroundName}</h2>
                <p className="text-xs text-[#26302C]/50 mt-0.5">{watchModal.park} · {watchModal.state}</p>
              </div>
              <button onClick={() => setWatchModal(null)} className="text-[#26302C]/30 hover:text-[#26302C] w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-xl transition-colors">×</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Check-in</label>
                  <input className="input" type="date" min={today} value={startDate} onChange={e => setStartDate(e.target.value)}/>
                </div>
                <div>
                  <label className="label">Check-out</label>
                  <input className="input" type="date" min={startDate || today} value={endDate} onChange={e => setEndDate(e.target.value)}/>
                </div>
              </div>
              <div>
                <label className="label">Minimum nights</label>
                <select className="input" value={nights} onChange={e => setNights(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} night{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" placeholder="you@email.com" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}/>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setWatchModal(null)} className="flex-1 py-3 rounded-xl border border-[#E6DFC9] text-sm font-medium text-[#26302C]/60 hover:border-[#26302C]/30 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleWatchSubmit}
                disabled={!startDate || !endDate || !notifyEmail}
                className="flex-1 py-3 rounded-xl bg-[#1A3D38] text-white text-sm font-semibold hover:bg-[#24514A] transition-colors disabled:opacity-40">
                Continue →
              </button>
            </div>
            <p className="text-center text-xs text-[#26302C]/30 mt-3">
              {user ? '$2.99 one-time · continue to add your watch' : '$2.99 one-time · sign up to complete'}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
