"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb'
import { ArrowRight, Filter, CheckCircle2 } from 'lucide-react'
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from '@/constants/products'

export default function ProductsPageClient() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.category === active)

  return (
    <div className="pt-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Products & Services', path: '/products' }]} />
      {/* Hero */}
      <div className="py-8 md:py-12 bg-night-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag">Our Solutions</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-night-900 leading-[1.1] tracking-tight mb-6">
            Comprehensive EPC Solutions & Clean Energy Products
          </h1>
          <p className="text-night-500 max-w-xl text-base md:text-lg leading-relaxed">
            From ground-mounted solar farms to 765 KV transmission lines, BESS, and Green Hydrogen — we deliver ASA energy solutions across India and UAE.
          </p>
        </div>
      </div>

      {/* Filter + grid */}
      <div className="py-16 max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <Filter className="w-4 h-4 text-night-400" />
          {PRODUCT_CATEGORIES.map(cat => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-night-100 card-hover group flex flex-col">
                <div className="relative h-52 overflow-hidden bg-night-50">
                  <img
                    src={p.image_url}
                    alt={p.title + ' — ASA EPC'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-night-900 text-white text-[10px] tracking-wider uppercase font-bold shadow-md">
                    {p.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {Icon && <Icon className="w-4 h-4 text-solar-500" />}
                    <h3 className="font-bold text-night-900 text-lg line-clamp-1">{p.title}</h3>
                  </div>
                  <p className="text-sm text-night-500 leading-relaxed mb-3">{p.description}</p>
                  <p className="text-xs text-night-400 font-semibold mb-3 border-t border-night-50 pt-3">{p.specs}</p>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-night-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-solar-500 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-night-900 hover:text-solar-600 transition-colors mt-auto">
                    Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-night-950 rounded-3xl p-10 text-center">
          <p className="text-white font-black text-3xl md:text-4xl mb-3">Need a custom solution?</p>
          <p className="text-night-400 mb-6">We design and execute bespoke EPC solutions for large commercial and industrial projects.</p>
          <Link href="/contact" className="btn-primary" aria-label="Get a free EPC consultation">
            Talk to Our Engineer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
