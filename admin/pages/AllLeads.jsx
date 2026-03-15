"use client";

import React, { useState, useEffect, useMemo } from 'react'
import { Search, Download, Phone, ChevronDown } from 'lucide-react'
import { getLeads, updateLeadStatus, exportToCSV } from '../data/mockLeads'

const statusColors = {
  'New': 'bg-blue-100 text-blue-700 border-blue-200',
  'Called': 'bg-amber-100 text-amber-700 border-amber-200',
  'Converted': 'bg-green-100 text-green-700 border-green-200',
  'Not Interested': 'bg-night-100 text-night-500 border-night-200',
}

const ALL_STATUSES = ['New', 'Called', 'Converted', 'Not Interested']
const ALL_TYPES = ['Residential', 'Commercial', 'Industrial', 'Not Sure']

export default function AllLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setLeads(getLeads())
      setLoading(false)
    }, 400)
  }, [])

  const filteredLeads = useMemo(() => {
    let result = [...leads]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.city.toLowerCase().includes(q)
      )
    }
    if (filterType) result = result.filter(l => l.type === filterType)
    if (filterStatus) result = result.filter(l => l.status === filterStatus)
    return result.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [leads, search, filterType, filterStatus])

  const handleStatusChange = (id, newStatus) => {
    const updated = updateLeadStatus(id, newStatus)
    setLeads(updated)
    setEditingId(null)
  }

  const handleExport = () => {
    exportToCSV(filteredLeads, `sca-tech-leads-${new Date().toISOString().split('T')[0]}.csv`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-3 border-night-200 border-t-night-900 rounded-full animate-spin" />
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] opacity-0" style={{ animation: 'fadeUp 0.5s 0.1s ease-out forwards' }}>
        <div className="w-16 h-16 md:w-20 md:h-20 bg-night-100 rounded-2xl flex items-center justify-center mb-4">
          <Search className="w-6 h-6 md:w-8 md:h-8 text-night-300" />
        </div>
        <p className="text-night-900 font-bold text-base md:text-lg">No leads yet</p>
        <p className="text-night-400 text-sm mt-1 text-center px-4">When someone submits the contact form, their lead will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-5 max-w-[1400px]">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 opacity-0" style={{ animation: 'fadeUp 0.5s 0.1s ease-out forwards' }}>
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-300" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, phone, city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-night-200 bg-white focus:border-night-400 focus:ring-2 focus:ring-night-100 outline-none text-sm text-night-900 placeholder-night-300 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Type Filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="appearance-none w-full sm:w-auto pl-3 pr-8 py-2.5 rounded-xl border border-night-200 bg-white text-sm text-night-700 font-medium cursor-pointer focus:border-night-400 outline-none transition-all"
            >
              <option value="">All Types</option>
              {ALL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-night-300 pointer-events-none" />
          </div>
          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="appearance-none w-full sm:w-auto pl-3 pr-8 py-2.5 rounded-xl border border-night-200 bg-white text-sm text-night-700 font-medium cursor-pointer focus:border-night-400 outline-none transition-all"
            >
              <option value="">All Status</option>
              {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-night-300 pointer-events-none" />
          </div>
          {/* Export */}
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl bg-night-900 text-white text-sm font-semibold hover:bg-night-800 transition-all duration-300 flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3 opacity-0" style={{ animation: 'fadeUp 0.5s 0.25s ease-out forwards' }}>
        {filteredLeads.map(lead => (
          <div key={lead.id} className="bg-white rounded-2xl border border-night-100 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-night-100 flex items-center justify-center text-night-500 text-[10px] font-bold flex-shrink-0">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-night-900 text-sm font-semibold truncate">{lead.name}</p>
                  {lead.email && <p className="text-night-400 text-[10px] truncate">{lead.email}</p>}
                </div>
              </div>
              {editingId === lead.id ? (
                <div className="relative flex-shrink-0">
                  <select
                    value={lead.status}
                    onChange={e => handleStatusChange(lead.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    autoFocus
                    className="appearance-none pl-2 pr-6 py-1 rounded-lg border border-night-300 bg-white text-xs font-semibold cursor-pointer focus:border-night-500 outline-none"
                  >
                    {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-night-400 pointer-events-none" />
                </div>
              ) : (
                <button
                  onClick={() => setEditingId(lead.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex-shrink-0 ${statusColors[lead.status]}`}
                >
                  {lead.status}
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-night-400 text-[10px]">Phone</p>
                <p className="text-night-700 font-medium truncate">{lead.phone}</p>
              </div>
              <div>
                <p className="text-night-400 text-[10px]">City</p>
                <p className="text-night-700 font-medium">{lead.city}</p>
              </div>
              <div>
                <p className="text-night-400 text-[10px]">Type</p>
                <p className="text-night-700 font-medium">{lead.type}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-night-50">
              <span className="text-night-400 text-[10px]">
                {new Date(lead.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {new Date(lead.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <a
                href={`tel:${lead.phone.replace(/\s/g, '')}`}
                className="w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-green-600" />
              </a>
            </div>
          </div>
        ))}
        {filteredLeads.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-night-400 text-sm">No leads match your filters.</p>
          </div>
        )}
        <div className="bg-white rounded-xl p-3 border border-night-100 text-center">
          <p className="text-night-400 text-xs">
            Showing <span className="font-semibold text-night-700">{filteredLeads.length}</span> of <span className="font-semibold text-night-700">{leads.length}</span> leads
          </p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-night-100 overflow-hidden opacity-0" style={{ animation: 'fadeUp 0.5s 0.25s ease-out forwards' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-night-50/60">
                <th className="text-left py-3 px-5 text-[10px] font-bold text-night-400 uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-5 text-[10px] font-bold text-night-400 uppercase tracking-wider">Phone</th>
                <th className="text-left py-3 px-5 text-[10px] font-bold text-night-400 uppercase tracking-wider">City</th>
                <th className="text-left py-3 px-5 text-[10px] font-bold text-night-400 uppercase tracking-wider">System Type</th>
                <th className="text-left py-3 px-5 text-[10px] font-bold text-night-400 uppercase tracking-wider">Date & Time</th>
                <th className="text-left py-3 px-5 text-[10px] font-bold text-night-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-5 text-[10px] font-bold text-night-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-night-50">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-night-50/40 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-night-100 flex items-center justify-center text-night-500 text-[10px] font-bold flex-shrink-0">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-night-900 text-sm font-semibold">{lead.name}</p>
                        {lead.email && <p className="text-night-400 text-[10px]">{lead.email}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-night-700 text-sm font-medium">{lead.phone}</td>
                  <td className="py-3.5 px-5 text-night-700 text-sm">{lead.city}</td>
                  <td className="py-3.5 px-5">
                    <span className="px-2.5 py-1 rounded-lg bg-night-50 text-night-600 text-xs font-medium">
                      {lead.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-night-500 text-xs">
                    {new Date(lead.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    <br />
                    <span className="text-night-300">{new Date(lead.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    {editingId === lead.id ? (
                      <div className="relative">
                        <select
                          value={lead.status}
                          onChange={e => handleStatusChange(lead.id, e.target.value)}
                          onBlur={() => setEditingId(null)}
                          autoFocus
                          className="appearance-none pl-2 pr-6 py-1.5 rounded-lg border border-night-300 bg-white text-xs font-semibold cursor-pointer focus:border-night-500 outline-none"
                        >
                          {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-night-400 pointer-events-none" />
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingId(lead.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border cursor-pointer hover:opacity-80 transition-opacity ${statusColors[lead.status]}`}
                      >
                        {lead.status}
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-5">
                    <a
                      href={`tel:${lead.phone.replace(/\s/g, '')}`}
                      className="w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center transition-colors"
                      title="Call this lead"
                    >
                      <Phone className="w-3.5 h-3.5 text-green-600" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-night-400 text-sm">No leads match your filters.</p>
          </div>
        )}

        <div className="px-5 py-3 border-t border-night-100 bg-night-50/30 flex items-center justify-between">
          <p className="text-night-400 text-xs">
            Showing <span className="font-semibold text-night-700">{filteredLeads.length}</span> of <span className="font-semibold text-night-700">{leads.length}</span> leads
          </p>
        </div>
      </div>
    </div>
  )
}
