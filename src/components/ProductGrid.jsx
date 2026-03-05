import React from 'react';
import { Trash2, AlertCircle, Box, ExternalLink } from 'lucide-react';

const ProductGrid = ({ products, onDelete }) => {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-zinc-300">
                <Box size={48} strokeWidth={1} className="mb-4 opacity-10" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Aucune donnée opérationnelle</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-zinc-100">
            {/* Header FR */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-50/50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <div className="col-span-1">Réf</div>
                <div className="col-span-5">Nom de la Ressource</div>
                <div className="col-span-2 text-center">Quantité</div>
                <div className="col-span-2 text-center">Statut</div>
                <div className="col-span-2 text-right">Contrôle</div>
            </div>

                {products.map((product, index) => (
                    <div
                        key={product.id || index}
                        className="group grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-zinc-50/50 transition-colors"
                    >
                        {/* Reference */}
                        <div className="col-span-1 flex items-center">
                            <span className="font-mono text-[11px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded leading-none">
                                {product.reference}
                            </span>
                        </div>

                        {/* Name & Image */}
                        <div className="col-span-1 lg:col-span-5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200/50 flex-shrink-0">
                                <img
                                    src={product.image || `https://images.unsplash.com/photo-1553413077-190dd305871c?w=100&q=80`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-zinc-900 tracking-tight group-hover:text-black">
                                    {product.name}
                                </h4>
                                <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mt-0.5">
                                    Nœud Logistique Primaire
                                </p>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-1 lg:col-span-2 text-center">
                            <div className="text-base font-bold font-mono text-zinc-900">
                                {product.quantity}
                                <span className="text-[10px] text-zinc-400 ml-1 font-sans">U</span>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-1 lg:col-span-2 flex justify-center">
                            {product.quantity <= 5 ? (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-tighter">
                                    <AlertCircle size={12} /> CRITIQUE
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-tighter">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500" /> NOMINAL
                                </div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="col-span-1 lg:col-span-2 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all border border-transparent hover:border-zinc-200"
                                title="Aperçu"
                            >
                                <ExternalLink size={14} />
                            </button>
                            <button
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                                onClick={() => onDelete(product.id)}
                                title="Supprimer"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ProductGrid;
