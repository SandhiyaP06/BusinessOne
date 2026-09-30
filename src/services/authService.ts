import api from './api';
import { UserRole } from '../types';

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: UserRole;
  designation?: string;
  departmentId?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    designation?: string;
    departmentId?: string;
    department?: {
      id: string;
      name: string;
      code: string;
      shortCode: string;
    };
  };
}

export const SEEDED_CREDENTIALS: Record<UserRole, { email: string; name: string; designation: string }> = {
  ENTREPRENEUR: {
    email: 'entrepreneur@portal.gov.in',
    name: 'Dr. Vikramaditya Rao',
    designation: 'Managing Director & Promoter'
  },
  DEPARTMENT_OFFICER: {
    email: 'officer.dic@portal.gov.in',
    name: 'S. K. Nambiar',
    designation: 'General Manager, DIC'
  },
  INSPECTOR: {
    email: 'inspector@portal.gov.in',
    name: 'Rajeshwar Patil',
    designation: 'Field Safety Inspector'
  },
  ADMIN: {
    email: 'admin@portal.gov.in',
    name: 'Priyanka Sharma, IAS',
    designation: 'State Single Window Commissioner'
  }
};

export const AuthService = {
  async login(email: string, password = 'Password@123'): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    if (res.data.token) {
      api.setToken(res.data.token);
    }
    return res.data;
  },

  async register(data: RegisterPayload): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/register', {
      ...data,
      password: data.password || 'Password@123'
    });
    if (res.data.token) {
      api.setToken(res.data.token);
    }
    return res.data;
  },

  async getProfile(): Promise<any> {
    const res = await api.get('/auth/profile');
    return res.data;
  },

  async quickLoginAs(role: UserRole): Promise<AuthResponse> {
    const creds = SEEDED_CREDENTIALS[role];
    try {
      return await this.login(creds.email, 'Password@123');
    } catch {
      // Fallback to officer@portal.gov.in if officer.dic was custom
      if (role === 'DEPARTMENT_OFFICER') {
        return await this.login('officer@portal.gov.in', 'Password@123');
      }
      throw new Error(`Failed to login as ${role}`);
    }
  },

  logout(): void {
    api.removeToken();
  }
};

export default AuthService;
