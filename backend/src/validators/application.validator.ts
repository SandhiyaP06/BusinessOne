import { z } from 'zod';

export const createApplicationSchema = z.object({
  businessId: z.string().uuid('Valid business ID required'),
  applicationType: z.string().default('COMPOSITE_CLEARANCE'),
  category: z.enum(['RED', 'ORANGE', 'GREEN', 'WHITE']).default('GREEN'),
  investmentInLakhs: z.number().min(0, 'Investment amount must be positive'),
  expectedEmployment: z.number().int().min(0, 'Employment number must be positive'),
  landAreaAcres: z.number().min(0).default(0),
  powerLoadKVA: z.number().int().min(0).default(0),
  waterLoadKLD: z.number().int().min(0).default(0),
  hasBoiler: z.boolean().default(false),
  hasHazardousChem: z.boolean().default(false)
});

export const updateApplicationSchema = createApplicationSchema.partial();
