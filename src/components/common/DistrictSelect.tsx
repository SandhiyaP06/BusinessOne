import React, { useState, useEffect } from 'react';
import { ALL_DISTRICTS, INDIAN_STATES, DistrictOption, StateOption } from '../../data/districts';
import { useLanguage } from '../../context/LanguageContext';

interface DistrictSelectProps {
  value: string;
  selectedState?: string;
  onChange: (district: string, state: string) => void;
  className?: string;
  id?: string;
  required?: boolean;
}

export const DistrictSelect: React.FC<DistrictSelectProps> = ({
  value,
  selectedState = 'Maharashtra',
  onChange,
  className = 'form-select',
  id = 'district-select',
  required = false
}) => {
  const { language, t } = useLanguage();
  const [activeState, setActiveState] = useState<string>(selectedState || 'Maharashtra');

  useEffect(() => {
    if (selectedState) {
      setActiveState(selectedState);
    }
  }, [selectedState]);

  const getStateName = (st: StateOption) => {
    if (language === 'hi' && st.hi) return st.hi;
    if (language === 'mr' && st.mr) return st.mr;
    return st.en;
  };

  const getDistrictName = (item: DistrictOption) => {
    if (language === 'hi' && item.hi) return item.hi;
    if (language === 'mr' && item.mr) return item.mr;
    return item.en;
  };

  // Filter districts dynamically based on selected active state
  const availableDistricts = ALL_DISTRICTS.filter(d => d.state === activeState);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setActiveState(newState);
    // Find first district in new state or reset
    const firstDist = ALL_DISTRICTS.find(d => d.state === newState);
    onChange(firstDist ? firstDist.value : '', newState);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDist = e.target.value;
    onChange(newDist, activeState);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
      {/* 1. STATE SELECT DROPDOWN */}
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>
          {language === 'hi' ? 'राज्य चुनें' : language === 'mr' ? 'राज्य निवडा' : 'Select State'} <span className="required">*</span>
        </label>
        <select
          id={`${id}-state`}
          className={className}
          value={activeState}
          onChange={handleStateChange}
          required={required}
        >
          {INDIAN_STATES.map(st => (
            <option key={st.value} value={st.value}>
              {getStateName(st)}
            </option>
          ))}
        </select>
      </div>

      {/* 2. DYNAMIC DISTRICT SELECT DROPDOWN */}
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>
          {language === 'hi' ? 'ज़िला चुनें' : language === 'mr' ? 'जिल्हा निवडा' : 'Select District'} <span className="required">*</span>
        </label>
        <select
          id={id}
          className={className}
          value={value}
          onChange={handleDistrictChange}
          required={required}
        >
          <option value="">
            -- {language === 'hi' ? 'ज़िला चुनें' : language === 'mr' ? 'जिल्हा निवडा' : 'Select District'} --
          </option>
          {availableDistricts.map(item => (
            <option key={item.value} value={item.value}>
              {getDistrictName(item)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
