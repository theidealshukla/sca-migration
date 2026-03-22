"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, Plus, Lock, UserCog, Mail, Key, Briefcase, RefreshCw, X, Check, Trash2, AlertTriangle } from 'lucide-react';

export default function AdminSettings() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(null); // holds user id
  const [showEditModal, setShowEditModal] = useState(null); // holds user object
  const [showDeleteModal, setShowDeleteModal] = useState(null); // holds user object
  
  // Forms
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [newPassword, setNewPassword] = useState('');
  
  // API State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (!error && data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError('');
    setApiSuccess('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ action: 'create', ...form })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to create user');
      
      setApiSuccess('User created successfully!');
      setForm({ name: '', email: '', password: '', role: 'member' });
      setShowAddModal(false);
      fetchUsers();
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError('');
    setApiSuccess('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ action: 'update_details', userId: showEditModal.id, name: form.name, role: form.role })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to update user details');
      
      setApiSuccess('User details updated successfully!');
      setShowEditModal(null);
      fetchUsers();
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError('');
    setApiSuccess('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ action: 'update_password', userId: showPasswordModal, password: newPassword })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to update password');
      
      setApiSuccess('Password updated successfully!');
      setNewPassword('');
      setShowPasswordModal(null);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsSubmitting(true);
    setApiError('');
    setApiSuccess('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ action: 'delete', userId: showDeleteModal.id })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to delete user');
      
      setApiSuccess('System access securely revoked! Account permanently deleted.');
      setShowDeleteModal(null);
      fetchUsers();
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-night-900 tracking-tight flex items-center gap-2">
            <UserCog className="w-6 h-6 text-night-400" /> Administrative Settings
          </h1>
          <p className="text-[13px] text-night-500 mt-1">Manage team members, roles, and global security.</p>
        </div>
        <button
          onClick={() => { setApiError(''); setApiSuccess(''); setShowAddModal(true); }}
          className="bg-night-950 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-night-900 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Member
        </button>
      </div>

      {apiError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-[13px] font-medium flex items-start gap-2">
          <Shield className="w-4 h-4 mt-0.5 shrink-0" />
          <p>Important: The backend action failed. Please ensure you have added your `SUPABASE_SERVICE_ROLE_KEY` to your `.env.local` to allow the Admin Panel to bypass safety restrictions and enforce these changes! Error: {apiError}</p>
        </div>
      )}

      {apiSuccess && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl border border-emerald-100 text-[13px] font-medium flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> {apiSuccess}
        </div>
      )}

      {/* Team Management Table */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#EBEBEB] flex items-center justify-between bg-[#FCFCFC]">
          <h2 className="text-[14px] font-bold text-night-900">Registered Team Accounts</h2>
          <button onClick={fetchUsers} className="text-night-400 hover:text-night-900 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {loading ? (
          <div className="p-10 flex justify-center text-night-400"><RefreshCw className="w-6 h-6 animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-[#FAFAFA] border-b border-[#EBEBEB]">
                <tr>
                  <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Name & Identity</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Workspace Email</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Assigned Role</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest text-right">Security Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEBEB]/60">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FBFBFB] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EBEBEB] to-[#F5F5F7] flex items-center justify-center font-bold text-[11px] text-night-600 border border-[#EBEBEB] shrink-0">
                          {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-[13px] text-night-900">{user.name || 'Invited User'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-night-600">
                      <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-night-400" /> {user.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-widest border ${
                        user.role === 'admin' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => { 
                            setApiError(''); 
                            setApiSuccess(''); 
                            setForm({ name: user.name || '', email: user.email, password: '', role: user.role });
                            setShowEditModal(user); 
                          }}
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-[#EBEBEB] text-[12px] font-medium text-night-700 bg-white hover:bg-[#F5F5F7] hover:text-night-900 transition-colors shadow-sm"
                        >
                          <UserCog className="w-3.5 h-3.5 mr-1.5" /> Edit User
                        </button>
                        <button
                          onClick={() => { setApiError(''); setApiSuccess(''); setShowPasswordModal(user.id); }}
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-[#EBEBEB] text-[12px] font-medium text-night-700 bg-white hover:bg-[#F5F5F7] hover:text-night-900 transition-colors shadow-sm"
                        >
                          <Lock className="w-3.5 h-3.5 mr-1.5" /> Force Password Reset
                        </button>
                        <button
                          onClick={() => { setApiError(''); setApiSuccess(''); setShowDeleteModal(user); }}
                          className="inline-flex items-center justify-center p-1.5 rounded-lg border border-red-100/50 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-colors shadow-sm"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-[13px] text-night-500">No team members found in database.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-[#EBEBEB]">
            <div className="px-6 py-4 border-b border-[#EBEBEB] flex justify-between items-center bg-[#FAFAFA]">
              <h3 className="text-[15px] font-bold text-night-900">Provision New Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-night-400 hover:text-night-900"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-night-700 uppercase tracking-widest flex items-center gap-1.5"><UserCog className="w-3.5 h-3.5" /> Full Name</label>
                <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] focus:bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-night-700 uppercase tracking-widest flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Sign-in Identifier (Email)</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] focus:bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] transition-all" placeholder="name@scatechsolar.com" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-night-700 uppercase tracking-widest flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Access Clearances</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] focus:bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] transition-all cursor-pointer">
                  <option value="member">Standard Member</option>
                  <option value="admin">Administrator (Full Control)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-night-700 uppercase tracking-widest flex items-center gap-1.5"><Key className="w-3.5 h-3.5" /> Temporary Password</label>
                <input required type="password" minLength={6} value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] focus:bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] transition-all" placeholder="At least 6 characters" />
              </div>
              
              <button disabled={isSubmitting} type="submit" className="w-full mt-2 bg-night-950 text-white font-medium text-[13px] py-2.5 rounded-lg hover:bg-night-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Provision Account Setup'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden border border-[#EBEBEB]">
            <div className="px-6 py-4 border-b border-[#EBEBEB] flex justify-between items-center bg-[#FAFAFA]">
              <h3 className="text-[15px] font-bold text-night-900">Enforce Password Resync</h3>
              <button onClick={() => setShowPasswordModal(null)} className="text-night-400 hover:text-night-900"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleChangePassword} className="p-6 space-y-4 text-left">
              <div className="bg-orange-50 text-orange-700 p-3 rounded-lg text-[12px] font-medium border border-orange-200 mb-2">
                As an admin, you can forcefully overwrite the encryption key for this user immediately mapping their account to a new password.
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-night-700 uppercase tracking-widest flex items-center gap-1.5"><Key className="w-3.5 h-3.5" /> New Master Password</label>
                <input required type="password" minLength={6} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] focus:bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] transition-all" placeholder="At least 6 characters" />
              </div>
              
              <button disabled={isSubmitting} type="submit" className="w-full mt-2 bg-night-950 text-white font-medium text-[13px] py-2.5 rounded-lg hover:bg-night-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Execute Key Override'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-[#EBEBEB]">
            <div className="px-6 py-4 border-b border-[#EBEBEB] flex justify-between items-center bg-[#FAFAFA]">
              <h3 className="text-[15px] font-bold text-night-900">Edit Member Identity</h3>
              <button onClick={() => setShowEditModal(null)} className="text-night-400 hover:text-night-900"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleEditUser} className="p-6 space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-night-700 uppercase tracking-widest flex items-center gap-1.5"><UserCog className="w-3.5 h-3.5" /> Full Name</label>
                <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] focus:bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-night-700 uppercase tracking-widest flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Sign-in Identifier (Immutable)</label>
                <input disabled type="email" value={form.email} className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] bg-gray-100 text-gray-500 cursor-not-allowed text-[13px]" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-night-700 uppercase tracking-widest flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Access Clearances</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA] focus:bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] transition-all cursor-pointer">
                  <option value="member">Standard Member</option>
                  <option value="admin">Administrator (Full Control)</option>
                </select>
              </div>
              
              <button disabled={isSubmitting} type="submit" className="w-full mt-2 bg-night-950 text-white font-medium text-[13px] py-2.5 rounded-lg hover:bg-night-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save Profile Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden border border-red-100">
            <div className="px-6 py-4 border-b border-[#EBEBEB] flex justify-between items-center bg-[#FAFAFA]">
              <h3 className="text-[15px] font-bold text-red-600 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Terminate Account
              </h3>
              <button onClick={() => setShowDeleteModal(null)} className="text-night-400 hover:text-night-900"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 text-left">
              <p className="text-[13px] text-night-700 mb-4 leading-relaxed">
                You are about to permanently delete <strong className="text-night-900">{showDeleteModal.name || showDeleteModal.email}</strong>. This completely wipes their authentication credentials from the database.
              </p>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 bg-white border border-[#EBEBEB] text-night-700 font-semibold text-[13px] py-2 rounded-lg hover:bg-[#F5F5F7] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteUser}
                  disabled={isSubmitting} 
                  className="flex-1 bg-red-600 border border-red-700 text-white font-semibold text-[13px] py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center justify-center"
                >
                  {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm Deletion'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
