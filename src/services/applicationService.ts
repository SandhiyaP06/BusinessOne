import api from './api';

export interface CreateApplicationDto {
  businessId: string;
  category: 'GREEN' | 'ORANGE' | 'RED' | 'WHITE';
  investmentInLakhs: number;
  expectedEmployment: number;
  landAreaAcres: number;
  powerLoadKVA: number;
  waterLoadKLD: number;
  hasBoiler: boolean;
  hasHazardousChem: boolean;
  applicationType?: string;
}

export interface ApprovalRecommendation {
  id: string;
  approvalName: string;
  departmentName: string;
  departmentCode: string;
  departmentId: string;
  mandatedSlaDays: number;
  legalAct?: string;
  reason: string;
  requiredDocuments: string[];
  isMandatory: boolean;
  status?: string;
}

export interface ApplicationDetail {
  id: string;
  applicationNumber: string;
  businessId: string;
  applicationType: string;
  status: string;
  currentStage: string;
  category: string;
  investmentInLakhs: number;
  expectedEmployment: number;
  landAreaAcres: number;
  powerLoadKVA: number;
  waterLoadKLD: number;
  hasBoiler: boolean;
  hasHazardousChem: boolean;
  submittedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  business?: any;
  departments?: any[];
  documents?: any[];
  inspections?: any[];
  queries?: any[];
  approvals?: any[];
  workflowStages?: any[];
}

export const ApplicationService = {
  async getAll(): Promise<ApplicationDetail[]> {
    const res = await api.get<ApplicationDetail[]>('/applications');
    return res.data;
  },

  async getById(id: string): Promise<ApplicationDetail> {
    const res = await api.get<ApplicationDetail>(`/applications/${id}`);
    return res.data;
  },

  async createDraft(data: CreateApplicationDto): Promise<ApplicationDetail> {
    const res = await api.post<ApplicationDetail>('/applications', data);
    return res.data;
  },

  async updateDraft(id: string, data: Partial<CreateApplicationDto>): Promise<ApplicationDetail> {
    const res = await api.put<ApplicationDetail>(`/applications/${id}`, data);
    return res.data;
  },

  async getRecommendations(applicationId: string): Promise<ApprovalRecommendation[]> {
    const res = await api.get<ApprovalRecommendation[]>(`/applications/${applicationId}/recommendations`);
    return res.data;
  },

  async submit(id: string): Promise<ApplicationDetail> {
    const res = await api.post<ApplicationDetail>(`/applications/${id}/submit`);
    return res.data;
  }
};

export default ApplicationService;
