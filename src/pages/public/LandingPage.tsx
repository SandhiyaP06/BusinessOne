import React, { useState } from 'react';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { BusinessChecklistModal } from '../../components/common/BusinessChecklistModal';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  FileCheck2, 
  ClipboardCheck, 
  Clock, 
  BarChart3, 
  Sparkles, 
  Building2, 
  Award, 
  ChevronRight, 
  ChevronDown,
  Lock,
  Globe2,
  Users,
  Search,
  ClipboardList
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [trackId, setTrackId] = useState('');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const features = [
    {
      icon: Layers,
      title: t.landing.feature1Title,
      desc: t.landing.feature1Desc
    },
    {
      icon: Sparkles,
      title: t.landing.feature2Title,
      desc: t.landing.feature2Desc
    },
    {
      icon: FileCheck2,
      title: t.landing.feature3Title,
      desc: t.landing.feature3Desc
    },
    {
      icon: Clock,
      title: t.landing.feature4Title,
      desc: t.landing.feature4Desc
    },
    {
      icon: ClipboardCheck,
      title: t.landing.feature5Title,
      desc: t.landing.feature5Desc
    },
    {
      icon: Award,
      title: t.landing.feature6Title,
      desc: t.landing.feature6Desc
    }
  ];

  const steps = [
    { num: '01', title: t.landing.step1Title, desc: t.landing.step1Desc },
    { num: '02', title: t.landing.step2Title, desc: t.landing.step2Desc },
    { num: '03', title: t.landing.step3Title, desc: t.landing.step3Desc },
    { num: '04', title: t.landing.step4Title, desc: t.landing.step4Desc },
    { num: '05', title: t.landing.step5Title, desc: t.landing.step5Desc },
    { num: '06', title: t.landing.step6Title, desc: t.landing.step6Desc },
    { num: '07', title: t.landing.step7Title, desc: t.landing.step7Desc }
  ];

  const faqs = [
    {
      q: t.landing.faq1Q,
      a: t.landing.faq1A
    },
    {
      q: t.landing.faq2Q,
      a: t.landing.faq2A
    },
    {
      q: t.landing.faq3Q,
      a: t.landing.faq3A
    },
    {
      q: t.landing.faq4Q,
      a: t.landing.faq4A
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-app)' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #07192F 0%, #0B2545 60%, #133E70 100%)',
        color: '#FFFFFF',
        padding: 'var(--space-12) var(--space-8) var(--space-16)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle grid pattern backdrop */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          opacity: 0.7,
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-10)',
          alignItems: 'center'
        }}>
          {/* Hero Left Content */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8125rem',
              color: '#93C5FD',
              fontWeight: 600,
              marginBottom: 'var(--space-4)'
            }}>
              <ShieldCheck size={16} color="#34D399" />
              {t.landing.heroBadge}
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: 'var(--space-4)',
              letterSpacing: '-0.025em'
            }}>
              {t.landing.heroHeadingLine1} <br />
              <span style={{ color: '#38BDF8' }}>{t.landing.heroHeadingHighlight}</span>
            </h1>

            <p style={{
              fontSize: 'var(--font-size-base)',
              color: '#CBD5E1',
              lineHeight: 1.6,
              marginBottom: 'var(--space-6)',
              maxWidth: 540
            }}>
              {t.landing.heroDesc}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
              <Button 
                variant="accent" 
                size="lg" 
                icon={<ArrowRight size={18} />} 
                iconPosition="right"
                onClick={() => onNavigate('new-application')}
                style={{ backgroundColor: '#059669', borderColor: '#059669', padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
              >
                {t.landing.startNewApp}
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setIsChecklistOpen(true)}
                icon={<ClipboardList size={18} />}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)', padding: '0.8rem 1.4rem', fontSize: '0.95rem' }}
              >
                {t.checklist.heroButton}
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => onNavigate('tracking')}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                {t.landing.trackExisting}
              </Button>
            </div>

            {/* Quick Track Bar */}
            <form onSubmit={e => { e.preventDefault(); onNavigate('tracking'); }} style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '4px 6px 4px 14px',
              maxWidth: 460
            }}>
              <Search size={16} color="#94A3B8" style={{ marginRight: 8 }} />
              <input 
                type="text" 
                placeholder={t.landing.trackInputPlaceholder} 
                value={trackId}
                onChange={e => setTrackId(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  flex: 1
                }}
              />
              <button 
                type="submit" 
                className="btn btn-sm btn-primary"
                style={{ backgroundColor: '#1D4E89', borderColor: '#2563EB' }}
              >
                {t.landing.trackBtn}
              </button>
            </form>
          </div>

          {/* Hero Right Visual: Enterprise Dashboard Preview Mockup */}
          <div style={{
            backgroundColor: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Window bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 'var(--space-3)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: 'var(--space-3)'
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
              </div>
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontFamily: 'var(--font-family-mono)' }}>
                {t.landing.mockUrl}
              </span>
              <span style={{ fontSize: '0.6875rem', color: '#34D399', fontWeight: 600 }}>{t.landing.slaActive}</span>
            </div>

            {/* Visual Workflow Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {/* Active Application Card */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.75rem', color: '#93C5FD', fontWeight: 700 }}>APP-2026-IND-04829</span>
                  <span style={{ fontSize: '0.6875rem', color: '#34D399', backgroundColor: 'rgba(5, 150, 105, 0.2)', padding: '2px 8px', borderRadius: 10 }}>{t.landing.inProgress}</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>AeroTech Propulsion Systems Pvt Ltd</div>
                <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: 2 }}>Aerospace & Defence Hub, Bengaluru Rural</div>
              </div>

              {/* Parallel Department Bars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: 8, borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Industries Dept</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34D399', marginTop: 2 }}>{t.landing.approved}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: 8, borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Pollution Board</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FBBF24', marginTop: 2 }}>{t.landing.inScrutiny}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: 8, borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Fire Services</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60A5FA', marginTop: 2 }}>{t.landing.scheduled}</div>
                </div>
              </div>

              {/* Verified Digital Seal Badge */}
              <div style={{
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  backgroundColor: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34D399' }}>{t.landing.instantNocTitle}</div>
                  <div style={{ fontSize: '0.6875rem', color: '#CBD5E1' }}>{t.landing.instantNocDesc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key State Performance Metrics Bar */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-subtle)',
        padding: 'var(--space-6) var(--space-8)'
      }}>
        <div style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-6)',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-primary-800)' }}>{t.landing.metricsUnitsCleared}</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>{t.landing.metricsUnitsLabel}</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-accent-600)' }}>{t.landing.metricsAvgSla}</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>{t.landing.metricsSlaLabel}</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-primary-800)' }}>{t.landing.metricsInvestment}</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>{t.landing.metricsInvestmentLabel}</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-accent-600)' }}>{t.landing.metricsApprovalRatio}</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>{t.landing.metricsRatioLabel}</div>
          </div>
        </div>
      </section>

      {/* Why Use the Portal? / Features Grid */}
      <section style={{ padding: 'var(--space-12) var(--space-8)' }}>
        <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-primary-600)',
              backgroundColor: 'var(--color-primary-50)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)'
            }}>
              {t.landing.featuresBadge}
            </span>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', marginTop: 'var(--space-2)', color: 'var(--text-heading)' }}>
              {t.landing.featuresHeading}
            </h2>
            <p style={{ maxWidth: 640, margin: 'var(--space-2) auto 0', color: 'var(--text-muted)' }}>
              {t.landing.featuresSubheading}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-6)'
          }}>
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div 
                  key={idx} 
                  className="card card-hover" 
                  style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-50)',
                    color: 'var(--color-primary-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - 7 Stage Process */}
      <section style={{ backgroundColor: '#F1F5F9', padding: 'var(--space-12) var(--space-8)' }}>
        <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--text-heading)' }}>
              {t.landing.journeyHeading}
            </h2>
            <p style={{ maxWidth: 600, margin: 'var(--space-2) auto 0', color: 'var(--text-muted)' }}>
              {t.landing.journeySubheading}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-4)'
          }}>
            {steps.map((st, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  boxShadow: 'var(--shadow-xs)',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 800,
                  color: 'var(--color-primary-600)',
                  opacity: 0.6,
                  fontFamily: 'var(--font-family-mono)',
                  marginBottom: 'var(--space-2)'
                }}>
                  {st.num}
                </div>
                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section style={{ padding: 'var(--space-12) var(--space-8)' }}>
        <div style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          backgroundColor: '#0B2545',
          borderRadius: 'var(--radius-xl)',
          color: '#FFFFFF',
          padding: 'var(--space-10) var(--space-8)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-8)',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ color: '#38BDF8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t.landing.securityBadge}
            </span>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', color: '#FFFFFF', marginTop: 'var(--space-2)', lineHeight: 1.3 }}>
              {t.landing.securityHeading}
            </h2>
            <p style={{ color: '#CBD5E1', marginTop: 'var(--space-3)', lineHeight: 1.6 }}>
              {t.landing.securityDesc}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
              <Button 
                variant="accent"
                onClick={() => onNavigate('register')}
                style={{ backgroundColor: '#059669', borderColor: '#059669' }}
              >
                {t.landing.createAccountBtn}
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('login')}
                style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)' }}
              >
                {t.landing.accessOfficerBtn}
              </Button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
              <Lock size={20} color="#38BDF8" style={{ marginBottom: 6 }} />
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.landing.securityItem1Title}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>{t.landing.securityItem1Desc}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
              <ShieldCheck size={20} color="#34D399" style={{ marginBottom: 6 }} />
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.landing.securityItem2Title}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>{t.landing.securityItem2Desc}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
              <Clock size={20} color="#FBBF24" style={{ marginBottom: 6 }} />
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.landing.securityItem3Title}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>{t.landing.securityItem3Desc}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
              <Globe2 size={20} color="#60A5FA" style={{ marginBottom: 6 }} />
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.landing.securityItem4Title}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 4 }}>{t.landing.securityItem4Desc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '0 var(--space-8) var(--space-16)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-heading)' }}>
              {t.landing.faqHeading}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: 4 }}>
              {t.landing.faqSubheading}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: 'var(--space-4) var(--space-5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={18} 
                      color="var(--text-muted)" 
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0, marginLeft: 12 }} 
                    />
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 var(--space-5) var(--space-4)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-subtle)'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pre-Registration Clearance Checklist Modal */}
      <BusinessChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
};
