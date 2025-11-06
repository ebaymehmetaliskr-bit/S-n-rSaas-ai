import { API_BASE_URL } from './authService';
import { IncomeEntry, NewIncomeEntry } from '../types';

/**
 * Bu servis, gelir verileriyle ilgili tüm backend API iletişimini yönetir.
 */

/**
 * Mevcut tüm gelir girişlerini API'den getirir.
 * @returns Gelir girişlerinin bir dizisi.
 */
export const getIncomeEntries = async (): Promise<IncomeEntry[]> => {
    console.log('incomeService: Gelirler API\'den çekiliyor...');
    
    const response = await fetch(`${API_BASE_URL}/income`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Gelir verileri alınamadı.');
    }

    const data = await response.json();
    console.log('incomeService: Gelirler başarıyla çekildi.', data);
    return data;
};

/**
 * API'ye yeni bir gelir girişi ekler.
 * @param newEntry - Eklenecek yeni gelir verisi (ID olmadan).
 * @returns Backend tarafından oluşturulan tam gelir girişi (ID dahil).
 */
export const addIncomeEntry = async (newEntry: NewIncomeEntry): Promise<IncomeEntry> => {
    console.log('incomeService: Yeni gelir API\'ye gönderiliyor...', newEntry);

    const response = await fetch(`${API_BASE_URL}/income`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(newEntry),
    });

    if (!response.ok) {
        try {
            const errorData = await response.json();
            const errorMessage = errorData.detail || 'Yeni gelir eklenirken bir sunucu hatası oluştu.';
            throw new Error(errorMessage);
        } catch (e) {
            throw new Error('Yeni gelir eklenirken bir ağ hatası oluştu.');
        }
    }

    const addedEntry = await response.json();
    console.log('incomeService: Gelir başarıyla eklendi.', addedEntry);
    return addedEntry;
};