import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Entrepreneur Pages
import { EntrepreneurDashboard } from './pages/entrepreneur/EntrepreneurDashboard';
import { NewApplicationWizard } from './pages/entrepreneur/NewApplicationWizard';
import { TrackingPage } from './pages/entrepreneur/TrackingPage';
import { RecommendationsPage } from './pages/entrepreneur/RecommendationsPage';
import { DocumentVaultPage } from './pages/entrepreneur/DocumentVaultPage';
import { InspectionsPage } from './pages/entrepreneur/InspectionsPage';
import { QueriesPage } from './pages/entrepreneur/QueriesPage';
import { FinalApprovalPage } from './pages/entrepreneur/FinalApprovalPage';
import { RenewalsPage } from './pages/entrepreneur/RenewalsPage';
import { AnalyticsDashboard } from './pages/entrepreneur/AnalyticsDashboard';
import { NotificationsPage } from './pages/entrepreneur/NotificationsPage';
import { HelpSupportPage } from './pages/entrepreneur/HelpSupportPage';

// Role-Specific Workbenches
import { DepartmentOfficerWorkbench } from './pages/department/DepartmentOfficerWorkbench';
import { InspectorWorkbench } from './pages/inspector/InspectorWorkbench';
import { AdminWorkbench } from './pages/admin/AdminWorkbench';

const MainContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('landing');

  // Handle navigation
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render content based on current tab and active role
  const renderCurrentView = () => {
    // Public routes when requested
    if (currentTab === 'landing') {
      return <LandingPage onNavigate={handleNavigate} />;
    }
    if (currentTab === 'login') {
      return <LoginPage onNavigate={handleNavigate} />;
    }
    if (currentTab === 'register') {
      return <RegisterPage onNavigate={handleNavigate} />;
    }

    // Role-specific routing for dashboard
    if (currentTab === 'dashboard') {
      switch (user.role) {
        case 'DEPARTMENT_OFFICER':
          return <DepartmentOfficerWorkbench />;
        case 'INSPECTOR':
          return <InspectorWorkbench />;
        case 'ADMIN':
          return <AdminWorkbench />;
        case 'ENTREPRENEUR':
        default:
          return <EntrepreneurDashboard onNavigate={handleNavigate} />;
      }
    }

    // Common and specific feature tabs
    switch (currentTab) {
      case 'new-application':
        return <NewApplicationWizard onNavigate={handleNavigate} />;
      case 'tracking':
      case 'applications':
        return <TrackingPage onNavigate={handleNavigate} />;
      case 'recommendations':
        return <RecommendationsPage onNavigate={handleNavigate} />;
      case 'approvals':
        return <TrackingPage onNavigate={handleNavigate} />;
      case 'final-approval':
        return <FinalApprovalPage />;
      case 'documents':
        return <DocumentVaultPage onNavigate={handleNavigate} />;
      case 'inspections':
        return <InspectionsPage />;
      case 'queries':
        return <QueriesPage />;
      case 'renewals':
        return <RenewalsPage />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'workflow-engine':
      case 'audit-logs':
        return <AdminWorkbench />;
      case 'help':
        return <HelpSupportPage />;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      default:
        return <EntrepreneurDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppLayout currentTab={currentTab} onNavigate={handleNavigate}>
      {renderCurrentView()}
    </AppLayout>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ApplicationProvider>
          <NotificationProvider>
            <MainContent />
          </NotificationProvider>
        </ApplicationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
