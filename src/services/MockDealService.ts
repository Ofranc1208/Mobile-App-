import { IDealService, DealInfo } from '../types';
import { mockDealInfo, simulateNetworkDelay, simulateRandomError } from '../__mocks__/mockData';

export class MockDealService implements IDealService {
  async getDealInfo(userId: string): Promise<DealInfo> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching deal info');
    }

    const deal = mockDealInfo.find((d) => d.userId === userId);
    
    if (!deal) {
      throw new Error('Deal not found');
    }

    return deal;
  }

  async updateDealInfo(dealId: string, updates: Partial<DealInfo>): Promise<DealInfo> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while updating deal info');
    }

    const dealIndex = mockDealInfo.findIndex((d) => d.id === dealId);
    
    if (dealIndex === -1) {
      throw new Error('Deal not found');
    }

    const updatedDeal = {
      ...mockDealInfo[dealIndex],
      ...updates
    };

    mockDealInfo[dealIndex] = updatedDeal;

    return updatedDeal;
  }

  async acceptOffer(dealId: string): Promise<DealInfo> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while accepting offer');
    }

    const dealIndex = mockDealInfo.findIndex((d) => d.id === dealId);
    
    if (dealIndex === -1) {
      throw new Error('Deal not found');
    }

    const updatedDeal: DealInfo = {
      ...mockDealInfo[dealIndex],
      status: 'accepted'
    };

    mockDealInfo[dealIndex] = updatedDeal;

    return updatedDeal;
  }

  async rejectOffer(dealId: string, reason?: string): Promise<DealInfo> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while rejecting offer');
    }

    const dealIndex = mockDealInfo.findIndex((d) => d.id === dealId);
    
    if (dealIndex === -1) {
      throw new Error('Deal not found');
    }

    const updatedDeal: DealInfo = {
      ...mockDealInfo[dealIndex],
      status: 'rejected',
      notes: reason ? `${mockDealInfo[dealIndex].notes || ''}\nRejection reason: ${reason}`.trim() : mockDealInfo[dealIndex].notes
    };

    mockDealInfo[dealIndex] = updatedDeal;

    return updatedDeal;
  }

  async negotiateOffer(dealId: string, counterOffer: number): Promise<DealInfo> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while negotiating offer');
    }

    const dealIndex = mockDealInfo.findIndex((d) => d.id === dealId);
    
    if (dealIndex === -1) {
      throw new Error('Deal not found');
    }

    const updatedDeal: DealInfo = {
      ...mockDealInfo[dealIndex],
      status: 'negotiating',
      offerAmount: counterOffer,
      notes: `${mockDealInfo[dealIndex].notes || ''}\nCounter-offer submitted: $${counterOffer.toLocaleString()}`.trim()
    };

    mockDealInfo[dealIndex] = updatedDeal;

    return updatedDeal;
  }
}

