import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  const type = searchParams.get('type') || 'name'

  const apiKey = process.env.RIDB_API_KEY
  if (!apiKey || apiKey === 'placeholder') {
    return NextResponse.json({ error: 'RIDB API key not configured' }, { status: 500 })
  }

  try {
    let url = ''
    if (type === 'state') {
      url = `https://ridb.recreation.gov/api/v1/facilities?state=${encodeURIComponent(query)}&activity=CAMPING&limit=20&apikey=${apiKey}`
    } else if (type === 'city') {
      url = `https://ridb.recreation.gov/api/v1/facilities?query=${encodeURIComponent(query)}&activity=CAMPING&limit=20&apikey=${apiKey}`
    } else {
      url = `https://ridb.recreation.gov/api/v1/facilities?query=${encodeURIComponent(query)}&activity=CAMPING&limit=20&apikey=${apiKey}`
    }

    const res = await fetch(url, {
      headers: { 'accept': 'application/json' }
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'RIDB API error' }, { status: res.status })
    }

    const data = await res.json()
    const facilities = data.RECDATA || []

    const results = facilities
      .filter((f: any) => f.FacilityTypeDescription === 'Campground')
      .map((f: any) => ({
        FacilityID: f.FacilityID,
        FacilityName: f.FacilityName,
        ParentRecAreaName: f.RECAREA?.[0]?.RecAreaName || '',
        AddressStateCode: f.FACILITYADDRESS?.[0]?.AddressStateCode || '',
        FacilityLatitude: f.FacilityLatitude,
        FacilityLongitude: f.FacilityLongitude,
      }))

    return NextResponse.json({ results })
  } catch (e) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
