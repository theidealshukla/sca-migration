"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { supabase, logSystemActivity } from '@/lib/supabase';
import {
  Search, StickyNote, RefreshCw, PhoneCall, Mail, Loader2,
  Eye, MapPin, MessageSquare, Calendar, Filter, Download,
  Send, User, Clock, CheckCircle2, Trash2, Edit2, Plus, X
} from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New Lead', color: 'bg-orange-50 text-orange-700 border-orange-200/50' },
  { value: 'contacted', label: 'Contacted', color: 'bg-blue-50 text-blue-700 border-blue-200/50' },
  { value: 'site_survey', label: 'Site Survey', color: 'bg-purple-50 text-purple-700 border-purple-200/50' },
  { value: 'quoted', label: 'Quoted', color: 'bg-amber-50 text-amber-700 border-amber-200/50' },
  { value: 'won', label: 'Won', color: 'bg-green-50 text-green-700 border-green-200/50' },
  { value: 'lost', label: 'Lost', color: 'bg-red-50 text-red-700 border-red-200/50' },
];

const ActivityTimelineIcon = () => <Clock className="w-4 h-4" />;
const getTypeStyle = (type) => {
  switch (type) {
    case 'call': return { bg: 'bg-green-100 text-green-700', icon: <PhoneCall className="w-3.5 h-3.5" /> };
    case 'meeting': return { bg: 'bg-purple-100 text-purple-700', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    case 'email': return { bg: 'bg-blue-100 text-blue-700', icon: <Mail className="w-3.5 h-3.5" /> };
    default: return { bg: 'bg-gray-100 text-gray-700', icon: <StickyNote className="w-3.5 h-3.5" /> };
  }
};

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [saving, setSaving] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [savingLead, setSavingLead] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', system_type: '', message: ''
  });

  // Logs States
  const [logs, setLogs] = useState({});
  const [logInput, setLogInput] = useState({ content: '', type: 'note' });
  const [loadingLogs, setLoadingLogs] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateStatus = async (id, newStatus) => {
    setSaving(id);
    try {
      const { error } = await supabase
        .from('website_leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      
      // Activity logging
      const leadName = leads.find(l => l.id === id)?.name || 'Unknown Lead';
      logSystemActivity('STATUS_UPDATE', 'LEAD', `Changed status to '${newStatus}' for ${leadName}`, id);
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setSaving(null);
    }
  };

  const fetchLogs = async (leadId) => {
    setLoadingLogs(true);
    try {
      const { data, error } = await supabase
        .from('lead_logs')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setLogs(prev => ({ ...prev, [leadId]: data || [] }));
    } catch (err) {
      console.error('Fetch logs error:', err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      setLogInput({ content: '', type: 'note' });
    } else {
      setExpandedId(id);
      setLogInput({ content: '', type: 'note' });
      if (!logs[id]) fetchLogs(id);
    }
  };

  const handleAddLog = async (leadId) => {
    if (!logInput.content.trim()) return;
    
    try {
      const { data: authData } = await supabase.auth.getSession();
      const userEmail = authData?.session?.user?.email || 'Admin';
      
      const newLog = {
        lead_id: leadId,
        content: logInput.content,
        type: logInput.type,
        created_by: userEmail
      };
      
      const { data, error } = await supabase.from('lead_logs').insert([newLog]).select();
      if (error) throw error;
      
      setLogs(prev => ({ ...prev, [leadId]: [data[0], ...(prev[leadId] || [])] }));
      setLogInput({ content: '', type: 'note' });
      
      const leadName = leads.find(l => l.id === leadId)?.name || 'Unknown Lead';
      logSystemActivity('INTERACTION_LOGGED', 'LEAD', `Added a ${logInput.type} for ${leadName}`, leadId);
    } catch (err) {
      console.error('Add log error:', err);
    }
  };

  const handleDeleteLead = async (id, name) => {
    if (!window.confirm(`Are you absolutely sure you want to permanently delete the lead: ${name}?`)) {
      return;
    }
    
    // Optimistic UI update
    setLeads(prev => prev.filter(lead => lead.id !== id));
    
    try {
      const { error } = await supabase.from('website_leads').delete().eq('id', id);
      if (error) throw error;
      logSystemActivity('LEAD_DELETED', 'LEAD', `Deleted lead: ${name}`, id);
    } catch (err) {
      console.error('Delete lead error:', err);
      // Re-fetch to heal state if deletion failed
      fetchLeads();
    }
  };

  const handleOpenModal = (lead = null) => {
    setCurrentLead(lead);
    if (lead) {
      setFormData({
        name: lead.name || '',
        phone: lead.phone || '',
        email: lead.email || '',
        city: lead.metadata?.city || '',
        system_type: lead.metadata?.system_type || '',
        message: lead.metadata?.message || ''
      });
    } else {
      setFormData({ name: '', phone: '', email: '', city: '', system_type: '', message: '' });
    }
    setModalOpen(true);
  };

  const handleSaveLead = async (e) => {
    e.preventDefault();
    setSavingLead(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        metadata: {
          city: formData.city,
          system_type: formData.system_type,
          message: formData.message
        }
      };

      if (currentLead) {
        const { error } = await supabase.from('website_leads').update(payload).eq('id', currentLead.id);
        if (error) throw error;
        logSystemActivity('LEAD_EDITED', 'LEAD', `Updated details for: ${payload.name}`, currentLead.id);
      } else {
        payload.source = 'MANUAL';
        payload.status = 'new';
        const { data, error } = await supabase.from('website_leads').insert([payload]).select();
        if (error) throw error;
        logSystemActivity('LEAD_CREATED', 'LEAD', `Manually added lead: ${payload.name}`, data[0]?.id);
      }
      
      setModalOpen(false);
      fetchLeads();
    } catch (err) {
      console.error('Save lead error:', err);
    } finally {
      setSavingLead(false);
    }
  };

  // Old single note logic replaced by Activity Timeline

  const filteredLeads = leads.filter(l => {
    const matchesSearch = search === '' ||
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search) ||
      l.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusStyle = (status) => {
    const found = STATUS_OPTIONS.find(s => s.value === status);
    return found?.color || 'bg-night-50 text-night-700 border-night-200/50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-night-400 animate-spin" />
          <p className="text-night-400 text-[13px] font-medium tracking-wide">Loading your pipeline…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] shadow-sm overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header & Tools Area */}
      <div className="p-5 border-b border-[#EBEBEB] flex flex-wrap gap-4 items-center justify-between bg-white shrink-0">
        <div>
          <h1 className="text-lg font-bold text-night-900 tracking-tight">Lead Management</h1>
          <p className="text-[13px] text-night-500 mt-0.5">{filteredLeads.length} prospects in view</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-[#F5F5F7] border border-transparent hover:border-[#EBEBEB] rounded-lg text-[13px] font-medium text-night-700 focus:outline-none focus:ring-2 focus:ring-night-900 transition-all appearance-none cursor-pointer h-[38px]"
            >
              <option value="all">Every Stage</option>
              {STATUS_OPTIONS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-night-500 pointer-events-none" />
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-night-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#EBEBEB] rounded-lg text-[13px] focus:outline-none focus:border-night-900 focus:ring-1 focus:ring-night-900 transition-all shadow-sm placeholder-night-400 h-[38px]"
              placeholder="Search prospects..."
            />
          </div>

          <div className="h-6 w-px bg-[#EBEBEB] hidden lg:block mx-1"></div>

          <button
            onClick={fetchLeads}
            className="hidden sm:flex items-center justify-center w-[38px] h-[38px] bg-white border border-[#EBEBEB] rounded-lg text-night-500 hover:bg-[#F5F5F7] hover:text-night-900 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-night-900"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-3 py-2 bg-night-900 border border-night-900 rounded-lg text-[13px] font-medium text-white hover:bg-night-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-night-900 h-[38px]"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Datagrid */}
      <div className="overflow-x-auto flex-1 relative bg-white">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-[#FCFCFC] border-b border-[#EBEBEB] sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-5 py-3 text-[11px] font-semibold text-night-500 uppercase tracking-wider">Prospect</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-night-500 uppercase tracking-wider">Contact Details</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-night-500 uppercase tracking-wider">Source & Time</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-night-500 uppercase tracking-wider">Active Stage</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-night-500 uppercase tracking-wider min-w-[200px]">Latest Activity</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-night-500 uppercase tracking-wider text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBEBEB]/60">
            {filteredLeads.map((lead) => {
              const meta = lead.metadata || {};
              const isExpanded = expandedId === lead.id;
              return (
                <React.Fragment key={lead.id}>
                  <tr className={`hover:bg-[#FBFBFB] transition-colors group ${isExpanded ? 'bg-[#FAFAFA]' : ''}`}>
                    {/* Prospect Info */}
                    <td className="px-5 py-3 w-[25%] max-w-[260px]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EBEBEB] to-[#F5F5F7] flex items-center justify-center font-bold text-[12px] text-night-600 border border-[#EBEBEB] shrink-0">
                          {lead.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="truncate">
                          <p className="font-semibold text-[14px] text-night-900 tracking-tight truncate">{lead.name}</p>
                          <p className="text-[12px] text-night-400 mt-0.5 truncate">{formatDate(lead.created_at)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-3 align-middle">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-night-600 text-[12px] font-medium">
                          <PhoneCall className="w-3.5 h-3.5 text-night-400 shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2 text-night-500 text-[12px]">
                            <Mail className="w-3.5 h-3.5 text-night-400 shrink-0" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Source & Time */}
                    <td className="px-5 py-3 align-middle">
                      <div className="space-y-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5F5F7] text-night-600 border border-[#EBEBEB]">
                          {lead.source}
                        </span>
                        <div className="text-[11px] text-night-400">{formatTime(lead.created_at)}</div>
                      </div>
                    </td>

                    {/* Stage Select */}
                    <td className="px-5 py-3 align-middle">
                      <select
                        value={lead.status || 'new'}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        disabled={saving === lead.id}
                        className={`px-3 py-1.5 rounded-md text-[12px] font-semibold border focus:ring-2 focus:ring-night-900/20 outline-none cursor-pointer transition-colors ${getStatusStyle(lead.status)} disabled:opacity-50 min-w-[125px]`}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>

                    {/* Latest Activity / Call to Action */}
                    <td className="px-5 py-3 align-middle">
                      <button
                        onClick={() => toggleExpand(lead.id)}
                        className="text-[12px] text-night-500 hover:text-night-900 font-medium bg-[#FAFAFA] border border-[#EBEBEB] hover:border-night-300 px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 shadow-sm"
                      >
                        <StickyNote className="w-3.5 h-3.5" />
                        {logs[lead.id]?.length > 0 ? `${logs[lead.id].length} Interaction${logs[lead.id].length !== 1 ? 's' : ''}` : 'View & Add Logs'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3 align-middle text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleExpand(lead.id)}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-md border transition-colors ${isExpanded ? 'bg-night-900 border-night-900 text-white shadow-md' : 'bg-white border-[#EBEBEB] text-night-500 hover:bg-[#F5F5F7] hover:text-night-900'}`}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-inherit" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(lead)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border bg-white border-[#EBEBEB] text-night-500 hover:bg-[#F5F5F7] hover:border-night-300 hover:text-night-900 transition-colors"
                          title="Edit Lead Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id, lead.name)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border bg-white border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors opacity-70 hover:opacity-100"
                          title="Delete Lead permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Drawer Detail Row */}
                  {isExpanded && (
                    <tr className="bg-[#FCFCFC] border-b border-[#EBEBEB] shadow-inner relative">
                      <td colSpan={6} className="px-0 py-0">
                        <div className="absolute top-0 left-0 w-1 h-full bg-night-900 rounded-r-md"></div>
                        <div className="pl-10 pr-6 py-6 border-b border-[#EBEBEB] bg-gradient-to-r from-[#FAFAFA] to-white md:flex gap-8">
                          
                          {/* Left Panel: Primary Info */}
                          <div className="md:w-1/3 mb-6 md:mb-0 border-r border-[#EBEBEB]/60 pr-6">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-night-400 mb-4">Extended Details</h4>
                            <div className="space-y-5 text-[13px]">
                              <div className="flex flex-col gap-1 text-night-800">
                                <strong className="text-night-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Location / City</strong>
                                <span className="font-medium bg-white px-3 py-1.5 rounded-md border border-[#EBEBEB]">{meta.city || 'Not specified'}</span>
                              </div>
                              <div className="flex flex-col gap-1 text-night-800">
                                <strong className="text-night-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> System Requirement</strong>
                                <span className="font-medium bg-[#F5F5F7] px-3 py-1.5 rounded-md border border-[#EBEBEB] inline-flex self-start">{meta.system_type || 'Unknown Type'}</span>
                              </div>
                              <div className="flex flex-col gap-1 text-night-800">
                                <strong className="text-night-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Direct Message</strong>
                                {meta.message ? (
                                  <div className="bg-white border border-[#EBEBEB] rounded-lg p-3 text-night-600 leading-relaxed shadow-sm italic">
                                    "{meta.message}"
                                  </div>
                                ) : (
                                  <span className="text-night-400 italic">No message provided.</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Panel: Activity Timeline */}
                          <div className="md:w-2/3 flex flex-col h-full min-h-[300px]">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-night-400 mb-4 flex items-center gap-2">
                              <ActivityTimelineIcon /> Activity Context & History
                            </h4>

                            {/* Input Form */}
                            <div className="bg-white p-3 rounded-xl border border-[#EBEBEB] shadow-sm mb-4">
                              <div className="flex flex-col sm:flex-row items-center gap-3">
                                <select
                                  value={logInput.type}
                                  onChange={e => setLogInput({ ...logInput, type: e.target.value })}
                                  className="w-full sm:w-auto px-3 py-2 bg-[#F5F5F7] border border-transparent hover:border-[#EBEBEB] rounded-lg text-[13px] font-medium text-night-700 focus:outline-none focus:ring-2 focus:ring-night-900 transition-all appearance-none cursor-pointer h-[38px]"
                                >
                                  <option value="note">Internal Note</option>
                                  <option value="call">Phone Call</option>
                                  <option value="meeting">Site Visit / Meeting</option>
                                  <option value="email">Email Sent</option>
                                </select>
                                
                                <div className="flex-1 w-full relative">
                                  <input
                                    value={logInput.content}
                                    onChange={e => setLogInput({ ...logInput, content: e.target.value })}
                                    onKeyDown={e => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddLog(lead.id);
                                      }
                                    }}
                                    placeholder="Log a new interaction or comment..."
                                    className="w-full pl-4 pr-10 py-2 bg-[#FAFAFA] border border-[#EBEBEB] rounded-lg text-[13px] focus:outline-none focus:border-night-900 focus:ring-1 focus:ring-night-900 transition-all shadow-sm placeholder-night-400 h-[38px]"
                                  />
                                  <button
                                    onClick={() => handleAddLog(lead.id)}
                                    disabled={!logInput.content.trim()}
                                    className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center bg-night-950 text-white rounded hover:bg-night-800 disabled:opacity-50 transition-colors"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Timeline Items */}
                            <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[300px] scrollbar-hide">
                              {loadingLogs && !logs[lead.id] ? (
                                <div className="flex items-center justify-center p-6"><Loader2 className="w-5 h-5 animate-spin text-night-400" /></div>
                              ) : logs[lead.id]?.length > 0 ? (
                                logs[lead.id].map((log, idx) => (
                                  <div key={log.id || idx} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm ring-4 ring-[#FCFCFC] z-10 ${getTypeStyle(log.type).bg}`}>
                                        {getTypeStyle(log.type).icon}
                                      </div>
                                      {idx !== logs[lead.id].length - 1 && <div className="w-px h-full bg-[#EBEBEB] my-1"></div>}
                                    </div>
                                    <div className="flex-1 bg-white p-3 rounded-lg border border-[#EBEBEB] shadow-sm mb-1">
                                      <p className="text-[13px] text-night-800 leading-relaxed font-medium mb-1.5">{log.content}</p>
                                      <div className="flex items-center gap-3 text-[11px] text-night-400 font-medium uppercase tracking-wider">
                                        <span className="flex items-center gap-1 text-night-600"><User className="w-3 h-3" /> {log.created_by.split('@')[0]}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(log.created_at)} at {formatTime(log.created_at)}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-10 bg-white border border-dashed border-[#EBEBEB] rounded-xl text-night-400 text-[12px] font-medium">
                                  No interactions logged yet. Break the ice!
                                </div>
                              )}
                            </div>

                          </div>
                          
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EBEBEB]">
                    <Search className="w-6 h-6 text-night-300" />
                  </div>
                  <p className="text-night-900 font-semibold mb-1">No matching prospects</p>
                  <p className="text-night-500 text-[13px]">Try clearing your search or filters to see more results.</p>
                  {(search || statusFilter !== 'all') && (
                    <button 
                      onClick={() => { setSearch(''); setStatusFilter('all'); }}
                      className="mt-4 text-night-900 text-[13px] font-medium border border-[#EBEBEB] rounded-md px-3 py-1.5 hover:bg-[#F5F5F7] transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Lead Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-[#EBEBEB]">
              <h3 className="text-lg font-bold text-night-900">{currentLead ? 'Edit Lead Details' : 'Add New Prospect'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-night-400 hover:text-night-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveLead} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[12px] font-semibold text-night-700 uppercase tracking-wide">Full Name *</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EBEBEB] rounded-lg text-[13px] focus:ring-1 focus:ring-night-900 outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-night-700 uppercase tracking-wide">Phone Number *</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EBEBEB] rounded-lg text-[13px] focus:ring-1 focus:ring-night-900 outline-none" placeholder="+1..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-night-700 uppercase tracking-wide">Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EBEBEB] rounded-lg text-[13px] focus:ring-1 focus:ring-night-900 outline-none" placeholder="john@example.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-night-700 uppercase tracking-wide">City / Location</label>
                  <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EBEBEB] rounded-lg text-[13px] focus:ring-1 focus:ring-night-900 outline-none" placeholder="Los Angeles" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-night-700 uppercase tracking-wide">System Size</label>
                  <select value={formData.system_type} onChange={e => setFormData({...formData, system_type: e.target.value})} className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EBEBEB] rounded-lg text-[13px] focus:ring-1 focus:ring-night-900 outline-none">
                    <option value="">Select Size...</option>
                    <option value="Residential (Under 10kW)">Residential (Under 10kW)</option>
                    <option value="Residential (10kW - 20kW)">Residential (10kW - 20kW)</option>
                    <option value="Commercial (20kW+)">Commercial (20kW+)</option>
                  </select>
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[12px] font-semibold text-night-700 uppercase tracking-wide">Initial Message / Context</label>
                  <textarea rows="3" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EBEBEB] rounded-lg text-[13px] focus:ring-1 focus:ring-night-900 outline-none resize-none" placeholder="Any special requirements..." />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EBEBEB]">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-[13px] font-medium text-night-600 hover:bg-[#F5F5F7] rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={savingLead} className="flex items-center gap-2 px-4 py-2 bg-night-900 text-white text-[13px] font-medium rounded-lg hover:bg-night-800 disabled:opacity-50 transition-colors">
                  {savingLead && <Loader2 className="w-4 h-4 animate-spin" />}
                  {currentLead ? 'Save Changes' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
