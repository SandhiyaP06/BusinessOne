import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Clock, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  FolderLock, 
  ClipboardCheck, 
  HelpCircle, 
  Award, 
  RefreshCw, 
  Bell, 
  BarChart3, 
  Users, 
  Sliders, 
  FileCheck2, 
  Building,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  LifeBuoy
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string; strokeWidth?: number | string; style?: React.CSSProperties }>;
  badge?: string | number;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info';
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  onNavigate, 
  isCollapsed,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Define logically grouped menus based on user role
  const getNavGroups = (): NavGroup[] => {
    switch (user.role) {
      case 'DEPARTMENT_OFFICER':
        return [
          {
            groupTitle: t.sidebar.overview,
            items: [
              { id: 'dashboard', label: t.sidebar.officerWorkbench, icon: LayoutDashboard }
            ]
          },
          {
            groupTitle: t.sidebar.appReview,
            items: [
              { id: 'applications', label: t.sidebar.assignedDockets, icon: FileCheck2, badge: '4 Pending', badgeVariant: 'warning' },
              { id: 'documents', label: t.sidebar.documentScrutiny, icon: FolderLock },
              { id: 'approvals', label: t.nav.departmentClearances, icon: Layers }
            ]
          },
          {
            groupTitle: t.sidebar.collaboration,
            items: [
              { id: 'queries', label: t.sidebar.queriesRaised, icon: HelpCircle, badge: '1 Open', badgeVariant: 'danger' },
              { id: 'inspections', label: t.sidebar.inspectionWing, icon: ClipboardCheck },
              { id: 'analytics', label: t.sidebar.slaPerformance, icon: BarChart3 }
            ]
          },
          {
            groupTitle: t.sidebar.system,
            items: [
              { id: 'notifications', label: t.nav.notifications, icon: Bell },
              { id: 'help', label: t.sidebar.guidelines, icon: LifeBuoy }
            ]
          }
        ];

      case 'INSPECTOR':
        return [
          {
            groupTitle: t.sidebar.overview,
            items: [
              { id: 'dashboard', label: t.sidebar.inspectorDashboard, icon: LayoutDashboard }
            ]
          },
          {
            groupTitle: t.sidebar.fieldAssignments,
            items: [
              { id: 'inspections', label: t.sidebar.assignedInspections, icon: ClipboardCheck, badge: '2 Due', badgeVariant: 'warning' },
              { id: 'applications', label: t.sidebar.siteBlueprints, icon: FileText },
              { id: 'queries', label: t.sidebar.nonCompliance, icon: HelpCircle }
            ]
          },
          {
            groupTitle: t.sidebar.system,
            items: [
              { id: 'notifications', label: t.nav.notifications, icon: Bell },
              { id: 'help', label: t.sidebar.safetyStandards, icon: LifeBuoy }
            ]
          }
        ];

      case 'ADMIN':
        return [
          {
            groupTitle: t.sidebar.overview,
            items: [
              { id: 'dashboard', label: t.sidebar.execDashboard, icon: LayoutDashboard },
              { id: 'analytics', label: t.sidebar.stateAnalytics, icon: BarChart3 }
            ]
          },
          {
            groupTitle: t.sidebar.clearanceManagement,
            items: [
              { id: 'applications', label: t.sidebar.allApplications, icon: FileText },
              { id: 'approvals', label: t.sidebar.deptStatusMatrix, icon: Layers },
              { id: 'renewals', label: t.sidebar.licenceVault, icon: Award }
            ]
          },
          {
            groupTitle: t.sidebar.systemGovernance,
            items: [
              { id: 'workflow-engine', label: t.sidebar.workflowConfig, icon: Sliders },
              { id: 'audit-logs', label: t.sidebar.auditTrail, icon: Users },
              { id: 'notifications', label: t.sidebar.broadcastAlerts, icon: Bell }
            ]
          }
        ];

      case 'ENTREPRENEUR':
      default:
        return [
          {
            groupTitle: t.sidebar.overview,
            items: [
              { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard }
            ]
          },
          {
            groupTitle: t.sidebar.appManagement,
            items: [
              { id: 'applications', label: t.nav.myApplications, icon: FileText },
              { id: 'new-application', label: t.nav.newApplication, icon: PlusCircle },
              { id: 'tracking', label: t.nav.tracking, icon: Clock }
            ]
          },
          {
            groupTitle: t.sidebar.approvalManagement,
            items: [
              { id: 'recommendations', label: t.nav.recommendations, icon: Sparkles },
              { id: 'approvals', label: t.nav.departmentClearances, icon: Layers },
              { id: 'final-approval', label: t.nav.finalApproval, icon: CheckCircle2 }
            ]
          },
          {
            groupTitle: t.sidebar.docManagement,
            items: [
              { id: 'documents', label: t.nav.documents, icon: FolderLock }
            ]
          },
          {
            groupTitle: t.sidebar.process,
            items: [
              { id: 'inspections', label: t.nav.inspections, icon: ClipboardCheck },
              { id: 'queries', label: t.nav.queries, icon: HelpCircle, badge: '1 Action', badgeVariant: 'danger' }
            ]
          },
          {
            groupTitle: t.sidebar.postApproval,
            items: [
              { id: 'renewals', label: t.nav.renewals, icon: RefreshCw }
            ]
          },
          {
            groupTitle: t.sidebar.system,
            items: [
              { id: 'notifications', label: t.nav.notifications, icon: Bell },
              { id: 'analytics', label: t.nav.analytics, icon: BarChart3 },
              { id: 'help', label: t.nav.help, icon: LifeBuoy }
            ]
          }
        ];
    }
  };

  const navGroups = getNavGroups();

  const handleItemClick = (id: string) => {
    onNavigate(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div 
        className={`sidebar-mobile-backdrop ${isMobileOpen ? 'active' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside 
        className={`portal-sidebar ${isCollapsed ? 'is-collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
        aria-label="Sidebar Navigation"
      >
        {/* Top Brand Header: Government Emblem / Symbol Logo + Portal Title */}
        <div className={`sidebar-brand-header ${isCollapsed ? 'collapsed' : ''}`}>
          <div 
            onClick={() => handleItemClick('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', minWidth: 0, textDecoration: 'none' }}
            title="Industrial Approval Portal - Single Window Clearance System"
          >
            {/* Real Symbolic Enterprise SVG Mark */}
            <svg 
              width={isCollapsed ? 32 : 34} 
              height={isCollapsed ? 32 : 34} 
              viewBox="0 0 48 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              {/* Outer Government Security Shield */}
              <path 
                d="M24 3L6 10.5V23.8C6 34.6 13.8 44.5 24 47C34.2 44.5 42 34.6 42 23.8V10.5L24 3Z" 
                fill="#0B2545" 
                stroke="#2563EB" 
                strokeWidth="2"
              />
              {/* Inner Shield Base */}
              <path 
                d="M24 7.5L10.5 13.2V23.8C10.5 32.2 16.5 39.8 24 42.2C31.5 39.8 37.5 32.2 37.5 23.8V13.2L24 7.5Z" 
                fill="#133E70" 
              />
              {/* Industrial Cogs & Precision Factory Silhouettes */}
              <g stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 30V22L20 24.5V30" />
                <path d="M20 22L24 24.5V30" />
                <path d="M24 19L28 21.5V30" />
                <line x1="14" y1="30" x2="30" y2="30" />
              </g>
              {/* Verified Circular Stamp with Green Approval Check */}
              <circle cx="33" cy="33" r="7.5" fill="#059669" stroke="#0B2545" strokeWidth="2"/>
              <path d="M29.5 33L32 35.5L36.5 30.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {!isCollapsed && (
              <div className="sidebar-brand-info">
                <span className="sidebar-brand-title">{t.brand.title}</span>
                <span className="sidebar-brand-subtitle">{t.brand.subtitle}</span>
              </div>
            )}
          </div>

          {/* Close button on mobile drawer view */}
          {onCloseMobile && (
            <button
              type="button"
              className="sidebar-mobile-close-btn sidebar-toggle-btn"
              onClick={onCloseMobile}
              style={{ display: 'none', marginLeft: 'auto' }}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Compact Active Enterprise / Context Block */}
        <div 
          className={`sidebar-context-block ${isCollapsed ? 'collapsed' : ''}`}
          title={isCollapsed ? `${user.role === 'ENTREPRENEUR' ? 'Active Enterprise' : 'Organization'}: ${user.organization || 'Registered Industrialist'}` : undefined}
        >
          <div className="sidebar-context-icon">
            <Building size={14} strokeWidth={2} />
          </div>
          {!isCollapsed && (
            <div className="sidebar-context-details">
              <div className="sidebar-context-tag">
                {user.role === 'ENTREPRENEUR' 
                  ? 'ACTIVE ENTERPRISE' 
                  : user.role === 'DEPARTMENT_OFFICER' 
                    ? 'ASSIGNED DEPT' 
                    : user.role === 'INSPECTOR' 
                      ? 'INSPECTION WING' 
                      : 'STATE CLEARANCE'}
              </div>
              <div className="sidebar-context-name" title={user.organization || 'Registered Industrialist'}>
                {user.role === 'ENTREPRENEUR' 
                  ? (user.organization || 'Registered Industrialist') 
                  : (user.organization || 'Govt of India')}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Groups Container */}
        <div className="sidebar-nav-container">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="sidebar-nav-group">
              {!isCollapsed && (
                <div className="sidebar-group-label">
                  {group.groupTitle}
                </div>
              )}

              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    title={isCollapsed ? `${item.label}${item.badge ? ` (${item.badge})` : ''}` : undefined}
                    className={`sidebar-nav-item ${isActive ? 'is-active' : ''} ${isCollapsed ? 'collapsed' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="sidebar-nav-icon">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    
                    {!isCollapsed && (
                      <>
                        <span className="sidebar-nav-label">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`sidebar-badge sidebar-badge-${item.badgeVariant || 'info'}`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Footer Section: Security Indicator & Collapse Toggle */}
        <div className={`sidebar-footer ${isCollapsed ? 'collapsed' : ''}`}>
          {!isCollapsed ? (
            <>
              <div className="sidebar-footer-security" title="256-Bit SSL Encrypted National Single Window System">
                <ShieldCheck size={14} color="#10B981" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <button
                type="button"
                className="sidebar-toggle-btn"
                onClick={onToggleCollapse}
                title="Collapse Sidebar"
                aria-label="Collapse Sidebar"
              >
                <ChevronLeft size={16} />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="sidebar-toggle-btn"
              onClick={onToggleCollapse}
              title="Expand Sidebar"
              aria-label="Expand Sidebar"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
