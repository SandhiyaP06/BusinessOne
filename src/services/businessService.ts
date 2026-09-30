import api from './api';

export interface BusinessEntity {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  industryType: string;
  businessStage?: string;
  projectSize: string;
  panNumber?: string;
  gstin?: string;
  location: string;
  district: string;
  state: string;
  pincode: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBusinessDto {
  businessName: string;
  businessType: string;
  industryType: string;
  businessStage?: string;
  projectSize: string;
  panNumber?: string;
  gstin?: string;
  location: string;
  district: string;
  state: string;
  pincode: string;
  description?: string;
}

export const BusinessService = {
  async getAll(): Promise<BusinessEntity[]> {
    const res = await api.get<BusinessEntity[]>('/business');
    return res.data;
  },

  async getById(id: string): Promise<BusinessEntity> {
    const res = await api.get<BusinessEntity>(`/business/${id}`);
    return res.data;
  },

  async create(data: CreateBusinessDto): Promise<BusinessEntity> {
    const res = await api.post<BusinessEntity>('/business', data);
    return res.data;
  }
};

export default BusinessService;
