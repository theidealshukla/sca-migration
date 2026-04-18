import { Inter, Geist } from 'next/font/google';
import '../styles/globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-inter'
});

export const metadata = {
  metadataBase: new URL('https://www.asa-epc.com'),
  title: {
    default: 'ASA EPC Pvt. Ltd. | Solar EPC & Renewable Energy Solutions',
    template: '%s | ASA EPC Pvt. Ltd.'
  },
  description: 'DPIIT-recognized solar EPC company delivering ASA solar power plants, transmission lines, substations, BESS & asset management across India and UAE. 7+ years, 100+ projects.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("font-sans text-night-900 bg-white", geist.variable)}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Organization",
               "name": "ASA EPC Pvt. Ltd.",
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
               "areaServed": [
                 {"@type": "Country", "name": "India"},
                 {"@type": "Country", "name": "United Arab Emirates"}
               ],
               "priceRange": "₹₹₹",
               "openingHours": "Mo-Sa 09:00-18:00"
             })
          }}
        />
      </body>
    </html>
  );
}