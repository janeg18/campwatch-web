'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const parks = [
  {
    name: 'Yosemite', state: 'CA',
    bg: '#2d5a3d', accent: '#a8d5b5', textColor: '#f5efe0',
    illustration: (
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-20">
        <path d="M0,100 L40,40 L60,60 L80,20 L100,50 L120,10 L140,45 L160,30 L200,80 L200,100 Z" fill="#a8d5b5"/>
        <path d="M0,100 L30,70 L60,80 L90,60 L110,75 L140,55 L170,65 L200,50 L200,100 Z" fill="#1a3828" opacity="0.6"/>
        <circle cx="120" cy="15" r="8" fill="#f5efe0" opacity="0.4"/>
        <path d="M112,15 Q120,5 128,15" fill="none" stroke="#f5efe0" strokeWidth="1" opacity="0.3"/>
        <line x1="0" y1="72" x2="200" y2="72" stroke="#a8d5b5" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,4"/>
      </svg>
    ),
    campgrounds: [
      { id: '232447', name: 'Upper Pines' },
      { id: '232450', name: 'Lower Pines' },
      { id: '232449', name: 'North Pines' },
      { id: '232448', name: 'Camp 4' },
    ]
  },
  {
    name: 'Zion', state: 'UT',
    bg: '#9b3a1e', accent: '#f5c4a8', textColor: '#f5efe0',
    illustration: (
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-20">
        <rect x="30" y="20" width="40" height="80" fill="#f5c4a8"/>
        <rect x="80" y="10" width="55" height="90" fill="#d4703a"/>
        <rect x="145" y="30" width="35" height="70" fill="#f5c4a8"/>
        <rect x="0" y="60" width="30" height="40" fill="#c4623a"/>
        <rect x="185" y="50" width="15" height="50" fill="#c4623a"/>
        <path d="M0,100 Q50,85 100,90 Q150,85 200,100" fill="#9b3a1e" opacity="0.5"/>
        <line x1="60" y1="20" x2="60" y2="100" stroke="#f5efe0" strokeWidth="0.3" opacity="0.2" strokeDasharray="2,3"/>
        <line x1="110" y1="10" x2="110" y2="100" stroke="#f5efe0" strokeWidth="0.3" opacity="0.2" strokeDasharray="2,3"/>
      </svg>
    ),
    campgrounds: [
      { id: '232054', name: 'Watchman Campground' },
      { id: '232055', name: 'South Campground' },
    ]
  },
  {
    name: 'Grand Canyon', state: 'AZ',
    bg: '#c47820', accent: '#1a3d3a', textColor: '#1a3d3a',
    illustration: (
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-20">
        <rect x="0" y="0" width="200" height="30" fill="#e8a020"/>
        <path d="M0,30 L20,30 L30,50 L50,45 L70,65 L90,55 L110,70 L130,50 L150,60 L170,45 L190,55 L200,50 L200,30 Z" fill="#8b4513"/>
        <path d="M0,60 L25,55 L45,70 L65,60 L85,75 L105,65 L125,78 L145,68 L165,72 L185,65 L200,70 L200,100 L0,100 Z" fill="#6b3410"/>
        <path d="M80,65 L90,85 L100,70 L110,88 L120,72" fill="none" stroke="#c47820" strokeWidth="1" opacity="0.5"/>
        <circle cx="30" cy="15" r="5" fill="#f5efe0" opacity="0.3"/>
        <circle cx="160" cy="12" r="3" fill="#f5efe0" opacity="0.3"/>
      </svg>
    ),
    campgrounds: [
      { id: '232489', name: 'Mather Campground' },
    ]
  },
  {
    name: 'Grand Teton', state: 'WY',
    bg: '#1a3d5c', accent: '#b3d4f0', textColor: '#f5efe0',
    illustration: (
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-20">
        <path d="M0,100 L50,60 L70,70 L100,20 L130,70 L150,55 L200,100 Z" fill="#b3d4f0"/>
        <path d="M85,35 L100,20 L115,35 L110,35 L105,50 L95,50 L90,35 Z" fill="#f5efe0" opacity="0.5"/>
        <path d="M0,100 L40,80 L80,85 L120,78 L160,82 L200,100 Z" fill="#0d2137" opacity="0.6"/>
        <path d="M0,85 Q50,78 100,82 Q150,78 200,85" fill="none" stroke="#b3d4f0" strokeWidth="0.8" opacity="0.4"/>
        <circle cx="30" cy="30" r="2" fill="#f5efe0" opacity="0.5"/>
        <circle cx="50" cy="20" r="1.5" fill="#f5efe0" opacity="0.5"/>
        <circle cx="170" cy="25" r="2" fill="#f5efe0" opacity="0.5"/>
        <circle cx="185" cy="15" r="1" fill="#f5efe0" opacity="0.5"/>
      </svg>
    ),
    campgrounds: [
      { id: '232493', name: 'Colter Bay Campground' },
      { id: '232494', name: 'Signal Mountain Campground' },
    ]
  },
  {
    name: 'Glacier', state: 'MT',
    bg: '#1e4d5c', accent: '#a8dde8', textColor: '#f5efe0',
    illustration: (
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-20">
        <path d="M0,100 L30,50 L55,65 L80,30 L105,55 L130,40 L155,60 L200,100 Z" fill="#a8dde8"/>
        <path d="M70,35 L80,30 L90,38 L88,38 L85,48 L75,48 L72,38 Z" fill="#f5efe0" opacity="0.6"/>
        <path d="M125,45 L130,40 L135,46 L133,46 L131,53 L129,53 L127,46 Z" fill="#f5efe0" opacity="0.6"/>
        <path d="M0,100 L50,88 Q100,82 150,88 L200,100 Z" fill="#0d3040" opacity="0.7"/>
        <path d="M20,88 Q60,83 100,86 Q140,83 180,88" fill="none" stroke="#a8dde8" strokeWidth="1" opacity="0.5"/>
        <circle cx="20" cy="20" r="15" fill="none" stroke="#f5efe0" strokeWidth="0.5" opacity="0.2"/>
        <path d="M10,20 Q20,10 30,20" fill="none" stroke="#f5efe0" strokeWidth="0.5" opacity="0.3"/>
      </svg>
    ),
    campgrounds: [
      { id: '232493', name: 'Apgar Campground' },
    ]
  },
  {
    name: 'Big Bend', state: 'TX',
    bg: '#7a4a10', accent: '#e8c878', textColor: '#f5efe0',
    illustration: (
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-20">
        <path d="M0,100 L0,60 Q10,58 15,45 Q20,58 25,60 L25,100 Z" fill="#5a8a30"/>
        <path d="M25,100 L25,55 Q32,50 36,38 Q42,28 48,38 Q52,50 55,55 L55,100 Z" fill="#4a7a28"/>
        <path d="M150,100 L150,65 Q157,60 161,50 Q165,42 169,50 Q173,60 175,65 L175,100 Z" fill="#5a8a30"/>
        <path d="M0,100 L60,90 L100,95 L140,88 L200,100 Z" fill="#5a3a08" opacity="0.6"/>
        <circle cx="160" cy="20" r="18" fill="#e8a020" opacity="0.4"/>
        <path d="M148,20 Q160,8 172,20 Q160,30 148,20" fill="#e8c878" opacity="0.3"/>
        <path d="M0,75 Q50,70 100,73 Q150,70 200,75" fill="none" stroke="#e8c878" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,3"/>
      </svg>
    ),
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
      <section className="relative overflow-hidden rounded-3xl mx-4 md:mx-8 mt-4 mb-16" style={{ background: 'var(--forest)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #7fb98a 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #4a7c59 0%, transparent 40%)`
        }}/>
        <div className="relative z-10 px-8 md:px-16 py-20 md:py-28 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7fb98a] animate-pulse"/>
            Scanning 4,000+ campgrounds every minute
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Stop refreshing.<br/>
            <span style={{ color: '#7fb98a' }}>Start camping.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            CampWatch monitors Recreation.gov and texts you the moment a campsite opens up — so you can book before anyone else.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Link href="/auth?mode=signup" className="inline-flex items-center justify-center gap-2 bg-[#7fb98a] text-[#1a3028] font-bold px-8 py-4 rounded-xl hover:bg-[#8fcb9b] transition-all text-base">
              Start watching →
            </Link>
            <Link href="/auth" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-base">
              Sign in
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-4">$2.99 per watch · one-time payment · no subscription</p>
        </div>
      </section>

      {/* How it works — hand-drawn style */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-[#c84b1a] uppercase mb-3">— How it works —</p>
          <h2 className="font-display text-4xl font-bold text-[#1a3028]">Simple as a campfire</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: '01', title: 'Pick a campground',
              desc: 'Search any campground on Recreation.gov and set your dates.',
              color: '#2d5a3d', accent: '#a8d5b5',
              svg: (
                <svg viewBox="0 0 80 60" className="w-20 h-16 mb-4">
                  <circle cx="40" cy="22" r="14" fill="none" stroke="#a8d5b5" strokeWidth="1.5"/>
                  <path d="M33,22 L38,27 L48,17" fill="none" stroke="#a8d5b5" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20,45 Q40,38 60,45" fill="none" stroke="#2d5a3d" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M25,50 Q40,44 55,50" fill="none" stroke="#a8d5b5" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                  <path d="M15,42 Q18,35 22,30 Q26,25 30,28" fill="none" stroke="#a8d5b5" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
                  <path d="M65,42 Q62,35 58,30 Q54,25 50,28" fill="none" stroke="#a8d5b5" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
                </svg>
              )
            },
            {
              num: '02', title: 'We watch 24/7',
              desc: 'Our scanner checks every minute for cancellations and new openings.',
              color: '#9b3a1e', accent: '#f5c4a8',
              svg: (
                <svg viewBox="0 0 80 60" className="w-20 h-16 mb-4">
                  <circle cx="40" cy="28" r="16" fill="none" stroke="#f5c4a8" strokeWidth="1.5"/>
                  <path d="M40,28 L40,18" stroke="#9b3a1e" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M40,28 L48,32" stroke="#f5c4a8" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="40" cy="28" r="2" fill="#f5c4a8"/>
                  <path d="M28,10 Q40,5 52,10" fill="none" stroke="#f5c4a8" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                  <path d="M20,18 Q14,26 14,36" fill="none" stroke="#f5c4a8" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
                  <path d="M60,18 Q66,26 66,36" fill="none" stroke="#f5c4a8" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
                  <path d="M25,52 Q40,47 55,52" fill="none" stroke="#9b3a1e" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )
            },
            {
              num: '03', title: 'Get instant alerts',
              desc: 'We text and email you the moment a site opens so you can book fast.',
              color: '#1a3d5c', accent: '#b3d4f0',
              svg: (
                <svg viewBox="0 0 80 60" className="w-20 h-16 mb-4">
                  <rect x="25" y="12" width="30" height="38" rx="4" fill="none" stroke="#b3d4f0" strokeWidth="1.5"/>
                  <rect x="28" y="18" width="24" height="16" rx="2" fill="#1a3d5c" stroke="#b3d4f0" strokeWidth="0.8"/>
                  <circle cx="40" cy="44" r="2.5" fill="none" stroke="#b3d4f0" strokeWidth="1.2"/>
                  <path d="M12,20 Q18,16 25,18" fill="none" stroke="#b3d4f0" strokeWidth="1" strokeLinecap="round" opacity="0.5" strokeDasharray="2,2"/>
                  <path d="M8,28 Q16,24 25,26" fill="none" stroke="#b3d4f0" strokeWidth="1" strokeLinecap="round" opacity="0.4" strokeDasharray="2,2"/>
                  <path d="M68,20 Q62,16 55,18" fill="none" stroke="#b3d4f0" strokeWidth="1" strokeLinecap="round" opacity="0.5" strokeDasharray="2,2"/>
                  <path d="M72,28 Q64,24 55,26" fill="none" stroke="#b3d4f0" strokeWidth="1" strokeLinecap="round" opacity="0.4" strokeDasharray="2,2"/>
                  <path d="M33,24 L36,27 L44,21" fill="none" stroke="#b3d4f0" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )
            },
          ].map(item => (
            <div key={item.num} className="relative p-6 text-center"
              style={{
                background: '#f5efe0',
                borderRadius: '12px',
                boxShadow: `4px 4px 0px ${item.color}`,
                border: `2px solid ${item.color}20`,
              }}>
              <div className="flex justify-center">{item.svg}</div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: item.color }}>
                {item.num}
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1a3028] mb-2">{item.title}</h3>
              <p className="text-sm text-[#3d2b1f]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 border-2 border-dashed border-[#4a7c59]/30 rounded-2xl px-6 py-4" style={{ background: '#f0faf3' }}>
            <span className="text-2xl">💳</span>
            <div className="text-left">
              <div className="font-semibold text-[#1a3028] text-sm">$2.99 per watch, one-time</div>
              <div className="text-xs text-[#3d2b1f]/60">No subscription. Pay once, keep it as long as you need.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Parks we monitor */}
      <section className="max-w-6xl mx-auto px-6 mb-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-[#c84b1a] uppercase mb-3">— Coverage —</p>
          <h2 className="font-display text-4xl font-bold text-[#1a3028] mb-3">
            4,000+ campgrounds.<br/>One simple alert.
          </h2>
          <p className="text-[#3d2b1f]/50 text-sm">Any site on Recreation.gov · click a park to explore</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {parks.map(park => (
            <div key={park.name}>
              <button
                onClick={() => setExpandedPark(expandedPark === park.name ? null : park.name)}
                className={'relative overflow-hidden w-full text-left transition-all duration-200 ' +
                  (expandedPark === park.name ? 'scale-[0.98]' : 'hover:scale-[1.02]')}
                style={{
                  background: park.bg,
                  minHeight: '200px',
                  borderRadius: '12px',
                  boxShadow: expandedPark === park.name
                    ? `3px 3px 0px ${park.accent}`
                    : `5px 5px 0px rgba(0,0,0,0.25)`,
                }}
              >
                {park.illustration}

                <div className="relative z-10 px-4 pt-4 pb-0">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 60 4" className="flex-1 h-1">
                      <path d="M2,2 Q15,1 30,2 Q45,3 58,2" stroke={park.accent} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
                    </svg>
                    <span className="text-xs font-bold tracking-[0.15em] uppercase whitespace-nowrap" style={{ color: park.accent, opacity: 0.9 }}>
                      National Park
                    </span>
                    <svg viewBox="0 0 60 4" className="flex-1 h-1">
                      <path d="M2,2 Q15,1 30,2 Q45,3 58,2" stroke={park.accent} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 px-4 py-5 flex flex-col items-center text-center">
                  <svg viewBox="0 0 80 6" className="w-20 mb-3">
                    <path d="M5,3 Q20,1 40,3 Q60,5 75,3" stroke={park.accent} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                  <div className="font-display font-bold text-xl leading-tight mb-1" style={{ color: park.textColor }}>
                    {park.name}
                  </div>
                  <div className="text-xs tracking-[0.15em] uppercase" style={{ color: park.textColor, opacity: 0.55 }}>
                    {park.state}
                  </div>
                </div>

                <div className="relative z-10 px-4 pb-4">
                  <svg viewBox="0 0 160 4" className="w-full h-1 mb-2">
                    <path d="M2,2 Q40,1 80,2 Q120,3 158,2" stroke={park.accent} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                  <div className="text-center">
                    <span className="text-xs font-bold tracking-[0.12em] uppercase" style={{ color: park.accent, opacity: 0.85 }}>
                      {park.campgrounds.length} Campground{park.campgrounds.length > 1 ? 's' : ''} ↓
                    </span>
                  </div>
                </div>
              </button>

              {expandedPark === park.name && (
                <div className="mt-2 overflow-hidden" style={{
                  background: '#f5efe0',
                  borderRadius: '12px',
                  border: `2px solid ${park.bg}30`,
                  boxShadow: '3px 3px 0px rgba(0,0,0,0.1)',
                }}>
                  {park.campgrounds.map(cg => (
                    <div key={cg.id} className="flex items-center justify-between px-4 py-3.5 border-b-2 border-dashed border-[#1a3028]/10 last:border-0 hover:bg-[#ede5d5] transition-colors">
                      <span className="text-sm font-medium text-[#1a3028]">{cg.name}</span>
                      <button
                        onClick={() => openWatchModal(cg, park)}
                        className="text-xs font-bold px-3 py-1.5 ml-4 flex-shrink-0 transition-all hover:scale-105"
                        style={{
                          background: park.bg,
                          color: park.textColor,
                          borderRadius: '8px',
                          boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                        }}>
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
      <section className="mb-20" style={{ background: '#1a3d3a' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-xs font-bold tracking-widest text-[#e8a020] uppercase mb-3">— Search —</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#f5efe0] mb-3">Find your campground</h2>
          <p className="text-[#f5efe0]/50 text-sm mb-8">Enter a state code to discover campgrounds near you</p>
          <div className="flex gap-2 max-w-md mx-auto mb-6">
            <input
              className="flex-1 border-2 text-[#f5efe0] placeholder-[#f5efe0]/30 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
              style={{ background: 'rgba(245,239,224,0.1)', borderColor: 'rgba(245,239,224,0.2)' }}
              placeholder="e.g. CA, UT, WY, CO..."
              value={stateQuery}
              onChange={e => setStateQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchByState()}
            />
            <button
              onClick={searchByState}
              disabled={stateSearching}
              className="font-bold px-6 py-3 rounded-xl transition-all text-sm flex-shrink-0 hover:scale-105"
              style={{ background: '#e8a020', color: '#1a3d3a', boxShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
              {stateSearching
                ? <span className="w-4 h-4 border-2 border-[#1a3d3a]/30 border-t-[#1a3d3a] rounded-full animate-spin block"/>
                : 'Search'}
            </button>
          </div>
          {stateResults.length > 0 && (
            <div className="rounded-xl overflow-hidden text-left border-2 border-[#f5efe0]/10">
              {stateResults.map((cg) => (
                <div key={cg.FacilityID} className="flex items-center justify-between px-4 py-3.5 border-b border-dashed border-[#f5efe0]/10 last:border-0 hover:bg-white/5 transition-colors">
                  <div>
                    <div className="font-medium text-sm text-[#f5efe0]">{cg.FacilityName}</div>
                    <div className="text-xs text-[#f5efe0]/40 mt-0.5">{cg.ParentRecAreaName}</div>
                  </div>
                  <button
                    onClick={() => openWatchModal(
                      { id: cg.FacilityID, name: cg.FacilityName },
                      { name: cg.ParentRecAreaName || '', state: cg.AddressStateCode || stateQuery.toUpperCase() }
                    )}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg ml-4 flex-shrink-0 transition-all hover:scale-105"
                    style={{ background: '#e8a020', color: '#1a3d3a', boxShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>
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
        <div className="p-10" style={{
          background: '#f0faf3',
          borderRadius: '16px',
          border: '2px dashed #4a7c5940',
          boxShadow: '4px 4px 0px #4a7c5920',
        }}>
          <h2 className="font-display text-3xl font-semibold text-[#1a3028] mb-4">Ready to snag that site?</h2>
          <p className="text-[#3d2b1f]/70 mb-2 text-sm leading-relaxed">
            Sign up free, then add a watch for any campground — $2.99 per watch, one-time.
          </p>
          <p className="text-[#3d2b1f]/40 mb-8 text-xs">No subscription. No hidden fees. Just alerts.</p>
          <Link href="/auth?mode=signup" className="btn-primary text-base px-10 py-4">
            Get started →
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-[#f5efe0] rounded-2xl max-w-sm w-full p-6" style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#1a3028]">{watchModal.campgroundName}</h2>
                <p className="text-xs text-[#3d2b1f]/50">{watchModal.park} · {watchModal.state}</p>
              </div>
              <button onClick={() => setWatchModal(null)} className="text-[#3d2b1f]/30 hover:text-[#3d2b1f] text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5">×</button>
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
                <label className="label">SMS (recommended)</label>
                <input className="input" type="tel" placeholder="+1 555 000 0000" value={notifyPhone} onChange={e => setNotifyPhone(e.target.value)}/>
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" placeholder="you@email.com" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}/>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setWatchModal(null)} className="flex-1 py-3 rounded-xl border-2 border-dashed border-[#1a3028]/20 text-sm font-medium text-[#3d2b1f]/70 hover:border-[#1a3028]/40 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleWatchSubmit}
                disabled={!startDate || !endDate || (!notifyEmail && !notifyPhone)}
                className="flex-1 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50 hover:scale-[1.02]"
                style={{ background: '#1a3d3a', color: '#f5efe0', boxShadow: '3px 3px 0px rgba(0,0,0,0.2)' }}>
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
