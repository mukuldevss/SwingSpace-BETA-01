import { useState } from 'react';
import type { Position, PositionView } from '../types';
import { calcPosition, pnlClass, fetchLTP } from '../utils';

interface PositionsProps {
  positions: Position[];
  onNavigateDetail: (id: string) => void;
  onUpdate: (updated: Position[]) => void;
  onNavigateAdd: () => void;
}

export default function Positions({ positions, onNavigateDetail, onUpdate, onNavigateAdd }: PositionsProps) {
  const [viewMode, setViewMode] = useState<PositionView>('list');
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [fetching, setFetching] = useState(false);
  const [fetchMsg, setFetchMsg] = useState('');

  const filtered = positions.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const handleFetchLTP = async () => {
    const openPositions = positions.filter((p) => p.status === 'open');
    if (openPositions.length === 0) {
      setFetchMsg('No open positions to update.');
      setTimeout(() => setFetchMsg(''), 3000);
      return;
    }
    setFetching(true);
    setFetchMsg('Fetching LTPs...');
    try {
      const ltps = await fetchLTP(openPositions.map((p) => ({ symbol: p.symbol, exchange: p.exchange })));
      const updated = positions.map((p) => {
        if (p.status === 'open' && ltps[p.symbol] != null) {
          return { ...p, ltp: ltps[p.symbol] };
        }
        return p;
      });
      onUpdate(updated);
      const count = Object.keys(ltps).length;
      setFetchMsg(`Updated ${count} of ${openPositions.length} positions.`);
    } catch {
      setFetchMsg('Failed to fetch LTPs. Check connection.');
    }
    setFetching(false);
    setTimeout(() => setFetchMsg(''), 4000);
  };

  return (
    <div className="slide-in">
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '16px 24px', background: 'var(--card)', borderRadius: 24 }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(['all', 'open', 'closed'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 14px', border: '1px solid var(--border)',
              background: filter === f ? 'var(--foreground)' : 'var(--card)',
              color: filter === f ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              cursor: 'pointer', fontSize: 12, fontWeight: 500,
              textTransform: 'capitalize',
              transition: 'all 0.15s',
              borderRadius: 9999,
            }}>
              {f} {f === 'all' ? `(${positions.length})` : f === 'open' ? `(${positions.filter(p => p.status === 'open').length})` : `(${positions.filter(p => p.status === 'closed').length})`}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* LTP fetch */}
        {fetchMsg && (
          <span style={{ fontSize: 12, color: 'var(--muted-foreground)', padding: '4px 10px', background: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 9999 }}>
            {fetchMsg}
          </span>
        )}
        <button
          onClick={handleFetchLTP}
          disabled={fetching}
          style={{
            padding: '6px 16px', border: '1px solid var(--border)',
            background: fetching ? 'var(--muted)' : 'var(--foreground)',
            color: fetching ? 'var(--muted-foreground)' : 'var(--primary-foreground)',
            cursor: fetching ? 'not-allowed' : 'pointer', fontSize: 12, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
            letterSpacing: '0.02em', borderRadius: 9999,
          }}
        >
          {fetching ? (
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          )}
          {fetching ? 'Fetching...' : 'Fetch LTP'}
        </button>

        {/* View toggle */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 9999, overflow: 'hidden' }}>
          <button onClick={() => setViewMode('list')} style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: viewMode === 'list' ? 'var(--foreground)' : 'var(--card)',
            color: viewMode === 'list' ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
            border: 'none', cursor: 'pointer',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>
          <button onClick={() => setViewMode('card')} style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: viewMode === 'card' ? 'var(--foreground)' : 'var(--card)',
            color: viewMode === 'card' ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
            border: 'none', cursor: 'pointer', borderLeft: '1px solid var(--border)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>

        <button onClick={onNavigateAdd} style={{
          padding: '6px 16px', border: '1px solid var(--accent)',
          background: 'var(--accent)', color: 'var(--accent-foreground)',
          cursor: 'pointer', fontSize: 12, fontWeight: 600, letterSpacing: '0.02em',
          display: 'flex', alignItems: 'center', gap: 6, borderRadius: 9999,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
          </svg>
          Add Position
        </button>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: 'var(--card)', padding: '60px 24px', textAlign: 'center', borderRadius: 24 }}>
          <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 16 }}>
            {filter === 'all' ? 'No positions yet.' : `No ${filter} positions.`}
          </p>
          <button onClick={onNavigateAdd} style={{
            padding: '8px 20px', background: 'var(--accent)', color: 'var(--accent-foreground)',
            border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, borderRadius: 9999,
          }}>
            Add First Position
          </button>
        </div>
      ) : viewMode === 'list' ? (
        <ListView positions={filtered} onNavigateDetail={onNavigateDetail} />
      ) : (
        <CardView positions={filtered} onNavigateDetail={onNavigateDetail} />
      )}
    </div>
  );
}

function ListView({ positions, onNavigateDetail }: { positions: Position[]; onNavigateDetail: (id: string) => void }) {
  return (
    <div style={{ background: 'var(--card)', overflowX: 'auto', borderRadius: 24, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Symbol', 'Status', 'Qty', 'Entry', 'SL', 'Target', 'LTP', 'P&L', 'P&L %', 'R:R', 'Date'].map((h) => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)', whiteSpace: 'nowrap', background: 'transparent' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {positions.map((p) => {
            const c = calcPosition(p);
            const pnl = p.status === 'open' ? c.unrealizedPnl : c.realizedPnl;
            const pnlPct = p.status === 'open' ? c.unrealizedPnlPct : c.realizedPnlPct;
            return (
              <tr key={p.id}
                onClick={() => onNavigateDetail(p.id)}
                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 6, height: 6,
                      background: p.status === 'open' ? (p.ltp ? 'var(--gain)' : 'var(--muted-foreground)') : 'var(--border)',
                    }} />
                    <span style={{ fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{p.symbol}</span>
                    <span style={{ fontSize: 10, color: 'var(--muted-foreground)', padding: '1px 6px', border: '1px solid var(--border)', borderRadius: 4 }}>{p.exchange}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 2, paddingLeft: 14, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span className="badge" style={{
                    background: p.status === 'open' ? 'rgba(0,168,120,0.08)' : 'var(--muted)',
                    color: p.status === 'open' ? 'var(--gain)' : 'var(--muted-foreground)',
                  }}>{p.status.toUpperCase()}</span>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace' }}>{p.quantity}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace' }}>₹{p.entryPrice.toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--loss)' }}>₹{p.stopLoss.toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted-foreground)' }}>
                  {p.target ? '₹' + p.target.toLocaleString('en-IN') : '—'}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace' }}>
                  {p.ltp ? '₹' + p.ltp.toLocaleString('en-IN') : <span style={{ color: 'var(--muted-foreground)' }}>—</span>}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace' }} className={pnlClass(pnl)}>
                  {pnl != null ? (pnl >= 0 ? '+' : '') + '₹' + Math.abs(pnl).toFixed(0) : '—'}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace' }} className={pnlClass(pnlPct)}>
                  {pnlPct != null ? (pnlPct >= 0 ? '+' : '') + pnlPct.toFixed(2) + '%' : '—'}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace' }}>
                  {c.rrRatio != null ? c.rrRatio.toFixed(2) + 'R' : '—'}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                  {new Date(p.entryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CardView({ positions, onNavigateDetail }: { positions: Position[]; onNavigateDetail: (id: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {positions.map((p) => {
        const c = calcPosition(p);
        const pnl = p.status === 'open' ? c.unrealizedPnl : c.realizedPnl;
        const pnlPct = p.status === 'open' ? c.unrealizedPnlPct : c.realizedPnlPct;

        return (
          <div key={p.id}
            onClick={() => onNavigateDetail(p.id)}
            style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              padding: '20px', cursor: 'pointer', transition: 'border-color 0.15s',
              borderRadius: 24,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16 }}>{p.symbol}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted-foreground)', padding: '1px 6px', border: '1px solid var(--border)', borderRadius: 4 }}>{p.exchange}</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 2, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </p>
              </div>
              <span className="badge" style={{
                background: p.status === 'open' ? 'rgba(0,168,120,0.08)' : 'var(--muted)',
                color: p.status === 'open' ? 'var(--gain)' : 'var(--muted-foreground)',
              }}>{p.status.toUpperCase()}</span>
            </div>

            {/* P&L */}
            {pnl != null && (
              <div style={{ marginBottom: 12, padding: '10px 12px', background: 'var(--muted)', borderLeft: `3px solid ${pnl >= 0 ? 'var(--gain)' : 'var(--loss)'}`, borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{p.status === 'open' ? 'Unrealized' : 'Realized'} P&L</span>
                  <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{pnlPct != null ? (pnlPct >= 0 ? '+' : '') + pnlPct.toFixed(2) + '%' : ''}</span>
                </div>
                <p className={pnlClass(pnl)} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 600, marginTop: 2 }}>
                  {pnl >= 0 ? '+' : ''}₹{Math.abs(pnl).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
            )}

            {/* Details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Entry', value: '₹' + p.entryPrice.toLocaleString('en-IN') },
                { label: 'Qty', value: p.quantity.toString() },
                { label: 'Stop Loss', value: '₹' + p.stopLoss.toLocaleString('en-IN'), loss: true },
                { label: 'Target', value: p.target ? '₹' + p.target.toLocaleString('en-IN') : '—', gain: !!p.target },
                { label: 'LTP', value: p.ltp ? '₹' + p.ltp.toLocaleString('en-IN') : '—' },
                { label: 'R:R', value: c.rrRatio != null ? c.rrRatio.toFixed(2) + 'R' : '—' },
              ].map(({ label, value, loss, gain }) => (
                <div key={label}>
                  <p style={{ fontSize: 10, color: 'var(--muted-foreground)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 13, marginTop: 1,
                    color: loss ? 'var(--loss)' : gain ? 'var(--gain)' : 'var(--foreground)'
                  }}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, fontSize: 11, color: 'var(--muted-foreground)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{new Date(p.entryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              {p.notes && <span style={{ fontStyle: 'italic', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.notes}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
