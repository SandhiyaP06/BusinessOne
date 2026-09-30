import api from './api';

export interface AnalyticsOverview {
  summary: {
    totalApplications: number;
    approved: number;
    underReview: number;
    rejected: number;
    draft: number;
    activeInspections: number;
    totalInvestmentCrores: number;
    totalExpectedEmployment: number;
    avgDisposalDays: number;
    statutorySlaComplianceRate: number;
  };
  departmentBreakdown: {
    departmentId: string;
    departmentName: string;
    shortCode: string;
    mandatedSlaDays: number;
    totalRouted: number;
    approved: number;
    pending: number;
    rejected: number;
    complianceRate: number;
  }[];
}

export const AnalyticsService = {
  async getOverview(): Promise<AnalyticsOverview> {
    const res = await api.get<AnalyticsOverview>('/analytics/overview');
    return res.data;
  }
};

export default AnalyticsService;
