import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DepartmentQuery } from '../../types';
import { 
  HelpCircle, 
  Clock, 
  MessageSquare, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  FileText, 
  Paperclip,
  Building,
  UserCheck
} from 'lucide-react';

export const QueriesPage: React.FC = () => {
  const { queries, respondToQuery } = useApplications();
  const [selectedQuery, setSelectedQuery] = useState<DepartmentQuery | null>(null);
  const [responseText, setResponseText] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredQueries = queries.filter(q => {
    if (activeFilter === 'ALL') return true;
    return q.status === activeFilter;
  });

  const handleOpenReplyModal = (q: DepartmentQuery) => {
    setSelectedQuery(q);
    setResponseText(q.response?.responseText || '');
    setAttachedFileName(q.response?.attachments?.[0] || null);
  };

  const handleSubmitResponse = () => {
    if (!selectedQuery || !responseText.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      respondToQuery(
        selectedQuery.id, 
        responseText, 
        attachedFileName ? [attachedFileName] : ['Revised_Technical_Clarification.pdf']
      );
      setIsSubmitting(false);
      setSelectedQuery(null);
    }, 500);
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
            backgroundColor: 'var(--color-danger-bg)',
            color: 'var(--color-danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HelpCircle size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              Queries & Department Clarification Center
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Statutory communication channel for resolving scrutiny inquiries from reviewing department officers.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {['ALL', 'OPEN', 'RESPONDED', 'RESOLVED'].map(f => (
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

      {/* Queries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filteredQueries.map(q => (
          <Card
            key={q.id}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>{q.department}</span>
                <span style={{ color: 'var(--color-primary-600)', fontSize: '0.8125rem', fontFamily: 'var(--font-family-mono)' }}>
                  ({q.id})
                </span>
              </div>
            }
            subtitle={`Docket: ${q.applicationId} • Raised By: ${q.raisedByOfficer}`}
            action={<StatusBadge status={q.status} />}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {/* Question Box */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderLeft: '4px solid var(--color-primary-700)',
                padding: 'var(--space-4)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                  <span>Query Raised: <strong>{q.raisedAt}</strong></span>
                  <span style={{ color: 'var(--color-danger-text)', fontWeight: 700 }}>Due By: {q.dueDate}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-heading)', lineHeight: 1.5, fontWeight: 500 }}>
                  {q.question}
                </p>
              </div>

              {/* Response Box if answered */}
              {q.response && (
                <div style={{
                  backgroundColor: 'var(--color-success-bg)',
                  borderLeft: '4px solid var(--color-success)',
                  padding: 'var(--space-4)',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-success-text)', marginBottom: 4, fontWeight: 600 }}>
                    <span>Citizen Response Submitted ({q.response.respondedAt})</span>
                    <span>Status: Transmitted to Reviewing Officer</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {q.response.responseText}
                  </p>
                  {q.response.attachments && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                      {q.response.attachments.map((att, aIdx) => (
                        <span key={aIdx} style={{ fontSize: '0.6875rem', backgroundColor: '#FFFFFF', border: '1px solid var(--color-success-border)', padding: '2px 8px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Paperclip size={12} color="var(--color-success)" /> {att}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Trigger */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
                <Button
                  variant={q.status === 'OPEN' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleOpenReplyModal(q)}
                  icon={q.status === 'OPEN' ? <Send size={14} /> : <FileText size={14} />}
                >
                  {q.status === 'OPEN' ? 'Submit Official Reply & Documents' : 'View / Edit Clarification'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Reply Modal Dialog */}
      {selectedQuery && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedQuery(null)}
          title={`Respond to Scrutiny Query: ${selectedQuery.id}`}
          subtitle={`${selectedQuery.department} • Docket ${selectedQuery.applicationId}`}
          size="lg"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-danger-text)', fontWeight: 600 }}>
                Due Date: {selectedQuery.dueDate}
              </span>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Button variant="secondary" size="sm" onClick={() => setSelectedQuery(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={isSubmitting}
                  onClick={handleSubmitResponse}
                  icon={<Send size={14} />}
                >
                  Submit Official Response
                </Button>
              </div>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)'
            }}>
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>
                Department Query from {selectedQuery.raisedByOfficer}
              </span>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-heading)', fontWeight: 600, marginTop: 4 }}>
                {selectedQuery.question}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">
                Applicant Explanation / Technical Justification <span className="required">*</span>
              </label>
              <textarea
                className="form-textarea"
                rows={5}
                placeholder="Enter detailed clarification, revised engineering figures, or compliance notes..."
                value={responseText}
                onChange={e => setResponseText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Attach Supporting Drawing / Document (PDF)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                  <UploadCloud size={14} /> Choose File
                  <input
                    type="file"
                    accept=".pdf,.dwg,.zip"
                    style={{ display: 'none' }}
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
                {attachedFileName && (
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-success-text)', fontWeight: 600 }}>
                    ✓ Attached: {attachedFileName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
