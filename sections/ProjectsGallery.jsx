"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Zap, ArrowUpRight, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ProjectsGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(5); // Show top 5 latest projects for grid aesthetics
        
      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }
    loadProjects();
  }, []);
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-tag">Latest Projects</p>
            <h2 className="font-black text-night-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.03em' }}>
              Solar System Installation{' '}
              <span className="font-light text-night-400">Across India.</span>
            </h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-night-900 whitespace-nowrap group self-start md:self-auto">
            All projects
            <span className="w-9 h-9 rounded-full border-2 border-night-200 flex items-center justify-center group-hover:bg-night-900 group-hover:border-night-900 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Masonry-style grid */}
        {/* Masonry-style grid */}
        {loading ? (
          <div className="flex justify-center items-center h-[400px] w-full bg-[#FAFAFA] rounded-2xl border border-dashed border-[#EBEBEB]">
            <Loader2 className="w-8 h-8 animate-spin text-solar-500" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] w-full text-night-400 bg-[#FAFAFA] rounded-2xl border border-dashed border-[#EBEBEB]">
            <p className="text-sm font-semibold">Our latest projects are currently being updated.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] gap-4">
            {projects.map((p, i) => {
              // Dynamically set the first item as the large hero block in the masonry grid
              const spanClass = i === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1';
              
              return (
                <div key={p.id || i} className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-[#EBEBEB] shadow-sm ${spanClass}`}>
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={`${p.title} - ${p.type} solar installation in ${p.location}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#FAFAFA] text-night-300">No Image provided</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {p.type && <p className="text-xs font-bold text-white/70 tracking-wider uppercase mb-1">{p.type}</p>}
                        <h3 className="text-white font-black text-base md:text-lg leading-tight drop-shadow-md">{p.title}</h3>
                        {p.location && (
                          <div className="flex items-center gap-1 mt-1.5 opacity-80">
                            <MapPin className="w-3 h-3 text-white" />
                            <p className="text-white text-xs">{p.location}</p>
                          </div>
                        )}
                      </div>
                      {p.capacity && (
                        <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-1.5 flex-shrink-0 shadow-lg border border-white/20">
                          <Zap className="w-3 h-3 text-solar-500" />
                          <span className="text-night-900 text-xs font-black">{p.capacity}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 group-hover:bg-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-sm">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-night-900 transition-colors duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
