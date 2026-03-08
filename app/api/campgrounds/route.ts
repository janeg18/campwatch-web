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

    if (type === 'state') {
      // 按州搜索，分页拉完所有营地
      let offset = 0
      let total = Infinity
      while (allResults.length < total) {
        const url = `https://ridb.recreation.gov/api/v1/facilities?state=${encodeURIComponent(query.toUpperCase())}&activity=CAMPING&limit=${limit}&offset=${offset}&full=true&apikey=${apiKey}`
        const res = await fetch(url, { headers: { 'accept': 'application/json' } })
        if (!res.ok) break
        const data = await res.json()
        const facilities = data.RECDATA || []
        total = data.METADATA?.RESULTS?.TOTAL_COUNT ?? facilities.length
        allResults.push(...facilities)
        offset += limit
        if (facilities.length < limit || allResults.length >= 500) break
      }
    } else {
      // 第一步：搜营地名字本身
      const facilityUrl = `https://ridb.recreation.gov/api/v1/facilities?query=${encodeURIComponent(query)}&activity=CAMPING&limit=${limit}&offset=0&full=true&apikey=${apiKey}`
      const facilityRes = await fetch(facilityUrl, { headers: { 'accept': 'application/json' } })
      if (facilityRes.ok) {
        const facilityData = await facilityRes.json()
        allResults.push(...(facilityData.RECDATA || []))
      }

      // 第二步：搜 Recreation Area 名字，再拉该区域下所有营地
      const recAreaUrl = `https://ridb.recreation.gov/api/v1/recareas?query=${encodeURIComponent(query)}&limit=5&apikey=${apiKey}`
      const recAreaRes = await fetch(recAreaUrl, { headers: { 'accept': 'application/json' } })
      if (recAreaRes.ok) {
        const recAreaData = await recAreaRes.json()
        const recAreas = recAreaData.RECDATA || []

        // 对每个匹配的 Recreation Area，拉它下面的所有营地
        await Promise.all(recAreas.slice(0, 3).map(async (area: any) => {
          let offset = 0
          while (true) {
            const url = `https://ridb.recreation.gov/api/v1/recareas/${area.RecAreaID}/facilities?activity=CAMPING&limit=${limit}&offset=${offset}&full=true&apikey=${apiKey}`
            const res = await fetch(url, { headers: { 'accept': 'application/json' } })
            if (!res.ok) break
            const data = await res.json()
            const facilities = data.RECDATA || []
            allResults.push(...facilities)
            offset += limit
            if (facilities.length < limit) break
          }
        }))
      }
    }

    // 去重
    const seen = new Set<string>()
    const results = allResults
      .filter((f: any) => {
        if (seen.has(f.FacilityID)) return false
        seen.add(f.FacilityID)
        return true
      })
      .map((f: any) => ({
        FacilityID: f.FacilityID,
        FacilityName: f.FacilityName,
        ParentRecAreaName: f.RECAREA?.[0]?.RecAreaName || f.ParentRecAreaName || '',
        AddressStateCode: f.FACILITYADDRESS?.[0]?.AddressStateCode || '',
        FacilityLatitude: f.FacilityLatitude,
        FacilityLongitude: f.FacilityLongitude,
      }))

    return NextResponse.json({ results, total: results.length })
  } catch (e) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
