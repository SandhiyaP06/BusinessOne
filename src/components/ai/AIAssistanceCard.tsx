import React, { useState } from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, ChevronRight, Scale, Clock, AlertTriangle, FileText, Info } from 'lucide-react';
import { RegulationAnalysisResult, DocumentOcrResult, PredictiveDelayResult } from '../../services/aiService';

interface AIAssistanceCardProps {
  type: 'REGULATION' | 'DOCUMENT_OCR' | 'DELAY_PREDICTION';
  regulationData?: RegulationAnalysisResult | null;
  ocrData?: DocumentOcrResult | null;
  predictionData?: PredictiveDelayResult | null;
  loading?: boolean;
  onRefresh?: () => void;
}

export const AIAssistanceCard: React.FC<AIAssistanceCardProps> = ({
  type,
  regulationData,
  ocrData,
  predictionData,
  loading = false,
  onRefresh
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(16, 185, 129, 0.04) 100%)',
        border: '1px solid #CBD5E1',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <Sparkles size={20} className="spin" style={{ color: '#2563EB', animation: 'spin 2s linear infinite' }} />
        <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>
          AI Supporting Layer is analyzing compliance rules & statutory frameworks...
        </span>
      </div>
    );
  }

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #CBD5E1',
      borderLeft: '4px solid #2563EB',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(15, 23, 42, 0.04)',
      overflow: 'hidden',
      marginBottom: '20px'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 18px',
        background: 'linear-gradient(90deg, #EFF6FF 0%, #F8FAFC 100%)',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: '#2563EB',
            color: '#FFFFFF',
            borderRadius: '6px',
            padding: '4px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}>
            <Sparkles size={12} />
            AI ASSIST
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#0B2545' }}>
            {type === 'REGULATION' && 'Statutory Regulation & Clearance Advisor'}
            {type === 'DOCUMENT_OCR' && 'Automated Document OCR & Field Verification'}
            {type === 'DELAY_PREDICTION' && 'Predictive SLA Turnaround & Bottleneck Forecast'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            padding: '2px 8px',
            borderRadius: '12px',
            background: '#E0EBF7',
            color: '#133E70',
            fontWeight: 600
          }}>
            Advisory Only
          </span>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div style={{ padding: '16px 20px' }}>
          {/* 1. Regulation Advisor */}
          {type === 'REGULATION' && regulationData && (
            <div>
              <p style={{ fontSize: '13.5px', color: '#1E293B', lineHeight: '1.5', margin: '0 0 14px 0' }}>
                {regulationData.summary}
              </p>

              {/* Explanations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                {regulationData.statutoryExplanations.map((exp, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#334155',
                    background: '#F8FAFC',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0'
                  }}>
                    <Scale size={16} style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }} />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>

              {/* Applicable Acts Table */}
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Statutory Legal Enactments Identified
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                  {regulationData.applicableActs.map((act, idx) => (
                    <div key={idx} style={{
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: act.mandatory ? '1px solid #BAE6FD' : '1px solid #E2E8F0',
                      background: act.mandatory ? '#F0F9FF' : '#FAFAFA'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#0369A1' }}>{act.authority}</span>
                        {act.mandatory && (
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#B91C1C', background: '#FEE2E2', padding: '1px 6px', borderRadius: '4px' }}>
                            MANDATORY
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>
                        {act.actName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#475569' }}>
                        {act.section} — {act.requirement}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Document OCR Cross-Check */}
          {type === 'DOCUMENT_OCR' && ocrData && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '6px',
                background: ocrData.aiValidationPassed ? '#ECFDF5' : '#FEF2F2',
                border: ocrData.aiValidationPassed ? '1px solid #A7F3D0' : '1px solid #FECACA',
                marginBottom: '12px'
              }}>
                {ocrData.aiValidationPassed ? (
                  <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
                ) : (
                  <AlertTriangle size={18} style={{ color: '#DC2626', flexShrink: 0 }} />
                )}
                <div style={{ fontSize: '13px', fontWeight: 500, color: ocrData.aiValidationPassed ? '#065F46' : '#991B1B' }}>
                  {ocrData.verificationMessage}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Extracted Document Type</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{ocrData.extractedData.detectedType}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Extracted Registration Number</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', fontFamily: 'monospace' }}>{ocrData.extractedData.extractedId}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>OCR Authenticity Confidence</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#059669' }}>{ocrData.extractedData.ocrConfidence}% Match</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Delay & Bottleneck Prediction */}
          {type === 'DELAY_PREDICTION' && predictionData && (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
                <div style={{
                  flex: '1 1 200px',
                  background: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: '6px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#0284C7' }}>FORECASTED DISPOSAL TIME</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#0B2545', marginTop: '2px' }}>
                    {predictionData.predictedDaysToFinalClearance} Working Days
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>Statutory SLA Maximum: {predictionData.statutoryMaxSlaDays} Days</div>
                </div>

                <div style={{
                  flex: '1 1 200px',
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  borderRadius: '6px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#059669' }}>SLA COMPLIANCE PROBABILITY</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#065F46', marginTop: '2px' }}>
                    {predictionData.slaComplianceProbability}%
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>Risk Level: {predictionData.riskLevel}</div>
                </div>
              </div>

              {predictionData.bottleneckRisks.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
                    Potential Queue Bottleneck Factors:
                  </div>
                  {predictionData.bottleneckRisks.map((risk, idx) => (
                    <div key={idx} style={{
                      fontSize: '12.5px',
                      color: '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px'
                    }}>
                      <Info size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Legal / Authority Disclaimer */}
          <div style={{
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid #E2E8F0',
            fontSize: '11px',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldAlert size={14} style={{ color: '#94A3B8', flexShrink: 0 }} />
            <span>
              <strong>Statutory Governance Note:</strong> AI outputs serve solely as decision support. Final clearances are exercised exclusively by designated Department Officers under the State Single Window Act.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
