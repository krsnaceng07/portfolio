'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { createItem, updateItem, deleteItem } from '@/actions/cms';

interface Column {
    key: string;
    label: string;
    type?: 'text' | 'textarea' | 'date'; // simplified types
    isList?: boolean; // for arrays like items/tools/skills
}

interface CMSSectionProps {
    title: string;
    table: any; // TableName
    initialData: any[];
    columns: Column[];
}

export function CMSSection({ title, table, initialData, columns }: CMSSectionProps) {
    const [items, setItems] = useState(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [status, setStatus] = useState<'idle' | 'saving' | 'deleting'>('idle');

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        setFormData(item);
        setIsAdding(false);
    };

    const handleAdd = () => {
        setEditingId(null);
        setFormData({});
        setIsAdding(true);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({});
    };

    const handleChange = (key: string, value: string, isList: boolean) => {
        if (isList) {
            // Split by comma for list items
            setFormData({ ...formData, [key]: value.split(',').map((s) => s.trim()) });
        } else {
            setFormData({ ...formData, [key]: value });
        }
    };

    const handleSave = async () => {
        setStatus('saving');

        let result;
        try {
            if (isAdding) {
                result = await createItem(table, formData);
            } else if (editingId) {
                result = await updateItem(table, editingId, formData);
            }

            if (result?.success) {
                alert('Success!'); // Temporary feedback
                window.location.reload();
            } else {
                alert('Failed: ' + (result?.error || 'Unknown error'));
            }
        } catch (err: any) {
            console.error('Save error:', err);
            alert('Error: ' + err.message);
        } finally {
            setStatus('idle');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        setStatus('deleting');
        const result = await deleteItem(table, id);
        if (result.success) {
            setItems(items.filter(i => i.id !== id));
        } else {
            alert('Failed to delete');
        }
        setStatus('idle');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-3 py-2 bg-primary text-black rounded font-bold hover:bg-primary/90 text-sm"
                >
                    <Plus className="w-4 h-4" /> Add New
                </button>
            </div>

            {isAdding && (
                <div className="bg-white/10 p-4 rounded-lg border border-primary/50 mb-6">
                    <h3 className="text-lg font-bold text-white mb-4">New Item</h3>
                    <Form
                        columns={columns}
                        data={formData}
                        onChange={handleChange}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        loading={status === 'saving'}
                    />
                </div>
            )}

            <div className="grid gap-4">
                {items.map((item, index) => (
                    <div key={item.id || index} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                        {editingId === item.id ? (
                            <Form
                                columns={columns}
                                data={formData}
                                onChange={handleChange}
                                onSave={handleSave}
                                onCancel={handleCancel}
                                loading={status === 'saving'}
                            />
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="space-y-2 flex-1">
                                    {columns.map(col => (
                                        <div key={col.key} className="text-sm">
                                            <span className="text-gray-500 block text-xs uppercase">{col.label}</span>
                                            <span className="text-white">
                                                {col.isList
                                                    ? (item[col.key] as string[])?.join(', ')
                                                    : item[col.key]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button onClick={() => handleEdit(item)} className="p-2 bg-white/5 hover:bg-white/10 rounded text-blue-400">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/5 hover:bg-red-500/20 rounded text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Form({ columns, data, onChange, onSave, onCancel, loading }: any) {
    return (
        <div className="space-y-4">
            {columns.map((col: any) => (
                <div key={col.key}>
                    <label className="block text-xs uppercase text-gray-500 mb-1">{col.label}</label>
                    {col.type === 'textarea' ? (
                        <textarea
                            value={col.isList ? (data[col.key] || []).join(', ') : (data[col.key] || '')}
                            onChange={(e) => onChange(col.key, e.target.value, col.isList)}
                            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
                            rows={3}
                        />
                    ) : (
                        <input
                            type="text"
                            value={col.isList ? (data[col.key] || []).join(', ') : (data[col.key] || '')}
                            onChange={(e) => onChange(col.key, e.target.value, col.isList)}
                            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
                        />
                    )}
                </div>
            ))}
            <div className="flex gap-3 pt-2">
                <button
                    onClick={onSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                    <Check className="w-4 h-4" /> Save
                </button>
                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                >
                    <X className="w-4 h-4" /> Cancel
                </button>
            </div>
        </div>
    );
}
