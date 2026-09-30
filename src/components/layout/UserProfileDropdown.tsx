import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import { 
  User, 
  Building2, 
  ShieldCheck, 
  LogOut, 
  KeyRound, 
  HelpCircle,
  FileCheck,
  Briefcase
} from 'lucide-react';

interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ isOpen, onClose, onNavigate }) => {
  const { user, setRole, logout } = useAuth();
  const { t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const roles: { role: UserRole; title: string; desc: string; icon: any }[] = [
    { role: 'ENTREPRENEUR', title: t.roles.entrepreneurTitle, desc: t.roles.entrepreneurDesc, icon: Building2 },
    { role: 'DEPARTMENT_OFFICER', title: t.roles.officerTitle, desc: t.roles.officerDesc, icon: FileCheck },
    { role: 'INSPECTOR', title: t.roles.inspectorTitle, desc: t.roles.inspectorDesc, icon: ShieldCheck },
    { role: 'ADMIN', title: t.roles.adminTitle, desc: t.roles.adminDesc, icon: Briefcase }
  ];

  return (
    <div 
      ref={dropdownRef} 
      className="dropdown-menu" 
      style={{ width: 290, right: 0, padding: 0 }}
    >
      {/* Header Info */}
      <div style={{
        padding: 'var(--space-4)',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-800)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 'var(--font-size-base)'
          }}>
            {user.name.charAt(0)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              {user.designation || user.role}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-primary-600)', fontWeight: 600 }}>
              {user.organization || 'Govt of India'}
            </div>
          </div>
        </div>
      </div>

      {/* Role Switcher Section */}
      <div style={{ padding: 'var(--space-2) var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, margin: '4px 0 8px' }}>
          {t.roles.switchPersona}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = user.role === r.role;
            return (
              <button
                key={r.role}
                type="button"
                onClick={() => {
                  setRole(r.role);
                  onClose();
                  onNavigate('dashboard');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '1px solid var(--color-primary-600)' : '1px solid transparent',
                  backgroundColor: isActive ? 'var(--color-primary-50)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--color-primary-700)' : 'var(--text-muted)'} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--color-primary-800)' : 'var(--text-main)' }}>
                    {r.title}
                  </div>
                </div>
                {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary-700)' }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Account Links */}
      <div style={{ padding: 'var(--space-2) 0' }}>
        <button
          type="button"
          className="dropdown-item"
          onClick={() => { onClose(); onNavigate('renewals'); }}
        >
          <KeyRound size={15} />
          {t.sidebar.digitalCertificates}
        </button>
        <button
          type="button"
          className="dropdown-item"
          onClick={() => { onClose(); onNavigate('help'); }}
        >
          <HelpCircle size={15} />
          {t.sidebar.guidelines}
        </button>
        <div className="dropdown-divider" />
        <button
          type="button"
          className="dropdown-item"
          onClick={() => { onClose(); logout(); }}
          style={{ color: 'var(--color-danger)' }}
        >
          <LogOut size={15} />
          {t.nav.signOut}
        </button>
      </div>
    </div>
  );
};
