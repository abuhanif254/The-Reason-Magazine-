'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  deleteDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';

interface Field {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'url';
  options?: string[];
  required?: boolean;
}

interface AdminContentPageProps {
  title: string;
  description: string;
  collectionName: string;
  fields: Field[];
  displayFields: string[]; // Keys to show in the table
}

export default function AdminContentPage({ 
  title, 
  description, 
  collectionName, 
  fields, 
  displayFields 
}: AdminContentPageProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, collectionName));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(data);
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      const initialData: any = {};
      fields.forEach(f => initialData[f.key] = f.type === 'number' ? 0 : '');
      setFormData(initialData);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        setItems(items.filter(i => i.id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const dataToSave = {
        ...formData,
        updatedAt: serverTimestamp()
      };
      delete dataToSave.id;

      if (editingItem) {
        await updateDoc(doc(db, collectionName, editingItem.id), dataToSave);
      } else {
        await addDoc(collection(db, collectionName), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
      }
      
      await fetchItems();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving item:', err);
      setError('Failed to save. Please check your permissions.');
    } finally {
      setSaving(false);
    }
  };

  const filteredItems = items.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-space font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            {title} <span className="text-red-600">Manager.</span>
          </h1>
          <p className="text-xs font-outfit font-bold uppercase tracking-widest text-zinc-400 mt-1">
            {description}
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input 
          type="text" 
          placeholder={`Search ${collectionName}...`} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                {displayFields.map(field => (
                  <th key={field} className="px-8 py-6 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">
                    {fields.find(f => f.key === field)?.label || field}
                  </th>
                ))}
                <th className="px-8 py-6 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              {loading ? (
                <tr>
                  <td colSpan={displayFields.length + 1} className="px-8 py-20 text-center">
                    <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={displayFields.length + 1} className="px-8 py-20 text-center text-zinc-400 font-space font-black uppercase">
                    No items found
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    {displayFields.map(field => (
                      <td key={field} className="px-8 py-6">
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 line-clamp-1">
                          {String(item[field])}
                        </span>
                      </td>
                    ))}
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
            >
              <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-2xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  {editingItem ? 'Edit' : 'Add New'} {title}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-xs font-bold font-space uppercase">{error}</p>
                  </div>
                )}

                {fields.map(field => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">
                      {field.label} {field.required && <span className="text-red-600">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea 
                        required={field.required}
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all min-h-[100px]"
                      />
                    ) : field.type === 'select' ? (
                      <select 
                        required={field.required}
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input 
                        type={field.type}
                        required={field.required}
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
                      />
                    )}
                  </div>
                ))}

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-4 bg-red-600 text-white rounded-2xl text-[10px] font-outfit font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    {editingItem ? 'Save Changes' : 'Create Item'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
