import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ResumeCard from '../components/ResumeCard';
import TemplateSelectionModal from '../components/TemplateSelectionModal';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, FileText, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const res = await API.get('/resumes');
      setResumes(res.data.resumes || []);
      
      // Check for pending template from landing page
      const pendingTemplate = localStorage.getItem('pendingTemplate');
      if (pendingTemplate) {
        localStorage.removeItem('pendingTemplate');
        handleCreateNew(pendingTemplate);
      }
    } catch {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResumes(); }, []);

  const handleCreateNew = async (templateId) => {
    setShowTemplateModal(false);
    try {
      const res = await API.post('/resumes', { title: 'My Resume', template: templateId });
      navigate(`/resume/${res.data.resume._id}`);
    } catch {
      toast.error('Failed to create resume');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume? This cannot be undone.')) return;
    try {
      await API.delete(`/resumes/${id}`);
      setResumes(prev => prev.filter(r => r._id !== id));
      toast.success('Resume deleted');
    } catch {
      toast.error('Failed to delete resume');
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const res = await API.post(`/resumes/${id}/duplicate`);
      setResumes(prev => [res.data.resume, ...prev]);
      toast.success('Resume duplicated!');
    } catch {
      toast.error('Failed to duplicate resume');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
              My Resumes
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {resumes.length} resume{resumes.length !== 1 ? 's' : ''} created
            </p>
          </div>
          <button onClick={() => setShowTemplateModal(true)} className="btn btn-primary" id="new-resume-btn" style={{ gap: 8 }}>
            <Plus size={17} /> New Resume
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
          </div>
        ) : resumes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: 'var(--bg-card)',
            borderRadius: 16,
            border: '2px dashed var(--border)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'rgba(99,102,241,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <FileText size={28} color="var(--accent-light)" />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>No resumes yet</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 24 }}>
              Create your first resume and land your dream job
            </p>
            <button onClick={() => setShowTemplateModal(true)} className="btn btn-primary">
              <Plus size={16} /> Create Resume
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 18,
          }}>
            {resumes.map(r => (
              <ResumeCard
                key={r._id}
                resume={r}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        )}
      </main>

      <TemplateSelectionModal 
        isOpen={showTemplateModal} 
        onClose={() => setShowTemplateModal(false)}
        onSelect={handleCreateNew} 
      />
    </div>
  );
}
