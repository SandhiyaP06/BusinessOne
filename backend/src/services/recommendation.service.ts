import { prisma } from '../config/prisma';

export interface RecommendationParams {
  category: string; // RED, ORANGE, GREEN, WHITE
  industryType?: string;
  projectSize?: string;
  powerLoadKVA?: number;
  waterLoadKLD?: number;
  expectedEmployment?: number;
  hasBoiler?: boolean;
  hasHazardousChem?: boolean;
}

export interface RecommendationResult {
  approvalName: string;
  departmentName: string;
  departmentCode: string;
  isMandatory: boolean;
  legalAct: string;
  reason: string;
  requiredDocuments: string[];
  slaDays: number;
}

export class RecommendationService {
  static async getRecommendations(params: RecommendationParams): Promise<RecommendationResult[]> {
    const power = params.powerLoadKVA || 0;
    const water = params.waterLoadKLD || 0;
    const workers = params.expectedEmployment || 0;
    const category = params.category || 'GREEN';

    const list: RecommendationResult[] = [];

    // 1. DIC Industrial Clearance (Always required for industrial filing)
    list.push({
      approvalName: 'Single Window Industrial Registration & In-Principle Clearance',
      departmentName: 'Directorate of Industries & Commerce',
      departmentCode: 'INDUSTRY_DEPARTMENT',
      isMandatory: true,
      legalAct: 'The State Industrial Policy & Facilitation Act',
      reason: 'Mandatory master single-window in-principle approval for statutory recognition and capital incentives.',
      requiredDocuments: ['Certificate of Incorporation / MoA', 'Registered Land Possession Deed', 'Detailed Project Report (DPR)'],
      slaDays: 15
    });

    // 2. Pollution Control Board CTE (Consent to Establish)
    if (category === 'RED' || category === 'ORANGE' || category === 'GREEN' || water > 0) {
      list.push({
        approvalName: `Consent to Establish (CTE) - ${category} Category`,
        departmentName: 'State Pollution Control Board',
        departmentCode: 'POLLUTION_CONTROL_BOARD',
        isMandatory: true,
        legalAct: 'Water (Prevention and Control of Pollution) Act 1974 & Air Act 1981',
        reason: `Triggered by CPCB ${category} pollution classification, power demand ${power} KVA and water consumption ${water} KLD.`,
        requiredDocuments: ['Effluent Treatment Plant (ETP) Engineering Drawing', 'Air Emission Stack Dispersion Model', 'Solid Waste Disposal Scheme'],
        slaDays: category === 'RED' ? 30 : 21
      });
    }

    // 3. Factories & Boilers Directorate
    if (workers >= 20 || power > 50) {
      list.push({
        approvalName: 'Factory Building Plan Approval & Initial Licence',
        departmentName: 'Directorate of Factories & Boilers (DISH)',
        departmentCode: 'OTHER_DEPARTMENT',
        isMandatory: true,
        legalAct: 'The Factories Act, 1948 - Section 6',
        reason: `Mandatory for industrial units engaging ${workers} workers with mechanical power machinery (>20 worker threshold).`,
        requiredDocuments: ['Factory Machine Layout Plan', 'Process Flowchart & Safety Analysis', 'Structural Stability Certificate'],
        slaDays: 21
      });
    }

    // 4. Fire & Emergency Services NOC
    list.push({
      approvalName: 'Pre-Construction Fire Safety Clearance (Fire NOC)',
      departmentName: 'Fire and Emergency Safety Services',
      departmentCode: 'FIRE_DEPARTMENT',
      isMandatory: true,
      legalAct: 'National Building Code (NBC) 2016 Part 4',
      reason: 'Mandatory pre-construction life safety clearance for industrial occupancy and hazard containment.',
      requiredDocuments: ['Hydrant Layout Diagram', 'Static Underground Reservoir Spec', 'Emergency Evacuation Route Analysis'],
      slaDays: 21
    });

    // 5. Boiler Registration (if boiler required)
    if (params.hasBoiler) {
      list.push({
        approvalName: 'Steam Boiler Erection & Registration Clearance',
        departmentName: 'Directorate of Steam Boilers',
        departmentCode: 'OTHER_DEPARTMENT',
        isMandatory: true,
        legalAct: 'The Indian Boilers Act, 1923',
        reason: 'Triggered by high-pressure steam boiler or thermic fluid heater exceeding 100 kg/hr capacity.',
        requiredDocuments: ['IBR Boiler Design Spec', 'IBR Pipe Drawing', 'Welder Qualification Certificate'],
        slaDays: 15
      });
    }

    // 6. HT Power Transmission Clearance
    if (power > 1000) {
      list.push({
        approvalName: 'High Tension (HT) Power Supply & Substation Approval',
        departmentName: 'Electricity Transmission & Distribution Corp',
        departmentCode: 'OTHER_DEPARTMENT',
        isMandatory: true,
        legalAct: 'Central Electricity Authority Regulations',
        reason: `High power demand of ${power} KVA requires dedicated 11KV/33KV transformer yard approval.`,
        requiredDocuments: ['Single Line Electrical Schematic', 'Transformer Safety Test', 'Earthing Grid Diagram'],
        slaDays: 15
      });
    }

    return list;
  }
}
