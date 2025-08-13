import { IUserService, User } from '../types';
import { mockUsers, simulateNetworkDelay, simulateRandomError } from '../__mocks__/mockData';

export class MockUserService implements IUserService {
  async getUserProfile(userId: string): Promise<User> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching user profile');
    }

    const user = mockUsers.find((u) => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while updating user profile');
    }

    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update user with new data
    const updatedUser = {
      ...mockUsers[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    mockUsers[userIndex] = updatedUser;

    return updatedUser;
  }

  async uploadProfileImage(userId: string, imageFile: any): Promise<string> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while uploading profile image');
    }

    const user = mockUsers.find((u) => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Simulate file upload and return image URL
    const imageUrl = `https://via.placeholder.com/150?text=${encodeURIComponent(imageFile.name)}`;
    
    // Update user's profile image
    user.profileImage = imageUrl;
    user.updatedAt = new Date().toISOString();

    return imageUrl;
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while changing password');
    }

    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // In a real app, old password would be validated against hashed password
    if (oldPassword !== 'password123') {
      throw new Error('Invalid old password');
    }

    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long');
    }

    // In a real app, new password would be hashed and stored
    // For mock service, we just simulate success
    user.updatedAt = new Date().toISOString();
  }
}

