import React, { useState, useEffect, useRef } from 'react'
import { Users, UserPlus, TrendingUp, Target, ArrowUpRight, ArrowDownRight, Flame, Clock } from 'lucide-react'
import { getLeads, getStatsForDashboard, getLeadsByDay, getLeadsByType, getLeadsByCity } from '../data/mockLeads'

// ── Animated Counter ───────────────────────────────────────
function useCountUp(target, duration = 1000, delay = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let timeout
    let start
    let frame
    const isPercent = typeof target === 'string' && target.includes('%')
    const numeric = parseFloat(target)

    timeout = setTimeout(() => {
      start = performance.now()
      const tick = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * numeric))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)

    return () => { clearTimeout(timeout); cancelAnimationFrame(frame) }
  }, [target, duration, delay])

  const numeric = parseFloat(target)
  const isPercent = typeof target === 'string' && target.includes('%')
  return isPercent ? `${value}%` : value
}

// ── Sparkline Area Chart (mini, in stat card) ──────────────
function Sparkline({ data, color = '#171717' }) {
  const max = Math.max(...data, 1)
  const w = 100
  const h = 28
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (v / max) * (h - 4),
  }))
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${color.replace('#', '')})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Main Area Chart ────────────────────────────────────────
function AreaChart({ data }) {
  const max = Math.max(...data.map(d => d.count), 1)
  const w = 100
  const h = 48
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (d.count / max) * (h - 8),
  }))
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h + 4}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#171717" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#171717" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)" />
      <path d={line} fill="none" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill="white" stroke="#171717" strokeWidth="1.2" />
      ))}
    </svg>
  )
}

// ── Trend Bar Chart (NEW) ──────────────────────────────────
function TrendBarChart({ data }) {
  const max = Math.max(...data.map(d => d.count), 1)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex items-end gap-1.5 h-28 w-full">
      {data.map((d, i) => {
        const pct = (d.count / max) * 100
        const isToday = i === data.length - 1
        return (
          <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
            <span className="text-[8px] font-bold text-night-400">{d.count > 0 ? d.count : ''}</span>
            <div className="w-full rounded-t-lg overflow-hidden" style={{ height: '80px', display: 'flex', alignItems: 'flex-end' }}>
              <div
                className={`w-full rounded-t-lg transition-all duration-700 ${isToday ? 'bg-night-900' : 'bg-night-200 hover:bg-night-400'}`}
                style={{
                  height: animated ? `${Math.max(pct, 4)}%` : '0%',
                  transitionDelay: `${i * 60}ms`,
                }}
              />
            </div>
            <span className={`text-[8px] font-semibold ${isToday ? 'text-night-900' : 'text-night-400'}`}>{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Donut Chart ────────────────────────────────────────────
function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1
  const colors = ['#171717', '#404040', '#737373', '#d4d4d4']
  let cumulative = 0
  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto">
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        {data.map((d, i) => {
          const pct = (d.count / total) * 100
          const offset = cumulative
          cumulative += pct
          return (
            <circle key={i} cx="18" cy="18" r="14" fill="none"
              stroke={colors[i]} strokeWidth="4"
              strokeDasharray={`${pct} ${100 - pct}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xl sm:text-2xl font-black text-night-900">{total}</p>
        <p className="text-[10px] text-night-400 font-medium">Total</p>
      </div>
    </div>
  )
}

// ── Horizontal Bar Chart ───────────────────────────────────
function HorizontalBarChart({ data }) {
  const max = Math.max(...data.map(d => d.total), 1)
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-3">
      {data.slice(0, 6).map((d, i) => (
        <div key={d.city}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-night-700">{d.city}</span>
            <span className="text-night-400">{d.total} leads · <span className="text-green-600 font-bold">{d.converted} conv.</span></span>
          </div>
          <div className="h-2 bg-night-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-night-900 rounded-full transition-all duration-700 ease-out"
              style={{
                width: animated ? `${(d.total / max) * 100}%` : '0%',
                transitionDelay: `${i * 80}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Stat Card ──────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, sub, trend, dark, delay, sparkData }) {
  const displayed = useCountUp(value, 900, delay)
  const isUp = trend >= 0

  return (
    <div
      className={`${dark ? 'bg-night-900 text-white' : 'bg-white text-night-900'} rounded-2xl p-4 md:p-5 border border-night-100 opacity-0 overflow-hidden relative`}
      style={{ animation: `fadeUp 0.5s ${delay / 1000}s ease-out forwards` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center ${dark ? 'bg-white/10' : 'bg-night-50'}`}>
          <Icon className={`w-4 h-4 md:w-5 md:h-5 ${dark ? 'text-white' : 'text-night-600'}`} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <p className={`text-2xl md:text-3xl font-black leading-none tracking-tight ${dark ? 'text-white' : 'text-night-900'}`}>
        {displayed}
      </p>
      <p className={`text-[10px] md:text-xs mt-1.5 font-semibold uppercase tracking-wide ${dark ? 'text-white/50' : 'text-night-400'}`}>{label}</p>
      <p className={`text-[9px] md:text-[10px] mt-0.5 ${dark ? 'text-white/30' : 'text-night-300'}`}>{sub}</p>

      {sparkData && (
        <div className="h-8 mt-3 opacity-60">
          <Sparkline data={sparkData} color={dark ? '#ffffff' : '#171717'} />
        </div>
      )}
    </div>
  )
}

// ── Status config ──────────────────────────────────────────
const statusColors = {
  'New': 'bg-blue-100 text-blue-700',
  'Called': 'bg-amber-100 text-amber-700',
  'Converted': 'bg-green-100 text-green-700',
  'Not Interested': 'bg-night-100 text-night-500',
}

// ── Overview Page ──────────────────────────────────────────
export default function Overview() {
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
        <div className="w-8 h-8 border-[3px] border-night-200 border-t-night-900 rounded-full animate-spin" />
      </div>
    )
  }

  const stats = getStatsForDashboard(leads)
  const dailyData = getLeadsByDay(leads)
  const typeData = getLeadsByType(leads)
  const cityData = getLeadsByCity(leads)
  const recentLeads = [...leads].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
  const sparkCounts = dailyData.map(d => d.count)

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, sub: 'All time', dark: true, trend: 18, sparkData: sparkCounts },
    { label: "Today's Leads", value: stats.today, icon: Flame, sub: 'Since midnight', trend: 12, sparkData: sparkCounts },
    { label: 'This Week', value: stats.thisWeek, icon: TrendingUp, sub: 'Last 7 days', trend: -4, sparkData: sparkCounts },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: Target, sub: 'Overall', trend: 8 },
  ]

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="space-y-4 md:space-y-5 max-w-[1400px]">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {statCards.map((card, i) => (
            <StatCard key={card.label} {...card} delay={100 + i * 80} />
          ))}
        </div>

        {/* Trend Bar Chart — NEW full width */}
        <div
          className="bg-white rounded-2xl p-4 md:p-6 border border-night-100 opacity-0"
          style={{ animation: 'fadeUp 0.5s 0.45s ease-out forwards' }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-bold text-night-400 uppercase tracking-wider mb-0.5">Lead Trend</p>
              <p className="text-night-900 font-black text-base md:text-lg">Daily Submissions — Last 7 Days</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-night-50 rounded-xl">
              <Clock className="w-3 h-3 text-night-400" />
              <span className="text-[10px] font-semibold text-night-500">Last 7 days</span>
            </div>
          </div>
          <TrendBarChart data={dailyData} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily sparkline area */}
          <div
            className="bg-white rounded-2xl p-4 md:p-5 border border-night-100 opacity-0"
            style={{ animation: 'fadeUp 0.5s 0.55s ease-out forwards' }}
          >
            <p className="text-[10px] font-bold text-night-400 uppercase tracking-wider mb-0.5">Daily Leads</p>
            <p className="text-night-900 font-black text-base md:text-lg mb-4">Trend Line</p>
            <div className="h-28 md:h-32">
              <AreaChart data={dailyData} />
            </div>
            <div className="flex justify-between mt-3">
              {dailyData.map(d => (
                <span key={d.date} className="text-[8px] md:text-[9px] text-night-300 font-medium">{d.label}</span>
              ))}
            </div>
          </div>

          {/* Donut */}
          <div
            className="bg-white rounded-2xl p-4 md:p-5 border border-night-100 opacity-0"
            style={{ animation: 'fadeUp 0.5s 0.63s ease-out forwards' }}
          >
            <p className="text-[10px] font-bold text-night-400 uppercase tracking-wider mb-0.5">System Type</p>
            <p className="text-night-900 font-black text-base md:text-lg mb-4">Distribution</p>
            <DonutChart data={typeData} />
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-4 justify-center">
              {typeData.map((d, i) => (
                <div key={d.type} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ['#171717', '#404040', '#737373', '#d4d4d4'][i] }} />
                  <span className="text-[9px] md:text-[10px] text-night-500 font-medium">{d.type} <span className="text-night-900 font-bold">({d.count})</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* City bars */}
          <div
            className="bg-white rounded-2xl p-4 md:p-5 border border-night-100 opacity-0"
            style={{ animation: 'fadeUp 0.5s 0.71s ease-out forwards' }}
          >
            <p className="text-[10px] font-bold text-night-400 uppercase tracking-wider mb-0.5">City Performance</p>
            <p className="text-night-900 font-black text-base md:text-lg mb-4">Leads vs Conversions</p>
            <HorizontalBarChart data={cityData} />
          </div>
        </div>

        {/* Recent Leads */}
        <div
          className="bg-white rounded-2xl border border-night-100 overflow-hidden opacity-0"
          style={{ animation: 'fadeUp 0.5s 0.79s ease-out forwards' }}
        >
          <div className="px-4 md:px-5 py-3 md:py-4 border-b border-night-100 flex items-center justify-between">
            <div>
              <p className="text-night-900 font-bold text-sm">Recent Leads</p>
              <p className="text-night-400 text-xs">Latest 5 submissions</p>
            </div>
            <span className="text-[10px] font-bold text-night-400 uppercase tracking-wider">{recentLeads.length} shown</span>
          </div>
          <div className="divide-y divide-night-50">
            {recentLeads.map((lead, i) => (
              <div
                key={lead.id}
                className="px-4 md:px-5 py-3 md:py-3.5 flex items-center justify-between hover:bg-night-50/60 transition-colors opacity-0"
                style={{ animation: `fadeUp 0.4s ${0.85 + i * 0.06}s ease-out forwards` }}
              >
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-night-900 flex items-center justify-center text-white text-[10px] md:text-xs font-black flex-shrink-0">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-night-900 text-sm font-semibold truncate">{lead.name}</p>
                    <p className="text-night-400 text-[10px] md:text-xs truncate">{lead.city} · {lead.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-3">
                  <span className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold ${statusColors[lead.status]}`}>
                    {lead.status}
                  </span>
                  <span className="text-night-300 text-[10px] md:text-xs hidden sm:block">
                    {new Date(lead.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}