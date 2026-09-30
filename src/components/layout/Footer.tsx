import React from 'react';
import { Shield, ExternalLink, Globe, PhoneCall, Mail } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../common/LanguageSelector';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer style={{
      backgroundColor: '#07192F',
      color: '#CBD5E1',
      borderTop: '1px solid #1E293B',
      marginTop: 'auto',
      fontSize: 'var(--font-size-xs)'
    }}>
      <div style={{
        maxWidth: 'var(--max-content-width)',
        margin: '0 auto',
        padding: 'var(--space-10) var(--space-8) var(--space-6)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-8)'
        }}>
          {/* Col 1: Portal Brand */}
          <div>
            <Logo variant="light" size="sm" />
            <p style={{ color: '#94A3B8', marginTop: 'var(--space-3)', lineHeight: 1.6, fontSize: '0.8125rem' }}>
              {t.footer.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'var(--space-3)', color: '#38BDF8', fontSize: '0.75rem' }}>
              <Shield size={14} /> {t.footer.nswsBadge}
            </div>
            {/* Quick Language Switcher Pills */}
            <div style={{ marginTop: 'var(--space-4)' }}>
              <div style={{ fontSize: '0.6875rem', color: '#64748B', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                {t.footer.switchLang}
              </div>
              <LanguageSelector variant="pills" />
            </div>
          </div>

          {/* Col 2: Statutory Clearances */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
              {t.footer.servicesTitle}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li><a href="#/recommendations" style={{ color: '#94A3B8' }}>{t.footer.service1}</a></li>
              <li><a href="#/tracking" style={{ color: '#94A3B8' }}>{t.footer.service2}</a></li>
              <li><a href="#/documents" style={{ color: '#94A3B8' }}>{t.footer.service3}</a></li>
              <li><a href="#/inspections" style={{ color: '#94A3B8' }}>{t.footer.service4}</a></li>
              <li><a href="#/renewals" style={{ color: '#94A3B8' }}>{t.footer.service5}</a></li>
            </ul>
          </div>

          {/* Col 3: Participating Departments */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
              {t.footer.bodiesTitle}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li><span style={{ color: '#94A3B8' }}>{t.footer.body1}</span></li>
              <li><span style={{ color: '#94A3B8' }}>{t.footer.body2}</span></li>
              <li><span style={{ color: '#94A3B8' }}>{t.footer.body3}</span></li>
              <li><span style={{ color: '#94A3B8' }}>{t.footer.body4}</span></li>
              <li><span style={{ color: '#94A3B8' }}>{t.footer.body5}</span></li>
            </ul>
          </div>

          {/* Col 4: Citizen Helpline & Support */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
              {t.footer.helpdeskTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8' }}>
                <PhoneCall size={14} color="#38BDF8" /> {t.footer.tollFree}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8' }}>
                <Mail size={14} color="#38BDF8" /> {t.footer.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8' }}>
                <Globe size={14} color="#38BDF8" /> {t.footer.address}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          color: '#64748B'
        }}>
          <div>
            {t.footer.copyright}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '0.75rem' }}>
            <span style={{ color: '#94A3B8' }}>{t.footer.terms}</span>
            <span style={{ color: '#94A3B8' }}>{t.footer.privacy}</span>
            <span style={{ color: '#94A3B8' }}>{t.footer.slaCharter}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

