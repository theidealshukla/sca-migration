export const metadata = {
  title: 'About SCA Tech Solar | Trusted Solar EPC Company India',
  description: 'SCA Tech Solar — India\'s most trusted solar installer since 2008. 2000+ installations, 45 MW deployed. Headquarters: Indore. Offices in: Mumbai, Pune, Jalgaon, Kota.',
  alternates: { canonical: 'https://scatechsolar.com/about' },
};

import React from 'react'

import Link from 'next/link';

import Breadcrumb from '@/components/Breadcrumb'
import { ArrowRight, Sun, Users, Award, Leaf } from 'lucide-react'
import { STATS } from '@/constants/stats';
const team = [
  { name: 'Saurabh Agrawal', role: 'Founder & CEO', img: '/saurabh-agrawal.jpg', bio: '15 years in renewable energy. IIT Indore alum.' },
]


export default function About() {
  return (
    <div className="pt-20">
      
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about' }]} />
      {/* Hero */}
      <div className="relative py-8 md:py-12 overflow-hidden bg-night-950">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1200&q=80&auto=format&fit=crop" 
            srcSet="
              https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=640&q=75&auto=format&fit=crop 640w,
              https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1024&q=80&auto=format&fit=crop 1024w,
              https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1200&q=80&auto=format&fit=crop 1200w
            "
            sizes="100vw"
            alt="About SCA Tech Solar - India's Trusted Solar Company" 
            className="w-full h-full object-cover opacity-30" 
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag text-solar-400 mb-2 mt-4">About SCA Tech Solar</p>
          <h1 className="font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
            About SCA Tech Solar —<br />
            <span className="gradient-text-solar font-display italic">Your Trusted Solar Partner.</span>
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
                  SCA Tech Solar was founded with a clear vision: to make solar energy accessible, reliable and affordable for every home and business. 
                </p>
                <p>
                  Seeing the gap in quality installations and genuine after-sales support, our founding engineers set out to build a company that puts engineering ethics first. We introduced global Tier-1 inverter technologies and advanced high-efficiency panels to the Indian market when others were still pushing outdated technologies.
                </p>
                <p>
                  Today we're your trusted solar partner, having delivered over 45 MW of clean capacity across 2,000+ projects. Headquarters: Indore. Offices in: Mumbai, Pune, Jalgaon, Kota.
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



          {/* Vision statement */}
          <div className="mt-24 pt-16 border-t border-night-100">
            <div className="max-w-4xl">
              <p className="section-tag">Our Vision · 2030</p>
              <p className="text-night-900 font-black leading-tight" style={{ fontSize: 'clamp(1.4rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
                <span className="text-night-400 font-light">SCA Tech aims to power</span> 2,000 homes with clean, affordable solar by 2030.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Engine Section */}
      <div className="py-24 bg-night-950 text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-solar-500/20 to-transparent rounded-3xl transform -translate-x-3 translate-y-3 md:-translate-x-4 md:translate-y-4 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format" 
                alt="Solar as a Profit Engine" 
                className="relative rounded-3xl w-full h-[500px] md:h-[600px] object-cover border border-night-800/50 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="section-tag text-solar-400 mb-4 tracking-widest uppercase text-xs font-bold">Our Philosophy</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-tight">
                We Treat Solar as a Profit Engine, <span className="font-light italic text-solar-400">Not Just Technology.</span>
              </h2>
              <p className="text-night-200 text-lg leading-relaxed mb-10">
                Solar is more than just panels on a roof — it’s a powerful financial tool designed to multiply your savings year after year. Our core mission is to deliver the absolute best ROI from every solar system we build.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-night-900 border border-night-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-solar-400 font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Compounded Cost Savings</h3>
                    <p className="text-night-400 leading-relaxed">We utilize top-tier tech and meticulous long-term planning to ensure minimal maintenance, maximizing your ongoing, compounded financial returns.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-night-900 border border-night-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-solar-400 font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Uncovering Hidden Value</h3>
                    <p className="text-night-400 leading-relaxed">We go far beyond standard installations. Our energy experts analyze your electricity bills line by line to uncover and capture hidden savings.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-night-900 border border-night-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-solar-400 font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">The Ultimate Outcome</h3>
                    <p className="text-night-400 leading-relaxed">A comprehensive, future-proof savings model that drastically boosts your bottom line, protects against rising grid costs, and ensures long-term sustainability.</p>
                  </div>
                </div>
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
          <Link href="/contact" aria-label="Book free solar survey anywhere in India" className="inline-flex items-center gap-2 bg-white text-solar-700 font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300">
            Book Free Survey <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
