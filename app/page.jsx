export const metadata = {
  title: 'SCA Tech Solar | Trusted Solar Panel Installation Across India',
  description: 'India\'s trusted solar EPC company. Residential 3-10kW, commercial and industrial rooftop solar with PM Surya Ghar subsidy support nationwide.',
  alternates: { canonical: 'https://scatechsolar.com' },
  openGraph: {
    title: 'SCA Tech Solar | Trusted Solar Panel Installation Across India',
    description: 'Premium rooftop solar for homes and businesses across India.',
    url: 'https://scatechsolar.com',
    siteName: 'SCA Tech Solar',
    type: 'website',
  }
};

import React from 'react'

import Hero from '../sections/Hero'
import StatsBar from '../sections/StatsBar'
import AboutVision from '../sections/AboutVision'
import ServicesOverview from '../sections/ServicesOverview'
import WhyChooseUs from '../sections/WhyChooseUs'
import OurProcess from '../sections/OurProcess'

import SolarCalculator from '../sections/SolarCalculator'
import ProjectsGallery from '../sections/ProjectsGallery'
import Testimonials from '../sections/Testimonials'
import SubsidyBanner from '../sections/SubsidyBanner'
import FAQ from '../sections/FAQ'
import ContactSection from '../sections/ContactSection'

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SCA Tech Solar",
  "description": "India's trusted solar installation company offering rooftop solar for homes, businesses, and industries nationwide.",
  "url": "https://scatech.netlify.app",
  "telephone": "+919826035454",
  "email": "info@scatechsolar.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "149, Shrawan Chambers, RNT Marg, Chhoti Gwaltol",
    "addressLocality": "Indore",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "452001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.7196",
    "longitude": "75.8577"
  },
  "image": "https://scatech.netlify.app/favicon.svg",
  "priceRange": "₹₹",
  "openingHours": "Mo-Sa 09:00-18:00",
  "areaServed": {"@type": "Country", "name": "India"},
  "sameAs": [
    "https://www.facebook.com/scatechsolar",
    "https://www.instagram.com/scatech.indore",
    "https://www.indiamart.com/sca-tech/"
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
            {"@type": "Question", "name": "How much does a solar installation cost in India?", "acceptedAnswer": {"@type": "Answer", "text": "A typical 3 kWp residential system costs ₹1.3–1.8 lakh before subsidy. After PM Surya Ghar subsidy of ₹78,000, net cost is ₹55,000–1,00,000. Commercial and industrial pricing is calculated per watt peak (₹45–55/Wp). Costs may vary slightly by region."}},
            {"@type": "Question", "name": "What is the payback period for solar in India?", "acceptedAnswer": {"@type": "Answer", "text": "With India's abundant sunshine averaging 250-300+ sunny days and rising electricity tariffs of ₹7–10/unit, payback periods are typically 3–5 years for residential and 2.5–4 years for commercial. After payback, you generate free electricity for the remaining 20+ years."}},
            {"@type": "Question", "name": "Will solar work during power cuts?", "acceptedAnswer": {"@type": "Answer", "text": "Standard on-grid systems do not work during outages (safety regulation). For 24/7 power, we offer hybrid systems with lithium battery backup. These provide 4–8 hours of backup for typical households."}},
            {"@type": "Question", "name": "How do I apply for the PM Surya Ghar subsidy?", "acceptedAnswer": {"@type": "Answer", "text": "SCA Tech handles the entire subsidy process at no extra cost. We register you on the PM Surya Ghar portal, coordinate with your local DISCOM for net meter, and ensure the subsidy is credited directly to your bank account."}},
            {"@type": "Question", "name": "How long does installation take?", "acceptedAnswer": {"@type": "Answer", "text": "Site survey on day 1. Equipment delivery on day 2–3. Physical installation takes 1–2 days. DISCOM net meter application is filed simultaneously and usually approved within 15–30 days."}},
            {"@type": "Question", "name": "What maintenance is required for solar panels?", "acceptedAnswer": {"@type": "Answer", "text": "Solar panels require minimal maintenance — mainly periodic cleaning to remove dust. In most Indian climates, cleaning every 2–3 months is sufficient. We offer Annual Maintenance Contracts starting ₹3,500/year including 2 cleanings and performance health checks."}},
            {"@type": "Question", "name": "What warranties do you provide?", "acceptedAnswer": {"@type": "Answer", "text": "We offer: 25-year linear performance warranty on Tier 1 panels, 10-year product warranty on panels, 5–10 year warranty on inverters, and 1-year installation workmanship warranty from SCA Tech with ongoing support."}},
            {"@type": "Question", "name": "Can I get solar installed on a rented property?", "acceptedAnswer": {"@type": "Answer", "text": "You can install solar on a rented property with the landlord's written consent. The system can be transferred if you move. Many landlords are agreeable as it increases property value."}}
          ]
        }) }}
      />
      <Hero />
      <StatsBar />
      <AboutVision />
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
