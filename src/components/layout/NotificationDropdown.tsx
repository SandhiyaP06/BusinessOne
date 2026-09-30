import React, { useRef, useEffect } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { 
  Bell, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  HelpCircle, 
  RefreshCw,
  Check
} from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose, onNavigate }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'QUERY': return <HelpCircle size={16} color="var(--color-danger)" />;
      case 'INSPECTION': return <Calendar size={16} color="var(--color-primary-600)" />;
      case 'APPROVAL': return <CheckCircle2 size={16} color="var(--color-success)" />;
      case 'DOCUMENT': return <FileText size={16} color="var(--color-info)" />;
      case 'RENEWAL': return <RefreshCw size={16} color="var(--color-warning)" />;
      default: return <Bell size={16} color="var(--text-muted)" />;
    }
  };

  const handleItemClick = (notif: typeof notifications[0]) => {
    markAsRead(notif.id);
    onClose();
    if (notif.category === 'QUERY') onNavigate('queries');
    else if (notif.category === 'INSPECTION') onNavigate('inspections');
    else if (notif.category === 'APPROVAL') onNavigate('final-approval');
    else if (notif.category === 'DOCUMENT') onNavigate('documents');
    else if (notif.category === 'RENEWAL') onNavigate('renewals');
    else onNavigate('tracking');
  };

  return (
    <div 
      ref={dropdownRef} 
      className="dropdown-menu" 
      style={{ 
        width: 380, 
        maxHeight: 480, 
        overflowY: 'auto', 
        padding: 0, 
        right: 0,
        boxShadow: 'var(--shadow-xl)'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-3) var(--space-4)',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-heading)' }}>Notifications</span>
          {unreadCount > 0 && (
            <span style={{ 
              fontSize: '0.6875rem', 
              backgroundColor: 'var(--color-primary-800)', 
              color: '#fff', 
              padding: '1px 6px', 
              borderRadius: '999px',
              fontWeight: 700 
            }}>
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button 
            type="button" 
            onClick={markAllAsRead}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-primary-600)', 
              fontSize: 'var(--font-size-xs)', 
              fontWeight: 600, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <Check size={12} /> Mark all read
          </button>
        )}
      </div>

      <div style={{ maxHeight: 380, overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
            No recent notifications
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => handleItemClick(n)}
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-4)',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: n.isRead ? 'var(--bg-surface)' : 'rgba(37, 99, 235, 0.04)',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = n.isRead ? 'var(--bg-surface)' : 'rgba(37, 99, 235, 0.04)')}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {getCategoryIcon(n.category)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                  <span style={{ 
                    fontSize: '0.8125rem', 
                    fontWeight: n.isRead ? 600 : 700, 
                    color: 'var(--text-heading)' 
                  }}>
                    {n.title}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {n.timestamp}
                  </span>
                </div>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {n.message}
                </p>
              </div>
              {!n.isRead && (
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary-600)', alignSelf: 'center', flexShrink: 0 }} />
              )}
            </div>
          ))
        )}
      </div>

      <div style={{
        padding: 'var(--space-2) var(--space-4)',
        textAlign: 'center',
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-subtle)'
      }}>
        <button
          type="button"
          onClick={() => { onClose(); onNavigate('notifications'); }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary-800)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          View all notifications center →
        </button>
      </div>
    </div>
  );
};
