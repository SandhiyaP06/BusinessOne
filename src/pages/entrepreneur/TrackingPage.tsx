import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Clock, 
  CheckCircle2, 
  Layers, 
  Building2, 
  Calendar, 
  FileText, 
  ShieldCheck,
  Download,
  Flame,
  Leaf,
  Factory,
  Compass,
  Copy,
  Check,
  MapPin,
  FileSearch,
  ExternalLink,
  ChevronRight,
  Info,
  Users,
  ClipboardList
} from 'lucide-react';

import { AIAssistanceCard } from '../../components/ai/AIAssistanceCard';
import AiService, { PredictiveDelayResult } from '../../services/aiService';
import { OfficerApprovalModal } from '../../components/common/OfficerApprovalModal';
import { BusinessChecklistModal } from '../../components/common/BusinessChecklistModal';
import { useLanguage } from '../../context/LanguageContext';

interface TrackingPageProps {
  onNavigate: (tab: string) => void;
  onOpenCertificate?: () => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { applications, selectedApplicationId, setSelectedApplicationId } = useApplications();
  const [activeTab, setActiveTab] = useState<'timeline' | 'departments' | 'docket'>('timeline');
  const [predictionData, setPredictionData] = useState<PredictiveDelayResult | null>(null);
  const [predLoading, setPredLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [selectedOfficerQuery, setSelectedOfficerQuery] = useState<string | null>(null);
  const [isOfficerModalOpen, setIsOfficerModalOpen] = useState<boolean>(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);

  const selectedApp = applications.find(a => a.id === selectedApplicationId) || applications[0];

  React.useEffect(() => {
    const fetchPrediction = async () => {
      if (!selectedApp?.id) return;
      setPredLoading(true);
      try {
        const pred = await AiService.getPredictiveDelayAnalysis(selectedApp.id);
        setPredictionData(pred);
      } catch (err) {
        console.warn('AI predictive delay fallback:', err);
      } finally {
        setPredLoading(false);
      }
    };

    fetchPrediction();
  }, [selectedApp?.id]);

  const handleCopyId = () => {
    const idToCopy = selectedApp.id;
    navigator.clipboard.writeText(idToCopy);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDownloadSummary = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const getDeptIcon = (shortCode: string) => {
    switch (shortCode) {
      case 'SPCB': return <Leaf size={16} color="#059669" />;
      case 'FIRE': return <Flame size={16} color="#EA580C" />;
      case 'TCPA': return <Compass size={16} color="#0284C7" />;
      case 'DIC':
      default: return <Factory size={16} color="#1D4E89" />;
    }
  };

  // Format display application ID (e.g. IA-2026-000184 if preferred or format standard)
  const displayAppId = selectedApp.id.startsWith('APP-') 
    ? selectedApp.id 
    : `IA-2026-${selectedApp.id.substring(0, 6).toUpperCase()}`;

  const isUUID = selectedApp.id.length > 20 || /^[0-9a-f]{8}-[0-9a-f]{4}/i.test(selectedApp.id);

  const timelineStages = [
    { 
      name: 'Application Created', 
      date: '04 Mar 2026 · 10:12 AM', 
      completed: true, 
      desc: 'Digital composite Form-1A generated.' 
    },
    { 
      name: 'Documents Uploaded & e-Signed', 
      date: '04 Mar 2026 · 10:28 AM', 
      completed: true, 
      desc: '6 mandatory blueprints and deeds verified.' 
    },
    { 
      name: 'Application Submitted to Portal', 
      date: '04 Mar 2026 · 10:30 AM', 
      completed: true, 
      desc: `Composite Single-Window Docket ID ${displayAppId} assigned.` 
    },
    { 
      name: 'Preliminary Scrutiny by DIC', 
      date: '08 Mar 2026 · 02:15 PM', 
      completed: true, 
      desc: 'Capital investment & land allotment verified by Industry Department.' 
    },
    { 
      name: 'Parallel Multi-Department Review', 
      date: 'Active Phase (Day 14 of 30)', 
      completed: selectedApp.stageProgress >= 65, 
      active: selectedApp.stageProgress < 85, 
      desc: 'Concurrent scrutiny by State Pollution Control Board, Fire Safety and DISH.' 
    },
    { 
      name: 'Joint Field Inspection', 
      date: selectedApp.stageProgress >= 80 ? 'Completed · 16 Mar 2026' : 'Scheduled · 28 Mar 2026', 
      completed: selectedApp.stageProgress >= 85, 
      active: selectedApp.stageProgress >= 75 && selectedApp.stageProgress < 85, 
      desc: 'Central Inspection System synchronized on-site safety and environmental audit.' 
    },
    { 
      name: 'Final Statutory Approval & Digital Certificate', 
      date: selectedApp.stageProgress === 100 ? 'Issued · 18 Mar 2026' : 'Pending Clearance Consolidation', 
      completed: selectedApp.stageProgress === 100, 
      desc: 'Issuance of Consolidated Single Window Clearance NOC.' 
    }
  ];

  return (
    <div className="tracking-wrapper">
      {/* 1. TOP DOCKET SELECTOR STRIP */}
      <div className="tracking-selector-strip">
        <div className="tracking-selector-left">
          <span className="tracking-selector-label">
            <FileSearch size={15} color="#1D4E89" />
            Select Application Docket:
          </span>
          <select 
            className="tracking-select-dropdown"
            value={selectedApp.id}
            onChange={e => setSelectedApplicationId(e.target.value)}
            aria-label="Select Application Docket"
          >
            {applications.map(app => {
              const formattedId = app.id.startsWith('APP-') ? app.id : `IA-2026-${app.id.substring(0, 6).toUpperCase()}`;
              return (
                <option key={app.id} value={app.id}>
                  {formattedId} — {app.businessName} ({app.category} Category)
                </option>
              );
            })}
          </select>
        </div>

        <div className="tracking-selector-right" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button 
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsChecklistOpen(true)}
            style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <ClipboardList size={14} color="var(--color-primary-600)" />
            <span>{t.checklist.navButton}</span>
          </button>

          <StatusBadge status={selectedApp.currentStage} size="sm" />
          {selectedApp.currentStage === 'APPROVED' && (
            <button 
              type="button"
              className="tracking-action-btn btn-primary-action"
              onClick={() => onNavigate('final-approval')}
              style={{ backgroundColor: '#059669', borderColor: '#059669', padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <ShieldCheck size={14} />
              View Official Certificate
            </button>
          )}
        </div>
      </div>

      {/* 2. AI PREDICTIVE SLA & RISK NOTIFICATION (IF ACTIVE) */}
      <AIAssistanceCard
        type="DELAY_PREDICTION"
        predictionData={predictionData}
        loading={predLoading}
      />

      {/* 3. HUMAN-DESIGNED ENTERPRISE APPLICATION IDENTITY & WORKFLOW HEADER */}
      <div className="tracking-header-card">
        <div className="tracking-header-body">
          {/* LEFT SIDE: Identity Hierarchy */}
          <div className="tracking-identity-group">
            <div className="tracking-icon-badge" aria-hidden="true">
              <FileText size={22} strokeWidth={1.8} />
            </div>

            <div className="tracking-identity-text">
              <div className="tracking-eyebrow-label">
                <span>Application Tracking</span>
                <span>•</span>
                <span>Single Window Clearance</span>
              </div>

              <div className="tracking-id-row">
                <span className="tracking-main-id" title="Statutory Application Docket ID">
                  {displayAppId}
                </span>

                <button 
                  type="button" 
                  className="tracking-copy-button"
                  onClick={handleCopyId}
                  title="Copy Application ID"
                >
                  {copiedId ? (
                    <>
                      <Check size={12} color="#059669" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              <div className="tracking-business-title">
                <Building2 size={16} color="#64748B" style={{ flexShrink: 0 }} />
                <span>{selectedApp.businessName}</span>
              </div>

              <div className="tracking-location-bar">
                <span className="tracking-meta-item">
                  <MapPin size={13} color="#94A3B8" />
                  <span>{selectedApp.proposedLocation.district}, {selectedApp.proposedLocation.state}</span>
                </span>
                <span>•</span>
                <span className="tracking-meta-item">
                  <span>{selectedApp.proposedLocation.industrialArea}</span>
                </span>
                <span>•</span>
                <span className="tracking-meta-item" style={{ fontWeight: 600, color: '#334155' }}>
                  {selectedApp.category} Category
                </span>
              </div>

              {/* Business Members Stats: Applied vs Approved */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-md)',
                padding: '4px 12px',
                marginTop: 8,
                flexWrap: 'wrap'
              }}>
                <Users size={14} color="var(--color-primary-700)" />
                <span style={{ fontSize: '0.8125rem', color: '#475569' }}>
                  {language === 'hi' ? 'आवेदक सदस्य:' : language === 'mr' ? 'अर्जदार सदस्य:' : 'Members Applied:'}{' '}
                  <strong style={{ color: '#0F172A' }}>{selectedApp.membersApplied ?? 4}</strong>
                </span>
                <span style={{ color: '#CBD5E1' }}>•</span>
                <span style={{ fontSize: '0.8125rem', color: '#475569' }}>
                  {language === 'hi' ? 'स्वीकृत सदस्य:' : language === 'mr' ? 'मंजूर सदस्य:' : 'Members Approved:'}{' '}
                  <strong style={{ color: '#059669' }}>{selectedApp.membersApproved ?? 4}</strong>
                </span>
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  backgroundColor: (selectedApp.membersApproved ?? 4) === (selectedApp.membersApplied ?? 4) ? '#ECFDF5' : '#EFF6FF',
                  color: (selectedApp.membersApproved ?? 4) === (selectedApp.membersApplied ?? 4) ? '#065F46' : '#1E40AF',
                  padding: '2px 8px',
                  borderRadius: 4
                }}>
                  {Math.round(((selectedApp.membersApproved ?? 4) / (selectedApp.membersApplied ?? 4)) * 100)}% {language === 'hi' ? 'क्लीयरेंस' : language === 'mr' ? 'मंजूर' : 'Cleared'}
                </span>
              </div>

              {/* Secondary technical identifier for compliance / internal reference */}
              {isUUID && (
                <div className="tracking-internal-ref" title="Backend Database Internal UUID">
                  <Info size={12} color="#94A3B8" />
                  <span>Internal Reference:</span>
                  <span>{selectedApp.id}</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Status & Actions */}
          <div className="tracking-status-area">
            <div className="tracking-status-block">
              <span className="tracking-status-label">Current Status</span>
              <StatusBadge status={selectedApp.currentStage} size="md" />
            </div>

            <div className="tracking-updated-tag">
              <Clock size={13} color="#94A3B8" />
              <span>Last Updated: {selectedApp.lastUpdatedAt || '04 Mar 2026, 10:28 AM'}</span>
            </div>

            <div className="tracking-action-bar">
              <button 
                type="button"
                className="tracking-action-btn btn-primary-action"
                onClick={() => setActiveTab('docket')}
                title="View Complete Application Dossier"
              >
                <FileText size={14} />
                <span>View Dossier</span>
              </button>

              <button 
                type="button"
                className="tracking-action-btn btn-secondary-action"
                onClick={handleDownloadSummary}
                title="Download Application Summary PDF"
              >
                {downloadSuccess ? (
                  <>
                    <Check size={14} color="#059669" />
                    <span>Summary Saved</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>Download Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4. CLEAN ENTERPRISE TABS BAR */}
        <div className="tracking-tabs-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'timeline'}
            onClick={() => setActiveTab('timeline')}
            className={`tracking-tab-button ${activeTab === 'timeline' ? 'is-active' : ''}`}
          >
            <Clock size={16} />
            <span>Timeline</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'departments'}
            onClick={() => setActiveTab('departments')}
            className={`tracking-tab-button ${activeTab === 'departments' ? 'is-active' : ''}`}
          >
            <Layers size={16} />
            <span>Parallel Routing</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'docket'}
            onClick={() => setActiveTab('docket')}
            className={`tracking-tab-button ${activeTab === 'docket' ? 'is-active' : ''}`}
          >
            <FileText size={16} />
            <span>Application Dossier</span>
          </button>
        </div>

        {/* 5. TAB PANELS */}
        <div className="tracking-tab-content">
          {/* TAB 1: WORKFLOW TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="tracking-timeline-flow">
              {/* Vertical connector line */}
              <div className="tracking-timeline-connector" aria-hidden="true" />

              {timelineStages.map((stage, idx) => (
                <div 
                  key={idx}
                  className={`tracking-timeline-step ${stage.active ? 'is-active' : ''} ${!stage.completed && !stage.active ? 'is-pending' : ''}`}
                >
                  <div className={`tracking-timeline-marker ${stage.completed ? 'completed' : stage.active ? 'active' : 'pending'}`}>
                    {stage.completed ? (
                      <CheckCircle2 size={18} strokeWidth={2.2} />
                    ) : stage.active ? (
                      <Clock size={18} strokeWidth={2.2} />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  <div className="tracking-timeline-details">
                    <div className="tracking-step-header">
                      <h4 className="tracking-step-title">
                        {stage.name}
                      </h4>
                      <span className="tracking-step-time">
                        <Calendar size={12} />
                        {stage.date}
                      </span>
                    </div>
                    <p className="tracking-step-desc">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: PARALLEL DEPARTMENT ROUTING TREE */}
          {activeTab === 'departments' && (
            <div>
              <div className="tracking-routing-diagram">
                <div className="tracking-routing-header-tag">
                  <FileText size={15} /> Composite Clearance Routing ({displayAppId})
                </div>

                <div style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: 16, fontWeight: 600 }}>
                  ↓ Concurrent Inter-Departmental Scrutiny Under Single Window Act ↓
                </div>

                <div className="tracking-routing-grid">
                  {selectedApp.departments.map(dept => (
                    <div key={dept.departmentId} className="tracking-routing-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {getDeptIcon(dept.shortCode)}
                          <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0B2545' }}>
                            {dept.shortCode}
                          </span>
                        </div>
                        <StatusBadge status={dept.status} size="sm" />
                      </div>

                      <div style={{ fontSize: '0.78125rem', fontWeight: 600, color: '#1E293B', marginBottom: 6 }}>
                        {dept.departmentName}
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', margin: '4px 0' }}>
                        <span>Officer:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOfficerQuery(dept.assignedOfficer);
                            setIsOfficerModalOpen(true);
                          }}
                          style={{
                            background: 'var(--color-primary-50)',
                            border: '1px solid var(--color-primary-200)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--color-primary-800)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: '0.75rem',
                            textAlign: 'left'
                          }}
                          title="Click to view all businesses and statutory clearances approved by this officer"
                        >
                          <span>{dept.assignedOfficer}</span>
                          <ExternalLink size={11} color="var(--color-primary-700)" />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.71875rem', color: '#64748B', marginTop: 4 }}>
                        SLA Target: <strong>{dept.slaDays} Days</strong> ({dept.remainingDays} days remaining)
                      </div>

                      {dept.approvalCertificateNo && (
                        <div style={{ fontSize: '0.6875rem', color: '#065F46', marginTop: 6, backgroundColor: '#ECFDF5', padding: '3px 6px', borderRadius: 4, fontWeight: 600 }}>
                          NOC: {dept.approvalCertificateNo}
                        </div>
                      )}

                      {dept.remarks && (
                        <div style={{ fontSize: '0.6875rem', color: '#991B1B', marginTop: 6, backgroundColor: '#FEF2F2', padding: '3px 6px', borderRadius: 4 }}>
                          {dept.remarks}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPLICATION DOSSIER */}
          {activeTab === 'docket' && (
            <div className="tracking-dossier-grid">
              <div className="tracking-dossier-section">
                <h4 className="tracking-dossier-title">
                  <Building2 size={16} color="#1D4E89" />
                  Enterprise Profile
                </h4>
                <div className="tracking-dossier-list">
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Legal Entity Name:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.businessName}</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Enterprise Scale:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.enterpriseType}</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Industrial Sector:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.sector}</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Promoter / Contact:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.contactPerson.name}</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Mobile / Email:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.contactPerson.mobile}</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">PAN / GSTIN:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.contactPerson.panNumber} / {selectedApp.contactPerson.gstin}</span>
                  </div>
                </div>
              </div>

              <div className="tracking-dossier-section">
                <h4 className="tracking-dossier-title">
                  <Factory size={16} color="#1D4E89" />
                  Infrastructure & Utility Demands
                </h4>
                <div className="tracking-dossier-list">
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Plot Location:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.proposedLocation.plotNo}, {selectedApp.proposedLocation.industrialArea}</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Land Extent:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.proposedLocation.landAreaAcres} Acres</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Contracted Power:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.proposedLocation.powerRequirementKVA} KVA</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Water Demand:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.proposedLocation.waterRequirementKLD} KLD</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Total Capital Outlay:</span>
                    <span className="tracking-dossier-row-value">₹{(selectedApp.investmentInLakhs / 100).toFixed(2)} Crores</span>
                  </div>
                  <div className="tracking-dossier-row">
                    <span className="tracking-dossier-row-label">Expected Direct Jobs:</span>
                    <span className="tracking-dossier-row-value">{selectedApp.expectedEmployment} Personnel</span>
                  </div>
                </div>
              </div>

              <div className="tracking-dossier-section" style={{ gridColumn: '1 / -1' }}>
                <h4 className="tracking-dossier-title">
                  <FileText size={16} color="#1D4E89" />
                  Project Description & Environmental Compliance Scope
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6 }}>
                  {selectedApp.projectDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Officer Approvals & Clearances Modal */}
      <OfficerApprovalModal
        isOpen={isOfficerModalOpen}
        onClose={() => setIsOfficerModalOpen(false)}
        officerQuery={selectedOfficerQuery}
      />

      {/* Pre-Registration Business Checklists Modal */}
      <BusinessChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
};

export default TrackingPage;
