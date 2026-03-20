import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme, THEMES } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="no-print" style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9998,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10
    }}>
      {/* Theme options */}
      {open && (
        <div style={{
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          borderRadius: 16, padding: '12px', display: 'flex', flexDirection: 'column', gap: 8,
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)', animation: 'fadeIn 0.2s ease'
        }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 4px 4px' }}>
            Color Theme
          </span>
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                borderRadius: 10, border: theme === t.id ? `2px solid ${t.color}` : '2px solid transparent',
                background: theme === t.id ? `${t.color}22` : 'var(--bg-card)',
                cursor: 'pointer', transition: 'all 0.15s ease', width: '100%',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${t.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.background = theme === t.id ? `${t.color}22` : 'var(--bg-card)'; }}
            >
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                {t.emoji} {t.label}
              </span>
              {theme === t.id && <span style={{ marginLeft: 'auto', color: t.color, fontSize: '0.75rem' }}>✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Change Theme"
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'var(--accent)', color: '#fff',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
        }}
      >
        <Palette size={22} />
      </button>
    </div>
  );
}
