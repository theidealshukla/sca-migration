export const metadata = {
  title: 'Solar Installation Services | SCA Tech Solar',
  description: 'Residential, commercial and industrial solar installation services. PM Surya Ghar subsidy processing included at no extra cost.',
  alternates: { canonical: 'https://scatechsolar.com/services' },
};

import React from 'react'

import Link from 'next/link';

import Breadcrumb from '@/components/Breadcrumb'
import SlowVideo from '@/components/SlowVideo'
import { Home, Building2, Factory, Wrench, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Residential Solar',
    tagline: 'Your home, powered by the sun.',
    desc: 'SCA Tech Solar installs 3kW to 10kW residential rooftop systems with PM Surya Ghar subsidy up to ₹78,000 processed end-to-end. With 16+ years of experience and 2,000+ installations, we deliver net-metered on-grid, off-grid and hybrid solutions that cut household electricity bills by 85–90%.',
    points: ['On-grid, Off-grid & Hybrid systems', '3 kW to 10 kW capacity range', 'PM Surya Ghar subsidy up to ₹78,000', 'MPWZ net metering registration included', '25-year performance warranty', 'AMC plans available'],
    video: 'https://res.cloudinary.com/dyc2xmcym/video/upload/v1775638771/hero-video_uzkmjg.mp4',
    color: 'bg-solar-50',
  },
  {
    icon: Building2,
    title: 'Commercial Solar',
    tagline: 'Turn your rooftop into a revenue stream.',
    desc: 'SCA Tech Solar delivers 10kW to 500kW commercial solar systems for offices, hospitals, schools and retail. Backed by 45 MW of installed capacity and 16+ years of expertise, our turnkey solutions reduce peak demand charges, generate REC credits, and help businesses meet ESG targets with rapid ROI.',
    points: ['10 kW to 500 kW systems', 'Peer-to-peer energy trading', 'REC and carbon credit advisory', 'OPEX and CAPEX models available', 'Remote monitoring dashboard', 'Dedicated project manager'],
    img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=85&auto=format',
    color: 'bg-sky-50',
  },
  {
    icon: Factory,
    title: 'Industrial Solar',
    tagline: 'Large-scale clean power for industry.',
    desc: 'Our engineering team handles complex 500kW to 5MW+ industrial solar projects including ground-mount and carport installations. With 2,000+ successful deployments and deep HT/LT connection expertise, SCA Tech is India\'s most experienced industrial solar EPC contractor.',
    points: ['500 kW to 5 MW+ projects', 'Ground-mount & elevated carport', 'HT/LT connection expertise', 'PPA and third-party financing', 'Priority MPWZ liaison', 'Dedicated O&M team'],
    img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=85&auto=format',
    color: 'bg-night-50',
  },
  {
    icon: Wrench,
    title: 'Operations & Maintenance',
    tagline: 'Keep your solar producing at peak performance.',
    desc: 'Comprehensive AMC and O&M packages for existing solar plants. Remote monitoring, preventive maintenance, panel cleaning, inverter servicing and 24/7 fault response.',
    points: ['Annual Maintenance Contracts', 'Remote SCADA monitoring', 'Quarterly performance reports', 'Panel cleaning every 3 months', 'Inverter health checks', '4-hour fault response SLA'],
    img: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=800&q=85&auto=format',
    color: 'bg-green-50',
  },
  {
    icon: ShieldCheck,
    title: 'Subsidy & Documentation',
    tagline: 'We handle all the paperwork for you.',
    desc: "Government subsidy registration, MPWZ approvals, net metering applications \u2014 a bureaucratic nightmare that we've mastered. Free for all SCA Tech installations.",
    points: ['PM Surya Ghar portal registration', 'MPWZ net meter filing', 'Subsidy status tracking', 'Bank subsidy disbursement follow-up', 'Legal documentation support', 'Zero extra charges'],
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85&auto=format',
    color: 'bg-purple-50',
  },
  {
    icon: Zap,
    title: 'Battery Storage Solutions',
    tagline: 'Power through any outage.',
    desc: "Lithium iron phosphate (LiFePO4) battery systems integrated with hybrid inverters. Designed for India's frequent power outages and businesses needing uninterrupted power.",
    points: ['LiFePO4 batteries — 10+ year life', '5 kWh to 100 kWh systems', 'Smart load management', 'EV charging integration', 'Grid-independent operation', 'Scalable modular design'],
    img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=85&auto=format',
    color: 'bg-orange-50',
  },
]

export default function Services() {
  return (
    <div className="pt-20">
      
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }]} />
      {/* Hero */}
      <div className="relative py-8 md:py-12 bg-night-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&auto=format&fit=crop" 
            srcSet="
              https://images.unsplash.com/photo-1509391366360-2e959784a276?w=640&q=75&auto=format&fit=crop 640w,
              https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1024&q=80&auto=format&fit=crop 1024w,
              https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&auto=format&fit=crop 1200w
            "
            sizes="100vw"
            alt="Solar Installation Services background" 
            className="w-full h-full object-cover" 
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/90 to-night-950/60" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag text-solar-400">
            <span className="bg-solar-500 w-6 h-px inline-block mr-2" />
            Our Services
          </p>
          <h1 className="font-black text-white leading-tight mt-2 mb-3" style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
            Solar Installation Services.
          </h1>
          <p className="text-night-300 max-w-xl text-base md:text-lg leading-relaxed mb-6">
            From a single rooftop to industrial mega-parks — SCA Tech delivers turnkey solar solutions backed by 16 years of expertise.
          </p>
          <Link href="/contact" className="btn-primary">
            Book Free Survey <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Services */}
      <div className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-20">
          {services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-solar-500 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-bold text-night-400 tracking-[0.18em] uppercase">0{i + 1} — {svc.title}</p>
                  </div>
                  <h2 className="font-black text-night-900 leading-tight mb-3" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}>
                    {svc.tagline}
                  </h2>
                  <p className="text-night-500 leading-relaxed mb-6">{svc.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {svc.points.map(pt => (
                      <div key={pt} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-solar-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-night-600">{pt}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="btn-primary text-sm">
                    Enquire About This Service <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={`rounded-3xl overflow-hidden h-72 md:h-96 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {svc.video ? (
                    <SlowVideo src={svc.video} className="w-full h-full object-cover" />
                  ) : (
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" loading="lazy" decoding="async" width="800" height="600" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
