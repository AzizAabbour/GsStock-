import React from 'react';
import { Settings, ShieldCheck, Globe } from 'lucide-react';

const OwnerProfile = () => {
    return (
        <div className="pro-card p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 border border-zinc-200 p-0.5 shadow-inner">
                    <img 
                        src="https://ui-avatars.com/api/?name=Abdelaziz+Aabbour&background=fff&color=18181b&bold=true&size=128" 
                        alt="Abdelaziz Aabbour" 
                        className="w-full h-full rounded-[14px] object-cover"
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-sm border border-zinc-100">
                    <ShieldCheck size={12} className="text-indigo-500" />
                </div>
            </div>

            <div className="space-y-0.5">
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">Abdelaziz Aabbour</h3>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Directeur Logistique Global</p>
            </div>

            <div className="w-full mt-6 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 border border-zinc-100/50">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter flex items-center gap-1.5 leading-none">
                        <Globe size={11} /> Nœud Régional
                    </span>
                    <span className="text-[10px] font-bold text-zinc-900 uppercase">EMEA-Ouest</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 border border-zinc-100/50">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter flex items-center gap-1.5 leading-none">
                        <ShieldCheck size={11} /> Autorisations
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Certifié</span>
                </div>
            </div>

            <button className="w-full pro-button pro-button-secondary mt-6 h-9 text-[10px] uppercase font-bold tracking-widest gap-2">
                <Settings size={12} /> Configuration Système
            </button>
        </div>
    );
};

export default OwnerProfile;
