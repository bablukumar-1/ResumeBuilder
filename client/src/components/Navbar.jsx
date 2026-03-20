import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LayoutDashboard, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img src="/logo.png" alt="Logo" style={{ width: 32, height: 32, borderRadius: 7, objectFit: 'cover' }} />
        <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
          Free<span style={{ color: 'var(--accent-light)' }}>Resume</span><span style={{ color: 'var(--accent)' }}>Builder</span>
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {location.pathname !== '/' && (
          <Link to="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
        )}
        {user && location.pathname !== '/dashboard' && (
          <Link to="/dashboard" className="btn btn-ghost btn-sm">
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
        )}

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 12px',
              background: 'var(--bg-card)',
              borderRadius: 999,
              border: '1px solid var(--border)',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <User size={13} color="#fff" />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </span>
            </div>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm" title="Logout">
              <LogOut size={15} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
