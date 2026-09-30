import React from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../../context/LanguageContext';
import { getOfficerByNameOrCode, OfficerProfile } from '../../data/officerApprovals';
import { 
  Award, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Mail, 
  Phone, 
  FileCheck2, 
  CheckCircle2, 
  Users, 
  ExternalLink,
  Briefcase
} from 'lucide-react';

interface OfficerApprovalModalProps {
  officerQuery: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OfficerApprovalModal: React.FC<OfficerApprovalModalProps> = ({
  officerQuery,
  isOpen,
  onClose
}) => {
  const { t, language } = useLanguage();

  if (!officerQuery) return null;

  const officer: OfficerProfile | undefined = getOfficerByNameOrCode(officerQuery);

  if (!officer) return null;

  const getPositionText = () => {
    if (language === 'hi' && officer.positionHi) return officer.positionHi;
    if (language === 'mr' && officer.positionMr) return officer.positionMr;
    return officer.position;
  };

  const getDepartmentText = () => {
    if (language === 'hi' && officer.departmentHi) return officer.departmentHi;
    if (language === 'mr' && officer.departmentMr) return officer.departmentMr;
    return officer.department;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary-700)',
            border: '1.5px solid var(--color-primary-200)',
            flexShrink: 0
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              {officer.name}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-primary-700)', fontWeight: 600 }}>
              {getPositionText()}
            </div>
          </div>
        </div>
      }
      subtitle={t.officerModal.subtitle}
      size="xl"
      footer={
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={onClose}
          style={{ minWidth: 110 }}
        >
          {t.common.close}
        </button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Officer Credential Card */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4) var(--space-5)',
          border: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-3)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              {t.officerModal.department}
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-body)', marginTop: 2 }}>
              {getDepartmentText()}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              {t.officerModal.badgeNumber}
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-800)', marginTop: 2, fontFamily: 'monospace' }}>
              {officer.badgeNumber}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              {t.officerModal.jurisdiction}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-body)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={14} color="var(--color-primary-600)" />
              <span>{officer.officeLocation}</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              {t.officerModal.contact}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-body)', marginTop: 2 }}>
              {officer.email} • {officer.phone}
            </div>
          </div>
        </div>

        {/* 3 Metrics Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--space-3)'
        }}>
          <div style={{
            backgroundColor: '#ECFDF5',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3) var(--space-4)',
            border: '1px solid #A7F3D0',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065F46', lineHeight: 1.1 }}>
                {officer.totalApproved}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>
                {t.officerModal.totalApproved}
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#EFF6FF',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3) var(--space-4)',
            border: '1px solid #BFDBFE',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={19} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E40AF', lineHeight: 1.1 }}>
                {officer.avgSlaDays} {t.checklist.days}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#1D4ED8', fontWeight: 600 }}>
                {t.officerModal.avgSla}
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#FDF4FF',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3) var(--space-4)',
            border: '1px solid #F5D0FE',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#A855F7',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={19} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#701A75', lineHeight: 1.1 }}>
                {Math.round((officer.totalApproved / officer.totalReviewed) * 100)}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#86198F', fontWeight: 600 }}>
                {t.officerModal.approvalRate} ({officer.totalApproved}/{officer.totalReviewed})
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading: Approved Businesses */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h4 style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: 'var(--text-heading)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Briefcase size={17} color="var(--color-primary-600)" />
              <span>{t.officerModal.approvedListTitle}</span>
              <span style={{
                backgroundColor: 'var(--color-primary-100)',
                color: 'var(--color-primary-800)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '999px'
              }}>
                {officer.approvedBusinesses.length}
              </span>
            </h4>
          </div>

          {/* List of Approved Businesses */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {officer.approvedBusinesses.map((biz) => {
              const categoryColor = 
                biz.category === 'RED' ? '#DC2626' :
                biz.category === 'ORANGE' ? '#EA580C' :
                biz.category === 'GREEN' ? '#16A34A' : '#475569';

              const categoryBg = 
                biz.category === 'RED' ? '#FEF2F2' :
                biz.category === 'ORANGE' ? '#FFF7ED' :
                biz.category === 'GREEN' ? '#F0FDF4' : '#F8FAFC';

              return (
                <div
                  key={biz.applicationId + biz.certificateNo}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.9375rem',
                          fontWeight: 700,
                          color: 'var(--text-heading)'
                        }}>
                          {biz.businessName}
                        </span>

                        <span style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: 4,
                          backgroundColor: categoryBg,
                          color: categoryColor,
                          border: `1px solid ${categoryColor}40`
                        }}>
                          {biz.category === 'RED' ? (language === 'hi' ? 'लाल' : language === 'mr' ? 'लाल' : 'RED') :
                           biz.category === 'ORANGE' ? (language === 'hi' ? 'नारंगी' : language === 'mr' ? 'केशरी' : 'ORANGE') :
                           biz.category === 'GREEN' ? (language === 'hi' ? 'हरा' : language === 'mr' ? 'हिरवा' : 'GREEN') : biz.category}
                        </span>

                        <span style={{
                          fontSize: '0.71875rem',
                          fontFamily: 'monospace',
                          color: 'var(--text-muted)'
                        }}>
                          {biz.applicationId}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>{biz.sector}</span>
                        <span>•</span>
                        <MapPin size={12} />
                        <span>{biz.district}</span>
                        <span>•</span>
                        <span>₹{biz.investmentInLakhs.toLocaleString('en-IN')} {language === 'hi' ? 'लाख' : language === 'mr' ? 'लाख' : 'Lakhs'}</span>
                      </div>
                    </div>

                    {/* Member Stats for this Business */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      backgroundColor: '#F8FAFC',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #E2E8F0'
                    }}>
                      <Users size={14} color="#0F172A" />
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                        <span style={{ color: '#0F172A', fontWeight: 700 }}>{biz.membersApproved}</span>
                        <span> / </span>
                        <span>{biz.membersApplied}</span>
                        <span style={{ marginLeft: 4, color: '#059669', fontWeight: 700 }}>
                          ({Math.round((biz.membersApproved / biz.membersApplied) * 100)}% {language === 'hi' ? 'स्वीकृत' : language === 'mr' ? 'मंजूर' : 'Approved'})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    paddingTop: 8,
                    borderTop: '1px dashed var(--border-subtle)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FileCheck2 size={14} color="#059669" />
                      <span style={{ fontWeight: 600, color: 'var(--text-body)' }}>{t.officerModal.certificateNumber}:</span>
                      <span style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: '#065F46',
                        backgroundColor: '#ECFDF5',
                        padding: '1px 6px',
                        borderRadius: 3
                      }}>
                        {biz.certificateNo}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} />
                      <span>{t.officerModal.approvalDate}: <strong>{biz.approvalDate}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
