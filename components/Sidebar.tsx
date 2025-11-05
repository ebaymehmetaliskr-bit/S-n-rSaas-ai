import React, { useState } from 'react';
import { HomeIcon, ChecklistIcon, DollarIcon, SparklesIcon, LogoutIcon, BellIcon } from './Icons';
import ThemeToggle from './ThemeToggle';
import { useNotifications } from '../contexts/NotificationContext';
import NotificationPanel from './NotificationPanel';


interface SidebarProps {
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
    const { unreadCount } = useNotifications();
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    return (
        <aside className="w-64 flex-shrink-0 bg-gray-900 text-gray-300 flex flex-col hidden lg:flex">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center px-4">
                <span className="font-bold text-2xl text-white">SınırSaaS</span>
            </div>
            {/* Navigation Links */}
            <nav className="flex-1 px-2 py-4 space-y-2">
                <a href="#" className="flex items-center px-4 py-2.5 rounded-md bg-gray-800 text-white font-medium">
                    <HomeIcon className="w-5 h-5 mr-3" />
                    Panelim
                </a>
                <a href="#" className="flex items-center px-4 py-2.5 rounded-md hover:bg-gray-800 hover:text-white">
                    <ChecklistIcon className="w-5 h-5 mr-3" />
                    Görev Listem
                </a>
                <a href="#" className="flex items-center px-4 py-2.5 rounded-md hover:bg-gray-800 hover:text-white">
                    <DollarIcon className="w-5 h-5 mr-3" />
                    Gelir Takibi
                </a>
                <a href="#" className="flex items-center px-4 py-2.5 rounded-md hover:bg-gray-800 hover:text-white">
                    <SparklesIcon className="w-5 h-5 mr-3" />
                    AI Asistan
                </a>
            </nav>
            {/* Actions */}
             <div className="px-4 py-2 flex items-center justify-between">
                <ThemeToggle />
                 <div className="relative">
                    <button 
                        onClick={() => setIsPanelOpen(!isPanelOpen)}
                        className="p-2 rounded-full text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                        aria-label="Bildirimleri Görüntüle"
                    >
                        <BellIcon className="w-6 h-6" />
                         {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    <NotificationPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
                </div>
            </div>
            {/* User Profile & Logout */}
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <img className="w-10 h-10 rounded-full" src="https://placehold.co/100x100/EBF4FF/3B82F6?text=AG" alt="Avatar" />
                        <div>
                            <p className="font-medium text-white">Ahmet G.</p>
                            <p className="text-sm text-gray-400">Pro Plan</p>
                        </div>
                    </div>
                     <button onClick={onLogout} title="Çıkış Yap" className="text-gray-400 hover:text-white">
                        <LogoutIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;