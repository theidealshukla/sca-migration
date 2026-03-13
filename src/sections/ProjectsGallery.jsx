import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Zap, ArrowUpRight, ArrowRight } from 'lucide-react'

const projects = [
  {
    title: 'Megawatt Capacity',
    location: 'Pithampur Industrial Estate',
    type: 'Industrial',
    capacity: '2.5 MW',
    img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=85&auto=format',
    span: 'col-span-2 row-span-2',
  },
  {
    title: 'Increasing Productivity',
    location: 'Rau, Indore',
    type: 'Commercial',
    capacity: '150 kW',
    img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=85&auto=format',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Solar Panel Service',
    location: 'Vijay Nagar, Indore',
    type: 'Residential',
    capacity: '5 kW',
    img: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=600&q=85&auto=format',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Noble Area Housing',
    location: 'Scheme 78, Indore',
    type: 'Residential',
    capacity: '48 kW',
    img: 'https://images.unsplash.com/photo-1615400610825-7f1b9d573c09?w=600&q=85&auto=format',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'A Responsible Corporate',
    location: 'Bhopal, MP',
    type: 'Commercial',
    capacity: '300 kW',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=85&auto=format',
    span: 'col-span-1 row-span-1',
  },
]

export default function ProjectsGallery() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-tag">Latest Projects</p>
            <h2 className="font-black text-night-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.03em' }}>
              Solar System Installation{' '}
              <span className="font-light text-night-400">Projects in Indore.</span>
            </h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-night-900 whitespace-nowrap group self-start md:self-auto">
            All projects
            <span className="w-9 h-9 rounded-full border-2 border-night-200 flex items-center justify-center group-hover:bg-night-900 group-hover:border-night-900 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] gap-4">
          {projects.map((p, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden group cursor-pointer ${p.span}`}>
              <img
                src={p.img}
                alt={`${p.title} - ${p.type} solar installation in ${p.location}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-white/50 tracking-wider uppercase mb-1">{p.type}</p>
                    <h3 className="text-white font-black text-base md:text-lg leading-tight">{p.title}</h3>
                    <div className="flex items-center gap-1 mt-1.5">
                      <MapPin className="w-3 h-3 text-white/40" />
                      <p className="text-white/50 text-xs">{p.location}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-1.5 flex-shrink-0">
                    <Zap className="w-3 h-3 text-night-900" />
                    <span className="text-night-900 text-xs font-black">{p.capacity}</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tag row */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {['Megawatt Capacity', 'Increasing Productivity', 'Solar Panel Service', 'Noble Area', 'A Responsible Corporate'].map((tag, i) => (
            <span key={i} className="px-4 py-2 rounded-full border border-night-200 text-night-500 text-sm font-medium hover:bg-night-900 hover:text-white hover:border-night-900 transition-all duration-300 cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
