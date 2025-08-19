import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Receipt, 
  TrendingUp,
  Calculator
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Produk', icon: Package },
    { id: 'sales', label: 'Penjualan', icon: ShoppingCart },
    { id: 'expenses', label: 'Pengeluaran', icon: Receipt },
    { id: 'reports', label: 'Laporan', icon: TrendingUp },
    { id: 'calculator', label: 'Kalkulator', icon: Calculator },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Bisnis Manager</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    className={cn(
                      'inline-flex items-center px-3 py-2 text-sm font-medium',
                      activeTab === tab.id
                        ? 'text-white bg-blue-600 hover:bg-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;