export const metadata = {
  title: 'EPC Services | ASA EPC Pvt. Ltd.',
  description: 'Turnkey EPC services: solar power plants, transmission lines (up to 765KV), substations (33KV-400KV), BESS, Green Hydrogen, and integrated asset management.',
  alternates: { canonical: 'https://www.asa-epc.com/services' },
};

import React from 'react'

import Link from 'next/link';

import Breadcrumb from '@/components/Breadcrumb'
import SlowVideo from '@/components/SlowVideo'
import { Home, Building2, Factory, Wrench, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    icon: Factory,
    title: 'EPC Services',
    tagline: 'Turnkey Solar Power Plant Solutions.',
    desc: 'ASA EPC delivers complete EPC services for ground mounted solar, rooftop solar, floating solar, and agrovoltaic systems. From site survey and leveling to module alignment, cable laying, and final commissioning — we handle the complete 16-step construction process with experienced on-ground teams.',
    points: ['Ground mounted solar (1 MW – 20 MW)', 'Rooftop solar systems', 'Floating solar installations', 'Agrovoltaic systems', 'Transmission lines up to 765 KV', 'Substations (33KV to 400KV, GIS & AIS)'],
    video: 'https://res.cloudinary.com/dyc2xmcym/video/upload/v1775673934/7211094-uhd_3840_2160_30fps_jq4q1e.mp4',
    color: 'bg-solar-50',
  },
  {
    icon: ShieldCheck,
    title: 'Approvals & Liaisoning',
    tagline: 'We handle all regulatory compliance.',
    desc: 'Navigating the complex landscape of government approvals and regulatory requirements is our specialty. ASA EPC manages the complete approvals process — from initial applications to final permits — ensuring timely project clearances and zero bureaucratic delays.',
    points: ['Government permit acquisition', 'Regulatory compliance management', 'Agency liaison & follow-up', 'Documentation & record keeping', 'Environmental clearances', 'Grid connectivity approvals'],
    video: 'https://res.cloudinary.com/dyc2xmcym/video/upload/v1775677139/7735491-hd_1920_1080_25fps_dgbh1e.mp4',
    color: 'bg-sky-50',
  },
  {
    icon: Zap,
    title: 'BESS & Green Hydrogen',
    tagline: 'Next-generation clean energy solutions.',
    desc: 'ASA EPC is at the forefront of emerging energy technologies. Battery Energy Storage Systems (BESS) store excess renewable energy for later use, enhancing grid stability. Green Hydrogen, produced by splitting water using renewable energy, offers a zero-emission alternative for power generation, transportation, and industrial applications.',
    points: ['Battery Energy Storage Systems', 'Green Hydrogen production', 'Grid stability solutions', 'Energy arbitrage systems', 'Microgrid integration', 'Scalable modular design'],
    video: 'https://res.cloudinary.com/dyc2xmcym/video/upload/v1775677248/15338269_3840_2160_23fps_b0ggfs.mp4',
    color: 'bg-night-50',
  },
  {
    icon: Wrench,
    title: 'Asset Management',
    tagline: 'Maximize performance. Minimize downtime.',
    desc: 'Integrated asset management services ensuring optimal performance and longevity of your power infrastructure. Our expert teams provide ongoing O&M, comprehensive energy audits, and real-time performance monitoring with SCADA-based tracking systems.',
    points: ['Operation & Maintenance', 'Comprehensive energy audits', 'Real-time performance monitoring', 'Preventive maintenance programs', 'SCADA-based remote tracking', 'Annual performance reports'],
    video: 'https://res.cloudinary.com/dyc2xmcym/video/upload/v1775675897/8853483-hd_1920_1080_24fps_vm9bns.mp4',
    color: 'bg-green-50',
  },
  {
    icon: Building2,
    title: 'Transmission & Substations',
    tagline: 'High-voltage infrastructure expertise.',
    desc: 'ASA EPC executes Extra High Tension (EHT) and High Tension (HT) transmission lines up to 765 KV, along with Gas Insulated Substations (GIS) and Air Insulated Substations (AIS) spanning 33KV to 400KV. We also deliver 132KV traction substations for Indian Railways.',
    points: ['EHT/HT lines up to 765 KV', 'GIS substations', 'AIS substations (33KV–400KV)', '132KV traction substations', 'Railway electrification', 'Complete testing & commissioning'],
    video: 'https://res.cloudinary.com/dyc2xmcym/video/upload/v1775676732/DJI_20260328170049_0023_D_fyee6r.mp4',
    color: 'bg-purple-50',
  },
  {
    icon: Home,
    title: 'Pressurized Irrigation',
    tagline: 'Smart water management solutions.',
    desc: 'ASA EPC delivers pressurized irrigation systems combining solar-powered pumping with precision water distribution. Our systems optimize water usage for agricultural and industrial applications, reducing operating costs while improving efficiency.',
    points: ['Solar-powered pumping systems', 'Drip irrigation integration', 'Sprinkler systems', 'Water management solutions', 'Agricultural applications', 'Industrial water systems'],
    video: 'https://res.cloudinary.com/dyc2xmcym/video/upload/v1775638771/hero-video_uzkmjg.mp4',
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
            alt="ASA EPC Services background" 
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
            Comprehensive EPC Services.
          </h1>
          <p className="text-night-300 max-w-xl text-base md:text-lg leading-relaxed mb-6">
            From solar power plants to high-voltage transmission lines — ASA EPC delivers turnkey energy solutions backed by 7+ years of expertise.
          </p>
          <Link href="/contact" className="btn-primary">
            Get Free Consultation <ArrowRight className="w-4 h-4" />
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
