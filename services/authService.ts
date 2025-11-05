import { UserProfile } from '../types';

/**
 * Bu servis, backend API'si ile olan tüm kimlik doğrulama iletişimini yönetir.
 * Başlangıçta, backend hazır olana kadar sahte (mock) verilerle çalışacaktır.
 */

// Sahte bir veritabanı veya API çağrısını simüle etmek için bir gecikme fonksiyonu
const fakeNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Yeni bir kullanıcıyı sisteme kaydeder.
 * @param profile - Sihirbazdan toplanan kullanıcı profili verileri.
 * @returns Kayıtlı kullanıcı profili (şifre olmadan).
 */
export const register = async (profile: UserProfile): Promise<Omit<UserProfile, 'password'>> => {
    console.log('authService: Kullanıcı kaydediliyor...', profile);
    
    // 1.5 saniyelik bir ağ gecikmesini simüle et
    await fakeNetworkDelay(1500);

    // Gerçek bir API'de, burada bir hata oluşma ihtimali de olurdu.
    // Örneğin: if (Math.random() > 0.8) throw new Error("Kayıt başarısız oldu. Lütfen tekrar deneyin.");

    // Başarılı olduğunda, güvenlik gereği şifreyi yanıttan kaldır.
    const { password, ...registeredUser } = profile;
    
    console.log('authService: Kullanıcı başarıyla kaydedildi.', registeredUser);
    
    return registeredUser;
};
