import React, { useState } from 'react';
import { X, ArrowUpCircle, ArrowDownCircle, Info, Package, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StockActionModal = ({ isOpen, onClose, onAction, products, defaultType = 'in' }) => {
    const [type, setType] = useState(defaultType); 
    const [reference, setReference] = useState('');
    const [amount, setAmount] = useState(1);
    const [error, setError] = useState('');

    const selectedProduct = products.find(p => p.reference === reference);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!reference) {
            setError('Veuillez sélectionner un produit');
            return;
        }

        try {
            onAction(reference, parseInt(amount), type);
            setReference('');
            setAmount(1);
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
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative z-10 border border-white/20"
                >
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-slate-50 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-2 h-full transition-colors duration-500 ${type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Mouvement Stock</h3>
                                <p className="text-slate-400 text-sm font-medium">Enregistrez une entrée ou sortie</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-2xl transition-all">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Toggle */}
                        <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] mb-8 relative">
                            <motion.div
                                className={`absolute inset-y-1.5 w-[calc(50%-6px)] rounded-2xl shadow-lg border border-white/50 ${type === 'in' ? 'left-1.5 bg-white' : 'left-[calc(50%+1.5px)] bg-white'
                                    }`}
                                layout
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => setType('in')}
                                className={`flex-1 flex items-center justify-center py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest relative z-10 transition-colors duration-500 ${type === 'in' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <ArrowUpCircle className="w-4 h-4 mr-2" />
                                Entrée
                            </button>
                            <button
                                onClick={() => setType('out')}
                                className={`flex-1 flex items-center justify-center py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest relative z-10 transition-colors duration-500 ${type === 'out' ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <ArrowDownCircle className="w-4 h-4 mr-2" />
                                Sortie
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center">
                                    <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                                    Sélectionner Produit
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Package className="h-5 w-5 text-slate-300" />
                                    </div>
                                    <select
                                        required
                                        className="block w-full pl-11 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none"
                                        value={reference}
                                        onChange={(e) => setReference(e.target.value)}
                                    >
                                        <option value="">- Choisir un article -</option>
                                        {products.map(p => (
                                            <option key={p.reference} value={p.reference}>
                                                {p.name} ({p.quantity})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                        <ChevronDown className="h-5 w-5 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                                    Quantité à {type === 'in' ? 'ajouter' : 'retirer'}
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    className="block w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white outline-none transition-all font-black text-2xl text-slate-800"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            {selectedProduct && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-start p-4 rounded-2xl border transition-colors duration-500 ${type === 'in' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'
                                        }`}
                                >
                                    <Info className={`w-5 h-5 mr-3 mt-0.5 ${type === 'in' ? 'text-emerald-500' : 'text-rose-500'}`} />
                                    <div>
                                        <p className={`text-xs font-bold leading-relaxed ${type === 'in' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                            Le nouveau stock sera de :
                                        </p>
                                        <p className={`text-xl font-black ${type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {type === 'in'
                                                ? selectedProduct.quantity + parseInt(amount || 0)
                                                : selectedProduct.quantity - parseInt(amount || 0)
                                            } unités
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                className={`w-full py-5 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center ${type === 'in'
                                        ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                                        : 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'
                                    }`}
                            >
                                {type === 'in' ? <ArrowUpCircle className="w-4 h-4 mr-2" /> : <ArrowDownCircle className="w-4 h-4 mr-2" />}
                                Confirmer l'{type === 'in' ? 'Entrée' : 'Sortie'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default StockActionModal;
