import { Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { quillModules, quillFormats } from '../../utils/quillModules';

function ProjectItem({ project, index, onChange, onRemove }) {
  const [open, setOpen] = useState(true);
  const [techInput, setTechInput] = useState('');
  const set = (field, val) => onChange(index, { ...project, [field]: val });

  const addTech = () => {
    if (!techInput.trim()) return;
    set('techStack', [...(project.techStack || []), techInput.trim()]);
    setTechInput('');
  };
  const removeTech = (t) => set('techStack', (project.techStack || []).filter(x => x !== t));

  return (
    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: open ? 16 : 0, cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{project.name || `Project ${index + 1}`}</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); setOpen(o => !o); }}>{open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>
          <button className="btn btn-danger btn-sm" onClick={e => { e.stopPropagation(); onRemove(index); }}><Trash2 size={14} /></button>
        </div>
      </div>
      {open && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div><label className="label">Project Name</label><input className="input" value={project.name} onChange={e => set('name', e.target.value)} placeholder="E-Commerce Platform" /></div>
          <div><label className="label">Description</label>
            <ReactQuill theme="bubble" value={project.description || ''} onChange={val => set('description', val)} modules={quillModules} formats={quillFormats} placeholder="Brief description of the project and your contributions..." />
          </div>
          <div>
            <label className="label">Tech Stack</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {(project.techStack || []).map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)', padding: '3px 10px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 500 }}>
                  {t}
                  <button onClick={() => removeTech(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}><X size={12} /></button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="React, Node.js..." style={{ flex: 1 }} />
              <button className="btn btn-secondary btn-sm" onClick={addTech}><Plus size={14} /></button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div><label className="label">Live URL</label><input className="input" value={project.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://example.com" /></div>
            <div><label className="label">GitHub URL</label><input className="input" value={project.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/..." /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div><label className="label">Start Date</label><input className="input" value={project.startDate} onChange={e => set('startDate', e.target.value)} placeholder="Jan 2023" /></div>
            <div><label className="label">End Date</label><input className="input" value={project.endDate} onChange={e => set('endDate', e.target.value)} placeholder="Mar 2023" /></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsForm({ data, onChange }) {
  const add = () => onChange([...data, { name: '', description: '', techStack: [], liveUrl: '', githubUrl: '', startDate: '', endDate: '' }]);
  const update = (i, val) => { const n = [...data]; n[i] = val; onChange(n); };
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="section-title">Projects</div>
      {data.map((p, i) => <ProjectItem key={i} project={p} index={i} onChange={update} onRemove={remove} />)}
      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={add}><Plus size={15} /> Add Project</button>
    </div>
  );
}
