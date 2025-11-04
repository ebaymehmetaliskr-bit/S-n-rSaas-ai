import React, { useState } from 'react';
import Modal from './Modal';
import Wizard from './Wizard';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-50 text-gray-800">
        {/* Navigation */}
        <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-bold text-2xl text-blue-600">SınırSaaS</span>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-8">
                <a href="#features" className="text-gray-500 hover:text-gray-900">Özellikler</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Fiyatlandırma</a>
                <button onClick={() => setIsWizardOpen(true)} className="text-gray-500 hover:text-gray-900">Giriş Yap</button>
                <button onClick={() => setIsWizardOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  ÜCRETSİZ TESTE BAŞLA
                </button>
              </div>
              <div className="md:hidden">
                <button onClick={() => setIsWizardOpen(true)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  TESTE BAŞLA
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-white">
            <div className="max-w-4xl mx-auto text-center py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">Vergi Danışmanına Binlerce Lira Ödeme.</span>
                <span className="block text-blue-600">AI Ajanın Aylık $5'a Halletsin.</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
                Global gelirlerini, Sosyal Medya Vergi İstisnanı ve FX kurlarını senin için otomatik takip eden AI ajanı. Ücretsiz başla, 5 dakikada dilekçeni indir.
              </p>
              <button onClick={() => setIsWizardOpen(true)} className="mt-10 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base md:text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105">
                🚀 ÜCRETSİZ TESTE BAŞLA & DİLEKÇENİ İNDİR
              </button>
              <p className="mt-4 text-sm text-gray-500">✓ GİB'in en son (2025) tebliğlerine göre güncellenmiştir.</p>
            </div>
          </div>

          {/* How it Works Section */}
          <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">Sadece 3 Adımda Kontrolü Ele Alın</h2>
              <div className="mt-12 grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <span className="text-3xl">1.</span>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">Analiz Et</h3>
                  <p className="mt-2 text-gray-500">Yapay zeka sihirbazımızla durumunuza özel 5 basit soruyu yanıtlayın.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <span className="text-3xl">2.</span>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">Raporu Al</h3>
                  <p className="mt-2 text-gray-500">Hangi istisnaya (GVK 20/A veya 20/B) uygun olduğunuzu ve ne yapmanız gerektiğini net bir raporla görün.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <span className="text-3xl">3.</span>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">Harekete Geç</h3>
                  <p className="mt-2 text-gray-500">Size özel oluşturulan görev listesi ve hazır dilekçe taslağı ile süreci anında başlatın.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Problem vs. Solution Table */}
          <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">Karmaşayı Bırak, Otopilota Geç</h2>
              <div className="mt-12 bg-gray-200 rounded-lg shadow-inner overflow-hidden" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px' }}>
                <div className="bg-gray-100 p-4 font-bold text-xl text-gray-800">❌ ESKİ YÖNTEM (Manuel Eziyet)</div>
                <div className="bg-gray-100 p-4 font-bold text-xl text-blue-700">✅ SınırSaaS (AI Ajan Otopilotu)</div>
                
                <div className="bg-white p-4 text-gray-600">Yüksek danışmanlık ve muhasebeci ücretleri.</div>
                <div className="bg-white p-4 text-gray-800 font-medium">✓ Agresif fiyatlama (Aylık $5-$10).</div>
                
                <div className="bg-white p-4 text-gray-600">Stripe/Gumroad'dan gelen FX kurlarını manuel girmek.</div>
                <div className="bg-white p-4 text-gray-800 font-medium">✓ AI Ajan, TCMB'den otomatik çeker ve eşler.</div>
                
                <div className="bg-white p-4 text-gray-600">Sosyal Medya İstisna limitini (1.9M TL) Excel'de takip etmek.</div>
                <div className="bg-white p-4 text-gray-800 font-medium">✓ Canlı "İstisna Limiti Takipçisi" dashboard'u.</div>

                <div className="bg-white p-4 text-gray-600">Vergi dairesi dilekçesi için saatlerce araştırma yapmak.</div>
                <div className="bg-white p-4 text-gray-800 font-medium">✓ "Katil Özellik": 30 saniyede otomatik dilekçe oluşturma.</div>

                <div className="bg-white p-4 text-gray-600">Geciken beyanlar, vergi cezası stresi ve korku.</div>
                <div className="bg-white p-4 text-gray-800 font-medium">✓ AI Ajan takibi, proaktif hatırlatmalar ve yasal güvence.</div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="bg-gray-800">
            <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-white">
                <span className="block">Belirsizliği Bırakın. İlk Adımı Bugün Atın.</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300">Ücretsiz testimize katılın ve yurt dışı gelirleriniz için vergi sürecinizi hemen optimize edin.</p>
              <button onClick={() => setIsWizardOpen(true)} className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                ÜCRETSİZ UYGUNLUK TESTİNE BAŞLA
              </button>
            </div>
          </section>
        </main>
      </div>
      <Modal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)}>
        <Wizard onComplete={onLogin} onClose={() => setIsWizardOpen(false)} />
      </Modal>
    </>
  );
};

export default LandingPage;