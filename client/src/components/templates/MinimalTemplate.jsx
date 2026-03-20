import React from 'react';
import { Phone, Mail, Linkedin, Github, Globe, MapPin, ExternalLink, Code } from 'lucide-react';

const DEFAULT_FS = { headingFont: 'Poppins', headingSize: 16, descFont: 'Calibri, Arial, sans-serif', descSize: 11 };

export default function MinimalTemplate({ resume }) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications } = resume;
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };

  const sectionStyle = {
    marginBottom: '10px'
  };

  const headerStyle = {
    fontFamily: `${fs.headingFont}, sans-serif`,
    fontSize: `${fs.headingSize + 2}px`,
    fontWeight: 'bold',
    borderBottom: '1px solid #000',
    marginBottom: '8px',
    paddingBottom: '2px',
    textTransform: 'none'
  };

  const textStyle = {
    fontFamily: fs.descFont,
    fontSize: `${fs.descSize}px`,
    lineHeight: '1.5'
  };

  const contactItems = [
    p?.phone && { href: `tel:${p.phone}`, icon: <Phone size={fs.iconSize || 14} />, text: 'Phone' },
    p?.email && { href: `mailto:${p.email}`, icon: <Mail size={fs.iconSize || 14} />, text: 'Email' },
    p?.linkedin && { href: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`, icon: <span style={{ color: '#0a66c2', display: 'flex' }}><Linkedin size={fs.iconSize || 14} /></span>, text: 'LinkedIn' },
    p?.github && { href: p.github.startsWith('http') ? p.github : `https://${p.github}`, icon: <Github size={fs.iconSize || 14} />, text: 'GitHub' },
    p?.website && { href: p.website.startsWith('http') ? p.website : `https://${p.website}`, icon: <Globe size={fs.iconSize || 14} />, text: 'Website' }
  ].filter(Boolean);

  return (
    <div style={{ padding: `${fs.marginTop ?? 40}px ${fs.marginRight ?? 40}px ${fs.marginBottom ?? 40}px ${fs.marginLeft ?? 40}px`, fontFamily: fs.descFont, color: '#000', background: '#fff', lineHeight: fs.lineHeight ?? 1.5, '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px` }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: `${fs.headingSize + 16}px`, margin: '0 0 5px 0', fontWeight: 'bold' }}>
          {p?.firstName} {p?.lastName}
        </h1>
        <div style={{ ...textStyle, marginBottom: '5px' }}>
          {p?.address || p?.city ? `${p.city}${p.state ? `, ${p.state}` : ''}` : ''}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', ...textStyle, flexWrap: 'wrap' }}>
           {contactItems.map((item, i) => (
             <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
               <span style={{ fontSize: fs.iconSize || 14, display: 'flex', alignItems: 'center' }}>
                 {item.icon}
               </span> {item.text}
             </a>
          ))}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={sectionStyle}>
          <div style={headerStyle}>Summary</div>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{ ...textStyle, margin: 0 }} />
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div style={sectionStyle}>
          <div style={headerStyle}>Education</div>
          {education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', ...textStyle }}>
                <span>{edu.institution}</span>
                <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
              </div>
              <div style={{ ...textStyle, marginTop: '2px' }}>
                {edu.degree} in {edu.field}
                {edu.gpa && <span style={{ marginLeft: '10px' }}>GPA: {edu.gpa}</span>}
              </div>
              {edu.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: edu.description }} style={{ ...textStyle, marginTop: '2px' }} />}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div style={sectionStyle}>
          <div style={headerStyle}>Technical Skills</div>
          <div style={textStyle}>
            <p style={{ margin: 0 }}>
              <strong>Skills:</strong> {skills.map(s => s.name).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div style={sectionStyle}>
          <div style={headerStyle}>Projects</div>
          {projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <div style={{ ...textStyle, marginBottom: '2px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap' }}>
                <span>
                  <strong>{proj.name}</strong> {proj.techStack?.length > 0 && <span>| {proj.techStack.join(', ')}</span>}
                </span>

                {/* project links & duration on RIGHT */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  {(proj.liveUrl || proj.githubUrl) && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <ExternalLink size={fs.descSize - 1} /> Live
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Code size={fs.descSize - 1} /> Code
                        </a>
                      )}
                    </div>
                  )}
                  {(proj.startDate || proj.endDate) && (
                    <span style={{ color: '#555', fontSize: fs.descSize - 0.5, fontStyle: 'italic' }}>
                      {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                    </span>
                  )}
                </div>
              </div>
              {proj.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={{ margin: 0, paddingLeft: '2px', ...textStyle }} />}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div style={sectionStyle}>
          <div style={headerStyle}>Experience</div>
          {experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', ...textStyle }}>
                <span>{exp.position} at {exp.company}</span>
                <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: exp.description }} style={{ margin: '2px 0 0 0', paddingLeft: '2px', ...textStyle }} />}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <div style={sectionStyle}>
          <div style={headerStyle}>Training & Certifications</div>
          <ul style={{ margin: 0, paddingLeft: '20px', ...textStyle }}>
            {certifications.map((cert, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>
                {cert.name} ({cert.issuer}) {cert.date && `- ${cert.date}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
