import React, { useEffect, useRef } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { BellIcon, CheckCircleIcon, SparklesIcon } from './Icons';

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
    const { notifications, unreadCount, markAllAsRead } = useNotifications();
    const panelRef = useRef<HTMLDivElement>(null);
    
    // Close panel on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);


    const getTypeIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            case 'warning':
                return <BellIcon className="h-5 w-5 text-yellow-500" />;
            default:
                return <SparklesIcon className="h-5 w-5 text-blue-500" />;
        }
    }


    return (
        <div
            ref={panelRef}
            className={`absolute right-0 bottom-14 mb-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 transition-all duration-300 ease-in-out z-20 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
            <div className="p-3 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-slate-100">Bildirimler</h3>
                {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Tümünü okundu işaretle
                    </button>
                )}
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    <ul>
                        {notifications.map(notification => (
                             <li key={notification.id} className={`p-3 border-b border-gray-100 dark:border-slate-700/50 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                                 <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        {getTypeIcon(notification.type)}
                                     </div>
                                     <div className="flex-1">
                                         <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">{notification.title}</p>
                                         <p className="text-sm text-gray-600 dark:text-slate-400">{notification.message}</p>
                                         <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                                             {new Date(notification.timestamp).toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                         </p>
                                     </div>
                                     {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>}
                                 </div>
                             </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center p-8">
                        <BellIcon className="mx-auto h-10 w-10 text-gray-400 dark:text-slate-500" />
                        <p className="mt-2 text-sm font-medium text-gray-700 dark:text-slate-300">Yeni bildiriminiz yok</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Sizin için her şeyi takip ediyoruz.</p>
                    </div>
                )}
            </div>
             <div className="p-2 bg-gray-50 dark:bg-slate-800/50 text-center rounded-b-lg">
                <a href="#" className="text-xs font-medium text-gray-600 dark:text-slate-400 hover:text-black dark:hover:text-white">
                    Bildirim Ayarları
                </a>
            </div>
        </div>
    );
};

export default NotificationPanel;