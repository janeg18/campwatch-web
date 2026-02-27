'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { CAMPGROUNDS } from '@/lib/campgrounds'

export default function AddWatch() {
  const router = useRouter()
  const supabase = createClient()

  const [campgroundId, setCampgroundId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nights, setNights] = useState(2)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyPhone, setNotifyPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const selected = CAMPGROUNDS.find(c => c.id === campgroundId)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!campgroundId) { setError('Please select a campground'); return }
    if (!startDate || !endDate) { setError('Please select dates'); return }
    if (endDate <= startDate) { setError('Check-out must be after check-in'); return }
    if (!notifyEmail && !notifyPhone) { setError('Add at least one notification method'); return }

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    const { error: err } = await supabase.from('watches').insert({
      user_id: user.id,
      campground_id: campgroundId,
      campground_name: selected!.name,
      park: selected!.park,
      state: selected!.state,
      start_date: startDate,
      end_date: endDate,
      nights,
      notify_email: notifyEmail || null,
      notify_phone: notifyPhone || null,
      active: true,
      alert_sent: false,
    })

    if (err) { setError(err.message); setLoading(false); return }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-[#f5f0e8]/80 backdrop-blur border-b border-[#ede5d5]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-[#3d2b1f]/60 hover:text-[#1a3028] transition-colors">
            ← Back
          </Link>
          <span className="font-display font-semibold text-[#1a3028]">Add Watch</span>
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-[#1a3028] mb-2">Add a watch</h1>
          <p className="text-sm text-[#3d2b1f]/60">We'll alert you the moment a site opens up.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Campground</label>
            <select className="input" value={campgroundId}
              onChange={e => setCampgroundId(e.target.value)} required>
              <option value="">Select a campground...</option>
              {Object.entries(
                CAMPGROUNDS.reduce((acc, cg) => {
                  if (!acc[cg.park]) acc[cg.park] = []
                  acc[cg.park].push(cg)
                  return acc
                }, {} as Record<string, typeof CAMPGROUNDS>)
              ).map(([park, camps]) => (
                <optgroup key={park} label={park}>
                  {camps.map(cg => (
                    <option key={cg.id} value={cg.id}>{cg.name} — {cg.season}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            {selected && (
              <p className="text-xs text-[#4a7c59] mt-1.5">
                🌲 {selected.park}, {selected.state} · Open season: {selected.season}
              </p>
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
