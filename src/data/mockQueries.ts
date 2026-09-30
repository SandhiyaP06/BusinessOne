import { DepartmentQuery } from '../types';

export const mockQueries: DepartmentQuery[] = [
  {
    id: 'QRY-2026-0419',
    applicationId: 'APP-2026-IND-04829',
    businessName: 'AeroTech Propulsion Systems Pvt Ltd',
    department: 'Fire & Emergency Safety Services',
    raisedByOfficer: 'Rajeshwar Patil (Divisional Fire Officer)',
    question: 'Please submit a revised layout of the high-temperature hot-fire testing cell showing 2-hour fire-rated compartmentation barriers and secondary ring main hydrant connection point as per NBC 2016 Part 4 clause 3.4.',
    raisedAt: '2026-03-18 04:15 PM',
    dueDate: '2026-03-25',
    status: 'OPEN'
  },
  {
    id: 'QRY-2026-0382',
    applicationId: 'APP-2026-IND-03911',
    businessName: 'Nexus Bio-Pharma Formulations LLP',
    department: 'State Pollution Control Board',
    raisedByOfficer: 'Dr. Ananya Sen (SPCB)',
    question: 'Provide material balance calculation for organic solvent recovery in lyophilization exhaust stream, along with activated carbon scrubber replacement frequency cycle.',
    raisedAt: '2026-03-01 11:30 AM',
    dueDate: '2026-03-08',
    status: 'RESOLVED',
    response: {
      responseText: 'We have updated the solvent recovery balance report. The secondary chilled brine condenser operates at -25°C achieving 98.4% solvent recovery. Scrubbers use dual beds with automated differential pressure monitoring with replacement scheduled every 45 operational days.',
      respondedAt: '2026-03-04 03:20 PM',
      attachments: ['Lyophilizer_Solvent_Balance_Audit_Report.pdf', 'Activated_Carbon_Bed_SOP.pdf']
    }
  },
  {
    id: 'QRY-2026-0294',
    applicationId: 'APP-2026-IND-06289',
    businessName: 'Kaveri Agro Food Processing Cluster',
    department: 'District Industries Centre (DIC)',
    raisedByOfficer: 'S. Muthuvel',
    question: 'Please attach MSME Udyam Registration Certificate and bank sanction letter for capital subsidy claim under State New Industrial Policy scheme.',
    raisedAt: '2026-03-15 02:00 PM',
    dueDate: '2026-03-22',
    status: 'RESPONDED',
    response: {
      responseText: 'Udyam registration certificate and SBI consortium term loan approval in-principle letter are attached herewith for verification.',
      respondedAt: '2026-03-17 09:30 AM',
      attachments: ['Udyam_Registration_Kaveri_Agro.pdf', 'SBI_Sanction_Letter_TermLoan.pdf']
    }
  }
];
