"use client";

import { STATS } from '../constants/stats';

import React, { useState, useMemo } from 'react'

import Link from 'next/link';
import { Zap, IndianRupee, Sun, Leaf, ArrowRight, Info, TrendingUp, Calendar, Battery } from 'lucide-react'

/*
 * ──────────────────────────────────────────────────
 *  REAL-WORLD CONSTANTS  (Indore / MP — 2024-25)
 * ──────────────────────────────────────────────────
 *
 *  Tariff source  : MPCZ / MPEZ FY 2024-25 tariff order
 *  Subsidy source : PM Surya Ghar Muft Bijli Yojana (MNRE)
 *  Solar yield    : Indore receives ~5.5 peak sun hours/day (NISE data)
 *  System cost    : Market rates for Tier-1 on-grid installations in MP
 */

// ── MP Residential slab-wise tariff (₹/unit) ────────────────
// Simplified effective blended rates based on MPCZ LT tariff 2024-25
const RES_TARIFF_SLABS = [
  { upto: 50,  rate: 4.25 },   // 0–50 units
  { upto: 100, rate: 5.35 },   // 51–100
  { upto: 150, rate: 6.10 },   // 101–150
  { upto: 200, rate: 6.60 },   // 151–200
  { upto: 300, rate: 7.10 },   // 201–300
  { upto: Infinity, rate: 7.75 }, // 301+
]

const COM_TARIFF_RATE = 9.20 // ₹/unit flat average for commercial LT

// ── Solar generation parameters (Indore) ────────────────────
const PEAK_SUN_HOURS = 5.5       // hrs/day annual average
const SYSTEM_LOSSES  = 0.80      // inverter + cable + soiling + temp losses
const DAILY_YIELD_PER_KWP = PEAK_SUN_HOURS * SYSTEM_LOSSES // ~4.4 kWh/day/kWp
const ANNUAL_YIELD_PER_KWP = DAILY_YIELD_PER_KWP * 365     // ~1,606 kWh/yr/kWp
const DEGRADATION_RATE = 0.005   // 0.5% per year panel degradation

// ── System cost ─────────────────────────────────────────────
const COST_PER_KWP_RES = 62000   // ₹/kWp residential (with installation)
const COST_PER_KWP_COM = 55000   // ₹/kWp commercial (economies of scale)

// ── PM Surya Ghar subsidy slabs (residential only) ──────────
function calcSubsidy(kWp) {
  if (kWp <= 0) return 0
  // Subsidy only for residential, max benefit at 3 kWp
  // 1 kW: ₹30,000   |  2 kW: ₹60,000  |  3 kW+: ₹78,000
  const kw = Math.min(kWp, 10) // subsidy up to 10 kWp
  if (kw <= 2) return Math.round(kw * 30000)
  if (kw <= 3) return 60000 + Math.round((kw - 2) * 18000)
  return 78000 // fixed for 3 kWp and above
}

// ── Calculate effective tariff for given units (residential slab) ─
function calcBillFromUnits(units) {
  let bill = 0
  let remaining = units
  let prevUpto = 0
  for (const slab of RES_TARIFF_SLABS) {
    const slabUnits = Math.min(remaining, slab.upto - prevUpto)
    if (slabUnits <= 0) break
    bill += slabUnits * slab.rate
    remaining -= slabUnits
    prevUpto = slab.upto
  }
  return bill
}

function calcUnitsFromBill(bill, type) {
  if (type === 'commercial') return Math.round(bill / COM_TARIFF_RATE)
  // For residential, iterate slabs to find units
  let remaining = bill
  let units = 0
  let prevUpto = 0
  for (const slab of RES_TARIFF_SLABS) {
    const maxSlabUnits = slab.upto - prevUpto
    const maxSlabCost = maxSlabUnits * slab.rate
    if (remaining <= maxSlabCost) {
      units += Math.round(remaining / slab.rate)
      break
    }
    units += maxSlabUnits
    remaining -= maxSlabCost
    prevUpto = slab.upto
  }
  return units
}

// ── 25-year lifetime savings calculation ────────────────────
function calcLifetimeSavings(annualGenKWh, annualBillSaved, years = 25) {
  let total = 0
  const tariffEscalation = 0.05 // 5% annual tariff hike (historical MP average)
  for (let y = 0; y < years; y++) {
    const degradedGen = annualGenKWh * Math.pow(1 - DEGRADATION_RATE, y)
    const escalatedRate = annualBillSaved * Math.pow(1 + tariffEscalation, y) / annualBillSaved
    // savings in year y = min(degraded generation ratio, 1) × base savings × tariff escalation
    const genRatio = degradedGen / annualGenKWh
    total += annualBillSaved * genRatio * Math.pow(1 + tariffEscalation, y)
  }
  return Math.round(total)
}


export default function SolarCalculator() {
  const [bill, setBill] = useState(3000)
  const [type, setType] = useState('residential')
  const [roofArea, setRoofArea] = useState(300) // sq ft
  const [phase, setPhase] = useState('single') // single or three

  const calc = useMemo(() => {
    const tariff = type === 'residential'
      ? (bill / Math.max(calcUnitsFromBill(bill, type), 1))
      : COM_TARIFF_RATE

    const units = calcUnitsFromBill(bill, type)
    const costPerKWp = type === 'residential' ? COST_PER_KWP_RES : COST_PER_KWP_COM

    // System size from consumption need
    const sizeFromConsumption = units / (ANNUAL_YIELD_PER_KWP / 12) // monthly units → kWp
    
    // System size from roof area (1 kWp needs ~100 sq ft)
    const sizeFromRoof = roofArea / 100

    // Phase limits: single phase max 5 kWp, three phase max 10 kWp
    const phaseLimit = phase === 'single' ? 5 : 10

    // Recommended size = min of consumption need, roof constraint, phase limit
    const rawSize = Math.min(sizeFromConsumption, sizeFromRoof, phaseLimit)
    const systemSize = Math.max(1, Math.round(rawSize * 2) / 2) // round to nearest 0.5 kWp, min 1 kWp

    // Annual generation
    const annualGen = Math.round(systemSize * ANNUAL_YIELD_PER_KWP)
    const monthlyGen = Math.round(annualGen / 12)

    // Annual savings (can't save more than you consume)
    const monthlyUnitsSaved = Math.min(monthlyGen, units)
    const annualUnitsSaved = monthlyUnitsSaved * 12

    // Calculate actual bill savings using slab rates
    let annualSavings
    if (type === 'residential') {
      const currentBill = calcBillFromUnits(units)
      const reducedBill = calcBillFromUnits(Math.max(0, units - monthlyUnitsSaved))
      annualSavings = Math.round((currentBill - reducedBill) * 12)
    } else {
      annualSavings = Math.round(annualUnitsSaved * COM_TARIFF_RATE)
    }

    // System cost
    const systemCost = Math.round(systemSize * costPerKWp)

    // Subsidy (residential only, on-grid only)
    const subsidy = type === 'residential' ? calcSubsidy(systemSize) : 0
    const netCost = systemCost - subsidy

    // Payback period
    const paybackYears = annualSavings > 0 ? netCost / annualSavings : 0

    // 25-year lifetime savings (with degradation + tariff escalation)
    const lifetimeSavings = calcLifetimeSavings(annualGen, annualSavings)

    // ROI
    const roi = netCost > 0 ? ((lifetimeSavings - netCost) / netCost * 100) : 0

    // CO₂ offset (India grid emission factor: 0.82 tCO₂/MWh — CEA 2023)
    const co2Annual = annualGen * 0.82 / 1000 // tonnes
    const treesEquiv = Math.round(co2Annual * parseInt(STATS.capacityMW))

    // Effective tariff
    const effectiveTariff = tariff.toFixed(2)

    // Capacity constraint warning
    const isRoofLimited = sizeFromRoof < sizeFromConsumption
    const isPhaseLimited = phaseLimit < Math.min(sizeFromConsumption, sizeFromRoof)
    const coveragePercent = Math.min(100, Math.round((monthlyGen / Math.max(units, 1)) * 100))

    return {
      units,
      effectiveTariff,
      systemSize,
      annualGen,
      monthlyGen,
      annualSavings,
      systemCost,
      subsidy,
      netCost,
      paybackYears: paybackYears.toFixed(1),
      lifetimeSavings,
      roi: Math.round(roi),
      co2Annual: co2Annual.toFixed(1),
      treesEquiv,
      coveragePercent,
      isRoofLimited,
      isPhaseLimited,
    }
  }, [bill, type, roofArea, phase])

  return (
    <section className="py-24 md:py-32 bg-night-950 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
            <span className="block w-6 h-px bg-white/30" />
            Savings Calculator
            <span className="block w-6 h-px bg-white/30" />
          </p>
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
            Calculate PM Surya Ghar <span className="font-light text-white/40">Subsidy & Savings.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ─── Input Panel ─── */}
          <div className="bg-night-900 rounded-3xl p-8 border border-white/5">
            {/* Type selector */}
            <div className="flex gap-3 mb-8">
              {['residential', 'commercial'].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-3 rounded-2xl text-sm font-bold capitalize transition-all duration-300 ${
                    type === t
                      ? 'bg-white text-night-900 shadow-lg'
                      : 'bg-white/5 text-night-400 hover:bg-white/10'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Bill slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-semibold text-sm">Monthly Electricity Bill</label>
                <span className="text-white font-black text-2xl font-display">₹{bill.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={500}
                max={type === 'commercial' ? 100000 : 25000}
                step={500}
                value={bill}
                onChange={e => setBill(Number(e.target.value))}
                className="w-full h-2 bg-night-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="flex justify-between mt-2">
                <span className="text-night-600 text-xs">₹500</span>
                <span className="text-night-600 text-xs">₹{type === 'commercial' ? '1,00,000' : '25,000'}</span>
              </div>
            </div>

            {/* Roof area slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-semibold text-sm">Available Roof Area</label>
                <span className="text-white font-black text-xl font-display">{roofArea} sq ft</span>
              </div>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={roofArea}
                onChange={e => setRoofArea(Number(e.target.value))}
                className="w-full h-2 bg-night-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="flex justify-between mt-2">
                <span className="text-night-600 text-xs">100 sq ft</span>
                <span className="text-night-600 text-xs">2,000 sq ft</span>
              </div>
            </div>

            {/* Connection phase */}
            <div className="mb-6">
              <label className="text-white font-semibold text-sm block mb-3">Electricity Connection</label>
              <div className="flex gap-3">
                {[{ value: 'single', label: 'Single Phase', sub: 'Max 5 kWp' }, { value: 'three', label: 'Three Phase', sub: 'Max 10 kWp' }].map(p => (
                  <button
                    key={p.value}
                    onClick={() => setPhase(p.value)}
                    className={`flex-1 py-3 px-4 rounded-2xl text-left transition-all duration-300 ${
                      phase === p.value
                        ? 'bg-white/10 border border-white/20 ring-1 ring-white/10'
                        : 'bg-white/5 border border-transparent hover:bg-white/8'
                    }`}
                  >
                    <p className={`text-sm font-bold ${phase === p.value ? 'text-white' : 'text-night-400'}`}>{p.label}</p>
                    <p className="text-night-600 text-xs mt-0.5">{p.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Derived info */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Monthly Usage', value: `${calc.units} kWh`, icon: Zap },
                { label: 'Avg Tariff', value: `₹${calc.effectiveTariff}/u`, icon: IndianRupee },
                { label: 'System Size', value: `${calc.systemSize} kWp`, icon: Sun },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white/5 rounded-2xl p-3 text-center">
                  <Icon className="w-3.5 h-3.5 text-white/40 mx-auto mb-1.5" />
                  <p className="text-white font-black text-sm">{value}</p>
                  <p className="text-night-500 text-[10px] mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Coverage & warnings */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
                <div className="flex-1">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white/50 text-xs font-semibold">Bill Coverage</span>
                    <span className="text-white font-bold text-xs">{calc.coveragePercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-night-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-white/60 to-white rounded-full transition-all duration-700"
                      style={{ width: `${calc.coveragePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {(calc.isRoofLimited || calc.isPhaseLimited) && (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-0.5" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    {calc.isRoofLimited
                      ? `Your roof area limits the system to ${calc.systemSize} kWp. More roof space would cover more of your bill.`
                      : `Single phase connection limits system to 5 kWp. Upgrade to three phase for higher capacity.`}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-0.5" />
              <p className="text-white/40 text-[10px] leading-relaxed">
                Based on MPCZ FY 2024-25 tariff slabs, Indore avg. {PEAK_SUN_HOURS} peak sun hours/day, & PM Surya Ghar subsidy rates. 
                Includes {((1 - SYSTEM_LOSSES) * 100).toFixed(0)}% system losses. Actual savings vary.
              </p>
            </div>
          </div>

          {/* ─── Results Panel ─── */}
          <div className="flex flex-col gap-4">
            {/* Annual savings — hero card */}
            <div className="bg-white rounded-3xl p-8">
              <p className="text-night-400 text-sm font-semibold mb-2">Estimated annual savings</p>
              <p className="text-night-900 font-black font-display leading-none mb-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}>
                ₹{calc.annualSavings.toLocaleString()}
              </p>
              <p className="text-night-400 text-sm">
                That's <strong>₹{Math.round(calc.annualSavings / 12).toLocaleString()}</strong> every month &middot; {calc.monthlyGen} kWh generated/mo
              </p>
            </div>

            {/* Cost + Subsidy + Net */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-night-900 border border-white/5 rounded-2xl p-4 text-center">
                <IndianRupee className="w-3.5 h-3.5 text-night-500 mx-auto mb-1.5" />
                <p className="text-white font-black text-lg font-display">₹{(calc.systemCost / 100000).toFixed(1)}L</p>
                <p className="text-night-500 text-[10px] mt-0.5">System Cost</p>
              </div>
              {calc.subsidy > 0 && (
                <div className="bg-night-900 border border-white/10 rounded-2xl p-4 text-center">
                  <Sun className="w-3.5 h-3.5 text-white/40 mx-auto mb-1.5" />
                  <p className="text-white font-black text-lg font-display">-₹{(calc.subsidy / 1000).toFixed(0)}K</p>
                  <p className="text-night-500 text-[10px] mt-0.5">PM Surya Ghar</p>
                </div>
              )}
              <div className="bg-night-900 border border-white/5 rounded-2xl p-4 text-center">
                <IndianRupee className="w-3.5 h-3.5 text-night-500 mx-auto mb-1.5" />
                <p className="text-white font-black text-lg font-display">₹{(calc.netCost / 100000).toFixed(1)}L</p>
                <p className="text-night-500 text-[10px] mt-0.5">Net Investment</p>
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-night-900 border border-white/5 rounded-2xl p-3 text-center">
                <Calendar className="w-3.5 h-3.5 text-white/40 mx-auto mb-1" />
                <p className="text-white font-black text-lg font-display">{calc.paybackYears}</p>
                <p className="text-night-500 text-[10px]">Yr Payback</p>
              </div>
              <div className="bg-night-900 border border-white/5 rounded-2xl p-3 text-center">
                <TrendingUp className="w-3.5 h-3.5 text-white/40 mx-auto mb-1" />
                <p className="text-white font-black text-lg font-display">{calc.roi}%</p>
                <p className="text-night-500 text-[10px]">25-Yr ROI</p>
              </div>
              <div className="bg-night-900 border border-white/5 rounded-2xl p-3 text-center">
                <Leaf className="w-3.5 h-3.5 text-white/40 mx-auto mb-1" />
                <p className="text-white font-black text-lg font-display">{calc.co2Annual}T</p>
                <p className="text-night-500 text-[10px]">CO₂/Yr</p>
              </div>
              <div className="bg-night-900 border border-white/5 rounded-2xl p-3 text-center">
                <Battery className="w-3.5 h-3.5 text-white/40 mx-auto mb-1" />
                <p className="text-white font-black text-lg font-display">25+</p>
                <p className="text-night-500 text-[10px]">Yr Life</p>
              </div>
            </div>

            {/* Lifetime savings */}
            <div className="bg-night-900 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-white/50 text-xs font-semibold mb-1">25-Year Lifetime Savings</p>
                <p className="text-white font-black text-2xl font-display">₹{(calc.lifetimeSavings / 100000).toFixed(1)} Lakh</p>
                <p className="text-night-500 text-[10px] mt-0.5">
                  Includes 5% annual tariff escalation & 0.5% panel degradation
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-xs font-semibold mb-1">≈ Trees Planted</p>
                <p className="text-white font-black text-2xl font-display">{calc.treesEquiv}</p>
                <p className="text-night-500 text-[10px] mt-0.5">equivalent CO₂ offset</p>
              </div>
            </div>

            <Link href="/contact" className="btn-primary justify-center text-center">
              Get Exact Quote — Free Site Survey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
