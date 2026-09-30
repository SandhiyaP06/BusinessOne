import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ApplicationCategory } from '../../types';
import { AIAssistanceCard } from '../../components/ai/AIAssistanceCard';
import AiService, { RegulationAnalysisResult } from '../../services/aiService';
import { 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Layers, 
  RefreshCw 
} from 'lucide-react';

interface RecommendationsPageProps {
  onNavigate: (tab: string) => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ onNavigate }) => {
  // Calculator Parameters
  const [industryType, setIndustryType] = useState('Aerospace & Precision Heavy Engineering');
  const [category, setCategory] = useState<ApplicationCategory>('ORANGE');
  const [projectSize, setProjectSize] = useState('LARGE');
  const [powerLoadKVA, setPowerLoadKVA] = useState(1500);
  const [waterLoadKLD, setWaterLoadKLD] = useState(90);
  const [workersCount, setWorkersCount] = useState(250);
  const [hasBoiler, setHasBoiler] = useState(true);
  const [hasHazChem, setHasHazChem] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<RegulationAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAiReasoning = async () => {
      setAiLoading(true);
      try {
        const result = await AiService.analyzeRegulations({
          industryType,
          category,
          investmentInLakhs: 6500,
          expectedEmployment: workersCount,
          powerLoadKVA,
          waterLoadKLD,
          hasBoiler,
          hasHazardousChem: hasHazChem
        });
        setAiAnalysis(result);
      } catch (err) {
        console.warn('AI regulation engine fallback to local rules:', err);
      } finally {
        setAiLoading(false);
      }
    };

    fetchAiReasoning();
  }, [industryType, category, powerLoadKVA, waterLoadKLD, workersCount, hasBoiler, hasHazChem]);

  const recommendations = [
    {
      id: 'REC-01',
      approvalName: 'Consent to Establish (CTE) - Air & Water Act',
      department: 'State Pollution Control Board (SPCB)',
      mandatory: true,
      legalAct: 'The Water (Prevention & Control of Pollution) Act 1974 & Air Act 1981',
      reason: `Mandatory because the unit is classified under ${category} category with ${waterLoadKLD} KLD industrial water consumption and ${powerLoadKVA} KVA power connection.`,
      documents: ['ETP/STP Design Blueprint', 'Emission Stack Height Drawing', 'Hazardous Waste Storage Scheme'],
      slaDays: 30
    },
    {
      id: 'REC-02',
      approvalName: 'Factory Building Plan Approval & Initial Licence',
      department: 'Directorate of Factories & Boilers (DISH)',
      mandatory: true,
      legalAct: 'The Factories Act, 1948 - Section 6',
      reason: `Required for manufacturing premises engaging ${workersCount} workers with mechanical power machinery (>20 workers threshold).`,
      documents: ['Machine Layout Plan', 'Process Flowchart', 'Ventilation & Lighting Certificate'],
      slaDays: 21
    },
    {
      id: 'REC-03',
      approvalName: 'Pre-Construction Fire Safety Clearance (Fire NOC)',
      department: 'Fire & Emergency Safety Services',
      mandatory: true,
      legalAct: 'National Building Code (NBC 2016 Part 4)',
      reason: 'Industrial occupancy classification involving precision metal fabrication and machine tooling exceeding 15m elevation.',
      documents: ['Hydrant Layout Diagram', 'Static Underground Reservoir Spec', 'Emergency Evacuation Route'],
      slaDays: 21
    },
    ...(hasBoiler ? [{
      id: 'REC-04',
      approvalName: 'Boiler Erection & Steam Pipeline Registration',
      department: 'Directorate of Steam Boilers',
      mandatory: true,
      legalAct: 'The Indian Boilers Act, 1923',
      reason: 'Triggered by selection of steam generation boiler unit exceeding 100 kg/hr capacity.',
      documents: ['IBR Boiler Design Spec', 'Welder Certificate', 'Hydrostatic Test Certificate'],
      slaDays: 15
    }] : []),
    ...(powerLoadKVA > 1000 ? [{
      id: 'REC-05',
      approvalName: 'High Tension (HT) Power Supply & Substation Approval',
      department: 'State Electricity Transmission Corporation',
      mandatory: true,
      legalAct: 'Central Electricity Authority Regulations',
      reason: `Power demand of ${powerLoadKVA} KVA requires dedicated 11KV/33KV HT transformer yard installation.`,
      documents: ['Single Line Electrical Schematic', 'Transformer Safety Test', 'Earthing Grid Diagram'],
      slaDays: 15
    }] : [])
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header Banner */}
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
            color: 'var(--color-primary-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--text-heading)' }}>
              Smart Statutory Approval Recommendation Engine
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
              Rule-based clearance determination mapping statutory Acts, required enclosures, and SLAs without black-box ambiguity.
            </p>
          </div>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => onNavigate('new-application')}
          icon={<ArrowRight size={16} />}
          iconPosition="right"
          style={{ backgroundColor: '#059669', borderColor: '#059669' }}
        >
          Apply with Recommendations
        </Button>
      </div>

      {/* AI Supporting Advisory Layer */}
      <AIAssistanceCard
        type="REGULATION"
        regulationData={aiAnalysis}
        loading={aiLoading}
      />

      {/* Two Column Layout: Calculator Inputs & Output Approvals */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'var(--space-6)',
        alignItems: 'flex-start'
      }}>
        {/* Left Column: Interactive Project Parameter Adjuster */}
        <Card
          title="Project Parameters & Classification"
          subtitle="Adjust industrial parameters to recalculate required statutory NOCs in real-time."
        >
          <div className="form-group">
            <label className="form-label">Manufacturing / Industrial Sector</label>
            <select 
              className="form-select"
              value={industryType}
              onChange={e => setIndustryType(e.target.value)}
            >
              <option value="Aerospace & Precision Heavy Engineering">Aerospace & Precision Heavy Engineering</option>
              <option value="Pharmaceuticals & Active Drug Ingredients">Pharmaceuticals & Active Drug Ingredients</option>
              <option value="Renewable Energy & Solar Photovoltaic">Renewable Energy & Solar Photovoltaic</option>
              <option value="Food Processing & Grain Milling">Food Processing & Grain Milling</option>
              <option value="Chemicals & Petrochemicals">Chemicals & Petrochemicals</option>
              <option value="Textiles & Garment Manufacturing">Textiles & Garment Manufacturing</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">CPCB Pollution Categorization</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
              {(['RED', 'ORANGE', 'GREEN', 'WHITE'] as ApplicationCategory[]).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    border: category === cat ? '2px solid var(--color-primary-700)' : '1px solid var(--border-subtle)',
                    backgroundColor: category === cat ? 'var(--color-primary-50)' : 'var(--bg-surface)',
                    color: 'var(--text-heading)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {cat} Category
                </button>
              ))}
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Power Load (KVA)</label>
              <input 
                type="number" 
                className="form-input" 
                value={powerLoadKVA} 
                onChange={e => setPowerLoadKVA(parseInt(e.target.value) || 0)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Water Demand (KLD)</label>
              <input 
                type="number" 
                className="form-input" 
                value={waterLoadKLD} 
                onChange={e => setWaterLoadKLD(parseInt(e.target.value) || 0)} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Expected Factory Employment (Workers)</label>
            <input 
              type="number" 
              className="form-input" 
              value={workersCount} 
              onChange={e => setWorkersCount(parseInt(e.target.value) || 0)} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input 
                type="checkbox" 
                id="recBoiler" 
                checked={hasBoiler} 
                onChange={e => setHasBoiler(e.target.checked)} 
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="recBoiler" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-heading)', cursor: 'pointer' }}>
                Steam Boiler / High Pressure Vessel (&gt; 100 kg/hr)
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input 
                type="checkbox" 
                id="recHaz" 
                checked={hasHazChem} 
                onChange={e => setHasHazChem(e.target.checked)} 
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="recHaz" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-heading)', cursor: 'pointer' }}>
                Hazardous Chemicals Storage under MSIHC Rules
              </label>
            </div>
          </div>
        </Card>

        {/* Right Column: Calculated Approvals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{
            backgroundColor: 'var(--color-primary-800)',
            color: '#FFFFFF',
            padding: 'var(--space-4) var(--space-5)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#93C5FD', textTransform: 'uppercase', fontWeight: 700 }}>
                Recommendation Output
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {recommendations.length} Mandatory Clearances Identified
              </div>
            </div>
            <span style={{ fontSize: '0.8125rem', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
              100% Statutory Match
            </span>
          </div>

          {recommendations.map(rec => (
            <Card
              key={rec.id}
              title={rec.approvalName}
              subtitle={rec.department}
              action={<span className="badge badge-warning">SLA: {rec.slaDays} Days</span>}
            >
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                marginBottom: 'var(--space-3)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 2 }}>
                  Why this approval is required:
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {rec.reason}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 4, fontStyle: 'italic' }}>
                  Statute: {rec.legalAct}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: 4 }}>
                  Mandatory Enclosures:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {rec.documents.map((d, dIdx) => (
                    <span key={dIdx} style={{ fontSize: '0.6875rem', backgroundColor: 'var(--color-slate-100)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                      • {d}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
