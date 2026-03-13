import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (e: any) {
    return NextResponse.json({ error: `Webhook error: ${e.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status === 'paid') {
      const { userId, watchData } = session.metadata!
      const watch = JSON.parse(watchData)

      await supabase.from('watches').insert({
        user_id: userId,
        campground_id: watch.campground_id,
        campground_name: watch.campground_name,
        park: watch.park || '',
        state: watch.state || '',
        start_date: watch.start_date,
        end_date: watch.end_date,
        nights: watch.nights,
        notify_email: watch.notify_email || null,
        notify_phone: watch.notify_phone || null,
        active: true,
        alert_sent: false,
      })
    }
  }

  return NextResponse.json({ received: true })
}
