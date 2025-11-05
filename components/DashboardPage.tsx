import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      <Sidebar onLogout={onLogout} activeSection={activeSection} />
      <Dashboard setActiveSection={setActiveSection} />
    </div>
  );
};

export default DashboardPage;