import { prisma } from '../config/prisma';
import { DocumentStatus } from '../constants/statuses';
import { AuditService } from '../middleware/audit.middleware';
import fs from 'fs';

export class DocumentService {
  static async upload(
    applicationId: string,
    file: Express.Multer.File,
    documentType: string,
    name: string,
    uploadedById: string,
    ipAddress?: string
  ) {
    const app = await prisma.application.findUnique({ where: { id: applicationId } });
    if (!app) throw new Error('Application not found');

    const document = await prisma.document.create({
      data: {
        applicationId,
        documentType: documentType || 'TECHNICAL',
        name: name || file.originalname,
        fileName: file.filename,
        filePath: file.path,
        mimeType: file.mimetype,
        fileSize: file.size,
        uploadedById,
        uploadedAt: new Date(),
        status: DocumentStatus.UPLOADED
      }
    });

    await AuditService.log({
      userId: uploadedById,
      action: 'DOCUMENT_UPLOADED',
      entityType: 'DOCUMENT',
      entityId: document.id,
      description: `Uploaded document: ${document.name} (${document.fileName})`,
      ipAddress
    });

    return document;
  }

  static async validate(
    documentId: string,
    validatorId: string,
    status: 'VERIFIED' | 'REJECTED' | 'REQUIRES_CLARIFICATION',
    message?: string,
    ipAddress?: string
  ) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { application: true }
    });

    if (!document) throw new Error('Document not found');

    const validation = await prisma.documentValidation.create({
      data: {
        documentId,
        validationStatus: status,
        validationMessage: message || null,
        validatedById: validatorId
      }
    });

    const updatedDocStatus = status === 'VERIFIED' ? DocumentStatus.VERIFIED : DocumentStatus.REJECTED;

    const updated = await prisma.document.update({
      where: { id: documentId },
      data: { status: updatedDocStatus }
    });

    await AuditService.log({
      userId: validatorId,
      action: 'DOCUMENT_VALIDATED',
      entityType: 'DOCUMENT',
      entityId: documentId,
      description: `Document ${document.name} validated as ${status}`,
      ipAddress
    });

    return { document: updated, validation };
  }

  static async getByApplication(applicationId: string) {
    return prisma.document.findMany({
      where: { applicationId },
      include: {
        validations: {
          include: { validatedBy: { select: { name: true, designation: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async delete(documentId: string, userId: string, ipAddress?: string) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { application: { include: { business: true } } }
    });

    if (!document) throw new Error('Document not found');
    if (document.application.business.userId !== userId) throw new Error('Unauthorized');

    // Remove file from disk if exists
    if (document.filePath && fs.existsSync(document.filePath)) {
      try {
        fs.unlinkSync(document.filePath);
      } catch (err) {
        // silent disk delete failure
      }
    }

    await prisma.document.delete({ where: { id: documentId } });

    await AuditService.log({
      userId,
      action: 'DOCUMENT_DELETED',
      entityType: 'DOCUMENT',
      entityId: documentId,
      description: `Deleted document ${document.name}`,
      ipAddress
    });

    return { message: 'Document deleted successfully' };
  }
}
