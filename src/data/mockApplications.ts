import { Application } from '../types';

export const mockApplications: Application[] = [
  {
    id: 'APP-2026-IND-04829',
    businessName: 'AeroTech Propulsion Systems Pvt Ltd',
    enterpriseType: 'LARGE',
    category: 'ORANGE',
    sector: 'Aerospace & Precision Heavy Engineering',
    projectDescription: 'Establishment of high-precision turbine casing fabrication and testing unit with zero-liquid discharge facility.',
    investmentInLakhs: 4850.00,
    expectedEmployment: 320,
    proposedLocation: {
      address: 'Plot 42-A, Aerospace SEZ, Phase II',
      plotNo: '42-A',
      industrialArea: 'Aerospace & Defence Hub',
      district: 'Bengaluru Rural',
      state: 'Karnataka',
      pincode: '562149',
      landAreaAcres: 5.5,
      powerRequirementKVA: 1250,
      waterRequirementKLD: 85
    },
    contactPerson: {
      name: 'Dr. Vikramaditya Rao',
      designation: 'Managing Director & Promotor',
      mobile: '+91 98450 82194',
      email: 'v.rao@aerotech-propulsion.com',
      panNumber: 'AAACA9812G',
      gstin: '29AAACA9812G1Z5'
    },
    currentStage: 'PARALLEL_DEPARTMENT_REVIEW',
    stageProgress: 68,
    membersApplied: 4,
    membersApproved: 4,
    submittedAt: '2026-03-04 10:30 AM',
    lastUpdatedAt: '2026-03-18 04:15 PM',
    departments: [
      {
        departmentId: 'DEPT-IND',
        departmentName: 'Directorate of Industries & Commerce',
        shortCode: 'DIC',
        status: 'APPROVED',
        assignedOfficer: 'S. K. Nambiar (Joint Director)',
        submittedDate: '2026-03-04',
        lastUpdated: '2026-03-10',
        slaDays: 15,
        remainingDays: 0,
        approvalCertificateNo: 'DIC/2026/IND-CLR-0941'
      },
      {
        departmentId: 'DEPT-PCB',
        departmentName: 'State Pollution Control Board (Consent To Establish)',
        shortCode: 'SPCB',
        status: 'UNDER_REVIEW',
        assignedOfficer: 'Dr. Ananya Sen (Sr. Environmental Engineer)',
        submittedDate: '2026-03-04',
        lastUpdated: '2026-03-17',
        slaDays: 30,
        remainingDays: 12
      },
      {
        departmentId: 'DEPT-FIRE',
        departmentName: 'Fire & Emergency Safety Services',
        shortCode: 'FIRE',
        status: 'QUERY_RAISED',
        assignedOfficer: 'Rajeshwar Patil (Divisional Fire Officer)',
        submittedDate: '2026-03-04',
        lastUpdated: '2026-03-18',
        slaDays: 21,
        remainingDays: 7,
        remarks: 'Clarification required regarding secondary pressurized hydrant loop layout in high-temperature testing bay.'
      },
      {
        departmentId: 'DEPT-TCP',
        departmentName: 'Town & Country Planning Authority',
        shortCode: 'TCPA',
        status: 'APPROVED',
        assignedOfficer: 'Meera Deshmukh (Chief Town Planner)',
        submittedDate: '2026-03-04',
        lastUpdated: '2026-03-12',
        slaDays: 21,
        remainingDays: 0,
        approvalCertificateNo: 'TCPA/BP/2026/0411'
      }
    ],
    applicableApprovals: [
      {
        id: 'APP-REQ-1',
        name: 'Factory Licence & Building Plan Approval',
        department: 'Directorate of Factories & Boilers',
        mandatory: true,
        legalAct: 'The Factories Act, 1948 - Section 6',
        reason: 'Required for premises engaging more than 20 workers with power machinery.',
        requiredDocuments: ['Approved Factory Layout', 'Process Flowchart', 'Machine Layout Plan'],
        status: 'CLEARED'
      },
      {
        id: 'APP-REQ-2',
        name: 'Consent to Establish (CTE - Orange Category)',
        department: 'State Pollution Control Board',
        mandatory: true,
        legalAct: 'Water Act 1974 & Air Act 1981',
        reason: 'Required for metal treatment, surface cleaning and precision machining operations.',
        requiredDocuments: ['ETP/STP Scheme Drawings', 'Environmental Management Plan', 'Solid Waste Disposal Agreement'],
        status: 'PENDING'
      },
      {
        id: 'APP-REQ-3',
        name: 'Fire Safety Clearance Certificate (Pre-Construction NOC)',
        department: 'Fire and Emergency Services',
        mandatory: true,
        legalAct: 'National Building Code (NBC) 2016 Part 4',
        reason: 'Industrial occupancy classification exceeding 15 meters in height or handling volatile solvents.',
        requiredDocuments: ['Hydrant Layout Diagram', 'Fire Escape Evacuation Route', 'Underground Static Water Tank Specifications'],
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'APP-2026-IND-03911',
    businessName: 'Nexus Bio-Pharma Formulations LLP',
    enterpriseType: 'MEDIUM',
    category: 'RED',
    sector: 'Active Pharmaceutical Ingredients & Sterile Injectables',
    projectDescription: 'Advanced sterile packaging and lyophilization facility with dedicated classified cleanrooms ISO Class 5.',
    investmentInLakhs: 2450.00,
    expectedEmployment: 180,
    proposedLocation: {
      address: 'Plot 18/B, Pharma City Phase III',
      plotNo: '18/B',
      industrialArea: 'Pharma Innovation Corridor',
      district: 'Hyderabad Industrial Zone',
      state: 'Telangana',
      pincode: '500081',
      landAreaAcres: 3.2,
      powerRequirementKVA: 800,
      waterRequirementKLD: 120
    },
    contactPerson: {
      name: 'Sunita Reddy',
      designation: 'Director of Regulatory Affairs',
      mobile: '+91 94401 22891',
      email: 's.reddy@nexusbiopharma.in',
      panNumber: 'AAGFN4412B',
      gstin: '36AAGFN4412B1Z8'
    },
    currentStage: 'INSPECTION',
    stageProgress: 82,
    membersApplied: 3,
    membersApproved: 2,
    submittedAt: '2026-02-12 09:15 AM',
    lastUpdatedAt: '2026-03-19 11:45 AM',
    departments: [
      {
        departmentId: 'DEPT-IND',
        departmentName: 'Directorate of Industries',
        shortCode: 'DIC',
        status: 'APPROVED',
        assignedOfficer: 'K. V. Subbarao',
        submittedDate: '2026-02-12',
        lastUpdated: '2026-02-20',
        slaDays: 15,
        remainingDays: 0,
        approvalCertificateNo: 'TS/DIC/2026/0281'
      },
      {
        departmentId: 'DEPT-PCB',
        departmentName: 'Pollution Control Board',
        shortCode: 'SPCB',
        status: 'INSPECTION_SCHEDULED',
        assignedOfficer: 'V. Ramachandran (Senior Inspector)',
        submittedDate: '2026-02-12',
        lastUpdated: '2026-03-19',
        slaDays: 30,
        remainingDays: 4
      },
      {
        departmentId: 'DEPT-FIRE',
        departmentName: 'Fire Safety Services',
        shortCode: 'FIRE',
        status: 'APPROVED',
        assignedOfficer: 'Capt. M. D. Sheikh',
        submittedDate: '2026-02-12',
        lastUpdated: '2026-03-01',
        slaDays: 21,
        remainingDays: 0,
        approvalCertificateNo: 'FIRE/NOC/2026/8821'
      }
    ],
    applicableApprovals: [
      {
        id: 'APP-REQ-4',
        name: 'Drugs & Cosmetics Manufacturing Licence',
        department: 'State Drug Control Administration',
        mandatory: true,
        legalAct: 'Drugs and Cosmetics Act, 1940 - Schedule M',
        reason: 'Mandatory for commercial formulation of sterile pharmaceutical injectable dosage forms.',
        requiredDocuments: ['HVAC Qualification Report', 'Site Master File', 'Water System Validation Matrix'],
        status: 'PENDING'
      }
    ]
  },
  {
    id: 'APP-2026-IND-05102',
    businessName: 'Solaria Clean Energy Equipment Manufacturing',
    enterpriseType: 'LARGE',
    category: 'GREEN',
    sector: 'Renewable Energy & Solar PV Module Assembly',
    projectDescription: 'Semi-automated 500 MW TOPCon solar photovoltaic module assembly plant with robotic automated optical inspection.',
    investmentInLakhs: 8900.00,
    expectedEmployment: 450,
    proposedLocation: {
      address: 'Plot 7 to 10, Green Energy Mega Park',
      plotNo: '7-10',
      industrialArea: 'Solar Tech Park',
      district: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382110',
      landAreaAcres: 12.0,
      powerRequirementKVA: 3500,
      waterRequirementKLD: 40
    },
    contactPerson: {
      name: 'Harishbhai Patel',
      designation: 'Chief Operations Officer',
      mobile: '+91 98251 77319',
      email: 'harish.patel@solariaenergy.com',
      panNumber: 'AAECS7109M',
      gstin: '24AAECS7109M1ZX'
    },
    currentStage: 'APPROVED',
    stageProgress: 100,
    membersApplied: 6,
    membersApproved: 6,
    submittedAt: '2026-01-10 11:00 AM',
    lastUpdatedAt: '2026-02-28 03:30 PM',
    departments: [
      {
        departmentId: 'DEPT-IND',
        departmentName: 'Industries Commissionerate',
        shortCode: 'DIC',
        status: 'APPROVED',
        assignedOfficer: 'Bhavesh Trivedi',
        submittedDate: '2026-01-10',
        lastUpdated: '2026-01-22',
        slaDays: 15,
        remainingDays: 0,
        approvalCertificateNo: 'GUJ/IND/2026/CLR-1049'
      },
      {
        departmentId: 'DEPT-PCB',
        departmentName: 'Pollution Control Board (Green Category Clearance)',
        shortCode: 'SPCB',
        status: 'APPROVED',
        assignedOfficer: 'Pooja Mehta',
        submittedDate: '2026-01-10',
        lastUpdated: '2026-02-05',
        slaDays: 20,
        remainingDays: 0,
        approvalCertificateNo: 'GPCB/CTE/GREEN/2026/0491'
      },
      {
        departmentId: 'DEPT-FIRE',
        departmentName: 'Fire Department',
        shortCode: 'FIRE',
        status: 'APPROVED',
        assignedOfficer: 'D. N. Solanki',
        submittedDate: '2026-01-10',
        lastUpdated: '2026-01-28',
        slaDays: 21,
        remainingDays: 0,
        approvalCertificateNo: 'FIRE/NOC/2026/1932'
      },
      {
        departmentId: 'DEPT-POWER',
        departmentName: 'Electricity Transmission & Distribution Corp',
        shortCode: 'DISCOM',
        status: 'APPROVED',
        assignedOfficer: 'Kamlesh Varma',
        submittedDate: '2026-01-10',
        lastUpdated: '2026-02-18',
        slaDays: 30,
        remainingDays: 0,
        approvalCertificateNo: 'DISCOM/HT/2026/0994'
      }
    ],
    applicableApprovals: [
      {
        id: 'APP-REQ-5',
        name: 'Single Window Consolidated Industrial Clearance',
        department: 'State Industrial Development Board',
        mandatory: true,
        legalAct: 'Industrial Policy & Facilitation Act',
        reason: 'Consolidated statutory single-window operating permit.',
        requiredDocuments: ['All Clearance NOCs', 'Security Deposit Receipt'],
        status: 'CLEARED'
      }
    ]
  },
  {
    id: 'APP-2026-IND-06289',
    businessName: 'Kaveri Agro Food Processing Cluster',
    enterpriseType: 'SMALL',
    category: 'GREEN',
    sector: 'Agro & Food Processing (Grain Milling & Cold Storage)',
    projectDescription: 'Integrated automatic grain grading, optical sorting, and multi-chamber controlled atmosphere cold storage.',
    investmentInLakhs: 820.00,
    expectedEmployment: 65,
    proposedLocation: {
      address: 'Survey 104, Kaveri Industrial Estate',
      plotNo: 'Plot 12',
      industrialArea: 'Agro Industrial Corridor',
      district: 'Thanjavur',
      state: 'Tamil Nadu',
      pincode: '613001',
      landAreaAcres: 2.1,
      powerRequirementKVA: 350,
      waterRequirementKLD: 25
    },
    contactPerson: {
      name: 'K. Balasubramanian',
      designation: 'Managing Partner',
      mobile: '+91 97890 33100',
      email: 'bala@kaveri-agro.com',
      panNumber: 'ABKPB1290K',
      gstin: '33ABKPB1290K1ZY'
    },
    currentStage: 'SCRUTINY',
    stageProgress: 35,
    membersApplied: 2,
    membersApproved: 0,
    submittedAt: '2026-03-14 02:40 PM',
    lastUpdatedAt: '2026-03-17 10:00 AM',
    departments: [
      {
        departmentId: 'DEPT-IND',
        departmentName: 'District Industries Centre',
        shortCode: 'DIC',
        status: 'UNDER_REVIEW',
        assignedOfficer: 'S. Muthuvel',
        submittedDate: '2026-03-14',
        lastUpdated: '2026-03-17',
        slaDays: 15,
        remainingDays: 11
      },
      {
        departmentId: 'DEPT-PCB',
        departmentName: 'Pollution Control Board',
        shortCode: 'SPCB',
        status: 'ASSIGNED',
        assignedOfficer: 'T. Revathi',
        submittedDate: '2026-03-14',
        lastUpdated: '2026-03-15',
        slaDays: 21,
        remainingDays: 17
      }
    ],
    applicableApprovals: [
      {
        id: 'APP-REQ-6',
        name: 'FSSAI Central Manufacturing Licence',
        department: 'Food Safety and Standards Authority of India',
        mandatory: true,
        legalAct: 'Food Safety and Standards Act, 2006',
        reason: 'Mandatory for food grain milling exceeding 10 MT per day capacity.',
        requiredDocuments: ['Food Safety Management System Plan', 'Water Potability Test Certificate'],
        status: 'PENDING'
      }
    ]
  }
];
