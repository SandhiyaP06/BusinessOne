export interface DepartmentMetric {
  department: string;
  shortCode: string;
  totalReceived: number;
  approved: number;
  pending: number;
  queriesRaised: number;
  avgTurnaroundDays: number;
  slaComplianceRate: number; // percentage
}

export interface MonthlyTrend {
  month: string;
  received: number;
  approved: number;
  rejected: number;
}

export const mockDepartmentMetrics: DepartmentMetric[] = [
  {
    department: 'Directorate of Industries & Commerce',
    shortCode: 'DIC',
    totalReceived: 1240,
    approved: 1160,
    pending: 58,
    queriesRaised: 182,
    avgTurnaroundDays: 8.4,
    slaComplianceRate: 97.2
  },
  {
    department: 'State Pollution Control Board',
    shortCode: 'SPCB',
    totalReceived: 980,
    approved: 812,
    pending: 124,
    queriesRaised: 310,
    avgTurnaroundDays: 19.8,
    slaComplianceRate: 91.5
  },
  {
    department: 'Fire & Emergency Safety Services',
    shortCode: 'FIRE',
    totalReceived: 890,
    approved: 770,
    pending: 92,
    queriesRaised: 240,
    avgTurnaroundDays: 14.2,
    slaComplianceRate: 94.8
  },
  {
    department: 'Town & Country Planning Authority',
    shortCode: 'TCPA',
    totalReceived: 750,
    approved: 690,
    pending: 45,
    queriesRaised: 95,
    avgTurnaroundDays: 12.1,
    slaComplianceRate: 96.0
  },
  {
    department: 'Directorate of Factories & Boilers',
    shortCode: 'DISH',
    totalReceived: 620,
    approved: 560,
    pending: 48,
    queriesRaised: 110,
    avgTurnaroundDays: 11.5,
    slaComplianceRate: 95.1
  }
];

export const mockMonthlyTrends: MonthlyTrend[] = [
  { month: 'Oct 2025', received: 184, approved: 162, rejected: 12 },
  { month: 'Nov 2025', received: 210, approved: 188, rejected: 14 },
  { month: 'Dec 2025', received: 235, approved: 215, rejected: 9 },
  { month: 'Jan 2026', received: 280, approved: 252, rejected: 16 },
  { month: 'Feb 2026', received: 315, approved: 284, rejected: 18 },
  { month: 'Mar 2026', received: 342, approved: 308, rejected: 11 }
];

export const mockPortalSummary = {
  totalApplications: 4480,
  approvalRate: 92.4, // %
  averageTurnaroundDays: 14.8, // Days
  activeInspections: 128,
  pendingQueries: 64,
  totalCapitalInvestedCrores: 34500, // INR Crores
  totalJobsGenerated: 186400,
  activeEnterprises: 3940
};
