import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className={`modal-container ${size === 'lg' ? 'modal-lg' : size === 'xl' ? 'modal-xl' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 className="card-title" style={{ fontSize: 'var(--font-size-lg)' }}>{title}</h3>
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          <button 
            type="button" 
            className="btn btn-ghost btn-icon-only" 
            onClick={onClose}
            aria-label="Close dialog"
            style={{ borderRadius: '50%', padding: '6px' }}
          >
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
