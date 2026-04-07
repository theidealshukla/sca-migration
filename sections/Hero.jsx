"use client";

import React, { useEffect, useRef } from 'react'
import Link from 'next/link';
import { ArrowRight, Zap, ChevronDown } from 'lucide-react'

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Slow down the video playback rate
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const content = {
    tagline: 'SOLAR ENERGY · INDORE & BEYOND',
    heading: ['Solar Panel', 'Installation for', 'Your Home.'],
    sub: 'As a leading Solar EPC company, we deliver premium and affordable rooftop solar installations for homes and businesses. Headquartered in Indore with offices in Mumbai, Pune, Jalgaon, and Kota.',
    video: '/hero-video.mp4',
    poster: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&auto=format&fit=crop'
  }

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={content.video}
          autoPlay
          loop
          muted
          playsInline
          poster={content.poster}
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-night-950/60 via-night-950/25 to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col pb-8 md:pb-20 pt-[70px] md:pt-[100px]">
        {/* Pushes content to the bottom */}
        <div className="flex-1 min-h-[10px] max-h-[80px] md:min-h-[40px] md:max-h-none" />
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            className="flex items-center gap-2 mb-6 opacity-0"
            style={{ animation: 'fadeUp 0.6s 0.1s ease-out forwards' }}
          >
            <div className="w-6 h-px bg-white/60" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/60">{content.tagline}</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6">
            {content.heading.map((line, i) => (
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
            className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-8 opacity-0"
            style={{ animation: 'fadeUp 0.7s 0.55s ease-out forwards' }}
          >
            {content.sub}
          </p>

          {/* CTAs */}
          <div
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
            className="flex flex-wrap items-center gap-3 mt-8 opacity-0"
            style={{ animation: 'fadeUp 0.7s 0.85s ease-out forwards' }}
          >
            {['MPWZ Approved', '25yr Warranty', 'EMI @ 0%', 'Subsidy Support'].map(b => (
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

      {/* Scroll indicator */}
      <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

    </section>
  )
}
