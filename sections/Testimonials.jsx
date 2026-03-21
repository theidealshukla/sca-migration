"use client";

import React, { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'Homeowner, Jaipur',
    avatar: 'RS',
    color: 'bg-night-900',
    stars: 5,
    text: 'Installed a 5kW system in December. My electricity bill dropped from ₹4,800 to under ₹300. The team was professional, the installation was clean and the app monitoring is excellent. Worth every rupee!',
    system: '5 kWp Residential',
    saving: '94% bill reduction',
  },
  {
    name: 'Priya Agarwal',
    role: 'Owner, Agarwal Textile Mills, Pune',
    avatar: 'PA',
    color: 'bg-night-700',
    stars: 5,
    text: "Our factory electricity bill was over ₹3.5 lakh per month. Post SCA Tech's 200kW installation, we're saving ₹2.8 lakh monthly. ROI in under 3 years. Exceptional engineering team.",
    system: '200 kWp Commercial',
    saving: '₹2.8L/month saved',
  },
  {
    name: 'Dr. Arvind Pathak',
    role: 'Clinic Owner, Hyderabad',
    avatar: 'AP',
    color: 'bg-night-600',
    stars: 5,
    text: 'Power cuts were disrupting my clinic. SCA Tech installed a hybrid system with battery backup. Now we have uninterrupted power 24/7. The subsidy processing was seamless — they handled everything.',
    system: '8 kWp Hybrid + Battery',
    saving: '100% uptime',
  },
  {
    name: 'Sunita Verma',
    role: 'Homeowner, Delhi NCR',
    avatar: 'SV',
    color: 'bg-night-500',
    stars: 5,
    text: 'We were hesitant at first but the SCA Tech team explained everything clearly. Got ₹78,000 subsidy through PM Surya Ghar. Installation was done in just 4 days. Our neighbours have also installed now!',
    system: '3 kWp On-grid',
    saving: '₹78K subsidy received',
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
              Reviews for the Best{' '}
              <span className="font-light text-night-400">Solar Company in India.</span>
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-3">
                {['RS', 'PA', 'AP', 'SV'].map((init, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${['bg-night-900','bg-night-700','bg-night-600','bg-night-500'][i]}`}>
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-night-900 fill-night-900" />)}
                </div>
                <p className="text-sm text-night-500 mt-0.5">1,200+ verified reviews</p>
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
                  <p className="text-xs text-night-400 mb-1">System</p>
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
