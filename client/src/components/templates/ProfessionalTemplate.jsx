import React from 'react';
import { Phone, Mail, Linkedin, Github, ExternalLink, Code, Globe, MapPin } from 'lucide-react';

const DEFAULT_FS = { headingFont: 'Poppins', headingSize: 16, descFont: 'Calibri, Arial, sans-serif', descSize: 11 };



export default function ProfessionalTemplate({ resume }) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications } = resume;
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };

  const sectionHeaderStyle = {
    fontFamily: `${fs.headingFont}, sans-serif`,
    fontSize: fs.headingSize,
    fontWeight: 'bold',
    borderBottom: '1px solid #000',
    marginBottom: '6px',
    paddingBottom: '2px',
    marginTop: '12px',
  };

  const itemHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '2px'
  };

  const textStyle = {
    fontFamily: fs.descFont,
    fontSize: fs.descSize,
  };

  const ulStyle = {
    ...textStyle,
    margin: '4px 0 8px 0',
    paddingLeft: '24px',
    lineHeight: '1.4',
  };

  const contactItems = [
    p?.phone && { href: `tel:${p.phone}`, icon: Phone, text: 'Phone' },
    p?.email && { href: `mailto:${p.email}`, icon: Mail, text: 'Email' },
    p?.linkedin && { href: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`, icon: Linkedin, isLinkedin: true, text: 'LinkedIn' },
    p?.github && { href: p.github.startsWith('http') ? p.github : `https://${p.github}`, icon: Github, text: 'GitHub' },
    p?.website && { href: p.website.startsWith('http') ? p.website : `https://${p.website}`, icon: Globe, text: 'Portfolio' },
  ].filter(Boolean);

  return (
    <div style={{ padding: `${fs.marginTop ?? 40}px ${fs.marginRight ?? 40}px ${fs.marginBottom ?? 40}px ${fs.marginLeft ?? 40}px`, fontFamily: fs.descFont, color: '#000', background: '#fff', maxWidth: '800px', margin: '0 auto', lineHeight: fs.lineHeight ?? 1.5, '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px` }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize + 20, margin: '0 0 8px 0', fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '2px' }}>
          {p?.firstName} {p?.lastName}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', ...textStyle, alignItems: 'center', flexWrap: 'wrap' }}>
          {contactItems.map((item, i) => {
             const IconComponent = item.icon;
             const renderIcon = () => {
               if (item.isLinkedin) return <span style={{ color: '#0a66c2', display: 'flex' }}><Linkedin size={fs.iconSize || 14} /></span>;
               return <IconComponent size={fs.iconSize || 14} />;
             };
            return item.href ? (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {renderIcon()} {item.text}
              </a>
            ) : (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {renderIcon()} {item.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* Summary OR Objective */}
      {summary && (
        <div>
          <div style={sectionHeaderStyle}>Summary</div>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{ ...textStyle, margin: '4px 0' }} />
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div>
          <div style={sectionHeaderStyle}>Education</div>
          {education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <div style={itemHeaderStyle}>
                <strong style={{...textStyle, fontSize: fs.descSize + 1}}>{edu.institution}</strong>
                <span style={textStyle}>{edu.startDate} – {edu.endDate || 'Present'}</span>
              </div>
              <div style={itemHeaderStyle}>
                <span style={{...textStyle, fontStyle: 'italic'}}>{edu.degree} in {edu.field}</span>
                {edu.gpa && <span style={textStyle}>GPA: {edu.gpa}</span>}
              </div>
              {edu.description && (
                <div className="quill-content" dangerouslySetInnerHTML={{ __html: edu.description }} style={{...textStyle, marginTop: '4px'}} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div>
          <div style={sectionHeaderStyle}>Experience</div>
          {experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <div style={itemHeaderStyle}>
                <strong style={{...textStyle, fontSize: fs.descSize + 1}}>{exp.company}</strong>
                <span style={textStyle}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div style={itemHeaderStyle}>
                <span style={{...textStyle, fontStyle: 'italic'}}>{exp.position}</span>
                <span style={{...textStyle, fontStyle: 'italic'}}>{exp.location}</span>
              </div>
              {exp.description && (
                <div className="quill-content" dangerouslySetInnerHTML={{ __html: exp.description }} style={ulStyle} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div>
          <div style={sectionHeaderStyle}>Projects</div>
          {projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2px' }}>
                <div style={{...textStyle, fontSize: fs.descSize + 1, display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap'}}>
                  <strong>{proj.name}</strong> 
                  {proj.techStack?.length > 0 && <span style={{fontStyle: 'italic'}}> | {proj.techStack.join(', ')}</span>}
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap'}}>
                  {/* Project links & duration on RIGHT */}
                  {(proj.liveUrl || proj.githubUrl) && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ ...textStyle, color: '#333', textDecoration: 'underline', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <ExternalLink size={fs.descSize - 1} /> Live
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ ...textStyle, color: '#333', textDecoration: 'underline', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Code size={fs.descSize - 1} /> Code
                        </a>
                      )}
                    </div>
                  )}

                  {(proj.startDate || proj.endDate) && (
                    <span style={{...textStyle, color: '#555'}}>
                      {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                    </span>
                  )}
                </div>
              </div>

              {proj.description && (
                <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={ulStyle} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Technical Skills */}
      {skills?.length > 0 && (
        <div>
          <div style={sectionHeaderStyle}>Technical Skills</div>
          <div style={{ ...textStyle, lineHeight: '1.6' }}>
            {skills.some(s => s.category) ? (
              (() => {
                const grouped = skills.reduce((acc, s) => {
                  const cat = s.category || 'Other';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(s.name);
                  return acc;
                }, {});
                return Object.entries(grouped).map(([cat, items]) => (
                  <p key={cat} style={{ margin: '4px 0' }}>
                    <strong>{cat}: </strong> {items.join(', ')}
                  </p>
                ));
              })()
            ) : (
              <p style={{ margin: '4px 0' }}>
                {skills.map(s => s.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Certifications / Other */}
      {certifications?.length > 0 && (
        <div>
          <div style={sectionHeaderStyle}>Certifications & Awards</div>
          <ul style={{ ...ulStyle, listStyleType: 'disc' }}>
            {certifications.map((cert, idx) => (
              <li key={idx}>
                <strong style={textStyle}>{cert.name}</strong>, {cert.issuer} {cert.date && `(${cert.date})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
