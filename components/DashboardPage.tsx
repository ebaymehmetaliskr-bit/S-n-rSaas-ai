import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      <Sidebar onLogout={onLogout} />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;