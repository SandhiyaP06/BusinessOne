import React, { useState } from 'react';
import { Stepper, StepItem } from '../../components/common/Stepper';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useApplications } from '../../context/ApplicationContext';
import { ApplicationCategory, ApprovalRequirement } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  Layers, 
  MapPin, 
  Factory, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  AlertCircle,
  HelpCircle,
  FileCheck2,
  Trash2,
  Check,
  Eye,
  ShieldCheck,
  AlertTriangle,
  ClipboardList
} from 'lucide-react';
import { DistrictSelect } from '../../components/common/DistrictSelect';
import { MissingCertificateModal } from '../../components/common/MissingCertificateModal';
import { BusinessChecklistModal } from '../../components/common/BusinessChecklistModal';
import { useLanguage } from '../../context/LanguageContext';

interface NewApplicationWizardProps {
  onNavigate: (tab: string) => void;
}

interface UploadedFileEntry {
  docId: string;
  name: string;
  category: string;
  mandatory: boolean;
  file?: File;
  fileName?: string;
  fileSize?: string;
  progress: number;
  status: 'PENDING' | 'UPLOADING' | 'UPLOADED' | 'VERIFIED';
}

export const NewApplicationWizard: React.FC<NewApplicationWizardProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { addApplication } = useApplications();
  const [currentStep, setCurrentStep] = useState(0);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [isMissingCertModalOpen, setIsMissingCertModalOpen] = useState(false);
  const [showMissingCertBanner, setShowMissingCertBanner] = useState(false);
  const [missingCertName, setMissingCertName] = useState(
    'Fire Hydrant Loop & Evacuation Route Blueprint (DOC-6)'
  );
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
    // Form State across 8 Steps
  const [formData, setFormData] = useState({
    // Step 1: Business Info
    businessName: 'Vanguard Advanced Semi-conductors India Pvt Ltd',
    enterpriseType: 'LARGE' as const,
    panNumber: 'AAACV9012E',
    gstin: '29AAACV9012E1Z2',
    promoterName: 'Dr. Srinivas Raman',
    promoterEmail: 's.raman@vanguard-semi.in',
    promoterMobile: '+91 98450 77123',
    
    // Step 2: Project Info
    sector: 'Semiconductor Fabrication & OSAT Unit',
    projectDescription:
      'Establishment of state-of-the-art Gallium Nitride (GaN) power device packaging and cleanroom test facility.',
    investmentInLakhs: 7200.00,
    expectedEmployment: 350,
    projectTimelineMonths: 18,
    
    // Step 3: Location Details
    industrialArea: 'Hi-Tech Defence and Aerospace Park',
    plotNo: 'Plot 77-B & 78',
    address: 'Survey No. 120/2, Aerospace Park Road',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    pincode: '562149',
    landAreaAcres: 8.5,
    powerRequirementKVA: 2400,
    waterRequirementKLD: 150,

    // Step 4: Industry Details & Categorization
    category: 'ORANGE' as ApplicationCategory,
    boilerRequired: true,
    hazardousChemicals: true,
    effluentGenerationKLD: 45,
    stackHeightMeters: 30,

    // Step 8: Authorization
    applicantDeclaration: true,
    eSignAadhaarConsent: true
  });

  // Dynamic Rule-Engine Generated Approvals (Step 5)
  const getCalculatedApprovals = (): ApprovalRequirement[] => {
    const list: ApprovalRequirement[] = [
      {
        id: 'REQ-01',
        name: 'Consent to Establish (CTE) under Water & Air Act',
        department: 'State Pollution Control Board',
        mandatory: true,
        legalAct:
          'Water (Prevention and Control of Pollution) Act 1974 & Air Act 1981',
        reason:
          `Triggered because industry category is ${formData.category} and planned effluent generation is ${formData.effluentGenerationKLD} KLD with power load ${formData.powerRequirementKVA} KVA.`,
        requiredDocuments: [
          'Effluent Treatment Scheme Drawing',
          'Air Emission Stack Dispersion Model',
          'Solid Waste Agreement'
        ],
        status: 'PENDING'
      },
      {
        id: 'REQ-02',
        name: 'Factory Building Plan Approval & Initial Licence',
        department: 'Directorate of Factories & Boilers (DISH)',
        mandatory: true,
        legalAct: 'The Factories Act, 1948 - Section 6',
        reason:
          `Triggered for industrial manufacturing employing ${formData.expectedEmployment} persons (>20 workers with power machinery).`,
        requiredDocuments: [
          'Factory Machine Layout Plan',
          'Process Flowchart & Safety Analysis',
          'Structural Stability Certificate'
        ],
        status: 'PENDING'
      },
      {
        id: 'REQ-03',
        name: 'Pre-Construction Fire Safety Clearance (Fire NOC)',
        department: 'Fire and Emergency Safety Services',
        mandatory: true,
        legalAct: 'National Building Code (NBC 2016 Part 4)',
        reason:
          `Mandatory for industrial plot size ${formData.landAreaAcres} acres and high-density semiconductor test cleanrooms.`,
        requiredDocuments: [
          'Hydrant Layout Diagram',
          'Underground Static Reservoir Blueprint',
          'Evacuation Route Analysis'
        ],
        status: 'PENDING'
      }
    ];
        if (formData.boilerRequired) {
      list.push({
        id: 'REQ-04',
        name: 'Industrial Boiler Erection & Registration Clearance',
        department: 'Directorate of Steam Boilers',
        mandatory: true,
        legalAct: 'The Indian Boilers Act, 1923',
        reason:
          'Selected boiler requirement for high-temperature steam fabrication process.',
        requiredDocuments: [
          'Boiler Design Calculations',
          'IBR Pipe Drawing',
          'Welder Qualification Record'
        ],
        status: 'PENDING'
      });
    }

    if (formData.powerRequirementKVA > 1000) {
      list.push({
        id: 'REQ-05',
        name: 'HT Power Connectivity & Substation Clearance',
        department: 'State Electricity Transmission Corporation',
        mandatory: true,
        legalAct:
          'Central Electricity Authority (Safety & Supply) Regulations',
        reason:
          `High Tension requirement of ${formData.powerRequirementKVA} KVA exceeds standard LT grid allocation.`,
        requiredDocuments: [
          'Single Line Electrical Diagram',
          'Transformer Test Report',
          'Earthing Grid Layout'
        ],
        status: 'PENDING'
      });
    }

    return list;
  };

  const calculatedApprovals = getCalculatedApprovals();

  // Step 6: Documents List
  const [docUploads, setDocUploads] = useState<UploadedFileEntry[]>([
    {
      docId: 'DOC-1',
      name: 'Certificate of Incorporation / MoA / Partnership Deed',
      category: 'LEGAL',
      mandatory: true,
      fileName: 'Vanguard_COI_Certified.pdf',
      fileSize: '2.8 MB',
      progress: 100,
      status: 'UPLOADED'
    },
    {
      docId: 'DOC-2',
      name: 'Land Allotment Letter / Registered Possession Deed',
      category: 'LEGAL',
      mandatory: true,
      fileName: 'KIADB_Plot77B_Possession.pdf',
      fileSize: '4.5 MB',
      progress: 100,
      status: 'UPLOADED'
    },
    {
      docId: 'DOC-3',
      name: 'Detailed Project Report (DPR) with Process Flowchart',
      category: 'TECHNICAL',
      mandatory: true,
      fileName: 'Semiconductor_DPR_Final.pdf',
      fileSize: '9.1 MB',
      progress: 100,
      status: 'UPLOADED'
    },
    {
      docId: 'DOC-4',
      name: 'Effluent Treatment Plant (ETP/ZLD) Engineering Drawings',
      category: 'ENVIRONMENTAL',
      mandatory: true,
      fileName: 'ETP_ZLD_Blueprint.pdf',
      fileSize: '6.4 MB',
      progress: 100,
      status: 'UPLOADED'
    },
    {
      docId: 'DOC-5',
      name: 'Factory Layout & Machinery Safety Blueprint',
      category: 'TECHNICAL',
      mandatory: true,
      fileName: 'Factory_Layout_Machine_Plan.pdf',
      fileSize: '5.2 MB',
      progress: 100,
      status: 'UPLOADED'
    },
    {
      docId: 'DOC-6',
      name: 'Fire Hydrant Loop & Evacuation Route Blueprint',
      category: 'SAFETY',
      mandatory: true,
      progress: 0,
      status: 'PENDING'
    }
  ]);

  const steps: StepItem[] = [
    { id: 0, title: 'Business Info', subtitle: 'Entity & Promoters' },
    { id: 1, title: 'Project Info', subtitle: 'Investment & Jobs' },
    { id: 2, title: 'Location', subtitle: 'Land, Power & Water' },
    { id: 3, title: 'Classification', subtitle: 'Pollution Category' },
    { id: 4, title: 'Recommendations', subtitle: 'Mandatory Clearances' },
    { id: 5, title: 'Documents', subtitle: 'Upload & Validation' },
    { id: 6, title: 'Review Summary', subtitle: 'Composite Scrutiny' },
    { id: 7, title: 'Submit', subtitle: 'e-Sign & Docket ID' }
  ];

  const handleFileUpload = (docId: string, file: File) => {
    setDocUploads(prev => prev.map(d => {
      if (d.docId === docId) {
        return {
          ...d,
          file,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          progress: 100,
          status: 'UPLOADED'
        };
      }
      return d;
    }));
  };
   const handleRemoveFile = (docId: string) => {
    setDocUploads(prev => prev.map(d => {
      if (d.docId === docId) {
        return {
          ...d,
          file: undefined,
          fileName: undefined,
          fileSize: undefined,
          progress: 0,
          status: 'PENDING'
        };
      }
      return d;
    }));
  };

  const handleSimulateQuickUpload = () => {
    setDocUploads(prev => prev.map(d => {
      if (d.docId === 'DOC-6' || (d.mandatory && d.status === 'PENDING')) {
        return {
          ...d,
          fileName: 'Fire_Hydrant_Loop_Evacuation_Certified.pdf',
          fileSize: '3.8 MB',
          progress: 100,
          status: 'UPLOADED'
        };
      }
      return d;
    }));

    setShowMissingCertBanner(false);
    setIsMissingCertModalOpen(false);
  };

  const handleNext = () => {
    // If on Step 5 (Documents/Certificates), verify mandatory certificates are uploaded
    if (currentStep === 5) {
      const missingMandatory = docUploads.find(
        d => d.mandatory && d.status !== 'UPLOADED' && d.status !== 'VERIFIED'
      );

      if (missingMandatory) {
        setMissingCertName(missingMandatory.name);
        setShowMissingCertBanner(true);
        setIsMissingCertModalOpen(true);
        return;
      }
    }

    setShowMissingCertBanner(false);

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handleFinalSubmission = async () => {
    const newId = await addApplication({
      businessName: formData.businessName,
      enterpriseType: formData.enterpriseType,
      category: formData.category,
      sector: formData.sector,
      projectDescription: formData.projectDescription,
      investmentInLakhs: formData.investmentInLakhs,
      expectedEmployment: formData.expectedEmployment,

      proposedLocation: {
        address: formData.address,
        plotNo: formData.plotNo,
        industrialArea: formData.industrialArea,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        landAreaAcres: formData.landAreaAcres,
        powerRequirementKVA: formData.powerRequirementKVA,
        waterRequirementKLD: formData.waterRequirementKLD
      },

      contactPerson: {
        name: formData.promoterName,
        designation: 'Managing Director',
        mobile: formData.promoterMobile,
        email: formData.promoterEmail,
        panNumber: formData.panNumber,
        gstin: formData.gstin
      },

      applicableApprovals: calculatedApprovals
    });

    setSubmittedAppId(newId);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const completionPercentage = Math.round(
    ((currentStep + 1) / steps.length) * 100
  ); 
    return (
    <div
      style={{
        maxWidth: 1040,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)'
      }}
    >
      {/* Wizard Header Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5) var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--font-size-xl)',
              color: 'var(--text-heading)'
            }}
          >
            Single Window Composite Clearance Application
          </h1>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--font-size-xs)',
              marginTop: 2
            }}
          >
            Form-1A: Unified Statutory Filing under the Industrial Policy &
            Facilitation Act
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)'
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontWeight: 600
              }}
            >
              Wizard Progress
            </span>

            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: 'var(--color-primary-700)'
              }}
            >
              {completionPercentage}%
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            icon={<Save size={14} />}
          >
            {isDraftSaved ? 'Draft Saved ✓' : 'Save Draft'}
          </Button>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div
        className="card"
        style={{
          padding: 'var(--space-4) var(--space-6)'
        }}
      >
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={idx => setCurrentStep(idx)}
        />
      </div>

      {/* Main Wizard Form Body */}
      <div className="card">
        <div className="card-body">

          {/* STEP 1: Business Information */}
          {currentStep === 0 && (
            <div>
              <h3
                className="card-title"
                style={{ marginBottom: 'var(--space-4)' }}
              >
                <Building2
                  size={18}
                  color="var(--color-primary-700)"
                />{' '}
                Step 1: Enterprise Identity & Promoters
              </h3>

              <div className="form-group">
                <label className="form-label">
                  Legal Name of Industrial Enterprise{' '}
                  <span className="required">*</span>
                </label>

                <input
                  type="text"
                  className="form-input"
                  value={formData.businessName}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      businessName: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Enterprise Investment Scale{' '}
                    <span className="required">*</span>
                  </label>

                  <select
                    className="form-select"
                    value={formData.enterpriseType}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        enterpriseType: e.target.value as any
                      })
                    }
                  >
                    <option value="MICRO">
                      Micro Unit (Investment &lt; ₹1 Cr)
                    </option>
                    <option value="SMALL">
                      Small Enterprise (₹1 Cr - ₹10 Cr)
                    </option>
                    <option value="MEDIUM">
                      Medium Enterprise (₹10 Cr - ₹50 Cr)
                    </option>
                    <option value="LARGE">
                      Large Enterprise (₹50 Cr - ₹500 Cr)
                    </option>
                    <option value="MEGA_PROJECT">
                      Mega Industrial Project (&gt; ₹500 Cr)
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Entity PAN Number{' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-input"
                    value={formData.panNumber}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        panNumber: e.target.value.toUpperCase()
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">
                    Authorized Signatory Name{' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-input"
                    value={formData.promoterName}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        promoterName: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Official Email{' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="email"
                    className="form-input"
                    value={formData.promoterEmail}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        promoterEmail: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Official Mobile{' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="tel"
                    className="form-input"
                    value={formData.promoterMobile}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        promoterMobile: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Project Information */}
          {currentStep === 1 && (
            <div>
              <h3
                className="card-title"
                style={{ marginBottom: 'var(--space-4)' }}
              >
                <Layers
                  size={18}
                  color="var(--color-primary-700)"
                />{' '}
                Step 2: Project Details & Investment Scale
              </h3>

              <div className="form-group">
                <label className="form-label">
                  Industrial Sector / Activity{' '}
                  <span className="required">*</span>
                </label>

                <select
                  className="form-select"
                  value={formData.sector}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      sector: e.target.value
                    })
                  }
                >
                  <option value="Manufacturing Industry">
                    {language === 'hi' ? 'विनिर्माण उद्योग (मैन्युफैक्चरिंग)' : language === 'mr' ? 'उत्पादन उद्योग (मॅन्युफॅक्चरिंग)' : 'Manufacturing Industry'}
                  </option>
                  <option value="Food Business & Agro-Processing">
                    {language === 'hi' ? 'खाद्य व्यवसाय एवं खाद्य प्रसंस्करण (FSSAI)' : language === 'mr' ? 'अन्न प्रक्रिया व खाद्य व्यवसाय (FSSAI)' : 'Food Business & Agro-Processing'}
                  </option>
                  <option value="Construction & Real Estate Development">
                    {language === 'hi' ? 'निर्माण एवं रियल एस्टेट विकास' : language === 'mr' ? 'बांधकाम व रिअल इस्टेट विकास' : 'Construction & Real Estate Development'}
                  </option>
                  <option value="Information Technology & Software (IT/ITES)">
                    {language === 'hi' ? 'सूचना प्रौद्योगिकी एवं सॉफ्टवेयर (IT / ITES)' : language === 'mr' ? 'माहिती तंत्रज्ञान व सॉफ्टवेअर सेवा (IT / ITES)' : 'Information Technology & Software (IT/ITES)'}
                  </option>
                  <option value="Healthcare & Pharmaceuticals">
                    {language === 'hi' ? 'स्वास्थ्य सेवा एवं फार्मास्यूटिकल्स' : language === 'mr' ? 'आरोग्य सेवा व औषध निर्माण (हेल्थकेअर)' : 'Healthcare & Pharmaceuticals'}
                  </option>
                  <option value="Agriculture & Agri-Business">
                    {language === 'hi' ? 'कृषि एवं कृषि व्यवसाय (एग्री-बिजनेस)' : language === 'mr' ? 'कृषी व कृषी प्रक्रिया व्यवसाय' : 'Agriculture & Agri-Business'}
                  </option>
                  <option value="Hotel, Resort & Hospitality">
                    {language === 'hi' ? 'होटल, रिसॉर्ट एवं आतिथ्य सत्कार' : language === 'mr' ? 'हॉटेल, रिसॉर्ट व आदरातिथ्य व्यवसाय' : 'Hotel, Resort & Hospitality'}
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Project Scope & Manufacturing Description{' '}
                  <span className="required">*</span>
                </label>

                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.projectDescription}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      projectDescription: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">
                    Total Proposed Capital Investment (₹ Lakhs){' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="number"
                    className="form-input"
                    value={formData.investmentInLakhs}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        investmentInLakhs:
                          parseFloat(e.target.value) || 0
                      })
                    }
                  />

                  <span className="form-helper">
                    Equivalent to ₹
                    {(formData.investmentInLakhs / 100).toFixed(2)} Crores
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Expected Direct Employment (Persons){' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="number"
                    className="form-input"
                    value={formData.expectedEmployment}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        expectedEmployment:
                          parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Implementation Horizon (Months)
                  </label>

                  <input
                    type="number"
                    className="form-input"
                    value={formData.projectTimelineMonths}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        projectTimelineMonths:
                          parseInt(e.target.value) || 12
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
                    {/* STEP 3: Location Details */}
          {currentStep === 2 && (
            <div>
              <h3
                className="card-title"
                style={{ marginBottom: 'var(--space-4)' }}
              >
                <MapPin
                  size={18}
                  color="var(--color-primary-700)"
                />{' '}
                Step 3: Location, Utilities & Infrastructure
              </h3>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Industrial Area / SEZ / Growth Center{' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-input"
                    value={formData.industrialArea}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        industrialArea: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Plot No. / Survey No.{' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-input"
                    value={formData.plotNo}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        plotNo: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Site Address <span className="required">*</span>
                </label>

                <input
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      address: e.target.value
                    })
                  }
                />
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <DistrictSelect
                  value={formData.district}
                  selectedState={formData.state}
                  onChange={(district, state) =>
                    setFormData({
                      ...formData,
                      district,
                      state: state || formData.state
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  PIN Code <span className="required">*</span>
                </label>

                <input
                  type="text"
                  className="form-input"
                  value={formData.pincode}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      pincode: e.target.value
                    })
                  }
                />
              </div>

              <div
                className="form-grid-3"
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: 'var(--space-4)'
                }}
              >
                <div className="form-group">
                  <label className="form-label">
                    Total Land Area (Acres){' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    value={formData.landAreaAcres}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        landAreaAcres:
                          parseFloat(e.target.value) || 0
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Connected Power Demand (KVA){' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="number"
                    className="form-input"
                    value={formData.powerRequirementKVA}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        powerRequirementKVA:
                          parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Industrial Water Demand (KLD){' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="number"
                    className="form-input"
                    value={formData.waterRequirementKLD}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        waterRequirementKLD:
                          parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Industry Details & Categorization */}
          {currentStep === 3 && (
            <div>
              <h3
                className="card-title"
                style={{ marginBottom: 'var(--space-4)' }}
              >
                <Factory
                  size={18}
                  color="var(--color-primary-700)"
                />{' '}
                Step 4: CPCB Pollution Categorization & Hazards
              </h3>

              <div className="form-group">
                <label className="form-label">
                  Central Pollution Control Board (CPCB) Category{' '}
                  <span className="required">*</span>
                </label>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--space-3)',
                    marginTop: 6
                  }}
                >
                  {[
                    {
                      cat: 'RED',
                      label: 'Red Category',
                      desc: 'Heavy pollution index (Score 60+)'
                    },
                    {
                      cat: 'ORANGE',
                      label: 'Orange Category',
                      desc: 'Medium pollution index (Score 41-59)'
                    },
                    {
                      cat: 'GREEN',
                      label: 'Green Category',
                      desc: 'Low pollution index (Score 21-40)'
                    },
                    {
                      cat: 'WHITE',
                      label: 'White Category',
                      desc: 'Non-polluting (Score up to 20)'
                    }
                  ].map(c => {
                    const isSelected = formData.category === c.cat;

                    return (
                      <div
                        key={c.cat}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            category:
                              c.cat as ApplicationCategory
                          })
                        }
                        style={{
                          border: isSelected
                            ? '2px solid var(--color-primary-700)'
                            : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected
                            ? 'var(--color-primary-50)'
                            : 'var(--bg-surface)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-3)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: '0.875rem',
                              color: 'var(--text-heading)'
                            }}
                          >
                            {c.label}
                          </span>

                          {isSelected && (
                            <Check
                              size={16}
                              color="var(--color-primary-700)"
                            />
                          )}
                        </div>

                        <p
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            marginTop: 4
                          }}
                        >
                          {c.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="form-grid-2"
                style={{ marginTop: 'var(--space-6)' }}
              >
                <div className="form-group">
                  <label className="form-label">
                    Effluent / Waste Water Generation (KLD){' '}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="number"
                    className="form-input"
                    value={formData.effluentGenerationKLD}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        effluentGenerationKLD:
                          parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Proposed Chimney / Stack Height (Meters)
                  </label>

                  <input
                    type="number"
                    className="form-input"
                    value={formData.stackHeightMeters}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        stackHeightMeters:
                          parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>
              </div>
                            <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  marginTop: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <input
                    type="checkbox"
                    id="boilerCheck"
                    checked={formData.boilerRequired}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        boilerRequired: e.target.checked
                      })
                    }
                    style={{ cursor: 'pointer' }}
                  />

                  <label
                    htmlFor="boilerCheck"
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-heading)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Unit utilizes steam boilers or thermic fluid heaters
                    (&gt; 100 kg/hr steam capacity)
                  </label>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <input
                    type="checkbox"
                    id="chemCheck"
                    checked={formData.hazardousChemicals}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        hazardousChemicals: e.target.checked
                      })
                    }
                    style={{ cursor: 'pointer' }}
                  />

                  <label
                    htmlFor="chemCheck"
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-heading)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Unit stores or handles classified hazardous chemicals
                    under MSIHC Rules 1989
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Smart Approval Recommendation */}
          {currentStep === 4 && (
            <div>
              <div
                style={{
                  backgroundColor: 'var(--color-primary-50)',
                  border: '1px solid var(--color-primary-100)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-800)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Sparkles size={20} />
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 700,
                      color: 'var(--color-primary-900)'
                    }}
                  >
                    Statutory Rule Engine: Automated Clearance Determination
                  </h4>

                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-primary-700)',
                      marginTop: 2
                    }}
                  >
                    Based on your input ({formData.category} category,{' '}
                    {formData.investmentInLakhs} Lakhs investment,{' '}
                    {formData.powerRequirementKVA} KVA power), the portal has
                    mapped <strong>{calculatedApprovals.length} mandatory clearances</strong>.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)'
                }}
              >
                {calculatedApprovals.map((appr, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-4)',
                      backgroundColor: 'var(--bg-surface)',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 6
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: 700,
                            color: 'var(--color-primary-600)'
                          }}
                        >
                          {appr.department}
                        </span>

                        <h4
                          style={{
                            fontSize: '0.9375rem',
                            fontWeight: 700,
                            color: 'var(--text-heading)',
                            marginTop: 2
                          }}
                        >
                          {appr.name}
                        </h4>
                      </div>

                      <span className="badge badge-warning">
                        Mandatory Filing
                      </span>
                    </div>

                    <div
                      style={{
                        backgroundColor: 'var(--bg-subtle)',
                        padding: 'var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        margin: 'var(--space-2) 0'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--text-heading)',
                          marginBottom: 2
                        }}
                      >
                        Why this approval is legally required:
                      </div>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4
                        }}
                      >
                        {appr.reason}
                      </div>

                      <div
                        style={{
                          fontSize: '0.6875rem',
                          color: 'var(--text-muted)',
                          marginTop: 4,
                          fontStyle: 'italic'
                        }}
                      >
                        Governing Statute: {appr.legalAct}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        flexWrap: 'wrap'
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          color: 'var(--text-heading)'
                        }}
                      >
                        Required Enclosures:
                      </span>

                      {appr.requiredDocuments.map((doc, dIdx) => (
                        <span
                          key={dIdx}
                          style={{
                            backgroundColor: 'var(--color-slate-100)',
                            padding: '2px 8px',
                            borderRadius: 4,
                            border: '1px solid var(--border-subtle)'
                          }}
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Required Documents Upload */}
          {currentStep === 5 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-2)',
                  flexWrap: 'wrap',
                  gap: 8
                }}
              >
                <h3 className="card-title" style={{ margin: 0 }}>
                  <UploadCloud
                    size={18}
                    color="var(--color-primary-700)"
                  />{' '}
                  Step 6: Mandatory Enclosures & Document Vault
                </h3>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsChecklistModalOpen(true)}
                  style={{
                    fontSize: '0.75rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <ClipboardList
                    size={14}
                    color="var(--color-primary-600)"
                  />
                  <span>{t.checklist.navButton}</span>
                </button>
              </div>

              <p
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                Upload verified PDFs (Max 25 MB per file). All uploaded
                documents undergo optical structure checking.
              </p>

              {/* Exact user-mandated certificate blocker message banner */}
              {showMissingCertBanner && (
                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    border: '1.5px solid #F87171',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                    marginBottom: 'var(--space-4)',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start'
                  }}
                >
                  <AlertTriangle
                    size={24}
                    color="#DC2626"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        color: '#991B1B',
                        lineHeight: 1.5
                      }}
                    >
                      You have not uploaded the required certificate yet.
                      Please upload the certificate to proceed. Without the
                      certificate, you cannot continue with this process.
                    </div>

                    {language !== 'en' && (
                      <div
                        style={{
                          fontSize: '0.8125rem',
                          color: '#B91C1C',
                          marginTop: 4,
                          fontWeight: 500
                        }}
                      >
                        {t.certificateAlert.message}
                      </div>
                    )}

                    <div
                      style={{
                        marginTop: 10,
                        display: 'flex',
                        gap: 8,
                        flexWrap: 'wrap'
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{
                          backgroundColor: '#DC2626',
                          color: '#fff',
                          borderColor: '#DC2626',
                          fontSize: '0.75rem'
                        }}
                        onClick={handleSimulateQuickUpload}
                      >
                        <UploadCloud size={14} />
                        <span>
                          {t.certificateAlert.simulateUpload} ({missingCertName})
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
                            <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)'
                }}
              >
                {docUploads.map(doc => (
                  <div
                    key={doc.docId}
                    style={{
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-3) var(--space-4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor:
                        doc.status === 'UPLOADED'
                          ? 'var(--bg-surface)'
                          : 'var(--bg-subtle)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        flex: 1,
                        minWidth: 0
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 'var(--radius-md)',
                          backgroundColor:
                            doc.status === 'UPLOADED'
                              ? 'var(--color-success-bg)'
                              : 'var(--color-slate-200)',
                          color:
                            doc.status === 'UPLOADED'
                              ? 'var(--color-success)'
                              : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {doc.status === 'UPLOADED' ? (
                          <FileCheck2 size={18} />
                        ) : (
                          <FileText size={18} />
                        )}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            color: 'var(--text-heading)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <span>{doc.name}</span>

                          {doc.mandatory && (
                            <span
                              style={{
                                color: 'var(--color-danger)',
                                fontSize: '0.75rem'
                              }}
                            >
                              *
                            </span>
                          )}
                        </div>

                        {doc.fileName ? (
                          <div
                            style={{
                              fontSize: '0.6875rem',
                              color: 'var(--text-muted)',
                              marginTop: 2
                            }}
                          >
                            {doc.fileName} • {doc.fileSize}
                          </div>
                        ) : (
                          <div
                            style={{
                              fontSize: '0.6875rem',
                              color: 'var(--color-warning-text)',
                              marginTop: 2
                            }}
                          >
                            Pending upload
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                      }}
                    >
                      {doc.status === 'UPLOADED' ? (
                        <>
                          <span
                            className="badge badge-success"
                            style={{ fontSize: '0.6875rem' }}
                          >
                            <Check size={12} /> Ready
                          </span>

                          <button
                            type="button"
                            className="btn btn-ghost btn-icon-only"
                            onClick={() => handleRemoveFile(doc.docId)}
                            title="Remove file"
                            style={{
                              color: 'var(--color-danger)'
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </>
                      ) : (
                        <label
                          className="btn btn-outline btn-sm"
                          style={{
                            cursor: 'pointer',
                            margin: 0
                          }}
                        >
                          <UploadCloud size={14} /> Browse & Upload

                          <input
                            type="file"
                            accept=".pdf,.dwg,.zip"
                            style={{ display: 'none' }}
                            onChange={e => {
                              if (
                                e.target.files &&
                                e.target.files[0]
                              ) {
                                handleFileUpload(
                                  doc.docId,
                                  e.target.files[0]
                                );
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Application Review & Summary */}
          {currentStep === 6 && (
            <div>
              <h3
                className="card-title"
                style={{ marginBottom: 'var(--space-4)' }}
              >
                <FileCheck2
                  size={18}
                  color="var(--color-primary-700)"
                />{' '}
                Step 7: Consolidated Application Scrutiny
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)'
                }}
              >
                {/* Section 1: Business Details */}
                <div
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-primary-800)',
                      marginBottom: 8
                    }}
                  >
                    1. Enterprise & Contact Coordinates
                  </h4>

                  <div
                    className="form-grid-2"
                    style={{ fontSize: '0.8125rem' }}
                  >
                    <div>
                      <strong>Enterprise:</strong>{' '}
                      {formData.businessName}
                    </div>

                    <div>
                      <strong>Scale:</strong>{' '}
                      {formData.enterpriseType}
                    </div>

                    <div>
                      <strong>PAN / GSTIN:</strong>{' '}
                      {formData.panNumber} / {formData.gstin}
                    </div>

                    <div>
                      <strong>Promoter:</strong>{' '}
                      {formData.promoterName} (
                      {formData.promoterMobile})
                    </div>
                  </div>
                </div>

                {/* Section 2: Project & Investment */}
                <div
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-primary-800)',
                      marginBottom: 8
                    }}
                  >
                    2. Project Scope, Investment & Utilities
                  </h4>

                  <div
                    className="form-grid-2"
                    style={{ fontSize: '0.8125rem' }}
                  >
                    <div>
                      <strong>Sector:</strong>{' '}
                      {formData.sector}
                    </div>

                    <div>
                      <strong>Proposed Investment:</strong> ₹
                      {(formData.investmentInLakhs / 100).toFixed(
                        2
                      )}{' '}
                      Crores
                    </div>

                    <div>
                      <strong>Employment:</strong>{' '}
                      {formData.expectedEmployment} Staff
                    </div>

                    <div>
                      <strong>Land & Location:</strong>{' '}
                      {formData.landAreaAcres} Acres,{' '}
                      {formData.industrialArea},{' '}
                      {formData.district}
                    </div>

                    <div>
                      <strong>Power Load:</strong>{' '}
                      {formData.powerRequirementKVA} KVA
                    </div>

                    <div>
                      <strong>Water Consumption:</strong>{' '}
                      {formData.waterRequirementKLD} KLD
                    </div>
                  </div>
                </div>

                {/* Section 3: Mapped Clearances */}
                <div
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-primary-800)',
                      marginBottom: 8
                    }}
                  >
                    3. Statutory Clearances to be Concurrently Routed (
                    {calculatedApprovals.length})
                  </h4>

                  <ul
                    style={{
                      paddingLeft: 20,
                      fontSize: '0.8125rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4
                    }}
                  >
                    {calculatedApprovals.map((a, idx) => (
                      <li key={idx}>
                        <strong>{a.name}</strong> — {a.department}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Submit with Digital Signature */}
          {currentStep === 7 && (
            <div>
              {submittedAppId ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: 'var(--space-8) 0'
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor:
                        'var(--color-success-bg)',
                      color: 'var(--color-success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin:
                        '0 auto var(--space-4)',
                      border:
                        '2px solid var(--color-success-border)'
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>

                  <h2
                    style={{
                      fontSize: 'var(--font-size-2xl)',
                      color: 'var(--text-heading)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    Industrial Clearance Filing Submitted!
                  </h2>

                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 'var(--font-size-sm)',
                      maxWidth: 520,
                      margin:
                        '0 auto var(--space-4)'
                    }}
                  >
                    Your composite application has been assigned
                    unique statutory docket ID:
                  </p>

                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      fontFamily:
                        'var(--font-family-mono)',
                      color: 'var(--color-primary-800)',
                      backgroundColor:
                        'var(--color-primary-50)',
                      padding:
                        'var(--space-3) var(--space-6)',
                      borderRadius:
                        'var(--radius-lg)',
                      display: 'inline-block',
                      marginBottom:
                        'var(--space-6)',
                      border:
                        '1px dashed var(--color-primary-600)'
                    }}
                  >
                    {submittedAppId}
                  </div>
                                    <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-secondary)',
                      maxWidth: 540,
                      margin: '0 auto var(--space-6)'
                    }}
                  >
                    Automatic parallel routing initiated to Directorate of
                    Industries, State Pollution Control Board, and Fire
                    Services. Statutory SLA clocks are now ticking.
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 'var(--space-3)'
                    }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => onNavigate('tracking')}
                      icon={<ArrowRight size={18} />}
                      iconPosition="right"
                    >
                      Track Application Docket
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => onNavigate('dashboard')}
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3
                    className="card-title"
                    style={{ marginBottom: 'var(--space-4)' }}
                  >
                    <ShieldCheck
                      size={18}
                      color="var(--color-primary-700)"
                    />{' '}
                    Step 8: Digital Authorization & Filing
                  </h3>

                  <div
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: 'var(--space-6)'
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--text-heading)',
                        marginBottom: 'var(--space-3)'
                      }}
                    >
                      Statutory Undertaking & e-Sign Declaration
                    </h4>

                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: 'var(--space-4)'
                      }}
                    >
                      I hereby solemnly declare that all particulars furnished
                      in this composite industrial application form and
                      attached enclosures are true and correct to the best of
                      my knowledge and belief. I agree to abide by all the
                      conditions laid down under the relevant Acts and rules.
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-3)'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10
                        }}
                      >
                        <input
                          type="checkbox"
                          id="decl1"
                          checked={formData.applicantDeclaration}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              applicantDeclaration:
                                e.target.checked
                            })
                          }
                          style={{ cursor: 'pointer' }}
                        />

                        <label
                          htmlFor="decl1"
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            color: 'var(--text-heading)',
                            cursor: 'pointer'
                          }}
                        >
                          I confirm that the industrial site is unencumbered
                          and adheres to prescribed zoning norms.
                        </label>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10
                        }}
                      >
                        <input
                          type="checkbox"
                          id="decl2"
                          checked={formData.eSignAadhaarConsent}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              eSignAadhaarConsent:
                                e.target.checked
                            })
                          }
                          style={{ cursor: 'pointer' }}
                        />

                        <label
                          htmlFor="decl2"
                          style={{
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            color: 'var(--text-heading)',
                            cursor: 'pointer'
                          }}
                        >
                          Authorize electronic signature submission via
                          registered Aadhaar/DSC token.
                        </label>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Button
                      variant="accent"
                      size="lg"
                      disabled={
                        !formData.applicantDeclaration ||
                        !formData.eSignAadhaarConsent
                      }
                      onClick={handleFinalSubmission}
                      icon={<CheckCircle2 size={18} />}
                      style={{
                        backgroundColor: '#059669',
                        borderColor: '#059669'
                      }}
                    >
                      e-Sign & Submit Composite Application
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons Bar */}
        {!submittedAppId && (
          <div className="card-footer">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStep === 0}
              onClick={handleBack}
              icon={<ArrowLeft size={16} />}
            >
              Back
            </Button>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-2)'
              }}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSaveDraft}
              >
                Save Draft
              </Button>

              {currentStep < 7 && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNext}
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Continue to Next Step
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Missing Certificate Alert Modal */}
      <MissingCertificateModal
        isOpen={isMissingCertModalOpen}
        onClose={() => setIsMissingCertModalOpen(false)}
        certificateName={missingCertName}
        onUploadFile={file => {
          const missingDoc =
            docUploads.find(
              d =>
                d.mandatory &&
                d.status === 'PENDING'
            ) || docUploads[5];

          handleFileUpload(missingDoc.docId, file);
          setShowMissingCertBanner(false);
        }}
        onSimulateUpload={handleSimulateQuickUpload}
      />

      {/* Sector Business Clearance Checklists Modal */}
      <BusinessChecklistModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
      />
    </div>
  );
};
