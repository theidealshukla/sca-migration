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
  "@type": "LocalBusiness",
  "name": "SCA Tech Solar",
  "description": "Indore's trusted solar installation company offering rooftop solar for homes, businesses, and industries across Madhya Pradesh.",
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
  "areaServed": ["Indore", "Bhopal", "Ujjain", "Dewas", "Ratlam", "Dhar", "Pithampur", "Mhow"],
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
        title="SCA Tech Solar | #1 Solar Panel Installation in Indore"
        description="SCA Tech Solar – Indore's trusted solar company & GoodWe dealer. PM Surya Ghar subsidy support, 2000+ installs, 16+ yrs experience."
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
