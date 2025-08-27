import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import TodoListScreen from './screens/TodoListScreen';
import AnnuityProfileScreen from './screens/AnnuityProfileScreen';
import PersonalInformationScreen from './screens/PersonalInformationScreen';
import SupportScreen from './screens/SupportScreen';
import CourtInfoScreen from './screens/CourtInfoScreen';
import MyRewardsScreen from './screens/MyRewardsScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const navigateToScreen = (screenName) => {
    setCurrentScreen(screenName);
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
    default:
      return <DashboardScreen onNavigate={navigateToScreen} />;
  }
}

export default App;
