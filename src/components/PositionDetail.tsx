import { useState } from 'react';
import type { Position } from '../types';
import { calcPosition, pnlClass, fetchLTP, formatCurrency, formatDate } from '../utils';
import { searchStocks } from '../data/stocks';

// ─── Price Range Bar ─────────────────────────────────────────────────────────
interface PriceRangeBarProps {
  sl: number;
  entry: number;
  ltp?: number | null;
  target?: number | null;
  onRefresh?: () => void;
  fetchingLtp?: boolean;
}

function PriceRangeBar({ sl, entry, ltp, target, onRefresh, fetchingLtp }: PriceRangeBarProps) {
  const hasLtp    = ltp    != null;
  const hasTarget = target != null;

  const GAIN_HEX = '#00C896';
  const LOSS_HEX = '#FF4D4D';

  // Price-proportional positioning
  const prices = [sl, entry, ...(hasLtp ? [ltp!] : []), ...(hasTarget ? [target!] : [])];
  const rawMin = Math.min(...prices);
  const rawMax = Math.max(...prices);
  const span   = rawMax - rawMin || 1;
  const min    = rawMin - span * 0.02;
  const max    = rawMax + span * 0.02;
  const pct    = (v: number) => Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100));

  const slPct     = pct(sl);
  const entryPct  = pct(entry);
  const ltpPct    = hasLtp    ? pct(ltp!)    : null;
  const targetPct = hasTarget ? pct(target!) : null;

  const inProfit = hasLtp && ltp! >= entry;
  const ltpHex   = inProfit ? GAIN_HEX : LOSS_HEX;

  // Track segment bounds
  const riskL  = Math.min(slPct, entryPct);
  const riskW  = Math.abs(entryPct - slPct);
  const rewardL = entryPct;
  const rewardW = hasTarget ? targetPct! - entryPct : 0;
  const fillL  = hasLtp ? entryPct : null;
  const fillW  = hasLtp ? ltpPct! - entryPct : null; // negative = loss direction

  // LTP delta
  const ltpDelta    = hasLtp ? ltp! - entry : null;
  const ltpDeltaPct = hasLtp && entry !== 0 ? ((ltp! - entry) / entry) * 100 : null;

  const TRACK_H = 4;
  const TRACK_TOP = 12; // centre of track within the 28px container

  return (
    <div style={{ padding: '28px 0 10px' }}>

      {/* ── Labels row: SL | Entry | TP ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 700, color: 'var(--loss)', whiteSpace: 'nowrap' }}>
          SL ₹{sl.toLocaleString('en-IN')}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 400, color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
          Entry ₹{entry.toLocaleString('en-IN')}
        </span>
        {hasTarget && (
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 700, color: 'var(--gain)', whiteSpace: 'nowrap' }}>
            TP ₹{target!.toLocaleString('en-IN')}
          </span>
        )}
      </div>

      {/* ── Track bar ── */}
      <div style={{ position: 'relative', height: 28, marginTop: 8 }}>

        {/* Base neutral track */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: TRACK_TOP - TRACK_H / 2, height: TRACK_H,
          borderRadius: 2,
          background: 'rgba(120,120,120,0.18)',
        }}>
          {/* Risk zone: SL → Entry */}
          <div style={{
            position: 'absolute',
            left: riskL + '%', width: riskW + '%',
            top: 0, bottom: 0,
            background: 'rgba(255,77,77,0.08)',
            border: '1px solid rgba(255,77,77,0.2)',
            borderRadius: '2px 0 0 2px',
          }} />

          {/* Reward zone: Entry → Target */}
          {hasTarget && rewardW > 0 && (
            <div style={{
              position: 'absolute',
              left: rewardL + '%', width: rewardW + '%',
              top: 0, bottom: 0,
              background: 'rgba(0,200,150,0.08)',
              border: '1px solid rgba(0,200,150,0.2)',
              borderRadius: '0 2px 2px 0',
            }} />
          )}

          {/* Solid Entry → LTP fill */}
          {fillL != null && fillW != null && (
            <div style={{
              position: 'absolute',
              left: (fillW >= 0 ? fillL : fillL + fillW) + '%',
              width: Math.abs(fillW) + '%',
              top: 0, bottom: 0,
              background: ltpHex,
              opacity: 0.8,
              borderRadius: 2,
            }} />
          )}
        </div>

        {/* SL marker — square */}
        <div style={{
          position: 'absolute',
          left: slPct + '%', top: TRACK_TOP - 5,
          transform: 'translateX(-50%)',
          width: 10, height: 10, borderRadius: 5,
          background: 'var(--loss)',
          border: '2px solid var(--card)',
          zIndex: 2,
        }} />

        {/* Entry marker — square */}
        <div style={{
          position: 'absolute',
          left: entryPct + '%', top: TRACK_TOP - 5,
          transform: 'translateX(-50%)',
          width: 10, height: 10, borderRadius: 5,
          background: 'var(--muted-foreground)',
          border: '2px solid var(--card)',
          zIndex: 2,
        }} />

        {/* LTP marker — larger square with glow */}
        {hasLtp && (
          <div style={{
            position: 'absolute',
            left: ltpPct! + '%', top: TRACK_TOP - 7,
            transform: 'translateX(-50%)',
            width: 14, height: 14, borderRadius: 7,
            background: ltpHex,
            border: '2.5px solid var(--card)',
            boxShadow: `0 0 10px 0 ${ltpHex}`,
            zIndex: 3,
          }} />
        )}

        {/* Target marker — square */}
        {hasTarget && (
          <div style={{
            position: 'absolute',
            left: targetPct! + '%', top: TRACK_TOP - 5,
            transform: 'translateX(-50%)',
            width: 10, height: 10, borderRadius: 5,
            background: 'var(--gain)',
            border: '2px solid var(--card)',
            zIndex: 2,
          }} />
        )}
      </div>

      {/* ── LTP info row ── */}
      {hasLtp && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 10 }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700,
            color: inProfit ? 'var(--gain)' : 'var(--loss)',
          }}>
            LTP ₹{ltp!.toLocaleString('en-IN')}
          </span>
          {onRefresh && (
            <button onClick={onRefresh} disabled={fetchingLtp}
              title="Refresh LTP"
              style={{ background: 'none', border: 'none', cursor: fetchingLtp ? 'not-allowed' : 'pointer', padding: '3px 8px', color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: '0.03em', opacity: fetchingLtp ? 0.5 : 1, borderRadius: 5 }}>
              {fetchingLtp ? '…' : '↻'}
            </button>
          )}
          {ltpDelta != null && ltpDeltaPct != null && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--muted-foreground)' }}>
              {ltpDelta >= 0 ? '+' : ''}{ltpDelta.toFixed(2)} ({ltpDeltaPct >= 0 ? '+' : ''}{ltpDeltaPct.toFixed(2)}%)
            </span>
          )}
        </div>
      )}

    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

interface PositionDetailProps {
  position: Position;
  onBack: () => void;
  onUpdate: (p: Position) => void;
  onDelete: (id: string) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px',
  background: 'var(--background)', border: '1px solid var(--border)',
  color: 'var(--foreground)', fontSize: 13, fontFamily: 'Inter, sans-serif',
  outline: 'none', borderRadius: 8,
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'var(--muted-foreground)', marginBottom: 5,
};

export default function PositionDetail({ position: initialPosition, onBack, onUpdate, onDelete }: PositionDetailProps) {
  const [position, setPosition] = useState(initialPosition);

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editSymbol, setEditSymbol] = useState(position.symbol);
  const [editName, setEditName] = useState(position.name);
  const [editQty, setEditQty] = useState(String(position.quantity));
  const [editEntry, setEditEntry] = useState(String(position.entryPrice));
  const [editSl, setEditSl] = useState(String(position.stopLoss));
  const [editTarget, setEditTarget] = useState(position.target ? String(position.target) : '');
  const [editDate, setEditDate] = useState(position.entryDate);
  const [editNotes, setEditNotes] = useState(position.notes ?? '');
  const [editSuggestions, setEditSuggestions] = useState<ReturnType<typeof searchStocks>>([]);

  // Other modes
  const [closingMode, setClosingMode] = useState(false);
  const [closePrice, setClosePrice] = useState('');
  const [closeDate, setCloseDate] = useState(new Date().toISOString().split('T')[0]);
  const [fetchingLtp, setFetchingLtp] = useState(false);
  const [ltpMsg, setLtpMsg] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [manualLtp, setManualLtp] = useState('');
  const [editingLtp, setEditingLtp] = useState(false);

  const c = calcPosition(position);
  const pnl = position.status === 'open' ? c.unrealizedPnl : c.realizedPnl;
  const pnlPct = position.status === 'open' ? c.unrealizedPnlPct : c.realizedPnlPct;

  // ── Edit handlers ──────────────────────────────────────────────────
  const openEdit = () => {
    setEditSymbol(position.symbol);
    setEditName(position.name);
    setEditQty(String(position.quantity));
    setEditEntry(String(position.entryPrice));
    setEditSl(String(position.stopLoss));
    setEditTarget(position.target ? String(position.target) : '');
    setEditDate(position.entryDate);
    setEditNotes(position.notes ?? '');
    setEditMode(true);
    setClosingMode(false);
  };

  const cancelEdit = () => { setEditMode(false); setEditSuggestions([]); };

  const saveEdit = () => {
    const qty = parseFloat(editQty);
    const entry = parseFloat(editEntry);
    const sl = parseFloat(editSl);
    const tgt = parseFloat(editTarget) || undefined;
    if (!editSymbol || qty <= 0 || entry <= 0 || sl <= 0) return;
    const updated: Position = {
      ...position,
      symbol: editSymbol.toUpperCase(),
      name: editName || editSymbol.toUpperCase(),
      quantity: qty,
      entryPrice: entry,
      stopLoss: sl,
      target: tgt,
      entryDate: editDate,
      notes: editNotes.trim() || undefined,
    };
    setPosition(updated);
    onUpdate(updated);
    setEditMode(false);
    setEditSuggestions([]);
  };

  const handleEditSymbolInput = (val: string) => {
    setEditSymbol(val.toUpperCase());
    const results = searchStocks(val);
    setEditSuggestions(results.length > 0 && val.length > 0 ? results : []);
  };

  // ── LTP handlers ───────────────────────────────────────────────────
  const handleFetchLtp = async () => {
    setFetchingLtp(true);
    setLtpMsg('Fetching...');
    try {
      const ltps = await fetchLTP([{ symbol: position.symbol, exchange: position.exchange }]);
      if (ltps[position.symbol]) {
        const updated = { ...position, ltp: ltps[position.symbol] };
        setPosition(updated);
        onUpdate(updated);
        setLtpMsg(`LTP updated: ₹${ltps[position.symbol].toFixed(2)}`);
      } else {
        setLtpMsg('Symbol not found on Twelve Data.');
      }
    } catch {
      setLtpMsg('Fetch failed. Check connection.');
    }
    setFetchingLtp(false);
    setTimeout(() => setLtpMsg(''), 5000);
  };

  const handleSetManualLtp = () => {
    const v = parseFloat(manualLtp);
    if (!v || v <= 0) return;
    const updated = { ...position, ltp: v };
    setPosition(updated);
    onUpdate(updated);
    setManualLtp('');
    setEditingLtp(false);
  };

  // ── Close / reopen ─────────────────────────────────────────────────
  const handleClose = () => {
    const cp = parseFloat(closePrice);
    if (!cp || cp <= 0) return;
    const updated: Position = { ...position, status: 'closed', closePrice: cp, closeDate };
    setPosition(updated);
    onUpdate(updated);
    setClosingMode(false);
  };

  const handleReopen = () => {
    const updated: Position = { ...position, status: 'open', closePrice: undefined, closeDate: undefined };
    setPosition(updated);
    onUpdate(updated);
  };

  let priceStatus = '';
  let priceStatusColor = 'var(--muted-foreground)';
  if (position.ltp && position.status === 'open') {
    const isLong = position.side === 'long';
    if (isLong) {
      if (position.ltp <= position.stopLoss) { priceStatus = 'Below SL — Stop triggered'; priceStatusColor = 'var(--loss)'; }
      else if (position.ltp < position.entryPrice) { priceStatus = 'Below Entry — In drawdown'; priceStatusColor = '#e07b00'; }
      else if (position.target && position.ltp >= position.target) { priceStatus = 'At/Above Target — Target hit!'; priceStatusColor = 'var(--gain)'; }
      else if (position.ltp > position.entryPrice) { priceStatus = 'Above Entry — In profit'; priceStatusColor = 'var(--gain)'; }
    } else {
      if (position.ltp >= position.stopLoss) { priceStatus = 'Above SL — Stop triggered'; priceStatusColor = 'var(--loss)'; }
      else if (position.ltp > position.entryPrice) { priceStatus = 'Above Entry — In drawdown'; priceStatusColor = '#e07b00'; }
      else if (position.target && position.ltp <= position.target) { priceStatus = 'At/Below Target — Target hit!'; priceStatusColor = 'var(--gain)'; }
      else if (position.ltp < position.entryPrice) { priceStatus = 'Below Entry — In profit'; priceStatusColor = 'var(--gain)'; }
    }
  }

  return (
    <div className="slide-in">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: '10px 0' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted-foreground)', fontSize: 13, fontWeight: 500, padding: 0 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--foreground)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
          Positions
        </button>
        <span style={{ color: 'var(--border)' }}>/</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{position.symbol}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
        {/* ── Main panel ── */}
        <div>
          {/* Header card */}
          <div style={{ background: 'var(--card)', padding: '28px', marginBottom: 24, borderRadius: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em' }}>{position.symbol}</h1>
                  <span style={{ fontSize: 11, color: 'var(--muted-foreground)', padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 4 }}>{position.exchange}</span>
                  <span className="badge" style={{ background: position.status === 'open' ? 'rgba(0,168,120,0.08)' : 'var(--muted)', color: position.status === 'open' ? 'var(--gain)' : 'var(--muted-foreground)' }}>
                    {position.status.toUpperCase()}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>{position.name}</p>
                <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 2 }}>
                  Entered {formatDate(position.entryDate)}
                  {position.closeDate && ` · Closed ${formatDate(position.closeDate)}`}
                </p>
              </div>
              {pnl != null && (
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                    {position.status === 'open' ? 'Unrealized P&L' : 'Realized P&L'}
                  </p>
                  <p className={pnlClass(pnl)} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 2 }}>
                    {pnl >= 0 ? '+' : ''}₹{Math.abs(pnl).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className={pnlClass(pnlPct)} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, marginTop: 2 }}>
                    {pnlPct != null ? (pnlPct >= 0 ? '+' : '') + pnlPct.toFixed(2) + '%' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Price Range Bar */}
          <div style={{ background: 'var(--card)', padding: '28px', marginBottom: 24, borderRadius: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                Price Range
              </p>
              {priceStatus && (
                <span style={{ fontSize: 12, fontWeight: 600, color: priceStatusColor, padding: '3px 12px', border: `1px solid ${priceStatusColor}`, borderRadius: 9999 }}>
                  {priceStatus}
                </span>
              )}
            </div>

            {/* Price Range Bar */}
            <PriceRangeBar
              sl={position.stopLoss}
              entry={position.entryPrice}
              ltp={position.ltp}
              target={position.target}
              onRefresh={position.status === 'open' ? handleFetchLtp : undefined}
              fetchingLtp={fetchingLtp}
            />

            {/* Manual LTP controls */}
            {position.status === 'open' && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {editingLtp ? (
                  <div style={{ display: 'flex', gap: 0 }}>
                    <input type="number" value={manualLtp} onChange={(e) => setManualLtp(e.target.value)} placeholder="₹ LTP"
                      style={{ width: 120, padding: '7px 10px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', outline: 'none', borderRadius: '8px 0 0 8px' }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSetManualLtp()} autoFocus />
                    <button onClick={handleSetManualLtp} style={{ padding: '7px 12px', background: 'var(--foreground)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, borderRadius: '0 8px 8px 0' }}>SET</button>
                    <button onClick={() => setEditingLtp(false)} style={{ padding: '7px 10px', background: 'none', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--muted-foreground)', fontSize: 12, borderRadius: 9999, marginLeft: 4 }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingLtp(true)} style={{ padding: '5px 14px', border: '1px solid var(--border)', background: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: 11, fontWeight: 500, borderRadius: 9999 }}>
                    Set Manual LTP
                  </button>
                )}
                {ltpMsg && <span style={{ fontSize: 12, color: 'var(--accent)', padding: '4px 10px', background: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 9999 }}>{ltpMsg}</span>}
              </div>
            )}
          </div>

          {/* Notes (view mode) */}
          {!editMode && position.notes && (
            <div style={{ background: 'var(--card)', padding: '24px 28px', marginBottom: 24, borderRadius: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 8 }}>Notes</p>
              <p style={{ fontSize: 13, color: 'var(--foreground)', lineHeight: 1.6, fontStyle: 'italic' }}>{position.notes}</p>
            </div>
          )}

          {/* ── Edit form ── */}
          {editMode && (
            <div style={{ background: 'var(--card)', border: '1px solid var(--accent)', padding: '24px 28px', marginBottom: 24, borderRadius: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>Edit Position</p>
                <button onClick={cancelEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', fontSize: 18, lineHeight: 1, padding: 0 }}>✕</button>
              </div>

              {/* Symbol row */}
              <div style={{ marginBottom: 16, position: 'relative' }}>
                <label style={labelStyle}>Symbol</label>
                <div style={{ display: 'flex', gap: 0 }}>
                  <input value={editSymbol} onChange={(e) => handleEditSymbolInput(e.target.value)}
                    style={{ ...inputStyle, flex: 1, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; setTimeout(() => setEditSuggestions([]), 150); }}
                  />
                  <span style={{ padding: '8px 12px', border: '1px solid var(--border)', borderLeft: 'none', background: 'var(--muted)', color: 'var(--muted-foreground)', fontSize: 12, display: 'flex', alignItems: 'center', borderRadius: '0 8px 8px 0' }}>{position.exchange}</span>
                </div>
                {editSuggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: 'var(--card)', border: '1px solid var(--border)', borderTop: 'none', maxHeight: 200, overflowY: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '0 0 8px 8px' }}>
                    {editSuggestions.map((s) => (
                      <button key={s.symbol + s.exchange} type="button"
                        onMouseDown={() => { setEditSymbol(s.symbol); setEditName(s.name); setEditSuggestions([]); }}
                        style={{ width: '100%', padding: '9px 14px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12 }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--muted)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'none')}
                      >
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 13, minWidth: 90 }}>{s.symbol}</span>
                        <span style={{ fontSize: 12, color: 'var(--muted-foreground)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                {editName && <p style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 4 }}>{editName}</p>}
              </div>

              {/* Qty + Entry */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Quantity</label>
                  <input type="number" min="1" value={editQty} onChange={(e) => setEditQty(e.target.value)}
                    style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                </div>
                <div>
                  <label style={labelStyle}>Entry Price</label>
                  <input type="number" min="0" step="0.05" value={editEntry} onChange={(e) => setEditEntry(e.target.value)}
                    style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                </div>
              </div>

              {/* SL + Target */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Stop Loss</label>
                  <input type="number" min="0" step="0.05" value={editSl} onChange={(e) => setEditSl(e.target.value)}
                    style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                </div>
                <div>
                  <label style={labelStyle}>Target <span style={{ textTransform: 'none', fontWeight: 400, letterSpacing: 0 }}>(optional)</span></label>
                  <input type="number" min="0" step="0.05" value={editTarget} onChange={(e) => setEditTarget(e.target.value)}
                    style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                </div>
              </div>

              {/* Date + Notes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Entry Date</label>
                  <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                </div>
                <div>
                  <label style={labelStyle}>Notes</label>
                  <input value={editNotes} onChange={(e) => setEditNotes(e.target.value)} placeholder="Setup, rationale..."
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={saveEdit} style={{ flex: 1, padding: '10px 0', background: 'var(--accent)', color: 'var(--accent-foreground)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', borderRadius: 9999 }}>
                  SAVE CHANGES
                </button>
                <button onClick={cancelEdit} style={{ padding: '10px 20px', background: 'none', border: '1px solid var(--border)', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: 13, borderRadius: 9999 }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Actions row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {!editMode && (
              <button onClick={openEdit} style={{ padding: '10px 24px', background: 'none', border: '1px solid var(--border)', color: 'var(--foreground)', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, borderRadius: 9999 }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M9 1.5l2.5 2.5-7 7H2v-2.5l7-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
                Edit Position
              </button>
            )}
            {position.status === 'open' && !closingMode && !editMode && (
              <button onClick={() => setClosingMode(true)} style={{ padding: '10px 24px', background: 'var(--foreground)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em', borderRadius: 9999 }}>
                Close Position
              </button>
            )}
            {position.status === 'closed' && !editMode && (
              <button onClick={handleReopen} style={{ padding: '10px 24px', background: 'none', color: 'var(--muted-foreground)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 13, fontWeight: 500, borderRadius: 9999 }}>
                Reopen Position
              </button>
            )}
            {confirmDelete ? (
              <>
                <span style={{ padding: '10px 0', fontSize: 13, color: 'var(--loss)' }}>Delete this position?</span>
                <button onClick={() => onDelete(position.id)} style={{ padding: '10px 20px', background: 'var(--loss)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, borderRadius: 9999 }}>Confirm Delete</button>
                <button onClick={() => setConfirmDelete(false)} style={{ padding: '10px 16px', background: 'none', border: '1px solid var(--border)', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: 13, borderRadius: 9999 }}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setConfirmDelete(true)} style={{ padding: '10px 16px', background: 'none', border: '1px solid var(--border)', color: 'var(--loss)', cursor: 'pointer', fontSize: 13, fontWeight: 500, marginLeft: 'auto', borderRadius: 9999 }}>
                Delete
              </button>
            )}
          </div>

          {/* Close position form */}
          {closingMode && (
            <div style={{ background: 'var(--card)', padding: '20px 24px', marginTop: 16, borderRadius: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Close Position</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: 8, alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>Exit Price</label>
                  <input type="number" value={closePrice} onChange={(e) => setClosePrice(e.target.value)} placeholder="₹ 0.00" step="0.05"
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', outline: 'none', borderRadius: 8 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>Exit Date</label>
                  <input type="date" value={closeDate} onChange={(e) => setCloseDate(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 13, outline: 'none', borderRadius: 8 }} />
                </div>
                <button onClick={handleClose} style={{ padding: '9px 20px', background: 'var(--foreground)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', borderRadius: 9999 }}>Confirm Close</button>
                <button onClick={() => setClosingMode(false)} style={{ padding: '9px 16px', background: 'none', border: '1px solid var(--border)', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: 13, borderRadius: 9999 }}>Cancel</button>
              </div>
              {closePrice && parseFloat(closePrice) > 0 && (() => {
                const cp = parseFloat(closePrice);
                const mult = position.side === 'long' ? 1 : -1;
                const estPnl = mult * (cp - position.entryPrice) * position.quantity;
                return (
                  <p style={{ fontSize: 13, marginTop: 12 }} className={pnlClass(estPnl)}>
                    Estimated P&L: <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                      {estPnl >= 0 ? '+' : ''}₹{Math.abs(estPnl).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span style={{ color: 'var(--muted-foreground)', marginLeft: 8, fontSize: 12 }}>
                      ({((estPnl / (position.entryPrice * position.quantity)) * 100).toFixed(2)}%)
                    </span>
                  </p>
                );
              })()}
            </div>
          )}
        </div>

        {/* ── Side panel ── */}
        <div style={{ position: 'sticky', top: 92 }}>
          <div style={{ background: 'var(--card)', borderRadius: 24, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Position Details</p>
              <button onClick={editMode ? cancelEdit : openEdit}
                style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '4px 12px', fontSize: 11, fontWeight: 600, color: editMode ? 'var(--loss)' : 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 5, letterSpacing: '0.04em', borderRadius: 9999 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
              >
                {editMode ? '✕ CANCEL' : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M7.5 1l2.5 2.5-6 6H1.5v-2.5l6-6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                    EDIT
                  </>
                )}
              </button>
            </div>
            <div style={{ padding: '4px 0' }}>
              {[
                { label: 'Symbol', value: position.symbol, mono: true, bold: true },
                { label: 'Company', value: position.name },
                { label: 'Exchange', value: position.exchange },
                { label: 'Quantity', value: position.quantity.toLocaleString('en-IN'), mono: true },
                { label: 'Entry Price', value: formatCurrency(position.entryPrice), mono: true },
                { label: 'Stop Loss', value: formatCurrency(position.stopLoss), mono: true, color: 'var(--loss)' },
                { label: 'Target', value: position.target ? formatCurrency(position.target) : '—', mono: true, color: position.target ? 'var(--gain)' : 'var(--muted-foreground)' },
                { label: 'LTP', value: position.ltp ? formatCurrency(position.ltp) : '—', mono: true },
                { label: 'Invested', value: formatCurrency(c.investedValue), mono: true },
                { label: 'Risk/Share', value: c.riskPerShare > 0 ? formatCurrency(c.riskPerShare) : '—', mono: true, color: 'var(--loss)' },
                { label: 'Risk Amount', value: c.riskAmount > 0 ? formatCurrency(c.riskAmount) : '—', mono: true, color: 'var(--loss)' },
                { label: 'Reward/Share', value: c.rewardPerShare != null && c.rewardPerShare > 0 ? formatCurrency(c.rewardPerShare) : '—', mono: true, color: 'var(--gain)' },
                { label: 'R:R Ratio', value: c.rrRatio != null ? c.rrRatio.toFixed(2) + 'R' : '—', mono: true, bold: true, color: c.rrRatio != null ? (c.rrRatio >= 2 ? 'var(--gain)' : c.rrRatio >= 1 ? '#e07b00' : 'var(--loss)') : undefined },
                { label: 'Entry Date', value: formatDate(position.entryDate) },
                ...(position.closeDate ? [{ label: 'Close Date', value: formatDate(position.closeDate) }] : []),
              ].map(({ label, value, mono, bold, color }, idx, arr) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px', borderBottom: idx < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{label}</span>
                  <span style={{ fontFamily: mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif', fontSize: 13, fontWeight: bold ? 700 : 500, color: color || 'var(--foreground)', maxWidth: 160, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
