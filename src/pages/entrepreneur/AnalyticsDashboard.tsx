import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  mockDepartmentMetrics, 
  mockMonthlyTrends, 
  mockPortalSummary 
} from '../../data/mockAnalytics';
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Download, 
  Calendar,
  AlertCircle,
  Building2
} from 'lucide-react';

import AnalyticsService, { AnalyticsOverview } from '../../services/analyticsService';

export const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'6M' | '1Y' | 'ALL'>('6M');
  const [realOverview, setRealOverview] = useState<AnalyticsOverview | null>(null);

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await AnalyticsService.getOverview();
        if (data) {
          setRealOverview(data);
        }
      } catch (err) {
        console.warn('Analytics live fetch fallback:', err);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const summary = realOverview?.summary ? {
    totalApplications: realOverview.summary.totalApplications || mockPortalSummary.totalApplications,
    approvalRate: realOverview.summary.totalApplications ? Math.round((realOverview.summary.approved / realOverview.summary.totalApplications) * 100) : mockPortalSummary.approvalRate,
    avgDisposalDays: realOverview.summary.avgDisposalDays || mockPortalSummary.averageTurnaroundDays,
    slaComplianceRate: realOverview.summary.statutorySlaComplianceRate || 92.4,
    totalInvestmentCrores: realOverview.summary.totalInvestmentCrores || mockPortalSummary.totalCapitalInvestedCrores
  } : {
    totalApplications: mockPortalSummary.totalApplications,
    approvalRate: mockPortalSummary.approvalRate,
    avgDisposalDays: mockPortalSummary.averageTurnaroundDays,
    slaComplianceRate: 92.4,
    totalInvestmentCrores: mockPortalSummary.totalCapitalInvestedCrores
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-primary-50)',
            color: 'var(--color-primary-800)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BarChart3 size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              State SLA Performance & Industrial Analytics
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Statutory timeline compliance, department turnaround benchmarks, and macro investment metrics.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {(['6M', '1Y', 'ALL'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeRange(t)}
              className={`btn btn-sm ${timeRange === t ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem' }}
            >
              {t === '6M' ? 'Last 6 Months' : t === '1Y' ? 'Last 1 Year' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Top Benchmark KPI Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--space-4)'
      }}>
        <div className="metric-card" style={{ '--metric-accent': 'var(--color-primary-600)', '--metric-bg': 'var(--color-primary-50)' } as any}>
          <div className="metric-info">
            <span className="metric-label">Total Applications</span>
            <span className="metric-value">{summary.totalApplications.toLocaleString()}</span>
            <span className="metric-trend positive">↑ 14.2% YoY growth</span>
          </div>
          <div className="metric-icon-wrap">
            <Layers size={22} />
          </div>
        </div>

        <div className="metric-card" style={{ '--metric-accent': 'var(--color-success)', '--metric-bg': 'var(--color-success-bg)' } as any}>
          <div className="metric-info">
            <span className="metric-label">First-Pass Approval Rate</span>
            <span className="metric-value">{summary.approvalRate}%</span>
            <span className="metric-trend positive">↑ 2.1% SLA efficiency</span>
          </div>
          <div className="metric-icon-wrap" style={{ color: 'var(--color-success)' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="metric-card" style={{ '--metric-accent': 'var(--color-teal-600)', '--metric-bg': 'var(--color-teal-50)' } as any}>
          <div className="metric-info">
            <span className="metric-label">Average Turnaround</span>
            <span className="metric-value">{summary.avgDisposalDays} Days</span>
            <span className="metric-trend positive">↓ 4.6 days faster than SLA mandate</span>
          </div>
          <div className="metric-icon-wrap" style={{ color: 'var(--color-teal-600)' }}>
            <Clock size={22} />
          </div>
        </div>

        <div className="metric-card" style={{ '--metric-accent': 'var(--color-warning)', '--metric-bg': 'var(--color-warning-bg)' } as any}>
          <div className="metric-info">
            <span className="metric-label">SLA Compliance Rate</span>
            <span className="metric-value">{summary.slaComplianceRate}%</span>
            <span className="metric-trend positive">↑ Target: 90%</span>
          </div>
          <div className="metric-icon-wrap" style={{ color: 'var(--color-warning)' }}>
            <TrendingUp size={22} />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Monthly Trends & Department SLA Breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 'var(--space-6)'
      }}>
        {/* Monthly Trend Visualizer */}
        <Card
          title="Monthly Application Filing & Clearance Velocity"
          subtitle="Number of composite applications received vs approved per month."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-2) 0' }}>
            {mockMonthlyTrends.map((trend, idx) => {
              const maxVal = 350;
              const recPct = (trend.received / maxVal) * 100;
              const appPct = (trend.approved / maxVal) * 100;

              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-heading)' }}>{trend.month}</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      <strong>{trend.approved}</strong> Approved / {trend.received} Filed
                    </span>
                  </div>
                  {/* Two stacked comparison bars */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ height: 8, backgroundColor: 'var(--color-slate-100)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${recPct}%`, height: '100%', backgroundColor: 'var(--color-primary-600)', borderRadius: 4 }} />
                    </div>
                    <div style={{ height: 8, backgroundColor: 'var(--color-slate-100)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${appPct}%`, height: '100%', backgroundColor: 'var(--color-success)', borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, backgroundColor: 'var(--color-primary-600)', borderRadius: 2 }} />
                <span>Applications Filed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, backgroundColor: 'var(--color-success)', borderRadius: 2 }} />
                <span>Statutory Clearances Issued</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Department SLA Compliance Breakdown */}
        <Card
          title="Department-wise SLA Compliance Matrix"
          subtitle="Real-time statutory time-bound clearance rates by participating agency."
        >
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Received</th>
                  <th>Avg Days</th>
                  <th>SLA Adherence</th>
                </tr>
              </thead>
              <tbody>
                {mockDepartmentMetrics.map(dept => (
                  <tr key={dept.shortCode}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.8125rem' }}>{dept.shortCode}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{dept.department}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{dept.totalReceived}</span>
                    </td>
                    <td>
                      <span>{dept.avgTurnaroundDays}d</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 700, color: dept.slaComplianceRate > 95 ? 'var(--color-success)' : 'var(--color-primary-700)', fontSize: '0.8125rem' }}>
                          {dept.slaComplianceRate}%
                        </span>
                        <div style={{ width: 45, height: 6, backgroundColor: 'var(--color-slate-200)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${dept.slaComplianceRate}%`, height: '100%', backgroundColor: dept.slaComplianceRate > 95 ? 'var(--color-success)' : 'var(--color-primary-700)' }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
