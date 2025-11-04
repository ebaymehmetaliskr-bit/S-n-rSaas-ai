import React, { useState, useMemo } from 'react';
import { CheckCircleIcon, SendIcon } from './Icons';
import Modal from './Modal';
import PetitionGenerator from './PetitionGenerator';

const EXEMPTION_LIMIT = 1900000;

const Dashboard: React.FC = () => {
    const [isPetitionModalOpen, setIsPetitionModalOpen] = useState(false);
    const [currentIncome, setCurrentIncome] = useState(450000);

    const progressPercentage = useMemo(() => {
        return Math.min((currentIncome / EXEMPTION_LIMIT) * 100, 100);
    }, [currentIncome]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 2 }).format(value);
    };
    
    const remainingAmount = useMemo(() => EXEMPTION_LIMIT - currentIncome, [currentIncome]);

    return (
        <>
            <main className="flex-1 h-screen overflow-y-auto p-6 md:p-10">
                <h1 className="text-3xl font-bold text-gray-900">Panelim</h1>
                <p className="mt-1 text-gray-600">Merhaba Ahmet, istisna sürecine genel bakışın burada.</p>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Exemption Tracker Widget */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">GVK 20/B (Sosyal Medya) Yıllık İstisna Limiti (2025)</h2>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            <div className="mt-3 flex justify-between items-center text-sm font-medium">
                                <span className="text-gray-600">Kullanılan Tutar: <span className="text-gray-900 font-bold">{formatCurrency(currentIncome)}</span></span>
                                <span className="text-gray-600">Kalan Hak: <span className="text-green-600 font-bold">{formatCurrency(remainingAmount)}</span></span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Toplam Yıllık Limit: {formatCurrency(EXEMPTION_LIMIT)}</p>
                        </div>
                        <div className="mt-5 text-right">
                             <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                                + Yeni Gelir Ekle
                            </button>
                        </div>
                    </div>

                    {/* Task List Widget */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Kurulum Görev Listeniz</h2>
                        <ul className="mt-4 space-y-4">
                            <li className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-white">
                                    <CheckCircleIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 line-through">1. İstisnaya Özel Banka Hesabı Aç</p>
                                    <p className="text-sm text-gray-500">Tamamlandı - 02.11.2025</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-600 rounded-full text-white font-bold text-sm">2</div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">2. Vergi Dairesine "İstisna Belgesi" Başvurusu Yap</p>
                                    <p className="text-sm text-gray-500">Bu belge ile banka hesabınızı ve istisna durumunuzu bildirmeniz gerekiyor.</p>
                                    <div className="mt-2 space-x-2">
                                        <button onClick={() => setIsPetitionModalOpen(true)} className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Dilekçeyi İndir (.doc)</button>
                                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700">Tamamladım</button>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-400 rounded-full text-white font-bold text-sm">3</div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">3. Mali Müşavirinize Bilgi Verin</p>
                                    <p className="text-sm text-gray-500">Stopaj ve (gerekirse) KDV-2 beyanları için bilgilendirme yapın.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* AI Assistant Widget */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900">AI Vergi Asistanı</h2>
                        <p className="text-sm text-gray-500 mt-1">GİB kaynaklarına göre yanıtlıyorum.</p>
                        <div className="mt-4 space-y-2">
                            <button className="w-full text-left text-sm p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700">"Stopaj ödemesi ne zaman yapılır?"</button>
                            <button className="w-full text-left text-sm p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700">"Bu hesaba TL gelirse ne olur?"</button>
                        </div>
                        <div className="mt-auto pt-4">
                            <div className="flex space-x-2">
                                <input type="text" placeholder="Sorunuzu yazın..." className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    <SendIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Dates Widget */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">Yaklaşan Resmi Tarihler (Vergi Takvimi)</h2>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">Tüm Takvimi Gör (Pro Özellik) →</a>
                        </div>
                         <ul className="mt-4 space-y-3">
                            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="font-medium text-gray-900">KDV-1 Beyannamesi</p>
                                    <p className="text-sm text-gray-500">Sadece KDV mükellefi iseniz.</p>
                                </div>
                                <span className="font-semibold text-gray-800">28 Kasım 2025</span>
                            </li>
                             <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="font-medium text-gray-900">Geçici Vergi (3. Dönem)</p>
                                    <p className="text-sm text-gray-500">Son Ödeme Günü</p>
                                </div>
                                <span className="font-semibold text-red-600">17 Aralık 2025 (YAKLAŞIYOR)</span>
                            </li>
                         </ul>
                    </div>
                </div>
            </main>
            
            {/* Modal for Petition Generator */}
            <Modal isOpen={isPetitionModalOpen} onClose={() => setIsPetitionModalOpen(false)}>
                <div className="bg-white rounded-lg">
                    {/* We must wrap PetitionGenerator as it expects a dark-themed container. 
                        This modal provides a generic container.
                        A better approach would be to make PetitionGenerator theme-agnostic.
                        For now, we render it inside a div that matches its styling needs.
                    */}
                    <div className="bg-slate-900 p-2 rounded-lg">
                         <PetitionGenerator />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Dashboard;