import React, { useState, useRef, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { NotificationDropdown } from './NotificationDropdown';
import { UserProfileDropdown } from './UserProfileDropdown';
import { 
  ChevronDown, 
  Bell, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  FolderLock, 
  Menu, 
  Sparkles, 
  ClipboardList, 
  Clock, 
  Layers, 
  CheckCircle2, 
  FileSearch, 
  RefreshCw, 
  LifeBuoy
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onToggleSidebar: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab, 
  onNavigate, 
  onToggleSidebar 
}) => {
  const { user, isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();
  const { t } = useLanguage();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleNavDropdown = (menuName: string) => {
    setActiveDropdown(prev => prev === menuName ? null : menuName);
    setIsNotifOpen(false);
    setIsProfileOpen(false);
  };

  const handleSelectNav = (tab: string) => {
    onNavigate(tab);
    setActiveDropdown(null);
  };

  return (
    <header ref={navRef} className="portal-navbar">
      <div className="portal-navbar-inner">
        {/* LEFT: Sidebar Toggle + Portal Logo */}
        <div className="navbar-brand-section">
          {isAuthenticated && (
            <button
              type="button"
              className="navbar-toggle-btn"
              onClick={onToggleSidebar}
              title="Toggle Navigation Menu"
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={19} />
            </button>
          )}

          <div 
            onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Industrial Approval Portal - Home"
          >
            <Logo variant="full" size="md" />
          </div>
        </div>

        {/* CENTER / MAIN NAVIGATION */}
        {isAuthenticated && (
          <nav className="navbar-center-menu" aria-label="Main Navigation">
            {/* Dashboard */}
            <button
              type="button"
              onClick={() => handleSelectNav('dashboard')}
              className={`navbar-nav-link ${currentTab === 'dashboard' ? 'is-active' : ''}`}
            >
              {t.nav.dashboard}
            </button>

            {/* Applications Group */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => toggleNavDropdown('applications')}
                className={`navbar-nav-link ${['applications', 'new-application', 'tracking'].includes(currentTab) ? 'is-active' : ''}`}
              >
                {t.nav.applications} 
                <ChevronDown size={13} style={{ transform: activeDropdown === 'applications' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {activeDropdown === 'applications' && (
                <div className="navbar-dropdown-card" style={{ left: 0 }}>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('applications')}>
                    <ClipboardList size={15} color="#1D4E89" />
                    <span>{t.nav.myApplications}</span>
                  </button>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('new-application')}>
                    <Sparkles size={15} color="#059669" />
                    <span>{t.nav.newApplication}</span>
                  </button>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('tracking')}>
                    <Clock size={15} color="#0284C7" />
                    <span>{t.nav.tracking}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Approvals Group */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => toggleNavDropdown('approvals')}
                className={`navbar-nav-link ${['recommendations', 'approvals', 'final-approval'].includes(currentTab) ? 'is-active' : ''}`}
              >
                {t.nav.approvals} 
                <ChevronDown size={13} style={{ transform: activeDropdown === 'approvals' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {activeDropdown === 'approvals' && (
                <div className="navbar-dropdown-card" style={{ left: 0 }}>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('recommendations')}>
                    <Sparkles size={15} color="#1D4E89" />
                    <span>{t.nav.recommendations}</span>
                  </button>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('approvals')}>
                    <Layers size={15} color="#0284C7" />
                    <span>{t.nav.departmentClearances}</span>
                  </button>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('final-approval')}>
                    <CheckCircle2 size={15} color="#059669" />
                    <span>{t.nav.finalApproval}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Documents */}
            <button
              type="button"
              onClick={() => handleSelectNav('documents')}
              className={`navbar-nav-link ${currentTab === 'documents' ? 'is-active' : ''}`}
            >
              {t.nav.documents}
            </button>

            {/* More Group */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => toggleNavDropdown('more')}
                className={`navbar-nav-link ${['inspections', 'queries', 'renewals', 'analytics', 'help'].includes(currentTab) ? 'is-active' : ''}`}
              >
                {t.nav.more} 
                <ChevronDown size={13} style={{ transform: activeDropdown === 'more' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {activeDropdown === 'more' && (
                <div className="navbar-dropdown-card" style={{ left: 0 }}>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('inspections')}>
                    <ClipboardList size={15} color="#1D4E89" />
                    <span>{t.nav.inspections}</span>
                  </button>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('queries')}>
                    <HelpCircle size={15} color="#DC2626" />
                    <span>{t.nav.queries}</span>
                  </button>
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('renewals')}>
                    <RefreshCw size={15} color="#D97706" />
                    <span>{t.nav.renewals}</span>
                  </button>
                  <div className="navbar-dropdown-divider" />
                  <button type="button" className="navbar-dropdown-item" onClick={() => handleSelectNav('help')}>
                    <LifeBuoy size={15} color="#64748B" />
                    <span>{t.nav.help}</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}

        {/* RIGHT: Language Selector, Role Badge, Notifications, Profile Avatar */}
        <div className="navbar-right-section">
          {/* Dedicated Language Selector Switcher */}
          <LanguageSelector size="sm" />

          {isAuthenticated ? (
            <>
              {/* User Role Indicator Pill */}
              <div 
                onClick={() => setIsProfileOpen(true)}
                className="navbar-role-badge"
                title={t.roles.switchPersona}
              >
                <span className="navbar-role-dot" />
                <span>
                  {user.role === 'ENTREPRENEUR' 
                    ? t.roles.entrepreneur 
                    : user.role === 'DEPARTMENT_OFFICER' 
                      ? t.roles.officer 
                      : user.role === 'INSPECTOR' 
                        ? t.roles.inspector 
                        : t.roles.admin}
                </span>
                <ChevronDown size={12} color="#64748B" />
              </div>

              {/* Notification Bell & Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifOpen(!isNotifOpen);
                    setIsProfileOpen(false);
                    setActiveDropdown(null);
                  }}
                  className="navbar-icon-button"
                  title={t.nav.notifications}
                  aria-label={t.nav.notifications}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="navbar-notification-count">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <NotificationDropdown 
                  isOpen={isNotifOpen} 
                  onClose={() => setIsNotifOpen(false)} 
                  onNavigate={onNavigate} 
                />
              </div>

              {/* Profile Trigger & Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotifOpen(false);
                    setActiveDropdown(null);
                  }}
                  className="navbar-profile-trigger"
                  title="User Account & Persona Switch"
                  aria-label="User Account"
                >
                  <div className="navbar-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={13} color="#64748B" />
                </button>

                <UserProfileDropdown
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                  onNavigate={onNavigate}
                />
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => onNavigate('login')}
              >
                {t.nav.signIn}
              </button>
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={() => onNavigate('register')}
              >
                {t.nav.registerBusiness}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
