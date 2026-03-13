import React, { useState, useRef, useEffect } from 'react'

const reasons = [
  {
    stat: '100%',
    title: 'MNRE & DISCOM Certified',
    desc: 'Every installation meets MNRE guidelines and MPEZ DISCOM standards for net metering eligibility.',
  },
  {
    stat: '7 Days',
    title: '7-Day Installation',
    desc: 'From site survey to commissioning — our streamlined process gets your system live fast.',
  },
  {
    stat: 'MP Native',
    title: 'Local Expertise',
    desc: 'Indore-headquartered with deep knowledge of local utility rules, subsidies and grid conditions.',
  },
  {
    stat: '365 Days',
    title: '24/7 Support',
    desc: 'Round-the-clock remote monitoring and responsive on-site service across all our installations.',
  },
  {
    stat: 'Tier 1 Only',
    title: 'Premium Hardware',
    desc: 'We install only Tier 1 rated panels — Jinko, LONGi, Waaree — with 25-year performance warranties.',
  },
  {
    stat: '₹78,000+',
    title: 'Subsidy & EMI Support',
    desc: 'We handle PM Surya Ghar subsidy paperwork end-to-end. No-cost EMIs available through our bank partners.',
  },
]

function AnimatedNumber({ value, suffix = '', duration = 2000 }) {
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
      setCount(Math.round(ease * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, value, duration])

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

export default function WhyChooseUs() {
  const [hoveredIdx, setHoveredIdx] = useState(-1)

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Top heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 md:mb-20 items-end">
          <div>
            <p className="text-xs font-medium text-night-300 tracking-wide mb-6 font-mono">[04]</p>
            <h2
              className="font-black text-night-900 leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.03em' }}
            >
              The Best Solar Company in Indore.
            </h2>
          </div>
          <p className="text-night-400 text-base md:text-lg leading-relaxed lg:max-w-md lg:ml-auto">
            With [PLACEHOLDER: years_exp]+ years, [PLACEHOLDER: installations]+ installations and [PLACEHOLDER: capacity] MW deployed across Madhya Pradesh, our track record speaks for itself.
          </p>
        </div>

        {/* Main content: big stat left + list right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">

          {/* Left — sticky big stat */}
          <div className="lg:col-span-4 lg:pr-12">
            <div className="lg:sticky lg:top-32">
              {/* Big number */}
              <div className="mb-8">
                <p className="text-night-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  Avg. Bill Reduction
                </p>
                <p
                  className="font-display font-black text-night-900 leading-none"
                  style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.04em' }}
                >
                  <AnimatedNumber value={93} suffix="%" />
                </p>
                <p className="text-night-400 text-sm mt-3 leading-relaxed">
                  Average electricity bill reduction for our residential clients across Indore.
                </p>
              </div>

              {/* Mini stats row */}
              <div className="grid grid-cols-2 gap-px bg-night-100 rounded-xl overflow-hidden">
                {[
                  { label: 'Avg. Payback', value: '4.2 Yr' },
                  { label: 'System Life', value: '25+ Yr' },
                  { label: 'CO₂ Offset/Yr', value: '4.8 T' },
                  { label: 'Generation/Yr', value: '8,500+' },
                ].map(item => (
                  <div key={item.label} className="bg-white p-4">
                    <p className="font-display font-black text-night-900 text-lg">{item.value}</p>
                    <p className="text-night-400 text-xs mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Promise image */}
              <div className="mt-8 relative rounded-2xl overflow-hidden h-48 hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=800&q=80&auto=format"
                  alt="Best solar company in Indore team installing panels"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/60 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium leading-relaxed">
                  "Reliable, efficient, and sustainable solar — that's our promise to Central India."
                </p>
              </div>
            </div>
          </div>

          {/* Right — clean stacked list */}
          <div className="lg:col-span-8 lg:border-l lg:border-night-100 lg:pl-12">
            {reasons.map((r, i) => (
              <div
                key={i}
                className={`group border-b border-night-100 transition-all duration-500 cursor-default ${
                  i === 0 ? 'border-t' : ''
                }`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(-1)}
              >
                <div className={`flex items-start gap-6 md:gap-10 py-7 md:py-9 transition-all duration-500 ${
                  hoveredIdx !== -1 && hoveredIdx !== i ? 'opacity-30' : 'opacity-100'
                }`}>
                  {/* Stat badge */}
                  <div className="flex-shrink-0 w-24 md:w-28">
                    <span className={`font-display font-black text-xl md:text-2xl transition-colors duration-500 ${
                      hoveredIdx === i ? 'text-night-900' : 'text-night-300'
                    }`}>
                      {r.stat}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-night-900 text-base md:text-lg mb-1 leading-tight">
                      {r.title}
                    </h3>
                    <p className={`text-sm text-night-400 leading-relaxed overflow-hidden transition-all duration-500 ${
                      hoveredIdx === i ? 'max-h-20 opacity-100 mt-1.5' : 'max-h-0 opacity-0'
                    }`}>
                      {r.desc}
                    </p>
                  </div>

                  {/* Index number */}
                  <span className="text-xs font-mono text-night-200 flex-shrink-0 mt-1 hidden md:block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
