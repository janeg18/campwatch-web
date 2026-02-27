'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [mode, setMode] = useState<'signin' | 'signup'>(
    params.get('mode') === 'signup' ? 'signup' : 'signin'
  )
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
          emailRedirectTo: `${window.location.origin}/dashboard`,
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
          {(['signin', 'signup'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === m
                  ? 'bg-white text-[#1a3028] shadow-sm'
                  : 'text-[#3d2b1f]/50 hover:text-[#1a3028]'
              }`}
            >
              {m === 'signin' ? 'Sign in' : 'Sign up'}
            </button>
          ))}
        </div>

        <h1 className="font-display text-2xl font-semibold text-[#1a3028] mb-1">
          {mode === 'signin' ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="text-sm text-[#3d2b1f]/60 mb-6">
          {mode === 'signin'
            ? 'Sign in to manage your campsite watches'
            : 'Start monitoring campsites for free'}
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
              <p className="text-xs text-[#3d2b1f]/40 mt-1">Optional — add later in settings</p>
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
          <button type="sub
