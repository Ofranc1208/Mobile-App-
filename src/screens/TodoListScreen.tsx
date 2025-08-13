import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { MockTodoService } from '../services';
import { TodoCategory, TodoItem } from '../types';

const TodoListScreen = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const todoService = new MockTodoService();

  useEffect(() => {
    loadTodoCategories();
  }, []);

  const loadTodoCategories = async () => {
    try {
      setIsLoading(true);
      const todoCategories = await todoService.getTodoCategories(user?.id || '');
      setCategories(todoCategories);
    } catch (error) {
      Alert.alert('Error', 'Failed to load todo items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (item: TodoItem, newStatus: TodoItem['status']) => {
    try {
      await todoService.updateTodoItem(item.id, { status: newStatus });
      await loadTodoCategories(); // Reload to get updated data
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo item');
    }
  };

  const getStatusColor = (status: TodoItem['status']) => {
    switch (status) {
      case 'completed':
        return '#34C759';
      case 'in_progress':
        return '#FF9500';
      case 'overdue':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getPriorityColor = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return '#FF3B30';
      case 'high':
        return '#FF9500';
      case 'medium':
        return '#FFCC00';
      default:
        return '#34C759';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading todo items...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>To-Do List</Text>
        <Text style={styles.subtitle}>Track your required documents and tasks</Text>
      </View>

      {categories.map((category) => (
        <View key={category.id} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </View>
          </View>

          {category.items.length === 0 ? (
            <Text style={styles.emptyText}>No items in this category</Text>
          ) : (
            category.items.map((item) => (
              <View key={item.id} style={styles.todoItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemTitleRow}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.statusBadge}>
                      <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status.replace('_', ' ').toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.priorityBadge}>
                    <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                      {item.priority.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={styles.itemDescription}>{item.description}</Text>

                <View style={styles.itemDetails}>
                  <Text style={styles.dueDate}>
                    Due: {formatDate(item.dueDate)}
                  </Text>
                  {item.attachments && item.attachments.length > 0 && (
                    <Text style={styles.attachments}>
                      📎 {item.attachments.length} attachment(s)
                    </Text>
                  )}
                </View>

                {item.notes && (
                  <Text style={styles.notes}>Notes: {item.notes}</Text>
                )}

                {item.status !== 'completed' && (
                  <View style={styles.actionButtons}>
                    {item.status === 'pending' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.startButton]}
                        onPress={() => handleStatusUpdate(item, 'in_progress')}
                      >
                        <Text style={styles.startButtonText}>Start</Text>
                      </TouchableOpacity>
                    )}
                    {item.status === 'in_progress' && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.completeButton]}
                        onPress={() => handleStatusUpdate(item, 'completed')}
                      >
                        <Text style={styles.completeButtonText}>Complete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {item.status === 'completed' && item.completedAt && (
                  <Text style={styles.completedText}>
                    ✅ Completed on {formatDate(item.completedAt)}
                  </Text>
                )}
              </View>
            ))
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#666',
  },
  categorySection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
    fontStyle: 'italic',
  },
  todoItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemTitleRow: {
    flex: 1,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  priorityBadge: {
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 12,
    color: '#999',
  },
  attachments: {
    fontSize: 12,
    color: '#999',
  },
  notes: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#34C759',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  completedText: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default TodoListScreen;

