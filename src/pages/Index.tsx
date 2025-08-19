import React, { useState } from 'react';
import { BusinessProvider } from '@/contexts/BusinessContext';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import ProductManagement from '@/components/ProductManagement';
import SalesManagement from '@/components/SalesManagement';
import ExpenseManagement from '@/components/ExpenseManagement';
import Reports from '@/components/Reports';
import Calculator from '@/components/Calculator';

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductManagement />;
      case 'sales':
        return <SalesManagement />;
      case 'expenses':
        return <ExpenseManagement />;
      case 'reports':
        return <Reports />;
      case 'calculator':
        return <Calculator />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <BusinessProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>
    </BusinessProvider>
  );
}
