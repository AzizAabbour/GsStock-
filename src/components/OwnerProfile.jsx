import React from 'react';
import { ShieldCheck, Mail, MapPin, Award } from 'lucide-react';

const OwnerProfile = () => {
    return (
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(8,_112,_184,_0.05)] border border-slate-100 flex flex-col items-center text-center animate-in relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-16 sm:-top-24 -right-16 sm:-right-24 w-32 sm:w-48 h-32 sm:h-48 bg-primary-50 rounded-full blur-3xl opacity-50 group-hover:bg-primary-100 transition-colors duration-500"></div>

            <div className="relative mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-100 bg-slate-50 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                        alt="Mohammed AABBOUR"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute bottom-1 right-1 bg-emerald-500 p-1.5 sm:p-2 rounded-full border-2 sm:border-4 border-white shadow-lg">
                    <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
            </div>

            <div className="space-y-1 relative">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">M. AABBOUR</h3>
                <p className="text-primary-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Store Manager
                </p>
            </div>

            <div className="mt-6 sm:mt-8 w-full space-y-3 sm:space-y-4 relative">
                <ContactItem icon={<Mail className="w-3 h-3 sm:w-4 sm:h-4" />} text="aabbourmohamed4@gmail.com" />
                <ContactItem icon={<MapPin className="w-3 h-3 sm:w-4 sm:h-4" />} text="Casablanca, SM" />
            </div>

            <div className="mt-6 sm:mt-8 w-full pt-4 sm:pt-6 border-t border-slate-50 flex justify-around">
                <div className="text-center">
                    <p className="text-[8px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center justify-center space-x-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="font-bold text-slate-800 text-[11px] sm:text-sm">Actif</p>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-[8px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Rôle</p>
                    <p className="font-bold text-slate-800 text-[11px] sm:text-sm">Admin</p>
                </div>
            </div>
        </div>
    );
};

const ContactItem = ({ icon, text }) => (
    <div className="flex items-center space-x-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-md transition-all duration-300 group/item">
        <div className="bg-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-sm border border-slate-100 group-hover/item:border-primary-100 transition-colors">
            <div className="text-slate-400 group-hover/item:text-primary-500 transition-colors">
                {icon}
            </div>
        </div>
        <span className="text-[11px] sm:text-sm font-semibold text-slate-600 group-hover/item:text-slate-900 transition-colors line-clamp-1">{text}</span>
    </div>
);

export default OwnerProfile;
