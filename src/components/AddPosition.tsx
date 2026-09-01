import { useState, useRef, useEffect } from 'react';
import type { Position, Exchange, Side } from '../types';
import { searchStocks } from '../data/stocks';
import { uid, calcPosition, fetchLTP } from '../utils';

interface AddPositionProps {
  onAdd: (p: Position) => void;
  onCancel: () => void;
}

export default function AddPosition({ onAdd, onCancel }: AddPositionProps) {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [exchange, setExchange] = useState<Exchange>('NSE');
  const [side, setSide] = useState<Side>('long');
  const [quantity, setQuantity] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [target, setTarget] = useState('');
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [suggestions, setSuggestions] = useState<ReturnType<typeof searchStocks>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fetchingLtp, setFetchingLtp] = useState(false);
  const [ltpMsg, setLtpMsg] = useState('');
  const suggestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSymbolInput = (val: string) => {
    setSymbol(val.toUpperCase());
    const results = searchStocks(val);
    setSuggestions(results);
    setShowSuggestions(results.length > 0 && val.length > 0);
    if (!val) setName('');
  };

  const selectStock = (s: ReturnType<typeof searchStocks>[0]) => {
    setSymbol(s.symbol);
    setName(s.name);
    setExchange(s.exchange);
    setShowSuggestions(false);
  };

  const handleFetchLtp = async () => {
    if (!symbol) { setLtpMsg('Enter a symbol first.'); setTimeout(() => setLtpMsg(''), 3000); return; }
    setFetchingLtp(true);
    setLtpMsg('Fetching...');
    try {
      const ltps = await fetchLTP([{ symbol, exchange }]);
      if (ltps[symbol]) {
        setEntryPrice(ltps[symbol].toFixed(2));
        setLtpMsg(`LTP: ₹${ltps[symbol].toFixed(2)}`);
      } else {
        setLtpMsg('Not found. Check symbol/exchange.');
      }
    } catch {
      setLtpMsg('Fetch failed.');
    }
    setFetchingLtp(false);
    setTimeout(() => setLtpMsg(''), 5000);
  };

  // Calculated preview
  const qty = parseFloat(quantity) || 0;
  const entry = parseFloat(entryPrice) || 0;
  const sl = parseFloat(stopLoss) || 0;
  const tgt = parseFloat(target) || 0;

  const mult = side === 'long' ? 1 : -1;
  const riskPerShare = entry && sl ? mult * (entry - sl) : 0;
  const rewardPerShare = entry && tgt ? mult * (tgt - entry) : 0;
  const riskAmount = riskPerShare * qty;
  const rewardAmount = rewardPerShare * qty;
  const rrRatio = riskPerShare > 0 && rewardPerShare > 0 ? rewardPerShare / riskPerShare : null;
  const investedValue = entry * qty;
  const riskPct = investedValue > 0 ? (riskAmount / investedValue) * 100 : 0;

  const isValid = symbol && qty > 0 && entry > 0 && sl > 0 && riskPerShare > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const position: Position = {
      id: uid(),
      symbol,
      name: name || symbol,
      exchange,
      side,
      quantity: qty,
      entryPrice: entry,
      stopLoss: sl,
      target: tgt > 0 ? tgt : undefined,
      ltp: undefined,
      status: 'open',
      entryDate,
      notes: notes || undefined,
    };
    onAdd(position);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px',
    background: 'var(--background)', border: '1px solid var(--border)',
    color: 'var(--foreground)', fontSize: 13, fontFamily: 'Inter, sans-serif',
    outline: 'none', transition: 'border-color 0.15s', borderRadius: 8,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 600,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    color: 'var(--muted-foreground)', marginBottom: 6,
  };

  return (
    <div className="slide-in" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Form */}
      <div style={{ background: 'var(--card)', borderRadius: 24, overflow: 'hidden' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700 }}>New Position</h2>
          <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 4 }}>Log a new swing trade entry</p>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
          {/* Symbol search */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Stock Symbol</label>
            <div style={{ position: 'relative' }} ref={suggestRef}>
              <div style={{ display: 'flex', gap: 0 }}>
                <input
                  value={symbol}
                  onChange={(e) => handleSymbolInput(e.target.value)}
                  onFocus={() => symbol && setShowSuggestions(suggestions.length > 0)}
                  placeholder="e.g. RELIANCE, INFY"
                  style={{ ...inputStyle, flex: 1, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}
                  onFocusCapture={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
                <select
                  value={exchange}
                  onChange={(e) => setExchange(e.target.value as Exchange)}
                  style={{ ...inputStyle, width: 80, borderLeft: 'none', cursor: 'pointer' }}
                >
                  <option value="NSE">NSE</option>
                  <option value="BSE">BSE</option>
                </select>
              </div>
              {showSuggestions && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderTop: 'none', maxHeight: 240, overflowY: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  borderRadius: '0 0 8px 8px',
                }}>
                  {suggestions.map((s) => (
                    <button
                      key={s.symbol + s.exchange}
                      type="button"
                      onClick={() => selectStock(s)}
                      style={{
                        width: '100%', padding: '10px 14px', textAlign: 'left',
                        background: 'none', border: 'none', cursor: 'pointer',
                        borderBottom: '1px solid var(--border)', display: 'flex',
                        alignItems: 'center', gap: 12,
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--muted)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'none')}
                    >
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 13, color: 'var(--foreground)', minWidth: 100 }}>{s.symbol}</span>
                      <span style={{ fontSize: 12, color: 'var(--muted-foreground)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--muted-foreground)', padding: '1px 6px', border: '1px solid var(--border)', flexShrink: 0, borderRadius: 4 }}>{s.exchange}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {name && <p style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 4 }}>{name}</p>}
          </div>

          {/* Quantity + Entry row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>Quantity</label>
              <input
                type="number" min="1" value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="100"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Entry Price</label>
                <button
                  type="button" onClick={handleFetchLtp} disabled={fetchingLtp}
                  style={{
                    fontSize: 10, padding: '2px 10px', border: '1px solid var(--border)',
                    background: 'var(--muted)', color: 'var(--muted-foreground)',
                    cursor: fetchingLtp ? 'not-allowed' : 'pointer', fontWeight: 600,
                    letterSpacing: '0.04em', borderRadius: 9999,
                  }}
                >
                  {fetchingLtp ? '...' : 'FETCH LTP'}
                </button>
              </div>
              {ltpMsg && <p style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 4 }}>{ltpMsg}</p>}
              <input
                type="number" min="0" step="0.05" value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder="₹ 0.00"
                style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
          </div>

          {/* SL + Target */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>Stop Loss *</label>
              <input
                type="number" min="0" step="0.05" value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="₹ 0.00"
                style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace', borderColor: sl > 0 && riskPerShare <= 0 ? 'var(--loss)' : 'var(--border)' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = sl > 0 && riskPerShare <= 0 ? 'var(--loss)' : 'var(--border)')}
              />
              {sl > 0 && riskPerShare <= 0 && entry > 0 && (
                <p style={{ fontSize: 10, color: 'var(--loss)', marginTop: 3 }}>
                  SL must be below entry price
                </p>
              )}
            </div>
            <div>
              <label style={labelStyle}>Target <span style={{ textTransform: 'none', fontWeight: 400, letterSpacing: 0 }}>(optional)</span></label>
              <input
                type="number" min="0" step="0.05" value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="₹ 0.00"
                style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
          </div>

          {/* Date + Notes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
            <div>
              <label style={labelStyle}>Entry Date</label>
              <input
                type="date" value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Notes</label>
              <input
                value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Setup, rationale..."
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="submit" disabled={!isValid}
              style={{
                flex: 1, padding: '11px 0',
                background: isValid ? 'var(--accent)' : 'var(--muted)',
                color: isValid ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
                border: 'none', cursor: isValid ? 'pointer' : 'not-allowed',
                fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', borderRadius: 9999,
              }}
            >
              ADD POSITION
            </button>
            <button
              type="button" onClick={onCancel}
              style={{
                padding: '11px 24px', background: 'none',
                border: '1px solid var(--border)', color: 'var(--muted-foreground)',
                cursor: 'pointer', fontSize: 13, fontWeight: 500, borderRadius: 9999,
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Preview panel */}
      <div style={{ position: 'sticky', top: 92 }}>
        <div style={{ background: 'var(--card)', borderRadius: 24, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
              Trade Preview
            </p>
          </div>
          <div style={{ padding: '20px' }}>
            {/* Symbol display */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                {symbol || '—'}
              </p>
              <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 2 }}>
                {name || 'Select a stock'}
              </p>
              {symbol && (
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <span className="badge" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>{exchange}</span>
                </div>
              )}
            </div>

            {/* Price range visual */}
            {entry > 0 && sl > 0 && riskPerShare > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 8 }}>
                  Price Range
                </p>
                <MiniPriceBar entry={entry} sl={sl} target={tgt || undefined} side={side} />
              </div>
            )}

            {/* Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { label: 'Invested Value', value: investedValue > 0 ? '₹' + investedValue.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '—' },
                { label: 'Risk per Share', value: riskPerShare > 0 ? '₹' + riskPerShare.toFixed(2) : '—', color: 'var(--loss)' },
                { label: 'Risk Amount', value: riskAmount > 0 ? '₹' + riskAmount.toFixed(0) : '—', color: 'var(--loss)' },
                { label: 'Risk %', value: riskPct > 0 ? riskPct.toFixed(2) + '%' : '—', color: riskPct > 5 ? 'var(--loss)' : riskPct > 2 ? '#e07b00' : 'var(--gain)' },
                { label: 'Reward per Share', value: rewardPerShare > 0 ? '₹' + rewardPerShare.toFixed(2) : '—', color: 'var(--gain)' },
                { label: 'Reward Amount', value: rewardAmount > 0 ? '₹' + rewardAmount.toFixed(0) : '—', color: 'var(--gain)' },
                { label: 'Risk:Reward', value: rrRatio != null ? rrRatio.toFixed(2) + 'R' : '—', large: true, color: rrRatio != null ? (rrRatio >= 2 ? 'var(--gain)' : rrRatio >= 1 ? '#e07b00' : 'var(--loss)') : 'var(--foreground)' },
              ].map(({ label, value, color, large }) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '9px 14px', borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{label}</span>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: large ? 16 : 13, fontWeight: large ? 700 : 500,
                    color: color || 'var(--foreground)',
                  }}>{value}</span>
                </div>
              ))}
            </div>

            {/* RR guidance */}
            {rrRatio != null && (
              <div style={{
                marginTop: 12, padding: '10px 12px',
                background: rrRatio >= 2 ? 'rgba(0,168,120,0.08)' : rrRatio >= 1 ? 'rgba(224,123,0,0.08)' : 'rgba(220,50,50,0.08)',
                borderLeft: `3px solid ${rrRatio >= 2 ? 'var(--gain)' : rrRatio >= 1 ? '#e07b00' : 'var(--loss)'}`,
                borderRadius: 8,
              }}>
                <p style={{ fontSize: 12, color: 'var(--foreground)', fontWeight: 500 }}>
                  {rrRatio >= 2 ? '✓ Good R:R ratio — trade worth taking' : rrRatio >= 1 ? '⚠ Marginal R:R — proceed with caution' : '✗ Poor R:R — consider adjusting levels'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniPriceBar({ entry, sl, target, side }: { entry: number; sl: number; target?: number; side: Side }) {
  const prices = [sl, entry, ...(target ? [target] : [])];
  const min = Math.min(...prices) * 0.998;
  const max = Math.max(...prices) * 1.002;
  const range = max - min;

  const pct = (v: number) => ((v - min) / range) * 100;

  return (
    <div style={{ position: 'relative', height: 40, marginBottom: 4 }}>
      {/* Track */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        height: 2, background: 'var(--border)', transform: 'translateY(-50%)',
      }} />
      {/* Fill between SL and entry or entry and target */}
      <div style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        left: pct(sl) + '%',
        width: (pct(entry) - pct(sl)) + '%',
        height: 2, background: 'var(--loss)',
      }} />
      {target && (
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          left: pct(entry) + '%',
          width: (pct(target) - pct(entry)) + '%',
          height: 2, background: 'var(--gain)',
        }} />
      )}
      {/* Markers */}
      {[
        { val: sl, label: 'SL', color: 'var(--loss)' },
        { val: entry, label: 'Entry', color: 'var(--foreground)' },
        ...(target ? [{ val: target, label: 'Target', color: 'var(--gain)' }] : []),
      ].map(({ val, label, color }) => (
        <div key={label} style={{ position: 'absolute', left: pct(val) + '%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <div style={{ width: 8, height: 8, background: color, transform: 'rotate(45deg)' }} />
          <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 9, color, fontWeight: 700, letterSpacing: '0.04em' }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
