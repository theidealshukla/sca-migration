import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Head } from 'vite-react-ssg'

const SITE_URL = 'https://scatech.netlify.app'

export default function Breadcrumb({ items }) {
  // items = [{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }]
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.label,
      "item": `${SITE_URL}${item.path}`
    }))
  }

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Head>
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-5 md:px-8 py-3">
        <ol className="flex items-center gap-1.5 text-xs text-night-400">
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3 text-night-300" />}
              {i === items.length - 1 ? (
                <span className="text-night-600 font-semibold">{item.label}</span>
              ) : (
                <Link to={item.path} className="hover:text-night-700 transition-colors">{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
