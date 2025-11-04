export interface UserProfile {
  firstName: string;
  lastName: string;
  tcKimlikNo: string;
  taxOffice: string;
  address: string;
  taxId: string;
  phone: string;
}

export interface ExchangeRate {
  code: string;
  name: string;
  buying: string;
  selling: string;
}

export interface IncomeEntry {
  id: number;
  date: string;
  description: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  exchangeRate: number;
  tryValue: number;
}
