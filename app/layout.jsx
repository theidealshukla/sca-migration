import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-inter'
});

export const metadata = {
  metadataBase: new URL('https://scatechsolar.com'),
  title: {
    default: 'SCA Tech Solar | Solar Panel Installation Indore',
    template: '%s | SCA Tech Solar'
  },
  description: 'Indore\'s leading solar installation company.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "LocalBusiness",
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
               "areaServed": ["Indore","Bhopal","Ujjain","Dewas","Ratlam","Dhar","Pithampur","Mhow"],
               "priceRange": "₹₹",
               "openingHours": "Mo-Sa 09:00-19:00"
             })
          }}
        />
      </body>
    </html>
  );
}