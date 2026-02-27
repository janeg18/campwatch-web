'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { Watch } from '@/lib/campgrounds'

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClient()
  const [watches, setWatches] = useState<Watch[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/auth'); return }
      setUser(data.user)
      loadWatches(data.user.id)
    })
  }, [])

  async function loadWatches(userId: string) {
    const { data } = await supabase
      .from('watches')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    setWatches(data || [])
    setLoading(false)
  }

  async function toggleWatch(id: string, active: boolean) {
    await supabase.from('watches').update({ active: !active }).eq('id', id)
    setWatches(w => w.map(x => x.id === id ? { ...x, active: !active } : x))
  }

  async function deleteWatch(id: string) {
    await supabase.from('watches').delete().eq('id', id)
    setWatches(w => w.filter(x => x.id !== id))
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const activeCount = watches.filter(w => w.active).length
  const alertCount = watches.filter(w => w.last_available).length

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-[#f5f0e8]/80 backdrop-blur border-b border-[#ede5d5]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg">🏕</span>
            <span className="font-display font-semibold text-[#1a3028]">CampWatch</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#3d2b1f]/50 hidden sm:block">{user?.email}</span>
            <button onClick={signOut} className="text-sm text-[#3d2b1f]/60 hover:text-[#1a3028] transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold text-[#1a3028] mb-1">My Watches</h1>
            <p className="text-sm text-[#3d2b1f]/60">{activeCount} active · scanning every 5 minutes</p>
          </div>
          <Link href="/dashboard/add" className="btn-primary flex items-center gap-2">
            <span>+</span> Add watch
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active watches', value: activeCount, icon: '👁' },
            { label: 'Sites found', value: alertCount, icon: '🎉' },
            { label: 'Parks covered', value: new Set(watches.map(w => w.park)).size, icon: '🗺' },
          ].map(stat => (
            <div key={stat.label} className="card p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display text-2xl font-bold text-[#1a3028]">{stat.value}</div>
              <div className="text-xs text-[#3d2b1f]/50 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#3d2b1f]/40">Loading...</div>
        ) : watches.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-5xl mb-4">🏕</div>
            <h2 className="font-display text-xl font-semibold text-[#1a3028] mb-2">No watches yet</h2>
            <p className="text-sm text-[#3d2b1f]/60 mb-6 max-w-xs mx-auto">
              Add a campground watch and we'll text you the moment a site opens up.
            </p>
            <Link href="/dashboard/add" className="btn-primary">Add your first watch</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {watches.map(watch => (
              <WatchCard key={watch.id} watch={watch} onToggle={toggleWatch} onDelete={deleteWatch} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function WatchCard({ watch, onToggle, onDelete }: {
  watch: Watch
  onToggle: (id: string, active: boolean) => void
  onDelete: (id: string) => void
}) {
  const [confirming, setConfirming] = useState(false)
  const hasAlert = !!watch.last_available
  const bookingUrl = `https://www.recreation.gov/camping/campgrounds/${watch.campground_id}/availability?start_date=${watch.start_date}`

  return (
    <div className={`card p-5 transition-all ${!watch.active ? 'opacity-60' : ''} ${hasAlert ? 'border-[#4a7c59] bg-[#f0faf3]' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
          hasAlert ? 'bg-[#4a7c59] shadow-[0_0_6px_#4a7c59]' :
          watch.active ? 'bg-[#7fb
