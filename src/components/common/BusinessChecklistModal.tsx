import React, { useState } from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../../context/LanguageContext';
import { BUSINESS_CHECKLISTS, BusinessCategoryChecklist, ChecklistItem } from '../../data/businessChecklists';
import { 
  Factory, 
  Utensils, 
  Building, 
  Laptop, 
  HeartPulse, 
  Sprout, 
  Hotel,
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Clock, 
  Scale, 
  Search, 
  ShieldCheck, 
  Layers, 
  Info,
  Check
} from 'lucide-react';

interface BusinessChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategoryId?: string;
}

export const BusinessChecklistModal: React.FC<BusinessChecklistModalProps> = ({
  isOpen,
  onClose,
  initialCategoryId = 'manufacturing'
}) => {
  const { t, language } = useLanguage();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'ALL' | 'CERTIFICATE' | 'DOCUMENT'>('ALL');

  if (!isOpen) return null;

  const currentCategory: BusinessCategoryChecklist = 
    BUSINESS_CHECKLISTS.find(c => c.id === selectedCategoryId) || BUSINESS_CHECKLISTS[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Factory': return <Factory size={18} />;
      case 'Utensils': return <Utensils size={18} />;
      case 'Building': return <Building size={18} />;
      case 'Laptop': return <Laptop size={18} />;
      case 'HeartPulse': return <HeartPulse size={18} />;
      case 'Sprout': return <Sprout size={18} />;
      case 'Hotel': return <Hotel size={18} />;
      default: return <Layers size={18} />;
    }
  };

  const getCategoryTitle = (cat: BusinessCategoryChecklist) => {
    if (language === 'hi' && cat.titleHi) return cat.titleHi;
    if (language === 'mr' && cat.titleMr) return cat.titleMr;
    return cat.title;
  };

  const getCategoryDesc = (cat: BusinessCategoryChecklist) => {
    if (language === 'hi' && cat.descriptionHi) return cat.descriptionHi;
    if (language === 'mr' && cat.descriptionMr) return cat.descriptionMr;
    return cat.description;
  };

  const getItemName = (item: ChecklistItem) => {
    if (language === 'hi' && item.nameHi) return item.nameHi;
    if (language === 'mr' && item.nameMr) return item.nameMr;
    return item.name;
  };

  const getItemAuthority = (item: ChecklistItem) => {
    if (language === 'hi' && item.authorityHi) return item.authorityHi;
    if (language === 'mr' && item.authorityMr) return item.authorityMr;
    return item.authority;
  };

  const getItemDesc = (item: ChecklistItem) => {
    if (language === 'hi' && item.descriptionHi) return item.descriptionHi;
    if (language === 'mr' && item.descriptionMr) return item.descriptionMr;
    return item.description;
  };

  // Filter items based on searchQuery & filterType
  const filteredItems = currentCategory.items.filter(item => {
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameStr = (item.name + ' ' + item.nameHi + ' ' + item.nameMr).toLowerCase();
    const authStr = (item.authority + ' ' + item.authorityHi + ' ' + item.authorityMr).toLowerCase();
    const actStr = item.legalAct.toLowerCase();
    return nameStr.includes(q) || authStr.includes(q) || actStr.includes(q);
  });

  const mandatoryCount = currentCategory.items.filter(i => i.mandatory).length;
  const conditionalCount = currentCategory.items.filter(i => !i.mandatory).length;
  const maxSla = Math.max(...currentCategory.items.map(i => i.slaDays));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-primary-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary-700)',
            flexShrink: 0
          }}>
            <FileText size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              {t.checklist.title}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-primary-700)', fontWeight: 600 }}>
              {t.checklist.subtitle}
            </div>
          </div>
        </div>
      }
      size="xl"
      footer={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Info size={14} color="var(--color-primary-600)" />
            <span>{t.checklist.allCategories}</span>
          </div>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={onClose}
            style={{ minWidth: 120 }}
          >
            {t.checklist.closeModal}
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Business Type Select Option Dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          backgroundColor: 'var(--color-primary-50)',
          border: '1px solid var(--color-primary-200)',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <label htmlFor="business-type-select-dropdown" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-900)', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
            <Building size={16} color="var(--color-primary-700)" />
            <span>{t.checklist.selectCategory}:</span>
          </label>

          <select
            id="business-type-select-dropdown"
            className="form-select"
            value={selectedCategoryId}
            onChange={e => {
              setSelectedCategoryId(e.target.value);
              setSearchQuery('');
            }}
            style={{ minWidth: 280, maxWidth: 420, fontWeight: 700, borderColor: 'var(--color-primary-300)', backgroundColor: '#FFFFFF' }}
          >
            {BUSINESS_CHECKLISTS.map(cat => (
              <option key={cat.id} value={cat.id}>
                {getCategoryTitle(cat)} ({cat.items.length} {t.checklist.statutoryCertificates})
              </option>
            ))}
          </select>
        </div>

        {/* Category Tabs - 7 Business Types */}
        <div style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 6,
          borderBottom: '1px solid var(--border-subtle)',
          WebkitOverflowScrolling: 'touch'
        }}>
          {BUSINESS_CHECKLISTS.map(cat => {
            const isSelected = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setSearchQuery('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.8125rem',
                  fontWeight: isSelected ? 700 : 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: isSelected ? '1.5px solid var(--color-primary-600)' : '1px solid var(--border-subtle)',
                  backgroundColor: isSelected ? 'var(--color-primary-50)' : 'var(--bg-surface)',
                  color: isSelected ? 'var(--color-primary-800)' : 'var(--text-body)',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 1px 3px rgba(29, 78, 137, 0.12)' : 'none'
                }}
              >
                <span style={{ color: isSelected ? 'var(--color-primary-700)' : 'var(--text-muted)' }}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span>{getCategoryTitle(cat)}</span>
                <span style={{
                  fontSize: '0.6875rem',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: isSelected ? 'var(--color-primary-200)' : 'var(--bg-subtle)',
                  color: isSelected ? 'var(--color-primary-900)' : 'var(--text-muted)',
                  fontWeight: 700
                }}>
                  {cat.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Summary Banner */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4) var(--space-5)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                {getCategoryTitle(currentCategory)}
              </h3>
              <span style={{
                fontSize: '0.71875rem',
                fontWeight: 600,
                color: 'var(--color-primary-800)',
                backgroundColor: 'var(--color-primary-100)',
                padding: '2px 8px',
                borderRadius: 4
              }}>
                {currentCategory.badge}
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
              {getCategoryDesc(currentCategory)}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '4px 10px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#065F46' }}>
                {mandatoryCount}
              </div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#047857' }}>
                {t.checklist.mandatoryCount}
              </div>
            </div>

            <div style={{
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              padding: '4px 10px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E40AF' }}>
                {conditionalCount}
              </div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#1D4ED8' }}>
                {t.checklist.conditionalCount}
              </div>
            </div>

            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              padding: '4px 10px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#92400E' }}>
                {maxSla} {t.checklist.days}
              </div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#B45309' }}>
                {language === 'hi' ? 'अधिकतम समयसीमा' : language === 'mr' ? 'कमाल कालमर्यादा' : 'Max SLA'}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.checklist.searchPlaceholder}
              style={{ paddingLeft: 34, height: 38, fontSize: '0.8125rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 4 }}>
            <button
              type="button"
              className={`btn btn-sm ${filterType === 'ALL' ? 'btn-secondary active' : 'btn-ghost'}`}
              onClick={() => setFilterType('ALL')}
              style={{
                fontSize: '0.75rem',
                backgroundColor: filterType === 'ALL' ? 'var(--color-primary-100)' : 'transparent',
                color: filterType === 'ALL' ? 'var(--color-primary-800)' : 'var(--text-muted)'
              }}
            >
              {t.common.filter}: {language === 'hi' ? 'सभी' : language === 'mr' ? 'सर्व' : 'All'} ({currentCategory.items.length})
            </button>
            <button
              type="button"
              className={`btn btn-sm ${filterType === 'CERTIFICATE' ? 'btn-secondary active' : 'btn-ghost'}`}
              onClick={() => setFilterType('CERTIFICATE')}
              style={{
                fontSize: '0.75rem',
                backgroundColor: filterType === 'CERTIFICATE' ? 'var(--color-primary-100)' : 'transparent',
                color: filterType === 'CERTIFICATE' ? 'var(--color-primary-800)' : 'var(--text-muted)'
              }}
            >
              {t.checklist.statutoryCertificates} ({currentCategory.items.filter(i => i.type === 'CERTIFICATE').length})
            </button>
            <button
              type="button"
              className={`btn btn-sm ${filterType === 'DOCUMENT' ? 'btn-secondary active' : 'btn-ghost'}`}
              onClick={() => setFilterType('DOCUMENT')}
              style={{
                fontSize: '0.75rem',
                backgroundColor: filterType === 'DOCUMENT' ? 'var(--color-primary-100)' : 'transparent',
                color: filterType === 'DOCUMENT' ? 'var(--color-primary-800)' : 'var(--text-muted)'
              }}
            >
              {t.checklist.supportingDocuments} ({currentCategory.items.filter(i => i.type === 'DOCUMENT').length})
            </button>
          </div>
        </div>

        {/* Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>
              {language === 'hi' ? 'आपकी खोज से मेल खाता कोई प्रमाणपत्र नहीं मिला।' : language === 'mr' ? 'तुमच्या शोधाशी जुळणारे कोणतेही प्रमाणपत्र आढळले नाही.' : 'No certificates match your search query.'}
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: item.mandatory ? '1px solid #CBD5E1' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: 4,
                        backgroundColor: item.type === 'CERTIFICATE' ? '#EFF6FF' : '#F1F5F9',
                        color: item.type === 'CERTIFICATE' ? '#1E40AF' : '#475569',
                        border: item.type === 'CERTIFICATE' ? '1px solid #BFDBFE' : '1px solid #E2E8F0'
                      }}>
                        {item.type === 'CERTIFICATE' 
                          ? (language === 'hi' ? 'प्रमाणपत्र' : language === 'mr' ? 'प्रमाणपत्र' : 'CERTIFICATE')
                          : (language === 'hi' ? 'दस्तावेज़' : language === 'mr' ? 'कागदपत्र' : 'DOCUMENT')}
                      </span>

                      <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {getItemName(item)}
                      </span>

                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: 4,
                        backgroundColor: item.mandatory ? '#ECFDF5' : '#FFFBEB',
                        color: item.mandatory ? '#065F46' : '#92400E',
                        border: item.mandatory ? '1px solid #A7F3D0' : '1px solid #FDE68A'
                      }}>
                        {item.mandatory ? t.checklist.mandatory : t.checklist.optional}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-body)', margin: '6px 0 0', lineHeight: 1.4 }}>
                      {getItemDesc(item)}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 4,
                    flexShrink: 0
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-primary-800)',
                      backgroundColor: 'var(--color-primary-50)',
                      border: '1px solid var(--color-primary-200)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <Clock size={12} />
                      <span>SLA: {item.slaDays} {t.checklist.days}</span>
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12,
                  paddingTop: 8,
                  borderTop: '1px dashed var(--border-subtle)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShieldCheck size={14} color="var(--color-primary-600)" />
                    <span style={{ fontWeight: 600, color: 'var(--text-body)' }}>{t.checklist.issuingAuthority}:</span>
                    <span>{getItemAuthority(item)}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Scale size={14} color="var(--color-primary-600)" />
                    <span style={{ fontWeight: 600, color: 'var(--text-body)' }}>{t.checklist.legalAct}:</span>
                    <span style={{ fontStyle: 'italic' }}>{item.legalAct}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
