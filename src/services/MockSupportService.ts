import { ISupportService, SupportInfo } from '../types';
import { mockSupportInfo, simulateNetworkDelay, simulateRandomError } from '../__mocks__/mockData';

export class MockSupportService implements ISupportService {
  async getSupportTickets(userId: string): Promise<SupportInfo[]> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching support tickets');
    }

    // In a real app, tickets would be filtered by userId
    // For mock service, we return all tickets
    return mockSupportInfo;
  }

  async createSupportTicket(userId: string, ticket: Omit<SupportInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<SupportInfo> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while creating support ticket');
    }

    const newTicket: SupportInfo = {
      id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      subject: ticket.subject,
      message: ticket.message,
      status: 'open',
      priority: ticket.priority,
      category: ticket.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: ticket.assignedTo
    };

    // Add to mock data
    mockSupportInfo.push(newTicket);

    return newTicket;
  }

  async updateSupportTicket(ticketId: string, updates: Partial<SupportInfo>): Promise<SupportInfo> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while updating support ticket');
    }

    const ticketIndex = mockSupportInfo.findIndex((t) => t.id === ticketId);
    
    if (ticketIndex === -1) {
      throw new Error('Support ticket not found');
    }

    const updatedTicket = {
      ...mockSupportInfo[ticketIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    mockSupportInfo[ticketIndex] = updatedTicket;

    return updatedTicket;
  }

  async closeSupportTicket(ticketId: string, resolution?: string): Promise<SupportInfo> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while closing support ticket');
    }

    const ticketIndex = mockSupportInfo.findIndex((t) => t.id === ticketId);
    
    if (ticketIndex === -1) {
      throw new Error('Support ticket not found');
    }

    const updatedTicket: SupportInfo = {
      ...mockSupportInfo[ticketIndex],
      status: 'closed',
      resolution: resolution || 'Ticket closed by user',
      updatedAt: new Date().toISOString()
    };

    mockSupportInfo[ticketIndex] = updatedTicket;

    return updatedTicket;
  }
}

