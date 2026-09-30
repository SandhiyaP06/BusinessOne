import api from './api';

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

export interface DocumentOcrResult {
  documentId: string;
  documentType: string;
  extractedData: {
    detectedType: string;
    extractedId: string;
    issuedTo?: string;
    issuingAuthority?: string;
    ocrConfidence: number;
    isTampered: boolean;
    matchScore: number;
    [key: string]: any;
  };
  aiValidationPassed: boolean;
  verificationMessage: string;
  disclaimer: string;
}

export interface PredictiveDelayResult {
  applicationId: string;
  statutoryMaxSlaDays: number;
  predictedDaysToFinalClearance: number;
  slaComplianceProbability: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  bottleneckRisks: string[];
  recommendedAction: string;
  lastEvaluated: string;
}

export const AiService = {
  async analyzeRegulations(data: {
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
  }): Promise<RegulationAnalysisResult> {
    const res = await api.post<RegulationAnalysisResult>('/ai/regulations', data);
    return res.data;
  },

  async verifyDocumentWithAi(
    documentId: string,
    documentType: string,
    businessId?: string
  ): Promise<DocumentOcrResult> {
    const res = await api.post<DocumentOcrResult>('/ai/verify-document', {
      documentId,
      documentType,
      businessId
    });
    return res.data;
  },

  async getPredictiveDelayAnalysis(applicationId: string): Promise<PredictiveDelayResult> {
    const res = await api.get<PredictiveDelayResult>(`/ai/predict-delay/${applicationId}`);
    return res.data;
  }
};

export default AiService;
