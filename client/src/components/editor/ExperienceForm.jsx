import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { quillModules, quillFormats } from '../../utils/quillModules';

function ExperienceItem({ exp, index, onChange, onRemove }) {
  const [open, setOpen] = useState(true);
  const set = (field, val) => onChange(index, { ...exp, [field]: val });

  return (
    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: open ? 16 : 0, cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
          {exp.company || exp.position || `Experience ${index + 1}`}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}>
            {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); onRemove(index); }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      {open && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div><label className="label">Company</label><input className="input" value={exp.company} onChange={e => set('company', e.target.value)} placeholder="Google" /></div>
            <div><label className="label">Position</label><input className="input" value={exp.position} onChange={e => set('position', e.target.value)} placeholder="Software Engineer" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div><label className="label">Location</label><input className="input" value={exp.location} onChange={e => set('location', e.target.value)} placeholder="New York, NY" /></div>
            <div><label className="label">Start Date</label><input className="input" value={exp.startDate} onChange={e => set('startDate', e.target.value)} placeholder="Jan 2022" /></div>
            <div><label className="label">End Date</label><input className="input" value={exp.endDate} onChange={e => set('endDate', e.target.value)} placeholder="Present" disabled={exp.current} /></div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={exp.current} onChange={e => set('current', e.target.checked)} style={{ accentColor: 'var(--accent)' }} />
            Currently working here
          </label>
          <div><label className="label">Description</label>
            <ReactQuill theme="bubble" value={exp.description || ''} onChange={val => set('description', val)} modules={quillModules} formats={quillFormats} placeholder="Describe your responsibilities and achievements..." />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExperienceForm({ data, onChange }) {
  const add = () => onChange([...data, { company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }]);
  const update = (i, val) => { const n = [...data]; n[i] = val; onChange(n); };
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="section-title">Work Experience</div>
      {data.map((exp, i) => <ExperienceItem key={i} exp={exp} index={i} onChange={update} onRemove={remove} />)}
      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={add}>
        <Plus size={15} /> Add Experience
      </button>
    </div>
  );
}
