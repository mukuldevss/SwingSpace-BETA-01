import type { Position, PositionCalculations } from './types';

const API_KEY = '815cddaabdaf4e27b3cc9469d64d3353';

export function calcPosition(p: Position): PositionCalculations {
  const multiplier = p.side === 'long' ? 1 : -1;

  const riskPerShare = multiplier * (p.entryPrice - p.stopLoss);
  const rewardPerShare = p.target != null ? multiplier * (p.target - p.entryPrice) : null;
  const rrRatio = rewardPerShare != null && riskPerShare > 0 ? rewardPerShare / riskPerShare : null;

  const riskAmount = riskPerShare * p.quantity;
  const rewardAmount = rewardPerShare != null ? rewardPerShare * p.quantity : null;

  const investedValue = p.entryPrice * p.quantity;

  let unrealizedPnl: number | null = null;
  let unrealizedPnlPct: number | null = null;
  let currentValue: number | null = null;

  if (p.status === 'open' && p.ltp != null) {
    unrealizedPnl = multiplier * (p.ltp - p.entryPrice) * p.quantity;
    unrealizedPnlPct = (unrealizedPnl / investedValue) * 100;
    currentValue = p.ltp * p.quantity;
  }

  let realizedPnl: number | null = null;
  let realizedPnlPct: number | null = null;

  if (p.status === 'closed' && p.closePrice != null) {
    realizedPnl = multiplier * (p.closePrice - p.entryPrice) * p.quantity;
    realizedPnlPct = (realizedPnl / investedValue) * 100;
  }

  return {
    riskPerShare,
    rewardPerShare,
    rrRatio,
    riskAmount,
    rewardAmount,
    unrealizedPnl,
    unrealizedPnlPct,
    realizedPnl,
    realizedPnlPct,
    currentValue,
    investedValue,
  };
}

export function formatCurrency(n: number | null | undefined, decimals = 2): string {
  if (n == null) return '—';
  return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatPct(n: number | null | undefined): string {
  if (n == null) return '—';
  const sign = n >= 0 ? '+' : '';
  return sign + n.toFixed(2) + '%';
}

export function formatPnl(n: number | null | undefined): string {
  if (n == null) return '—';
  const sign = n >= 0 ? '+' : '';
  return sign + '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function pnlClass(n: number | null | undefined): string {
  if (n == null) return '';
  return n >= 0 ? 'gain-text' : 'loss-text';
}

export function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function formatDate(d: string): string {
  const date = new Date(d);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export async function fetchLTP(symbols: { symbol: string; exchange: string }[]): Promise<Record<string, number>> {
  if (symbols.length === 0) return {};

  const batchSize = 8; // free tier limit
  const results: Record<string, number> = {};

  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    const symbolStr = batch.map((s) => `${s.symbol}:${s.exchange}`).join(',');
    const url = `https://api.twelvedata.com/price?symbol=${encodeURIComponent(symbolStr)}&apikey=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (batch.length === 1) {
        const key = `${batch[0].symbol}:${batch[0].exchange}`;
        if (data.price) {
          results[batch[0].symbol] = parseFloat(data.price);
        }
      } else {
        for (const s of batch) {
          const key = `${s.symbol}:${s.exchange}`;
          if (data[key]?.price) {
            results[s.symbol] = parseFloat(data[key].price);
          }
        }
      }
    } catch {
      // silent fail per symbol
    }
  }

  return results;
}

export function exportJSON(positions: Position[]): void {
  const now = new Date();
  const ts = now
    .toLocaleString('en-IN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    })
    .replace(/[\s,:/]/g, '-')
    .replace(/-+/g, '-');
  const blob = new Blob([JSON.stringify({ positions, exportedAt: now.toISOString() }, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `swingspace-${ts}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file: File): Promise<Position[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        const positions: Position[] = Array.isArray(data) ? data : data.positions;
        if (!Array.isArray(positions)) throw new Error('Invalid format');
        resolve(positions);
      } catch {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsText(file);
  });
}

export function getDashboardStats(positions: Position[]) {
  const open = positions.filter((p) => p.status === 'open');
  const closed = positions.filter((p) => p.status === 'closed');

  const totalInvested = open.reduce((s, p) => s + p.entryPrice * p.quantity, 0);

  const unrealizedPnl = open.reduce((s, p) => {
    const c = calcPosition(p);
    return s + (c.unrealizedPnl ?? 0);
  }, 0);

  const realizedPnl = closed.reduce((s, p) => {
    const c = calcPosition(p);
    return s + (c.realizedPnl ?? 0);
  }, 0);

  const wins = closed.filter((p) => {
    const c = calcPosition(p);
    return (c.realizedPnl ?? 0) > 0;
  }).length;

  const winRate = closed.length > 0 ? (wins / closed.length) * 100 : 0;

  const avgRR =
    open.reduce((s, p) => {
      const c = calcPosition(p);
      return s + (c.rrRatio ?? 0);
    }, 0) / (open.length || 1);

  return {
    openCount: open.length,
    closedCount: closed.length,
    totalInvested,
    unrealizedPnl,
    realizedPnl,
    totalPnl: unrealizedPnl + realizedPnl,
    winRate,
    wins,
    losses: closed.length - wins,
    avgRR,
  };
}

export function getPnlHistory(positions: Position[]): { date: string; symbol: string; pnl: number; cumulative: number }[] {
  const closed = positions
    .filter((p) => p.status === 'closed' && p.closeDate)
    .sort((a, b) => new Date(a.closeDate!).getTime() - new Date(b.closeDate!).getTime());

  let cum = 0;
  return closed.map((p) => {
    const { realizedPnl } = calcPosition(p);
    cum += realizedPnl ?? 0;
    return { date: p.closeDate!, symbol: p.symbol, pnl: realizedPnl ?? 0, cumulative: cum };
  });
}
