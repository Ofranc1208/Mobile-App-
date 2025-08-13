import { IDocumentService, Document } from '../types';
import { mockDocuments, simulateNetworkDelay, simulateRandomError } from '../__mocks__/mockData';

export class MockDocumentService implements IDocumentService {
  async getDocuments(userId: string): Promise<Document[]> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching documents');
    }

    // In a real app, documents would be filtered by userId
    // For mock service, we return all documents
    return mockDocuments;
  }

  async uploadDocument(userId: string, file: any, metadata: Partial<Document>): Promise<Document> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while uploading document');
    }

    const newDocument: Document = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      name: metadata.name || file.name,
      type: metadata.type || 'other',
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      uploadDate: new Date().toISOString(),
      status: 'pending',
      reviewNotes: metadata.reviewNotes,
      expiresAt: metadata.expiresAt
    };

    // Add to mock data
    mockDocuments.push(newDocument);

    return newDocument;
  }

  async downloadDocument(documentId: string): Promise<any> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while downloading document');
    }

    const document = mockDocuments.find((doc) => doc.id === documentId);
    
    if (!document) {
      throw new Error('Document not found');
    }

    // Simulate file download by creating a mock blob
    const mockContent = `Mock content for ${document.name}`;
    // In React Native, return a simple object or base64 string to represent file content
    return { content: mockContent, mimeType: document.mimeType };
  }

  async deleteDocument(documentId: string): Promise<void> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while deleting document');
    }

    const documentIndex = mockDocuments.findIndex((doc) => doc.id === documentId);
    
    if (documentIndex === -1) {
      throw new Error('Document not found');
    }

    // Remove from mock data
    mockDocuments.splice(documentIndex, 1);
  }

  async updateDocumentStatus(documentId: string, status: Document['status'], notes?: string): Promise<Document> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while updating document status');
    }

    const documentIndex = mockDocuments.findIndex((doc) => doc.id === documentId);
    
    if (documentIndex === -1) {
      throw new Error('Document not found');
    }

    const updatedDocument = {
      ...mockDocuments[documentIndex],
      status,
      reviewNotes: notes || mockDocuments[documentIndex].reviewNotes
    };

    mockDocuments[documentIndex] = updatedDocument;

    return updatedDocument;
  }
}

