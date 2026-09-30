import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CertificateModal } from '../../components/applications/CertificateModal';
import { 
  CheckCircle2, 
  Award, 
  Download, 
  FileText, 
  ShieldCheck, 
  Printer, 
  Eye, 
  CheckSquare, 
  Layers,
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalApprovalPage: React.FC = () => {
  const { applications, selectedApplicationId, licences } = useApplications();
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Pick an approved application or the first one
  const approvedApp = applications.find(a => a.currentStage === 'APPROVED') || applications[0];
  const activeLicence = licences[0];

  const handleCelebrateAndOpen = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
    });
    setIsCertModalOpen(true);
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
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              Final Statutory Clearance & Digital Certificate
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Consolidated single-window clearance outcome, verified departmental NOCs, and cryptographic licence generation.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button
            variant="accent"
            size="sm"
            onClick={handleCelebrateAndOpen}
            icon={<Award size={15} />}
            style={{ backgroundColor: '#059669', borderColor: '#059669' }}
          >
            View Official Certificate
          </Button>
        </div>
      </div>

      {/* Hero Clearance Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064E3B 0%, #047857 60%, #059669 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-6)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ maxWidth: 620 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: 'var(--space-3)'
          }}>
            <ShieldCheck size={16} /> All Statutory Clearances Completed
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25 }}>
            Consolidated Clearance Certificate Granted
          </h2>
          <p style={{ color: '#D1FAE5', marginTop: 'var(--space-2)', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Application <strong>{approvedApp.id}</strong> for <strong>{approvedApp.businessName}</strong> has satisfied all statutory safety, pollution control, and zoning mandates under the State Industrial Facilitation Act.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleCelebrateAndOpen}
            icon={<Eye size={18} />}
            style={{ backgroundColor: '#FFFFFF', color: '#064E3B', fontWeight: 700 }}
          >
            Generate & View Certificate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert('Downloading official encrypted PDF certificate...')}
            icon={<Download size={14} />}
            style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            Download Direct PDF
          </Button>
        </div>
      </div>

      {/* Comprehensive Clearance Dossier Breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'var(--space-6)'
      }}>
        {/* 1. Department Clearances Matrix */}
        <Card
          title="1. Multi-Department Clearances (All Cleared)"
          subtitle="Status of individual statutory NOCs and licences issued."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {approvedApp.departments.map(d => (
              <div 
                key={d.departmentId}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--color-success-bg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-success-text)' }}>
                    {d.departmentName}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    NOC Ref: <strong>{d.approvalCertificateNo || `${d.shortCode}/2026/CLR-0891`}</strong>
                  </div>
                </div>
                <StatusBadge status="APPROVED" size="sm" />
              </div>
            ))}
          </div>
        </Card>

        {/* 2. Site Inspection & Verification Summary */}
        <Card
          title="2. Central Inspection Outcome"
          subtitle="On-ground safety and environmental audit report."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <div><strong>Joint Inspection Wing:</strong> DISH & SPCB Joint Flying Squad</div>
              <div><strong>Audit Report Date:</strong> 16 Feb 2026</div>
              <div><strong>Recommendation:</strong> <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>UNCONDITIONAL CLEARANCE</span></div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>
                "All fire hydrants, zero-discharge ETP recycling loops, and machine safety guards conform to National Building Code 2016 and Section 21 of Factories Act 1948."
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        licence={activeLicence}
      />
    </div>
  );
};
