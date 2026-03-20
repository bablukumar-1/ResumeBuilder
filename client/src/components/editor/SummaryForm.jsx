import ReactQuill from 'react-quill';
import { quillModules, quillFormats } from '../../utils/quillModules';
export default function SummaryForm({ data, onChange }) {
  return (
    <div>
      <div className="section-title">Professional Summary</div>
      <div className="card" style={{ padding: 16 }}>
        <label className="label">Summary</label>
        <ReactQuill 
          theme="snow" 
          value={data || ''} 
          onChange={val => onChange(val)} 
          modules={quillModules}
          formats={quillFormats}
          placeholder="A passionate software engineer with 5+ years of experience building scalable web applications. Adept at turning complex problems into elegant solutions..." 
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
          Tip: Write 3–5 sentences highlighting your key skills, years of experience, and career goals.
        </p>
      </div>
    </div>
  );
}
