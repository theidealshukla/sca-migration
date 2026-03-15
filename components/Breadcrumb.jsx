"use client";

import React from 'react'
import Link from 'next/link';
import { ChevronRight } from 'lucide-react'

const SITE_URL = 'https://scatech.netlify.app'

export default function Breadcrumb({ items }) {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-5 md:px-8 py-3">
        <ol className="flex items-center gap-1.5 text-xs text-night-400">
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3 text-night-300" />}
              {i === items.length - 1 ? (
                <span className="text-night-600 font-semibold">{item.label}</span>
              ) : (
                <Link href={item.path} className="hover:text-night-700 transition-colors">{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
