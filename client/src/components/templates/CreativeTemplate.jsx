/* Creative bold resume template – uses fontSettings, custom contact icons, project links on left */
import React from 'react';
import { Phone, Mail, Linkedin, Github, MapPin, Globe, ExternalLink, Code } from 'lucide-react';

const ACCENT = '#7c3aed';
const ACCENT2 = '#06b6d4';
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

function Section({ title, icon, children, fs }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, flexShrink: 0 }}>{icon}</div>
        <h2 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1f2937', margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${ACCENT}40, transparent)` }} />
      </div>
      {children}
    </div>
  );
}

const LEVEL_COLORS = { Beginner: '#22c55e', Intermediate: ACCENT2, Advanced: ACCENT, Expert: '#f59e0b' };

export default function CreativeTemplate({ resume }) {
  const p = resume?.personalInfo || {};
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Your Name';
  const exp = resume?.experience || [];
  const edu = resume?.education || [];
  const skills = resume?.skills || [];
  const projects = resume?.projects || [];
  const certs = resume?.certifications || [];
  const summary = resume?.summary || '';

  const descStyle = { fontFamily: fs.descFont, fontSize: fs.descSize };

  return (
    <div style={{ padding: `${fs.marginTop ?? 30}px ${fs.marginRight ?? 30}px ${fs.marginBottom ?? 30}px ${fs.marginLeft ?? 30}px`, fontFamily: fs.descFont, background: '#fff', color: '#111', fontSize: fs.descSize, lineHeight: fs.lineHeight ?? 1.5, '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px` }}>

      {/* Bold Header */}
      <div style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, padding: '20px 26px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h1 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize + 10, fontWeight: 900, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{fullName}</h1>
            {p.jobTitle && <p style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, margin: '4px 0 0', opacity: 0.9, fontWeight: 500 }}>{p.jobTitle}</p>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, fontSize: fs.descSize - 0.5, opacity: 0.9 }}>
            {p.email && (
              <Lnk href={`mailto:${p.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#fff' }}>
                <Mail size={fs.iconSize || 14} /> Email
              </Lnk>
            )}
            {p.phone && (
              <Lnk href={`tel:${p.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#fff' }}>
                <Phone size={fs.iconSize || 14} /> Phone
              </Lnk>
            )}
            {[p.city, p.country].filter(Boolean).length > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={fs.iconSize || 14} /> {[p.city, p.state, p.country].filter(Boolean).join(', ')}
              </span>
            )}
            {p.linkedin && (
              <Lnk href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#fff' }}>
                <Linkedin size={fs.iconSize || 14} /> LinkedIn
              </Lnk>
            )}
            {p.github && (
              <Lnk href={p.github.startsWith('http') ? p.github : `https://${p.github}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#fff' }}>
                <Github size={fs.iconSize || 14} /> GitHub
              </Lnk>
            )}
            {p.website && (
              <Lnk href={p.website.startsWith('http') ? p.website : `https://${p.website}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#fff' }}>
                <Globe size={fs.iconSize || 14} /> Portfolio
              </Lnk>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 26px' }}>

        {summary && (
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(6,182,212,0.06))',
            borderRadius: 8, border: `1px solid rgba(124,58,237,0.15)`,
            padding: '9px 13px', marginBottom: 'var(--section-gap)',
            ...descStyle, color: '#374151', fontStyle: 'italic',
          }} />
        )}

        {exp.length > 0 && (
          <Section title="Experience" icon="💼" fs={fs}>
            {exp.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 'var(--item-gap)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, marginTop: 4 }} />
                  {i < exp.length - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg, ${ACCENT}50, transparent)`, marginTop: 3 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 3 }}>
                    <div>
                      <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 3, color: '#111827' }}>{e.position}</div>
                      <div style={{ ...descStyle, fontWeight: 600, color: ACCENT }}>{e.company}{e.location && ` · ${e.location}`}</div>
                    </div>
                    <span style={{ background: 'rgba(124,58,237,0.08)', color: ACCENT, padding: '2px 7px', borderRadius: 999, fontSize: fs.descSize - 1.5, fontWeight: 600 }}>
                      {e.startDate}{e.startDate && ' → '}{e.current ? 'Present' : e.endDate}
                    </span>
                  </div>
                  {e.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: e.description }} style={{ ...descStyle, color: '#4b5563', marginTop: 3 }} />}
                </div>
              </div>
            ))}
          </Section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <div>
            {edu.length > 0 && (
              <Section title="Education" icon="🎓" fs={fs}>
                {edu.map((e, i) => (
                  <div key={i} style={{ marginBottom: 'var(--item-gap)', padding: '4px 7px', background: '#f9fafb', borderRadius: 6, borderLeft: `3px solid ${ACCENT2}` }}>
                    <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 4, color: '#111827' }}>{e.degree}{e.field ? ` in ${e.field}` : ''}</div>
                    <div style={{ ...descStyle, color: ACCENT2, fontWeight: 600 }}>{e.institution}</div>
                    <div style={{ ...descStyle, color: '#6b7280', fontSize: fs.descSize - 1 }}>{e.startDate}{e.startDate && ' – '}{e.endDate}{e.gpa ? ` · GPA ${e.gpa}` : ''}</div>
                    {e.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: e.description }} style={{ ...descStyle, color: '#6b7280', marginTop: 3 }} />}
                  </div>
                ))}
              </Section>
            )}
            {certs.length > 0 && (
              <Section title="Certifications" icon="🏆" fs={fs}>
                {certs.map((c, i) => (
                  <div key={i} style={{ marginBottom: 5, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, marginTop: 4, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 600, fontSize: fs.headingSize - 5, color: '#111827' }}>{c.name}</div>
                      <div style={{ ...descStyle, color: '#6b7280', fontSize: fs.descSize - 1 }}>{c.issuer}{c.date && ` · ${c.date}`}</div>
                    </div>
                  </div>
                ))}
              </Section>
            )}
          </div>

          <div>
            {skills.length > 0 && (
              <Section title="Skills" icon="⚡" fs={fs}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {skills.map((s, i) => (
                    <span key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 3,
                      padding: '2px 7px', borderRadius: 999, fontSize: fs.descSize - 1, fontWeight: 600,
                      background: `${LEVEL_COLORS[s.level] || ACCENT}18`,
                      color: LEVEL_COLORS[s.level] || ACCENT,
                      border: `1px solid ${LEVEL_COLORS[s.level] || ACCENT}30`,
                    }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {projects.length > 0 && (
              <Section title="Projects" icon="🚀" fs={fs}>
                {projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: 'var(--item-gap)', padding: '6px 8px', background: '#f9fafb', borderRadius: 6, borderTop: `2px solid ${ACCENT}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6, marginBottom: 2 }}>
                      <span style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 4, color: '#111827' }}>
                        {proj.name}
                      </span>

                      {/* Project links & duration RIGHT */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        {(proj.liveUrl || proj.githubUrl) && (
                          <div style={{ display: 'flex', gap: 8 }}>
                            {proj.liveUrl && (
                              <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                                style={{ ...descStyle, fontSize: fs.descSize - 1.5, color: ACCENT, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2, fontWeight: 600 }}>
                                <ExternalLink size={fs.descSize - 1} /> Live
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                                style={{ ...descStyle, fontSize: fs.descSize - 1.5, color: ACCENT, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2, fontWeight: 600 }}>
                                <Code size={fs.descSize - 1} /> Code
                              </a>
                            )}
                          </div>
                        )}
                        {(proj.startDate || proj.endDate) && (
                          <span style={{ ...descStyle, color: '#6b7280', fontSize: fs.descSize - 1, fontWeight: 600, background: 'rgba(0,0,0,0.03)', padding: '2px 6px', borderRadius: 4 }}>
                            {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                          </span>
                        )}
                      </div>
                    </div>

                    {(proj.techStack || []).length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 3 }}>
                        {proj.techStack.map(t => (
                          <span key={t} style={{ background: `${ACCENT2}15`, color: ACCENT2, padding: '1px 5px', borderRadius: 4, fontSize: fs.descSize - 2, fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                    )}
                    
                    {proj.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={{ ...descStyle, color: '#4b5563', margin: 0 }} />}
                  </div>
                ))}
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
