import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../i18n/translations';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'pills';
  className?: string;
  size?: 'sm' | 'md';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'dropdown', 
  className = '',
  size = 'md' 
}) => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const currentLangObj = availableLanguages.find(l => l.code === language) || availableLanguages[0];

  if (variant === 'pills') {
    return (
      <div 
        className={`language-pills-container ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          padding: '3px 4px',
          borderRadius: 'var(--radius-full, 9999px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <Globe size={14} style={{ marginLeft: 6, marginRight: 2, opacity: 0.8 }} />
        {availableLanguages.map((item) => {
          const isActive = item.code === language;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              style={{
                border: 'none',
                background: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? '#0B2545' : '#CBD5E1',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.75rem',
                padding: '3px 9px',
                borderRadius: 'var(--radius-full, 9999px)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title={`Switch to ${item.label}`}
            >
              {item.nativeLabel}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div 
      ref={dropdownRef} 
      className={`language-selector-dropdown-root ${className}`} 
      style={{ position: 'relative' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="navbar-icon-button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: size === 'sm' ? '4px 8px' : '5px 10px',
          borderRadius: 'var(--radius-md, 6px)',
          border: '1px solid var(--border-subtle, #E2E8F0)',
          backgroundColor: isOpen ? 'var(--color-primary-50, #EFF6FF)' : 'var(--bg-surface, #FFFFFF)',
          color: 'var(--color-primary-800, #0B2545)',
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        title={t.nav.language}
        aria-label={t.nav.language}
        aria-expanded={isOpen}
      >
        <Globe size={16} color="var(--color-primary-600, #1D4E89)" />
        <span>{currentLangObj.nativeLabel}</span>
        <ChevronDown 
          size={13} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'none', 
            transition: 'transform 0.2s ease',
            color: 'var(--text-muted, #64748B)'
          }} 
        />
      </button>

      {isOpen && (
        <div 
          className="navbar-dropdown-card"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            zIndex: 1050,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
            minWidth: 170,
            padding: '6px',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748B',
            padding: '4px 8px 6px',
            borderBottom: '1px solid #F1F5F9',
            marginBottom: 4
          }}>
            {t.nav.language} / Language
          </div>

          {availableLanguages.map((item) => {
            const isActive = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className="navbar-dropdown-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--color-primary-50, #EFF6FF)' : 'transparent',
                  color: isActive ? 'var(--color-primary-800, #0B2545)' : 'var(--text-main, #0F172A)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: isActive ? 700 : 600 }}>
                    {item.nativeLabel}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <Check size={15} color="var(--color-primary-600, #1D4E89)" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
