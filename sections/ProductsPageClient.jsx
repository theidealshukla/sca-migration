"use client";

import React, { useState } from 'react'

import Link from 'next/link';

import Breadcrumb from '../components/Breadcrumb'
import { ArrowRight, Filter } from 'lucide-react'

const allProducts = [
  // ─── Solar Panels ─────────────────────────────────
  { cat: 'Solar Panels', brand: 'TOPCon Bifacial', name: '590W Solar Panel', desc: 'High-efficiency double-sided solar panel ~₹14.5/watt.', badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80&auto=format&fit=crop' },
  { cat: 'Solar Panels', brand: 'TOPCon Bifacial', name: '595W Solar Panel', desc: 'Maximum output Non-DCR bifacial panel ~₹14.5/watt.', badge: 'Premium', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80&auto=format&fit=crop' },
  { cat: 'Solar Panels', brand: 'TOPCon Bifacial', name: 'Commercial 595W', desc: 'Commercial-grade bifacial panels for large projects.', badge: 'High Yield', img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80&auto=format&fit=crop' },
  // ─── Inverters ────────────────────────────────────
  { cat: 'Inverters', brand: 'GoodWe', name: 'DNS G4 Series', desc: '3.3kW – 10kW single-phase grid-tie inverter.', badge: 'Popular', img: 'https://images.unsplash.com/photo-1548615338-78da47f6314c?w=600&q=80&auto=format&fit=crop' },
  { cat: 'Inverters', brand: 'GoodWe', name: 'MS G3 Series', desc: 'High-efficiency inverter for residential use.', badge: 'Reliable', img: 'https://images.unsplash.com/photo-1583569106093-9c5950ee08cb?w=600&q=80&auto=format&fit=crop' },
  // ─── Complete Kits ────────────────────────────────
  { cat: 'Kits', brand: 'SCA Tech', name: 'Residential Solar System', desc: 'Complete on-grid solar system for homes. Includes GoodWe inverter and TOPCon panels.', badge: 'Complete', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80&auto=format&fit=crop' },
  { cat: 'Kits', brand: 'SCA Tech', name: 'Commercial Solar System', desc: 'Full custom design solar system for commercial setups. Complete end-to-end installation.', badge: 'Industrial', img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80&auto=format&fit=crop' },
]

const cats = ['All', 'Solar Panels', 'Inverters', 'Kits']

export default function ProductsPageClient() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? allProducts : allProducts.filter(p => p.cat === active)

  return (
    <div className="pt-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }]} />
      {/* Hero */}
      <div className="py-20 md:py-28 bg-night-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag">Product Range</p>
          <h1 className="font-black text-night-900 leading-tight mt-2 mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
            GoodWe Inverters & TOPCon Solar Panels<br /><span className="font-light text-night-400">Across India.</span>
          </h1>
          <p className="text-night-500 max-w-xl text-lg leading-relaxed">
            We install only internationally certified Tier 1 solar products. Every brand in our range is selected for quality, reliability and long-term performance.
          </p>
        </div>
      </div>

      {/* Filter + grid */}
      <div className="py-16 max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <Filter className="w-4 h-4 text-night-400" />
          {cats.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === cat ? 'bg-night-900 text-white' : 'bg-white border border-night-200 text-night-600 hover:border-night-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <Link href="/contact" key={i} className="bg-white rounded-2xl overflow-hidden border border-night-100 card-hover group block">
              <div className="relative h-48 overflow-hidden bg-night-50">
                <img src={p.img} alt={`${p.name} — available across India`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" width="600" height="400" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-night-900 text-white text-xs font-bold">{p.badge}</span>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-night-400 tracking-wider uppercase mb-1">{p.brand}</p>
                <h3 className="font-bold text-night-900 text-lg mb-2">{p.name}</h3>
                <p className="text-sm text-night-500 leading-relaxed">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-night-950 rounded-3xl p-10 text-center">
          <p className="text-white font-black text-3xl md:text-4xl mb-3">Can&apos;t find what you need?</p>
          <p className="text-night-400 mb-6">We source custom specifications for large commercial and industrial projects.</p>
          <Link href="/contact" className="btn-primary" aria-label="Get a free solar consultation">
            Talk to Our Engineer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
