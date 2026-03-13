import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEOHead } from '../utils/seo'
import { MapPin, Zap, Calendar, ArrowRight } from 'lucide-react'

const projects = [
  { title: 'Pithampur Industrial Plant', location: 'Pithampur, Indore', type: 'Industrial', capacity: '2.5 MW', year: '2023', saving: '₹3.2Cr/yr', img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=700&q=85&auto=format' },
  { title: 'Agarwal Textile Mills', location: 'Rau, Indore', type: 'Commercial', capacity: '200 kW', year: '2023', saving: '₹33L/yr', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=700&q=85&auto=format' },
  { title: 'Scheme 78 Housing Society', location: 'Scheme 78, Indore', type: 'Residential', capacity: '48 kW', year: '2022', saving: '₹8L/yr', img: 'https://images.unsplash.com/photo-1615400610825-7f1b9d573c09?w=700&q=85&auto=format' },
  { title: 'Bombay Hospital', location: 'Indore', type: 'Commercial', capacity: '150 kW', year: '2022', saving: '₹24L/yr', img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=85&auto=format' },
  { title: 'Daly College Rooftop', location: 'Indore', type: 'Educational', capacity: '100 kW', year: '2022', saving: '₹16L/yr', img: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=700&q=85&auto=format' },
  { title: 'Bhopal IT Park', location: 'Bhopal, MP', type: 'Commercial', capacity: '300 kW', year: '2023', saving: '₹48L/yr', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&auto=format' },
  { title: 'Cold Storage Complex', location: 'Dewas, MP', type: 'Industrial', capacity: '500 kW', year: '2023', saving: '₹80L/yr', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=85&auto=format' },
  { title: 'Annapurna Road Villa', location: 'Indore', type: 'Residential', capacity: '5 kW', year: '2024', saving: '₹60K/yr', img: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=700&q=85&auto=format' },
  { title: 'Ujjain Temple Complex', location: 'Ujjain, MP', type: 'Religious', capacity: '30 kW', year: '2024', saving: '₹5L/yr', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&q=85&auto=format' },
]

const types = ['All', 'Residential', 'Commercial', 'Industrial', 'Educational', 'Religious']

const typeColors = {
  Industrial: 'bg-night-700',
  Commercial: 'bg-night-600',
  Residential: 'bg-night-500',
  Educational: 'bg-night-700',
  Religious: 'bg-night-800',
}

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.type === active)

  return (
    <div className="pt-20">
      <SEOHead
        title="Solar Installation Projects in Indore & MP | SCA Tech Solar Portfolio"
        description="View completed solar projects across Indore, Bhopal, Pithampur, Dewas and Central India. Residential, commercial and industrial installations by SCA Tech."
        path="/projects"
      />
      {/* Hero */}
      <div className="relative py-24 bg-night-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag">Our Portfolio</p>
          <h1 className="font-black text-night-900 leading-tight mt-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', letterSpacing: '-0.03em' }}>
            Solar Installation Projects<br />
            <span className="font-light text-night-400">in Indore & MP.</span>
          </h1>
        </div>
        {/* Big text background */}
        <div className="overflow-hidden mt-8">
          <p className="font-black text-night-200 leading-none whitespace-nowrap select-none" style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', letterSpacing: '-0.04em' }}>
            PROJECTS · PORTFOLIO · PROOF ·
          </p>
        </div>
      </div>

      {/* Projects */}
      <div className="py-16 max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-wrap gap-2 mb-10">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === t ? 'bg-night-900 text-white' : 'bg-white border border-night-200 text-night-600 hover:border-night-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white border border-night-100 card-hover group">
              <div className="relative h-52 overflow-hidden">
                <img src={p.img} alt={`${p.title} ${p.type} solar installation ${p.location}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-bold ${typeColors[p.type] || 'bg-night-500'}`}>{p.type}</span>
                <div className="absolute top-3 right-3 bg-night-950/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-white/60" />
                  <span className="text-white text-xs font-black">{p.capacity}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-black text-night-900 text-lg mb-2">{p.title}</h3>
                <div className="flex items-center gap-4 text-xs text-night-400 mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-night-400">Annual savings</p>
                    <p className="text-xl font-black text-night-900">{p.saving}</p>
                  </div>
                  <Link to="/contact" className="btn-primary text-xs py-2 px-4">
                    Similar Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-night-500 mb-6">Want a project like one of these?</p>
          <Link to="/contact" className="btn-primary" aria-label="Book free solar survey in Indore">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
