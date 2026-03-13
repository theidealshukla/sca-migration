import React from 'react'
import { Link } from 'react-router-dom'
import { IndianRupee, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'

const benefits = [
  'Up to ₹78,000 subsidy for 3 kW system',
  'Up to ₹30,000 for 1–2 kW systems',
  'Additional state top-up in MP (₹10,000)',
  'No processing fees — we handle all paperwork',
  'Subsidy credited directly to your bank',
  'Applicable for all MPEZ consumers',
]

export default function SubsidyBanner() {
  return (
    <section className="py-16 md:py-20 bg-night-900 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-night-800 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <AlertCircle className="w-4 h-4 text-white/60" />
              <span className="text-white/70 text-xs font-bold tracking-widest uppercase">PM Surya Ghar Scheme · 2024</span>
            </div>
            <h2 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.03em' }}>
              PM Surya Ghar Subsidy — ₹78,000 Available in MP.
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">
              The Government of India's PM Surya Ghar: Muft Bijli Yojana offers direct benefit transfer subsidies to all eligible households. SCA Tech handles the entire registration and claim process for you — for free.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-night-900 px-7 py-3.5 rounded-full font-bold text-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Claim Your Subsidy — Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-7 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-night-900" />
                </div>
                <div>
                  <p className="text-white font-black text-2xl font-display">₹78,000+</p>
                  <p className="text-white/40 text-sm">Maximum subsidy available</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                    <p className="text-white/70 text-sm font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/30 text-xs">
                  * Subject to eligibility. Available for on-grid systems connected to the DISCOM grid. Subsidy slabs as per MNRE notification dated April 2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
