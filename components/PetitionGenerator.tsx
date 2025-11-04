import React, { useState, useCallback } from 'react';
import { UserProfile } from '../types';
import { DownloadIcon, FileTextIcon, LoaderIcon, UserIcon } from './Icons';

const InputField: React.FC<{
  label: string;
  id: keyof UserProfile;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}> = ({ label, id, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1">
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-800/60 border border-slate-700 rounded-md shadow-sm px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
    />
  </div>
);

const PetitionGenerator: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    tcKimlikNo: '12345678901',
    taxOffice: 'Şişli Vergi Dairesi',
    address: 'Örnek Mah. Test Sk. No:1 D:2 Şişli/İstanbul',
    taxId: '9876543210',
    phone: '0555 123 45 67',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratePetition = useCallback(async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setLoadError(null);

    // Access docx and saveAs from the window object, where they are placed by the CDN scripts.
    const docx = (window as any).docx;
    const saveAs = (window as any).saveAs;

    if (!docx || !saveAs) {
      const errorMessage = "Gerekli kütüphaneler yüklenemedi. Lütfen internet bağlantınızı kontrol edip sayfayı yenileyin.";
      console.error("docx or FileSaver library not found on window object.");
      setLoadError(errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      const { Paragraph, TextRun, Packer, Document, AlignmentType } = docx;
      
      const today = new Date().toLocaleDateString('tr-TR');

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: `${userProfile.taxOffice.toUpperCase()} MÜDÜRLÜĞÜNE`, bold: true })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Konu: ", bold: true }),
                new TextRun("193 Sayılı Gelir Vergisi Kanununun Mükerrer 20/B Maddesi Kapsamındaki İstisnadan Faydalanma Talebi Hk.")
              ],
              spacing: { after: 300 },
            }),
            new Paragraph({
              children: [
                new TextRun("Müdürlüğünüzde "),
                new TextRun({ text: `${userProfile.taxId}`, bold: true }),
                new TextRun(" vergi kimlik numarası ile kayıtlı bulunmaktayım.")
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun("Sosyal ağ sağlayıcıları üzerinden metin, görüntü, ses, video gibi içerikler paylaşmak suretiyle Gelir Vergisi Kanununun Mükerrer 20/B maddesi kapsamında gelir elde etmekteyim. Bu faaliyetimle ilgili olarak, söz konusu madde hükümlerinde yer alan istisnadan faydalanmak istiyorum.")
              ],
               spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                 new TextRun("İstisna kapsamında, Türkiye'de kurulu bankalarda bir hesap açtıracağımı ve bu faaliyetime ilişkin tüm hasılatı münhasıran bu hesap aracılığıyla tahsil edeceğimi taahhüt ederim.")
              ],
               spacing: { after: 300 },
            }),
            new Paragraph({
                children: [
                    new TextRun("Gereğini bilgilerinize arz ederim.")
                ],
                spacing: { after: 600 },
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: `Tarih: ${today}`, break: 1 }),
                    new TextRun({ text: `Ad Soyad: ${userProfile.firstName} ${userProfile.lastName}`, break: 1 }),
                    new TextRun({ text: `T.C. Kimlik No: ${userProfile.tcKimlikNo}`, break: 1 }),
                    new TextRun({ text: `Adres: ${userProfile.address}`, break: 1 }),
                    new TextRun({ text: `Telefon: ${userProfile.phone}`, break: 1 }),
                    new TextRun({ text: "İmza: ", break: 2 }),
                ],
                alignment: AlignmentType.RIGHT,
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "Vergi_Istisnasi_Basvuru_Dilekcesi.docx");
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);

    } catch (error) {
      console.error("Dilekçe oluşturulurken hata oluştu:", error);
      setLoadError("Dilekçe oluşturulurken bir hata oluştu. Teknik detaylar için konsolu kontrol edebilirsiniz.");
    } finally {
      setIsLoading(false);
    }
  }, [userProfile]);


  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex items-center mb-6">
          <div className="bg-cyan-500/10 p-3 rounded-lg">
            <FileTextIcon className="h-6 w-6 text-cyan-400" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-slate-100">Dilekçe Oluşturucu</h2>
            <p className="text-sm text-slate-400">Sosyal Medya Vergi İstisnası için başvuru dilekçenizi oluşturun.</p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center mb-4">
                <UserIcon className="h-5 w-5 mr-2 text-slate-400"/>
                Kullanıcı Bilgileri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Ad" id="firstName" value={userProfile.firstName} onChange={handleInputChange} placeholder="Adınız" />
                <InputField label="Soyad" id="lastName" value={userProfile.lastName} onChange={handleInputChange} placeholder="Soyadınız" />
                <InputField label="T.C. Kimlik Numarası" id="tcKimlikNo" value={userProfile.tcKimlikNo} onChange={handleInputChange} placeholder="11 haneli T.C. Kimlik Numaranız" />
                <InputField label="Vergi Kimlik Numarası" id="taxId" value={userProfile.taxId} onChange={handleInputChange} placeholder="10 haneli VKN" />
                <div className="md:col-span-2">
                    <InputField label="Vergi Dairesi" id="taxOffice" value={userProfile.taxOffice} onChange={handleInputChange} placeholder="Bağlı olduğunuz vergi dairesi" />
                </div>
                 <div className="md:col-span-2">
                    <InputField label="Adres" id="address" value={userProfile.address} onChange={handleInputChange} placeholder="İkametgah adresiniz" />
                </div>
                <div className="md:col-span-2">
                    <InputField label="Telefon Numarası" id="phone" value={userProfile.phone} onChange={handleInputChange} placeholder="05XX XXX XX XX" />
                </div>
            </div>
        </div>

        {loadError && (
          <div className="mt-6 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-300 text-sm">
            {loadError}
          </div>
        )}

        <div className="mt-8 flex justify-end">
            <button
                onClick={handleGeneratePetition}
                disabled={isLoading}
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-300 ease-in-out transform hover:scale-105
                ${isLoading ? 'bg-slate-600 cursor-not-allowed' : 
                isSuccess ? 'bg-green-600' :
                'bg-cyan-600 hover:bg-cyan-700'
                }`}
            >
                {isLoading ? (
                    <>
                        <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Oluşturuluyor...
                    </>
                ) : isSuccess ? (
                     <>
                        <DownloadIcon className="-ml-1 mr-3 h-5 w-5" />
                        Başarılı! İndirildi.
                    </>
                ) : (
                    <>
                        <DownloadIcon className="-ml-1 mr-3 h-5 w-5" />
                        Dilekçeyi Oluştur ve İndir
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PetitionGenerator;