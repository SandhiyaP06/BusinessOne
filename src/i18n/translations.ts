export type Language = 'en' | 'hi' | 'mr';

export interface TranslationDictionary {
  brand: {
    title: string;
    subtitle: string;
    officialBadge: string;
    emblemTitle: string;
  };
  nav: {
    dashboard: string;
    applications: string;
    myApplications: string;
    newApplication: string;
    tracking: string;
    approvals: string;
    recommendations: string;
    departmentClearances: string;
    finalApproval: string;
    documents: string;
    more: string;
    inspections: string;
    queries: string;
    renewals: string;
    analytics: string;
    help: string;
    notifications: string;
    signIn: string;
    registerBusiness: string;
    signOut: string;
    activeRole: string;
    language: string;
  };
  roles: {
    entrepreneur: string;
    officer: string;
    inspector: string;
    admin: string;
    entrepreneurTitle: string;
    entrepreneurDesc: string;
    officerTitle: string;
    officerDesc: string;
    inspectorTitle: string;
    inspectorDesc: string;
    adminTitle: string;
    adminDesc: string;
    switchPersona: string;
  };
  sidebar: {
    overview: string;
    appReview: string;
    collaboration: string;
    system: string;
    fieldAssignments: string;
    clearanceManagement: string;
    systemGovernance: string;
    appManagement: string;
    approvalManagement: string;
    docManagement: string;
    process: string;
    postApproval: string;
    officerWorkbench: string;
    assignedDockets: string;
    documentScrutiny: string;
    queriesRaised: string;
    inspectionWing: string;
    slaPerformance: string;
    guidelines: string;
    inspectorDashboard: string;
    assignedInspections: string;
    siteBlueprints: string;
    nonCompliance: string;
    safetyStandards: string;
    execDashboard: string;
    stateAnalytics: string;
    allApplications: string;
    deptStatusMatrix: string;
    licenceVault: string;
    workflowConfig: string;
    auditTrail: string;
    broadcastAlerts: string;
    digitalCertificates: string;
  };
  breadcrumb: {
    portal: string;
    dashboard: string;
    applications: string;
    newApplication: string;
    tracking: string;
    recommendations: string;
    approvals: string;
    finalApproval: string;
    documents: string;
    inspections: string;
    queries: string;
    renewals: string;
    analytics: string;
    workflowEngine: string;
    auditLogs: string;
    help: string;
    notifications: string;
  };
  landing: {
    heroBadge: string;
    heroHeadingLine1: string;
    heroHeadingHighlight: string;
    heroDesc: string;
    startNewApp: string;
    trackExisting: string;
    trackInputPlaceholder: string;
    trackBtn: string;
    mockUrl: string;
    slaActive: string;
    inProgress: string;
    approved: string;
    inScrutiny: string;
    scheduled: string;
    instantNocTitle: string;
    instantNocDesc: string;
    metricsUnitsCleared: string;
    metricsUnitsLabel: string;
    metricsAvgSla: string;
    metricsSlaLabel: string;
    metricsInvestment: string;
    metricsInvestmentLabel: string;
    metricsApprovalRatio: string;
    metricsRatioLabel: string;
    featuresBadge: string;
    featuresHeading: string;
    featuresSubheading: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    feature5Title: string;
    feature5Desc: string;
    feature6Title: string;
    feature6Desc: string;
    journeyHeading: string;
    journeySubheading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
    step7Title: string;
    step7Desc: string;
    securityBadge: string;
    securityHeading: string;
    securityDesc: string;
    createAccountBtn: string;
    accessOfficerBtn: string;
    securityItem1Title: string;
    securityItem1Desc: string;
    securityItem2Title: string;
    securityItem2Desc: string;
    securityItem3Title: string;
    securityItem3Desc: string;
    securityItem4Title: string;
    securityItem4Desc: string;
    faqHeading: string;
    faqSubheading: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    faq4Q: string;
    faq4A: string;
  };
  dashboard: {
    headerTitle: string;
    badgeActive: string;
    welcomeBack: string;
    legalEntity: string;
    swcId: string;
    btnTrack: string;
    btnNewApp: string;
    cardTotalApps: string;
    cardApproved: string;
    cardInScrutiny: string;
    cardOpenQueries: string;
    activeApplicationTitle: string;
    slaCountdown: string;
    departmentBreakdown: string;
    recentClearances: string;
    viewDetails: string;
    pendingAction: string;
  };
  login: {
    badge: string;
    heading: string;
    subtitle: string;
    quickDemoHeading: string;
    emailLabel: string;
    passwordLabel: string;
    rememberMe: string;
    forgotPassword: string;
    btnSubmit: string;
    loggingIn: string;
    noAccount: string;
    registerNow: string;
    govNotice: string;
  };
  footer: {
    description: string;
    nswsBadge: string;
    servicesTitle: string;
    service1: string;
    service2: string;
    service3: string;
    service4: string;
    service5: string;
    bodiesTitle: string;
    body1: string;
    body2: string;
    body3: string;
    body4: string;
    body5: string;
    helpdeskTitle: string;
    tollFree: string;
    email: string;
    address: string;
    copyright: string;
    terms: string;
    privacy: string;
    slaCharter: string;
    switchLang: string;
  };
  common: {
    back: string;
    next: string;
    submit: string;
    cancel: string;
    save: string;
    download: string;
    search: string;
    filter: string;
    close: string;
    status: string;
    action: string;
    view: string;
    loading: string;
  };
  certificateAlert: {
    title: string;
    message: string;
    uploadRequired: string;
    uploadButton: string;
    proceedBlocked: string;
    certificateName: string;
    simulateUpload: string;
    dismiss: string;
  };
  checklist: {
    navButton: string;
    heroButton: string;
    title: string;
    subtitle: string;
    badge: string;
    selectCategory: string;
    statutoryCertificates: string;
    supportingDocuments: string;
    mandatoryCount: string;
    conditionalCount: string;
    issuingAuthority: string;
    legalAct: string;
    sla: string;
    days: string;
    mandatory: string;
    optional: string;
    searchPlaceholder: string;
    allCategories: string;
    closeModal: string;
  };
  officerModal: {
    title: string;
    subtitle: string;
    officerDetails: string;
    position: string;
    department: string;
    badgeNumber: string;
    contact: string;
    jurisdiction: string;
    statsHeading: string;
    totalApproved: string;
    avgSla: string;
    approvalRate: string;
    approvedListTitle: string;
    businessName: string;
    sectorCategory: string;
    membersRatio: string;
    approvalDate: string;
    certificateNumber: string;
    viewOfficerAction: string;
  };
  district: {
    selectDistrict: string;
    allDistricts: string;
    maharashtraDistricts: string;
    nationalHubs: string;
    districtLabel: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brand: {
      title: 'BusinessOne',
      subtitle: 'One Platform for Every Business Approval',
      officialBadge: 'Official Government Single Window Clearance Portal',
      emblemTitle: 'BusinessOne - One Platform for Every Business Approval',
    },
    nav: {
      dashboard: 'Dashboard',
      applications: 'Applications',
      myApplications: 'My Applications',
      newApplication: 'New Application',
      tracking: 'Application Tracking',
      approvals: 'Approvals',
      recommendations: 'Recommendations',
      departmentClearances: 'Department Clearances',
      finalApproval: 'Final Approval & NOC',
      documents: 'Documents',
      more: 'More',
      inspections: 'Inspections',
      queries: 'Queries & Clarifications',
      renewals: 'Licences & Renewals',
      analytics: 'Analytics & Trends',
      help: 'Help & Support',
      notifications: 'Notifications',
      signIn: 'Sign In',
      registerBusiness: 'Register Business',
      signOut: 'Sign Out of Session',
      activeRole: 'Active Persona Role',
      language: 'Language',
    },
    roles: {
      entrepreneur: 'Entrepreneur',
      officer: 'Officer',
      inspector: 'Inspector',
      admin: 'Admin',
      entrepreneurTitle: 'Industrial Applicant',
      entrepreneurDesc: 'Manage enterprise clearances & NOCs',
      officerTitle: 'Department Officer',
      officerDesc: 'Review dockets, inspect & approve',
      inspectorTitle: 'Field Inspector',
      inspectorDesc: 'On-site verification & safety audit',
      adminTitle: 'Portal Administrator',
      adminDesc: 'SLA monitoring, workflow & audit',
      switchPersona: 'Switch Active Demo Persona',
    },
    sidebar: {
      overview: 'OVERVIEW',
      appReview: 'APPLICATION REVIEW',
      collaboration: 'COLLABORATION',
      system: 'SYSTEM',
      fieldAssignments: 'FIELD ASSIGNMENTS',
      clearanceManagement: 'CLEARANCE MANAGEMENT',
      systemGovernance: 'SYSTEM GOVERNANCE',
      appManagement: 'APPLICATION MANAGEMENT',
      approvalManagement: 'APPROVAL MANAGEMENT',
      docManagement: 'DOCUMENT MANAGEMENT',
      process: 'PROCESS',
      postApproval: 'POST APPROVAL',
      officerWorkbench: 'Officer Workbench',
      assignedDockets: 'Assigned Dockets',
      documentScrutiny: 'Document Scrutiny',
      queriesRaised: 'Queries Raised',
      inspectionWing: 'Site Inspection Wing',
      slaPerformance: 'SLA Performance',
      guidelines: 'Statutory Guidelines',
      inspectorDashboard: 'Inspector Dashboard',
      assignedInspections: 'Assigned Inspections',
      siteBlueprints: 'Site Blueprints & Files',
      nonCompliance: 'Non-Compliance Notes',
      safetyStandards: 'Safety Check Standards',
      execDashboard: 'Executive Dashboard',
      stateAnalytics: 'State SLA Analytics',
      allApplications: 'All State Applications',
      deptStatusMatrix: 'Department Status Matrix',
      licenceVault: 'Licence Master Vault',
      workflowConfig: 'Workflow Engine Config',
      auditTrail: 'System Audit Trail',
      broadcastAlerts: 'Broadcast Alerts',
      digitalCertificates: 'Digital Certificates & Licences',
    },
    breadcrumb: {
      portal: 'Portal',
      dashboard: 'Dashboard Overview',
      applications: 'My Applications',
      newApplication: 'New Industrial Clearance Application',
      tracking: 'Application Tracking & SLA Timeline',
      recommendations: 'Smart Approval Recommendations',
      approvals: 'Department Approvals & Parallel Routing',
      finalApproval: 'Final Clearance & Official Certificate',
      documents: 'Document Management & Validation Vault',
      inspections: 'Central Inspection Management',
      queries: 'Queries & Department Clarifications',
      renewals: 'Digital Licences & NOC Renewals',
      analytics: 'State SLA & Industrial Analytics',
      workflowEngine: 'Workflow Engine Configuration',
      auditLogs: 'System Audit Trail',
      help: 'Statutory Guidelines & Help',
      notifications: 'Central Notification Center',
    },
    landing: {
      heroBadge: 'Official Government Single Window Clearance Portal',
      heroHeadingLine1: 'One Platform for Every',
      heroHeadingHighlight: 'Business Approval',
      heroDesc: 'A unified statutory clearance ecosystem empowering businesses to seamlessly manage registrations, approval recommendations, document verification, concurrent multi-department routing, synchronized field inspections, and verifiable digital NOCs.',
      startNewApp: 'Start New Application',
      trackExisting: 'Track Existing Application',
      trackInputPlaceholder: 'Enter Application ID (e.g. APP-2026-IND-04829)',
      trackBtn: 'Track Status',
      mockUrl: 'portal.gov.in/single-window/live-status',
      slaActive: '● SLA Active',
      inProgress: 'In Progress (68%)',
      approved: '✓ Approved',
      inScrutiny: '● In Scrutiny',
      scheduled: '● Scheduled',
      instantNocTitle: 'Instant Digital NOC & QR Stamped Licence',
      instantNocDesc: 'Cryptographically signed and recognized across all state agencies.',
      metricsUnitsCleared: '4,480+',
      metricsUnitsLabel: 'Industrial Units Cleared',
      metricsAvgSla: '14.8 Days',
      metricsSlaLabel: 'Average SLA Clearance Time',
      metricsInvestment: '₹34,500 Cr',
      metricsInvestmentLabel: 'Industrial Investment Facilitated',
      metricsApprovalRatio: '92.4%',
      metricsRatioLabel: 'First-Time Approval Ratio',
      featuresBadge: 'Statutory Platform Architecture',
      featuresHeading: 'Built for Speed, Transparency & Legal Security',
      featuresSubheading: 'Eliminating bureaucratic bottlenecks through automated routing, standardized risk-based inspections, and statutory time-bound clearances.',
      feature1Title: 'Single Window Clearance',
      feature1Desc: 'One unified application routed simultaneously to all statutory regulatory authorities with zero paper submission.',
      feature2Title: 'Smart Approval Recommendations',
      feature2Desc: 'Automated statutory rule engine mapping exact NOCs, clearances, and mandatory clearances based on industrial classification.',
      feature3Title: 'Digital Document Vault',
      feature3Desc: 'Upload once, verify across departments. Real-time document validation with automated expiry tracking.',
      feature4Title: 'Parallel Multi-Department Processing',
      feature4Desc: 'Concurrent scrutiny by Pollution Control, Fire Services, Factories Directorate, and Town Planning with strict SLA countdowns.',
      feature5Title: 'Central Inspection System (CIS)',
      feature5Desc: 'Joint risk-based synchronized site inspections with computerized inspector assignment and transparent digital checklists.',
      feature6Title: 'Legally Valid Digital Certificates',
      feature6Desc: 'Instant QR-verifiable digital clearance certificates, licences, and NOCs with cryptographic validation stamps.',
      journeyHeading: 'The 7-Stage Single Window Clearance Journey',
      journeySubheading: 'From initial registration to downloading your official digital certificate.',
      step1Title: 'Register & Setup Profile',
      step1Desc: 'Create your enterprise profile using PAN, GSTIN, and authorized signatory credentials.',
      step2Title: 'Enter Business & Project Data',
      step2Desc: 'Provide land location, planned capital investment, power/water loads, and manufacturing sector.',
      step3Title: 'Smart Recommendation & Upload',
      step3Desc: 'Get automated clearance checklist and upload digital drawings, ETP schematics, and deeds.',
      step4Title: 'Single-Click Submission',
      step4Desc: 'Submit the composite industrial application with digital authorization.',
      step5Title: 'Parallel Department Review',
      step5Desc: 'Departments simultaneously examine documents and raise clarifications if required.',
      step6Title: 'Joint Field Inspection',
      step6Desc: 'Inspectors perform synchronized on-site verification with standard operating checklists.',
      step7Title: 'Download Clearance & Licences',
      step7Desc: 'Receive your unified statutory clearance certificate and verifiable digital NOCs.',
      securityBadge: 'Statutory Accreditation & Security',
      securityHeading: 'Protected by Enterprise Cryptography & Legal SLA Mandates',
      securityDesc: 'All documents, digital signatures, and inspection certificates are bound by the Information Technology Act 2000 and the State Single Window Clearance Act.',
      createAccountBtn: 'Create Enterprise Account',
      accessOfficerBtn: 'Access Officer Portal',
      securityItem1Title: 'AES-256 Encryption',
      securityItem1Desc: 'End-to-end encrypted document storage and transmission.',
      securityItem2Title: 'Verifiable QR NOCs',
      securityItem2Desc: 'Instant mobile scanning for on-ground enforcement teams.',
      securityItem3Title: 'Strict SLA Clock',
      securityItem3Desc: 'Automatic escalation to Chief Secretary on SLA breaches.',
      securityItem4Title: 'NSWS Integrated',
      securityItem4Desc: 'National Single Window System API synchronization.',
      faqHeading: 'Frequently Asked Questions',
      faqSubheading: 'Everything you need to know about the single window clearance mechanism.',
      faq1Q: 'What is the Single Window Industrial Approval Portal?',
      faq1A: 'It is a statutory digital governance platform established under the Ease of Doing Business Act to eliminate physical department visits and provide time-bound, paperless clearances for establishing and operating industries.',
      faq2Q: 'How does the automated Approval Recommendation Engine work?',
      faq2A: 'The engine evaluates your industry category (Red/Orange/Green/White), power demand in KVA, water consumption in KLD, plot location, and manufacturing processes to determine the precise statutory NOCs required under Indian legal Acts.',
      faq3Q: 'What happens if a department exceeds the statutory SLA timeline?',
      faq3A: 'Under the Deemed Approval Provision of the Industrial Facilitation Act, if a department fails to raise a valid query or approve within the prescribed SLA (e.g. 15 to 30 days), the clearance is flagged for deemed grant and escalated to the State Commissionerate.',
      faq4Q: 'Can I track real-time progress and respond to queries online?',
      faq4A: 'Yes. The portal provides live visual tracking across every participating department, instant SMS/email alerts, and a direct digital query reply channel with document attachment capabilities.',
    },
    dashboard: {
      headerTitle: 'Industrialist Clearance Portal',
      badgeActive: 'Active Enterprise',
      welcomeBack: 'Welcome back',
      legalEntity: 'Legal Entity',
      swcId: 'Single-Window Identifier',
      btnTrack: 'Track Clearance Status',
      btnNewApp: 'New Application',
      cardTotalApps: 'Total Applications',
      cardApproved: 'Approved Clearances',
      cardInScrutiny: 'Under Department Scrutiny',
      cardOpenQueries: 'Queries Requiring Action',
      activeApplicationTitle: 'Active Project Spotlight',
      slaCountdown: 'Statutory SLA Countdown',
      departmentBreakdown: 'Department Scrutiny Status',
      recentClearances: 'Approved Digital Certificates',
      viewDetails: 'View Complete Docket',
      pendingAction: 'Immediate Action Needed',
    },
    login: {
      badge: 'Official Statutory Access Portal',
      heading: 'Sign In to Your Industrial Account',
      subtitle: 'Enter authorized enterprise or departmental credentials to access clearance dockets.',
      quickDemoHeading: 'Quick Login Persona Switcher',
      emailLabel: 'Official Email Address / Enterprise ID',
      passwordLabel: 'Secure Password',
      rememberMe: 'Remember this device',
      forgotPassword: 'Forgot Password?',
      btnSubmit: 'Sign In to Secure Portal',
      loggingIn: 'Authenticating...',
      noAccount: "Don't have an enterprise account?",
      registerNow: 'Register your business here',
      govNotice: 'Access restricted to authorized enterprises and government officials under IT Act 2000.',
    },
    footer: {
      description: 'Statutory Single Window Clearance and Industrial Facilitation Mechanism established under the Ease of Doing Business Act for paperless industrial clearances.',
      nswsBadge: 'National Single Window System (NSWS) Integrated',
      servicesTitle: 'Clearance Services',
      service1: 'Smart Approval Recommendation',
      service2: 'Application Tracking & SLA Status',
      service3: 'Digital Document Locker & Verification',
      service4: 'Central Inspection System (CIS)',
      service5: 'Annual Licences & NOC Renewals',
      bodiesTitle: 'Participating Bodies',
      body1: 'Directorate of Industries & Commerce',
      body2: 'State Pollution Control Board (SPCB)',
      body3: 'Fire & Emergency Safety Services',
      body4: 'Directorate of Factories & Boilers (DISH)',
      body5: 'Town & Country Planning Directorate',
      helpdeskTitle: 'Statutory Helpdesk',
      tollFree: 'Toll-Free: 1800-425-4638 (9 AM - 6 PM)',
      email: 'singlewindow-support@gov.ind.in',
      address: 'State Facilitation Center, Industrial Secretariat',
      copyright: '© 2026 Industrial Approval Portal. Designed & Powered by Single Window Industrial Clearance Authority.',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      slaCharter: 'SLA Charter',
      switchLang: 'Select Language',
    },
    common: {
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save Draft',
      download: 'Download',
      search: 'Search',
      filter: 'Filter',
      close: 'Close',
      status: 'Status',
      action: 'Action',
      view: 'View',
      loading: 'Loading...',
    },
    certificateAlert: {
      title: 'Mandatory Certificate Required',
      message: 'You have not uploaded the required certificate yet. Please upload the certificate to proceed. Without the certificate, you cannot continue with this process.',
      uploadRequired: 'Mandatory Certificate Missing',
      uploadButton: 'Upload Required Certificate',
      proceedBlocked: 'Upload Certificate to Proceed',
      certificateName: 'Fire Hydrant Loop & Evacuation Route Blueprint (DOC-6)',
      simulateUpload: 'Simulate Quick Upload (Demo)',
      dismiss: 'I Understand',
    },
    checklist: {
      navButton: 'Pre-Registration Checklist',
      heroButton: 'View Required Certificates by Sector',
      title: 'Statutory Registration & Clearance Checklist',
      subtitle: 'Know all mandatory certificates, supporting documents, issuing authorities, and statutory SLAs before applying.',
      badge: 'Know Before You Apply',
      selectCategory: 'Select Business Sector / Industry Type',
      statutoryCertificates: 'Statutory Certificates & NOCs',
      supportingDocuments: 'Technical Documents & Reports',
      mandatoryCount: 'Mandatory Clearances',
      conditionalCount: 'Conditional / As Applicable',
      issuingAuthority: 'Issuing Authority',
      legalAct: 'Governing Act / Rule',
      sla: 'Statutory SLA',
      days: 'Days',
      mandatory: 'Mandatory',
      optional: 'Conditional / Optional',
      searchPlaceholder: 'Search certificate name, authority, or act...',
      allCategories: 'All 7 Business Sectors',
      closeModal: 'Close Checklist',
    },
    officerModal: {
      title: 'Approving Officer Dossier & Authorized Clearances',
      subtitle: 'Public transparency record under State Single Window Clearance Act',
      officerDetails: 'Officer Credentials',
      position: 'Official Designation',
      department: 'Statutory Department',
      badgeNumber: 'Gazetted Officer ID / Badge',
      contact: 'Official Contact',
      jurisdiction: 'Office Location / Jurisdiction',
      statsHeading: 'Approval Track Record',
      totalApproved: 'Total Applications Approved',
      avgSla: 'Average Approval Time',
      approvalRate: 'Clearance Ratio',
      approvedListTitle: 'Businesses & Applications Approved by this Officer',
      businessName: 'Business / Enterprise Name',
      sectorCategory: 'Sector & Pollution Category',
      membersRatio: 'Members Applied / Approved',
      approvalDate: 'Approval Date',
      certificateNumber: 'Official Certificate / Order No.',
      viewOfficerAction: 'View Officer Profile',
    },
    district: {
      selectDistrict: 'Select District',
      allDistricts: 'All Districts',
      maharashtraDistricts: 'Maharashtra State (All 36 Districts)',
      nationalHubs: 'Major National Industrial Hubs',
      districtLabel: 'District',
    },
  },

  hi: {
    brand: {
      title: 'BusinessOne',
      subtitle: 'One Platform for Every Business Approval',
      officialBadge: 'आधिकारिक सरकारी एकल खिड़की औद्योगिक मंजूरी पोर्टल',
      emblemTitle: 'BusinessOne - One Platform for Every Business Approval',
    },
    nav: {
      dashboard: 'डैशबोर्ड',
      applications: 'आवेदन',
      myApplications: 'मेरे आवेदन',
      newApplication: 'नया आवेदन',
      tracking: 'आवेदन ट्रैकिंग',
      approvals: 'स्वीकृतियां',
      recommendations: 'अनुशंसाएं',
      departmentClearances: 'विभागीय स्वीकृतियां',
      finalApproval: 'अंतिम अनुमोदन एवं अनापत्ति प्रमाणपत्र (NOC)',
      documents: 'दस्तावेज़ वॉल्ट',
      more: 'अन्य सेवाएं',
      inspections: 'स्थल निरीक्षण',
      queries: 'प्रश्न एवं स्पष्टीकरण',
      renewals: 'लाइसेंस एवं नवीनीकरण',
      analytics: 'विश्लेषण एवं आंकड़े',
      help: 'सहायता एवं दिशानिर्देश',
      notifications: 'सूचनाएं',
      signIn: 'लॉग इन करें',
      registerBusiness: 'व्यवसाय पंजीकृत करें',
      signOut: 'सत्र समाप्त करें (लॉग आउट)',
      activeRole: 'सक्रिय उपयोगकर्ता भूमिका',
      language: 'भाषा',
    },
    roles: {
      entrepreneur: 'उद्यमी',
      officer: 'विभागीय अधिकारी',
      inspector: 'क्षेत्रीय निरीक्षक',
      admin: 'पोर्टल प्रशासक',
      entrepreneurTitle: 'औद्योगिक आवेदक',
      entrepreneurDesc: 'उद्योग स्वीकृतियां और एनओसी प्रबंधित करें',
      officerTitle: 'समीक्षा अधिकारी',
      officerDesc: 'दस्तावेज़ों की समीक्षा, निरीक्षण और अनुमोदन',
      inspectorTitle: 'स्थल सुरक्षा निरीक्षक',
      inspectorDesc: 'स्थल सत्यापन एवं सुरक्षा अनुपालन जांच',
      adminTitle: 'पोर्टल मुख्य प्रशासक',
      adminDesc: 'समयसीमा (SLA) निगरानी, कार्यप्रवाह एवं ऑडिट',
      switchPersona: 'डेमो उपयोगकर्ता भूमिका बदलें',
    },
    sidebar: {
      overview: 'सामान्य अवलोकन',
      appReview: 'आवेदन समीक्षा',
      collaboration: 'विभागीय समन्वय',
      system: 'प्रणाली सेटिंग्स',
      fieldAssignments: 'क्षेत्रीय कार्य आवंटन',
      clearanceManagement: 'मंजूरी प्रबंधन',
      systemGovernance: 'प्रणाली प्रशासन',
      appManagement: 'आवेदन प्रबंधन',
      approvalManagement: 'अनुमोदन प्रबंधन',
      docManagement: 'दस्तावेज़ प्रबंधन',
      process: 'कार्य प्रक्रिया',
      postApproval: 'मंजूरी उपरांत सेवाएं',
      officerWorkbench: 'अधिकारी कार्यक्षेत्र',
      assignedDockets: 'आवंटित आवेदन फाइलें',
      documentScrutiny: 'दस्तावेज़ संवीक्षा',
      queriesRaised: 'उठाए गए प्रश्न',
      inspectionWing: 'स्थल निरीक्षण प्रभाग',
      slaPerformance: 'समयसीमा (SLA) प्रदर्शन',
      guidelines: 'वैधानिक दिशानिर्देश',
      inspectorDashboard: 'निरीक्षक डैशबोर्ड',
      assignedInspections: 'आवंटित निरीक्षण कार्य',
      siteBlueprints: 'स्थल मानचित्र एवं फाइलें',
      nonCompliance: 'गैर-अनुपालन टिप्पणियां',
      safetyStandards: 'सुरक्षा मानक नियमावली',
      execDashboard: 'कार्यकारी डैशबोर्ड',
      stateAnalytics: 'राज्य स्तरीय SLA विश्लेषण',
      allApplications: 'राज्य के समस्त आवेदन',
      deptStatusMatrix: 'विभागीय स्थिति मैट्रिक्स',
      licenceVault: 'लाइसेंस मास्टर वॉल्ट',
      workflowConfig: 'कार्यप्रवाह विन्यास',
      auditTrail: 'सिस्टम ऑडिट ट्रेल',
      broadcastAlerts: 'प्रसारण अलर्ट',
      digitalCertificates: 'डिजिटल प्रमाणपत्र एवं लाइसेंस',
    },
    breadcrumb: {
      portal: 'पोर्टल',
      dashboard: 'डैशबोर्ड अवलोकन',
      applications: 'मेरे औद्योगिक आवेदन',
      newApplication: 'नया औद्योगिक मंजूरी आवेदन',
      tracking: 'आवेदन ट्रैकिंग एवं SLA समयसीमा',
      recommendations: 'स्मार्ट अनुमोदन अनुशंसाएं',
      approvals: 'विभागीय स्वीकृतियां एवं समानांतर रूटिंग',
      finalApproval: 'अंतिम अनुमोदन एवं आधिकारिक प्रमाणपत्र',
      documents: 'दस्तावेज़ प्रबंधन एवं सत्यापन वॉल्ट',
      inspections: 'केंद्रीय निरीक्षण प्रबंधन',
      queries: 'विभागीय प्रश्न एवं स्पष्टीकरण',
      renewals: 'डिजिटल लाइसेंस एवं NOC नवीनीकरण',
      analytics: 'राज्य SLA एवं औद्योगिक विश्लेषण',
      workflowEngine: 'कार्यप्रवाह इंजन विन्यास',
      auditLogs: 'सिस्टम ऑडिट लॉग',
      help: 'वैधानिक दिशानिर्देश एवं सहायता',
      notifications: 'केंद्रीय सूचना केंद्र',
    },
    landing: {
      heroBadge: 'आधिकारिक सरकारी एकल खिड़की औद्योगिक मंजूरी पोर्टल',
      heroHeadingLine1: 'औद्योगिक अनुमोदनों के लिए',
      heroHeadingHighlight: 'एकीकृत डिजिटल मंच',
      heroDesc: 'व्यापार सुगमता के लिए एक एकीकृत वैधानिक मंजूरी प्रणाली—पंजीकरण, अनुमोदन अनुशंसा, दस्तावेज़ सत्यापन, बहु-विभागीय समानांतर रूटिंग, समन्वित निरीक्षण और डिजिटल एनओसी एक ही स्थान पर।',
      startNewApp: 'नया आवेदन प्रारंभ करें',
      trackExisting: 'मौजूदा आवेदन की स्थिति देखें',
      trackInputPlaceholder: 'आवेदन संख्या दर्ज करें (उदा. APP-2026-IND-04829)',
      trackBtn: 'स्थिति जांचें',
      mockUrl: 'portal.gov.in/single-window/live-status',
      slaActive: '● समयसीमा (SLA) सक्रिय',
      inProgress: 'प्रक्रियाधीन (68%)',
      approved: '✓ अनुमोदित',
      inScrutiny: '● संवीक्षा जारी',
      scheduled: '● निरीक्षण निर्धारित',
      instantNocTitle: 'त्वरित डिजिटल एनओसी व क्यूआर मुद्रित प्रमाणपत्र',
      instantNocDesc: 'क्रिप्टोग्राफ़िक रूप से डिजिटल हस्ताक्षरित और सभी राज्य एजेंसियों द्वारा मान्य।',
      metricsUnitsCleared: '4,480+',
      metricsUnitsLabel: 'स्वीकृत औद्योगिक इकाइयां',
      metricsAvgSla: '14.8 दिन',
      metricsSlaLabel: 'औसत वैधानिक निपटान समय',
      metricsInvestment: '₹34,500 करोड़',
      metricsInvestmentLabel: 'सुगम औद्योगिक निवेश',
      metricsApprovalRatio: '92.4%',
      metricsRatioLabel: 'प्रथम-प्रयास अनुमोदन अनुपात',
      featuresBadge: 'वैधानिक प्रणाली वास्तुकला',
      featuresHeading: 'गति, पारदर्शिता और कानूनी सुरक्षा के लिए निर्मित',
      featuresSubheading: 'स्वचालित रूटिंग, मानकीकृत जोखिम-आधारित निरीक्षण और वैधानिक समय-बद्ध स्वीकृतियों के माध्यम से नौकरशाही बाधाओं का पूर्ण निवारण।',
      feature1Title: 'एकल खिड़की समानांतर स्वीकृति',
      feature1Desc: 'बिना कागजी कार्रवाई के सभी विनियामक प्राधिकरणों को एक साथ स्वचालित रूप से भेजा जाने वाला एकीकृत आवेदन।',
      feature2Title: 'स्मार्ट अनुमोदन अनुशंसा इंजन',
      feature2Desc: 'औद्योगिक श्रेणी (लाल/नारंगी/हरा/सफेद) के आधार पर आवश्यक सटीक एनओसी और अनुमतियों का स्वचालित निर्धारण।',
      feature3Title: 'डिजिटल दस्तावेज़ लॉकर',
      feature3Desc: 'एक बार अपलोड करें, सभी विभागों में मान्य। स्वचालित वैधता समाप्ति ट्रैकिंग और रीयल-टाइम सत्यापन।',
      feature4Title: 'समानांतर बहु-विभागीय संवीक्षा',
      feature4Desc: 'प्रदूषण नियंत्रण, अग्निशमन, कारखाना निदेशालय और नगर नियोजन द्वारा सख्त समयसीमा के साथ एक साथ जांच।',
      feature5Title: 'केंद्रीय निरीक्षण प्रणाली (CIS)',
      feature5Desc: 'कंप्यूटरीकृत पारदर्शी निरीक्षक आवंटन और डिजिटल चेकलिस्ट के साथ जोखिम-आधारित संयुक्त स्थल निरीक्षण।',
      feature6Title: 'कानूनी रूप से वैध डिजिटल प्रमाण पत्र',
      feature6Desc: 'डिजिटल हस्ताक्षर और त्वरित क्यूआर कोड सत्यापन के साथ तत्काल डाउनलोड योग्य एनओसी और लाइसेंस।',
      journeyHeading: '7-चरणीय एकल खिड़की मंजूरी यात्रा',
      journeySubheading: 'प्रारंभिक पंजीकरण से लेकर आधिकारिक डिजिटल प्रमाणपत्र डाउनलोड करने तक का सुगम सफर।',
      step1Title: 'पंजीकरण व प्रोफ़ाइल निर्माण',
      step1Desc: 'पैन, जीएसटी और अधिकृत हस्ताक्षरकर्ता क्रेडेंशियल्स के माध्यम से अपनी उद्यम प्रोफ़ाइल बनाएं।',
      step2Title: 'व्यवसाय व परियोजना विवरण भरें',
      step2Desc: 'भूमि स्थान, नियोजित पूंजी निवेश, विद्युत/जल भार और विनिर्माण क्षेत्र का विवरण दर्ज करें।',
      step3Title: 'स्मार्ट अनुशंसाएं व दस्तावेज़ अपलोड',
      step3Desc: 'आवश्यक अनापत्ति प्रमाणपत्रों की स्वचालित सूची प्राप्त करें और डिजिटल नक्शे व दस्तावेज अपलोड करें।',
      step4Title: 'एकल-क्लिक आवेदन जमा करें',
      step4Desc: 'डिजिटल प्राधिकरण के साथ समग्र औद्योगिक आवेदन पत्र ऑनलाइन सबमिट करें।',
      step5Title: 'समानांतर विभागीय समीक्षा',
      step5Desc: 'सभी संबंधित विभाग एक साथ दस्तावेजों की जांच करते हैं और आवश्यकता पड़ने पर प्रश्न पूछते हैं।',
      step6Title: 'संयुक्त स्थल निरीक्षण',
      step6Desc: 'निरीक्षक मानक संचालन चेकलिस्ट के साथ मौके पर समन्वित भौतिक सत्यापन करते हैं।',
      step7Title: 'स्वीकृति व लाइसेंस डाउनलोड करें',
      step7Desc: 'अपना एकीकृत वैधानिक मंजूरी प्रमाणपत्र और क्यूआर प्रमाणित डिजिटल एनओसी तुरंत प्राप्त करें।',
      securityBadge: 'वैधानिक मान्यता एवं सुरक्षा',
      securityHeading: 'उन्नत सुरक्षा और कानूनी समयसीमा गारंटी से संरक्षित',
      securityDesc: 'सभी दस्तावेज़, डिजिटल हस्ताक्षर और निरीक्षण प्रमाणपत्र सूचना प्रौद्योगिकी अधिनियम 2000 और एकल खिड़की अधिनियम द्वारा कानूनी रूप से बाध्य हैं।',
      createAccountBtn: 'उद्यम खाता बनाएं',
      accessOfficerBtn: 'अधिकारी पोर्टल पर जाएं',
      securityItem1Title: 'AES-256 एन्क्रिप्शन',
      securityItem1Desc: 'पूर्णतः सुरक्षित व एन्क्रिप्टेड दस्तावेज़ भंडारण और डेटा ट्रांसमिशन।',
      securityItem2Title: 'सत्यापन योग्य क्यूआर एनओसी',
      securityItem2Desc: 'ऑन-ग्राउंड सत्यापन टीमों के लिए तत्काल मोबाइल बारकोड स्कैनिंग।',
      securityItem3Title: 'सख्त SLA समय घड़ी',
      securityItem3Desc: 'समयसीमा उल्लंघन पर स्वतः डीम्ड अप्रूवल व मुख्य सचिव स्तर पर एस्केलेशन।',
      securityItem4Title: 'राष्ट्रीय NSWS एकीकृत',
      securityItem4Desc: 'राष्ट्रीय एकल खिड़की प्रणाली (NSWS) के साथ सीधा एपीआई एकीकरण।',
      faqHeading: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
      faqSubheading: 'एकल खिड़की औद्योगिक मंजूरी प्रक्रिया के बारे में आपके सभी प्रश्नों के उत्तर।',
      faq1Q: 'एकल खिड़की औद्योगिक अनुमोदन पोर्टल क्या है?',
      faq1A: 'यह व्यापार सुगमता (Ease of Doing Business) के अंतर्गत स्थापित एक वैधानिक डिजिटल मंच है, जिसका उद्देश्य सरकारी कार्यालयों के चक्कर समाप्त कर उद्योगों की स्थापना हेतु समयबद्ध एवं कागज-रहित स्वीकृतियां प्रदान करना है।',
      faq2Q: 'स्वचालित अनुमोदन अनुशंसा प्रणाली कैसे कार्य करती है?',
      faq2A: 'यह प्रणाली आपके उद्योग की श्रेणी (लाल/नारंगी/हरा/सफेद), बिजली भार (KVA), जल खपत (KLD), भूखंड की स्थिति और उत्पादन प्रक्रिया का विश्लेषण कर भारतीय कानूनों के अंतर्गत आवश्यक सटीक एनओसी की सूची तैयार करती है।',
      faq3Q: 'यदि कोई विभाग निर्धारित समयसीमा (SLA) में निर्णय नहीं लेता तो क्या होगा?',
      faq3A: 'औद्योगिक सुविधा अधिनियम के ‘डीम्ड अप्रूवल’ प्रावधान के अनुसार, यदि कोई विभाग निर्धारित दिनों (जैसे 15-30 दिन) में स्पष्टीकरण नहीं मांगता या स्वीकृति नहीं देता, तो आवेदन स्वतः स्वीकृत मान लिया जाता है।',
      faq4Q: 'क्या मैं ऑनलाइन प्रगति देख सकता हूं और प्रश्नों का उत्तर दे सकता हूं?',
      faq4A: 'जी हां। पोर्टल प्रत्येक विभाग की रीयल-टाइम ट्रैकिंग, त्वरित एसएमएस/ईमेल अलर्ट और दस्तावेज़ संलग्न कर प्रश्नों का सीधा ऑनलाइन उत्तर देने की सुविधा प्रदान करता है।',
    },
    dashboard: {
      headerTitle: 'उद्योगपति मंजूरी पोर्टल',
      badgeActive: 'सक्रिय औद्योगिक उद्यम',
      welcomeBack: 'पुनः स्वागत है',
      legalEntity: 'पंजीकृत उद्यम',
      swcId: 'एकल खिड़की पहचानकर्ता',
      btnTrack: 'मंजूरी स्थिति जांचें',
      btnNewApp: 'नया आवेदन करें',
      cardTotalApps: 'कुल औद्योगिक आवेदन',
      cardApproved: 'स्वीकृत अनुमतियां / NOC',
      cardInScrutiny: 'विभागीय समीक्षाधीन',
      cardOpenQueries: 'लंबित प्रश्न (कार्रवाई अपेक्षित)',
      activeApplicationTitle: 'सक्रिय परियोजना हाइलाइट',
      slaCountdown: 'वैधानिक समयसीमा (SLA) काउंटडाउन',
      departmentBreakdown: 'विभागवार समीक्षा स्थिति',
      recentClearances: 'स्वीकृत डिजिटल प्रमाणपत्र',
      viewDetails: 'पूर्ण आवेदन विवरण देखें',
      pendingAction: 'तत्काल कार्रवाई आवश्यक',
    },
    login: {
      badge: 'आधिकारिक वैधानिक प्रवेश द्वार',
      heading: 'अपने औद्योगिक खाते में लॉग इन करें',
      subtitle: 'मंजूरी फाइलों तक पहुंचने के लिए अधिकृत उद्यम या विभागीय क्रेडेंशियल्स दर्ज करें।',
      quickDemoHeading: 'त्वरित डेमो भूमिका चयनकर्ता',
      emailLabel: 'आधिकारिक ईमेल पता / उद्यम आईडी',
      passwordLabel: 'सुरक्षित पासवर्ड',
      rememberMe: 'इस उपकरण को याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      btnSubmit: 'सुरक्षित पोर्टल में लॉग इन करें',
      loggingIn: 'प्रमाणीकरण जारी...',
      noAccount: 'क्या आपके पास उद्यम खाता नहीं है?',
      registerNow: 'यहाँ नया व्यवसाय पंजीकृत करें',
      govNotice: 'आईटी अधिनियम 2000 के अंतर्गत अनधिकृत प्रवेश प्रतिबंधित एवं दंडनीय है।',
    },
    footer: {
      description: 'उद्योगों की स्थापना व संचालन के लिए कागज-रहित स्वीकृतियां प्रदान करने हेतु व्यापार सुगमता अधिनियम के तहत स्थापित वैधानिक एकल खिड़की सुविधा केंद्र।',
      nswsBadge: 'राष्ट्रीय एकल खिड़की प्रणाली (NSWS) से एकीकृत',
      servicesTitle: 'मंजूरी सेवाएं',
      service1: 'स्मार्ट अनुमोदन अनुशंसा',
      service2: 'आवेदन ट्रैकिंग एवं SLA स्थिति',
      service3: 'डिजिटल दस्तावेज़ लॉकर एवं सत्यापन',
      service4: 'केंद्रीय निरीक्षण प्रणाली (CIS)',
      service5: 'वार्षिक लाइसेंस एवं NOC नवीनीकरण',
      bodiesTitle: 'सहभागी शासकीय विभाग',
      body1: 'उद्योग एवं वाणिज्य निदेशालय',
      body2: 'राज्य प्रदूषण नियंत्रण बोर्ड (SPCB)',
      body3: 'अग्निशमन एवं आपातकालीन सेवाएं',
      body4: 'कारखाना एवं बॉयलर्स निदेशालय (DISH)',
      body5: 'नगर एवं ग्राम नियोजन निदेशालय',
      helpdeskTitle: 'वैधानिक सहायता केंद्र',
      tollFree: 'टोल-फ्री हेल्पलाइन: 1800-425-4638 (प्रातः 9 से सायं 6 बजे)',
      email: 'singlewindow-support@gov.ind.in',
      address: 'राज्य औद्योगिक सुविधा केंद्र, उद्योग सचिवालय',
      copyright: '© 2026 औद्योगिक अनुमोदन पोर्टल। एकल खिड़की औद्योगिक मंजूरी प्राधिकरण द्वारा संचालित।',
      terms: 'सेवा की शर्तें',
      privacy: 'गोपनीयता नीति',
      slaCharter: 'नागरिक एवं SLA चार्टर',
      switchLang: 'भाषा चुनें',
    },
    common: {
      back: 'पीछे जाएं',
      next: 'आगे बढ़ें',
      submit: 'सबमिट करें',
      cancel: 'रद्द करें',
      save: 'ड्राफ्ट सहेजें',
      download: 'डाउनलोड करें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      close: 'बंद करें',
      status: 'स्थिति',
      action: 'कार्रवाई',
      view: 'देखें',
      loading: 'लोड हो रहा है...',
    },
    certificateAlert: {
      title: 'अनिवार्य प्रमाणपत्र आवश्यक है',
      message: 'You have not uploaded the required certificate yet. Please upload the certificate to proceed. Without the certificate, you cannot continue with this process.',
      uploadRequired: 'अनिवार्य प्रमाणपत्र अपलोड नहीं किया गया है',
      uploadButton: 'अनिवार्य प्रमाणपत्र अपलोड करें',
      proceedBlocked: 'आगे बढ़ने के लिए प्रमाणपत्र अपलोड करें',
      certificateName: 'अग्निशामक हाइड्रेंट लूप एवं आपातकालीन निकास योजना (DOC-6)',
      simulateUpload: 'त्वरित डेमो अपलोड करें',
      dismiss: 'मैं समझता हूँ',
    },
    checklist: {
      navButton: 'पंजीकरण-पूर्व चेकलिस्ट',
      heroButton: 'उद्योग अनुसार आवश्यक प्रमाणपत्र देखें',
      title: 'उद्योगवार वैधानिक पंजीकरण एवं प्रमाणपत्र चेकलिस्ट',
      subtitle: 'आवेदन करने से पूर्व सभी आवश्यक प्रमाणपत्र, तकनीकी दस्तावेज़, जारीकर्ता प्राधिकरण और समय-सीमा जानें।',
      badge: 'आवेदन करने से पहले जानें',
      selectCategory: 'उद्योग अथवा व्यावसायिक क्षेत्र चुनें',
      statutoryCertificates: 'वैधानिक प्रमाणपत्र एवं एनओसी (NOC)',
      supportingDocuments: 'तकनीकी दस्तावेज़ एवं रिपोर्ट',
      mandatoryCount: 'अनिवार्य स्वीकृतियां',
      conditionalCount: 'शर्तों के अधीन / लागू होने पर',
      issuingAuthority: 'जारीकर्ता प्राधिकरण / विभाग',
      legalAct: 'अधिनियम एवं वैधानिक नियम',
      sla: 'वैधानिक समय-सीमा (SLA)',
      days: 'दिन',
      mandatory: 'अनिवार्य',
      optional: 'शर्तों पर / वैकल्पिक',
      searchPlaceholder: 'प्रमाणपत्र का नाम, विभाग या कानून खोजें...',
      allCategories: 'सभी 7 व्यावसायिक श्रेणियां',
      closeModal: 'चेकलिस्ट बंद करें',
    },
    officerModal: {
      title: 'अनुमोदन अधिकारी विवरण एवं स्वीकृत इकाइयां',
      subtitle: 'एकल खिड़की औद्योगिक सुगमता अधिनियम के अंतर्गत सार्वजनिक पारदर्शिता रिकॉर्ड',
      officerDetails: 'अधिकारी परिचय व क्रेडेंशियल्स',
      position: 'आधिकारिक पदनाम',
      department: 'संबद्ध शासकीय विभाग',
      badgeNumber: 'राजपत्रित अधिकारी पहचान / बैच संख्या',
      contact: 'आधिकारिक संपर्क',
      jurisdiction: 'क्षेत्रीय कार्यालय / अधिकार क्षेत्र',
      statsHeading: 'अनुमोदन एवं कार्य निष्पादन ट्रैक रिकॉर्ड',
      totalApproved: 'कुल स्वीकृत औद्योगिक आवेदन',
      avgSla: 'औसत अनुमोदन समय',
      approvalRate: 'स्वीकृति अनुपात',
      approvedListTitle: 'इस अधिकारी द्वारा स्वीकृत व्यावसायिक इकाइयां एवं आवेदन',
      businessName: 'उद्यम / कंपनी का नाम',
      sectorCategory: 'औद्योगिक क्षेत्र एवं श्रेणी',
      membersRatio: 'आवेदक सदस्य / स्वीकृत सदस्य',
      approvalDate: 'स्वीकृति की तारीख',
      certificateNumber: 'वैधानिक प्रमाणपत्र / आदेश संख्या',
      viewOfficerAction: 'अधिकारी प्रोफ़ाइल देखें',
    },
    district: {
      selectDistrict: 'ज़िला चुनें',
      allDistricts: 'सभी ज़िले',
      maharashtraDistricts: 'महाराष्ट्र राज्य (सभी 36 ज़िले)',
      nationalHubs: 'प्रमुख राष्ट्रीय औद्योगिक केंद्र',
      districtLabel: 'ज़िला',
    },
  },

  mr: {
    brand: {
      title: 'BusinessOne',
      subtitle: 'One Platform for Every Business Approval',
      officialBadge: 'अधिकृत शासकीय एकल खिडकी औद्योगिक मंजुरी पोर्टल',
      emblemTitle: 'BusinessOne - One Platform for Every Business Approval',
    },
    nav: {
      dashboard: 'डॅशबोर्ड',
      applications: 'अर्ज',
      myApplications: 'माझे अर्ज',
      newApplication: 'नवीन अर्ज',
      tracking: 'अर्ज मागोवा (ट्रॅकिंग)',
      approvals: 'मंजुऱ्या',
      recommendations: 'शिफारशी',
      departmentClearances: 'विभागीय परवानग्या',
      finalApproval: 'अंतिम मंजुरी व ना-हरकत प्रमाणपत्र (NOC)',
      documents: 'कागदपत्र दालन',
      more: 'इतर सेवा',
      inspections: 'स्थळ पाहणी (तपासणी)',
      queries: 'प्रश्न व खुलासे',
      renewals: 'परवाने व नूतनीकरण',
      analytics: 'विश्लेषण व आकडेवारी',
      help: 'मदत व मार्गदर्शक तत्त्वे',
      notifications: 'सूचना',
      signIn: 'लॉग इन करा',
      registerBusiness: 'व्यवसाय नोंदणी करा',
      signOut: 'लॉग आउट करा',
      activeRole: 'सक्रिय वापरकर्ता भूमिका',
      language: 'भाषा',
    },
    roles: {
      entrepreneur: 'उद्योजक',
      officer: 'विभागीय अधिकारी',
      inspector: 'तपासणी अधिकारी',
      admin: 'पोर्टल प्रशासक',
      entrepreneurTitle: 'औद्योगिक अर्जदार',
      entrepreneurDesc: 'उद्योग मंजुऱ्या व एनओसी व्यवस्थापित करा',
      officerTitle: 'छाननी अधिकारी',
      officerDesc: 'कागदपत्रांची छाननी, तपासणी व मंजुरी',
      inspectorTitle: 'स्थळ तपासणी अधिकारी',
      inspectorDesc: 'प्रत्यक्ष स्थळ पाहणी व सुरक्षा पडताळणी',
      adminTitle: 'पोर्टल मुख्य प्रशासक',
      adminDesc: 'वैधानिक कालमर्यादा (SLA) देखरेख व ऑडिट',
      switchPersona: 'डेमो भूमिका बदला',
    },
    sidebar: {
      overview: 'सर्वसाधारण आढावा',
      appReview: 'अर्ज छाननी',
      collaboration: 'विभागीय समन्वय',
      system: 'प्रणाली व्यवस्था',
      fieldAssignments: 'क्षेत्रीय कार्य वाटप',
      clearanceManagement: 'मंजुरी व्यवस्थापन',
      systemGovernance: 'प्रणाली प्रशासन',
      appManagement: 'अर्ज व्यवस्थापन',
      approvalManagement: 'मंजुरी व्यवस्थापन',
      docManagement: 'कागदपत्र व्यवस्थापन',
      process: 'कार्यपद्धती',
      postApproval: 'मंजुरीनंतरच्या सेवा',
      officerWorkbench: 'अधिकारी कार्यपीठ',
      assignedDockets: 'वाटप झालेल्या अर्ज नस्ती',
      documentScrutiny: 'कागदपत्र छाननी',
      queriesRaised: 'उपस्थित केलेले प्रश्न',
      inspectionWing: 'स्थळ पाहणी विभाग',
      slaPerformance: 'कालमर्यादा (SLA) कामगिरी',
      guidelines: 'वैधानिक मार्गदर्शक तत्त्वे',
      inspectorDashboard: 'तपासणी अधिकारी डॅशबोर्ड',
      assignedInspections: 'वाटप झालेल्या स्थळ पाहणी',
      siteBlueprints: 'जागेचे नकाशे व संचिका',
      nonCompliance: 'त्रुटी व सुधारणा नोंदी',
      safetyStandards: 'सुरक्षा मानक नियमावली',
      execDashboard: 'कार्यकारी डॅशबोर्ड',
      stateAnalytics: 'राज्यस्तरीय SLA विश्लेषण',
      allApplications: 'राज्यातील सर्व अर्ज',
      deptStatusMatrix: 'विभागीय स्थिती तक्ता',
      licenceVault: 'परवाना मुख्य दालन',
      workflowConfig: 'कार्यप्रवाह संरचना',
      auditTrail: 'सिस्टम ऑडिट नोंदवही',
      broadcastAlerts: 'प्रसारण सूचना',
      digitalCertificates: 'डिजिटल प्रमाणपत्रे व परवाने',
    },
    breadcrumb: {
      portal: 'पोर्टल',
      dashboard: 'डॅशबोर्ड आढावा',
      applications: 'माझे औद्योगिक अर्ज',
      newApplication: 'नवीन औद्योगिक मंजुरी अर्ज',
      tracking: 'अर्ज मागोवा व SLA कालमर्यादा',
      recommendations: 'स्मार्ट मंजुरी शिफारशी',
      approvals: 'विभागीय परवानग्या व समांतर प्रक्रिया',
      finalApproval: 'अंतिम मंजुरी व अधिकृत प्रमाणपत्र',
      documents: 'कागदपत्र व्यवस्थापन व पडताळणी दालन',
      inspections: 'मध्यवर्ती तपासणी व्यवस्थापन',
      queries: 'विभागीय प्रश्न व खुलासे',
      renewals: 'डिजिटल परवाने व NOC नूतनीकरण',
      analytics: 'राज्य SLA व औद्योगिक विश्लेषण',
      workflowEngine: 'कार्यप्रवाह इंजिन संरचना',
      auditLogs: 'सिस्टम ऑडिट नोंदी',
      help: 'वैधानिक मार्गदर्शक तत्त्वे व मदत',
      notifications: 'केंद्रीय सूचना केंद्र',
    },
    landing: {
      heroBadge: 'अधिकृत शासकीय एकल खिडकी औद्योगिक मंजुरी पोर्टल',
      heroHeadingLine1: 'औद्योगिक मंजुऱ्यांसाठी',
      heroHeadingHighlight: 'एकीकृत डिजिटल व्यासपीठ',
      heroDesc: 'उद्योग सुरू करण्यासाठी आवश्यक सर्व शासकीय परवानग्या एकाच छताखाली—नोंदणी, परवाना शिफारस, कागदपत्र पडताळणी, सर्व विभागांची एकाच वेळी तपासणी, संयुक्त स्थळ पाहणी आणि डिजिटल ना-हरकत प्रमाणपत्र (NOC).',
      startNewApp: 'नवीन अर्ज सुरू करा',
      trackExisting: 'विद्यमान अर्जाची स्थिती तपासा',
      trackInputPlaceholder: 'अर्ज क्रमांक प्रविष्ट करा (उदा. APP-2026-IND-04829)',
      trackBtn: 'स्थिती पहा',
      mockUrl: 'portal.gov.in/single-window/live-status',
      slaActive: '● कालमर्यादा (SLA) सक्रिय',
      inProgress: 'प्रक्रिया सुरू (६८%)',
      approved: '✓ मंजूर',
      inScrutiny: '● छाननी सुरू',
      scheduled: '● पाहणी नियोजित',
      instantNocTitle: 'त्वरित डिजिटल एनओसी व क्यूआर प्रमाणित परवाना',
      instantNocDesc: 'क्रिप्टोग्राफिकली डिजिटल स्वाक्षरी केलेले व सर्व शासकीय विभागांकडून अधिकृत मान्य.',
      metricsUnitsCleared: '४,४८०+',
      metricsUnitsLabel: 'मंजूर औद्योगिक प्रकल्प',
      metricsAvgSla: '१४.८ दिवस',
      metricsSlaLabel: 'सरासरी वैधानिक मंजुरी कालावधी',
      metricsInvestment: '₹३४,५०० कोटी',
      metricsInvestmentLabel: 'सुलभ औद्योगिक गुंतवणूक',
      metricsApprovalRatio: '९२.४%',
      metricsRatioLabel: 'पहिल्या प्रयत्नातील मंजुरी प्रमाण',
      featuresBadge: 'वैधानिक व्यासपीठ रचना',
      featuresHeading: 'वेग, पारदर्शकता आणि कायदेशीर सुरक्षिततेसाठी सज्ज',
      featuresSubheading: 'स्वयंचलित प्रणाली, जोखीम-आधारित संयुक्त तपासणी आणि वेळेत मंजुरीमुळे शासकीय कार्यालयांच्या फेऱ्यांची आवश्यकता नाही.',
      feature1Title: 'एकल खिडकी समांतर मंजुरी',
      feature1Desc: 'कागदपत्रविरहित पद्धतीने एकाच अर्जाद्वारे सर्व संबंधित प्राधिकरणांकडे एकाच वेळी अर्ज पाठवला जातो.',
      feature2Title: 'स्मार्ट मंजुरी शिफारस प्रणाली',
      feature2Desc: 'उद्योगाच्या वर्गीकरणानुसार (लाल/केशरी/हिरवा/पांढरा) आवश्यक असणाऱ्या नेमक्या परवानग्यांचे स्वयंचलित मॅपिंग.',
      feature3Title: 'डिजिटल कागदपत्र लॉकर',
      feature3Desc: 'एकदा कागदपत्रे अपलोड करा, सर्व विभागांना उपलब्ध. मुदत संपण्याची स्वयंचलित सूचना व रीयल-टाइम पडताळणी.',
      feature4Title: 'सर्व विभागांची समांतर छाननी',
      feature4Desc: 'प्रदूषण मंडळ, अग्निशामक दल, कारखाने संचालनालय आणि नगररचना विभागामार्फत एकाच वेळी कठोर कालमर्यादेत तपासणी.',
      feature5Title: 'मध्यवर्ती तपासणी प्रणाली (CIS)',
      feature5Desc: 'संगणकीय पारदर्शक अधिकारी वाटप आणि डिजिटल तपासणी यादीसह जोखीम-आधारित संयुक्त स्थळ पाहणी.',
      feature6Title: 'कायदेशीररीत्या वैध डिजिटल प्रमाणपत्रे',
      feature6Desc: 'डिजिटल स्वाक्षरी आणि क्यूआर कोडसह तत्काळ डाऊनलोड करता येणारे अधिकृत प्रमाणपत्र व परवाने.',
      journeyHeading: '७-टप्प्यांची एकल खिडकी मंजुरी यात्रा',
      journeySubheading: 'प्राथमिक नोंदणीपासून अधिकृत डिजिटल प्रमाणपत्र मिळवण्यापर्यंतचा सुलभ प्रवास.',
      step1Title: 'नोंदणी व प्रोफाइल तयार करणे',
      step1Desc: 'पॅन, जीएसटी आणि अधिकृत स्वाक्षरीकर्ता माहितीद्वारे आपला उद्योग प्रोफाइल तयार करा.',
      step2Title: 'प्रकल्प व जागेची माहिती भरणे',
      step2Desc: 'जागेचे स्थान, प्रस्तावित भांडवली गुंतवणूक, वीज/पाणी भार व उत्पादन क्षेत्राची माहिती द्या.',
      step3Title: 'स्मार्ट शिफारशी व कागदपत्रे अपलोड',
      step3Desc: 'आवश्यक परवानग्यांची यादी मिळवा आणि नकाशे, प्रदूषण नियंत्रण आराखडा ऑनलाइन अपलोड करा.',
      step4Title: 'एका क्लिकवर अर्ज सादर करा',
      step4Desc: 'डिजिटल अधिकृततेसह सर्वसमावेशक औद्योगिक अर्ज ऑनलाइन सादर करा.',
      step5Title: 'विभागांमार्फत समांतर छाननी',
      step5Desc: 'सर्व संबंधित विभाग एकाच वेळी कागदपत्रांची तपासणी करतात व आवश्यक असल्यास खुलासा मागवतात.',
      step6Title: 'संयुक्त स्थळ पाहणी',
      step6Desc: 'अधिकारी प्रमाणित कार्यपद्धतीनुसार जागेवर जाऊन संयुक्त प्रत्यक्ष पडताळणी करतात.',
      step7Title: 'मंजुरी व परवाना डाऊनलोड करा',
      step7Desc: 'आपले एकात्मिक वैधानिक मंजुरी प्रमाणपत्र आणि क्यूआर प्रमाणित डिजिटल एनओसी तत्काळ मिळवा.',
      securityBadge: 'वैधानिक मान्यता व सुरक्षा',
      securityHeading: 'उच्च तंत्रज्ञान सुरक्षा आणि कायदेशीर कालमर्यादेचे संरक्षण',
      securityDesc: 'सर्व कागदपत्रे, डिजिटल स्वाक्षऱ्या आणि तपासणी अहवाल माहिती तंत्रज्ञान कायदा २००० आणि एकल खिडकी कायद्यानुसार कायदेशीररीत्या बांधील आहेत.',
      createAccountBtn: 'उद्योग खाते तयार करा',
      accessOfficerBtn: 'अधिकारी पोर्टलवर जा',
      securityItem1Title: 'AES-256 एन्क्रिप्शन',
      securityItem1Desc: 'संपूर्ण सुरक्षित आणि गोपनीय कागदपत्र साठवणूक व देवाणघेवाण.',
      securityItem2Title: 'पडताळणीयोग्य क्यूआर एनओसी',
      securityItem2Desc: 'क्षेत्रीय अधिकाऱ्यांना त्वरित मोबाईल स्कॅनिंगद्वारे सत्यता तपासण्याची सोय.',
      securityItem3Title: 'कठोर SLA कालमर्यादा',
      securityItem3Desc: 'मुदतीत निर्णय न झाल्यास स्वयंचलित डीम्ड अप्रूव्हल व मुख्य सचिवांकडे नोंद.',
      securityItem4Title: 'राष्ट्रीय NSWS प्रणालीशी संलग्न',
      securityItem4Desc: 'केंद्र सरकारच्या नॅशनल सिंगल विंडो सिस्टमशी थेट एपीआय जोडणी.',
      faqHeading: 'नेहमी विचारले जाणारे प्रश्न (FAQ)',
      faqSubheading: 'एकल खिडकी औद्योगिक मंजुरी प्रक्रियेबाबत सर्व महत्त्वाची माहिती.',
      faq1Q: 'एकल खिडकी औद्योगिक मंजुरी पोर्टल काय आहे?',
      faq1A: 'हा उद्योग सुलभता (Ease of Doing Business) कायद्यान्वये सुरू केलेला एक अधिकृत डिजिटल मंच आहे. याद्वारे शासकीय कार्यालयांच्या चकरा न मारता उद्योगांसाठी वेळेत आणि कागदविरहित परवानग्या दिल्या जातात.',
      faq2Q: 'स्मार्ट मंजुरी शिफारस प्रणाली कशी काम करते?',
      faq2A: 'ही प्रणाली आपल्या उद्योगाचा प्रकार (लाल/केशरी/हिरवा/पांढरा), वीज मागणी (KVA), पाण्याचा वापर (KLD), जागेचे स्थान व प्रक्रिया तपासून नेमक्या कोणत्या कायदेशीर परवानग्या आवश्यक आहेत हे अचूक सांगते.',
      faq3Q: 'एखाद्या विभागाने ठरवून दिलेल्या मुदतीत निर्णय न दिल्यास काय होते?',
      faq3A: 'औद्योगिक सुलभीकरण कायद्यातील ‘डीम्ड अप्रूव्हल’ तरतुदीनुसार, जर विभागाने विहित मुदतीत (उदा. १५ ते ३० दिवस) त्रुटी काढली नाही किंवा मंजुरी दिली नाही, तर अर्ज आपोआप मंजूर मानला जातो.',
      faq4Q: 'मी अर्जाची सद्यस्थिती ऑनलाइन पाहू शकतो का?',
      faq4A: 'होय. पोर्टलवर प्रत्येक विभागाकडील प्रगती रीयल-टाइम दिसते, एसएमएस/ईमेल सूचना मिळतात आणि त्रुटींची पूर्तता ऑनलाइन कागदपत्र जोडून करता येते.',
    },
    dashboard: {
      headerTitle: 'उद्योगपती मंजुरी पोर्टल',
      badgeActive: 'सक्रिय उद्योग घटक',
      welcomeBack: 'पुन्हा स्वागत आहे',
      legalEntity: 'नोंदणीकृत उद्योग संस्था',
      swcId: 'एकल खिडकी ओळख क्रमांक',
      btnTrack: 'मंजुरी स्थिती तपासा',
      btnNewApp: 'नवीन अर्ज सादर करा',
      cardTotalApps: 'एकूण औद्योगिक अर्ज',
      cardApproved: 'मंजूर परवानग्या / NOC',
      cardInScrutiny: 'विभागीय छाननी सुरू',
      cardOpenQueries: 'प्रलंबित प्रश्न (कारवाई आवश्यक)',
      activeApplicationTitle: 'सक्रिय प्रकल्प ठळक माहिती',
      slaCountdown: 'वैधानिक कालमर्यादा (SLA) काउंटडाउन',
      departmentBreakdown: 'विभागनिहाय छाननी स्थिती',
      recentClearances: 'मंजूर डिजिटल प्रमाणपत्रे',
      viewDetails: 'संपूर्ण अर्ज तपशील पहा',
      pendingAction: 'तातडीने कारवाई आवश्यक',
    },
    login: {
      badge: 'अधिकृत वैधानिक प्रवेशद्वार',
      heading: 'आपल्या औद्योगिक खात्यात प्रवेश करा',
      subtitle: 'मंजुरी संचिका हाताळण्यासाठी अधिकृत उद्योजक किंवा शासकीय ओळखपत्र माहिती प्रविष्ट करा.',
      quickDemoHeading: 'त्वरित डेमो भूमिका निवडक',
      emailLabel: 'अधिकृत ईमेल पत्ता / संस्था आयडी',
      passwordLabel: 'सुरक्षित पासवर्ड',
      rememberMe: 'या उपकरणावर लक्षात ठेवा',
      forgotPassword: 'पासवर्ड विसरलात?',
      btnSubmit: 'सुरक्षित पोर्टलवर लॉग इन करा',
      loggingIn: 'प्रमाणीकरण सुरू आहे...',
      noAccount: 'आपल्याकडे उद्योग खाते नाही का?',
      registerNow: 'येथे नवीन व्यवसाय नोंदणी करा',
      govNotice: 'माहिती तंत्रज्ञान कायदा २००० अन्वये अनधिकृत प्रवेश कायदेशीररीत्या गुन्हा आहे.',
    },
    footer: {
      description: 'उद्योग स्थापना व विस्तारासाठी कागदपत्रविरहित परवानग्या देण्यासाठी उद्योग सुलभता कायद्यान्वये स्थापन केलेली वैधानिक एकल खिडकी मंजुरी यंत्रणा.',
      nswsBadge: 'नॅशनल सिंगल विंडो सिस्टीम (NSWS) शी एकात्मिक',
      servicesTitle: 'मंजुरी सेवा',
      service1: 'स्मार्ट मंजुरी शिफारशी',
      service2: 'अर्ज मागोवा व SLA स्थिती',
      service3: 'डिजिटल कागदपत्र लॉकर व पडताळणी',
      service4: 'मध्यवर्ती तपासणी प्रणाली (CIS)',
      service5: 'वार्षिक परवाने व NOC नूतनीकरण',
      bodiesTitle: 'सहभागी शासकीय विभाग',
      body1: 'उद्योग व वाणिज्य संचालनालय',
      body2: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB / SPCB)',
      body3: 'अग्निशामक व आपत्कालीन सेवा',
      body4: 'बाष्पके व कारखाने संचालनालय (DISH)',
      body5: 'नगररचना व नगर नियोजन संचालनालय',
      helpdeskTitle: 'वैधानिक मदत कक्ष',
      tollFree: 'टोल-फ्री हेल्पलाइन: १८००-४२५-४६३८ (सकाळी ९ ते संध्याकाळी ६)',
      email: 'singlewindow-support@gov.ind.in',
      address: 'राज्य औद्योगिक सुविधा केंद्र, उद्योग सचिवालय',
      copyright: '© २०२६ औद्योगिक मंजुरी पोर्टल. एकल खिडकी औद्योगिक मंजुरी प्राधिकरणाद्वारे संचालित.',
      terms: 'सेवा शर्ती',
      privacy: 'गोपनीयता धोरण',
      slaCharter: 'नागरिक व SLA सनद',
      switchLang: 'भाषा निवडा',
    },
    common: {
      back: 'मागे जा',
      next: 'पुढे चला',
      submit: 'सादर करा',
      cancel: 'रद्द करा',
      save: 'मसुदा जतन करा',
      download: 'डाऊनलोड करा',
      search: 'शोधा',
      filter: 'फिल्टर',
      close: 'बंद करा',
      status: 'स्थिती',
      action: 'कार्रवाई',
      view: 'पहा',
      loading: 'लोड होत आहे...',
    },
    certificateAlert: {
      title: 'अनिवार्य प्रमाणपत्र आवश्यक आहे',
      message: 'You have not uploaded the required certificate yet. Please upload the certificate to proceed. Without the certificate, you cannot continue with this process.',
      uploadRequired: 'अनिवार्य प्रमाणपत्र अपलोड केलेले नाही',
      uploadButton: 'आवश्यक प्रमाणपत्र अपलोड करा',
      proceedBlocked: 'पुढे जाण्यासाठी प्रमाणपत्र अपलोड करा',
      certificateName: 'अग्निशामक हायड्रंट लूप व आणीबाणी मार्ग आराखडा (DOC-6)',
      simulateUpload: 'डेमोसाठी त्वरित अपलोड करा',
      dismiss: 'मला समजले',
    },
    checklist: {
      navButton: 'नोंदणी-पूर्व तपासणी सूची',
      heroButton: 'उद्योगनिहाय आवश्यक प्रमाणपत्रे पहा',
      title: 'उद्योगनिहाय वैधानिक नोंदणी व प्रमाणपत्र तपासणी सूची',
      subtitle: 'अर्ज करण्यापूर्वी सर्व आवश्यक वैधानिक प्रमाणपत्रे, तांत्रिक कागदपत्रे, मंजुरी देणारे विभाग व मुदत जाणून घ्या.',
      badge: 'अर्ज करण्यापूर्वी जाणून घ्या',
      selectCategory: 'व्यवसाय अथवा उद्योगाचा प्रकार निवडा',
      statutoryCertificates: 'वैधानिक प्रमाणपत्रे व ना-हरकत (NOC)',
      supportingDocuments: 'तांत्रिक कागदपत्रे व अहवाल',
      mandatoryCount: 'अनिवार्य मंजुऱ्या',
      conditionalCount: 'अटींच्या अधीन / लागू असल्यास',
      issuingAuthority: 'प्रमाणपत्र देणारे प्राधिकरण / विभाग',
      legalAct: 'वैधानिक कायदा / नियमावली',
      sla: 'मंजुरी कालावधी (SLA)',
      days: 'दिवस',
      mandatory: 'अनिवार्य',
      optional: 'अटींच्या अधीन / ऐच्छिक',
      searchPlaceholder: 'प्रमाणपत्राचे नाव, विभाग किंवा कायदा शोधा...',
      allCategories: 'सर्व ७ व्यवसाय प्रकार',
      closeModal: 'तपासणी सूची बंद करा',
    },
    officerModal: {
      title: 'मंजुरी अधिकारी तपशील व अधिकृत व्यवसाय',
      subtitle: 'एकल खिडकी उद्योग सुलभता कायद्यांतर्गत सार्वजनिक पारदर्शकता नोंद',
      officerDetails: 'अधिकारी परिचय व अधिकृत ओळख',
      position: 'अधिकृत पदनाम',
      department: 'संबंधित शासकीय विभाग',
      badgeNumber: 'राजपत्रित अधिकारी ओळख क्रमांक / बिल्ला',
      contact: 'अधिकृत संपर्क',
      jurisdiction: 'विभागीय कार्यालय / कार्यक्षेत्र',
      statsHeading: 'मंजुरी व कामकाज ट्रॅक रेकॉर्ड',
      totalApproved: 'एकूण मंजूर औद्योगिक अर्ज',
      avgSla: 'सरासरी मंजुरी कालावधी',
      approvalRate: 'मंजुरी प्रमाण',
      approvedListTitle: 'या अधिकाऱ्याने मंजूर केलेले व्यवसाय व अर्ज',
      businessName: 'उद्योगाचे / कंपनीचे नाव',
      sectorCategory: 'औद्योगिक क्षेत्र व प्रदूषण वर्ग',
      membersRatio: 'अर्जदार सदस्य / मंजूर सदस्य',
      approvalDate: 'मंजुरीची तारीख',
      certificateNumber: 'वैधानिक प्रमाणपत्र / परवाना क्र.',
      viewOfficerAction: 'अधिकारी माहिती पहा',
    },
    district: {
      selectDistrict: 'जिल्हा निवडा',
      allDistricts: 'सर्व जिल्हे',
      maharashtraDistricts: 'महाराष्ट्र राज्य (सर्व ३६ जिल्हे)',
      nationalHubs: 'प्रमुख राष्ट्रीय औद्योगिक केंद्रे',
      districtLabel: 'जिल्हा',
    },
  },
};
