"use client";

import { usePathname } from 'next/navigation';
import { NAP } from '../constants/contact';
import React, { useState, useEffect } from 'react'

import Link from 'next/link';
import { Phone, ArrowRight, Download, Mail, MapPin, ChevronRight } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Projects', path: '/projects' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const BROCHURE_URL = '/asa-epc-brochure.pdf'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = usePathname()
  const isHome = location === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const transparent = isHome && !scrolled

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${transparent
        ? 'bg-transparent py-5'
        : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-night-100 py-3.5'
        }`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-[60]">
            <img
              src="/logos/asa-epc-logo.png"
              alt="ASA EPC Pvt. Ltd."
              className="h-[56px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${location === link.path
                  ? transparent
                    ? 'text-white bg-white/15 border border-white/30'
                    : 'text-night-900 bg-night-100 border border-night-200'
                  : transparent
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-night-500 hover:text-night-900 hover:bg-night-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* Download Brochure */}
            <a
              href={BROCHURE_URL}
              download="ASA-EPC-Company-Brochure.pdf"
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${transparent
                ? 'text-white/80 border-white/20 hover:bg-white/10 hover:text-white'
                : 'text-night-600 border-night-200 hover:bg-night-50 hover:text-night-900 hover:border-night-300'
                }`}
              aria-label="Download company brochure"
            >
              <Download className="w-3.5 h-3.5" />
              Brochure
            </a>
            <a href={`tel:${NAP.phone.replace(/\s/g, '')}`} className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${transparent ? 'text-white/70 hover:text-white' : 'text-night-500 hover:text-night-900'}`}>
              <Phone className="w-3.5 h-3.5" />
              {NAP.phone}
            </a>
            <Link href="/contact" className="btn-primary text-xs py-3 px-5">
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Hamburger — animated 3-line to X */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden relative z-[60] w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${menuOpen ? 'bg-night-50' : transparent ? 'text-white bg-white/10' : 'text-night-900 bg-night-100'
              }`}
            aria-label="Toggle menu"
          >
            <div className="mob-hamburger-lines">
              <span className={`mob-ham-line ${menuOpen ? 'mob-ham-active-1' : ''} ${menuOpen ? 'bg-night-900' : transparent ? 'bg-white' : 'bg-night-900'
                }`} />
              <span className={`mob-ham-line ${menuOpen ? 'mob-ham-active-2' : ''} ${menuOpen ? 'bg-night-900' : transparent ? 'bg-white' : 'bg-night-900'
                }`} />
              <span className={`mob-ham-line ${menuOpen ? 'mob-ham-active-3' : ''} ${menuOpen ? 'bg-night-900' : transparent ? 'bg-white' : 'bg-night-900'
                }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Premium Full-Screen Mobile Menu ── */}
      <div className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-white" onClick={() => setMenuOpen(false)} />

        {/* Menu content — scrollable */}
        <div className="relative h-full flex flex-col pt-24 pb-8 px-6 z-[56] overflow-y-auto">

          {/* Section label */}
          <p className={`text-[10px] font-bold tracking-[0.25em] uppercase text-night-400 mb-4 mob-nav-link ${menuOpen ? 'mob-nav-link-visible' : ''}`}
            style={{ transitionDelay: menuOpen ? '0.08s' : '0s' }}>
            Navigation
          </p>

          {/* Nav links — clean card style */}
          <div className="flex flex-col gap-1 mb-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                className={`mob-nav-link group rounded-2xl transition-all duration-300 ${menuOpen ? 'mob-nav-link-visible' : ''} ${location === link.path
                  ? 'bg-night-950 text-white px-5 py-4'
                  : 'bg-transparent hover:bg-night-50 px-5 py-4 text-night-700'
                  }`}
                style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.04}s` : '0s' }}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-mono tabular-nums ${location === link.path ? 'text-solar-400' : 'text-night-300'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-bold tracking-tight">
                    {link.label}
                  </span>
                </div>
                <ChevronRight className={`w-5 h-5 transition-all duration-300 ${location === link.path
                  ? 'text-solar-400 opacity-100'
                  : 'text-night-300 opacity-0 group-hover:opacity-100'
                  }`} />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className={`h-px w-full bg-night-100 mb-6 mob-nav-link ${menuOpen ? 'mob-nav-link-visible' : ''}`}
            style={{ transitionDelay: menuOpen ? `${0.1 + navLinks.length * 0.04 + 0.02}s` : '0s' }} />

          {/* Action Cards Grid */}
          <div className={`grid grid-cols-2 gap-3 mb-6 mob-nav-link ${menuOpen ? 'mob-nav-link-visible' : ''}`}
            style={{ transitionDelay: menuOpen ? `${0.1 + navLinks.length * 0.04 + 0.06}s` : '0s' }}>

            {/* Download Brochure Card */}
            <a
              href={BROCHURE_URL}
              download="ASA-EPC-Company-Brochure.pdf"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-solar-50 border border-solar-100 hover:bg-solar-100 transition-colors duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-solar-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-night-900 text-center leading-tight">Download<br />Brochure</span>
            </a>

            {/* Call Card */}
            <a
              href={`tel:${NAP.phone.replace(/\s/g, '')}`}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-night-50 border border-night-100 hover:bg-night-100 transition-colors duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-night-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-night-900 text-center leading-tight">Call<br />Now</span>
            </a>
          </div>

          {/* Get a Free Quote CTA */}
          <div className={`mob-nav-link ${menuOpen ? 'mob-nav-link-visible' : ''}`}
            style={{ transitionDelay: menuOpen ? `${0.1 + navLinks.length * 0.04 + 0.1}s` : '0s' }}>
            <Link
              href="/contact"
              className="flex items-center justify-between w-full py-4 px-6 rounded-2xl text-base font-bold text-white
                         bg-night-900 shadow-xl shadow-night-900/10
                         hover:bg-night-800 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className={`mt-8 flex flex-col gap-3 mob-nav-link ${menuOpen ? 'mob-nav-link-visible' : ''}`}
            style={{ transitionDelay: menuOpen ? `${0.1 + navLinks.length * 0.04 + 0.14}s` : '0s' }}>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-night-400 mb-1">Contact</p>
            <a href={`mailto:${NAP.email}`} className="flex items-center gap-3 text-sm text-night-600 hover:text-night-900 transition-colors">
              <Mail className="w-4 h-4 text-night-400 flex-shrink-0" />
              {NAP.email}
            </a>
            <div className="flex items-start gap-3 text-sm text-night-500">
              <MapPin className="w-4 h-4 text-night-400 flex-shrink-0 mt-0.5" />
              <span className="leading-snug">Bhopal, MP & Dubai, UAE</span>
            </div>
          </div>

          {/* Brand watermark — pinned to bottom */}
          <div className={`mt-auto pt-6 mob-nav-link ${menuOpen ? 'mob-nav-link-visible' : ''}`}
            style={{ transitionDelay: menuOpen ? '0.55s' : '0s' }}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-night-400 text-center">
              ASA EPC Pvt. Ltd. • Powering India & UAE
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ── Hamburger Animation ── */
        .mob-hamburger-lines {
          width: 18px;
          height: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .mob-ham-line {
          display: block;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .mob-ham-active-1 {
          transform: translateY(6px) rotate(45deg);
        }
        .mob-ham-active-2 {
          opacity: 0;
          transform: scaleX(0);
        }
        .mob-ham-active-3 {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* ── Mobile Nav Link Animations ── */
        .mob-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mob-nav-link-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  )
}
