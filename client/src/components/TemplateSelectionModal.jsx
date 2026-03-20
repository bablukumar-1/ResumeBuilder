import React from 'react';
import { X, LayoutTemplate, Layers, Layout, LayoutPanelLeft, FileText, Briefcase, MinusSquare, Target } from 'lucide-react';

const TEMPLATE_OPTIONS = [
  { id: 'modern', name: 'Modern', icon: LayoutPanelLeft, desc: 'Two-column design with dark sidebar' },
  { id: 'classic', name: 'Classic', icon: FileText, desc: 'Traditional ATS-friendly layout' },
  { id: 'creative', name: 'Creative', icon: LayoutTemplate, desc: 'Bold gradient header and timeline' },
  { id: 'professional', name: 'Professional', icon: Briefcase, desc: 'Dense, structured, corporate style' },
  { id: 'minimal', name: 'Minimal', icon: MinusSquare, desc: 'Clean lines and maximum whitespace' },
  { id: 'bold', name: 'Bold', icon: Target, desc: 'Dark sidebar with timeline accents' },
  { id: 'elegant', name: 'Elegant', icon: Layout, desc: 'Sophisticated with profile photo' },
  { id: 'executive', name: 'Executive', icon: Layers, desc: 'Navy header for senior roles' },
];

export default function TemplateSelectionModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '16px', border: '1px solid var(--border)',
        width: '100%', maxWidth: '900px', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      }}>
        
        {/* Modal Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Choose a Template</h2>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select a starting design for your new resume.</p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer',
            padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} className="hover:bg-slate-800 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body - Grid of Templates */}
        <div style={{ padding: '32px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {TEMPLATE_OPTIONS.map(tpl => {
            const Icon = tpl.icon;
            return (
              <div 
                key={tpl.id}
                onClick={() => onSelect(tpl.id)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '20px',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', transition: 'all 0.2s ease', hoverTitle: 'Select this template'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99,102,241,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  background: 'rgba(99,102,241,0.1)', color: 'var(--accent-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>{tpl.name}</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{tpl.desc}</p>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
