import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { quillModules, quillFormats } from '../../utils/quillModules';

function EduItem({ edu, index, onChange, onRemove }) {
  const [open, setOpen] = useState(true);
  const set = (field, val) => onChange(index, { ...edu, [field]: val });

  return (
    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: open ? 16 : 0, cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
          {edu.institution || edu.degree || `Education ${index + 1}`}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); setOpen(o => !o); }}>{open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>
          <button className="btn btn-danger btn-sm" onClick={e => { e.stopPropagation(); onRemove(index); }}><Trash2 size={14} /></button>
        </div>
      </div>
      {open && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div><label className="label">Institution</label><input className="input" value={edu.institution} onChange={e => set('institution', e.target.value)} placeholder="MIT" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div><label className="label">Degree</label><input className="input" value={edu.degree} onChange={e => set('degree', e.target.value)} placeholder="Bachelor of Science" /></div>
            <div><label className="label">Field of Study</label><input className="input" value={edu.field} onChange={e => set('field', e.target.value)} placeholder="Computer Science" /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div><label className="label">Start Date</label><input className="input" value={edu.startDate} onChange={e => set('startDate', e.target.value)} placeholder="Sep 2018" /></div>
            <div><label className="label">End Date</label><input className="input" value={edu.endDate} onChange={e => set('endDate', e.target.value)} placeholder="May 2022" /></div>
            <div><label className="label">GPA</label><input className="input" value={edu.gpa} onChange={e => set('gpa', e.target.value)} placeholder="3.8" /></div>
          </div>
          <div><label className="label">Description</label>
            <ReactQuill theme="bubble" value={edu.description || ''} onChange={val => set('description', val)} modules={quillModules} formats={quillFormats} placeholder="Relevant coursework, honors, activities..." />
          </div>
        </div>
      )}
    </div>
  );
}

export default function EducationForm({ data, onChange }) {
  const add = () => onChange([...data, { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' }]);
  const update = (i, val) => { const n = [...data]; n[i] = val; onChange(n); };
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="section-title">Education</div>
      {data.map((edu, i) => <EduItem key={i} edu={edu} index={i} onChange={update} onRemove={remove} />)}
      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={add}>
        <Plus size={15} /> Add Education
      </button>
    </div>
  );
}
