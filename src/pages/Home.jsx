import React from 'react'
import { SEOHead } from '../utils/seo'
import Hero from '../sections/Hero'
import StatsBar from '../sections/StatsBar'
import AboutVision from '../sections/AboutVision'
import ServicesOverview from '../sections/ServicesOverview'
import WhyChooseUs from '../sections/WhyChooseUs'
import OurProcess from '../sections/OurProcess'
import ProductsShowcase from '../sections/ProductsShowcase'
import SolarCalculator from '../sections/SolarCalculator'
import ProjectsGallery from '../sections/ProjectsGallery'
import Testimonials from '../sections/Testimonials'
import SubsidyBanner from '../sections/SubsidyBanner'
import FAQ from '../sections/FAQ'
import ContactSection from '../sections/ContactSection'

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SolarInstallationService",
  "name": "SCA Tech Solar",
  "description": "Indore's trusted solar installation company offering GoodWe inverters, TOPCon bifacial panels, PM Surya Ghar subsidy support & MPEB net metering.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "149 Shrawan Chambers, RNT Marg, Chhoti Gwaltol",
    "addressLocality": "Indore",
    "postalCode": "452001",
    "addressRegion": "Madhya Pradesh",
    "addressCountry": "IN"
  },
  "telephone": "+91 98260 35454",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.7196,
    "longitude": 75.8577
  },
  "url": "https://scatech.netlify.app/",
  "image": "https://scatech.netlify.app/favicon.svg",
  "priceRange": "₹₹",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "areaServed": ["Indore", "Bhopal", "Dewas", "Ujjain", "Pithampur"],
  "serviceType": "Solar Energy Installation",
  "sameAs": [
    "https://www.facebook.com/scatechsolar",
    "https://www.instagram.com/scatech.indore",
    "https://www.indiamart.com/sca-tech/"
  ]
}

export default function Home() {
  return (
    <>
      <SEOHead
        title="SAC-TECH | Top Solar EPC Company MP & Indore"
        description="SCA Tech Solar – Indore's trusted solar installation company. GoodWe inverters, TOPCon bifacial panels, PM Surya Ghar subsidy support & MPEB net metering. Free site survey."
        path="/"
      >
        <meta name="keywords" content="solar panel installation in Indore, solar company in Indore, rooftop solar Indore, GoodWe inverter dealer Indore, solar subsidy Indore, PM Surya Ghar Yojana Indore" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </SEOHead>
      <Hero />
      <StatsBar />
      <AboutVision />
      <ServicesOverview />
      <WhyChooseUs />
      <OurProcess />
      <ProductsShowcase />
      <SolarCalculator />
      <ProjectsGallery />
      <Testimonials />
      <SubsidyBanner />
      <FAQ />
      <ContactSection />
    </>
  )
}
