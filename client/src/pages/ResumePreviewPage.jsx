import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { ArrowLeft, Printer, Pencil, Loader2, FileDown, FileType2 } from 'lucide-react';
import { downloadAsPDF, downloadAsDOC } from '../utils/downloadResume';

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
  bold: BoldTemplate,
  elegant: ElegantTemplate,
  executive: ExecutiveTemplate,
  developer: DeveloperTemplate,
};

export default function ResumePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    API.get(`/resumes/${id}`)
      .then(res => setResume(res.data.resume))
      .catch(() => { toast.error('Failed to load resume'); navigate('/dashboard'); })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ height: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
      </div>
    );
  }

  const Template = TEMPLATES[resume?.template] || ModernTemplate;
  const filename = (resume?.title || 'resume').replace(/\s+/g, '_').toLowerCase();

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setPdfLoading(true);
    try {
      await downloadAsPDF(resumeRef.current, filename);
      toast.success('PDF downloaded!');
    } catch (e) {
      toast.error('PDF download failed. Try Print instead.');
    } finally {
      setPdfLoading(false);
    }
  };

  const handleDownloadDOC = async () => {
    if (!resumeRef.current) return;
    setDocLoading(true);
    try {
      await downloadAsDOC(resumeRef.current, filename);
      toast.success('DOCX downloaded!');
    } catch (e) {
      toast.error('DOCX download failed.');
    } finally {
      setDocLoading(false);
    }
  };

  return (
    <div className="editor-root" style={{ minHeight: '100vh', background: '#94a3b8' }}>
      {/* Preview toolbar – hidden on print */}
      <div className="no-print" style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(15,17,23,0.95)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Back
        </button>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {resume?.title || 'Resume Preview'}
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/resume/${id}`)}>
            <Pencil size={14} /> Edit
          </button>

          {/* Print */}
          <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
            <Printer size={14} /> Print
          </button>

          {/* Download PDF */}
          <button
            className="btn btn-primary btn-sm"
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            style={{ background: '#dc2626', gap: 6 }}
          >
            {pdfLoading
              ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
              : <FileDown size={14} />}
            {pdfLoading ? 'Generating...' : 'Download PDF'}
          </button>

          {/* Download DOC */}
          <button
            className="btn btn-primary btn-sm"
            onClick={handleDownloadDOC}
            disabled={docLoading}
            style={{ background: '#1d4ed8', gap: 6 }}
          >
            {docLoading
              ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
              : <FileType2 size={14} />}
            {docLoading ? 'Generating...' : 'Download DOC'}
          </button>
        </div>
      </div>

      {/* Resume page */}
      <div className="print-preview-container" style={{ padding: '32px 24px', display: 'flex', justifyContent: 'center' }}>
        <div
          ref={resumeRef}
          className="print-page"
          style={{
            width: 794,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            background: '#fff',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {resume && <Template resume={resume} />}
        </div>
      </div>
    </div>
  );
}
