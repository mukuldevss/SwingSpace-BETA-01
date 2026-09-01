export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '20px 24px',
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 20, height: 20,
            background: '#008f6e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 8L4 5L6 7L9 3" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13, color: 'var(--foreground)' }}>
            SwingSpace
          </span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>
          Vibe coded by Mukuldev S S
        </p>
      </div>
    </footer>
  );
}
