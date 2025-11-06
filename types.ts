export interface UserProfile {
  firstName: string;
  lastName: string;
  tcKimlikNo: string;
  taxOffice: string;
  address: string;
  taxId: string;
  phone: string;
  email: string;
  password?: string; // Optional as we won't store it in frontend state long-term
  incomeSource?: string;
  companyStatus?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
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

export type NewIncomeEntry = Omit<IncomeEntry, 'id'>;

export interface Task {
  id: number;
  text: string;
  details: string;
  completed: boolean;
  completedDate?: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export interface AppNotification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  type: 'success' | 'warning' | 'info';
}