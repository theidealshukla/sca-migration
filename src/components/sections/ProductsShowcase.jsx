"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from '@/constants/products';

export default function ProductsShowcase() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PRODUCTS_DATA.slice(0, 6) : PRODUCTS_DATA.filter(p => p.category === active);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-night-400 mb-4">
              <div className="w-6 h-px bg-night-400" />
              <span>Our Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-night-900 leading-tight tracking-tight">
              End-to-End EPC{' '}
              <span className="text-night-300">& Clean Energy Solutions.</span>
            </h2>
          </div>
          <Link href="/products" className="btn-outline self-start md:self-auto whitespace-nowrap hidden md:inline-flex">
            All Solutions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {PRODUCT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === cat
                  ? 'bg-night-900 text-white shadow-lg'
                  : 'bg-night-50 border border-night-100 text-night-600 hover:border-night-300 hover:bg-night-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.id} className="group block">
                {/* Image */}
                <div className="bg-night-50 rounded-2xl aspect-[4/3] mb-5 overflow-hidden relative border border-night-100/50 shadow-sm">
                  <img
                    src={p.image_url}
                    alt={p.title + ' — by ASA EPC'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase text-night-900 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {p.category}
                  </div>
                </div>
                {/* Text */}
                <div className="flex items-center gap-2 mb-1.5">
                  {Icon && <Icon className="w-4 h-4 text-solar-500" />}
                  <h3 className="text-lg md:text-xl font-bold text-night-900 group-hover:text-night-600 transition-colors duration-300">{p.title}</h3>
                </div>
                <p className="text-night-400 text-sm leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                <ul className="space-y-1">
                  {p.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-night-500">
                      <CheckCircle2 className="w-3 h-3 text-solar-500 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 md:hidden flex justify-center">
          <Link href="/products" className="btn-outline w-full justify-center">
            All Solutions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
