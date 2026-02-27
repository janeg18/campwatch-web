export const CAMPGROUNDS = [
  { id:"232447", name:"Upper Pines",       park:"Yosemite NP",     state:"CA", season:"Year-round" },
  { id:"232449", name:"Lower Pines",       park:"Yosemite NP",     state:"CA", season:"Year-round" },
  { id:"232450", name:"North Pines",       park:"Yosemite NP",     state:"CA", season:"Apr–Nov" },
  { id:"232448", name:"Tuolumne Meadows",  park:"Yosemite NP",     state:"CA", season:"Jul–Sep" },
  { id:"247650", name:"Mather",            park:"Grand Canyon NP", state:"AZ", season:"Year-round" },
  { id:"231959", name:"Watchman",          park:"Zion NP",         state:"UT", season:"Year-round" },
  { id:"251869", name:"Apgar",             park:"Glacier NP",      state:"MT", season:"May–Oct" },
  { id:"232493", name:"Colter Bay",        park:"Grand Teton NP",  state:"WY", season:"May–Sep" },
  { id:"232490", name:"Jenny Lake",        park:"Grand Teton NP",  state:"WY", season:"May–Sep" },
  { id:"234038", name:"Chisos Basin",      park:"Big Bend NP",     state:"TX", season:"Year-round" },
]

export type Watch = {
  id: string
  user_id: string
  campground_id: string
  campground_name: string
  park: string
  state: string
  start_date: string
  end_date: string
  nights: number
  notify_email: string | null
  notify_phone: string | null
  active: boolean
  alert_sent: boolean
  last_checked: string | null
  last_available: string | null
  created_at: string
}
