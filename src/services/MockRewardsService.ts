import { IRewardsService, RewardsData, Achievement } from '../types';
import { mockRewardsData, mockAchievements, simulateNetworkDelay, simulateRandomError } from '../__mocks__/mockData';

export class MockRewardsService implements IRewardsService {
  async getRewardsData(userId: string): Promise<RewardsData> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching rewards data');
    }

    const rewards = mockRewardsData.find((r) => r.userId === userId);
    
    if (!rewards) {
      throw new Error('Rewards data not found');
    }

    return rewards;
  }

  async addPoints(userId: string, points: number, reason: string): Promise<RewardsData> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while adding points');
    }

    const rewardsIndex = mockRewardsData.findIndex((r) => r.userId === userId);
    
    if (rewardsIndex === -1) {
      throw new Error('Rewards data not found');
    }

    const currentRewards = mockRewardsData[rewardsIndex];
    const newPoints = currentRewards.points + points;
    
    // Calculate new level (simple leveling system)
    const newLevel = Math.floor(newPoints / 100) + 1;
    
    // Calculate next milestone
    const nextMilestone = newLevel * 100;
    
    // Calculate progress percentage
    const progressPercentage = Math.min(100, ((newPoints % 100) / 100) * 100);

    const updatedRewards: RewardsData = {
      ...currentRewards,
      points: newPoints,
      level: newLevel,
      nextMilestone,
      progressPercentage
    };

    mockRewardsData[rewardsIndex] = updatedRewards;

    return updatedRewards;
  }

  async unlockAchievement(userId: string, achievementId: string): Promise<RewardsData> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while unlocking achievement');
    }

    const achievement = mockAchievements.find((a) => a.id === achievementId);
    
    if (!achievement) {
      throw new Error('Achievement not found');
    }

    if (achievement.isUnlocked) {
      throw new Error('Achievement already unlocked');
    }

    // Unlock the achievement
    achievement.isUnlocked = true;
    achievement.unlockedAt = new Date().toISOString();

    // Add points for the achievement
    const rewards = await this.addPoints(userId, achievement.points, `Unlocked achievement: ${achievement.name}`);

    // Update user's achievements list
    const rewardsIndex = mockRewardsData.findIndex((r) => r.userId === userId);
    if (rewardsIndex !== -1) {
      mockRewardsData[rewardsIndex].achievements.push(achievement);
      mockRewardsData[rewardsIndex].badges.push(achievement.name);
    }

    return rewards;
  }

  async getAvailableAchievements(): Promise<Achievement[]> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching available achievements');
    }

    return mockAchievements;
  }
}

