import { UserProfile } from '../types';

/**
 * Bu servis, backend API'si ile olan tüm kimlik doğrulama iletişimini yönetir.
 * Artık sahte (mock) veriler yerine gerçek backend endpoint'ine bağlanıyoruz.
 */

// ===================================================================================
// DİKKAT! LÜTFEN BU DEĞİŞKENİ GÜNCELLEYİN!
// ===================================================================================
// Replit'te backend projenizi çalıştırdıktan sonra, Replit'in size verdiği
// canlı sunucu URL'sini (genellikle `https://[proje-adı].[kullanıcı-adı].replit.dev` 
// şeklinde olur) aşağıdaki değişkene atayın.
const API_BASE_URL = 'https://fast-api-ebaymehmetalisk.replit.app';
// Örnek: const API_BASE_URL = 'https://sinirsaas-backend.mehmet.replit.dev';
// ===================================================================================


/**
 * Yeni bir kullanıcıyı sisteme kaydeder.
 * @param profile - Sihirbazdan toplanan kullanıcı profili verileri.
 * @returns Kayıtlı kullanıcı profili (şifre olmadan).
 */
export const register = async (profile: UserProfile): Promise<Omit<UserProfile, 'password'>> => {
    console.log('authService: API endpointine kullanıcı kaydediliyor...', profile);

    // API_BASE_URL'in hala varsayılan değerde olup olmadığını kontrol et
    if (API_BASE_URL.includes('your-username')) {
        const errorMessage = 'API_BASE_URL ayarlanmamış. Lütfen services/authService.ts dosyasındaki adresi kendi Replit URL\'niz ile güncelleyin.';
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(profile),
    });

    if (!response.ok) {
        // Sunucudan gelen hata mesajını yakalamaya çalış
        try {
            const errorData = await response.json();
            // FastAPI'nin validation hataları genelde "detail" alanında gelir
            const errorMessage = errorData.detail || `Sunucu hatası: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        } catch (e) {
            // Eğer sunucudan JSON formatında bir hata gelmezse, genel bir hata fırlat
            throw new Error(`Ağ isteği başarısız oldu: ${response.status} ${response.statusText}`);
        }
    }

    // Başarılı olduğunda, sunucudan gelen kullanıcı verisini JSON olarak al.
    // Backend'in güvenlik gereği şifreyi DÖNDERMEMESİ beklenir.
    const registeredUser = await response.json();
    
    console.log('authService: Kullanıcı API üzerinden başarıyla kaydedildi.', registeredUser);
    
    return registeredUser;
};