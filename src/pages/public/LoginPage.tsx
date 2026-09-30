import React, { useState } from 'react';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import { 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Shield,
  FileCheck2,
  Briefcase
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (tab: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, loginAs } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('entrepreneur@portal.gov.in');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email address and password.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const ok = await login(email, password);
      if (ok) {
        setSuccess(true);
        setTimeout(() => {
          onNavigate('dashboard');
        }, 400);
      } else {
        setError('Authentication failed. Please verify your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check server connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (role: UserRole) => {
    setIsLoading(true);
    setError(null);
    try {
      await loginAs(role);
      setSuccess(true);
      setTimeout(() => {
        onNavigate('dashboard');
      }, 400);
    } catch (err: any) {
      setError(err.message || `Failed to login as ${role}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - var(--navbar-height))',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
      backgroundColor: 'var(--bg-app)'
    }}>
      {/* LEFT: Official Branding & Statutory Hero */}
      <div style={{
        background: 'linear-gradient(145deg, #07192F 0%, #0B2545 60%, #133E70 100%)',
        color: '#FFFFFF',
        padding: 'var(--space-12) var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        <div>
          <Logo variant="light" size="lg" />
          <div style={{ marginTop: 'var(--space-8)' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#38BDF8',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(56, 189, 248, 0.25)'
            }}>
              Statutory Single Window System
            </span>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', color: '#FFFFFF', marginTop: 'var(--space-3)', lineHeight: 1.25 }}>
              Secured Enterprise & Government Gateway
            </h2>
            <p style={{ color: '#CBD5E1', marginTop: 'var(--space-3)', fontSize: '0.9375rem', lineHeight: 1.6, maxWidth: 460 }}>
              Access consolidated clearance applications, track parallel department reviews in real-time, reply to queries, and download legally verifiable digital NOCs.
            </p>
          </div>
        </div>

        {/* Feature Highlights on Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', margin: 'var(--space-8) 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#E2E8F0', fontSize: '0.875rem' }}>
            <ShieldCheck size={18} color="#34D399" /> 256-bit encrypted credential management
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#E2E8F0', fontSize: '0.875rem' }}>
            <CheckCircle2 size={18} color="#34D399" /> Real-time SMS & email clearance notifications
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#E2E8F0', fontSize: '0.875rem' }}>
            <CheckCircle2 size={18} color="#34D399" /> Integrated with State Ease of Doing Business Act SLA
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div style={{ fontSize: '0.75rem', color: '#94A3B8', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 'var(--space-4)' }}>
          Unauthorized access attempt to state industrial systems is punishable under Section 43 & 66 of the Information Technology Act 2000.
        </div>
      </div>

      {/* RIGHT: Login Card */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 440,
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              {t.login.heading}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 4 }}>
              {t.login.subtitle}
            </p>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 'var(--space-3)',
              backgroundColor: 'var(--color-danger-bg)',
              color: 'var(--color-danger-text)',
              border: '1px solid var(--color-danger-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem',
              marginBottom: 'var(--space-4)'
            }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {success && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 'var(--space-3)',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success-text)',
              border: '1px solid var(--color-success-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem',
              marginBottom: 'var(--space-4)'
            }}>
              <CheckCircle2 size={16} />
              {t.login.loggingIn}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                {t.login.emailLabel} <span className="required">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  style={{ paddingLeft: '36px' }}
                />
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <label className="form-label" style={{ margin: 0 }}>
                  {t.login.passwordLabel} <span className="required">*</span>
                </label>
                <a href="#forgot" onClick={e => { e.preventDefault(); alert('Password reset link sent to registered email.'); }} style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  {t.login.forgotPassword}
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ paddingLeft: '36px', paddingRight: '36px' }}
                />
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-6)' }}>
              <input 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe} 
                onChange={e => setRememberMe(e.target.checked)} 
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                {t.login.rememberMe}
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              style={{ width: '100%' }}
            >
              {t.login.btnSubmit}
            </Button>
          </form>

          {/* Quick Demo Role Selector */}
          <div style={{ marginTop: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'center', marginBottom: 'var(--space-3)' }}>
              {t.login.quickDemoHeading}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('ENTREPRENEUR')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '0.75rem' }}
              >
                <Building2 size={13} color="var(--color-primary-600)" /> {t.roles.entrepreneur}
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('DEPARTMENT_OFFICER')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '0.75rem' }}
              >
                <FileCheck2 size={13} color="var(--color-primary-600)" /> {t.roles.officer}
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('INSPECTOR')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '0.75rem' }}
              >
                <ShieldCheck size={13} color="var(--color-accent-600)" /> {t.roles.inspector}
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('ADMIN')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', fontSize: '0.75rem' }}
              >
                <Briefcase size={13} color="var(--color-warning)" /> {t.roles.admin}
              </button>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-6)', textAlign: 'center', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
            {t.login.noAccount}{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary-700)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
            >
              {t.login.registerNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
