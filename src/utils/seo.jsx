import React from 'react'
import { Head } from 'vite-react-ssg'

const SITE_URL = 'https://scatech.netlify.app'
const DEFAULT_OG_IMAGE = 'https://scatech.netlify.app/favicon.svg'

/**
 * SEO head component — renders meta tags into <head> at build time via vite-react-ssg.
 * Use this on every page component for unique per-page SEO.
 */
export function SEOHead({
  title,
  description,
  path = '/',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  children,
}) {
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="SCA Tech Solar" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Head>
  )
}

/**
 * @deprecated Use <SEOHead> component instead for SSG-compatible SEO.
 * Kept for backward compatibility during migration.
 */
export const useSEO = ({ title, description, keywords }) => {
  // No-op — replaced by <SEOHead> which renders at build time
}
