import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/theme';

interface MenuItem {
  label: string;
  icon: string;
  screen: string;
}

interface RadialMenuProps {
  onNavigate?: (screen: string) => void;
  daysToFund?: number;
}

const RadialMenu: React.FC<RadialMenuProps> = ({ onNavigate, daysToFund = 23 }) => {
  const menuItems: MenuItem[] = [
    { label: 'To Do List', icon: '📋', screen: 'todo' },
    { label: 'Support', icon: '📞', screen: 'support' },
    { label: 'Rewards', icon: '🎁', screen: 'rewards' },
    { label: 'Court Info', icon: '⚖️', screen: 'court' },
    { label: 'My Annuity', icon: '📄', screen: 'annuity' },
    { label: 'My Profile', icon: '👤', screen: 'profile' }
  ];

  const handleItemPress = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  // Constants for positioning - optimized for mobile
  const containerSize = 300;
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const radius = 105;
  const startAngle = -90; // Start from top (12 o'clock position)

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      {/* Main circular background */}
      <View style={[styles.circularBackground, { width: containerSize, height: containerSize }]} />
      
      {/* Center circle with "Days to Fund" */}
      <View style={styles.centerCircle}>
        <Text style={styles.centerNumber}>{daysToFund}</Text>
        <Text style={styles.centerText}>Days to Fund</Text>
      </View>
      
      {/* Radial menu items positioned using trigonometry */}
      {menuItems.map((item, index) => {
        // Calculate angle for each item (360 degrees divided by number of items)
        const angleStep = 360 / menuItems.length;
        const angle = (startAngle + (angleStep * index)) * (Math.PI / 180); // Convert to radians
        
        // Calculate x and y positions using trigonometry
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        return (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.menuItem,
              {
                left: x - 32, // Offset by half the item width (64/2)
                top: y - 42,  // Offset by approximate half height including text
              }
            ]}
            onPress={() => handleItemPress(item.screen)}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemCircle}>
              <Text style={styles.menuItemIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.menuItemLabel}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  circularBackground: {
    position: 'absolute',
    backgroundColor: Colors.brandYellow,
    borderRadius: BorderRadius.full,
    borderWidth: 4,
    borderColor: Colors.orange300,
    ...Shadows.xl,
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 90,
    height: 90,
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -45 }, { translateY: -45 }],
    ...Shadows.xl,
    zIndex: 10,
  },
  centerNumber: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: Colors.white,
    lineHeight: FontSizes.xxxl,
  },
  centerText: {
    fontSize: 10,
    color: Colors.white,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
  },
  menuItem: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 64,
  },
  menuItemCircle: {
    width: 52,
    height: 52,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.orange200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
    ...Shadows.lg,
  },
  menuItemLabel: {
    fontSize: 10,
    fontWeight: FontWeights.medium,
    color: Colors.gray700,
    textAlign: 'center',
    maxWidth: 64,
    lineHeight: 12,
    paddingHorizontal: 1,
  },
  menuItemIcon: {
    fontSize: 18,
  },
});

export default RadialMenu;
