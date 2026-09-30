import api from './api';

export interface NotificationItem {
  id: string;
  userId: string;
  applicationId?: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const NotificationService = {
  async getAll(): Promise<NotificationItem[]> {
    const res = await api.get<NotificationItem[]>('/notifications');
    return res.data;
  },

  async markAsRead(id: string): Promise<any> {
    const res = await api.patch(`/notifications/${id}/read`);
    return res.data;
  },

  async markAllAsRead(): Promise<any> {
    const res = await api.post('/notifications/mark-all-read');
    return res.data;
  }
};

export default NotificationService;
