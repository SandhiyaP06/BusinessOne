import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import AuthService, { SEEDED_CREDENTIALS } from '../services/authService';
import api from '../services/api';

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setRole: (role: UserRole) => Promise<void>;
  loginAs: (role: UserRole) => Promise<void>;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const DEFAULT_USERS: Record<UserRole, User> = {
  ENTREPRENEUR: {
    id: 'USR-ENT-001',
    name: 'Dr. Vikramaditya Rao',
    email: 'entrepreneur@portal.gov.in',
    role: 'ENTREPRENEUR',
    designation: 'Managing Director & Promoter',
    organization: 'Apex Green Energy Pvt Ltd',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  DEPARTMENT_OFFICER: {
    id: 'USR-OFF-002',
    name: 'S. K. Nambiar',
    email: 'officer.dic@portal.gov.in',
    role: 'DEPARTMENT_OFFICER',
    designation: 'General Manager, DIC',
    department: 'Directorate of Industries & Commerce',
    organization: 'Ministry of Commerce & Industries',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  INSPECTOR: {
    id: 'USR-INS-003',
    name: 'Rajeshwar Patil',
    email: 'inspector@portal.gov.in',
    role: 'INSPECTOR',
    designation: 'Divisional Safety Officer & Field Inspector',
    department: 'Fire & Emergency Safety Services',
    organization: 'Department of Fire & Rescue Services',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  ADMIN: {
    id: 'USR-ADM-004',
    name: 'Priyanka Sharma, IAS',
    email: 'admin@portal.gov.in',
    role: 'ADMIN',
    designation: 'State Single Window Clearance Commissioner',
    department: 'Industrial Facilitation & Governance Cell',
    organization: 'State Single Window Approval Authority',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_USERS.ENTREPRENEUR);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize and verify session on load
  useEffect(() => {
    const initAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const profile = await AuthService.getProfile();
          if (profile && profile.user) {
            const role = (profile.user.role?.name || profile.user.role) as UserRole;
            setCurrentUser({
              id: profile.user.id,
              name: profile.user.name,
              email: profile.user.email,
              role: role || 'ENTREPRENEUR',
              designation: profile.user.designation || DEFAULT_USERS[role]?.designation || '',
              department: profile.user.department?.name,
              organization: profile.user.department?.name || 'Apex Green Energy Pvt Ltd',
              avatarUrl: DEFAULT_USERS[role]?.avatarUrl
            });
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.warn('Initial session check failed, using default persona:', err);
        }
      } else {
        // Auto-login default entrepreneur persona for seamless dev experience
        try {
          await loginAs('ENTREPRENEUR');
        } catch {
          // ignore
        }
      }
    };

    initAuth();

    const handleSessionExpired = () => {
      setIsAuthenticated(false);
      setError('Your session has expired. Please sign in again.');
    };

    window.addEventListener('auth:session_expired', handleSessionExpired);
    return () => window.removeEventListener('auth:session_expired', handleSessionExpired);
  }, []);

  const loginAs = async (role: UserRole) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await AuthService.quickLoginAs(role);
      const userRole = (data.user.role as any)?.name || data.user.role;
      setCurrentUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: userRole as UserRole,
        designation: data.user.designation || DEFAULT_USERS[role]?.designation || '',
        department: data.user.department?.name,
        organization: data.user.department?.name || 'Apex Green Energy Pvt Ltd',
        avatarUrl: DEFAULT_USERS[role]?.avatarUrl
      });
      setIsAuthenticated(true);
    } catch (err: any) {
      console.warn(`Backend login failed for ${role}, using fallback persona:`, err);
      setCurrentUser(DEFAULT_USERS[role]);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const setRole = async (role: UserRole) => {
    await loginAs(role);
  };

  const login = async (email: string, password = 'Password@123'): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await AuthService.login(email, password);
      const userRole = ((data.user.role as any)?.name || data.user.role) as UserRole;
      setCurrentUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: userRole,
        designation: data.user.designation || DEFAULT_USERS[userRole]?.designation || '',
        department: data.user.department?.name,
        organization: data.user.department?.name || 'Registered Industrialist',
        avatarUrl: DEFAULT_USERS[userRole]?.avatarUrl
      });
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password = 'Password@123',
    role: UserRole = 'ENTREPRENEUR'
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await AuthService.register({ name, email, password, role });
      const userRole = ((data.user.role as any)?.name || data.user.role) as UserRole;
      setCurrentUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: userRole,
        designation: data.user.designation || 'Managing Director',
        organization: 'New Enterprise Ltd',
        avatarUrl: DEFAULT_USERS[userRole]?.avatarUrl
      });
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isAuthenticated,
        isLoading,
        error,
        setRole,
        loginAs,
        login,
        register,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
