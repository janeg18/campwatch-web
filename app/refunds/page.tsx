import Link from 'next/link'

export default function Refunds() {
  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🏕</span>
          <span className="font-display font-semibold text-lg text-[#1a3028]">CampWatch</span>
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-[#1a3028] mb-2">Refund Policy</h1>
        <p className="text-sm text-[#3d2b1f]/50 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-sm text-[#3d2b1f]/80 leading-relaxed">

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">Our policy</h2>
            <p>The $2.99 fee covers the campsite monitoring service, which begins immediately after payment. Because the service starts right away, all purchases are generally non-refundable.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">Exceptions</h2>
            <p>We will issue a full refund in the following situations:</p>
            <ul className="mt-2 space-y-2 list-disc list-inside text-[#3d2b1f]/70">
              <li>You were charged twice for the same watch due to a technical error</li>
              <li>Your watch was never activated due to a bug on our end</li>
              <li>You contact us within 24 hours of purchase and no notifications have been sent yet</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">What we don't refund</h2>
            <ul className="mt-2 space-y-2 list-disc list-inside text-[#3d2b1f]/70">
              <li>You received a notification but the campsite was already taken by the time you tried to book — this is beyond our control</li>
              <li>You changed your mind about the dates or campground after purchase</li>
              <li>The campground you selected had no availability during your watch period</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">How to request a refund</h2>
            <p>Email us at <a href="mailto:hello@campwatch.app" className="text-[#4a7c59] underline">hello@campwatch.app</a> with your account email and a brief description of the issue. We aim to respond within 1 business day.</p>
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
