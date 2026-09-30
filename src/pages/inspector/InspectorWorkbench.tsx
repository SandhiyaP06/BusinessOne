import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  ShieldCheck, 
  ClipboardCheck, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Send,
  Calendar,
  Clock
} from 'lucide-react';

export const InspectorWorkbench: React.FC = () => {
  const { user } = useAuth();
  const { inspections, updateInspectionChecklist, completeInspection } = useApplications();
  const [selectedInspId, setSelectedInspId] = useState<string>(inspections[0].id);
  const [findings, setFindings] = useState('All pressure safety valves, emergency eye-wash stations, and zero-liquid discharge containment verified compliant.');

  const selectedInsp = inspections.find(i => i.id === selectedInspId) || inspections[0];

  const handleToggleCheck = (checkId: string, currentVal: boolean) => {
    updateInspectionChecklist(selectedInsp.id, checkId, !currentVal);
  };

  const handleSubmitAudit = (rec: 'APPROVE' | 'RE_INSPECT' | 'REJECT') => {
    completeInspection(selectedInsp.id, rec, findings);
    alert(`Inspection report submitted with recommendation: ${rec}. Transmitted to Department Review Wing.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Inspector Banner */}
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
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
                Field Inspector Safety & Compliance Workbench
              </h1>
              <span className="badge badge-primary">Authorized Field Officer</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Inspector: <strong>{user.name}</strong> • {user.department || 'Central Inspection System'}
            </p>
          </div>
        </div>
      </div>

      {/* Inspection Dossier & Live Checklist Execution */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>Audit Site:</span>
            <span style={{ color: 'var(--color-primary-700)', fontFamily: 'var(--font-family-mono)' }}>{selectedInsp.id}</span>
          </div>
        }
        subtitle={`${selectedInsp.businessName} • ${selectedInsp.siteLocation}`}
        action={
          <select
            className="form-select"
            value={selectedInsp.id}
            onChange={e => setSelectedInspId(e.target.value)}
            style={{ width: 'auto', minWidth: 260, fontSize: '0.8125rem' }}
          >
            {inspections.map(insp => (
              <option key={insp.id} value={insp.id}>
                {insp.id} - {insp.businessName} ({insp.status})
              </option>
            ))}
          </select>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 8,
            fontSize: '0.8125rem'
          }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Scheduled Date:</span> <strong>{selectedInsp.scheduledDate}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Slot:</span> <strong>{selectedInsp.scheduledTime}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Status:</span> <StatusBadge status={selectedInsp.status} size="sm" /></div>
          </div>

          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)', marginTop: 'var(--space-2)' }}>
            Interactive Standard Operating Checklist
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {selectedInsp.checklist.map(chk => (
              <div 
                key={chk.id}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: chk.isCompliant ? 'var(--color-success-bg)' : 'var(--bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12
                }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-700)', textTransform: 'uppercase' }}>
                    {chk.category}
                  </span>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-heading)', marginTop: 2 }}>
                    {chk.title}
                  </div>
                  {chk.inspectorNotes && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Note: {chk.inspectorNotes}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleCheck(chk.id, chk.isCompliant)}
                  className={`btn btn-sm ${chk.isCompliant ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {chk.isCompliant ? '✓ Verified Compliant' : 'Mark Compliant'}
                </button>
              </div>
            ))}
          </div>

          <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
            <label className="form-label">On-Site Inspector Findings & Technical Summary</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={findings}
              onChange={e => setFindings(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleSubmitAudit('RE_INSPECT')}
            >
              Recommend Re-inspection
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => handleSubmitAudit('APPROVE')}
              icon={<CheckCircle2 size={15} />}
              style={{ backgroundColor: '#059669', borderColor: '#059669' }}
            >
              Submit & Recommend Clearance
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
