import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import { UserProfile } from '../types';

interface DashboardPageProps {
  onLogout: () => void;
  userProfile: UserProfile;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, userProfile }) => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      <Sidebar onLogout={onLogout} activeSection={activeSection} />
      <Dashboard setActiveSection={setActiveSection} userProfile={userProfile} />
    </div>
  );
};

export default DashboardPage;