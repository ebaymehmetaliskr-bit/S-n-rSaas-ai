import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProfile } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        {isLoggedIn && userProfile ? (
          <DashboardPage onLogout={handleLogout} userProfile={userProfile} />
        ) : (
          <LandingPage onLogin={handleLogin} />
        )}
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;