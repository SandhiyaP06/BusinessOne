import React from 'react';
import { 
  ApplicationStage, 
  DepartmentApprovalStatus, 
  DocumentValidationStatus, 
  InspectionStatus, 
  QueryStatus, 
  LicenceHealthStatus 
} from '../../types';

import { useLanguage } from '../../context/LanguageContext';

interface StatusBadgeProps {
  status: 
    | ApplicationStage 
    | DepartmentApprovalStatus 
    | DocumentValidationStatus 
    | InspectionStatus 
    | QueryStatus 
    | LicenceHealthStatus
    | string;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

const STATUS_TRANSLATIONS: Record<string, { hi: string; mr: string }> = {
  APPROVED: { hi: 'स्वीकृत', mr: 'मंजूर' },
  CLEARED: { hi: 'स्वीकृत', mr: 'मंजूर' },
  VERIFIED: { hi: 'सत्यापित', mr: 'सत्यप्रत' },
  PASSED: { hi: 'उत्तीर्ण', mr: 'उत्तीर्ण' },
  RESOLVED: { hi: 'हल किया गया', mr: 'निवारण' },
  HEALTHY: { hi: 'सक्रिय', mr: 'सक्रिय' },
  UNDER_REVIEW: { hi: 'समीक्षाधीन', mr: 'पुनरावलोकनाधीन' },
  SCRUTINY: { hi: 'जांच जारी', mr: 'तपासणी सुरू' },
  PARALLEL_DEPARTMENT_REVIEW: { hi: 'विभाग समीक्षा जारी', mr: 'विभाग पुनरावलोकन सुरू' },
  INSPECTION_SCHEDULED: { hi: 'निरीक्षण निर्धारित', mr: 'तपासणी नियोजित' },
  SCHEDULED: { hi: 'निर्धारित', mr: 'नियोजित' },
  ASSIGNED: { hi: 'आवंटित', mr: 'वाटप' },
  UNDER_VALIDATION: { hi: 'सत्यापन जारी', mr: 'पडताळणी सुरू' },
  EXPIRING_SOON: { hi: 'शीघ्र समाप्त', mr: 'लवकरच संपणार' },
  RENEWAL_IN_PROGRESS: { hi: 'नवीनीकरण जारी', mr: 'नूतनीकरण सुरू' },
  OPEN: { hi: 'लंबित', mr: 'प्रलंबित' },
  REJECTED: { hi: 'अस्वीकृत', mr: 'नाकारले' },
  QUERY_RAISED: { hi: 'प्रश्न लंबित', mr: 'प्रश्न प्रलंबित' },
  RE_INSPECTION_REQUIRED: { hi: 'पुनः निरीक्षण आवश्यक', mr: 'पुन्हा तपासणी आवश्यक' },
  EXPIRED: { hi: 'समयातीत', mr: 'कालबाह्य' },
  SUBMITTED: { hi: 'जमा किया गया', mr: 'सादर केले' },
  RESPONDED: { hi: 'उत्तर दिया गया', mr: 'उत्तर दिले' },
  RECOMMENDED: { hi: 'अनुशंसित', mr: 'शिफारस केलेले' },
  INSPECTION: { hi: 'स्थल निरीक्षण', mr: 'स्थळ तपासणी' },
  FINAL_APPROVAL: { hi: 'अंतिम मंजूरी', mr: 'अंतिम मंजुरी' },
  DRAFT: { hi: 'प्रारूप', mr: 'मसुदा' },
  REQUIRED: { hi: 'आवश्यक', mr: 'आवश्यक' },
  NOT_REQUIRED: { hi: 'आवश्यक नहीं', mr: 'आवश्यक नाही' },
  UPLOADED: { hi: 'अपलोड किया गया', mr: 'अपलोड केले' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showDot = true }) => {
  const { language } = useLanguage();

  const formatText = (val: string) => {
    if (language === 'hi' && STATUS_TRANSLATIONS[val]?.hi) return STATUS_TRANSLATIONS[val].hi;
    if (language === 'mr' && STATUS_TRANSLATIONS[val]?.mr) return STATUS_TRANSLATIONS[val].mr;
    return val
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  const getStatusConfig = (s: string) => {
    switch (s) {
      // Success states
      case 'APPROVED':
      case 'CLEARED':
      case 'VERIFIED':
      case 'PASSED':
      case 'RESOLVED':
      case 'HEALTHY':
        return { variant: 'badge-success', label: formatText(s) };

      // Warning / Active Processing
      case 'UNDER_REVIEW':
      case 'SCRUTINY':
      case 'PARALLEL_DEPARTMENT_REVIEW':
      case 'INSPECTION_SCHEDULED':
      case 'SCHEDULED':
      case 'ASSIGNED':
      case 'UNDER_VALIDATION':
      case 'EXPIRING_SOON':
      case 'RENEWAL_IN_PROGRESS':
      case 'OPEN':
        return { variant: 'badge-warning', label: formatText(s) };

      // Danger / Alert
      case 'REJECTED':
      case 'QUERY_RAISED':
      case 'RE_INSPECTION_REQUIRED':
      case 'EXPIRED':
        return { variant: 'badge-danger', label: formatText(s) };

      // Info / Progress
      case 'SUBMITTED':
      case 'RESPONDED':
      case 'RECOMMENDED':
      case 'INSPECTION':
      case 'FINAL_APPROVAL':
        return { variant: 'badge-info', label: formatText(s) };

      // Neutral / Required
      case 'DRAFT':
      case 'REQUIRED':
      case 'NOT_REQUIRED':
      case 'UPLOADED':
      default:
        return { variant: 'badge-neutral', label: formatText(s) };
    }
  };

  const { variant, label } = getStatusConfig(status);

  return (
    <span className={`badge ${variant} ${size === 'sm' ? 'btn-sm' : ''}`}>
      {showDot && <span className="badge-dot" />}
      {label}
    </span>
  );
};
