export interface BinanceMiniTicker {
  e: string;  
  E: number;  
  s: string;  
  c: string;  
  o: string;  
  h: string;
  l: string;
  v: string;
  q: string;  
}

export interface CryptoCoin {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

export interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}