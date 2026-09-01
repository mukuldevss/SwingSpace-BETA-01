import { useRef } from 'react';
import type { View, Theme } from '../types';
import type { Position } from '../types';
import { exportJSON, importJSON } from '../utils';

interface HeaderProps {
  view: View;
  setView: (v: View) => void;
  theme: Theme;
  toggleTheme: () => void;
  positions: Position[];
  onImport: (positions: Position[]) => void;
}

export default function Header({ view, setView, theme, toggleTheme, positions, onImport }: HeaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const tabs: { id: View; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'positions', label: 'Positions' },
    { id: 'add', label: 'New Position' },
  ];

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importJSON(file);
      onImport(imported);
    } catch {
      alert('Invalid file. Please select a valid SwingSpace JSON export.');
    }
    e.target.value = '';
  };

  const isActive = (tabId: View) => view === tabId || (view === 'detail' && tabId === 'positions');

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'var(--background)',
      padding: '12px 24px',
    }}>
      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        background: theme === 'dark' ? '#161615' : '#161615',
        borderRadius: 37,
        border: '1px solid #2c2c29',
        display: 'flex',
        alignItems: 'center',
        height: 56,
        padding: '0 24px',
      }}>
        {/* Logo */}
        <button
          onClick={() => setView('dashboard')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: 0, flexShrink: 0 }}
        >
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L6 7L9 10L13 4" stroke="#00C896" strokeWidth="2" strokeLinecap="square"/>
              <path d="M11 4H13V6" stroke="#00C896" strokeWidth="2" strokeLinecap="square"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#efefed' }}>Swing</span>
            <span style={{ color: '#00c896' }}>Space</span>
          </span>
        </button>

        {/* Nav tabs — centered */}
        <nav style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive(tab.id) ? '2px solid #00c896' : '2px solid transparent',
                cursor: 'pointer',
                padding: '6px 0',
                fontSize: 13,
                fontWeight: isActive(tab.id) ? 600 : 400,
                color: isActive(tab.id) ? '#efefed' : '#7a7a77',
                letterSpacing: '0.01em',
                transition: 'all 0.15s ease',
                marginBottom: -1,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { if (!isActive(tab.id)) (e.currentTarget as HTMLElement).style.color = '#efefed'; }}
              onMouseLeave={(e) => { if (!isActive(tab.id)) (e.currentTarget as HTMLElement).style.color = '#7a7a77'; }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />

          {/* Import */}
          <button
            onClick={() => fileRef.current?.click()}
            title="Import JSON"
            style={{
              background: 'none',
              border: '1px solid #2c2c29',
              borderRadius: 9999,
              cursor: 'pointer',
              width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7a7a77',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#efefed'; (e.currentTarget as HTMLElement).style.borderColor = '#4a4a47'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#7a7a77'; (e.currentTarget as HTMLElement).style.borderColor = '#2c2c29'; }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1v9M4 7l3.5 3.5L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              <path d="M2 11v2h11v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>

          {/* Export */}
          <button
            onClick={() => exportJSON(positions)}
            title="Export JSON"
            style={{
              background: 'none',
              border: '1px solid #2c2c29',
              borderRadius: 9999,
              cursor: 'pointer',
              width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7a7a77',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#efefed'; (e.currentTarget as HTMLElement).style.borderColor = '#4a4a47'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#7a7a77'; (e.currentTarget as HTMLElement).style.borderColor = '#2c2c29'; }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 10V1M4 4l3.5-3.5L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              <path d="M2 11v2h11v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7a7a77',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#efefed'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#7a7a77'; }}
          >
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7.5 1V2M7.5 13V14M1 7.5H2M13 7.5H14M3 3L3.7 3.7M11.3 11.3L12 12M11.3 3.7L11 3.4M3 11.3L3.7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M12.5 9C11.63 9.08 10.75 8.96 9.93 8.66C9.1 8.36 8.35 7.88 7.73 7.27C7.12 6.65 6.64 5.9 6.34 5.08C6.04 4.25 5.92 3.37 6 2.5C5.09 1.9 4.05 1.56 2.96 1.51C1.88 1.46 0.8 1.7 -0.15 2.21C-1.11 2.73 -1.91 3.49 -2.47 4.42C-3.02 5.35 -3.32 6.42 -3.32 7.5C-3.32 8.58 -3.02 9.65 -2.47 10.58C-1.91 11.51 -1.11 12.27 -0.15 12.79C0.8 13.3 1.88 13.54 2.96 13.49C4.05 13.44 5.09 13.1 6 12.5C7.32 12.73 8.68 12.51 9.86 11.88C11.03 11.24 11.97 10.23 12.5 9Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
