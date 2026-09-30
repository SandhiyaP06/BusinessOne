import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  let brandTitle = 'BusinessOne';
  let brandSubtitle = 'One Platform for Every Business Approval';

  try {
    const { t } = useLanguage();
    if (t?.brand) {
      brandTitle = t.brand.title;
      brandSubtitle = t.brand.subtitle;
    }
  } catch {
    // Context fallback
  }
  const getIconDimensions = () => {
    switch (size) {
      case 'sm': return { width: 28, height: 28 };
      case 'lg': return { width: 44, height: 44 };
      case 'xl': return { width: 56, height: 56 };
      case 'md':
      default: return { width: 36, height: 36 };
    }
  };

  const { width, height } = getIconDimensions();

  const isLight = variant === 'light';

  return (
    <div className={`portal-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', userSelect: 'none' }}>
      {/* Vector Shield + Industry + Verified Approval Symbol */}
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Outer Government Security Shield */}
        <path 
          d="M24 3L6 10.5V23.8C6 34.6 13.8 44.5 24 47C34.2 44.5 42 34.6 42 23.8V10.5L24 3Z" 
          fill={isLight ? '#FFFFFF' : '#0B2545'} 
          stroke={isLight ? 'rgba(255,255,255,0.4)' : '#1D4E89'} 
          strokeWidth="2"
        />
        {/* Inner Shield Gradient Base */}
        <path 
          d="M24 7.5L10.5 13.2V23.8C10.5 32.2 16.5 39.8 24 42.2C31.5 39.8 37.5 32.2 37.5 23.8V13.2L24 7.5Z" 
          fill={isLight ? '#0B2545' : '#133E70'} 
        />
        
        {/* Industrial Cogs & Precision Factory Silhouettes */}
        <g stroke={isLight ? '#93C5FD' : '#E2E8F0'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Central Factory Structure */}
          <path d="M16 30V22L20 24.5V30" />
          <path d="M20 22L24 24.5V30" />
          <path d="M24 19L28 21.5V30" />
          {/* Foundation Grid Line */}
          <line x1="14" y1="30" x2="30" y2="30" />
        </g>
        
        {/* Verified Circular Stamp with Green Approval Check */}
        <circle cx="33" cy="33" r="7.5" fill="#059669" stroke={isLight ? '#FFFFFF' : '#0B2545'} strokeWidth="2"/>
        <path d="M29.5 33L32 35.5L36.5 30.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {variant !== 'icon' && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <div style={{ 
            fontSize: size === 'lg' ? '1.25rem' : size === 'xl' ? '1.5rem' : '1.05rem', 
            fontWeight: 800, 
            letterSpacing: '-0.02em',
            color: isLight ? '#FFFFFF' : '#0B2545',
            fontFamily: 'var(--font-family-sans)'
          }}>
            {brandTitle}
          </div>
          {variant !== 'compact' && (
            <div style={{ 
              fontSize: '0.6875rem', 
              fontWeight: 600, 
              letterSpacing: '0.06em', 
              textTransform: 'uppercase',
              color: isLight ? 'rgba(255, 255, 255, 0.75)' : '#64748B'
            }}>
              {brandSubtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
