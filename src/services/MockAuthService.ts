import { IAuthService, User } from '../types';
import { mockUsers, simulateNetworkDelay, simulateRandomError } from '../__mocks__/mockData';

export class MockAuthService implements IAuthService {
  private currentUser: User | null = null;
  private currentToken: string | null = null;

  async login(clientId: string, password: string): Promise<{ user: User; token: string }> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred during login');
    }

    // Simulate authentication logic
    const user = mockUsers.find((u: User) => u.clientId === clientId);
    
    if (!user) {
      throw new Error('Invalid Client ID');
    }

    // In a real app, password would be validated against hashed password
    if (password !== 'password123') {
      throw new Error('Invalid password');
    }

    // Generate mock token
    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.currentUser = user;
    this.currentToken = token;

    return { user, token };
  }

  async logout(): Promise<void> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred during logout');
    }

    this.currentUser = null;
    this.currentToken = null;
  }

  async getCurrentUser(): Promise<User | null> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching user');
    }

    return this.currentUser;
  }

  async refreshToken(): Promise<string> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while refreshing token');
    }

    if (!this.currentUser) {
      throw new Error('No authenticated user');
    }

    // Generate new mock token
    const newToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.currentToken = newToken;

    return newToken;
  }

  // Helper method for testing
  setCurrentUser(user: User | null): void {
    this.currentUser = user;
  }

  // Helper method for testing
  getCurrentToken(): string | null {
    return this.currentToken;
  }
}
