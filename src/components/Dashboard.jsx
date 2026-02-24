import React, { useState } from 'react';
import {
    BarChart3,
    Package,
    PackagePlus,
    PackageMinus,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    PlusCircle,
    Clock,
    LayoutDashboard,
    Search,
    Bell,
    Settings,
    ChevronRight,
    ShoppingCart,
    Plus,
    ArrowUp,
    ArrowDown,
    History
} from 'lucide-react';
import ProductGrid from './ProductGrid';
import OwnerProfile from './OwnerProfile';
import AddProductModal from './AddProductModal';
import StockActionModal from './StockActionModal';
import { useStock } from '../hooks/useStock';
import { exportToPDF } from '../utils/pdfExport';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { products, history: movementHistory, addProduct, updateStock, deleteProduct, getDailyStats } = useStock();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isStockOpen, setIsStockOpen] = useState(false);
    const [stockType, setStockType] = useState('in');
    const [searchTerm, setSearchTerm] = useState('');

    const dailyStats = getDailyStats();

    const handleExportPDF = () => {
        exportToPDF(movementHistory, products);
    };

    const stats = {
        total: products.length,
        inStock: products.filter(p => p.quantity > 0).length,
        outStock: products.filter(p => p.quantity === 0).length,
        totalItems: products.reduce((acc, p) => acc + p.quantity, 0)
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openStockModal = (type) => {
        setStockType(type);
        setIsStockOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-32 lg:pb-20">
            {/* Top Bar Navigation */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-10">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl shadow-slate-200 group-hover:bg-primary-600 transition-all duration-500">
                                <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-black text-slate-900 tracking-tighter block leading-none">GSSTOKE</span>
                                <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mt-1">Management Pro</span>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-1 max-w-lg mx-12">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher une référence..."
                                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all font-semibold text-slate-600 text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsAddOpen(true)}
                                className="hidden sm:flex items-center space-x-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-primary-600 transition-all shadow-lg active:scale-95"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Nouveau Produit</span>
                            </button>
                            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                <Bell className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">

                    <div className="lg:col-span-9 space-y-10 sm:space-y-12">

                        {/* Executive Summary Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-6">
                                <header>
                                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Tableau de Bord</h1>
                                    <p className="text-slate-500 font-medium mt-1">Vue d'ensemble de votre activité de stock.</p>
                                </header>

                                {/* Daily Activity Summary */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entrées (Aujourd'hui)</p>
                                            <p className="text-2xl font-black text-slate-900">+{dailyStats.entries}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                            <ArrowDownLeft className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sorties (Aujourd'hui)</p>
                                            <p className="text-2xl font-black text-slate-900">-{dailyStats.exits}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Transaction Panel */}
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full blur-[80px]"></div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight mb-2">Transactions Rapides</h3>
                                    <p className="text-slate-400 text-xs font-medium leading-relaxed">Gérez vos flux de stock en un clic.</p>
                                </div>
                                <div className="flex space-x-3 mt-8">
                                    <button
                                        onClick={() => openStockModal('in')}
                                        className="flex-1 bg-white/[0.08] hover:bg-emerald-500 text-white p-3 rounded-2xl transition-all flex flex-col items-center justify-center group/btn"
                                    >
                                        <ArrowUp className="w-5 h-5 mb-1 group-hover/btn:-translate-y-1 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-400 group-hover/btn:text-white">Entrée</span>
                                    </button>
                                    <button
                                        onClick={() => openStockModal('out')}
                                        className="flex-1 bg-white/[0.08] hover:bg-rose-500 text-white p-3 rounded-2xl transition-all flex flex-col items-center justify-center group/btn"
                                    >
                                        <ArrowDown className="w-5 h-5 mb-1 group-hover/btn:translate-y-1 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-rose-400 group-hover/btn:text-white">Sortie</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Core Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <StatCard label="Total Produits" value={stats.total} icon={<Package />} color="slate" />
                            <StatCard label="Unités Actives" value={stats.totalItems} icon={<Layers />} color="primary" />
                            <StatCard label="En Rupture" value={stats.outStock} icon={<AlertTriangle />} color="rose" />
                            <StatCard label="Volume" value="92%" icon={<TrendingUp />} color="emerald" />
                        </div>

                        {/* Inventory List Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-1.5 h-8 bg-slate-900 rounded-full"></div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Inventaire Principal</h2>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="hidden sm:inline-block text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-100 px-3 py-1 rounded-full">
                                        {filteredProducts.length} ARTICLES
                                    </span>
                                </div>
                            </div>

                            <ProductGrid products={filteredProducts} onDelete={deleteProduct} />
                        </div>

                        {/* Professional History Journal */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                        <History className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 leading-none">Journal des Flux</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Historique des 30 derniers jours</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleExportPDF}
                                    className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline"
                                >
                                    Exporter PDF
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#FBFCFD]">
                                        <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-50">
                                            <th className="py-5 pl-8">Horodatage</th>
                                            <th className="py-5">Article de Stock</th>
                                            <th className="py-5">Type de Mouvement</th>
                                            <th className="py-5 text-right pr-8">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {movementHistory.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="py-16 text-center text-slate-400 font-medium text-sm italic">Aucun mouvement enregistré pour le moment.</td>
                                            </tr>
                                        ) : (
                                            movementHistory.slice(0, 10).map(item => (
                                                <tr key={item.id} className="text-sm hover:bg-slate-50/80 transition-colors group/row">
                                                    <td className="py-6 pl-8">
                                                        <div className="flex flex-col">
                                                            <span className="font-extrabold text-slate-700">{new Date(item.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                            <span className="text-[10px] font-bold text-slate-400 mt-0.5">{new Date(item.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-6">
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-slate-800 uppercase text-xs truncate max-w-[200px]">{item.name}</span>
                                                            <span className="text-[9px] font-bold text-slate-400 tracking-wider">REF: {item.reference}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-6">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${item.type === 'in' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                                            }`}>
                                                            {item.type === 'in' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                                            {item.type === 'in' ? 'ENTRÉE STOCK' : 'SORTIE STOCK'}
                                                        </span>
                                                    </td>
                                                    <td className={`py-6 text-right pr-8 font-black text-lg ${item.type === 'in' ? 'text-emerald-500' : 'text-rose-500'
                                                        }`}>
                                                        {item.type === 'in' ? '+' : '-'}{item.amount}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <aside className="lg:col-span-3 space-y-10">
                        <OwnerProfile />

                        {/* Analytics Sidebar card */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                            <h4 className="font-black text-slate-900 tracking-tight flex items-center">
                                <BarChart3 className="w-5 h-5 mr-2 text-primary-500" />
                                Performance
                            </h4>
                            <div className="space-y-4">
                                <ProgressCircle label="Taux de Rotation" value={72} />
                                <ProgressCircle label="Fiabilité Stock" value={98} />
                            </div>
                            <div className="pt-4 border-t border-slate-50">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Conseil Pro</p>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    Une référence claire comme <span className="font-bold text-slate-900">PROD-001-B</span> facilite l'inventaire annuel.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Floating Bottom Navigation (Mobile) */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm">
                <div className="bg-slate-900 border border-white/10 rounded-3xl p-2 flex items-center justify-between shadow-2xl">
                    <MobileNavItem onClick={() => setIsAddOpen(true)} icon={<Plus className="w-5 h-5" />} label="Ajouter" primary />
                    <div className="w-px h-8 bg-white/10 mx-1"></div>
                    <MobileNavItem onClick={() => openStockModal('in')} icon={<ArrowUpRight className="w-5 h-5 text-emerald-400" />} label="Entrée" />
                    <MobileNavItem onClick={() => openStockModal('out')} icon={<ArrowDownRight className="w-5 h-5 text-rose-400" />} label="Sortie" />
                </div>
            </div>

            <AddProductModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={addProduct} />
            <StockActionModal isOpen={isStockOpen} onClose={() => setIsStockOpen(false)} onAction={updateStock} products={products} defaultType={stockType} />
        </div>
    );
};

/* Helper Components */
const NavIcon = ({ icon }) => (
    <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
        {icon}
    </button>
);

const MobileNavItem = ({ onClick, icon, label, primary }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex flex-col items-center justify-center py-2 transition-all active:scale-90 ${primary ? 'bg-primary-600 rounded-2xl text-white shadow-lg shadow-primary-900/40' : 'text-slate-400'
            }`}
    >
        {icon}
        <span className="text-[8px] font-black uppercase tracking-tighter mt-1">{label}</span>
    </button>
);

const StatCard = ({ label, value, icon, color }) => {
    const styles = {
        slate: "bg-white border-slate-100 shadow-sm text-slate-900",
        primary: "bg-primary-600 border-primary-500 shadow-lg shadow-primary-200 text-white",
        rose: "bg-rose-50 border-rose-100 shadow-sm text-rose-600",
        emerald: "bg-white border-slate-100 shadow-sm text-emerald-600"
    };

    return (
        <div className={`p-6 sm:p-8 rounded-[2rem] border transition-all hover:scale-[1.03] duration-500 overflow-hidden relative group ${styles[color]}`}>
            <div className="flex flex-col h-full justify-between">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-inner ${color === 'primary' ? 'bg-white/20' : 'bg-slate-50'
                    }`}>
                    {React.cloneElement(icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                </div>
                <div className="mt-6 sm:mt-10">
                    <span className={`text-2xl sm:text-4xl font-black tracking-tighter block ${color === 'primary' ? 'text-white' : 'text-slate-900'}`}>{value}</span>
                    <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest block mt-1 ${color === 'primary' ? 'text-primary-100' : 'text-slate-400'}`}>{label}</span>
                </div>
            </div>
        </div>
    );
};

const ProgressCircle = ({ label, value }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>{label}</span>
            <span className="text-slate-900">{value}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary-500 rounded-full"
            />
        </div>
    </div>
);

const ArrowDownLeft = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
    </svg>
);

const AlertTriangle = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

const Layers = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h17.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125V7.125z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5" />
    </svg>
);

export default Dashboard;
