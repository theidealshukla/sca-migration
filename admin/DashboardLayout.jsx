"use client";

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, BarChart3, LogOut, Bell, Sun, Menu, X, ChevronRight, Zap, ExternalLink, Home } from 'lucide-react'

const navItems = [
  { path: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard, desc: "Today's summary" },
  { path: '/admin/dashboard/leads', label: 'All Leads', icon: Users, desc: 'Manage submissions' },
  { path: '/admin/dashboard/analytics', label: 'Analytics', icon: BarChart3, desc: 'Performance data' },
]

const pageSub = {
  Overview: "Here's what's happening today.",
  'All Leads': 'Manage and follow up on all submissions.',
  Analytics: 'Track performance and conversion trends.',
}

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [newLeadsCount, setNewLeadsCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(true)
  const navigate = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const auth = sessionStorage.getItem('sca_admin_auth')
    if (!auth) {
      setIsAuth(false)
      navigate.push('/admin')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('sca_admin_auth')
    navigate.push('/admin')
  }

  // Fetch new leads count for notification bell
  useEffect(() => {
    const fetchNewLeads = async () => {
      try {
        // Replace with your actual Supabase query
        // const { count } = await supabase.from('leads').select('*', { count: 'exact' }).eq('status', 'New')
        // setNewLeadsCount(count)
        setNewLeadsCount(3) // mock — remove when Supabase is wired
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchNewLeads()
  }, [])

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (!isAuth) return null

  const currentPage = navItems.find(n => n.path === pathname)?.label || 'Overview'
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-white/5 flex-shrink-0 ${collapsed && !mobileOpen ? 'justify-center' : 'gap-3'}`}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
          <Sun className="w-5 h-5 text-white" />
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-sm leading-tight tracking-tight">SCA Tech Solar</p>
            <p className="text-night-500 text-[10px] font-medium tracking-widest uppercase">Admin Panel</p>
          </div>
        )}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-night-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
        {(!collapsed || mobileOpen) && (
          <p className="text-night-600 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">Navigation</p>
        )}
        {navItems.map(item => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group
                ${isActive
                  ? 'bg-white/10 text-white'
                  : 'text-night-500 hover:text-white hover:bg-white/5'
                }
                ${collapsed && !mobileOpen ? 'justify-center' : ''}`
              }
            >
              {/* Amber left accent bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-amber-400" />
              )}
              <item.icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${isActive ? 'text-amber-400' : ''}`} />
              {(!collapsed || mobileOpen) && (
                <div className="flex-1 min-w-0">
                  <p className={`leading-tight ${isActive ? 'text-white font-bold' : ''}`}>{item.label}</p>
                  {isActive && <p className="text-night-500 text-[10px] mt-0.5">{item.desc}</p>}
                </div>
              )}
              {(!collapsed || mobileOpen) && isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* New leads badge in sidebar */}
      {(!collapsed || mobileOpen) && newLeadsCount > 0 && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-amber-300 text-xs font-bold">{newLeadsCount} new lead{newLeadsCount > 1 ? 's' : ''}</p>
              <p className="text-night-500 text-[10px]">Waiting for follow-up</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav Actions */}
      <div className="p-3 border-t border-white/5 flex-shrink-0 space-y-1">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-night-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full ${collapsed && !mobileOpen ? 'justify-center' : ''}`}
        >
          <Home className="w-[18px] h-[18px] flex-shrink-0" />
          {(!collapsed || mobileOpen) && (
            <div className="flex flex-1 items-center justify-between">
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </div>
          )}
        </Link>
        
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-night-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full ${collapsed && !mobileOpen ? 'justify-center' : ''}`}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {(!collapsed || mobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-night-100">

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex ${collapsed ? 'w-[72px]' : 'w-[260px]'} bg-night-950 flex-col transition-all duration-300 flex-shrink-0 border-r border-white/5`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <aside className={`absolute top-0 left-0 h-full w-[280px] bg-night-950 flex flex-col transition-transform duration-300 border-r border-white/5 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
        </aside>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar — dark, matches sidebar */}
        <header className="h-14 md:h-16 bg-night-950 border-b border-white/5 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 768) setMobileOpen(true)
                else setCollapsed(!collapsed)
              }}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-night-400 hover:text-white transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-white font-black text-base md:text-lg leading-tight tracking-tight">{currentPage}</h1>
              <p className="text-night-500 text-[10px] md:text-xs hidden sm:block">{pageSub[currentPage]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Date — hidden on small screens */}
            <p className="text-night-500 text-xs hidden lg:block">{today}</p>

            {/* Bell with live new leads count */}
            <button className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-night-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              {newLeadsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-amber-400 rounded-full border-2 border-night-950 flex items-center justify-center">
                  <span className="text-night-950 text-[9px] font-black px-0.5">{newLeadsCount}</span>
                </span>
              )}
            </button>

            {/* Admin profile */}
            <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3 border-l border-white/10">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-night-950 text-[10px] md:text-xs font-black flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-sm font-bold leading-tight">Admin</p>
                <p className="text-night-500 text-[10px]">Owner</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 md:p-6 w-full">
          {loading ? (
            // Loading skeleton
            <div className="animate-pulse space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-28 bg-night-200 rounded-2xl" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-64 bg-night-200 rounded-2xl" />
                <div className="h-64 bg-night-200 rounded-2xl" />
              </div>
              <div className="h-72 bg-night-200 rounded-2xl" />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}