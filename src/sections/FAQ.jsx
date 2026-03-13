import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How much does a solar installation cost in Indore?',
    a: 'A typical 3 kWp residential system costs ₹1.3–1.6 lakh before subsidy. After PM Surya Ghar subsidy of ₹78,000, net cost is ₹55,000–80,000. Commercial and industrial pricing is calculated per watt peak (₹45–55/Wp).',
  },
  {
    q: 'What is the payback period for solar in Indore?',
    a: 'With Indore\'s 300+ sunny days and MPEZ tariff of ₹7.5–9/unit, payback periods are typically 3–5 years for residential and 2.5–4 years for commercial. After payback, you generate free electricity for the remaining 20+ years.',
  },
  {
    q: 'Will solar work during power cuts?',
    a: 'Standard on-grid systems do not work during outages (safety regulation). For 24/7 power, we offer hybrid systems with lithium battery backup. These provide 4–8 hours of backup for typical households.',
  },
  {
    q: 'How do I apply for the PM Surya Ghar subsidy?',
    a: 'SCA Tech handles the entire subsidy process at no extra cost. We register you on the PM Surya Ghar portal, coordinate with MPEZ for net meter, and ensure the subsidy is credited directly to your bank account.',
  },
  {
    q: 'How long does installation take?',
    a: 'Site survey on day 1. Equipment delivery on day 2–3. Physical installation takes 1–2 days. DISCOM net meter application is filed simultaneously and usually approved within 15–30 days.',
  },
  {
    q: 'What maintenance is required for solar panels?',
    a: 'Solar panels require minimal maintenance — mainly periodic cleaning to remove dust. Indore\'s dusty climate means cleaning every 2–3 months. We offer Annual Maintenance Contracts starting ₹3,500/year including 2 cleanings and performance health checks.',
  },
  {
    q: 'What warranties do you provide?',
    a: 'We offer: 25-year linear performance warranty on Tier 1 panels, 10-year product warranty on panels, 5–10 year warranty on inverters, and 1-year installation workmanship warranty from SCA Tech with ongoing support.',
  },
  {
    q: 'Can I get solar installed on a rented property?',
    a: 'You can install solar on a rented property with the landlord\'s written consent. The system can be transferred if you move. Many landlords are agreeable as it increases property value.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <p className="section-tag">FAQ</p>
            <h2 className="font-black text-night-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}>
              Solar Panel Installation FAQs Indore.
            </h2>
            <p className="text-night-500 text-sm leading-relaxed mt-4">
              Have a question not covered here? Our experts are available Mon–Sat 9am–6pm.
            </p>
            <a href="tel:+919826035454" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-solar-600 hover:text-solar-700 transition-colors">
              Call us: +91 98260 35454 →
            </a>
          </div>
          <div className="lg:col-span-2">
            <div className="divide-y divide-night-100">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-start gap-4 text-left group"
                  >
                    <span className={`mt-1 w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${open === i ? 'border-solar-500 bg-solar-500 text-white' : 'border-night-200 text-night-400 group-hover:border-solar-400'
                      }`}>
                      {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                    <span className={`font-semibold text-base transition-colors duration-300 ${open === i ? 'text-solar-600' : 'text-night-800 group-hover:text-night-900'}`}>
                      {faq.q}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${open === i ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                    <p className="text-night-500 text-sm leading-relaxed pl-11">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
