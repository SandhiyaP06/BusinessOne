import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { DocumentItem, DocumentValidationStatus } from '../../types';
import { 
  FolderLock, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Download, 
  Filter,
  Check,
  FileCheck2,
  FileSearch,
  ShieldCheck,
  Search
} from 'lucide-react';

import { AIAssistanceCard } from '../../components/ai/AIAssistanceCard';
import AiService, { DocumentOcrResult } from '../../services/aiService';

interface DocumentVaultPageProps {
  onNavigate: (tab: string) => void;
}

export const DocumentVaultPage: React.FC<DocumentVaultPageProps> = ({ onNavigate }) => {
  const { documents, uploadDocument, selectedApplication } = useApplications();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [uploadModalDoc, setUploadModalDoc] = useState<DocumentItem | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [ocrResult, setOcrResult] = useState<DocumentOcrResult | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);

  const categories = ['ALL', 'LEGAL', 'TECHNICAL', 'ENVIRONMENTAL', 'SAFETY', 'FINANCIAL'];

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (doc.fileName && doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const verifiedCount = documents.filter(d => d.validationStatus === 'VERIFIED').length;
  const underValidationCount = documents.filter(d => d.validationStatus === 'UNDER_VALIDATION').length;
  const pendingCount = documents.filter(d => d.validationStatus === 'REQUIRED').length;
  const rejectedCount = documents.filter(d => d.validationStatus === 'REJECTED').length;

  const handleOpenPreview = async (doc: DocumentItem) => {
    setPreviewDoc(doc);
    setOcrLoading(true);
    try {
      const docTypeKey = doc.name.includes('PAN') ? 'PAN_CARD' : doc.name.includes('GST') ? 'GST_CERTIFICATE' : doc.name.includes('Site') ? 'SITE_PLAN' : 'POLLUTION_NOC';
      const ocr = await AiService.verifyDocumentWithAi(doc.id, docTypeKey, selectedApplication?.id);
      setOcrResult(ocr);
    } catch (err) {
      console.warn('AI OCR fallback:', err);
    } finally {
      setOcrLoading(false);
    }
  };

  const handleSimulatedUpload = async (file: File) => {
    if (uploadModalDoc) {
      await uploadDocument(
        uploadModalDoc.id,
        file.name,
        `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        file
      );
      setUploadModalDoc(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && uploadModalDoc) {
      handleSimulatedUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header Banner */}
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
            <FolderLock size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              Document Management & Statutory Validation Vault
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Centralized repository for structural drawings, deeds, and NOC enclosures with automated department verification.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setUploadModalDoc(documents[0])}
          icon={<UploadCloud size={15} />}
        >
          Upload Document
        </Button>
      </div>

      {/* Validation Status Summary Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 'var(--space-4)'
      }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Verified & Cleared</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)', marginTop: 2 }}>{verifiedCount}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Under Scrutiny</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-warning)', marginTop: 2 }}>{underValidationCount}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pending Upload</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-secondary)', marginTop: 2 }}>{pendingCount}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Re-upload Required</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-danger)', marginTop: 2 }}>{rejectedCount}</div>
        </div>
      </div>

      {/* Main Document Table & Filters */}
      <Card
        title="Statutory Documents Registry"
        subtitle="Manage and track approval status of all uploaded files across participating departments."
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search document..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '32px', fontSize: '0.8125rem', height: 34, width: 200 }}
              />
              <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        }
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              {cat === 'ALL' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>Mandatory</th>
                <th>File Name & Size</th>
                <th>Validation Status</th>
                <th>Verified By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FileText size={16} color="var(--color-primary-600)" />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{doc.name}</div>
                        {doc.rejectionReason && (
                          <div style={{ fontSize: '0.6875rem', color: 'var(--color-danger-text)', marginTop: 2, fontWeight: 500 }}>
                            Rejection Note: {doc.rejectionReason}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '0.6875rem' }}>{doc.category}</span>
                  </td>
                  <td>
                    {doc.required ? (
                      <span style={{ color: 'var(--color-danger)', fontWeight: 700, fontSize: '0.75rem' }}>Yes</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Optional</span>
                    )}
                  </td>
                  <td>
                    {doc.fileName ? (
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.8125rem' }}>{doc.fileName}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{doc.fileSize} • Uploaded {doc.uploadedAt}</div>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontStyle: 'italic' }}>Not uploaded yet</span>
                    )}
                  </td>
                  <td>
                    <StatusBadge status={doc.validationStatus} />
                  </td>
                  <td>
                    {doc.verifiedBy ? (
                      <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{doc.verifiedBy}</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {doc.isUploaded ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => handleOpenPreview(doc)}
                            title="Preview Document"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setUploadModalDoc(doc)}
                            title="Replace / Update Document"
                          >
                            <RefreshCw size={14} />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => setUploadModalDoc(doc)}
                        >
                          <UploadCloud size={14} /> Upload
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL 1: Document Upload / Replace Modal */}
      {uploadModalDoc && (
        <Modal
          isOpen={true}
          onClose={() => setUploadModalDoc(null)}
          title="Upload Statutory Enclosure"
          subtitle={`Filing document for: ${uploadModalDoc.name}`}
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              onDragOver={e => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              style={{
                border: dragActive ? '2px dashed var(--color-primary-600)' : '2px dashed var(--border-strong)',
                backgroundColor: dragActive ? 'var(--color-primary-50)' : 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-8)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--color-primary-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-3)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <UploadCloud size={24} />
              </div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                Drag & Drop Document Here
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Supports PDF, DWG (Autodesk Drawings), ZIP archives (Max 25 MB)
              </p>

              <label className="btn btn-primary btn-sm" style={{ marginTop: 'var(--space-4)', display: 'inline-flex', cursor: 'pointer' }}>
                Browse Local Files
                <input 
                  type="file" 
                  accept=".pdf,.dwg,.zip" 
                  style={{ display: 'none' }} 
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleSimulatedUpload(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div>• Ensure documents contain authorized digital signatures or official corporate seals.</div>
              <div>• Architectural & fire blueprints must include scale legend (1:100 or 1:200).</div>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: Document Preview Modal */}
      {previewDoc && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewDoc(null)}
          title={previewDoc.name}
          subtitle={`Verified Enclosure • ${previewDoc.fileName} (${previewDoc.fileSize})`}
          size="lg"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={16} color="var(--color-success)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SHA-256 Digital Checksum Verified</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Button variant="secondary" size="sm" onClick={() => setPreviewDoc(null)}>
                  Close
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => alert(`Downloading ${previewDoc.fileName}...`)}
                  icon={<Download size={14} />}
                >
                  Download File
                </Button>
              </div>
            </div>
          }
        >
          {/* AI OCR Cross-Verification Assistant Card */}
          <AIAssistanceCard
            type="DOCUMENT_OCR"
            ocrData={ocrResult}
            loading={ocrLoading}
          />

          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-12) var(--space-6)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 320
          }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FFFFFF',
              color: 'var(--color-primary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <FileCheck2 size={32} />
            </div>
            <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--text-heading)' }}>
              {previewDoc.fileName}
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Document Category: <strong>{previewDoc.category}</strong> • Status: <strong>{previewDoc.validationStatus}</strong>
            </p>
            {previewDoc.verifiedBy && (
              <div style={{ marginTop: 'var(--space-3)', fontSize: '0.75rem', color: 'var(--color-success-text)', backgroundColor: 'var(--color-success-bg)', padding: '4px 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-success-border)' }}>
                Officially Verified by {previewDoc.verifiedBy} on {previewDoc.verifiedAt || '10 Mar 2026'}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
