import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, LoaderIcon, SparklesIcon, UserIcon } from './Icons';
import { UserProfile } from '../types';
import * as authService from '../services/authService';

interface WizardProps {
    onComplete: (profile: UserProfile) => void;
    onClose: () => void;
}

const steps = [
    {
        title: "AI Ajanınız Sizi Tanısın",
        subtitle: "Sadece birkaç soruyla durumunuza en uygun yol haritasını çizeceğim.",
        question: "Ana gelir kaynağınız hangisi?",
        options: [
            "Sosyal Medya / İçerik Üretimi (YouTube, Patreon, vb.)",
            "Freelance / Yazılım / Tasarım (Upwork, Direkt Müşteri, vb.)",
            "E-ticaret / Dijital Ürün (Gumroad, Etsy, vb.)",
            "Diğer / Emin Değilim"
        ],
        key: 'incomeSource'
    },
    {
        title: "Mevcut Durum Analizi",
        subtitle: "Şirket yapınızı anlayarak en doğru yönlendirmeyi yapacağım.",
        question: "Türkiye'de bir şirketiniz var mı?",
        options: [
            "Evet, Şahıs Şirketim var.",
            "Evet, Limited veya A.Ş. var.",
            "Hayır, henüz yok (Bireysel olarak kazanıyorum)."
        ],
        key: 'companyStatus'
    },
    {
        title: "Hesap Oluştur",
        subtitle: "Panelinize erişmek ve verilerinizi güvenle saklamak için temel bilgilerinizi girin.",
        question: "Kullanıcı ve Dilekçe Bilgileri",
        isForm: true, // Indicates this step has a form instead of options
    }
];

const Wizard: React.FC<WizardProps> = ({ onComplete, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<{[key: string]: string}>({});
    const [profile, setProfile] = useState<Partial<UserProfile>>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        tcKimlikNo: '',
        taxId: '',
        taxOffice: '',
        address: '',
        phone: '',
    });
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSelectOption = (key: string, option: string) => {
        setAnswers(prev => ({ ...prev, [key]: option }));
        handleNext();
    }

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({...prev, [name]: value}));
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (profile.firstName && profile.lastName && profile.email && profile.password && profile.password.length >= 6) {
             handleNext();
        } else {
            alert('Lütfen tüm zorunlu alanları doldurun ve şifrenizin en az 6 karakter olduğundan emin olun.');
        }
    }
    
    const handleComplete = async () => {
        setIsRegistering(true);
        setError(null);
        try {
            const completeProfile: UserProfile = {
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                email: profile.email || '',
                password: profile.password || '',
                tcKimlikNo: profile.tcKimlikNo || '11111111111',
                taxId: profile.taxId || '0000000000',
                taxOffice: profile.taxOffice || 'Şişli Vergi Dairesi',
                address: profile.address || 'Örnek Mah. Test Sk.',
                phone: profile.phone || '05550000000',
                ...answers, 
            };
            
            const registeredUser = await authService.register(completeProfile);
            onComplete(registeredUser as UserProfile);

        } catch (err) {
            setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            console.error(err);
        } finally {
            setIsRegistering(false);
        }
    }
    
    const progressPercentage = ((currentStep) / (steps.length)) * 100;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden w-full max-w-2xl">
            {/* Progress Bar */}
             <div className="w-full bg-gray-200 dark:bg-slate-700 h-2">
                <div className="bg-blue-600 h-2 rounded-r-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className="p-8">
            {currentStep < steps.length ? (
                // Question/Form Steps
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{steps[currentStep].title}</h2>
                    <p className="mt-1 text-gray-600 dark:text-slate-400">{steps[currentStep].subtitle}</p>
                    
                    <div className="mt-8">
                       {steps[currentStep].isForm ? (
                           <form onSubmit={handleFormSubmit}>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <InputField label="Ad" name="firstName" value={profile.firstName!} onChange={handleProfileChange} required />
                                   <InputField label="Soyad" name="lastName" value={profile.lastName!} onChange={handleProfileChange} required />
                                   <div className="md:col-span-2">
                                       <InputField label="E-posta" name="email" type="email" value={profile.email!} onChange={handleProfileChange} required />
                                   </div>
                                   <div className="md:col-span-2">
                                       <InputField label="Şifre (en az 6 karakter)" name="password" type="password" value={profile.password!} onChange={handleProfileChange} required />
                                   </div>
                               </div>
                                <div className="mt-8 flex justify-end">
                                    <button type="submit" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                        Devam Et
                                        <ArrowRightIcon className="w-4 h-4 ml-2"/>
                                    </button>
                                </div>
                           </form>
                       ) : (
                            <div>
                                <label className="text-lg font-semibold text-gray-800 dark:text-slate-200">{steps[currentStep].question}</label>
                                <div className="mt-4 space-y-3">
                                    {steps[currentStep].options.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleSelectOption(steps[currentStep].key, option)}
                                            className="w-full text-left p-4 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-slate-200"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                       )}
                    </div>
                     <div className="mt-8 flex justify-between items-center">
                        <button 
                            onClick={handleBack} 
                            disabled={currentStep === 0}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            <ArrowLeftIcon className="w-4 h-4 mr-2"/>
                            Geri
                        </button>
                        <span className="text-sm text-gray-500 dark:text-slate-400">Adım {currentStep + 1} / {steps.length + 1}</span>
                    </div>
                </div>
            ) : (
                // Final Step
                <div className="text-center">
                    <SparklesIcon className="mx-auto h-12 w-12 text-blue-600" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-slate-100">Analiz Tamamlandı!</h2>
                    <p className="mt-2 text-gray-600 dark:text-slate-400 max-w-md mx-auto">
                        Harika! Girdiğiniz bilgilere göre, <span className="font-semibold text-gray-800 dark:text-slate-200">Sosyal Medya Vergi İstisnası (GVK Mük. 20/B)</span> sizin için en uygun yol gibi görünüyor. Size özel hazırladığım panelde tüm süreci otomatize edeceğiz.
                    </p>
                    <div className="mt-8">
                         <button
                            onClick={handleComplete}
                            disabled={isRegistering}
                            className="w-full max-w-xs inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {isRegistering ? (
                                <>
                                    <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                    Hesap Oluşturuluyor...
                                </>
                            ) : (
                                '🚀 Panelimi Oluştur & Başla'
                            )}
                        </button>
                    </div>
                    {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                    <button onClick={handleBack} className="mt-4 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300">Geri dön ve cevapları değiştir</button>
                </div>
            )}
            </div>
        </div>
    );
};

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 dark:text-slate-300">{label}</label>
        <input
            id={props.name}
            {...props}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-slate-100"
        />
    </div>
);


export default Wizard;