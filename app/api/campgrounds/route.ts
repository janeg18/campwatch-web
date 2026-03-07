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
    const allResults: any[] = []
    const limit = 50
    let offset = 0
    let total = Infinity

    while (allResults.length < total) {
      let url = ''
      if (type === 'state') {
        url = `https://ridb.recreation.gov/api/v1/facilities?state=${encodeURIComponent(query.toUpperCase())}&activity=CAMPING&limit=${limit}&offset=${offset}&full=true&apikey=${apiKey}`
      } else {
        url = `https://ridb.recreation.gov/api/v1/facilities?query=${encodeURIComponent(query)}&activity=CAMPING&limit=${limit}&offset=${offset}&full=true&apikey=${apiKey}`
      }

      const res = await fetch(url, { headers: { 'accept': 'application/json' } })
      if (!res.ok) break

      const data = await res.json()
      const facilities = data.RECDATA || []
      total = data.METADATA?.RESULTS?.TOTAL_COUNT ?? facilities.length

      allResults.push(...facilities)
      offset += limit

      if (facilities.length < limit) break
      // 最多拉 500 条防止超时
      if (allResults.length >= 500) break
    }

    const results = allResults.map((f: any) => ({
      FacilityID: f.FacilityID,
      FacilityName: f.FacilityName,
      ParentRecAreaName: f.RECAREA?.[0]?.RecAreaName || f.ParentRecAreaName || '',
      AddressStateCode: f.FACILITYADDRESS?.[0]?.AddressStateCode || '',
      FacilityLatitude: f.FacilityLatitude,
      FacilityLongitude: f.FacilityLongitude,
    }))

    return NextResponse.json({ results, total: allResults.length })
  } catch (e) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
