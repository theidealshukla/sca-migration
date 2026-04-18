"use client";

import React from 'react';

const brands = [
  { src: '/images/brands/wipro.avif',        alt: 'Bajaj' },
  { src: '/images/brands/nestle.avif',        alt: 'L&T Construction' },
  { src: '/images/brands/ltimindtree.avif',   alt: 'KEC International' },
  { src: '/images/brands/raymond.avif',       alt: 'Shyam Steel' },
  { src: '/images/brands/clean-science.avif', alt: 'Waaree' },
  { src: '/images/brands/gabriel.avif',       alt: 'Monte Carlo' },
  { src: '/images/brands/mumbai-port.avif',   alt: 'Novus Green' },
];

export default function BrandsMarquee() {
  // Duplicate array for seamless infinite scroll
  const allBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12 md:mb-16">
          <p className="section-tag justify-center">Our Clients</p>
          <h2
            className="font-black text-night-900 leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '-0.03em' }}
          >
            Trusted by Industry Leaders
          </h2>
          <p className="text-night-400 text-sm md:text-base max-w-xl mx-auto">
            Projects executed for <span className="font-semibold text-night-600">Bajaj, L&T, KEC, Shyam Steel, Waaree</span> and more.
          </p>
        </div>

        {/* ── Marquee ── */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <style>{`
            @keyframes brand-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(calc(-100% / 3)); }
            }
            .brand-track {
              animation: brand-scroll 35s linear infinite;
            }
            .brand-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="brand-track flex items-center w-max">
            {allBrands.map((brand, i) => (
              <div
                key={i}
                className="group flex-shrink-0 mx-3 md:mx-5"
              >
                <div className="h-20 md:h-24 w-36 md:w-44 flex items-center justify-center rounded-xl bg-night-50/80 border border-night-100/80 px-5 py-4 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-night-900/[0.06] hover:border-night-200 hover:-translate-y-1">
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom accent line ── */}
        <div className="mt-10 md:mt-14 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-night-200" />
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-night-300">
            Trusted Partners
          </p>
          <div className="h-px w-12 bg-night-200" />
        </div>

      </div>
    </section>
  );
}
