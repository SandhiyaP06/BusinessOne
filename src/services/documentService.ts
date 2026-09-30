import api from './api';

export interface DocumentItem {
  id: string;
  applicationId: string;
  documentType: string;
  name: string;
  fileName?: string;
  filePath?: string;
  mimeType?: string;
  fileSize?: number;
  uploadedById?: string;
  uploadedAt?: string;
  status: 'REQUIRED' | 'UPLOADED' | 'UNDER_VALIDATION' | 'VERIFIED' | 'REJECTED';
  validations?: {
    id: string;
    validationStatus: string;
    validationMessage?: string;
    validatedAt: string;
  }[];
}

export const DocumentService = {
  async getByApplication(applicationId: string): Promise<DocumentItem[]> {
    const res = await api.get<DocumentItem[]>(`/documents/application/${applicationId}`);
    return res.data;
  },

  async upload(
    applicationId: string,
    file: File,
    documentType: string,
    name: string
  ): Promise<DocumentItem> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('name', name);

    const res = await api.post<DocumentItem>(`/documents/upload/${applicationId}`, formData);
    return res.data;
  },

  async validate(
    documentId: string,
    validationStatus: 'VERIFIED' | 'REJECTED' | 'REQUIRES_CLARIFICATION',
    validationMessage?: string
  ): Promise<any> {
    const res = await api.post(`/documents/${documentId}/validate`, {
      validationStatus,
      validationMessage
    });
    return res.data;
  },

  async delete(documentId: string): Promise<any> {
    const res = await api.delete(`/documents/${documentId}`);
    return res.data;
  }
};

export default DocumentService;
