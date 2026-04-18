export const metadata = {
  title: 'About ASA EPC Pvt. Ltd. | Trusted Solar EPC Company India',
  description: 'ASA EPC Pvt. Ltd. — DPIIT-recognized solar EPC company since 2018. 100+ projects, 50 MW deployed. Headquartered in Bhopal, MP. International office in Dubai, UAE.',
  alternates: { canonical: 'https://www.asa-epc.com/about' },
};

import React from 'react'

import Link from 'next/link';

import Breadcrumb from '@/components/Breadcrumb'
import { ArrowRight, Sun, Users, Award, Leaf } from 'lucide-react'
import { STATS } from '@/constants/stats';
const team = [
  { name: 'Ashutosh Pandey', role: 'India Founder', qualification: 'B.E, EEE', exp: '16+ years', img: '/images/team/mr.ashutosh.jpg', bio: 'B.E, EEE, 16+ years experience. Global operations expert specializing in large-scale energy infrastructure and strategic leadership.' },
  { name: 'Pushpraj Singh Chouhan', role: 'India Founder', qualification: 'B.E, ME', exp: '16+ years', img: '/images/team/pushpraj.jpg', bio: 'B.E, ME, 16+ years experience. Expert in mechanical engineering and project management for complex renewable energy systems.' },
  { name: 'Kunal Choudhary', role: 'Founder & Director Middle East', qualification: 'B.E, ECE', exp: '16+ years', img: '/images/team/kunal.png', bio: 'B.E, ECE, 16+ years experience. Director Middle East UAE & Founder ASA PUMPS TRADING LLC, driving international growth and technical innovation.' },
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
            alt="About ASA EPC - India's Trusted Solar EPC Company"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag text-solar-400 mb-2 mt-4">About ASA EPC</p>
          <h1 className="font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
            About ASA EPC —<br />
            <span className="gradient-text-solar font-display italic">Your Trusted EPC Partner.</span>
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
                  ASA EPC Pvt. Ltd. was incorporated in 2018 with a clear vision: delivering exceptional, economical, and eco-friendly energy solutions. Founded by Ashutosh Pandey, Pushpraj Singh Chouhan, and Kunal Choudhary, each bringing 16+ years of industry experience.
                </p>
                <p>
                  We are a DPIIT-recognized Startup India company and an authorized Waaree Energies Limited franchisee partner for Bhopal, Madhya Pradesh. Our expertise spans the complete EPC lifecycle — from solar power plants and transmission lines to substations, BESS, Green Hydrogen, and integrated asset management.
                </p>
                <p>
                  Today we operate across India with projects in Madhya Pradesh, Rajasthan, Delhi, Tamilnadu, and internationally through our Dubai, UAE office (ASA PUMPS TRADING LLC). 100+ projects delivered. 50+ MW deployed.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Sun, label: 'Projects Delivered', value: '100+', color: 'bg-solar-50 border-solar-100', iconColor: 'text-solar-500' },
                { icon: Leaf, label: 'Clean Energy', value: '50 MW', color: 'bg-green-50 border-green-100', iconColor: 'text-green-500' },
                { icon: Users, label: 'Service Areas', value: '5 States', color: 'bg-sky-50 border-sky-100', iconColor: 'text-sky-500' },
                { icon: Award, label: 'Years Experience', value: '7+', color: 'bg-purple-50 border-purple-100', iconColor: 'text-purple-500' },
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
                <span className="text-night-400 font-light">ASA EPC aims to become</span> India's leading integrated renewable energy EPC company by 2030.
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
                alt="ASA EPC Comprehensive EPC Solutions"
                className="relative rounded-3xl w-full h-[500px] md:h-[600px] object-cover border border-night-800/50 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="section-tag text-solar-400 mb-4 tracking-widest uppercase text-xs font-bold">Our Philosophy</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-tight">
                Exceptional. Economical. <span className="font-light italic text-solar-400">Eco-Friendly.</span>
              </h2>
              <p className="text-night-200 text-lg leading-relaxed mb-10">
                Every project we undertake reflects our focus on quality, honest work, and customer trust. We believe in delivering solutions that maximize value while minimizing environmental impact.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-night-900 border border-night-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-solar-400 font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">End-to-End EPC Execution</h3>
                    <p className="text-night-400 leading-relaxed">From site survey and design to procurement, erection, testing, and commissioning — we handle the complete project lifecycle under one roof.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-night-900 border border-night-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-solar-400 font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Regulatory Expertise</h3>
                    <p className="text-night-400 leading-relaxed">We navigate complex government approvals, regulatory compliance, and liaisoning — minimizing delays and ensuring smooth project execution.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-night-900 border border-night-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-solar-400 font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Integrated Asset Management</h3>
                    <p className="text-night-400 leading-relaxed">Ongoing O&M, energy audits, and real-time performance monitoring ensure your power infrastructure operates at peak efficiency for decades.</p>
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
          <p className="section-tag">Our Founders</p>
          <h2 className="font-black text-night-900 leading-tight mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}>
            The people behind India's cleanest energy projects.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-night-100 card-hover group">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-night-900/5 group-hover:bg-transparent transition-colors z-10" />
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" width="400" height="400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-solar-500 bg-solar-50 px-2 py-1 rounded-md">{member.qualification}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-night-500 bg-night-50 px-2 py-1 rounded-md">{member.exp} EXP</span>
                  </div>
                  <h3 className="font-black text-night-900 text-xl">{member.name}</h3>
                  <p className="text-solar-600 text-sm font-semibold mt-0.5 mb-4">{member.role}</p>
                  <p className="text-night-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-solar-500">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-black text-white text-4xl md:text-5xl mb-5">Ready to power your next project?</h2>
          <p className="text-solar-100 text-lg mb-8">Get a free consultation and detailed project proposal. No commitment required.</p>
          <Link href="/contact" aria-label="Get free consultation from ASA EPC" className="inline-flex items-center gap-2 bg-white text-solar-700 font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300">
            Get Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
