import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  Eye, 
  Send,
  Building2,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const DepartmentOfficerWorkbench: React.FC = () => {
  const { user } = useAuth();
  const { applications, updateDepartmentStatus, raiseQuery } = useApplications();

  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0].id);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [approvalRemarks, setApprovalRemarks] = useState('All mandatory layout blueprints and compliance requirements satisfied.');

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const handleApprove = async () => {
    const deptCode = user.department?.includes('Pollution') ? 'SPCB' : user.department?.includes('Fire') ? 'FIRE' : 'DIC';
    await updateDepartmentStatus(selectedApp.id, deptCode, 'APPROVED', approvalRemarks);
    setIsApproveModalOpen(false);
  };

  const handleRaiseQuery = async () => {
    if (!queryText.trim()) return;
    const deptCode = user.department?.includes('Pollution') ? 'SPCB' : user.department?.includes('Fire') ? 'FIRE' : 'DIC';
    await raiseQuery(selectedApp.id, user.department || 'Directorate of Industries', user.name, queryText, '2026-04-15');
    setIsQueryModalOpen(false);
    setQueryText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Officer Workbench Banner */}
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
            <FileCheck2 size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
                Department Scrutiny Workbench
              </h1>
              <span className="badge badge-primary">Reviewing Officer</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Officer: <strong>{user.name}</strong> • {user.department || 'Directorate of Industries & Commerce'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsQueryModalOpen(true)}
            icon={<HelpCircle size={15} />}
          >
            Raise Statutory Query
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsApproveModalOpen(true)}
            icon={<CheckCircle2 size={15} />}
            style={{ backgroundColor: '#059669', borderColor: '#059669' }}
          >
            Accord Department Clearance
          </Button>
        </div>
      </div>

      {/* Main Scrutiny Dossier */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>Reviewing Docket:</span>
            <span style={{ color: 'var(--color-primary-700)', fontFamily: 'var(--font-family-mono)' }}>{selectedApp.id}</span>
          </div>
        }
        subtitle={`${selectedApp.businessName} • Investment: ₹${(selectedApp.investmentInLakhs / 100).toFixed(2)} Cr`}
        action={
          <select
            className="form-select"
            value={selectedApp.id}
            onChange={e => setSelectedAppId(e.target.value)}
            style={{ width: 'auto', minWidth: 260, fontSize: '0.8125rem' }}
          >
            {applications.map(app => (
              <option key={app.id} value={app.id}>
                {app.id} - {app.businessName}
              </option>
            ))}
          </select>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Department Clearance Status Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-3)'
          }}>
            {selectedApp.departments.map(d => (
              <div 
                key={d.departmentId}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3)',
                  backgroundColor: d.status === 'APPROVED' ? 'var(--color-success-bg)' : 'var(--bg-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>{d.shortCode}</span>
                  <StatusBadge status={d.status} size="sm" />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{d.departmentName}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  SLA: <strong>{d.remainingDays} days remaining</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Dossier Details */}
          <div className="form-grid-2" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={{ fontSize: '0.875rem', color: 'var(--color-primary-800)' }}>Industrial Unit Coordinates</h4>
              <div><strong>Category:</strong> {selectedApp.category} Category</div>
              <div><strong>Sector:</strong> {selectedApp.sector}</div>
              <div><strong>Location:</strong> {selectedApp.proposedLocation.address}, {selectedApp.proposedLocation.district}</div>
              <div><strong>Land Area:</strong> {selectedApp.proposedLocation.landAreaAcres} Acres (Plot {selectedApp.proposedLocation.plotNo})</div>
            </div>

            <div style={{ fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={{ fontSize: '0.875rem', color: 'var(--color-primary-800)' }}>Utilities & Employment</h4>
              <div><strong>Connected Power:</strong> {selectedApp.proposedLocation.powerRequirementKVA} KVA</div>
              <div><strong>Water Consumption:</strong> {selectedApp.proposedLocation.waterRequirementKLD} KLD</div>
              <div><strong>Direct Employment:</strong> {selectedApp.expectedEmployment} Persons</div>
              <div><strong>Submitted At:</strong> {selectedApp.submittedAt}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* MODAL 1: Raise Query Modal */}
      {isQueryModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsQueryModalOpen(false)}
          title="Raise Statutory Clarification Query"
          subtitle={`Docket ${selectedApp.id} • ${selectedApp.businessName}`}
          footer={
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="secondary" size="sm" onClick={() => setIsQueryModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleRaiseQuery} icon={<Send size={14} />}>
                Transmit Query to Applicant
              </Button>
            </div>
          }
        >
          <div className="form-group">
            <label className="form-label">
              Detailed Scrutiny Inquiries / Missing Information <span className="required">*</span>
            </label>
            <textarea
              className="form-textarea"
              rows={5}
              placeholder="State precise statutory deficiencies, blueprint scale clarifications, or emission calculation remarks..."
              value={queryText}
              onChange={e => setQueryText(e.target.value)}
            />
            <span className="form-helper">Applicant will be notified via SMS and email with statutory reply deadline.</span>
          </div>
        </Modal>
      )}

      {/* MODAL 2: Approve Clearance Modal */}
      {isApproveModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsApproveModalOpen(false)}
          title="Accord Formal Department Clearance (NOC)"
          subtitle={`Department Clearance for ${selectedApp.businessName}`}
          footer={
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="secondary" size="sm" onClick={() => setIsApproveModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="accent" 
                size="sm" 
                onClick={handleApprove} 
                icon={<CheckCircle2 size={14} />}
                style={{ backgroundColor: '#059669', borderColor: '#059669' }}
              >
                Sign & Issue Department NOC
              </Button>
            </div>
          }
        >
          <div className="form-group">
            <label className="form-label">Scrutiny Officer Remarks & Special Conditions</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={approvalRemarks}
              onChange={e => setApprovalRemarks(e.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
