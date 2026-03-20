import React from 'react';
import { Mail, Phone, MapPin, Link2, Briefcase, Award, GraduationCap, User, Linkedin, Github, Globe, ExternalLink, Code } from 'lucide-react';

const DEFAULT_FS = { headingFont: 'Poppins', headingSize: 16, descFont: 'Calibri, Arial, sans-serif', descSize: 11 };

function ContactLink({ href, icon: Icon, children, fs }) {
  const inner = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#fff' }}>
      <span style={{ fontSize: fs.iconSize || 16, display: 'flex', alignItems: 'center' }}>
        <Icon size={fs.iconSize || 16} />
      </span>
      <span>{children}</span>
    </div>
  );
  if (!href) return inner;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
      {inner}
    </a>
  );
}

export default function BoldTemplate({ resume }) {
  const { personalInfo: p = {}, summary, experience, education, skills, certifications, projects } = resume;
  const fs = { ...DEFAULT_FS, ...(resume?.fontSettings || {}) };
  const descStyle = { fontFamily: fs.descFont, fontSize: fs.descSize };

  const leftTheme = '#253b49';
  const accentTheme = '#5bc0de';

  const SidebarIcon = ({ Icon }) => (
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', color: leftTheme, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={20} strokeWidth={2.5} />
    </div>
  );

  const SectionIcon = ({ Icon }) => (
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: leftTheme, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
      <Icon size={16} strokeWidth={2} />
    </div>
  );

  const TimelineItem = ({ title, subtitle, date, location, children }) => (
    <div style={{ position: 'relative', paddingLeft: '24px', paddingBottom: '16px' }}>
      <div style={{ position: 'absolute', left: '-15px', top: '10px', bottom: 0, width: '2px', background: leftTheme, zIndex: 0 }} />
      <div style={{ position: 'absolute', left: '-20px', top: '8px', width: '12px', height: '12px', borderRadius: '50%', background: accentTheme, zIndex: 1 }} />
      <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', color: '#111', fontWeight: 'bold' }}>{title}</h4>
      <div style={{ fontSize: '13px', color: '#444', marginBottom: '3px' }}>{subtitle}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: accentTheme, fontStyle: 'italic', marginBottom: '6px' }}>
        <span>{date}</span>
        {location && <span style={{ color: accentTheme }}>{location}</span>}
      </div>
      <div style={{ fontSize: '12px', lineHeight: '1.5', color: '#444' }}>{children}</div>
    </div>
  );

  const contactLinks = [
    p.email    && { href: `mailto:${p.email}`,                icon: Mail,    label: 'Email'   },
    p.phone    && { href: `tel:${p.phone}`,                   icon: Phone,   label: 'Phone'   },
    p.city     && { href: null,                               icon: MapPin,  label: `${p.city}${p.state ? ', ' + p.state : ''}` },
    p.linkedin && { href: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`,
                                                              icon: Linkedin, label: 'LinkedIn' },
    p.github   && { href: p.github.startsWith('http') ? p.github : `https://${p.github}`,
                                                              icon: Github,   label: 'GitHub' },
    p.website  && { href: p.website.startsWith('http') ? p.website : `https://${p.website}`, 
                                                              icon: Globe,    label: 'Portfolio' },
  ].filter(Boolean);

  return (
    <div style={{ padding: `${fs.marginTop ?? 0}px ${fs.marginRight ?? 0}px ${fs.marginBottom ?? 0}px ${fs.marginLeft ?? 0}px`, display: 'flex', minHeight: '100%', fontFamily: '"Outfit", sans-serif', background: '#fff', lineHeight: fs.lineHeight ?? 1.5, '--section-gap': `${fs.sectionGap ?? 16}px`, '--item-gap': `${fs.itemGap ?? 8}px` }}>

      {/* Left Sidebar */}
      <div style={{ width: '32%', background: leftTheme, color: '#fff', padding: '36px 0', display: 'flex', flexDirection: 'column' }}>

        {/* Contact Info */}
        <div style={{ padding: '0 28px', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px', ...descStyle }}>
          {contactLinks.map((item, i) => (
            <ContactLink key={i} href={item.href} icon={item.icon} fs={fs}>
              {item.label}
            </ContactLink>
          ))}
        </div>

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div style={{ padding: '0 28px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <SidebarIcon Icon={User} />
              <h3 style={{ margin: 0, fontSize: '15px', letterSpacing: '2px' }}>SKILLS</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              {skills.map((skill, idx) => (
                <div key={idx}>{skill.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ flex: 1, padding: '36px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: accentTheme }} />

        {/* Header */}
        <div style={{ marginBottom: '22px' }}>
          <h1 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize + 20, fontWeight: '300', margin: '0 0 4px 0', color: leftTheme }}>
            {p.firstName} <span style={{ fontWeight: 'bold' }}>{p.lastName}</span>
          </h1>
          <h2 style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize, margin: 0, color: accentTheme, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {p.jobTitle}
          </h2>
        </div>

        {summary && <div className="quill-content" dangerouslySetInnerHTML={{ __html: summary }} style={{ ...descStyle, lineHeight: '1.6', color: '#444', marginBottom: 'var(--section-gap)' }} />}

        {/* Work Experience */}
        {experience?.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <SectionIcon Icon={Briefcase} />
              <h3 style={{ margin: 0, fontSize: '16px', color: leftTheme, letterSpacing: '1px' }}>WORK EXPERIENCE</h3>
            </div>
            <div style={{ paddingLeft: '15px' }}>
              {experience.map((exp, idx) => (
                <TimelineItem
                  key={idx} title={exp.position} subtitle={exp.company}
                  date={`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`}
                  location={exp.location}>
                  {exp.description && (
                    <div className="quill-content" dangerouslySetInnerHTML={{ __html: exp.description }} style={{ margin: 0, paddingLeft: '15px', ...descStyle }} />
                  )}
                </TimelineItem>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certifications?.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <SectionIcon Icon={Award} />
              <h3 style={{ margin: 0, fontSize: '16px', color: leftTheme, letterSpacing: '1px' }}>CERTIFICATES</h3>
            </div>
            {certifications.map((cert, idx) => (
              <div key={idx} style={{ marginBottom: '10px', paddingLeft: '15px' }}>
                <div style={{ fontSize: '13px', color: '#111' }}>{cert.name}</div>
                <div style={{ fontSize: '11px', color: '#888', fontStyle: 'italic' }}>{cert.issuer} - {cert.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <SectionIcon Icon={Link2} />
              <h3 style={{ margin: 0, fontSize: '16px', color: leftTheme, letterSpacing: '1px' }}>PROJECTS</h3>
            </div>
            {projects.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: '12px', paddingLeft: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontFamily: `${fs.headingFont}, sans-serif`, fontSize: fs.headingSize - 3, fontWeight: 'bold', color: '#111' }}>
                    {proj.name}
                  </span>

                  {/* Project links & duration on RIGHT */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    {(proj.liveUrl || proj.githubUrl) && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                            style={{ ...descStyle, color: accentTheme, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 'bold' }}>
                            <ExternalLink size={fs.descSize} /> Live
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                            style={{ ...descStyle, color: accentTheme, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 'bold' }}>
                            <Code size={fs.descSize} /> Code
                          </a>
                        )}
                      </div>
                    )}
                    {(proj.startDate || proj.endDate) && (
                      <span style={{ ...descStyle, color: '#888', fontSize: fs.descSize - 1, fontWeight: 500 }}>
                        {proj.startDate}{proj.startDate && proj.endDate ? ' - ' : ''}{proj.endDate}
                      </span>
                    )}
                  </div>
                </div>

                {(proj.techStack || []).length > 0 && (
                  <div style={{ ...descStyle, color: accentTheme, marginBottom: '2px' }}>{proj.techStack.join(' · ')}</div>
                )}
                
                {proj.description && <div className="quill-content" dangerouslySetInnerHTML={{ __html: proj.description }} style={{ ...descStyle, color: '#444', lineHeight: '1.5' }} />}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <SectionIcon Icon={GraduationCap} />
              <h3 style={{ margin: 0, fontSize: '16px', color: leftTheme, letterSpacing: '1px' }}>EDUCATION</h3>
            </div>
            <div style={{ paddingLeft: '15px' }}>
              {education.map((edu, idx) => (
                <TimelineItem
                  key={idx}
                  title={`${edu.degree} in ${edu.field}`}
                  subtitle={edu.institution}
                  date={`${edu.startDate} - ${edu.endDate || 'Present'}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
