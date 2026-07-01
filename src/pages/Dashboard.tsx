import { useCrypto } from '@/hooks/useCrypto';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const coins = useCrypto();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 antialiased">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
      </div>
      <p className="text-neutral-400 text-sm">Cotações do mercado cripto atualizadas em tempo real via WebSocket.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {coins.map((coin) => {
          const isPositive = coin.changePercent >= 0;
          
          return (
            <div 
              key={coin.symbol}
              onClick={() => navigate(`/coin/${coin.symbol.toLowerCase()}`)}
              className="p-6 bg-neutral-950 border border-neutral-900 rounded-lg hover:border-neutral-800 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-400">{coin.name}</h3>
                  <span className="text-xs font-mono text-neutral-600">{coin.symbol}/USDT</span>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                  isPositive ? 'bg-emerald-950/50 text-emerald-400' : 'bg-red-950/50 text-red-400'
                }`}>
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {coin.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="text-2xl font-bold font-mono tracking-tight text-white">
                {coin.price === 0 ? (
                  <span className="text-neutral-700 animate-pulse">Conectando...</span>
                ) : (
                  `$ ${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}