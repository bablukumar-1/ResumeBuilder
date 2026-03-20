import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function CertItem({ cert, index, onChange, onRemove }) {
  const [open, setOpen] = useState(true);
  const set = (field, val) => onChange(index, { ...cert, [field]: val });

  return (
    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: open ? 16 : 0, cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{cert.name || `Certification ${index + 1}`}</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); setOpen(o => !o); }}>{open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>
          <button className="btn btn-danger btn-sm" onClick={e => { e.stopPropagation(); onRemove(index); }}><Trash2 size={14} /></button>
        </div>
      </div>
      {open && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div><label className="label">Certification Name</label><input className="input" value={cert.name} onChange={e => set('name', e.target.value)} placeholder="AWS Solutions Architect" /></div>
            <div><label className="label">Issuer</label><input className="input" value={cert.issuer} onChange={e => set('issuer', e.target.value)} placeholder="Amazon Web Services" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div><label className="label">Issue Date</label><input className="input" value={cert.date} onChange={e => set('date', e.target.value)} placeholder="Mar 2023" /></div>
            <div><label className="label">Expiry Date</label><input className="input" value={cert.expiryDate} onChange={e => set('expiryDate', e.target.value)} placeholder="Mar 2026" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div><label className="label">Credential ID</label><input className="input" value={cert.credentialId} onChange={e => set('credentialId', e.target.value)} placeholder="ABC123" /></div>
            <div><label className="label">Credential URL</label><input className="input" value={cert.credentialUrl} onChange={e => set('credentialUrl', e.target.value)} placeholder="https://..." /></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CertificationsForm({ data, onChange }) {
  const add = () => onChange([...data, { name: '', issuer: '', date: '', expiryDate: '', credentialId: '', credentialUrl: '' }]);
  const update = (i, val) => { const n = [...data]; n[i] = val; onChange(n); };
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="section-title">Certifications</div>
      {data.map((c, i) => <CertItem key={i} cert={c} index={i} onChange={update} onRemove={remove} />)}
      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={add}><Plus size={15} /> Add Certification</button>
    </div>
  );
}
