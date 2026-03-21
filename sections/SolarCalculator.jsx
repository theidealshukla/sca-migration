"use client";

import React, { useState, useMemo } from 'react'
import Link from 'next/link';
import { Zap, IndianRupee, Sun, Leaf, ArrowRight, Info, TrendingUp, Calendar, Battery } from 'lucide-react'

/*
 * ─────────────────────────────────────────────────────────────────
 *  SOLAR CALCULATOR — FORMULA SOURCE: CLIENT-PROVIDED
 *  System Size (kWp) = (Monthly Bill × 12) ÷ 8 ÷ 1460
 *
 *  Derivation:
 *    Annual Bill (₹)  = Monthly Bill × 12
 *    Annual Units (kWh) = Annual Bill ÷ ₹8 per unit   [blended Indian avg tariff]
 *    System Size (kWp)  = Annual Units ÷ 1460          [4 PSH/day × 365 days]
 *
 *  1460 kWh/kWp/year = 4 peak sun hours/day × 365 days
 *  This is the standard conservative yield used across India (MNRE / TERI)
 *  and accounts for real-world losses (soiling, temp, inverter, wiring ~20%).
 *
 *  ₹8/unit is the standard blended residential tariff used for Indian solar
 *  sizing calculations (midpoint of 5–12 ₹/unit slab range nationally).
 * ─────────────────────────────────────────────────────────────────
 *
 *  OTHER REAL-WORLD CONSTANTS
 *
 *  Subsidy  : PM Surya Ghar Muft Bijli Yojana (MNRE, residential only)
 *             1 kW → ₹30,000  |  2 kW → ₹60,000  |  3 kW+ → ₹78,000
 *  Cost     : ₹60,000/kWp residential  |  ₹55,000/kWp commercial (2024-25 market)
 *  Grid EF  : 0.82 tCO₂/MWh (CEA National Grid Emission Factor 2023-24)
 *  Degr.    : 0.5%/year panel output degradation (standard Tier-1 warranty)
 *  Tariff Δ : 5% annual hike (historical SERC India average)
 *  Trees    : 1 tonne CO₂ ≈ 40 trees/year (FAO standard)
 * ─────────────────────────────────────────────────────────────────
 */

// ── Core formula constants (DO NOT change — client-verified) ────
const ANNUAL_YIELD_PER_KWP = 1460   // kWh/kWp/year (4 PSH/day × 365)
const BLENDED_TARIFF = 8.00   // ₹/unit (Indian avg for sizing)

// ── Commercial tariff (flat LT commercial average India) ────────
const COM_TARIFF_RATE = 9.50        // ₹/unit

// ── System cost (2024-25 market, with installation) ─────────────
const COST_PER_KWP_RES = 60000      // ₹/kWp residential
const COST_PER_KWP_COM = 55000      // ₹/kWp commercial

// ── Degradation & escalation ────────────────────────────────────
const DEGRADATION_RATE = 0.005    // 0.5%/year
const TARIFF_ESCALATION = 0.05     // 5%/year

// ── CO₂ & trees (CEA 2023-24 + FAO) ────────────────────────────
const GRID_EMISSION_FACTOR = 0.82   // tCO₂/MWh
const TREES_PER_TONNE_CO2 = 40     // trees equivalent per tonne CO₂/year

// ── Phase limits ────────────────────────────────────────────────
const PHASE_LIMITS = { single: 5, three: Infinity }

// ── Roof constraint: 1 kWp needs ~100 sq ft (10 m² shadow-free) ─
const SQFT_PER_KWP = 100


/*
 * PM Surya Ghar subsidy slabs (residential on-grid, MNRE 2024)
 *   ≤ 1 kW  → ₹30,000
 *   ≤ 2 kW  → ₹60,000
 *   3 kW+   → ₹78,000  (capped — subsidy doesn't scale beyond 3 kW)
 */
function calcSubsidy(kWp) {
  if (kWp <= 0) return 0
  if (kWp <= 1) return Math.round(kWp * 30000)
  if (kWp <= 2) return 30000 + Math.round((kWp - 1) * 30000)
  if (kWp <= 3) return 60000 + Math.round((kWp - 2) * 18000)
  return 78000 // fixed cap for ≥ 3 kWp
}


/*
 * 25-year lifetime savings with:
 *   - 0.5% annual panel output degradation
 *   - 5% annual electricity tariff escalation
 */
function calcLifetimeSavings(annualSavings, years = 25) {
  let total = 0
  for (let y = 0; y < years; y++) {
    const degradationFactor = Math.pow(1 - DEGRADATION_RATE, y)
    const tariffFactor = Math.pow(1 + TARIFF_ESCALATION, y)
    total += annualSavings * degradationFactor * tariffFactor
  }
  return Math.round(total)
}


export default function SolarCalculator() {
  const [bill, setBill] = useState(3000)
  const [type, setType] = useState('residential')
  const [roofArea, setRoofArea] = useState(300)  // sq ft
  const [phase, setPhase] = useState('single')

  const calc = useMemo(() => {
    const costPerKWp = type === 'residential' ? COST_PER_KWP_RES : COST_PER_KWP_COM
    const tariffUsed = type === 'residential' ? BLENDED_TARIFF : COM_TARIFF_RATE

    // ── 1. SYSTEM SIZE via client formula ──────────────────────
    //    kWp = (monthly_bill × 12) ÷ 8 ÷ 1460
    const annualBill = bill * 12
    const annualUnitsConsumed = annualBill / tariffUsed           // kWh/year
    const rawSizeFromBill = annualUnitsConsumed / ANNUAL_YIELD_PER_KWP // kWp

    // ── 2. Roof constraint ──────────────────────────────────────
    const sizeFromRoof = roofArea / SQFT_PER_KWP                 // kWp

    // ── 3. Phase limit ──────────────────────────────────────────
    const phaseLimit = PHASE_LIMITS[phase]

    // ── 4. Final recommended size ───────────────────────────────
    //    Take the most constrained of the three, round to 0.5 kWp, min 1 kWp
    const constrainedSize = Math.min(rawSizeFromBill, sizeFromRoof, phaseLimit)
    const systemSize = Math.max(1, Math.round(constrainedSize * 2) / 2)

    // ── 5. Generation ───────────────────────────────────────────
    const annualGen = Math.round(systemSize * ANNUAL_YIELD_PER_KWP) // kWh/year
    const monthlyGen = Math.round(annualGen / 12)                     // kWh/month

    // ── 6. Units consumed per month ─────────────────────────────
    const monthlyUnitsConsumed = Math.round(annualUnitsConsumed / 12)

    // ── 7. Savings ──────────────────────────────────────────────
    //    You can only save on units you actually consume
    const monthlyUnitsSaved = Math.min(monthlyGen, monthlyUnitsConsumed)
    const annualUnitsSaved = monthlyUnitsSaved * 12
    const annualSavings = Math.round(annualUnitsSaved * tariffUsed)

    // ── 8. Cost + subsidy ───────────────────────────────────────
    const systemCost = Math.round(systemSize * costPerKWp)
    const subsidy = type === 'residential' ? calcSubsidy(systemSize) : 0
    const netCost = systemCost - subsidy

    // ── 9. Payback ──────────────────────────────────────────────
    const paybackYears = annualSavings > 0 ? (netCost / annualSavings) : 0

    // ── 10. Lifetime savings (25 yr) ────────────────────────────
    const lifetimeSavings = calcLifetimeSavings(annualSavings)

    // ── 11. ROI ─────────────────────────────────────────────────
    const roi = netCost > 0 ? Math.round((lifetimeSavings - netCost) / netCost * 100) : 0

    // ── 12. Environment ─────────────────────────────────────────
    const co2Annual = parseFloat((annualGen * GRID_EMISSION_FACTOR / 1000).toFixed(1)) // tonnes
    const treesEquiv = Math.round(co2Annual * TREES_PER_TONNE_CO2)

    // ── 13. Bill coverage % ─────────────────────────────────────
    const coveragePercent = Math.min(100, Math.round((monthlyUnitsSaved / Math.max(monthlyUnitsConsumed, 1)) * 100))

    // ── 14. Constraint flags ────────────────────────────────────
    const isRoofLimited = sizeFromRoof < rawSizeFromBill && sizeFromRoof <= phaseLimit
    const isPhaseLimited = phaseLimit < rawSizeFromBill && phaseLimit <= sizeFromRoof

    return {
      monthlyUnits: monthlyUnitsConsumed,
      effectiveTariff: tariffUsed.toFixed(2),
      systemSize,
      annualGen,
      monthlyGen,
      annualSavings,
      monthlySavings: Math.round(annualSavings / 12),
      systemCost,
      subsidy,
      netCost,
      paybackYears: paybackYears.toFixed(1),
      lifetimeSavings,
      roi,
      co2Annual,
      treesEquiv,
      coveragePercent,
      isRoofLimited,
      isPhaseLimited,
    }
  }, [bill, type, roofArea, phase])

  return (
    <section id="calculator" className="py-24 md:py-32 bg-night-950 relative overflow-hidden">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative">
          {/* ─── Input Panel ─── */}
          <div className="bg-night-900 rounded-3xl p-6 md:p-8 border border-white/5 relative">

            {/* Mobile Sticky Estimate */}
            <div className="lg:hidden sticky top-4 z-20 bg-white rounded-2xl p-4 mb-8 shadow-2xl shadow-black/50 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-night-400 text-xs font-semibold mb-0.5">Est. Annual Savings</p>
                <p className="text-night-900 font-black font-display text-2xl leading-none">
                  ₹{calc.annualSavings.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-night-400 text-xs font-semibold mb-0.5">System Size</p>
                <p className="text-solar-500 font-black text-lg leading-none">{calc.systemSize} kWp</p>
              </div>
            </div>            {/* Bill slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-semibold text-sm">Monthly Electricity Bill</label>
                <div className="flex items-center gap-1">
                  <span className="text-white/50 font-bold text-xl">₹</span>
                  <input
                    type="number"
                    value={bill === '' ? '' : bill}
                    onChange={e => setBill(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-24 bg-transparent text-white font-black text-2xl font-display text-right outline-none border-b border-white/20 focus:border-white p-0 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                </div>
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
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={roofArea === '' ? '' : roofArea}
                    onChange={e => setRoofArea(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-20 bg-transparent text-white font-black text-xl font-display text-right outline-none border-b border-white/20 focus:border-white p-0 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors"
                  />
                  <span className="text-white/50 font-bold text-sm">sq ft</span>
                </div>
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
                {[
                  { value: 'single', label: 'Single Phase', sub: 'Max 5 kWp' },
                  { value: 'three', label: 'Three Phase' }
                ].map(p => (
                  <button
                    key={p.value}
                    onClick={() => setPhase(p.value)}
                    className={`flex-1 py-3 px-4 rounded-2xl text-left transition-all duration-300 ${phase === p.value
                        ? 'bg-white/10 border border-white/20 ring-1 ring-white/10'
                        : 'bg-white/5 border border-transparent hover:bg-white/8'
                      }`}
                  >
                    <p className={`text-sm font-bold ${phase === p.value ? 'text-white' : 'text-night-400'}`}>{p.label}</p>
                    {p.sub && <p className="text-night-600 text-xs mt-0.5">{p.sub}</p>}
                  </button>
                ))}
              </div>
            </div>

            {/* Derived info pills */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Monthly Usage', value: `${calc.monthlyUnits} kWh`, icon: Zap },
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

            {/* Bill coverage bar */}
            <div className="mt-4 space-y-2">


              {(calc.isRoofLimited || calc.isPhaseLimited) && (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-0.5" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    {calc.isRoofLimited
                      ? `Roof area limits the system to ${calc.systemSize} kWp. More shadow-free roof space would increase coverage.`
                      : `Single phase connection limits the system to 5 kWp. Upgrade to three phase for higher capacity.`}
                  </p>
                </div>
              )}
            </div>

            {/* Methodology note */}
            <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-0.5" />
              <p className="text-white/40 text-[10px] leading-relaxed">
                System size = (Bill × 12) ÷ ₹8/unit ÷ 1,460 kWh/kWp — standard MNRE sizing formula.
                Assumes 4 peak sun hours/day, 20% system losses, ₹{COST_PER_KWP_RES.toLocaleString()}/kWp installed cost.
                Actual results vary by location and roof quality.
              </p>
            </div>
          </div>

          {/* ─── Results Panel ─── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            {/* Annual savings — hero card */}
            <div className="bg-white rounded-3xl p-8">
              <p className="text-night-400 text-sm font-semibold mb-2">Estimated annual savings</p>
              <p className="text-night-900 font-black font-display leading-none mb-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}>
                ₹{calc.annualSavings.toLocaleString()}
              </p>
              <p className="text-night-400 text-sm">
                That's <strong>₹{calc.monthlySavings.toLocaleString()}</strong> every month &middot; {calc.monthlyGen} kWh generated/mo
              </p>
            </div>

            {/* Cost + Subsidy + Net */}
            <div className={`grid gap-3 ${calc.subsidy > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              <div className="bg-night-900 border border-white/5 rounded-2xl p-4 text-center">
                <IndianRupee className="w-3.5 h-3.5 text-night-500 mx-auto mb-1.5" />
                <p className="text-white font-black text-lg font-display">₹{(calc.systemCost / 100000).toFixed(1)}L</p>
                <p className="text-night-500 text-[10px] mt-0.5">System Cost</p>
              </div>
              {calc.subsidy > 0 && (
                <div className="bg-night-900 border border-white/10 rounded-2xl p-4 text-center">
                  <Sun className="w-3.5 h-3.5 text-white/40 mx-auto mb-1.5" />
                  <p className="text-white font-black text-lg font-display">
                    {calc.subsidy >= 100000
                      ? `-₹${(calc.subsidy / 100000).toFixed(1)}L`
                      : `-₹${(calc.subsidy / 1000).toFixed(0)}K`}
                  </p>
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

            {/* Lifetime savings + trees */}
            <div className="bg-night-900 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-white/50 text-xs font-semibold mb-1">25-Year Lifetime Savings</p>
                <p className="text-white font-black text-2xl font-display">₹{(calc.lifetimeSavings / 100000).toFixed(1)} Lakh</p>
                <p className="text-night-500 text-[10px] mt-0.5">
                  Includes 5% annual tariff escalation &amp; 0.5% panel degradation
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