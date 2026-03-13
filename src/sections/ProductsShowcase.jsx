import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const categories = ['All', 'Solar Panels', 'Batteries', 'Water Heaters', 'Inverters']

const products = [
  // ─── Solar Panels ────────────────────────────────────────────────
  {
    category: 'Solar Panels',
    name: 'LONGi Hi-MO 7 Series 545W',
    desc: 'Bifacial HPBC technology for maximum energy yield on residential rooftops.',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'Solar Panels',
    name: 'Jinko Tiger Neo N-Type 580W',
    desc: 'Premium N-Type cells delivering industry-leading efficiency for commercial installations.',
    img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'Solar Panels',
    name: 'Waaree Navitas 530W',
    desc: 'Made-in-India monocrystalline panels built for extreme Indian weather conditions.',
    img: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=600&q=80&auto=format&fit=crop',
  },
  // ─── Batteries ────────────────────────────────────────────────────
  {
    category: 'Batteries',
    name: 'Livguard LiFePO4 5.12 kWh',
    desc: '6000+ cycle lithium iron phosphate battery with BMS and mobile monitoring.',
    img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'Batteries',
    name: 'Luminous NXT+ 3.5 kWh',
    desc: 'Smart, wall-mounted storage with modular expansion up to 14 kWh.',
    img: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'Batteries',
    name: 'Exide IntelliG 10 kWh',
    desc: 'Heavy-duty industrial-grade backup system for solar + grid hybrid setups.',
    img: 'https://images.unsplash.com/photo-1615400610825-7f1b9d573c09?w=600&q=80&auto=format&fit=crop',
  },
  // ─── Water Heaters ────────────────────────────────────────────────
  {
    category: 'Water Heaters',
    name: 'AquaSun ETC 200 LPD',
    desc: 'Evacuated Tube Collector providing 24×7 hot water for households of 4-6 people.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'Water Heaters',
    name: 'ThermoMax FPC 300 LPD',
    desc: 'Flat Plate Collector technology ideal for large families and commercial buildings.',
    img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80&auto=format&fit=crop',
  },
  // ─── Inverters ────────────────────────────────────────────────────
  {
    category: 'Inverters',
    name: 'Solis S6 Pro 5kW',
    desc: 'Intelligent on-grid string inverter with built-in Wi-Fi monitoring and dual MPPT.',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'Inverters',
    name: 'GoodWe ET Plus Hybrid 5kW',
    desc: 'Premium hybrid inverter supporting solar, battery, and grid simultaneously.',
    img: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80&auto=format&fit=crop',
  },
  {
    category: 'Inverters',
    name: 'Havells Solero 10kW',
    desc: 'Commercial-grade three-phase inverter for large rooftop and ground-mount systems.',
    img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80&auto=format&fit=crop',
  },
]

export default function ProductsShowcase() {
  const [active, setActive] = useState('All')
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
              <span className="text-night-300">Indore.</span>
            </h2>
          </div>
          <Link to="/products" className="btn-outline self-start md:self-auto whitespace-nowrap hidden md:inline-flex">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((p, i) => (
            <Link to="/contact" key={i} className="group block">
              {/* Image */}
              <div className="bg-night-50 rounded-2xl aspect-[4/3] mb-5 overflow-hidden relative">
                <img
                  src={p.img}
                  alt={p.name + ' available in Indore'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Category pill on hover */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase text-night-900 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {p.category}
                </div>
              </div>
              {/* Text */}
              <h3 className="text-lg md:text-xl font-bold text-night-900 mb-1.5 group-hover:text-night-600 transition-colors duration-300">{p.name}</h3>
              <p className="text-night-400 text-sm leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 md:hidden flex justify-center">
          <Link to="/products" className="btn-outline w-full justify-center">
            All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
