'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { phone },
          emailRedirectTo: window.location.origin + '/dashboard',
        },
      })
      if (error) setError(error.message)
      else setSuccess('Check your email to confirm your account, then sign in!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <span className="text-2xl">🏕</span>
        <span className="font-display font-semibold text-xl text-[#1a3028]">CampWatch</span>
      </Link>

      <div className="card w-full max-w-sm p-8">
        <div className="flex rounded-xl bg-[#f5f0e8] p-1 mb-8">
          <button
            onClick={() => setMode('signin')}
            className={'flex-1 py-2 text-sm font-semibold rounded-lg transition-all ' + (mode === 'signin' ? 'bg-white text-[#1a3028] shadow-sm' : 'text-[#3d2b1f]/50 hover:text-[#1a3028]')}>
            Sign in
          </button>
          <button
            onClick={() => setMode('signup')}
            className={'flex-1 py-2 text-sm font-semibold rounded-lg transition-all ' + (mode === 'signup' ? 'bg-white text-[#1a3028] shadow-sm' : 'text-[#3d2b1f]/50 hover:text-[#1a3028]')}>
            Sign up
          </button>
        </div>

        <h1 className="font-display text-2xl font-semibold text-[#1a3028] mb-1">
          {mode === 'signin' ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="text-sm text-[#3d2b1f]/60 mb-6">
          {mode === 'signin' ? 'Sign in to manage your campsite watches' : 'Start monitoring campsites for free'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password"
              placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {mode === 'signup' && (
            <div>
              <label className="label">Phone (for SMS alerts)</label>
              <input className="input" type="tel" placeholder="+1 555 000 0000"
                value={phone} onChange={e => setPhone(e.target.value)} />
              <p className="text-xs text-[#3d2b1f]/40 mt-1">Optional</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
              {success}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3">
            {loading
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </div>

      <p className="text-sm text-[#3d2b1f]/50 mt-6">
        {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="text-[#4a7c59] font-medium hover:underline">
          {mode === 'signin' ? 'Sign up free' : 'Sign in'}
        </button>
      </p>
    </div>
  )
}
