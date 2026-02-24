import React from 'react';
import { Package, Hash, Trash2, AlertCircle } from 'lucide-react';

const ProductGrid = ({ products, onDelete }) => {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm px-6">
                <div className="bg-slate-50 p-6 rounded-full">
                    <Package className="w-12 h-12 sm:w-16 sm:h-16 text-slate-200" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-700 mt-6 text-center">Aucun produit en stock</h3>
                <p className="text-slate-400 text-center max-w-xs mt-2 font-medium text-xs sm:text-sm">
                    Commencez par ajouter un produit pour gérer votre inventaire.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
                <div key={product.reference} className="bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group animate-in flex flex-row sm:flex-col items-center sm:items-stretch h-36 sm:h-auto p-3 sm:p-0">

                    {/* Image - Smaller on mobile list view */}
                    <div className="w-28 sm:w-full h-28 sm:h-56 overflow-hidden bg-slate-50 relative rounded-xl sm:rounded-none flex-shrink-0">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-10 h-10 text-slate-200" />
                            </div>
                        )}

                        {/* Status Badge - Hidden on small list if redundant */}
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-[7px] sm:text-[9px] font-black tracking-widest uppercase shadow-sm ${product.quantity > 10 ? 'bg-emerald-500 text-white' :
                                    product.quantity > 0 ? 'bg-amber-500 text-white' :
                                        'bg-rose-500 text-white'
                                }`}>
                                {product.quantity > 0 ? 'EN STOCK' : 'RUPTURE'}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-4 sm:p-6 flex flex-col justify-between sm:justify-start h-full sm:h-auto">
                        <div>
                            <h4 className="text-base sm:text-lg font-black text-slate-800 line-clamp-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{product.name}</h4>
                            <div className="flex items-center text-slate-400 mt-0.5 sm:mt-1">
                                <Hash className="w-3 h-3 mr-1 text-primary-400" />
                                <span className="text-[9px] sm:text-[10px] font-black tracking-widest">{product.reference}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:pt-4 sm:mt-4 sm:border-t border-slate-50">
                            <div className="flex flex-col">
                                <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em] mb-0.5">Quantité</span>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-xl sm:text-2xl font-black ${product.quantity <= 5 ? 'text-rose-500' : 'text-slate-800'}`}>
                                        {product.quantity}
                                    </span>
                                    {product.quantity <= 5 && product.quantity > 0 && (
                                        <AlertCircle className="w-4 h-4 text-rose-400 animate-pulse hidden sm:block" />
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(product.reference);
                                }}
                                className="p-2 sm:p-2.5 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                title="Supprimer"
                            >
                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
