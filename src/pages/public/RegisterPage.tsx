import React, { useState } from 'react';
import { Stepper, StepItem } from '../../components/common/Stepper';
import { Button } from '../../components/common/Button';
import { 
  Building2, 
  User, 
  Phone, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { DistrictSelect } from '../../components/common/DistrictSelect';

import BusinessService from '../../services/businessService';

interface RegisterPageProps {
  onNavigate: (tab: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: 'Rajiv Mehra',
    panNumber: 'AAAPM8841F',
    aadhaarNumber: 'XXXX-XXXX-9142',
    designation: 'Managing Director',
    
    // Step 2: Business
    legalBusinessName: 'Mehra Advanced Alloys & Precision Castings LLP',
    tradeName: 'Mehra Alloy Tech',
    constitution: 'LLP',
    gstin: '29AAAPM8841F1Z8',
    udyamNumber: 'UDYAM-KR-03-0091823',
    sector: 'Manufacturing Industry',
    
    // Step 3: Contact & Address
    email: `rajiv.mehra.${Date.now().toString().slice(-4)}@mehra-alloys.in`,
    mobile: '+91 98450 11992',
    registeredAddress: 'Plot 88, Peenya Industrial Complex, 3rd Phase',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    pincode: '560058',
    
    // Step 4: Account Setup
    username: 'rajiv_mehra_alloys',
    password: 'Password@123',
    confirmPassword: 'Password@123',
    agreeToTerms: true
  });

  const steps: StepItem[] = [
    { 
      id: 0, 
      title: language === 'hi' ? 'व्यक्तिगत जानकारी' : language === 'mr' ? 'वैयक्तिक माहिती' : 'Personal Info', 
      subtitle: language === 'hi' ? 'प्रवर्तक विवरण' : language === 'mr' ? 'प्रवर्तक तपशील' : 'Promoter Details' 
    },
    { 
      id: 1, 
      title: language === 'hi' ? 'व्यवसाय विवरण' : language === 'mr' ? 'व्यवसाय तपशील' : 'Business Info', 
      subtitle: language === 'hi' ? 'कानूनी संस्था व पैन' : language === 'mr' ? 'कायदेशीर संस्था व पॅन' : 'Legal Entity & PAN' 
    },
    { 
      id: 2, 
      title: language === 'hi' ? 'संपर्क व स्थान' : language === 'mr' ? 'संपर्क व स्थान' : 'Contact & Location', 
      subtitle: language === 'hi' ? 'आधिकारिक पता' : language === 'mr' ? 'अधिकृत पत्ता' : 'Official Address' 
    },
    { 
      id: 3, 
      title: language === 'hi' ? 'सुरक्षा सेटिंग्स' : language === 'mr' ? 'सुरक्षा सेटिंग्ज' : 'Security Setup', 
      subtitle: language === 'hi' ? 'पोर्टल क्रेडेंशियल्स' : language === 'mr' ? 'पोर्टल ओळखपत्र' : 'Portal Credentials' 
    },
    { 
      id: 4, 
      title: language === 'hi' ? 'सत्यापन' : language === 'mr' ? 'पडताळणी' : 'Verification', 
      subtitle: language === 'hi' ? 'पावती' : language === 'mr' ? 'पोच पावती' : 'Acknowledgement' 
    }
  ];

  const handleNext = async () => {
    setErrorMessage(null);
    if (currentStep === 3) {
      setIsLoading(true);
      try {
        const registered = await register(
          formData.fullName,
          formData.email,
          formData.password,
          'ENTREPRENEUR'
        );

        if (registered) {
          try {
            await BusinessService.create({
              businessName: formData.legalBusinessName,
              businessType: formData.constitution,
              industryType: formData.sector,
              projectSize: 'LARGE',
              panNumber: formData.panNumber,
              gstin: formData.gstin,
              location: formData.registeredAddress,
              district: formData.district,
              state: formData.state,
              pincode: formData.pincode,
              description: `${formData.legalBusinessName} specialized in ${formData.sector}.`
            });
          } catch (bErr) {
            console.warn('Business profile save error:', bErr);
          }
          setCurrentStep(4);
        } else {
          setErrorMessage(language === 'hi' ? 'पंजीकरण विफल रहा। कृपया फ़ॉर्म जांचें।' : language === 'mr' ? 'नोंदणी अयशस्वी. कृपया अर्ज तपासा.' : 'Registration failed. Please check form fields.');
        }
      } catch (err: any) {
        setErrorMessage(err.message || 'Registration error occurred.');
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    onNavigate('dashboard');
  };

  return (
    <div style={{
      maxWidth: 900,
      margin: 'var(--space-8) auto',
      padding: '0 var(--space-4)'
    }}>
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-heading)' }}>
          {language === 'hi' ? 'उद्यम एकल खिड़की पंजीकरण' : language === 'mr' ? 'उद्योग एकल खिडकी नोंदणी' : 'Enterprise Single Window Registration'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: 4 }}>
          {language === 'hi' ? 'एकल-खिड़की वैधानिक अनुमतियां प्राप्त करने के लिए अपने विनिर्माण या सेवा उद्यम का पंजीकरण करें।' : language === 'mr' ? 'एकल-खिडकी वैधानिक परवानग्या मिळवण्यासाठी आपल्या उत्पादन किंवा सेवा उद्योगाची नोंदणी करा.' : 'Register your manufacturing or service enterprise to access single-window statutory clearances.'}
        </p>
      </div>

      {/* Stepper Card */}
      <div className="card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4) var(--space-6)' }}>
        <Stepper steps={steps} currentStep={currentStep} onStepClick={stepIdx => setCurrentStep(stepIdx)} />
      </div>

      {/* Form Steps Card */}
      <div className="card">
        <div className="card-body">
          {errorMessage && (
            <div style={{ padding: 12, backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: 6, marginBottom: 16, fontSize: '0.875rem' }}>
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Personal Details */}
          {currentStep === 0 && (
            <div>
              <h3 className="card-title" style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <User size={18} color="var(--color-primary-700)" />
                <span>{language === 'hi' ? 'प्रवर्तक / अधिकृत हस्ताक्षरकर्ता विवरण' : language === 'mr' ? 'प्रवर्तक / अधिकृत स्वाक्षरीकर्ता तपशील' : 'Promoter / Authorized Signatory Details'}</span>
              </h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'पूरा कानूनी नाम' : language === 'mr' ? 'पूर्ण कायदेशीर नाव' : 'Full Legal Name'} <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.fullName} 
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })} 
                    placeholder={language === 'hi' ? 'पैन कार्ड के अनुसार' : language === 'mr' ? 'पॅन कार्डनुसार' : 'As per PAN card'} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'उद्यम में पदनाम' : language === 'mr' ? 'उद्योगातील पदनाम' : 'Designation in Enterprise'} <span className="required">*</span></label>
                  <select 
                    className="form-select" 
                    value={formData.designation} 
                    onChange={e => setFormData({ ...formData, designation: e.target.value })}
                  >
                    <option value="Managing Director">{language === 'hi' ? 'प्रबंध निदेशक (Managing Director)' : language === 'mr' ? 'व्यवस्थापकीय संचालक (Managing Director)' : 'Managing Director'}</option>
                    <option value="Proprietor">{language === 'hi' ? 'प्रोप्राइटर (Proprietor)' : language === 'mr' ? 'मालिक (Proprietor)' : 'Proprietor'}</option>
                    <option value="Managing Partner">{language === 'hi' ? 'प्रबंध भागीदार (Managing Partner)' : language === 'mr' ? 'व्यवस्थापकीय भागीदार (Managing Partner)' : 'Managing Partner'}</option>
                    <option value="Authorized Representative">{language === 'hi' ? 'अधिकृत प्रतिनिधि (Authorized Representative)' : language === 'mr' ? 'अधिकृत प्रतिनिधी (Authorized Representative)' : 'Authorized Representative'}</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'व्यक्तिगत पैन संख्या' : language === 'mr' ? 'वैयक्तिक पॅन क्रमांक' : 'Individual PAN Number'} <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.panNumber} 
                    onChange={e => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })} 
                    placeholder="10-digit PAN (e.g. AAAPM8841F)" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'आधार संदर्भ टोकन' : language === 'mr' ? 'आधार संदर्भ टोकन' : 'Aadhaar Reference Token'}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.aadhaarNumber} 
                    disabled 
                  />
                  <span className="form-helper">{language === 'hi' ? 'केवाईसी सत्यापन के लिए यूआईडीएआई टोकन' : language === 'mr' ? 'केवायसी पडताळणीसाठी यूआयडीएआय टोकन' : 'Masked UIDAI UID Token for KYC verification'}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Business Details */}
          {currentStep === 1 && (
            <div>
              <h3 className="card-title" style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Building2 size={18} color="var(--color-primary-700)" />
                <span>{language === 'hi' ? 'कानूनी संस्था एवं निगमन विवरण' : language === 'mr' ? 'कायदेशीर संस्था व नोंदणी तपशील' : 'Legal Entity & Incorporation'}</span>
              </h3>
              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'पंजीकृत संस्था नाम' : language === 'mr' ? 'नोंदणीकृत संस्थेचे नाव' : 'Legal Entity Registered Name'} <span className="required">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.legalBusinessName} 
                  onChange={e => setFormData({ ...formData, legalBusinessName: e.target.value })} 
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'व्यावसायिक संरचना' : language === 'mr' ? 'व्यवसाय रचना' : 'Constitution of Business'} <span className="required">*</span></label>
                  <select 
                    className="form-select" 
                    value={formData.constitution} 
                    onChange={e => setFormData({ ...formData, constitution: e.target.value })}
                  >
                    <option value="Private Limited Company">Private Limited Company (Pvt Ltd)</option>
                    <option value="Public Limited Company">Public Limited Company (Ltd)</option>
                    <option value="LLP">Limited Liability Partnership (LLP)</option>
                    <option value="Partnership">Partnership Firm</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'जीएसटीआईएन संख्या (GSTIN)' : language === 'mr' ? 'जीएसटी क्रमांक (GSTIN)' : 'GSTIN Number'} <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.gstin} 
                    onChange={e => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })} 
                    placeholder="15-digit GSTIN" 
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'एमएसएमई उद्यम पंजीकरण सं. (वैकल्पिक)' : language === 'mr' ? 'एमएसएमई उद्यम नोंदणी क्र. (ऐच्छिक)' : 'MSME Udyam Registration No. (Optional)'}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.udyamNumber} 
                    onChange={e => setFormData({ ...formData, udyamNumber: e.target.value })} 
                    placeholder="UDYAM-XX-00-0000000" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'प्राथमिक विनिर्माण / सेवा क्षेत्र' : language === 'mr' ? 'प्राथमिक उत्पादन व सेवा क्षेत्र' : 'Primary Manufacturing / Service Sector'} <span className="required">*</span></label>
                  <select 
                    className="form-select" 
                    value={formData.sector} 
                    onChange={e => setFormData({ ...formData, sector: e.target.value })}
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
              </div>
            </div>
          )}

          {/* STEP 3: Contact & Address */}
          {currentStep === 2 && (
            <div>
              <h3 className="card-title" style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={18} color="var(--color-primary-700)" />
                <span>{language === 'hi' ? 'आधिकारिक पत्राचार एवं पंजीकृत कार्यालय' : language === 'mr' ? 'अधिकृत पत्रव्यवहार व नोंदणीकृत कार्यालय' : 'Official Communication & Registered Office'}</span>
              </h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'आधिकारिक पंजीकृत ईमेल' : language === 'mr' ? 'अधिकृत नोंदणीकृत ईमेल' : 'Official Registered Email'} <span className="required">*</span></label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  />
                  <span className="form-helper">{language === 'hi' ? 'वैधानिक सूचनाएं एवं डिजिटल प्रमाणपत्र यहां भेजे जाएंगे' : language === 'mr' ? 'वैधानिक सूचना व डिजिटल प्रमाणपत्रे येथे पाठवली जातील' : 'Statutory notices and digital certificates will be sent here'}</span>
                </div>
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'अधिकृत मोबाइल नंबर' : language === 'mr' ? 'अधिकृत मोबाईल क्रमांक' : 'Authorized Mobile Number'} <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    value={formData.mobile} 
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })} 
                  />
                  <span className="form-helper">{language === 'hi' ? 'ओटीपी आधारित ई-हस्ताक्षर के लिए लिंक' : language === 'mr' ? 'ओटीपी वर आधारित ई-स्वाक्षरीसाठी लिंक' : 'Linked for OTP based e-signatures'}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'पंजीकृत कार्यालय का पता' : language === 'mr' ? 'नोंदणीकृत कार्यालयाचा पत्ता' : 'Registered Office Address'} <span className="required">*</span></label>
                <textarea 
                  className="form-textarea" 
                  rows={3} 
                  value={formData.registeredAddress} 
                  onChange={e => setFormData({ ...formData, registeredAddress: e.target.value })} 
                />
              </div>

              {/* State & Dynamic District Select */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <DistrictSelect
                  value={formData.district}
                  selectedState={formData.state}
                  onChange={(district, state) => setFormData({ ...formData, district, state: state || formData.state })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'पिन कोड (PIN Code)' : language === 'mr' ? 'पिन कोड (PIN Code)' : 'PIN Code'} <span className="required">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.pincode} 
                  onChange={e => setFormData({ ...formData, pincode: e.target.value })} 
                />
              </div>
            </div>
          )}

          {/* STEP 4: Account Setup */}
          {currentStep === 3 && (
            <div>
              <h3 className="card-title" style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Lock size={18} color="var(--color-primary-700)" />
                <span>{language === 'hi' ? 'पोर्टल सुरक्षा क्रेडेंशियल्स' : language === 'mr' ? 'पोर्टल सुरक्षा ओळखपत्रे' : 'Portal Security Credentials'}</span>
              </h3>
              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'पोर्टल उपयोगकर्ता नाम / एकल खिड़की आईडी' : language === 'mr' ? 'पोर्टल वापरकर्ता नाव / एकल खिडकी आयडी' : 'Portal Username / Single Window ID'} <span className="required">*</span></label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.username} 
                  onChange={e => setFormData({ ...formData, username: e.target.value })} 
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'मास्टर पासवर्ड' : language === 'mr' ? 'मास्टर पासवर्ड' : 'Master Password'} <span className="required">*</span></label>
                  <input 
                    type="password" 
                    className="form-input" 
                    value={formData.password} 
                    onChange={e => setFormData({ ...formData, password: e.target.value })} 
                  />
                  <span className="form-helper">{language === 'hi' ? 'कम से कम 8 अक्षर, संख्या व प्रतीक शामिल करें' : language === 'mr' ? 'किमान ८ अक्षरे, अंक आणि चिन्हे समाविष्ट करा' : 'Min. 8 characters with numbers & symbols'}</span>
                </div>
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'पासवर्ड की पुष्टि करें' : language === 'mr' ? 'पासवर्डची खात्री करा' : 'Confirm Password'} <span className="required">*</span></label>
                  <input 
                    type="password" 
                    className="form-input" 
                    value={formData.confirmPassword} 
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
                  />
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                marginTop: 'var(--space-4)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <input 
                    type="checkbox" 
                    id="agree" 
                    checked={formData.agreeToTerms} 
                    onChange={e => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    style={{ marginTop: 3, cursor: 'pointer' }}
                  />
                  <label htmlFor="agree" style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    {language === 'hi' ? 'मैं घोषित करता हूँ कि दी गई जानकारी पूर्णतः सत्य व सटीक है और औद्योगिक सुविधा अधिनियम के अनुरूप है। मैं इलेक्ट्रॉनिक नोटिस व SMS अलर्ट प्राप्त करने की सहमति देता हूँ।' : language === 'mr' ? 'मी जाहीर करतो की दिलेली माहिती पूर्णपणे खरी व अचूक आहे आणि औद्योगिक सुलभीकरण कायद्यानुसार आहे. मी इलेक्ट्रॉनिक सूचना व SMS अलर्ट मिळण्यास संमती देतो.' : 'I declare under penalty of law that the information provided is accurate and conforms to the State Industrial Facilitation Act and Companies Act. I agree to receive statutory electronic notices and SMS alerts.'}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation */}
          {currentStep === 4 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-4)',
                border: '2px solid var(--color-success-border)'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>
                {language === 'hi' ? 'उद्यम खाता सफलतापूर्वक पंजीकृत हो गया!' : language === 'mr' ? 'उद्योग खाते यशस्वीरित्या नोंदणीकृत झाले!' : 'Enterprise Account Registered Successfully!'}
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto var(--space-6)', fontSize: 'var(--font-size-sm)' }}>
                {language === 'hi' ? 'आपकी एकल खिड़की औद्योगिक पहचान आईडी आवंटित कर दी गई है:' : language === 'mr' ? 'आपला एकल खिडकी औद्योगिक आयडी प्राप्त झाला आहे:' : 'Your Single Window Industrial Master ID has been provisioned:'} <strong>SWC-ENT-2026-90412</strong>.
              </p>

              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                maxWidth: 480,
                margin: '0 auto var(--space-6)',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{language === 'hi' ? 'उद्यम:' : language === 'mr' ? 'उद्योग:' : 'Enterprise:'}</span>
                  <strong>{formData.legalBusinessName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{language === 'hi' ? 'हस्ताक्षरकर्ता:' : language === 'mr' ? 'स्वाक्षरीकर्ता:' : 'Signatory:'}</span>
                  <span>{formData.fullName} ({formData.designation})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>GSTIN / PAN:</span>
                  <span>{formData.gstin}</span>
                </div>
              </div>

              <Button
                variant="accent"
                size="lg"
                onClick={handleFinalSubmit}
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                style={{ backgroundColor: '#059669', borderColor: '#059669' }}
              >
                {language === 'hi' ? 'उद्यमी डैशबोर्ड पर जाएं' : language === 'mr' ? 'उद्योजक डॅशबोर्डवर जा' : 'Access Entrepreneur Dashboard'}
              </Button>
            </div>
          )}
        </div>

        {/* Navigation Actions Footer */}
        {currentStep < 4 && (
          <div className="card-footer">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStep === 0}
              onClick={handleBack}
              icon={<ArrowLeft size={16} />}
            >
              {language === 'hi' ? 'पिछला चरण' : language === 'mr' ? 'मागील टप्पा' : 'Previous Step'}
            </Button>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={isLoading}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                {isLoading 
                  ? t.common.loading 
                  : currentStep === 3 
                    ? (language === 'hi' ? 'पंजीकरण पूरा करें' : language === 'mr' ? 'नोंदणी पूर्ण करा' : 'Complete Registration') 
                    : (language === 'hi' ? 'सहेजें व आगे बढ़ें' : language === 'mr' ? 'जतन करा व पुढे चला' : 'Save & Continue')}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
        {language === 'hi' ? 'पहले से पंजीकृत हैं?' : language === 'mr' ? 'आधीच नोंदणी केली आहे का?' : 'Already registered?'}{' '}
        <button
          type="button"
          onClick={() => onNavigate('login')}
          style={{ background: 'none', border: 'none', color: 'var(--color-primary-700)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
        >
          {language === 'hi' ? 'यहाँ लॉग इन करें' : language === 'mr' ? 'येथे लॉग इन करा' : 'Sign in here'}
        </button>
      </div>
    </div>
  );
};
