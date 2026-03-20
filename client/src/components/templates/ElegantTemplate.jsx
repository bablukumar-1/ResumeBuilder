import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe, ExternalLink, Code } from 'lucide-react';

const DEFAULT_FS = { headingFont: 'Poppins', headingSize: 16, descFont: 'Calibri, Arial, sans-serif', descSize: 11 };

export default function ElegantTemplate({ resume }) {
  const { personalInfo: p, summary, experience, education, skills, projects } = resume;
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };

  const leftColWidth = '35%';

  const textStyle = {
    fontFamily: fs.descFont,
    fontSize: fs.descSize,
  };

  const ContactItem = ({ defaultIcon: DefaultIcon, text, href, isLinkedin }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#555', ...textStyle }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isLinkedin ? '#0a66c2' : '#444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <DefaultIcon size={fs.iconSize || 14} />
      </div>
      {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{text}</a> : <span>{text}</span>}
    </div>
  );

  const SectionTitle = ({ title }) => (
    <div style={{ marginBottom: '16px', position: 'relative' }}>
      <h3 style={{ margin: 0, fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize, color: '#333', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{title}</h3>
      <div style={{ width: '100%', height: '1px', background: '#ccc', marginTop: '6px' }} />
    </div>
  );

  return (
    <div style={{ padding: `${fs.marginTop ?? 0}px ${fs.marginRight ?? 0}px ${fs.marginBottom ?? 0}px ${fs.marginLeft ?? 0}px`, display: 'flex', minHeight: '100%', fontFamily: fs.descFont, background: '#fafafa', lineHeight: fs.lineHeight ?? 1.5, '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px` }}>
      
      {/* Left Column */}
      <div style={{ width: leftColWidth, padding: '40px 30px', borderRight: '1px solid #ddd' }}>
        
        {/* Profile Photo Placeholder (Using grey circle if no photo) */}
        <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: '#d1d5db', margin: '0 auto 24px', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          {p?.profilePhoto ? (
            <img src={p.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '40px' }}>
              👤
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize + 16, fontWeight: 300, margin: '0 0 8px 0', color: '#222', lineHeight: '1.1' }}>
            {p?.firstName?.toUpperCase()} <br /><span style={{ fontWeight: 600 }}>{p?.lastName?.toUpperCase()}</span>
          </h1>
          <h2 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 3, fontWeight: 500, margin: 0, color: '#666', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {p?.jobTitle}
          </h2>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '40px' }}>
          {p?.phone && <ContactItem href={`tel:${p.phone}`} defaultIcon={Phone} text={'Phone'} />}
          {p?.email && <ContactItem href={`mailto:${p.email}`} defaultIcon={Mail} text={'Email'} />}
          {p?.city && <ContactItem defaultIcon={MapPin} text={`${p.city}${p.state ? ', ' + p.state : ''}`} />}
          {p?.linkedin && <ContactItem href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`} defaultIcon={Linkedin} text={'LinkedIn'} isLinkedin={true} />}
          {p?.github && <ContactItem href={p.github.startsWith('http') ? p.github : `https://${p.github}`} defaultIcon={Github} text={'GitHub'} />}
          {p?.website && <ContactItem href={p.website.startsWith('http') ? p.website : `https://${p.website}`} defaultIcon={Globe} text={'Portfolio'} />}
        </div>

        {/* Education */}
        {education?.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <SectionTitle title="Education" />
            {education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.descSize + 1, fontWeight: 600, color: '#333', textTransform: 'uppercase' }}>{edu.degree} / {edu.field}</div>
                <div style={{ ...textStyle, color: '#555', marginTop: '2px' }}>{edu.institution}</div>
                <div style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#888', marginTop: '2px' }}>{edu.startDate} - {edu.endDate || 'Present'}</div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resume?.certifications?.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <SectionTitle title="Certifications" />
            {resume.certifications.map((cert, idx) => (
              <div key={idx} style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.descSize + 1, fontWeight: 600, color: '#333', textTransform: 'uppercase' }}>{cert.name}</div>
                <div style={{ ...textStyle, color: '#555', marginTop: '2px' }}>{cert.issuer}</div>
                <div style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#888', marginTop: '2px' }}>{cert.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <SectionTitle title="Skills" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {skills.some(s => s.category) ? (
                (() => {
                  const grouped = skills.reduce((acc, s) => {
                    const cat = s.category || 'Other';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(s.name);
                    return acc;
                  }, {});
                  return Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat}>
                      <div style={{ ...textStyle, color: '#333', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', fontSize: fs.descSize - 1 }}>{cat}</div>
                      <div style={{ ...textStyle, color: '#666' }}>{items.join(', ')}</div>
                    </div>
                  ));
                })()
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {skills.map((skill, idx) => (
                    <div key={idx} style={{ ...textStyle, color: '#444', textTransform: 'uppercase' }}>
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div style={{ flex: 1, padding: '40px' }}>
        
        {/* Profile Summary */}
        {summary && (
          <div style={{ marginBottom: '40px' }}>
            <SectionTitle title="Profile" />
            <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{ ...textStyle, margin: 0, textAlign: 'justify' }} />
          </div>
        )}

        {/* Work Experience */}
        {experience?.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <SectionTitle title="Work Experience" />
            {experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h4 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, margin: 0, fontWeight: 600, color: '#222', textTransform: 'uppercase' }}>{exp.position}</h4>
                  <span style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#666' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ ...textStyle, color: '#555', marginBottom: '6px', fontStyle: 'italic' }}>
                  {exp.company}
                </div>
                {exp.description && (
                  <div className="quill-content" dangerouslySetInnerHTML={{ __html: exp.description }} style={{ margin: 0, paddingLeft: '16px', ...textStyle, color: '#444' }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div>
            <SectionTitle title="Projects" />
            {projects.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <h4 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 2, margin: 0, fontWeight: 600, color: '#222' }}>{proj.name}</h4>
                    {(proj.techStack || []).length > 0 && <span style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#666', fontStyle: 'italic' }}>{proj.techStack.join(', ')}</span>}
                  </div>

                  {/* Project links & duration on RIGHT */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    {(proj.liveUrl || proj.githubUrl) && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ ...textStyle, color: '#222', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                            <ExternalLink size={fs.descSize - 1} /> Live
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ ...textStyle, color: '#222', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Code size={fs.descSize - 1} /> Code
                          </a>
                        )}
                      </div>
                    )}
                    {(proj.startDate || proj.endDate) && (
                      <span style={{ ...textStyle, fontSize: fs.descSize - 1, color: '#666', fontWeight: 500 }}>
                        {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                      </span>
                    )}
                  </div>
                </div>

                {proj.description && (
                  <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={{ margin: 0, paddingLeft: '16px', ...textStyle, color: '#444' }} />
                )}
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
