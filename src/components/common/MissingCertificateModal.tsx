import React, { useRef } from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, UploadCloud, FileCheck, X, ShieldAlert } from 'lucide-react';

interface MissingCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateName?: string;
  onUploadFile: (file: File) => void;
  onSimulateUpload: () => void;
}

export const MissingCertificateModal: React.FC<MissingCertificateModalProps> = ({
  isOpen,
  onClose,
  certificateName = 'Fire Hydrant Loop & Evacuation Route Blueprint (DOC-6)',
  onUploadFile,
  onSimulateUpload
}) => {
  const { t, language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadFile(e.target.files[0]);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#DC2626' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: '#FEE2E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#DC2626'
          }}>
            <ShieldAlert size={22} />
          </div>
          <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>
            {t.certificateAlert.title}
          </span>
        </div>
      }
      size="md"
      footer={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, width: '100%' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            {t.certificateAlert.dismiss}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
            onClick={() => {
              onSimulateUpload();
              onClose();
            }}
          >
            <UploadCloud size={16} />
            <span>{t.certificateAlert.simulateUpload}</span>
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Exact message prompt banner */}
        <div style={{
          backgroundColor: '#FEF2F2',
          border: '1.5px solid #FCA5A5',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4) var(--space-5)',
          display: 'flex',
          gap: 14,
          alignItems: 'flex-start'
        }}>
          <AlertTriangle size={24} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: '#991B1B',
              lineHeight: 1.5,
              marginBottom: 4
            }}>
              {/* Exact wording from user requirement */}
              You have not uploaded the required certificate yet. Please upload the certificate to proceed. Without the certificate, you cannot continue with this process.
            </div>

            {language !== 'en' && (
              <div style={{
                fontSize: '0.875rem',
                color: '#B91C1C',
                lineHeight: 1.4,
                marginTop: 6,
                paddingTop: 6,
                borderTop: '1px dashed #FCA5A5'
              }}>
                {t.certificateAlert.message}
              </div>
            )}
          </div>
        </div>

        {/* Required Missing Certificate Details */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileCheck size={18} color="var(--color-primary-600)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {t.certificateAlert.uploadRequired}:
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                {certificateName}
              </div>
            </div>
          </div>
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: '#DC2626',
            backgroundColor: '#FEE2E2',
            padding: '3px 8px',
            borderRadius: 4
          }}>
            {language === 'hi' ? 'अनिवार्य' : language === 'mr' ? 'अनिवार्य' : 'REQUIRED'}
          </span>
        </div>

        {/* Real File Upload Trigger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg"
            style={{ display: 'none' }}
          />

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
            style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
          >
            <UploadCloud size={16} />
            <span>{language === 'hi' ? 'स्थानीय पीडीएफ प्रमाणपत्र चुनें व अपलोड करें' : language === 'mr' ? 'स्थानिक पीडीएफ प्रमाणपत्र निवडा आणि अपलोड करा' : 'Select & Upload Local PDF Certificate'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
