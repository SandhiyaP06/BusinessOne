import { PortalNotification } from '../types';

export const mockNotifications: PortalNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Department Query Raised',
    message: 'Fire & Emergency Safety Services raised a query on Application APP-2026-IND-04829 regarding hydrant loop drawings.',
    category: 'QUERY',
    timestamp: '10 minutes ago',
    isRead: false,
    priority: 'URGENT'
  },
  {
    id: 'NOTIF-02',
    title: 'Site Inspection Scheduled',
    message: 'SPCB & Drug Inspectorate scheduled a joint physical site visit for APP-2026-IND-03911 on 24 Mar 2026 at 10:30 AM.',
    category: 'INSPECTION',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'HIGH'
  },
  {
    id: 'NOTIF-03',
    title: 'Department Clearance Approved',
    message: 'Town & Country Planning Authority has granted building plan clearance for APP-2026-IND-04829.',
    category: 'APPROVAL',
    timestamp: 'Yesterday',
    isRead: true,
    priority: 'NORMAL'
  },
  {
    id: 'NOTIF-04',
    title: 'Document Verified',
    message: 'Directorate of Industries verified your Certificate of Incorporation & Registered Land Possession Deed.',
    category: 'DOCUMENT',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'NORMAL'
  },
  {
    id: 'NOTIF-05',
    title: 'Licence Expiring Soon',
    message: 'Consent To Operate (CTO) for Apex Precision Castings (PCB/CTO/2025/1194) expires in 21 days. Initiate renewal.',
    category: 'RENEWAL',
    timestamp: '4 days ago',
    isRead: false,
    priority: 'HIGH'
  }
];
