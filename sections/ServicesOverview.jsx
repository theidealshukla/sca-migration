"use client";

import React, { useState, useEffect, useRef } from 'react'

const services = [
  {
    id: '01',
    title: 'Solar Panel Installation',
    desc: 'Complete rooftop solar for homes and businesses. Net metering, subsidy processing, MPEB approvals — all handled by us.',
  },
  {
    id: '02',
    title: 'Free Energy Consultation',
    desc: 'Our experts visit your site, assess your roof, check your bills and give you an exact quote — completely free of charge.',
  },
  {
    id: '03',
    title: 'Installation Service',
    desc: 'From site survey to commissioning in just 7 days. Our streamlined process gets your system live fast and hassle-free.',
  },
  {
    id: '04',
    title: 'Monitoring & Tracking',
    desc: 'Real-time remote monitoring, quarterly performance reports, and 24/7 fault alerts through our proprietary dashboard.',
  },
  {
    id: '05',
    title: 'Commercial Solar Projects',
    desc: 'Large-scale ground-mount, rooftop and carport solar for factories, warehouses and industrial parks across MP.',
  },
]

/* ---------- SVG illustrations per service ---------- */
const svgIllustrations = [
  // 01 — Solar Panel Installation: panel on a roof
  () => (
    <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Roof line */}
      <path className="svg-draw" d="M60 280 L250 120 L440 280" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Panel frame */}
      <rect className="svg-draw" x="160" y="160" width="180" height="110" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Panel grid lines - horizontal */}
      <line className="svg-draw" x="160" y1="187" x2="340" y2="187" stroke="currentColor" strokeWidth="0.8" />
      <line className="svg-draw" x="160" y1="214" x2="340" y2="214" stroke="currentColor" strokeWidth="0.8" />
      <line className="svg-draw" x="160" y1="241" x2="340" y2="241" stroke="currentColor" strokeWidth="0.8" />
      {/* Panel grid lines - vertical */}
      <line className="svg-draw" x1="205" y1="160" x2="205" y2="270" stroke="currentColor" strokeWidth="0.8" />
      <line className="svg-draw" x1="250" y1="160" x2="250" y2="270" stroke="currentColor" strokeWidth="0.8" />
      <line className="svg-draw" x1="295" y1="160" x2="295" y2="270" stroke="currentColor" strokeWidth="0.8" />
      {/* Support bracket */}
      <path className="svg-draw" d="M250 270 L250 300" stroke="currentColor" strokeWidth="1.5" />
      <path className="svg-draw" d="M220 300 L280 300" stroke="currentColor" strokeWidth="1.5" />
      {/* Sun */}
      <circle className="svg-draw" cx="400" cy="80" r="25" stroke="currentColor" strokeWidth="1.5" />
      {/* Sun rays */}
      <line className="svg-draw" x1="400" y1="42" x2="400" y2="30" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="400" y1="118" x2="400" y2="130" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="362" y1="80" x2="350" y2="80" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="438" y1="80" x2="450" y2="80" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="373" y1="53" x2="365" y2="45" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="427" y1="107" x2="435" y2="115" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="427" y1="53" x2="435" y2="45" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="373" y1="107" x2="365" y2="115" stroke="currentColor" strokeWidth="1.2" />
      {/* Ground line */}
      <line className="svg-draw" x1="40" y1="340" x2="460" y2="340" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8 6" />
      {/* Small text at bottom */}
      <text x="40" y="380" fill="currentColor" fontSize="10" fontFamily="Inter, sans-serif" opacity="0.4">Premium Tier 1 panels · 25yr warranty</text>
    </svg>
  ),
  // 02 — Free Energy Consultation: clipboard + lightbulb
  () => (
    <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Clipboard */}
      <rect className="svg-draw" x="140" y="60" width="180" height="260" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <rect className="svg-draw" x="200" y="48" width="60" height="24" rx="4" stroke="currentColor" strokeWidth="1.2" />
      {/* Lines on clipboard */}
      <line className="svg-draw" x1="170" y1="120" x2="290" y2="120" stroke="currentColor" strokeWidth="1" />
      <line className="svg-draw" x1="170" y1="150" x2="260" y2="150" stroke="currentColor" strokeWidth="1" />
      <line className="svg-draw" x1="170" y1="180" x2="280" y2="180" stroke="currentColor" strokeWidth="1" />
      <line className="svg-draw" x1="170" y1="210" x2="240" y2="210" stroke="currentColor" strokeWidth="1" />
      {/* Check marks */}
      <path className="svg-draw" d="M170 245 L185 260 L210 235" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className="svg-draw" d="M170 275 L185 290 L210 265" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lightbulb */}
      <path className="svg-draw" d="M400 100 Q400 60 370 60 Q340 60 340 100 Q340 130 360 140 L360 170 L380 170 L380 140 Q400 130 400 100Z" stroke="currentColor" strokeWidth="1.5" />
      <line className="svg-draw" x1="355" y1="180" x2="385" y2="180" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="360" y1="190" x2="380" y2="190" stroke="currentColor" strokeWidth="1.2" />
      {/* Rays from bulb */}
      <line className="svg-draw" x1="370" y1="40" x2="370" y2="25" stroke="currentColor" strokeWidth="1" />
      <line className="svg-draw" x1="418" y1="80" x2="433" y2="80" stroke="currentColor" strokeWidth="1" />
      <line className="svg-draw" x1="322" y1="80" x2="307" y2="80" stroke="currentColor" strokeWidth="1" />
      {/* Arrow between */}
      <path className="svg-draw" d="M330 200 L345 200 L340 195 M345 200 L340 205" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Ground */}
      <line className="svg-draw" x1="40" y1="340" x2="460" y2="340" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8 6" />
      <text x="40" y="380" fill="currentColor" fontSize="10" fontFamily="Inter, sans-serif" opacity="0.4">Free site survey · Zero obligation</text>
    </svg>
  ),
  // 03 — Installation Service: tools + panel being installed
  () => (
    <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Panel being installed (angled) */}
      <g transform="rotate(-15, 280, 180)">
        <rect className="svg-draw" x="160" y="100" width="240" height="160" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <line className="svg-draw" x1="220" y1="100" x2="220" y2="260" stroke="currentColor" strokeWidth="0.8" />
        <line className="svg-draw" x1="280" y1="100" x2="280" y2="260" stroke="currentColor" strokeWidth="0.8" />
        <line className="svg-draw" x1="340" y1="100" x2="340" y2="260" stroke="currentColor" strokeWidth="0.8" />
        <line className="svg-draw" x1="160" y1="153" x2="400" y2="153" stroke="currentColor" strokeWidth="0.8" />
        <line className="svg-draw" x1="160" y1="206" x2="400" y2="206" stroke="currentColor" strokeWidth="0.8" />
      </g>
      {/* Wrench */}
      <path className="svg-draw" d="M80 300 L120 260 Q135 250 140 260 L100 300 Q95 310 80 300Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Junction box detail */}
      <rect className="svg-draw" x="100" y="160" width="40" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" />
      <circle className="svg-draw" cx="112" cy="178" r="4" stroke="currentColor" strokeWidth="1" />
      <circle className="svg-draw" cx="128" cy="178" r="4" stroke="currentColor" strokeWidth="1" />
      <line className="svg-draw" x1="110" y1="195" x2="130" y2="195" stroke="currentColor" strokeWidth="1" />
      {/* Cable from box */}
      <path className="svg-draw" d="M120 210 L120 250 Q120 260 130 260 L155 260" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Ground */}
      <line className="svg-draw" x1="40" y1="340" x2="460" y2="340" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8 6" />
      <text x="40" y="380" fill="currentColor" fontSize="10" fontFamily="Inter, sans-serif" opacity="0.4">7 day installation · Professional setup</text>
    </svg>
  ),
  // 04 — Monitoring & Tracking: dashboard/screen
  () => (
    <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Monitor */}
      <rect className="svg-draw" x="100" y="60" width="300" height="200" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <rect className="svg-draw" x="110" y="70" width="280" height="170" rx="4" stroke="currentColor" strokeWidth="0.8" />
      {/* Stand */}
      <path className="svg-draw" d="M250 260 L250 290" stroke="currentColor" strokeWidth="1.5" />
      <path className="svg-draw" d="M200 290 L300 290" stroke="currentColor" strokeWidth="1.5" />
      {/* Graph on screen — bar chart */}
      <rect className="svg-draw" x="140" y="185" width="25" height="40" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="175" y="160" width="25" height="65" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="210" y="140" width="25" height="85" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="245" y="120" width="25" height="105" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="280" y="105" width="25" height="120" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="315" y="130" width="25" height="95" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="350" y="150" width="25" height="75" stroke="currentColor" strokeWidth="1" />
      {/* Trend line */}
      <polyline className="svg-draw" points="152,180 187,155 222,135 257,115 292,100 327,125 362,145" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Top text indicators */}
      <line className="svg-draw" x1="130" y1="85" x2="180" y2="85" stroke="currentColor" strokeWidth="1" />
      <line className="svg-draw" x1="130" y1="95" x2="160" y2="95" stroke="currentColor" strokeWidth="0.8" />
      <circle className="svg-draw" cx="350" cy="87" r="8" stroke="currentColor" strokeWidth="1" />
      {/* Wifi signal icon */}
      <path className="svg-draw" d="M80 80 Q100 60 120 80" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path className="svg-draw" d="M87 90 Q100 75 113 90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle className="svg-draw" cx="100" cy="97" r="2" fill="currentColor" />
      {/* Ground */}
      <line className="svg-draw" x1="40" y1="340" x2="460" y2="340" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8 6" />
      <text x="40" y="380" fill="currentColor" fontSize="10" fontFamily="Inter, sans-serif" opacity="0.4">Real-time monitoring · SCADA dashboard</text>
    </svg>
  ),
  // 05 — Commercial Solar Projects: factory + large panels
  () => (
    <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Factory building */}
      <rect className="svg-draw" x="200" y="120" width="220" height="200" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Factory roof */}
      <polyline className="svg-draw" points="200,120 230,80 260,120 290,80 320,120 350,80 380,120 410,80 420,120" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Windows */}
      <rect className="svg-draw" x="220" y="150" width="35" height="40" rx="2" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="270" y="150" width="35" height="40" rx="2" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="320" y="150" width="35" height="40" rx="2" stroke="currentColor" strokeWidth="1" />
      <rect className="svg-draw" x="370" y="150" width="35" height="40" rx="2" stroke="currentColor" strokeWidth="1" />
      {/* Door */}
      <rect className="svg-draw" x="290" y="250" width="50" height="70" rx="3" stroke="currentColor" strokeWidth="1" />
      <circle className="svg-draw" cx="330" cy="288" r="3" stroke="currentColor" strokeWidth="1" />
      {/* Ground-mount panels in front */}
      <g transform="rotate(-10, 120, 250)">
        <rect className="svg-draw" x="50" y="200" width="140" height="90" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <line className="svg-draw" x1="85" y1="200" x2="85" y2="290" stroke="currentColor" strokeWidth="0.8" />
        <line className="svg-draw" x1="120" y1="200" x2="120" y2="290" stroke="currentColor" strokeWidth="0.8" />
        <line className="svg-draw" x1="155" y1="200" x2="155" y2="290" stroke="currentColor" strokeWidth="0.8" />
        <line className="svg-draw" x1="50" y1="245" x2="190" y2="245" stroke="currentColor" strokeWidth="0.8" />
      </g>
      {/* Panel supports */}
      <line className="svg-draw" x1="90" y1="310" x2="90" y2="340" stroke="currentColor" strokeWidth="1.2" />
      <line className="svg-draw" x1="150" y1="310" x2="150" y2="340" stroke="currentColor" strokeWidth="1.2" />
      {/* Ground */}
      <line className="svg-draw" x1="40" y1="340" x2="460" y2="340" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8 6" />
      <text x="40" y="380" fill="currentColor" fontSize="10" fontFamily="Inter, sans-serif" opacity="0.4">Up to 5 MW · Ground-mount & carport</text>
    </svg>
  ),
]

export default function ServicesOverview() {
  const [active, setActive] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const SvgComponent = svgIllustrations[active]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section number */}
        <p className="text-xs font-medium text-night-300 tracking-wide mb-6 font-mono">[03]</p>

        {/* Heading */}
        <h2
          className="font-black text-night-900 leading-[1.1] mb-16 md:mb-20 max-w-xl"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.03em' }}
        >
          Rooftop Solar for Homes in Indore & MP.
        </h2>

        {/* Main grid: SVG left, list right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left \u2014 SVG illustration (Desktop Only) */}
          <div className="hidden lg:block relative sticky top-32">
            <div
              key={active}
              className={`svg-illustration text-night-400 transition-opacity duration-500 ${isVisible ? 'is-visible' : ''}`}
              style={{ minHeight: '340px' }}
            >
              <SvgComponent />
            </div>
            {/* Small note below illustration */}
            <p className="text-[11px] text-night-300 leading-relaxed mt-4 max-w-xs">
              That's why we're proud that so many clients trust us to deliver reliable, efficient, and sustainable solar solutions.
            </p>
          </div>

          {/* Right — Service list */}
          <div className="flex flex-col">
            {services.map((svc, i) => (
              <button
                key={svc.id}
                onClick={() => setActive(i)}
                className={`group w-full text-left border-t border-night-100 transition-all duration-500 ${
                  i === services.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className={`flex items-baseline gap-5 md:gap-8 py-5 md:py-6 transition-all duration-500 ${
                  i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}>
                  {/* Number */}
                  <span className="text-sm font-mono text-night-400 flex-shrink-0 w-8">
                    /{svc.id}
                  </span>
                  {/* Title + description */}
                  <div className="flex-1">
                    <p className={`font-semibold transition-all duration-500 ${
                      i === active ? 'text-night-900 text-lg md:text-xl' : 'text-night-600 text-base md:text-lg'
                    }`}>
                      {svc.title}
                    </p>
                    {/* Collapsible description */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        i === active ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-sm text-night-400 leading-relaxed pr-4">{svc.desc}</p>
                      
                      {/* Mobile SVG Illustration */}
                      {i === active && (
                        <div className="lg:hidden mt-6">
                          <div 
                            key={`mobile-svg-${active}`}
                            className="flex justify-center svg-illustration is-visible text-night-500"
                            style={{ height: '220px', width: '100%' }}
                          >
                            <SvgComponent />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Draw Animation Styles */}
      <style>{`
        .svg-illustration .svg-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          transition: stroke-dashoffset 0s;
        }

        .svg-illustration.is-visible .svg-draw {
          animation: svgDraw 2s ease-out forwards;
        }

        @keyframes svgDraw {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        /* Stagger the draw for each path */
        .svg-illustration.is-visible .svg-draw:nth-child(1) { animation-delay: 0s; }
        .svg-illustration.is-visible .svg-draw:nth-child(2) { animation-delay: 0.05s; }
        .svg-illustration.is-visible .svg-draw:nth-child(3) { animation-delay: 0.1s; }
        .svg-illustration.is-visible .svg-draw:nth-child(4) { animation-delay: 0.15s; }
        .svg-illustration.is-visible .svg-draw:nth-child(5) { animation-delay: 0.2s; }
        .svg-illustration.is-visible .svg-draw:nth-child(6) { animation-delay: 0.25s; }
        .svg-illustration.is-visible .svg-draw:nth-child(7) { animation-delay: 0.3s; }
        .svg-illustration.is-visible .svg-draw:nth-child(8) { animation-delay: 0.35s; }
        .svg-illustration.is-visible .svg-draw:nth-child(9) { animation-delay: 0.4s; }
        .svg-illustration.is-visible .svg-draw:nth-child(10) { animation-delay: 0.45s; }
        .svg-illustration.is-visible .svg-draw:nth-child(11) { animation-delay: 0.5s; }
        .svg-illustration.is-visible .svg-draw:nth-child(12) { animation-delay: 0.55s; }
        .svg-illustration.is-visible .svg-draw:nth-child(13) { animation-delay: 0.6s; }
        .svg-illustration.is-visible .svg-draw:nth-child(14) { animation-delay: 0.65s; }
        .svg-illustration.is-visible .svg-draw:nth-child(15) { animation-delay: 0.7s; }
        .svg-illustration.is-visible .svg-draw:nth-child(16) { animation-delay: 0.75s; }
        .svg-illustration.is-visible .svg-draw:nth-child(17) { animation-delay: 0.8s; }
        .svg-illustration.is-visible .svg-draw:nth-child(18) { animation-delay: 0.85s; }
        .svg-illustration.is-visible .svg-draw:nth-child(19) { animation-delay: 0.9s; }
        .svg-illustration.is-visible .svg-draw:nth-child(20) { animation-delay: 0.95s; }
        .svg-illustration.is-visible .svg-draw:nth-child(n+21) { animation-delay: 1s; }
      `}</style>
    </section>
  )
}
