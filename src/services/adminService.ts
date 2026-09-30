import api from './api';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  designation?: string;
  departmentId?: string;
  department?: {
    name: string;
    shortCode: string;
  };
  isActive: boolean;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  description: string;
  ipAddress?: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
    designation?: string;
  };
}

export const AdminService = {
  async getUsers(): Promise<SystemUser[]> {
    const res = await api.get<SystemUser[]>('/admin/users');
    return res.data;
  },

  async getAuditLogs(): Promise<AuditLogItem[]> {
    const res = await api.get<AuditLogItem[]>('/admin/audit-logs');
    return res.data;
  }
};

export default AdminService;
