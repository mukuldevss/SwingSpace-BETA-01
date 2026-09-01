import { useState, useEffect } from 'react';
import type { Position, View, Theme } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Positions from './components/Positions';
import AddPosition from './components/AddPosition';
import PositionDetail from './components/PositionDetail';

const STORAGE_KEY = 'swingspace_positions';
const THEME_KEY = 'swingspace_theme';

const SAMPLE_POSITIONS: Position[] = [
  {
    id: 'sample-1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    exchange: 'NSE',
    side: 'long',
    quantity: 50,
    entryPrice: 2950,
    stopLoss: 2860,
    target: 3150,
    ltp: 3020,
    status: 'open',
    entryDate: '2025-07-28',
    notes: 'Breakout from 3-month consolidation. Support at 2860.',
  },
  {
    id: 'sample-2',
    symbol: 'INFY',
    name: 'Infosys Ltd',
    exchange: 'NSE',
    side: 'long',
    quantity: 100,
    entryPrice: 1580,
    stopLoss: 1520,
    target: 1720,
    ltp: 1648,
    status: 'open',
    entryDate: '2025-08-01',
    notes: 'Earnings catalyst. Risk defined at 3.8%.',
  },
  {
    id: 'sample-3',
    symbol: 'TATASTEEL',
    name: 'Tata Steel Ltd',
    exchange: 'NSE',
    side: 'long',
    quantity: 500,
    entryPrice: 168,
    stopLoss: 158,
    target: 192,
    ltp: 174,
    status: 'open',
    entryDate: '2025-08-05',
    notes: 'Metal sector strength. China stimulus play.',
  },
  {
    id: 'sample-4',
    symbol: 'AXISBANK',
    name: 'Axis Bank Ltd',
    exchange: 'NSE',
    side: 'short',
    quantity: 150,
    entryPrice: 1045,
    stopLoss: 1090,
    target: 960,
    ltp: 1018,
    status: 'open',
    entryDate: '2025-08-08',
    notes: 'Distribution pattern near resistance. Banking sector weakness.',
  },
  {
    id: 'sample-5',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    exchange: 'NSE',
    side: 'long',
    quantity: 75,
    entryPrice: 1620,
    stopLoss: 1560,
    target: 1760,
    status: 'closed',
    entryDate: '2025-07-10',
    closeDate: '2025-07-24',
    closePrice: 1718,
    notes: 'Clean breakout play. Target 1 hit.',
  },
  {
    id: 'sample-6',
    symbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical Industries Ltd',
    exchange: 'NSE',
    side: 'long',
    quantity: 80,
    entryPrice: 1250,
    stopLoss: 1200,
    target: 1380,
    status: 'closed',
    entryDate: '2025-07-15',
    closeDate: '2025-07-20',
    closePrice: 1192,
    notes: 'Stopped out. News-based gap down.',
  },
  {
    id: 'sample-7',
    symbol: 'WIPRO',
    name: 'Wipro Ltd',
    exchange: 'NSE',
    side: 'long',
    quantity: 200,
    entryPrice: 480,
    stopLoss: 458,
    target: 528,
    status: 'closed',
    entryDate: '2025-07-03',
    closeDate: '2025-07-18',
    closePrice: 522,
    notes: 'IT sector momentum. Partial profit at 510.',
  },
  {
    id: 'sample-8',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    exchange: 'NSE',
    side: 'long',
    quantity: 120,
    entryPrice: 920,
    stopLoss: 880,
    target: 1020,
    status: 'closed',
    entryDate: '2025-06-20',
    closeDate: '2025-07-08',
    closePrice: 1008,
    notes: 'EV narrative. Strong quarterly numbers.',
  },
];

function loadPositions(): Position[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return SAMPLE_POSITIONS;
}

function savePositions(positions: Position[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
}

function loadTheme(): Theme {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === 'dark' || raw === 'light') return raw;
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [positions, setPositions] = useState<Position[]>(loadPositions);
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [view, setView] = useState<View>('dashboard');
  const [detailId, setDetailId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    savePositions(positions);
  }, [positions]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const handleAdd = (p: Position) => {
    setPositions((prev) => [p, ...prev]);
    setView('positions');
  };

  const handleUpdate = (updated: Position) => {
    setPositions((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleUpdateAll = (all: Position[]) => {
    setPositions(all);
  };

  const handleDelete = (id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
    setView('positions');
    setDetailId(null);
  };

  const handleNavigateDetail = (id: string) => {
    setDetailId(id);
    setView('detail');
  };

  const handleImport = (imported: Position[]) => {
    if (window.confirm(`Import ${imported.length} positions? This will replace all current data.`)) {
      setPositions(imported);
    }
  };

  const handleSetView = (v: View) => {
    setView(v);
    if (v !== 'detail') setDetailId(null);
  };

  const detailPosition = detailId ? positions.find((p) => p.id === detailId) : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
      <Header
        view={view}
        setView={handleSetView}
        theme={theme}
        toggleTheme={toggleTheme}
        positions={positions}
        onImport={handleImport}
      />

      <main style={{ flex: 1, maxWidth: 1300, width: '100%', margin: '0 auto', padding: '92px 24px 48px', boxSizing: 'border-box' }}>
        {view === 'dashboard' && (
          <Dashboard positions={positions} onNavigateDetail={handleNavigateDetail} />
        )}

        {view === 'positions' && (
          <Positions
            positions={positions}
            onNavigateDetail={handleNavigateDetail}
            onUpdate={handleUpdateAll}
            onNavigateAdd={() => setView('add')}
          />
        )}

        {view === 'add' && (
          <AddPosition onAdd={handleAdd} onCancel={() => setView('positions')} />
        )}

        {view === 'detail' && detailPosition && (
          <PositionDetail
            key={detailPosition.id}
            position={detailPosition}
            onBack={() => { setView('positions'); setDetailId(null); }}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}

        {view === 'detail' && !detailPosition && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>Position not found.</p>
            <button onClick={() => setView('positions')} style={{ marginTop: 16, padding: '8px 20px', background: 'var(--foreground)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', fontSize: 13 }}>
              Back to Positions
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
