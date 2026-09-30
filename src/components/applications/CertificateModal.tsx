import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { DigitalLicence } from '../../types';
import { Logo } from '../common/Logo';
import { 
  Download, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Building2,
  Calendar,
  Lock
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  licence?: DigitalLicence;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  licence
}) => {
  if (!isOpen || !licence) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Statutory Clearance Certificate"
      subtitle={`Certificate No: ${licence.licenceNumber}`}
      size="xl"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <Lock size={14} color="var(--color-success)" />
            <span>Cryptographically Signed under IT Act 2000 Section 3A</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint} icon={<Printer size={14} />}>
              Print Certificate
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => alert('Certificate downloaded as PDF.')}
              icon={<Download size={14} />}
            >
              Download Official PDF
            </Button>
          </div>
        </div>
      }
    >
      {/* Official Certificate Layout with Government Border & Watermark */}
      <div 
        className="official-certificate-container"
        style={{
          backgroundColor: '#FFFFFF',
          border: '8px double #0B2545',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8)',
          position: 'relative',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.04)'
        }}
      >
        {/* Subtle Watermark Stamp */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-25deg)',
          fontSize: '4.5rem',
          fontWeight: 900,
          color: 'rgba(11, 37, 69, 0.04)',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          letterSpacing: '0.1em',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          STATUTORY APPROVAL
        </div>

        {/* Certificate Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #0B2545', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-2)' }}>
            <Logo variant="full" size="lg" />
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#0B2545', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 800 }}>
            {licence.issuingAuthority}
          </h2>
          <div style={{ fontSize: '0.8125rem', color: '#475569', fontWeight: 600 }}>
            Established under the State Industrial Single Window Clearance Act
          </div>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: 800,
            color: '#1D4E89',
            marginTop: 'var(--space-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {licence.licenceName}
          </div>
        </div>

        {/* Certificate Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: '0.875rem', lineHeight: 1.6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: 'var(--space-3) var(--space-4)', borderRadius: 6, border: '1px solid #E2E8F0' }}>
            <div>
              <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Certificate Registration No:</span>
              <div style={{ fontWeight: 800, color: '#0B2545', fontFamily: 'var(--font-family-mono)' }}>{licence.licenceNumber}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Filing Docket Ref:</span>
              <div style={{ fontWeight: 700, color: '#1D4E89', fontFamily: 'var(--font-family-mono)' }}>{licence.applicationId}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Issue Date / Expiry:</span>
              <div style={{ fontWeight: 700, color: '#0B2545' }}>{licence.issueDate} to {licence.expiryDate}</div>
            </div>
          </div>

          <p>
            This is to certify that the composite industrial establishment and operating proposal submitted by 
            <strong style={{ color: '#0B2545' }}> {licence.businessName} </strong>
            has undergone complete statutory multi-department scrutiny, on-site safety inspection, and environmental compliance verification.
          </p>

          <p>
            The Single Window Clearance Authority hereby accords formal statutory approval and grants this consolidated operating permit subject to adherence to the following covenants:
          </p>

          {/* Terms & Conditions list */}
          <div style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 6,
            padding: 'var(--space-4)'
          }}>
            <h4 style={{ fontSize: '0.8125rem', color: '#0B2545', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
              Statutory Terms & Operating Conditions:
            </h4>
            <ol style={{ paddingLeft: 20, fontSize: '0.8125rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {licence.termsAndConditions.map((term, tIdx) => (
                <li key={tIdx}>{term}</li>
              ))}
            </ol>
          </div>

          {/* Signatures and QR Code Verification Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '2px solid #0B2545',
            paddingTop: 'var(--space-6)',
            marginTop: 'var(--space-4)'
          }}>
            {/* QR Code Validation Box */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 72,
                height: 72,
                border: '2px solid #0B2545',
                padding: 4,
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* SVG Simulated QR code */}
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#0B2545" strokeWidth="2">
                  <rect x="3" y="3" width="6" height="6"/>
                  <rect x="15" y="3" width="6" height="6"/>
                  <rect x="3" y="15" width="6" height="6"/>
                  <path d="M10 3v4M10 10v4M10 18v3M14 10h4M14 14h2M18 14v4M18 18h3"/>
                </svg>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#64748B', maxWidth: 160 }}>
                Scan to verify digital validity on national single window ledger.
              </div>
            </div>

            {/* Government Official Signatory Stamp */}
            <div style={{ textAlign: 'center', minWidth: 220 }}>
              <div style={{
                color: '#059669',
                fontWeight: 800,
                fontSize: '0.8125rem',
                border: '1px solid #059669',
                padding: '2px 8px',
                borderRadius: 4,
                display: 'inline-block',
                marginBottom: 6,
                backgroundColor: '#ECFDF5'
              }}>
                ✓ Cryptographically Verified & Sealed
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0B2545' }}>
                {licence.signatory}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                {licence.signatoryDesignation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
