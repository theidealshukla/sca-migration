export const metadata = {
  title: 'ASA EPC Pvt. Ltd. | Solar EPC & Renewable Energy Solutions',
  description: 'DPIIT-recognized solar EPC company. 7+ years, 100+ projects. ASA solar power plants, transmission lines, substations, BESS & asset management across India and UAE.',
  alternates: { canonical: 'https://www.asa-epc.com' },
  openGraph: {
    title: 'ASA EPC Pvt. Ltd. | Solar EPC & Renewable Energy Solutions',
    description: 'ASA EPC services for solar power plants, transmission lines, substations and renewable energy infrastructure.',
    url: 'https://www.asa-epc.com',
    siteName: 'ASA EPC Pvt. Ltd.',
    type: 'website',
  }
};

import React from 'react'

import Hero from '@/components/sections/Hero'
import StatsBar from '@/components/sections/StatsBar'
import AboutVision from '@/components/sections/AboutVision'
import BrandsMarquee from '@/components/sections/BrandsMarquee'
import ServicesOverview from '@/components/sections/ServicesOverview'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import OurProcess from '@/components/sections/OurProcess'

import SolarCalculator from '@/components/sections/SolarCalculator'
import ProjectsGallery from '@/components/sections/ProjectsGallery'
import Testimonials from '@/components/sections/Testimonials'
import SubsidyBanner from '@/components/sections/SubsidyBanner'
import FAQ from '@/components/sections/FAQ'
import ContactSection from '@/components/sections/ContactSection'

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ASA EPC Pvt. Ltd.",
  "description": "DPIIT-recognized solar EPC company delivering ASA solar power plants, transmission lines, substations, BESS and asset management services across India and UAE.",
  "url": "https://www.asa-epc.com",
  "telephone": "+917554920666",
  "email": "mail@asa-epc.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office B-22, Sector-C, Indrapuri, Near BHEL",
    "addressLocality": "Bhopal",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "462022",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.2599",
    "longitude": "77.4126"
  },
  "image": "https://www.asa-epc.com/icons/favicon.svg",
  "priceRange": "₹₹₹",
  "openingHours": "Mo-Sa 09:00-18:00",
  "areaServed": [
    {"@type": "Country", "name": "India"},
    {"@type": "Country", "name": "United Arab Emirates"}
  ],
  "sameAs": [
    "https://www.asa-epc.com",
    "https://www.asasolar.in"
  ]
}

export default function Home() {
  
  
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type": "Question", "name": "What EPC services does ASA EPC offer?", "acceptedAnswer": {"@type": "Answer", "text": "ASA EPC provides ASA EPC services covering ground mounted solar, rooftop solar, floating solar, agrovoltaic systems, transmission lines (up to 765 KV), and substations (33KV to 400KV). We handle the entire project lifecycle from design and planning to execution and commissioning."}},
            {"@type": "Question", "name": "What is ASA EPC's experience in the solar industry?", "acceptedAnswer": {"@type": "Answer", "text": "ASA EPC has 7+ years of proven EPC execution experience with 100+ projects successfully delivered. Our founders bring 16+ years of individual experience each. We are a DPIIT-recognized Startup India company and an authorized Waaree Energies franchisee partner."}},
            {"@type": "Question", "name": "Does ASA EPC handle government approvals?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, ASA EPC manages the entire approvals process including obtaining necessary permits and licenses, ensuring regulatory compliance, liaising with government agencies, and handling all documentation and follow-up to ensure timely approvals."}},
            {"@type": "Question", "name": "What is BESS and Green Hydrogen?", "acceptedAnswer": {"@type": "Answer", "text": "BESS (Battery Energy Storage System) stores excess energy from renewables for later use, enhancing grid stability and efficiency. Green Hydrogen is a clean energy carrier produced by splitting water using renewable energy, offering a zero-emission alternative for power generation, transportation, and industrial applications."}},
            {"@type": "Question", "name": "Where does ASA EPC operate?", "acceptedAnswer": {"@type": "Answer", "text": "ASA EPC operates across India with projects in Madhya Pradesh, Rajasthan, Delhi, Tamilnadu, and other states. We also have an international office in Dubai, UAE through ASA PUMPS TRADING LLC."}},
            {"@type": "Question", "name": "What asset management services does ASA EPC provide?", "acceptedAnswer": {"@type": "Answer", "text": "We provide integrated asset management including Operation & Maintenance, Energy Audits, and Performance Monitoring with real-time tracking for optimal performance and longevity of power infrastructure."}},
            {"@type": "Question", "name": "Who are ASA EPC's major clients?", "acceptedAnswer": {"@type": "Answer", "text": "Our notable clients include Bajaj, L&T Construction, KEC International (RPG Group), Shyam Steel, Waaree, Monte Carlo, DRDO, and Dr. C.V. Raman University among others."}},
            {"@type": "Question", "name": "What types of substations does ASA EPC build?", "acceptedAnswer": {"@type": "Answer", "text": "ASA EPC executes high-voltage substations including Gas Insulated Substations (GIS) and Air Insulated Substations (AIS) spanning 33KV to 400KV, as well as 132KV traction substations for railway applications."}}
          ]
        }) }}
      />
      <Hero />
      <StatsBar />
      <AboutVision />
      <BrandsMarquee />
      <ServicesOverview />
      <WhyChooseUs />
      <OurProcess />
      <SolarCalculator />
      <ProjectsGallery />
      <Testimonials />
      <SubsidyBanner />
      <FAQ />
      <ContactSection />
    </>
  )
}
