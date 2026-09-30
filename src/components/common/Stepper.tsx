import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: number | string;
  title: string;
  subtitle?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal'
}) => {
  if (orientation === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div 
              key={step.id} 
              onClick={() => onStepClick && isCompleted && onStepClick(idx)}
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 'var(--space-3)',
                cursor: isCompleted && onStepClick ? 'pointer' : 'default',
                opacity: idx > currentStep ? 0.6 : 1
              }}
            >
              <div 
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  backgroundColor: isCompleted ? 'var(--color-success)' : isCurrent ? 'var(--color-primary-800)' : 'var(--color-slate-200)',
                  color: isCompleted || isCurrent ? '#ffffff' : 'var(--text-muted)',
                  flexShrink: 0
                }}
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : idx + 1}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                  fontSize: 'var(--font-size-sm)', 
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? 'var(--color-primary-800)' : 'var(--text-secondary)'
                }}>
                  {step.title}
                </span>
                {step.subtitle && (
                  <span style={{ fontSize: 'var(--font-size-2xs)', color: 'var(--text-muted)' }}>
                    {step.subtitle}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      width: '100%', 
      position: 'relative',
      padding: 'var(--space-3) 0',
      overflowX: 'auto'
    }}>
      {/* Background connector line */}
      <div 
        style={{
          position: 'absolute',
          top: '28px',
          left: '30px',
          right: '30px',
          height: '2px',
          backgroundColor: 'var(--color-slate-200)',
          zIndex: 1
        }}
      />
      {/* Active progress bar */}
      <div 
        style={{
          position: 'absolute',
          top: '28px',
          left: '30px',
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
          maxWidth: 'calc(100% - 60px)',
          height: '2px',
          backgroundColor: 'var(--color-primary-700)',
          zIndex: 2,
          transition: 'width 0.3s ease'
        }}
      />

      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <div 
            key={step.id} 
            onClick={() => onStepClick && isCompleted && onStepClick(idx)}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              position: 'relative', 
              zIndex: 3,
              cursor: isCompleted && onStepClick ? 'pointer' : 'default',
              minWidth: '70px'
            }}
          >
            <div 
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8125rem',
                backgroundColor: isCompleted ? 'var(--color-success)' : isCurrent ? 'var(--color-primary-800)' : 'var(--bg-surface)',
                border: isCurrent ? '2px solid var(--color-primary-800)' : isCompleted ? '2px solid var(--color-success)' : '2px solid var(--color-slate-300)',
                color: isCompleted || isCurrent ? '#ffffff' : 'var(--text-muted)',
                boxShadow: isCurrent ? '0 0 0 4px rgba(19, 62, 112, 0.15)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {isCompleted ? <Check size={16} strokeWidth={3} /> : idx + 1}
            </div>
            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent ? 'var(--color-primary-800)' : isCompleted ? 'var(--text-main)' : 'var(--text-muted)',
                whiteSpace: 'nowrap'
              }}>
                {step.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
