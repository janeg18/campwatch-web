import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🏕</span>
          <span className="font-display font-semibold text-lg text-[#1a3028]">CampWatch</span>
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-[#1a3028] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#3d2b1f]/50 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-sm text-[#3d2b1f]/80 leading-relaxed">

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">1. What CampWatch is</h2>
            <p>CampWatch is a campsite availability monitoring service. We scan Recreation.gov on your behalf and notify you when a campsite matching your criteria becomes available. CampWatch is not affiliated with Recreation.gov, the National Park Service, or any government agency.</p>
            <p className="mt-3">We do not book campsites on your behalf. When you receive a notification, you must visit Recreation.gov yourself to complete the reservation. We do not guarantee that a site will still be available by the time you attempt to book.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">2. The service fee</h2>
            <p>Each "watch" costs a one-time fee of $2.99 USD. This fee covers the monitoring service for one campground, for the date range you specify. It is not a deposit or payment toward a campsite reservation.</p>
            <p className="mt-3">Payment is processed securely by Stripe. CampWatch does not store your payment information.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">3. No guarantee of availability</h2>
            <p>Campsite availability changes rapidly. While we scan Recreation.gov every minute, we cannot guarantee that a site will be available when you attempt to book after receiving a notification. The $2.99 fee covers the monitoring service itself, not a guaranteed reservation.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">4. Refunds</h2>
            <p>Because the monitoring service begins immediately upon payment, all sales are generally final. See our <Link href="/refunds" className="text-[#4a7c59] underline">Refund Policy</Link> for details on exceptions.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">5. Service availability</h2>
            <p>We strive to keep CampWatch running 24/7, but we do not guarantee uninterrupted service. We are not liable for missed notifications due to downtime, technical issues, or changes to the Recreation.gov platform.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">6. Your account</h2>
            <p>You are responsible for maintaining the security of your account. You must provide accurate contact information (email and/or phone number) to receive notifications. We are not responsible for missed alerts due to incorrect contact details.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">7. Prohibited use</h2>
            <p>You may not use CampWatch to resell campsite reservations or engage in any activity that violates Recreation.gov's terms of service. We reserve the right to suspend accounts that abuse the service.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">8. Changes to these terms</h2>
            <p>We may update these terms from time to time. Continued use of CampWatch after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-[#1a3028] mb-3">9. Contact</h2>
            <p>Questions? Email us at <a href="mailto:hello@campwatch.app" className="text-[#4a7c59] underline">hello@campwatch.app</a></p>
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
