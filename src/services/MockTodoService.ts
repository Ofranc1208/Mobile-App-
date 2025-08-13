import { ITodoService, TodoCategory, TodoItem } from '../types';
import { mockTodoCategories, mockTodoItems, simulateNetworkDelay, simulateRandomError } from '../__mocks__/mockData';

export class MockTodoService implements ITodoService {
  async getTodoCategories(userId: string): Promise<TodoCategory[]> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching todo categories');
    }

    // Return categories with populated items for the specific user
    return mockTodoCategories.map((category) => ({
      ...category,
      items: mockTodoItems.filter((item) => {
        // In a real app, items would be filtered by userId
        // For mock service, we return all items
        return true;
      })
    }));
  }

  async getTodoItems(userId: string, categoryId?: string): Promise<TodoItem[]> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while fetching todo items');
    }

    let items = mockTodoItems;

    // Filter by category if specified
    if (categoryId) {
      items = items.filter((item) => item.categoryId === categoryId);
    }

    // In a real app, items would be filtered by userId
    // For mock service, we return all items
    return items;
  }

  async createTodoItem(userId: string, item: Omit<TodoItem, 'id' | 'status' | 'completedAt'> & { categoryId: string }): Promise<TodoItem> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while creating todo item');
    }

    const newItem: TodoItem = {
      ...item,
      id: `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending'
    };

    // Add to mock data
    mockTodoItems.push(newItem);

    // Update category items
    const category = mockTodoCategories.find((c) => c.id === item.categoryId);
    if (category) {
      category.items.push(newItem);
    }

    return newItem;
  }

  async updateTodoItem(itemId: string, updates: Partial<TodoItem>): Promise<TodoItem> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while updating todo item');
    }

    const itemIndex = mockTodoItems.findIndex((item) => item.id === itemId);
    
    if (itemIndex === -1) {
      throw new Error('Todo item not found');
    }

    const updatedItem = {
      ...mockTodoItems[itemIndex],
      ...updates
    };

    // Handle status change
    if (updates.status === 'completed' && !updatedItem.completedAt) {
      updatedItem.completedAt = new Date().toISOString();
    }

    mockTodoItems[itemIndex] = updatedItem;

    // Update category items
    const category = mockTodoCategories.find((c) => c.id === updatedItem.categoryId);
    if (category) {
      const categoryItemIndex = category.items.findIndex((item) => item.id === itemId);
      if (categoryItemIndex !== -1) {
        category.items[categoryItemIndex] = updatedItem;
      }
    }

    return updatedItem;
  }

  async deleteTodoItem(itemId: string): Promise<void> {
    await simulateNetworkDelay();
    
    if (simulateRandomError()) {
      throw new Error('Network error occurred while deleting todo item');
    }

    const itemIndex = mockTodoItems.findIndex((item) => item.id === itemId);
    
    if (itemIndex === -1) {
      throw new Error('Todo item not found');
    }

    const deletedItem = mockTodoItems[itemIndex];

    // Remove from mock data
    mockTodoItems.splice(itemIndex, 1);

    // Remove from category items
    const category = mockTodoCategories.find((c) => c.id === deletedItem.categoryId);
    if (category) {
      const categoryItemIndex = category.items.findIndex((item) => item.id === itemId);
      if (categoryItemIndex !== -1) {
        category.items.splice(categoryItemIndex, 1);
      }
    }
  }

  async markTodoComplete(itemId: string): Promise<TodoItem> {
    return this.updateTodoItem(itemId, {
      status: 'completed',
      completedAt: new Date().toISOString()
    });
  }
}

