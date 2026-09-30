import { z } from 'zod';

export const raiseQuerySchema = z.object({
  departmentId: z.string().uuid('Valid department ID required'),
  queryText: z.string().min(5, 'Query description must be at least 5 characters'),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Valid date required' })
});

export const respondQuerySchema = z.object({
  responseText: z.string().min(5, 'Response text is required'),
  attachments: z.array(z.string()).optional()
});

export const scheduleInspectionSchema = z.object({
  applicationId: z.string().uuid(),
  departmentId: z.string().uuid(),
  inspectorId: z.string().uuid().optional(),
  scheduledDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Valid date required' }),
  location: z.string().min(3),
  remarks: z.string().optional()
});

export const submitInspectionResultSchema = z.object({
  checklist: z.array(z.object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    isCompliant: z.boolean(),
    inspectorNotes: z.string().optional()
  })),
  findings: z.string().min(5, 'Findings notes required'),
  result: z.enum(['PASSED', 'REINSPECT', 'REJECTED'])
});

export const approvalDecisionSchema = z.object({
  departmentId: z.string().uuid('Valid department ID required'),
  decision: z.enum(['APPROVED', 'REJECTED']),
  remarks: z.string().optional()
});
