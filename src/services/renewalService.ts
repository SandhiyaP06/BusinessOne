import api from './api';

export interface RenewalItem {
  id: string;
  applicationId: string;
  licenceNumber: string;
  licenceName: string;
  issueDate: string;
  expiryDate: string;
  renewalStatus: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'RENEWAL_SUBMITTED' | 'RENEWED';
  renewedAt?: string;
  createdAt: string;
  application?: {
    id: string;
    applicationNumber: string;
    category: string;
    business?: {
      businessName: string;
      location: string;
    };
  };
}

export const RenewalService = {
  async getAll(): Promise<RenewalItem[]> {
    const res = await api.get<RenewalItem[]>('/renewals');
    return res.data;
  },

  async renew(applicationId: string): Promise<any> {
    const res = await api.post(`/renewals/${applicationId}/renew`);
    return res.data;
  }
};

export default RenewalService;
