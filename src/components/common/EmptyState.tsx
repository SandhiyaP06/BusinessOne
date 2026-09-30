import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-12) var(--space-6)',
      textAlign: 'center',
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--border-strong)'
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        backgroundColor: 'var(--bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        marginBottom: 'var(--space-4)'
      }}>
        {icon || <Inbox size={28} />}
      </div>
      <h4 style={{ color: 'var(--text-heading)', marginBottom: 'var(--space-1)', fontSize: 'var(--font-size-base)' }}>
        {title}
      </h4>
      <p style={{ color: 'var(--text-muted)', maxWidth: 420, fontSize: 'var(--font-size-sm)', marginBottom: actionLabel ? 'var(--space-4)' : 0 }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
