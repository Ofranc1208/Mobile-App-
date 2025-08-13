import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TodoListScreen from '../screens/TodoListScreen';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';
import SupportScreen from '../screens/SupportScreen';
import MyRewardsScreen from '../screens/MyRewardsScreen';
import AnnuityProfileScreen from '../screens/AnnuityProfileScreen';
import CourtInfoScreen from '../screens/CourtInfoScreen';
import { Text } from 'react-native'; // Added missing import for Text

// Navigation types
type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type MainTabParamList = {
  Dashboard: undefined;
  Todo: undefined;
  Profile: undefined;
  Support: undefined;
  Rewards: undefined;
};

type DashboardStackParamList = {
  DashboardHome: undefined;
  AnnuityProfile: undefined;
  CourtInfo: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const DashboardStack = createStackNavigator<DashboardStackParamList>();

// Dashboard Stack Navigator
const DashboardStackNavigator = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DashboardStack.Screen name="DashboardHome" component={DashboardScreen} />
      <DashboardStack.Screen name="AnnuityProfile" component={AnnuityProfileScreen} />
      <DashboardStack.Screen name="CourtInfo" component={CourtInfoScreen} />
    </DashboardStack.Navigator>
  );
};

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
        },
      }}
    >
      <MainTab.Screen 
        name="Dashboard" 
        component={DashboardStackNavigator}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <MainTab.Screen 
        name="Todo" 
        component={TodoListScreen}
        options={{
          tabBarLabel: 'To-Do',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📋</Text>
          ),
        }}
      />
      <MainTab.Screen 
        name="Profile" 
        component={PersonalInformationScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
      <MainTab.Screen 
        name="Support" 
        component={SupportScreen}
        options={{
          tabBarLabel: 'Support',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🆘</Text>
          ),
        }}
      />
      <MainTab.Screen 
        name="Rewards" 
        component={MyRewardsScreen}
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏆</Text>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You can add a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <RootStack.Screen name="Login" component={LoginScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
