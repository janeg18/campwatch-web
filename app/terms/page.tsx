export default function Terms() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="text-sm text-[#3d2b1f]/60 hover:text-[#1a3028] mb-8 block">← Back to CampWatch</a>
        <h1 className="font-display text-4xl font-semibold text-[#1a3028] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#3d2b1f]/50 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-[#3d2b1f]/80 leading-relaxed">
          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">1. Service Description</h2>
            <p>CampWatch is a campsite availability monitoring service. We check Recreation.gov for campsite availability and notify users via SMS or email when sites become available at their watched campgrounds.</p>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">2. SMS Alerts</h2>
            <p>By adding your phone number to a watch, you agree to receive SMS notifications from CampWatch. Message frequency varies based on campsite availability — typically one message per campground when availability is detected.</p>
            <p className="mt-2">Message and data rates may apply. To opt out, reply <strong>STOP</strong> to any message. For help, reply <strong>HELP</strong> or contact us at hello@campwatch.app.</p>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">3. No Guarantee of Availability</h2>
            <p>CampWatch monitors availability but does not guarantee that campsites will be available when you attempt to book. Availability can change rapidly and we are not responsible if a site is no longer available by the time you visit Recreation.gov.</p>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">4. Account Responsibility</h2>
            <p>You are responsible for maintaining the security of your account. Please ensure your contact information is accurate to receive timely notifications.</p>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">5. Limitation of Liability</h2>
            <p>CampWatch is provided "as is" without warranties of any kind. We are not liable for missed notifications, service interruptions, or any damages arising from use of the service.</p>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">6. Contact</h2>
            <p>For questions, contact us at <a href="mailto:hello@campwatch.app" className="text-[#4a7c59] underline">hello@campwatch.app</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
