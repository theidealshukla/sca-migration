export const metadata = {
  title: 'About SCA Tech Solar | Trusted Solar EPC Company Indore',
  description: 'SCA Tech Solar — Indore\'s most trusted solar installer since 2008. 2000+ installations, 45 MW deployed across Madhya Pradesh.',
  alternates: { canonical: 'https://scatechsolar.com/about' },
};

import React from 'react'

import Link from 'next/link';

import Breadcrumb from '../../components/Breadcrumb'
import { ArrowRight, Sun, Users, Award, Leaf } from 'lucide-react'

const team = [
  { name: 'Vikram Suryavanshi', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format', bio: '15 years in renewable energy. IIT Indore alum.' },
  { name: 'Neha Jain', role: 'Head of Engineering', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format', bio: 'Ex-NTPC, leads all technical installations.' },
  { name: 'Rohit Patel', role: 'Director, Sales & Subsidy', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format', bio: 'Expert in DISCOM liaising and PM Surya Ghar.' },
  { name: 'Kavita Sharma', role: 'Head of Customer Success', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format', bio: 'Ensures every client gets maximum value.' },
]

const milestones = [
  { year: '2008', event: 'Founded in Indore with a 5-person team and a dream to power MP with solar.' },
  { year: '2015', event: 'Crossed 100 installations. First commercial project — a 50kW factory in Pithampur.' },
  { year: '2018', event: '500 installations milestone. Expanded to Bhopal and Ujjain.' },
  { year: '2020', event: 'Launched proprietary monitoring platform and 24/7 O&M service.' },
  { year: '2022', event: 'Crossed 1,000 installations. Entered industrial & ground-mount segment.' },
  { year: '2024', event: "2,000+ installations. 45 MW total capacity. MP's #1 solar installer." },
]

export default function About() {
  return (
    <div className="pt-20">
      
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about' }]} />
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end overflow-hidden bg-night-950">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1200&q=80&auto=format&fit=crop" 
            srcSet="
              https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=640&q=75&auto=format&fit=crop 640w,
              https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1024&q=80&auto=format&fit=crop 1024w,
              https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1200&q=80&auto=format&fit=crop 1200w
            "
            sizes="100vw"
            alt="About SCA Tech Solar - Indore's Trusted Solar Company" 
            className="w-full h-full object-cover opacity-30" 
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pb-20">
          <p className="section-tag text-solar-400 mb-3">About SCA Tech Solar</p>
          <h1 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}>
            About SCA Tech Solar —<br />
            <span className="gradient-text-solar font-display italic">Indore's Trusted Solar Company.</span>
          </h1>
        </div>
      </div>

      {/* Mission */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="section-tag">Our Mission</p>
              <h2 className="text-3xl font-black text-night-900 mb-6">How It Started</h2>
              <div className="text-night-500 leading-relaxed text-[15px] space-y-4">
                <p>
                  SCA Tech Solar was founded with a clear vision: to make solar energy accessible, reliable and affordable for every home and business in Madhya Pradesh. 
                </p>
                <p>
                  Seeing the gap in quality installations and genuine after-sales support, our founding engineers set out to build a company that puts engineering ethics first. We introduced global Tier-1 brands like GoodWe and TOPCon to the local market when others were still pushing outdated technologies.
                </p>
                <p>
                  Today we're Madhya Pradesh's most trusted solar installer, having delivered over 45 MW of clean capacity across 2,000+ projects. But our work is just beginning.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Sun, label: 'Installations', value: '2,000+', color: 'bg-solar-50 border-solar-100', iconColor: 'text-solar-500' },
                { icon: Leaf, label: 'CO₂ Offset/Year', value: '15,000 T', color: 'bg-green-50 border-green-100', iconColor: 'text-green-500' },
                { icon: Users, label: 'Happy Families', value: '1,100+', color: 'bg-sky-50 border-sky-100', iconColor: 'text-sky-500' },
                { icon: Award, label: 'Years Experience', value: '16+', color: 'bg-purple-50 border-purple-100', iconColor: 'text-purple-500' },
              ].map(({ icon: Icon, label, value, color, iconColor }) => (
                <div key={label} className={`rounded-2xl border p-6 ${color}`}>
                  <Icon className={`w-6 h-6 mb-3 ${iconColor}`} />
                  <p className="text-3xl font-black text-night-900">{value}</p>
                  <p className="text-sm text-night-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="section-tag mb-8">Our Journey</p>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-night-200" />
              <div className="flex flex-col gap-8">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-8 pl-4">
                    <div className="relative flex-shrink-0 w-24 text-right">
                      <span className="text-sm font-black text-solar-500">{m.year}</span>
                      <div className="absolute right-[-29px] top-1 w-3 h-3 rounded-full bg-solar-500 border-2 border-white" />
                    </div>
                    <p className="text-night-600 pt-0.5 leading-relaxed">{m.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 bg-night-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag">The Team</p>
          <h2 className="font-black text-night-900 leading-tight mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}>
            The people behind India's cleanest installations.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-night-100 card-hover group">
                <div className="h-52 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="400" height="400" />
                </div>
                <div className="p-5">
                  <h3 className="font-black text-night-900">{member.name}</h3>
                  <p className="text-solar-600 text-sm font-semibold mt-0.5 mb-2">{member.role}</p>
                  <p className="text-night-500 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-solar-500">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-black text-white text-4xl md:text-5xl mb-5">Ready to join the solar revolution?</h2>
          <p className="text-solar-100 text-lg mb-8">Get your free site survey and custom quote today. No commitment required.</p>
          <Link href="/contact" aria-label="Book free solar survey in Indore" className="inline-flex items-center gap-2 bg-white text-solar-700 font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300">
            Book Free Survey <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
