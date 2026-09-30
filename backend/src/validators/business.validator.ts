import { z } from 'zod';

export const createBusinessSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(2, 'Business constitution type is required'),
  industryType: z.string().min(2, 'Manufacturing/Industry sector is required'),
  businessStage: z.string().optional().default('Proposed'),
  projectSize: z.enum(['MICRO', 'SMALL', 'MEDIUM', 'LARGE', 'MEGA_PROJECT']).default('MEDIUM'),
  panNumber: z.string().min(10, 'Valid 10-digit PAN required').max(10),
  gstin: z.string().optional(),
  location: z.string().min(3, 'Address location is required'),
  district: z.string().min(2, 'District is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Valid 6-digit PIN is required'),
  description: z.string().optional()
});

export const updateBusinessSchema = createBusinessSchema.partial();
