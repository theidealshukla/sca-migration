"use client";

import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { LayoutDashboard, Users, BarChart3, LogOut, Bell, Sun, Menu, X, ChevronRight, Zap, Home, ExternalLink } from 'lucide-react'

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
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('sca_admin_auth')
    navigate.push('/admin')
  }

  useEffect(() => {
    const fetchNewLeads = async () => {
      try {
        setNewLeadsCount(3)
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

  if (!isAuth) return null;

  const currentPage = navItems.find(n => n.path === pathname)?.label || 'Overview'
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-night-950">
      {/* Logo */}
      <div className={`flex items-center h-14 px-4 border-b border-white/5 flex-shrink-0 ${collapsed && !mobileOpen ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
          <Sun className="w-4 h-4 text-white" />
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-sm leading-tight tracking-tight">SCA Tech Solar</p>
            <p className="text-night-500 text-[9px] font-medium tracking-widest uppercase">Admin Panel</p>
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
      <nav className="flex-1 py-3 px-2.5 flex flex-col gap-0.5 overflow-y-auto">
        {(!collapsed || mobileOpen) && (
          <p className="text-night-600 text-[9px] font-bold uppercase tracking-widest px-3 mb-1.5">Navigation</p>
        )}
        {navItems.map(item => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative group
                ${isActive
                  ? 'bg-white/10 text-white'
                  : 'text-night-500 hover:text-white hover:bg-white/5'
                }
                ${collapsed && !mobileOpen ? 'justify-center' : ''}`
              }
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-amber-400" />
              )}
              <item.icon className={`w-[16px] h-[16px] flex-shrink-0 transition-colors ${isActive ? 'text-amber-400' : ''}`} />
              {(!collapsed || mobileOpen) && (
                <div className="flex-1 min-w-0">
                  <p className={`leading-tight text-[13px] ${isActive ? 'text-white font-bold' : ''}`}>{item.label}</p>
                  {isActive && <p className="text-night-500 text-[9px] mt-0.5">{item.desc}</p>}
                </div>
              )}
              {(!collapsed || mobileOpen) && isActive && (
                <ChevronRight className="w-3 h-3 text-amber-400 flex-shrink-0" />
              )}
            </Link>
          )
        })}

        {/* Divider */}
        <div className="my-2 border-t border-white/5" />

        {/* Home link */}
        {(!collapsed || mobileOpen) && (
          <p className="text-night-600 text-[9px] font-bold uppercase tracking-widest px-3 mb-1.5">Quick Links</p>
        )}
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-night-500 hover:text-white hover:bg-white/5 transition-all duration-200 ${collapsed && !mobileOpen ? 'justify-center' : ''}`}
        >
          <Home className="w-[16px] h-[16px] flex-shrink-0" />
          {(!collapsed || mobileOpen) && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-[13px]">View Website</span>
              <ExternalLink className="w-3 h-3 text-night-600" />
            </div>
          )}
        </Link>
      </nav>

      {/* Bottom */}
      <div className="p-2.5 border-t border-white/5 flex-shrink-0">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-night-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full ${collapsed && !mobileOpen ? 'justify-center' : ''}`}
        >
          <LogOut className="w-[16px] h-[16px] flex-shrink-0" />
          {(!collapsed || mobileOpen) && <span className="text-[13px]">Logout</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-night-100">

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex ${collapsed ? 'w-[64px]' : 'w-[240px]'} bg-night-950 flex-col transition-all duration-300 flex-shrink-0 border-r border-white/5`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <aside className={`absolute top-0 left-0 h-full w-[260px] bg-night-950 flex flex-col transition-transform duration-300 border-r border-white/5 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
        </aside>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-12 md:h-14 bg-night-950 border-b border-white/5 flex items-center justify-between px-3 md:px-5 flex-shrink-0">
          <div className="flex items-center gap-2.5 md:gap-3">
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
              <h1 className="text-white font-bold text-sm md:text-base leading-tight tracking-tight">{currentPage}</h1>
              <p className="text-night-500 text-[9px] md:text-[10px] hidden sm:block">{pageSub[currentPage]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <div className="relative">
              <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-night-400 hover:text-white transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              {newLeadsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                  {newLeadsCount}
                </span>
              )}
            </div>
            {/* Date badge — desktop only */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-night-400 text-[10px] font-medium">
              {today}
            </div>
          </div>
        </header>

        {/* Page Content — THIS is the scrollable area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-5 bg-night-100">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-night-200 rounded-2xl" />)}
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}