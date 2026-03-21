"use client";

import React, { useState } from 'react'
import { NAP } from '../constants/contact'
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', type: 'Residential', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-24 md:py-32 bg-night-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <p className="section-tag mx-auto justify-center">Get Started</p>
          <h2 className="font-black text-night-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.03em' }}>
            Book Free Solar Survey Anywhere in India — <span className="font-light text-night-400">no obligation.</span>
          </h2>
          <p className="text-night-500 mt-4 max-w-xl mx-auto">
            Our expert will visit your site, assess your roof, check your bills and give you an exact quote — completely free of charge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              { icon: Phone, label: 'Call Us', value: NAP.phone, sub: 'Mon–Sat, 9am–7pm IST', href: `tel:${NAP.phone.replace(/\\s/g, '')}` },
              { icon: Mail, label: 'Email', value: NAP.email, sub: 'We reply quickly', href: `mailto:${NAP.email}` },
              { icon: MapPin, label: 'Office', value: NAP.address.split(',')[0] + ',' + NAP.address.split(',')[1] + ',' + NAP.address.split(',')[2], sub: NAP.addressShort, href: '#' },
              { icon: Clock, label: 'Survey Hours', value: '9:00 AM – 6:00 PM', sub: 'Monday to Saturday', href: '#' },
            ].map(({ icon: Icon, label, value, sub, href }) => (
              <a key={label} href={href} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-night-100 hover:border-night-300 hover:shadow-md transition-all duration-300 group">
                <div className="w-11 h-11 bg-night-100 rounded-xl flex items-center justify-center group-hover:bg-night-900 transition-colors duration-300 flex-shrink-0">
                  <Icon className="w-5 h-5 text-night-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs font-bold text-night-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="font-bold text-night-900">{value}</p>
                  <p className="text-xs text-night-400 mt-0.5">{sub}</p>
                </div>
              </a>
            ))}

            <div className="p-5 bg-night-950 rounded-2xl border border-white/5">
              <p className="text-white font-black text-lg mb-2">Service Areas</p>
              <div className="flex flex-wrap gap-2">
                {['Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Indore', 'Bhopal', 'Jaipur', 'Ahmedabad', 'Pune', '+ 10 more'].map(city => (
                  <span key={city} className="px-2.5 py-1 bg-white/10 rounded-full text-white/60 text-xs font-medium">{city}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 border border-night-100 shadow-xl shadow-night-100/50">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-night-100 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-night-900" />
                </div>
                <h3 className="text-2xl font-black text-night-900 mb-2">Survey Booked!</h3>
                <p className="text-night-500 max-w-sm">Our solar expert will call you within 2 hours to confirm your free site survey appointment.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 btn-primary">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-black text-night-900 mb-6">Book Your Free Survey</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { id: 'name', label: 'Full Name', placeholder: 'Rajesh Sharma', type: 'text', required: true },
                    { id: 'phone', label: 'Mobile Number', placeholder: '+91 98765 43210', type: 'tel', required: true },
                    { id: 'email', label: 'Email Address', placeholder: 'rajesh@email.com', type: 'email' },
                    { id: 'city', label: 'City / Area', placeholder: 'e.g. Mumbai, Delhi NCR, Bengaluru', type: 'text', required: true },
                  ].map(field => (
                    <div key={field.id}>
                      <label className="block text-xs font-bold text-night-600 uppercase tracking-wider mb-1.5">
                        {field.label}{field.required && ' *'}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={form[field.id]}
                        onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-night-200 focus:border-night-400 focus:ring-2 focus:ring-night-100 outline-none text-sm text-night-900 placeholder-night-300 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-night-600 uppercase tracking-wider mb-1.5">System Type *</label>
                  <div className="flex flex-wrap gap-2">
                    {['Residential', 'Commercial', 'Industrial', 'Not Sure'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                          form.type === t
                            ? 'bg-night-900 text-white border-night-900'
                            : 'bg-white text-night-600 border-night-200 hover:border-night-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-night-600 uppercase tracking-wider mb-1.5">Monthly Bill / Message</label>
                  <textarea
                    rows={3}
                    placeholder="My monthly electricity bill is around ₹3,000. I have a 2-storey house with a flat roof..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-night-200 focus:border-night-400 focus:ring-2 focus:ring-night-100 outline-none text-sm text-night-900 placeholder-night-300 transition-all resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center text-sm py-4">
                  Book Free Site Survey
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-night-400 text-center mt-3">No spam. We'll only call to confirm your appointment.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
