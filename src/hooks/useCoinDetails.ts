import { useEffect, useState } from 'react';
import { BinanceMiniTicker } from '@/types/crypto';

export interface ChartDataPoint {
  time: string;
  price: number;
}

export function useCoinDetails(coinId: string | undefined) {
  const [price, setPrice] = useState<number>(0);
  const [changePercent, setChangePercent] = useState<number>(0);
  const [history, setHistory] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (!coinId) return;

    const symbol = `${coinId.toLowerCase()}usdt`;
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@miniTicker`;
    
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const data: BinanceMiniTicker = JSON.parse(event.data);
      const currentPrice = parseFloat(data.c);
      const openPrice = parseFloat(data.o);
      const calculatedChange = openPrice !== 0 ? ((currentPrice - openPrice) / openPrice) * 100 : 0;

      setPrice(currentPrice);
      setChangePercent(calculatedChange);

      // mantendo os últimos 20 pontos para não travar a tela
      setHistory((prev) => {
        const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newPoint = { time: now, price: currentPrice };
        
        if (prev.length >= 20) {
          return [...prev.slice(1), newPoint];
        }
        return [...prev, newPoint];
      });
    };

    ws.onerror = (error) => {
      console.error(`Erro no WS da moeda ${symbol}:`, error);
    };

    // fechando conexão quando o componente for desmontado ou o coinId mudar
    return () => {
      ws.close();
    };
  }, [coinId]);

  return { price, changePercent, history };
}