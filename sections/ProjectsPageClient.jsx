"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import { MapPin, Zap, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const types = ['All', 'Residential', 'Commercial', 'Industrial', 'Educational', 'Religious'];

const typeColors = {
  Industrial: 'bg-night-700',
  Commercial: 'bg-night-600',
  Residential: 'bg-night-500',
  Educational: 'bg-night-700',
  Religious: 'bg-night-800',
}

export default function ProjectsPageClient() {
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }
    loadProjects();
  }, []);

  const filtered = active === 'All' ? projects : projects.filter(p => p.type === active);

  return (
    <div className="pt-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Projects', path: '/projects' }]} />
      {/* Hero */}
      <div className="relative py-8 md:py-12 bg-night-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag">Our Portfolio</p>
          <h1 className="font-black text-night-900 leading-tight mt-2" style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
            Solar Installation Projects
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

        {loading ? (
          <div className="flex justify-center items-center h-[350px] w-full bg-[#FAFAFA] rounded-2xl border border-dashed border-[#EBEBEB]">
            <Loader2 className="w-8 h-8 animate-spin text-solar-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[350px] w-full text-night-400 bg-[#FAFAFA] rounded-2xl border border-dashed border-[#EBEBEB]">
            <p className="text-sm font-semibold">No installed projects found under this classification.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <div key={p.id || i} className="rounded-2xl overflow-hidden bg-white border border-night-100 card-hover group">
                <div className="relative h-52 overflow-hidden bg-[#FAFAFA]">
                  {p.image_url ? (
                    <img src={p.image_url} alt={`${p.title} ${p.type} solar installation ${p.location}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-night-300">No Image</div>
                  )}
                  {p.type && <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-bold ${typeColors[p.type] || 'bg-night-500'}`}>{p.type}</span>}
                  {p.capacity && (
                    <div className="absolute top-3 right-3 bg-night-950/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md border border-white/10">
                      <Zap className="w-3 h-3 text-solar-400" />
                      <span className="text-white text-xs font-black">{p.capacity}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-black text-night-900 text-lg mb-2 line-clamp-1">{p.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-night-400 mb-4">
                    {p.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{p.location}</span>}
                    {p.year && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{p.year}</span>}
                  </div>
                  <div className="flex items-center justify-between border-t border-night-50 pt-4">
                    <div>
                      <p className="text-[11px] font-bold tracking-wider uppercase text-night-400 mb-0.5">Annual savings</p>
                      <p className="text-xl font-black text-emerald-600">{p.saving || 'N/A'}</p>
                    </div>
                    <Link href={`/projects/${p.slug || ''}`} className="btn-primary text-xs py-2 px-4 shadow-sm">
                      Case Study
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-night-500 mb-6">Want a project like one of these?</p>
          <Link href="/contact" className="btn-primary" aria-label="Start your solar project">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
