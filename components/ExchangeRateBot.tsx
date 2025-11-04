import React, { useState, useEffect } from 'react';
import { BotIcon, LoaderIcon } from './Icons';
import { ExchangeRate } from '../types';

const CURRENCIES_TO_DISPLAY = ['USD', 'EUR', 'GBP'];

// List of CORS proxies to try sequentially. They have different URL structures.
const PROXY_URL_BUILDERS = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://thingproxy.freeboard.io/fetch/${url}`,
];

const ExchangeRateBot: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [date, setDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatesWithRetry = async () => {
      setIsLoading(true);
      setError(null);
      const tcmbUrl = 'https://www.tcmb.gov.tr/kurlar/today.xml';
      let success = false;

      for (const buildProxyUrl of PROXY_URL_BUILDERS) {
        const proxyUrl = buildProxyUrl(tcmbUrl);
        try {
          const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) }); // 8-second timeout
          if (!response.ok) {
            throw new Error(`Network response was not ok for proxy: ${proxyUrl}`);
          }
          
          const xmlString = await response.text();

          if (!xmlString || typeof xmlString !== 'string') {
              throw new Error(`Invalid data received from proxy: ${proxyUrl}`);
          }

          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

          const errorNode = xmlDoc.querySelector('parsererror');
          if (errorNode) {
              console.error('XML Parsing Error:', errorNode.textContent);
              throw new Error(`XML parse error from proxy: ${proxyUrl}`);
          }

          const dateValue = xmlDoc.documentElement.getAttribute('Tarih');
          if (dateValue) {
              const [day, month, year] = dateValue.split('.');
              const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
              });
              setDate(formattedDate);
          }

          const currencyNodes = xmlDoc.querySelectorAll('Currency');
          const parsedRates: ExchangeRate[] = [];

          currencyNodes.forEach(node => {
            const code = node.getAttribute('Kod');
            if (code && CURRENCIES_TO_DISPLAY.includes(code)) {
              const name = node.querySelector('Isim')?.textContent || '';
              const buying = node.querySelector('ForexBuying')?.textContent || 'N/A';
              const selling = node.querySelector('ForexSelling')?.textContent || 'N/A';
              parsedRates.push({ code, name, buying, selling });
            }
          });

          if (parsedRates.length === 0) {
              throw new Error(`Could not find currency data in the response from proxy: ${proxyUrl}`);
          }

          setRates(parsedRates);
          success = true;
          break; // Exit loop on success
        } catch (err) {
          console.warn(`Failed to fetch via proxy: ${proxyUrl}`, err);
          // Continue to the next proxy
        }
      }

      if (!success) {
        setError('Tüm kaynaklar denendi ancak döviz kurları alınamadı. Lütfen daha sonra tekrar deneyin.');
      }

      setIsLoading(false);
    };

    fetchRatesWithRetry();
  }, []);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 overflow-hidden h-fit">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-cyan-500/10 p-3 rounded-lg">
            <BotIcon className="h-6 w-6 text-cyan-400" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-slate-100">TCMB Kur Ajanı</h2>
            <p className="text-sm text-slate-400">Günlük Döviz Kurları</p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 min-h-[200px] flex flex-col justify-center">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <LoaderIcon className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 px-4">{error}</div>
          ) : (
            <div>
              <p className="text-xs text-slate-500 text-center mb-4">{date} tarihli kurlar</p>
              <ul className="space-y-3">
                {rates.map(rate => (
                  <li key={rate.code} className="flex items-baseline justify-between text-slate-300">
                    <div className="flex items-center">
                        <span className="font-bold text-base text-cyan-400 w-12">{rate.code}</span>
                        <span className="text-sm text-slate-400">{rate.name}</span>
                    </div>
                    <div className="text-right">
                        <p className="text-base font-semibold">{rate.buying} TL</p>
                        <p className="text-xs text-slate-500">Döviz Alış</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateBot;