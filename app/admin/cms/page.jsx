"use client";

import React, { useState, useEffect } from 'react';
import { supabase, logSystemActivity } from '@/lib/supabase';
import { 
  Layers, LayoutTemplate, Hammer, Plus, 
  Search as SearchIcon, Edit2, Trash2, 
  RefreshCw, Check, X, Image as ImageIcon,
  Save, Eye, EyeOff
} from 'lucide-react';

export default function CMSManager() {
  const [activeTab, setActiveTab] = useState('products');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Define schemas to drive Dynamic Form Rendering
  const schemas = {
    products: [
      { key: 'title', label: 'Product Name', type: 'text', required: true },
      { key: 'slug', label: 'URL Slug (e.g. solar-panel-x)', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['Solar Panels', 'Batteries', 'Water Heaters', 'Inverters'] },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image_url', label: 'Cover Image URL', type: 'image' },
      { key: 'is_published', label: 'Visibility', type: 'boolean', default: true },
    ],
    projects: [
      { key: 'title', label: 'Project Name', type: 'text', required: true },
      { key: 'slug', label: 'URL Slug', type: 'text', required: true },
      { key: 'type', label: 'Installation Type', type: 'select', options: ['Commercial', 'Residential', 'Industrial'] },
      { key: 'client_name', label: 'Client Name', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'capacity', label: 'Installation Capacity (e.g. 50kW)', type: 'text' },
      { key: 'year', label: 'Installation Year (e.g. 2024)', type: 'text' },
      { key: 'saving', label: 'Annual Savings (e.g. ₹10L/yr)', type: 'text' },
      { key: 'description', label: 'Brief Description', type: 'textarea' },
      { key: 'image_url', label: 'Cover Image URL', type: 'image' },
      { key: 'is_published', label: 'Visibility', type: 'boolean', default: true },
    ],
    services: [
      { key: 'title', label: 'Service Name', type: 'text', required: true },
      { key: 'slug', label: 'URL Slug', type: 'text', required: true },
      { key: 'short_description', label: 'Short Summary', type: 'textarea' },
      { key: 'icon_name', label: 'Icon Name (e.g. Activity, Sun)', type: 'text' },
      { key: 'image_url', label: 'Cover Image URL', type: 'image' },
      { key: 'is_published', label: 'Visibility', type: 'boolean', default: true },
    ]
  };

  const tabs = [
    { id: 'products', name: 'Products Catalog', icon: Layers },
    { id: 'projects', name: 'Project Portfolio', icon: LayoutTemplate },
    { id: 'services', name: 'Services Editor', icon: Hammer },
  ];

  /* Fetch Data */
  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  /* Base Modal Triggers */
  const handleAddNew = () => {
    const defaultData = {};
    schemas[activeTab].forEach(field => {
      if (field.default !== undefined) defaultData[field.key] = field.default;
    });
    setFormData(defaultData);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  /* Form Helpers */
  const handleFieldChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  // Secure Supabase Storage direct upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from('cms_assets')
        .upload(filePath, file);

      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('cms_assets')
        .getPublicUrl(filePath);

      handleFieldChange('image_url', publicUrl);
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  /* Mutation Actions */
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (editingItem) {
        // Update
        const { error } = await supabase
          .from(activeTab)
          .update(formData)
          .eq('id', editingItem.id);
        if (error) throw error;
        logSystemActivity('CMS_UPDATED', activeTab.toUpperCase(), `Updated ${activeTab} content: ${formData.title}`);
      } else {
        // Insert
        const { error } = await supabase
          .from(activeTab)
          .insert([formData]);
        if (error) throw error;
        logSystemActivity('CMS_CREATED', activeTab.toUpperCase(), `Created new ${activeTab} content: ${formData.title}`);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Permanently delete ${title}? This will be removed from the live website immediately.`)) return;
    
    const { error } = await supabase.from(activeTab).delete().eq('id', id);
    if (!error) {
      logSystemActivity('CMS_DELETED', activeTab.toUpperCase(), `Deleted ${activeTab} content: ${title}`);
      fetchData();
    }
  };

  const handlePublishToggle = async (item) => {
    const newVal = !item.is_published;
    setItems(items.map(i => i.id === item.id ? { ...i, is_published: newVal } : i));
    
    const { error } = await supabase
      .from(activeTab)
      .update({ is_published: newVal })
      .eq('id', item.id);
      
    if (!error) {
      logSystemActivity('CMS_VISIBILITY', activeTab.toUpperCase(), `Turned ${newVal ? 'ON' : 'OFF'} visibility for: ${item.title}`);
    } else {
      fetchData(); // rollback UI
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-night-900 tracking-tight">Website Content Engine</h1>
        
        <div className="flex bg-white rounded-lg p-1 border border-[#EBEBEB] shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-night-900 text-white shadow-md' 
                  : 'text-night-500 hover:text-night-900 hover:bg-[#F5F5F7]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-[#EBEBEB] shadow-sm rounded-xl overflow-hidden flex flex-col min-h-[500px]">
        {/* Tool bar */}
        <div className="p-4 border-b border-[#EBEBEB] bg-[#FAFAFA] flex justify-between items-center">
          <div className="relative">
            <SearchIcon className="w-4 h-4 text-night-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`} 
              className="pl-9 pr-4 py-2 text-[13px] rounded-lg border border-[#EBEBEB] w-64 focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none transition-all hidden sm:block"
            />
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-solar-500 hover:bg-solar-600 text-white font-bold text-[13px] px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add New Entry
          </button>
        </div>

        {/* Data Grid */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-night-400 p-10">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-night-500">
            <Layers className="w-12 h-12 text-[#EBEBEB] border-2 border-[#EBEBEB] p-2 rounded-lg mb-3" />
            <h3 className="font-semibold text-night-900">It's quiet in here</h3>
            <p className="text-[13px] mt-1 max-w-sm">You haven't added any {activeTab} yet. Click "Add New Entry" to build out your live website content.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-[#FAFAFA] border-b border-[#EBEBEB]">
                <tr>
                  <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest">Entry Detail</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest text-center">Visibility</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-night-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEBEB]/60">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-[#FBFBFB] transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        {item.image_url ? (
                          <div className="w-12 h-12 rounded bg-cover bg-center border border-[#EBEBEB] shrink-0" style={{ backgroundImage: `url(${item.image_url})` }} />
                        ) : (
                          <div className="w-12 h-12 rounded bg-[#F5F5F7] border border-[#EBEBEB] flex items-center justify-center shrink-0">
                            <ImageIcon className="w-5 h-5 text-night-300" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-[14px] text-night-900">{item.title}</p>
                          <p className="text-[12px] text-night-400">/{item.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                       <button onClick={() => handlePublishToggle(item)} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${
                         item.is_published ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'
                       }`}>
                         {item.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                         {item.is_published ? 'Live On Site' : 'Hidden'}
                       </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => handleEdit(item)} className="p-1.5 bg-white border border-[#EBEBEB] rounded text-night-500 hover:text-night-900 hover:bg-[#F5F5F7]">
                           <Edit2 className="w-4 h-4" />
                         </button>
                         <button onClick={() => handleDelete(item.id, item.title)} className="p-1.5 bg-white border border-[#EBEBEB] rounded text-red-500 hover:text-red-600 hover:bg-red-50">
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Entry Editor Modal (Dynamic) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#EBEBEB] my-8 relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#EBEBEB] flex justify-between items-center bg-[#FAFAFA] shrink-0 sticky top-0 z-10">
              <h3 className="text-[16px] font-bold text-night-900 flex items-center gap-2">
                {editingItem ? <Edit2 className="w-4 h-4 text-night-500" /> : <Plus className="w-4 h-4 text-solar-500" />}
                {editingItem ? 'Edit Existing Entry' : 'Create New Entry'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-night-400 hover:text-night-900 transition-colors p-1"><X className="w-5 h-5" /></button>
            </div>
            
            {/* Modal Form Scroll Area */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {schemas[activeTab].map(field => {
                if (field.type === 'boolean') {
                  // Visibility specific override
                  return (
                    <div key={field.key} className="flex items-center gap-3 p-4 bg-[#F9F9F9] rounded-lg border border-[##EBEBEB]">
                      <input 
                        type="checkbox" 
                        id={field.key}
                        checked={formData[field.key] !== false} 
                        onChange={(e) => handleFieldChange(field.key, e.target.checked)}
                        className="w-4 h-4 rounded text-night-900 focus:ring-night-900 accent-night-900"
                      />
                      <label htmlFor={field.key} className="text-[14px] font-bold text-night-900 select-none cursor-pointer">
                        Publish to Live Website
                        <span className="block text-[12px] font-medium text-night-500 mt-0.5">If unchecked, this entry is saved as a hidden draft invisible to customers.</span>
                      </label>
                    </div>
                  );
                }

                if (field.type === 'image') {
                  return (
                    <div key={field.key} className="space-y-2">
                       <label className="text-[13px] font-bold text-night-900">{field.label}</label>
                       
                       {formData[field.key] && (
                         <div className="relative w-full max-w-sm mb-3 group rounded-lg overflow-hidden border border-[#EBEBEB]">
                           <img src={formData[field.key]} alt="Content Cover" className="w-full h-auto object-cover" />
                           <button type="button" onClick={() => handleFieldChange(field.key, '')} className="absolute inset-0 bg-night-950/60 items-center justify-center text-white hidden group-hover:flex">
                             <Trash2 className="w-6 h-6" />
                           </button>
                         </div>
                       )}

                       {!formData[field.key] && (
                         <div className="flex items-center justify-center w-full">
                           <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#EBEBEB] border-dashed rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F7] transition-colors relative">
                             {uploadingImage ? (
                               <RefreshCw className="w-6 h-6 animate-spin text-night-400" />
                             ) : (
                               <>
                                 <ImageIcon className="w-8 h-8 text-night-300 mb-2" />
                                 <p className="text-[13px] font-medium text-night-500">Click to upload image</p>
                               </>
                             )}
                             <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                           </label>
                         </div>
                       )}
                    </div>
                  );
                }

                return (
                  <div key={field.key} className="space-y-1.5">
                    <label className="text-[13px] font-bold text-night-900">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        required={field.required}
                        value={formData[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-night-200 bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] text-night-900 min-h-[100px] resize-y"
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        required={field.required}
                        value={formData[field.key] || field.options[0]}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-night-200 bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] text-night-900"
                      >
                        <option value="" disabled>Select {field.label}</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        required={field.required}
                        value={formData[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-night-200 bg-white focus:border-night-900 focus:ring-1 focus:ring-night-900 outline-none text-[13px] text-night-900"
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                      />
                    )}
                  </div>
                );
              })}

            </form>

            {/* Modal Actions */}
            <div className="p-4 border-t border-[#EBEBEB] bg-[#FAFAFA] flex justify-end gap-3 shrink-0">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 border border-[#EBEBEB] rounded-lg text-[13px] font-bold text-night-700 bg-white hover:bg-[#F5F5F7] transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving || uploadingImage} 
                className="px-6 py-2 rounded-lg text-[13px] font-bold text-white bg-night-950 hover:bg-night-900 transition-colors flex items-center disabled:opacity-70 gap-2"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Content to Live Site
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
