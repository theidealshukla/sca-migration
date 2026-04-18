"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { MapPin, Zap, Calendar, ArrowRight, Star, Activity, Award, Globe } from 'lucide-react';
import { FEATURED_PROJECTS, ONGOING_PROJECTS, COMPLETED_SOLAR_PROJECTS, TRANSMISSION_PROJECTS, PROJECT_STATS } from '@/constants/projects';

const sections = ['Featured', 'Ongoing KUSUM', 'Completed Solar', 'Transmission & Substation'];

export default function ProjectsPageClient() {
  const [activeSection, setActiveSection] = useState('Featured');

  return (
    <div className="pt-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Projects', path: '/projects' }]} />
      {/* Hero */}
      <div className="relative py-8 md:py-12 bg-night-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag">Our Portfolio</p>
          <h1 className="font-black text-night-900 leading-tight mt-2" style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
            Project Portfolio
          </h1>
        </div>
        <div className="overflow-hidden mt-8">
          <p className="font-black text-night-200 leading-none whitespace-nowrap select-none" style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', letterSpacing: '-0.04em' }}>
            PROJECTS · PORTFOLIO · PROOF ·
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-night-950 py-6">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PROJECT_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
                <p className="text-sm text-night-400 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="py-16 max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-wrap gap-2 mb-10">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeSection === s ? 'bg-night-900 text-white' : 'bg-white border border-night-200 text-night-600 hover:border-night-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {activeSection === 'Featured' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_PROJECTS.map((p) => (
              <div key={p.id} className="rounded-2xl overflow-hidden bg-white border border-night-100 card-hover group">
                <div className="relative h-52 overflow-hidden bg-[#FAFAFA]">
                  <img
                    src={p.image_url}
                    alt={`${p.title} \u2014 ${p.location}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-solar-500 text-white text-xs font-bold shadow-md">
                    {p.tag}
                  </span>
                  <div className="absolute top-3 right-3 bg-night-950/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md border border-white/10">
                    <Zap className="w-3 h-3 text-solar-400" />
                    <span className="text-white text-xs font-black">{p.capacity}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-night-900 text-lg mb-2 line-clamp-1">{p.title}</h3>
                  <p className="text-sm text-night-500 leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-4 text-xs text-night-400 mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{p.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{p.year}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-night-50 pt-4">
                    <span className="text-xs font-bold text-night-400 uppercase tracking-wider">{p.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ongoing KUSUM Projects */}
        {activeSection === 'Ongoing KUSUM' && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-solar-500" />
              <h2 className="text-xl font-black text-night-900">Ongoing KUSUM Solar Projects</h2>
              <span className="ml-auto text-xs font-bold text-night-400 bg-night-100 px-3 py-1 rounded-full">{ONGOING_PROJECTS.length} Active</span>
            </div>
            <div className="bg-white rounded-2xl border border-night-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-night-50 border-b border-night-100">
                    <tr>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Project</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Capacity</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Location</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-night-50">
                    {ONGOING_PROJECTS.map((p, i) => (
                      <tr key={i} className="hover:bg-night-50/50 transition-colors">
                        <td className="px-5 py-4 text-sm font-semibold text-night-900 max-w-xs">{p.title}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-solar-600 bg-solar-50 px-2 py-1 rounded">
                            <Zap className="w-3 h-3" />{p.capacity}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-night-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Completed Solar Projects */}
        {activeSection === 'Completed Solar' && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-solar-500" />
              <h2 className="text-xl font-black text-night-900">Completed Solar Projects</h2>
              <span className="ml-auto text-xs font-bold text-night-400 bg-night-100 px-3 py-1 rounded-full">{COMPLETED_SOLAR_PROJECTS.length} Completed</span>
            </div>
            <div className="bg-white rounded-2xl border border-night-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-night-50 border-b border-night-100">
                    <tr>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Project</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Capacity</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Location</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-night-50">
                    {COMPLETED_SOLAR_PROJECTS.map((p, i) => (
                      <tr key={i} className="hover:bg-night-50/50 transition-colors">
                        <td className="px-5 py-4 text-sm font-semibold text-night-900 max-w-xs">{p.title}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-night-700 bg-night-100 px-2 py-1 rounded">
                            <Zap className="w-3 h-3" />{p.capacity}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-night-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                        </td>
                        <td className="px-5 py-4 text-sm font-medium text-night-600">{p.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transmission & Substation */}
        {activeSection === 'Transmission & Substation' && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-solar-500" />
              <h2 className="text-xl font-black text-night-900">Transmission Line & Substation Projects</h2>
              <span className="ml-auto text-xs font-bold text-night-400 bg-night-100 px-3 py-1 rounded-full">{TRANSMISSION_PROJECTS.length} Completed</span>
            </div>
            <div className="bg-white rounded-2xl border border-night-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-night-50 border-b border-night-100">
                    <tr>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Project</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Capacity</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Location</th>
                      <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-night-50">
                    {TRANSMISSION_PROJECTS.map((p, i) => (
                      <tr key={i} className="hover:bg-night-50/50 transition-colors">
                        <td className="px-5 py-4 text-sm font-semibold text-night-900 max-w-xs">{p.title}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded">
                            <Zap className="w-3 h-3" />{p.capacity}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-night-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                        </td>
                        <td className="px-5 py-4 text-sm font-medium text-night-600">{p.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-night-500 mb-6">Want a project like one of these?</p>
          <Link href="/contact" className="btn-primary" aria-label="Start your project with ASA EPC">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
