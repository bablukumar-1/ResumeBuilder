import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import SummaryForm from '../components/editor/SummaryForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import CertificationsForm from '../components/editor/CertificationsForm';
import FontSettingsForm, { DEFAULT_FONT_SETTINGS } from '../components/editor/FontSettingsForm';
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import BoldTemplate from '../components/templates/BoldTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import DeveloperTemplate from '../components/templates/DeveloperTemplate';
import API from '../api/axios';
import toast from 'react-hot-toast';
import {
  User, AlignLeft, Briefcase, GraduationCap, Zap, FolderOpen, Award,
  Eye, Save, Printer, ChevronLeft, Loader2, FileDown, FileType2, Settings
} from 'lucide-react';
import { downloadAsPDF, downloadAsDOC } from '../utils/downloadResume';

const SECTIONS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'summary', label: 'Summary', icon: AlignLeft },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'design', label: 'Design', icon: Settings },
];

const TEMPLATES = [
  { id: 'modern', label: 'Modern', Component: ModernTemplate },
  { id: 'classic', label: 'Classic', Component: ClassicTemplate },
  { id: 'creative', label: 'Creative', Component: CreativeTemplate },
  { id: 'professional', label: 'Professional', Component: ProfessionalTemplate },
  { id: 'minimal', label: 'Minimal', Component: MinimalTemplate },
  { id: 'bold', label: 'Bold', Component: BoldTemplate },
  { id: 'elegant', label: 'Elegant', Component: ElegantTemplate },
  { id: 'executive', label: 'Executive', Component: ExecutiveTemplate },
  { id: 'developer', label: 'Developer', Component: DeveloperTemplate },
];

const EMPTY = {
  title: 'My Resume',
  template: 'modern',
  personalInfo: { firstName: '', lastName: '', jobTitle: '', email: '', phone: '', address: '', city: '', state: '', country: '', linkedin: '', github: '', website: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  fontSettings: DEFAULT_FONT_SETTINGS,
};

export default function ResumeEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(EMPTY);
  const [activeSection, setActiveSection] = useState('personal');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const autoSaveTimer = useRef(null);
  const isDirty = useRef(false);
  const previewRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);

  // Load resume
  useEffect(() => {
    // Inject Poppins font from Google Fonts
    if (!document.getElementById('poppins-font')) {
      const link = document.createElement('link');
      link.id = 'poppins-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Montserrat:wght@400;700&family=Raleway:wght@400;700&display=swap';
      document.head.appendChild(link);
    }
    if (id) {
      API.get(`/resumes/${id}`)
        .then(res => { setResume(res.data.resume); })
        .catch(() => { toast.error('Failed to load resume'); navigate('/dashboard'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, navigate]);

  // Auto-save every 5 seconds when dirty
  const save = useCallback(async (data = resume, showToast = false) => {
    if (!id) return;
    setSaving(true);
    try {
      await API.put(`/resumes/${id}`, data);
      isDirty.current = false;
      if (showToast) toast.success('Saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }, [id, resume]);

  // Schedule auto-save when resume changes
  useEffect(() => {
    if (!id || !isDirty.current) return;
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => { save(resume, false); }, 5000);
    return () => clearTimeout(autoSaveTimer.current);
  }, [resume, id, save]);

  const update = (field, value) => {
    isDirty.current = true;
    setResume(prev => ({ ...prev, [field]: value }));
  };

  const updateTitle = (title) => {
    isDirty.current = true;
    setResume(prev => ({ ...prev, title }));
  };

  const setTemplate = (t) => {
    isDirty.current = true;
    setResume(prev => ({ ...prev, template: t }));
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setPdfLoading(true);
    try {
      await downloadAsPDF(previewRef.current, (resume.title || 'resume').replace(/\s+/g, '_').toLowerCase());
      toast.success('PDF downloaded!');
    } catch { toast.error('PDF download failed. Try Print instead.'); }
    finally { setPdfLoading(false); }
  };

  const handleDownloadDOC = async () => {
    if (!previewRef.current) return;
    setDocLoading(true);
    try {
      await downloadAsDOC(previewRef.current, (resume.title || 'resume').replace(/\s+/g, '_').toLowerCase());
      toast.success('DOCX downloaded!');
    } catch { toast.error('DOCX download failed.'); }
    finally { setDocLoading(false); }
  };

  const ActiveTemplate = TEMPLATES.find(t => t.id === resume.template)?.Component || ModernTemplate;

  if (loading) {
    return (
      <div style={{ height: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="editor-root" style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="no-print"><Navbar /></div>

      {/* Editor Topbar */}
      <div className="no-print" style={{
        background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)',
        padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')} style={{ gap: 6 }}>
          <ChevronLeft size={16} /> Back
        </button>

        <input
          className="input"
          value={resume.title}
          onChange={e => updateTitle(e.target.value)}
          style={{ width: 200, padding: '6px 10px', fontSize: '0.875rem', fontWeight: 600 }}
          placeholder="Resume title..."
          id="resume-title-input"
        />

        {/* Template switcher */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', padding: 3, borderRadius: 8, border: '1px solid var(--border)' }}>
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              className={`btn btn-sm ${resume.template === t.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setTemplate(t.id)}
              style={{ padding: '4px 10px' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {/* Mobile preview toggle */}
          <button
            className={`btn btn-sm ${showPreview ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowPreview(v => !v)}
            style={{ display: 'none' }}
            id="preview-toggle"
          >
            <Eye size={14} /> Preview
          </button>

          <button className="btn btn-secondary btn-sm" onClick={() => save(resume, true)} disabled={saving}>
            {saving ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Saving...</> : <><Save size={14} /> Save</>}
          </button>

          <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/resume/${id}/preview`)}>
            <Eye size={14} /> Preview
          </button>

          <button className="btn btn-ghost btn-sm" onClick={() => window.print()}>
            <Printer size={14} /> Print
          </button>

          {/* Download PDF */}
          <button
            className="btn btn-sm"
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            style={{ background: '#dc2626', color: '#fff', gap: 6 }}
          >
            {pdfLoading
              ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> PDF...</>
              : <><FileDown size={13} /> PDF</>}
          </button>

          {/* Download DOC */}
          <button
            className="btn btn-sm"
            onClick={handleDownloadDOC}
            disabled={docLoading}
            style={{ background: '#1d4ed8', color: '#fff', gap: 6 }}
          >
            {docLoading
              ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> DOC...</>
              : <><FileType2 size={13} /> DOC</>}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="editor-body" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar nav */}
        <div className="no-print" style={{
          width: 180, flexShrink: 0, background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)',
          padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto',
        }}>
          {SECTIONS.map(s => {
            const Icon = s.icon;
            const active = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: active ? 600 : 400,
                  background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: active ? 'var(--accent-light)' : 'var(--text-secondary)',
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {s.label}
                {active && <div style={{ marginLeft: 'auto', width: 3, height: 3, borderRadius: '50%', background: 'var(--accent)' }} />}
              </button>
            );
          })}
        </div>

        {/* Form panel */}
        <div className="no-print" style={{ width: 380, flexShrink: 0, overflowY: 'auto', padding: '18px 16px', borderRight: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
          {activeSection === 'personal' && (
            <PersonalInfoForm data={resume.personalInfo} onChange={v => update('personalInfo', v)} />
          )}
          {activeSection === 'summary' && (
            <SummaryForm data={resume.summary} onChange={v => update('summary', v)} />
          )}
          {activeSection === 'experience' && (
            <ExperienceForm data={resume.experience} onChange={v => update('experience', v)} />
          )}
          {activeSection === 'education' && (
            <EducationForm data={resume.education} onChange={v => update('education', v)} />
          )}
          {activeSection === 'skills' && (
            <SkillsForm data={resume.skills} onChange={v => update('skills', v)} />
          )}
          {activeSection === 'projects' && (
            <ProjectsForm data={resume.projects} onChange={v => update('projects', v)} />
          )}
          {activeSection === 'certifications' && (
            <CertificationsForm data={resume.certifications} onChange={v => update('certifications', v)} />
          )}
          {activeSection === 'design' && (
            <FontSettingsForm
              data={resume.fontSettings}
              onChange={v => update('fontSettings', v)}
            />
          )}
        </div>

        {/* Live Preview */}
        <div className="print-preview-container" style={{ flex: 1, overflowY: 'auto', background: '#94a3b8', padding: '24px' }}>
          <div ref={previewRef} className="print-page" style={{ maxWidth: 794, margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
            <ActiveTemplate resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
