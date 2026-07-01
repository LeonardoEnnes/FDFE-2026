import { useEffect, useState } from 'react';
import { CoinGeckoMarketData } from '@/types/crypto';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Explorer() {
  const [markets, setMarkets] = useState<CoinGeckoMarketData[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // top 10 para deixar bonito
    const fetchMarkets = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        
        if (!response.ok) {
          throw new Error('Limite de requisições da API atingido ou falha no servidor.');
        }

        const data: CoinGeckoMarketData[] = await response.json();
        setMarkets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const filteredMarkets = markets.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 antialiased">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Explorar Moedas</h1>
        <p className="text-neutral-400 text-sm mt-1">Listagem geral do mercado atualizada via API REST.</p>
      </div>

      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Buscar por nome ou símbolo (ex: BTC)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-900 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
        />
      </div>

      {/* Tabela de Dados */}
      <div className="rounded-lg border border-neutral-900 bg-neutral-950 overflow-hidden">
        {loading && (
          <div className="p-8 text-center text-neutral-500 font-medium animate-pulse">
            Carregando dados do mercado...
          </div>
        )}

        {error && (
          <div className="p-8 text-center text-red-400 font-medium text-sm">
            {error} (Tente novamente em instantes devido ao limite de rate-limit do CoinGecko).
          </div>
        )}

        {!loading && !error && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-900 text-neutral-500 text-xs font-semibold uppercase tracking-wider bg-neutral-950/50">
                <th className="py-4 px-6 text-center w-16">Rank</th>
                <th className="py-4 px-6">Ativo</th>
                <th className="py-4 px-6 text-right">Preço</th>
                <th className="py-4 px-6 text-right">Variação (24h)</th>
                <th className="py-4 px-6 text-right hidden md:table-cell">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-sm font-medium text-neutral-200">
              {filteredMarkets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-600">
                    Nenhum ativo encontrado para "{search}".
                  </td>
                </tr>
              ) : (
                filteredMarkets.map((coin) => {
                  const isPositive = coin.price_change_percentage_24h >= 0;
                  return (
                    <tr 
                      key={coin.id}
                      onClick={() => navigate(`/coin/${coin.symbol.toLowerCase()}`)}
                      className="hover:bg-neutral-900/40 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6 text-center font-mono text-neutral-500">
                        {coin.market_cap_rank}
                      </td>
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                        <div>
                          <span className="text-white block">{coin.name}</span>
                          <span className="text-xs font-mono text-neutral-500 uppercase">{coin.symbol}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-mono text-white">
                        $ {coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`py-4 px-6 text-right font-mono ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        <span className="inline-flex items-center gap-1">
                          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-mono text-neutral-400 hidden md:table-cell">
                        $ {coin.market_cap.toLocaleString('en-US')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}