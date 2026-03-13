import React, { useState, useEffect } from 'react'
import { getLeads, getLeadsByDay, getStatusBreakdown, getLeadsByCity } from '../data/mockLeads'

const statusColorMap = {
  'New': '#3b82f6',
  'Called': '#f59e0b',
  'Converted': '#22c55e',
  'Not Interested': '#a3a3a3',
}

function WeeklyBarChart({ data }) {
  const max = Math.max(...data.map(d => d.count), 1)
  return (
    <div className="flex items-end justify-between gap-2 md:gap-3 h-36 md:h-48">
      {data.map(d => (
        <div key={d.date} className="flex flex-col items-center flex-1 gap-1.5 md:gap-2">
          <span className="text-night-900 text-[10px] md:text-xs font-bold">{d.count}</span>
          <div className="w-full bg-night-100 rounded-lg overflow-hidden relative" style={{ height: '120px' }}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-night-900 rounded-lg transition-all duration-700"
              style={{ height: `${Math.max((d.count / max) * 100, 4)}%` }}
            />
          </div>
          <span className="text-[8px] md:text-[10px] text-night-400 font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Analytics() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLeads(getLeads())
      setLoading(false)
    }, 400)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-3 border-night-200 border-t-night-900 rounded-full animate-spin" />
      </div>
    )
  }

  const dailyData = getLeadsByDay(leads)
  const statusData = getStatusBreakdown(leads)
  const cityData = getLeadsByCity(leads)

  return (
    <div className="space-y-4 md:space-y-6 max-w-[1400px]">
      {/* Weekly Bar Chart */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-night-100 opacity-0" style={{ animation: 'fadeUp 0.5s 0.1s ease-out forwards' }}>
        <p className="text-xs font-bold text-night-400 uppercase tracking-wider mb-1">Weekly Trend</p>
        <p className="text-night-900 font-black text-base md:text-lg mb-4 md:mb-6">Leads per Day — Last 7 Days</p>
        <WeeklyBarChart data={dailyData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Status Breakdown */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-night-100 opacity-0" style={{ animation: 'fadeUp 0.5s 0.25s ease-out forwards' }}>
          <p className="text-xs font-bold text-night-400 uppercase tracking-wider mb-1">Lead Funnel</p>
          <p className="text-night-900 font-black text-base md:text-lg mb-4 md:mb-6">Status Breakdown</p>
          <div className="space-y-4 md:space-y-5">
            {statusData.map(s => (
              <div key={s.status}>
                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: statusColorMap[s.status] }} />
                    <span className="text-xs md:text-sm font-semibold text-night-700">{s.status}</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-night-400 text-[10px] md:text-xs">{s.count} leads</span>
                    <span className="text-night-900 text-xs md:text-sm font-bold w-8 md:w-10 text-right">{s.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 md:h-2.5 bg-night-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${s.percentage}%`, background: statusColorMap[s.status] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City Performance */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-night-100 opacity-0" style={{ animation: 'fadeUp 0.5s 0.35s ease-out forwards' }}>
          <p className="text-xs font-bold text-night-400 uppercase tracking-wider mb-1">Regional</p>
          <p className="text-night-900 font-black text-base md:text-lg mb-4 md:mb-6">City Performance</p>
          <div className="space-y-3 md:space-y-4">
            {cityData.map(c => (
              <div key={c.city} className="bg-night-50/50 rounded-xl p-3 md:p-4 border border-night-100/50">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h4 className="text-night-900 font-bold text-sm">{c.city}</h4>
                  <span className="text-night-400 text-[10px] md:text-xs font-medium">{c.rate}% conversion</span>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-3 mb-2 md:mb-3">
                  <div>
                    <p className="text-night-900 font-black text-base md:text-lg leading-none">{c.total}</p>
                    <p className="text-night-400 text-[9px] md:text-[10px] mt-0.5">Total Leads</p>
                  </div>
                  <div>
                    <p className="text-green-600 font-black text-base md:text-lg leading-none">{c.converted}</p>
                    <p className="text-night-400 text-[9px] md:text-[10px] mt-0.5">Converted</p>
                  </div>
                  <div>
                    <p className="text-night-500 font-black text-base md:text-lg leading-none">{c.total - c.converted}</p>
                    <p className="text-night-400 text-[9px] md:text-[10px] mt-0.5">Pending</p>
                  </div>
                </div>
                <div className="h-1.5 md:h-2 bg-night-100 rounded-full overflow-hidden">
                  <div className="h-full bg-night-900 rounded-full transition-all duration-700" style={{ width: `${c.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
