import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Phone, Lock } from 'lucide-react'

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
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const transparent = isHome && !scrolled

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent
          ? 'bg-transparent py-5'
          : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-night-100 py-3.5'
        }`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${transparent ? 'bg-white/20 backdrop-blur-sm' : 'bg-night-900'
              }`}>
              <Sun className={`w-5 h-5 transition-colors duration-300 ${transparent ? 'text-white' : 'text-white'}`} strokeWidth={2.5} />
            </div>
            <div>
              <span className={`font-display font-black text-xl tracking-tight leading-none block transition-colors duration-300 ${transparent ? 'text-white' : 'text-night-900'}`}>
                SCA <span className={`${transparent ? 'text-white/70' : 'text-night-400'}`}>TECH</span>
              </span>
              <span className={`text-[9px] font-semibold tracking-[0.18em] uppercase leading-none transition-colors duration-300 ${transparent ? 'text-white/50' : 'text-night-400'}`}>Solar Solutions</span>
            </div>
          </Link>

          {/* Desktop Nav \u2014 pill-shaped like reference */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${location.pathname === link.path
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
            <a href="tel:00000000" className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${transparent ? 'text-white/70 hover:text-white' : 'text-night-500 hover:text-night-900'}`}>
              <Phone className="w-3.5 h-3.5" />
              +91 98260 35454
            </a>
            <Link to="/contact" className="btn-primary text-xs py-3 px-5">
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${transparent ? 'text-white bg-white/10' : 'text-night-900 bg-night-100'
                }`}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-night-950/80 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-80 bg-white transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 pt-20">
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-night-400 mb-4">Navigation</p>
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${location.pathname === link.path
                        ? 'bg-night-100 text-night-900 font-semibold'
                        : 'text-night-600 hover:bg-night-50'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-night-100 pt-6 flex flex-col gap-3">
              <a href="tel:00000000" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-night-50 text-night-700 font-medium text-sm transition-colors">
                <Phone className="w-4 h-4 text-night-400" />
                +91 98260 35454
              </a>
              <Link to="/contact" className="btn-primary justify-center">
                Get Free Quote
              </Link>
              <Link to="/admin" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-night-900/5 border border-night-200 text-night-500 hover:text-night-900 hover:bg-night-100 transition-all text-sm font-medium">
                <Lock className="w-3.5 h-3.5" />
                Admin Login
              </Link>
            </div>
            <div className="mt-8 p-4 bg-night-50 rounded-2xl border border-night-200">
              <p className="text-xs font-black text-night-900 leading-none">SCA Tech</p>
              <p className="text-xs text-night-400 mt-1">Serving MP</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
