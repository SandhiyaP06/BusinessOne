import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, Home } from 'lucide-react';

interface AppLayoutProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ currentTab, onNavigate, children }) => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      setIsMobileOpen(prev => !prev);
    } else {
      setIsSidebarCollapsed(prev => !prev);
    }
  };

  const handleCloseMobile = () => {
    setIsMobileOpen(false);
  };

  const handleNavigate = (tab: string) => {
    onNavigate(tab);
    handleCloseMobile();
  };

  // Tab to display title mapping
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'dashboard': return t.breadcrumb.dashboard;
      case 'applications': return t.breadcrumb.applications;
      case 'new-application': return t.breadcrumb.newApplication;
      case 'tracking': return t.breadcrumb.tracking;
      case 'recommendations': return t.breadcrumb.recommendations;
      case 'approvals': return t.breadcrumb.approvals;
      case 'final-approval': return t.breadcrumb.finalApproval;
      case 'documents': return t.breadcrumb.documents;
      case 'inspections': return t.breadcrumb.inspections;
      case 'queries': return t.breadcrumb.queries;
      case 'renewals': return t.breadcrumb.renewals;
      case 'analytics': return t.breadcrumb.analytics;
      case 'workflow-engine': return t.breadcrumb.workflowEngine;
      case 'audit-logs': return t.breadcrumb.auditLogs;
      case 'help': return t.breadcrumb.help;
      case 'notifications': return t.breadcrumb.notifications;
      default: return tab.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
  };

  // If on public pages like Landing, Login, Register, render without sidebar
  const isPublicPage = ['landing', 'login', 'register'].includes(currentTab);

  if (isPublicPage) {
    return (
      <div className="app-container">
        <Navbar 
          currentTab={currentTab} 
          onNavigate={onNavigate} 
          onToggleSidebar={() => {}} 
        />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar 
        currentTab={currentTab} 
        onNavigate={handleNavigate} 
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={!isSidebarCollapsed || isMobileOpen}
      />

      <div className="main-layout">
        <Sidebar 
          currentTab={currentTab} 
          onNavigate={handleNavigate} 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          isMobileOpen={isMobileOpen}
          onCloseMobile={handleCloseMobile}
        />

        <div className="content-wrapper">
          {/* Breadcrumb Header Bar */}
          <div style={{
            padding: 'var(--space-2) var(--space-8)',
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <span 
              onClick={() => onNavigate('dashboard')} 
              style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: 'var(--color-primary-600)' }}
            >
              <Home size={13} />
              {t.breadcrumb.portal}
            </span>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>
              {getTabLabel(currentTab)}
            </span>
          </div>

          <main className="page-container">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};
