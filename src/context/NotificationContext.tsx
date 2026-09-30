import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PortalNotification } from '../types';
import { mockNotifications } from '../data/mockNotifications';
import NotificationService from '../services/notificationService';

interface NotificationContextType {
  notifications: PortalNotification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notif: Omit<PortalNotification, 'id' | 'timestamp' | 'isRead'>) => void;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<PortalNotification[]>(mockNotifications);

  const refreshNotifications = useCallback(async () => {
    try {
      const backendNotifs = await NotificationService.getAll();
      if (backendNotifs && backendNotifs.length > 0) {
        const mapped: PortalNotification[] = backendNotifs.map((n: any) => ({
          id: n.id,
          title: n.title,
          message: n.message,
          type: (n.type || 'INFO') as any,
          category: 'APPLICATION' as any,
          priority: 'NORMAL' as any,
          timestamp: new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date(n.createdAt).toLocaleDateString('en-GB'),
          isRead: n.isRead,
          applicationId: n.applicationId
        }));
        setNotifications(mapped);
      }
    } catch {
      // Keep local mock data fallback
    }
  }, []);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = async (id: string) => {
    try {
      await NotificationService.markAsRead(id);
    } catch {
      // fallback
    }
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
    } catch {
      // fallback
    }
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addNotification = (notif: Omit<PortalNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: PortalNotification = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      refreshNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
