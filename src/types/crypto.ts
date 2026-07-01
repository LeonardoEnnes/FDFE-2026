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