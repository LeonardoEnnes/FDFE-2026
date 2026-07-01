import { useParams, useNavigate } from 'react-router-dom';
import { useCoinDetails } from '@/hooks/useCoinDetails';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';

export default function CoinDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { price, changePercent, history } = useCoinDetails(id);

  const isPositive = changePercent >= 0;

  return (
    <div className="space-y-6 antialiased">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-neutral-400 hover:text-orange-500 transition-colors"
      >
        <ArrowLeft size={16} /> Voltar para o Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight capitalize">
            {id} <span className="text-neutral-500 font-mono text-lg uppercase">/{id}usdt</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-1">Dados individuais via stream direto da Binance.</p>
        </div>

        <div className="flex items-baseline gap-4">
          <div className="text-3xl font-bold font-mono tracking-tight text-white">
            {price === 0 ? (
              <span className="text-neutral-700 animate-pulse">Carregando...</span>
            ) : (
              `$ ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
            )}
          </div>
          <span className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-md ${
            isPositive ? 'bg-emerald-950/50 text-emerald-400' : 'bg-red-950/50 text-red-400'
          }`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {changePercent.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-900 bg-neutral-950 p-6">
        <h3 className="text-sm font-semibold text-neutral-400 mb-6">Variação de Preço (Tempo Real)</h3>
        
        <div className="h-80 w-full font-mono text-xs text-neutral-400">
          {history.length < 2 ? (
            <div className="h-full flex items-center justify-center text-neutral-600 animate-pulse">
              Coletando pontos de transmissão...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <XAxis dataKey="time" stroke="#404040" tickLine={false} />
                <YAxis 
                  stroke="#404040" 
                  domain={['auto', 'auto']} 
                  tickLine={false}
                  tickFormatter={(val: number) => `$${val.toFixed(1)}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', color: '#f5f5f5' }}
                  labelStyle={{ color: '#a3a3a3' }}
                />
                <Line // esse e o gráfico de linha que mostra a variação do preço em tempo real
                  type="monotone" 
                  dataKey="price" 
                  stroke="#f97316"
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={false} // Desativar animação melhora a performance de updates frequentes
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}