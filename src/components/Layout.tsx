
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Users, BarChart3 } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'الرحلات', icon: Car },
    { path: '/drivers', label: 'السائقين', icon: Users },
    { path: '/statistics', label: 'الإحصائيات', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-gradient-to-r from-blue-600 to-amber-500 text-white p-3 rounded-full">
                <Car size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Alreem Uber</h1>
                <p className="text-sm text-gray-600">نظام إدارة التاكسي</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 space-x-reverse">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 space-x-reverse py-4 px-6 border-b-2 transition-colors ${
                  location.pathname === path
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
