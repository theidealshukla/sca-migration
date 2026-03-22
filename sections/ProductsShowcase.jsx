"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const categories = ['All', 'Solar Panels', 'Batteries', 'Water Heaters', 'Inverters'];

export default function ProductsShowcase() {
  const [active, setActive] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLiveProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        // You can add .order('order_index', { ascending: true }) if you utilize the order_index column
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    loadLiveProducts();
  }, []);

  const filtered = active === 'All' ? products : products.filter(p => p.category === active)

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-night-400 mb-4">
              <div className="w-6 h-px bg-night-400" />
              <span>Our Products</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-night-900 leading-tight tracking-tight">
              GoodWe Inverter Installation{' '}
              <span className="text-night-300">Across India.</span>
            </h2>
          </div>
          <Link href="/products" className="btn-outline self-start md:self-auto whitespace-nowrap hidden md:inline-flex">
            All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
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

        {/* Product grid — clean minimal cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <Loader2 className="w-8 h-8 animate-spin text-solar-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-night-400 bg-night-50 rounded-2xl border border-dashed border-night-200">
            <p className="text-sm font-semibold">No products currently available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((p, i) => (
              <Link href={`/products/${p.slug}`} key={i} className="group block">
                {/* Image */}
                <div className="bg-night-50 rounded-2xl aspect-[4/3] mb-5 overflow-hidden relative border border-night-100/50 shadow-sm">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.title + ' — available across India'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-night-300">No Image</div>
                  )}
                  {/* Category pill on hover */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase text-night-900 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {p.category || 'Product'}
                  </div>
                </div>
                {/* Text */}
                <h3 className="text-lg md:text-xl font-bold text-night-900 mb-1.5 group-hover:text-night-600 transition-colors duration-300">{p.title}</h3>
                <p className="text-night-400 text-sm leading-relaxed line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-12 md:hidden flex justify-center">
          <Link href="/products" className="btn-outline w-full justify-center">
            All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
