import api from './api';

export interface DepartmentItem {
  id: string;
  name: string;
  code: string;
  shortCode: string;
  description?: string;
  mandatedSlaDays: number;
  isActive: boolean;
}

export const DepartmentService = {
  async getAll(): Promise<DepartmentItem[]> {
    const res = await api.get<DepartmentItem[]>('/departments');
    return res.data;
  },

  async getApplicationsForDepartment(departmentId: string): Promise<any[]> {
    const res = await api.get<any[]>(`/departments/${departmentId}/applications`);
    return res.data;
  },

  async routeApplication(applicationId: string, departmentId: string): Promise<any> {
    const res = await api.post(`/departments/route/${applicationId}`, { departmentId });
    return res.data;
  }
};

export default DepartmentService;
