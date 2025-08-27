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
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/theme';
import RadialMenu from '../components/RadialMenu';

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

  const handleNavigate = (screen: string) => {
    // In a real app, you would use navigation here
    console.log('Navigate to:', screen);
    Alert.alert('Navigation', `Would navigate to ${screen} screen`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const totalAmount = payoutData?.totalAmount || 26525.32;

  return (
    <View style={styles.container}>
      {/* Top Section - User Info with brand yellow background */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <Text style={styles.userId}>ID {user.clientId}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Payout Section */}
        <View style={styles.payoutSection}>
          <Text style={styles.payoutLabel}>My Payout</Text>
          <View style={styles.payoutCard}>
            <Text style={styles.payoutAmount}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

        {/* Radial Menu */}
        <RadialMenu onNavigate={handleNavigate} daysToFund={23} />

        {/* Status Section */}
        <View style={styles.statusSection}>
          <Text style={styles.statusLabel}>Status</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressStep, styles.progressStepActive]} />
            <View style={styles.progressLine} />
            <View style={styles.progressStep} />
            <View style={styles.progressLine} />
            <View style={styles.progressStep} />
            <View style={styles.progressLine} />
            <View style={styles.progressStep} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={[styles.progressLabel, styles.progressLabelActive]}>Step 1</Text>
            <Text style={styles.progressLabel}>Step 2</Text>
            <Text style={styles.progressLabel}>Step 3</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundMain,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMain,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.brandYellow,
    borderBottomWidth: 2,
    borderBottomColor: Colors.orange200,
    ...Shadows.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    backgroundColor: Colors.gray600,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.white,
    ...Shadows.lg,
  },
  avatarIcon: {
    fontSize: FontSizes.xxl,
    color: Colors.white,
  },
  userId: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.gray800,
  },
  notificationButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.brandRed,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    ...Shadows.lg,
  },
  notificationIcon: {
    fontSize: FontSizes.lg,
    color: Colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.backgroundMain,
  },
  payoutSection: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.xxl,
    marginBottom: Spacing.sm,
  },
  payoutLabel: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.medium,
    color: Colors.gray700,
    marginBottom: Spacing.md,
  },
  payoutCard: {
    borderWidth: 2,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    backgroundColor: Colors.white,
    ...Shadows.md,
  },
  payoutAmount: {
    fontSize: FontSizes.giant,
    fontWeight: FontWeights.bold,
    color: Colors.success,
    textAlign: 'center',
  },
  statusSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  statusLabel: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.gray700,
    marginBottom: Spacing.xxl,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  progressStep: {
    width: 16,
    height: 16,
    backgroundColor: Colors.gray300,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  progressStepActive: {
    backgroundColor: Colors.success,
    ...Shadows.md,
  },
  progressLine: {
    width: 48,
    height: 6,
    backgroundColor: Colors.gray300,
    borderRadius: BorderRadius.full,
    marginHorizontal: 0,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
  },
  progressLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: Colors.gray600,
  },
  progressLabelActive: {
    color: Colors.success,
    fontWeight: FontWeights.semibold,
  },
});

export default DashboardScreen;

