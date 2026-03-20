import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Pencil, Trash2, Copy, Eye, FileText } from 'lucide-react';

const TEMPLATE_COLORS = {
  modern: { bg: 'rgba(99,102,241,0.15)', text: '#818cf8' },
  classic: { bg: 'rgba(34,197,94,0.12)', text: '#4ade80' },
  creative: { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24' },
};

export default function ResumeCard({ resume, onDelete, onDuplicate }) {
  const navigate = useNavigate();
  const templateColor = TEMPLATE_COLORS[resume.template] || TEMPLATE_COLORS.modern;

  const fullName = [resume.personalInfo?.firstName, resume.personalInfo?.lastName].filter(Boolean).join(' ');
  const jobTitle = resume.personalInfo?.jobTitle;

  const dateStr = resume.updatedAt
    ? (() => { try { return format(new Date(resume.updatedAt), 'MMM d, yyyy'); } catch { return ''; } })()
    : '';

  return (
    <div className="card animate-fade-in" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <FileText size={20} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {resume.title || 'Untitled Resume'}
          </h3>
          {fullName && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fullName}{jobTitle ? ` • ${jobTitle}` : ''}
            </p>
          )}
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span className="badge" style={{ background: templateColor.bg, color: templateColor.text }}>
          {resume.template || 'modern'}
        </span>
        {dateStr && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Updated {dateStr}
          </span>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate(`/resume/${resume._id}`)}
          className="btn btn-primary btn-sm"
          style={{ flex: 1 }}
        >
          <Pencil size={13} /> Edit
        </button>
        <button
          onClick={() => navigate(`/resume/${resume._id}/preview`)}
          className="btn btn-secondary btn-sm"
        >
          <Eye size={13} />
        </button>
        <button
          onClick={() => onDuplicate(resume._id)}
          className="btn btn-secondary btn-sm"
          title="Duplicate"
        >
          <Copy size={13} />
        </button>
        <button
          onClick={() => onDelete(resume._id)}
          className="btn btn-danger btn-sm"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
