import api from './api';

export interface ApprovalItem {
  id: string;
  applicationId: string;
  departmentId: string;
  officerId: string;
  decision: 'APPROVED' | 'REJECTED';
  remarks?: string;
  licenceNumber?: string;
  approvedAt?: string;
  rejectedAt?: string;
  department?: {
    id: string;
    name: string;
    shortCode: string;
  };
  officer?: {
    id: string;
    name: string;
    designation?: string;
  };
}

export const ApprovalService = {
  async getByApplication(applicationId: string): Promise<ApprovalItem[]> {
    const res = await api.get<ApprovalItem[]>(`/applications/${applicationId}/approvals`);
    return res.data;
  },

  async approveDepartment(
    applicationId: string,
    departmentId?: string,
    remarks?: string
  ): Promise<any> {
    const res = await api.post(`/applications/${applicationId}/approvals/approve`, {
      departmentId,
      remarks: remarks || 'All statutory parameters, inspection reports, and safety compliances verified and approved.'
    });
    return res.data;
  },

  async rejectDepartment(
    applicationId: string,
    departmentId?: string,
    remarks?: string
  ): Promise<any> {
    const res = await api.post(`/applications/${applicationId}/approvals/reject`, {
      departmentId,
      remarks: remarks || 'Statutory clearance rejected due to non-compliance.'
    });
    return res.data;
  }
};

export default ApprovalService;
