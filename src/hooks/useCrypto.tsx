import { useEffect, useState } from 'react';
import { BinanceMiniTicker, CryptoCoin } from '@/types/crypto';

const COIN_NAMES: Record<string, string> = { // nomes mais amigaveis
  btcusdt: 'Bitcoin',
  ethusdt: 'Ethereum',
  solusdt: 'Solana',
  bnbusdt: 'BNB Coin'
};

export function useCrypto() {
  const [coins, setCoins] = useState<Record<string, CryptoCoin>>({
    btcusdt: { symbol: 'BTC', name: 'Bitcoin', price: 0, changePercent: 0 },
    ethusdt: { symbol: 'ETH', name: 'Ethereum', price: 0, changePercent: 0 },
    solusdt: { symbol: 'SOL', name: 'Solana', price: 0, changePercent: 0 },
    bnbusdt: { symbol: 'BNB', name: 'BNB Coin', price: 0, changePercent: 0 }
  });

  useEffect(() => {
    // Naão quis colocar no .env pq e publico
    const streams = 'btcusdt@miniTicker/ethusdt@miniTicker/solusdt@miniTicker/bnbusdt@miniTicker';
    const wsUrl = `wss://stream.binance.com:9443/ws/${streams}`;
    
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const data: BinanceMiniTicker = JSON.parse(event.data);
      const symbolLower = data.s.toLowerCase();

      if (COIN_NAMES[symbolLower]) {
        const currentPrice = parseFloat(data.c);
        const openPrice = parseFloat(data.o);
        
        // cálculo simples de variação percentual das últimas 24horas
        const changePercent = openPrice !== 0 
          ? ((currentPrice - openPrice) / openPrice) * 100 
          : 0;

        setCoins((prev) => ({
          ...prev,
          [symbolLower]: {
            symbol: symbolLower.replace('usdt', '').toUpperCase(),
            name: COIN_NAMES[symbolLower],
            price: currentPrice,
            changePercent
          }
        }));
      }
    };

    ws.onerror = (error) => {
      console.error('Erro no WebSocket da Binance:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return Object.values(coins);
}