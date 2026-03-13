import React, { useState } from 'react';
import { X, Image as ImageIcon, Zap, ChevronRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        reference: '',
        quantity: '',
        image: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            quantity: parseInt(formData.quantity) || 0
        });
        setFormData({ name: '', reference: '', quantity: '', image: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <div
                        onClick={onClose}
                        className="absolute inset-0 bg-white/40 backdrop-blur-sm"
                    />

                    <div
                        className="relative w-full max-w-md bg-white border border-zinc-200 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
                    >
                        {/* Header FR */}
                        <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                                    <Zap size={16} className="text-zinc-400" /> Nouvelle Ressource Inventaire
                                </h2>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Protocole d'Enregistrement v5.0</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 flex items-center justify-center hover:bg-zinc-100 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                                        Désignation de la Ressource
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="pro-input"
                                        placeholder="Nom de l'article..."
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                                            Clé de Référence
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="pro-input font-mono uppercase text-xs"
                                            placeholder="REF-XXXX"
                                            value={formData.reference}
                                            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                                            Unités Opérationnelles
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            className="pro-input font-mono"
                                            placeholder="0"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                                        Identifiant Visuel (URL1)
                                    </label>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                                        Identifiant Visuel (URL2)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="pro-input pl-10"
                                            placeholder="https://images.unsplash.com/..."
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        />
                                        <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-300" size={14} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 pro-button pro-button-secondary h-11"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 pro-button pro-button-primary h-11 gap-2"
                                >
                                    Valider Entrée <ChevronRight size={14} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddProductModal;
