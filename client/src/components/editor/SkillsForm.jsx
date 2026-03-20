/* Skills Form – category is now a dropdown instead of free text */
import { Plus, Trash2 } from 'lucide-react';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const LEVEL_COLORS = { Beginner: '#64748b', Intermediate: '#6366f1', Advanced: '#8b5cf6', Expert: '#22c55e' };

const CATEGORIES = [
  'Programming Languages',
  'Web Technologies',
  'Frameworks & Libraries',
  'Databases',
  'Tools & DevOps',
  'Soft Skills',
  'Other',
];

export default function SkillsForm({ data, onChange }) {
  const add = () => onChange([...data, { name: '', level: 'Intermediate', category: 'Programming Languages' }]);
  const update = (i, field, val) => { const n = [...data]; n[i] = { ...n[i], [field]: val }; onChange(n); };
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="section-title">Skills</div>
      <div className="card" style={{ padding: 16 }}>
        {data.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 14 }}>No skills yet. Add your first skill!</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.map((skill, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.4fr auto', gap: 8, alignItems: 'start' }}>
              <div>
                {i === 0 && <div className="label">Skill</div>}
                <input className="input" value={skill.name} onChange={e => update(i, 'name', e.target.value)} placeholder="React" />
              </div>
              <div>
                {i === 0 && <div className="label">Level</div>}
                <select className="input" value={skill.level} onChange={e => update(i, 'level', e.target.value)} style={{ color: LEVEL_COLORS[skill.level] || 'var(--text-primary)' }}>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                {i === 0 && <div className="label">Category</div>}
                <select className="input" value={CATEGORIES.includes(skill.category) ? skill.category : 'Other'} onChange={e => update(i, 'category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ paddingTop: i === 0 ? 22 : 0 }}>
                <button className="btn btn-danger btn-sm" onClick={() => remove(i)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={add}>
          <Plus size={15} /> Add Skill
        </button>
      </div>
    </div>
  );
}
