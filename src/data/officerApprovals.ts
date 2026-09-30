export interface ApprovedApplicationRecord {
  applicationId: string;
  businessName: string;
  sector: string;
  category: string;
  district: string;
  approvalDate: string;
  certificateNo: string;
  membersApplied: number;
  membersApproved: number;
  investmentInLakhs: number;
}

export interface OfficerProfile {
  id: string;
  name: string;
  position: string;
  positionHi: string;
  positionMr: string;
  department: string;
  departmentHi: string;
  departmentMr: string;
  badgeNumber: string;
  email: string;
  phone: string;
  officeLocation: string;
  totalApproved: number;
  totalReviewed: number;
  avgSlaDays: number;
  rating: number;
  approvedBusinesses: ApprovedApplicationRecord[];
}

export const OFFICER_PROFILES: OfficerProfile[] = [
  {
    id: 'OFF-01',
    name: 'S. K. Nambiar',
    position: 'Joint Director of Industries & Commerce',
    positionHi: 'संयुक्त निदेशक, उद्योग एवं वाणिज्य',
    positionMr: 'सहसंचालक, उद्योग व वाणिज्य संचालनालय',
    department: 'Directorate of Industries & Commerce',
    departmentHi: 'उद्योग एवं वाणिज्य निदेशालय',
    departmentMr: 'उद्योग व वाणिज्य संचालनालय',
    badgeNumber: 'DIC-GOV-IND-4081',
    email: 'sk.nambiar@gov.ind.in',
    phone: '+91 22 2202 4811',
    officeLocation: 'State Industrial Secretariat, Nariman Point, Mumbai',
    totalApproved: 184,
    totalReviewed: 196,
    avgSlaDays: 7.8,
    rating: 4.9,
    approvedBusinesses: [
      {
        applicationId: 'APP-2026-IND-04829',
        businessName: 'AeroTech Propulsion Systems Pvt Ltd',
        sector: 'Aerospace & Precision Heavy Engineering',
        category: 'ORANGE',
        district: 'Bengaluru Rural',
        approvalDate: '10 Mar 2026',
        certificateNo: 'DIC/2026/IND-CLR-0941',
        membersApplied: 4,
        membersApproved: 4,
        investmentInLakhs: 4850.00
      },
      {
        applicationId: 'APP-2026-IND-04910',
        businessName: 'Bharat Precision Gears & Automation Ltd',
        sector: 'Automotive & Heavy Transmission',
        category: 'ORANGE',
        district: 'Pune',
        approvalDate: '24 Feb 2026',
        certificateNo: 'DIC/2026/IND-CLR-0887',
        membersApplied: 3,
        membersApproved: 3,
        investmentInLakhs: 3200.00
      },
      {
        applicationId: 'APP-2026-IND-05044',
        businessName: 'Sahyadri Specialty Agro-Chemicals Pvt Ltd',
        sector: 'Agro-Chemicals & Bio-Fertilizers',
        category: 'RED',
        district: 'Nashik',
        approvalDate: '18 Jan 2026',
        certificateNo: 'DIC/2026/IND-CLR-0742',
        membersApplied: 5,
        membersApproved: 5,
        investmentInLakhs: 6500.00
      },
      {
        applicationId: 'APP-2026-IND-05188',
        businessName: 'Konkan Coastal Cold Storage & Seafoods',
        sector: 'Food Processing & Marine Exports',
        category: 'GREEN',
        district: 'Ratnagiri',
        approvalDate: '05 Jan 2026',
        certificateNo: 'DIC/2026/IND-CLR-0691',
        membersApplied: 2,
        membersApproved: 2,
        investmentInLakhs: 1450.00
      }
    ]
  },
  {
    id: 'OFF-02',
    name: 'Dr. Ananya Sen',
    position: 'Senior Environmental Engineer',
    positionHi: 'वरिष्ठ पर्यावरण अभियंता',
    positionMr: 'वरिष्ठ पर्यावरण अभियंता',
    department: 'State Pollution Control Board (Consent Directorate)',
    departmentHi: 'राज्य प्रदूषण नियंत्रण बोर्ड (सहमति प्रभाग)',
    departmentMr: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (संमती विभाग)',
    badgeNumber: 'PCB-ENV-SCI-2049',
    email: 'ananya.sen@spcb.gov.in',
    phone: '+91 22 2401 0706',
    officeLocation: 'Kalpataru Point, Sion Circle, Mumbai',
    totalApproved: 142,
    totalReviewed: 165,
    avgSlaDays: 14.2,
    rating: 4.8,
    approvedBusinesses: [
      {
        applicationId: 'APP-2026-IND-03819',
        businessName: 'GreenTech Polymer Composites India',
        sector: 'Recycled Polymers & High-Performance Resins',
        category: 'ORANGE',
        district: 'Thane',
        approvalDate: '14 Feb 2026',
        certificateNo: 'SPCB/CTE/2026/WTR-AIR-391',
        membersApplied: 3,
        membersApproved: 3,
        investmentInLakhs: 2900.00
      },
      {
        applicationId: 'APP-2026-IND-04102',
        businessName: 'Vidarbha Bio-Refineries & Distilleries',
        sector: 'Bio-Fuels & Ethanol Fermentation',
        category: 'RED',
        district: 'Nagpur',
        approvalDate: '02 Feb 2026',
        certificateNo: 'SPCB/CTE/2026/WTR-AIR-318',
        membersApplied: 6,
        membersApproved: 6,
        investmentInLakhs: 8400.00
      },
      {
        applicationId: 'APP-2026-IND-04829',
        businessName: 'AeroTech Propulsion Systems Pvt Ltd',
        sector: 'Aerospace & Precision Heavy Engineering',
        category: 'ORANGE',
        district: 'Bengaluru Rural',
        approvalDate: '17 Mar 2026',
        certificateNo: 'SPCB/CTE/2026/WTR-AIR-420',
        membersApplied: 4,
        membersApproved: 4,
        investmentInLakhs: 4850.00
      }
    ]
  },
  {
    id: 'OFF-03',
    name: 'Rajesh Varma',
    position: 'Chief Fire Officer & Statutory Inspector',
    positionHi: 'मुख्य अग्निशमन अधिकारी एवं वैधानिक निरीक्षक',
    positionMr: 'मुख्य अग्निशामक अधिकारी व वैधानिक तपासणी अधिकारी',
    department: 'Fire & Emergency Safety Services',
    departmentHi: 'अग्निशमन एवं आपातकालीन सुरक्षा सेवाएं',
    departmentMr: 'अग्निशामक व आपत्कालीन सुरक्षा सेवा संचालनालय',
    badgeNumber: 'FIRE-MAH-CFO-1102',
    email: 'r.varma@fireservices.gov.in',
    phone: '+91 22 2307 6111',
    officeLocation: 'State Command Fire Control Centre, Byculla, Mumbai',
    totalApproved: 220,
    totalReviewed: 235,
    avgSlaDays: 9.1,
    rating: 4.9,
    approvedBusinesses: [
      {
        applicationId: 'APP-2026-IND-04829',
        businessName: 'AeroTech Propulsion Systems Pvt Ltd',
        sector: 'Aerospace & Precision Heavy Engineering',
        category: 'ORANGE',
        district: 'Bengaluru Rural',
        approvalDate: '12 Mar 2026',
        certificateNo: 'FIRE-NOC/2026/IND-ZONE-881',
        membersApplied: 4,
        membersApproved: 4,
        investmentInLakhs: 4850.00
      },
      {
        applicationId: 'APP-2026-IND-04721',
        businessName: 'Pinnacle Mega Logistics & Industrial Park',
        sector: 'Warehousing & Multimodal Logistics',
        category: 'WHITE',
        district: 'Palghar',
        approvalDate: '28 Feb 2026',
        certificateNo: 'FIRE-NOC/2026/IND-ZONE-794',
        membersApplied: 3,
        membersApproved: 3,
        investmentInLakhs: 5600.00
      },
      {
        applicationId: 'APP-2026-IND-04332',
        businessName: 'Chhatrapati Sambhajinagar Auto Cluster',
        sector: 'Automobile Ancillaries & Die Casting',
        category: 'ORANGE',
        district: 'Chhatrapati Sambhajinagar',
        approvalDate: '19 Jan 2026',
        certificateNo: 'FIRE-NOC/2026/IND-ZONE-641',
        membersApplied: 4,
        membersApproved: 4,
        investmentInLakhs: 3950.00
      }
    ]
  },
  {
    id: 'OFF-04',
    name: 'V. P. Deshmukh',
    position: 'Joint Director of Industrial Safety & Health (DISH)',
    positionHi: 'संयुक्त निदेशक, औद्योगिक सुरक्षा एवं स्वास्थ्य (DISH)',
    positionMr: 'सहसंचालक, औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH)',
    department: 'Directorate of Industrial Safety & Health (DISH)',
    departmentHi: 'औद्योगिक सुरक्षा एवं स्वास्थ्य निदेशालय (DISH)',
    departmentMr: 'बाष्पके व कारखाने संचालनालय (DISH)',
    badgeNumber: 'DISH-FACT-LIC-7729',
    email: 'vp.deshmukh@dish.gov.in',
    phone: '+91 22 2655 4239',
    officeLocation: 'Bandra-Kurla Complex (BKC), Mumbai',
    totalApproved: 168,
    totalReviewed: 182,
    avgSlaDays: 11.5,
    rating: 4.8,
    approvedBusinesses: [
      {
        applicationId: 'APP-2026-IND-04829',
        businessName: 'AeroTech Propulsion Systems Pvt Ltd',
        sector: 'Aerospace & Precision Heavy Engineering',
        category: 'ORANGE',
        district: 'Bengaluru Rural',
        approvalDate: '15 Mar 2026',
        certificateNo: 'DISH/2026/FACT-REG-4402',
        membersApplied: 4,
        membersApproved: 4,
        investmentInLakhs: 4850.00
      },
      {
        applicationId: 'APP-2026-IND-03991',
        businessName: 'Deccan Heavy Forgings & Alloy Works',
        sector: 'Metals & Hot Rolling Mills',
        category: 'RED',
        district: 'Kolhapur',
        approvalDate: '10 Feb 2026',
        certificateNo: 'DISH/2026/FACT-REG-3982',
        membersApplied: 5,
        membersApproved: 5,
        investmentInLakhs: 4200.00
      }
    ]
  }
];

export const getOfficerByNameOrCode = (query: string): OfficerProfile | undefined => {
  const q = query.toLowerCase();
  return OFFICER_PROFILES.find(o => 
    o.name.toLowerCase().includes(q) || 
    q.includes(o.name.toLowerCase()) || 
    o.id.toLowerCase() === q
  ) || OFFICER_PROFILES[0];
};
