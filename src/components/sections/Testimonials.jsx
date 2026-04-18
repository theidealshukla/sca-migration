"use client";

import React, { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Bajaj Electrical',
    role: 'Client, MPPTCL Projects',
    avatar: 'BE',
    color: 'bg-night-900',
    stars: 5,
    text: 'ASA EPC delivered our 132KV transmission line project in Bistan with exceptional quality and professionalism. Their team handled challenging terrain with ease and completed the project on schedule.',
    system: '132KV Transmission Line',
    saving: 'On-time delivery',
  },
  {
    name: 'L&T Construction',
    role: 'Client, Multiple Projects',
    avatar: 'LT',
    color: 'bg-night-700',
    stars: 5,
    text: "We've collaborated with ASA EPC on multiple transmission line and pressurized irrigation projects across Madhya Pradesh and Rajasthan. Their execution capabilities in challenging terrains are outstanding. The 765KV project in Nokha, Rajasthan was delivered with precision.",
    system: '765KV T/L – Nokha, Rajasthan',
    saving: 'Multi-project partner',
  },
  {
    name: 'Dr. C.V. Raman University',
    role: 'Bilaspur, Chhattisgarh',
    avatar: 'CV',
    color: 'bg-night-600',
    stars: 5,
    text: 'ASA EPC installed a 150 KW rooftop solar system for our university campus. The installation was seamless, and we are already seeing significant energy savings. Their team handled all approvals and documentation efficiently.',
    system: '150 KW Rooftop Solar',
    saving: 'Significant energy savings',
  },
  {
    name: 'KEC International',
    role: 'RPG Group, Indian Railway Project',
    avatar: 'KC',
    color: 'bg-night-500',
    stars: 5,
    text: 'ASA EPC executed our 132KV traction substation project in Balaghat for Indian Railways with remarkable technical competence. Their expertise in substation construction is truly reliable.',
    system: '132KV Traction Substation',
    saving: 'Railway-grade quality',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 md:py-32 bg-night-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="section-tag">Client Stories</p>
            <h2 className="font-black text-night-900 leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.03em' }}>
              Trusted by India's{' '}
              <span className="font-light text-night-400">Leading Companies.</span>
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-3">
                {['BE', 'LT', 'CV', 'KC'].map((init, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${['bg-night-900','bg-night-700','bg-night-600','bg-night-500'][i]}`}>
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-night-900 fill-night-900" />)}
                </div>
                <p className="text-sm text-night-500 mt-0.5">100+ projects delivered</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActive(a => (a - 1 + testimonials.length) % testimonials.length)}
                className="w-11 h-11 rounded-full border-2 border-night-200 flex items-center justify-center hover:bg-night-900 hover:border-night-900 hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActive(a => (a + 1) % testimonials.length)}
                className="w-11 h-11 rounded-full bg-night-900 text-white flex items-center justify-center hover:bg-night-700 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-sm text-night-400 font-medium ml-2">
                {active + 1} / {testimonials.length}
              </span>
            </div>
          </div>

          {/* Right — active testimonial */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-night-100">
              <Quote className="w-8 h-8 text-night-200 mb-6" />
              <p className="text-night-700 text-lg leading-relaxed mb-8 font-medium">
                "{testimonials[active].text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold ${testimonials[active].color}`}>
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-night-900">{testimonials[active].name}</p>
                    <p className="text-sm text-night-400">{testimonials[active].role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex">
                    {[...Array(testimonials[active].stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-night-900 fill-night-900" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-night-100 grid grid-cols-2 gap-4">
                <div className="bg-night-50 rounded-xl p-3">
                  <p className="text-xs text-night-400 mb-1">Project</p>
                  <p className="font-bold text-night-900 text-sm">{testimonials[active].system}</p>
                </div>
                <div className="bg-night-100 rounded-xl p-3">
                  <p className="text-xs text-night-500 mb-1">Result</p>
                  <p className="font-bold text-night-900 text-sm">{testimonials[active].saving}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${i === active ? 'w-8 h-2 bg-night-900' : 'w-2 h-2 bg-night-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
