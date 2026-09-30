import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Industrial Approval Portal Database...');

  // Reset database tables
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.renewal.deleteMany();
  await prisma.workflowStage.deleteMany();
  await prisma.approval.deleteMany();
  await prisma.queryResponse.deleteMany();
  await prisma.query.deleteMany();
  await prisma.inspectionResult.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.documentValidation.deleteMany();
  await prisma.document.deleteMany();
  await prisma.applicationDepartment.deleteMany();
  await prisma.application.deleteMany();
  await prisma.approvalRequirement.deleteMany();
  await prisma.business.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();
  await prisma.role.deleteMany();

  // 1. Roles
  const roles = [
    { name: 'ENTREPRENEUR', description: 'Industrial and commercial business applicant' },
    { name: 'DEPARTMENT_OFFICER', description: 'Regulatory department review and scrutiny officer' },
    { name: 'INSPECTOR', description: 'Field safety and environmental on-site auditor' },
    { name: 'ADMIN', description: 'Single window clearance commissioner and administrator' }
  ];

  const roleMap: Record<string, string> = {};
  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      create: r,
      update: { description: r.description }
    });
    roleMap[r.name] = role.id;
  }
  console.log('✓ Roles provisioned:', Object.keys(roleMap));

  // 2. Departments
  const departments = [
    {
      name: 'Directorate of Industries & Commerce',
      code: 'INDUSTRY_DEPARTMENT',
      shortCode: 'DIC',
      description: 'Single-window industrial policy facilitation and capital incentive clearances',
      mandatedSlaDays: 15
    },
    {
      name: 'State Pollution Control Board',
      code: 'POLLUTION_CONTROL_BOARD',
      shortCode: 'SPCB',
      description: 'Statutory air, water, and hazardous waste consents under environmental Acts',
      mandatedSlaDays: 30
    },
    {
      name: 'Fire & Emergency Safety Services',
      code: 'FIRE_DEPARTMENT',
      shortCode: 'FIRE',
      description: 'Life safety, static water reservoir, and hydrant layout clearance',
      mandatedSlaDays: 21
    },
    {
      name: 'Directorate of Factories & Boilers',
      code: 'OTHER_DEPARTMENT',
      shortCode: 'DISH',
      description: 'Machinery safety, occupational health, and steam boiler registrations',
      mandatedSlaDays: 21
    }
  ];

  const deptMap: Record<string, string> = {};
  for (const d of departments) {
    const dept = await prisma.department.upsert({
      where: { code: d.code },
      create: d,
      update: {
        name: d.name,
        shortCode: d.shortCode,
        mandatedSlaDays: d.mandatedSlaDays
      }
    });
    deptMap[d.code] = dept.id;
  }
  console.log('✓ Departments provisioned:', Object.keys(deptMap));

  // 3. Test Users (Default Password: Password@123)
  const passwordHash = await bcrypt.hash('Password@123', 10);

  const users = [
    {
      name: 'Dr. Vikramaditya Rao',
      email: 'entrepreneur@portal.gov.in',
      phone: '+91 98450 82194',
      passwordHash,
      roleId: roleMap.ENTREPRENEUR,
      designation: 'Managing Director & Promoter'
    },
    {
      name: 'S. K. Nambiar',
      email: 'officer@portal.gov.in',
      phone: '+91 98450 11223',
      passwordHash,
      roleId: roleMap.DEPARTMENT_OFFICER,
      designation: 'Joint Director of Industries',
      departmentId: deptMap.INDUSTRY_DEPARTMENT
    },
    {
      name: 'Dr. Ananya Sen',
      email: 'spcb.officer@portal.gov.in',
      phone: '+91 98450 44556',
      passwordHash,
      roleId: roleMap.DEPARTMENT_OFFICER,
      designation: 'Senior Environmental Engineer',
      departmentId: deptMap.POLLUTION_CONTROL_BOARD
    },
    {
      name: 'Rajeshwar Patil',
      email: 'inspector@portal.gov.in',
      phone: '+91 98451 99014',
      passwordHash,
      roleId: roleMap.INSPECTOR,
      designation: 'Divisional Fire Safety Officer & Field Inspector',
      departmentId: deptMap.FIRE_DEPARTMENT
    },
    {
      name: 'Priyanka Sharma, IAS',
      email: 'admin@portal.gov.in',
      phone: '+91 98450 99999',
      passwordHash,
      roleId: roleMap.ADMIN,
      designation: 'State Single Window Clearance Commissioner'
    }
  ];

  const userMap: Record<string, string> = {};
  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      create: u,
      update: {
        name: u.name,
        roleId: u.roleId,
        designation: u.designation,
        departmentId: u.departmentId
      }
    });
    userMap[u.email] = user.id;
  }
  console.log('✓ Test Users provisioned:', Object.keys(userMap));

  // 4. Statutory Approval Requirements
  const approvalRules = [
    {
      approvalName: 'Single Window Industrial Clearance',
      departmentId: deptMap.INDUSTRY_DEPARTMENT,
      industryType: 'ALL',
      category: 'ALL',
      description: 'Statutory single window consolidated filing in-principle clearance',
      legalAct: 'State Industrial Policy & Facilitation Act',
      requiredDocuments: JSON.stringify(['Certificate of Incorporation / MoA', 'Registered Land Possession Deed', 'Detailed Project Report (DPR)']),
      isMandatory: true
    },
    {
      approvalName: 'Consent to Establish (CTE) - Orange/Red Category',
      departmentId: deptMap.POLLUTION_CONTROL_BOARD,
      industryType: 'ALL',
      category: 'ORANGE',
      minWaterKLD: 10,
      description: 'Water and air pollution prevention and abatement clearance',
      legalAct: 'Water (Prevention and Control of Pollution) Act 1974 & Air Act 1981',
      requiredDocuments: JSON.stringify(['Effluent Treatment Scheme (ETP)', 'Stack Height Emission Model', 'Solid Waste Agreement']),
      isMandatory: true
    },
    {
      approvalName: 'Pre-Construction Fire Safety Clearance (Fire NOC)',
      departmentId: deptMap.FIRE_DEPARTMENT,
      industryType: 'ALL',
      category: 'ALL',
      description: 'Fire hazard prevention, static reservoir, and evacuation routes clearance',
      legalAct: 'National Building Code 2016 Part 4',
      requiredDocuments: JSON.stringify(['Hydrant Layout Plan', 'Static Water Reservoir Spec', 'Evacuation Route Analysis']),
      isMandatory: true
    },
    {
      approvalName: 'Factory Building Plan Approval & Initial Licence',
      departmentId: deptMap.OTHER_DEPARTMENT,
      industryType: 'ALL',
      minEmployment: 20,
      description: 'Occupational safety and machinery layout approval',
      legalAct: 'The Factories Act 1948 - Section 6',
      requiredDocuments: JSON.stringify(['Factory Machine Layout', 'Process Flowchart', 'Ventilation Certificate']),
      isMandatory: true
    }
  ];

  await prisma.approvalRequirement.deleteMany({});
  for (const rule of approvalRules) {
    await prisma.approvalRequirement.create({ data: rule });
  }
  console.log(`✓ Seeded ${approvalRules.length} Approval Requirements`);

  // 5. Sample Business
  const business = await prisma.business.create({
    data: {
      userId: userMap['entrepreneur@portal.gov.in'],
      businessName: 'AeroTech Propulsion Systems Pvt Ltd',
      businessType: 'Private Limited Company',
      industryType: 'Aerospace & Precision Heavy Engineering',
      businessStage: 'Proposed',
      projectSize: 'LARGE',
      panNumber: 'AAACA9812G',
      gstin: '29AAACA9812G1Z5',
      location: 'Plot 42-A, Aerospace SEZ, Phase II',
      district: 'Bengaluru Rural',
      state: 'Karnataka',
      pincode: '562149',
      description: 'Establishment of high-precision turbine casing fabrication and testing unit with zero-liquid discharge facility.'
    }
  });

  // 6. Sample Application (Under Parallel Review)
  const app1 = await prisma.application.create({
    data: {
      applicationNumber: 'APP-2026-IND-04829',
      businessId: business.id,
      applicationType: 'COMPOSITE_CLEARANCE',
      status: 'UNDER_REVIEW',
      currentStage: 'PARALLEL_DEPARTMENT_REVIEW',
      category: 'ORANGE',
      investmentInLakhs: 4850.00,
      expectedEmployment: 320,
      landAreaAcres: 5.5,
      powerLoadKVA: 1250,
      waterLoadKLD: 85,
      hasBoiler: true,
      hasHazardousChem: false,
      submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
    }
  });

  // Parallel department routing links
  await prisma.applicationDepartment.createMany({
    data: [
      {
        applicationId: app1.id,
        departmentId: deptMap.INDUSTRY_DEPARTMENT,
        assignedOfficerId: userMap['officer@portal.gov.in'],
        status: 'APPROVED',
        remarks: 'All land allotment and capital investment credentials approved',
        nocCertificateNo: 'DIC/2026/IND-CLR-0941'
      },
      {
        applicationId: app1.id,
        departmentId: deptMap.POLLUTION_CONTROL_BOARD,
        assignedOfficerId: userMap['spcb.officer@portal.gov.in'],
        status: 'IN_REVIEW',
        remarks: 'Zero liquid discharge schematics under scrutiny'
      },
      {
        applicationId: app1.id,
        departmentId: deptMap.FIRE_DEPARTMENT,
        assignedOfficerId: userMap['inspector@portal.gov.in'],
        status: 'QUERY',
        remarks: 'Clarification required on secondary pressurized hydrant ring'
      }
    ]
  });

  // Sample Documents
  await prisma.document.createMany({
    data: [
      {
        applicationId: app1.id,
        documentType: 'LEGAL',
        name: 'Certificate of Incorporation & MoA',
        fileName: 'AeroTech_COI_MoA_Certified.pdf',
        mimeType: 'application/pdf',
        fileSize: 3500000,
        uploadedById: userMap['entrepreneur@portal.gov.in'],
        status: 'VERIFIED'
      },
      {
        applicationId: app1.id,
        documentType: 'ENVIRONMENTAL',
        name: 'Effluent Treatment Plant (ETP) Engineering Drawing',
        fileName: 'ETP_ZLD_Schematic_Drawing.pdf',
        mimeType: 'application/pdf',
        fileSize: 8900000,
        uploadedById: userMap['entrepreneur@portal.gov.in'],
        status: 'UNDER_VALIDATION'
      }
    ]
  });

  // Sample Query
  const query = await prisma.query.create({
    data: {
      applicationId: app1.id,
      departmentId: deptMap.FIRE_DEPARTMENT,
      raisedById: userMap['inspector@portal.gov.in'],
      queryText: 'Please submit a revised layout of the high-temperature hot-fire testing cell showing 2-hour fire-rated compartmentation barriers and secondary ring main hydrant connection point as per NBC 2016 Part 4 clause 3.4.',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'OPEN'
    }
  });

  // Sample Notification
  await prisma.notification.create({
    data: {
      userId: userMap['entrepreneur@portal.gov.in'],
      applicationId: app1.id,
      type: 'QUERY',
      title: 'Department Query Raised',
      message: 'Fire & Emergency Safety Services raised a statutory query on Docket APP-2026-IND-04829.'
    }
  });

  // Sample Inspection
  await prisma.inspection.create({
    data: {
      applicationId: app1.id,
      departmentId: deptMap.FIRE_DEPARTMENT,
      inspectorId: userMap['inspector@portal.gov.in'],
      scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      location: 'Plot 42-A, Aerospace SEZ, Phase II, Bengaluru',
      status: 'SCHEDULED',
      remarks: 'Joint site inspection for hydrant network calibration and static water reservoir'
    }
  });

  // Sample Completed Application with Digital Licence (Solaria Clean Energy)
  const business2 = await prisma.business.create({
    data: {
      userId: userMap['entrepreneur@portal.gov.in'],
      businessName: 'Solaria Clean Energy Equipment Manufacturing',
      businessType: 'Public Limited Company',
      industryType: 'Renewable Energy & Solar PV Module Assembly',
      businessStage: 'Operational',
      projectSize: 'LARGE',
      panNumber: 'AAECS7109M',
      gstin: '24AAECS7109M1ZX',
      location: 'Plot 7 to 10, Green Energy Mega Park',
      district: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382110',
      description: 'Semi-automated 500 MW TOPCon solar photovoltaic module assembly plant.'
    }
  });

  const app2 = await prisma.application.create({
    data: {
      applicationNumber: 'APP-2026-IND-05102',
      businessId: business2.id,
      applicationType: 'COMPOSITE_CLEARANCE',
      status: 'APPROVED',
      currentStage: 'APPROVED',
      category: 'GREEN',
      investmentInLakhs: 8900.00,
      expectedEmployment: 450,
      submittedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    }
  });

  const licenceNumber = 'IND/SWC/2026/004821-KRN';
  await prisma.renewal.create({
    data: {
      applicationId: app2.id,
      licenceNumber,
      licenceName: 'Consolidated Single Window Operating Clearance',
      issueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      expiryDate: new Date(Date.now() + 1080 * 24 * 60 * 60 * 1000),
      renewalStatus: 'ACTIVE'
    }
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
