import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BotIcon, CheckCircleIcon, LoaderIcon, SendIcon, UserIcon, XIcon } from './Icons';
import Modal from './Modal';
import PetitionGenerator from './PetitionGenerator';
import { IncomeEntry, Task, ChatMessage } from '../types';
import { useNotifications } from '../contexts/NotificationContext';
import ExchangeRateBot from './ExchangeRateBot';

const EXEMPTION_LIMIT = 1900000;

// Placeholder for exchange rates. In a real app, this would be fetched.
const MOCK_RATES = {
    USD: 32.5,
    EUR: 35.0,
    GBP: 40.0,
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 2 }).format(value);
};

const initialTasks: Task[] = [
    { id: 1, text: '1. İstisnaya Özel Banka Hesabı Aç', details: '', completed: true, completedDate: '02.11.2025' },
    { id: 2, text: '2. Vergi Dairesine "İstisna Belgesi" Başvurusu Yap', details: 'Bu belge ile banka hesabınızı ve istisna durumunuzu bildirmeniz gerekiyor.', completed: false },
    { id: 3, text: '3. Mali Müşavirinize Bilgi Verin', details: 'Stopaj ve (gerekirse) KDV-2 beyanları için bilgilendirme yapın.', completed: false }
];

const AddIncomeModal: React.FC<{
    onClose: () => void;
    onAddIncome: (entry: IncomeEntry) => void;
}> = ({ onClose, onAddIncome }) => {
    const [newAmount, setNewAmount] = useState('');
    const [newCurrency, setNewCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
    const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
    const [newDescription, setNewDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(newAmount);
        if (!amount || amount <= 0 || !newDescription.trim() || !newDate) {
            alert('Lütfen tüm alanları geçerli bir şekilde doldurun.');
            return;
        }

        const exchangeRate = MOCK_RATES[newCurrency];
        const newEntry: IncomeEntry = {
            id: Date.now(),
            date: newDate,
            description: newDescription.trim(),
            amount: amount,
            currency: newCurrency,
            exchangeRate: exchangeRate,
            tryValue: amount * exchangeRate,
        };
        onAddIncome(newEntry);
        onClose();
    };
    
    return (
         <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Yeni Gelir Ekle</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Açıklama</label>
                    <input type="text" id="description" value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Örn: Stripe Ödemesi #XYZ" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-slate-100" />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Tarih</label>
                    <input type="date" id="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-slate-100" />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Tutar</label>
                    <input type="number" id="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="150.00" step="0.01" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-slate-100" />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Para Birimi</label>
                    <select id="currency" value={newCurrency} onChange={e => setNewCurrency(e.target.value as 'USD' | 'EUR' | 'GBP')} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                    </select>
                </div>
                <div className="md:col-span-2 text-right">
                    <button type="submit" className="w-full md:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Gelir Ekle
                    </button>
                </div>
            </form>
        </div>
    )
}

interface DashboardProps {
    setActiveSection: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveSection }) => {
    const [isPetitionModalOpen, setIsPetitionModalOpen] = useState(false);
    const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
    const { addNotification } = useNotifications();
    
    const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([
        { id: 1, date: '2025-11-01', description: 'Gumroad Satışı #123', amount: 5000, currency: 'USD', exchangeRate: 30.50, tryValue: 152500 },
        { id: 2, date: '2025-11-03', description: 'Stripe Ödemesi #ABC', amount: 8000, currency: 'EUR', exchangeRate: 33.00, tryValue: 264000 },
        { id: 3, date: '2025-11-05', description: 'Patreon Destek', amount: 1000, currency: 'USD', exchangeRate: 31.00, tryValue: 31000 },
    ]);

    // Task list state
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    // AI Assistant state
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isAiThinking, setIsAiThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Refs for IntersectionObserver
    const homeRef = useRef<HTMLHeadingElement>(null);
    const taskListRef = useRef<HTMLDivElement>(null);
    const aiAssistantRef = useRef<HTMLDivElement>(null);
    const incomeTrackerRef = useRef<HTMLDivElement>(null);


    // Simulate initial notifications on mount
    useEffect(() => {
        // Use a timeout to let the UI render first, feels more natural
        const timer = setTimeout(() => {
             addNotification({
                title: 'Önemli Hatırlatma',
                message: 'Geçici Vergi (3. Dönem) son ödeme günü yaklaşıyor: 17 Aralık 2025.',
                type: 'warning',
             });
        }, 1500);

        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // Intersection Observer for section highlighting
    useEffect(() => {
        const trackedSections = [
            { id: 'home', ref: homeRef },
            { id: 'task-list', ref: taskListRef },
            { id: 'ai-assistant', ref: aiAssistantRef },
            { id: 'income-tracker', ref: incomeTrackerRef },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingEntry = entries.find(entry => entry.isIntersecting);
                if (intersectingEntry) {
                    setActiveSection(intersectingEntry.target.id);
                }
            },
            {
                rootMargin: '-40% 0px -60% 0px', // Trigger when section is in the middle 40% of the screen
                threshold: 0,
            }
        );

        trackedSections.forEach(section => {
            if (section.ref.current) {
                observer.observe(section.ref.current);
            }
        });

        return () => {
             trackedSections.forEach(section => {
                if (section.ref.current) {
                    observer.unobserve(section.ref.current);
                }
            });
        };
    }, [setActiveSection]);


    const totalIncomeTRY = useMemo(() => {
        return incomeEntries.reduce((total, entry) => total + entry.tryValue, 0);
    }, [incomeEntries]);

    const progressPercentage = useMemo(() => {
        return Math.min((totalIncomeTRY / EXEMPTION_LIMIT) * 100, 100);
    }, [totalIncomeTRY]);
    
    const remainingAmount = useMemo(() => EXEMPTION_LIMIT - totalIncomeTRY, [totalIncomeTRY]);

    const handleAddIncome = (newEntry: IncomeEntry) => {
        setIncomeEntries(prevEntries => [newEntry, ...prevEntries]);
    };

    const handleCompleteTask = (taskId: number) => {
        const task = tasks.find(t => t.id === taskId);
        if (task && !task.completed) {
             setTasks(tasks.map(t => 
                t.id === taskId 
                ? { ...t, completed: true, completedDate: new Date().toLocaleDateString('tr-TR') } 
                : t
            ));
            addNotification({
                title: 'Görev Tamamlandı!',
                message: `Harika iş! "${task.text}" görevini tamamladın.`,
                type: 'success',
            });
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isAiThinking) return;
        
        const newUserMessage: ChatMessage = { id: Date.now(), text: userInput, sender: 'user' };
        setChatMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsAiThinking(true);

        setTimeout(() => {
            const aiResponse: ChatMessage = { id: Date.now() + 1, text: 'Bu harika bir soru! GİB kaynaklarına göre, stopaj ödemeleri üç aylık dönemler halinde, ilgili dönemi takip eden ikinci ayın 28. gününe kadar beyan edilip ödenmelidir.', sender: 'ai' };
            setChatMessages(prev => [...prev, aiResponse]);
            setIsAiThinking(false);
        }, 1800);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, isAiThinking]);


    return (
        <>
            <main className="flex-1 h-screen overflow-y-auto p-6 md:p-10 scroll-smooth">
                <h1 ref={homeRef} id="home" className="text-3xl font-bold text-gray-900 dark:text-slate-100 scroll-mt-20">Panelim</h1>
                <p className="mt-1 text-gray-600 dark:text-slate-400">Merhaba Ahmet, istisna sürecine genel bakışın burada.</p>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Exemption Tracker Widget */}
                    <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">GVK 20/B (Sosyal Medya) Yıllık İstisna Limiti (2025)</h2>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4">
                                <div className="bg-blue-600 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            <div className="mt-3 flex justify-between items-center text-sm font-medium">
                                <span className="text-gray-600 dark:text-slate-400">Kullanılan Tutar: <span className="text-gray-900 dark:text-slate-100 font-bold">{formatCurrency(totalIncomeTRY)}</span></span>
                                <span className="text-gray-600 dark:text-slate-400">Kalan Hak: <span className="text-green-600 dark:text-green-400 font-bold">{formatCurrency(remainingAmount)}</span></span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">Toplam Yıllık Limit: {formatCurrency(EXEMPTION_LIMIT)}</p>
                        </div>
                        <div className="mt-5 text-right">
                             <button onClick={() => setIsAddIncomeModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                                + Yeni Gelir Ekle
                            </button>
                        </div>
                    </div>

                    {/* Task List Widget */}
                    <div ref={taskListRef} id="task-list" className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 scroll-mt-20">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Kurulum Görev Listeniz</h2>
                        <ul className="mt-4 space-y-4">
                            {tasks.map((task, index) => (
                                <li key={task.id} className="flex items-start space-x-3">
                                    <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-white font-bold text-sm ${task.completed ? 'bg-green-500' : (task.id === 2 ? 'bg-blue-600' : 'bg-gray-400 dark:bg-slate-600')}`}>
                                        {task.completed ? <CheckCircleIcon className="w-4 h-4" /> : index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium text-gray-900 dark:text-slate-200 ${task.completed ? 'line-through' : ''}`}>{task.text}</p>
                                        <p className="text-sm text-gray-500 dark:text-slate-400">{task.details}</p>
                                        {task.completed ? (
                                            <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">Tamamlandı - {task.completedDate}</p>
                                        ) : (
                                            <div className="mt-2 space-x-2">
                                                {task.id === 2 && <button onClick={() => setIsPetitionModalOpen(true)} className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-slate-600 text-xs font-medium rounded-md text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">Dilekçeyi İndir (.doc)</button>}
                                                <button onClick={() => handleCompleteTask(task.id)} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700">Tamamladım</button>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column for Bots */}
                    <div ref={aiAssistantRef} id="ai-assistant" className="lg:col-span-1 flex flex-col gap-6 scroll-mt-20">
                        <ExchangeRateBot />

                        {/* AI Assistant Widget */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">AI Vergi Asistanı</h2>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">GİB kaynaklarına göre yanıtlıyorum.</p>
                            
                            <div className="mt-4 flex-1 flex flex-col-reverse overflow-y-auto bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg min-h-[200px]">
                                <div ref={chatEndRef} />
                                {isAiThinking && (
                                    <div className="flex items-start space-x-2.5 p-2">
                                        <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-slate-700 rounded-full">
                                            <BotIcon className="w-5 h-5 text-gray-500 dark:text-slate-400"/>
                                        </div>
                                        <div className="bg-gray-200 dark:bg-slate-700 rounded-lg p-2.5">
                                           <LoaderIcon className="w-5 h-5 text-gray-500 dark:text-slate-400 animate-spin"/>
                                        </div>
                                    </div>
                                )}
                                {chatMessages.slice().reverse().map((msg) => (
                                   <div key={msg.id} className={`flex items-start space-x-2.5 p-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                        {msg.sender === 'ai' && (
                                            <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-slate-700 rounded-full">
                                                 <BotIcon className="w-5 h-5 text-gray-500 dark:text-slate-400"/>
                                            </div>
                                        )}
                                        <div className={`max-w-xs break-words rounded-lg p-2.5 text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200'}`}>
                                            {msg.text}
                                        </div>
                                        {msg.sender === 'user' && (
                                            <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-slate-700 rounded-full">
                                                 <UserIcon className="w-5 h-5 text-gray-500 dark:text-slate-400"/>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <form onSubmit={handleSendMessage} className="flex space-x-2">
                                    <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Sorunuzu yazın..." className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-slate-100" />
                                    <button type="submit" disabled={isAiThinking} className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                                        <SendIcon className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    {/* Income Tracker Widget */}
                    <div ref={incomeTrackerRef} id="income-tracker" className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 scroll-mt-20">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Gelir Takibi</h2>
                            <button onClick={() => setIsAddIncomeModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                                + Gelir Ekle
                            </button>
                        </div>

                        {/* Income History */}
                        <div className="mt-6 flow-root">
                           <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300 dark:divide-slate-700">
                                            <thead className="bg-gray-50 dark:bg-slate-700/50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-200 sm:pl-6">Tarih</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Açıklama</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">Tutar</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-slate-200">TL Karşılığı</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                                                {incomeEntries.map((entry) => (
                                                    <tr key={entry.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-slate-200 sm:pl-6">{new Date(entry.date).toLocaleDateString('tr-TR')}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-400">{entry.description}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-slate-400">{entry.amount.toFixed(2)} {entry.currency} <span className="text-xs text-gray-400 dark:text-slate-500">(@{entry.exchangeRate.toFixed(2)})</span></td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-700 dark:text-slate-300">{formatCurrency(entry.tryValue)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Dates Widget */}
                    <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Yaklaşan Resmi Tarihler (Vergi Takvimi)</h2>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Tüm Takvimi Gör (Pro Özellik) →</a>
                        </div>
                         <ul className="mt-4 space-y-3">
                            <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-md">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-slate-200">KDV-1 Beyannamesi</p>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Sadece KDV mükellefi iseniz.</p>
                                </div>
                                <span className="font-semibold text-gray-800 dark:text-slate-300">28 Kasım 2025</span>
                            </li>
                             <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-md">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-slate-200">Geçici Vergi (3. Dönem)</p>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Son Ödeme Günü</p>
                                </div>
                                <span className="font-semibold text-red-600 dark:text-red-400">17 Aralık 2025 (YAKLAŞIYOR)</span>
                            </li>
                         </ul>
                    </div>
                </div>
            </main>
            
            {/* Modal for Petition Generator */}
            <Modal isOpen={isPetitionModalOpen} onClose={() => setIsPetitionModalOpen(false)}>
                <PetitionGenerator />
            </Modal>
            
            {/* Modal for Adding Income */}
            <Modal isOpen={isAddIncomeModalOpen} onClose={() => setIsAddIncomeModalOpen(false)}>
                <AddIncomeModal 
                    onClose={() => setIsAddIncomeModalOpen(false)} 
                    onAddIncome={handleAddIncome}
                />
            </Modal>
        </>
    );
};

export default Dashboard;