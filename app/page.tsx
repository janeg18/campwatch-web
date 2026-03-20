'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const parks = [
  {
    name: 'Yosemite', emoji: '🏔', state: 'CA',
    bg: 'linear-gradient(160deg, #2d5a3d 0%, #1a3828 100%)',
    banner: 'rgba(0,0,0,0.3)', bannerText: '#c8e6c9', textColor: '#e8f5e9',
    campgrounds: [
      { id: '232447', name: 'Upper Pines' },
      { id: '232450', name: 'Lower Pines' },
      { id: '232449', name: 'North Pines' },
      { id: '232448', name: 'Camp 4' },
    ]
  },
  {
    name: 'Zion', emoji: '🌄', state: 'UT',
    bg: 'linear-gradient(160deg, #8b3a2a 0%, #5c2218 100%)',
    banner: 'rgba(0,0,0,0.25)', bannerText: '#ffccbc', textColor: '#fff3e0',
    campgrounds: [
      { id: '232054', name: 'Watchman Campground' },
      { id: '232055', name: 'South Campground' },
    ]
  },
  {
    name: 'Grand Canyon', emoji: '🪨', state: 'AZ',
    bg: 'linear-gradient(160deg, #b5651d 0%, #7c3c0e 100%)',
    banner: 'rgba(0,0,0,0.25)', bannerText: '#ffe0b2', textColor: '#fff8f0',
    campgrounds: [
      { id: '232489', name: 'Mather Campground' },
    ]
  },
  {
    name: 'Grand Teton', emoji: '⛰', state: 'WY',
    bg: 'linear-gradient(160deg, #1a3a5c 0%, #0d2137 100%)',
    banner: 'rgba(0,0,0,0.3)', bannerText: '#b3d1f0', textColor: '#e3f0ff',
    campgrounds: [
      { id: '232493', name: 'Colter Bay Campground' },
      { id: '232494', name: 'Signal Mountain Campground' },
    ]
  },
  {
    name: 'Glacier', emoji: '🧊', state: 'MT',
    bg: 'linear-gradient(160deg, #2c5f6e 0%, #173845 100%)',
    banner: 'rgba(0,0,0,0.25)', bannerText: '#b2ebf2', textColor: '#e0f7fa',
    campgrounds: [
      { id: '232493', name: 'Apgar Campground' },
    ]
  },
  {
    name: 'Big Bend', emoji: '🌵', state: 'TX',
    bg: 'linear-gradient(160deg, #7a6520 0%, #4a3d10 100%)',
    banner: 'rgba(0,0,0,0.25)', bannerText: '#fff9c4', textColor: '#fffde7',
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
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 ro
