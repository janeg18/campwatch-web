import Link from 'next/link'

const parks = [
  { name: 'Yosemite', sites: 4, emoji: '🏔' },
  { name: 'Zion', sites: 2, emoji: '🌄' },
  { name: 'Grand Canyon', sites: 1, emoji: '🪨' },
  { name: 'Grand Teton', sites: 2, emoji: '⛰' },
  { name: 'Glacier', sites: 1, emoji: '🧊' },
  { name: 'Big Bend', sites: 1, emoji: '🌵' },
]

export default function Home() {
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
            Get started free
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
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7fb98a] animate-pulse" />
            Scanning 100+ campgrounds every 5 minutes
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Stop refreshing.<br />
            <span style={{ color: '#7fb98a' }}>Start camping.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            CampWatch monitors Recreation.gov and texts you the moment a campsite opens up —
            so you can book before anyone else.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/auth?mode=signup"
              className="inline-flex items-center justify-center gap-2 bg-[#7fb98a] text-[#1a3028] font-bold px-8 py-4 rounded-xl hover:bg-[#8fcb9b] transition-all text-base">
              Start watching for free →
            </Link>
            <Link href="/auth"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-base">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="font-display text-3xl font-semibold text-center text-[#1a3028] mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', icon: '🔍', title: 'Pick a campground', desc: 'Choose any campground and set your ideal dates and how many nights you need.' },
            { step: '02', icon: '⚡', title: 'We watch 24/7', desc: 'Our scanner checks Recreation.gov every 5 minutes for cancellations and new openings.' },
            { step: '03', icon: '📱', title: 'Get instant alerts', desc: 'The moment a site opens up, we text and email you so you can book immediately.' },
          ].map(item => (
            <div key={item.step} className="card p-6">
              <div className="text-3xl mb-4">{item.icon}</div>
              <div className="text-xs font-bold text-[#4a7c59] mb-2 tracking-widest">{item.step}</div>
              <h3 className="font-display text-lg font-semibold text-[#1a3028] mb-2">{item.title}</h3>
              <p className="text-sm text-[#3d2b1f]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parks grid */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="font-display text-3xl font-semibold text-center text-[#1a3028] mb-4">
          Parks we monitor
        </h2>
        <p className="text-center text-[#3d2b1f]/60 mb-10 text-sm">More parks added regularly</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {parks.map(park => (
            <div key={park.name} className="card p-5 flex items-center gap-4">
              <span className="text-3xl">{park.emoji}</span>
              <div>
                <div className="font-semibold text-[#1a3028] text-sm">{park.name}</div>
                <div className="text-xs text-[#3d2b1f]/50">{park.sites} campground{park.sites > 1 ? 's' : ''}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 mb-20 text-center">
        <div className="card p-10" style={{ background: 'var(--sky)' }}>
          <h2 className="font-display text-3xl font-semibold text-[#1a3028] mb-4">
            Ready to snag that site?
          </h2>
          <p className="text-[#3d2b1f]/70 mb-8 text-sm leading-relaxed">
            Free to use. No credit card. Just sign up and add a watch.
          </p>
          <Link href="/auth?mode=signup" className="btn-primary text-base px-10 py-4">
            Create free account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ede5d5] py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-[#3d2b1f]/50">
          <div className="flex items-center gap-2">
            <span>🏕</span>
            <span className="font-display">CampWatch</span>
          </div>
          <div>Built with ♥ for campers</div>
        </div>
      </footer>

    </div>
  )
}
