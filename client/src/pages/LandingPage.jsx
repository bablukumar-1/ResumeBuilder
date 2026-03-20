import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, FileText, Layout, CheckCircle2, Star, Users, Download, Github, Linkedin, Mail } from 'lucide-react';

// Map each template to its preview image (served from /public/templates/)
const TEMPLATES = [
  { id: 'modern',       name: 'Modern',       img: '/templates/modern.png',       desc: 'Two-column with dark sidebar' },
  { id: 'classic',      name: 'Classic',      img: '/templates/classic.png',      desc: 'ATS-friendly, single column' },
  { id: 'creative',     name: 'Creative',     img: '/templates/creative.png',     desc: 'Bold gradient header design' },
  { id: 'professional', name: 'Professional', img: '/templates/professional.png', desc: 'Dense structured corporate style' },
  { id: 'minimal',      name: 'Minimal',      img: '/templates/minimal.png',      desc: 'Clean lines, maximum whitespace' },
  { id: 'bold',         name: 'Bold',         img: '/templates/bold.png',         desc: 'Dark sidebar with timeline accents' },
  { id: 'elegant',      name: 'Elegant',      img: '/templates/elegant.jpg',      desc: 'Sophisticated with profile photo' },
  { id: 'executive',    name: 'Executive',    img: '/templates/executive.jpg',    desc: 'Navy header for senior roles' },
  { id: 'developer',    name: 'Developer',    img: '/templates/developer.png',    desc: 'ATS-focused dev resume with project links' },
];

const STATS = [
  { icon: Users,    label: 'Resumes Created', value: '10,000+' },
  { icon: Star,     label: 'Rating',          value: '4.9 / 5' },
  { icon: Download, label: 'PDF Downloads',   value: '25,000+' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoveredId, setHoveredId] = useState(null);

  const handleCreate = (templateId = 'modern') => {
    localStorage.setItem('pendingTemplate', templateId);
    navigate(user ? '/dashboard' : '/register');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>

      {/* ──── NAVBAR ──── */}
      <nav style={{
        padding: '0 40px', height: 64, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', background: 'rgba(15,15,25,0.85)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="FreeResumeBuilder Logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Free<span style={{ color: 'var(--accent-light)' }}>Resume</span><span style={{ color: 'var(--accent)' }}>Builder</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#templates" style={{ color: 'var(--text-secondary)', fontWeight: 500, textDecoration: 'none', fontSize: '0.9rem' }}>Templates</a>
          <a href="#features" style={{ color: 'var(--text-secondary)', fontWeight: 500, textDecoration: 'none', fontSize: '0.9rem' }}>Features</a>
          {user ? (
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '8px 18px' }}>Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--text-secondary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>Sign Up Free</Link>
            </>
          )}
        </div>
      </nav>

      {/* ──── HERO ──── */}
      <section style={{ padding: '100px 20px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'rgba(99,102,241,0.12)', color: '#818cf8', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '24px', border: '1px solid rgba(99,102,241,0.2)' }}>
          ✨ Free &amp; Open Source · 8 Premium Templates
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px', color: '#f1f5f9', maxWidth: '900px', margin: '0 auto 24px' }}>
          Build a Professional Resume <br />
          in <span style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Minutes</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Create ATS-friendly resumes that get you hired. Pick from 8 stunning templates, edit in real-time, and download your PDF instantly — completely free.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => handleCreate()} className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 28px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 8 }}>
            Create Resume Now <ArrowRight size={18} />
          </button>
          <a href="#templates" className="btn btn-ghost" style={{ fontSize: '1rem', padding: '14px 28px', borderRadius: '10px' }}>
            Browse Templates
          </a>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '60px', flexWrap: 'wrap' }}>
          {STATS.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f1f5f9' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                  <Icon size={13} /> {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──── FEATURES ──── */}
      <section id="features" style={{ background: 'var(--bg-secondary)', padding: '80px 20px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: '50px', color: '#f1f5f9' }}>Why Thousands Choose Us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {[
              { Icon: Layout,       title: '8 Premium Templates', desc: 'Professionally designed for every industry. From ATS-optimized to creative portfolios.' },
              { Icon: FileText,     title: 'Live PDF Preview',    desc: 'Watch your resume update as you type. Real-time 3-panel editor with instant preview.' },
              { Icon: CheckCircle2, title: 'ATS-Optimized',       desc: 'Every template is designed to pass Applicant Tracking Systems. Get seen by recruiters.' },
              { Icon: Download,     title: 'Instant PDF Export',  desc: 'Download a print-ready PDF with one click. Pixel-perfect output every time.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '14px', border: '1px solid var(--border)', transition: 'border-color 0.2s' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(99,102,241,0.1)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10, color: '#f1f5f9' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── TEMPLATES SHOWCASE ──── */}
      <section id="templates" style={{ padding: '80px 20px', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px', color: '#f1f5f9' }}>Select a Template to Begin</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Choose from 9 premium designs. Click any template to start building — you can switch anytime.
          </p>
        </div>

        {/* 3-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {TEMPLATES.map(tpl => (
            <div
              key={tpl.id}
              onClick={() => handleCreate(tpl.id)}
              onMouseEnter={() => setHoveredId(tpl.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
                border: hoveredId === tpl.id ? '2px solid #6366f1' : '2px solid var(--border)',
                boxShadow: hoveredId === tpl.id ? '0 20px 40px rgba(99,102,241,0.25)' : '0 4px 16px rgba(0,0,0,0.2)',
                transform: hoveredId === tpl.id ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
                background: 'var(--bg-card)',
                position: 'relative',
              }}
            >
              {/* Preview image */}
              <div style={{ height: '280px', overflow: 'hidden', background: '#e5e7eb', position: 'relative' }}>
                <img
                  src={tpl.img}
                  alt={`${tpl.name} resume template`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(99,102,241,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: hoveredId === tpl.id ? 1 : 0, transition: 'opacity 0.25s ease',
                }}>
                  <div style={{ background: '#fff', color: '#6366f1', fontWeight: 700, fontSize: '0.95rem', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    Use {tpl.name} <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#f1f5f9' }}>{tpl.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>{tpl.desc}</div>
                </div>
                <div style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', fontSize: '0.75rem', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  Free
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──── CTA BANNER ──── */}
      <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1))', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 16, color: '#f1f5f9' }}>Ready to land your dream job?</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>Create a stunning resume in minutes. It's free and no credit card required.</p>
        <button onClick={() => handleCreate()} className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 36px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Get Started — It's Free <ArrowRight size={18} />
        </button>
      </section>

      {/* ──── FOOTER ──── */}
      <footer style={{ background: 'var(--bg-secondary)', padding: '48px 20px 32px', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Footer Top */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)', marginBottom: '28px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                  Free<span style={{ color: 'var(--accent-light)' }}>Resume</span><span style={{ color: 'var(--accent)' }}>Builder</span>
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 280, lineHeight: 1.6 }}>
                Build professional resumes for free with 8 premium templates. No account required to browse.
              </p>
            </div>

            {/* Links */}
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Links</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem' }}>
                <a href="#templates" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>🎨 Templates</a>
                <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>⚡ Features</a>
                <Link to="/register" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>🚀 Get Started</Link>
                <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>🔐 Login</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Developer</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem' }}>
                <a href="https://github.com/bablukumar-1" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Github size={16} /> github.com/bablukumar-1
                </a>
                <a href="https://www.linkedin.com/in/bablu-sarkar-5a48b7282/" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Linkedin size={16} /> linkedin.com/in/bablu-sarkar
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <p style={{ margin: 0, fontSize: '0.82rem' }}>
              © {new Date().getFullYear()} FreeResumeBuilder. Reserved by <strong style={{ color: 'var(--text-primary)' }}>Bablu Kumar</strong>.
            </p>
            <p style={{ margin: 0, fontSize: '0.82rem' }}>Made with ❤️ for job seekers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
