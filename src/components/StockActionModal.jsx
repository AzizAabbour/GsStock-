import React, { useState } from 'react';
import { X, ArrowUpCircle, ArrowDownCircle, Search, MapPin, ChevronRight, Activity } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const StockActionModal = ({ isOpen, onClose, type, onAction, products }) => {
    const [selectedProductId, setSelectedProductId] = useState('');
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAction(selectedProductId, parseInt(amount), type, location);
        setAmount('');
        setLocation('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <div
                        onClick={onClose}
                        className="absolute inset-0 bg-white/60 backdrop-blur-md"
                    />

                    <div
                        className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] overflow-hidden"
                    >
                        {/* Status Bar */}
                        <div className={`h-1.5 w-full ${type === 'in' ? 'bg-indigo-500' : 'bg-rose-500'}`} />

                        {/* Header FR */}
                        <div className="px-10 py-8 border-b border-zinc-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${type === 'in' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                                    {type === 'in' ? <ArrowUpCircle size={22} /> : <ArrowDownCircle size={22} />}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                                        Mouvement de Ressource
                                    </h2>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${type === 'in' ? 'text-indigo-600' : 'text-rose-600'}`}>
                                            {type === 'in' ? 'Flux Entrant' : 'Flux Sortant'}
                                        </span>
                                        <span className="text-zinc-200">•</span>
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                                            <Activity size={10} /> Monitoring Live
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 flex items-center justify-center hover:bg-zinc-100 transition-colors">
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="space-y-6">
                                {/* Product Selector FR */}
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
                                        Sélectionner la Ressource Cible
                                    </label>
                                    <div className="relative">
                                        <select
                                            required
                                            className="pro-input h-12 appearance-none pr-10 font-bold text-zinc-800"
                                            value={selectedProductId}
                                            onChange={(e) => setSelectedProductId(e.target.value)}
                                        >
                                            <option value="">Chercher une ressource...</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>{p.name} — {p.reference}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-300">
                                            <Search size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* Amount Input FR */}
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
                                            Quantité à Transférer
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            className="pro-input h-12 font-mono font-bold text-lg"
                                            placeholder="000"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>

                                    {/* Location Input FR */}
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">
                                            Nœud Logique (Emplacement)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                className="pro-input h-12 pl-10 font-medium"
                                                placeholder="ex: Dépôt-Alpha"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-300" size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 pro-button pro-button-secondary h-12 font-bold uppercase tracking-widest text-[10px]"
                                >
                                    Fermer
                                </button>
                                <button
                                    type="submit"
                                    className={`flex-[2] pro-button h-12 font-bold uppercase tracking-widest text-[10px] text-white transition-all shadow-lg ${type === 'in' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'}`}
                                >
                                    Confirmer l'Opération <ChevronRight size={14} className="ml-1" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StockActionModal;
