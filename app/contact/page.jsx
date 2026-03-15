export const metadata = {
  title: 'Contact SCA Tech Solar | Free Solar Survey Indore',
  description: 'Book a free rooftop solar survey in Indore. Call +91 98260 35454 or fill the form. We serve Indore, Bhopal, Ujjain, Dewas and all of MP.',
  alternates: { canonical: 'https://scatechsolar.com/contact' },
};

import React from 'react'

import Breadcrumb from '../../components/Breadcrumb'
import { MapPin, MessageCircle } from 'lucide-react'
import ContactSection from '../../sections/ContactSection'

export default function Contact() {
  return (
    <div className="pt-20">
      
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contact', path: '/contact' }]} />
      {/* Page Hero */}
      <div className="py-20 md:py-28 bg-night-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80&auto=format&fit=crop" 
            srcSet="
              https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=640&q=75&auto=format&fit=crop 640w,
              https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1024&q=80&auto=format&fit=crop 1024w,
              https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80&auto=format&fit=crop 1200w
            "
            sizes="100vw"
            alt="Solar panels on a roof" 
            className="w-full h-full object-cover" 
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-tag text-white/40">Get In Touch</p>
          <h1 className="font-black text-white leading-tight mt-2 mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}>
            Contact SCA Tech Solar<br /><span className="font-light text-white/50">in Indore.</span>
          </h1>
          <p className="text-night-400 max-w-lg text-lg leading-relaxed">
            Stop searching for a 'solar installer near me' — our local engineering team is based right here in Indore. We are ready to dispatch for a free site assessment and provide the most accurate solar panels price Indore.
          </p>
        </div>
      </div>

      {/* Contact section */}
      <ContactSection />

      {/* Map Embed */}
      <div className="bg-night-100 h-[400px] w-full relative overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.1!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s149+Shrawan+Chambers+RNT+Marg+Indore!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%" 
          height="400" 
          style={{ border: 0, borderRadius: '16px' }} 
          allowFullScreen="" 
          loading="lazy"
          title="SCA Tech Solar office location in Indore">
        </iframe>
      </div>

      {/* WhatsApp CTA */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <a href="https://wa.me/919826035454" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-night-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-night-800 transition-colors cursor-pointer">
            <MessageCircle className="w-6 h-6" />
            Chat with us on WhatsApp — +91 98260 35454
          </a>
          <p className="text-night-400 text-sm mt-4">Fastest response: typically under 15 minutes during business hours</p>
        </div>
      </div>
    </div>
  )
}
