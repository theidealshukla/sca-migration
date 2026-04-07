"use client";

import { usePathname } from 'next/navigation';
import { NAP } from '../constants/contact';
import React, { useState, useEffect } from 'react'

import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Projects', path: '/projects' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

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
              src="/logos/sca-logo.png" 
              alt="SCA Tech Solar" 
              className="h-[68px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
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

          <div className="hidden md:flex items-center gap-3">
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
            className={`md:hidden relative z-[60] w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              menuOpen ? 'bg-white/10' : transparent ? 'text-white bg-white/10' : 'text-night-900 bg-night-100'
            }`}
            aria-label="Toggle menu"
          >
            <div className="mob-hamburger-lines">
              <span className={`mob-ham-line ${menuOpen ? 'mob-ham-active-1' : ''} ${
                menuOpen || transparent ? 'bg-white' : 'bg-night-900'
              }`} />
              <span className={`mob-ham-line ${menuOpen ? 'mob-ham-active-2' : ''} ${
                menuOpen || transparent ? 'bg-white' : 'bg-night-900'
              }`} />
              <span className={`mob-ham-line ${menuOpen ? 'mob-ham-active-3' : ''} ${
                menuOpen || transparent ? 'bg-white' : 'bg-night-900'
              }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Premium Full-Screen Mobile Menu ── */}
      <div className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Dark glassmorphic backdrop */}
        <div className="absolute inset-0 bg-night-950/95 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />

        {/* Menu content */}
        <div className="relative h-full flex flex-col justify-center px-8 z-[60]">
          {/* Nav links — large, staggered */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                className={`mob-nav-link group ${menuOpen ? 'mob-nav-link-visible' : ''}`}
                style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.05}s` : '0s' }}
              >
                <div className="flex items-center gap-4">
                  {location === link.path && (
                    <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                  )}
                  <span className={`text-4xl font-semibold tracking-tight transition-colors duration-300 ${
                    location === link.path ? 'text-white' : 'text-white/50 group-hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                </div>
                <ArrowRight className={`w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${
                  location === link.path ? 'text-white/80 opacity-100 translate-x-0' : 'text-white/30'
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA section */}
          <div className={`mt-10 flex flex-col gap-4 mob-nav-link ${menuOpen ? 'mob-nav-link-visible' : ''}`}
               style={{ transitionDelay: menuOpen ? `${0.1 + navLinks.length * 0.05}s` : '0s' }}>
            <div className="h-px w-full bg-white/10 mb-2" />
            <a
              href={`tel:${NAP.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-between py-2 text-white/60 hover:text-white transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-base font-medium">{NAP.phone}</span>
              </div>
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-between py-4 px-6 rounded-2xl text-base font-semibold text-white
                         bg-gradient-to-r from-white/15 to-white/5 border border-white/15
                         hover:from-white/20 hover:to-white/10 transition-all duration-300 group"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Brand watermark */}
          <div className={`absolute bottom-8 left-8 right-8 mob-nav-link ${menuOpen ? 'mob-nav-link-visible' : ''}`}
               style={{ transitionDelay: menuOpen ? '0.5s' : '0s' }}>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/15 text-center">
              SCA Tech Solar • Powering India
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
          padding: 8px 0;
          text-decoration: none;
          opacity: 0;
          transform: translateY(20px);
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
