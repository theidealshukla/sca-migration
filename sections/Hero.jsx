"use client";

import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import { ArrowRight, Play, Sun, Zap, ChevronDown } from 'lucide-react'

const slides = [
  {
    tagline: 'SOLAR ENERGY · PAN INDIA',
    heading: ['Solar Panel', 'Installation Across', 'India.'],
    sub: 'As India\'s leading Solar EPC company, we deliver premium rooftop solar installations for homes and businesses across the nation.',
    bg: 'https://images.unsplash.com/photo-1509391366360-2e959784a276',
    alt: 'Rooftop solar panel installation across India by SCA Tech Solar'
  },
  {
    tagline: 'CLEAN ENERGY · 300+ SUNNY DAYS',
    heading: ['Invest in', 'Clean, Affordable', 'Energy.'],
    sub: 'Get the most transparent solar system pricing in India. With 300+ sunny days, your solar investment pays back faster than ever.',
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
    alt: 'Residential solar system for homes across India'
  },
  {
    tagline: 'INDUSTRIAL & COMMERCIAL',
    heading: ['Scale Up Your', 'Business with', 'Solar.'],
    sub: 'Industrial rooftop, ground-mount and carport solar solutions. Reduce operating costs and hit your ESG targets nationwide.',
    bg: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
    alt: 'Commercial and industrial solar installation India'
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length)
      setAnimKey(prev => prev + 1)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[active]

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={`${s.bg}?w=1200&q=80&auto=format&fit=crop`}
            srcSet={`
              ${s.bg}?w=640&q=75&auto=format&fit=crop 640w,
              ${s.bg}?w=1024&q=80&auto=format&fit=crop 1024w,
              ${s.bg}?w=1200&q=80&auto=format&fit=crop 1200w
            `}
            sizes="100vw"
            alt={s.alt}
            className="w-full h-full object-cover scale-105"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            width="1200"
            height="800"
          />
        </div>
      ))}

      {/* Overlay — light & airy like reference */}
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-night-950/60 via-night-950/25 to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col pb-8 md:pb-20 pt-[70px] md:pt-[100px]">
        {/* Pushes content to the bottom — smaller on mobile to reduce gap */}
        <div className="flex-1 min-h-[10px] max-h-[80px] md:min-h-[40px] md:max-h-none" />
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            key={`tag-${animKey}`}
            className="flex items-center gap-2 mb-6 opacity-0"
            style={{ animation: 'fadeUp 0.6s 0.1s ease-out forwards' }}
          >
            <div className="w-6 h-px bg-white/60" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/60">{slide.tagline}</span>
          </div>

          {/* Main heading — large, bold, clean like reference */}
          <h1 key={`h-${animKey}`} className="mb-6">
            {slide.heading.map((line, i) => (
              <span
                key={i}
                className="block text-white font-black leading-[1.0] opacity-0"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                  animation: `fadeUp 0.7s ${0.2 + i * 0.12}s ease-out forwards`,
                  letterSpacing: '-0.03em',
                }}
              >
                {i === 1 ? (
                  <>
                    {line.split(' ')[0]}{' '}
                    <span className="text-white/50 font-light">{line.split(' ').slice(1).join(' ')}</span>
                  </>
                ) : line}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p
            key={`sub-${animKey}`}
            className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-8 opacity-0"
            style={{ animation: 'fadeUp 0.7s 0.55s ease-out forwards' }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            key={`cta-${animKey}`}
            className="flex flex-wrap items-center gap-4 opacity-0"
            style={{ animation: 'fadeUp 0.7s 0.7s ease-out forwards' }}
          >
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-night-900 px-7 py-3.5 rounded-full font-semibold text-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Get Free Solar Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/#calculator" className="btn-outline-white text-sm">
              Calculate Your Savings
            </Link>
          </div>

          {/* Badges */}
          <div
            key={`badges-${animKey}`}
            className="flex flex-wrap items-center gap-3 mt-8 opacity-0"
            style={{ animation: 'fadeUp 0.7s 0.85s ease-out forwards' }}
          >
            {['MNRE Approved', '25yr Warranty', 'EMI @ 0%', 'Subsidy Support'].map(b => (
              <span key={b} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-xs font-semibold tracking-wide">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div className="absolute top-24 right-5 md:right-8 glass-card rounded-2xl p-4 hidden md:flex items-center gap-3 opacity-0" style={{ animation: 'fadeIn 1s 1.2s ease-out forwards' }}>
        <div className="w-10 h-10 bg-night-900 rounded-xl flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-night-900 font-black text-xl leading-none">3.2 kW</p>
          <p className="text-night-500 text-xs mt-0.5 font-medium">Live generation now</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 right-5 md:right-8 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setAnimKey(prev => prev + 1) }}
            className={`transition-all duration-300 rounded-full ${i === active ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

    </section>
  )
}
