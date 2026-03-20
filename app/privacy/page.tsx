import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🏕</span>
          <span className="font-display font-semibold text-lg text-[#1a3028]">CampWatch</span>
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-[#1a3028] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#3d2b1f]/50 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-sm text-[#3d2b1f]/80 leading-relaxed">

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">1. What we collect</h2>
            <p>We collect only what's necessary to provide the service:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-[#3d2b1f]/70">
              <li>Email address (for account and notifications)</li>
              <li>Phone number (optional, for SMS alerts)</li>
              <li>Watch preferences (campground, dates, nights)</li>
              <li>Payment information (processed by Stripe — we never see your card details)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">2. How we use it</h2>
            <p>Your information is used solely to operate CampWatch — to send you availability alerts, process payments, and manage your account. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">3. Third-party services</h2>
            <p>We use the following third-party services to operate CampWatch:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-[#3d2b1f]/70">
              <li><strong>Supabase</strong> — database and authentication</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Twilio</strong> — SMS notifications (if you provide a phone number)</li>
            </ul>
            <p className="mt-3">Each of these services has their own privacy policy governing how they handle your data.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">4. Data retention</h2>
            <p>We retain your account data for as long as your account is active. You can delete your account and all associated data at any time by contacting us at <a href="mailto:hello@campwatch.app" className="text-[#4a7c59] underline">hello@campwatch.app</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">5. Security</h2>
            <p>We use industry-standard security practices to protect your data, including encrypted connections (HTTPS) and secure authentication via Supabase. We never store payment card information.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">6. Your rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:hello@campwatch.app" className="text-[#4a7c59] underline">hello@campwatch.app</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">7. Contact</h2>
            <p>Questions about privacy? Email us at <a href="mailto:hello@campwatch.app" className="text-[#4a7c59] underline">hello@campwatch.app</a></p>
          </section>

        </div>
      </main>

      <footer className="border-t border-[#ede5d5] py-8 mt-20">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-sm text-[#3d2b1f]/50">
          <Link href="/" className="flex items-center gap-2">
            <span>🏕</span>
            <span className="font-display">CampWatch</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-[#1a3028]">Terms</Link>
            <Link href="/privacy" className="hover:text-[#1a3028]">Privacy</Link>
            <Link href="/refunds" className="hover:text-[#1a3028]">Refunds</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
