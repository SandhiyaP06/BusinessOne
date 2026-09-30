import api from './api';

export interface QueryItem {
  id: string;
  applicationId: string;
  departmentId: string;
  raisedById: string;
  queryText: string;
  dueDate: string;
  status: 'OPEN' | 'RESPONDED' | 'UNDER_REVIEW' | 'RESOLVED';
  createdAt: string;
  resolvedAt?: string;
  department?: {
    id: string;
    name: string;
    shortCode: string;
  };
  raisedBy?: {
    id: string;
    name: string;
    designation?: string;
  };
  responses?: {
    id: string;
    responseText: string;
    attachments?: string;
    respondedAt: string;
    respondedBy?: {
      id: string;
      name: string;
    };
  }[];
}

export interface RaiseQueryDto {
  departmentId?: string;
  queryText: string;
  dueDate: string;
}

export const QueryService = {
  async getByApplication(applicationId: string): Promise<QueryItem[]> {
    const res = await api.get<QueryItem[]>(`/queries/application/${applicationId}`);
    return res.data;
  },

  async raise(applicationId: string, data: RaiseQueryDto): Promise<QueryItem> {
    const res = await api.post<QueryItem>(`/queries/application/${applicationId}`, data);
    return res.data;
  },

  async respond(queryId: string, responseText: string, attachments?: string[]): Promise<any> {
    const res = await api.post(`/queries/${queryId}/respond`, {
      responseText,
      attachments
    });
    return res.data;
  },

  async resolve(queryId: string): Promise<QueryItem> {
    const res = await api.post<QueryItem>(`/queries/${queryId}/resolve`);
    return res.data;
  }
};

export default QueryService;
