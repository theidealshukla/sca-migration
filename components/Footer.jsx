"use client";

import React from 'react'
import { NAP } from '../constants/contact'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Instagram, ArrowUpRight } from 'lucide-react'

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
            <Link href="/" className="flex items-center mb-6">
              <img 
                src="/sca-logo.png" 
                alt="SCA Tech Solar" 
                className="h-[60px] w-auto object-contain"
              />
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
              <a
                href="https://www.instagram.com/scatechsolar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-night-500 hover:bg-gradient-to-br hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${NAP.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hey, I want to know about solar installation')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-night-500 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
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
          SCA Tech Solar is India's top-rated solar company offering professional solar panel installation for homes, businesses, and industrial units. Headquartered in Indore with offices in Mumbai, Pune, Jalgaon, and Kota. We authorize GoodWe inverters, provide TOPCon bifacial panels, and assist with PM Surya Ghar scheme subsidy processes.
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
          <Link href="/admin" className="text-night-600 text-xs hover:text-night-400 transition-colors">Admin Panel</Link>
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
