import React from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  Building2, 
  Layers, 
  ShieldCheck, 
  Calendar, 
  ChevronRight, 
  Flame, 
  Leaf, 
  Factory, 
  Compass,
  ArrowUpRight,
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface EntrepreneurDashboardProps {
  onNavigate: (tab: string) => void;
  onOpenCertificate?: (licence: any) => void;
}

export const EntrepreneurDashboard: React.FC<EntrepreneurDashboardProps> = ({ 
  onNavigate 
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { applications, setSelectedApplicationId, queries, inspections } = useApplications();

  const totalApps = applications.length;
  const approvedApps = applications.filter(a => a.currentStage === 'APPROVED').length;
  const inProgressApps = applications.filter(a => !['APPROVED', 'REJECTED', 'DRAFT'].includes(a.currentStage)).length;
  const openQueries = queries.filter(q => q.status === 'OPEN').length;

  const activeApp = applications[0]; // Spotlight application

  const handleViewApp = (appId: string, targetTab: string = 'tracking') => {
    setSelectedApplicationId(appId);
    onNavigate(targetTab);
  };

  const getDeptIcon = (shortCode: string) => {
    switch (shortCode) {
      case 'SPCB': return <Leaf size={16} color="#059669" />;
      case 'FIRE': return <Flame size={16} color="#EA580C" />;
      case 'TCPA': return <Compass size={16} color="#0284C7" />;
      case 'DIC':
      default: return <Factory size={16} color="#1D4E89" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6, 24px)' }}>
      {/* 1. PAGE HEADER & CONTEXTUAL OVERVIEW */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
        paddingBottom: 'var(--space-4)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--text-heading)' }}>
              {t.dashboard.headerTitle}
            </h1>
            <span className="badge badge-primary">{t.dashboard.badgeActive}</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.84375rem', marginTop: 4 }}>
            {t.dashboard.welcomeBack}, <strong>{user.name}</strong> • {t.dashboard.legalEntity}: <strong>{user.organization}</strong> • {t.dashboard.swcId}: <span style={{ fontFamily: 'var(--font-family-mono)' }}>SWC-ENT-2026-0891</span>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onNavigate('tracking')}
            icon={<Clock size={15} />}
          >
            {t.dashboard.btnTrack}
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onNavigate('new-application')}
            icon={<PlusCircle size={15} />}
          >
            {t.dashboard.btnNewApp}
          </Button>
        </div>
      </div>

      {/* 2. KEY METRICS ROW (Structured, restrained metrics) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--space-4)'
      }}>
        {/* Total Applications */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.dashboard.cardTotalApps}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0B2545', marginTop: 4 }}>
              {totalApps}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
              Across Composite Clearances
            </div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4E89' }}>
            <FileText size={18} />
          </div>
        </div>

        {/* In Scrutiny / Review */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.dashboard.cardInScrutiny}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#D97706', marginTop: 4 }}>
              {inProgressApps}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
              Parallel statutory scrutiny
            </div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
            <Clock size={18} />
          </div>
        </div>

        {/* Approved & Cleared */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.dashboard.cardApproved}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', marginTop: 4 }}>
              {approvedApps}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
              Digital certificates ready
            </div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* Queries Raised */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.dashboard.cardOpenQueries}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: openQueries > 0 ? '#DC2626' : '#059669', marginTop: 4 }}>
              {openQueries}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
              {openQueries > 0 ? t.dashboard.pendingAction : 'Zero pending clarifications'}
            </div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: openQueries > 0 ? '#FEF2F2' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: openQueries > 0 ? '#DC2626' : '#64748B' }}>
            <AlertTriangle size={18} />
          </div>
        </div>
      </div>

      {/* 3. ACTIVE APPLICATION PIPELINE SPOTLIGHT */}
      {activeApp && (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            backgroundColor: '#FAFAFC'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>
                  Primary Clearance Docket
                </span>
                <span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 800, color: '#0B2545', fontSize: '1.05rem' }}>
                  {activeApp.id}
                </span>
                <span className={`badge ${activeApp.category === 'RED' ? 'badge-danger' : activeApp.category === 'ORANGE' ? 'badge-warning' : 'badge-success'}`}>
                  {activeApp.category} Category
                </span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: 2 }}>
                {activeApp.businessName} • {activeApp.sector}
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleViewApp(activeApp.id, 'tracking')}
              icon={<ChevronRight size={14} />}
              iconPosition="right"
            >
              Open Workflow Timeline
            </Button>
          </div>

          <div style={{ padding: '20px 24px' }}>
            {/* Progress Stage Bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Statutory Clearance Progress: <strong style={{ color: '#0B2545' }}>{activeApp.stageProgress}%</strong>
                </span>
                <StatusBadge status={activeApp.currentStage} size="sm" />
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
                <div style={{ width: `${activeApp.stageProgress}%`, height: '100%', backgroundColor: '#1D4E89', borderRadius: 9999, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Parallel Department Reviews Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: 12
            }}>
              {activeApp.departments.map((dept, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 6,
                    padding: '14px',
                    backgroundColor: dept.status === 'QUERY_RAISED' ? 'var(--color-danger-bg)' : dept.status === 'APPROVED' ? 'var(--color-success-bg)' : '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {getDeptIcon(dept.shortCode)}
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {dept.shortCode}
                      </span>
                    </div>
                    <StatusBadge status={dept.status} size="sm" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 6, lineHeight: 1.3 }}>
                    {dept.departmentName}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    Officer: <strong>{dept.assignedOfficer}</strong>
                  </div>
                  {dept.remarks && (
                    <div style={{ fontSize: '0.6875rem', color: 'var(--color-danger-text)', marginTop: 4, fontStyle: 'italic' }}>
                      Note: {dept.remarks}
                    </div>
                  )}
                  {dept.approvalCertificateNo && (
                    <div style={{ fontSize: '0.6875rem', color: 'var(--color-success-text)', marginTop: 4, fontWeight: 600 }}>
                      NOC: {dept.approvalCertificateNo}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. APPLICATIONS RECORD TABLE */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAFAFC'
        }}>
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0B2545' }}>
              My Industrial Clearance Filings
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
              Official repository of single-window statutory filings and current departmental scrutiny stages.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onNavigate('applications')}>
            View All Dockets
          </Button>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Enterprise Name</th>
                <th>Category</th>
                <th>Investment</th>
                <th>Current Status</th>
                <th>Clearance Ratio</th>
                <th>Last Updated</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => {
                const approvedCount = app.departments.filter(d => d.status === 'APPROVED').length;
                const totalDepts = app.departments.length;

                return (
                  <tr key={app.id}>
                    <td>
                      <span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 700, color: '#1D4E89' }}>
                        {app.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{app.businessName}</div>
                      <div style={{ fontSize: '0.71875rem', color: 'var(--text-muted)' }}>{app.proposedLocation.industrialArea}, {app.proposedLocation.district}</div>
                    </td>
                    <td>
                      <span className={`badge ${app.category === 'RED' ? 'badge-danger' : app.category === 'ORANGE' ? 'badge-warning' : 'badge-success'}`}>
                        {app.category}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>₹{(app.investmentInLakhs / 100).toFixed(2)} Cr</span>
                    </td>
                    <td>
                      <StatusBadge status={app.currentStage} size="sm" />
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{approvedCount}/{totalDepts}</span>
                        <div style={{ width: 50, height: 5, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${(approvedCount / totalDepts) * 100}%`, height: '100%', backgroundColor: approvedCount === totalDepts ? '#059669' : '#1D4E89' }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.lastUpdatedAt}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewApp(app.id, 'tracking')}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. DUAL SUMMARY WIDGETS: INSPECTIONS & QUERIES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 'var(--space-6)'
      }}>
        {/* Inspections Widget */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={18} color="#1D4E89" />
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0B2545' }}>
                Upcoming Field Inspections
              </h4>
            </div>
            <button 
              type="button" 
              className="btn btn-ghost btn-sm"
              onClick={() => onNavigate('inspections')}
              style={{ color: '#1D4E89', fontWeight: 600 }}
            >
              Manage →
            </button>
          </div>

          {inspections.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>No site inspections currently scheduled.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {inspections.slice(0, 2).map(insp => (
                <div 
                  key={insp.id}
                  style={{
                    padding: '12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: 6,
                    backgroundColor: '#FAFAFC'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0B2545' }}>
                      {insp.department}
                    </span>
                    <StatusBadge status={insp.status} size="sm" />
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1E293B' }}>
                    {insp.businessName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
                    Date: <strong>{insp.scheduledDate} ({insp.scheduledTime})</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Queries Widget */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <HelpCircle size={18} color="#DC2626" />
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0B2545' }}>
                Department Queries & Clarifications
              </h4>
            </div>
            <button 
              type="button" 
              className="btn btn-ghost btn-sm"
              onClick={() => onNavigate('queries')}
              style={{ color: '#1D4E89', fontWeight: 600 }}
            >
              Respond →
            </button>
          </div>

          {queries.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>Zero open queries. All dockets are in good order.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {queries.slice(0, 2).map(q => (
                <div 
                  key={q.id}
                  style={{
                    padding: '12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: 6,
                    backgroundColor: q.status === 'OPEN' ? '#FEF2F2' : '#FAFAFC'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0B2545' }}>
                      {q.department}
                    </span>
                    <StatusBadge status={q.status} size="sm" />
                  </div>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#475569',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {q.question}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, fontSize: '0.6875rem' }}>
                    <span style={{ color: '#991B1B', fontWeight: 600 }}>Due: {q.dueDate}</span>
                    <Button variant="outline" size="sm" onClick={() => onNavigate('queries')}>
                      Reply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
