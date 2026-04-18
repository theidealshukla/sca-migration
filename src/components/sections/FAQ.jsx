"use client";

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What EPC services does ASA EPC offer?',
    a: 'ASA EPC provides turnkey EPC services covering ground mounted solar, rooftop solar, floating solar, agrovoltaic systems, transmission lines (up to 765 KV), and substations (33KV to 400KV). We handle the entire project lifecycle from design and planning to execution and commissioning.',
  },
  {
    q: 'What is ASA EPC\u2019s experience in the solar industry?',
    a: 'ASA EPC has 7+ years of proven EPC execution experience with 100+ projects successfully delivered. Our founders, Ashutosh Pandey, Pushpraj Singh Chouhan, and Kunal Choudhary, bring 16+ years of individual experience each. We are DPIIT-recognized and an authorized Waaree Energies franchisee partner.',
  },
  {
    q: 'Does ASA EPC handle government approvals?',
    a: 'Yes, we manage the entire approvals process including obtaining necessary permits and licenses, ensuring regulatory compliance, liaising with government agencies, and handling all documentation and follow-up to ensure timely project approvals.',
  },
  {
    q: 'What is BESS and Green Hydrogen?',
    a: 'BESS (Battery Energy Storage System) stores excess energy from renewables for later use, enhancing grid stability and efficiency. Green Hydrogen is a clean energy carrier produced by splitting water using renewable energy, offering a zero-emission alternative for power generation, transportation, and industrial applications.',
  },
  {
    q: 'Where does ASA EPC operate?',
    a: 'ASA EPC operates across India with projects in Madhya Pradesh, Rajasthan, Delhi, Tamilnadu, and other states. We also have an international office in Dubai, UAE through ASA PUMPS TRADING LLC.',
  },
  {
    q: 'What asset management services does ASA EPC provide?',
    a: 'We provide integrated asset management including Operation & Maintenance, Energy Audits, and Performance Monitoring with real-time tracking for optimal performance and longevity of power infrastructure.',
  },
  {
    q: 'Who are ASA EPC\'s major clients?',
    a: 'Our notable clients include Bajaj, L&T Construction, KEC International (RPG Group), Shyam Steel, Waaree, Monte Carlo, DRDO, Dr. C.V. Raman University, and Novus Green among others.',
  },
  {
    q: 'What types of substations does ASA EPC build?',
    a: 'ASA EPC executes high-voltage substations including Gas Insulated Substations (GIS) and Air Insulated Substations (AIS) spanning 33KV to 400KV, as well as 132KV traction substations for railway applications.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="py-24 bg-night-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left col */}
          <div className="lg:col-span-4">
            <p className="section-tag">FAQ</p>
            <h2 className="font-black text-night-900 leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
              Frequently asked questions.
            </h2>
            <p className="text-night-500 text-sm leading-relaxed mb-6">
              Can't find what you're looking for? Contact our team at mail@asa-epc.com or call +91-7554920666.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-night-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {faqs.length} common questions answered
            </div>
          </div>

          {/* Right col — accordions */}
          <div className="lg:col-span-8">
            {faqs.map((faq, i) => {
              const isOpen = i === openIdx
              return (
                <button
                  key={i}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="block w-full text-left border-b border-night-200 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 py-5">
                    <h3 className={`font-semibold leading-snug transition-colors duration-300 ${isOpen ? 'text-night-900' : 'text-night-700'}`}>
                      {faq.q}
                    </h3>
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-night-900 border-night-900 text-white rotate-180' : 'border-night-300 text-night-400'
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                    <p className="text-night-500 text-sm leading-relaxed pr-8">{faq.a}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
