import React, { useState } from 'react';
import { UserProfile, LoginCredentials } from '../types';
import * as authService from '../services/authService';
import { LoaderIcon, UserIcon } from './Icons';

interface LoginFormProps {
  onLoginSuccess: (profile: UserProfile) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userProfile = await authService.login(credentials);
      onLoginSuccess(userProfile);
    } catch (err: any) {
      const errorMessage = err.message || "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden w-full max-w-md">
      <div className="p-8">
        <div className="text-center mb-6">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-slate-100">Hesabınıza Giriş Yapın</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">Panelinize erişmek için devam edin.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">E-posta Adresi</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-slate-100"
              placeholder="siz@sirket.com"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-slate-300">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-slate-100"
              placeholder="••••••••"
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Giriş Yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500 dark:text-slate-400">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Şifrenizi mi unuttunuz?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;