import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  isHoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  footer,
  className = '',
  bodyClassName = '',
  isHoverable = false
}) => {
  return (
    <div className={`card ${isHoverable ? 'card-hover' : ''} ${className}`}>
      {(title || subtitle || action) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
