import React from 'react'
import { SEOHead } from '../utils/seo'
import { MapPin, MessageCircle } from 'lucide-react'
import ContactSection from '../sections/ContactSection'

export default function Contact() {
  return (
    <div className="pt-20">
      <SEOHead
        title="Contact SCA Tech Solar in Indore | Free Site Survey & Quote"
        description="Get in touch with SCA Tech Solar for a free site survey and quote. Located at 149 Shrawan Chambers, RNT Marg, Chhoti Gwaltol, Indore 452001."
        path="/contact"
      />
      {/* Page Hero */}
      <div className="py-20 md:py-28 bg-night-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1800&q=80&auto=format" alt="Solar panels on a roof" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag text-white/40">Get In Touch</p>
          <h1 className="font-black text-white leading-tight mt-2 mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}>
            Contact SCA Tech Solar<br /><span className="font-light text-white/50">in Indore.</span>
          </h1>
          <p className="text-night-400 max-w-lg text-lg leading-relaxed">
            Whether you're ready to install or just curious about solar — we're here. Get a free site survey and zero-obligation quote from Indore's most trusted solar team.
          </p>
        </div>
      </div>

      {/* Contact section */}
      <ContactSection />

      {/* Map placeholder */}
      <div className="bg-night-100 h-72 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-night-400 mx-auto mb-3" />
            <p className="font-bold text-night-700">149, Shrawan Chambers, RNT Marg, Chhoti Gwaltol, Indore — 452001</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-night-500 text-sm font-semibold mt-2 inline-block hover:underline">
              Open in Google Maps →
            </a>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80&auto=format"
          alt="Indore city"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* WhatsApp CTA */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-night-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-night-800 transition-colors cursor-pointer">
            <MessageCircle className="w-6 h-6" />
            Chat with us on WhatsApp — +91 98260 35454
          </div>
          <p className="text-night-400 text-sm mt-4">Fastest response: typically under 15 minutes during business hours</p>
        </div>
      </div>
    </div>
  )
}
