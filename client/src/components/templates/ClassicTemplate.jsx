/* Classic ATS-friendly single-column resume template – improved fonts, layout & links */
import React from 'react';
import { Phone, Mail, Linkedin, Github, Globe, MapPin, ExternalLink, Code } from 'lucide-react';

const DEFAULT_FS = { headingFont: 'Poppins', headingSize: 16, descFont: 'Calibri, Arial, sans-serif', descSize: 11 };

function Lnk({ href, children, style }) {
  if (!href) return <span style={style}>{children}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none', ...style }}>
      {children}
    </a>
  );
}

function Section({ title, children, hs }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{
        fontFamily: `${hs.headingFont}, sans-serif`,
        fontSize: hs.headingSize - 4,
        fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#1a1a2e',
        borderBottom: '1.5px solid #1a1a2e', paddingBottom: 2, marginBottom: 5,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function ClassicTemplate({ resume }) {
  const p = resume?.personalInfo || {};
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Your Name';
  const exp   = resume?.experience || [];
  const edu   = resume?.education  || [];
  const skills = resume?.skills    || [];
  const projects = resume?.projects || [];
  const certs = resume?.certifications || [];
  const summary = resume?.summary  || '';

  const skillGroups = skills.reduce((acc, s) => {
    const cat = s.category || 'Technical';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s.name);
    return acc;
  }, {});

  const contactItems = [
    p.email    && { label: 'Email',   href: `mailto:${p.email}`,   iconNode: <Mail size={fs.iconSize || 14} /> },
    p.phone    && { label: 'Phone',   href: `tel:${p.phone}`,       iconNode: <Phone size={fs.iconSize || 14} /> },
    [p.city, p.state, p.country].filter(Boolean).join(', ') && {
      label: [p.city, p.state, p.country].filter(Boolean).join(', '),
      href: null, iconNode: <MapPin size={fs.iconSize || 14} />,
    },
    p.linkedin && {
      label: 'LinkedIn',
      href: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`,
      iconNode: <Linkedin size={fs.iconSize || 14} color="#0a66c2" />,
    },
    p.github && {
      label: 'GitHub',
      href: p.github.startsWith('http') ? p.github : `https://${p.github}`,
      iconNode: <Github size={fs.iconSize || 14} />,
    },
    p.website && {
      label: 'Portfolio',
      href: p.website.startsWith('http') ? p.website : `https://${p.website}`,
      iconNode: <Globe size={fs.iconSize || 14} />,
    },
  ].filter(Boolean);

  const bodyFont = { fontFamily: fs.descFont, fontSize: fs.descSize };

  return (
    <div style={{
      fontFamily: fs.descFont,
      padding: `${fs.marginTop ?? 40}px ${fs.marginRight ?? 40}px ${fs.marginBottom ?? 40}px ${fs.marginLeft ?? 40}px`,
      background: '#fff', color: '#333', fontSize: fs.descSize,
      lineHeight: fs.lineHeight ?? 1.5, boxSizing: 'border-box',
      '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px`
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h1 style={{
          fontFamily: `${fs.headingFont}, sans-serif`,
          fontSize: fs.headingSize + 6, fontWeight: 700, letterSpacing: '0.04em',
          margin: 0, textTransform: 'uppercase', color: '#1a1a2e',
        }}>{fullName}</h1>
        {p.jobTitle && (
          <p style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, color: '#374151', margin: '4px 0 7px', fontWeight: 500 }}>
            {p.jobTitle}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 12px', ...bodyFont, color: '#374151' }}>
          {contactItems.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>{item.iconNode}</span>
              <Lnk href={item.href}>{item.label}</Lnk>
            </span>
          ))}
        </div>
      </div>

      <div style={{ borderBottom: '1.5px solid #1a1a2e', marginBottom: 12 }} />

      {summary && (
        <Section title="Professional Summary" hs={fs}>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{ ...bodyFont, color: '#374151', margin: 0, marginBottom: 'var(--section-gap)' }} />
        </Section>
      )}

      {exp.length > 0 && (
        <Section title="Work Experience" hs={fs}>
          {exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 'var(--item-gap)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 2, color: '#111827' }}>{e.position}</span>
                  {e.company && <span style={{ ...bodyFont, color: '#374151' }}> — {e.company}</span>}
                  {e.location && <span style={{ ...bodyFont, color: '#6b7280', fontSize: fs.descSize - 0.5 }}>, {e.location}</span>}
                </div>
                <span style={{ ...bodyFont, color: '#6b7280', flexShrink: 0, marginLeft: 8 }}>
                  {e.startDate}{e.startDate && ' – '}{e.current ? 'Present' : e.endDate}
                </span>
              </div>
              {e.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: e.description }} style={{ ...bodyFont, color: '#374151', margin: '2px 0 0' }} />}
            </div>
          ))}
        </Section>
      )}

      {edu.length > 0 && (
        <Section title="Education" hs={fs}>
          {edu.map((e, i) => (
            <div key={i} style={{ marginBottom: 'var(--item-gap)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 2, color: '#111827' }}>
                  {e.degree}{e.field ? ` in ${e.field}` : ''}
                </span>
                {e.institution && <span style={{ ...bodyFont, color: '#374151' }}> — {e.institution}</span>}
                {e.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: e.description }} style={{ ...bodyFont, color: '#6b7280', margin: '2px 0 0' }} />}
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                <span style={{ ...bodyFont, color: '#6b7280' }}>{e.startDate}{e.startDate && ' – '}{e.endDate}</span>
                {e.gpa && <div style={{ ...bodyFont, color: '#6b7280' }}>GPA: {e.gpa}</div>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {Object.keys(skillGroups).length > 0 && (
        <Section title="Skills" hs={fs}>
          {Object.entries(skillGroups).map(([cat, names]) => (
            <div key={cat} style={{ marginBottom: 1, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.descSize, minWidth: 130, flexShrink: 0, color: '#1a1a2e' }}>{cat}:</span>
              <span style={{ ...bodyFont, color: '#374151' }}>{names.join(' • ')}</span>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" hs={fs}>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: 'var(--item-gap)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 3, color: '#111827' }}>
                    {proj.name}
                  </span>
                  
                  {(proj.techStack || []).length > 0 && (
                    <span style={{ ...bodyFont, color: '#6b7280', fontWeight: 400 }}> ({proj.techStack.join(', ')})</span>
                  )}
                </div>

                {/* Project links & duration on the RIGHT */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  {(proj.liveUrl || proj.githubUrl) && (
                    <div style={{ display: 'flex', gap: 12 }}>
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                          style={{ ...bodyFont, color: '#6366f1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                          <ExternalLink size={fs.descSize} /> Live
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                          style={{ ...bodyFont, color: '#6366f1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                          <Code size={fs.descSize} /> Code
                        </a>
                      )}
                    </div>
                  )}
                  {(proj.startDate || proj.endDate) && (
                    <span style={{ ...bodyFont, color: '#6b7280', fontSize: fs.descSize - 0.5, fontWeight: 500 }}>
                      {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                    </span>
                  )}
                </div>
              </div>
              {proj.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={{ ...bodyFont, color: '#374151', margin: '1px 0 0 0' }} />}
            </div>
          ))}
        </Section>
      )}

      {certs.length > 0 && (
        <Section title="Certifications" hs={fs}>
          {certs.map((c, i) => (
            <div key={i} style={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
              <span style={bodyFont}>
                <span style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700 }}>{c.name}</span>
                {c.issuer && ` — ${c.issuer}`}
              </span>
              <span style={{ ...bodyFont, color: '#6b7280', flexShrink: 0, marginLeft: 8 }}>{c.date}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}
