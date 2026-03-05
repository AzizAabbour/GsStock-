import React, { useState } from 'react';
import {
    Package,
    Plus,
    History,
    FileDown,
    Activity,
    ArrowUpCircle,
    ArrowDownCircle,
    FileSpreadsheet,
    Search,
    Bell,
    Clock,
    AlertCircle,
    TrendingUp,
    Zap,
    Layers,
    Terminal,
    Command
} from 'lucide-react';
import ProductGrid from './ProductGrid';
import OwnerProfile from './OwnerProfile';
import AddProductModal from './AddProductModal';
import StockActionModal from './StockActionModal';
import { useStock } from '../hooks/useStock';
import { exportToPDF } from '../utils/pdfExport';
import { exportToExcel } from '../utils/excelExport';

const Dashboard = () => {
    const { products, history, addProduct, updateStock, deleteProduct, getDailyStats } = useStock();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [actionType, setActionType] = useState('in');
    const [searchTerm, setSearchTerm] = useState('');

    const dailySummary = getDailyStats();
    const totalInventoryValue = products.reduce((acc, p) => acc + p.quantity, 0);
    const lowStockItems = products.filter(p => p.quantity <= 5);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openActionModal = (type) => {
        setActionType(type);
        setIsActionModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col selection:bg-black selection:text-white">
            <div className="noise-overlay" />
            
            {/* Navigation Header Pro - Traduit en FR */}
            <nav className="glass-nav h-14 sticky top-0 z-[60] flex items-center justify-between px-6">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg">
                            <Command className="text-white w-4 h-4" />
                        </div>
                        <span className="font-heading font-bold text-sm tracking-tight text-black">Nexus <span className="text-zinc-400 font-medium">OS</span></span>
                    </div>
                    <div className="h-4 w-[1px] bg-zinc-200" />
                    <div className="hidden lg:flex items-center gap-6">
                        {['Tableau de bord', 'Inventaire', 'Analyses', 'Paramètres'].map((item, idx) => (
                            <button key={item} className={`text-[12px] font-medium transition-all ${idx === 0 ? 'text-black' : 'text-zinc-500 hover:text-black'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative group hidden md:block">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-zinc-400">
                           <Search size={14} />
                        </div>
                        <input
                            type="text"
                            placeholder="Recherche de ressources..."
                            className="bg-zinc-100/50 border border-transparent focus:border-zinc-200 focus:bg-white h-8 w-64 pl-9 pr-3 rounded-lg text-[12px] transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-zinc-200/50 border border-zinc-200 rounded text-[10px] text-zinc-400 font-mono hidden group-focus-within:block">
                            ⌘K
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pl-4 border-l border-zinc-100">
                        <Bell size={16} className="text-zinc-400 hover:text-black cursor-pointer transition-colors" />
                        <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Abdelaziz+Aabbour&background=18181b&color=fff&size=64" alt="AZ" />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 pro-container space-y-10">
                {/* Header - Traduit en FR */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                           <Activity size={12} className="text-indigo-500" /> SYSTÈME OPÉRATIONNEL
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-heading">Vue d'ensemble de l'inventaire</h1>
                        <p className="text-zinc-500 font-medium text-sm">Gestion des pôles logistiques centraux et des nœuds de distribution.</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-zinc-100/50 p-1 rounded-lg border border-zinc-200/50">
                            <button onClick={() => exportToPDF(history, products)} className="p-2 hover:bg-white rounded-md transition-all text-zinc-500 hover:text-black hover:shadow-sm" title="Export PDF">
                                <FileDown size={18} />
                            </button>
                            <button onClick={() => exportToExcel(products, history)} className="p-2 hover:bg-white rounded-md transition-all text-zinc-500 hover:text-emerald-600 hover:shadow-sm" title="Export Excel">
                                <FileSpreadsheet size={18} />
                            </button>
                        </div>
                        <button onClick={() => setIsAddModalOpen(true)} className="pro-button pro-button-primary h-10 px-4">
                            <Plus size={16} className="mr-1.5" /> Créer Nouveau
                        </button>
                    </div>
                </header>

                {/* Métriques - Traduit en FR */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard label="Unités Totales" value={totalInventoryValue} icon={<Package size={18} />} trend="+12.5%" />
                    <MetricCard label="Produits Critiques" value={lowStockItems.length} icon={<AlertCircle size={18} />} status={lowStockItems.length > 0 ? 'error' : 'fine'} />
                    <MetricCard label="Entrées (24h)" value={dailySummary.entries} icon={<TrendingUp size={18} className="text-indigo-500" />} />
                    <MetricCard label="Sorties (24h)" value={dailySummary.exits} icon={<Zap size={18} className="text-amber-500" />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Section Inventaire Principale */}
                    <div className="lg:col-span-9">
                        <section className="pro-card">
                            <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-600">
                                        <Layers size={16} />
                                    </div>
                                    <h3 className="font-bold text-sm text-zinc-900">Registre des Ressources</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openActionModal('in')} className="pro-button pro-button-secondary py-1.5 h-8 text-[11px]">
                                        Log Entrée
                                    </button>
                                    <button onClick={() => openActionModal('out')} className="pro-button pro-button-secondary py-1.5 h-8 text-[11px] text-rose-600 hover:bg-rose-50/50">
                                        Log Sortie
                                    </button>
                                </div>
                            </div>
                            <ProductGrid products={filteredProducts} onDelete={deleteProduct} />
                        </section>
                    </div>

                    {/* Barre latérale */}
                    <div className="lg:col-span-3 space-y-6">
                        <OwnerProfile />
                        
                        <section className="pro-card flex flex-col">
                            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <History size={14} className="text-zinc-400" /> Événements
                                </h4>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Sync Live</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 max-h-[440px] overflow-y-auto custom-scrollbar">
                                {history.length === 0 ? (
                                    <div className="py-12 text-center opacity-20">
                                        <Terminal size={32} className="mx-auto mb-2" />
                                        <p className="text-[10px] font-bold tracking-widest uppercase">EN ATTENTE</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-zinc-50">
                                        {history.map((entry, idx) => (
                                            <div key={idx} className="p-4 hover:bg-zinc-50/50 transition-colors flex justify-between items-center group">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${entry.type === 'in' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                                                        {entry.type === 'in' ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-[12px] font-bold text-zinc-800">{entry.name}</p>
                                                        <div className="flex items-center gap-2 mt-0.5 text-[9px] font-medium text-zinc-400 uppercase">
                                                            <Clock size={10} /> {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`text-[11px] font-mono font-bold ${entry.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                    {entry.type === 'in' ? '+' : '-'}{entry.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-zinc-50/30 border-t border-zinc-100">
                                <button
                                    onClick={() => exportToPDF(history, products)}
                                    className="w-full pro-button pro-button-secondary py-2 text-[10px] uppercase font-bold tracking-widest"
                                >
                                    Générer Rapport
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="mt-auto py-8 border-t border-zinc-100 px-10">
                <div className="pro-container !py-0 flex flex-col md:flex-row justify-between items-center text-zinc-400 text-[10px] gap-4 font-medium uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-6">
                        <span className="text-black font-bold">Nexus v5.1.0</span>
                        <div className="flex items-center gap-2 text-emerald-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            Cloud Connecté
                        </div>
                    </div>
                    <p>© 2026 Nexus Infrastructure. Gestion Avancée des Ressources.</p>
                </div>
            </footer>

            <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addProduct} />
            <StockActionModal isOpen={isActionModalOpen} onClose={() => setIsActionModalOpen(false)} type={actionType} onAction={updateStock} products={products} />
        </div>
    );
};

const MetricCard = ({ label, value, icon, status, trend }) => {
    return (
        <div
            className={`pro-card p-6 flex flex-col justify-between min-h-[140px] cursor-default`}
        >
            <div className="flex items-start justify-between">
                <div className={`w-9 h-9 border border-zinc-100 rounded-lg flex items-center justify-center text-zinc-500 bg-white/50 backdrop-blur-sm`}>
                    {icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                    {status === 'error' && (
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-bold rounded border border-rose-100 uppercase tracking-tighter shadow-sm">Action Requise</span>
                    )}
                    {trend && (
                        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">{trend}</span>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                    <h2 className="text-2xl font-bold font-heading text-zinc-900 font-mono tracking-tight">{value}</h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
