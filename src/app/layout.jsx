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
  metadataBase: new URL('https://scatechsolar.com'),
  title: {
    default: 'SCA Tech Solar | Trusted Solar Panel Installation',
    template: '%s | SCA Tech Solar'
  },
  description: 'India\'s trusted solar installation company. Residential, commercial & industrial solar solutions with PM Surya Ghar subsidy support.',
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
               "name": "SCA Tech Solar",
               "url": "https://scatechsolar.com",
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
               "areaServed": {"@type": "Country", "name": "India"},
               "priceRange": "₹₹",
               "openingHours": "Mo-Sa 09:00-19:00"
             })
          }}
        />
      </body>
    </html>
  );
}