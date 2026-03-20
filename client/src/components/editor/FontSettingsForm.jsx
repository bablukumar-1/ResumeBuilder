/* FontSettingsForm – control heading (Poppins) and description (Calibri) font sizes */

const SizeControl = ({ value, onChange, min = 8, max = 40, step = 0.5 }) => (
  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', background: 'var(--bg-card)', height: '36px' }}>
    <button 
      type="button" 
      onClick={() => onChange(Math.max(min, value - step))}
      style={{ padding: '0 12px', height: '100%', background: 'var(--bg-color)', border: 'none', borderRight: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
      onMouseOver={e => e.currentTarget.style.background = 'var(--border)'}
      onMouseOut={e => e.currentTarget.style.background = 'var(--bg-color)'}
    >
      -
    </button>
    <input 
      type="number" 
      value={value} 
      onChange={e => {
        let val = parseFloat(e.target.value);
        if (!isNaN(val)) onChange(val);
      }}
      step={step}
      min={min}
      max={max}
      className="hide-spinners"
      style={{ width: '100%', border: 'none', textAlign: 'center', background: 'transparent', color: 'var(--text-primary)', outline: 'none', padding: '0 4px', fontSize: '14px', margin: 0 }}
    />
    <button 
      type="button" 
      onClick={() => onChange(Math.min(max, value + step))}
      style={{ padding: '0 12px', height: '100%', background: 'var(--bg-color)', border: 'none', borderLeft: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
      onMouseOver={e => e.currentTarget.style.background = 'var(--border)'}
      onMouseOut={e => e.currentTarget.style.background = 'var(--bg-color)'}
    >
      +
    </button>
  </div>
);

export const DEFAULT_FONT_SETTINGS = {
  headingFont: 'Poppins',
  headingSize: 16,
  descFont: 'Calibri, Arial, sans-serif',
  descSize: 11,
  iconSize: 14,
};

export default function FontSettingsForm({ data = {}, onChange }) {
  const s = { ...DEFAULT_FONT_SETTINGS, ...data };
  const set = (key, val) => onChange({ ...s, [key]: val });

  const labelStyle = { fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 3 };
  const rowStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 };

  return (
    <div>
      <style>{`
        .hide-spinners::-webkit-inner-spin-button, 
        .hide-spinners::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        .hide-spinners {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className="section-title">Font &amp; Size Settings</div>
      <div className="card" style={{ padding: 18 }}>

        {/* Heading / Title */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>🅷</span> Heading &amp; Title Font
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>Font Family</div>
              <select className="input" value={s.headingFont} onChange={e => set('headingFont', e.target.value)}>
                <option value="Poppins">Poppins</option>
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Raleway">Raleway</option>
                <option value="Lato">Lato</option>
              </select>
            </div>
            <div>
              <div style={labelStyle}>Size (px)</div>
              <SizeControl value={s.headingSize} onChange={val => set('headingSize', val)} min={10} max={36} step={1} />
            </div>
          </div>
          <div style={{ marginTop: 8, padding: '8px 10px', background: 'var(--bg-card)', borderRadius: 6, border: '1px solid var(--border)' }}>
            <span style={{ fontFamily: s.headingFont === 'Poppins' ? 'Poppins, sans-serif' : s.headingFont + ', sans-serif', fontSize: s.headingSize, fontWeight: 700, color: 'var(--text-primary)' }}>
              Heading Preview
            </span>
          </div>
        </div>

        {/* Description / Body */}
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>📝</span> Description / Body Font
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>Font Family</div>
              <select className="input" value={s.descFont} onChange={e => set('descFont', e.target.value)}>
                <option value="Calibri, Arial, sans-serif">Calibri</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Inter, sans-serif">Inter</option>
                <option value="Times New Roman, serif">Times New Roman</option>
              </select>
            </div>
            <div>
              <div style={labelStyle}>Size (px)</div>
              <SizeControl value={s.descSize} onChange={val => set('descSize', val)} min={8} max={20} step={0.5} />
            </div>
          </div>
          <div style={{ marginTop: 8, padding: '8px 10px', background: 'var(--bg-card)', borderRadius: 6, border: '1px solid var(--border)' }}>
            <span style={{ fontFamily: s.descFont, fontSize: s.descSize, color: 'var(--text-secondary)' }}>
              This is how your description text will look in the resume. Calibri is clean and professional.
            </span>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>🎨</span> Icon Size Settings
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>Size (px)</div>
              <SizeControl value={s.iconSize} onChange={val => set('iconSize', val)} min={8} max={30} step={1} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>📐</span> Page Margins (px)
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>Top</div>
              <SizeControl value={s.marginTop ?? 30} onChange={val => set('marginTop', val)} min={0} max={100} step={2} />
            </div>
            <div>
              <div style={labelStyle}>Bottom</div>
              <SizeControl value={s.marginBottom ?? 30} onChange={val => set('marginBottom', val)} min={0} max={100} step={2} />
            </div>
            <div style={{ marginTop: 4 }}>
              <div style={labelStyle}>Left</div>
              <SizeControl value={s.marginLeft ?? 30} onChange={val => set('marginLeft', val)} min={0} max={100} step={2} />
            </div>
            <div style={{ marginTop: 4 }}>
              <div style={labelStyle}>Right</div>
              <SizeControl value={s.marginRight ?? 30} onChange={val => set('marginRight', val)} min={0} max={100} step={2} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>↕️</span> Layout Spacing
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>Line Height</div>
              <SizeControl value={s.lineHeight ?? 1.5} onChange={val => set('lineHeight', val)} min={1.0} max={2.5} step={0.1} />
            </div>
            <div>
              <div style={labelStyle}>Section Gap (px)</div>
              <SizeControl value={s.sectionGap ?? 16} onChange={val => set('sectionGap', val)} min={2} max={40} step={2} />
            </div>
            <div style={{ marginTop: 4 }}>
              <div style={labelStyle}>Item Gap (px)</div>
              <SizeControl value={s.itemGap ?? 8} onChange={val => set('itemGap', val)} min={0} max={30} step={2} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: '0.75rem', color: 'var(--text-muted)', padding: '6px 8px', background: 'rgba(99,102,241,0.06)', borderRadius: 6 }}>
          💡 Changes apply to all sections in the live preview instantly.
        </div>
      </div>
    </div>
  );
}
