import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

const cards = [
  {
    pill: '+ RESIDENTIAL',
    title: 'Home Solar',
    value: '3 kW – 10 kW',
    desc: 'Cut your electricity bill by up to 90%. On-grid and hybrid systems with net metering for Indore MPEB.',
    color: 'bg-night-50 border-night-200',
    accent: 'text-night-500',
    img: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=600&q=80&auto=format',
    alt: '3kW residential solar system installed in Vijay Nagar Indore',
    dark: false,
  },
  {
    pill: '+ COMMERCIAL',
    title: 'Business Solar',
    value: '10 kW – 500 kW',
    desc: 'Reduce operating costs, earn REC credits and meet your corporate green targets.',
    color: 'bg-night-50 border-night-200',
    accent: 'text-night-500',
    img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80&auto=format',
    alt: 'Commercial solar system installation Indore MP',
    dark: false,
  },
  {
    pill: '+ INDUSTRIAL',
    title: 'Industrial Solar',
    value: '500 kW – 5 MW',
    desc: 'Ground-mount and carport solutions for factories, warehouses and industrial parks across MP.',
    color: 'bg-night-950 border-night-800',
    accent: 'text-white/50',
    img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80&auto=format',
    alt: 'Industrial solar factory Indore installation',
    dark: true,
  },
]

export default function AboutVision() {
  const scrollRef = useRef(null)
  const [scrollIdx, setScrollIdx] = useState(0)

  const scrollTo = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.children[0]?.offsetWidth + 12 // card width + gap
    const newIdx = dir === 'left'
      ? Math.max(0, scrollIdx - 1)
      : Math.min(cards.length - 1, scrollIdx + 1)
    setScrollIdx(newIdx)
    el.scrollTo({ left: cardWidth * newIdx, behavior: 'smooth' })
  }

  return (
    <section className="py-16 md:py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Top row — editorial style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20 items-end">
          <div>
            <p className="section-tag">2024 · About SCA Tech</p>
            <h2 className="font-black text-night-900 leading-tight" style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
              Your Local <span className="font-light text-night-400">Solar Company in Indore</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-4 md:gap-6">
            <p className="text-night-500 text-sm md:text-base lg:text-lg leading-relaxed">
              SCA Tech Solar was founded in Indore with a single mission: to make premium solar energy accessible to every home and business in Madhya Pradesh. We combine German-engineered panels with local expertise and after-sales service you can rely on.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold text-night-900 group">
              More about us
              <span className="w-8 h-8 rounded-full bg-night-100 flex items-center justify-center group-hover:bg-night-900 group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* Big scrolling text — hidden on mobile to save space */}
        <div className="overflow-hidden mb-10 md:mb-16 -mx-5 md:-mx-8 hidden md:block">
          <p className="whitespace-nowrap font-display font-black text-night-100 leading-none select-none" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', letterSpacing: '-0.04em' }}>
            Clean Energy · Solar Power · Indore · MP ·&nbsp;
          </p>
        </div>

        {/* Mobile: Our Solutions Title & Horizontal Scroll */}
        <div className="md:hidden">
          <p className="text-xs font-bold tracking-widest uppercase text-night-400 mb-4">Our Solutions</p>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-5 px-5">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`rounded-2xl border overflow-hidden flex-shrink-0 snap-center flex flex-col ${card.color}`}
                style={{ width: '80vw', minWidth: '280px', maxWidth: '340px' }}
              >
                <div className="h-40 flex-shrink-0 overflow-hidden">
                  <img src={card.img} alt={card.alt} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${card.accent}`}>{card.pill}</span>
                  <h3 className={`text-lg font-black mt-2 mb-1 ${card.dark ? 'text-white' : 'text-night-900'}`}>{card.title}</h3>
                  <p className={`text-2xl font-black font-display mb-3 ${card.dark ? 'text-white/60' : 'text-night-900'}`}>{card.value}</p>
                  <p className={`text-sm leading-relaxed mt-auto ${card.dark ? 'text-night-500' : 'text-night-500'}`}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden group card-hover flex flex-col ${card.color}`}>
              <div className="h-44 md:h-52 overflow-hidden flex-shrink-0">
                <img src={card.img} alt={card.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className={`text-xs font-bold tracking-widest uppercase ${card.accent}`}>{card.pill}</span>
                <h3 className={`text-xl font-black mt-2 mb-1 ${card.dark ? 'text-white' : 'text-night-900'}`}>{card.title}</h3>
                <p className={`text-3xl font-black font-display mb-3 ${card.dark ? 'text-white/60' : 'text-night-900'}`}>{card.value}</p>
                <p className={`text-sm leading-relaxed mt-auto ${card.dark ? 'text-night-500' : 'text-night-500'}`}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision statement */}
        <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <p className="section-tag">Our Vision · 2030</p>
            <p className="text-night-900 font-black leading-tight" style={{ fontSize: 'clamp(1.4rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              <span className="text-night-400 font-light">SCA Tech aims to power</span> 10,000 homes across Madhya Pradesh with clean, affordable solar by 2030.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { year: '2008', text: 'Founded in Indore with 5-person team' },
              { year: '2015', text: 'Reached 100th installation milestone' },
              { year: '2022', text: 'Expanded to Bhopal, Ujjain & Dewas' },
              { year: '2025 →', text: 'Target: 2,000 installs per year' },
            ].map(item => (
              <div key={item.year} className="flex items-start gap-4">
                <span className="text-xs font-bold text-night-400 w-14 flex-shrink-0 mt-0.5">{item.year}</span>
                <p className="text-sm text-night-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
