import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockDepartmentMetrics, mockPortalSummary } from '../../data/mockAnalytics';
import { 
  Sliders, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Building
} from 'lucide-react';

import AdminService, { AuditLogItem } from '../../services/adminService';
import AnalyticsService, { AnalyticsOverview } from '../../services/analyticsService';

export const AdminWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sla' | 'workflow' | 'audit'>('sla');
  const [realAuditLogs, setRealAuditLogs] = useState<AuditLogItem[]>([]);
  const [analyticsOverview, setAnalyticsOverview] = useState<AnalyticsOverview | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [logs, overview] = await Promise.allSettled([
          AdminService.getAuditLogs(),
          AnalyticsService.getOverview()
        ]);
        if (logs.status === 'fulfilled' && logs.value) {
          setRealAuditLogs(logs.value);
        }
        if (overview.status === 'fulfilled' && overview.value) {
          setAnalyticsOverview(overview.value);
        }
      } catch (err) {
        console.warn('Admin workbench live fetch fallback:', err);
      }
    };

    fetchData();
  }, [activeTab]);

  const auditLogs = realAuditLogs.length > 0
    ? realAuditLogs.map(l => ({
        timestamp: new Date(l.createdAt).toLocaleDateString('en-GB') + ' ' + new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: l.action,
        user: l.user ? `${l.user.name} (${l.user.designation || 'Staff'})` : 'System Engine',
        details: `${l.description} • IP: ${l.ipAddress || '127.0.0.1'}`
      }))
    : [
        { timestamp: '19 Mar 2026 11:45 AM', action: 'Department Clearance Recorded', user: 'S. K. Nambiar (DIC)', details: 'Approved DIC/2026/IND-CLR-0941 for APP-2026-IND-04829' },
        { timestamp: '19 Mar 2026 09:30 AM', action: 'Field Inspection Scheduled', user: 'V. Ramachandran (SPCB)', details: 'Joint CIS Inspection set for APP-2026-IND-03911' },
        { timestamp: '18 Mar 2026 04:15 PM', action: 'Statutory Query Dispatched', user: 'Rajeshwar Patil (FIRE)', details: 'Query QRY-2026-0419 raised regarding secondary hydrant ring' },
        { timestamp: '17 Mar 2026 02:20 PM', action: 'Digital NOC Issued', user: 'Dr. Rameshwar Hegde (Single Window Board)', details: 'Issued Consolidated Operating Licence LIC-2026-0921' },
        { timestamp: '15 Mar 2026 10:15 AM', action: 'Composite Filing Registered', user: 'Dr. Vikramaditya Rao (Entrepreneur)', details: 'Form-1A submitted with 6 verified digital blueprints' }
      ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Admin Header Banner */}
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
            backgroundColor: 'var(--color-primary-800)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sliders size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
                State Industrial Single Window Administrator Console
              </h1>
              <span className="badge badge-primary">Commissioner Desk</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Statutory oversight, automated department routing rules, SLA compliance mandates, and audit trails.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          <button
            type="button"
            onClick={() => setActiveTab('sla')}
            className={`btn btn-sm ${activeTab === 'sla' ? 'btn-primary' : 'btn-secondary'}`}
          >
            SLA Governance
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`btn btn-sm ${activeTab === 'workflow' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Workflow Engine Rules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`btn btn-sm ${activeTab === 'audit' ? 'btn-primary' : 'btn-secondary'}`}
          >
            System Audit Trail
          </button>
        </div>
      </div>

      {/* TAB 1: SLA GOVERNANCE */}
      {activeTab === 'sla' && (
        <Card
          title="State Department SLA Performance Charter"
          subtitle="Mandatory clearance timelines established under Ease of Doing Business Act."
        >
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Statutory Department</th>
                  <th>Mandated SLA</th>
                  <th>Total Dockets</th>
                  <th>Approved</th>
                  <th>Avg Days</th>
                  <th>SLA Compliance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockDepartmentMetrics.map(dept => (
                  <tr key={dept.shortCode}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{dept.department}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Code: {dept.shortCode}</div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{dept.shortCode === 'SPCB' ? '30 Days' : '21 Days'}</span>
                    </td>
                    <td><span style={{ fontWeight: 600 }}>{dept.totalReceived}</span></td>
                    <td><span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{dept.approved}</span></td>
                    <td><strong>{dept.avgTurnaroundDays} days</strong></td>
                    <td>
                      <span className="badge badge-success">{dept.slaComplianceRate}%</span>
                    </td>
                    <td>
                      <Button variant="outline" size="sm" onClick={() => alert(`Reviewing SLA metrics for ${dept.department}`)}>
                        Configure
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 2: WORKFLOW ENGINE RULES */}
      {activeTab === 'workflow' && (
        <Card
          title="Parallel Department Routing Rules Matrix"
          subtitle="Automated trigger logic mapping industrial parameters to reviewing regulatory departments."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[
              { name: 'Red Category Environmental Review Rule', trigger: 'CPCB Category = RED or Effluent > 50 KLD', routeTo: 'State Pollution Control Board (Member Secretary Wing)', sla: '30 Days' },
              { name: 'Hazardous Fire & Life Safety Routing Rule', trigger: 'Factory Elevation > 15m or Solvents Stored', routeTo: 'Fire & Emergency Safety Services Directorate', sla: '21 Days' },
              { name: 'High-Pressure Steam Boiler Rule', trigger: 'Steam Boiler > 100 kg/hr or Thermic Heater', routeTo: 'Directorate of Steam Boilers', sla: '15 Days' },
              { name: 'High-Tension HT Power Allocation Rule', trigger: 'Power Demand > 1000 KVA', routeTo: 'State Electricity Transmission Corporation', sla: '15 Days' }
            ].map((rule, idx) => (
              <div 
                key={idx}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>{rule.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                    Trigger Condition: <strong style={{ color: 'var(--color-primary-700)' }}>{rule.trigger}</strong>
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Routed Target: {rule.routeTo}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-primary">SLA: {rule.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: SYSTEM AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <Card
          title="System Audit & Cryptographic Action Log"
          subtitle="Immutable chronological ledger of state clearance actions and digital authorizations."
        >
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action Event</th>
                  <th>Authorized Officer / User</th>
                  <th>Action Dossier Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, idx) => (
                  <tr key={idx}>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.timestamp}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.8125rem' }}>{log.action}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem' }}>{log.user}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{log.details}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
