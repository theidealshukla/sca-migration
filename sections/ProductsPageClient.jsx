"use client";

import React, { useState, useEffect } from 'react'

import Link from 'next/link';

import Breadcrumb from '../components/Breadcrumb'
import { ArrowRight, Filter, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase';

const cats = ['All', 'Solar Panels', 'Inverters', 'Kits', 'Batteries', 'Water Heaters'];

export default function ProductsPageClient() {
  const [active, setActive] = useState('All')
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setAllProducts(data);
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  const filtered = active === 'All' ? allProducts : allProducts.filter(p => p.category === active)

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

        {loading ? (
          <div className="flex justify-center items-center h-[300px] w-full bg-[#FAFAFA] rounded-2xl border border-dashed border-[#EBEBEB]">
            <Loader2 className="w-8 h-8 animate-spin text-solar-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] w-full text-night-400 bg-[#FAFAFA] rounded-2xl border border-dashed border-[#EBEBEB]">
            <p className="text-sm font-semibold">No products found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <Link href={`/products/${p.slug || ''}`} key={p.id || i} className="bg-white rounded-2xl overflow-hidden border border-night-100 card-hover group block">
                <div className="relative h-48 overflow-hidden bg-night-50">
                  {p.image_url ? (
                    <img src={p.image_url} alt={`${p.title} — available across India`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-night-300 text-sm">No Image</div>
                  )}
                  {p.is_published && <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 bg-opacity-90 text-[10px] uppercase tracking-wider font-bold">Live</span>}
                  {p.category && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-night-900 text-white text-[10px] tracking-wider uppercase font-bold shadow-md">{p.category}</span>}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-night-900 text-lg mb-2 line-clamp-1">{p.title}</h3>
                  <p className="text-sm text-night-500 leading-relaxed line-clamp-2">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

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
