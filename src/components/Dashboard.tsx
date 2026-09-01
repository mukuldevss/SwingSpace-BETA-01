import { useState } from 'react';
import type { Position } from '../types';
import { getDashboardStats, getPnlHistory, formatCurrency, formatPct, pnlClass, calcPosition } from '../utils';

interface DashboardProps {
  positions: Position[];
  onNavigateDetail: (id: string) => void;
}

function StatCard({ label, value, sub, gain, loss }: { label: string; value: string; sub?: string; gain?: boolean; loss?: boolean }) {
  const valueColor = gain ? 'var(--gain)' : loss ? 'var(--loss)' : 'var(--foreground)';
  return (
    <div className="stat-card">
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 12 }}>
        {label}
      </p>
      <p style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 24, fontWeight: 700,
        letterSpacing: '-0.03em', color: valueColor,
        lineHeight: 1.1,
      }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 8 }}>{sub}</p>}
    </div>
  );
}

type PnlPoint = { date: string; symbol: string; pnl: number; cumulative: number };

function PnlBarChart({ data }: { data: PnlPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>No closed trades yet</p>
      </div>
    );
  }

  const VW = 560, VH = 140;
  const PAD = { top: 8, bottom: 28, left: 4, right: 4 };
  const chartH = VH - PAD.top - PAD.bottom;
  const halfH = chartH / 2;
  const zeroY = PAD.top + halfH;
  const maxAbs = Math.max(...data.map((d) => Math.abs(d.pnl)), 1);
  const slotW = (VW - PAD.left - PAD.right) / data.length;
  const barW = Math.min(36, Math.max(6, slotW * 0.6));

  function barRect(d: PnlPoint, i: number) {
    const h = Math.max(3, (Math.abs(d.pnl) / maxAbs) * (halfH - 4));
    const x = PAD.left + i * slotW + (slotW - barW) / 2;
    const y = d.pnl >= 0 ? zeroY - h : zeroY;
    return { x, y, h };
  }

  const hoverData = hovered !== null ? data[hovered] : null;

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', height: VH, display: 'block', overflow: 'visible' }}>
        {/* Zero line */}
        <line x1={PAD.left} y1={zeroY} x2={VW - PAD.right} y2={zeroY}
          stroke="var(--border)" strokeWidth="1" />

        {data.map((d, i) => {
          const { x, y, h } = barRect(d, i);
          const isGain = d.pnl >= 0;
          const color = isGain ? 'var(--gain)' : 'var(--loss)';
          const dim = hovered !== null && hovered !== i;
          const labelX = x + barW / 2;

          return (
            <g key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              <rect x={x} y={y} width={barW} height={h}
                fill={color}
                opacity={dim ? 0.22 : 0.9}
                rx={3}
                style={{ transition: 'opacity 0.15s' }}
              />
              {/* Symbol label */}
              <text
                x={labelX} y={VH - 6}
                textAnchor="middle"
                fontSize={data.length > 12 ? 7 : 9}
                fontFamily="Inter, sans-serif"
                fontWeight={600}
                fill={hovered === i ? 'var(--foreground)' : 'var(--muted-foreground)'}
                style={{ transition: 'fill 0.15s' }}
              >
                {d.symbol.length > 6 ? d.symbol.slice(0, 6) : d.symbol}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoverData !== null && hovered !== null && (() => {
        const { x, y, h } = barRect(hoverData, hovered);
        const isGain = hoverData.pnl >= 0;
        const tooltipX = (x / VW) * 100;
        const top = isGain ? y - 8 : y + h + 8;
        return (
          <div style={{
            position: 'absolute',
            left: `${Math.min(Math.max(tooltipX, 8), 75)}%`,
            top: (top / VH) * 100 + '%',
            transform: isGain ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
            background: 'var(--foreground)',
            color: 'var(--primary-foreground)',
            padding: '5px 10px',
            borderRadius: 6,
            fontSize: 11,
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <span style={{ color: isGain ? '#00c896' : '#ff6b6b' }}>
              {isGain ? '+' : ''}₹{Math.abs(hoverData.pnl).toLocaleString('en-IN')}
            </span>
            <span style={{ opacity: 0.6, marginLeft: 6, fontSize: 10, fontFamily: 'Inter, sans-serif' }}>
              {new Date(hoverData.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            </span>
          </div>
        );
      })()}
    </div>
  );
}

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const cpx = (p0.x + p1.x) / 2;
    d += ` C ${cpx.toFixed(2)} ${p0.y.toFixed(2)}, ${cpx.toFixed(2)} ${p1.y.toFixed(2)}, ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
  }
  return d;
}

function CumulativeLine({ data }: { data: PnlPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (data.length < 2) {
    return (
      <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>Add more closed trades to see trend</p>
      </div>
    );
  }

  const VW = 560, VH = 100;
  const PAD = { top: 10, bottom: 10, left: 4, right: 4 };
  const innerH = VH - PAD.top - PAD.bottom;

  const vals = data.map((d) => d.cumulative);
  const minV = Math.min(0, ...vals);
  const maxV = Math.max(0, ...vals);
  const range = maxV - minV || 1;
  const zeroY = PAD.top + ((maxV - 0) / range) * innerH;

  const pts = data.map((d, i) => ({
    x: PAD.left + (i / (data.length - 1)) * (VW - PAD.left - PAD.right),
    y: PAD.top + ((maxV - d.cumulative) / range) * innerH,
    val: d.cumulative,
  }));

  const lastVal = vals[vals.length - 1];
  const lineColor = lastVal >= 0 ? 'var(--gain)' : 'var(--loss)';
  const fillId = lastVal >= 0 ? 'grad-gain' : 'grad-loss';
  const fillColorTop = lastVal >= 0 ? '#007a5e' : '#c12020';

  const linePath = smoothPath(pts);
  const lastPt = pts[pts.length - 1];
  const firstPt = pts[0];
  const areaPath = `${linePath} L ${lastPt.x.toFixed(2)} ${zeroY.toFixed(2)} L ${firstPt.x.toFixed(2)} ${zeroY.toFixed(2)} Z`;

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', height: VH, display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColorTop} stopOpacity="0.18" />
            <stop offset="100%" stopColor={fillColorTop} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-gain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#007a5e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#007a5e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-loss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c12020" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#c12020" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Zero baseline */}
        {minV < 0 && (
          <line x1={PAD.left} y1={zeroY} x2={VW - PAD.right} y2={zeroY}
            stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        )}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#${fillId})`} />

        {/* Line */}
        <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Hover vertical line */}
        {hovered !== null && (
          <line
            x1={pts[hovered].x} y1={PAD.top}
            x2={pts[hovered].x} y2={VH - PAD.bottom}
            stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3"
          />
        )}

        {/* Dots */}
        {pts.map((pt, i) => {
          const isHov = hovered === i;
          return (
            <g key={i}>
              {/* Hit area */}
              <circle cx={pt.x} cy={pt.y} r={14} fill="transparent"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'default' }}
              />
              <circle cx={pt.x} cy={pt.y}
                r={isHov ? 5 : 3}
                fill={pt.val >= 0 ? 'var(--gain)' : 'var(--loss)'}
                stroke="var(--card)" strokeWidth={isHov ? 2 : 1.5}
                style={{ transition: 'r 0.1s' }}
                pointerEvents="none"
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered !== null && (() => {
        const pt = pts[hovered];
        const d = data[hovered];
        const isGain = d.cumulative >= 0;
        const leftPct = Math.min(Math.max((pt.x / VW) * 100, 10), 78);
        return (
          <div style={{
            position: 'absolute',
            left: `${leftPct}%`,
            top: `${Math.max(0, (pt.y / VH) * 100 - 18)}%`,
            transform: 'translate(-50%, -100%)',
            background: 'var(--foreground)',
            color: 'var(--primary-foreground)',
            padding: '5px 10px',
            borderRadius: 6,
            fontSize: 11,
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <span style={{ color: isGain ? '#00c896' : '#ff6b6b' }}>
              {isGain ? '+' : ''}₹{Math.abs(d.cumulative).toLocaleString('en-IN')}
            </span>
            <span style={{ opacity: 0.55, marginLeft: 6, fontSize: 10, fontFamily: 'Inter, sans-serif' }}>
              {d.symbol} · {new Date(d.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            </span>
          </div>
        );
      })()}
    </div>
  );
}

export default function Dashboard({ positions, onNavigateDetail }: DashboardProps) {
  const stats = getDashboardStats(positions);
  const pnlHistory = getPnlHistory(positions);
  const openPositions = positions.filter((p) => p.status === 'open');

  return (
    <div className="slide-in">
      {/* Stats row */}
      <div className="stat-cards-grid" style={{ marginBottom: 48 }}>
        <StatCard label="Total Invested" value={formatCurrency(stats.totalInvested, 0)} sub={`${stats.openCount} open position${stats.openCount !== 1 ? 's' : ''}`} />
        <StatCard label="Unrealized P&L" value={
          stats.unrealizedPnl >= 0
            ? '+' + formatCurrency(stats.unrealizedPnl)
            : formatCurrency(stats.unrealizedPnl)
        } sub={stats.openCount > 0 ? formatPct(stats.unrealizedPnl / stats.totalInvested * 100) : undefined} gain={stats.unrealizedPnl > 0} loss={stats.unrealizedPnl < 0} />
        <StatCard label="Realized P&L" value={
          stats.realizedPnl >= 0
            ? '+' + formatCurrency(stats.realizedPnl)
            : formatCurrency(stats.realizedPnl)
        } sub={`${stats.closedCount} trade${stats.closedCount !== 1 ? 's' : ''} closed`} gain={stats.realizedPnl > 0} loss={stats.realizedPnl < 0} />
        <StatCard label="Avg Risk/Reward" value={stats.openCount > 0 ? stats.avgRR.toFixed(2) + ' R' : '—'} sub="across open positions" />
        <StatCard label="Total P&L" value={
          stats.totalPnl >= 0
            ? '+' + formatCurrency(stats.totalPnl)
            : formatCurrency(stats.totalPnl)
        } sub="unrealized + realized" gain={stats.totalPnl > 0} loss={stats.totalPnl < 0} />
      </div>

      {/* Charts row */}
      {(() => {
        const wins = pnlHistory.filter((d) => d.pnl >= 0).length;
        const losses = pnlHistory.filter((d) => d.pnl < 0).length;
        const winRate = pnlHistory.length > 0 ? Math.round((wins / pnlHistory.length) * 100) : 0;
        const avgWin = wins > 0 ? pnlHistory.filter((d) => d.pnl >= 0).reduce((s, d) => s + d.pnl, 0) / wins : 0;
        const avgLoss = losses > 0 ? Math.abs(pnlHistory.filter((d) => d.pnl < 0).reduce((s, d) => s + d.pnl, 0) / losses) : 0;

        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
            {/* Closed Trade P&L */}
            <div style={{ background: 'var(--card)', padding: '28px', borderRadius: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                    Closed Trade P&L
                  </p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--gain)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{wins}W</span>
                    <span style={{ fontSize: 12, color: 'var(--loss)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{losses}L</span>
                    <span style={{ fontSize: 12, color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {winRate}% WR
                    </span>
                  </div>
                </div>
                {pnlHistory.length > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted-foreground)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                      avg
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--gain)', fontFamily: 'JetBrains Mono, monospace' }}>+{formatCurrency(avgWin, 0)}</div>
                    <div style={{ fontSize: 11, color: 'var(--loss)', fontFamily: 'JetBrains Mono, monospace' }}>−{formatCurrency(avgLoss, 0)}</div>
                  </div>
                )}
              </div>
              <PnlBarChart data={pnlHistory} />
            </div>

            {/* Cumulative P&L */}
            <div style={{ background: 'var(--card)', padding: '28px', borderRadius: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                    Cumulative P&L
                  </p>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 700, marginTop: 6,
                    letterSpacing: '-0.03em',
                    color: stats.realizedPnl >= 0 ? 'var(--gain)' : 'var(--loss)',
                  }}>
                    {stats.realizedPnl >= 0 ? '+' : ''}{formatCurrency(stats.realizedPnl)}
                  </p>
                </div>
                {pnlHistory.length >= 2 && (() => {
                  const first = pnlHistory[0].cumulative;
                  const last = pnlHistory[pnlHistory.length - 1].cumulative;
                  const isUp = last >= first;
                  return (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '4px 10px', borderRadius: 20,
                      background: isUp ? 'rgba(0,122,94,0.1)' : 'rgba(193,32,32,0.1)',
                      color: isUp ? 'var(--gain)' : 'var(--loss)',
                      fontSize: 11, fontWeight: 600,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        {isUp
                          ? <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          : <path d="M5 2v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        }
                      </svg>
                      {isUp ? 'Trending up' : 'Trending down'}
                    </div>
                  );
                })()}
              </div>
              <CumulativeLine data={pnlHistory} />
            </div>
          </div>
        );
      })()}

      {/* Open Positions */}
      <div style={{ background: 'var(--card)', marginBottom: 48, borderRadius: 24, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>Open Positions</p>
          <span className="badge" style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}>{openPositions.length}</span>
        </div>
        {openPositions.length === 0 ? (
          <div style={{ padding: '56px 28px', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>No open positions. Add one to get started.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Symbol', 'Qty', 'Entry', 'SL', 'Target', 'LTP', 'Unr. P&L', 'R:R', 'Risk'].map((h) => (
                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {openPositions.map((p) => {
                  const c = calcPosition(p);
                  return (
                    <tr key={p.id}
                      onClick={() => onNavigateDetail(p.id)}
                      style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.1s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '14px 20px', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: p.ltp ? 'var(--gain)' : 'var(--muted-foreground)',
                          }} />
                          <span>{p.symbol}</span>
                          <span style={{ fontSize: 10, color: 'var(--muted-foreground)', padding: '1px 4px', border: '1px solid var(--border)' }}>{p.exchange}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }}>{p.quantity}</td>
                      <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }}>₹{p.entryPrice.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--loss)' }}>₹{p.stopLoss.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted-foreground)' }}>
                        {p.target ? '₹' + p.target.toLocaleString('en-IN') : '—'}
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }}>
                        {p.ltp ? '₹' + p.ltp.toLocaleString('en-IN') : <span style={{ color: 'var(--muted-foreground)' }}>—</span>}
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }} className={pnlClass(c.unrealizedPnl)}>
                        {c.unrealizedPnl != null ? (c.unrealizedPnl >= 0 ? '+' : '') + '₹' + Math.abs(c.unrealizedPnl).toFixed(0) : '—'}
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }}>
                        {c.rrRatio != null ? c.rrRatio.toFixed(2) + 'R' : '—'}
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--loss)' }}>
                        ₹{c.riskAmount.toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent closed */}
      {positions.filter((p) => p.status === 'closed').length > 0 && (
        <div style={{ background: 'var(--card)', borderRadius: 24, overflow: 'hidden' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>Recent Closed Trades</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Symbol', 'Entry', 'Exit', 'P&L', 'Return %', 'Close Date'].map((h) => (
                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {positions
                  .filter((p) => p.status === 'closed')
                  .slice(-10)
                  .reverse()
                  .map((p) => {
                    const c = calcPosition(p);
                    return (
                      <tr key={p.id}
                        onClick={() => onNavigateDetail(p.id)}
                        style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '14px 20px', fontWeight: 600 }}>{p.symbol}
                          <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--muted-foreground)', padding: '1px 4px', border: '1px solid var(--border)' }}>{p.exchange}</span>
                        </td>
                        <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }}>₹{p.entryPrice.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }}>₹{p.closePrice?.toLocaleString('en-IN') ?? '—'}</td>
                        <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }} className={pnlClass(c.realizedPnl)}>
                          {c.realizedPnl != null ? (c.realizedPnl >= 0 ? '+' : '') + '₹' + Math.abs(c.realizedPnl).toFixed(0) : '—'}
                        </td>
                        <td style={{ padding: '14px 20px', fontFamily: 'JetBrains Mono, monospace' }} className={pnlClass(c.realizedPnlPct)}>
                          {c.realizedPnlPct != null ? (c.realizedPnlPct >= 0 ? '+' : '') + c.realizedPnlPct.toFixed(2) + '%' : '—'}
                        </td>
                        <td style={{ padding: '14px 20px', color: 'var(--muted-foreground)' }}>
                          {p.closeDate ? new Date(p.closeDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
