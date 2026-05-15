import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import TodoListScreen from './screens/TodoListScreen';
import AnnuityProfileScreen from './screens/AnnuityProfileScreen';
import PersonalInformationScreen from './screens/PersonalInformationScreen';
import SupportScreen from './screens/SupportScreen';
import CourtInfoScreen from './screens/CourtInfoScreen';
import MyRewardsScreen from './screens/MyRewardsScreen';
import CRMDataInputScreen from './screens/CRMDataInputScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [navigationOptions, setNavigationOptions] = useState(null);

  // Check URL for direct navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'crm') {
      setIsLoggedIn(true);
      setCurrentScreen('crm');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const navigateToScreen = (screenName, options = null) => {
    setCurrentScreen(screenName);
    setNavigationOptions(options);
  };

  const navigateToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  // If not logged in, show login screen
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // If logged in, show current screen
  switch (currentScreen) {
    case 'dashboard':
      return <DashboardScreen onNavigate={navigateToScreen} />;
    case 'todo':
      return (
        <TodoListScreen 
          onNavigate={navigateToScreen} 
          onBack={navigateToDashboard}
        />
      );
    case 'profile':
      return (
        <PersonalInformationScreen 
          onNavigate={navigateToScreen} 
          onBack={navigateToDashboard}
        />
      );
    case 'annuity':
      return (
        <AnnuityProfileScreen 
          onNavigate={navigateToScreen} 
          onBack={navigateToDashboard}
        />
      );
    case 'court':
      return (
        <CourtInfoScreen 
          onNavigate={navigateToScreen} 
          onBack={navigateToDashboard}
          initialTab={navigationOptions?.tab}
        />
      );
    case 'rewards':
      return (
        <MyRewardsScreen 
          onNavigate={navigateToScreen} 
          onBack={navigateToDashboard}
        />
      );
    case 'support':
      return (
        <SupportScreen 
          onNavigate={navigateToScreen} 
          onBack={navigateToDashboard}
        />
      );
    case 'crm':
      return (
        <CRMDataInputScreen 
          onNavigate={navigateToScreen} 
          onBack={navigateToDashboard}
        />
      );
    default:
      return <DashboardScreen onNavigate={navigateToScreen} />;
  }
}

export default App;
