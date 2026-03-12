export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="text-sm text-[#3d2b1f]/60 hover:text-[#1a3028] mb-8 block">← Back to CampWatch</a>
        <h1 className="font-display text-4xl font-semibold text-[#1a3028] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#3d2b1f]/50 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-[#3d2b1f]/80 leading-relaxed">
          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">1. Information We Collect</h2>
            <p>CampWatch collects the following information when you create an account or add a campsite watch:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Email address (for account creation and optional email alerts)</li>
              <li>Phone number (optional, for SMS alerts only)</li>
              <li>Campground preferences and watch settings</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">2. How We Use Your Information</h2>
            <p>We use your information solely to:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Send campsite availability alerts via SMS or email when you have an active watch</li>
              <li>Manage your account and watches</li>
              <li>Improve the CampWatch service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">3. SMS Notifications</h2>
            <p>By providing your phone number, you consent to receive SMS text message alerts from CampWatch. Message frequency varies based on campsite availability. Standard message and data rates may apply. You can opt out at any time by replying STOP to any message or by removing your phone number from your watch settings.</p>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">4. Data Sharing</h2>
            <p>We do not sell, trade, or share your personal information with third parties for marketing purposes. We use Twilio to deliver SMS messages and SendGrid to deliver email notifications. These services receive only the minimum information necessary to deliver your alerts.</p>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">5. Data Storage</h2>
            <p>Your data is stored securely using Supabase. We retain your data for as long as your account is active. You may delete your account and associated data at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="font-semibold text-[#1a3028] text-lg mb-2">6. Contact</h2>
            <p>For privacy-related questions, contact us at <a href="mailto:hello@campwatch.app" className="text-[#4a7c59] underline">hello@campwatch.app</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
