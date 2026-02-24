import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Tag, Hash, Box, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        reference: '',
        image: '',
        quantity: 0
    });
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError('Image trop volumineuse (max 2Mo)');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.reference) {
            setError('Le nom et la référence sont obligatoires');
            return;
        }

        try {
            onAdd(formData);
            setFormData({ name: '', reference: '', image: '', quantity: 0 });
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative z-10 border border-white/20"
                >
                    {/* Header */}
                    <div className="px-8 py-6 flex items-center justify-between border-b border-slate-50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-primary-500"></div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 flex items-center">
                                <Sparkles className="w-6 h-6 mr-3 text-primary-500" />
                                Nouveau Produit
                            </h3>
                            <p className="text-slate-400 text-sm font-medium mt-1">Ajoutez un article à votre inventaire premium</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-2xl transition-all duration-300">
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center"
                            >
                                <div className="w-2 h-2 bg-rose-500 rounded-full mr-3 animate-pulse"></div>
                                {error}
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Nom du Produit
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Tag className="h-5 w-5 text-slate-300 group-focus-within:text-primary-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="ex: Montre Connectée Pro"
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Référence SKU
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Hash className="h-5 w-5 text-slate-300 group-focus-within:text-primary-400 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="SKU-001"
                                            className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all font-bold tracking-wider text-slate-700"
                                            value={formData.reference}
                                            onChange={(e) => setFormData({ ...formData, reference: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Stock Initial
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Box className="h-5 w-5 text-slate-300 group-focus-within:text-primary-400 transition-colors" />
                                        </div>
                                        <input
                                            type="number"
                                            min="0"
                                            className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Image du Produit
                                </label>
                                <div className="group relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="image-add"
                                    />
                                    <label
                                        htmlFor="image-add"
                                        className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] cursor-pointer hover:bg-primary-50 hover:border-primary-200 transition-all duration-300 relative overflow-hidden"
                                    >
                                        {formData.image ? (
                                            <div className="relative group/img">
                                                <img src={formData.image} alt="Preview" className="h-32 w-32 object-cover rounded-2xl shadow-lg border-4 border-white" />
                                                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                                    <ImageIcon className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                                                    <ImageIcon className="w-10 h-10 text-primary-400" />
                                                </div>
                                                <span className="mt-4 text-sm font-bold text-slate-500">Cliquez pour choisir une photo</span>
                                                <span className="mt-1 text-[10px] text-slate-400 uppercase tracking-widest">PNG, JPG ou WEBP (Max 2Mo)</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-8 py-4 bg-slate-100 text-slate-600 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 transition-all duration-300"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] px-8 py-4 bg-primary-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all duration-300 active:scale-95 group flex items-center justify-center"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Créer l'article
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddProductModal;
