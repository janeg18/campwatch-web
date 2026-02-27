import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CampWatch — Never Miss a Campsite Opening',
  description: 'Get instant alerts when campsites open up at Yosemite, Zion, Grand Canyon and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
