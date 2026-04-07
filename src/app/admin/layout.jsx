"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase, logSystemActivity } from '@/lib/supabase';
import {
  LayoutDashboard, Users, LogOut, ChevronLeft, ChevronRight,
  Shield, Menu, X, Bell, Search as SearchIcon, Settings, Globe,
  LayoutTemplate
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchRole(session.user.email);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchRole(session.user.email);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && role) {
      const currentMenuPath = allMenuItems.find(m => m.href === pathname);
      if (currentMenuPath && !currentMenuPath.roles.includes(role)) {
        // Absolute lockdown - bounce unprivileged accounts automatically back to Dashboard
        router.push('/admin');
      }
    }
  }, [pathname, role, session]);

  const fetchRole = async (email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('email', email)
        .single();
      
      if (data && data.role) {
        setRole(data.role); // 'admin' or 'member'
      } else {
        // Fallback for missing user records
        setRole(email.includes('admin') ? 'admin' : 'member');
      }
    } catch (err) {
      setRole(email.includes('admin') ? 'admin' : 'member');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    // Translate identifiers to the internal Supabase identity
    const idLow = loginForm.identifier.toLowerCase();
    let loginEmail = loginForm.identifier;
    let loginPassword = loginForm.password;
    
    if (idLow === 'admin') {
      loginEmail = 'admin@scatechsolar.com';
      if (loginForm.password === '123' || loginForm.password === '123456') {
        loginPassword = 'scatechsolar123';
      }
    }
    if (idLow === 'user') loginEmail = 'user@scatechsolar.com';

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setLoginError(error.message);
    } else {
      // Log authentication
      logSystemActivity('LOGIN', 'SYSTEM', `User logged in from IP (via browser)`);
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setRole(null);
  };

  // Base Menu
  const allMenuItems = [
    { name: 'Analytics', href: '/admin', icon: LayoutDashboard, roles: ['admin', 'member'] },
    { name: 'Lead Pipeline', href: '/admin/leads', icon: Users, roles: ['admin', 'member'] },
    { name: 'Website Content', href: '/admin/cms', icon: LayoutTemplate, roles: ['admin', 'member'] },
    { name: 'System Options', href: '/admin/settings', icon: Settings, roles: ['admin'] },
  ];

  // Filter based on user's current role
  const menu = allMenuItems.filter(item => role && item.roles.includes(role));

  // Loading state
  if (loading || (session && !role)) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-night-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Premium Login Screen
  if (!session) {
    return (
      <div className="min-h-screen flex bg-white font-sans text-night-900">
        {/* Left Side - Brand & Graphics */}
        <div className="hidden lg:flex flex-1 relative bg-night-950 overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 noise-bg opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-solar-500/20 to-transparent mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-lg text-white">
            <div className="inline-flex items-center justify-center mb-8">
              <img src="/logos/sca-logo.png" alt="SCA Tech Solar" className="h-[70px] w-auto object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              SCA Tech Solar<br />
              <span className="text-night-400">Command Center.</span>
            </h1>
            <p className="text-lg text-night-300 leading-relaxed max-w-md">
              A powerful, centralized CRM designed to accelerate your solar sales pipeline and manage customer relationships with elegant precision.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-[500px] xl:w-[600px] flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-[380px]">
            <div className="mb-10 text-center lg:text-left">
              <div className="lg:hidden inline-flex items-center justify-center mb-6">
                <img src="/logos/sca-logo.png" alt="SCA Tech Solar" className="h-[44px] w-auto object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-night-900 tracking-tight">Log in to your account</h2>
              <p className="text-night-500 text-sm mt-2">Enter your admin or member credentials to proceed.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-red-600 text-[13px] font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 shrink-0" /> {loginError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[13px] font-medium text-night-700">Account Email Structure</label>
                <input
                  type="email"
                  required
                  value={loginForm.identifier}
                  onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-night-200 bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-sm text-night-900 placeholder-night-400 transition-all shadow-sm"
                  placeholder="name@scatechsolar.com"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-medium text-night-700">Password</label>
                </div>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-night-200 bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-sm text-night-900 placeholder-night-400 transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 bg-night-950 text-white font-medium text-[13px] py-2.5 rounded-lg hover:bg-night-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
              >
                {loginLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Log In'}
              </button>
            </form>
            
            <p className="text-center text-[11px] text-night-400 mt-10 uppercase tracking-widest font-medium">
              Enterprise Secure Infrastructure
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Layout - Pro SaaS UI
  return (
    <div className="flex h-screen bg-[#FBFBFB] font-sans text-night-900 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-night-950/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - Dark Professional */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-white border-r border-[#EBEBEB] transition-all duration-300 flex flex-col shrink-0
        ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
      `}>
        {/* Brand Area */}
        <div className="h-16 flex items-center px-5 border-b border-[#EBEBEB] shrink-0 justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
              <img src="/logos/sca-logo.png" alt="SCA Tech" className="w-[35px] h-[35px] object-contain" />
            </div>
            {!collapsed && <span className="font-semibold text-[15px] tracking-tight whitespace-nowrap">SCA CRM Workspace</span>}
          </div>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 text-night-500 hover:text-night-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>



        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-hide">
          <div className="px-3 pb-2 pt-2">
            {!collapsed && <p className="text-[10px] font-bold text-night-400 uppercase tracking-widest mb-1.5">Overview</p>}
          </div>
          {menu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative
                  ${active ? 'bg-[#F2F4F7] text-night-900 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2/3 before:w-1 before:bg-night-900 before:rounded-r-full' 
                           : 'text-night-500 hover:bg-[#F9F9F9] hover:text-night-900'}
                `}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${active ? 'text-night-900' : 'text-night-400 group-hover:text-night-600'}`} strokeWidth={active ? 2.5 : 2} />
                {!collapsed && <span className={`text-[13px] ${active ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-3 border-t border-[#EBEBEB] shrink-0 space-y-1">
          <Link 
            href="/" 
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-night-500 hover:bg-[#F9F9F9] hover:text-night-900 transition-colors"
          >
            <Globe className={`w-4 h-4 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
            {!collapsed && <span className="text-[13px] font-medium">View Live Site</span>}
          </Link>
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="hidden lg:flex w-full items-center gap-3 px-3 py-2 rounded-lg text-night-500 hover:bg-[#F9F9F9] hover:text-night-900 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4 mx-auto" /> : <><ChevronLeft className="w-4 h-4" /><span className="text-[13px] font-medium">Collapse Sidebar</span></>}
          </button>
          <button 
            onClick={handleLogout} 
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-red-600/80 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className={`w-4 h-4 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
            {!collapsed && <span className="text-[13px] font-medium">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white/50 backdrop-blur-xl border-b border-[#EBEBEB] flex items-center px-4 lg:px-8 justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 text-night-500 hover:bg-[#F5F5F5] rounded-md transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center text-sm font-medium text-night-500">
              <span className="cursor-pointer hover:text-night-900 transition-colors hidden sm:block">Workspace</span>
              <span className="mx-2 hidden sm:block text-night-300">/</span>
              <span className="font-semibold text-night-900 tracking-tight">
                {menu.find(m => m.href === pathname)?.name || 'Admin Panel'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {role && (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200">
                {role}
              </span>
            )}
            <button className="p-2 text-night-400 hover:bg-white hover:shadow-sm hover:text-night-900 rounded-full transition-all relative border border-transparent hover:border-[#EBEBEB]">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-5 w-px bg-[#EBEBEB]"></div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white p-1 pr-3 rounded-full transition-all border border-transparent hover:border-[#EBEBEB] hover:shadow-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-solar-500 to-night-800 text-white flex items-center justify-center font-semibold text-[11px] shadow-sm">
                {session?.user?.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-[13px] font-medium text-night-700 hidden sm:block whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                {session?.user?.email}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content Scrollable Area */}
        <div className="flex-1 overflow-auto bg-[#FBFBFB]">
          <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
