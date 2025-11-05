import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        {isLoggedIn ? (
          <DashboardPage onLogout={handleLogout} />
        ) : (
          <LandingPage onLogin={handleLogin} />
        )}
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;