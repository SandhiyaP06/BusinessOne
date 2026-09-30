import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  HelpCircle, 
  PhoneCall, 
  Mail, 
  Globe, 
  FileText, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  BookOpen,
  MessageSquare
} from 'lucide-react';

export const HelpSupportPage: React.FC = () => {
  const acts = [
    { title: 'The Ease of Doing Business Act & Single Window Clearance Rules', desc: 'Statutory framework governing mandatory SLA timelines and deemed approval clauses.', docSize: '1.4 MB' },
    { title: 'The Water & Air (Prevention and Control of Pollution) Acts', desc: 'Prescribed consent standards, Red/Orange/Green category categorization criteria.', docSize: '2.8 MB' },
    { title: 'National Building Code (NBC) 2016 - Fire & Life Safety Standards', desc: 'Comprehensive requirements for industrial hydrant networks and evacuation stairwells.', docSize: '4.6 MB' },
    { title: 'The Factories Act 1948 & State Boiler Rules', desc: 'Health, welfare, machinery guarding norms and boiler inspectorate compliance guidelines.', docSize: '3.1 MB' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-primary-50)',
            color: 'var(--color-primary-800)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HelpCircle size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              Statutory Guidelines & Citizen Helpdesk
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Official regulations, legal act gazette downloads, grievance escalation, and facilitation helpline.
            </p>
          </div>
        </div>
      </div>

      {/* Support Helpline Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 'var(--space-4)'
      }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
          <PhoneCall size={22} color="var(--color-primary-600)" style={{ marginBottom: 8 }} />
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>Single Window Toll-Free</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>Available Mon - Sat (9:00 AM - 6:00 PM)</p>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary-800)' }}>1800-425-4638</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
          <Mail size={22} color="var(--color-primary-600)" style={{ marginBottom: 8 }} />
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>Dedicated Citizen Helpdesk</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>Average response time: &lt; 4 business hours</p>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-800)' }}>singlewindow-support@gov.ind.in</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
          <Globe size={22} color="var(--color-primary-600)" style={{ marginBottom: 8 }} />
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>State Facilitation Center</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>Physical investor facilitation desks</p>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-heading)' }}>Industrial Secretariat, 4th Floor, State HQ</div>
        </div>
      </div>

      {/* Statutory Regulations & Gazette Downloads */}
      <Card
        title="Statutory Rules & Gazette Reference Library"
        subtitle="Official legal Acts governing industrial permissions, inspection parameters, and deemed approval rights."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {acts.map((act, idx) => (
            <div 
              key={idx}
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <BookOpen size={20} color="var(--color-primary-700)" />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {act.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {act.desc}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Downloading ${act.title}...`)}
                icon={<Download size={14} />}
              >
                Gazette PDF ({act.docSize})
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
