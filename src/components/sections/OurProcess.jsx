"use client";

import React, { useRef } from 'react'
import { ClipboardCheck, Target, Settings, PlugZap } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'

const processSteps = [
  {
    num: '01',
    title: 'Site Analysis',
    desc: 'We conduct a free physical site survey, shadow analysis, and load audit to determine your exact energy needs.',
    icon: Target,
  },
  {
    num: '02',
    title: 'Custom Design',
    desc: 'Our engineering team creates a 3D layout of your roof to maximize solar yield and aesthetic integration.',
    icon: Settings,
  },
  {
    num: '03',
    title: 'Approvals & Paperwork',
    desc: 'We handle all documentation—from MPWZ net metering approvals to processing your PM Surya Ghar subsidy.',
    icon: ClipboardCheck,
  },
  {
    num: '04',
    title: 'Installation & Grid Tie',
    desc: 'Tier-1 panels are installed by certified technicians and commissioned quickly, ready to power your home.',
    icon: PlugZap,
  },
]

export default function OurProcess() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  })

  // Smooth out the scroll animation so it feels fluid
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section ref={containerRef} className="py-24 bg-night-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-night-800/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-night-800/30 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">
            <div className="w-6 h-px bg-white/50" />
            <span>Our Process</span>
            <div className="w-6 h-px bg-white/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Our <span className="text-white/60">Solar Installation Process.</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From the first phone call to the moment you flip the switch, we ensure a seamless transition to clean, renewable solar energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-20 right-20 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-transparent via-white/40 to-white origin-left"
              style={{ scaleX, width: '100%' }}
            />
          </div>

          {processSteps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
              className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-20 h-20 rounded-xl bg-night-800 border border-white/10 flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <step.icon className="w-8 h-8 text-white/80" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-night-900 flex items-center justify-center text-xs font-black shadow-lg">
                  {step.num}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
