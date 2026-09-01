export type Exchange = 'NSE' | 'BSE';
export type Side = 'long' | 'short';
export type PositionStatus = 'open' | 'closed';
export type View = 'dashboard' | 'positions' | 'add' | 'detail';
export type Theme = 'light' | 'dark';
export type PositionView = 'list' | 'card';

export interface Stock {
  symbol: string;
  name: string;
  exchange: Exchange;
}

export interface Position {
  id: string;
  symbol: string;
  name: string;
  exchange: Exchange;
  side: Side;
  quantity: number;
  entryPrice: number;
  stopLoss: number;
  target?: number;
  ltp?: number;
  status: PositionStatus;
  entryDate: string;
  closeDate?: string;
  closePrice?: number;
  notes?: string;
}

export interface PositionCalculations {
  riskPerShare: number;
  rewardPerShare: number | null;
  rrRatio: number | null;
  riskAmount: number;
  rewardAmount: number | null;
  unrealizedPnl: number | null;
  unrealizedPnlPct: number | null;
  realizedPnl: number | null;
  realizedPnlPct: number | null;
  currentValue: number | null;
  investedValue: number;
}
