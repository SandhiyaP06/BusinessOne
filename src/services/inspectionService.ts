import api from './api';

export interface InspectionItem {
  id: string;
  applicationId: string;
  departmentId: string;
  inspectorId?: string;
  scheduledDate: string;
  completedDate?: string;
  location: string;
  status: 'SCHEDULED' | 'ASSIGNED' | 'COMPLETED' | 'PASSED' | 'REINSPECTION_REQUIRED';
  remarks?: string;
  department?: {
    id: string;
    name: string;
    shortCode: string;
  };
  inspector?: {
    id: string;
    name: string;
    designation?: string;
  };
  application?: {
    id: string;
    applicationNumber: string;
    business?: {
      businessName: string;
      location: string;
    };
  };
  result?: {
    id: string;
    checklist: string;
    findings?: string;
    result: 'PASSED' | 'REINSPECT' | 'REJECTED';
    submittedAt: string;
  };
}

export interface ScheduleInspectionDto {
  applicationId: string;
  departmentId: string;
  scheduledDate: string;
  location: string;
  inspectorId?: string;
  remarks?: string;
}

export interface InspectionResultDto {
  checklist: Record<string, boolean | string>;
  findings: string;
  result: 'PASSED' | 'REINSPECT' | 'REJECTED';
  evidencePath?: string;
}

export const InspectionService = {
  async getAll(): Promise<InspectionItem[]> {
    const res = await api.get<InspectionItem[]>('/inspections');
    return res.data;
  },

  async getByApplication(applicationId: string): Promise<InspectionItem[]> {
    const res = await api.get<InspectionItem[]>(`/inspections/application/${applicationId}`);
    return res.data;
  },

  async schedule(data: ScheduleInspectionDto): Promise<InspectionItem> {
    const res = await api.post<InspectionItem>('/inspections/schedule', data);
    return res.data;
  },

  async submitResult(inspectionId: string, data: InspectionResultDto): Promise<any> {
    const res = await api.post(`/inspections/${inspectionId}/result`, data);
    return res.data;
  }
};

export default InspectionService;
