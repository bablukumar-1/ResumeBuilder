import React from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin, Github, ExternalLink, Code } from 'lucide-react';

const DEFAULT_FS = { headingFont: 'Poppins', headingSize: 16, descFont: 'Calibri, Arial, sans-serif', descSize: 11 };

export default function ExecutiveTemplate({ resume }) {
  const { personalInfo: p, summary, experience, education, skills, projects } = resume;
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };

  const textStyle = { fontFamily: fs.descFont, fontSize: fs.descSize };

  const contactItems = [
    p?.phone && { href: `tel:${p.phone}`, icon: Phone, text: 'Phone' },
    p?.email && { href: `mailto:${p.email}`, icon: Mail, text: 'Email' },
    p?.linkedin && { href: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`, icon: Linkedin, isLinkedin: true, text: 'LinkedIn' },
    p?.github && { href: p.github.startsWith('http') ? p.github : `https://${p.github}`, icon: Github, text: 'GitHub' },
    p?.city && { href: null, icon: MapPin, text: `${p.city}, ${p.state}` },
    p?.website && { href: p.website.startsWith('http') ? p.website : `https://${p.website}`, icon: Globe, text: 'Portfolio' }
  ].filter(Boolean);

  return (
    <div style={{ padding: `${fs.marginTop ?? 0}px ${fs.marginRight ?? 0}px ${fs.marginBottom ?? 0}px ${fs.marginLeft ?? 0}px`, fontFamily: fs.descFont, color: '#333', background: '#fff', lineHeight: fs.lineHeight ?? 1.5, '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px` }}>
      
      {/* Dark Blue Header */}
      <div style={{ background: '#1c2b59', color: '#fff', padding: '24px 30px 18px' }}>
        <h1 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize + 22, margin: '0 0 5px 0', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {p?.firstName} {p?.lastName}
        </h1>
        <h2 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize + 4, margin: '0 0 20px 0', fontWeight: 'normal' }}>
          {p?.jobTitle || 'Executive Professional'}
        </h2>
        
        <div style={{ display: 'flex', gap: '24px', ...textStyle, fontSize: fs.descSize + 1, flexWrap: 'wrap', color: '#d1d5db' }}>
          {contactItems.map((item, i) => {
             const IconComponent = item.icon;
             const renderIcon = () => {
               if (item.isLinkedin) return <span style={{ color: '#0a66c2', background: '#fff', borderRadius: 2, display: 'flex' }}><Linkedin size={fs.iconSize || 14} /></span>;
               return <IconComponent size={fs.iconSize || 14} />;
             };
             return (
               item.href ? (
                 <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                   {renderIcon()} {item.text}
                 </a>
               ) : (
                 <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                   {renderIcon()} {item.text}
                 </span>
               )
             );
          })}
        </div>
      </div>

      {/* Main Body - 2 Columns */}
      <div style={{ display: 'flex', padding: '30px', gap: '40px' }}>
        
        {/* Left Column (60%) */}
        <div style={{ flex: '0 0 60%' }}>
          
          {/* Summary */}
          {summary && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, textTransform: 'uppercase', color: '#1c2b59', borderBottom: '2px solid #e5e7eb', paddingBottom: '6px', marginBottom: '12px', letterSpacing: '1px', fontWeight: 'bold' }}>Summary</h3>
              <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{ ...textStyle, margin: 0 }} />
            </div>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, textTransform: 'uppercase', color: '#1c2b59', borderBottom: '2px solid #e5e7eb', paddingBottom: '6px', marginBottom: '12px', letterSpacing: '1px', fontWeight: 'bold' }}>Experience</h3>
              
              {experience.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: '14px' }}>
                  <h4 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize, margin: '0 0 2px 0', color: '#111' }}>{exp.position}</h4>
                  <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, fontWeight: 'bold', color: '#1c2b59', marginBottom: '2px' }}>
                    {exp.company}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', ...textStyle, fontSize: fs.descSize - 1, color: '#666', marginBottom: '4px' }}>
                    <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <div className="quill-content" dangerouslySetInnerHTML={{ __html: exp.description }} style={{ margin: 0, paddingLeft: '16px', ...textStyle, color: '#444' }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, textTransform: 'uppercase', color: '#1c2b59', borderBottom: '2px solid #e5e7eb', paddingBottom: '6px', marginBottom: '16px', letterSpacing: '1px', fontWeight: 'bold' }}>Education</h3>
              {education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 1, margin: '0 0 4px 0', color: '#111' }}>{edu.degree} in {edu.field}</h4>
                  <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, fontWeight: 'bold', color: '#1c2b59', marginBottom: '4px' }}>
                    {edu.institution}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', ...textStyle, fontSize: fs.descSize - 1, color: '#666', marginBottom: '4px' }}>
                    <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                  </div>
                  {edu.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: edu.description }} style={{ margin: 0, ...textStyle, color: '#444' }} />}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {resume?.certifications?.length > 0 && (
            <div>
              <h3 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, textTransform: 'uppercase', color: '#1c2b59', borderBottom: '2px solid #e5e7eb', paddingBottom: '6px', marginBottom: '16px', letterSpacing: '1px', fontWeight: 'bold' }}>Certifications</h3>
              {resume.certifications.map((cert, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 1, margin: '0 0 4px 0', color: '#111' }}>{cert.name}</h4>
                  <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, fontWeight: 'bold', color: '#1c2b59', marginBottom: '4px' }}>
                    {cert.issuer}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', ...textStyle, fontSize: fs.descSize - 1, color: '#666', marginBottom: '4px' }}>
                    <span>{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (40%) */}
        <div style={{ flex: '1' }}>
          
          {/* Skills */}
          {skills?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, textTransform: 'uppercase', color: '#1c2b59', borderBottom: '2px solid #e5e7eb', paddingBottom: '6px', marginBottom: '16px', letterSpacing: '1px', fontWeight: 'bold' }}>Skills</h3>
              {skills.some(s => s.category) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(() => {
                    const grouped = skills.reduce((acc, s) => {
                      const cat = s.category || 'Other';
                      if (!acc[cat]) acc[cat] = [];
                      acc[cat].push(s.name);
                      return acc;
                    }, {});
                    return Object.entries(grouped).map(([cat, items]) => (
                      <div key={cat}>
                        <div style={{ ...textStyle, fontSize: fs.descSize, fontWeight: 'bold', color: '#1c2b59', marginBottom: '4px' }}>{cat}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {items.map((item, i) => (
                            <span key={i} style={{ ...textStyle, color: '#444', background: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>{item}</span>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.map((skill, idx) => (
                    <span key={idx} style={{ ...textStyle, fontSize: fs.descSize + 1, fontWeight: 'bold', borderBottom: '2px solid #1c2b59', paddingBottom: '2px' }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Projects as Achievements */}
          {projects?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, textTransform: 'uppercase', color: '#1c2b59', borderBottom: '2px solid #e5e7eb', paddingBottom: '6px', marginBottom: '12px', letterSpacing: '1px', fontWeight: 'bold' }}>Projects / Achievements</h3>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 2 }}>
                        <h4 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, margin: 0, color: '#111' }}>{proj.name}</h4>

                        {/* Project links & duration on RIGHT */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                          {(proj.liveUrl || proj.githubUrl) && (
                            <div style={{ display: 'flex', gap: 8 }}>
                              {proj.liveUrl && (
                                <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#1c2b59', textDecoration: 'underline', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                                  <ExternalLink size={fs.descSize - 1} /> Live
                                </a>
                              )}
                              {proj.githubUrl && (
                                <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#1c2b59', textDecoration: 'underline', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                                  <Code size={fs.descSize - 1} /> Code
                                </a>
                              )}
                            </div>
                          )}
                          {(proj.startDate || proj.endDate) && (
                            <span style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#666' }}>
                              {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                            </span>
                          )}
                        </div>
                      </div>

                      {proj.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={{ margin: 0, ...textStyle, color: '#555' }} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
