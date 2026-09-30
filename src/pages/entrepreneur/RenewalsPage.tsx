import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CertificateModal } from '../../components/applications/CertificateModal';
import { DigitalLicence } from '../../types';
import { 
  RefreshCw, 
  Award, 
  Calendar, 
  Clock, 
  Download, 
  Eye, 
  AlertTriangle, 
  CheckCircle2,
  ShieldAlert,
  Building2,
  Check
} from 'lucide-react';

export const RenewalsPage: React.FC = () => {
  const { licences, renewLicence } = useApplications();
  const [selectedLicenceForCert, setSelectedLicenceForCert] = useState<DigitalLicence | null>(null);
  const [renewingId, setRenewingId] = useState<string | null>(null);

  const handleRenew = (id: string) => {
    setRenewingId(id);
    setTimeout(() => {
      renewLicence(id);
      setRenewingId(null);
      alert('Licence renewal application initiated under fast-track SLA.');
    }, 600);
  };

  const getHealthBadge = (daysRemaining: number, status: string) => {
    if (status === 'RENEWAL_IN_PROGRESS') {
      return <span className="badge badge-warning"><Clock size={12} /> Renewal in Scrutiny</span>;
    }
    if (daysRemaining < 0) {
      return <span className="badge badge-danger"><ShieldAlert size={12} /> Expired ({Math.abs(daysRemaining)} days ago)</span>;
    }
    if (daysRemaining <= 30) {
      return <span className="badge badge-warning"><AlertTriangle size={12} /> Expiring Soon ({daysRemaining} days left)</span>;
    }
    return <span className="badge badge-success"><CheckCircle2 size={12} /> Healthy ({daysRemaining} days active)</span>;
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
            <RefreshCw size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              Digital Licences & Statutory Renewals
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Track expiry schedules, automated renewal reminders, and fast-track re-validations.
            </p>
          </div>
        </div>
      </div>

      {/* Licences List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {licences.map(lic => (
          <Card
            key={lic.id}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>{lic.licenceName}</span>
                <span style={{ color: 'var(--color-primary-600)', fontSize: '0.8125rem', fontFamily: 'var(--font-family-mono)' }}>
                  ({lic.licenceNumber})
                </span>
              </div>
            }
            subtitle={`Issued by: ${lic.issuingAuthority} • Enterprise: ${lic.businessName}`}
            action={getHealthBadge(lic.daysRemaining, lic.status)}
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Signatory: <strong>{lic.signatory}</strong> ({lic.signatoryDesignation})
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLicenceForCert(lic)}
                    icon={<Eye size={14} />}
                  >
                    View Licence Certificate
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={renewingId === lic.id}
                    disabled={lic.status === 'RENEWAL_IN_PROGRESS' || (lic.daysRemaining > 60 && lic.daysRemaining > 0)}
                    onClick={() => handleRenew(lic.id)}
                    icon={<RefreshCw size={14} />}
                  >
                    {lic.status === 'RENEWAL_IN_PROGRESS' ? 'Renewal Underway' : 'Fast-Track Renewal'}
                  </Button>
                </div>
              </div>
            }
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)',
              backgroundColor: 'var(--bg-subtle)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Issue Date:</span>
                <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{lic.issueDate}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Statutory Expiry Date:</span>
                <div style={{ fontWeight: 700, color: lic.daysRemaining < 0 ? 'var(--color-danger)' : lic.daysRemaining <= 30 ? 'var(--color-warning)' : 'var(--text-heading)' }}>
                  {lic.expiryDate}
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Validity Balance:</span>
                <div style={{ fontWeight: 700 }}>
                  {lic.daysRemaining > 0 ? `${lic.daysRemaining} days remaining` : `Expired ${Math.abs(lic.daysRemaining)} days ago`}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedLicenceForCert && (
        <CertificateModal
          isOpen={true}
          onClose={() => setSelectedLicenceForCert(null)}
          licence={selectedLicenceForCert}
        />
      )}
    </div>
  );
};
