import React, { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '[PLACEHOLDER: years_exp]', suffix: '+', label: 'Years Experience', sub: 'Since [PLACEHOLDER: year]' },
  { value: '[PLACEHOLDER: capacity]', suffix: 'MW', label: 'Installed Capacity', sub: 'Across Central India' },
  { value: '[PLACEHOLDER: installs_k]', suffix: 'k+', label: 'Happy Families', sub: 'Zero electricity bills' },
  { value: 99, suffix: '%', label: 'Client Satisfaction', sub: '5-star rated support' },
]

function CountUp({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <section id="stats" className="bg-night-950 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Marquee strip above stats */}
        <div className="overflow-hidden mb-6 md:mb-10 opacity-20">
          <div className="marquee-inner whitespace-nowrap">
            {[...Array(2)].map((_, idx) => (
              <span key={idx} className="inline-flex items-center gap-6 text-white text-xs font-bold tracking-[0.2em] uppercase">
                {['MNRE Certified', '·', 'ISO 9001:2015', '·', 'DISCOM Empanelled', '·', '25 Year Warranty', '·', 'Government Subsidy Support', '·', 'Zero Interest EMI', '·', 'Indore · Bhopal · Ujjain · Dewas', '·'].map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal scroll strip */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-5 px-5">
            {stats.map((s, i) => (
              <div key={i} className="bg-night-950 px-6 py-8 flex flex-col items-start min-w-[200px] snap-center flex-shrink-0 rounded-2xl border border-white/5">
                <p className="text-3xl font-black text-white leading-none font-display mb-2">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm font-semibold text-white/50">{s.label}</p>
                <p className="text-xs text-night-600 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className="bg-night-950 px-6 py-8 flex flex-col items-start gap-1 group hover:bg-night-900 transition-colors duration-300">
              <p className="text-3xl md:text-4xl font-black text-white leading-none font-display">
                <CountUp target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm font-semibold text-white/50 mt-1">{s.label}</p>
              <p className="text-xs text-night-600">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
