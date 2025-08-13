import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const MyRewardsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rewards</Text>
        <Text style={styles.subtitle}>Track your progress and achievements</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Level:</Text>
          <Text style={styles.statusValue}>2</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Points:</Text>
          <Text style={styles.statusValue}>150</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Next Milestone:</Text>
          <Text style={styles.statusValue}>300 points</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Achievements</Text>
        <View style={styles.achievementItem}>
          <Text style={styles.achievementIcon}>🎯</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementName}>First Steps</Text>
            <Text style={styles.achievementDesc}>Complete your first document upload</Text>
            <Text style={styles.achievementPoints}>+50 points</Text>
          </View>
        </View>
        <View style={styles.achievementItem}>
          <Text style={styles.achievementIcon}>📚</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementName}>Document Master</Text>
            <Text style={styles.achievementDesc}>Upload 5 documents successfully</Text>
            <Text style={styles.achievementPoints}>+100 points</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Available Achievements</Text>
        <View style={styles.achievementItem}>
          <Text style={styles.achievementIcon}>🏆</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementName}>Task Champion</Text>
            <Text style={styles.achievementDesc}>Complete 10 todo items</Text>
            <Text style={styles.achievementPoints}>+200 points</Text>
          </View>
        </View>
        <View style={styles.achievementItem}>
          <Text style={styles.achievementIcon}>⏰</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementName}>Early Bird</Text>
            <Text style={styles.achievementDesc}>Complete tasks before due date</Text>
            <Text style={styles.achievementPoints}>+75 points</Text>
          </View>
        </View>
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  achievementPoints: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
  },
});

export default MyRewardsScreen;

