/* PersonalInfoForm – with profile photo upload and icon selectors for contact fields */

// Available icons per contact field
const EMAIL_ICONS  = ['✉', '📧', '📨', '✉️', '📬'];
const PHONE_ICONS  = ['☎', '📞', '📱', '☏', '📲'];
const LOC_ICONS    = ['⌂', '📍', '🏠', '🗺️', '📌'];
const LI_ICONS     = ['in', '💼', '🔗', '🌐', '👤'];
const GH_ICONS     = ['⌥', '💻', '🐙', '👨‍💻', '🔧'];
const WEB_ICONS    = ['🌐', '🔗', '💡', '🌍', '🖥️'];

function IconPicker({ icons, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 5 }}>
      {icons.map(ic => (
        <button
          key={ic}
          type="button"
          onClick={() => onChange(ic)}
          style={{
            width: 30, height: 30, borderRadius: 6,
            border: value === ic ? '2px solid var(--accent)' : '1px solid var(--border)',
            background: value === ic ? 'rgba(99,102,241,0.1)' : 'var(--bg-card)',
            cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
          }}
          title={ic}
        >
          {ic}
        </button>
      ))}
    </div>
  );
}

export default function PersonalInfoForm({ data, onChange }) {
  const set = (field, val) => onChange({ ...data, [field]: val });

  const field = (label, key, placeholder, type = 'text') => (
    <div>
      <label className="label">{label}</label>
      <input type={type} className="input" value={data[key] || ''} onChange={e => set(key, e.target.value)} placeholder={placeholder} />
    </div>
  );

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('profilePhoto', ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="section-title">Personal Information</div>
      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: 'grid', gap: 14 }}>

          {/* Profile Photo Upload */}
          <div>
            <label className="label">Profile Photo (optional)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {data.profilePhoto ? (
                <img
                  src={data.profilePhoto}
                  alt="Profile"
                  style={{ width: 58, height: 58, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)', flexShrink: 0 }}
                />
              ) : (
                <div style={{
                  width: 58, height: 58, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {((data.firstName || '?').charAt(0)).toUpperCase()}
                </div>
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <input type="file" accept="image/*" id="photo-upload" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                <label htmlFor="photo-upload" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, width: 'fit-content' }}>
                  📷 {data.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                </label>
                {data.profilePhoto && (
                  <button className="btn btn-danger btn-sm" style={{ width: 'fit-content' }} onClick={() => set('profilePhoto', '')}>
                    Remove Photo
                  </button>
                )}
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Used in Modern template. JPG, PNG, max 5 MB.</span>
              </div>
            </div>
          </div>

          <hr className="divider" style={{ margin: '2px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {field('First Name', 'firstName', 'Jane')}
            {field('Last Name', 'lastName', 'Doe')}
          </div>
          {field('Job Title / Headline', 'jobTitle', 'Full Stack Developer')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {field('Email', 'email', 'jane@example.com', 'email')}
            {field('Phone', 'phone', '+1 (555) 000-0000', 'tel')}
          </div>
          {field('Address', 'address', '123 Main St')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {field('City', 'city', 'New York')}
            {field('State', 'state', 'NY')}
            {field('Country', 'country', 'USA')}
          </div>

          <hr className="divider" style={{ margin: '4px 0' }} />

          {/* LinkedIn with icon picker */}
          <div>
            <label className="label">LinkedIn URL</label>
            <input className="input" value={data.linkedin || ''} onChange={e => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/janedoe" />
            <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 4 }}>Icon:</div>
            <IconPicker icons={LI_ICONS} value={data.linkedinIcon || 'in'} onChange={v => set('linkedinIcon', v)} />
          </div>

          {/* GitHub with icon picker */}
          <div>
            <label className="label">GitHub URL</label>
            <input className="input" value={data.github || ''} onChange={e => set('github', e.target.value)} placeholder="https://github.com/janedoe" />
            <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 4 }}>Icon:</div>
            <IconPicker icons={GH_ICONS} value={data.githubIcon || '⌥'} onChange={v => set('githubIcon', v)} />
          </div>

          {/* Website with icon picker */}
          <div>
            <label className="label">Portfolio / Website</label>
            <input className="input" value={data.website || ''} onChange={e => set('website', e.target.value)} placeholder="https://janedoe.dev" />
            <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 4 }}>Icon:</div>
            <IconPicker icons={WEB_ICONS} value={data.websiteIcon || '🌐'} onChange={v => set('websiteIcon', v)} />
          </div>

          {/* Email icon picker */}
          <div>
            <label className="label">Email Icon</label>
            <IconPicker icons={EMAIL_ICONS} value={data.emailIcon || '✉'} onChange={v => set('emailIcon', v)} />
          </div>

          {/* Phone icon picker */}
          <div>
            <label className="label">Phone Icon</label>
            <IconPicker icons={PHONE_ICONS} value={data.phoneIcon || '☎'} onChange={v => set('phoneIcon', v)} />
          </div>

          {/* Location icon picker */}
          <div>
            <label className="label">Location Icon</label>
            <IconPicker icons={LOC_ICONS} value={data.locationIcon || '⌂'} onChange={v => set('locationIcon', v)} />
          </div>

        </div>
      </div>
    </div>
  );
}
