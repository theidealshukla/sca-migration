"use client";

import React from 'react'

import Link from 'next/link';
import { ArrowRight, IndianRupee, Leaf, BadgeCheck, Award, Zap, Clock } from 'lucide-react'

const benefits = [
  { icon: BadgeCheck, label: 'DPIIT Recognized Startup' },
  { icon: Award, label: 'Authorized Waaree Partner' },
  { icon: IndianRupee, label: 'Cost-Effective Solutions' },
  { icon: Leaf, label: 'Eco-Friendly Clean Energy' },
  { icon: Zap, label: '50+ MW Capacity Delivered' },
  { icon: Clock, label: 'On-Time Project Completion' },
]

export default function SubsidyBanner() {
  return (
    <section className="py-20 md:py-28 bg-night-950 text-white relative overflow-hidden">
      {/* decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-solar-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-solar-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-solar-400 mb-4">
              Why ASA EPC
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
              Exceptional. Economical. <br/>
              <span className="text-solar-400">Eco-Friendly.</span>
            </h2>
            <p className="text-night-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              ASA EPC delivers turnkey renewable energy solutions — from solar power plants and transmission lines to BESS and asset management. Trusted by Bajaj, L&T, KEC, and 100+ clients across India and UAE.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-night-900 font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Get a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                  <Icon className="w-6 h-6 text-solar-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm font-semibold text-white/80 leading-snug">{b.label}</p>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
