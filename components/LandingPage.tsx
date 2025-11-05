import React, { useState } from 'react';
import Modal from './Modal';
import Wizard from './Wizard';
import SocialProof from './SocialProof';
import ThemeToggle from './ThemeToggle';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleStartWizard = () => {
    setIsWizardOpen(true);
  };
  
  const handleWizardComplete = () => {
    setIsWizardOpen(false);
    onLogin();
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-300">
        {/* === Navigasyon === */}
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-10 border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-bold text-2xl text-primary-600">SınırSaaS</span>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-8">
                <a href="#features" className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Özellikler</a>
                <a href="#" className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Fiyatlandırma</a>
                <button onClick={onLogin} className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Giriş Yap</button>
                <ThemeToggle />
                <button onClick={handleStartWizard} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                  ÜCRETSİZ TESTE BAŞLA
                </button>
              </div>
              <div className="md:hidden flex items-center gap-4">
                <ThemeToggle />
                <button onClick={handleStartWizard} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                  TESTE BAŞLA
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* === Hero Bölümü === */}
        <main className="pt-16">
          <div className="bg-white dark:bg-slate-900">
            <div className="max-w-4xl mx-auto text-center py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">
                <span className="block">Vergi Danışmanına Binlerce Lira Ödeme.</span>
                <span className="block text-primary-600">AI Ajanın Aylık $5'a Halletsin.</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-slate-400">
                Global gelirlerini, Sosyal Medya Vergi İstisnanı ve FX kurlarını senin için otomatik takip eden AI ajanı. Ücretsiz başla, 5 dakikada dilekçeni indir.
              </p>
              <button onClick={handleStartWizard} className="mt-10 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base md:text-lg font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transform transition-transform duration-200 hover:scale-105">
                🚀 ÜCRETSİZ ANALİZE BAŞLA & DİLEKÇENİ İNDİR
              </button>
              <p className="mt-4 text-sm text-gray-500 dark:text-slate-500">✓ GİB'in en son (2025) tebliğlerine göre güncellenmiştir.</p>
            </div>
          </div>
          
          <SocialProof />

          {/* === Nasıl Çalışır? Bölümü === */}
          <section id="features" className="py-20 bg-gray-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 text-center">Sadece 3 Adımda Kontrolü Ele Alın</h2>
              <div className="mt-12 grid md:grid-cols-3 gap-8">
                {/* Adım 1 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-transparent dark:border-slate-700">
                  <span className="text-3xl">1.</span>
                  <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-slate-100">Analiz Et</h3>
                  <p className="mt-2 text-gray-500 dark:text-slate-400">Yapay zeka sihirbazımızla durumunuza özel 5 basit soruyu yanıtlayın.</p>
                </div>
                {/* Adım 2 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-transparent dark:border-slate-700">
                  <span className="text-3xl">2.</span>
                  <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-slate-100">Raporu Al</h3>
                  <p className="mt-2 text-gray-500 dark:text-slate-400">Hangi istisnaya (GVK 20/A veya 20/B) uygun olduğunuzu ve ne yapmanız gerektiğini net bir raporla görün.</p>
                </div>
                {/* Adım 3 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-transparent dark:border-slate-700">
                  <span className="text-3xl">3.</span>
                  <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-slate-100">Harekete Geç</h3>
                  <p className="mt-2 text-gray-500 dark:text-slate-400">Size özel oluşturulan görev listesi ve hazır dilekçe taslağı ile süreci anında başlatın.</p>
                </div>
              </div>
            </div>
          </section>

          {/* === Sorun vs. Çözüm Tablosu === */}
          <section className="py-20 bg-white dark:bg-slate-800">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 text-center">Karmaşayı Bırak, Otopilota Geç</h2>
              <div className="mt-12 bg-gray-200 dark:bg-slate-700 rounded-lg shadow-inner overflow-hidden" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px' }}>
                {/* Başlıklar */}
                <div className="bg-gray-100 dark:bg-slate-700 p-4 font-bold text-xl text-gray-800 dark:text-slate-200">❌ ESKİ YÖNTEM (Manuel Eziyet)</div>
                <div className="bg-gray-100 dark:bg-slate-700 p-4 font-bold text-xl text-primary-700 dark:text-primary-500">✅ SınırSaaS (AI Ajan Otopilotu)</div>
                
                {/* Rows */}
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-600 dark:text-slate-400">Yüksek danışmanlık ve muhasebeci ücretleri.</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-800 dark:text-slate-200 font-medium">✓ Agresif fiyatlama (Aylık $5-$10).</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-600 dark:text-slate-400">Stripe/Gumroad'dan gelen FX kurlarını manuel girmek.</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-800 dark:text-slate-200 font-medium">✓ AI Ajan, TCMB'den otomatik çeker ve eşler.</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-600 dark:text-slate-400">Sosyal Medya İstisna limitini (1.9M TL) Excel'de takip etmek.</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-800 dark:text-slate-200 font-medium">✓ Canlı "İstisna Limiti Takipçisi" dashboard'u.</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-600 dark:text-slate-400">Vergi dairesi dilekçesi için saatlerce araştırma yapmak.</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-800 dark:text-slate-200 font-medium">✓ "Katil Özellik": 30 saniyede otomatik dilekçe oluşturma.</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-600 dark:text-slate-400">Geciken beyanlar, vergi cezası stresi ve korku.</div>
                <div className="bg-white dark:bg-slate-800 p-4 text-gray-800 dark:text-slate-200 font-medium">✓ AI Ajan takibi, proaktif hatırlatmalar ve yasal güvence.</div>
              </div>
            </div>
          </section>

          {/* === Son CTA Bölümü === */}
          <section className="bg-dark-800 dark:bg-slate-900">
            <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-white">
                <span className="block">Belirsizliği Bırakın. İlk Adımı Bugün Atın.</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300 dark:text-slate-400">Ücretsiz testimize katılın ve yurt dışı gelirleriniz için vergi sürecinizi hemen optimize edin.</p>
              <button onClick={handleStartWizard} className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                ÜCRETSİZ UYGUNLUK TESTİNE BAŞLA
              </button>
            </div>
          </section>
        </main>

        {/* === Footer === */}
        <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between gap-8">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <span className="font-bold text-2xl text-primary-600">SınırSaaS</span>
                <p className="mt-2 text-gray-500 dark:text-slate-400 text-sm">
                  Türk girişimciler için sınır ötesi finansal ve hukuki işlemleri otomatize eden AI Uyum Ajanı.
                </p>
              </div>
              <div className="w-1/2 md:w-auto">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-200 tracking-wider uppercase">Özellikler</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#features" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Nasıl Çalışır</a></li>
                  <li><a href="#" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Fiyatlandırma</a></li>
                  <li><a href="#" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">AI Asistan</a></li>
                </ul>
              </div>
              <div className="w-1/2 md:w-auto">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-200 tracking-wider uppercase">Şirket</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Hakkımızda</a></li>
                  <li><a href="#" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Kariyer</a></li>
                </ul>
              </div>
              <div className="w-1/2 md:w-auto">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-200 tracking-wider uppercase">Yasal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Gizlilik Politikası</a></li>
                  <li><a href="#" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">KVKK Aydınlatma Metni</a></li>
                  <li><a href="#" className="text-base text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white">Kullanım Şartları</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 dark:border-slate-700 pt-8 text-center">
              <p className="text-base text-gray-500 dark:text-slate-400">&copy; 2025 SınırSaaS. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </div>
      
      <Modal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)}>
        <Wizard onComplete={handleWizardComplete} onClose={() => setIsWizardOpen(false)} />
      </Modal>
    </>
  );
};

export default LandingPage;