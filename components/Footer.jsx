"use client";

import React from 'react'
import { NAP } from '../constants/contact'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Projects', path: '/projects' },
    { label: 'Careers', path: '/contact' },
    { label: 'Press & Media', path: '/contact' },
  ],
  Services: [
    { label: 'Residential Solar', path: '/services' },
    { label: 'Commercial Solar', path: '/services' },
    { label: 'Industrial Solar', path: '/services' },
    { label: 'O&M Services', path: '/services' },
  ],
  Products: [
    { label: 'Solar Panels', path: '/products' },
    { label: 'Inverters', path: '/products' },
    { label: 'Batteries', path: '/products' },
    { label: 'Accessories', path: '/products' },
  ],
  Support: [
    { label: 'Get Free Quote', path: '/contact' },
    { label: 'Subsidy Info', path: '/contact' },
    { label: 'EMI Options', path: '/contact' },
    { label: 'FAQ', path: '/#faq' },
  ],
}

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="bg-night-950 text-white overflow-hidden">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                <Sun className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight leading-none block">SCA <span className="text-white/40">TECH</span></span>
                <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/30">Solar Solutions · India</span>
              </div>
            </Link>
            <p className="text-night-400 text-sm leading-relaxed mb-6 max-w-xs">
              Powering India's clean energy future since 2008. Supplier of GoodWe inverters and TOPCon bifacial panels.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a href={`tel:${NAP.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-night-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-night-500 flex-shrink-0" />
                {NAP.phone}
              </a>
              <a href={`mailto:${NAP.email}`} className="flex items-center gap-3 text-sm text-night-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-night-500 flex-shrink-0" />
                {NAP.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-night-400">
                <MapPin className="w-4 h-4 text-night-500 flex-shrink-0 mt-0.5" />
                <span>{NAP.address.split(',')[0] + ',' + NAP.address.split(',')[1] + ',' + NAP.address.split(',')[2]}, {NAP.addressShort}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Twitter, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-night-500 hover:bg-white hover:text-night-900 hover:border-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-night-500 mb-5">{category}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="text-sm text-night-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* SEO Text Block */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6">
        <p className="text-[10px] md:text-xs text-night-600 leading-relaxed text-center max-w-4xl mx-auto">
          SCA Tech Solar is India's top-rated solar company offering professional solar panel installation for homes, businesses, and industrial units nationwide. Headquartered in Indore, we authorize GoodWe inverters, provide TOPCon bifacial panels, and assist with PM Surya Ghar scheme subsidy processes across India.
        </p>
      </div>

      <div className="border-t border-white/5" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-night-600 text-xs">
          © 2026 SCA Tech Solar. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a href="#" className="text-night-600 text-xs hover:text-night-400 transition-colors">Privacy Policy</a>
          <a href="#" className="text-night-600 text-xs hover:text-night-400 transition-colors">Terms of Service</a>
          <a href="/sitemap.xml" className="text-night-600 text-xs hover:text-night-400 transition-colors">Sitemap</a>
        </div>
      </div>

      {/* Big brand text — like reference */}
      <div className="overflow-hidden border-t border-white/5">
        <p className="font-display text-[clamp(3rem,18vw,14rem)] font-black text-white/[0.04] leading-none tracking-tighter select-none text-center pb-4 whitespace-nowrap">
          SCA TECH
        </p>
      </div>
    </footer>
  )
}
