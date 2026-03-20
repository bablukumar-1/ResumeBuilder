/* Modern Two-Column Resume Template – fontSettings, custom icons, project links on left */
import React from 'react';
import { Phone, Mail, Linkedin, Github, Globe, MapPin, ExternalLink, Code } from 'lucide-react';

const SIDEBAR_BG = '#1e1b4b';
const ACCENT = '#6366f1';
const DEFAULT_FS = { headingFont: 'Poppins', headingSize: 16, descFont: 'Calibri, Arial, sans-serif', descSize: 11 };



function Section({ title, children, fs }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 6, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, borderBottom: `1.5px solid ${ACCENT}`, paddingBottom: 3, marginBottom: 8 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function SideSection({ title, children, fs }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 7, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 3, marginBottom: 8 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

const LEVEL_WIDTH = { Beginner: '25%', Intermediate: '50%', Advanced: '75%', Expert: '100%' };

export default function ModernTemplate({ resume }) {
  const p = resume?.personalInfo || {};
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Your Name';
  const exp = resume?.experience || [];
  const edu = resume?.education || [];
  const skills = resume?.skills || [];
  const projects = resume?.projects || [];
  const certs = resume?.certifications || [];
  const summary = resume?.summary || '';

  const skillGroups = skills.reduce((acc, s) => {
    const cat = s.category || 'Technical';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  const descStyle = { fontFamily: fs.descFont, fontSize: fs.descSize };

  const contactItems = [
    p.email    && { icon: <Mail size={fs.iconSize || 13} />,       text: 'Email',   href: `mailto:${p.email}` },
    p.phone    && { icon: <Phone size={fs.iconSize || 13} />,      text: 'Phone',   href: `tel:${p.phone}` },
    [p.city, p.state, p.country].filter(Boolean).join(', ') && {
      icon: <MapPin size={fs.iconSize || 13} />, 
      text: [p.city, p.state, p.country].filter(Boolean).join(', '), href: null,
    },
    p.linkedin && {
      icon: <span style={{ color: '#0a66c2', background: '#fff', borderRadius: 2, display: 'flex' }}><Linkedin size={fs.iconSize || 13} /></span>,
      text: 'LinkedIn',
      href: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`,
    },
    p.github && {
      icon: <Github size={fs.iconSize || 13} />,
      text: 'GitHub',
      href: p.github.startsWith('http') ? p.github : `https://${p.github}`,
    },
    p.website && {
      icon: <Globe size={fs.iconSize || 13} />,
      text: 'Portfolio',
      href: p.website.startsWith('http') ? p.website : `https://${p.website}`,
    },
  ].filter(Boolean);

  return (
    <div style={{ padding: `${fs.marginTop ?? 0}px ${fs.marginRight ?? 0}px ${fs.marginBottom ?? 0}px ${fs.marginLeft ?? 0}px`, fontFamily: fs.descFont, display: 'flex', width: '100%', fontSize: fs.descSize, lineHeight: fs.lineHeight ?? 1.5, '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px` }}>

      {/* Sidebar */}
      <div style={{ width: '32%', background: SIDEBAR_BG, color: '#e0e7ff', padding: '24px 16px', flexShrink: 0 }}>

        {/* Profile Photo or Initial */}
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          {p.profilePhoto ? (
            <img src={p.profilePhoto} alt={fullName}
              style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 9px', display: 'block', border: `2px solid ${ACCENT}` }}
            />
          ) : (
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6)`, margin: '0 auto 9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: '#fff' }}>
              {fullName.charAt(0)}
            </div>
          )}
          <h1 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 1, fontWeight: 800, lineHeight: 1.2, color: '#fff', marginBottom: 3 }}>{fullName}</h1>
          {p.jobTitle && <p style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 5, color: '#a5b4fc', fontWeight: 500, margin: 0 }}>{p.jobTitle}</p>}
        </div>

        {/* Contact */}
        <SideSection title="Contact" fs={fs}>
          {contactItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 5, ...descStyle, alignItems: 'flex-start' }}>
              <span style={{ color: '#818cf8', width: (fs.iconSize || 13) + 2, flexShrink: 0, fontWeight: 600, display: 'flex', alignItems: 'center', paddingTop: 1, fontSize: fs.iconSize || 13 }}>
                {item.icon}
              </span>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ wordBreak: 'break-all', color: '#c7d2fe', textDecoration: 'none' }}>
                  {item.text}
                </a>
              ) : (
                <span style={{ wordBreak: 'break-all', color: '#c7d2fe' }}>{item.text}</span>
              )}
            </div>
          ))}
        </SideSection>

        {/* Skills */}
        {Object.keys(skillGroups).length > 0 && (
          <SideSection title="Skills" fs={fs}>
            {Object.entries(skillGroups).map(([cat, catSkills]) => (
              <div key={cat} style={{ marginBottom: 9 }}>
                <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 8, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cat}</div>
                {catSkills.map((s, i) => (
                  <div key={i} style={{ marginBottom: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ ...descStyle, color: '#e0e7ff' }}>{s.name}</span>
                      <span style={{ ...descStyle, fontSize: fs.descSize - 1, color: '#818cf8' }}>{s.level}</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 999 }}>
                      <div style={{ height: '100%', width: LEVEL_WIDTH[s.level] || '50%', background: `linear-gradient(90deg, ${ACCENT}, #8b5cf6)`, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </SideSection>
        )}

        {certs.length > 0 && certs.length <= 3 && (
          <SideSection title="Certifications" fs={fs}>
            {certs.map((c, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ ...descStyle, fontWeight: 600, color: '#c7d2fe' }}>{c.name}</div>
                <div style={{ ...descStyle, fontSize: fs.descSize - 1, color: '#818cf8' }}>{c.issuer} {c.date && `• ${c.date}`}</div>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px 20px', background: '#fff', color: '#1e1b4b' }}>

        {summary && (
          <Section title="Professional Summary" fs={fs}>
            <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{ ...descStyle, color: '#374151', margin: 0 }} />
          </Section>
        )}

        {exp.length > 0 && (
          <Section title="Work Experience" fs={fs}>
            {exp.map((e, i) => (
              <div key={i} style={{ marginBottom: 'var(--item-gap)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 1 }}>
                  <div>
                    <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 3, color: '#111827' }}>{e.position}</div>
                    <div style={{ ...descStyle, color: ACCENT, fontWeight: 600 }}>{e.company}{e.location && `, ${e.location}`}</div>
                  </div>
                  <div style={{ ...descStyle, color: '#6b7280', textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                    {e.startDate}{e.startDate && ' — '}{e.current ? 'Present' : e.endDate}
                  </div>
                </div>
                {e.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: e.description }} style={{ ...descStyle, color: '#374151', margin: '2px 0 0' }} />}
              </div>
            ))}
          </Section>
        )}

        {edu.length > 0 && (
          <Section title="Education" fs={fs}>
            {edu.map((e, i) => (
              <div key={i} style={{ marginBottom: 'var(--item-gap)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 3, color: '#111827' }}>{e.degree} {e.field && `in ${e.field}`}</div>
                    <div style={{ ...descStyle, color: ACCENT, fontWeight: 500 }}>{e.institution}</div>
                   </div>
                  <div style={{ ...descStyle, color: '#6b7280', textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                    {e.startDate}{e.startDate && ' — '}{e.endDate}
                    {e.gpa && <><br />GPA: {e.gpa}</>}
                  </div>
                </div>
                {e.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: e.description }} style={{ ...descStyle, color: '#6b7280', margin: '2px 0 0' }} />}
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects" fs={fs}>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 'var(--item-gap)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6, marginBottom: 1 }}>
                  <span style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.headingSize - 3, color: '#111827' }}>
                    {proj.name}
                  </span>

                  {/* Project links & duration on RIGHT */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    {(proj.liveUrl || proj.githubUrl) && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                            style={{ ...descStyle, fontSize: fs.descSize - 1, color: ACCENT, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
                            <ExternalLink size={fs.descSize - 1} /> Live
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                            style={{ ...descStyle, fontSize: fs.descSize - 1, color: ACCENT, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
                            <Code size={fs.descSize - 1} /> Code
                          </a>
                        )}
                      </div>
                    )}
                    {(proj.startDate || proj.endDate) && (
                      <span style={{ ...descStyle, color: '#6b7280', fontSize: fs.descSize - 1, fontWeight: 500 }}>
                        {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                      </span>
                    )}
                  </div>
                </div>

                {(proj.techStack || []).length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, margin: '2px 0' }}>
                    {proj.techStack.map(t => (
                      <span key={t} style={{ background: 'rgba(99,102,241,0.1)', color: ACCENT, padding: '1px 5px', borderRadius: 999, fontSize: fs.descSize - 1.5, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                )}
                
                {proj.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={{ ...descStyle, color: '#374151', margin: '2px 0 0 0' }} />}
              </div>
            ))}
          </Section>
        )}

        {certs.length > 3 && (
          <Section title="Certifications" fs={fs}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {certs.map((c, i) => (
                <div key={i} style={{ padding: '4px 8px', background: 'rgba(99,102,241,0.05)', borderRadius: 6, border: '1px solid rgba(99,102,241,0.15)' }}>
                  <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 4, fontWeight: 600, color: '#111827' }}>{c.name}</div>
                  <div style={{ ...descStyle, fontSize: fs.descSize - 1, color: '#6b7280' }}>{c.issuer} {c.date && `• ${c.date}`}</div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
