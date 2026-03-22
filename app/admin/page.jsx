"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, UserPlus, CheckCircle, Clock, TrendingUp, 
  ArrowUpRight, PhoneCall, Loader2, ArrowRight,
  BarChart3, Activity
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: leads, error } = await supabase
        .from('website_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const allLeads = leads || [];

      // Calculate stats
      const total = allLeads.length;
      const newLeads = allLeads.filter(l => l.status === 'new').length;
      const contacted = allLeads.filter(l => ['contacted', 'site_survey', 'quoted'].includes(l.status)).length;
      const converted = allLeads.filter(l => l.status === 'converted' || l.status === 'won').length;

      // Today's leads
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayLeads = allLeads.filter(l => new Date(l.created_at) >= today).length;

      // This week's leads
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekLeads = allLeads.filter(l => new Date(l.created_at) >= weekAgo).length;

      // Fetch activity logs
      const { data: logsData } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({ total, newLeads, contacted, converted, todayLeads, weekLeads });
      setRecentLeads(allLeads.slice(0, 6)); // Show top 6 for better grid layout
      setRecentActivities(logsData || []);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-night-400 animate-spin" />
          <p className="text-night-400 text-[13px] font-medium tracking-wide">Gathering metrics…</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Acquired Leads', 
      value: stats?.total || 0, 
      icon: Users, 
      trend: '+12%', 
      positive: true,
      color: 'bg-white', 
      iconBg: 'bg-[#F5F5F7]', 
      iconColor: 'text-night-900',
      border: 'border-[#EBEBEB]'
    },
    { 
      label: 'New Prospects', 
      value: stats?.newLeads || 0, 
      icon: UserPlus, 
      trend: 'Action Required', 
      positive: false,
      color: 'bg-night-950', 
      iconBg: 'bg-white/10', 
      iconColor: 'text-white',
      border: 'border-night-900',
      textMain: 'text-white',
      textSub: 'text-night-300'
    },
    { 
      label: 'In Communication', 
      value: stats?.contacted || 0, 
      icon: PhoneCall, 
      trend: '+4%', 
      positive: true,
      color: 'bg-white', 
      iconBg: 'bg-[#F0F5FF]', 
      iconColor: 'text-blue-600',
      border: 'border-[#EBEBEB]'
    },
    { 
      label: 'Successfully Closed', 
      value: stats?.converted || 0, 
      icon: CheckCircle, 
      trend: '+8%', 
      positive: true,
      color: 'bg-white', 
      iconBg: 'bg-[#F0FDF4]', 
      iconColor: 'text-green-600',
      border: 'border-[#EBEBEB]'
    },
  ];

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const statusBadge = (status) => {
    const styles = {
      new: 'bg-orange-50 text-orange-700 border-orange-200/50',
      contacted: 'bg-blue-50 text-blue-700 border-blue-200/50',
      converted: 'bg-green-50 text-green-700 border-green-200/50',
      won: 'bg-green-50 text-green-700 border-green-200/50',
      lost: 'bg-red-50 text-red-700 border-red-200/50',
    };
    return styles[status] || 'bg-night-50 text-night-700 border-night-200/50';
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-night-900 tracking-tight">Performance Overview</h1>
          <p className="text-[13px] text-night-500 mt-1">Here's what's happening with your sales pipeline today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[12px] font-medium bg-white border border-[#EBEBEB] rounded-lg px-3 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 relative flex"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
            Live Updates
          </div>
          <Link href="/admin/leads" className="inline-flex items-center gap-2 bg-night-950 text-white px-4 py-1.5 rounded-lg text-[13px] font-medium hover:bg-night-900 transition-colors shadow-sm">
            View Pipeline <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, trend, positive, color, iconBg, iconColor, border, textMain, textSub }) => (
          <div key={label} className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all duration-300 ${color} ${border}`}>
            {/* Subtle background element for active card */}
            {color.includes('bg-night-950') && (
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none transition-all group-hover:bg-white/10" />
            )}
            
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className={`px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 ${
                positive ? 
                  (color.includes('bg-night') ? 'bg-white/10 text-green-300' : 'bg-green-50 text-green-700') : 
                  (color.includes('bg-night') ? 'bg-white/10 text-orange-300' : 'bg-orange-50 text-orange-700')
              }`}>
                {positive && <TrendingUp className="w-3 h-3" />}
                {trend}
              </div>
            </div>
            
            <div>
              <p className={`text-[13px] font-semibold ${textSub || 'text-night-500'} mb-1`}>{label}</p>
              <h3 className={`text-4xl tracking-tighter font-bold ${textMain || 'text-night-900'}`}>{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Metrics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EBEBEB] shadow-sm p-6 overflow-hidden relative flex flex-col">
          <div className="flex justify-between items-start mb-6 shrink-0">
            <div>
              <h3 className="text-[15px] font-semibold text-night-900">System Activity Log</h3>
              <p className="text-[12px] text-night-500 mt-1">Real-time audit trail of admin and member actions</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-[#F5F5F7] text-night-600">Live</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {recentActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-night-400">
                <Activity className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-[13px] font-medium">No recent activities logged.</p>
              </div>
            ) : (
              recentActivities.map((log) => (
                <div key={log.id} className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-16px] before:w-px before:bg-[#EBEBEB] last:before:hidden group">
                  <div className="absolute left-0 top-1.5 w-[23px] h-[23px] bg-white border border-[#EBEBEB] rounded-full flex items-center justify-center shadow-sm z-10 group-hover:border-night-900 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-night-900"></div>
                  </div>
                  <div className="bg-[#FAFAFA] border border-[#EBEBEB] p-3 rounded-lg shadow-sm">
                    <p className="text-[13px] text-night-800 font-medium">
                      {log.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-night-500">
                      <span className="font-semibold text-night-900 bg-white px-1.5 py-0.5 rounded border border-[#EBEBEB]">{log.user_email.split('@')[0]}</span>
                      <span className="capitalize">{log.user_role}</span>
                      <span>•</span>
                      <span>{formatDate(log.created_at)} at {formatTime(log.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Velocity Stats List */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] shadow-sm p-6 flex flex-col">
          <h3 className="text-[15px] font-semibold text-night-900 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-night-400" /> Pipeline Velocity
          </h3>
          
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f9f9f9] border border-[#EBEBEB] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-night-400 uppercase tracking-widest">Added Today</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-night-900">{stats?.todayLeads || 0}</p>
                  <span className="text-[11px] font-medium text-green-600 bg-green-50 px-1.5 rounded">Fast</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-px bg-[#EBEBEB]"></div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f9f9f9] border border-[#EBEBEB] flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-night-400 uppercase tracking-widest">Added This Week</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-night-900">{stats?.weekLeads || 0}</p>
                  <span className="text-[11px] font-medium text-night-500 bg-night-50 px-1.5 rounded">Steady</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-px bg-[#EBEBEB]"></div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-night-400 uppercase tracking-widest">Conversion Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-night-900">
                    {stats?.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads Minimal Pro Table */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#EBEBEB] flex items-center justify-between bg-white">
          <h2 className="font-semibold text-night-900 text-[15px]">Recent Inquiries</h2>
          <Link href="/admin/leads" className="flex items-center gap-1.5 text-[13px] font-semibold text-night-500 hover:text-night-900 transition-colors">
            View All Pipeline <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-night-300" />
            </div>
            <p className="text-night-900 font-semibold mb-1">Your pipeline is clear</p>
            <p className="text-night-500 text-[13px]">New leads from your website will appear here instantly.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FCFCFC] border-b border-[#EBEBEB]">
                <tr>
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-night-500 uppercase tracking-wider w-[35%]">Lead Information</th>
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-night-500 uppercase tracking-wider">Contact</th>
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-night-500 uppercase tracking-wider">Source</th>
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-night-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3.5 text-[11px] font-semibold text-night-500 uppercase tracking-wider text-right">Date Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEBEB]/60">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FCFCFC] transition-colors group">
                    <td className="px-5 py-3 max-w-[200px]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-solar-200 to-solar-100 border border-[#EBEBEB] flex text-night-600 items-center justify-center font-bold text-[11px] shrink-0">
                          {lead.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="truncate">
                          <p className="font-semibold text-[13px] text-night-900 truncate">{lead.name}</p>
                          <p className="text-[12px] text-night-400 truncate mt-0.5">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-[13px] text-night-700 font-medium">{lead.phone}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5F5F7] text-night-600 border border-[#EBEBEB]">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold capitalize tracking-wide border ${statusBadge(lead.status)}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-[12px] font-medium text-night-600">{formatDate(lead.created_at)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
