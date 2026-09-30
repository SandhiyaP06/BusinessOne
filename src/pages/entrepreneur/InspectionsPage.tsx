import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { Inspection } from '../../types';
import { 
  ClipboardCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Phone, 
  CheckSquare,
  ShieldCheck,
  Building,
  Check
} from 'lucide-react';

export const InspectionsPage: React.FC = () => {
  const { inspections, updateInspectionChecklist, completeInspection } = useApplications();
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredInspections = inspections.filter(insp => {
    if (activeFilter === 'ALL') return true;
    return insp.status === activeFilter;
  });

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
            <ClipboardCheck size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              Central Inspection System (CIS)
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Synchronized multi-department risk-based site verification and digitized compliance audits.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {['ALL', 'SCHEDULED', 'ASSIGNED', 'PASSED'].map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`btn btn-sm ${activeFilter === f ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem' }}
            >
              {f.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Inspections Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: 'var(--space-6)'
      }}>
        {filteredInspections.map(insp => (
          <Card
            key={insp.id}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={18} color="var(--color-primary-600)" />
                <span>{insp.department}</span>
              </div>
            }
            subtitle={`Docket: ${insp.applicationId}`}
            action={<StatusBadge status={insp.status} size="sm" />}
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Audit Code: <strong>{insp.id}</strong>
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedInspection(insp)}
                  icon={<CheckSquare size={14} />}
                >
                  View Checklist & Notes
                </Button>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {insp.businessName}
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <MapPin size={13} color="var(--text-muted)" /> {insp.siteLocation}
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 8,
                fontSize: '0.75rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Scheduled Date:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{insp.scheduledDate}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Time Slot:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{insp.scheduledTime}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Inspector:</span>
                  <div style={{ fontWeight: 600 }}>{insp.inspectorName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Contact:</span>
                  <div style={{ fontWeight: 600 }}>{insp.inspectorContact}</div>
                </div>
              </div>

              {insp.findings && (
                <div style={{
                  backgroundColor: 'var(--color-success-bg)',
                  border: '1px solid var(--color-success-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3)',
                  fontSize: '0.75rem',
                  color: 'var(--color-success-text)'
                }}>
                  <strong>Inspector Findings:</strong> {insp.findings}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Inspection Checklist Modal */}
      {selectedInspection && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedInspection(null)}
          title={`Site Verification Checklist: ${selectedInspection.id}`}
          subtitle={`${selectedInspection.department} • ${selectedInspection.businessName}`}
          size="lg"
          footer={
            <Button variant="secondary" size="sm" onClick={() => setSelectedInspection(null)}>
              Close Checklist
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{
              backgroundColor: 'var(--color-primary-50)',
              border: '1px solid var(--color-primary-100)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-primary-700)' }}>
                  Inspector In-Charge
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-primary-900)' }}>
                  {selectedInspection.inspectorName} ({selectedInspection.inspectorDesignation})
                </div>
              </div>
              <StatusBadge status={selectedInspection.status} />
            </div>

            <h4 style={{ fontSize: '0.875rem', color: 'var(--text-heading)', fontWeight: 700 }}>
              Standard Operating Inspection Checklist Items
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {selectedInspection.checklist.map(item => (
                <div 
                  key={item.id}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-3) var(--space-4)',
                    backgroundColor: item.isCompliant ? 'var(--color-success-bg)' : 'var(--bg-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: 10 }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-700)', textTransform: 'uppercase' }}>
                        {item.category}
                      </span>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-heading)', marginTop: 2 }}>
                        {item.title}
                      </div>
                      {item.inspectorNotes && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4, fontStyle: 'italic' }}>
                          Note: {item.inspectorNotes}
                        </div>
                      )}
                    </div>

                    <span className={`badge ${item.isCompliant ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.6875rem' }}>
                      {item.isCompliant ? 'Compliant ✓' : 'Under Verification'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
