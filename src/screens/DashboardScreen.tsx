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
import { mockPayoutData, mockAnnuityData, mockDealInfo } from '../__mocks__/mockData';
import { PayoutData, AnnuityData, DealInfo } from '../types';

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const [payoutData, setPayoutData] = useState<PayoutData | null>(null);
  const [annuityData, setAnnuityData] = useState<AnnuityData | null>(null);
  const [dealInfo, setDealInfo] = useState<DealInfo | null>(null);

  useEffect(() => {
    if (user) {
      // Load user's data
      const userPayout = mockPayoutData.find(p => p.userId === user.id);
      const userAnnuity = mockAnnuityData.find(a => a.userId === user.id);
      const userDeal = mockDealInfo.find(d => d.userId === user.id);

      setPayoutData(userPayout || null);
      setAnnuityData(userAnnuity || null);
      setDealInfo(userDeal || null);
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.clientId}>Client ID: {user.clientId}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Payout Summary Card */}
      {payoutData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payout Summary</Text>
          <View style={styles.payoutGrid}>
            <View style={styles.payoutItem}>
              <Text style={styles.payoutLabel}>Total Amount</Text>
              <Text style={styles.payoutValue}>{formatCurrency(payoutData.totalAmount)}</Text>
            </View>
            <View style={styles.payoutItem}>
              <Text style={styles.payoutLabel}>Paid Amount</Text>
              <Text style={styles.payoutValue}>{formatCurrency(payoutData.paidAmount)}</Text>
            </View>
            <View style={styles.payoutItem}>
              <Text style={styles.payoutLabel}>Remaining</Text>
              <Text style={styles.payoutValue}>{formatCurrency(payoutData.remainingAmount)}</Text>
            </View>
            <View style={styles.payoutItem}>
              <Text style={styles.payoutLabel}>Next Payment</Text>
              <Text style={styles.payoutValue}>{formatDate(payoutData.nextPaymentDate)}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>View To-Do</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionText}>Upload Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📞</Text>
            <Text style={styles.actionText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🏆</Text>
            <Text style={styles.actionText}>View Rewards</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>✅</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Document uploaded successfully</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>📅</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Payment scheduled for next month</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>🎯</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Achievement unlocked: First Steps</Text>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Need Help?</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>📞 Support: +1 (866) 972-9688</Text>
          <Text style={styles.contactText}>📧 Email: support@smarterpayouts.com</Text>
          <Text style={styles.contactText}>🕒 Hours: Mon-Fri 9AM-6PM EST</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  clientId: {
    fontSize: 12,
    color: '#999',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  payoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  payoutItem: {
    width: '48%',
    marginBottom: 16,
  },
  payoutLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  payoutValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  contactInfo: {
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
  },
});

export default DashboardScreen;

