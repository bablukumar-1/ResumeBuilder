import React from 'react';
import { Phone, Mail, Linkedin, Github, Globe, MapPin, ExternalLink, Code } from 'lucide-react';

const DEFAULT_FS = { headingFont: 'Poppins', headingSize: 16, descFont: 'Calibri, Arial, sans-serif', descSize: 11 };

export default function DeveloperTemplate({ resume = {} }) {
  const {
    personalInfo: p = {},
    summary = '',
    education = [],
    skills = [],
    experience = [],
    projects = [],
    certifications = [],
  } = resume;
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };

  const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Your Name';
  const location = [p.city, p.state, p.country].filter(Boolean).join(', ');

  const sectionStyle = {
    marginBottom: 12,
  };
  const headingStyle = {
    fontFamily: `${fs.headingFont}, sans-serif`,
    fontSize: fs.headingSize - 3,
    fontWeight: 700,
    borderBottom: '1.5px solid #222',
    paddingBottom: 3,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#111',
  };
  const labelStyle = {
    fontWeight: 700,
    fontSize: fs.descSize,
    color: '#222',
  };
  const textStyle = {
    fontFamily: fs.descFont,
    fontSize: fs.descSize,
    color: '#333',
    lineHeight: 1.5,
  };

  const contactItems = [
    p.phone    && { icon: <Phone size={fs.iconSize || 14} />,     text: 'Phone',     href: `tel:${p.phone}` },
    p.email    && { icon: <Mail size={fs.iconSize || 14} />,      text: 'Email',     href: `mailto:${p.email}` },
    p.linkedin && { icon: <Linkedin size={fs.iconSize || 14} color="#0a66c2" />, text: 'LinkedIn',  href: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}` },
    p.github   && { icon: <Github size={fs.iconSize || 14} />,    text: 'GitHub',    href: p.github.startsWith('http') ? p.github : `https://${p.github}` },
    p.website  && { icon: <Globe size={fs.iconSize || 14} />,     text: 'Portfolio', href: p.website.startsWith('http') ? p.website : `https://${p.website}` }
  ].filter(Boolean);

  return (
    <div style={{
      fontFamily: fs.descFont,
      background: '#fff', color: '#222',
      padding: `${fs.marginTop ?? 28}px ${fs.marginRight ?? 36}px ${fs.marginBottom ?? 28}px ${fs.marginLeft ?? 36}px`,
      boxSizing: 'border-box', lineHeight: fs.lineHeight ?? 1.5, '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px`
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize + 6, fontWeight: 700, letterSpacing: '-0.3px', color: '#111' }}>{fullName}</div>
        {location && <div style={{ ...textStyle, color: '#444', marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}><MapPin size={fs.iconSize || 14} /> {location}</div>}

        {/* Contact row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 6, flexWrap: 'wrap', ...textStyle }}>
          {contactItems.map((item, i) => (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: '#1a5276', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontStyle: 'normal', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: fs.iconSize || 14 }}>
                {item.icon}
              </span> {item.text}
            </a>
          ))}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Summary</div>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{ ...textStyle, margin: 0 }} />
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Education</div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.descSize + 0.5 }}>{edu.institution}</div>
                <div style={{ ...textStyle, fontSize: fs.descSize - 0.5, color: '#555', whiteSpace: 'nowrap' }}>{edu.startDate} – {edu.endDate}</div>
              </div>
              <div style={{ ...textStyle, fontStyle: 'italic' }}>
                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
              </div>
              {edu.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: edu.description }} style={{ ...textStyle, marginTop: 2 }} />}
            </div>
          ))}
        </div>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Technical Skills</div>
          <div style={{ ...textStyle, lineHeight: 1.9 }}>
            {skills.some(s => s.category) ? (
              (() => {
                const grouped = skills.reduce((acc, s) => {
                  const cat = s.category || 'Other';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(s.name || s);
                  return acc;
                }, {});
                return Object.entries(grouped).map(([cat, items]) => (
                  <div key={cat}>
                    <span style={labelStyle}>{cat} : </span>
                    <span style={textStyle}>{items.join(', ')}</span>
                  </div>
                ));
              })()
            ) : (
              <div>
                <span style={labelStyle}>Skills : </span>
                <span style={textStyle}>{skills.map(s => typeof s === 'string' ? s : (s.name || s)).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Experience</div>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.descSize + 0.5 }}>{exp.position}{exp.company ? ` at ${exp.company}` : ''}</div>
                <div style={{ ...textStyle, fontSize: fs.descSize - 0.5, color: '#555', whiteSpace: 'nowrap' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
              </div>
              {exp.description && (
                <div className="quill-content" dangerouslySetInnerHTML={{ __html: exp.description }} style={{ margin: '2px 0 0 16px', padding: 0, ...textStyle }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Projects ( Learning Experience )</div>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 }}>
                <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontWeight: 700, fontSize: fs.descSize, color: '#111' }}>
                  {proj.name}
                  {proj.techStack && (
                    <span style={{ fontWeight: 400, color: '#444' }}> | {proj.techStack.join(', ')}</span>
                  )}
                </div>

                {/* Project links & duration on RIGHT */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  {(proj.liveUrl || proj.githubUrl) && (
                     <div style={{ display: 'flex', gap: 8 }}>
                       {proj.liveUrl && (
                         <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#1a5276', textDecoration: 'underline', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                           <ExternalLink size={fs.descSize - 1} /> Live
                         </a>
                       )}
                       {proj.githubUrl && (
                         <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#1a5276', textDecoration: 'underline', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                           <Code size={fs.descSize - 1} /> Code
                         </a>
                       )}
                     </div>
                  )}
                  {(proj.startDate || proj.endDate) && (
                    <span style={{ ...textStyle, color: '#555', fontSize: fs.descSize - 1, fontStyle: 'italic' }}>
                      {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                    </span>
                  )}
                </div>
              </div>

              {proj.description && (
                <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={{ margin: '4px 0 0 0', padding: 0, ...textStyle }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={sectionStyle}>
          <div style={headingStyle}>Training &amp; Certifications</div>
          {certifications.map((cert, i) => (
            <div key={i} style={{ ...textStyle, marginBottom: 4, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
               <span style={{ flexShrink: 0 }}>-</span>
               <span>
                 <span style={{ fontWeight: 600 }}>{cert.name}</span>
                 {cert.issuer && <span style={{ color: '#555' }}> ({cert.issuer})</span>}
                 {cert.date && <span style={{ color: '#555' }}> — {cert.date}</span>}
               </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
