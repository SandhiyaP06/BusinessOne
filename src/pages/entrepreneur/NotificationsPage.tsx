import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Bell, 
  Check, 
  HelpCircle, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface NotificationsPageProps {
  onNavigate: (tab: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const categories = ['ALL', 'APPLICATION', 'DOCUMENT', 'INSPECTION', 'QUERY', 'APPROVAL', 'RENEWAL'];

  const filteredNotifications = notifications.filter(n => {
    if (filterCategory === 'ALL') return true;
    return n.category === filterCategory;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'QUERY': return <HelpCircle size={18} color="var(--color-danger)" />;
      case 'INSPECTION': return <Calendar size={18} color="var(--color-primary-600)" />;
      case 'APPROVAL': return <CheckCircle2 size={18} color="var(--color-success)" />;
      case 'DOCUMENT': return <FileText size={18} color="var(--color-info)" />;
      case 'RENEWAL': return <RefreshCw size={18} color="var(--color-warning)" />;
      default: return <Bell size={18} color="var(--text-muted)" />;
    }
  };

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markAsRead(notif.id);
    if (notif.category === 'QUERY') onNavigate('queries');
    else if (notif.category === 'INSPECTION') onNavigate('inspections');
    else if (notif.category === 'APPROVAL') onNavigate('final-approval');
    else if (notif.category === 'DOCUMENT') onNavigate('documents');
    else if (notif.category === 'RENEWAL') onNavigate('renewals');
    else onNavigate('tracking');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header */}
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
            <Bell size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              Central Notification Center
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Statutory docket updates, inspection calls, department queries, and licence expiry alerts.
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            icon={<Check size={14} />}
          >
            Mark All as Read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Category Pills & Notification Feed */}
      <Card
        title="Statutory Activity Feed"
        subtitle="Chronological audit notifications across your enterprise filings."
      >
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              {cat === 'ALL' ? 'All Alerts' : cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No notifications found in this category.
            </div>
          ) : (
            filteredNotifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  backgroundColor: notif.isRead ? 'var(--bg-surface)' : 'rgba(37, 99, 235, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-4)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = notif.isRead ? 'var(--bg-surface)' : 'rgba(37, 99, 235, 0.04)')}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {getCategoryIcon(notif.category)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: notif.isRead ? 600 : 800, color: 'var(--text-heading)' }}>
                      {notif.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {notif.timestamp}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {notif.message}
                  </p>
                </div>

                {!notif.isRead && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary-600)', alignSelf: 'center', flexShrink: 0 }} />
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
