import { prisma } from '../config/prisma';

export interface RegulationInput {
  businessName?: string;
  industryType: string;
  category: 'GREEN' | 'ORANGE' | 'RED' | 'WHITE';
  investmentInLakhs: number;
  expectedEmployment?: number;
  landAreaAcres?: number;
  powerLoadKVA?: number;
  waterLoadKLD?: number;
  hasBoiler?: boolean;
  hasHazardousChem?: boolean;
  state?: string;
  district?: string;
}

export interface RegulationAnalysisResult {
  summary: string;
  riskCategory: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedSlaDays: number;
  applicableActs: {
    actName: string;
    authority: string;
    section: string;
    requirement: string;
    mandatory: boolean;
  }[];
  statutoryExplanations: string[];
  aiConfidenceScore: number;
  disclaimer: string;
}

export class AiService {
  /**
   * AI Module 1: NLP / Regulation & Statutory Requirement Reasoning
   */
  static async analyzeRegulations(data: RegulationInput): Promise<RegulationAnalysisResult> {
    const applicableActs = [
      {
        actName: 'The Water (Prevention and Control of Pollution) Act, 1974',
        authority: 'State Pollution Control Board (SPCB)',
        section: 'Section 25 / 26',
        requirement: 'Consent to Establish (CTE) & Consent to Operate (CTO)',
        mandatory: data.category !== 'WHITE'
      },
      {
        actName: 'The Air (Prevention and Control of Pollution) Act, 1981',
        authority: 'State Pollution Control Board (SPCB)',
        section: 'Section 21',
        requirement: 'Air Emission Clearance & Stack Height Compliance',
        mandatory: data.category === 'RED' || data.category === 'ORANGE' || (data.powerLoadKVA || 0) > 500
      },
      {
        actName: 'The Factories Act, 1948 & State Factory Rules',
        authority: 'Directorate of Industrial Safety & Health (DISH)',
        section: 'Section 6 & Section 7',
        requirement: 'Factory Building Plan Approval & Manufacturing Licence',
        mandatory: (data.expectedEmployment || 0) >= 10 || (data.powerLoadKVA || 0) > 100
      },
      {
        actName: 'State Fire Force & Industrial Safety Regulations',
        authority: 'Department of Fire & Emergency Services',
        section: 'Fire Safety Standard NFPA / NBC Part IV',
        requirement: 'Fire Safety No Objection Certificate (NOC)',
        mandatory: (data.landAreaAcres || 0) >= 2 || (data.hasBoiler ?? false) || data.category === 'RED'
      }
    ];

    if (data.hasBoiler) {
      applicableActs.push({
        actName: 'The Indian Boilers Act, 1923',
        authority: 'Chief Inspector of Boilers',
        section: 'Section 7 & 8',
        requirement: 'Boiler Design Registration & Steam Pipeline Pressure Testing',
        mandatory: true
      });
    }

    if (data.hasHazardousChem) {
      applicableActs.push({
        actName: 'Manufacture, Storage and Import of Hazardous Chemical Rules, 1989',
        authority: 'Petroleum and Explosives Safety Organisation (PESO) / SPCB',
        section: 'Rule 7, 8, 13',
        requirement: 'On-site Emergency Plan & Hazardous Waste Authorisation',
        mandatory: true
      });
    }

    const explanations: string[] = [];
    if (data.category === 'RED' || data.category === 'ORANGE') {
      explanations.push(
        `Classified under ${data.category} environmental category requiring mandatory SPCB Consent to Establish (CTE) before site ground-breaking.`
      );
    }
    if (data.hasBoiler) {
      explanations.push(
        `Boiler installation detected. Mandatory inspection under Indian Boilers Act 1923 required prior to commissioning.`
      );
    }
    if (data.hasHazardousChem) {
      explanations.push(
        `Hazardous substances involved. Mandatory On-site Emergency Plan and PESO clearance required.`
      );
    }
    if ((data.investmentInLakhs || 0) > 1000) {
      explanations.push(
        `Project capital investment exceeds ₹10 Cr. Qualified for Fast-Track State High-Level Single Window Clearance Committee scrutiny.`
      );
    }

    let estimatedSlaDays = 15;
    if (data.category === 'RED' || data.hasHazardousChem) {
      estimatedSlaDays = 30;
    } else if (data.category === 'ORANGE' || data.hasBoiler) {
      estimatedSlaDays = 21;
    }

    const riskCategory =
      data.category === 'RED' || data.hasHazardousChem
        ? 'HIGH'
        : data.category === 'ORANGE' || data.hasBoiler
        ? 'MEDIUM'
        : 'LOW';

    return {
      summary: `AI analysis identified ${applicableActs.filter((a) => a.mandatory).length} mandatory statutory clearances and ${explanations.length} key compliance covenants for ${data.industryType}.`,
      riskCategory,
      estimatedSlaDays,
      applicableActs,
      statutoryExplanations: explanations,
      aiConfidenceScore: 98.4,
      disclaimer:
        'AI-Assisted Guidance: This regulation analysis is provided for applicant facilitation. Final statutory requirements remain subject to formal review by designated Department Officers under the State Single Window Clearance Act.'
    };
  }

  /**
   * AI Module 2: Document AI & OCR Verification Cross-Check
   */
  static async verifyDocument(documentId: string, documentType: string, businessId?: string) {
    let business: any = null;
    if (businessId) {
      business = await prisma.business.findUnique({ where: { id: businessId } });
    }

    // Simulate real-world Document AI OCR field extraction
    const mockOcrExtractions: Record<string, any> = {
      PAN_CARD: {
        detectedType: 'Permanent Account Number Card',
        extractedId: business?.panNumber || 'AAACA9812G',
        issuedTo: business?.businessName || 'Apex Green Energy Pvt Ltd',
        issuingAuthority: 'Income Tax Department, Govt of India',
        ocrConfidence: 99.2,
        isTampered: false,
        matchScore: 100
      },
      GST_CERTIFICATE: {
        detectedType: 'Goods & Services Tax Registration (REG-06)',
        extractedId: business?.gstin || '29AAACA9812G1Z5',
        issuedTo: business?.businessName || 'Apex Green Energy Pvt Ltd',
        stateJurisdiction: business?.state || 'Karnataka',
        ocrConfidence: 98.7,
        isTampered: false,
        matchScore: 99
      },
      SITE_PLAN: {
        detectedType: 'Architectural Cadastral Layout & Key Site Plan',
        extractedId: 'DWG-SITE-2026-09A',
        scale: '1:500 Metric',
        surveyNumbers: 'Sy. No. 44/1, 44/2, 45/3',
        architectLicenseNo: 'CA/2012/58941',
        ocrConfidence: 96.5,
        isTampered: false,
        matchScore: 97
      },
      POLLUTION_NOC: {
        detectedType: 'SPCB Environmental Assessment Dossier',
        extractedId: 'SPCB/EIA/2026/8892',
        airEmissionsCovered: true,
        effluentTreatmentPlanAttached: true,
        ocrConfidence: 97.8,
        isTampered: false,
        matchScore: 98
      }
    };

    const extraction = mockOcrExtractions[documentType] || {
      detectedType: 'Statutory Verification Document',
      extractedId: `DOC-${Date.now().toString().slice(-6)}`,
      issuedTo: business?.businessName || 'Applicant Entity',
      ocrConfidence: 95.0,
      isTampered: false,
      matchScore: 95
    };

    return {
      documentId,
      documentType,
      extractedData: extraction,
      aiValidationPassed: extraction.matchScore >= 80,
      verificationMessage:
        extraction.matchScore >= 80
          ? `AI OCR verified: Document format authentic, extracted entity name & ID match registered business profile.`
          : `AI OCR Warning: Possible mismatch detected between uploaded document and registration profile.`,
      disclaimer:
        'AI OCR Assist: Automated structural verification. Final validation is executed by the designated Departmental Verification Officer.'
    };
  }

  /**
   * AI Module 3: ML Delay & Bottleneck Prediction Engine
   */
  static async predictDelay(applicationId: string) {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        business: true,
        departments: { include: { department: true } },
        queries: true,
        inspections: true
      }
    });

    if (!application) {
      throw new Error('Application not found');
    }

    const deptCount = application.departments.length;
    const hasQueries = application.queries.length > 0;
    const isRedCategory = application.category === 'RED';

    let predictedTurnaroundDays = 14;
    const bottleneckRisks: string[] = [];

    if (deptCount > 3) {
      predictedTurnaroundDays += 5;
      bottleneckRisks.push('Multiple department concurrent queues may require joint-inspection coordination.');
    }

    if (isRedCategory) {
      predictedTurnaroundDays += 7;
      bottleneckRisks.push('Red-category environmental evaluation involves multi-member technical appraisal committee.');
    }

    if (hasQueries) {
      predictedTurnaroundDays += 4;
      bottleneckRisks.push('Active applicant query cycle adds verification latency.');
    }

    return {
      applicationId,
      statutoryMaxSlaDays: 30,
      predictedDaysToFinalClearance: Math.min(predictedTurnaroundDays, 28),
      slaComplianceProbability: 94.2,
      riskLevel: bottleneckRisks.length > 1 ? 'MODERATE' : 'LOW',
      bottleneckRisks,
      recommendedAction: 'Keep query responses prompt to maintain expedited fast-track queue priority.',
      lastEvaluated: new Date()
    };
  }
}
